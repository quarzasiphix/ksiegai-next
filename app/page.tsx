import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Building, Calculator, CreditCard, Crown, FileText, Users, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu | Tovernet",
  description: "Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Pełna zgodność z KSeF, JPK i polskimi przepisami. Proste w użyciu, zaawansowane dla księgowych i power-userów.",
  openGraph: {
    title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu",
    description: "Automatyzacja faktur, podatków i KSeF dla przedsiębiorców, którzy wolą budować firmę niż pilnować papierów.",
    url: "https://ksiegai.pl",
  },
  alternates: {
    canonical: "https://ksiegai.pl",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "KsięgaI",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "19",
              "priceCurrency": "PLN",
              "priceValidUntil": "2025-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127"
            },
            "creator": {
              "@type": "Organization",
              "name": "Tovernet Sp. z o.o.",
              "url": "https://tovernet.com"
            },
            "description": "Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Pełna zgodność z KSeF, JPK i polskimi przepisami.",
            "featureList": [
              "Automatyczne wysyłanie do KSeF",
              "Generowanie JPK-V7M",
              "Integracje bankowe",
              "AI dla księgowości",
              "Obsługa wielu firm"
            ],
            "inLanguage": "pl-PL"
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-4 py-6 sm:py-8 md:py-12">
          <div className="mx-auto text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-6 sm:mb-8 animate-fade-in">
              <span className="text-sm sm:text-base">🇵🇱</span>
              <span className="text-blue-300 text-xs sm:text-sm font-semibold">Dla polskich przedsiębiorców — także tych, którzy sprzedają za granicę</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
              Księgowość, która nie kradnie Twojego czasu.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 sm:mb-6 font-medium leading-relaxed animate-fade-in px-2">
              Automatyzacja faktur, podatków i KSeF dla przedsiębiorców, którzy wolą <span className="text-blue-400">budować firmę</span> niż pilnować papierów.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in px-2">
              Wystawiasz faktury. System ogarnia resztę:<br />
              podatki, KSeF, JPK, raporty.
            </p>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-3xl mx-auto animate-fade-in leading-relaxed px-2">
              KsięgaI to polski program do fakturowania i księgowości online dla JDG i spółek, zgodny z KSeF i JPK, zaprojektowany z myślą o realiach polskich przedsiębiorców — także sprzedających w UE.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in px-2 font-medium">
              Proste w użyciu. Wystarczająco zaawansowane dla księgowych i power-userów.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2 animate-fade-in">
              <Link href="/rejestracja" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 h-auto shadow-xl hover:shadow-2xl transition-all rounded-xl sm:rounded-2xl font-semibold leading-snug"
                  aria-label="Rozpocznij darmowo i odzyskaj kontrolę nad księgowością"
                >
                  Zacznij za darmo — pierwsza faktura w 5 minut
                </button>
                <p className="mt-2 text-xs text-gray-400 text-center sm:hidden">
                  Bez karty. Pierwsza faktura w <span className="font-semibold text-white">5 minut</span>.
                </p>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-2 sm:gap-3 animate-fade-in px-2">
              <p className="text-xs sm:text-sm text-gray-400 font-medium text-center">Zgodne z polskimi przepisami • KSeF • JPK • realia polskich firm — także w UE</p>
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap text-xs sm:text-sm">
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
                  <span className="text-sm sm:text-base">🇵🇱</span>
                  <span>Polski język i wsparcie</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
                  <span className="text-sm sm:text-base">🇵🇱</span>
                  <span>Polskie przepisy i KSeF</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
                  <span className="text-sm sm:text-base">🇵🇱</span>
                  <span>Dla polskich przedsiębiorców</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR - Pain-based targeting */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Prowadzenie firmy wymaga myślenia. Księgowość — niekoniecznie.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-2 max-w-3xl mx-auto">
              Jeśli wiesz, co robisz jako przedsiębiorca, nie potrzebujesz kolejnego Excela ani ręcznego liczenia podatków. Potrzebujesz systemu, który po prostu działa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 text-left">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Tracisz czas na pilnowanie faktur, terminów i dokumentów
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Chcesz mieć pewność zgodności z przepisami
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Potrzebujesz struktury, która eliminuje błędy
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Chcesz mieć pełną kontrolę bez ręcznej roboty
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-6 sm:mt-8 font-medium px-2">
              System pilnuje szczegółów, żebyś nie musiał myśleć o nich codziennie.
            </p>
          </div>
        </div>
      </section>

      {/* SPEED & CERTAINTY */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">
              Oszczędza czas. Porządkuje. Skaluje się z Tobą.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Pierwsza faktura w mniej niż 5 minut
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Bez szkoleń, bez komplikacji
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Wydatki pod kontrolą bez Excela
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Wszystko w jednym miejscu
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Zawsze gotowe do sprawdzenia
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Żadnych niespodzianek
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Users Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Dla przedsiębiorców i księgowych, którzy chcą mieć pełną kontrolę
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 px-2 max-w-3xl mx-auto">
              KsięgaI nie ogranicza Cię, gdy firma rośnie. Dla zaawansowanych użytkowników i biur rachunkowych system oferuje pełną strukturę danych, automatyzację i powtarzalność — bez chaosu i ręcznej pracy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Obsługa wielu firm i klientów</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Zarządzaj wieloma podmiotami z jednego miejsca. Idealne dla przedsiębiorców z kilkoma firmami lub księgowych obsługujących wielu klientów.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Spójne dane gotowe do kontroli</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Wszystkie dokumenty i rozliczenia w strukturze gotowej do audytu. Pełna historia zmian i raportowanie.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Automatyzacja powtarzalnych czynności</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  System eliminuje ręczne wprowadzanie danych i powtarzalne zadania. Więcej czasu na analizę i decyzje.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Więcej klientów bez więcej godzin</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Dla księgowych: obsługuj więcej firm bez zwiększania liczby godzin. Mniej ręcznej pracy = większa przepustowość.
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-8 px-2 italic">
              Dla księgowych: obsługuj więcej firm bez zwiększania liczby godzin. KsięgaI porządkuje dokumenty, dane i rozliczenia tak, żebyś mógł skupić się na decyzjach, nie ręcznym wprowadzaniu danych.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="premium" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-3 sm:mb-4">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400 text-xs sm:text-sm font-medium">Premium</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
                Pełna automatyzacja i zgodność z przepisami
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                Wszystko, czego potrzebujesz do profesjonalnej księgowości — KSeF, JPK, integracje bankowe i AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">KSeF & podatki</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                      Nie martwisz się, czy coś jest źle wysłane lub źle policzone.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Zaawansowana księgowość</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                      Gotowe dane, kiedy ich potrzebujesz — bez paniki przed terminami.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">AI</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                      Dokumenty same się ogarniają. Ty tylko zatwierdzasz.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Bank</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                      Widzisz pieniądze w czasie rzeczywistym. Bez ręcznego dopasowywania.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                </ul>
              </div>
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <Link href="/premium">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                  Zobacz pełną ofertę Premium
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                <strong>Ważne:</strong> KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              Zostaw księgowość systemowi. Skup się na firmie.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-2">
              Załóż konto za darmo. Pierwsza faktura w 5 minut. Pełna kontrola od pierwszego dnia.
            </p>
            <Link href="/rejestracja" className="inline-block">
              <button className="bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Zacznij za darmo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              Bez karty kredytowej • Pełny dostęp • Anuluj w każdej chwili
            </p>
            <p className="mt-2 text-xs text-blue-200">
              Bez zobowiązań • Bez rozmów sprzedażowych
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
