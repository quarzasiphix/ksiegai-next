"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { storeAuthToken, redirectToApp } from "../../lib/auth/crossDomainAuth";
import { setAuthFlowOrigin } from "../../lib/auth/welcomeEmail";
import { getSessionId, getVariantAssignments } from "../../lib/ab-testing-ssg";
import { Mail, Lock, ExternalLink } from "lucide-react";

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

function getInboxProvider(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? (INBOX_PROVIDERS[domain] ?? null) : null;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const awaitingEmailConfirm = useRef(false);
  const regMethod = useRef<"password" | "magic_link">("password");
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sessionId] = useState(() => getSessionId());
  const [variantAssignments, setVariantAssignments] = useState<Record<string, string>>({});
  const [isApplePlatform, setIsApplePlatform] = useState(false);

  useEffect(() => { setVariantAssignments(getVariantAssignments()); }, []);
  useEffect(() => { setIsApplePlatform(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)); }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session && !awaitingEmailConfirm.current) {
        posthog.identify(session.user.id, { email: session.user.email });
        await trackConversion(session.user.id);
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

    setLoading(true);
    setAuthFlowOrigin("register");
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
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?reg=magic_link` },
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

  const handleGoogle = async () => {
    posthog.capture("register_google_clicked");
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("register");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (err) { setError("Nie udało się zalogować przez Google."); setLoading(false); }
  };

  const handleApple = async () => {
    posthog.capture("register_apple_clicked");
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("register");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (err) { setError("Nie udało się zalogować przez Apple."); setLoading(false); }
  };

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Zacznij za darmo
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Bez karty płatniczej &nbsp;·&nbsp; Faktury od razu &nbsp;·&nbsp; Zgodne z KSeF
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-7 space-y-4">

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
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="twoj@email.pl"
                  className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Hasło (min. 6 znaków)"
                  className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="twoj@email.pl"
                  className="w-full pl-9 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
          Masz już konto?{" "}
          <a href="/logowanie" className="text-blue-600 hover:underline font-medium">
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}
