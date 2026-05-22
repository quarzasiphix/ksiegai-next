"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  redirectToApp,
  restoreSessionFromAuthToken,
  storeAuthToken,
  storeAndRedirect,
} from "../../lib/auth/crossDomainAuth";
import { setAuthFlowOrigin } from "../../lib/auth/welcomeEmail";
import {
  clearPendingLoginAttempt,
  createPendingLoginAttempt,
  getRememberedProfileAuthToken,
  getPreferredLoginProfile,
  getPendingLoginAttempt,
  getPendingLoginLabel,
  loadRememberedProfiles,
  removeRememberedProfile,
  removeRememberedProfileAuthToken,
  saveRememberedProfile,
  saveRememberedProfileAuthToken,
  setPreferredLoginProfile,
  setPendingLoginAttempt as persistPendingLoginAttempt,
  type PendingLoginAttempt,
  type RememberedLoginProfile,
} from "../../lib/auth/loginProfiles";
import { Mail, Lock, Loader2, UserRoundCheck, X } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

// Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Apple Icon Component
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.46 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionBootstrapping, setSessionBootstrapping] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [rememberedProfiles, setRememberedProfiles] = useState<RememberedLoginProfile[]>([]);
  const [pendingLoginAttempt, setPendingLoginAttemptState] = useState<PendingLoginAttempt | null>(null);
  const [activeSessionProfile, setActiveSessionProfile] = useState<RememberedLoginProfile | null>(null);
  const [selectedSavedPasswordProfile, setSelectedSavedPasswordProfile] = useState<RememberedLoginProfile | null>(null);
  const [isApplePlatform, setIsApplePlatform] = useState(false);

  const refreshRememberedProfiles = () => {
    const profiles = loadRememberedProfiles();
    setRememberedProfiles(profiles);

    if (!email && !selectedSavedPasswordProfile) {
      const latestProfile = profiles[0];
      if (latestProfile?.email) {
        setEmail(latestProfile.email);
      }
    }
  };

  const setPendingAttempt = (attempt: PendingLoginAttempt) => {
    setPendingLoginAttemptState(attempt);
    persistPendingLoginAttempt(attempt);
  };

  const applyAuthenticatedSession = async (session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) => {
    if (!session) return null;

    const pendingAttempt = getPendingLoginAttempt();
    const rememberedProfile = saveRememberedProfile(session.user, pendingAttempt?.method ?? null);
    const sessionProfile =
      rememberedProfile ??
      ({
        userId: session.user.id,
        email: session.user.email ?? "",
        displayName:
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          session.user.email?.split("@")[0] ||
          "Użytkownik",
        avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
        lastLoginMethod: pendingAttempt?.method ?? null,
        lastUsedAt: new Date().toISOString(),
      } satisfies RememberedLoginProfile);

    clearPendingLoginAttempt();
    setPendingLoginAttemptState(null);
    setActiveSessionProfile(sessionProfile);
    setSelectedSavedPasswordProfile(null);
    setEmail(sessionProfile.email);
    setPreferredLoginProfile({
      userId: sessionProfile.userId,
      email: sessionProfile.email,
    });
    saveRememberedProfileAuthToken(session.user, {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at || 0,
      user_id: session.user.id,
    });
    refreshRememberedProfiles();

    return sessionProfile;
  };

  const resumeSessionIfPossible = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await applyAuthenticatedSession(session);
      return session;
    }

    const { restored } = await restoreSessionFromAuthToken((tokens) =>
      supabase.auth.setSession(tokens),
    );
    if (!restored) {
      return null;
    }
    const {
      data: { session: restoredSession },
    } = await supabase.auth.getSession();
    if (restoredSession) {
      await applyAuthenticatedSession(restoredSession);
    }
    return restoredSession ?? null;
  };

  const resumeSavedProfileSession = async (profile: RememberedLoginProfile) => {
    const profileToken = getRememberedProfileAuthToken(profile);
    if (!profileToken) {
      return false;
    }

    setLoading(true);
    const { restored } = await restoreSessionFromAuthToken(
      (tokens) => supabase.auth.setSession(tokens),
      {
        token: profileToken,
        onRestoreFailure: () => {
          removeRememberedProfileAuthToken(profile.userId);
        },
      },
    );

    if (!restored) {
      refreshRememberedProfiles();
      setLoading(false);
      return false;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setLoading(false);
      return false;
    }

    await applyAuthenticatedSession(session);
    storeAndRedirect({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at || 0,
      user_id: session.user.id,
    });
    setLoading(false);
    return true;
  };

  useEffect(() => {
    setIsApplePlatform(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    let isMounted = true;

    refreshRememberedProfiles();
    setPendingLoginAttemptState(getPendingLoginAttempt());
    const preferredProfile = getPreferredLoginProfile();
    if (preferredProfile) {
      setSelectedSavedPasswordProfile(
        preferredProfile.lastLoginMethod === "password" ? preferredProfile : null,
      );
      setEmail(preferredProfile.email);
      setUseMagicLink(preferredProfile.lastLoginMethod === "magic_link");
    }

    void (async () => {
      try {
        await resumeSessionIfPossible();
      } finally {
        if (isMounted) {
          setSessionBootstrapping(false);
        }
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
        if (event === 'SIGNED_IN') {
          posthog.identify(session.user.id, { email: session.user.email });
        }
        const hadPendingAttempt = Boolean(getPendingLoginAttempt());
        const sessionProfile = await applyAuthenticatedSession(session);
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });
        if (sessionProfile && isMounted) {
          setActiveSessionProfile(sessionProfile);
        }
        if (hadPendingAttempt) {
          redirectToApp('/dashboard');
        }
      } else if (event === 'SIGNED_OUT' && isMounted) {
        setActiveSessionProfile(null);
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    await startMagicLinkLogin(email, selectedSavedPasswordProfile?.displayName);
  };

  const startMagicLinkLogin = async (nextEmail: string, displayName?: string) => {
    setError(null);

    if (!nextEmail) {
      setError("Podaj adres e-mail");
      return false;
    }

    posthog.capture('login_initiated', { method: 'magic_link' });
    setLoading(true);
    setAuthFlowOrigin("login");
    const pendingAttempt = createPendingLoginAttempt({
      email: nextEmail,
      displayName,
      method: "magic_link",
    });
    setPendingAttempt(pendingAttempt);
    const { error } = await supabase.auth.signInWithOtp({
      email: nextEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) {
      clearPendingLoginAttempt();
      setPendingLoginAttemptState(null);
      posthog.capture('login_failed', { method: 'magic_link' });
      setError("Nie udało się wysłać linku. Spróbuj ponownie.");
      return false;
    }

    posthog.capture('magic_link_sent', { flow: 'login' });
    setEmail(nextEmail);
    setMagicLinkSent(true);
    setResendCooldown(60);
    return true;
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Podaj e-mail i hasło");
      return;
    }

    posthog.capture('login_initiated', { method: 'password' });
    setLoading(true);
    const pendingAttempt = createPendingLoginAttempt({
      email,
      displayName: selectedSavedPasswordProfile?.displayName,
      method: "password",
    });
    setPendingAttempt(pendingAttempt);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      clearPendingLoginAttempt();
      setPendingLoginAttemptState(null);
      posthog.capture('login_failed', { method: 'password' });
      setError("Nieprawidłowy e-mail lub hasło");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    await startMagicLinkLogin(email, selectedSavedPasswordProfile?.displayName);
  };

  const handleGoogleSignIn = async () => {
    posthog.capture('login_google_clicked');
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("login");
    const resolvedEmail = selectedSavedPasswordProfile?.email || email;
    const selectedProfile =
      selectedSavedPasswordProfile ||
      rememberedProfiles.find((profile) => profile.email === resolvedEmail.trim().toLowerCase());
    const pendingAttempt = createPendingLoginAttempt({
      email: resolvedEmail,
      displayName: selectedProfile?.displayName || "konto Google",
      method: "google",
    });
    setPendingAttempt(pendingAttempt);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (err) {
      clearPendingLoginAttempt();
      setPendingLoginAttemptState(null);
      setError("Nie udało się zalogować przez Google. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    posthog.capture('login_apple_clicked');
    setError(null);
    setLoading(true);
    setAuthFlowOrigin("login");
    const resolvedEmail = selectedSavedPasswordProfile?.email || email;
    const selectedProfile =
      selectedSavedPasswordProfile ||
      rememberedProfiles.find((profile) => profile.email === resolvedEmail.trim().toLowerCase());
    const pendingAttempt = createPendingLoginAttempt({
      email: resolvedEmail,
      displayName: selectedProfile?.displayName || "konto Apple",
      method: "apple",
    });
    setPendingAttempt(pendingAttempt);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      clearPendingLoginAttempt();
      setPendingLoginAttemptState(null);
      setError("Nie udało się zalogować przez Apple. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  const handleProfileSelect = (profile: RememberedLoginProfile) => {
    void handleSavedProfileContinue(profile);
  };

  const handleSavedProfileContinue = async (profile: RememberedLoginProfile) => {
    setError(null);
    setMagicLinkSent(false);
    setEmail(profile.email);
    setPreferredLoginProfile({
      userId: profile.userId,
      email: profile.email,
    });

    if (activeSessionProfile?.email === profile.email) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        storeAndRedirect({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });
        return;
      }
    }

    if (await resumeSavedProfileSession(profile)) {
      return;
    }

    if (profile.lastLoginMethod === "google" || profile.lastLoginMethod === "apple") {
      const provider = profile.lastLoginMethod;
      setSelectedSavedPasswordProfile(null);
      setUseMagicLink(false);
      setLoading(true);
      setAuthFlowOrigin("login");
      const pendingAttempt = createPendingLoginAttempt({
        email: profile.email,
        displayName: profile.displayName,
        method: provider,
      });
      setPendingAttempt(pendingAttempt);

      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
      } catch (err) {
        clearPendingLoginAttempt();
        setPendingLoginAttemptState(null);
        setLoading(false);
        setSelectedSavedPasswordProfile(profile);
        setError(`Nie udało się wznowić logowania ${provider === 'apple' ? 'Apple' : 'Google'}. Potwierdź hasłem albo użyj linku logowania.`);
      }
      return;
    }

    if (profile.lastLoginMethod === "magic_link") {
      setSelectedSavedPasswordProfile(null);
      setUseMagicLink(true);
      await startMagicLinkLogin(profile.email, profile.displayName);
      return;
    }

    setSelectedSavedPasswordProfile(profile);
    setUseMagicLink(false);
    setPassword("");
  };

  const handleProfileRemove = (profile: RememberedLoginProfile) => {
    removeRememberedProfile(profile.userId);
    const nextProfiles = loadRememberedProfiles();
    setRememberedProfiles(nextProfiles);
    if (selectedSavedPasswordProfile?.userId === profile.userId) {
      setSelectedSavedPasswordProfile(null);
    }

    if (email === profile.email) {
      setEmail(nextProfiles[0]?.email ?? "");
    }
  };

  const pendingLoginLabel = getPendingLoginLabel(pendingLoginAttempt);
  const latestRememberedProfile = rememberedProfiles[0] ?? null;
  const resumeCandidateProfile = activeSessionProfile ?? latestRememberedProfile;
  const shouldShowBootstrapCard = sessionBootstrapping && !magicLinkSent && Boolean(resumeCandidateProfile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {magicLinkSent ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sprawdź swoją skrzynkę
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Wysłaliśmy link logowania na adres:
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                {email}
              </p>
            </div>

            <div className="space-y-4">
              {pendingLoginLabel ? (
                <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Trwa logowanie użytkownika: {pendingLoginLabel}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Czekamy na kliknięcie linku z wiadomości e-mail.
                  </p>
                </div>
              ) : null}

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Kliknij link w e-mailu</strong>, a zostaniesz automatycznie zalogowany.
                </p>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Nie otrzymałeś e-maila?
                </p>
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0 
                    ? `Wyślij ponownie (${resendCooldown}s)` 
                    : 'Wyślij link ponownie'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Witaj ponownie
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {latestRememberedProfile
                  ? `Ostatnio logował się ${latestRememberedProfile.displayName}.`
                  : "Zaloguj się do swojego konta"}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="space-y-4">
                {shouldShowBootstrapCard && resumeCandidateProfile ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Przywracamy sesję dla {resumeCandidateProfile.displayName}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                          {resumeCandidateProfile.email}. Jeśli sesja nadal jest ważna, pokażemy przycisk przejścia do aplikacji zamiast ponownego logowania.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {activeSessionProfile ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                        <UserRoundCheck className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                          Witaj ponownie, {activeSessionProfile.displayName}
                        </p>
                        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                          {activeSessionProfile.email}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              const { data: { session } } = await supabase.auth.getSession();
                              if (session) {
                                storeAndRedirect({
                                  access_token: session.access_token,
                                  refresh_token: session.refresh_token,
                                  expires_at: session.expires_at || 0,
                                  user_id: session.user.id,
                                });
                              } else {
                                setActiveSessionProfile(null);
                              }
                            }}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Kontynuuj do aplikacji
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSessionProfile(null);
                              setSelectedSavedPasswordProfile(null);
                              setPassword("");
                              setError(null);
                            }}
                            className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                          >
                            Użyj innego konta
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {pendingLoginLabel ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      W toku: logowanie użytkownika {pendingLoginLabel}
                    </p>
                    <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                      Zachowaliśmy ten wybór, więc po odświeżeniu nadal widać, dla którego profilu trwa logowanie.
                    </p>
                  </div>
                ) : null}

                {rememberedProfiles.length > 0 ? (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Zapisane profile
                    </p>
                    <div className="mt-3 space-y-2">
                      {rememberedProfiles.map((profile) => (
                        <div
                          key={profile.userId}
                          className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                        >
                          <button
                            type="button"
                            onClick={() => handleProfileSelect(profile)}
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                              {profile.displayName.slice(0, 1).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                {profile.displayName}
                              </p>
                              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                {profile.email}
                              </p>
                            </div>
                          </button>
                          <div className="hidden sm:block text-[11px] text-gray-400 dark:text-gray-500">
                            {profile.lastLoginMethod === "google"
                              ? "Google"
                              : profile.lastLoginMethod === "apple"
                                ? "Apple"
                                : profile.lastLoginMethod === "magic_link"
                                  ? "Link logowania"
                                  : "Hasło"}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleProfileRemove(profile)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            aria-label={`Usuń zapisany profil ${profile.email}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      Kliknięcie profilu najpierw spróbuje przywrócić zapisaną sesję tego konta. Jeśli token wygasł, wrócimy do ostatnio użytej metody logowania.
                    </p>
                  </div>
                ) : null}

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Zaloguj przez Google
                </button>

                {isApplePlatform && (
                  <button
                    onClick={handleAppleSignIn}
                    disabled={loading}
                    className="w-full bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <AppleIcon className="h-5 w-5" />
                    Zaloguj przez Apple
                  </button>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">lub</span>
                  </div>
                </div>

                {/* Method toggle */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => { setUseMagicLink(false); setError(null); }}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      !useMagicLink
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    Hasło
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUseMagicLink(true); setError(null); }}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      useMagicLink
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    Link e-mail
                  </button>
                </div>

                {!useMagicLink ? (
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    {selectedSavedPasswordProfile ? (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Dokończ logowanie jako {selectedSavedPasswordProfile.displayName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {selectedSavedPasswordProfile.email}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSavedPasswordProfile(null);
                              setPassword("");
                              setError(null);
                            }}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Wybierz inne konto
                          </button>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Adres e-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          readOnly={Boolean(selectedSavedPasswordProfile)}
                          autoComplete="username"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="twoj@email.pl"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white read-only:bg-gray-50 read-only:text-gray-500 dark:read-only:bg-gray-800 dark:read-only:text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Hasło
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    {error && (
                      <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Logowanie...' : 'Zaloguj się'}
                    </button>

                  </form>
                ) : (
                  <form onSubmit={handleMagicLink} className="space-y-4">
                    {selectedSavedPasswordProfile ? (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Wyślij link logowania do {selectedSavedPasswordProfile.displayName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {selectedSavedPasswordProfile.email}
                        </p>
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      <label htmlFor="email-magic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Adres e-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="email-magic"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          readOnly={Boolean(selectedSavedPasswordProfile)}
                          autoComplete="username"
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder="twoj@email.pl"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white read-only:bg-gray-50 read-only:text-gray-500 dark:read-only:bg-gray-800 dark:read-only:text-gray-300"
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Wyślemy Ci bezpieczny link do logowania.
                      </p>
                    </div>
                    
                    {error && (
                      <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Wysyłanie...' : 'Wyślij link logowania'}
                    </button>

                  </form>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Nie masz konta? <Link href="/rejestracja" className="text-blue-600 hover:underline font-medium">Zarejestruj się</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
