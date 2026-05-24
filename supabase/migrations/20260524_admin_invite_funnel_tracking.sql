-- Full-funnel tracking for admin company invites

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
    'created',
    'email_sent',
    'opened',
    'clicked',
    'signup_started',
    'registered',
    'claimed',
    'onboarding_reached',
    'checklist_step_completed',
    'ksef_connected',
    'replied',
    'expired',
    'revoked',
    'claim_failed'
  ));

CREATE OR REPLACE FUNCTION public.track_admin_invite_progress(
  p_event_type text,
  p_token_hash text DEFAULT NULL,
  p_business_profile_id uuid DEFAULT NULL,
  p_invite_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_invite_id uuid;
  v_user_id uuid := auth.uid();
BEGIN
  IF p_invite_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1
      FROM public.admin_users
      WHERE user_id = v_user_id
        AND is_active = true
    ) THEN
      RAISE EXCEPTION 'Access denied';
    END IF;

    v_invite_id := p_invite_id;
  ELSIF p_token_hash IS NOT NULL THEN
    SELECT id INTO v_invite_id
    FROM public.admin_company_invites
    WHERE token_hash = p_token_hash
    LIMIT 1;
  ELSIF v_user_id IS NOT NULL THEN
    SELECT id INTO v_invite_id
    FROM public.admin_company_invites
    WHERE claimed_by_user_id = v_user_id
      AND (p_business_profile_id IS NULL OR business_profile_id = p_business_profile_id)
    ORDER BY claimed_at DESC NULLS LAST, created_at DESC
    LIMIT 1;
  END IF;

  IF v_invite_id IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.admin_invite_events (invite_id, event_type, user_id, metadata)
  VALUES (
    v_invite_id,
    p_event_type,
    v_user_id,
    COALESCE(p_metadata, '{}'::jsonb)
  );

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.track_admin_invite_progress(text, text, uuid, uuid, jsonb) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.claim_admin_invite(p_token_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_user_email text;
  v_invite public.admin_company_invites;
  v_profile_id uuid;
  v_trial_days integer;
  v_trial_tier text;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = v_user_id AND email_confirmed_at IS NOT NULL;

  IF v_user_email IS NULL THEN RAISE EXCEPTION 'Email not confirmed'; END IF;

  SELECT * INTO v_invite
  FROM public.admin_company_invites
  WHERE token_hash = p_token_hash
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Invite not found'; END IF;

  v_trial_days := CASE
    WHEN v_invite.premium_trial_days IS NOT NULL AND v_invite.premium_trial_days > 0
      THEN v_invite.premium_trial_days
    ELSE NULL
  END;

  v_trial_tier := CASE
    WHEN v_invite.company_type IN ('jdg', 'dzialalnosc') THEN 'jdg_premium'
    ELSE 'spolka_premium'
  END;

  IF v_invite.status = 'claimed' AND v_invite.claimed_by_user_id = v_user_id THEN
    RETURN jsonb_build_object(
      'business_profile_id', v_invite.business_profile_id,
      'company_name', v_invite.company_name,
      'invite_id', v_invite.id,
      'campaign_source', v_invite.campaign_source
    );
  END IF;

  IF v_invite.status IN ('claimed','expired','revoked') THEN
    RAISE EXCEPTION 'Invite is %', v_invite.status;
  END IF;

  IF v_invite.expires_at < now() THEN
    UPDATE public.admin_company_invites SET status = 'expired', updated_at = now() WHERE id = v_invite.id;
    RAISE EXCEPTION 'Invite expired';
  END IF;

  IF lower(v_user_email) != lower(v_invite.recipient_email) THEN
    INSERT INTO public.admin_invite_events (invite_id, event_type, user_id, metadata)
    VALUES (
      v_invite.id,
      'claim_failed',
      v_user_id,
      jsonb_build_object('reason','email_mismatch','attempted_email', v_user_email)
    );
    RAISE EXCEPTION 'Email mismatch: invite is for a different address';
  END IF;

  INSERT INTO public.business_profiles (
    user_id,
    name,
    tax_id,
    krs_number,
    regon,
    entity_type,
    address,
    postal_code,
    city,
    email,
    phone,
    is_default,
    updated_at,
    subscription_tier,
    subscription_status,
    subscription_starts_at,
    trial_ends_at
  )
  VALUES (
    v_user_id,
    v_invite.company_name,
    v_invite.nip,
    v_invite.krs,
    v_invite.regon,
    v_invite.company_type,
    COALESCE(v_invite.address, ''),
    COALESCE(v_invite.postal_code, ''),
    COALESCE(v_invite.city, ''),
    v_invite.email,
    v_invite.phone,
    true,
    now(),
    CASE WHEN v_trial_days IS NOT NULL THEN v_trial_tier ELSE 'free' END,
    CASE WHEN v_trial_days IS NOT NULL THEN 'trial' ELSE 'inactive' END,
    CASE WHEN v_trial_days IS NOT NULL THEN now() ELSE NULL END,
    CASE WHEN v_trial_days IS NOT NULL THEN now() + make_interval(days => v_trial_days) ELSE NULL END
  )
  RETURNING id INTO v_profile_id;

  INSERT INTO public.company_members (user_id, business_profile_id, role, joined_at)
  VALUES (v_user_id, v_profile_id, 'owner', now());

  UPDATE public.admin_company_invites SET
    status = 'claimed',
    claimed_at = now(),
    claimed_by_user_id = v_user_id,
    business_profile_id = v_profile_id,
    updated_at = now()
  WHERE id = v_invite.id;

  INSERT INTO public.admin_invite_events (invite_id, event_type, user_id, metadata)
  VALUES
    (
      v_invite.id,
      'registered',
      v_user_id,
      jsonb_build_object(
        'business_profile_id', v_profile_id,
        'campaign_source', v_invite.campaign_source
      )
    ),
    (
      v_invite.id,
      'claimed',
      v_user_id,
      jsonb_build_object(
        'business_profile_id', v_profile_id,
        'premium_trial_days', v_trial_days,
        'subscription_tier', CASE WHEN v_trial_days IS NOT NULL THEN v_trial_tier ELSE null END
      )
    );

  RETURN jsonb_build_object(
    'business_profile_id', v_profile_id,
    'company_name', v_invite.company_name,
    'invite_id', v_invite.id,
    'campaign_source', v_invite.campaign_source
  );
END;
$$;
