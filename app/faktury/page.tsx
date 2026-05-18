import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Receipt,
  Shield,
  Users,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Faktury w KsięgaI – wystawianie, KSeF i płatności online",
  description:
    "Wystawiaj faktury VAT, faktury uproszczone i korygujące. Płatności Stripe bezpośrednio przy fakturze. KSeF-ready. Dostęp dla księgowej.",
  keywords:
    "wystawianie faktur, faktury VAT online, program do fakturowania, faktury KSeF, płatności przy fakturze, faktura link do płatności",
  alternates: { canonical: "https://ksiegai.pl/faktury" },
  openGraph: {
    title: "Faktury w KsięgaI – wystawianie, KSeF, płatności online",
    description:
      "System fakturowania dla JDG i spółek: faktury VAT, KSeF-ready, płatności Stripe, eksport dla księgowej.",
    url: "https://ksiegai.pl/faktury",
    type: "website",
    locale: "pl_PL",
  },
};

export default function FakturyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="faktury" intent="feature_interest" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6">
              <Receipt className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Faktury</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Faktury, płatności i KSeF w jednym miejscu
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Wystawiasz fakturę — od razu dostępny link do płatności Stripe. Dokument gotowy pod KSeF.
              Eksport dla księgowej w jednym kliknięciu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "faktury", cta_id: "hero_primary", text: "Wystaw pierwszą fakturę", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Wystaw pierwszą fakturę
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/darmowy-generator-faktur"
                event="cta_clicked"
                eventProps={{ page: "faktury", cta_id: "hero_secondary", text: "Generator faktur", destination: "/darmowy-generator-faktur" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Generator faktur (bez konta)
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice types */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Obsługiwane typy dokumentów
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-xl mx-auto">
              Od standardowej faktury VAT po korekty — wszystkie formaty w jednym systemie.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                "Faktura VAT",
                "Faktura bez VAT (zwolnienie)",
                "Faktura korygująca",
                "Faktura proforma",
                "Nota korygująca",
                "Rachunek (dla nievatowców)",
              ].map((type) => (
                <div
                  key={type}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex items-center gap-3"
                >
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App preview: invoice creation */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Podgląd
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Faktura w systemie</h2>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-slate-500 font-mono">ksiegai.app / faktury / FV-2025-067</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Numer", value: "FV/2025/067" },
                  { label: "Kontrahent", value: "Kowalski Tech" },
                  { label: "Kwota brutto", value: "12 300 zł" },
                  { label: "Termin", value: "30.01.2025" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">
                  Akcje
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    Pobierz PDF
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-green-600/20 border border-green-500/30 px-4 py-2 text-xs font-semibold text-green-300 hover:bg-green-600/30 transition-colors"
                  >
                    Link do płatności Stripe
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.06] transition-colors"
                  >
                    Wyślij do KSeF
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-xs text-emerald-300">
                  Płatność odebrana 23.01.2025, 14:32 — auto-dopasowano do faktury
                </p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-3 italic">Dane demonstracyjne.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Co wchodzi w skład modułu Faktury
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Receipt,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Wystawianie i edycja",
                  items: [
                    "Automatyczne wyliczenia VAT",
                    "Pobieranie danych kontrahenta z GUS",
                    "Szablony pozycji",
                    "Numeracja automatyczna",
                  ],
                },
                {
                  icon: CreditCard,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Płatności Stripe",
                  items: [
                    "Link do płatności przy każdej fakturze",
                    "Karta kredytowa, BLIK, przelew",
                    "Automatyczne dopasowanie po płatności",
                    "Status płatności w czasie rzeczywistym",
                  ],
                },
                {
                  icon: Shield,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "KSeF",
                  items: [
                    "Format FA(2) XML",
                    "Walidacja przed wysyłką",
                    "Numer KSeF przypisany do faktury",
                    "Archiwum zgodne z wymogami MF",
                  ],
                },
                {
                  icon: Download,
                  iconClass: "text-amber-600 dark:text-amber-400",
                  bgClass: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Eksport i dostęp",
                  items: [
                    "PDF dla klienta",
                    "Zestawienie dla księgowej",
                    "Pliki JPK",
                    "Role: właściciel, księgowa, asystent",
                  ],
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, items }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Zacznij wystawiać faktury za darmo
          </h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Plan podstawowy jest bezpłatny i bezterminowy. Płatności Stripe i KSeF dostępne od razu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedLink
              href="/rejestracja"
              event="cta_clicked"
              eventProps={{ page: "faktury", cta_id: "footer_primary", text: "Załóż konto", destination: "/rejestracja" }}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
            >
              Załóż konto
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/darmowy-generator-faktur"
              event="cta_clicked"
              eventProps={{ page: "faktury", cta_id: "footer_secondary", text: "Generator bez konta", destination: "/darmowy-generator-faktur" }}
              className="inline-flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
            >
              Generator bez konta
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
