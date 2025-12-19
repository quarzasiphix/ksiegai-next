export default function RODO() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Informacje RODO
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>

            <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Klauzula informacyjna RODO</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Zgodnie z art. 13 i 14 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. 
                w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu 
                takich danych oraz uchylenia dyrektywy 95/46/WE (RODO), informujemy:
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Administrator danych osobowych</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Tovernet sp. z o.o.</strong></p>
                <p>NIP: 7322228540</p>
                <p>Kontakt: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Cel i podstawa prawna przetwarzania</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Twoje dane osobowe będą przetwarzane w następujących celach:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Świadczenie usług księgowych</strong> - art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
                  <li><strong>Wystawianie faktur VAT</strong> - art. 6 ust. 1 lit. c RODO (obowiązek prawny wynikający z ustawy o VAT)</li>
                  <li><strong>Obsługa płatności</strong> - art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
                  <li><strong>Marketing bezpośredni</strong> - art. 6 ust. 1 lit. a RODO (zgoda) lub art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
                  <li><strong>Analityka i ulepszanie usług</strong> - art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
                  <li><strong>Dochodzenie roszczeń</strong> - art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Odbiorcy danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Twoje dane osobowe mogą być przekazywane:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supabase, Inc.</strong> (USA) - dostawca infrastruktury IT i baz danych</li>
                  <li><strong>Stripe, Inc.</strong> (USA) - operator płatności</li>
                  <li><strong>Vercel, Inc.</strong> (USA) - hosting aplikacji</li>
                  <li><strong>Organom państwowym</strong> - w zakresie wymaganym przepisami prawa (np. Urząd Skarbowy)</li>
                </ul>
                <p className="mt-4">
                  <strong>Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG):</strong><br />
                  Dane są przekazywane do USA na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską 
                  oraz certyfikacji EU-US Data Privacy Framework.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Okres przechowywania danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Twoje dane osobowe będą przechowywane:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dane konta:</strong> Do momentu usunięcia konta lub wycofania zgody</li>
                  <li><strong>Faktury i dokumenty księgowe:</strong> 5 lat od końca roku podatkowego (obowiązek wynikający z ustawy o rachunkowości)</li>
                  <li><strong>Dane do celów marketingowych:</strong> Do momentu wycofania zgody lub wniesienia sprzeciwu</li>
                  <li><strong>Dane do dochodzenia roszczeń:</strong> Do czasu przedawnienia roszczeń zgodnie z Kodeksem cywilnym</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Twoje prawa</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Przysługują Ci następujące prawa:</p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo dostępu (art. 15 RODO)</h3>
                <p>Masz prawo uzyskać od nas potwierdzenie, czy przetwarzamy Twoje dane osobowe, a jeśli tak - uzyskać dostęp do tych danych oraz informacje o przetwarzaniu.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do sprostowania (art. 16 RODO)</h3>
                <p>Masz prawo żądać niezwłocznego sprostowania nieprawidłowych danych osobowych lub uzupełnienia niekompletnych danych.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do usunięcia (art. 17 RODO)</h3>
                <p>Masz prawo żądać usunięcia danych osobowych, chyba że zachodzi obowiązek ich przechowywania (np. faktury VAT).</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do ograniczenia przetwarzania (art. 18 RODO)</h3>
                <p>Masz prawo żądać ograniczenia przetwarzania w określonych sytuacjach (np. gdy kwestionujesz prawidłowość danych).</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do przenoszenia danych (art. 20 RODO)</h3>
                <p>Masz prawo otrzymać swoje dane w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego (CSV/JSON).</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do sprzeciwu (art. 21 RODO)</h3>
                <p>Masz prawo w dowolnym momencie wnieść sprzeciw wobec przetwarzania danych na podstawie prawnie uzasadnionego interesu (w tym profilowania) oraz wobec przetwarzania do celów marketingu bezpośredniego.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do cofnięcia zgody (art. 7 ust. 3 RODO)</h3>
                <p>Jeśli przetwarzanie odbywa się na podstawie zgody, masz prawo ją cofnąć w dowolnym momencie. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">Prawo do wniesienia skargi (art. 77 RODO)</h3>
                <p>
                  Masz prawo wnieść skargę do organu nadzorczego - Prezesa Urzędu Ochrony Danych Osobowych (PUODO):<br />
                  ul. Stawki 2, 00-193 Warszawa<br />
                  <a href="https://www.uodo.gov.pl" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.uodo.gov.pl</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Źródło danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Twoje dane osobowe pochodzą z następujących źródeł:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bezpośrednio od Ciebie (formularz rejestracji, dane wprowadzone do systemu)</li>
                  <li>Z konta Google (jeśli korzystasz z logowania przez Google)</li>
                  <li>Z Twojej aktywności w systemie (logi, historia transakcji)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Zautomatyzowane podejmowanie decyzji i profilowanie</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Twoje dane mogą być przetwarzane w sposób zautomatyzowany, w tym w formie profilowania, w następujących celach:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rozpoznawanie dokumentów przez AI (OCR)</li>
                  <li>Automatyczna kategoryzacja transakcji</li>
                  <li>Sugestie dotyczące rozliczeń</li>
                  <li>Analiza zachowań użytkowników w celu ulepszania usług</li>
                </ul>
                <p>
                  Zautomatyzowane przetwarzanie nie prowadzi do podejmowania decyzji wywołujących skutki prawne lub w podobny sposób 
                  istotnie wpływających na Twoją sytuację. Zawsze masz możliwość weryfikacji i korekty danych przygotowanych automatycznie.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Obowiązek podania danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Podanie danych osobowych jest:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dobrowolne</strong> - w zakresie rejestracji i korzystania z usług</li>
                  <li><strong>Niezbędne</strong> - do zawarcia i wykonania umowy (bez podania danych nie będziemy mogli świadczyć usług)</li>
                  <li><strong>Wymagane przepisami prawa</strong> - w zakresie danych do faktur VAT (ustawa o VAT)</li>
                </ul>
                <p>
                  Konsekwencją niepodania danych niezbędnych do zawarcia umowy będzie brak możliwości korzystania z usług platformy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Jak skorzystać ze swoich praw</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Aby skorzystać z przysługujących Ci praw, skontaktuj się z nami:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>E-mail: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></li>
                  <li>W temacie wiadomości wpisz: "RODO - [nazwa prawa]"</li>
                </ul>
                <p>
                  Odpowiemy na Twoje żądanie w ciągu 30 dni od jego otrzymania. W uzasadnionych przypadkach możemy przedłużyć 
                  ten termin o kolejne 60 dni, informując Cię o przyczynach opóźnienia.
                </p>
              </div>
            </section>

            <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Masz pytania?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Jeśli masz jakiekolwiek pytania dotyczące przetwarzania Twoich danych osobowych, skontaktuj się z nami pod adresem 
                <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline ml-1">kontakt@ksiegai.pl</a>. 
                Chętnie wyjaśnimy wszelkie wątpliwości.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
