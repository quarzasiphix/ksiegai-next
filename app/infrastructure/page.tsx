import Link from "next/link";
import { Shield, Lock, FileCheck, AlertTriangle, CheckCircle2, Database, GitBranch } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastruktura decyzyjna - KsięgaI",
  description: "System, na którym można polegać. Gdzie decyzje, pieniądze i zasoby się spotykają.",
};

export default function InfrastructurePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 mb-8">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Infrastruktura, nie narzędzie</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Nie pomagamy prowadzić firmy.<br />
              Definiujemy, gdzie jest zapisana.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              KsięgaI to pojedyncze źródło prawdy dla Twojej firmy — gdzie decyzje, pieniądze i zasoby się spotykają.
              Zbudowane dla audytu, nie dla wymówek.
            </p>
            <Link
              href="/governance"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all"
            >
              Rozpocznij konfigurację struktury
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principle: Decision Gate */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Brama decyzyjna
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nic materialnego nie może się wydarzyć bez zatwierdzonej decyzji
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Bez decyzji</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span>Faktury nie mogą być wyeksportowane do księgowości</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span>Środki trwałe nie mogą być amortyzowane</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span>Wydatki są oznaczane jako ryzyko osobiste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <span>Umowy bez właściciela są nieważne</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
                System nie krzyczy. Po prostu odmawia.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Z decyzją</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>Decyzja definiuje zakres i budżet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>Decyzja jest zatwierdzona przez uprawnioną osobę</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>Decyzja ma określoną ważność i limity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>Wszystko jest śledzone i logowane</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
                W tym momencie przestajesz być narzędziem. Stajesz się infrastrukturą.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-xl text-gray-300 mb-4">
              <strong className="text-white">Kluczowe pytanie podczas onboardingu:</strong>
            </p>
            <p className="text-2xl font-bold text-blue-400 mb-2">
              "Kto może podejmować wiążące decyzje w tej firmie?"
            </p>
            <p className="text-gray-400">
              Odpowiedź na to pytanie definiuje strukturę władzy. System ją egzekwuje.
            </p>
          </div>
        </div>
      </section>

      {/* Accountant as Gatekeeper */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Księgowy jako strażnik
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Księgowy definiuje reguły. System je egzekwuje.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Wymagane pola
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Księgowy określa, które pola muszą być wypełnione. System blokuje dokumenty bez nich.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Reguły zatwierdzania
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Księgowy definiuje, kto może zatwierdzać jakie kwoty. Klient nie może tego ominąć.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Reguły eksportu
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Księgowy kontroluje, co może trafić do systemu księgowego. Tylko zatwierdzone dokumenty.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              To odwraca dynamikę władzy
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-red-600 dark:text-red-400 font-bold mb-2">❌ Bez KsięgaI</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Księgowy walczy z chaosem, prosi o dokumenty, poprawia błędy
                </p>
              </div>
              <div>
                <p className="text-green-600 dark:text-green-400 font-bold mb-2">✅ Z KsięgaI</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Księgowy jest strażnikiem. System wymusza jego standardy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Consequences */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Egzekwowane przez system
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nie krzyczenie. Cicha odmowa.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Faktury → Księgowość
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Faktura może być wyeksportowana do księgowości tylko wtedy, gdy jest powiązana z zatwierdzoną decyzją.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Bez decyzji: przycisk eksportu jest nieaktywny. Żadnych wyjaśnień, żadnych wymówek.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Środki trwałe → Amortyzacja
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Środki trwałe nie mogą być amortyzowane, dopóki nie zostaną zarejestrowane w systemie z powiązaniem do decyzji zakupu.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Bez rejestracji: amortyzacja jest niemożliwa. System po prostu nie pozwala.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-l-4 border-amber-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Wydatki → Ryzyko osobiste
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Wydatki bez zatwierdzenia są automatycznie oznaczane jako potencjalne ryzyko osobiste pracownika.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Bez zatwierdzenia: widoczna flaga "Ryzyko osobiste" w każdym raporcie.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Umowy → Ważność
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Umowy bez przypisanego właściciela i powiązanej decyzji są automatycznie oznaczane jako nieważne.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Bez właściciela: status "Nieważna" — nie można generować faktur ani płatności.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Your Industries */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dla branż z realnymi konsekwencjami
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nieruchomości, transport, magazyny, zoo, nekrologi — wszędzie tam, gdzie są realne aktywa, realna odpowiedzialność i realne audyty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Co łączy te branże?
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Realne aktywa fizyczne</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Realna odpowiedzialność prawna</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Realne audyty i kontrole</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Realne konsekwencje błędów</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Czego potrzebują?
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Nie "fajnego oprogramowania".
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Potrzebują porządku, który przetrwa stres.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                To jest Twoja przewaga. Nie konkurujesz z "cool software". Konkurujesz z chaosem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Offer */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Nie prowadzisz z rygorem. Prowadzisz z bezpieczeństwem.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            "Prowadź firmę z pełną identyfikowalnością — bez zmiany sposobu pracy."
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stopniowe wdrożenie
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">Krok 1</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Wprowadź reguły</p>
              </div>
              <div>
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">Krok 2</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Wprowadź zatwierdzenia</p>
              </div>
              <div>
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">Krok 3</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Wprowadź wyłączność</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 italic">
              Infrastruktura jest przyjmowana stopniowo, nie narzucana.
            </p>
          </div>

          <Link
            href="/governance"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all"
          >
            Rozpocznij konfigurację
          </Link>
        </div>
      </section>
    </div>
  );
}
