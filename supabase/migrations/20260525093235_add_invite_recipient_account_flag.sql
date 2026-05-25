CREATE OR REPLACE FUNCTION public.lookup_admin_invite(p_token_hash text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_invite public.admin_company_invites;
  v_recipient_has_account boolean := false;
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

  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE lower(email) = lower(v_invite.recipient_email)
  )
  INTO v_recipient_has_account;

  RETURN jsonb_build_object(
    'id', v_invite.id,
    'company_name', v_invite.company_name,
    'nip', v_invite.nip,
    'krs', v_invite.krs,
    'regon', v_invite.regon,
    'company_type', v_invite.company_type,
    'recipient_email', v_invite.recipient_email,
    'recipient_name', v_invite.recipient_name,
    'recipient_has_account', v_recipient_has_account,
    'address', v_invite.address,
    'postal_code', v_invite.postal_code,
    'city', v_invite.city,
    'email', v_invite.email,
    'phone', v_invite.phone,
    'status', v_invite.status,
    'expires_at', v_invite.expires_at,
    'is_valid', (v_invite.status IN ('pending','opened','signup_started') AND v_invite.expires_at > now())
  );
END;
$$;
