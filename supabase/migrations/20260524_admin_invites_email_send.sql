-- Add last_sent_at tracking column
ALTER TABLE public.admin_company_invites
  ADD COLUMN IF NOT EXISTS last_sent_at timestamptz;

-- Expand event_type CHECK to include email_sent
DO $$
DECLARE
  v_constraint text;
BEGIN
  SELECT conname INTO v_constraint
  FROM pg_constraint
  WHERE conrelid = 'public.admin_invite_events'::regclass
    AND contype = 'c'
    AND pg_get_constraintdef(oid) LIKE '%event_type%';

  IF v_constraint IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.admin_invite_events DROP CONSTRAINT %I', v_constraint);
  END IF;
END $$;

ALTER TABLE public.admin_invite_events
  ADD CONSTRAINT admin_invite_events_event_type_check
  CHECK (event_type IN (
    'created', 'opened', 'signup_started', 'claimed',
    'expired', 'revoked', 'claim_failed', 'email_sent'
  ));

-- Allow admin_invite_events inserts from edge functions (service role bypasses RLS,
-- but add policy so authenticated admins can insert too)
DROP POLICY IF EXISTS "admin_invite_events_admin_insert" ON public.admin_invite_events;
CREATE POLICY "admin_invite_events_admin_insert" ON public.admin_invite_events
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

-- upsert_admin_invite: dedup by NIP for active invites; always returns fresh token slot
CREATE OR REPLACE FUNCTION public.upsert_admin_invite(
  p_company_name    text,
  p_nip             text,
  p_krs             text,
  p_regon           text,
  p_company_type    text,
  p_address         text,
  p_postal_code     text,
  p_city            text,
  p_email           text,
  p_phone           text,
  p_recipient_email text,
  p_recipient_name  text,
  p_campaign_source text,
  p_notes           text,
  p_token_hash      text,
  p_expires_at      timestamptz,
  p_created_by      uuid
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_existing_id uuid;
  v_is_new      boolean;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  -- Look for existing active invite by NIP
  IF p_nip IS NOT NULL AND trim(p_nip) != '' THEN
    SELECT id INTO v_existing_id
    FROM public.admin_company_invites
    WHERE nip = trim(p_nip)
      AND status IN ('pending', 'opened', 'signup_started')
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;

  IF v_existing_id IS NOT NULL THEN
    -- Update info + refresh token so old links are invalidated and admin gets new ones
    UPDATE public.admin_company_invites SET
      company_name    = p_company_name,
      krs             = NULLIF(trim(p_krs), ''),
      regon           = NULLIF(trim(p_regon), ''),
      company_type    = p_company_type,
      address         = NULLIF(trim(p_address), ''),
      postal_code     = NULLIF(trim(p_postal_code), ''),
      city            = NULLIF(trim(p_city), ''),
      email           = NULLIF(trim(p_email), ''),
      phone           = NULLIF(trim(p_phone), ''),
      recipient_email = lower(trim(p_recipient_email)),
      recipient_name  = NULLIF(trim(p_recipient_name), ''),
      campaign_source = NULLIF(trim(p_campaign_source), ''),
      notes           = NULLIF(trim(p_notes), ''),
      token_hash      = p_token_hash,
      status          = 'pending',
      expires_at      = p_expires_at
    WHERE id = v_existing_id;
    v_is_new := false;
  ELSE
    INSERT INTO public.admin_company_invites (
      token_hash, company_name, nip, krs, regon, company_type,
      address, postal_code, city, email, phone,
      recipient_email, recipient_name, campaign_source, notes,
      created_by_user_id, expires_at
    ) VALUES (
      p_token_hash,
      p_company_name,
      NULLIF(trim(p_nip), ''),
      NULLIF(trim(p_krs), ''),
      NULLIF(trim(p_regon), ''),
      p_company_type,
      NULLIF(trim(p_address), ''),
      NULLIF(trim(p_postal_code), ''),
      NULLIF(trim(p_city), ''),
      NULLIF(trim(p_email), ''),
      NULLIF(trim(p_phone), ''),
      lower(trim(p_recipient_email)),
      NULLIF(trim(p_recipient_name), ''),
      NULLIF(trim(p_campaign_source), ''),
      NULLIF(trim(p_notes), ''),
      p_created_by,
      p_expires_at
    )
    RETURNING id INTO v_existing_id;
    v_is_new := true;
  END IF;

  RETURN jsonb_build_object('invite_id', v_existing_id, 'is_new', v_is_new);
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_admin_invite TO authenticated;
