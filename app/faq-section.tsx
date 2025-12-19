import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 md:px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Najczęstsze pytania
          </h2>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Czy to zastępuje księgowego?
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Nie. KsięgaI to narzędzie wspierające — porządkuje dane i automatyzuje procesy. Księgowy nadal podejmuje decyzje, ale zamiast przepisywać dokumenty, sprawdza wyniki.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Czy mogę wyeksportować dane?
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Tak. Zachowujesz pełny dostęp do swoich danych i możesz je wyeksportować w każdej chwili — nawet po anulowaniu subskrypcji.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Czy muszę mieć KSeF już teraz?
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Nie musisz. KsięgaI działa już teraz i przygotowuje Cię do KSeF — gdy stanie się obowiązkowy, będziesz gotowy bez paniki.
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Ile czasu zajmuje wdrożenie?
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Pierwszą fakturę wystawisz w 5 minut. Pełne wdrożenie (integracje bankowe, import historii) zajmuje 1–2 dni — ale możesz zacząć korzystać od razu.
              </div>
            </details>

            {/* FAQ 5 - AI replacing accountant */}
            <details className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Czy KsięgaI zastępuje księgową/księgowego?
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Nie. KsięgaI automatyzuje pracę operacyjną (zbieranie danych, dopasowania, propozycje), ale decyzje i zatwierdzenie wyjątków zostają po Twojej stronie. Każda decyzja ma ślad audytowy.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
