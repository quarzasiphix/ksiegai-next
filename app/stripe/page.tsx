import type { Metadata } from "next";
import {
  ArrowRight,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  FileCheck,
  RefreshCw,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Płatności online za faktury (Stripe) | KsięgaI – BLIK, karta, Google Pay, zgodność z KSeF",
  description:
    "Przyjmuj płatności za faktury przez Stripe — BLIK, karta, Google Pay i Apple Pay. Każda płatność jest dopasowana do faktury zgodnej z KSeF i księgowana automatycznie, bez ręcznego uzgadniania z bankiem.",
  keywords:
    "płatności online faktury, Stripe Connect Polska, BLIK online faktura, płatność kartą faktura, KSeF płatności online, przyjmowanie płatności online",
  alternates: { canonical: "https://www.ksiegai.pl/stripe/" },
  openGraph: {
    title: "Płatności online za faktury przez Stripe | KsięgaI",
    description:
      "BLIK, karta, Google Pay i Apple Pay na fakturze — płatność automatycznie dopasowana i zaksięgowana, zgodnie z KSeF.",
    url: "https://www.ksiegai.pl/stripe",
    type: "website",
    locale: "pl_PL",
  },
};

export default function StripePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe" intent="feature_interest" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6">
                <CreditCard className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-semibold">Płatności online za faktury</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Klient płaci fakturę BLIK-iem, kartą albo Google Pay. Ty nie uzgadniasz nic ręcznie.
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Podłącz Stripe do KsięgaI (Stripe Connect Express) i udostępnij klientowi link do faktury.
                Płatność jest od razu dopasowana do dokumentu, oznaczona jako opłacona i gotowa do
                zaksięgowania — zgodnie z fakturą wystawioną pod KSeF.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedLink
                  href="/rejestracja"
                  event="cta_clicked"
                  eventProps={{ page: "stripe", cta_id: "hero_primary", text: "Zacznij przyjmować płatności", destination: "/rejestracja" }}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
                >
                  Zacznij przyjmować płatności
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/stripe-dla-saas"
                  event="cta_clicked"
                  eventProps={{ page: "stripe", cta_id: "hero_secondary", text: "Masz już własne konto Stripe w SaaS?", destination: "/stripe-dla-saas" }}
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
                >
                  Masz już własne konto Stripe w SaaS? →
                </TrackedLink>
              </div>
            </div>

            {/* Real payment widget mock */}
            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5 max-w-sm mx-auto w-full">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-1">Opłać fakturę online</p>
              <p className="text-[11px] text-slate-500 mb-4">Zapłać szybko i bezpiecznie — przez BLIK, Google Pay, Apple Pay lub kartą.</p>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 mb-3 grid grid-cols-2 gap-2 text-[11px]">
                <div><p className="text-slate-500 uppercase tracking-wide">Faktura</p><p className="text-white font-medium">F/002/06/26</p></div>
                <div><p className="text-slate-500 uppercase tracking-wide">Do zapłaty</p><p className="text-white font-medium">500,00 zł</p></div>
              </div>
              <div className="rounded-xl bg-black border border-white/10 p-4 mb-3">
                <p className="text-center text-[10px] font-bold tracking-widest text-slate-300 mb-2">BLIK</p>
                <p className="text-center text-xs text-slate-400 mb-3">Wpisz 6-cyfrowy kod BLIK</p>
                <div className="h-9 rounded-lg border border-white/15 bg-white/5" />
              </div>
              <div className="h-10 rounded-xl bg-black border border-white/10 mb-2 flex items-center justify-center text-xs text-slate-300 font-medium">
                G Pay · Apple Pay
              </div>
              <div className="h-10 rounded-xl bg-emerald-500 mb-3 flex items-center justify-center text-sm font-semibold text-gray-900">
                Pay with Link
              </div>
              <div className="h-10 rounded-xl bg-white flex items-center justify-center text-sm font-semibold text-gray-900 gap-2">
                <CreditCard className="h-4 w-4" /> Zapłać kartą
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it connects to compliance */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              To nie jest osobny system płatności. To ta sama faktura.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Link płatności generuje się z dokumentu, który już spełnia wymogi KSeF — dane sprzedawcy,
              nabywcy, pozycji i VAT są te same co na fakturze. Płatność nie jest osobnym zdarzeniem,
              które trzeba później dopasować ręcznie do dokumentu.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: FileCheck, title: "Faktura zgodna z KSeF", desc: "Ta sama struktura danych co w wysyłce do KSeF — płatność online nie tworzy rozjazdu w dokumentacji." },
              { icon: RefreshCw, title: "Automatyczne dopasowanie", desc: "Wpłata jest łączona z fakturą i statusem płatności bez ręcznego zaznaczania „opłacone”." },
              { icon: ShieldCheck, title: "Ślad dla US i audytu", desc: "Historia płatności, prowizji i wypłat jest widoczna i możliwa do zweryfikowania w każdej chwili." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect dashboard mock */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Podgląd</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Wpływy za faktury w jednym panelu</h2>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Landmark className="h-3.5 w-3.5" /> stripe connect — wpływy za faktury
                </span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium bg-emerald-400/10 text-emerald-300">
                  Aktywny
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Łączne wpływy", value: "12 480,00 zł", sub: "18 opłaconych" },
                  { label: "Oczekujące", value: "1 240,00 zł", sub: "2 transakcje" },
                  { label: "Zwroty", value: "0,00 zł", sub: "0 zwrotów" },
                  { label: "Ostatnia płatność", value: "BLIK", sub: "2 min temu" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-[11px] text-slate-400">{stat.label}</p>
                    <p className="text-base font-semibold text-white mt-1 tabular-nums">{stat.value}</p>
                    <p className="text-[10px] text-slate-500">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-4 italic">Dane demonstracyjne — widok oparty o moduł Stripe Connect w KsięgaI.</p>
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Metody, których klienci faktycznie używają w Polsce
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["BLIK", "Karta płatnicza", "Google Pay", "Apple Pay", "Link (zapamiętana płatność)"].map((method) => (
                <span key={method} className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <Smartphone className="h-3.5 w-3.5" />
                  {method}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Klient nie zakłada konta ani nie instaluje niczego — otwiera link do faktury i płaci metodą, której już używa.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Uruchomienie zajmuje kilka minut
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "Połącz konto Stripe Connect Express w Ustawieniach firmy",
                "Wystaw fakturę i udostępnij klientowi link do płatności",
                "Płatność księguje się automatycznie po stronie wpływów firmy",
              ].map((step, i) => (
                <div key={step} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell to stripe-dla-saas */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-violet-500/30 bg-violet-50 dark:bg-violet-900/10 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Masz już własne konto Stripe, bo Twój SaaS pobiera opłaty od klientów?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              To osobna sprawa od przyjmowania płatności za faktury — chodzi o rozliczenie prowizji, VAT
              od importu usług i wypłat z Twojego głównego konta Stripe. KsięgaI obsługuje oba przypadki
              niezależnie, możesz połączyć jedno, drugie albo obydwa.
            </p>
            <TrackedLink
              href="/stripe-dla-saas"
              event="cta_clicked"
              eventProps={{ page: "stripe", cta_id: "cross_sell_saas", text: "Zobacz Stripe dla SaaS →", destination: "/stripe-dla-saas" }}
              className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-2xl font-semibold transition-all text-sm"
            >
              Zobacz Stripe dla SaaS
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Płatności obsługuje Stripe Payments Europe, Ltd. przez Stripe Connect Express. KsięgaI
              nie przechowuje danych karty ani BLIK — środki trafiają na Twoje konto Stripe, a wypłaty
              na Twój rachunek bankowy zgodnie z harmonogramem Stripe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-violet-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Przestań czekać na przelewy
          </h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Podłącz Stripe Connect i pozwól klientom płacić fakturę od razu — BLIK, kartą albo Google Pay.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "stripe", cta_id: "footer_cta", text: "Rozpocznij z KsięgaI", destination: "/rejestracja" }}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Rozpocznij z KsięgaI
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
