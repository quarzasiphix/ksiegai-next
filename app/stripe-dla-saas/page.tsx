import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Landmark,
  Calculator,
  FileText,
  Link2,
  Scale,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Stripe dla SaaS w polskiej firmie | KsięgaI – prowizje, VAT od importu usług, wypłaty",
  description:
    "ksiegai importuje sprzedaż ze Stripe, rozbija prowizje, wylicza VAT od importu usług Stripe (VAT-9M lub JPK_V7 zależnie od statusu firmy) i pomaga dopasować wypłaty Stripe do rachunku bankowego.",
  keywords:
    "Stripe księgowość, Stripe VAT-9M, Stripe import usług VAT, Stripe prowizje księgowanie, Stripe SaaS Polska, rozliczenie Stripe, dopasowanie wypłat Stripe",
  alternates: { canonical: "https://www.ksiegai.pl/stripe-dla-saas/" },
  openGraph: {
    title: "Stripe dla SaaS w polskiej firmie | KsięgaI",
    description:
      "Sprzedaż, prowizje, VAT od importu usług i wypłaty Stripe w jednym miejscu — przygotowane do księgowania, nie zgadywane.",
    url: "https://www.ksiegai.pl/stripe-dla-saas",
    type: "website",
    locale: "pl_PL",
  },
};

