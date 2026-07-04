import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Shield,
  RefreshCw,
  Receipt,
  FileCheck2,
  Building2,
  BookOpen,
  Wallet,
  Bell,
} from "lucide-react";
import androidVersion from "../../public/android/version.json";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=pl.ksiegai.mobile";

const MODULES = [
  {
    icon: Receipt,
    title: "Finanse",
    desc: "Faktury, przychody, wydatki, klienci i dostawcy w jednym miejscu.",
  },
  {
    icon: FileCheck2,
    title: "KSeF",
    desc: "Wysyłka faktur do KSeF i status w czasie rzeczywistym.",
  },
  {
    icon: Building2,
    title: "Firma",
    desc: "Wspólnicy, zarząd, uchwały i formalności spółki.",
  },
  {
    icon: BookOpen,
    title: "Księgowość",
    desc: "Księga, rozliczenia i dokumenty zawsze zsynchronizowane.",
  },
];

const STEPS = [
  "Otwórz pobrany plik APK na telefonie.",
  'Jeśli pojawi się komunikat o "nieznanym źródle", zezwól na instalację z tej lokalizacji.',
  "Zainstaluj aplikację i zaloguj się kontem ksiegai.",
];

export const metadata: Metadata = {
  title: "ksiegai na Androida | Pobierz aplikację",
  description:
    "Pobierz ksiegai na Androida z Google Play. Faktury, KSeF i pełna księgowość w kieszeni.",
  alternates: {
    canonical: "https://ksiegai.pl/android",
  },
  openGraph: {
    title: "ksiegai – aplikacja Android",
    description: "Pobierz ksiegai na Androida i zarządzaj fakturami oraz KSeF z telefonu.",
    url: "https://ksiegai.pl/android",
    type: "website",
    locale: "pl_PL",
  },
};

