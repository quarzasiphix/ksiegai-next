import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileText,
  Receipt,
  Shield,
  Zap,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "KsięgaI dla JDG – faktury, KSeF i płatności dla jednoosobowej działalności",
  description:
    "KsięgaI dla jednoosobowej działalności gospodarczej: fakturowanie, płatności Stripe, obsługa KSeF, ewidencja i eksport. Zacznij w 5 minut.",
  keywords:
    "JDG faktury, KSeF JDG, jednoosobowa działalność gospodarcza faktury, program do fakturowania JDG, płatności online JDG",
  alternates: { canonical: "https://ksiegai.pl/jdg" },
  openGraph: {
    title: "KsięgaI dla JDG – faktury, KSeF i płatności",
    description:
      "System fakturowania i obiegu dokumentów dla jednoosobowej działalności. KSeF-ready, płatności Stripe, ewidencja przychodów.",
    url: "https://ksiegai.pl/jdg",
    type: "website",
    locale: "pl_PL",
  },
};

export default function JdgPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="jdg" persona="jdg" intent="signup" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6">
              <Receipt className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">JDG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight max-w-3xl">
              Faktury, KSeF i płatności dla jednoosobowej działalności
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
              Wystawiasz faktury, przyjmujesz płatności online i przygotowujesz firmę do KSeF — w
              jednym miejscu, bez sklejania narzędzi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "jdg", persona: "jdg", cta_id: "hero_primary", text: "Zacznij za darmo", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Zacznij za darmo
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "jdg", persona: "jdg", cta_id: "hero_secondary", text: "Zobacz workflow dla JDG", destination: "/jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz workflow dla JDG
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* What JDG gets */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Co dostaje JDG w KsięgaI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-xl mx-auto">
              Zaczyna się od faktury. Z biegiem czasu system porządkuje całą ewidencję.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Receipt,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Faktury sprzedaży",
                  desc: "Faktura z pełnymi danymi, VAT, PDF i linkiem do płatności. Wysyłasz mailem lub przez Stripe.",
                },
                {
                  icon: CreditCard,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Płatności online Stripe",
                  desc: "Klient dostaje link do płatności kartą lub przelewem. Ty widzisz status w czasie rzeczywistym.",
                },
                {
                  icon: Shield,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "KSeF-ready",
                  desc: "Dokumenty przygotowane pod format FA(2). Token KSeF możesz dodać w ustawieniach firmy.",
                },
                {
                  icon: FileText,
                  iconClass: "text-amber-600 dark:text-amber-400",
                  bgClass: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Ewidencja przychodów",
                  desc: "Automatyczna ewidencja na podstawie wystawionych faktur. Gotowa do przekazania księgowej.",
                },
                {
                  icon: Zap,
                  iconClass: "text-rose-600 dark:text-rose-400",
                  bgClass: "bg-rose-100 dark:bg-rose-900/30",
                  title: "Dopasowanie płatności",
                  desc: "Import wyciągu bankowego i automatyczne dopasowanie wpłat do faktur.",
                },
                {
                  icon: CheckCircle2,
                  iconClass: "text-teal-600 dark:text-teal-400",
                  bgClass: "bg-teal-100 dark:bg-teal-900/30",
                  title: "Eksport dla księgowej",
                  desc: "Zestawienia, ewidencja przychodów i pliki JPK gotowe do pobrania lub wysyłki.",
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, desc }) => (
                <div
                  key={title}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick start steps */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Start w 4 krokach
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Pierwsza faktura w 5 minut. Pełna konfiguracja w niecałą godzinę.
            </p>
            <div className="space-y-4">
              {[
                {
                  n: "1",
                  title: "Zarejestruj się i dodaj profil JDG",
                  desc: "Podaj NIP i dane firmy. System automatycznie pobierze dane z bazy GUS.",
                },
                {
                  n: "2",
                  title: "Wystaw pierwszą fakturę",
                  desc: "Dodaj kontrahenta, pozycję i kwotę. PDF i link do płatności gotowe od razu.",
                },
                {
                  n: "3",
                  title: "Połącz konto Stripe (opcjonalnie)",
                  desc: "Płatności online aktywne w kilka minut. Potrzebne tylko konto Stripe Express.",
                },
                {
                  n: "4",
                  title: "Dodaj token KSeF gdy będziesz gotowy",
                  desc: "Token KSeF możesz skonfigurować w dowolnym momencie. Dokumenty są już w formacie KSeF-ready.",
                },
              ].map(({ n, title, desc }) => (
                <div
                  key={n}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {n}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plan info */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 sm:p-8 border border-green-200 dark:border-green-800/30">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Plan podstawowy dla JDG — bez opłat
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              Faktury, rejestr dokumentów, eksport i podstawowy obieg — bezterminowo i bez karty.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Nieograniczone faktury",
                "Rejestr wpływów dokumentów",
                "Eksport danych",
                "Dostęp dla jednej osoby",
                "KSeF-ready format dokumentów",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/rejestracja"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
            >
              Zacznij za darmo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/ksef" className="text-blue-600 dark:text-blue-400 hover:underline">
              KSeF — jak to działa →
            </Link>
            <Link href="/platnosci-online" className="text-blue-600 dark:text-blue-400 hover:underline">
              Płatności online (Stripe) →
            </Link>
            <Link href="/jak-to-dziala" className="text-blue-600 dark:text-blue-400 hover:underline">
              Workflow krok po kroku →
            </Link>
            <Link href="/poradnik" className="text-blue-600 dark:text-blue-400 hover:underline">
              Poradnik dla JDG →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
