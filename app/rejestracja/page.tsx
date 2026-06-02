"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { storeAuthToken, redirectToApp } from "../../lib/auth/crossDomainAuth";
import { getInviteOnboardingPath } from "../../lib/auth/inviteOnboarding";
import { setAuthFlowOrigin } from "../../lib/auth/welcomeEmail";
import { getSessionId, getVariantAssignments } from "../../lib/ab-testing-ssg";
import {
  captureInviteEvent,
  identifyInvitedUser,
  registerInviteAttribution,
} from "../../lib/posthog/inviteAttribution";
import { Mail, Lock, ExternalLink, UserRoundCheck } from "lucide-react";
import InviteActivationOverlay, { type FullInviteData } from "../../components/invites/InviteActivationOverlay";
import { InviteCompanyCard } from "../../components/invites/InviteCompanyCard";

const INBOX_PROVIDERS: Record<string, { name: string; url: string }> = {
  "gmail.com":      { name: "Gmail",         url: "https://mail.google.com" },
  "googlemail.com": { name: "Gmail",         url: "https://mail.google.com" },
  "yahoo.com":      { name: "Yahoo Mail",    url: "https://mail.yahoo.com" },
  "yahoo.pl":       { name: "Yahoo Mail",    url: "https://mail.yahoo.com" },
  "outlook.com":    { name: "Outlook",       url: "https://outlook.live.com/mail" },
  "hotmail.com":    { name: "Outlook",       url: "https://outlook.live.com/mail" },
  "live.com":       { name: "Outlook",       url: "https://outlook.live.com/mail" },
  "o2.pl":          { name: "O2 Poczta",     url: "https://poczta.o2.pl" },
  "wp.pl":          { name: "WP Poczta",     url: "https://poczta.wp.pl" },
  "onet.pl":        { name: "Onet Poczta",   url: "https://poczta.onet.pl" },
  "interia.pl":     { name: "Interia",       url: "https://poczta.interia.pl" },
  "proton.me":      { name: "Proton Mail",   url: "https://mail.proton.me" },
  "protonmail.com": { name: "Proton Mail",   url: "https://mail.proton.me" },
  "icloud.com":     { name: "iCloud Mail",   url: "https://www.icloud.com/mail" },
  "me.com":         { name: "iCloud Mail",   url: "https://www.icloud.com/mail" },
};

import posthog from "posthog-js";

const INVITE_COOKIE_NAME = "ksiegai_invite_token";
const INVITE_STORAGE_KEY = "ksiegai_invite_token";
const LEGACY_INVITE_STORAGE_KEY = "pending_invite_token";
const INVITE_MAX_AGE = 90 * 24 * 60 * 60;

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getInboxProvider(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? (INBOX_PROVIDERS[domain] ?? null) : null;
}

function getStoredInviteToken() {
  if (typeof window === "undefined") return null;

  const legacyToken = localStorage.getItem(LEGACY_INVITE_STORAGE_KEY);
  if (legacyToken) return legacyToken;

  const canonicalToken = localStorage.getItem(INVITE_STORAGE_KEY);
  if (canonicalToken) return canonicalToken;

  const cookiePrefix = `${INVITE_COOKIE_NAME}=`;
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  return cookieToken ? decodeURIComponent(cookieToken) : null;
}

