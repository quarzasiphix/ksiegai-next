export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Polityka zwrotów
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Prawo do odstąpienia od umowy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Zgodnie z ustawą o prawach konsumenta, masz prawo odstąpić od umowy w terminie 14 dni bez podania jakiejkolwiek przyczyny.
                </p>
                <p>
                  Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia zawarcia umowy (tj. od dnia aktywacji płatnej subskrypcji).
                </p>
                <p>
                  <strong>Ważne:</strong> Jeśli rozpocząłeś korzystanie z usług Premium przed upływem 14-dniowego okresu odstąpienia 
                  i wyraziłeś na to wyraźną zgodę podczas procesu zakupu, prawo do odstąpienia od umowy wygasa.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Jak odstąpić od umowy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Aby skorzystać z prawa odstąpienia od umowy, musisz poinformować nas o swojej decyzji w drodze jednoznacznego oświadczenia.
                </p>
                <p>Możesz to zrobić:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wysyłając e-mail na adres: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></li>
                  <li>Anulując subskrypcję w ustawieniach konta i kontaktując się z nami w celu zwrotu środków</li>
                </ul>
                <p>
                  W oświadczeniu należy podać:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Imię i nazwisko / Nazwa firmy</li>
                  <li>Adres e-mail powiązany z kontem</li>
                  <li>Datę zawarcia umowy (aktywacji subskrypcji)</li>
                  <li>Wyraźne oświadczenie o odstąpieniu od umowy</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Skutki odstąpienia od umowy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  W przypadku odstąpienia od umowy zwracamy wszystkie otrzymane od Ciebie płatności, w tym koszty dostarczenia 
                  (z wyjątkiem dodatkowych kosztów wynikających z wybranego przez Ciebie sposobu dostarczenia innego niż najtańszy 
                  zwykły sposób dostarczenia oferowany przez nas), niezwłocznie, a w każdym przypadku nie później niż 14 dni 
                  od dnia, w którym zostaliśmy poinformowani o Twojej decyzji o wykonaniu prawa odstąpienia od umowy.
                </p>
                <p>
                  Zwrotu płatności dokonamy przy użyciu takich samych sposobów płatności, jakie zostały przez Ciebie użyte 
                  w pierwotnej transakcji, chyba że wyraźnie zgodziłeś się na inne rozwiązanie; w każdym przypadku nie poniesiesz 
                  żadnych opłat w związku z tym zwrotem.
                </p>
                <p>
                  <strong>Zwrot przez Stripe:</strong> Wszystkie płatności są przetwarzane przez Stripe, Inc. Zwroty są realizowane 
                  na tę samą kartę/metodę płatności, która została użyta do dokonania płatności. Czas realizacji zwrotu zależy 
                  od Twojego banku i zazwyczaj wynosi 5-10 dni roboczych.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Anulowanie subskrypcji</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Możesz anulować swoją subskrypcję w każdym momencie w ustawieniach konta.
                </p>
                <p>
                  <strong>Anulowanie jest skuteczne z końcem bieżącego okresu rozliczeniowego.</strong> Oznacza to, że:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Zachowasz dostęp do funkcji Premium do końca opłaconego okresu</li>
                  <li>Nie zostaniesz obciążony za kolejny okres</li>
                  <li>Po zakończeniu okresu, Twoje konto przejdzie na plan darmowy</li>
                </ul>
                <p>
                  <strong>Ważne:</strong> Anulowanie subskrypcji nie jest równoznaczne z odstąpieniem od umowy. 
                  Jeśli anulujesz subskrypcję po rozpoczęciu korzystania z usług, nie przysługuje Ci automatyczny zwrot środków 
                  za bieżący okres rozliczeniowy (chyba że korzystasz z prawa odstąpienia w ciągu 14 dni).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Bezpłatny okres próbny</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Plan Spółka Standard oferuje 7-dniowy bezpłatny okres próbny.
                </p>
                <p>
                  <strong>Zasady okresu próbnego:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nie wymaga podania danych karty kredytowej</li>
                  <li>Możesz anulować w każdym momencie bez ponoszenia kosztów</li>
                  <li>Po zakończeniu okresu próbnego, możesz wykupić pełną subskrypcję lub kontynuować korzystanie z planu darmowego</li>
                  <li>Każdy użytkownik może skorzystać z okresu próbnego tylko raz</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Zwroty w szczególnych przypadkach</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Rozważymy zwrot środków w następujących przypadkach:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Błąd techniczny:</strong> Jeśli nie mogłeś korzystać z usług z powodu błędu po naszej stronie</li>
                  <li><strong>Podwójna płatność:</strong> Jeśli zostałeś omyłkowo obciążony dwukrotnie</li>
                  <li><strong>Nieautoryzowana płatność:</strong> Jeśli płatność została dokonana bez Twojej zgody</li>
                </ul>
                <p>
                  W takich przypadkach skontaktuj się z nami na <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a> 
                  z opisem sytuacji. Rozpatrzymy każdy przypadek indywidualnie.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Brak zwrotów</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Nie dokonujemy zwrotów w następujących przypadkach:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Po upływie 14-dniowego okresu odstąpienia (jeśli rozpocząłeś korzystanie z usług)</li>
                  <li>Za częściowo wykorzystany okres rozliczeniowy (chyba że korzystasz z prawa odstąpienia)</li>
                  <li>Jeśli Twoje konto zostało zawieszone lub usunięte z powodu naruszenia Regulaminu</li>
                  <li>Za okresy rozliczeniowe, które już minęły</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Reklamacje</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Jeśli masz jakiekolwiek problemy z naszymi usługami, skontaktuj się z nami:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>E-mail: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></li>
                  <li>Odpowiadamy na reklamacje w ciągu 14 dni roboczych</li>
                </ul>
                <p>
                  W reklamacji prosimy o podanie:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adresu e-mail powiązanego z kontem</li>
                  <li>Szczegółowego opisu problemu</li>
                  <li>Daty wystąpienia problemu</li>
                  <li>Oczekiwanego sposobu rozwiązania</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Pozasądowe rozwiązywanie sporów</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Konsument ma prawo do skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń.
                </p>
                <p>
                  Więcej informacji na temat pozasądowego rozwiązywania sporów konsumenckich można znaleźć na stronie 
                  Urzędu Ochrony Konkurencji i Konsumentów: <a href="https://www.uokik.gov.pl" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.uokik.gov.pl</a>
                </p>
                <p>
                  Platforma ODR (Online Dispute Resolution): <a href="https://ec.europa.eu/consumers/odr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Dane kontaktowe</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Tovernet sp. z o.o.</strong></p>
                <p>NIP: 7322228540</p>
                <p>E-mail: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></p>
              </div>
            </section>

            <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Masz pytania?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Jeśli masz jakiekolwiek pytania dotyczące naszej polityki zwrotów, skontaktuj się z nami pod adresem 
                <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline ml-1">kontakt@ksiegai.pl</a>. 
                Chętnie pomożemy!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
