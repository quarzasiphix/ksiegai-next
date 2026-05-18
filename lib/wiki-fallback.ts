export type FallbackWikiCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type FallbackWikiFaqItem = {
  question: string;
  answer: string;
};

export type FallbackWikiArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  purpose: string | null;
  body_markdown: string | null;
  checklist: string[];
  official_links: { href: string; label: string; external?: boolean }[];
  related_actions: { label: string; href: string }[];
  faq: FallbackWikiFaqItem[];
  article_type: string;
  sort_order: number;
  published_at: string | null;
  updated_at: string;
  category: FallbackWikiCategory;
};

export const fallbackWikiCategories: FallbackWikiCategory[] = [
  {
    id: 'fallback-ksef',
    slug: 'ksef',
    name: 'KSeF',
    description: 'Praktyczne instrukcje do pracy z KSeF i połączenia firmy z systemem.',
    sort_order: 10,
  },
  {
    id: 'fallback-tax-office',
    slug: 'urzad-skarbowy',
    name: 'Urząd Skarbowy',
    description: 'Dostęp do e-US, formalności podatkowe i przygotowanie działań w imieniu firmy.',
    sort_order: 20,
  },
  {
    id: 'fallback-compliance',
    slug: 'compliance',
    name: 'Compliance po rejestracji',
    description: 'CRBR, e-Doręczenia i inne obowiązki, które łatwo przeoczyć po uruchomieniu firmy.',
    sort_order: 30,
  },
  {
    id: 'fallback-start-firmy',
    slug: 'start-firmy',
    name: 'Start firmy',
    description: 'Pierwsze kroki po rejestracji JDG lub spółki — co zrobić zaraz po wpisie, jakich obowiązków nie przegapić.',
    sort_order: 5,
  },
  {
    id: 'fallback-ksiegowosc',
    slug: 'ksiegowosc',
    name: 'Księgowość',
    description: 'Jak działa pełna księgowość, plan kont i dlaczego faktura to nie to samo co rozliczenie.',
    sort_order: 40,
  },
  {
    id: 'fallback-faktury-platnosci',
    slug: 'faktury-platnosci',
    name: 'Faktury i płatności',
    description: 'Jak wystawiać faktury, przyjmować płatności online i połączyć przepływ pieniędzy z dokumentami.',
    sort_order: 50,
  },
];

