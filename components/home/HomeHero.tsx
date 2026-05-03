"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Inbox,
  Receipt,
  Shield,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  clearAuthToken,
  getAuthToken,
  isTokenExpired,
  storeAndRedirect,
} from "@/lib/auth/crossDomainAuth";
import {
  getHomeBusinessDashboardData,
  type HomeBusinessDashboardData,
} from "@/lib/home/businessProfiles";

type HeroContent = {
  bannerBadge: string;
  headline: string;
  subheadline: string;
  description: string;
  tagline: string;
  cta: string;
  ctaSecondary: string;
};

type HomeHeroProps = {
  content: HeroContent;
  onAnonymousPrimaryCtaClick: () => void;
};

type SessionState = Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"];

const HOME_PROFILE_STORAGE_PREFIX = "ksiegai_next_home_profile:";

const formatEntityLabel = (entityType: string | null) => {
  switch (entityType) {
    case "sp_zoo":
      return "Sp. z o.o.";
    case "sa":
      return "S.A.";
    case "dzialalnosc":
      return "JDG";
    default:
      return entityType ? entityType.toUpperCase() : "Profil firmy";
  }
};

const buildSessionToken = (session: NonNullable<SessionState>) => ({
  access_token: session.access_token,
  refresh_token: session.refresh_token,
  expires_at: session.expires_at || 0,
  user_id: session.user.id,
});

