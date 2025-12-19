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
              Faktury, podatki i KSeF bez chaosu — z pełną <span className="text-blue-400">kontrolą</span> i porządkiem.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4 sm:mb-6 max-w-3xl mx-auto animate-fade-in px-2">
              Wystawiasz faktury. System ogarnia resztę: KSeF, JPK, raporty.<br />
              Zatwierdzasz wyjątki. Wszystko ma ślad zmian.<br />
              <span className="text-gray-500 text-base sm:text-lg">Śpisz spokojnie, nawet gdy przychodzi kontrola.</span><br />
              <span className="text-gray-600 text-sm sm:text-base mt-2 inline-block">Zamiast Excela, maili i ręcznego pilnowania terminów.</span>
            </p>
            <p className="text-sm text-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in px-2">
              Zbudowane pod realia PL: JDG i spółki, KSeF i JPK.
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
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium text-center animate-fade-in px-2">
              Bez karty • Bez zobowiązań • Anuluj w każdej chwili
            </p>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR - Pain-based targeting */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">
              Masz lepsze rzeczy do robienia niż ręczna księgowość.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 text-left">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Gubisz terminy i dokumenty — a potem gasisz pożary
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Nie masz pewności, czy wszystko jest zgodne z przepisami
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Każda ręczna poprawka to realny koszt — czasu, nerwów i potencjalnych kar
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                    Chcesz kontroli, ale bez klepania Excela i PDF-ów
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-6 sm:mt-8 font-medium px-2">
              Każdy dzień ręcznej księgowości to stracony czas i niepotrzebne ryzyko.
            </p>
          </div>
        </div>
      </section>

      {/* SPEED & CERTAINTY */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-2">
              Oszczędza czas. Porządkuje. Skaluje się z Tobą.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 px-2">
              Mniej operacyjnej księgowości. Więcej decyzji.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 px-2">
              Zaprojektowane pod realne procesy firm w Polsce.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 border border-blue-100 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Jak wygląda księgowość po wdrożeniu KsięgaI?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                Faktury wpadają same. Płatności się dopasowują.<br />
                Na koniec miesiąca wszystko jest gotowe — bez paniki.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Pierwsza faktura w 5 minut
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
                  Pełna struktura bez Excela
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Wszystko w jednym miejscu, gotowe do kontroli
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Koniec miesiąca bez paniki
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Raporty zawsze gotowe do sprawdzenia
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
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 sm:mb-10 px-2 italic">
              Masz 2+ firmy albo obsługujesz klientów? Tu zaczyna się realna przewaga.
            </p>
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
                  Spójna struktura, ślad zmian, gotowe do kontroli i audytu.
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
                Premium to mniejsze ryzyko, mniej ręcznej pracy i gotowość do kontroli — na każdym etapie.
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 px-2 italic">
                Premium wybierają firmy, które nie chcą tłumaczyć się z chaosu.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                KSeF, JPK, integracje bankowe i AI — pełna struktura z pełną kontrolą.
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
                      Automatyczne wysłanie, zgodność z przepisami, zatwierdzanie przed finalizacją.
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
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-4 px-2">
              Pierwsza faktura w 5 minut. Pełna kontrola od pierwszego dnia.
            </p>
            <p className="text-sm text-blue-200 mb-6 sm:mb-8 px-2">
              Każdy miesiąc bez systemu to miesiąc ręcznej pracy, której nie musisz wykonywać.
            </p>
            <Link href="/rejestracja" className="inline-block">
              <button className="bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Zacznij za darmo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              Bez karty • Bez zobowiązań • Anuluj w każdej chwili
            </p>
            <p className="mt-2 text-xs text-blue-200">
              Zachowujesz pełny dostęp do swoich danych. Eksport w każdej chwili.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
