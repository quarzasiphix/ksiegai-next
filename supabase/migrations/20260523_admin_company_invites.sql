-- Admin-initiated company invite onboarding
-- Token is hashed (SHA-256 hex); raw token never stored

-- ─── admin_company_invites ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_company_invites (
  id                   uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_hash           text        NOT NULL UNIQUE,
  company_name         text        NOT NULL,
  nip                  text,
  krs                  text,
  regon                text,
  company_type         text        NOT NULL DEFAULT 'sp_zoo',
  address              text,
  postal_code          text,
  city                 text,
  email                text,
  phone                text,
  recipient_email      text        NOT NULL,
  recipient_name       text,
  campaign_source      text,
  notes                text,
  status               text        NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','opened','signup_started','claimed','expired','revoked')),
  created_by_user_id   uuid        REFERENCES public.admin_users(user_id) ON DELETE SET NULL,
  expires_at           timestamptz NOT NULL DEFAULT now() + interval '30 days',
  claimed_at           timestamptz,
  claimed_by_user_id   uuid,
  business_profile_id  uuid        REFERENCES public.business_profiles(id) ON DELETE SET NULL,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_company_invites_token_hash ON public.admin_company_invites(token_hash);
CREATE INDEX IF NOT EXISTS idx_admin_company_invites_status     ON public.admin_company_invites(status);
CREATE INDEX IF NOT EXISTS idx_admin_company_invites_email      ON public.admin_company_invites(recipient_email);

-- ─── admin_invite_events ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_invite_events (
  id         uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_id  uuid        NOT NULL REFERENCES public.admin_company_invites(id) ON DELETE CASCADE,
  event_type text        NOT NULL
    CHECK (event_type IN ('created','opened','signup_started','claimed','expired','revoked','claim_failed')),
  user_id    uuid,
  metadata   jsonb       NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_invite_events_invite_id ON public.admin_invite_events(invite_id);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
ALTER TABLE public.admin_company_invites  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_invite_events    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_invites_admin_all" ON public.admin_company_invites
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "admin_invite_events_admin_read" ON public.admin_invite_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND is_active = true)
  );

-- ─── RPC: lookup_admin_invite (public, no auth required) ─────────────────────
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
    'id',             v_invite.id,
    'company_name',   v_invite.company_name,
    'nip',            v_invite.nip,
    'krs',            v_invite.krs,
    'regon',          v_invite.regon,
    'company_type',   v_invite.company_type,
    'recipient_email',v_invite.recipient_email,
    'recipient_name', v_invite.recipient_name,
    'address',        v_invite.address,
    'postal_code',    v_invite.postal_code,
    'city',           v_invite.city,
    'email',          v_invite.email,
    'phone',          v_invite.phone,
    'status',         v_invite.status,
    'expires_at',     v_invite.expires_at,
    'is_valid',       (v_invite.status IN ('pending','opened','signup_started') AND v_invite.expires_at > now())
  );
END;
$$;

-- ─── RPC: mark_invite_signup_started (public) ────────────────────────────────
CREATE OR REPLACE FUNCTION public.mark_invite_signup_started(p_token_hash text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.admin_company_invites
  SET status = 'signup_started', updated_at = now()
  WHERE token_hash = p_token_hash AND status IN ('pending','opened');

  INSERT INTO public.admin_invite_events (invite_id, event_type)
  SELECT id, 'signup_started'
  FROM public.admin_company_invites
  WHERE token_hash = p_token_hash;
END;
$$;

-- ─── RPC: claim_admin_invite (requires confirmed auth session) ────────────────
CREATE OR REPLACE FUNCTION public.claim_admin_invite(p_token_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id    uuid := auth.uid();
  v_user_email text;
  v_invite     public.admin_company_invites;
  v_profile_id uuid;
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

  -- Idempotent for same claimer
  IF v_invite.status = 'claimed' AND v_invite.claimed_by_user_id = v_user_id THEN
    RETURN jsonb_build_object(
      'business_profile_id', v_invite.business_profile_id,
      'company_name',        v_invite.company_name
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
    VALUES (v_invite.id, 'claim_failed', v_user_id,
      jsonb_build_object('reason','email_mismatch','attempted_email', v_user_email));
    RAISE EXCEPTION 'Email mismatch: invite is for a different address';
  END IF;

  INSERT INTO public.business_profiles (
    user_id, name, tax_id, krs_number, regon, entity_type,
    address, postal_code, city, email, phone, is_default, updated_at
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
    now()
  )
  RETURNING id INTO v_profile_id;

  INSERT INTO public.company_members (user_id, business_profile_id, role, joined_at)
  VALUES (v_user_id, v_profile_id, 'owner', now());

  UPDATE public.admin_company_invites SET
    status              = 'claimed',
    claimed_at          = now(),
    claimed_by_user_id  = v_user_id,
    business_profile_id = v_profile_id,
    updated_at          = now()
  WHERE id = v_invite.id;

  INSERT INTO public.admin_invite_events (invite_id, event_type, user_id, metadata)
  VALUES (v_invite.id, 'claimed', v_user_id,
    jsonb_build_object('business_profile_id', v_profile_id));

  RETURN jsonb_build_object(
    'business_profile_id', v_profile_id,
    'company_name',        v_invite.company_name
  );
END;
$$;

-- ─── updated_at trigger ��──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_admin_invites_ts()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_admin_invites_updated_at
BEFORE UPDATE ON public.admin_company_invites
FOR EACH ROW EXECUTE FUNCTION public.update_admin_invites_ts();
