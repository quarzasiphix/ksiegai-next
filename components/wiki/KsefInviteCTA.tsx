"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureInviteEvent } from "@/lib/posthog/inviteAttribution";

const STORAGE_KEY = "ksiegai_invite_token";

type Variant = "inline" | "sidebar";
type Position = "mid" | "end";

interface Props {
  variant?: Variant;
  position?: Position;
  articleSlug?: string;
}

export function KsefInviteCTA({ variant = "inline", position = "end", articleSlug }: Props) {
  const [hasInvite, setHasInvite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasInvite(Boolean(localStorage.getItem(STORAGE_KEY)));
  }, []);

  if (!mounted) return null;

  function track(ctaType: "primary" | "secondary") {
    captureInviteEvent("ksef_article_cta_clicked", {
      variant,
      position,
      has_invite: hasInvite,
      article_slug: articleSlug ?? null,
      cta_type: ctaType,
    });
  }

  if (variant === "sidebar") {
    return (
      <section className="rounded-[28px] border border-amber-200/50 bg-amber-50/60 p-6 dark:border-amber-400/20 dark:bg-amber-400/[0.08]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400 mb-3">
          Gotowość operacyjna KSeF
        </p>
        <h2 className="text-base font-bold text-slate-950 dark:text-white mb-2">
          Czy Twoja spółka ma już realnie ustawiony KSeF?
        </h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 mb-4">
          {hasInvite
            ? "Twój profil KsięgaI jest już przygotowany. Dokończ konfigurację i ustaw dostęp do KSeF."
            : "Jeżeli dostęp do KSeF, uprawnienia, faktury i workflow księgowy nie są jeszcze połączone w jeden proces — spółka nie jest gotowa operacyjnie."}
        </p>
        <div className="space-y-2">
          <Link
            href="/rejestracja"
            onClick={() => track("primary")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            {hasInvite ? "Aktywuj profil i skonfiguruj KSeF" : "Przejdź do konfiguracji KSeF"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/cennik"
            onClick={() => track("secondary")}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
          >
            Zobacz cennik
          </Link>
        </div>
        {hasInvite && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Zaproszenie jest zapisane. Po wejściu do aplikacji połączymy konto z przygotowanym profilem spółki.
          </p>
        )}
      </section>
    );
  }

  // inline variant
  const isMid = position === "mid";
  return (
    <div
      className={`my-8 rounded-[24px] border p-6 ${
        isMid
          ? "border-amber-200/60 bg-amber-50/50 dark:border-amber-400/20 dark:bg-amber-400/[0.07]"
          : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400 mb-2">
        Gotowość operacyjna
      </p>
      <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
        Twoja spółka nie jest jeszcze gotowa do KSeF
      </h3>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 mb-5">
        {hasInvite
          ? "Twój profil KsięgaI jest już przygotowany. Dokończ konfigurację — dostęp do KSeF, uprawnienia i workflow faktur."
          : "Samo posiadanie NIP nie wystarczy. KSeF wymaga nadania dostępu, ustawienia uprawnień, przygotowania procesu faktur i połączenia pracy zarządu z księgowością."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/rejestracja"
          onClick={() => track("primary")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          {hasInvite ? "Aktywuj profil i skonfiguruj KSeF" : "Przejdź do konfiguracji KSeF"}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          onClick={() => track("secondary")}
          className="inline-flex items-center justify-center rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
        >
          Dokończ czytanie
        </button>
      </div>
      {hasInvite && (
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Zaproszenie jest zapisane. Po wejściu do aplikacji połączymy konto z przygotowanym profilem spółki.
        </p>
      )}
    </div>
  );
}
