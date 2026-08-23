import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";
import KsefAssistFunnel from "./KsefAssistFunnel";

export const metadata: Metadata = {
  title: "Asysta przy aktywacji KSeF — indywidualna pomoc | KsięgaI",
  description:
    "Podaj NIP lub KRS swojej firmy, a pomożemy Ci krok po kroku aktywować KSeF — sprawdzimy uprawnienia, skonfigurujemy dostęp i wyślemy pierwszą fakturę razem z Tobą.",
  keywords: "asysta KSeF, pomoc z KSeF, aktywacja KSeF, konfiguracja KSeF, token KSeF pomoc",
  alternates: { canonical: "https://www.ksiegai.pl/ksef-asysta/" },
  openGraph: {
    title: "Asysta przy aktywacji KSeF — indywidualna pomoc",
    description:
      "Sprawdzimy Twoją firmę i pomożemy krok po kroku uruchomić KSeF — bez stresu, bez zgadywania.",
    url: "https://www.ksiegai.pl/ksef-asysta",
    type: "website",
    locale: "pl_PL",
  },
};

const INCLUDED_ITEMS = [
  "sprawdzić uprawnienia do firmy",
  "przejść przez proces uwierzytelnienia",
  "skonfigurować dostęp do KSeF",
  "połączyć firmę z KsięgaI",
  "pobrać pierwsze faktury",
  "wysłać fakturę testową i sprawdzić UPO",
  "zrozumieć, jak korzystać z KSeF na co dzień",
];

export default function KsefAsystaPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="ksef_asysta" intent="ksef_assist_purchase" />

      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/40 border border-violet-500/30 mb-6">
              <Sparkles className="h-4 w-4 text-violet-300" />
              <span className="text-violet-200 text-sm font-semibold">Asysta przy aktywacji KSeF</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Nie musisz ogarniać KSeF sam
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Sprawdzimy Twoją firmę po NIP lub KRS i pomożemy krok po kroku uruchomić KSeF —
              indywidualnie, bez stresu.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Podczas indywidualnej rozmowy pomożemy Ci:
              </h2>
              <ul className="space-y-3">
                {INCLUDED_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-xs leading-5 text-gray-600 dark:text-gray-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Nie prosimy o hasła, dane logowania ani przekazanie podpisu elektronicznego.
                  Wszystkie czynności wymagające autoryzacji wykonujesz samodzielnie, a my
                  prowadzimy Cię przez proces.
                </p>
              </div>
            </div>

            <KsefAssistFunnel />
          </div>
        </div>
      </section>
    </div>
  );
}
