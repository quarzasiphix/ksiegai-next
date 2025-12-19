import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building, Calculator, FileText, Users, TrendingUp, Shield, Zap, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Jak to działa? | KsięgaI - Workflow księgowości dla JDG i spółek",
  description:
    "Zobacz, jak działa KsięgaI w praktyce. Interaktywny przewodnik po systemie dla JDG i spółek z o.o. — od pierwszej faktury po pełną księgowość.",
  alternates: {
    canonical: "https://www.ksiegai.pl/jak-to-dziala",
  },
  openGraph: {
    title: "Jak działa KsięgaI? Workflow księgowości krok po kroku",
    description:
      "Interaktywny przewodnik: jak wygląda praca w KsięgaI dla JDG i spółek. Zobacz dashboard, workflow i automatyzacje.",
    url: "https://www.ksiegai.pl/jak-to-dziala",
    type: "website",
    locale: "pl_PL",
  },
};

export default function JakToDziala() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-8">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Interaktywny przewodnik</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Jak to działa w praktyce?
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Zobacz, jak wygląda praca w KsięgaI — od pierwszej faktury po pełną księgowość spółki.
              Wybierz swój profil i przejdź przez workflow krok po kroku.
            </p>
          </div>
        </div>
      </section>

      {/* Profile Selector */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Wybierz swój profil
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 text-center">
              Workflow różni się w zależności od formy działalności. Zobacz, jak system dostosowuje się do Twoich potrzeb.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* JDG Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all p-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Jestem na JDG
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Prosty start, szybkie faktury, automatyczna ewidencja przychodów. Idealne dla freelancerów i małych działalności.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Faktury + ewidencja przychodów</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Import banku i dopasowania</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>KSeF-ready + zestawienia VAT/PIT</span>
                  </li>
                </ul>
                <a
                  href="#jdg-workflow"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all w-full justify-center"
                >
                  Zobacz workflow dla JDG
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              {/* Spółka Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all p-8">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Mam spółkę z o.o.
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Pełna księgowość, governance, role użytkowników i ślad audytowy. System dla odpowiedzialności korporacyjnej.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Workflow zatwierdzania (wyjątki + audyt)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>JPK_V7M i CIT-8: przygotowanie + walidacje</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Uchwały, majątek, rejestr ryzyk</span>
                  </li>
                </ul>
                <a
                  href="#spolka-workflow"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all w-full justify-center"
                >
                  Zobacz workflow dla spółki
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JDG Workflow */}
      <section id="jdg-workflow" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40 mb-4">
                <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">Workflow dla JDG</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Jak wygląda praca na JDG?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Prosty, szybki start. Pierwsza faktura w 5 minut, automatyczna ewidencja, wszystko gotowe pod KSeF.
              </p>
            </div>

            {/* JDG Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Wystaw pierwszą fakturę
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Wypełnij dane kontrahenta, dodaj pozycje, system automatycznie liczy VAT i generuje PDF. Faktura trafia do KSeF-ready archiwum.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nowa faktura</h4>
                        <span className="text-xs text-gray-500">5 min</span>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Kontrahent: Firma ABC Sp. z o.o.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Pozycje: Usługa programistyczna (netto 5000 zł)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>VAT 23% automatycznie, brutto 6150 zł</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>Status: Gotowa do wysłania (KSeF-ready)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Import wyciągu bankowego
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Wrzuć CSV z banku lub podłącz integrację. System automatycznie dopasowuje płatności do faktur.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Dopasowania automatyczne</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800/30">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Wpłata 6150 zł</p>
                              <p className="text-xs text-gray-500">Firma ABC Sp. z o.o.</p>
                            </div>
                          </div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Dopasowano do FV 001/2024</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Przelew 1200 zł</p>
                              <p className="text-xs text-gray-500">Hosting + domena</p>
                            </div>
                          </div>
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Kategoryzuj ręcznie</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Zestawienia gotowe automatycznie
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Na koniec miesiąca wszystko jest przygotowane: ewidencja przychodów, VAT (jeśli dotyczy), dane do PIT.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Gotowe do eksportu</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800/30">
                          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Ewidencja przychodów</p>
                          <p className="text-xs text-gray-500 mt-1">Gotowa do pobrania</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800/30">
                          <FileText className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Zestawienie VAT</p>
                          <p className="text-xs text-gray-500 mt-1">Jeśli dotyczy</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800/30">
                          <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Dane do PIT</p>
                          <p className="text-xs text-gray-500 mt-1">Przygotowane</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/rejestracja"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Zacznij z JDG za darmo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                7-dniowy trial • Bez karty • Pełny dostęp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spółka Workflow */}
      <section id="spolka-workflow" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/40 mb-4">
                <Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">Workflow dla spółki z o.o.</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Jak wygląda praca w spółce?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Pełna księgowość + governance. Role użytkowników, workflow zatwierdzania, ślad audytowy i kontrola procesu.
              </p>
            </div>

            {/* Spółka Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      System zbiera dokumenty automatycznie
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Faktury, wyciągi, umowy — wszystko trafia do systemu. AI rozpoznaje dane, kategoryzuje i przygotowuje do dekretacji.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Kolejka dokumentów</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">FV 045/2024 — Usługi IT</p>
                              <p className="text-xs text-gray-500">AI rozpoznało: Koszty operacyjne, VAT 23%</p>
                            </div>
                          </div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Gotowe</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Umowa najmu — biuro</p>
                              <p className="text-xs text-gray-500">Wymaga zatwierdzenia księgowego</p>
                            </div>
                          </div>
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Wyjątek</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Workflow zatwierdzania (role + audyt)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Asystent wprowadza, księgowy zatwierdza, właściciel widzi raporty. Każda decyzja ma ślad: kto, co, kiedy, dlaczego.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Ślad audytowy</h4>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-gray-500">14:32</span>
                          <span>Anna Kowalska (asystent) dodała FV 045/2024</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span className="text-gray-500">14:45</span>
                          <span>Jan Nowak (księgowy) zatwierdził dekretację</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                          <span className="text-gray-500">15:00</span>
                          <span>System przygotował paczkę do wysyłki (KSeF-ready)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Deklaracje i governance zawsze gotowe
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      JPK_V7M, CIT-8, uchwały, rejestr majątku — wszystko przygotowane automatycznie. Ty tylko zatwierdzasz przed eksportem.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Dashboard spółki</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Walidacje OK</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">JPK_V7M</p>
                          <p className="text-xs text-gray-500 mt-1">Gotowe do weryfikacji i eksportu</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="h-5 w-5 text-purple-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Aktualne</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">CIT-8</p>
                          <p className="text-xs text-gray-500 mt-1">Przygotowane + walidacje</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <Users className="h-5 w-5 text-green-500" />
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">3 uchwały</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Repozytorium</p>
                          <p className="text-xs text-gray-500 mt-1">Governance + historia zmian</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="h-5 w-5 text-amber-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Monitorowane</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Rejestr ryzyk</p>
                          <p className="text-xs text-gray-500 mt-1">Kontrola płynności + alerty</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/rejestracja"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Zacznij ze spółką za darmo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                7-dniowy trial (Spółka Standard) • Bez karty • Pełny dostęp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Porównanie: JDG vs Spółka
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 text-center">
              Oba profile korzystają z tego samego systemu — różnią się zakresem funkcji i poziomem automatyzacji.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                    <th className="text-left p-4 text-gray-900 dark:text-white font-semibold">Funkcja</th>
                    <th className="text-center p-4 text-blue-600 dark:text-blue-400 font-semibold">JDG Start</th>
                    <th className="text-center p-4 text-purple-600 dark:text-purple-400 font-semibold">Spółka Standard</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">Faktury + ewidencja</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">Import banku + dopasowania</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">KSeF-ready (workflow + walidacje)</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">Workflow zatwierdzania (role + audyt)</td>
                    <td className="text-center p-4 text-gray-400">—</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">JPK_V7M i CIT-8 (przygotowanie + walidacje)</td>
                    <td className="text-center p-4 text-gray-400">—</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">Governance (uchwały, majątek, ryzyka)</td>
                    <td className="text-center p-4 text-gray-400">—</td>
                    <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="p-4 text-gray-900 dark:text-white">Liczba użytkowników</td>
                    <td className="text-center p-4 text-gray-600 dark:text-gray-400">1</td>
                    <td className="text-center p-4 text-gray-600 dark:text-gray-400">Do 10</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-900 dark:text-white">Wsparcie</td>
                    <td className="text-center p-4 text-gray-600 dark:text-gray-400">Standard (24h)</td>
                    <td className="text-center p-4 text-gray-600 dark:text-gray-400">Priorytet (4h SLA)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/cennik"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
              >
                Zobacz pełny cennik
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Gotowy, żeby zobaczyć to na żywo?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Uruchom 7-dniowy trial i przetestuj workflow na swoich danych. Bez karty, bez zobowiązań.
            </p>
            <Link
              href="/rejestracja"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Zacznij za darmo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm text-blue-100 mt-6">
              Pełny dostęp do wszystkich funkcji • Eksport danych w każdej chwili • Zero lock-in
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