export default function AndroidPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Dostępna na Google Play
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              ksiegai na Androida
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/55">
              Faktury, KSeF i pełna księgowość zawsze pod ręką. Ta sama aplikacja,
              którą znasz z przeglądarki — teraz w telefonie.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] hover:from-blue-400 hover:to-blue-500 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
                  <path d="M3 20.5V3.5c0-.59.34-1.1.83-1.35l10.35 9.85-10.35 9.85c-.49-.25-.83-.76-.83-1.35zm14.34-7.35 2.89-1.65c.7-.4.7-1.4 0-1.8l-2.89-1.65-2.55 2.55 2.55 2.55zM5.4 3.02 15.2 8.67l-2.4 2.28-7.4-7.93zm0 17.96 7.4-7.93 2.4 2.28-9.8 5.65z" />
                </svg>
                Pobierz z Google Play
              </a>

              <a
                href="/android/ksiegai-latest.apk"
                download
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Download className="h-4 w-4" />
                Pobierz APK
              </a>
            </div>

            <p className="mt-4 text-sm text-white/35">
              Wersja APK <span className="font-semibold text-white/55">{androidVersion.version_name}</span>
              {" · "}wymaga Android 7.0+
            </p>
          </div>

          {/* Phone mockup — real app UI */}
          <div className="order-1 flex justify-center lg:order-2">
            <PhoneMockup />
          </div>
        </div>

        {/* Modules */}
        <section className="mt-24">
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Co znajdziesz w aplikacji
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm transition-colors hover:bg-white/6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-white/90">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust + install */}
        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
                <Shield className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Bezpieczna instalacja</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  APK podpisany kluczem ksiegai. Dane szyfrowane przez Supabase.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
                <RefreshCw className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Automatyczne aktualizacje</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  Przez Google Play aplikacja aktualizuje się sama. Wersja APK powiadamia o nowej wersji przy starcie.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/8 px-5 py-4 text-sm text-blue-200/80">
              <span className="mt-0.5 text-lg leading-none">ℹ️</span>
              <p className="leading-relaxed">
                <span className="font-semibold text-blue-200">Aplikacja jest oficjalnie dostępna w Google Play.</span>{" "}
                Wersję APK udostępniamy dodatkowo do ręcznej instalacji lub weryfikacji pliku.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Instalacja z pliku APK
            </h2>
            <ol className="space-y-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-white/75">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400 ring-1 ring-blue-500/25">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 border-t border-white/8 pt-5">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/40">
                Weryfikacja pliku (SHA-256)
              </p>
              <Sha256Badge />
              <p className="mt-2 text-xs text-white/30">
                Porównaj z{" "}
                <a
                  href="/android/ksiegai-latest.sha256.txt"
                  className="text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  ksiegai-latest.sha256.txt
                </a>
              </p>
            </div>
          </div>
        </section>

        <p className="mt-16 text-center text-xs text-white/30">
          Masz pytania?{" "}
          <Link href="/" className="text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors">
            Wróć na stronę główną
          </Link>
        </p>
      </div>
    </main>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[280px] rounded-[2.5rem] border-[10px] border-gray-800 bg-gray-800 shadow-2xl shadow-black/50 sm:w-[300px]">
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-xl bg-gray-800" />

      <div className="overflow-hidden rounded-[1.9rem] bg-gray-50 text-gray-900">
        {/* status bar */}
        <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-medium text-gray-500">
          <span>9:41</span>
          <span className="font-semibold text-gray-700">ksiegai</span>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 gap-2 px-3 pt-2">
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-3 text-white shadow-md">
            <p className="text-[9px] font-medium text-white/80">Przychód (mies.)</p>
            <p className="mt-1 text-base font-semibold">12 480 zł</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-md">
            <p className="text-[9px] font-medium text-white/80">Faktury</p>
            <p className="mt-1 text-base font-semibold">18</p>
          </div>
        </div>

        {/* mini bar chart */}
        <div className="mx-3 mt-2 flex h-12 items-end gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t bg-blue-500/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* invoice list */}
        <div className="mt-2 px-3">
          <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
            Ostatnie faktury
          </p>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
              <div>
                <p className="text-[11px] font-semibold text-gray-900">FV/2026/07/041</p>
                <p className="text-[9px] text-gray-500">Acme Sp. z o.o.</p>
                <span className="mt-1 inline-block rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-medium text-green-700">
                  Rozliczona
                </span>
                <span className="ml-1 inline-block rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-medium text-green-700">
                  KSeF: Wysłano
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">3 200,00 zł</p>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
              <div>
                <p className="text-[11px] font-semibold text-gray-900">FV/2026/07/040</p>
                <p className="text-[9px] text-gray-500">Nowak Konsulting</p>
                <span className="mt-1 inline-block rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-700">
                  Nieopłacona
                </span>
                <span className="ml-1 inline-block rounded-full bg-yellow-100 px-1.5 py-0.5 text-[8px] font-medium text-yellow-700">
                  KSeF: Oczekuje
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-900">980,00 zł</p>
            </div>
          </div>
        </div>

        {/* bottom nav */}
        <div className="mt-3 flex items-center justify-around border-t border-gray-200 bg-white/95 px-1 py-2">
          {[
            { icon: Wallet, label: "Finanse", active: true },
            { icon: Building2, label: "Firma", active: false },
            { icon: BookOpen, label: "Księg.", active: false },
            { icon: Bell, label: "Menu", active: false },
          ].map(({ icon: Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon className={`h-4 w-4 ${active ? "text-blue-600" : "text-gray-400"}`} />
              <span className={`text-[8px] ${active ? "font-medium text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function Sha256Badge() {
  try {
    const res = await fetch("https://ksiegai.pl/android/ksiegai-latest.sha256.txt", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return <span className="text-xs text-white/30 italic">brak danych</span>;
    const hash = (await res.text()).trim();
    return (
      <code className="block break-all font-mono text-xs text-emerald-400/80 leading-relaxed">
        {hash}
      </code>
    );
  } catch {
    return <span className="text-xs text-white/30 italic">brak danych</span>;
  }
}
