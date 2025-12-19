export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Polityka prywatności
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Administrator danych osobowych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Administratorem Twoich danych osobowych jest <strong>Tovernet sp. z o.o.</strong>, NIP: 7322228540 (dalej: "Administrator").
                </p>
                <p>
                  Kontakt w sprawach ochrony danych osobowych: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Jakie dane zbieramy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Zbieramy następujące kategorie danych osobowych:</p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2.1. Dane podane podczas rejestracji</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adres e-mail</li>
                  <li>Hasło (przechowywane w formie zaszyfrowanej)</li>
                  <li>Nazwa firmy / Imię i nazwisko</li>
                  <li>NIP (dla celów fakturowania)</li>
                  <li>Adres firmy</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2.2. Dane z konta Google (jeśli korzystasz z logowania przez Google)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adres e-mail</li>
                  <li>Imię i nazwisko</li>
                  <li>Zdjęcie profilowe (opcjonalnie)</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2.3. Dane generowane podczas korzystania z platformy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Faktury i dokumenty księgowe</li>
                  <li>Dane kontrahentów</li>
                  <li>Transakcje bankowe (jeśli korzystasz z integracji)</li>
                  <li>Uchwały i dokumenty spółki (Plan Spółka)</li>
                  <li>Logi aktywności w systemie</li>
                  <li>Dane techniczne (adres IP, przeglądarka, system operacyjny)</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">2.4. Dane płatności</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dane karty kredytowej (przetwarzane wyłącznie przez Stripe, Inc.)</li>
                  <li>Historia płatności</li>
                  <li>Faktury VAT</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cel i podstawa prawna przetwarzania danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Cel przetwarzania</th>
                      <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Podstawa prawna (RODO)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Świadczenie usług księgowych i fakturowania</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. b (wykonanie umowy)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Obsługa płatności i rozliczeń</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. b (wykonanie umowy)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Wystawianie faktur VAT</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. c (obowiązek prawny)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Marketing i newsletter</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. a (zgoda)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Analityka i ulepszanie usług</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. f (prawnie uzasadniony interes)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Obsługa reklamacji i wsparcie techniczne</td>
                      <td className="border border-gray-300 dark:border-gray-700 p-3">Art. 6 ust. 1 lit. b (wykonanie umowy)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Komu udostępniamy dane</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Twoje dane mogą być udostępniane następującym kategoriom odbiorców:</p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">4.1. Dostawcy usług technicznych</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supabase, Inc.</strong> (USA) - hosting bazy danych i uwierzytelnianie</li>
                  <li><strong>Vercel, Inc.</strong> (USA) - hosting aplikacji</li>
                  <li><strong>Stripe, Inc.</strong> (USA) - przetwarzanie płatności</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">4.2. Organy publiczne</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Urząd Skarbowy (w zakresie wymaganym przepisami prawa)</li>
                  <li>Inne organy państwowe (na podstawie przepisów prawa)</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">4.3. Przekazywanie danych poza EOG</h3>
                <p>
                  Twoje dane są przechowywane na serwerach w USA (Supabase, Stripe, Vercel). 
                  Przekazywanie danych odbywa się na podstawie:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standardowych klauzul umownych zatwierdzonych przez Komisję Europejską</li>
                  <li>Certyfikacji EU-US Data Privacy Framework (w przypadku Stripe)</li>
                  <li>Odpowiednich zabezpieczeń technicznych i organizacyjnych</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Jak długo przechowujemy dane</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dane konta:</strong> Do momentu usunięcia konta lub wycofania zgody</li>
                  <li><strong>Faktury i dokumenty księgowe:</strong> 5 lat od końca roku podatkowego (obowiązek prawny)</li>
                  <li><strong>Dane płatności:</strong> Do czasu przedawnienia roszczeń (zgodnie z Kodeksem cywilnym)</li>
                  <li><strong>Logi systemowe:</strong> 12 miesięcy</li>
                  <li><strong>Dane marketingowe:</strong> Do momentu wycofania zgody</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Twoje prawa</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Zgodnie z RODO, przysługują Ci następujące prawa:</p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.1. Prawo dostępu do danych</h3>
                <p>Możesz uzyskać informację, jakie dane o Tobie przetwarzamy oraz kopię tych danych.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.2. Prawo do sprostowania</h3>
                <p>Możesz poprawić swoje dane w ustawieniach konta lub kontaktując się z nami.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.3. Prawo do usunięcia ("prawo do bycia zapomnianym")</h3>
                <p>Możesz żądać usunięcia swoich danych, chyba że musimy je zachować z powodów prawnych (np. faktury).</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.4. Prawo do ograniczenia przetwarzania</h3>
                <p>Możesz żądać ograniczenia przetwarzania Twoich danych w określonych sytuacjach.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.5. Prawo do przenoszenia danych</h3>
                <p>Możesz otrzymać swoje dane w formacie CSV/JSON i przenieść je do innego dostawcy.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.6. Prawo do sprzeciwu</h3>
                <p>Możesz sprzeciwić się przetwarzaniu danych w celach marketingowych lub na podstawie prawnie uzasadnionego interesu.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.7. Prawo do wycofania zgody</h3>
                <p>Jeśli przetwarzanie odbywa się na podstawie zgody, możesz ją wycofać w każdym momencie.</p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">6.8. Prawo do wniesienia skargi</h3>
                <p>
                  Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), 
                  jeśli uważasz, że przetwarzanie Twoich danych narusza RODO.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Bezpieczeństwo danych</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Szyfrowanie połączeń SSL/TLS</li>
                  <li>Szyfrowanie haseł (bcrypt)</li>
                  <li>Regularne kopie zapasowe</li>
                  <li>Kontrola dostępu do danych</li>
                  <li>Monitoring bezpieczeństwa</li>
                  <li>Regularne audyty bezpieczeństwa</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Pliki cookies</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Nasza platforma używa plików cookies w następujących celach:</p>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">8.1. Cookies niezbędne</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sesja użytkownika (logowanie)</li>
                  <li>Token uwierzytelniający</li>
                  <li>Preferencje językowe</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">8.2. Cookies analityczne (opcjonalne)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analiza ruchu na stronie</li>
                  <li>Statystyki korzystania z funkcji</li>
                  <li>Testy A/B</li>
                </ul>

                <p>
                  Możesz zarządzać cookies w ustawieniach swojej przeglądarki. Wyłączenie cookies niezbędnych 
                  może uniemożliwić korzystanie z niektórych funkcji platformy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Zmiany w polityce prywatności</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Możemy okresowo aktualizować niniejszą Politykę prywatności. O istotnych zmianach poinformujemy 
                  Cię poprzez e-mail lub powiadomienie w platformie z 14-dniowym wyprzedzeniem.
                </p>
                <p>
                  Data ostatniej aktualizacji jest zawsze widoczna na górze tego dokumentu.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Kontakt</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  W sprawach dotyczących ochrony danych osobowych, skontaktuj się z nami:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>E-mail: <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline">kontakt@ksiegai.pl</a></li>
                  <li>Administrator: Tovernet sp. z o.o., NIP: 7322228540</li>
                </ul>
                <p>
                  Odpowiemy na Twoje zapytanie w ciągu 30 dni.
                </p>
              </div>
            </section>

            <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Twoja prywatność jest dla nas ważna</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Dokładamy wszelkich starań, aby Twoje dane były bezpieczne i przetwarzane zgodnie z prawem. 
                Jeśli masz jakiekolwiek pytania lub wątpliwości, skontaktuj się z nami pod adresem 
                <a href="mailto:kontakt@ksiegai.pl" className="text-blue-600 hover:underline ml-1">kontakt@ksiegai.pl</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