const STATUS_CONFIG = {
  imported: { label: "Zaimportowane", className: "bg-muted text-muted-foreground", icon: Clock },
  prepared: { label: "Przygotowane", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", icon: AlertTriangle },
  posted: { label: "Zaksięgowane", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle2 },
  review: { label: "Do weryfikacji", className: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300", icon: FileText },
} as const;

export default function StripeDlaSaasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe-dla-saas" intent="feature_interest" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
              <CreditCard className="h-4 w-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-semibold">Stripe dla SaaS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Rozlicz Stripe w polskiej firmie bez ręcznego liczenia prowizji i VAT od importu usług
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ksiegai importuje sprzedaż ze Stripe, rozbija prowizje, wylicza VAT od importu usług Stripe
              i pomaga przygotować rozliczenie — VAT-9M dla firm zwolnionych z VAT albo ujęcie w JPK_V7
              dla czynnych podatników VAT — a także dopasować wypłaty Stripe do rachunku bankowego.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "stripe-dla-saas", cta_id: "hero_primary", text: "Sprawdź ksiegai dla Stripe", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Sprawdź ksiegai dla Stripe
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="#jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "stripe-dla-saas", cta_id: "hero_secondary", text: "Zobacz jak działa rozliczenie", destination: "#jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz jak działa rozliczenie →
              </TrackedLink>
            </div>

            {/* Flow */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 mb-10">
              {["Klient płaci 100 zł", "Stripe pobiera prowizję", "ksiegai tworzy rozliczenie", "VAT od importu usług na liście zadań", "wypłata dopasowana do banku", "saldo Stripe = 0"].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200">{step}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-gray-600" />}
                </span>
              ))}
            </div>

            {/* Example card */}
            <div className="max-w-sm mx-auto rounded-[24px] border border-white/10 bg-slate-900 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">Przykład rozliczenia</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Sprzedaż brutto</span><span className="text-white font-medium tabular-nums">100,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Prowizje Stripe</span><span className="text-white font-medium tabular-nums">4,00 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">VAT od importu usług</span><span className="text-amber-300 font-medium tabular-nums">0,92 zł</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Wypłata na bank</span><span className="text-white font-medium tabular-nums">96,00 zł</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                <p className="text-[11px] text-slate-400">Dla VAT zwolnionych: <span className="text-slate-200 font-medium">VAT-9M</span></p>
                <p className="text-[11px] text-slate-400">Dla VAT czynnych: <span className="text-slate-200 font-medium">rozliczenie w JPK_V7</span></p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300">
                  <FileText className="h-3 w-3" />
                  Gotowe do sprawdzenia przez księgowość
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
              Stripe pokazuje płatności. Księgowość potrzebuje czegoś więcej.
            </h2>
            <ul className="space-y-3">
              {[
                "wypłata Stripe nie jest przychodem",
                "prowizja Stripe to koszt zagranicznej usługi",
                "VAT od importu usług trzeba policzyć od prowizji",
                "bank pokazuje tylko kwotę po potrąceniach",
                "faktura Stripe przychodzi później i trzeba ją dopasować",
                "księgowa potrzebuje pełnego śladu, nie tylko przelewu z banku",
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
              ksiegai zamienia Stripe w uporządkowane zdarzenia księgowe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CreditCard, title: "Sprzedaż Stripe", desc: "Import sprzedaży i przypisanie jej do faktury, aplikacji lub sprzedaży online.", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
                { icon: Calculator, title: "Prowizje Stripe", desc: "Zbiorcze rozliczenie prowizji za okres zamiast ręcznego rozbijania każdej opłaty.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { icon: FileText, title: "VAT od importu usług", desc: "Wylicza VAT od prowizji Stripe i pokazuje obowiązek zależnie od statusu firmy — VAT-9M albo JPK_V7.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
                { icon: Landmark, title: "Wypłaty i bank", desc: "Dopasowanie wypłaty Stripe do transakcji bankowej i kontrola salda rozrachunkowego.", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
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

      {/* VAT-9M vs JPK_V7 explainer */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              VAT-9M czy JPK_V7? To zależy od statusu VAT.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Jeżeli firma korzysta ze zwolnienia z VAT i nie składa standardowych deklaracji VAT,
              prowizje Stripe mogą oznaczać obowiązek rozliczenia VAT od importu usług przez VAT-9M.
              Jeżeli firma jest czynnym podatnikiem VAT, taki VAT zwykle trafia do standardowego
              rozliczenia VAT/JPK_V7. ksiegai pokazuje obowiązek według statusu firmy, zamiast
              traktować każdy przypadek tak samo.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="jak-to-dziala" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Od płatności do rozliczenia miesiąca
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Podłącz konto Stripe",
                "Zaimportuj płatności, prowizje i wypłaty",
                "ksiegai tworzy rozliczenie okresu Stripe",
                "Importujesz wyciąg bankowy",
                "System dopasowuje wypłatę Stripe do banku",
                "Widzisz, co jest gotowe, a czego jeszcze brakuje",
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

      {/* Real UI: fee accounting + payout reconciliation, modeled on ksef-ai stripe module */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Podgląd</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Tak wygląda rozliczenie prowizji i wypłat w ksiegai</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Fee accounting summary card */}
              <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <FileText className="h-3.5 w-3.5" /> podsumowanie prowizji stripe
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> Zgodny
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-400">Prowizje łącznie</p>
                    <p className="text-lg font-semibold text-white mt-1 tabular-nums">412,80 zł</p>
                    <p className="text-xs text-slate-500">63 pozycje</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-400">VAT-RC (23%)</p>
                    <p className="text-lg font-semibold text-amber-300 mt-1 tabular-nums">94,94 zł</p>
                    <p className="text-xs text-slate-500">409-01 / 222-01</p>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
                  <p className="mb-1 font-sans text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Propozycja dekretu</p>
                  <p>Wn 402-02  412,80 zł  Prowizje operatorów płatności</p>
                  <p>Wn 409-01   94,94 zł  VAT z importu usług (RC)</p>
                  <p>Ma 249-01  412,80 zł  Stripe — konto rozliczeniowe</p>
                  <p>Ma 222-01   94,94 zł  VAT do zapłaty (VAT-9M / JPK_V7)</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-600 text-white">Zaksięguj prowizje</span>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 text-slate-300">Dopasuj fakturę Stripe</span>
                </div>
              </div>

              {/* Payout reconciliation table */}
              <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-4">
                  <Link2 className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-mono text-slate-500">wypłaty — dopasowanie do banku</span>
                </div>
                <div className="space-y-2">
                  {[
                    { id: "po_1N8k…c2df", amount: "1 284,00 zł", status: "Dopasowany", ok: "emerald" },
                    { id: "po_1N8j…a91b", amount: "962,40 zł", status: "Dopasowany", ok: "emerald" },
                    { id: "po_1N8h…f10e", amount: "1 502,10 zł", status: "Oczekuje", ok: "amber" },
                  ].map((row) => (
                    <div key={row.id} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-mono text-slate-400">{row.id}</p>
                        <p className="text-xs text-slate-500">Kwota: {row.amount}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.ok === "emerald" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-4">
                  Dopasowanie łączy wypłatę Stripe z transakcją w wyciągu bankowym (kwota + data ±4 dni).
                  Różnice trafiają do ręcznego potwierdzenia, nie znikają.
                </p>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-4 italic">Dane demonstracyjne — widok oparty o moduł Stripe w ksiegai.</p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Co ksiegai rozumie, czego zwykły import bankowy nie widzi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wide">Zwykły import bankowy</h3>
                <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <li>Widać tylko przelew od Stripe: 96 zł</li>
                  <li>Brak informacji o sprzedaży brutto</li>
                  <li>Brak prowizji</li>
                  <li>Brak VAT od importu usług</li>
                  <li>Brak kontroli salda Stripe</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-violet-500/40 bg-violet-50 dark:bg-violet-900/10 p-5">
                <h3 className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-4 uppercase tracking-wide">ksiegai</h3>
                <ul className="space-y-2.5 text-sm text-gray-800 dark:text-gray-200">
                  <li>Sprzedaż klienta: 100 zł</li>
                  <li>Prowizja Stripe: 4 zł</li>
                  <li>VAT od importu usług: 0,92 zł</li>
                  <li>Wypłata bankowa: 96 zł</li>
                  <li>Saldo Stripe po rozliczeniu: 0 zł</li>
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
              Dla firm, które zarabiają online
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["SaaS i mikro-SaaS", "aplikacje webowe", "subskrypcje", "produkty cyfrowe", "płatne dostępy", "agencje przyjmujące płatności kartą", "twórcy i małe platformy online"].map((tag) => (
                <span key={tag} className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Month close checklist */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Miesiąc zamknięty bez zgadywania
            </h2>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 sm:p-6">
              <ul className="space-y-3">
                {[
                  "Sprzedaż Stripe zaimportowana",
                  "Prowizje Stripe rozliczone",
                  "VAT od importu usług wyliczony",
                  "VAT-9M lub JPK_V7 wskazane zależnie od statusu VAT firmy",
                  "Wypłata dopasowana do banku",
                  "Saldo Stripe sprawdzone",
                  "Faktura Stripe dołączona lub oczekiwana",
                  "Pozycje gotowe do weryfikacji",
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
              Automatyzacja z kontrolą, nie ślepe księgowanie
            </h2>
            <p className="text-gray-300 mb-8">
              ksiegai przygotowuje rozliczenia, pokazuje źródła danych i pozwala sprawdzić każdy zapis.
              System nie ukrywa niepewnych pozycji — oznacza je do weryfikacji.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {["ślad źródłowy", "kolejka księgowa", "możliwość ręcznej korekty"].map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
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
              ksiegai przygotowuje rozliczenia Stripe do księgowania — sprawdzenie i zaksięgowanie
              pozycji potwierdza księgowość. To pomoc w rozliczeniu VAT od prowizji Stripe (VAT-9M
              albo JPK_V7, zależnie od statusu VAT firmy) i dopasowaniu wypłat, nie automatyczna
              księgowość bez sprawdzania.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Używasz Stripe w polskiej firmie?
          </h2>
          <p className="text-violet-100 mb-8 max-w-md mx-auto">
            Podłącz Stripe do ksiegai i zobacz sprzedaż, prowizje, VAT od importu usług oraz wypłaty w jednym miejscu.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "stripe-dla-saas", cta_id: "footer_cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
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
