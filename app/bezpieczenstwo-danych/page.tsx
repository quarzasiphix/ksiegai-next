import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Lock, Server, Shield, Users } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Bezpieczeństwo danych | KsięgaI – przenośność, dostęp i ochrona",
  description:
    "Jak KsięgaI chroni Twoje dane: przenośność, eksport w każdej chwili, szyfrowanie, role dostępu i polityka braku lock-in. Supabase, szyfrowanie TLS, RLS.",
  keywords:
    "bezpieczeństwo danych księgowość, przenośność danych, eksport danych, RODO ksiegowość, szyfrowanie danych firma",
  alternates: { canonical: "https://ksiegai.pl/bezpieczenstwo-danych" },
  openGraph: {
    title: "Bezpieczeństwo danych | KsięgaI",
    description:
      "Przenośność, eksport w każdej chwili, szyfrowanie end-to-end, role dostępu i brak lock-in. Dane Twojej firmy są Twoje.",
    url: "https://ksiegai.pl/bezpieczenstwo-danych",
    type: "website",
    locale: "pl_PL",
  },
};

export default function BezpieczenstwoDanychPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="bezpieczenstwo-danych" intent="trust" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/40 border border-green-500/30 mb-6">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-semibold">Bezpieczeństwo i dane</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Twoje dane są Twoje — zawsze
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              Pełny eksport danych w każdej chwili, bez blokad. Szyfrowanie TLS, role dostępu i brak
              lock-in. Dane Twojej firmy nie są zakładnikiem subskrypcji.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Trzy filary naszego podejścia
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-xl mx-auto">
              Bezpieczeństwo techniczne, przenośność danych i kontrola dostępu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Download,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Przenośność danych",
                  desc: "Eksport wszystkich danych w standardowych formatach (CSV, JSON, PDF) w dowolnym momencie — nawet po anulowaniu subskrypcji. Brak technicznych blokad.",
                },
                {
                  icon: Lock,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Szyfrowanie i infrastruktura",
                  desc: "TLS dla wszystkich połączeń, szyfrowanie danych w spoczynku. Infrastruktura oparta na Supabase (PostgreSQL) z Row Level Security. Dane w UE.",
                },
                {
                  icon: Users,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Role i kontrola dostępu",
                  desc: "Każdy użytkownik ma tylko taki dostęp, jaki nadał mu właściciel profilu. Role są konfigurowalne. Dostęp może być odebrany w dowolnej chwili.",
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, desc }) => (
                <div
                  key={title}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data portability details */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Eksport danych bez ograniczeń
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Możesz wyeksportować wszystkie swoje dane — faktury, dokumenty, historię decyzji,
                  kontrahentów, transakcje — w dowolnym momencie i w standardowych formatach.
                </p>
                <div className="space-y-3">
                  {[
                    "Faktury i dokumenty w PDF i XML (FA2)",
                    "Dane kontrahentów w CSV",
                    "Historia transakcji bankowych",
                    "Ślad audytowy i historia decyzji",
                    "Dane dostępne po anulowaniu konta przez 90 dni",
                    "Bez opłat za eksport",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-4">
                  Dostępne formaty eksportu
                </p>
                {[
                  { label: "Faktury sprzedaży", formats: "PDF, XML (FA2), CSV" },
                  { label: "Dokumenty kosztowe", formats: "PDF, CSV" },
                  { label: "Kontrahenci", formats: "CSV, JSON" },
                  { label: "Historia transakcji", formats: "CSV, JSON" },
                  { label: "Ślad audytowy", formats: "CSV, JSON" },
                  { label: "Pliki JPK", formats: "XML (JPK_FA, JPK_V7M)" },
                ].map(({ label, formats }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3"
                  >
                    <p className="text-sm text-white">{label}</p>
                    <p className="text-xs text-slate-400">{formats}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical stack */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Infrastruktura techniczna
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Server,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Baza danych",
                  items: [
                    "PostgreSQL na Supabase",
                    "Row Level Security (RLS) na poziomie bazy",
                    "Dane w UE (Frankfurt)",
                    "Backupy automatyczne co 24h",
                  ],
                },
                {
                  icon: Lock,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Szyfrowanie",
                  items: [
                    "TLS 1.3 dla wszystkich połączeń",
                    "Dane w spoczynku szyfrowane AES-256",
                    "Tokeny KSeF przechowywane w Vault (nie w tabelach)",
                    "Hasła przez bcrypt — nigdy plain text",
                  ],
                },
                {
                  icon: Users,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Autoryzacja",
                  items: [
                    "Supabase Auth z JWT",
                    "Role na poziomie profilu biznesowego",
                    "2FA dostępne",
                    "Sesje z automatycznym wygasaniem",
                  ],
                },
                {
                  icon: Shield,
                  iconClass: "text-amber-600 dark:text-amber-400",
                  bgClass: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Zgodność",
                  items: [
                    "RODO: przetwarzanie w UE",
                    "Prawo do usunięcia danych",
                    "Polityka prywatności w języku polskim",
                    "Regulamin dostępny online",
                  ],
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, items }) => (
                <div
                  key={title}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/governance"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Szczegółowe informacje o governance i infrastrukturze →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal links */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/polityka-prywatnosci" className="text-gray-600 dark:text-gray-400 hover:underline">
              Polityka prywatności →
            </Link>
            <Link href="/regulamin" className="text-gray-600 dark:text-gray-400 hover:underline">
              Regulamin →
            </Link>
            <Link href="/rodo" className="text-gray-600 dark:text-gray-400 hover:underline">
              RODO →
            </Link>
            <Link href="/infrastructure" className="text-gray-600 dark:text-gray-400 hover:underline">
              Infrastruktura →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Zacznij — Twoje dane zawsze pod kontrolą
          </h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Plan podstawowy bezpłatny. Eksport danych dostępny od pierwszego dnia.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "bezpieczenstwo-danych", intent: "trust", cta_id: "footer_cta", text: "Załóż konto", destination: "/rejestracja" }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Załóż konto
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
