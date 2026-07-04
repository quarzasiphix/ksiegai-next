import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CreditCard, Receipt } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Sprzedaż Stripe w KsięgaI | Import płatności i przypisanie do faktury",
  description:
    "Każda płatność Stripe za fakturę jest automatycznie rozbita na kwotę faktury, prowizję Stripe i kwotę faktycznie otrzymaną na konto — bez ręcznego liczenia.",
  alternates: { canonical: "https://www.ksiegai.pl/stripe-dla-saas/sprzedaz/" },
};

export default function StripeSprzedazPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe-dla-saas-sprzedaz" intent="feature_interest" />

      <section className="py-12 sm:py-16 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <TrackedLink
            href="/stripe-dla-saas"
            event="cta_clicked"
            eventProps={{ page: "stripe-dla-saas-sprzedaz", cta_id: "back", text: "Wróć", destination: "/stripe-dla-saas" }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Stripe dla SaaS
          </TrackedLink>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
            <CreditCard className="h-4 w-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-semibold">Sprzedaż Stripe</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Wpłata od klienta to nie to samo, co kwota faktury
          </h1>
          <p className="text-lg text-gray-300">
            Klient płaci pełną kwotę faktury. Stripe potrąca prowizję, zanim pieniądze trafią na Twoje
            konto. KsięgaI rozbija tę różnicę automatycznie na każdej opłaconej fakturze, więc nie musisz
            jej wyliczać ręcznie z wyciągu bankowego.
          </p>
        </div>
      </section>

      {/* Real component mock: invoice payment breakdown */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-md mx-auto">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center font-semibold">Podgląd — karta faktury</p>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Rozliczenie Stripe</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Kwota faktury</span>
                  <span className="text-gray-900 dark:text-gray-100 tabular-nums">1 200,00 zł</span>
                </div>
                <div className="flex justify-between text-amber-700 dark:text-amber-500">
                  <span>Prowizja Stripe</span>
                  <span className="tabular-nums">−28,80 zł</span>
                </div>
                <div className="flex justify-between font-medium border-t border-gray-200 dark:border-gray-800 pt-1.5 mt-0.5">
                  <span className="text-gray-900 dark:text-gray-100">Otrzymano na konto</span>
                  <span className="text-green-700 dark:text-green-500 tabular-nums">1 171,20 zł</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-3 italic">
              Ten widok pojawia się bezpośrednio na karcie faktury opłaconej przez Stripe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Płatność ↔ faktura", desc: "Każda płatność Stripe jest powiązana z konkretną fakturą — nie musisz szukać, która wpłata odpowiada któremu dokumentowi." },
              { title: "Prowizja widoczna od razu", desc: "Kwota prowizji pojawia się na karcie faktury w momencie zaksięgowania płatności, bez czekania na zestawienie okresowe." },
              { title: "Kwota netto na bank", desc: "To, co faktycznie wpływa na rachunek bankowy, jest jasno oddzielone od kwoty brutto faktury." },
              { title: "Podstawa do rozliczenia prowizji", desc: "Te same dane zasilają zbiorcze rozliczenie prowizji za okres — zobacz jak wygląda dalej." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-3">
                  <Receipt className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Zobacz resztę rozliczenia Stripe</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/stripe-dla-saas/prowizje"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-sprzedaz", cta_id: "next_prowizje", text: "Prowizje Stripe", destination: "/stripe-dla-saas/prowizje" }}
              className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-100 px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              Prowizje Stripe <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/rejestracja"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-sprzedaz", cta_id: "cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
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
