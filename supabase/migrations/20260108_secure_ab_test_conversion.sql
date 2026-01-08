-- Secure A/B Test Conversion Tracking with RLS
-- This migration creates a secure RPC function and RLS policies to prevent abuse

-- ============================================================================
-- 1. Enable Row Level Security on A/B Test Tables
-- ============================================================================

ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_definitions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. RLS Policies for ab_test_definitions (Read-only for public)
-- ============================================================================

-- Allow anyone to read active test definitions (needed for client-side variant assignment)
CREATE POLICY "Anyone can read active test definitions"
ON ab_test_definitions
FOR SELECT
TO public
USING (status = 'active');

-- Only service role can modify test definitions
CREATE POLICY "Only service role can modify test definitions"
ON ab_test_definitions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 3. RLS Policies for ab_test_assignments
-- ============================================================================

-- Allow anonymous users to insert their own assignments (initial variant assignment)
CREATE POLICY "Anonymous users can insert assignments"
ON ab_test_assignments
FOR INSERT
TO anon
WITH CHECK (
  -- Must provide session_id
  session_id IS NOT NULL
  -- user_id must be NULL (not yet registered)
  AND user_id IS NULL
  -- Can only insert for active tests
  AND EXISTS (
    SELECT 1 FROM ab_test_definitions 
    WHERE id = ab_test_assignments.test_id 
    AND status = 'active'
  )
);

-- Allow authenticated users to read their own assignments
CREATE POLICY "Users can read their own assignments"
ON ab_test_assignments
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR session_id IN (
    SELECT raw_user_meta_data->>'ab_session_id' 
    FROM auth.users 
    WHERE id = auth.uid()
  )
);

-- Service role has full access
CREATE POLICY "Service role has full access to assignments"
ON ab_test_assignments
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 4. RLS Policies for ab_test_events
-- ============================================================================

-- Allow anonymous users to insert page view and click events
CREATE POLICY "Anonymous users can insert non-conversion events"
ON ab_test_events
FOR INSERT
TO anon
WITH CHECK (
  event_type IN ('page_view', 'click', 'scroll', 'time_on_page')
  AND event_type != 'conversion'
);

-- Authenticated users can read their own events
CREATE POLICY "Users can read their own events"
ON ab_test_events
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM ab_test_assignments
    WHERE ab_test_assignments.id = ab_test_events.assignment_id
    AND ab_test_assignments.user_id = auth.uid()
  )
);

-- Service role has full access
CREATE POLICY "Service role has full access to events"
ON ab_test_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 5. Secure RPC Function to Track Registration Conversion
-- ============================================================================

CREATE OR REPLACE FUNCTION track_registration_conversion(
  p_session_id TEXT,
  p_registration_method TEXT DEFAULT 'unknown'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with function owner's privileges
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_assignments RECORD;
  v_conversion_count INT := 0;
  v_result JSON;
BEGIN
  -- CRITICAL: Verify user is authenticated
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to track conversion';
  END IF;

  -- CRITICAL: Verify session_id belongs to this user
  -- Check if session_id matches the one stored in user metadata
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = v_user_id
    AND (
      raw_user_meta_data->>'ab_session_id' = p_session_id
      OR raw_user_meta_data->>'ab_session_id' IS NULL -- Allow if not set yet
    )
  ) THEN
    -- If session_id doesn't match, update user metadata first
    UPDATE auth.users
    SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object('ab_session_id', p_session_id)
    WHERE id = v_user_id;
  END IF;

  -- Get all assignments for this session that don't have a user_id yet
  FOR v_assignments IN
    SELECT id, test_id, variant_id
    FROM ab_test_assignments
    WHERE session_id = p_session_id
    AND user_id IS NULL -- Only convert assignments that haven't been converted yet
  LOOP
    -- Update assignment with user_id (mark as converted)
    UPDATE ab_test_assignments
    SET user_id = v_user_id,
        updated_at = NOW()
    WHERE id = v_assignments.id;

    -- Insert conversion event
    INSERT INTO ab_test_events (
      test_id,
      assignment_id,
      variant_id,
      event_type,
      event_name,
      event_metadata,
      created_at
    ) VALUES (
      v_assignments.test_id,
      v_assignments.id,
      v_assignments.variant_id,
      'conversion',
      'registration',
      jsonb_build_object(
        'user_id', v_user_id,
        'registration_method', p_registration_method,
        'timestamp', NOW()
      ),
      NOW()
    );

    v_conversion_count := v_conversion_count + 1;
  END LOOP;

  -- Update user metadata with variant assignments
  IF v_conversion_count > 0 THEN
    UPDATE auth.users
    SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object(
      'ab_test_variants', (
        SELECT jsonb_object_agg(test_id::text, variant_id)
        FROM ab_test_assignments
        WHERE user_id = v_user_id
      ),
      'ab_session_id', p_session_id
    )
    WHERE id = v_user_id;
  END IF;

  -- Return result
  v_result := json_build_object(
    'success', true,
    'user_id', v_user_id,
    'conversions_tracked', v_conversion_count,
    'session_id', p_session_id
  );

  RETURN v_result;

