import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText, Scale } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "VAT od importu usług Stripe (VAT-9M / JPK_V7) | KsięgaI",
  description:
    "Prowizja Stripe to import usługi od zagranicznego usługodawcy — powstaje obowiązek VAT. KsięgaI liczy VAT od importu usług i wskazuje, czy trafia do VAT-9M, czy do standardowego JPK_V7.",
  alternates: { canonical: "https://www.ksiegai.pl/stripe-dla-saas/vat/" },
};

export default function StripeVatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe-dla-saas-vat" intent="feature_interest" />

      <section className="py-12 sm:py-16 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <TrackedLink
            href="/stripe-dla-saas"
            event="cta_clicked"
            eventProps={{ page: "stripe-dla-saas-vat", cta_id: "back", text: "Wróć", destination: "/stripe-dla-saas" }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Stripe dla SaaS
          </TrackedLink>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-500/30 mb-6">
            <FileText className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-semibold">VAT od importu usług</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Stripe Technology Europe wystawia usługę bez VAT. Obowiązek przechodzi na Ciebie.
          </h1>
          <p className="text-lg text-gray-300">
            Stripe pobiera prowizję jako zagraniczny usługodawca — to import usługi, od którego
            polska firma sama nalicza VAT (reverse charge). KsięgaI liczy tę kwotę automatycznie i wskazuje,
            do którego rozliczenia trafia.
          </p>
        </div>
      </section>

      {/* VAT-9M vs JPK_V7 */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Firma zwolniona z VAT</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Nie składasz standardowych deklaracji VAT, ale import usługi od Stripe i tak rodzi
                obowiązek — rozliczasz go osobną deklaracją.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white">
                VAT-9M
              </div>
            </div>
            <div className="rounded-2xl border-2 border-amber-400/50 bg-amber-50 dark:bg-amber-900/10 p-6">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-3 uppercase tracking-wide">Czynny podatnik VAT</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Już składasz JPK_V7 — VAT od importu usług Stripe trafia do tego samego, standardowego
                rozliczenia, po stronie VAT należnego i naliczonego.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-200 dark:bg-amber-900/40 text-sm font-semibold text-amber-900 dark:text-amber-200">
                JPK_V7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dekret + reverse charge item mock */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 text-center font-semibold">Podgląd — pozycja importu usługi</p>
          <div className="max-w-lg mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Import usługi — reverse charge</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Usługodawca</span><span className="text-gray-900 dark:text-gray-100">Stripe (podmiot zagraniczny)</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Kwota netto</span><span className="text-gray-900 dark:text-gray-100 tabular-nums">412,80 zł</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Stawka VAT</span><span className="text-gray-900 dark:text-gray-100">23%</span></div>
              <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-800 pt-2 mt-1">
                <span className="text-gray-900 dark:text-white">VAT do rozliczenia</span>
                <span className="text-amber-600 dark:text-amber-400 tabular-nums">94,94 zł</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ul className="space-y-3">
            {[
              "VAT od importu usług liczy się od kwoty netto prowizji, nie od kwoty faktury klienta",
              "KsięgaI oznacza status firmy (zwolniona / czynny podatnik VAT) i pokazuje właściwą ścieżkę rozliczenia zamiast traktować każdy przypadek tak samo",
              "Pozycja zawiera dane usługodawcy i kraju — gotowa do wykazania w rejestrze importu usług",
              "Rozliczenie jest przygotowane do sprawdzenia, nie księgowane automatycznie bez akceptacji",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">A co z pieniędzmi, które faktycznie wpływają na konto?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/stripe-dla-saas/wyplaty"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-vat", cta_id: "next_wyplaty", text: "Wypłaty i bank", destination: "/stripe-dla-saas/wyplaty" }}
              className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-100 px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              Wypłaty i bank <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/rejestracja"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-vat", cta_id: "cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white hover:bg-white/20 px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              Rozpocznij z ksiegai
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
