import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Building, Calculator, CreditCard, Crown, FileText, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-4 py-8 md:py-12">
          <div className="mx-auto text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-8 animate-fade-in">
              <span className="text-base">🇵🇱</span>
              <span className="text-blue-300 text-sm font-semibold">Dla polskich przedsiębiorców — także tych, którzy sprzedają za granicę</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Nie myśl o księgowości.
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-medium leading-relaxed animate-fade-in">
              KsięgaI dopilnuje faktur, podatków i porządku w firmie <span className="text-blue-400">za Ciebie</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in">
              Wystawiasz faktury.<br />
              Resztą zajmuje się system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-2 animate-fade-in">
              <Link href="/rejestracja" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto shadow-xl hover:shadow-2xl transition-all rounded-2xl font-semibold"
                  aria-label="Rozpocznij darmowo i zobacz, jak działa księgowość bez myślenia"
                >
                  Zobacz, jak działa księgowość bez myślenia — zacznij za darmo
                </button>
                <p className="mt-2 text-xs text-gray-400 text-center sm:hidden">
                  Bez karty. Pierwsza faktura w <span className="font-semibold text-white">5 minut</span>.
                </p>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <p className="text-sm text-gray-400 font-medium">Zgodne z polskimi przepisami • KSeF • JPK • realia polskich firm — także w UE</p>
              <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap text-sm">
                <span className="flex items-center gap-2 text-gray-300">
                  <span className="text-base">🇵🇱</span>
                  <span>Polski język i wsparcie</span>
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <span className="text-base">🇵🇱</span>
                  <span>Polskie przepisy i KSeF</span>
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <span className="text-base">🇵🇱</span>
                  <span>Dla polskich przedsiębiorców</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR - Pain-based targeting */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Jeśli prowadzisz firmę i nie chcesz myśleć o księgowości — to jest dla Ciebie.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Masz dość pilnowania faktur, terminów i dokumentów
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Nie wiesz, czy wszystko jest zgodne z przepisami
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Boisz się błędów, które mogą kosztować czas lub pieniądze
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 dark:text-red-400 text-xl">✗</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    Chcesz mieć porządek, ale bez uczenia się księgowości
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-8 font-medium">
              KsięgaI zostało stworzone po to, żebyś nie musiał się na tym znać.
            </p>
          </div>
        </div>
      </section>

      {/* SPEED & CERTAINTY */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Porządek w finansach w jeden wieczór
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Pierwsza faktura w mniej niż 5 minut
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Bez szkoleń, bez komplikacji
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Wydatki pod kontrolą bez Excela
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Wszystko w jednym miejscu
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Zawsze gotowe do sprawdzenia
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Żadnych niespodzianek
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="premium" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-4">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Premium</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Dla firm, które nie chcą ryzykować błędów
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Zgodność z polskimi przepisami i KSeF — żebyś spał spokojnie, nawet gdy zmieniają się zasady.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">KSeF & podatki</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Nie martwisz się, czy coś jest źle wysłane lub źle policzone.
                    </p>
                  </div>
                </div>
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
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Zaawansowana księgowość</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Gotowe dane, kiedy ich potrzebujesz — bez paniki przed terminami.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Automatyczne rozliczenia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Deklaracje PIT/CIT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Raporty zawsze gotowe</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Dokumenty same się ogarniają. Ty tylko zatwierdzasz.
                    </p>
                  </div>
                </div>
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
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bank</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Widzisz pieniądze w czasie rzeczywistym. Bez ręcznego dopasowywania.
                    </p>
                  </div>
                </div>
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
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/premium">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                  Zobacz pełną ofertę Premium
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Gotowy, żeby przestać myśleć o księgowości?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Załóż konto za darmo i wystaw pierwszą fakturę w 5 minut.
            </p>
            <Link href="/rejestracja" className="inline-block">
              <button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Zacznij za darmo
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              Bez karty kredytowej • Pełny dostęp • Anuluj w każdej chwili
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
