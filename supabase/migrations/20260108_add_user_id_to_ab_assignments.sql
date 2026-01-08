-- Add user_id column to ab_test_assignments table if it doesn't exist
-- This allows us to track which user registered from which A/B test variant

-- Add user_id column (nullable, since existing assignments won't have it)
ALTER TABLE ab_test_assignments 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_ab_test_assignments_user_id 
ON ab_test_assignments(user_id);

-- Add comment to document the column's purpose
COMMENT ON COLUMN ab_test_assignments.user_id IS 
'User ID linked to this assignment after registration. Allows tracking which variant led to user signup.';

-- Create a view for easy querying of user attribution
CREATE OR REPLACE VIEW ab_test_user_attribution AS
SELECT 
  a.id as assignment_id,
  a.test_id,
  a.variant_id,
  a.session_id,
  a.user_id,
  a.assigned_at,
  t.test_key,
  t.name as test_name,
  (t.variants::jsonb -> (
    SELECT i::text 
    FROM generate_series(0, jsonb_array_length(t.variants::jsonb) - 1) i
    WHERE (t.variants::jsonb -> i ->> 'id') = a.variant_id
  ) ->> 'name') as variant_name,
  u.email as user_email,
  u.created_at as user_registered_at,
  CASE 
    WHEN a.user_id IS NOT NULL THEN 'converted'
    ELSE 'not_converted'
  END as conversion_status
FROM ab_test_assignments a
LEFT JOIN ab_test_definitions t ON a.test_id = t.id
LEFT JOIN auth.users u ON a.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON ab_test_user_attribution TO authenticated;
GRANT SELECT ON ab_test_user_attribution TO service_role;

-- Create a function to get conversion rate by variant with user attribution
CREATE OR REPLACE FUNCTION get_ab_test_conversion_stats(test_id_param UUID)
RETURNS TABLE (
  variant_id TEXT,
  variant_name TEXT,
  total_assignments BIGINT,
  converted_users BIGINT,
  conversion_rate NUMERIC,
  user_emails TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.variant_id,
    (t.variants::jsonb -> (
      SELECT i::text 
      FROM generate_series(0, jsonb_array_length(t.variants::jsonb) - 1) i
      WHERE (t.variants::jsonb -> i ->> 'id') = a.variant_id
    ) ->> 'name')::TEXT as variant_name,
    COUNT(*)::BIGINT as total_assignments,
    COUNT(a.user_id)::BIGINT as converted_users,
    ROUND(
      (COUNT(a.user_id)::NUMERIC / NULLIF(COUNT(*)::NUMERIC, 0)) * 100, 
      2
    ) as conversion_rate,
    ARRAY_AGG(u.email) FILTER (WHERE u.email IS NOT NULL) as user_emails
  FROM ab_test_assignments a
  LEFT JOIN ab_test_definitions t ON a.test_id = t.id
  LEFT JOIN auth.users u ON a.user_id = u.id
  WHERE a.test_id = test_id_param
  GROUP BY a.variant_id, t.variants;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_ab_test_conversion_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_ab_test_conversion_stats(UUID) TO service_role;
