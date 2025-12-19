import { CheckCircle2, Crown, Zap, Shield, Building, Calculator, CreditCard, Star } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-8">
              <Crown className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Cennik dopasowany do Twojej firmy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Płacisz za odpowiedzialność,<br />nie za faktury
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              JDG to księgowość. Spółka to odpowiedzialność.<br />
              My wyceniamy odpowiedzialność.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* JDG Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">JDG</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Dla jednoosobowych działalności gospodarczych
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">19 zł</span>
                  <span className="text-gray-600 dark:text-gray-400">/miesiąc</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Nieograniczone faktury</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Ewidencja przychodów</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Integracja z KSeF</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Podstawowe raporty</span>
                </li>
              </ul>

              <Link href="/rejestracja" className="block">
                <button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  Zacznij teraz
                </button>
              </Link>
            </div>

            {/* Spółka Standard - Featured */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 border-2 border-blue-500 relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  NAJPOPULARNIEJSZE
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Spółka Standard</h3>
                <p className="text-blue-100 text-sm">
                  Dla spółek z o.o. — pełna kontrola i zgodność
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">89 zł</span>
                  <span className="text-blue-100">/miesiąc</span>
                </div>
                <p className="text-blue-100 text-sm mt-2">lub 999 zł/rok (oszczędzasz 69 zł)</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-medium">Wszystko z JDG +</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Zarządzanie uchwałami</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Ewidencja majątku</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Automatyczne JPK-V7M</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Deklaracje CIT</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Wsparcie priorytetowe</span>
                </li>
              </ul>

              <Link href="/rejestracja" className="block">
                <button className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 rounded-xl transition-colors shadow-lg">
                  Rozpocznij 7-dniowy trial
                </button>
              </Link>
              <p className="text-center text-blue-100 text-xs mt-3">
                Bez karty kredytowej • Pełny dostęp
              </p>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Dla grup kapitałowych i banków
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">Indywidualnie</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Wszystko ze Standard +</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Wdrożenie on-premise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Dedykowany opiekun</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">SLA 99.9%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Integracje na zamówienie</span>
                </li>
              </ul>

              <a href="mailto:kontakt@ksiegai.pl" className="block">
                <button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  Skontaktuj się
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Pricing */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Dlaczego tak wyceniamy?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  JDG = 19 zł
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Niska złożoność zarządzania. Proste przepisy. Minimalne ryzyko prawne. To ścieżka nauki dla przedsiębiorców.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Spółka = 89 zł
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Wysoka odpowiedzialność. Audyty. Kapitał. Uchwały. Zarządzanie ryzykiem. Wyceniamy odpowiedzialność, nie faktury.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                <strong>79-99 zł to cena dla ludzi, którzy rozumieją ryzyko.</strong><br />
                Nie dla chaosu. Nie dla nieprzygotowanych. Dla tych, którzy chcą spokoju.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Info */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 md:px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Każda spółka dostaje 7-dniowy trial
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Bez karty kredytowej. Pełny dostęp do wszystkich funkcji.<br />
              Przekonaj się, że governance może być proste.
            </p>
            <Link href="/rejestracja">
              <button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
                Zacznij za darmo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
