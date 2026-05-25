"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Building2, CreditCard, Receipt, Shield, Workflow, X } from "lucide-react";
import {
  captureInviteEvent,
  getInviteAttribution,
  type InviteAttribution,
} from "@/lib/posthog/inviteAttribution";

const HIDDEN_PATH_PREFIXES = ["/rejestracja", "/logowanie", "/auth"];
const OVERLAY_TRIGGER_KEY = "ksiegai_invite_welcome_pending";

type OverlayContent = {
  title: string;
  subtitle: string;
  recipientLabel: string | null;
  companyLabel: string | null;
  dismissalKey: string;
  isPersonalized: boolean;
};

function getFirstName(name: string | null | undefined) {
  if (!name) return null;
  const firstName = name.trim().split(/\s+/)[0];
  return firstName || null;
}

function buildOverlayContent(
  invite: InviteAttribution | null,
  fallbackCompanyName: string | null,
  dismissalKey: string,
): OverlayContent {
  const recipientName = getFirstName(invite?.invite_recipient_name);
  const companyName = invite?.invite_company_name?.trim() || fallbackCompanyName?.trim() || null;
  const title = companyName
    ? `Witamy w KsięgaI, ${companyName}`
    : recipientName
      ? `Witamy, ${recipientName}`
      : "Witamy w KsięgaI";
  const subtitle = companyName
    ? `Profil i przestrzeń robocza firmy ${companyName} są gotowe do konfiguracji.`
    : "Twoje zaproszenie jest aktywne, a profil KsięgaI jest gotowy do konfiguracji.";

  return {
    title,
    subtitle,
    recipientLabel: recipientName,
    companyLabel: companyName,
    dismissalKey,
    isPersonalized: Boolean(recipientName || companyName),
  };
}

export function InviteWelcomeOverlay() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<OverlayContent | null>(null);

  const shouldSkipPath = useMemo(
    () => HIDDEN_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix)),
    [pathname],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSkipPath) return;

    const triggerRaw = window.sessionStorage.getItem(OVERLAY_TRIGGER_KEY);
    if (!triggerRaw) return;

    let cancelled = false;

    const syncOverlay = async () => {
      let trigger: { invite_token_hash?: string } | null = null;
      try {
        trigger = JSON.parse(triggerRaw) as { invite_token_hash?: string };
      } catch {
        trigger = null;
      }

      const invite = getInviteAttribution();
      const fallbackCompanyName = window.localStorage.getItem("pending_invite_company");
      const dismissalKey = invite?.invite_token_hash
        ? `invite:${invite.invite_token_hash}`
        : `invite:${trigger?.invite_token_hash ?? "unknown"}`;
      const nextContent = buildOverlayContent(invite, fallbackCompanyName, dismissalKey);

      if (cancelled) return;

      setContent(nextContent);
      setIsOpen(true);
      window.sessionStorage.removeItem(OVERLAY_TRIGGER_KEY);
      captureInviteEvent("invite_welcome_overlay_viewed", {
        page: pathname ?? window.location.pathname,
        personalized: nextContent.isPersonalized,
      });
    };

    void syncOverlay();

    return () => {
      cancelled = true;
    };
  }, [pathname, shouldSkipPath]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const dismiss = (source: "close" | "cta") => {
    if (!content) return;
    setIsOpen(false);
    captureInviteEvent("invite_welcome_overlay_dismissed", {
      page: pathname ?? (typeof window !== "undefined" ? window.location.pathname : null),
      personalized: content.isPersonalized,
      source,
    });
  };

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/72 px-4 py-8 backdrop-blur-[2px]">
      <div
        aria-labelledby="invite-welcome-title"
        aria-modal="true"
        role="dialog"
        className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 shadow-[0_30px_90px_rgba(2,6,23,0.55)]"
      >
        <button
          type="button"
          onClick={() => dismiss("close")}
          aria-label="Zamknij powitanie"
          className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-400 transition hover:border-slate-600 hover:text-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-slate-800 bg-slate-900/70 px-7 py-5 sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            Zaproszenie aktywne
          </div>
          <h2
            id="invite-welcome-title"
            className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {content.subtitle}
          </p>
          {(content.recipientLabel || content.companyLabel) && (
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
              {content.recipientLabel && (
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
                  Osoba zaproszona: <strong className="font-semibold text-slate-50">{content.recipientLabel}</strong>
                </span>
              )}
              {content.companyLabel && (
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">
                  Firma: <strong className="font-semibold text-slate-50">{content.companyLabel}</strong>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="px-7 py-7 sm:px-10 sm:py-9">
          <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            W aplikacji możesz od razu prowadzić codzienny obieg firmy bez przełączania się między
            narzędziami.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-50">
                <Receipt className="h-5 w-5 text-slate-300" />
                Zarządzać fakturami
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Wystawiać dokumenty i utrzymywać porządek w sprzedaży oraz rozliczeniach.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-50">
                <Shield className="h-5 w-5 text-slate-300" />
                Przygotować firmę do KSeF
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Uporządkować procesy i wejść w obowiązki KSeF na gotowym fundamencie.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-50">
                <CreditCard className="h-5 w-5 text-slate-300" />
                Połączyć płatności
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Spiąć sprzedaż z płatnościami online i skrócić drogę od faktury do wpływu.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-50">
                <Workflow className="h-5 w-5 text-slate-300" />
                Organizować workflow księgowy
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Trzymać dokumenty, akceptacje i obowiązki operacyjne w jednym miejscu.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Building2 className="h-4 w-4 text-slate-500" />
              Zaproszenie pozostaje zapisane lokalnie, więc możesz wrócić do konfiguracji później.
            </div>
            <button
              type="button"
              onClick={() => dismiss("cta")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Przejdź do bloga
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
