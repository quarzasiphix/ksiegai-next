"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { publicApiAction } from "../../../lib/gateway";
import { storeAuthToken, redirectToApp } from "../../../lib/auth/crossDomainAuth";
import { getInviteOnboardingPath } from "../../../lib/auth/inviteOnboarding";
import { consumeAuthFlowOrigin, sendWelcomeEmailIfNewUser } from "../../../lib/auth/welcomeEmail";
import {
  clearPendingLoginAttempt,
  getPendingLoginAttempt,
  getPendingLoginLabel,
  saveRememberedProfile,
  saveRememberedProfileAuthToken,
  setPreferredLoginProfile,
} from "../../../lib/auth/loginProfiles";
import posthog from "posthog-js";
import {
  captureInviteEvent,
  identifyInvitedUser,
  registerInviteAttribution,
} from "../../../lib/posthog/inviteAttribution";
import { clearAnonInvoiceId } from "../../../lib/invoice-tools/anonInvoiceClaim";

export default function AuthCallback() {
  const [pendingLoginLabel, setPendingLoginLabel] = useState<string | null>(null);

  useEffect(() => {
    const initialPendingAttempt = getPendingLoginAttempt();
    setPendingLoginLabel(getPendingLoginLabel(initialPendingAttempt));

    const handleCallback = async () => {
      // Handle OAuth callback - exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error('Auth callback error:', error);
        posthog.captureException(error);
        clearPendingLoginAttempt();
        window.location.href = '/rejestracja?error=auth_failed';
        return;
      }

      const { session } = data;

      if (session) {
        posthog.identify(session.user.id, { email: session.user.email });
        const authFlowOrigin = consumeAuthFlowOrigin();
        posthog.capture('auth_callback_completed', { flow: authFlowOrigin ?? 'unknown' });
        const pendingAttempt = getPendingLoginAttempt();
        const rememberedProfile = saveRememberedProfile(session.user, pendingAttempt?.method ?? null);
        if (rememberedProfile) {
          setPreferredLoginProfile({
            userId: rememberedProfile.userId,
            email: rememberedProfile.email,
          });
        }
        clearPendingLoginAttempt();
        setPendingLoginLabel(
          rememberedProfile?.email || rememberedProfile?.displayName || session.user.email || null,
        );
        saveRememberedProfileAuthToken(session.user, {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        // Parse URL params early — needed for both welcome email and redirect logic
        const urlParams = new URLSearchParams(window.location.search);
        const redirectFrom = urlParams.get('from');
        const localhostPort = urlParams.get('port');
        const regParam = urlParams.get('reg'); // 'password' | 'magic_link' | 'invite'
        const inviteHash = urlParams.get('inv'); // SHA-256 hash of invite token (reg=invite only)
        const anonInvoiceId = urlParams.get('av'); // free-invoice-generator submission_id (self-serve claim)

        // ── Invite claim flow ─────────────────────────────────────────────────
        if (regParam === 'invite' && inviteHash) {
          const inviteLookup = await publicApiAction<{ invite: any }>('invite.lookup', { tokenHash: inviteHash })
            .then((result) => result.invite)
            .catch(() => null);
          registerInviteAttribution({
            invite_token_hash: inviteHash,
            invite_token_prefix: inviteHash.slice(0, 12),
            invite_company_name: inviteLookup?.company_name ?? null,
            invite_recipient_email: inviteLookup?.recipient_email ?? session.user.email ?? null,
            invite_recipient_name: inviteLookup?.recipient_name ?? null,
            invite_company_type: inviteLookup?.company_type ?? null,
          });
          posthog.capture('invite_email_confirmed', { invite_hash_prefix: inviteHash.slice(0, 8) });
          try {
            let claimData: unknown = null;
            let claimError: unknown = null;
            try {
              const result = await publicApiAction<{ claim: any }>('invite.claim', { tokenHash: inviteHash }, session.access_token);
              claimData = result.claim;
            } catch (err) {
              claimError = err;
            }
            const token = {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at || 0,
              user_id: session.user.id,
            };
            storeAuthToken(token);
            if (claimError || !claimData) {
              console.error('[AuthCallback] Invite claim failed:', claimError);
              posthog.captureException(claimError);
              redirectToApp('/onboard');
              return;
            }
            const { business_profile_id, company_name, invite_id, campaign_source } = claimData as {
              business_profile_id: string;
              company_name: string;
              invite_id: string;
              campaign_source: string | null;
            };

            // Tag user in PostHog with invite properties (person-level, permanent)
            identifyInvitedUser(session.user.id, session.user.email, {
              invited: true,
              invite_id,
              invite_company_name: company_name,
              invite_business_profile_id: business_profile_id,
              ...(campaign_source ? { invite_campaign_source: campaign_source } : {}),
            });
            // Store the registration session so admin can link to it from the invite page
            const registrationSessionId = (posthog as any)?.get_session_id?.();
            if (registrationSessionId) {
              void (supabase.rpc as any)('update_posthog_session', { p_session_id: registrationSessionId }).catch(() => {});
            }
            posthog.capture('invite_claimed', {
              business_profile_id,
              company_name,
              invite_id,
              campaign_source: campaign_source ?? null,
            });
            captureInviteEvent('business_activated', {
              business_profile_id,
              company_name,
              invite_id,
              campaign_source: campaign_source ?? null,
            });

            // Attach invite metadata to the auth user for future queries.
            // Awaited: the cross-domain redirect right below bridges the
            // session to app.ksiegai.pl immediately, and OnboardingSpzoo/Jdg
            // read this metadata via getInviteResumeContext(user) on first
            // render there — if this write hadn't landed yet, that context
            // came back null and the invite-continuation UI didn't show.
            const { error: updateUserError } = await supabase.auth.updateUser({
              data: {
                invite_id,
                invite_company_name: company_name,
                invite_campaign_source: campaign_source ?? null,
                invite_token_hash: inviteHash,
                invite_recipient_email: inviteLookup?.recipient_email ?? session.user.email ?? null,
                invite_company_type: inviteLookup?.company_type ?? null,
                invite_business_profile_id: business_profile_id,
              },
            });
            if (updateUserError) {
              console.error('[AuthCallback] Failed to attach invite metadata:', updateUserError);
              posthog.captureException(updateUserError);
            }

            // Clear the raw token and cached company from localStorage — invite consumed
            localStorage.removeItem('pending_invite_token');
            localStorage.removeItem('pending_invite_company');

            const dest = getInviteOnboardingPath(inviteLookup?.company_type ?? null);
            if (redirectFrom === 'localhost' && localhostPort) {
              window.location.href = `http://localhost:${localhostPort}${dest}?invite=1&bp=${business_profile_id}&cn=${encodeURIComponent(company_name)}`;
            } else {
              redirectToApp(dest, {
                invite: "1",
                bp: business_profile_id,
                cn: company_name,
              });
            }
            return;
          } catch (err) {
            console.error('[AuthCallback] Unexpected invite claim error:', err);
            storeAuthToken({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at || 0,
              user_id: session.user.id,
            });
            redirectToApp('/onboard');
            return;
          }
        }

        // ── Free-invoice-generator "claim your company" flow ──────────────────
        if (anonInvoiceId) {
          posthog.capture('free_invoice_claim_email_confirmed', { submission_id_prefix: anonInvoiceId.slice(0, 8) });
          try {
            const { data: claimData, error: claimError } = await (supabase.rpc as any)('claim_anonymous_invoice', {
              p_submission_id: anonInvoiceId,
            });
            const token = {
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at || 0,
              user_id: session.user.id,
            };
            storeAuthToken(token);
            if (claimError) {
              console.error('[AuthCallback] Anonymous invoice claim failed:', claimError);
              posthog.captureException(claimError);
              redirectToApp('/onboard');
              return;
            }
            const { business_profile_id, company_name, company_type } = claimData as {
              business_profile_id: string;
              company_name: string;
              company_type: string;
            };

            posthog.capture('free_invoice_claimed', { business_profile_id, company_name, company_type });

            // Same three user_metadata keys the admin-invite flow sets — ksef-ai's
            // onboarding-resume logic (getInviteResumeContext) reads these generically,
            // regardless of whether the origin was an admin invite or a self-serve claim.
            const { error: updateUserError } = await supabase.auth.updateUser({
              data: {
                invite_business_profile_id: business_profile_id,
                invite_company_name: company_name,
                invite_company_type: company_type,
              },
            });
            if (updateUserError) {
              console.error('[AuthCallback] Failed to attach anon-invoice claim metadata:', updateUserError);
              posthog.captureException(updateUserError);
            }

            clearAnonInvoiceId();

            const dest = getInviteOnboardingPath(company_type);
            if (redirectFrom === 'localhost' && localhostPort) {
              window.location.href = `http://localhost:${localhostPort}${dest}?invite=1&bp=${business_profile_id}&cn=${encodeURIComponent(company_name)}`;
            } else {
              redirectToApp(dest, { invite: '1', bp: business_profile_id, cn: company_name });
            }
            return;
          } catch (err) {
            console.error('[AuthCallback] Unexpected anon-invoice claim error:', err);
            storeAuthToken({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at || 0,
              user_id: session.user.id,
            });
            redirectToApp('/onboard');
            return;
          }
        }

        // Welcome email must not delay the cross-domain auth handoff.
        // Use ?reg param (URL-encoded, survives new-tab opens) as primary signal;
        // fall back to sessionStorage authFlowOrigin for older links without ?reg.
        void sendWelcomeEmailIfNewUser({
          userId: session.user.id,
          email: session.user.email,
          createdAt: session.user.created_at,
          force: !!regParam || authFlowOrigin === "register",
        });

        // Store token for cross-domain access
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        // Check if we need to redirect back to localhost
        const localhostRedirect = sessionStorage.getItem('localhost_redirect');
        if (localhostRedirect) {
          const { from, port } = JSON.parse(localhostRedirect);
          console.log("[AuthCallback] Redirecting back to localhost:", port);
          sessionStorage.removeItem('localhost_redirect');

          // Redirect back to localhost
          window.location.href = `http://localhost:${port}/dashboard`;
          return;
        }

        if (redirectFrom === 'localhost' && localhostPort) {
          console.log("[AuthCallback] Redirecting back to localhost from URL params:", localhostPort);
          const dest = regParam ? `/welcome?flow=${regParam}` : '/dashboard';
          window.location.href = `http://localhost:${localhostPort}${dest}`;
          return;
        }

        // For registrations redirect to onboarding; for logins go to root
        const onboardingPath = regParam ? `/welcome?flow=${regParam}` : '/';
        redirectToApp(onboardingPath);
      } else {
        // No session, redirect to registration
        clearPendingLoginAttempt();
        window.location.href = '/rejestracja';
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          {pendingLoginLabel ? `Logowanie użytkownika ${pendingLoginLabel}...` : "Logowanie..."}
        </p>
      </div>
    </div>
  );
}