export const fallbackWikiArticles: FallbackWikiArticle[] = [
  {
    id: 'fallback-ksef-token',
    slug: 'jak-zdobyc-token-ksef-i-podlaczyc-firme',
    title: 'Jak zdobyć token KSeF i podłączyć firmę do KsięgaI',
    excerpt: 'Najprostsza ścieżka: logujesz się do KSeF, tworzysz token, kopiujesz kod i wklejasz go do KsięgaI.',
    summary: 'Instrukcja krok po kroku, jak zdobyć token KSeF i wkleić go do KsięgaI.',
    purpose: 'Bez tokena firma nie połączy się z KSeF. To blokuje legalną wysyłkę e-faktur z aplikacji i pobieranie dokumentów z KSeF.',
    body_markdown: `## Jak wygląda najprostsza ścieżka

Nie szukaj przycisku typu "włącz KSeF" w aplikacji. Najpierw musisz zdobyć token w samym KSeF. Dopiero potem wracasz do KsięgaI i wklejasz kod w oknie połączenia.

## Krok po kroku

1. Zaloguj się do portalu KSeF jako osoba, która ma dostęp do firmy.
2. Otwórz sekcję tokenów.
3. Utwórz nowy token dla tej firmy.
4. Skopiuj pokazany kod tokena.
5. Wróć do KsięgaI i otwórz ekran połączenia KSeF.
6. Wklej kod tokena i zapisz połączenie.

## Co dalej w KsięgaI

- Po zapisaniu tokena firma może zostać zweryfikowana do pracy z KSeF.
- W aplikacji nie "włączasz" KSeF ręcznie osobnym przełącznikiem.
- Gdy token wygaśnie, trzeba wygenerować nowy i podmienić go w aplikacji.

## Czego nie robić

- Nie generuj tokena "na później" bez skopiowania kodu.
- Nie wklejaj kodu ze spacjami albo dodatkowymi znakami.
- Nie zakładaj, że samo posiadanie konta w KSeF oznacza połączenie firmy z aplikacją.`,
    checklist: [
      'Zaloguj się do portalu KSeF jako osoba uprawniona do tej firmy.',
      'Otwórz zakładkę z tokenami.',
      'Utwórz nowy token dla firmy.',
      'Skopiuj pokazany kod tokena.',
      'Wróć do KsięgaI i otwórz okno połączenia KSeF.',
      'Wklej kod tokena i zapisz połączenie.',
    ],
    official_links: [
      { label: 'KSeF - informacje ogólne', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Podręcznik rozpoczęcia korzystania z KSeF', href: 'https://ksef.podatki.gov.pl/media/sthoiadq/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-25032026.pdf', external: true },
    ],
    related_actions: [
      { label: 'Załóż konto w KsięgaI', href: '/rejestracja' },
      { label: 'Zobacz cennik', href: '/cennik' },
    ],
    faq: [
      {
        question: 'Skąd wziąć token KSeF?',
        answer: 'Token tworzysz w samym portalu KSeF po zalogowaniu się jako osoba, która ma dostęp do firmy.',
      },
      {
        question: 'Czy w KsięgaI trzeba osobno włączać KSeF?',
        answer: 'Nie. KSeF zaczyna działać po dodaniu poprawnego tokena i przejściu weryfikacji po stronie procesu firmowego.',
      },
      {
        question: 'Co zrobić, jeśli token przestał działać?',
        answer: 'Wygeneruj nowy token w KSeF i podmień go w aplikacji. Sam stary token zwykle nie da się "naprawić".',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-16T00:00:00.000Z',
    updated_at: '2026-05-16T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },
  {
    id: 'fallback-e-us-org',
    slug: 'konto-organizacji-e-urzad-skarbowy',
    title: 'Jak uzyskać konto organizacji w e-Urzędzie Skarbowym',
    excerpt: 'Dostęp do konta organizacji porządkuje działania podatkowe spółki i pomaga przygotować pracę z KSeF.',
    summary: 'Przewodnik po uzyskaniu dostępu do konta organizacji w e-US.',
    purpose: 'To praktyczny krok przed działaniem w imieniu spółki w sprawach podatkowych i przygotowaniem ścieżki do KSeF.',
    body_markdown: `## Po co konto organizacji

Prywatny dostęp do e-Urzędu Skarbowego nie oznacza jeszcze dostępu do konta spółki. Do działań podatkowych firmy potrzebujesz konta organizacji albo formalnie nadanego dostępu.

## Kiedy zrobić ten krok

Zrób to po uzyskaniu KRS i NIP, zanim zaczniesz formalności związane z KSeF, pełnomocnictwami i działaniem w imieniu firmy.

## Co przygotować

- NIP spółki
- numer KRS
- dane reprezentanta albo osoby, która ma dostać dostęp
- profil zaufany albo podpis kwalifikowany

## Praktyczna kolejność

1. Wejdź do e-Urzędu Skarbowego.
2. Znajdź ścieżkę do uzyskania dostępu do konta organizacji.
3. Ustal, kto ma być administratorem konta organizacji.
4. Złóż wniosek i poczekaj na aktywację.
5. Po aktywacji sprawdź, czy możesz działać z poziomu organizacji, a nie tylko konta prywatnego.`,
    checklist: [
      'Upewnij się, że firma ma już NIP i numer KRS.',
      'Ustal, kto ma być administratorem konta organizacji.',
      'Złóż wniosek o dostęp do konta organizacji w e-US.',
      'Po aktywacji sprawdź logowanie i dostęp z poziomu firmy.',
    ],
    official_links: [
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'Przeczytaj poradnik o tokenie KSeF', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
    ],
    faq: [
      {
        question: 'Czy prywatne konto w e-US wystarczy do obsługi spółki?',
        answer: 'Nie zawsze. Do działań w imieniu spółki potrzebujesz dostępu do konta organizacji albo właściwego umocowania.',
      },
      {
        question: 'Czy konto organizacji jest potrzebne przed KSeF?',
        answer: 'W praktyce bardzo pomaga, bo porządkuje działania podatkowe i dostęp do formalności wykonywanych w imieniu firmy.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-16T00:00:00.000Z',
    updated_at: '2026-05-16T00:00:00.000Z',
    category: fallbackWikiCategories[1],
  },
  {
    id: 'fallback-crbr',
    slug: 'crbr-spolka-zoo-co-zglosic',
    title: 'CRBR po rejestracji spółki z o.o. - co zgłosić i kiedy',
    excerpt: 'Po wpisie do KRS trzeba zgłosić beneficjentów rzeczywistych. To nie dzieje się samo od dodania wspólników w aplikacji.',
    summary: 'Checklist do CRBR po rejestracji spółki z o.o.',
    purpose: 'CRBR to jeden z podstawowych obowiązków compliance po rejestracji spółki i częsty punkt kontroli formalnej.',
    body_markdown: `## Co to jest CRBR

CRBR to rejestr beneficjentów rzeczywistych. Po wpisie do KRS spółka musi zgłosić wymagane dane elektronicznie.

## Co trzeba przygotować

- numer KRS
- dane beneficjentów rzeczywistych
- dane osób reprezentujących

## Co często idzie źle

- mylenie beneficjenta rzeczywistego z każdą osobą w zarządzie
- brak zachowania potwierdzenia zgłoszenia
- uznanie, że skoro dane wspólników są w systemie, to temat jest zamknięty

## Co warto zrobić po zgłoszeniu

Zachowaj potwierdzenie zgłoszenia w dokumentach firmy i uporządkuj w jednym miejscu dane wspólników oraz zarządu, żeby łatwo wrócić do nich przy kolejnych obowiązkach.`,
    checklist: [
      'Zbierz dane beneficjentów rzeczywistych i osób reprezentujących.',
      'Wejdź do rejestru CRBR i złóż zgłoszenie elektronicznie.',
      'Zachowaj potwierdzenie zgłoszenia w dokumentach firmy.',
    ],
    official_links: [
      { label: 'CRBR na podatki.gov.pl', href: 'https://www.podatki.gov.pl/crbr/', external: true },
    ],
    related_actions: [
      { label: 'Zobacz poradnik o e-Doręczeniach', href: '/poradnik/e-doreczenia-dla-firmy' },
    ],
    faq: [
      {
        question: 'Czy dodanie wspólników w aplikacji załatwia CRBR?',
        answer: 'Nie. Aplikacja pomaga uporządkować dane, ale samo zgłoszenie do CRBR trzeba złożyć poza systemem.',
      },
      {
        question: 'Kiedy zrobić CRBR?',
        answer: 'Bezpośrednio po wpisie do KRS, w ustawowym terminie właściwym dla zgłoszenia beneficjentów rzeczywistych.',
      },
    ],
    article_type: 'checklist',
    sort_order: 10,
    published_at: '2026-05-16T00:00:00.000Z',
    updated_at: '2026-05-16T00:00:00.000Z',
    category: fallbackWikiCategories[2],
  },
  {
    id: 'fallback-e-doreczenia',
    slug: 'e-doreczenia-dla-firmy',
    title: 'e-Doręczenia dla firmy - kiedy założyć i jak nie zgubić obowiązku',
    excerpt: 'To oficjalny kanał korespondencji z urzędami. Sama skrzynka nie wystarczy, jeśli nikt jej realnie nie pilnuje.',
    summary: 'Praktyczna instrukcja do uruchomienia i obsługi e-Doręczeń dla przedsiębiorcy.',
    purpose: 'To oficjalny kanał korespondencji z urzędami, który warto uruchomić i od razu przypisać komuś do pilnowania.',
    body_markdown: `## Dlaczego e-Doręczenia warto zrobić od razu

Po rejestracji firmy łatwo skupić się na KRS, NIP i banku. Problem w tym, że oficjalna korespondencja też potrzebuje uporządkowanego kanału.

## Największy błąd

Założyć skrzynkę i nie ustalić, kto ją sprawdza.

## Minimum organizacyjne

1. Sprawdź, czy adres nie został już założony.
2. Jeżeli nie, przejdź przez wniosek i aktywuj skrzynkę.
3. Ustal konkretną osobę odpowiedzialną za odbiór korespondencji.
4. Ustal prostą procedurę: kto sprawdza, kto eskaluje, gdzie zapisujecie ważne pisma.`,
    checklist: [
      'Sprawdź, czy adres do e-Doręczeń nie został już utworzony.',
      'Jeżeli nie, przejdź wniosek i aktywuj skrzynkę.',
      'Ustal osobę odpowiedzialną za odbiór korespondencji.',
      'Spisz prostą procedurę obsługi ważnych pism urzędowych.',
    ],
    official_links: [
      { label: 'e-Doręczenia dla przedsiębiorcy', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
    ],
    related_actions: [
      { label: 'Przejdź do poradnika CRBR', href: '/poradnik/crbr-spolka-zoo-co-zglosic' },
    ],
    faq: [
      {
        question: 'Czy samo założenie skrzynki zamyka temat?',
        answer: 'Nie. Skrzynka musi być aktywna, a w firmie trzeba ustalić, kto realnie monitoruje korespondencję.',
      },
      {
        question: 'Kiedy uruchomić e-Doręczenia?',
        answer: 'Najlepiej zaraz po rejestracji firmy, zanim pojawią się pierwsze ważne pisma urzędowe.',
      },
    ],
    article_type: 'checklist',
    sort_order: 20,
    published_at: '2026-05-16T00:00:00.000Z',
    updated_at: '2026-05-16T00:00:00.000Z',
    category: fallbackWikiCategories[2],
  },

  // ─── KSeF: dostęp dla biura rachunkowego ────────────────────────────────────
  {
    id: 'fallback-ksef-dostep-ksiegowej',
    slug: 'jak-nadac-dostep-ksef-dla-ksiegowej',
    title: 'Jak nadać biuru rachunkowemu dostęp do KSeF',
    excerpt: 'Biuro rachunkowe może dostać dostęp do Twojego KSeF przez swój NIP — bez udostępniania tokena ani loginu.',
    summary: 'Instrukcja nadania dostępu do KSeF dla biura rachunkowego lub księgowej przez mechanizm NIP — inny niż token używany przez aplikacje.',
    purpose: 'Dwa najczęstsze pytania po połączeniu z KSeF to: jak dać dostęp biuru rachunkowemu i dlaczego to jest inaczej niż token. Ten poradnik wyjaśnia różnicę i prowadzi przez kroki.',
    body_markdown: `## Dwa sposoby dostępu do KSeF

W KSeF istnieją dwa osobne mechanizmy dostępu:

- **Token** — dla systemów i aplikacji (np. KsięgaI), które działają automatycznie w tle. Token jest ciągiem znaków, który wklejasz do aplikacji.
- **Dostęp przez NIP podmiotu** — dla biura rachunkowego lub osoby fizycznej, która będzie obsługiwać KSeF w Twoim imieniu. Wpisujesz NIP biura i przypisujesz mu uprawnienia.

To dwa niezależne mechanizmy. Dodanie tokena do KsięgaI nie daje biuru dostępu — i odwrotnie.

## Kiedy używać dostępu przez NIP

Wybierz ten sposób, jeśli chcesz, żeby Twoje biuro rachunkowe:
- mogło wystawiać faktury w Twoim imieniu z poziomu własnego systemu
- pobierało i przeglądało Twoje dokumenty w KSeF przez swoje narzędzia
- miało wgląd do Twojego rejestru faktur bez logowania na Twoje konto

Nie musisz im podawać hasła ani tokena — biuro loguje się do KSeF swoim kontem i widzi Twoje dokumenty, bo masz do tego uprawnienia przypisane przez NIP.

## Krok po kroku — nadanie dostępu

1. Zaloguj się do portalu KSeF jako osoba z uprawnieniami do zarządzania dostępem firmy (zwykle właściciel lub prezes z KRS).
2. Otwórz sekcję zarządzania dostępami lub pełnomocnictwami.
3. Wybierz opcję nadania dostępu dla podmiotu zewnętrznego.
4. Wpisz **NIP biura rachunkowego** — upewnij się, że to NIP firmy biura, nie osoby fizycznej pracownika.
5. Wybierz zakres uprawnień: odczyt, wystawianie faktur lub pełny dostęp — zakres ustal wcześniej z biurem.
6. Potwierdź i zapisz.

Biuro loguje się do własnego KSeF, wybiera listę podmiotów i widzi Twoją firmę na tej liście.

## Jak to wygląda od strony biura rachunkowego

Po dodaniu NIP biuro zobaczy Twoją firmę na liście firm, do których ma dostęp. Nie musi znać Twojego hasła do KSeF. Zakres tego, co biuro może robić, zależy od uprawnień, które nadałeś.

## Co działa przez token (a co przez NIP)

| Mechanizm | Dla kogo | Do czego |
|-----------|----------|----------|
| Token KSeF | Aplikacje (np. KsięgaI) | Automatyczna synchronizacja, wysyłka faktur z systemu |
| Dostęp przez NIP | Biuro rachunkowe, księgowa | Obsługa KSeF przez własne narzędzia biura |

Warto skonfigurować oba: token dla automatycznej pracy w KsięgaI, NIP biura dla pracy biura w jego własnych systemach.

## Na co zwrócić uwagę

- Sprawdź dokładnie NIP biura przed zapisaniem — pomyłka o jedną cyfrę oznacza dostęp dla innego podmiotu.
- Zakres uprawnień (odczyt / wystawianie / pełny) ustal z biurem zanim wypełnisz formularz.
- Dostęp możesz cofnąć w każdej chwili z ustawień KSeF.
- Zmiana biura rachunkowego = pamiętaj o cofnięciu dostępu staremu biuru.

Warto potwierdzić z księgową lub biurem, jakiego zakresu uprawnień realnie potrzebują.`,
    checklist: [
      'Ustal z biurem rachunkowym, jaki zakres uprawnień jest potrzebny (odczyt / wystawianie / pełny).',
      'Poproś biuro o podanie ich NIP firmy (nie NIP osoby fizycznej).',
      'Zaloguj się do portalu KSeF jako osoba z uprawnieniami zarządzania.',
      'Otwórz sekcję zarządzania dostępami.',
      'Wpisz NIP biura i wybierz zakres uprawnień.',
      'Potwierdź z biurem, że widzi Twoją firmę na liście podmiotów.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Podręcznik KSeF — zarządzanie dostępem', href: 'https://ksef.podatki.gov.pl/media/sthoiadq/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-25032026.pdf', external: true },
    ],
    related_actions: [
      { label: 'Jak zdobyć token KSeF (dla aplikacji)', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'KSeF dla JDG — jak zacząć', href: '/poradnik/ksef-dla-jdg-jak-zaczac' },
      { label: 'KSeF dla spółki z o.o.', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'Czy muszę podać biuru rachunkowemu mój token KSeF?',
        answer: 'Nie. Token służy aplikacjom jak KsięgaI. Biuro dostaje dostęp przez inny mechanizm — wpisujesz NIP biura w ustawieniach KSeF i nadajesz uprawnienia.',
      },
      {
        question: 'Czy biuro rachunkowe musi mieć konto w KSeF?',
        answer: 'Tak, biuro musi mieć własne konto w KSeF. Dopiero wtedy, po nadaniu dostępu przez NIP, zobaczy Twoją firmę na liście podmiotów.',
      },
      {
        question: 'Co się stanie po zmianie biura rachunkowego?',
        answer: 'Cofnij dostęp staremu biuru z ustawień KSeF i dodaj NIP nowego biura. Sama zmiana biura nie odwoła dostępu automatycznie.',
      },
      {
        question: 'Czy dostęp przez NIP i token KSeF można mieć jednocześnie?',
        answer: 'Tak, to niezależne mechanizmy. Token używa aplikacja (KsięgaI), a dostęp przez NIP biuro w swoich narzędziach.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  // ─── KSeF dla JDG ────────────────────────────────────────────────────────────
  {
    id: 'fallback-ksef-jdg',
    slug: 'ksef-dla-jdg-jak-zaczac',
    title: 'KSeF dla JDG — jak zacząć i co przygotować',
    excerpt: 'Jako właściciel JDG możesz połączyć się z KSeF samodzielnie przez profil zaufany. Nie potrzebujesz kwalifikowanego podpisu.',
    summary: 'Przewodnik po KSeF dla jednoosobowej działalności gospodarczej — co przygotować, jak uzyskać token i jak połączyć firmę z KsięgaI.',
    purpose: 'JDG-owcy często nie wiedzą, od czego zacząć z KSeF. Ten poradnik prowadzi przez konkretne kroki bez zbędnego żargonu.',
    body_markdown: `## Co KSeF zmienia dla JDG

KSeF (Krajowy System e-Faktur) to platforma Ministerstwa Finansów, przez którą mają przepływać faktury w Polsce. Jako JDG-owiec będziesz wysyłać faktury przez system i tam je archiwizować.

W praktyce: zamiast wysyłać PDF mailem albo drukiem, faktura trafia do KSeF i klient ją pobiera. Twoja aplikacja (np. KsięgaI) robi to automatycznie po połączeniu z KSeF.

## Co musisz mieć zanim zaczniesz

- **NIP firmy** — potrzebny do identyfikacji w KSeF
- **Profil zaufany lub e-dowód** — do zalogowania się do portalu KSeF; kwalifikowany podpis elektroniczny nie jest wymagany do samego logowania
- **Konto w aplikacji KsięgaI** — jeżeli chcesz, żeby wysyłka działała automatycznie

## Jak działa połączenie z KSeF przez KsięgaI

KsięgaI łączy się z KSeF przez token. Token to ciąg znaków, który generujesz w portalu KSeF i wklejasz do ustawień aplikacji. Po połączeniu:
- wystawione faktury trafiają do KSeF automatycznie
- faktury kosztowe od kontrahentów, którzy korzystają z KSeF, możesz pobierać do rejestru
- aplikacja pilnuje statusu i numeru KSeF przypisanego do każdej faktury

## Krok po kroku — pierwsze połączenie

1. Wejdź na portal KSeF i zaloguj się profilem zaufanym lub e-dowodem.
2. Sprawdź, że widzisz swoją firmę po zalogowaniu (identyfikacja po NIP).
3. Otwórz sekcję tokenów i utwórz nowy token dla firmy.
4. Skopiuj kod tokena — widzisz go tylko raz.
5. Wróć do KsięgaI, otwórz ustawienia firmy i sekcję połączenia KSeF.
6. Wklej token i zapisz.
7. Sprawdź status połączenia — aplikacja powinna potwierdzić weryfikację.

## Co oznacza "KSeF-ready" w KsięgaI

Jeśli nie chcesz od razu wysyłać faktur do KSeF, możesz pracować w trybie "KSeF-ready": faktury są tworzone w prawidłowym formacie FA(2) i gotowe do wysyłki, ale nie są jeszcze przesyłane. Połączysz się z KSeF wtedy, kiedy będziesz gotowy lub kiedy stanie się obowiązkowe.

## Jak dawać dostęp księgowej

Jeżeli masz biuro rachunkowe lub księgową — oni potrzebują dostępu przez NIP swojej firmy, nie przez Twój token. To osobny mechanizm opisany w poradniku o dostępie dla biura.

## Na co uważać

- Token kopiuj od razu — nie możesz wrócić do portalu i zobaczyć go ponownie po opuszczeniu strony.
- Gdy token wygaśnie, musisz wygenerować nowy i podmienić go w aplikacji.
- Środowisko testowe KSeF istnieje osobno — nie używaj tokenów testowych w produkcji.`,
    checklist: [
      'Sprawdź, że masz NIP firmy i profil zaufany.',
      'Zaloguj się do portalu KSeF profilem zaufanym lub e-dowodem.',
      'Sprawdź, że widzisz swoją firmę (identyfikacja po NIP).',
      'Otwórz sekcję tokenów i utwórz nowy token.',
      'Skopiuj kod tokena od razu — widoczny tylko raz.',
      'Wklej token do ustawień KseF w KsięgaI.',
      'Sprawdź status połączenia w aplikacji.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Podręcznik KSeF — rozpoczęcie korzystania', href: 'https://ksef.podatki.gov.pl/media/sthoiadq/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-25032026.pdf', external: true },
    ],
    related_actions: [
      { label: 'Jak zdobyć token KSeF — instrukcja', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'Jak nadać biuru dostęp do KSeF', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'Faktury w KsięgaI', href: '/faktury' },
    ],
    faq: [
      {
        question: 'Czy JDG musi mieć kwalifikowany podpis, żeby używać KSeF?',
        answer: 'Nie. Do zalogowania się do portalu KSeF wystarczy profil zaufany lub e-dowód. Kwalifikowany podpis nie jest wymagany do samego połączenia.',
      },
      {
        question: 'Co to jest tryb KSeF-ready?',
        answer: 'Faktury są tworzone w prawidłowym formacie FA(2), ale nie są jeszcze wysyłane do KSeF. Połączysz się, kiedy będziesz gotowy lub kiedy stanie się obowiązkowe.',
      },
      {
        question: 'Skąd biorę NIP do zalogowania do KSeF?',
        answer: 'Logujesz się jako osoba fizyczna (właściciel), ale system identyfikuje Twoją firmę po NIP. Podajesz NIP firmy, nie swój PESEL.',
      },
      {
        question: 'Czy mogę mieć jeden token dla KsięgaI i jednocześnie dać dostęp biuru?',
        answer: 'Tak. Token dla KsięgaI i dostęp dla biura rachunkowego (przez NIP biura) to niezależne mechanizmy — oba mogą działać jednocześnie.',
      },
    ],
    article_type: 'guide',
    sort_order: 30,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  // ─── KSeF dla spółki z o.o. ─────────────────────────────────────────────────
  {
    id: 'fallback-ksef-spolka',
    slug: 'ksef-spolka-z-oo-kto-moze-nadac-dostep',
    title: 'KSeF dla spółki z o.o. — kto może nadać dostęp i jak to zrobić',
    excerpt: 'W spółce z o.o. dostęp do KSeF nadaje osoba wpisana w KRS jako uprawniona do reprezentacji — zwykle prezes lub członek zarządu.',
    summary: 'Przewodnik po KSeF dla spółki z o.o.: kto może nadać dostęp, jak wygląda ścieżka dla zarządu i jak oddelegować obsługę KSeF do biura rachunkowego.',
    purpose: 'Spółki z o.o. mają inny punkt startowy niż JDG — uprawnienia w KSeF są powiązane z KRS. Ten poradnik wyjaśnia, kto zaczyna i jak przekazać dostęp dalej.',
    body_markdown: `## Kto w spółce może zalogować się do KSeF jako pierwszy

W spółce z o.o. pierwszy dostęp do KSeF uzyskuje osoba, która jest wpisana w KRS jako uprawniona do reprezentacji firmy — zwykle prezes zarządu lub osoba jednoosobowo uprawniona do podpisywania.

Loguje się ona do portalu KSeF swoim kontem (profil zaufany lub e-dowód), ale działa już w imieniu spółki. System identyfikuje spółkę po NIP.

To ważne: pracownik, który nie jest w KRS, nie może sam "wejść" do KSeF spółki bez wcześniejszego nadania mu dostępu przez osobę uprawnioną.

## Jak nadać dostęp innym osobom w firmie

Po pierwszym zalogowaniu osoba z KRS może nadać dostęp:
- innym osobom fizycznym w firmie (np. pracownikowi działu finansowego) — przez PESEL lub NIP osoby
- biuru rachunkowemu — przez NIP firmy biura

Każdy typ dostępu ma osobny mechanizm w ustawieniach KSeF.

## Krok po kroku — pierwsze połączenie spółki z KSeF

1. Prezes (lub osoba z KRS) loguje się do portalu KSeF profilem zaufanym lub e-dowodem.
2. System rozpoznaje powiązanie z NIP spółki przez dane w KRS.
3. Prezes otwiera sekcję tokenów i tworzy token dla spółki (do użycia w aplikacjach jak KsięgaI).
4. Prezes może nadać dostęp biuru rachunkowemu przez NIP biura.
5. Token trafia do KsięgaI — wklejasz go w ustawieniach firmy w aplikacji.

## Co się dzieje, gdy zarząd się zmieni

Zmiany w KRS wpływają na uprawnienia w KSeF. Jeżeli prezes odchodzi:
- nowa osoba z KRS musi zalogować się i potwierdzić dostęp
- stare tokeny mogą wymagać odnowienia
- warto cofnąć dostępy osób, które odchodzą

Jest to ważny punkt w procesie zmiany zarządu — warto potwierdzić z biurem rachunkowym lub prawnikiem, co i kiedy trzeba zaktualizować w KSeF.

## Jak oddelegować obsługę KSeF do biura rachunkowego

Biuro dostaje dostęp przez swój NIP — nie potrzebuje Twojego tokena ani hasła. Po nadaniu dostępu biuro loguje się do własnego KSeF i widzi Twoją spółkę na liście podmiotów.

Zakres tego co biuro może robić (odczyt, wystawianie faktur, pełny dostęp) ustalasz w momencie nadawania uprawnień.

## Różnica między tokenem a dostępem przez NIP

| Cel | Mechanizm |
|-----|-----------|
| Połączenie z KsięgaI (automatyczna wysyłka i synchronizacja) | Token KSeF |
| Dostęp biura rachunkowego do obsługi KSeF | NIP firmy biura |
| Dostęp pracownika do portalu KSeF | PESEL lub NIP pracownika |

Warto mieć skonfigurowane wszystkie trzy, zależnie od struktury obsługi.

## Na co uważać w spółce

- W spółce wieloosobowej (kilku prezesów, prokura łączna) sprawdź, kto konkretnie może w KRS działać jednoosobowo — to ma znaczenie przy logowaniu do KSeF.
- Zmiana zarządu to dobry moment na przegląd wszystkich nadanych dostępów w KSeF.
- Warto zachować dokumentację kto, kiedy i komu nadał dostęp — szczególnie przy audycie.`,
    checklist: [
      'Ustal, kto w spółce jest wpisany w KRS jako osoba uprawniona do reprezentacji.',
      'Osoba z KRS loguje się do portalu KSeF profilem zaufanym lub e-dowodem.',
      'Sprawdź, że system rozpoznaje spółkę po NIP.',
      'Wygeneruj token dla aplikacji (np. KsięgaI) i skopiuj go natychmiast.',
      'Nadaj dostęp biuru rachunkowemu przez NIP firmy biura.',
      'Wklej token do ustawień KSeF w KsięgaI i sprawdź status połączenia.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Podręcznik KSeF — zarządzanie dostępem', href: 'https://ksef.podatki.gov.pl/media/sthoiadq/podrecznik-ksef-20-cz-i-rozpoczecie-korzystania-z-ksef-25032026.pdf', external: true },
    ],
    related_actions: [
      { label: 'Jak nadać biuru dostęp przez NIP', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'Jak zdobyć token KSeF', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'Pierwsza spółka z o.o. — obowiązki po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy pracownik firmy może od razu wejść do KSeF spółki?',
        answer: 'Nie. Najpierw osoba z KRS musi zalogować się do KSeF i nadać dostęp pracownikowi przez jego PESEL lub NIP. Bez tego pracownik nie ma dostępu do konta spółki.',
      },
      {
        question: 'Co jeśli w spółce jest dwóch prezesów z reprezentacją łączną?',
        answer: 'W praktyce do zalogowania się do KSeF wystarczy jeden reprezentant z KRS. Sprawdź jednak zasady reprezentacji spółki — przy wątpliwościach warto potwierdzić z prawnikiem.',
      },
      {
        question: 'Co się dzieje z dostępami w KSeF gdy zmienia się zarząd?',
        answer: 'KSeF powiązuje dostępy z KRS, ale zmiany nie są automatyczne. Nowy prezes powinien zalogować się i przejrzeć istniejące dostępy — stary zarząd może wciąż mieć aktywne uprawnienia.',
      },
    ],
    article_type: 'guide',
    sort_order: 40,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  // ─── Start firmy: spółka z o.o. ─────────────────────────────────────────────
  {
    id: 'fallback-start-spolka-obowiazki',
    slug: 'pierwsze-obowiazki-po-zalozeniu-spolki-zoo',
    title: 'Pierwsze obowiązki po założeniu spółki z o.o. — czego nie przegapić',
    excerpt: 'Po wpisie do KRS zegar zaczyna tykać. CRBR, e-Doręczenia, konto bankowe i decyzja o VAT — to rzeczy, które trzeba zrobić zanim zaczniesz normalne operacje.',
    summary: 'Lista obowiązków formalnych po rejestracji spółki z o.o. — w kolejności priorytetów, z terminami i praktycznymi wskazówkami.',
    purpose: 'Założenie spółki to dopiero połowa roboty. Po wpisie do KRS pojawia się lista obowiązków z terminami, o których nikt oficjalnie nie powiadamia.',
    body_markdown: `## Najpierw: co jest pilne i ma termin

Po wpisie do KRS masz terminy, których nie możesz pominąć. Najważniejszy:

**CRBR — zgłoszenie beneficjentów rzeczywistych** musi być złożone w ustawowym terminie po wpisie do KRS. To rejestr, w którym podajesz kto faktycznie stoi za spółką (udziałowcy z ponad 25% lub osoby sprawujące kontrolę). Zgłaszasz elektronicznie przez podatki.gov.pl. Kara za brak zgłoszenia może być wysoka — zrób to jako pierwszą rzecz.

## Pierwsze 72 godziny

- **CRBR** — zgłoś beneficjentów rzeczywistych.
- **Konto bankowe firmowe** — spółka z o.o. musi mieć własny rachunek. Potrzebujesz go do wpłaty kapitału zakładowego i do wszelkich operacji. Wiele banków wymaga wizyty lub procesu online z dokumentami KRS.

## Pierwszy tydzień

- **e-Doręczenia** — oficjalny kanał korespondencji z urzędami. Spółki mają obowiązek posiadania adresu do e-Doręczeń. Aktywuj skrzynkę i ustal kto ją monitoruje.
- **e-Urząd Skarbowy — konto organizacji** — dostęp do konta firmowego w e-US porządkuje działania podatkowe i ułatwia późniejsze formalności z KSeF.

## Decyzja o VAT

Czy spółka chce być vatowcem od razu? Jeżeli tak — złóż rejestrację VAT (formularz VAT-R). Niektóre działalności mają obowiązek rejestracji VAT niezależnie od woli właściciela.

Jeżeli nie jesteś pewien, kiedy i czy zarejestrować VAT — warto potwierdzić z księgową lub biurem rachunkowym. Zakres obowiązku zależy od rodzaju działalności i przewidywanych obrotów.

## Decyzja o ZUS

Wspólnicy spółki z o.o. i status ZUS to złożony temat. W skrócie:
- jednoosobowy wspólnik spółki z o.o. ma obowiązek ZUS
- spółka z dwoma lub więcej wspólnikami — zwykle inaczej, ale zakres zależy od sytuacji

Warto potwierdzić z biurem rachunkowym lub doradcą podatkowym zanim zaczniesz operacje.

## Przygotowanie do KSeF

KSeF staje się obowiązkowy — nie musisz od razu łączyć spółki z systemem, ale warto:
- ustalić kto w spółce będzie zarządzał dostępem do KSeF (osoba z KRS)
- zapytać biuro rachunkowe, czy ma własny system obsługi KSeF
- wybrać aplikację fakturową (np. KsięgaI), która jest KSeF-ready

## Organizacja dokumentów od pierwszego dnia

Spółka z o.o. prowadzi pełną księgowość. Każda faktura, umowa i wyciąg bankowy musi trafić do biura rachunkowego lub systemu. Zacznij porządkować dokumenty od razu — nawet jeśli pierwsza faktura pojawi się za miesiąc.

Warto ustalić z biurem rachunkowym jaki jest preferowany sposób przekazywania dokumentów i w jakiej formie.`,
    checklist: [
      'Zgłoś beneficjentów rzeczywistych do CRBR — priorytet i termin ustawowy.',
      'Otwórz firmowe konto bankowe i wpłać kapitał zakładowy jeśli jeszcze nie zrobiono.',
      'Aktywuj adres do e-Doręczeń i ustal kto będzie monitorować skrzynkę.',
      'Utwórz konto organizacji w e-Urzędzie Skarbowym.',
      'Zdecyduj o rejestracji VAT i złóż formularz VAT-R jeśli potrzebne.',
      'Ustal z biurem rachunkowym status ZUS wspólników.',
      'Ustal kto w spółce zarządza dostępem do KSeF.',
      'Ustal z biurem rachunkowym sposób przekazywania dokumentów.',
    ],
    official_links: [
      { label: 'CRBR — rejestracja', href: 'https://www.podatki.gov.pl/crbr/', external: true },
      { label: 'e-Doręczenia dla przedsiębiorcy', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'Poradnik CRBR — co zgłosić', href: '/poradnik/crbr-spolka-zoo-co-zglosic' },
      { label: 'e-Doręczenia dla firmy', href: '/poradnik/e-doreczenia-dla-firmy' },
      { label: 'KSeF dla spółki z o.o.', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'Ile czasu mam na zgłoszenie do CRBR po rejestracji spółki?',
        answer: 'Termin jest ustawowy i liczy się od dnia wpisu do KRS. Nie zwlekaj — zrób to w pierwszych dniach po rejestracji.',
      },
      {
        question: 'Czy spółka z o.o. musi być vatowcem od razu?',
        answer: 'Nie zawsze. Obowiązek VAT zależy od rodzaju działalności i obrotów. Warto potwierdzić z księgową zanim zaczniesz wystawiać faktury.',
      },
      {
        question: 'Czy jednoosobowy wspólnik spółki z o.o. płaci ZUS?',
        answer: 'W Polsce jednoosobowy wspólnik spółki z o.o. co do zasady podlega ZUS. Zakres i kwoty zależą od sytuacji — warto potwierdzić z doradcą.',
      },
      {
        question: 'Od kiedy spółka z o.o. musi mieć e-Doręczenia?',
        answer: 'Spółki wpisane do KRS mają obowiązek posiadania adresu do e-Doręczeń. Aktywuj skrzynkę jak najwcześniej po rejestracji.',
      },
    ],
    article_type: 'checklist',
    sort_order: 10,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[3],
  },

  // ─── Księgowość: pełna księgowość w spółce ──────────────────────────────────
  {
    id: 'fallback-pelna-ksiegowosc',
    slug: 'pelna-ksiegowosc-spolka-zoo-o-co-chodzi',
    title: 'Pełna księgowość — o co chodzi w spółce z o.o.',
    excerpt: 'Spółka z o.o. nie może prowadzić uproszczonej ewidencji. Pełna księgowość to więcej niż lista faktur — to zapis każdej operacji według planu kont.',
    summary: 'Proste wyjaśnienie pełnej księgowości dla właścicieli spółki z o.o.: czym różni się od listy faktur, dlaczego każda operacja musi być zapisana i co musisz przygotowywać dla księgowej.',
    purpose: 'Właściciele spółek często myślą, że "mają faktury" = "mają księgowość". To dwa różne pojęcia. Ten poradnik wyjaśnia różnicę i pokazuje, co naprawdę musisz dostarczać biuru rachunkowemu.',
    body_markdown: `## Lista faktur to nie jest księgowość

Wystawiłeś 30 faktur w miesiącu? Zapisałeś je w Excelu? Masz je w aplikacji? To jeszcze nie jest pełna księgowość.

Pełna księgowość to ustrukturyzowany zapis wszystkich operacji finansowych firmy według określonych zasad. Każda faktura, każda płatność, każda umowa, każda pensja — wszystko musi trafić do odpowiedniej pozycji w **planie kont** (czyli strukturze kont, na których „siedzą" pieniądze i zobowiązania firmy).

Spółka z o.o. ma obowiązek prowadzenia pełnej księgowości. Nie ma możliwości wyboru uproszczonej ewidencji przychodów jak w JDG.

## Czym różni się faktura od wpisu w księdze

Gdy wystawiasz fakturę:
- powstaje należność (ktoś jest Ci winien pieniądze)
- ale pieniędzy jeszcze nie masz

Gdy klient płaci:
- pieniądze trafiają na konto
- należność maleje

Gdy księgowa rejestruje tę operację:
- obie strony transakcji są zapisane na właściwych kontach
- dokument trafia do pliku JPK i rejestru VAT

Wszystkie trzy zdarzenia muszą być ze sobą powiązane i "zbilansowane". Brak wpisu po jednej stronie = błąd w księgach.

## Dlaczego bank, faktury i umowy muszą się zgadzać

Urząd Skarbowy i audytorzy nie weryfikują "ile masz faktur". Sprawdzają, czy Twoje:
- faktury sprzedaży
- faktury kosztowe
- wyciągi bankowe
- lista pracowników (i wypłaty)
- umowy (najem, zlecenia, pożyczki)

...tworzą spójny obraz. Każda rozbieżność wymaga wyjaśnienia.

## Co musisz dostarczać biuru rachunkowemu co miesiąc

Zwykle:
- wszystkie faktury sprzedaży (z aplikacji fakturowej lub ręcznie)
- wszystkie faktury kosztowe (od dostawców, rachunki, paragony z NIP)
- wyciągi bankowe za cały miesiąc
- umowy zawarte w danym miesiącu (najem, zlecenia, itd.)
- lista wypłat (jeśli są pracownicy lub zleceniobiorcy)
- wszelkie inne dokumenty dotyczące operacji finansowych

Dostarczaj dokumenty w terminie i w formie uzgodnionej z biurem — biuro ustali termin zamknięcia każdego miesiąca.

## Co KsięgaI robi w tym procesie

KsięgaI porządkuje część tej pracy po stronie firmy:
- faktury sprzedaży są już w systemie, biuro je widzi lub pobiera
- dokumenty kosztowe trafiają do rejestru z OCR i kategoryzacją
- płatności bankowe są dopasowywane do faktur automatycznie
- jest pełny ślad audytowy — kto dodał dokument, kto zatwierdził, kiedy

To nie zastępuje pracy biura rachunkowego, ale eliminuje bałagan w dokumentach zanim trafią do księgowej.

## Kiedy pełna księgowość sprawia problemy

Najczęstszy problem to brakujące dokumenty. Jeżeli zapłaciłeś gotówką za coś firmowego i nie masz paragonu lub faktury z NIP — tego kosztu nie ma w oczach fiskusa. Warto wyrabiać nawyk zbierania dokumentów dla każdej transakcji firmowej.

Drugi problem to opóźnienia. Im dłużej czekasz z dostarczeniem dokumentów biuru, tym trudniej cokolwiek korygować po czasie.`,
    checklist: [
      'Ustal z biurem rachunkowym termin i formę przekazywania dokumentów co miesiąc.',
      'Zbieraj wszystkie faktury kosztowe na bieżąco (nie na koniec miesiąca).',
      'Pilnuj, żeby wyciągi bankowe były kompletne (pełny miesiąc, nie fragmenty).',
      'Informuj biuro o każdej umowie najmu, zleceniu lub pożyczce.',
      'Zorganizuj kanał przekazywania dokumentów — aplikacja, e-mail lub inny ustalony sposób.',
    ],
    official_links: [
      { label: 'Ustawa o rachunkowości', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19940760694', external: true },
    ],
    related_actions: [
      { label: 'Plan kont — co to jest', href: '/poradnik/plan-kont-co-to-jest' },
      { label: 'Faktura, płatność i księgowanie — różnica', href: '/poradnik/faktura-platnosc-ksiegowanie-roznica' },
      { label: 'Obieg dokumentów w spółce z o.o.', href: '/spolka-z-oo' },
    ],
    faq: [
      {
        question: 'Czy spółka z o.o. może prowadzić uproszczoną księgowość?',
        answer: 'Nie. Spółki z o.o. mają ustawowy obowiązek prowadzenia pełnej księgowości (ksiąg rachunkowych) bez możliwości wyboru uproszczonej ewidencji.',
      },
      {
        question: 'Czy muszę rozumieć plan kont, żeby zarządzać spółką?',
        answer: 'Nie musisz znać szczegółów planu kont — to praca biura rachunkowego. Musisz rozumieć, że każda operacja musi być udokumentowana i że dokumenty muszą trafiać do biura na czas.',
      },
      {
        question: 'Co się dzieje jeśli biuro nie dostanie wyciągu bankowego w terminie?',
        answer: 'Biuro nie może zamknąć miesiąca bez kompletnych dokumentów. Opóźnienie w jednym miesiącu kaskadowo opóźnia kolejne — i może wpłynąć na terminy deklaracji.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[4],
  },

  // ─── Księgowość: plan kont ───────────────────────────────────────────────────
  {
    id: 'fallback-plan-kont',
    slug: 'plan-kont-co-to-jest',
    title: 'Plan kont — co to jest i po co firmie chart of accounts',
    excerpt: 'Plan kont to zorganizowana lista "szufladek", do których trafia każda operacja finansowa firmy. Nie musisz go znać na pamięć — ale warto rozumieć co to jest.',
    summary: 'Proste wyjaśnienie czym jest plan kont (chart of accounts) dla właścicieli firm — bez żargonu, z przykładami.',
    purpose: 'Wielu właścicieli firm słyszy "plan kont" i nie wie o co chodzi. Ten poradnik tłumaczy to w 5 minut, bez wcześniejszej wiedzy z rachunkowości.',
    body_markdown: `## Plan kont w jednym zdaniu

Plan kont to lista wszystkich kont, na których firma rejestruje swoje operacje finansowe. Każde konto to jak szufladka z etykietą — np. "Kasa", "Należności od klientów", "Przychody ze sprzedaży", "Zobowiązania wobec dostawców".

Gdy cokolwiek dzieje się w firmie finansowo, trafia na właściwe konta w planie. To jest pełna księgowość.

## Jak wyglądają typowe konta

W Polsce plan kont dla spółek bazuje na ogólnym wzorcu z Ustawy o rachunkowości. Konta są pogrupowane:

| Numer konta | Co opisuje |
|-------------|------------|
| 1xx | Środki pieniężne i rachunki bankowe |
| 2xx | Rozrachunki (należności i zobowiązania) |
| 3xx | Materiały i towary |
| 4xx / 5xx | Koszty działalności |
| 6xx | Produkty |
| 7xx | Przychody i koszty ich uzyskania |
| 8xx | Kapitały i wynik finansowy |

W praktyce każda firma ma własny, bardziej szczegółowy plan kont, dopasowany do swojej działalności.

## Przykład z życia

Wystawiasz fakturę na 10 000 zł netto:
- Na koncie "Przychody ze sprzedaży" rośnie 10 000 zł
- Na koncie "Należności od klientów" pojawia się 10 000 zł (ktoś jest Ci winien)
- Na koncie "VAT należny" ląduje kwota podatku

Klient płaci:
- Konto "Należności od klientów" maleje o 10 000 zł
- Konto "Rachunek bankowy" rośnie o 10 000 zł

Ta zasada — że każda operacja trafia na dwa konta jednocześnie — to zasada podwójnego zapisu. Dlatego finanse firmy zawsze muszą być "zbilansowane".

## Czy musisz rozumieć plan kont żeby prowadzić firmę?

Nie. To zadanie Twojego biura rachunkowego lub głównej księgowej. Twoja rola to:
- dostarczać kompletne dokumenty na czas
- informować biuro o wszystkich operacjach (umowach, płatnościach gotówkowych, pożyczkach)
- zatwierdzać zestawienia, które biuro przygotowuje

Jeżeli używasz KsięgaI — aplikacja przechowuje faktury, dokumenty i płatności w ustrukturyzowany sposób. Biuro rachunkowe może korzystać z tych danych i przypisywać je do właściwych kont bez konieczności ręcznego zbierania dokumentów od Ciebie.

## Dlaczego to jest ważne dla Ciebie jako właściciela

Rozumienie, że plan kont istnieje i do czego służy, pomaga w kilku sytuacjach:
- gdy księgowa pyta o "konto kosztowe" dla danej faktury — wiesz, że to prośba o kategorię
- gdy widzisz bilans lub rachunek zysków i strat — rozumiesz skąd biorą się liczby
- gdy US lub audytor zadaje pytania o konkretną operację — rozumiesz skąd biorą dane

Nie musisz znać numerów kont. Wystarczy wiedzieć, że za każdym raportem finansowym stoi logiczna struktura, która łączy dokumenty z liczbami.`,
    checklist: [
      'Poproś biuro rachunkowe o wyjaśnienie jak wygląda plan kont Twojej firmy.',
      'Ustal, jak kategoryzować typowe koszty (np. najem, usługi IT, materiały biurowe).',
      'Zrozum różnicę między kosztami a należnościami i zobowiązaniami.',
    ],
    official_links: [
      { label: 'Ustawa o rachunkowości', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19940760694', external: true },
    ],
    related_actions: [
      { label: 'Pełna księgowość w spółce z o.o.', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
      { label: 'Faktura, płatność i księgowanie — różnica', href: '/poradnik/faktura-platnosc-ksiegowanie-roznica' },
    ],
    faq: [
      {
        question: 'Czy plan kont jest taki sam dla każdej firmy?',
        answer: 'Nie. Jest ogólny wzorzec z Ustawy o rachunkowości, ale każde biuro rachunkowe dostosowuje plan kont do specyfiki firmy. Konta mogą mieć różne nazwy i numery.',
      },
      {
        question: 'Co to jest "konto kosztowe" w pytaniu księgowej?',
        answer: 'To prośba o kategorię kosztu — np. usługi obce, materiały, najem. Biuro chce wiedzieć do której "szufladki" w planie kont przypisać daną fakturę.',
      },
      {
        question: 'Czy JDG też ma plan kont?',
        answer: 'Tylko jeśli prowadzi pełną księgowość dobrowolnie lub przekroczyła próg przychodów. Większość JDG-owców prowadzi uproszczoną ewidencję (KPiR), która ma prostszą strukturę.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[4],
  },

  // ─── Księgowość: faktura ≠ płatność ≠ księgowanie ───────────────────────────
  {
    id: 'fallback-faktura-platnosc-ksiegowanie',
    slug: 'faktura-platnosc-ksiegowanie-roznica',
    title: 'Faktura, płatność i księgowanie — dlaczego to nie jest to samo',
    excerpt: 'Wysłałeś fakturę. Klient zapłacił. Księgowa coś dopisała. To trzy osobne zdarzenia — i każde ma inne znaczenie dla VAT, CIT i rozliczeń.',
    summary: 'Wyjaśnienie różnicy między wystawieniem faktury, otrzymaniem płatności i zaksięgowaniem operacji — i dlaczego ta różnica ma znaczenie dla podatków.',
    purpose: 'To jedno z najczęstszych źródeł nieporozumień między właścicielami firm a biurami rachunkowymi. Wielu właścicieli zakłada, że "mam zapłacone" = "mam rozliczone". Nie zawsze.',
    body_markdown: `## Trzy zdarzenia, trzy daty, trzy konsekwencje

Weźmy przykład: 28 marca wystawiasz fakturę z terminem płatności 30 dni. Klient płaci 25 kwietnia. Biuro rachunkowe księguje transakcję na początku maja.

To trzy osobne zdarzenia:
- **Wystawienie faktury** — powstaje należność wobec klienta i obowiązek VAT
- **Otrzymanie płatności** — pieniądze trafiają na konto, należność znika
- **Zaksięgowanie** — operacja ląduje w odpowiednim miejscu w księgach firmy

## Dlaczego data faktury ma znaczenie dla VAT

VAT jest rozliczany na podstawie daty wystawienia faktury, nie daty wpływu pieniędzy.

Jeśli wystawiasz fakturę 28 marca — VAT należny (ten, który odprowadzasz do US) trafia do deklaracji za marzec. Nawet jeśli klient zapłaci w maju.

To oznacza, że możesz mieć dużo wystawionych faktur na koniec kwartału, zapłacony VAT... ale pieniędzy jeszcze nie masz na koncie. To może boleć płynnościowo.

## Dlaczego to ma znaczenie dla CIT / PIT

Przy spółkach z o.o. (CIT) przychód jest rozpoznawany w momencie, który określa prawo podatkowe — zwykle w momencie wystawienia faktury lub dostarczenia towaru/usługi, nie w momencie zapłaty.

Uproszczone wytłumaczenie: jeżeli wystawisz 31 grudnia fakturę za usługę wykonaną w grudniu, to przychód jest w tym roku podatkowym — nawet jeśli klient zapłaci w lutym przyszłego roku.

## Co to oznacza w praktyce dla Twojej firmy

- Wystawiaj faktury na bieżąco, nie "na zapas". Faktury wystawione z opóźnieniem mogą zmieniać okres rozliczeniowy.
- Sprawdzaj, czy masz dokumenty dla każdego kosztu — brak faktury kosztowej to brak kosztu w oczach fiskusa.
- Dopasowanie bankowe (kto zapłacił za co) to praca, która ułatwia biuru rachunkowemu zamykanie każdego miesiąca.

## Jak KsięgaI łączy te trzy zdarzenia

W KsięgaI każda faktura ma swój status:
- wystawiona (należność istnieje, VAT w deklaracji)
- opłacona — kiedy Stripe lub dopasowanie bankowe potwierdzi wpłatę
- zaksięgowana przez biuro — gdy biuro nadaje status lub pobiera dokument

Dopasowanie płatności bankowych do faktur dzieje się automatycznie, co znacznie ułatwia biuru rachunkowemu weryfikację stanu należności. Nie musisz ręcznie wyjaśniać "czy klient zapłacił" — aplikacja to widzi.

## Kiedy to rozróżnienie może Cię zaskoczyć

Dwa scenariusze, które najczęściej zaskakują:

**1. Klient zapłacił więcej niż jedna faktura naraz.** Jeden przelew za kilka faktur — biuro musi wiedzieć, które faktury zostały opłacone. Jeżeli nie masz systemu dopasowania, musisz to wyjaśniać ręcznie.

**2. Klient zapłacił zaliczkę.** Zaliczka jest dokumentowana inaczej niż zapłata za fakturę. Wymaga osobnego dokumentu (faktura zaliczkowa) — a finalnej faktury nie można wystawić jakby zaliczki nie było.`,
    checklist: [
      'Wystawiaj faktury na bieżąco — data faktury ma znaczenie dla VAT.',
      'Zbieraj faktury kosztowe od wszystkich dostawców (nawet za małe zakupy).',
      'Informuj biuro o przelewach zbiorczych (jeden przelew za kilka faktur).',
      'Ustal z biurem jak dokumentować zaliczki i płatności częściowe.',
    ],
    official_links: [],
    related_actions: [
      { label: 'Pełna księgowość w spółce z o.o.', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
      { label: 'Jak przyjmować płatności przy fakturze', href: '/poradnik/jak-przyjmowac-platnosci-przy-fakturze-stripe' },
      { label: 'Faktury w KsięgaI', href: '/faktury' },
    ],
    faq: [
      {
        question: 'Kiedy muszę zapłacić VAT — w momencie wystawienia faktury czy w momencie wpływu pieniędzy?',
        answer: 'Zwykle w momencie wystawienia faktury lub wykonania usługi (zależnie od metody kasowej lub memoriałowej). Metodę kasową VAT można stosować po spełnieniu warunków. Warto potwierdzić z księgową jaka metoda obowiązuje w Twojej firmie.',
      },
      {
        question: 'Co to jest metoda kasowa w VAT?',
        answer: 'Metoda, przy której VAT rozlicza się w momencie otrzymania zapłaty, nie wystawienia faktury. Jest dostępna dla małych podatników po zgłoszeniu do US. Zakres i warunki warto potwierdzić z doradcą podatkowym.',
      },
      {
        question: 'Czy muszę wystawiać fakturę jeśli klient zapłacił z góry?',
        answer: 'Tak — wpłata z góry (zaliczka) wymaga faktury zaliczkowej. Przy finalizacji zlecenia wystawia się fakturę końcową uwzględniającą zaliczkę. Szczegóły warto ustalić z biurem rachunkowym.',
      },
    ],
    article_type: 'guide',
    sort_order: 30,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[4],
  },

  // ─── Faktury i płatności: Stripe Connect ────────────────────────────────────
  {
    id: 'fallback-stripe-platnosci',
    slug: 'jak-przyjmowac-platnosci-przy-fakturze-stripe',
    title: 'Jak przyjmować płatności przy fakturze — Stripe Connect w KsięgaI',
    excerpt: 'Zamiast czekać na przelew, dajesz klientowi link do płatności przy fakturze. Karta, BLIK, przelew — pieniądze trafiają bezpośrednio na Twoje konto w Stripe.',
    summary: 'Jak działa Stripe Connect w KsięgaI: co to jest konto Stripe Express, jak klient płaci, jak trafiają pieniądze i dlaczego to bezpieczniejsze niż podawanie numeru konta.',
    purpose: 'Stripe Connect to nie to samo co zwykłe Stripe. Ten poradnik tłumaczy jak działa model platform, dlaczego pieniądze trafiają bezpośrednio do Ciebie i co Stripe pobiera.',
    body_markdown: `## Co to jest Stripe Connect i dlaczego nie jest to "zwykłe Stripe"

Stripe to platforma do obsługi płatności. Stripe Connect to jej wariant przeznaczony dla platform i aplikacji, które obsługują wiele firm — takich jak KsięgaI.

W modelu Connect:
- KsięgaI jest platformą techniczną
- Ty masz własne konto **Stripe Express** — odrębne konto, na którym Stripe zarządza Twoimi wpłatami i wypłatami
- pieniądze od klientów trafiają **bezpośrednio na Twoje konto Stripe**, nie przez KsięgaI

KsięgaI nie ma dostępu do Twoich środków i nie jest pośrednikiem finansowym — tylko technicznym. Stripe zarządza pieniędzmi i wypłaca je na Twój rachunek bankowy.

## Jak wygląda płatność od strony klienta

Wystawiasz fakturę w KsięgaI. System automatycznie generuje link do płatności i dołącza go do faktury PDF.

Klient klika link i trafia na stronę płatności Stripe. Widzi:
- kwotę i numer faktury
- opcje płatności: karta Visa/Mastercard, BLIK, przelew bankowy, Apple Pay (zależnie od konfiguracji)
- bezpieczny formularz płatności Stripe

Klient nie musi zakładać konta ani instalować czegokolwiek.

## Co widzisz Ty po zapłacie

W KsięgaI status faktury zmienia się automatycznie na "Opłacona" — nie musisz ręcznie sprawdzać czy pieniądze przyszły. Dopasowanie wpłaty do faktury dzieje się automatycznie.

Widzisz:
- które faktury są opłacone, które oczekują
- datę i czas płatności
- metodę płatności (karta / BLIK / przelew)
- historię transakcji do eksportu

## Jak trafiają pieniądze na Twoje konto bankowe

Stripe Express zarządza wypłatami. Zwykle Stripe wypłaca zebrane środki na Twój rachunek bankowy według ustalonego harmonogramu (np. codziennie lub co tydzień). Możesz skonfigurować harmonogram wypłat w panelu Stripe.

Nie musisz "zamawiać wypłaty" ręcznie — Stripe robi to automatycznie.

## Co Stripe pobiera

Stripe pobiera opłatę od każdej transakcji — prowizję procentową plus stałą kwotę za transakcję. Dokładne stawki zależą od umowy i lokalizacji.

KsięgaI nie pobiera dodatkowej prowizji od transakcji Stripe — płacisz tylko Stripe'owi według ich cennika dla kont Connect.

Przed aktywacją sprawdź aktualny cennik Stripe dla Twojego kraju — stawki mogą się różnić między rynkami.

## Jak aktywować Stripe Connect w KsięgaI

1. W ustawieniach firmy w KsięgaI otwórz sekcję płatności.
2. Kliknij "Podłącz Stripe" — zostaniesz przekierowany na stronę Stripe.
3. Utwórz konto Stripe Express (lub zaloguj się do istniejącego).
4. Przejdź przez weryfikację tożsamości i konta bankowego (wymóg Stripe, nie KsięgaI).
5. Po aktywacji link do płatności pojawia się automatycznie przy nowych fakturach.

## Bezpieczeństwo — kto widzi dane kart

Dane kart płatniczych **obsługuje wyłącznie Stripe**. KsięgaI nie przechowuje i nie przetwarza numerów kart. Stripe jest certyfikowany przez PCI-DSS — standard bezpieczeństwa dla płatności kartą.

Link do płatności ma limit czasu ważności — wygasły link nie działa.

## Kiedy to się opłaca

Stripe Connect ma sens gdy:
- regularnie wystawiasz faktury i czekasz na przelewy
- klienci często płacą po terminie lub nieregularnie
- chcesz mieć jasny status "opłacona / nie opłacona" bez ręcznego sprawdzania konta
- Twoi klienci wolą płacić kartą lub BLIKiem niż tradycyjnym przelewem

Przy sporadycznych transakcjach i stałych klientach, którzy zawsze płacą w terminie, może nie być konieczne.`,
    checklist: [
      'Otwórz ustawienia firmy w KsięgaI i przejdź do sekcji płatności.',
      'Kliknij "Podłącz Stripe" i utwórz konto Stripe Express.',
      'Przejdź przez weryfikację tożsamości i konta bankowego w Stripe.',
      'Sprawdź w panelu Stripe harmonogram wypłat na konto bankowe.',
      'Wystaw fakturę próbną i sprawdź czy link do płatności pojawia się poprawnie.',
    ],
    official_links: [
      { label: 'Stripe — cennik dla Polski', href: 'https://stripe.com/pl/pricing', external: true },
      { label: 'Stripe Express — informacje', href: 'https://stripe.com/connect', external: true },
    ],
    related_actions: [
      { label: 'Płatności online w KsięgaI', href: '/platnosci-online' },
      { label: 'Faktury w KsięgaI', href: '/faktury' },
      { label: 'Faktura, płatność i księgowanie — różnica', href: '/poradnik/faktura-platnosc-ksiegowanie-roznica' },
    ],
    faq: [
      {
        question: 'Czy pieniądze od klientów przechodzą przez KsięgaI?',
        answer: 'Nie. Pieniądze trafiają bezpośrednio na Twoje konto Stripe Express. KsięgaI jest tylko technicznym pośrednikiem — nie ma dostępu do Twoich środków.',
      },
      {
        question: 'Czy klient musi mieć konto Stripe żeby zapłacić?',
        answer: 'Nie. Klient klika link i płaci kartą, BLIKiem lub przelewem bez rejestracji w żadnym systemie.',
      },
      {
        question: 'Jak szybko pieniądze trafiają na moje konto bankowe?',
        answer: 'Stripe wypłaca środki na Twój rachunek bankowy według skonfigurowanego harmonogramu (codziennie, tygodniowo). Możesz to ustawić w panelu Stripe.',
      },
      {
        question: 'Czy Stripe pobiera opłatę od każdej transakcji?',
        answer: 'Tak. Stripe pobiera prowizję procentową plus stałą kwotę za transakcję. Dokładne stawki są w cenniku Stripe. KsięgaI nie pobiera dodatkowej prowizji od transakcji.',
      },
      {
        question: 'Co się stanie gdy link do płatności wygaśnie?',
        answer: 'Możesz wygenerować nowy link z poziomu faktury w KsięgaI i wysłać go klientowi ponownie.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[5],
  },

  // ─── TODO: kolejne artykuły do dodania ──────────────────────────────────────
  // Poniżej lista planowanych artykułów — do zaimplementowania w kolejności priorytetu.
  //
  // KATEGORIA: start-firmy (fallbackWikiCategories[3])
  //   slug: 'pierwsze-kroki-po-rejestracji-jdg'
  //   title: 'Pierwsze kroki po rejestracji JDG — co zrobić zaraz po wpisie do CEIDG'
  //   Tematy: NIP/REGON, ZUS (7-dniowy termin), VAT, konto bankowe, e-Doręczenia,
  //           pierwsza faktura (wymagane elementy), KSeF (kiedy zacząć myśleć),
  //           biuro rachunkowe vs samodzielna ewidencja
  //
  // KATEGORIA: start-firmy (fallbackWikiCategories[3])
  //   slug: 'co-to-jest-nip-regon-krs'
  //   title: 'NIP, REGON, KRS — czym różnią się numery identyfikacyjne firmy'
  //   Tematy: różnice między numerami, kiedy którego używać, gdzie je sprawdzić
  //
  // KATEGORIA: ksef (fallbackWikiCategories[0])
  //   slug: 'ksef-co-to-jest-i-kiedy-obowiazkowe'
  //   title: 'KSeF — co to jest i od kiedy obowiązkowy'
  //   Tematy: historia KSeF, terminy obowiązkowości, kto musi korzystać, co się zmienia
  //
  // KATEGORIA: ksiegowosc (fallbackWikiCategories[4])
  //   slug: 'jpk-co-to-jest-i-jak-to-dziala'
  //   title: 'JPK — co to jest i jak działa Jednolity Plik Kontrolny'
  //   Tematy: rodzaje JPK (V7M, FA, WB), kto składa, kiedy, jak KsięgaI pomaga
  //
  // KATEGORIA: ksiegowosc (fallbackWikiCategories[4])
  //   slug: 'vat-podstawy-dla-przedsiebiorcy'
  //   title: 'VAT dla przedsiębiorcy — podstawy bez żargonu'
  //   Tematy: VAT naliczony vs należny, kiedy vatowiec, stawki, deklaracja, JPK_V7M
  //
  // KATEGORIA: faktury-platnosci (fallbackWikiCategories[5])
  //   slug: 'jak-wystawic-pierwsza-fakture-vat'
  //   title: 'Jak wystawić pierwszą fakturę VAT — co musi zawierać'
  //   Tematy: wymagane elementy faktury, data wystawienia, termin płatności, NIP nabywcy,
  //           co z fakturą dla osoby fizycznej, KSeF-ready format
  //
  // KATEGORIA: compliance (fallbackWikiCategories[2])
  //   slug: 'uchwaly-spolki-zoo-kiedy-wymagane'
  //   title: 'Uchwały spółki z o.o. — kiedy są wymagane i jak je dokumentować'
  //   Tematy: rodzaje uchwał, protokół ze zgromadzenia, archiwum, co KsięgaI może tu pomóc
];
