import { CheckCircle2, Crown, Zap, Shield, Building, Calculator, CreditCard, Star, ArrowRight, FileText, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - Pełna automatyzacja księgowości | KsięgaI",
  description: "KSeF, JPK, integracje bankowe i AI — wszystko, czego potrzebujesz do profesjonalnej księgowości w jednym systemie. Dla przedsiębiorców i księgowych, którzy chcą więcej niż podstawy.",
  keywords: "księgowość premium, KSeF automatyzacja, JPK-V7M, księgowość dla spółek, księgowość z AI, integracje bankowe, księgowość dla księgowych",
  openGraph: {
    title: "Premium - Pełna automatyzacja i kontrola | KsięgaI",
    description: "Infrastruktura finansowa dla rosnących firm. KSeF, JPK, AI i integracje bankowe w jednym systemie.",
    url: "https://ksiegai.pl/premium",
  },
  alternates: {
    canonical: "https://ksiegai.pl/premium",
  },
};

export default function Premium() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-8">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Premium</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Pełna automatyzacja.<br />Pełna kontrola.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              KSeF, JPK, integracje bankowe i AI — wszystko, czego potrzebujesz<br />
              do profesjonalnej księgowości w jednym systemie.
            </p>
            <p className="text-base text-gray-400 italic mb-8">
              Zbudowane w oparciu o polskie prawo podatkowe i realne procesy księgowe.<br />
              Dla przedsiębiorców i księgowych, którzy chcą więcej niż podstawy.
            </p>
            <Link href="/rejestracja">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Aktywuj Premium — zacznij za darmo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Infrastruktura finansowa dla rosnących firm
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Zaprojektowane od podstaw pod KSeF i polskie realia. Proste na początku, nie przeszkadza gdy chcesz więcej.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* KSeF & Podatki */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Building className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">KSeF & podatki</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Dokumenty trafiają do KSeF automatycznie, deklaracje są zawsze aktualne — Ty tylko zatwierdzasz przed wysłaniem.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Automatyczne wysyłanie do KSeF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Generowanie JPK-V7M</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Synchronizacja z US</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Automatyczne przygotowanie deklaracji VAT</span>
                  </li>
                </ul>
              </div>

              {/* Zaawansowana księgowość */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Calculator className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Zaawansowana księgowość</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  System dekretuje i kategoryzuje transakcje — księgowy sprawdza wyniki, nie wprowadza ręcznie każdej pozycji.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Automatyczne wyliczenia i zestawienia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Przygotowanie deklaracji PIT/CIT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Raporty zawsze gotowe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ewidencja środków trwałych</span>
                  </li>
                </ul>
              </div>

              {/* AI */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Dokumenty są rozpoznawane i księgowane automatycznie — decyzja o wyjątkach i nietypowych przypadkach zostaje po Twojej stronie.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Rozpoznawanie dokumentów</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Kategoryzacja transakcji</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Asystent księgowy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Automatyczne sugestie</span>
                  </li>
                </ul>
              </div>

              {/* Bank */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <CreditCard className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Bank</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Wpłaty i wydatki synchronizują się w czasie rzeczywistym — system dopasowuje płatności do faktur bez Twojej interwencji.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Transakcje na żywo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Auto-dopasowanie płatności</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Alerty o wpłatach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Wielowalutowość</span>
                  </li>
                </ul>
              </div>

              {/* Zarządzanie dokumentami */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Dokumenty</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Każdy dokument jest zindeksowany i przeszukiwalny — znajdziesz fakturę z 2 lat temu w 3 sekundy, nie w 30 minut.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Archiwum dokumentów</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>OCR i rozpoznawanie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Wyszukiwanie pełnotekstowe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Bezpieczne przechowywanie</span>
                  </li>
                </ul>
              </div>

              {/* Współpraca */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Współpraca</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Zespół widzi tylko to, co powinien — właściciel kontroluje, księgowy księguje, asystent wprowadza dokumenty.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Wielostanowiskowy dostęp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Role i uprawnienia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Udostępnianie dokumentów</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Historia zmian</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accountant Value Prop */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Dla księgowych i zespołów finansowych
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Zaprojektowane tak, aby obsługiwać więcej firm bez zwiększania liczby godzin. Dane są uporządkowane, audytowalne i zawsze aktualne.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Obsługa wielu firm i klientów</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Jeden interfejs, wiele podmiotów. Przełączasz się między firmami bez logowania na różne konta.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Spójna struktura danych</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Każdy klient ma tę samą strukturę — nie uczysz się od nowa przy każdym nowym zleceniu.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mniej ręcznej pracy, mniej błędów</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  System dekretuje i kategoryzuje — Ty sprawdzasz wyniki, zamiast przepisywać dane z PDF-ów.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Więcej czasu na decyzje</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Zamiast wprowadzać dane, analizujesz trendy i doradzasz klientom w optymalizacji podatkowej.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Proste, przejrzyste ceny
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Wszystkie funkcje Premium dostępne od 19 zł/mies. dla JDG. Spółki z o.o. — 89 zł/mies.
            </p>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl text-white mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <p className="text-blue-100 text-sm mb-2">Najpopularniejszy plan</p>
                  <h3 className="text-3xl font-bold mb-2">Spółka Standard — 89 zł/mies.</h3>
                  <p className="text-blue-100">Pełna infrastruktura finansowa dla spółek z o.o.</p>
                </div>
                <Link href="/rejestracja">
                  <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg whitespace-nowrap">
                    Rozpocznij 7-dniowy trial
                  </button>
                </Link>
              </div>
            </div>
            <Link href="/cennik" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Porównaj wszystkie plany →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Zostaw operacje systemowi. Skup się na rozwoju firmy.
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              7-dniowy trial z pełnym dostępem. Bez karty kredytowej.<br />
              Sprawdz, jak działa profesjonalna księgowość bez ręcznej pracy operacyjnej.
            </p>
            <p className="text-sm text-blue-200 mb-8">
              Bez zobowiązań • Bez rozmów sprzedażowych
            </p>
            <Link href="/rejestracja">
              <button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Aktywuj Premium — zacznij za darmo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <p className="mt-6 text-xs text-blue-200 max-w-2xl mx-auto">
              <strong>Ważne:</strong> KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
