import type { Metadata } from "next";
import {
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  Crown,
  FileSignature,
  Inbox,
  Landmark,
  Rocket,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";
import KsefAssistFunnel from "../ksef-asysta/KsefAssistFunnel";

// KsięgaI Start (product "company_start") — public landing for freshly
// registered spółki / fundacje / stowarzyszenia. Same lead funnel as
// /ksef-asysta (ksef-assist-lead, product=company_start → invite with
// campaign_source "company_start_funnel" → RegisterClient → app /podmiot/start).

export const metadata: Metadata = {
  title: "KsięgaI Start — co zrobić po rejestracji spółki, fundacji lub stowarzyszenia | KsięgaI",
  description:
    "Właśnie zarejestrowałeś spółkę, fundację albo stowarzyszenie? Powiemy Ci, co zrobić dalej, i pomożemy to uruchomić: KSeF, e-Doręczenia, rachunek, CRBR, podatki, zarząd i dokumenty. 399 zł + 6 miesięcy Premium.",
  keywords:
    "co po rejestracji spółki, formalności po rejestracji spółki, CRBR spółka, e-Doręczenia spółka, KSeF spółka, fundacja po rejestracji, stowarzyszenie po rejestracji",
  alternates: { canonical: "https://www.ksiegai.pl/start-podmiotu/" },
  openGraph: {
    title: "KsięgaI Start — uruchomimy Twój podmiot po rejestracji",
    description:
      "KSeF, e-Doręczenia, bank, CRBR, podatki i pierwsze uchwały — przejdziemy przez to razem. 399 zł + 6 miesięcy Premium.",
    url: "https://www.ksiegai.pl/start-podmiotu",
    type: "website",
    locale: "pl_PL",
  },
};

const AREAS = [
  { icon: Landmark, title: "KSeF", body: "Uprawnienia, dostęp i pierwsza faktura z UPO." },
  { icon: Inbox, title: "e-Doręczenia", body: "Adres do doręczeń elektronicznych z urzędów." },
  { icon: Wallet, title: "Rachunek bankowy", body: "Konto firmowe i zgłoszenie go do urzędu skarbowego." },
  { icon: ShieldCheck, title: "CRBR", body: "Zgłoszenie beneficjentów rzeczywistych w terminie." },
  { icon: BookOpenCheck, title: "Podatki i księgowość", body: "VAT, forma opodatkowania i to, co trzeba zgłosić w US." },
  { icon: Users, title: "Zarząd i wspólnicy", body: "Dane organów i zasady reprezentacji — kompletne." },
  { icon: FileSignature, title: "Dokumenty i uchwały", body: "Dokumenty w jednym miejscu i pierwsze uchwały." },
  { icon: CalendarClock, title: "Ważne terminy", body: "Co i do kiedy — z przypomnieniami." },
];

const VARIANTS = ["KsięgaI Start Spółki", "KsięgaI Start Fundacji", "KsięgaI Start Stowarzyszenia"];

export default function StartPodmiotuPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="start_podmiotu" intent="company_start_purchase" />
      <style>{`
        @keyframes sp-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes sp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes sp-tick { 0% { opacity: .35; } 100% { opacity: 1; } }
        .sp-rise { opacity: 0; animation: sp-rise .6s cubic-bezier(.22,1,.36,1) forwards; }
        .sp-float { animation: sp-float 7s ease-in-out infinite; }
        .sp-tick { opacity: .35; animation: sp-tick .4s ease forwards; }
        @media (prefers-reduced-motion: reduce) { .sp-rise, .sp-tick { opacity: 1; animation: none; } .sp-float { animation: none; } }
      `}</style>

      <section className="relative overflow-hidden py-16 sm:py-24 bg-gray-950 border-b border-gray-800">
        <div className="sp-float pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="sp-float pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl [animation-delay:-3s]" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="sp-rise inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
              <Rocket className="h-4 w-4 text-violet-300" />
              <span className="text-violet-200 text-sm font-semibold">KsięgaI Start</span>
            </div>
            <h1
              className="sp-rise text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight"
              style={{ animationDelay: "80ms" }}
            >
              Zarejestrowane.{" "}
              <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-emerald-200 bg-clip-text text-transparent">
                Teraz uruchomimy to razem.
              </span>
            </h1>
            <p className="sp-rise text-lg text-gray-300 max-w-2xl mx-auto" style={{ animationDelay: "160ms" }}>
              Właśnie zarejestrowałeś spółkę, fundację albo stowarzyszenie? Powiemy Ci, co trzeba zrobić dalej, i pomożemy
              doprowadzić wszystko do porządku — od KSeF po pierwsze uchwały.
            </p>
            <div className="sp-rise mt-6 flex flex-wrap justify-center gap-2" style={{ animationDelay: "240ms" }}>
              {VARIANTS.map((v) => (
                <span key={v} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {v}
                </span>
              ))}
            </div>
            <div
              className="sp-rise mt-8 inline-flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-left"
              style={{ animationDelay: "320ms" }}
            >
              <Crown className="h-5 w-5 shrink-0 text-amber-300" />
              <span className="text-sm text-amber-100">
                <strong className="text-white">399 zł jednorazowo</strong> · w cenie <strong className="text-white">6 miesięcy Premium</strong> za darmo
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Co uruchomimy razem</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Wszystko, czego nowy podmiot potrzebuje po wpisie do KRS — w jednej rozmowie i jednym miejscu.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {AREAS.map(({ icon: Icon, title, body }, i) => (
                  <div
                    key={title}
                    className="sp-rise rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-transform hover:-translate-y-1"
                    style={{ animationDelay: `${120 + i * 60}ms` }}
                  >
                    <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
                    <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{body}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Rozmowa startowa — konfigurujemy razem, na Twoim ekranie",
                  "Wolisz sam? Lista kroków po rejestracji w KsięgaI jest bezpłatna",
                  "KSeF i wystawianie faktur w KsięgaI bez dodatkowych opłat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-xs leading-5 text-gray-600 dark:text-gray-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Nie prosimy o hasła, dane logowania ani przekazanie podpisu elektronicznego. To wsparcie organizacyjne, a
                  nie porada prawna ani podatkowa. Potrzebujesz pomocy tylko z KSeF? Zobacz{" "}
                  <a href="/ksef-asysta" className="underline underline-offset-2">Asystę KSeF</a>.
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <p className="mb-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                Sprawdź swój podmiot po numerze KRS
              </p>
              <KsefAssistFunnel product="company_start" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
