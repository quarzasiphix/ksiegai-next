import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Shield, Zap, Building, Calculator, CreditCard, Crown, FileText, Users, TrendingUp, Receipt } from "lucide-react";
import type { Metadata } from "next";
import FAQSection from "./faq-section";

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
      {/* KSeF Readiness Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm sm:text-base text-white font-medium">
            KSeF wkrótce obowiązkowy. Uporządkuj dokumenty i proces już teraz — wejdziesz gotowy.
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
            "description": "Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Pełna zgodność z KSeF, JPK i polskimi przepisami.",
            "featureList": "KSeF-ready (workflow + walidacje + archiwum); Generatory JPK (eksport); Import wyciągów bankowych; AI wspierające dekretację; Obsługa wielu firm; Role i ślad audytowy",
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
              Faktury, podatki i raporty — bez chaosu, z pełną <span className="text-blue-400">kontrolą</span>.
            </p>
            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in px-2">
              System przygotowuje dane. Ty zatwierdzasz wyjątki.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-3 px-2 animate-fade-in">
              <Link
                href="/rejestracja"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Zacznij za darmo
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-medium text-center animate-fade-in px-2 mb-3">
              Pierwsza faktura w 5 minut • Bez karty • Bez zobowiązań
            </p>
            <p className="text-xs sm:text-sm text-gray-500 text-center animate-fade-in px-2 mb-3">
              Dla JDG i spółek • Ślad audytu • Eksport danych w każdej chwili
            </p>
            <p className="text-xs sm:text-sm text-gray-500 text-center animate-fade-in px-2">
              Projektowane z księgowymi w pętli feedbacku — workflow oparty o wyjątki, zatwierdzanie i ślad audytu.
            </p>
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
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl p-6 sm:p-8 mt-6 sm:mt-8 border border-orange-200 dark:border-orange-800/30">
              <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-semibold text-center">
                Każdy z tych problemów mnoży się przy obowiązkowym KSeF.
              </p>
            </div>
            
            {/* Outcome Mirror */}
            <div className="mt-8 sm:mt-10 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 sm:p-8 border border-green-200 dark:border-green-800/30">
              <div className="max-w-2xl mx-auto space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Terminy i dokumenty pod kontrolą
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Zatwierdzasz tylko wyjątki
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium">
                    Wszystko ma ślad audytu
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
                Jak wygląda księgowość po wdrożeniu KsięgaI?
              </h3>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                Faktury wpadają same. Płatności się dopasowują.<br />
                Na koniec miesiąca wszystko jest gotowe — bez paniki.
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
                Tak wygląda praca w KsięgaI: wyjątki do zatwierdzenia + ślad audytu.
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
                  Pierwsza faktura w 5 minut — bez stresu przed wejściem KSeF
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
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 px-2 italic">
              Masz 2+ firmy albo obsługujesz klientów? Tu zaczyna się realna przewaga.
            </p>
            
            {/* Mid-page CTA Divider */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-10 mb-8 sm:mb-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Zacznij za darmo — pierwsza faktura w 5 minut
              </h3>
              <Link
                href="/rejestracja"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Rozpocznij teraz
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-4 text-sm text-blue-100">
                Bez karty • Bez zobowiązań
              </p>
            </div>

            <div className="text-center mb-8 sm:mb-10">
              <Link
                href="/dla-ksiegowych"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Zobacz, jak pracują księgowi z KsięgaI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-2 px-2">
                KSeF, JPK, integracje bankowe i AI — pełna struktura z pełną kontrolą.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 px-2">
                Szczególnie istotne przy zmianach regulacyjnych i obowiązkowym KSeF.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 px-2 font-medium">
                Jeśli masz spółkę / większy wolumen / biuro rachunkowe — Premium usuwa ryzyko i ręczną pracę na poziomie procesu.
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
                      KSeF-ready: struktura danych, walidacje i workflow. System przygotowuje dokumenty i deklaracje — Ty zatwierdzasz wyjątki przed finalizacją.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Workflow wysyłki do KSeF + walidacje (KSeF-ready)</span>
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
              <Link
                href="/premium"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Zobacz pełną ofertę Premium
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                <strong>Ważne:</strong> KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego.
              </p>
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
              Zostaw księgowość systemowi. Skup się na firmie.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-4 px-2">
              Pierwsza faktura w 5 minut. Pełna kontrola od pierwszego dnia.
            </p>
            <p className="text-sm text-blue-200 mb-4 px-2">
              Każdy miesiąc bez systemu to miesiąc ręcznej pracy, której nie musisz wykonywać.<br />
              I miesiąc bliżej obowiązkowego KSeF bez przygotowania.
            </p>
            <p className="text-xs text-blue-300 mb-6 sm:mb-8 px-2 italic">
              Nie pytanie czy KSeF wejdzie. Pytanie, czy wejdziesz w niego gotowy.
            </p>
            <Link
              href="/rejestracja"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Zacznij za darmo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              Bez karty • Bez zobowiązań • Anuluj w każdej chwili
            </p>
            <p className="mt-2 text-xs text-blue-200">
              Zachowujesz pełny dostęp do swoich danych. Eksport w każdej chwili.
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
