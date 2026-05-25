-- Link claimed admin invite metadata back onto the created business profile.
-- Stores only the invite id and token hash, never the raw invite token.

ALTER TABLE public.business_profiles
  ADD COLUMN IF NOT EXISTS source_invite_id uuid REFERENCES public.admin_company_invites(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source_invite_token_hash text;

CREATE INDEX IF NOT EXISTS idx_business_profiles_source_invite_id
  ON public.business_profiles (source_invite_id)
  WHERE source_invite_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_business_profiles_source_invite_token_hash
  ON public.business_profiles (source_invite_token_hash)
  WHERE source_invite_token_hash IS NOT NULL;

UPDATE public.business_profiles AS bp
SET
  source_invite_id = inv.id,
  source_invite_token_hash = inv.token_hash
FROM public.admin_company_invites AS inv
WHERE inv.business_profile_id = bp.id
  AND (
    bp.source_invite_id IS DISTINCT FROM inv.id
    OR bp.source_invite_token_hash IS DISTINCT FROM inv.token_hash
  );

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
    trial_ends_at,
    source_invite_id,
    source_invite_token_hash
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
    CASE WHEN v_trial_days IS NOT NULL THEN now() + make_interval(days => v_trial_days) ELSE NULL END,
    v_invite.id,
    v_invite.token_hash
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
