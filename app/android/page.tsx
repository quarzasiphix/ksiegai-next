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
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-20">

        {/* Hero */}
        <div className="mb-12 flex flex-col items-center text-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <Smartphone className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              KsięgaI na Androida
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Faktury, KSeF i pełna księgowość zawsze pod ręką.
            </p>
          </div>
          <a
            href="/android/ksiegai-latest.apk"
            download
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 active:scale-95"
          >
            <Download className="h-5 w-5" />
            Pobierz APK
          </a>
          <p className="text-sm text-muted-foreground">
            Wersja{" "}
            <VersionBadge />
            {" · "}wymaga Android 7.0+
          </p>
        </div>

        {/* Features */}
        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Co oferuje aplikacja
          </h2>
          <ul className="space-y-2.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Installation steps */}
        <section className="mb-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Jak zainstalować
          </h2>
          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Trust notes */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-start gap-3 rounded-xl border border-border bg-card p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Bezpieczna instalacja</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                APK podpisany kluczem KsięgaI. Dane szyfrowane przez Supabase.
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-start gap-3 rounded-xl border border-border bg-card p-4">
            <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium">Automatyczne powiadomienia</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Aplikacja informuje o dostępności nowej wersji przy starcie.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Masz pytania?{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-foreground">
            Wróć na stronę główną
          </Link>
        </p>
      </div>
    </main>
  );
}

// Reads version from the public manifest at build time via fetch
async function VersionBadge() {
  try {
    const res = await fetch("https://ksiegai.pl/android/version.json", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return <span className="font-medium">{data.version_name}</span>;
  } catch {
    return null;
  }
}
