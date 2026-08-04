import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Store,
  CreditCard,
  FileText,
  Link2,
  Scale,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Księgowość sklepu internetowego | KsięgaI – Shopify, WooCommerce, Stripe w jednym miejscu",
  description:
    "ksiegai łączy sklep internetowy (Shopify, WooCommerce) z płatnościami Stripe i księgowością. Zamówienia, klienci, VAT, zwroty i płatności — gotowe do faktury i KSeF.",
  keywords:
    "księgowość sklep internetowy, e-commerce księgowość Polska, Shopify księgowość, WooCommerce księgowość, VAT sklep internetowy, faktury zamówienia online",
  alternates: { canonical: "https://www.ksiegai.pl/ecommerce-ksiegowosc/" },
  openGraph: {
    title: "Księgowość sklepu internetowego | KsięgaI",
    description:
      "Sprzedaż ze sklepu, płatności Stripe i księgowość w jednym miejscu — przygotowane do faktury i KSeF, nie zgadywane.",
    url: "https://www.ksiegai.pl/ecommerce-ksiegowosc",
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

export default function EcommerceKsiegowoscPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="ecommerce-ksiegowosc" intent="feature_interest" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
              <ShoppingBag className="h-4 w-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-semibold">Sklep internetowy + ksiegai</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Połącz sklep internetowy z ksiegai
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Importuj zamówienia, klientów, VAT, zwroty i płatności ze swojego sklepu. ksiegai pomoże
              połączyć sprzedaż, Stripe, faktury, KSeF i rozliczenia w jednym miejscu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "ecommerce-ksiegowosc", cta_id: "hero_primary", text: "Połącz swój sklep", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Połącz swój sklep
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="#jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "ecommerce-ksiegowosc", cta_id: "hero_secondary", text: "Zobacz jak działa import", destination: "#jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz jak działa import →
              </TrackedLink>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 mb-10">
              {["Klient kupuje w sklepie", "Zamówienie trafia do ksiegai", "Stripe dopasowuje płatność", "VAT i klient uzupełnione", "faktura gotowa do KSeF"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200">{step}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-gray-600" />}
                </span>
              ))}
            </div>

            <div className="max-w-sm mx-auto rounded-[24px] border border-white/10 bg-slate-900 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">Przykładowe zamówienie</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Zamówienie #1042</span><span className="text-white font-medium tabular-nums">246,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Prowizja Stripe</span><span className="text-white font-medium tabular-nums">5,20 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Wypłata na bank</span><span className="text-white font-medium tabular-nums">240,80 zł</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" />
                  Dopasowano ze Stripe
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
              Sklep pokazuje sprzedaż. Bank pokazuje przelewy. Nikt nie łączy tego ze sobą.
            </h2>
            <ul className="space-y-3">
              {[
                "zamówienia w sklepie nie są automatycznie fakturami",
                "wpłata na koncie to kwota po prowizji, nie wartość zamówienia",
                "zwroty i częściowe zwroty trzeba ręcznie dopasować",
                "NIP klienta biznesowego trzeba znaleźć w danych zamówienia",
                "VAT trzeba policzyć osobno dla każdej pozycji",
                "księgowa dostaje eksport CSV zamiast gotowych danych",
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
              Sklep = co sprzedałeś. Stripe = gdzie trafiły pieniądze. ksiegai łączy oba.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShoppingBag, title: "Zamówienia ze sklepu", desc: "Import zamówień, klientów, produktów, VAT, rabatów i zwrotów z Shopify lub WooCommerce.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
                { icon: CreditCard, title: "Dopasowanie do Stripe", desc: "Zamówienie łączone z płatnością, prowizją i wypłatą na konto bankowe.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { icon: FileText, title: "Dane gotowe do faktury", desc: "Klient, NIP, produkty i VAT wypełnione — wystarczy potwierdzić i wysłać do KSeF.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
                { icon: Store, title: "Jeden widok sprzedaży", desc: "Wszystkie zamówienia z każdego podłączonego sklepu w jednym miejscu, z pełną historią.", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
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

      {/* Store vs Stripe explainer */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sklep i Stripe to dwie różne historie tych samych pieniędzy
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Sklep (Shopify lub WooCommerce) pokazuje co zostało sprzedane — produkty, klienta, VAT,
              rabaty, zwroty. Stripe pokazuje gdzie trafiły pieniądze — płatność, prowizję, wypłatę na
              konto. ksiegai łączy obie strony w jeden ślad: od zamówienia, przez płatność, po
              rozliczenie — więc sprzedaż i przelewy bankowe zawsze się zgadzają.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="jak-to-dziala" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Od zamówienia w sklepie do gotowej faktury
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Podłącz Shopify lub WooCommerce",
                "ksiegai importuje ostatnie zamówienia",
                "Podłącz Stripe (opcjonalnie)",
                "Zamówienia dopasowane do płatności",
                "Sprawdzasz dane klienta i VAT",
                "Tworzysz fakturę jednym kliknięciem",
              ].map((step, i) => (
                <div key={step} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real UI preview */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Podgląd</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tak wyglądają zamówienia w ksiegai</h2>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Link2 className="h-3.5 w-3.5" /> zamówienia — dopasowanie do stripe
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { store: "Shopify", order: "#1042", customer: "Nowak Sp. z o.o.", amount: "246,00 zł", status: "matched" as const },
                  { store: "WooCommerce", order: "#8831", customer: "Jan Kowalski", amount: "129,00 zł", status: "matched" as const },
                  { store: "Shopify", order: "#1041", customer: "Studio ABC", amount: "512,40 zł", status: "review" as const },
                ].map((row) => {
                  const cfg = STATUS_CONFIG[row.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={row.order} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-mono text-slate-400">{row.store} · {row.order}</p>
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
                Dopasowanie łączy zamówienie ze sklepu z płatnością Stripe (kwota + data ±3 dni).
                Brak dopasowania trafia do ręcznego przeglądu, nie znika.
              </p>
            </div>
            <p className="text-center text-xs text-slate-600 mt-4 italic">Dane demonstracyjne — widok oparty o moduł e-commerce w ksiegai.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Co widzisz bez integracji, a co pokazuje ksiegai
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Bez integracji</h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li>Widać tylko wpływ na koncie: 240,80 zł</li>
                  <li>Brak informacji o zamówieniu i produktach</li>
                  <li>Brak danych klienta i NIP</li>
                  <li>Brak informacji o prowizji Stripe</li>
                  <li>Ręczne wystawianie faktury od zera</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-violet-500/40 bg-violet-50 dark:bg-violet-900/10 p-5">
                <h3 className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-4 uppercase tracking-wide">ksiegai</h3>
                <ul className="space-y-2.5 text-sm text-gray-800 dark:text-gray-200">
                  <li>Zamówienie #1042: 246,00 zł</li>
                  <li>Prowizja Stripe: 5,20 zł</li>
                  <li>Wypłata bankowa: 240,80 zł</li>
                  <li>Klient i NIP uzupełnione z zamówienia</li>
                  <li>Faktura gotowa jednym kliknięciem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Dla sklepów internetowych każdej wielkości
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["sklepy Shopify", "sklepy WooCommerce", "sprzedaż B2B i B2C", "marki z jednym lub kilkoma sklepami", "sprzedaż z płatnościami Stripe", "małe zespoły bez działu księgowości"].map((tag) => (
                <span key={tag} className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Miesiąc sprzedaży zamknięty bez ręcznego przepisywania
            </h2>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 sm:p-6">
              <ul className="space-y-3">
                {[
                  "Zamówienia ze sklepu zaimportowane",
                  "Płatności Stripe dopasowane do zamówień",
                  "Zwroty i częściowe zwroty ujęte",
                  "Dane klienta i NIP uzupełnione",
                  "VAT policzony dla każdej pozycji",
                  "Faktury przygotowane do wysyłki i KSeF",
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
              Automatyzacja z kontrolą, nie ślepe fakturowanie
            </h2>
            <p className="text-gray-300 mb-8">
              ksiegai importuje i dopasowuje dane, ale nie wysyła faktury bez Twojej zgody.
              Zamówienia bez pewnego dopasowania trafiają do przeglądu, a nie znikają w tle.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((key) => {
                const { label, className, icon: Icon } = STATUS_CONFIG[key];
                return (
                  <span key={key} className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${className}`}>
                    <Icon className="h-3 w-3" />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              ksiegai przygotowuje dane sprzedaży ze sklepu i dopasowanie do płatności Stripe do
              zafakturowania i księgowania — dokument tworzy i wysyła użytkownik. To pomoc w
              organizacji sprzedaży online, nie automatyczne fakturowanie bez kontroli.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Prowadzisz sklep internetowy?
          </h2>
          <p className="text-violet-100 mb-8 max-w-md mx-auto">
            Połącz Shopify lub WooCommerce z ksiegai i zobacz sprzedaż, Stripe i faktury w jednym miejscu.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "ecommerce-ksiegowosc", cta_id: "footer_cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
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
