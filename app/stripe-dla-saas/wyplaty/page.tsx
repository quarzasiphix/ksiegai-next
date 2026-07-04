import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Landmark, Link2, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Dopasowanie wypłat Stripe do banku | KsięgaI",
  description:
    "KsięgaI dopasowuje wypłaty Stripe do transakcji w wyciągu bankowym po kwocie i dacie, a różnice zostawia do ręcznego potwierdzenia zamiast ukrywać je w saldzie.",
  alternates: { canonical: "https://www.ksiegai.pl/stripe-dla-saas/wyplaty/" },
};

export default function StripeWyplatyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="stripe-dla-saas-wyplaty" intent="feature_interest" />

      <section className="py-12 sm:py-16 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <TrackedLink
            href="/stripe-dla-saas"
            event="cta_clicked"
            eventProps={{ page: "stripe-dla-saas-wyplaty", cta_id: "back", text: "Wróć", destination: "/stripe-dla-saas" }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Stripe dla SaaS
          </TrackedLink>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/40 border border-green-500/30 mb-6">
            <Landmark className="h-4 w-4 text-green-400" />
            <span className="text-green-300 text-sm font-semibold">Wypłaty i bank</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Bank pokazuje jedną kwotę. Ty potrzebujesz wiedzieć, z czego się składa.
          </h1>
          <p className="text-lg text-gray-300">
            Stripe wypłaca zbiorczą kwotę za wiele transakcji naraz, w innym terminie niż same płatności.
            KsięgaI dopasowuje każdą wypłatę Stripe do konkretnej transakcji w wyciągu bankowym, a
            rozbieżności zostawia do ręcznego potwierdzenia — nie znikają w saldzie.
          </p>
        </div>
      </section>

      {/* Full reconciliation table */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 text-center font-semibold">Podgląd — dopasowanie wypłat</p>
          <div className="max-w-3xl mx-auto rounded-[24px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-900 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/10">
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-gray-300 dark:border-white/15 text-xs text-gray-700 dark:text-slate-300">
                <Link2 className="h-3 w-3" /> Dopasuj z bankiem
                <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-violet-500 text-white text-[10px] font-bold">2</span>
              </span>
              <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-amber-400 dark:border-amber-500/40 text-xs text-amber-700 dark:text-amber-300">
                <Sparkles className="h-3 w-3" /> Klasyfikuj RC/VAT-9M
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 text-left text-gray-500 dark:text-slate-500">
                    <th className="py-2 pl-4 pr-3 font-medium">Data wpływu</th>
                    <th className="py-2 pr-3 font-medium">ID wypłaty</th>
                    <th className="py-2 pr-3 font-medium">Dopasowanie</th>
                    <th className="py-2 pr-3 text-right font-medium">Kwota</th>
                    <th className="py-2 pr-4 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                  {[
                    { date: "28.06.2026", id: "po_1N8k…c2df", amount: "1 284,00 zł", status: "matched" },
                    { date: "21.06.2026", id: "po_1N8j…a91b", amount: "962,40 zł", status: "manual_confirmed" },
                    { date: "14.06.2026", id: "po_1N8h…f10e", amount: "1 502,10 zł", status: "awaiting" },
                    { date: "07.06.2026", id: "po_1N8g…d55a", amount: "845,00 zł", status: "awaiting" },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td className="py-2.5 pl-4 pr-3 tabular-nums text-gray-500 dark:text-slate-400">{row.date}</td>
                      <td className="py-2.5 pr-3 font-mono text-gray-500 dark:text-slate-400">{row.id}</td>
                      <td className="py-2.5 pr-3">
                        {row.status === "matched" && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-emerald-100 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" /> Dopasowany
                          </span>
                        )}
                        {row.status === "manual_confirmed" && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-sky-100 dark:bg-sky-400/10 text-sky-700 dark:text-sky-300">
                            <CheckCircle2 className="h-3 w-3" /> Potwierdzony
                          </span>
                        )}
                        {row.status === "awaiting" && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-slate-400">
                            <Clock className="h-3 w-3" /> Oczekuje
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-3 text-right tabular-nums font-medium text-gray-900 dark:text-white">{row.amount}</td>
                      <td className="py-2.5 pr-4 text-right">
                        {row.status === "awaiting" ? (
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-[11px] text-violet-600 dark:text-violet-400">Dopasuj</span>
                            <span className="text-[11px] text-gray-500 dark:text-slate-500 border border-gray-300 dark:border-white/15 rounded px-1.5 py-0.5">Ręcznie</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Wn 130 / Ma 249-01 ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-500 px-4 py-3 border-t border-gray-200 dark:border-white/10">
              Dopasowanie łączy wypłatę Stripe z transakcją w wyciągu bankowym (kwota + data ±4 dni).
              Potwierdź ręcznie, gdy transakcja bankowa ma inną datę lub rozbicie walutowe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ul className="space-y-3">
            {[
              "Dopasowanie automatyczne szuka transakcji bankowej o tej samej kwocie w oknie ±4 dni od daty wypłaty",
              "Gdy dopasowanie się powiedzie, wypłata dostaje status „Dopasowany” i gotowy dekret Wn 130 / Ma 249-01",
              "Gdy kwoty się nie zgadzają (np. przez różnicę kursową), pozycja czeka na ręczne potwierdzenie zamiast zniknąć",
              "Dla firm zwolnionych z VAT: „Klasyfikuj RC/VAT-9M” oznacza transakcje bankowe odpowiadające opłatom Stripe jako import usługi zagranicznej",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">To całość rozliczenia Stripe w KsięgaI</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TrackedLink
              href="/stripe-dla-saas"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-wyplaty", cta_id: "back_overview", text: "Wróć do przeglądu", destination: "/stripe-dla-saas" }}
              className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-gray-100 px-6 py-3 rounded-2xl font-semibold text-sm"
            >
              Wróć do przeglądu <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/rejestracja"
              event="cta_clicked"
              eventProps={{ page: "stripe-dla-saas-wyplaty", cta_id: "cta", text: "Rozpocznij z ksiegai", destination: "/rejestracja" }}
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
