import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Shield, Zap, Building, Calculator, CreditCard, Crown, FileText, Users, TrendingUp, Receipt, Inbox, MessageSquare, ThumbsUp, Network, History, Lock } from "lucide-react";
import type { Metadata } from "next";
import FAQSection from "./faq-section";

export const metadata: Metadata = {
  title: "KsięgaI - Centralny system ewidencji działalności firmy",
  description: "Formalny system rejestru firmy: dokumenty, uchwały, role i finanse w jednej strukturze z historią odpowiedzialności. Gotowe na KSeF.",
  openGraph: {
    title: "KsięgaI - Centralny system ewidencji działalności firmy",
    description: "Dokumenty, decyzje, finanse i operacje — w jednej, spójnej strukturze z pełnym śladem audytu i ciągłością odpowiedzialności.",
    url: "https://ksiegai.pl",
  },
  alternates: {
    canonical: "https://ksiegai.pl",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* KSeF Readiness Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm sm:text-base text-white font-medium">
            Przygotowanie do KSeF: uporządkowana ewidencja dokumentów, decyzji i rozliczeń w jednym systemie.
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <Script
        id="software-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "KsięgaI",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "creator": {
              "@type": "Organization",
              "name": "Tovernet Sp. z o.o.",
              "url": "https://tovernet.online"
            },
            "description": "Centralny system ewidencji działalności firmy: dokumenty, uchwały, role i finanse w jednej spójnej strukturze.",
            "featureList": "Rejestr dokumentów; Rejestr decyzji i uchwał; Kontrola finansów; Operacje i zasoby; KSeF-ready; Ślad audytowy",
            "inLanguage": "pl-PL"
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 py-6 sm:py-8 md:py-12">
          <div className="mx-auto text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-6 sm:mb-8 animate-fade-in">
              <span className="text-blue-300 text-xs sm:text-sm font-semibold">Warstwa uzgodnień przed KSeF</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 sm:mb-6 leading-tight animate-fade-in px-2 max-w-4xl mx-auto">
              Faktura nie trafia do KSeF, dopóki strony jej nie uzgodnią
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 font-medium leading-relaxed animate-fade-in px-2 max-w-3xl mx-auto">
              KsięgaI to warstwa kontroli i odpowiedzialności między Twoim systemem ERP a KSeF — gdzie dokumenty są uzgadniane, zatwierdzane i weryfikowane przed ostatecznym wysłaniem.
            </p>
            <p className="text-base sm:text-lg text-blue-300 mb-4 animate-fade-in px-2 max-w-2xl mx-auto font-medium">
              Jeśli kontrahent jest w KsięgaI, faktura trafia do jego systemu, nie do maila. Email to tylko powiadomienie — dokument żyje w systemie.
            </p>
            <p className="text-sm text-gray-400 mb-8 animate-fade-in px-2 max-w-2xl mx-auto italic">
              Ostatni checkpoint przed KSeF: negocjacje, korekty i akceptacje w jednym miejscu z pełnym śladem audytu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-3 px-2 animate-fade-in">
              <Link
                href="/rejestracja"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Dołącz do sieci zweryfikowanych firm
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#mechanism"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all"
              >
                Zobacz jak działa uzgodnienie
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium text-center animate-fade-in px-2">
              Zweryfikowana sieć firm • Natywne dostarczanie dokumentów • Uzgodnienie przed KSeF
            </p>

            {/* Zakres ewidencji - specification block */}
            <div className="mt-8 sm:mt-10 bg-gray-900/50 border border-gray-700 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto animate-fade-in">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-center">
                Workflow uzgodnienia dokumentu
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Natywne dostarczenie do zweryfikowanego kontrahenta</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Dyskusja i negocjacja przed akceptacją</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Korekty i uzgodnienia z pełnym śladem audytu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Akceptacja przez obie strony przed wysłaniem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Integracja z ERP i automatyczne przekazanie do KSeF</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ICP SEGMENTATION - Who needs this */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
                Dla kogo jest warstwa uzgodnień
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 px-2">
                KsięgaI ma sens, gdy dokumenty wymagają uzgodnienia przed ostatecznym wysłaniem do KSeF — i gdy email nie wystarcza jako ślad audytu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Firmy z wieloma kontrahentami
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Gdy faktury wymagają negocjacji, korekty lub weryfikacji przed wysłaniem do KSeF — i email nie daje pełnego śladu.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Współpraca z księgowymi i ERP
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Księgowa widzi dyskusje, korekty i akceptacje — nie tylko gotowy dokument. Integracja z Comarch, enova365, Symfonia.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Sieć zweryfikowanych firm
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Kontrahenci w KsięgaI otrzymują dokumenty natywnie w systemie — nie przez email. Domyślny standard dla audytu.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <strong>Jeśli wystawiasz faktury bez negocjacji i nie potrzebujesz śladu uzgodnień</strong> — tradycyjny ERP wystarczy. KsięgaI ma sens, gdy dokumenty wymagają akceptacji przed KSeF i audyt musi widzieć cały proces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GROUNDING SECTION - Where companies start */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Wdrożenie w tym samym dniu
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 px-2">
              Procedura uruchomienia rejestru: 4 kroki, 15–30 minut konfiguracji. Bez migracji historycznej, bez przenoszenia danych.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Utwórz podmiot i role</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Określ strukturę uprawnień i pełnomocnictw w systemie.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Dodaj księgową / współpracowników</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Nadaj dostęp według ról do rejestru i dokumentów.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Uruchom rejestr wpływów i zasady akceptacji</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Skonfiguruj obieg dokumentów i warunki zatwierdzania.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Pierwszy miesiąc = tylko wyjątki</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">System pokazuje elementy wymagające decyzji lub uzupełnienia.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Start bez migracji:</strong> rejestr działa od pierwszego dnia. Historię możesz uzupełniać opcjonalnie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3-step mechanism */}
      <section id="mechanism" className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
                Model obiegu dokumentu
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-2 mb-2">
                Standardowy proces: wpływ → uzgodnienie → zatwierdzenie. Każdy krok ma uprawnienia i ślad audytu.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-2">
                Efekt: mniej ręcznych czynności i spójny rejestr działań.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1: Wpływ */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <Inbox className="h-8 w-8 text-white" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mb-3">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Wpływ dokumentu
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Dokument trafia do rejestru i zostaje przypisany do kontekstu.
                </p>
              </div>

              {/* Step 2: Uzgodnienie */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold mb-3">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Uzgodnienie
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Komentarze i załączniki pozostają w kontekście dokumentu.
                </p>
              </div>

              {/* Step 3: Zatwierdzenie */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-white" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold mb-3">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Akceptacja / dekretacja
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Decyzja zapisuje: kto, kiedy, na jakiej podstawie.
                </p>
              </div>
            </div>
            <div className="text-center mt-8 sm:mt-10">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">
                <span className="font-semibold text-gray-900 dark:text-white">Efekt:</span> mniej ręcznych czynności i spójny rejestr działań.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR - Pain-based targeting */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 px-2">
              <Link href="/dla-ksiegowych" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Prowadzisz biuro rachunkowe? Zobacz wersję dla księgowych →
              </Link>
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Najczęstsze źródła ryzyka formalnego
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 text-left">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Brak kompletności dokumentów w okresie rozliczeniowym
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Nieciągłość decyzji i uzasadnień
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Rozproszenie uzgodnień (mail/PDF/komunikatory)
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Brak jednoznacznej odpowiedzialności za zatwierdzenia
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl p-6 sm:p-8 mt-6 sm:mt-8 border border-orange-200 dark:border-orange-800/30">
              <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-semibold text-center">
                Przy obowiązkowym KSeF te problemy stają się widoczne w procesie i w kontroli.
              </p>
            </div>
            
            {/* Outcome Mirror */}
            <div className="mt-8 sm:mt-10 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 sm:p-8 border border-green-200 dark:border-green-800/30">
              <div className="max-w-2xl mx-auto space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Terminy i kompletność ewidencji
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Akceptujesz wyjątki, reszta jest przygotowana
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Ślad audytu i historia decyzji
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPEED & CERTAINTY */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 px-2">
              Projektowane wspólnie z księgowymi: kolejka wyjątków, zatwierdzanie, role użytkowników i ślad audytu.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 border border-blue-100 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Jak wygląda praca w systemie ewidencji?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                Dokumenty są kompletowane na bieżąco. Na koniec okresu rozliczeniowego system pokazuje wyjątki oraz brakujące elementy.
              </p>
            </div>
            {/* Dashboard Preview - Credibility Section */}
            <div className="mb-8 sm:mb-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 mb-3">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Workflow konsultowany z księgowymi
                  </span>
                </div>
              </div>
              <h3 className="text-center text-lg sm:text-xl text-gray-900 dark:text-white font-bold mb-2 px-2">
                Podgląd panelu (przykład)
              </h3>
              <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 px-2">
                Przykładowy widok: wyjątki do zatwierdzenia + stan zgodności.
              </p>
              <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Status Overview */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-5 rounded-xl border border-blue-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Status KSeF i JPK</h4>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                          Walidacje OK
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Dokumenty przygotowane</span>
                          <span className="text-white font-medium">234</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Do zatwierdzenia</span>
                          <span className="text-amber-400 font-medium">3</span>
                        </div>
                        <div className="flex justify-between text-xs mt-3 pt-2 border-t border-gray-700">
                          <span className="text-gray-500">Ostatnia walidacja</span>
                          <span className="text-gray-400">2 min temu</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-5 rounded-xl border border-green-500/20">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Wiele firm — jedna struktura</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10">
                          <Building className="h-4 w-4 text-blue-400" />
                          <span className="text-white text-sm">Firma A Sp. z o.o.</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10">
                          <Building className="h-4 w-4 text-blue-400" />
                          <span className="text-white text-sm">Firma B JDG</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Items */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5 rounded-xl border border-amber-500/20">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Dokumenty do zatwierdzenia — wyjątki</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-amber-400" />
                            <div>
                              <p className="text-white text-sm font-medium">Faktura #2024/123</p>
                              <p className="text-gray-400 text-xs">Wymaga kategoryzacji</p>
                            </div>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3">
                            <Receipt className="h-4 w-4 text-amber-400" />
                            <div>
                              <p className="text-white text-sm font-medium">Wydatek #456</p>
                              <p className="text-gray-400 text-xs">Sprawdź kontrahenta</p>
                            </div>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-5 rounded-xl border border-purple-500/20">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Ślad zmian i odpowiedzialność</h4>
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span>Jan Kowalski zatwierdził fakturę #122</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span>System przygotował paczkę do wysyłki (KSeF-ready)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                          <span>Księgowa zweryfikowała kategorię</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 space-y-2">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium px-2">
                  System przygotowuje dane. Ty zatwierdzasz wyjątki.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                  Każda decyzja ma ślad audytowy.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 px-2 italic">
                  Przykładowe dane demonstracyjne.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                  <Link href="/jak-to-dziala" className="hover:underline transition-colors">
                    Zobacz przykładowy workflow →
                  </Link>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Start bez migracji
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Rejestr działa od pierwszego dnia. Historię możesz uzupełniać opcjonalnie.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Wyjątki do decyzji
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  System pokazuje elementy wymagające akceptacji lub uzupełnienia.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Stan zgodności
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Walidacje i kontrola kompletności w okresie rozliczeniowym.
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
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 px-2 font-medium">
              To nie jest narzędzie „na chwilę". To infrastruktura.
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Dla przedsiębiorców i księgowych, którzy chcą mieć pełną kontrolę
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 px-2 max-w-3xl mx-auto">
              KsięgaI nie ogranicza Cię, gdy firma rośnie. System skaluje się bez chaosu i ręcznej pracy.
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 px-2 italic">
              Masz 2+ firmy albo obsługujesz klientów? Tu zaczyna się realna przewaga.
            </p>
            
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <Link href="/dla-ksiegowych" className="hover:underline transition-colors">
                  Prowadzisz biuro rachunkowe? Zobacz wersję dla księgowych →
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Obsługa wielu firm i klientów</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Jedno miejsce, wiele podmiotów. Bez przełączania systemów.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Dane gotowe do kontroli</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Spójna struktura, ślad zmian, odpowiedzialność i historia decyzji.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Więcej klientów bez więcej godzin</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Dla księgowych: większa przepustowość bez zwiększania zespołu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREE INBOX - Plan Podstawowy */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white mb-4">
                <Inbox className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wide">Plan podstawowy (bez opłat)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
                Rejestr wpływów dokumentów
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4 px-2">
                Podstawowy zakres ewidencji: odbiór, podgląd, uzgodnienia i eksport.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 px-2">
                Możesz używać tylko rejestru wpływów — albo dodać Premium dla pełnego obiegu zatwierdzeń i kontroli.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border-2 border-green-500 dark:border-green-600 shadow-xl mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Zakres planu podstawowego:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Rejestr wpływów
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dokumenty trafiają do rejestru i są przypisywane do kontekstu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Uzgodnienia przy dokumencie
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Komentarze i załączniki pozostają w kontekście ewidencji
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Eksport danych
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pełny dostęp do własnych danych w formacie eksportu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Wiele podmiotów
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rejestr obsługuje wiele firm w jednej strukturze
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/rejestracja"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Uruchom rejestr wpływów
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#premium"
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold transition-all"
                >
                  Zakres rozszerzony
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Dostęp bez opłat • Plan podstawowy bezterminowo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section - Risk Removal Pack */}
      <section id="premium" className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-3 sm:mb-4">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400 text-xs sm:text-sm font-medium">Premium</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
                Premium: Rozszerzony zakres ewidencji i kontroli
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 px-2">
                Dla firm, które wymagają obiegu zatwierdzeń, walidacji i pełnej rozliczalności procesowej.
              </p>
            </div>

            {/* Bundle Stack - What you get with Premium */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 border-2 border-amber-300 dark:border-amber-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                3 warstwy kontroli i zgodności:
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                Zakres Premium rozszerza ewidencję o obieg zatwierdzeń, walidacje oraz rozrachunki.
              </p>
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Workflow zatwierdzania + role
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Kto, co, kiedy zatwierdził. Ślad audytowy zawsze gotowy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                        KSeF-ready + JPK + walidacje
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        System przygotowuje dane. Ty zatwierdzasz przed wysyłką.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Bank + auto-dopasowanie płatności
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Widzisz pieniądze w czasie rzeczywistym. Płatności dopasowują się automatycznie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Co dostajesz w 30 dni Premium - Concrete deliverables */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 border-2 border-blue-300 dark:border-blue-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Co dostajesz w 30 dni Premium (konkretnie)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Obieg akceptacji dla faktur kosztowych</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Workflow zatwierdzeń z podziałem ról</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Rejestr decyzji + powiązania</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Ślad audytowy: kto, kiedy, na jakiej podstawie</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Stan kompletności okresu</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Kontrola dokumentów w okresie rozliczeniowym</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Walidacje i eksport</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Przygotowanie danych KSeF/JPK</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Dostęp księgowej według ról</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Uprawnienia i pełnomocnictwa w systemie</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Rozrachunki i płatności</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Integracja bankowa i dopasowanie transakcji</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-6">
                To nie jest marketing. To jest pakiet wdrożeniowy — konkretne funkcje dostępne w okresie testowym.
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
                      KSeF-ready workflow: przygotowanie danych i walidacje. System przygotowuje dokumenty — Ty zatwierdzasz wyjątki przed finalizacją.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Przygotowanie danych i paczek eksportu do KSeF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>JPK: przygotowanie + eksport + walidacje</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ślad audytowy: kto, co, kiedy zatwierdził</span>
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
                      Struktura audytowalna, raporty zawsze gotowe, pełna historia zmian.
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
                    <span>Wspiera przygotowanie deklaracji PIT/CIT</span>
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
                      Mniej ręcznego wprowadzania, więcej czasu na decyzje — kontrola zawsze po Twojej stronie.
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
                      Automatyczne dopasowanie płatności do faktur — widzisz pieniądze w czasie rzeczywistym.
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

            <div className="text-center mt-8">
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                <strong>Ważne:</strong> KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK EFFECT Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-4">
                <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Efekt sieci</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
                Standaryzacja wymiany dokumentów między firmami
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 px-2">
                Jeśli obie strony pracują w systemie ewidencji, dokument i uzgodnienia trafiają bezpośrednio do właściwego rejestru.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm text-gray-700 dark:text-gray-300">
                <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  Mniej ponaglań i duplikatów
                </span>
                <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  Mniej ponownych wysyłek i ręcznych korekt
                </span>
                <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  Mniej rozbieżności w uzgodnieniach
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Inbox className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Bezpośrednia wymiana dokumentów
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Jeśli kontrahent pracuje w systemie ewidencji, dokument trafia bezpośrednio do rejestru wpływów z pełnym kontekstem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Dostęp dla uprawnionych
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Księgowy ma dostęp do rejestru według uprawnień. Uzgodnienia pozostają w kontekście dokumentu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <History className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Przygotowanie do KSeF
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Firmy z uporządkowaną ewidencją wchodzą w obowiązkowy KSeF z pełną historią dokumentów i uzgodnień.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Uzgodnienia i decyzje w jednym miejscu
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Kto zatwierdził, kiedy, dlaczego. Załączniki + komentarze + historia zmian przy dokumencie.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GUARANTEES & RISK REVERSAL Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white mb-4">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wide">Zasady dostępu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2">
                Zasady danych i dostępu
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 px-2">
                Przenośność danych i dostęp według uprawnień.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-green-500 dark:border-green-600 shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Okres testowy Premium (30 dni)
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Możliwość testowania rozszerzonego zakresu przez 30 dni przed decyzją o kontynuacji.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-blue-500 dark:border-blue-600 shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Eksport i przenośność danych
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Pełny dostęp do eksportu danych w standardowych formatach. Brak blokad technicznych.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-purple-500 dark:border-purple-600 shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Inbox className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Plan podstawowy bezterminowo
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Rejestr wpływów dostępny bez opłat i bez ograniczeń czasowych.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
              Utwórz ewidencję firmy i rozpocznij obieg dokumentów
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-4 px-2">
              System prowadzi rejestry i przygotowuje dane. Ty zatwierdzasz wyjątki według uprawnień.
            </p>
            <p className="text-sm text-blue-200 mb-6 sm:mb-8 px-2">
              Przygotowanie do obowiązkowego KSeF: uporządkowana ewidencja dokumentów, decyzji i rozliczeń.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/rejestracja"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Rozpocznij ewidencję firmy
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#premium"
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all"
              >
                Zakres funkcjonalny
              </Link>
            </div>
            <p className="mt-4 text-sm text-blue-100">
              Dostęp według ról i pełnomocnictw • Plan podstawowy bez opłat
            </p>
            <p className="mt-4 text-xs text-blue-300">
              Prowadzisz biuro rachunkowe? <Link href="/dla-ksiegowych" className="underline hover:text-white transition-colors">Zobacz wersję dla księgowych →</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
