import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, Receipt, Shield, Zap } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Płatności online Stripe | KsięgaI – link do płatności przy każdej fakturze",
  description:
    "Przyjmuj płatności online bezpośrednio przy fakturze. Stripe Connect, karta kredytowa, BLIK, przelew. Automatyczne dopasowanie płatności do faktur.",
  keywords:
    "płatności online faktura, Stripe faktura, link do płatności faktura, przyjmowanie płatności online, BLIK faktura, płatność kartą faktura",
  alternates: { canonical: "https://www.ksiegai.pl/platnosci-online/" },
  openGraph: {
    title: "Płatności online przy fakturze | KsięgaI",
    description:
      "Stripe Connect w KsięgaI: link do płatności przy każdej fakturze, automatyczne dopasowanie, status w czasie rzeczywistym.",
    url: "https://www.ksiegai.pl/platnosci-online",
    type: "website",
    locale: "pl_PL",
  },
};

export default function PlatnosciOnlinePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="platnosci-online" intent="feature_interest" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/40 border border-green-500/30 mb-6">
              <CreditCard className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-semibold">Płatności online</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Stripe bezpośrednio przy każdej fakturze
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Wystawiasz fakturę — klient dostaje link do płatności. Karta, BLIK, przelew. Płatność
              automatycznie dopasowuje się do faktury.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "platnosci-online", cta_id: "hero_primary", text: "Aktywuj płatności online", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Aktywuj płatności online
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/faktury"
                event="cta_clicked"
                eventProps={{ page: "platnosci-online", cta_id: "hero_secondary", text: "Jak działa fakturowanie", destination: "/faktury" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Jak działa fakturowanie →
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Jak działa płatność przy fakturze
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  n: "1",
                  title: "Wystawiasz fakturę",
                  desc: "System generuje link do płatności Stripe wraz z numerem faktury.",
                  color: "bg-blue-600",
                },
                {
                  n: "2",
                  title: "Klient dostaje link",
                  desc: "Wysyłasz PDF z fakturą. Link do płatności jest widoczny na dokumencie.",
                  color: "bg-purple-600",
                },
                {
                  n: "3",
                  title: "Klient płaci",
                  desc: "Karta kredytowa, BLIK lub przelew bankowy. Bez konieczności zakładania konta.",
                  color: "bg-green-600",
                },
                {
                  n: "4",
                  title: "Auto-dopasowanie",
                  desc: "Wpłata jest automatycznie dopasowana do faktury. Status zmienia się na 'Opłacona'.",
                  color: "bg-amber-600",
                },
              ].map(({ n, title, desc, color }) => (
                <div key={n} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold`}
                  >
                    {n}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment methods preview */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Podgląd
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Status płatności w systemie
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Payment status list */}
              <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">płatności</span>
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">
                  Faktury — status płatności
                </p>
                <div className="space-y-2">
                  {[
                    { inv: "FV/2025/060", amount: "12 000 zł", method: "Karta", status: "Opłacona", ok: "emerald" },
                    { inv: "FV/2025/061", amount: "5 500 zł", method: "BLIK", status: "Opłacona", ok: "emerald" },
                    { inv: "FV/2025/062", amount: "2 300 zł", method: "Link wysłany", status: "Oczekuje", ok: "amber" },
                    { inv: "FV/2025/063", amount: "8 800 zł", method: "Przelew", status: "Oczekuje", ok: "amber" },
                  ].map((item) => (
                    <div
                      key={item.inv}
                      className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{item.inv}</p>
                        <p className="text-xs text-slate-500">{item.method} • {item.amount}</p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.ok === "emerald"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-amber-400/10 text-amber-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-4">
                    Ten miesiąc
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-xs text-slate-400">Opłacone</p>
                      <p className="text-2xl font-semibold text-white mt-1">34</p>
                      <p className="text-xs text-emerald-400 mt-1">faktur</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-xs text-slate-400">Suma wpłat</p>
                      <p className="text-xl font-semibold text-white mt-1">142 800 zł</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-xs text-slate-400">Oczekujące</p>
                      <p className="text-2xl font-semibold text-amber-300 mt-1">8</p>
                      <p className="text-xs text-slate-500 mt-1">faktur</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-xs text-slate-400">Auto-dopasowane</p>
                      <p className="text-2xl font-semibold text-emerald-300 mt-1">100%</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-900 p-4">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Metody płatności</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Karta Visa/MC", "BLIK", "Przelew bankowy", "Apple Pay"].map((m) => (
                      <span
                        key={m}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-4 italic">Dane demonstracyjne.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Co wchodzi w skład płatności Stripe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: CreditCard,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Stripe Connect",
                  items: [
                    "Konto Stripe Express (płatności na Twój rachunek)",
                    "Aktywacja w kilka minut",
                    "Bez PCI-DSS po stronie aplikacji",
                    "Obsługa wielu firm na jednym koncie",
                  ],
                },
                {
                  icon: Zap,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Automatyzacja",
                  items: [
                    "Auto-dopasowanie wpłat do faktur",
                    "Powiadomienie e-mail po zapłacie",
                    "Zmiana statusu faktury w czasie rzeczywistym",
                    "Eksport zestawień płatności",
                  ],
                },
                {
                  icon: Shield,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Bezpieczeństwo",
                  items: [
                    "Dane kart obsługiwane wyłącznie przez Stripe",
                    "Szyfrowanie TLS dla wszystkich transakcji",
                    "Link do płatności z limitem czasu",
                    "Ślad transakcji przy dokumencie",
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
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Płatności obsługiwane przez Stripe Inc. KsięgaI jest pośrednikiem technicznym — środki
              trafiają bezpośrednio na Twoje konto Stripe. Opłaty transakcyjne zgodne z cennikiem
              Stripe dla platformy Connect.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Aktywuj płatności online przy fakturze
          </h2>
          <p className="text-green-100 mb-8 max-w-md mx-auto">
            Plan podstawowy bezpłatny. Stripe Connect aktywny od razu po podłączeniu konta.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "platnosci-online", cta_id: "footer_cta", text: "Zacznij za darmo", destination: "/rejestracja" }}
            className="inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Zacznij za darmo
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
