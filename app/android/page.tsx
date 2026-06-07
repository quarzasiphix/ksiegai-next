import type { Metadata } from "next";
import Link from "next/link";
import { Download, Smartphone, Shield, RefreshCw, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "KsięgaI na Androida | Pobierz aplikację",
  description:
    "Pobierz aplikację KsięgaI na Androida. Faktury, KSeF i pełna księgowość w kieszeni.",
  alternates: {
    canonical: "https://ksiegai.pl/android",
  },
  openGraph: {
    title: "KsięgaI – aplikacja Android",
    description: "Pobierz KsięgaI na Androida i zarządzaj fakturami oraz KSeF z telefonu.",
    url: "https://ksiegai.pl/android",
    type: "website",
    locale: "pl_PL",
  },
};

const STEPS = [
  "Otwórz pobrany plik APK na telefonie.",
  'Jeśli pojawi się komunikat o "nieznanym źródle", zezwól na instalację z tej lokalizacji.',
  "Zainstaluj aplikację i zaloguj się kontem KsięgaI.",
];

const FEATURES = [
  "Wystawiaj faktury i rachunki",
  "Archiwum KSeF w czasie rzeczywistym",
  "Przychody i wydatki",
  "Powiadomienia o nowych dokumentach KSeF",
  "Pobieranie PDF faktur",
];

export default function AndroidPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      <style>{`
        /* shimmer sweep across button */
        .apk-btn { position: relative; overflow: hidden; }
        .apk-btn::before {
          content: '';
          position: absolute;
          top: -50%; left: -80%;
          width: 55%; height: 200%;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.22) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: skewX(-18deg);
          animation: sweep 2.4s ease-in-out infinite;
        }
        @keyframes sweep {
          0%   { left: -80%; }
          100% { left: 130%; }
        }

        /* phone icon floating */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        .phone-float { animation: float 3.8s ease-in-out infinite; }

        /* download icon bouncing inside button */
        @keyframes dl-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
        .dl-icon { animation: dl-bounce 1.6s ease-in-out infinite; display: inline-flex; }

        /* soft pulsing ring around phone */
        @keyframes ring-pulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ring-pulse {
          animation: ring-pulse 2.8s ease-out infinite;
        }

        /* card hover lift */
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(59,130,246,0.08);
        }
      `}</style>

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-20">

        {/* Hero */}
        <div className="mb-14 flex flex-col items-center text-center gap-7">

          {/* Floating phone icon with pulsing ring */}
          <div className="phone-float relative flex items-center justify-center">
            <span className="ring-pulse absolute inset-0 rounded-3xl bg-blue-500/30" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-500/15 ring-1 ring-blue-500/25 shadow-2xl shadow-blue-500/10">
              <Smartphone className="h-11 w-11 text-blue-400" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dostępna na Android
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              KsięgaI na Androida
            </h1>
            <p className="text-lg text-white/55">
              Faktury, KSeF i pełna księgowość zawsze pod ręką.
            </p>
          </div>

          {/* Animated download button */}
          <a
            href="/android/ksiegai-latest.apk"
            download
            className="apk-btn group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-600/30 transition-all duration-200 hover:scale-105 hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-500/40 active:scale-95"
          >
            <span className="dl-icon">
              <Download className="h-5 w-5" />
            </span>
            Pobierz APK
          </a>

          <p className="text-sm text-white/40">
            Wersja{" "}
            <VersionBadge />
            {" · "}wymaga Android 7.0+
          </p>
        </div>

        {/* Features */}
        <section className="card-hover mb-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
            Co oferuje aplikacja
          </h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Installation steps */}
        <section className="card-hover mb-4 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
            Jak zainstalować
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
        </section>

        {/* Trust cards */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="card-hover flex flex-1 items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
              <Shield className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Bezpieczna instalacja</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">
                APK podpisany kluczem KsięgaI. Dane szyfrowane przez Supabase.
              </p>
            </div>
          </div>
          <div className="card-hover flex flex-1 items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
              <RefreshCw className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Automatyczne powiadomienia</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">
                Aplikacja informuje o dostępności nowej wersji przy starcie.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-white/30">
          Masz pytania?{" "}
          <Link href="/" className="text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors">
            Wróć na stronę główną
          </Link>
        </p>
      </div>
    </main>
  );
}

async function VersionBadge() {
  try {
    const res = await fetch("https://ksiegai.pl/android/version.json", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return <span className="font-semibold text-white/60">{data.version_name}</span>;
  } catch {
    return null;
  }
}
