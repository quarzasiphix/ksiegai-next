"use client";

// Team-invite splitter — the only thing this page does is decide where to
// send the visitor next, then leaves via a plain top-level redirect:
//   1. Already has an active session (this browser)? -> straight to
//      app.ksiegai.pl/invite/accept?token=... to run the existing
//      acceptance logic (AcceptTeamInvite, RouteRenderer.tsx) unchanged —
//      no reason to make an already-logged-in user click through
//      register/login again.
//   2. No session -> look the invite up (teamInvite.lookup) to find out if
//      the recipient email already has an account, and send them to
//      /rejestracja (no account — "you're invited, register") or
//      /logowanie (account exists — "you're invited, log in to accept"),
//      each personalized via the team_invite query param those pages read.
// See sendInvitationEmail.ts's buildInvitationLink in ksef-ai for why this
// page exists instead of the email linking straight into the SPA.

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { restoreSessionFromAuthToken } from "../../lib/auth/crossDomainAuth";
import { publicApiAction } from "../../lib/gateway";

interface TeamInviteLookup {
  is_valid: boolean;
  company_name: string | null;
  role: string;
  recipient_email: string;
  recipient_has_account: boolean;
}

export default function InviteClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? null;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Ten link zaproszenia jest niekompletny.");
      return;
    }

    let cancelled = false;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      let activeSession = session;

      if (!activeSession) {
        const { restored } = await restoreSessionFromAuthToken((tokens) => supabase.auth.setSession(tokens));
        if (restored) {
          const {
            data: { session: restoredSession },
          } = await supabase.auth.getSession();
          activeSession = restoredSession;
        }
      }

      if (cancelled) return;

      if (activeSession) {
        window.location.href = `https://app.ksiegai.pl/invite/accept?token=${encodeURIComponent(token)}`;
        return;
      }

      const invite = await publicApiAction<{ invite: TeamInviteLookup | null }>("teamInvite.lookup", { token })
        .then((result) => result.invite)
        .catch(() => null);

      if (cancelled) return;

      if (!invite || !invite.is_valid) {
        setErrorMessage("To zaproszenie jest nieprawidłowe lub już wygasło.");
        return;
      }

      const destination = invite.recipient_has_account ? "/logowanie" : "/rejestracja";
      window.location.href = `${destination}?team_invite=${encodeURIComponent(token)}`;
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="text-center max-w-sm">
        {errorMessage ? (
          <>
            <h1 className="text-lg font-semibold text-white mb-2">Nie udało się otworzyć zaproszenia</h1>
            <p className="text-sm text-gray-400">{errorMessage}</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-400">Sprawdzamy zaproszenie…</p>
          </>
        )}
      </div>
    </div>
  );
}
