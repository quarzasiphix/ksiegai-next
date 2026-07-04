import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calculator, FileText } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Prowizje Stripe do zaksięgowania | KsięgaI",
  description:
    "KsięgaI zbiera wszystkie prowizje Stripe za miesiąc w jedną pozycję kolejki księgowej, z gotowym dekretem i wyliczonym VAT-RC — jedno kliknięcie zamiast dziesiątek pojedynczych opłat.",
  alternates: { canonical: "https://www.ksiegai.pl/stripe-dla-saas/prowizje/" },
};

export default function StripeProwizjePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe-dla-saas-prowizje" intent="feature_interest" />

      <section className="py-12 sm:py-16 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <TrackedLink
            href="/stripe-dla-saas"
            event="cta_clicked"
            eventProps={{ page: "stripe-dla-saas-prowizje", cta_id: "back", text: "Wróć", destination: "/stripe-dla-saas" }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Stripe dla SaaS
          </TrackedLink>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6">
            <Calculator className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold">Prowizje Stripe</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Dziesiątki opłat Stripe. Jedna pozycja do zaksięgowania.
          </h1>
          <p className="text-lg text-gray-300">
            Stripe pobiera prowizję z każdej transakcji osobno. KsięgaI grupuje wszystkie opłaty z danego
            miesiąca w jedną pozycję kolejki księgowej — z gotową propozycją dekretu, żebyś nie musiał
            rozbijać dziesiątek drobnych kwot ręcznie.
          </p>
        </div>
      </section>

      {/* Real queue card, expanded */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 text-center font-semibold">Podgląd — kolejka księgowań</p>
          <div className="max-w-lg mx-auto rounded-[24px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 bg-violet-100 dark:bg-violet-950/50 border-b border-violet-300/40 dark:border-violet-500/20">
              <FileText className="h-3.5 w-3.5 text-violet-700 dark:text-violet-300" />
              <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide">Prowizje Stripe do zaksięgowania</span>
              <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-violet-500 text-white text-[10px] font-bold">1</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Czerwiec 2026</span>
                  <span className="text-xs text-gray-500 dark:text-slate-500">klepsydra</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-slate-300">Szkic</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-600 text-white">Zaksięguj</span>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/15 text-gray-600 dark:text-slate-300">Szczegóły</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3">
                  <p className="text-xs text-gray-500 dark:text-slate-400">Prowizje</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1 tabular-nums">412,80 zł</p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">63 pozycje</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3">
                  <p className="text-xs text-gray-500 dark:text-slate-400">VAT-RC (23%)</p>
                  <p className="text-lg font-semibold text-amber-600 dark:text-amber-300 mt-1 tabular-nums">94,94 zł</p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">409-01 / 222-01</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-gray-900 dark:bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-gray-200 dark:text-slate-300">
                <p className="mb-1 font-sans text-[10px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Propozycja dekretu</p>
                <p>Wn 402-02  412,80 zł  Prowizje operatorów płatności</p>
                <p>Wn 409-01   94,94 zł  VAT z importu usług (RC)</p>
                <p>Ma 249-01  412,80 zł  Stripe — konto rozliczeniowe</p>
                <p>Ma 222-01   94,94 zł  VAT do zapłaty (VAT-9M / JPK_V7)</p>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-slate-500 mt-3">
                Po zaksięgowaniu pozycja znika z kolejki. Nowe opłaty Stripe za ten sam okres spowodują ponowne pojawienie się pozycji.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Dlaczego zbiorcze, nie pojedyncze</h2>
          <ul className="space-y-3">
            {[
              "Stripe potrąca prowizję z każdej transakcji — 63 płatności to 63 osobne kwoty, których nikt nie księguje ręcznie jedna po drugiej",
              "KsięgaI sumuje je za okres rozliczeniowy i pokazuje jedną gotową propozycję dekretu",
              "Dekret rozdziela kwotę netto prowizji od VAT z importu usług (reverse charge) — zgodnie z zasadami rozliczania usług Stripe jako zagranicznego usługodawcy",
              "Pozycja pozostaje w kolejce jako „Szkic”, dopóki jej nie zatwierdzisz — nic nie księguje się bez Twojej akceptacji",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Skąd bierze się VAT-RC na tym dekrecie?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/stripe-dla-saas/vat"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-prowizje", cta_id: "next_vat", text: "VAT od importu usług", destination: "/stripe-dla-saas/vat" }}
              className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-100 px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              VAT od importu usług <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/rejestracja"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-prowizje", cta_id: "cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
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
