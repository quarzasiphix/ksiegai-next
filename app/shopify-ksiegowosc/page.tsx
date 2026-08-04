import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
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
  title: "Shopify księgowość Polska | KsięgaI – zamówienia, VAT, Stripe i faktury",
  description:
    "Połącz Shopify z ksiegai i importuj zamówienia, klientów, produkty, VAT, zwroty i status płatności. Dopasowanie do Stripe i gotowe dane do faktury oraz KSeF.",
  keywords:
    "Shopify księgowość, Shopify Polska VAT, Shopify faktury, Shopify Stripe rozliczenie, integracja Shopify księgowość, Shopify zamówienia import",
  alternates: { canonical: "https://www.ksiegai.pl/shopify-ksiegowosc/" },
  openGraph: {
    title: "Shopify księgowość Polska | KsięgaI",
    description:
      "Zamówienia ze Shopify, dopasowanie do Stripe i dane gotowe do faktury — w jednym miejscu.",
    url: "https://www.ksiegai.pl/shopify-ksiegowosc",
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

export default function ShopifyKsiegowoscPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="shopify-ksiegowosc" intent="feature_interest" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/40 border border-emerald-500/30 mb-6">
              <ShoppingBag className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-semibold">Shopify + ksiegai</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Rozlicz sklep Shopify bez ręcznego przepisywania zamówień
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ksiegai importuje ze Shopify zamówienia, klientów, produkty, podatki, zwroty i status
              płatności. Wiesz od razu, co zostało sprzedane, co wymaga zafakturowania i co przygotować
              do rozliczeń.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "shopify-ksiegowosc", cta_id: "hero_primary", text: "Połącz Shopify", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Połącz Shopify
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="#jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "shopify-ksiegowosc", cta_id: "hero_secondary", text: "Zobacz jak działa import", destination: "#jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz jak działa import →
              </TrackedLink>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 mb-10">
              {["Podajesz adres sklepu", "Wklejasz token dostępu", "Potwierdzasz połączenie", "ksiegai importuje zamówienia"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200">{step}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-gray-600" />}
                </span>
              ))}
            </div>

            <div className="max-w-sm mx-auto rounded-[24px] border border-white/10 bg-slate-900 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">Przykładowe zamówienie Shopify</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Zamówienie #1042</span><span className="text-white font-medium tabular-nums">246,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">VAT</span><span className="text-white font-medium tabular-nums">46,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Metoda płatności</span><span className="text-white font-medium">Shopify Payments (Stripe)</span></div>
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
              Shopify pokazuje zamówienia. Księgowość potrzebuje czegoś więcej.
            </h2>
            <ul className="space-y-3">
              {[
                "eksport zamówień z panelu Shopify to plik, nie gotowe faktury",
                "wpłata Shopify Payments na koncie to kwota po prowizji",
                "zwroty trzeba ręcznie dopasować do zamówień",
                "dane klienta biznesowego trzeba wyszukać osobno",
                "VAT z każdej pozycji trzeba przeliczyć ręcznie",
                "księgowa nie ma dostępu do panelu Shopify",
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
              ksiegai zamienia Shopify w uporządkowaną sprzedaż
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShoppingBag, title: "Zamówienia Shopify", desc: "Import zamówień, klientów, produktów, podatków, rabatów i zwrotów wprost z panelu Shopify.", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                { icon: CreditCard, title: "Dopasowanie do Stripe", desc: "Jeśli sklep przyjmuje płatności przez Stripe, ksiegai łączy zamówienie z płatnością, prowizją i wypłatą.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { icon: Package, title: "Produkty i VAT", desc: "Każda pozycja zamówienia z ilością, ceną i podatkiem — gotowa do przeniesienia na fakturę.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
                { icon: FileText, title: "Gotowe do faktury", desc: "Dane klienta i pozycje wypełnione automatycznie — wystarczy potwierdzić i wysłać do KSeF.", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
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
              Podłączenie Shopify w 4 krokach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Podaj adres sklepu Shopify",
                "Wklej token dostępu (Admin API)",
                "Potwierdź połączenie",
                "ksiegai importuje ostatnie zamówienia",
              ].map((step, i) => (
                <div key={step} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold mb-3">
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
              Token dostępu tworzysz sam w panelu Shopify (aplikacja niestandardowa) — ksiegai nie
              wymaga instalacji z App Store.
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
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tak wyglądają zamówienia Shopify w ksiegai</h2>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Link2 className="h-3.5 w-3.5" /> zamówienia shopify — dopasowanie do stripe
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { order: "#1042", customer: "Nowak Sp. z o.o.", amount: "246,00 zł", status: "matched" as const },
                  { order: "#1039", customer: "Anna Wiśniewska", amount: "89,00 zł", status: "matched" as const },
                  { order: "#1035", customer: "Studio ABC", amount: "512,40 zł", status: "review" as const },
                ].map((row) => {
                  const cfg = STATUS_CONFIG[row.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={row.order} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-mono text-slate-400">Shopify · {row.order}</p>
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
                Jeśli Stripe nie jest połączony, ksiegai pokazuje to wprost zamiast zgadywać dopasowanie.
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
              Dla sklepów działających na Shopify
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["sklepy Shopify B2C", "sklepy Shopify B2B", "marki z płatnościami Shopify Payments", "sprzedaż z Polski i za granicę", "właściciele bez działu księgowości"].map((tag) => (
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
              Sprzedaż Shopify gotowa do rozliczenia
            </h2>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-6">
              <ul className="space-y-3">
                {[
                  "Zamówienia Shopify zaimportowane",
                  "Klienci i NIP uzupełnieni",
                  "Płatności Stripe dopasowane",
                  "Zwroty ujęte w zamówieniu",
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
              ksiegai importuje zamówienia z Shopify i przygotowuje je do zafakturowania — dokument
              tworzy i wysyła użytkownik. Integracja korzysta z tokenu dostępu Twojego sklepu, nie
              wymaga instalacji aplikacji z Shopify App Store.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Masz sklep na Shopify?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-md mx-auto">
            Połącz Shopify z ksiegai i zobacz zamówienia, płatności Stripe i faktury w jednym miejscu.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "shopify-ksiegowosc", cta_id: "footer_cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Rozpocznij z ksiegai
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
