import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Store,
  CreditCard,
  FileText,
  Link2,
  Scale,
  AlertTriangle,
  Clock,
  Package,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "WooCommerce księgowość Polska | KsięgaI – zamówienia, NIP/VAT, Stripe i faktury",
  description:
    "Połącz WooCommerce z ksiegai i importuj zamówienia z WordPress, dane klientów, numery NIP/VAT, produkty, podatki, wysyłkę, rabaty i zwroty. Dopasowanie do Stripe i faktury.",
  keywords:
    "WooCommerce księgowość, WooCommerce Polska VAT, WooCommerce NIP faktura, WooCommerce Stripe rozliczenie, integracja WooCommerce księgowość, WordPress sklep księgowość",
  alternates: { canonical: "https://www.ksiegai.pl/woocommerce-ksiegowosc/" },
  openGraph: {
    title: "WooCommerce księgowość Polska | KsięgaI",
    description:
      "Zamówienia z WooCommerce, NIP klientów, dopasowanie do Stripe i dane gotowe do faktury.",
    url: "https://www.ksiegai.pl/woocommerce-ksiegowosc",
    type: "website",
    locale: "pl_PL",
  },
};

const STATUS_CONFIG = {
  imported: { label: "Zaimportowane", className: "bg-muted text-muted-foreground", icon: Clock },
  matched: { label: "Dopasowane ze Stripe", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle2 },
  review: { label: "Wymaga przeglądu", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", icon: AlertTriangle },
  ready: { label: "Gotowe do faktury", className: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300", icon: FileText },
} as const;

export default function WooCommerceKsiegowoscPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="woocommerce-ksiegowosc" intent="feature_interest" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
              <Store className="h-4 w-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-semibold">WooCommerce + ksiegai</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Rozlicz sklep WooCommerce razem z NIP klientów i VAT
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ksiegai importuje z Twojego sklepu WordPress zamówienia, dane klientów, numery NIP/VAT,
              produkty, podatki, koszty wysyłki, rabaty, zwroty i status płatności.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "woocommerce-ksiegowosc", cta_id: "hero_primary", text: "Połącz WooCommerce", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Połącz WooCommerce
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="#jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "woocommerce-ksiegowosc", cta_id: "hero_secondary", text: "Zobacz jak działa import", destination: "#jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz jak działa import →
              </TrackedLink>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 mb-10">
              {["Podajesz adres sklepu", "Wklejasz klucz i sekret API", "Testujesz połączenie", "ksiegai importuje zamówienia"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200">{step}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-gray-600" />}
                </span>
              ))}
            </div>

            <div className="max-w-sm mx-auto rounded-[24px] border border-white/10 bg-slate-900 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">Przykładowe zamówienie WooCommerce</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Zamówienie #8831</span><span className="text-white font-medium tabular-nums">129,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">NIP klienta</span><span className="text-white font-medium tabular-nums">525-000-00-00</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Wysyłka</span><span className="text-white font-medium tabular-nums">12,00 zł</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" />
                  Gotowe do faktury
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              WooCommerce pokazuje zamówienia. Faktura wymaga więcej danych.
            </h2>
            <ul className="space-y-3">
              {[
                "NIP klienta biznesowego trzeba znaleźć w danych zamówienia lub wtyczce",
                "eksport zamówień z WordPress to plik CSV, nie faktura",
                "wpłata na koncie (Stripe/inny operator) to kwota po prowizji",
                "koszty wysyłki i rabaty trzeba doliczyć ręcznie",
                "zwroty i częściowe zwroty umykają w tabelce",
                "księgowa nie ma dostępu do panelu WordPress",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solution cards */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              ksiegai zamienia WooCommerce w gotowe dane do faktury
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Store, title: "Zamówienia WooCommerce", desc: "Import zamówień, klientów, produktów, podatków, wysyłki, rabatów i zwrotów z Twojego sklepu WordPress.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
                { icon: FileText, title: "NIP i dane VAT", desc: "Numer NIP klienta biznesowego rozpoznawany automatycznie z danych zamówienia.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
                { icon: CreditCard, title: "Dopasowanie do Stripe", desc: "Jeśli sklep przyjmuje płatności przez Stripe, ksiegai łączy zamówienie z płatnością i wypłatą na bank.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { icon: Package, title: "Produkty i rabaty", desc: "Każda pozycja zamówienia z ilością, ceną, VAT i rabatem — gotowa do przeniesienia na fakturę.", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="bg-white dark:bg-gray-950 rounded-2xl p-5 border border-gray-200 dark:border-gray-800">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="jak-to-dziala" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Podłączenie WooCommerce w 4 krokach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Podaj adres URL sklepu WordPress",
                "Wygeneruj klucz i sekret REST API",
                "Przetestuj połączenie",
                "ksiegai importuje ostatnie zamówienia",
              ].map((step, i) => (
                <div key={step} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
              Klucz API generujesz sam: WooCommerce → Ustawienia → Zaawansowane → REST API.
              Wystarczą uprawnienia do odczytu.
            </p>
          </div>
        </div>
      </section>

      {/* Real UI preview */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Podgląd</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tak wyglądają zamówienia WooCommerce w ksiegai</h2>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Link2 className="h-3.5 w-3.5" /> zamówienia woocommerce — nip i dopasowanie stripe
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { order: "#8831", customer: "Nowak Sp. z o.o. · NIP 525-000-00-00", amount: "129,00 zł", status: "matched" as const },
                  { order: "#8829", customer: "Jan Kowalski", amount: "64,50 zł", status: "matched" as const },
                  { order: "#8824", customer: "Studio ABC · NIP 118-000-00-00", amount: "289,00 zł", status: "review" as const },
                ].map((row) => {
                  const cfg = STATUS_CONFIG[row.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={row.order} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-mono text-slate-400">WooCommerce · {row.order}</p>
                        <p className="text-xs text-slate-500">{row.customer} — {row.amount}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${cfg.className}`}>
                        <Icon className="h-3 w-3" />
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 mt-4">
                NIP jest odczytywany z danych zamówienia, jeśli sklep go zbiera (np. przez wtyczkę VAT/fakturową).
              </p>
            </div>
            <p className="text-center text-xs text-slate-600 mt-4 italic">Dane demonstracyjne — widok oparty o moduł e-commerce w ksiegai.</p>
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Dla sklepów działających na WordPress i WooCommerce
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["sklepy WooCommerce B2C", "sklepy WooCommerce B2B", "sprzedaż z NIP klientów firmowych", "sklepy z płatnościami Stripe", "właściciele bez działu księgowości"].map((tag) => (
                <span key={tag} className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Sprzedaż WooCommerce gotowa do rozliczenia
            </h2>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-6">
              <ul className="space-y-3">
                {[
                  "Zamówienia WooCommerce zaimportowane",
                  "NIP klientów rozpoznane",
                  "Płatności Stripe dopasowane",
                  "Wysyłka, rabaty i zwroty ujęte",
                  "VAT policzony dla każdej pozycji",
                  "Faktury gotowe do wysyłki i KSeF",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Scale className="h-4 w-4 text-slate-300" />
              <span className="text-slate-300 text-sm font-semibold">Kontrola, nie automat</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Import z kontrolą, nie ślepe fakturowanie
            </h2>
            <p className="text-gray-300 mb-8">
              ksiegai importuje zamówienia i próbuje dopasować je do Stripe, ale niczego nie księguje
              bez Twojej zgody. Zamówienia bez pewnego dopasowania trafiają do przeglądu.
            </p>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              ksiegai importuje zamówienia z WooCommerce i przygotowuje je do zafakturowania — dokument
              tworzy i wysyła użytkownik. Integracja korzysta z klucza REST API Twojego sklepu, bez
              instalacji dodatkowej wtyczki.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Masz sklep na WooCommerce?
          </h2>
          <p className="text-violet-100 mb-8 max-w-md mx-auto">
            Połącz WooCommerce z ksiegai i zobacz zamówienia, NIP klientów i faktury w jednym miejscu.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "woocommerce-ksiegowosc", cta_id: "footer_cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
            className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Rozpocznij z ksiegai
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
