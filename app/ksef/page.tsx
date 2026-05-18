import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "KSeF w KsięgaI – przygotowanie i obsługa obowiązkowego KSeF",
  description:
    "Jak KsięgaI obsługuje KSeF: token, walidacje, workflow zatwierdzania przed wysyłką, JPK i ślad audytowy. Bądź gotowy zanim KSeF stanie się obowiązkowy.",
  keywords:
    "KSeF, Krajowy System e-Faktur, KSeF obowiązkowy, token KSeF, KSeF jak zacząć, walidacje KSeF, JPK, e-faktura",
  alternates: { canonical: "https://ksiegai.pl/ksef" },
  openGraph: {
    title: "KSeF w KsięgaI – przygotowanie i obsługa",
    description:
      "Wszystko czego potrzebujesz, żeby firma była gotowa na obowiązkowy KSeF: token, walidacje, workflow i ślad decyzji.",
    url: "https://ksiegai.pl/ksef",
    type: "website",
    locale: "pl_PL",
  },
};

export default function KsefPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="ksef" intent="ksef_readiness" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 mb-6">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">KSeF</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Gotowy na obowiązkowy KSeF
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              KsięgaI przygotowuje dane, waliduje dokumenty i prowadzi ślad uzgodnień — tak, żebyś
              wchodził w obowiązkowy KSeF z pełnym porządkiem, nie w panice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "ksef", cta_id: "hero_primary", text: "Zacznij przygotowanie do KSeF", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Zacznij przygotowanie do KSeF
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/poradnik/ksef-dla-jdg-jak-zaczac"
                event="cta_clicked"
                eventProps={{ page: "ksef", cta_id: "hero_secondary", text: "Poradnik KSeF", destination: "/poradnik/ksef-dla-jdg-jak-zaczac" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Poradnik KSeF krok po kroku
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* What is KSeF */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Czym jest KSeF i dlaczego to ważne
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Krajowy System e-Faktur (KSeF) to system Ministerstwa Finansów, który staje się
                  obowiązkowym kanałem wystawiania faktur dla podatników VAT. Faktury nie będą już
                  wysyłane mailem — trafią bezpośrednio do rządowego systemu.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Firmy nieprzygotowane na zmianę wejścia KSeF będą musiały w krótkim czasie
                  wdrożyć token, workflow i walidacje. KsięgaI przygotowuje ten grunt od razu.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold">
                  Co oznacza KSeF dla Twojej firmy
                </p>
                {[
                  "Faktury wystawiane tylko przez KSeF — brak e-maila jako kanału",
                  "Wymagany token powiązany z NIP firmy",
                  "Weryfikacja danych przed wysyłką — błędy powodują odrzucenie",
                  "Ślad dla każdej faktury: numer KSeF, data, status",
                  "Obowiązek archiwizacji w formacie FA(2) XML",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How KsięgaI handles KSeF */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Jak KsięgaI obsługuje KSeF
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Cztery elementy, które muszą działać razem, żeby KSeF działał bezpiecznie.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Token KSeF przy profilu firmy",
                  desc: "Token jest przechowywany bezpiecznie i powiązany z profilem biznesowym (NIP). Operacje tokenem wymagają zalogowanego użytkownika z odpowiednią rolą.",
                },
                {
                  icon: FileText,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Walidacja przed wysyłką",
                  desc: "Każdy dokument jest walidowany pod kątem formatu FA(2) XML, kompletności danych i zgodności ze schematem XSD MF. Błędy są pokazywane przed wysyłką, nie po.",
                },
                {
                  icon: Users,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "Workflow zatwierdzenia",
                  desc: "Przed wysyłką do KSeF dokument przechodzi przez obieg zatwierdzania. Kto zatwierdził, kiedy i na jakiej podstawie — wszystko zapisane jako ślad audytowy.",
                },
                {
                  icon: Zap,
                  iconClass: "text-amber-600 dark:text-amber-400",
                  bgClass: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Środowisko testowe i produkcja",
                  desc: "Możesz pracować w środowisku testowym KSeF bez ryzyka przypadkowego wysłania dokumentu do produkcji. Przełączenie jest jawne i wymaga potwierdzenia.",
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, desc }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App preview: KSeF status panel */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Podgląd panelu
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Status KSeF w systemie</h2>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-slate-500 font-mono">ksiegai.app / ksef</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                    Integracja
                  </p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                    Aktywna
                  </span>
                  <p className="text-xs text-slate-500 mt-2">Środowisko testowe</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                    Wysłane
                  </p>
                  <p className="text-2xl font-semibold text-white">48</p>
                  <p className="text-xs text-slate-500 mt-1">Ten miesiąc</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                    Oczekuje
                  </p>
                  <p className="text-2xl font-semibold text-amber-300">3</p>
                  <p className="text-xs text-slate-500 mt-1">Do zatwierdzenia</p>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">
                  Ostatnie zdarzenia
                </p>
                <div className="space-y-2.5">
                  {[
                    { dot: "bg-emerald-400", text: "FV/2025/048 wysłana do KSeF — numer KSeF: KS-2025-048", time: "2 min temu" },
                    { dot: "bg-blue-400", text: "FV/2025/049 zwalidowana — gotowa do wysyłki", time: "5 min temu" },
                    { dot: "bg-amber-400", text: "FV/2025/050 — oczekuje na zatwierdzenie", time: "12 min temu" },
                  ].map(({ dot, text, time }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                      <p className="text-xs text-slate-300 flex-1">{text}</p>
                      <p className="text-xs text-slate-500 flex-shrink-0">{time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-3 italic">Dane demonstracyjne.</p>
          </div>
        </div>
      </section>

      {/* JPK */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              JPK – przygotowanie i eksport
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              System przygotowuje paczki JPK_V7M i JPK_FA na podstawie zaewidencjonowanych dokumentów.
              Walidacje uruchamiane są automatycznie.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "JPK_V7M", desc: "Pliki miesięczne z ewidencją VAT zakupu i sprzedaży" },
                { label: "JPK_FA", desc: "Pliki faktur na żądanie kontroli skarbowej" },
                { label: "Walidacje", desc: "Kontrola struktury i kompletności przed wysyłką" },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 text-left"
                >
                  <p className="text-base font-bold text-gray-900 dark:text-white mb-2">{label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poradnik links */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Poradniki KSeF krok po kroku
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Jak zdobyć token KSeF",
                  href: "/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme",
                  desc: "Krok po kroku przez e-Urząd Skarbowy i aktywację tokenu.",
                },
                {
                  title: "KSeF dla JDG — jak zacząć",
                  href: "/poradnik/ksef-dla-jdg-jak-zaczac",
                  desc: "Co przygotować, jak uzyskać token i jak połączyć firmę z KsięgaI.",
                },
                {
                  title: "Konto organizacji w e-Urzędzie Skarbowym",
                  href: "/poradnik/konto-organizacji-e-urzad-skarbowy",
                  desc: "Aktywacja konta dla NIP firmy i nadanie pełnomocnictw.",
                },
              ].map(({ title, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Zacznij przygotowanie do KSeF już dziś
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Plan podstawowy jest bezpłatny. Premium z pełnym KSeF-workflow dostępne 30 dni testowo.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "ksef", cta_id: "footer_cta", text: "Załóż konto", destination: "/rejestracja" }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Załóż konto
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
