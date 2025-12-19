export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Regulamin świadczenia usług
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 1. Postanowienia ogólne</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Niniejszy Regulamin określa zasady korzystania z oprogramowania KsięgaI dostępnego pod adresem www.ksiegai.pl oraz app.ksiegai.pl (dalej: "Platforma").</li>
                <li>Usługodawcą jest Tovernet sp. z o.o., NIP: 7322228540, z siedzibą w Polsce (dalej: "Usługodawca").</li>
                <li>KsięgaI jest oprogramowaniem wspierającym księgowość. Usługodawca nie świadczy usług biura rachunkowego ani doradztwa podatkowego.</li>
                <li>Korzystanie z Platformy oznacza akceptację niniejszego Regulaminu.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 2. Definicje</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Użytkownik</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z Platformy.</li>
                <li><strong>Konto</strong> – indywidualne konto Użytkownika w Platformie, umożliwiające korzystanie z Usług.</li>
                <li><strong>Usługi</strong> – funkcjonalności Platformy dostępne dla Użytkowników, w tym fakturowanie, księgowość, integracja z KSeF, generowanie raportów.</li>
                <li><strong>Subskrypcja</strong> – odpłatny dostęp do Usług Premium na określony okres czasu.</li>
                <li><strong>Plan JDG</strong> – pakiet usług dla jednoosobowych działalności gospodarczych w cenie 19 zł/miesiąc.</li>
                <li><strong>Plan Spółka Standard</strong> – pakiet usług dla spółek z o.o. w cenie 89 zł/miesiąc lub 999 zł/rok.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 3. Rejestracja i Konto</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Korzystanie z pełnej funkcjonalności Platformy wymaga utworzenia Konta.</li>
                <li>Rejestracja jest bezpłatna i dobrowolna.</li>
                <li>Użytkownik może zarejestrować się poprzez:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Adres e-mail i hasło</li>
                    <li>Konto Google (OAuth)</li>
                    <li>Link logowania wysłany na e-mail (magic link)</li>
                  </ul>
                </li>
                <li>Użytkownik zobowiązuje się podać prawdziwe, aktualne i kompletne dane podczas rejestracji.</li>
                <li>Użytkownik jest odpowiedzialny za zachowanie poufności danych logowania do Konta.</li>
                <li>Użytkownik zobowiązuje się niezwłocznie poinformować Usługodawcę o każdym przypadku nieautoryzowanego użycia Konta.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 4. Zakres Usług</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Platforma umożliwia:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Wystawianie i zarządzanie fakturami</li>
                    <li>Automatyczne wysyłanie faktur do KSeF</li>
                    <li>Generowanie raportów JPK-V7M</li>
                    <li>Przygotowanie deklaracji podatkowych (PIT/CIT/VAT)</li>
                    <li>Ewidencję przychodów i rozchodów</li>
                    <li>Integrację z systemami bankowymi</li>
                    <li>Zarządzanie dokumentami i uchwałami (Plan Spółka)</li>
                    <li>Asystenta AI do rozpoznawania dokumentów</li>
                  </ul>
                </li>
                <li>Zakres dostępnych funkcji zależy od wybranego Planu.</li>
                <li>Usługodawca zastrzega sobie prawo do modyfikacji, zawieszenia lub zaprzestania świadczenia Usług z ważnych przyczyn technicznych lub prawnych.</li>
                <li>Platforma przygotowuje dane i dokumenty. Ostateczna odpowiedzialność za poprawność i terminowość rozliczeń podatkowych spoczywa na Użytkowniku.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 5. Płatności i Subskrypcja</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Płatności za Subskrypcję są przetwarzane przez Stripe, Inc.</li>
                <li>Dostępne Plany:
                  <ul className="list-disc pl-6 mt-2">
                    <li><strong>Plan JDG:</strong> 19 zł/miesiąc, rozliczany miesięcznie</li>
                    <li><strong>Plan Spółka Standard:</strong> 89 zł/miesiąc lub 999 zł/rok</li>
                    <li><strong>Plan Enterprise:</strong> wycena indywidualna</li>
                  </ul>
                </li>
                <li>Subskrypcja odnawia się automatycznie na koniec okresu rozliczeniowego, chyba że Użytkownik anuluje Subskrypcję przed końcem okresu.</li>
                <li>Użytkownik może anulować Subskrypcję w każdym momencie w ustawieniach Konta.</li>
                <li>Anulowanie Subskrypcji jest skuteczne z końcem bieżącego okresu rozliczeniowego.</li>
                <li>Ceny zawierają podatek VAT zgodnie z obowiązującymi przepisami.</li>
                <li>Usługodawca zastrzega sobie prawo do zmiany cen z 30-dniowym wyprzedzeniem. Zmiana cen nie dotyczy aktywnych Subskrypcji do końca bieżącego okresu rozliczeniowego.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 6. Okres próbny</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Nowi Użytkownicy Planu Spółka Standard otrzymują 7-dniowy bezpłatny okres próbny.</li>
                <li>Okres próbny nie wymaga podania danych karty kredytowej.</li>
                <li>Po zakończeniu okresu próbnego, Użytkownik może wykupić pełną Subskrypcję lub kontynuować korzystanie z darmowych funkcji.</li>
                <li>Każdy Użytkownik może skorzystać z okresu próbnego tylko raz.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 7. Polityka zwrotów</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Użytkownik ma prawo do odstąpienia od umowy w ciągu 14 dni od dnia zawarcia umowy bez podania przyczyny.</li>
                <li>Prawo do odstąpienia nie przysługuje, jeśli Użytkownik rozpoczął korzystanie z Usług Premium przed upływem 14 dni i wyraził na to zgodę.</li>
                <li>W przypadku odstąpienia od umowy, Usługodawca zwróci wszystkie otrzymane płatności w ciągu 14 dni.</li>
                <li>Zwrot płatności zostanie dokonany przy użyciu tego samego sposobu płatności, którego użył Użytkownik.</li>
                <li>Szczegółowe zasady zwrotów określa odrębna Polityka zwrotów.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 8. Ochrona danych osobowych</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Administratorem danych osobowych Użytkowników jest Tovernet sp. z o.o.</li>
                <li>Dane osobowe są przetwarzane zgodnie z RODO i polskim prawem o ochronie danych osobowych.</li>
                <li>Szczegółowe informacje o przetwarzaniu danych osobowych zawiera Polityka prywatności.</li>
                <li>Dane są przechowywane na serwerach Supabase (USA) z odpowiednimi zabezpieczeniami i klauzulami umownymi.</li>
                <li>Płatności są przetwarzane przez Stripe, Inc. zgodnie z ich polityką prywatności.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 9. Prawa i obowiązki Użytkownika</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Użytkownik zobowiązuje się:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Korzystać z Platformy zgodnie z prawem i niniejszym Regulaminem</li>
                    <li>Nie udostępniać dostępu do Konta osobom trzecim</li>
                    <li>Nie podejmować działań mogących zakłócić działanie Platformy</li>
                    <li>Nie kopiować, modyfikować ani dekompilować oprogramowania</li>
                    <li>Weryfikować poprawność danych wprowadzanych do systemu</li>
                  </ul>
                </li>
                <li>Użytkownik ma prawo do:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Dostępu do swoich danych</li>
                    <li>Eksportu danych w formacie CSV/PDF</li>
                    <li>Usunięcia Konta w każdym momencie</li>
                    <li>Wsparcia technicznego zgodnie z wybranym Planem</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 10. Odpowiedzialność</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Usługodawca nie ponosi odpowiedzialności za:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Błędy w danych wprowadzonych przez Użytkownika</li>
                    <li>Nieprawidłowe rozliczenia podatkowe wynikające z błędnych danych</li>
                    <li>Szkody wynikające z przerw w dostępie do Platformy z przyczyn niezależnych od Usługodawcy</li>
                    <li>Działania osób trzecich uzyskujących dostęp do Konta Użytkownika</li>
                  </ul>
                </li>
                <li>Usługodawca dołoży starań, aby Platforma była dostępna 99% czasu w skali miesiąca.</li>
                <li>Usługodawca zastrzega sobie prawo do przerw technicznych w celu konserwacji systemu.</li>
                <li>Odpowiedzialność Usługodawcy jest ograniczona do wysokości opłat uiszczonych przez Użytkownika w ostatnich 12 miesiącach.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 11. Własność intelektualna</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Wszelkie prawa do Platformy, w tym prawa autorskie, znaki towarowe i inne prawa własności intelektualnej, należą do Usługodawcy.</li>
                <li>Użytkownik otrzymuje niewyłączną, nieprzenoszalną licencję na korzystanie z Platformy zgodnie z niniejszym Regulaminem.</li>
                <li>Dane wprowadzone przez Użytkownika pozostają jego własnością.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 12. Rozwiązanie umowy</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Użytkownik może rozwiązać umowę w każdym czasie poprzez usunięcie Konta.</li>
                <li>Usługodawca może rozwiązać umowę ze skutkiem natychmiastowym w przypadku:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Rażącego naruszenia Regulaminu przez Użytkownika</li>
                    <li>Korzystania z Platformy w sposób niezgodny z prawem</li>
                    <li>Braku płatności za Subskrypcję przez okres dłuższy niż 30 dni</li>
                  </ul>
                </li>
                <li>Po rozwiązaniu umowy, Użytkownik traci dostęp do Konta i danych.</li>
                <li>Użytkownik może pobrać swoje dane przed usunięciem Konta.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 13. Zmiany Regulaminu</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Usługodawca zastrzega sobie prawo do zmiany Regulaminu.</li>
                <li>O zmianach Regulaminu Użytkownicy zostaną poinformowani z 14-dniowym wyprzedzeniem poprzez e-mail lub powiadomienie w Platformie.</li>
                <li>Kontynuowanie korzystania z Platformy po wejściu w życie zmian oznacza akceptację nowego Regulaminu.</li>
                <li>Użytkownik, który nie akceptuje zmian, ma prawo rozwiązać umowę.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">§ 14. Postanowienia końcowe</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>W sprawach nieuregulowanych niniejszym Regulaminem mają zastosowanie przepisy prawa polskiego.</li>
                <li>Spory wynikające z niniejszego Regulaminu będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy.</li>
                <li>Jeżeli którekolwiek z postanowień Regulaminu okaże się nieważne, pozostałe postanowienia pozostają w mocy.</li>
                <li>Kontakt z Usługodawcą: kontakt@ksiegai.pl</li>
              </ol>
            </section>

            <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ważne zastrzeżenie</h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>KsięgaI jest oprogramowaniem wspierającym księgowość.</strong> Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego. 
                Platforma przygotowuje dane i dokumenty, ale ostateczna odpowiedzialność za poprawność i terminowość rozliczeń podatkowych 
                spoczywa na Użytkowniku. W razie wątpliwości zalecamy konsultację z księgowym lub doradcą podatkowym.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