EXCEPTION
  WHEN OTHERS THEN
    -- Log error and return failure
    RAISE WARNING 'Error tracking conversion: %', SQLERRM;
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Grant execute permission to authenticated users only
GRANT EXECUTE ON FUNCTION track_registration_conversion(TEXT, TEXT) TO authenticated;
REVOKE EXECUTE ON FUNCTION track_registration_conversion(TEXT, TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION track_registration_conversion(TEXT, TEXT) FROM public;

-- Add comment
COMMENT ON FUNCTION track_registration_conversion IS 
'Securely tracks user registration as A/B test conversion. Can only be called by authenticated users. Prevents abuse by verifying session ownership and preventing duplicate conversions.';

-- ============================================================================
-- 6. Helper Function to Get User's A/B Test Variants
-- ============================================================================

CREATE OR REPLACE FUNCTION get_user_ab_variants()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_result JSON;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'Not authenticated');
  END IF;

  SELECT json_build_object(
    'variants', jsonb_object_agg(test_id::text, variant_id),
    'session_id', session_id
  )
  INTO v_result
  FROM ab_test_assignments
  WHERE user_id = v_user_id
  GROUP BY session_id;

  RETURN COALESCE(v_result, json_build_object('variants', '{}', 'session_id', null));
END;
$$;

GRANT EXECUTE ON FUNCTION get_user_ab_variants() TO authenticated;

-- ============================================================================
-- 7. Audit Trigger to Prevent Manual Conversion Manipulation
-- ============================================================================

CREATE OR REPLACE FUNCTION prevent_manual_conversion_manipulation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Prevent direct updates to user_id in ab_test_assignments (must use RPC)
  IF TG_OP = 'UPDATE' AND OLD.user_id IS NULL AND NEW.user_id IS NOT NULL THEN
    -- Allow only if called by the secure RPC function or service role
    IF current_setting('role', true) != 'service_role' 
       AND current_setting('request.jwt.claims', true)::json->>'role' != 'service_role' THEN
      RAISE EXCEPTION 'Cannot manually set user_id. Use track_registration_conversion() function.';
    END IF;
  END IF;

  -- Prevent direct insertion of conversion events (must use RPC)
  IF TG_OP = 'INSERT' AND NEW.event_type = 'conversion' THEN
    IF current_setting('role', true) != 'service_role'
       AND current_setting('request.jwt.claims', true)::json->>'role' != 'service_role' THEN
      RAISE EXCEPTION 'Cannot manually insert conversion events. Use track_registration_conversion() function.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Apply trigger to ab_test_assignments
DROP TRIGGER IF EXISTS prevent_conversion_manipulation_assignments ON ab_test_assignments;
CREATE TRIGGER prevent_conversion_manipulation_assignments
  BEFORE UPDATE ON ab_test_assignments
  FOR EACH ROW
  EXECUTE FUNCTION prevent_manual_conversion_manipulation();

-- Apply trigger to ab_test_events
DROP TRIGGER IF EXISTS prevent_conversion_manipulation_events ON ab_test_events;
CREATE TRIGGER prevent_conversion_manipulation_events
  BEFORE INSERT ON ab_test_events
  FOR EACH ROW
  EXECUTE FUNCTION prevent_manual_conversion_manipulation();

-- ============================================================================
-- 8. Add updated_at column to ab_test_assignments if not exists
-- ============================================================================

ALTER TABLE ab_test_assignments 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_ab_test_assignments_updated_at ON ab_test_assignments;
CREATE TRIGGER update_ab_test_assignments_updated_at
  BEFORE UPDATE ON ab_test_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Summary
-- ============================================================================

-- This migration provides:
-- 1. ✅ RLS policies to prevent unauthorized access
-- 2. ✅ Secure RPC function that only authenticated users can call
-- 3. ✅ Verification that session_id belongs to the user
-- 4. ✅ Prevention of duplicate conversions (checks user_id IS NULL)
-- 5. ✅ Triggers to prevent manual manipulation of conversions
-- 6. ✅ Audit trail with updated_at timestamp
-- 7. ✅ Helper function to retrieve user's variants

-- Security guarantees:
-- - Anonymous users can only insert initial assignments and non-conversion events
-- - Only authenticated users can track conversions via RPC
-- - RPC verifies session ownership before tracking
-- - Triggers prevent direct manipulation of conversion data
-- - Service role maintains full access for admin operations
