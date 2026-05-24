-- Optional premium trial attached to admin-created invite

ALTER TABLE public.admin_company_invites
  ADD COLUMN IF NOT EXISTS premium_trial_days integer;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'admin_company_invites_premium_trial_days_check'
      AND conrelid = 'public.admin_company_invites'::regclass
  ) THEN
    ALTER TABLE public.admin_company_invites
      ADD CONSTRAINT admin_company_invites_premium_trial_days_check
      CHECK (premium_trial_days IS NULL OR premium_trial_days BETWEEN 1 AND 365);
  END IF;
END $$;

DROP FUNCTION IF EXISTS public.upsert_admin_invite(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text, text, timestamptz, uuid
);

CREATE OR REPLACE FUNCTION public.upsert_admin_invite(
  p_company_name text,
  p_nip text,
  p_krs text,
  p_regon text,
  p_company_type text,
  p_address text,
  p_postal_code text,
  p_city text,
  p_email text,
  p_phone text,
  p_recipient_email text,
  p_recipient_name text,
  p_campaign_source text,
  p_notes text,
  p_premium_trial_days integer,
  p_token_hash text,
  p_expires_at timestamptz,
  p_created_by uuid
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_existing_id uuid;
  v_is_new boolean;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid() AND is_active = true
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  IF p_nip IS NOT NULL AND trim(p_nip) != '' THEN
    SELECT id INTO v_existing_id
    FROM public.admin_company_invites
    WHERE nip = trim(p_nip)
      AND status IN ('pending', 'opened', 'signup_started')
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;

  IF v_existing_id IS NOT NULL THEN
    UPDATE public.admin_company_invites SET
      company_name = p_company_name,
      krs = NULLIF(trim(p_krs), ''),
      regon = NULLIF(trim(p_regon), ''),
      company_type = p_company_type,
      address = NULLIF(trim(p_address), ''),
      postal_code = NULLIF(trim(p_postal_code), ''),
      city = NULLIF(trim(p_city), ''),
      email = NULLIF(trim(p_email), ''),
      phone = NULLIF(trim(p_phone), ''),
      recipient_email = lower(trim(p_recipient_email)),
      recipient_name = NULLIF(trim(p_recipient_name), ''),
      campaign_source = NULLIF(trim(p_campaign_source), ''),
      notes = NULLIF(trim(p_notes), ''),
      premium_trial_days = CASE
        WHEN p_premium_trial_days IS NOT NULL AND p_premium_trial_days > 0 THEN p_premium_trial_days
        ELSE NULL
      END,
      token_hash = p_token_hash,
      status = 'pending',
      expires_at = p_expires_at
    WHERE id = v_existing_id;
    v_is_new := false;
  ELSE
    INSERT INTO public.admin_company_invites (
      token_hash, company_name, nip, krs, regon, company_type,
      address, postal_code, city, email, phone,
      recipient_email, recipient_name, campaign_source, notes,
      premium_trial_days, created_by_user_id, expires_at
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
      CASE
        WHEN p_premium_trial_days IS NOT NULL AND p_premium_trial_days > 0 THEN p_premium_trial_days
        ELSE NULL
      END,
      p_created_by,
      p_expires_at
    )
    RETURNING id INTO v_existing_id;
    v_is_new := true;
  END IF;

  RETURN jsonb_build_object('invite_id', v_existing_id, 'is_new', v_is_new);
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_admin_invite(
  text, text, text, text, text, text, text, text, text, text, text, text, text, text, integer, text, timestamptz, uuid
) TO authenticated;

CREATE OR REPLACE FUNCTION public.lookup_admin_invite(p_token_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_invite public.admin_company_invites;
BEGIN
  SELECT * INTO v_invite
  FROM public.admin_company_invites
  WHERE token_hash = p_token_hash;

  IF NOT FOUND THEN RETURN NULL; END IF;

  IF v_invite.status = 'pending' THEN
    UPDATE public.admin_company_invites
    SET status = 'opened', updated_at = now()
    WHERE id = v_invite.id;

    INSERT INTO public.admin_invite_events (invite_id, event_type)
    VALUES (v_invite.id, 'opened');
  END IF;

  RETURN jsonb_build_object(
    'id', v_invite.id,
    'company_name', v_invite.company_name,
    'nip', v_invite.nip,
    'krs', v_invite.krs,
    'regon', v_invite.regon,
    'company_type', v_invite.company_type,
    'recipient_email', v_invite.recipient_email,
    'recipient_name', v_invite.recipient_name,
    'address', v_invite.address,
    'postal_code', v_invite.postal_code,
    'city', v_invite.city,
    'email', v_invite.email,
    'phone', v_invite.phone,
    'premium_trial_days', v_invite.premium_trial_days,
    'status', v_invite.status,
    'expires_at', v_invite.expires_at,
    'is_valid', (v_invite.status IN ('pending','opened','signup_started') AND v_invite.expires_at > now())
  );
END;
$$;

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
  VALUES (
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