function persistInviteToken(token: string) {
  localStorage.setItem(LEGACY_INVITE_STORAGE_KEY, token);
  localStorage.setItem(INVITE_STORAGE_KEY, token);
  document.cookie = [
    `${INVITE_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "path=/",
    "domain=.ksiegai.pl",
    `max-age=${INVITE_MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}

function clearInviteToken() {
  localStorage.removeItem(LEGACY_INVITE_STORAGE_KEY);
  localStorage.removeItem(INVITE_STORAGE_KEY);
  localStorage.removeItem("pending_invite_company");
  document.cookie = [
    `${INVITE_COOKIE_NAME}=`,
    "path=/",
    "domain=.ksiegai.pl",
    "max-age=0",
    "SameSite=Lax",
  ].join("; ");
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.46 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
  </svg>
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const awaitingEmailConfirm = useRef(false);
  const suppressSignedInRedirect = useRef(false);
  const regMethod = useRef<"password" | "magic_link">("password");
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sessionId] = useState(() => getSessionId());
  const [variantAssignments, setVariantAssignments] = useState<Record<string, string>>({});
  const [isApplePlatform, setIsApplePlatform] = useState(false);
  const [inviteData, setInviteData] = useState<FullInviteData | null>(null);
  const [inviteStep, setInviteStep] = useState<"loading" | "form" | "none">("none");
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const tokenHashRef = useRef<string>("");
  const [activeSession, setActiveSession] = useState<{
    email: string | null;
    displayName: string;
  } | null>(null);

  useEffect(() => { setVariantAssignments(getVariantAssignments()); }, []);
  useEffect(() => { setIsApplePlatform(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)); }, []);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("invite");
    const token = urlToken || getStoredInviteToken();
    if (!token) return;

    setInviteStep("loading");
    persistInviteToken(token);
    if (urlToken) {
      const clean = new URL(window.location.href);
      clean.searchParams.delete("invite");
      window.history.replaceState({}, "", clean.toString());
    }
    sha256hex(token).then(async (hash) => {
      tokenHashRef.current = hash;
      const { data } = await (supabase.rpc as any)("lookup_admin_invite", { p_token_hash: hash });
      if (data?.is_valid) {
        registerInviteAttribution({
          invite_token_hash: hash,
          invite_token_prefix: token.slice(0, 12),
          invite_company_name: data.company_name ?? null,
          invite_recipient_email: data.recipient_email ?? null,
          invite_recipient_name: data.recipient_name ?? null,
          invite_company_type: data.company_type ?? null,
        });
        setInviteData(data);
        setEmail(data.recipient_email ?? "");
        if (data.company_name) {
          localStorage.setItem("pending_invite_company", data.company_name);
        }
        if (data.recipient_has_account) {
          window.location.href = `/logowanie?invite=${encodeURIComponent(token)}`;
          return;
        }
        captureInviteEvent("invite_registration_page_viewed", {
          page: "/rejestracja",
          company_name: data.company_name ?? null,
        });
        captureInviteEvent("invite_link_opened", {
          page: "/rejestracja",
          referrer: document.referrer || null,
        });
        if (document.referrer.includes("/poradnik/")) {
          captureInviteEvent("poradnik_card_clicked", {
            source_page: document.referrer,
            destination_page: "/rejestracja",
          });
        }
        captureInviteEvent("invite_company_prefilled", {
          page: "/rejestracja",
          company_name: data.company_name ?? null,
          recipient_email: data.recipient_email ?? null,
        });
        setInviteStep("form");
        setShowMobileOverlay(true);
      } else {
        clearInviteToken();
        setInviteStep("none");
      }
    });
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (suppressSignedInRedirect.current) {
        return;
      }

      if (session) {
        setActiveSession({
          email: session.user.email ?? null,
          displayName:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "użytkownika",
        });
      } else if (event === "SIGNED_OUT") {
        setActiveSession(null);
      }

      if (event === "SIGNED_IN" && session && !awaitingEmailConfirm.current) {
        posthog.identify(session.user.id, { email: session.user.email });
        void trackConversion(session.user.id);
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });
        redirectToApp("/");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [variantAssignments, sessionId]);

  useEffect(() => {
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setActiveSession({
        email: session.user.email ?? null,
        displayName:
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "użytkownika",
      });
    })();
  }, []);

  const trackConversion = async (userId: string) => {
    try {
      const key = `ab_registration_conversion_sent:${sessionId}:${userId}`;
      if (typeof window !== "undefined" && localStorage.getItem(key) === "1") return;
      const method = useMagicLink ? "magic_link" : "password";
      const { error } = await (supabase.rpc as any)("track_registration_conversion", {
        p_session_id: sessionId,
        p_registration_method: method,
      });
      if (error) {
        for (const [testId, variantId] of Object.entries(variantAssignments || {})) {
          await fetch("/api/ab-track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              test_id: testId, variant_id: variantId, session_id: sessionId,
              event_type: "signup", event_name: "registration_completed",
              event_metadata: { registration_method: method, user_id: userId },
              page_path: "/rejestracja",
            }),
          });
        }
      }
      if (typeof window !== "undefined") localStorage.setItem(key, "1");
    } catch (err) {
      console.error("Error tracking registration conversion:", err);
    }
  };

const handlePasswordRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) { setError("Podaj adres e-mail"); return; }
    if (password.length < 6) { setError("Hasło musi mieć co najmniej 6 znaków"); return; }

    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirm("");
      setShowConfirm(false);
      setError("Hasła się nie zgadzają. Wpisz hasło ponownie.");
      return;
    }

    setLoading(true);
    setAuthFlowOrigin("register");
    const pendingToken = getStoredInviteToken();

    // ── Invited user — auto-confirm, no verify screen ─────────────────────────
    if (inviteData && pendingToken) {
      try {
        const tokenHash = await sha256hex(pendingToken);
        captureInviteEvent("invite_registration_started", {
          method: "password",
          page: "/rejestracja",
        });
        captureInviteEvent("invite_registration_method_selected_password", {
          page: "/rejestracja",
        });
        captureInviteEvent("invite_password_submitted", {
          method: "password",
          page: "/rejestracja",
        });
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const res = await fetch(`${supabaseUrl}/functions/v1/register-invited-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": anonKey },
          body: JSON.stringify({ email, password, token_hash: tokenHash }),
        });
        const result = await res.json();

        if (!res.ok || result.error) {
          const msg = (result.error ?? "").toLowerCase();
          if (msg.includes("already") || msg.includes("exists")) {
            window.location.href = "/logowanie";
            return;
          }
          setError(result.error ?? "Nie udało się założyć konta. Spróbuj ponownie.");
          setLoading(false);
          return;
        }

        suppressSignedInRedirect.current = true;
        await supabase.auth.setSession({
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        });

        identifyInvitedUser(result.user_id, result.user_email);
        posthog.capture("register_password_signup", { invite: true });
        await trackConversion(result.user_id);

        storeAuthToken({
          access_token: result.access_token,
          refresh_token: result.refresh_token,
          expires_at: result.expires_at || 0,
          user_id: result.user_id,
        });

        const { data: claimData, error: claimError } = await (supabase.rpc as any)("claim_admin_invite", {
          p_token_hash: tokenHash,
        });

        if (!claimError && claimData) {
          const { business_profile_id, company_name, invite_id, campaign_source } = claimData;
          identifyInvitedUser(result.user_id, result.user_email, {
            invited: true,
            invite_id,
            invite_company_name: company_name,
            invite_business_profile_id: business_profile_id,
            ...(campaign_source ? { invite_campaign_source: campaign_source } : {}),
          });
          posthog.capture("invite_claimed", { business_profile_id, company_name, invite_id });
          captureInviteEvent("business_activated", {
            business_profile_id,
            company_name,
            invite_id,
          });
          void supabase.auth.updateUser({
            data: {
              invite_id,
              invite_company_name: company_name,
              invite_campaign_source: campaign_source ?? null,
              invite_token_hash: tokenHash,
              invite_recipient_email: inviteData.recipient_email ?? result.user_email ?? null,
              invite_company_type: inviteData.company_type ?? null,
              invite_business_profile_id: business_profile_id,
            },
          });
          clearInviteToken();
          captureInviteEvent("invite_registration_completed", {
            method: "password",
            business_profile_id,
            company_name,
            invite_id,
          });
          captureInviteEvent("invite_onboarding_started", {
            business_profile_id,
            company_name,
            invite_id,
          });
          if (typeof window !== "undefined" && "PasswordCredential" in window) {
            try {
              const cred = new (window as any).PasswordCredential({ id: email, password });
              await navigator.credentials.store(cred);
            } catch { /* browser may decline silently */ }
          }
          redirectToApp(getInviteOnboardingPath(inviteData.company_type), {
            invite: "1",
            bp: business_profile_id,
            cn: company_name,
          });
        } else {
          redirectToApp("/onboard");
        }
        return;
      } catch (err) {
        console.error("[Register] invited password registration failed:", err);
        suppressSignedInRedirect.current = false;
        setError("Nie udało się dokończyć rejestracji. Spróbuj ponownie.");
        setLoading(false);
        return;
      }
    }

    // ── Regular (non-invited) registration — email verification required ──────
    awaitingEmailConfirm.current = true;
    regMethod.current = "password";
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?reg=password` },
    });
    setLoading(false);

    if (err) {
      awaitingEmailConfirm.current = false;
      const msg = err.message?.toLowerCase() ?? "";
      setError(
        msg.includes("already registered") || msg.includes("already exists")
          ? "Konto z tym adresem już istnieje. Zaloguj się."
          : "Nie udało się założyć konta. Spróbuj ponownie."
      );
      return;
    }

    posthog.capture("register_password_signup");
    setConfirmed(email);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) { setError("Podaj adres e-mail"); return; }

    setLoading(true);
    setAuthFlowOrigin("register");
    awaitingEmailConfirm.current = true;
    regMethod.current = "magic_link";
    const pendingToken = getStoredInviteToken();
    const inviteParam = pendingToken ? `reg=invite&inv=${await sha256hex(pendingToken)}` : `reg=magic_link`;
    if (pendingToken) {
      captureInviteEvent("invite_registration_started", {
        method: "magic_link",
        page: "/rejestracja",
      });
    }
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?${inviteParam}` },
    });
    setLoading(false);

    if (err) {
      awaitingEmailConfirm.current = false;
      setError("Nie udało się wysłać linku. Spróbuj ponownie.");
      return;
    }

    posthog.capture("register_magic_link_sent");
    setConfirmed(email);
    setResendCooldown(60);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?reg=${regMethod.current}` },
    });
    setLoading(false);
    if (err) setError("Nie udało się wysłać linku. Spróbuj ponownie.");
    else setResendCooldown(60);
  };

  const buildOAuthCallbackUrl = async (): Promise<string> => {
    const pendingToken = getStoredInviteToken();
    if (pendingToken) {
      const hash = await sha256hex(pendingToken);
      return `${window.location.origin}/auth/callback?reg=invite&inv=${hash}`;
    }
    return `${window.location.origin}/auth/callback`;
  };

  const handleGoogle = async () => {
    posthog.capture("register_google_clicked");
    if (inviteData) {
      captureInviteEvent("invite_registration_method_selected_google", { page: "/rejestracja" });
    }
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("register");
    const redirectTo = await buildOAuthCallbackUrl();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (err) { setError("Nie udało się zalogować przez Google."); setLoading(false); }
  };

  const handleApple = async () => {
    posthog.capture("register_apple_clicked");
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("register");
    const redirectTo = await buildOAuthCallbackUrl();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo },
    });
    if (err) { setError("Nie udało się zalogować przez Apple."); setLoading(false); }
  };

  // ─── Invite loading skeleton ─────────────────────────────────────────────────
  if (inviteStep === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-lg animate-pulse space-y-4">
          <div className="h-7 w-52 rounded-full bg-slate-800" />
          <div className="rounded-[20px] border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="px-6 pt-6 pb-5 border-b border-slate-800 space-y-3">
              <div className="h-6 w-3/4 rounded bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-800/60" />
              <div className="flex gap-2 mt-3">
                <div className="h-6 w-24 rounded-full bg-slate-800" />
                <div className="h-6 w-20 rounded-full bg-slate-800" />
                <div className="h-6 w-28 rounded-full bg-slate-800" />
              </div>
            </div>
            <div className="px-6 py-4 border-b border-slate-800 space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-56 rounded bg-slate-800/60" />
              ))}
            </div>
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/30">
              <div className="h-3 w-24 rounded bg-slate-800 mb-2" />
              <div className="h-4 w-48 rounded bg-slate-800" />
            </div>
            <div className="px-6 py-5">
              <div className="h-12 w-full rounded-xl bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Confirmation screen ─────────────────────────────────────────────────────
  if (confirmed) {
    const provider = getInboxProvider(confirmed);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sprawdź skrzynkę
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Wysłaliśmy link aktywacyjny na:
            </p>
            <p className="font-semibold text-gray-900 dark:text-white mb-2">{confirmed}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Kliknij link w e-mailu — zostaniesz zalogowany automatycznie.
            </p>

            {provider && (
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mb-4"
              >
                <ExternalLink className="h-4 w-4" />
                Otwórz {provider.name}
              </a>
            )}

            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || loading}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Wyślij ponownie (${resendCooldown}s)` : "Nie dotarł? Wyślij ponownie"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main form ───────────────────────────────────────────────────────────────

  const activeSessionBanner = activeSession ? (
    <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/30">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
          <UserRoundCheck className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Jesteś już zalogowany jako {activeSession.displayName}
          </p>
          {activeSession.email ? (
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">{activeSession.email}</p>
          ) : null}
          <p className="mt-2 text-xs text-emerald-800 dark:text-emerald-200">
            Rejestrujesz nowe konto? Jeśli nie, przejdź od razu do aplikacji.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) { setActiveSession(null); return; }
                storeAuthToken({
                  access_token: session.access_token,
                  refresh_token: session.refresh_token,
                  expires_at: session.expires_at || 0,
                  user_id: session.user.id,
                });
                redirectToApp("/");
              }}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Przejdź do aplikacji
            </button>
            <button
              type="button"
              onClick={() => setActiveSession(null)}
              className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
            >
              Rejestruję nowe konto
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  // ─── Auth card for invited users ────────────────────────────────────────────
  const inviteAuthCardContent = inviteData ? (
    <>
      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon className="h-5 w-5 shrink-0" />
        Kontynuuj z Google
      </button>

      {isApplePlatform && (
        <button
          onClick={handleApple}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AppleIcon className="h-5 w-5 shrink-0" />
          Kontynuuj przez Apple
        </button>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {useMagicLink ? "lub wyślij link na ten adres" : "lub ustaw hasło"}
        </span>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
      </div>

      {/* Locked invite email — read-only display, not an input */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
            E-mail zaproszenia
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {inviteData.recipient_email}
          </p>
        </div>
        <Lock className="h-4 w-4 text-gray-300 dark:text-gray-600 shrink-0" />
      </div>

      {!useMagicLink ? (
        <form onSubmit={handlePasswordRegister} className="space-y-3">
          {/* Hidden email field so browsers associate the password with the right account */}
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
          />
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Ustaw hasło, żeby odblokować dostęp i skonfigurować KSeF.
            </p>
            <style>{`
              @keyframes pw-border-shimmer {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .pw-gradient-border {
                background: linear-gradient(270deg, #1d4ed8, #3b82f6, #60a5fa, #3b82f6, #1d4ed8);
                background-size: 300% 300%;
                animation: pw-border-shimmer 3s ease infinite;
                padding: 2px;
                border-radius: 13px;
              }
            `}</style>
            <div className="pw-gradient-border">
              <div className="relative rounded-[11px] overflow-hidden bg-white dark:bg-gray-700">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 z-10" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (showConfirm) { setShowConfirm(false); setPasswordConfirm(""); }
                  }}
                  onBlur={() => { if (password.length >= 6) setShowConfirm(true); }}
                  required
                  autoComplete="new-password"
                  placeholder="Hasło"
                  autoFocus
                  className="w-full pl-9 pr-4 py-3.5 border-0 focus:outline-none focus:ring-0 text-sm bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {showConfirm && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
                autoFocus
                placeholder="Powtórz hasło"
                className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Aktywowanie…" : "Odblokuj dostęp"}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            <button
              type="button"
              onClick={() => { setUseMagicLink(true); setError(null); }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wyślij link zamiast hasła
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-3">
          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Wysyłanie…" : "Wyślij link logowania"}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            <button
              type="button"
              onClick={() => { setUseMagicLink(false); setError(null); }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wróć do rejestracji hasłem
            </button>
          </p>
        </form>
      )}

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-1">
        Rejestrując się, akceptujesz{" "}
        <a href="/regulamin" className="hover:underline">Regulamin</a>{" "}
        i{" "}
        <a href="/polityka-prywatnosci" className="hover:underline">Politykę prywatności</a>.
      </p>
    </>
  ) : null;

  // ─── Auth card for regular (non-invited) users ───────────────────────────────
  const authCardContent = (
    <>
      {/* OAuth */}
      <button
        onClick={handleGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon className="h-5 w-5 shrink-0" />
        Kontynuuj przez Google
      </button>

      {isApplePlatform && (
        <button
          onClick={handleApple}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AppleIcon className="h-5 w-5 shrink-0" />
          Kontynuuj przez Apple
        </button>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        <span className="text-xs text-gray-400 dark:text-gray-500">lub e-mailem</span>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
      </div>

      {/* Email form */}
      {!useMagicLink ? (
        <form onSubmit={handlePasswordRegister} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="twoj@email.pl"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (showConfirm) { setShowConfirm(false); setPasswordConfirm(""); }
              }}
              onBlur={() => { if (password.length >= 6) setShowConfirm(true); }}
              required
              autoComplete="new-password"
              placeholder="Hasło (min. 6 znaków)"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          {showConfirm && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
                autoFocus
                placeholder="Powtórz hasło"
                className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Zakładanie konta…" : "Załóż konto"}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            Wolisz bez hasła?{" "}
            <button
              type="button"
              onClick={() => { setUseMagicLink(true); setError(null); }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wyślij link na e-mail
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="email-magic"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="twoj@email.pl"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Wysyłanie…" : "Wyślij link logowania"}
          </button>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            <button
              type="button"
              onClick={() => { setUseMagicLink(false); setError(null); }}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Wróć do rejestracji hasłem
            </button>
          </p>
        </form>
      )}

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-1">
        Rejestrując się, akceptujesz{" "}
        <a href="/regulamin" className="hover:underline">Regulamin</a>{" "}
        i{" "}
        <a href="/polityka-prywatnosci" className="hover:underline">Politykę prywatności</a>.
      </p>
    </>
  );

  // ─── Two-column invite layout (desktop) / form + overlay (mobile) ───────────
  if (inviteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-start justify-center p-4 py-6 lg:py-8">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">

            {/* ── Left: Company sidebar (desktop only) ── */}
            <div className="hidden lg:block">
              <InviteCompanyCard invite={inviteData} />
            </div>

            {/* ── Right: Auth card ── */}
            <div className="min-w-0">
              {activeSessionBanner}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Odblokuj dostęp</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Aktywuj profil {inviteData.company_name} i przejdź do konfiguracji KSeF.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-7 space-y-4">
                {inviteAuthCardContent}
              </div>
              <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Masz już konto w KsięgaI?</p>
                <a
                  href="/logowanie"
                  className="mt-2 inline-block w-full rounded-xl border border-blue-300 dark:border-blue-700 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Zaloguj się i połącz z zaproszeniem
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile overlay — same card shown on desktop left, as a bottom sheet */}
        {showMobileOverlay && (
          <InviteActivationOverlay
            invite={inviteData}
            onContinue={() => setShowMobileOverlay(false)}
          />
        )}
      </div>
    );
  }

  // ─── Regular (no invite) single-column layout ─────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {activeSessionBanner}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Zacznij za darmo</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Bez karty płatniczej &nbsp;·&nbsp; Faktury od razu &nbsp;·&nbsp; Zgodne z KSeF
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-7 space-y-4">
          {authCardContent}
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          Masz już konto?{" "}
          <a href="/logowanie" className="text-blue-600 hover:underline font-medium">Zaloguj się</a>
        </p>
      </div>
    </div>
  );
}
