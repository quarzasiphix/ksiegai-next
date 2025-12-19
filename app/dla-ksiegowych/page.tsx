import type { Metadata } from "next";
import { CheckCircle2, Shield, Users, TrendingUp, FileCheck, Clock, AlertCircle, Zap, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dla księgowych | KsięgaI – narzędzie do skalowania biura rachunkowego",
  description:
    "KsięgaI eliminuje ręczną robotę, która blokuje skalowanie księgowych. Obsługuj więcej firm bez zwiększania liczby godzin. Pełna kontrola, audytowalność i wsparcie decyzji.",
  keywords: "oprogramowanie dla księgowych, biuro rachunkowe, automatyzacja księgowości, narzędzie dla księgowych, skalowanie biura rachunkowego",
  openGraph: {
    title: "KsięgaI dla księgowych – skaluj bez chaosu",
    description:
      "System eliminuje operacyjną robotę, księgowy podejmuje decyzje. Obsługuj więcej klientów z pełną kontrolą i audytowalnością.",
    url: "https://www.ksiegai.pl/dla-ksiegowych",
    type: "website",
    locale: "pl_PL",
  },
  alternates: {
    canonical: "https://www.ksiegai.pl/dla-ksiegowych",
  },
};

export default function DlaKsiegowych() {
  return (
    <div className="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-3xl bg-gray-900/95 px-6 py-12 text-white shadow-2xl shadow-blue-900/20 md:px-12">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-blue-50">
                <Users className="h-4 w-4 text-green-300" />
                Dla księgowych i biur rachunkowych
              </div>
              <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                KsięgaI nie zastępuje księgowych —<br className="hidden md:block" /> eliminuje ręczną robotę, która blokuje ich skalowanie.
              </h1>
              <p className="mb-4 text-xl text-blue-100">
                Obsługuj więcej firm bez zwiększania liczby godzin. System przygotowuje dane, dekretuje standardy i pilnuje terminów — Ty zatwierdzasz wyniki i podejmujesz decyzje.
              </p>
              <p className="mb-8 text-lg text-blue-200">
                To narzędzie, które pozwala obsłużyć więcej klientów bez zatrudniania kolejnej osoby.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/rejestracja"
                  className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-8 py-4 text-base font-semibold text-gray-900 transition hover:bg-green-400"
                >
                  Przetestuj z jednym klientem
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="mailto:kontakt@ksiegai.pl"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-8 py-4 text-base font-semibold text-white/90 transition hover:border-white hover:bg-white/10"
                >
                  Porozmawiaj o wdrożeniu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Props */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold text-blue-600">Jak to działa w praktyce</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">System wykonuje pracę operacyjną. Księgowy podejmuje decyzje.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="text-center">
              <p className="mb-2 text-4xl font-bold text-blue-600">87%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">dokumentów rozliczonych automatycznie po 14 dniach użytkowania</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-4xl font-bold text-green-600">4 h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">średni czas reakcji wsparcia dla księgowych</p>
            </div>
            <div className="text-center">
              <p className="mb-2 text-4xl font-bold text-purple-600">12+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">integracji bankowych i ERP gotowych od ręki</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 inline-flex rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">System przygotowuje (automatycznie)</h3>
              <p className="text-sm font-semibold text-blue-600">Ty zatwierdzasz wyjątki</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 inline-flex rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <FileCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Księgowy zatwierdza (świadomie)</h3>
              <p className="text-sm font-semibold text-green-600">Pełna kontrola nad procesem</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 inline-flex rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Wszystko ma ślad audytowy</h3>
              <p className="text-sm font-semibold text-purple-600">Odpowiedzialność udokumentowana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-blue-600">Odpowiedzi na najczęstsze obawy</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Co księgowi pytają o KsięgaI</h2>
          </div>
          <div className="space-y-6">
            {/* Objection 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-xl bg-red-100 p-3 dark:bg-red-900/30">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">„Czy to chce mnie zastąpić?"</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Nie.</strong> KsięgaI eliminuje ręczną robotę. Nie podejmuje decyzji.
                  </p>
                </div>
              </div>
            </div>

            {/* Objection 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/30">
                  <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">„Kto ponosi odpowiedzialność, jeśli coś pójdzie źle?"</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Księgowy.</strong> Tak jak zawsze. Dlatego każda operacja wymaga Twojego zatwierdzenia, a każda decyzja ma pełny ślad audytowy.
                  </p>
                </div>
              </div>
            </div>

            {/* Objection 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">„Każda firma jest inna — systemy tego nie rozumieją"</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Zgadza się.</strong> Dlatego system obsługuje standardy — a wyjątki zostawia w rękach księgowego. Możesz nadpisać każdą automatyczną sugestię.
                  </p>
                </div>
              </div>
            </div>

            {/* Objection 4 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">„To wygląda jak overkill dla JDG, a za lekkie dla spółek"</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Architektura skaluje się z klientem.</strong> Proste na początku, nie przeszkadza gdy firma rośnie. JDG dostaje uproszczony interfejs, spółka — pełną dekretację i governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Objection 5 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-4 flex items-start gap-4">
                <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">„A co jak zmienią się przepisy?"</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>System oparty o aktualne przepisy i strukturę KSeF</strong> — aktualizowany wraz ze zmianami regulacyjnymi. Nie obiecujemy „zawsze poprawnie", ale gwarantujemy zgodność ze strukturą.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Benefits */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold text-blue-600">Konkretne korzyści</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Co zyskujesz w praktyce</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Obsługa wielu firm bez chaosu</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Jeden interfejs, wiele podmiotów — przełączasz się między klientami bez logowania na różne konta</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Każdy klient ma tę samą strukturę danych — nie uczysz się od nowa przy każdym zleceniu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Centralne archiwum dokumentów z pełnotekstowym wyszukiwaniem — znajdziesz fakturę w 3 sekundy, nie w 30 minut</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Mniej ręcznej pracy, mniej błędów</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>System dekretuje i kategoryzuje — Ty sprawdzasz wyniki, zamiast przepisywać dane z PDF-ów</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Transakcje bankowe dopasowują się automatycznie do faktur — koniec z ręcznym uzgadnianiem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Deklaracje VAT i JPK generują się na podstawie zatwierdzonych danych — nie przepisujesz ręcznie</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Więcej czasu na decyzje, nie na operacje</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Zamiast wprowadzać dane, analizujesz trendy i doradzasz klientom w optymalizacji podatkowej</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Raporty i zestawienia są zawsze aktualne — nie czekasz do końca miesiąca, żeby zobaczyć sytuację</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Alerty o terminach i anomaliach — system pilnuje deadline'ów, Ty skupiasz się na wyjątkach</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Pełna kontrola i audytowalność</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Każda operacja wymaga zatwierdzenia — system sugeruje, księgowy decyduje</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Pełna historia zmian z datą, użytkownikiem i kontekstem — gotowe na audyt lub pytania z US</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Role i uprawnienia — asystent wprowadza, księgowy zatwierdza, właściciel widzi raporty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">System projektowany z udziałem księgowych</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                KsięgaI nie powstało w próżni. Architektura, procesy i interfejs były konsultowane z doświadczonymi księgowymi i biurami rachunkowymi.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold text-blue-600">87%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">dokumentów rozliczonych automatycznie po 14 dniach użytkowania</p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold text-green-600">4 h</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">średni czas reakcji wsparcia dla księgowych</p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold text-purple-600">12+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">integracji bankowych i ERP gotowych od ręki</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">Przetestuj z jednym klientem. Bez ryzyka.</h2>
          <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
            7-dniowy trial z pełnym dostępem. Bez karty kredytowej. Sprawdź, jak system przygotowuje dane i oszczędza Twój czas.
          </p>
          <p className="mb-8 text-base text-gray-500 dark:text-gray-400">
            Możesz zrezygnować bez migracji, bez lock-in, z pełnym eksportem danych.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/rejestracja"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Rozpocznij 7-dniowy trial
            </Link>
            <a
              href="mailto:kontakt@ksiegai.pl"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-8 py-4 text-lg font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900"
            >
              Porozmawiaj o wdrożeniu biura
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Bez zobowiązań • Pełny dostęp do wszystkich funkcji • Anuluj w dowolnym momencie
          </p>
        </div>
      </section>
    </div>
  );
}