const LoggedOutHero = ({
  content,
  onAnonymousPrimaryCtaClick,
}: HomeHeroProps) => (
  <section className="relative py-8 sm:py-12 md:py-20 bg-gray-950 border-b border-gray-800">
    <div className="container mx-auto px-4 sm:px-6 md:px-4 py-6 sm:py-8 md:py-12">
      <div className="mx-auto text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6 sm:mb-8 animate-fade-in">
          <span className="text-blue-300 text-xs sm:text-sm font-semibold" suppressHydrationWarning>
            {content.bannerBadge}
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 sm:mb-6 leading-tight animate-fade-in px-2 max-w-4xl mx-auto"
          suppressHydrationWarning
        >
          {content.headline}
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 font-medium leading-relaxed animate-fade-in px-2 max-w-3xl mx-auto"
          suppressHydrationWarning
        >
          {content.subheadline}
        </p>
        <p
          className="text-base sm:text-lg text-blue-300 mb-4 animate-fade-in px-2 max-w-2xl mx-auto font-medium"
          suppressHydrationWarning
        >
          {content.description}
        </p>
        <p
          className="text-sm text-gray-400 mb-8 animate-fade-in px-2 max-w-2xl mx-auto italic"
          suppressHydrationWarning
        >
          {content.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-3 px-2 animate-fade-in">
          <Link
            href="/rejestracja"
            onClick={onAnonymousPrimaryCtaClick}
            className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
          >
            <span suppressHydrationWarning>{content.cta}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#mechanism"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all whitespace-nowrap"
          >
            <span suppressHydrationWarning>{content.ctaSecondary}</span>
          </Link>
          <Link
            href="/darmowy-generator-faktur"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-950 hover:bg-gray-100 text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all whitespace-nowrap"
          >
            <Receipt className="h-5 w-5" />
            <span>Darmowy generator faktur</span>
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 font-medium text-center animate-fade-in px-2">
          Zweryfikowana sieć firm • Natywne dostarczanie dokumentów • Uzgodnienie przed KSeF
        </p>
      </div>
    </div>
  </section>
);

export default function HomeHero({ content, onAnonymousPrimaryCtaClick }: HomeHeroProps) {
  const [session, setSession] = useState<SessionState>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [dashboardData, setDashboardData] = useState<HomeBusinessDashboardData | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (currentSession) {
        if (!cancelled) {
          setSession(currentSession);
        }
        return;
      }

      const authToken = getAuthToken();
      if (!authToken) {
        return;
      }

      if (isTokenExpired(authToken)) {
        clearAuthToken();
        return;
      }

      const { data, error } = await supabase.auth.setSession({
        access_token: authToken.access_token,
        refresh_token: authToken.refresh_token,
      });

      if (error) {
        console.error("[HomeHero] Failed to restore session from cross-domain token:", error);
        clearAuthToken();
        return;
      }

      if (!cancelled) {
        setSession(data.session ?? null);
      }
    };

    void restoreSession().finally(() => {
      if (!cancelled) {
        setSessionReady(true);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!cancelled) {
        setSession(nextSession);
        setSessionReady(true);
      }
    });

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      if (!session?.user?.id) {
        setDashboardData(null);
        setSelectedBusinessId(null);
        return;
      }

      setIsLoadingDashboard(true);

      try {
        const nextData = await getHomeBusinessDashboardData(session.user.id);
        if (cancelled) return;

        setDashboardData(nextData);

        const storageKey = `${HOME_PROFILE_STORAGE_PREFIX}${session.user.id}`;
        const savedProfileId =
          typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
        const preferredProfile =
          nextData.profiles.find((profile) => profile.id === savedProfileId) ??
          nextData.profiles.find((profile) => profile.isDefault) ??
          nextData.profiles[0] ??
          null;

        setSelectedBusinessId(preferredProfile?.id ?? null);
      } catch (error) {
        console.error("[HomeHero] Failed to load business dashboard data:", error);
        if (!cancelled) {
          setDashboardData({ profiles: [], unreadByProfileId: {}, totalUnread: 0 });
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDashboard(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  useEffect(() => {
    if (!session?.user?.id || !selectedBusinessId || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(`${HOME_PROFILE_STORAGE_PREFIX}${session.user.id}`, selectedBusinessId);
  }, [selectedBusinessId, session?.user?.id]);

  const isDashboardPending = isLoadingDashboard && dashboardData === null;

  const selectedProfile = useMemo(
    () => dashboardData?.profiles.find((profile) => profile.id === selectedBusinessId) ?? null,
    [dashboardData?.profiles, selectedBusinessId],
  );

  const selectedProfileUnread = selectedProfile
    ? dashboardData?.unreadByProfileId[selectedProfile.id]?.unreadCount ?? 0
    : 0;

  const handleGoToApp = (path: string, businessProfileId?: string | null) => {
    if (!session) {
      return;
    }

    storeAndRedirect(
      buildSessionToken(session),
      path,
      businessProfileId ? { businessProfileId } : undefined,
    );
  };

  if (!sessionReady) {
    return (
      <section className="relative py-8 sm:py-12 md:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 py-6 sm:py-8 md:py-12">
          <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 animate-pulse">
            <div className="h-4 w-32 rounded-full bg-white/10 mb-6" />
            <div className="h-12 w-3/4 rounded-2xl bg-white/10 mb-4" />
            <div className="h-6 w-2/3 rounded-xl bg-white/10 mb-3" />
            <div className="h-6 w-1/2 rounded-xl bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <LoggedOutHero
        content={content}
        onAnonymousPrimaryCtaClick={onAnonymousPrimaryCtaClick}
      />
    );
  }

  const hasProfiles = (dashboardData?.profiles.length ?? 0) > 0;

  return (
    <section className="relative py-8 sm:py-12 md:py-20 bg-gray-950 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 md:px-4 py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/80 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-stretch">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                <Shield className="h-4 w-4" />
                Zalogowany użytkownik
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-blue-200">
                  Witaj ponownie{session.user.email ? `, ${session.user.email}` : ""}.
                </p>
                <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                  {isDashboardPending
                    ? "Ładuję Twoje profile firm"
                    : hasProfiles
                    ? "Witaj ponownie"
                    : "Dodaj pierwszy profil firmy i przejdź do aplikacji"}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {isDashboardPending
                    ? "Sprawdzam dostępne profile i stan dokumentów, żeby od razu pokazać właściwy kontekst wejścia do aplikacji."
                    : hasProfiles
                    ? "Wybierz, od czego chcesz zacząć."
                    : "Nie masz jeszcze profilu biznesowego. Dodanie firmy w aplikacji zajmie około 5 minut i od razu odblokuje pracę z dokumentami."}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Profile</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {isLoadingDashboard ? "..." : dashboardData?.profiles.length ?? 0}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">Dostępne firmy</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">KSeF</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {isLoadingDashboard ? "..." : dashboardData?.totalUnread ?? 0}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">Nieprzeczytane / oczekujące</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Następny krok</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {hasProfiles ? "Wejdź do aplikacji" : "Dodaj profil firmy"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {hasProfiles ? "Właściwa firma otworzy się od razu" : "Start konfiguracji bez szukania ustawień"}
                  </p>
                </div>
              </div>

              {hasProfiles && selectedProfile && (
                <div className="rounded-[28px] border border-blue-400/20 bg-blue-500/10 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                        <Building2 className="h-4 w-4" />
                        Aktywny profil dla wejścia do aplikacji
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-white">{selectedProfile.name}</h2>
                        <p className="mt-1 text-sm text-slate-300">
                          {formatEntityLabel(selectedProfile.entityType)}
                          {selectedProfile.city ? ` • ${selectedProfile.city}` : ""}
                          {selectedProfile.taxId ? ` • NIP ${selectedProfile.taxId}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.isDefault && (
                        <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                          Domyślna
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                        {selectedProfile.accessRole ? `Rola: ${selectedProfile.accessRole}` : "Właściciel"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                          <Inbox className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {selectedProfileUnread > 0
                              ? `${selectedProfileUnread} dokumentów czeka`
                              : "Brak nowych dokumentów KSeF"}
                          </p>
                          <p className="text-sm text-slate-400">
                            {selectedProfileUnread > 0
                              ? "Możesz wejść od razu do właściwej firmy i sprawdzić inbox."
                              : "Profil jest gotowy, możesz wrócić do pracy w aplikacji."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-200">
                          <Clock3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Zmiana profilu bez szukania ustawień</p>
                          <p className="text-sm text-slate-400">
                            Wybrany profil zostanie przekazany do aplikacji przy wejściu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isDashboardPending && !hasProfiles && (
                <div className="rounded-[28px] border border-amber-400/20 bg-amber-500/10 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-200">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Nie masz jeszcze profilu biznesowego</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Otwórz aplikację i dodaj firmę. Start formularza zajmie około 5 minut, a potem dashboard będzie już otwierał się w kontekście tej firmy.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                {isDashboardPending ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600/50 px-6 py-4 text-base font-semibold text-white/80"
                  >
                    Ładuję profile...
                  </button>
                ) : hasProfiles ? (
                  <button
                    type="button"
                    onClick={() => handleGoToApp("/dashboard", selectedProfile?.id ?? null)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-500"
                  >
                    Przejdź do aplikacji
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleGoToApp("/settings/business-profiles/new")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-500"
                  >
                    Dodaj profil firmy
                    <ArrowRight className="h-5 w-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleGoToApp("/dashboard", selectedProfile?.id ?? null)}
                  disabled={isDashboardPending}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Otwórz aplikację
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Profile firm</h2>
                  <p className="text-sm text-slate-400">
                    {isDashboardPending
                      ? "Ładuję listę firm."
                      : hasProfiles
                      ? "Na desktopie wybierz firmę przed wejściem do aplikacji."
                      : "Po dodaniu pierwszej firmy lista pojawi się tutaj."}
                  </p>
                </div>
                {dashboardData?.totalUnread ? (
                  <span className="inline-flex items-center rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-100">
                    {dashboardData.totalUnread} nowych w KSeF
                  </span>
                ) : null}
              </div>

              <div className="mt-4 space-y-3">
                {isDashboardPending && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                    Trwa pobieranie listy firm i skrótu KSeF.
                  </div>
                )}

                {!isDashboardPending && !hasProfiles && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                    Dodaj profil firmy w aplikacji, a powrót na stronę główną pokaże gotową listę firm i szybkie wejście do właściwego kontekstu.
                  </div>
                )}

                {dashboardData?.profiles.map((profile) => {
                  const unreadCount = dashboardData.unreadByProfileId[profile.id]?.unreadCount ?? 0;
                  const isSelected = profile.id === selectedProfile?.id;

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setSelectedBusinessId(profile.id)}
                      className={`hidden w-full rounded-2xl border p-4 text-left transition lg:block ${
                        isSelected
                          ? "border-blue-400/40 bg-blue-500/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-white">{profile.name}</p>
                          <p className="mt-1 text-sm text-slate-400">
                            {formatEntityLabel(profile.entityType)}
                            {profile.city ? ` • ${profile.city}` : ""}
                          </p>
                        </div>
                        {isSelected ? (
                          <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-semibold text-blue-100">
                            Wybrany
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-300">
                          {profile.taxId ? `NIP ${profile.taxId}` : "Bez NIP"}
                        </span>
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-300">
                          {unreadCount > 0 ? `${unreadCount} oczekujących z KSeF` : "Brak nowych z KSeF"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {hasProfiles && (
                <div className="mt-4 grid gap-2 lg:hidden">
                  {dashboardData?.profiles.map((profile) => {
                    const isSelected = profile.id === selectedProfile?.id;

                    return (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => setSelectedBusinessId(profile.id)}
                        className={`rounded-2xl border px-4 py-3 text-left transition ${
                          isSelected
                            ? "border-blue-400/40 bg-blue-500/10"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <p className="text-sm font-semibold text-white">{profile.name}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {(dashboardData?.unreadByProfileId[profile.id]?.unreadCount ?? 0) > 0
                            ? `${dashboardData?.unreadByProfileId[profile.id]?.unreadCount ?? 0} oczekujących z KSeF`
                            : "Brak nowych dokumentów"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
