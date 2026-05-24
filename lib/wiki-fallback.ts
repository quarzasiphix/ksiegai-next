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
  {
    id: 'fallback-uchwaly-decyzje',
    slug: 'uchwaly-decyzje',
    name: 'Uchwały i decyzje',
    description: 'Formalne uchwały wspólników i decyzje zarządu w sp. z o.o. — kiedy są wymagane, jak je dokumentować i dlaczego zaległości kosztują podczas kontroli.',
    sort_order: 35,
  },
  {
    id: 'fallback-finanse-spolki',
    slug: 'finanse-spolki',
    name: 'Finanse spółki',
    description: 'Jak finansować spółkę z o.o. i jak legalnie wyprowadzać z niej zysk — pożyczka wspólnika, dopłaty, dywidenda, wynajem, wynagrodzenie zarządu i JDG B2B.',
    sort_order: 45,
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

  // ─── Konto organizacji w e-US — spółka z o.o. ────────────────────────────────
  {
    id: 'fallback-konto-organizacji-spolka',
    slug: 'konto-organizacji-e-urzad-skarbowy-spolka',
    title: 'Konto organizacji w e-Urzędzie Skarbowym dla spółki z o.o. — krok po kroku',
    excerpt: 'Bez konta organizacji zarząd działa w e-US jako osoba prywatna, nie w imieniu spółki. To blokuje dostęp do JPK, KSeF i pełnomocnictw podatkowych.',
    summary: 'Przewodnik dla sp. z o.o.: jak prezes lub członek zarządu uzyskuje konto organizacji w e-US, jak nadać dostęp biuru rachunkowemu i co zrobić gdy spółka nie pojawia się na liście podmiotów.',
    purpose: 'Właściciele spółek często logują się do e-US prywatnym profilem i nie rozumieją dlaczego nie widzą danych firmy. Ten artykuł prowadzi przez cały proces od pierwszego logowania do pełnego dostępu operacyjnego.',
    body_markdown: `## Dlaczego konto prywatne nie wystarczy

Zalogowanie do e-Urzędu Skarbowego profilem zaufanym daje dostęp do **Twojego** konta podatnika — czyli Twojego PIT, Twojej historii deklaracji jako osoby fizycznej. Spółka to osobny podmiot z własnym NIP. Żeby działać w jej imieniu — składać JPK, zarządzać pełnomocnictwami, nadawać dostęp do KSeF — potrzebujesz konta organizacji.

## Kto może uzyskać konto organizacji dla sp. z o.o.

Konto organizacji może uzyskać wyłącznie osoba wpisana w KRS jako uprawniona do reprezentacji spółki:

- **Prezes zarządu** lub **członek zarządu** z prawem samodzielnej reprezentacji,
- **Prokurent** — jeśli zakres prokury obejmuje reprezentację w sprawach podatkowych,
- **Wspólnik** w spółkach osobowych (nie dotyczy sp. z o.o.).

Pracownicy, księgowi i biura rachunkowe **nie mogą** samodzielnie uzyskać konta organizacji — mogą dostać do niego dostęp dopiero po jego założeniu przez osobę uprawnioną.

## Jak krok po kroku uzyskać konto organizacji

### 1. Zaloguj się do e-US

Wejdź na [podatki.gov.pl](https://www.podatki.gov.pl/e-urzad-skarbowy/) i zaloguj się profilem zaufanym, e-dowodem lub podpisem kwalifikowanym.

### 2. Znajdź opcję przełączenia na podmiot

Po zalogowaniu w prawym górnym rogu (lub w menu) poszukaj opcji **„Przełącz podmiot"** lub **„Działaj jako"**. Powinna pojawić się lista podmiotów powiązanych z Twoim PESEL.

### 3. Spółka nie pojawia się na liście?

To częsty problem po świeżej rejestracji. Powody:

- **Za wcześnie** — powiązanie KRS/NIP z PESEL reprezentanta jest synchronizowane z baz danych; może minąć od kilku do kilkunastu dni po rejestracji w KRS.
- **Błąd w KRS** — jeśli Twój PESEL jest wpisany błędnie w KRS, system nie powiąże Cię ze spółką. Wymaga to sprostowania w KRS.
- **Kilka NIP** — jeśli spółka zmieniała NIP (np. po przekształceniu), może być zarejestrowana pod starym numerem.

Jeśli powiązanie nie pojawia się przez ponad 2 tygodnie od nadania NIP — zgłoś się do właściwego Urzędu Skarbowego z wypisem z KRS.

### 4. Uaktywnij konto organizacji

Po wybraniu spółki z listy system może poprosić o dodatkowe potwierdzenie tożsamości. Po przejściu aktywacji masz pełny dostęp do konta organizacji: historia deklaracji, JPK, KSeF, pełnomocnictwa.

## Jak nadać dostęp biuru rachunkowemu

Z poziomu konta organizacji możesz zarządzać **pełnomocnictwami podatkowymi**:

- **UPL-1** — pełnomocnictwo do podpisywania deklaracji elektronicznych (np. JPK_V7, CIT-8). Biuro rachunkowe składa je samodzielnie lub robisz to Ty w ich imieniu.
- **UPP-1** — pełnomocnictwo szczególne do konkretnych spraw.

Po nadaniu UPL-1 biuro rachunkowe będzie widoczne jako pełnomocnik i może działać w imieniu spółki bez Twojej każdorazowej zgody.

## Dostęp do KSeF przez e-US

Zarządzanie tokenami KSeF i nadawanie uprawnień do wystawiania faktur w imieniu spółki odbywa się z poziomu portalu KSeF lub przez e-US. Konto organizacji w e-US jest krokiem poprzedzającym — bez niego nie możesz zarządzać uprawnieniami KSeF ani nadać biuru dostępu do faktur.

## Zarząd wieloosobowy — kto zakłada, kto ma dostęp

Każdy członek zarządu uprawniony do samodzielnej reprezentacji może mieć własne konto organizacji — nie potrzebują działać wspólnie. Jeśli zarząd wymaga reprezentacji łącznej (dwóch podpisów), do e-US i tak loguje się każda osoba z osobna, ale do składania deklaracji potrzebne może być pełnomocnictwo udzielone jednej z nich.`,
    checklist: [
      'Zaloguj się do e-US profilem zaufanym lub e-dowodem.',
      'Kliknij „Przełącz podmiot" i sprawdź czy spółka jest na liście.',
      'Jeśli nie ma spółki — poczekaj min. 2 tygodnie od rejestracji KRS/NIP.',
      'Aktywuj konto organizacji dla spółki (NIP firmy).',
      'Zweryfikuj dostęp do zakładki JPK i historii deklaracji spółki.',
      'Złóż lub przyjmij UPL-1 dla biura rachunkowego.',
      'Przejdź do portalu KSeF i skonfiguruj uprawnienia do fakturowania.',
    ],
    official_links: [
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
      { label: 'Pełnomocnictwa podatkowe (UPL-1)', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/twoje-sprawy/pelnomocnictwa/', external: true },
    ],
    related_actions: [
      { label: 'Konto organizacji — podstawy', href: '/poradnik/konto-organizacji-e-urzad-skarbowy' },
      { label: 'Jak zdobyć token KSeF', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'NIP-8 — kiedy i co zgłosić', href: '/poradnik/nip-8-spolka-zoo' },
    ],
    faq: [
      {
        question: 'Ile czasu czekać na pojawienie się spółki na liście podmiotów?',
        answer: 'Zazwyczaj od kilku dni do 2 tygodni po nadaniu NIP. Jeśli po 2 tygodniach nadal nie widać — skontaktuj się z właściwym US z wypisem z KRS.',
      },
      {
        question: 'Czy każdy członek zarządu musi zakładać konto organizacji osobno?',
        answer: 'Tak, każda osoba loguje się własnym profilem zaufanym. Ale konto organizacji jest jedno — każdy uprawniony tylko je „włącza" dla siebie.',
      },
      {
        question: 'Czy biuro rachunkowe może samodzielnie uzyskać konto organizacji?',
        answer: 'Nie. Konto organizacji może uzyskać tylko osoba wpisana w KRS jako uprawniona do reprezentacji. Biuro dostaje dostęp przez UPL-1 nadany przez zarząd.',
      },
      {
        question: 'Czy konto organizacji w e-US daje automatycznie dostęp do KSeF?',
        answer: 'Nie automatycznie. KSeF to osobny system. Konto organizacji w e-US jest warunkiem wstępnym, ale dostęp do KSeF konfiguruje się oddzielnie w portalu KSeF lub przez e-US.',
      },
      {
        question: 'Czy wspólnik bez roli w zarządzie może uzyskać konto organizacji?',
        answer: 'Nie, jeśli nie jest wpisany w KRS jako uprawniony do reprezentacji. Bycie wspólnikiem (udziałowcem) nie daje automatycznie prawa do działania w imieniu spółki w e-US.',
      },
    ],
    article_type: 'guide',
    sort_order: 25,
    published_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
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

  // ─── e-Doręczenia dla spółki z o.o. ─────────────────────────────────────────
  {
    id: 'fallback-e-doreczenia-spolka',
    slug: 'e-doreczenia-spolka',
    title: 'e-Doręczenia dla spółki z o.o. — obowiązek, rejestracja i codzienna obsługa',
    excerpt: 'Spółka z o.o. wpisana do KRS ma obowiązek posiadania adresu do e-Doręczeń. Bez niego urząd może nie dotrzeć z ważnym pismem — a termin i tak biegnie.',
    summary: 'Kompletny przewodnik po e-Doręczeniach dla sp. z o.o.: kto rejestruje, jak to zrobić, kto pilnuje skrzynki i jakie są konsekwencje zaniedbania.',
    purpose: 'Spółki z o.o. mają inne obowiązki niż JDG — konto e-Doręczeń zakłada zarząd lub pełnomocnik, a skrzynka musi być realnie obsługiwana przez wskazaną osobę.',
    body_markdown: `## Obowiązek dla spółek z KRS

Spółki wpisane do Krajowego Rejestru Sądowego (KRS) — w tym sp. z o.o. — są objęte obowiązkiem posiadania adresu do e-Doręczeń (ADE). Oznacza to, że oficjalna korespondencja z sądów, ZUS, US i innych urzędów może trafiać wyłącznie na ten adres. Jeśli go nie masz lub skrzynka jest niepilnowana, termin odpowiedzi biegnie od dnia pierwszego doręczenia próbnego.

## Kto rejestruje adres w imieniu spółki

Adres do e-Doręczeń rejestruje **osoba uprawniona do reprezentacji spółki** — czyli członek zarządu wpisany w KRS. Może to zrobić przez:

- **e-Urząd Skarbowy** (podatki.gov.pl) — konto organizacji spółki,
- **portal gov.pl** — wniosek o ADE dla podmiotu wpisanego do KRS.

Pełnomocnik (np. radca prawny) może złożyć wniosek w imieniu spółki, jeśli posiada stosowne pełnomocnictwo i jest zarejestrowany jako pełnomocnik w systemie.

## Trzy osoby, które musisz wyznaczyć

1. **Administrator skrzynki** — zakłada konto i zarządza uprawnieniami.
2. **Odbiorca korespondencji** — sprawdza skrzynkę regularnie i reaguje na pisma.
3. **Zastępca** — pilnuje skrzynki gdy odbiorca jest niedostępny.

Brak wyznaczonego odbiorcy to najczęstszy powód, dla którego pisma urzędowe są pomijane.

## Powiązanie z NIP-8

Po aktywacji adresu do e-Doręczeń warto sprawdzić, czy adres ADE jest aktualizowany w NIP-8 (zgłoszeniu uzupełniającym). Urząd skarbowy używa NIP-8 jako źródła danych kontaktowych — jeśli pole jest puste lub zawiera stary adres, korespondencja może trafiać dwiema ścieżkami.

## Dostęp dla biura rachunkowego lub prawnika

Jako administrator skrzynki możesz nadać dostęp zewnętrznym podmiotom (biuro rachunkowe, kancelaria). Dzięki temu mogą odbierać pisma w Twoim imieniu — ale formalnie to Twoja spółka jest adresatem i Twoja odpowiedzialność.

## Co grozi za brak adresu lub niepilnowaną skrzynkę

- Pismo doręczone na nieaktywny ADE uznaje się za skutecznie doręczone po upływie terminu.
- Sąd może orzec nakaz bez Twojej odpowiedzi jeśli nie zareagujesz na czas.
- Kontrola skarbowa wysłana e-Doręczeniami zaczyna biec od daty pierwszego awizowania.

## Minimum na start

Aktywuj skrzynkę, wyznacz konkretną osobę z numerem telefonu jako odbiorcę i ustaw powiadomienia e-mail/SMS o nowej korespondencji. To zajmuje 15 minut i chroni przed poważnymi konsekwencjami.`,
    checklist: [
      'Zaloguj się do e-US na konto organizacji (NIP spółki).',
      'Złóż wniosek o adres do e-Doręczeń dla spółki.',
      'Aktywuj skrzynkę e-Doręczeń po otrzymaniu potwierdzenia.',
      'Wyznacz konkretną osobę odpowiedzialną za odbiór korespondencji.',
      'Wyznacz zastępcę na czas nieobecności odbiorcy.',
      'Włącz powiadomienia e-mail lub SMS o nowych wiadomościach.',
      'Sprawdź czy adres ADE jest aktualny w NIP-8.',
      'Opcjonalnie: nadaj dostęp biuru rachunkowemu lub kancelarii.',
    ],
    official_links: [
      { label: 'e-Doręczenia dla przedsiębiorcy (gov.pl)', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
      { label: 'e-Urząd Skarbowy — konto organizacji', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'e-Doręczenia — ogólny przewodnik', href: '/poradnik/e-doreczenia-dla-firmy' },
      { label: 'NIP-8 — kiedy i co zgłosić', href: '/poradnik/nip-8-spolka-zoo' },
      { label: 'Pierwsze obowiązki po rejestracji spółki', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy zarząd wieloosobowy musi zakładać skrzynkę razem?',
        answer: 'Nie. Wystarczy, że jeden członek zarządu — uprawniony do samodzielnej reprezentacji — złoży wniosek i aktywuje skrzynkę. Potem może nadać dostęp pozostałym.',
      },
      {
        question: 'Czy spółka może mieć kilka adresów ADE?',
        answer: 'Nie. Każdy podmiot wpisany do KRS ma jeden adres do e-Doręczeń. Można natomiast mieć wielu użytkowników z dostępem do tej samej skrzynki.',
      },
      {
        question: 'Co jeśli pismo trafiło na skrzynkę, której nikt nie sprawdzał?',
        answer: 'Pismo uznaje się za doręczone po upływie 14 dni od pierwszego awizowania (analogia do awiza pocztowego). Nie można skutecznie twierdzić, że "nie doszło" jeśli skrzynka była aktywna.',
      },
      {
        question: 'Czy biuro rachunkowe może założyć e-Doręczenia zamiast zarządu?',
        answer: 'Tak, jeśli posiada pełnomocnictwo do reprezentowania spółki w tym zakresie i jest zarejestrowane jako pełnomocnik w systemie e-Doręczeń.',
      },
    ],
    article_type: 'checklist',
    sort_order: 25,
    published_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
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

  // ─── Dedykowane strony dla krótkich, pamiętanych slug-ów ────────────────────

  {
    id: 'fallback-ksef-overview',
    slug: 'ksef',
    title: 'KSeF — co to jest, kogo dotyczy i od kiedy obowiązkowy',
    excerpt: 'KSeF to Krajowy System e-Faktur. Faktury przestają być PDF-ami — stają się ustrukturyzowanymi dokumentami XML w państwowym systemie.',
    summary: 'Ogólne wprowadzenie do KSeF: czym jest, jak zmienia fakturowanie, kogo dotyczy i jak się przygotować niezależnie od formy działalności.',
    purpose: 'Wiele osób szuka "KSeF" i chce najpierw zrozumieć o co chodzi — zanim zdecyduje co zrobić. Ten artykuł odpowiada na to pytanie bez wcześniejszej wiedzy.',
    body_markdown: `## Czym jest KSeF

KSeF (Krajowy System e-Faktur) to platforma Ministerstwa Finansów, przez którą mają przepływać faktury w Polsce.

W praktyce oznacza to, że faktura przestaje być plikiem PDF wysyłanym mailem. Staje się ustrukturyzowanym dokumentem XML w formacie FA(2), który trafia do systemu państwowego i tam jest archiwizowany.

Klient zamiast odbierać PDF, pobiera fakturę z KSeF (albo odbiera ją przez własny system).

## Kogo dotyczy KSeF

KSeF dotyczy wszystkich podatników VAT i będzie stopniowo rozszerzany. Jeśli prowadzisz działalność i wystawiasz faktury — KSeF Cię dotyczy. Dotyczy zarówno JDG, jak i spółek z o.o.

## Co się zmienia w praktyce

Przed KSeF:
- wystawiasz fakturę w dowolnym programie
- wysyłasz PDF mailem
- archiwizujesz u siebie

Po KSeF:
- wystawiasz fakturę przez system połączony z KSeF
- faktura trafia do rejestru państwowego i dostaje numer KSeF
- klient odbiera ją z KSeF
- archiwum jest po stronie MF

Twoja aplikacja (np. KsięgaI) obsługuje całą techniczną komunikację z KSeF automatycznie — po podłączeniu tokena.

## Jak się przygotować

Trzy kroki niezależnie od formy działalności:

1. **Zdobądź token KSeF** — generujesz go w portalu KSeF po zalogowaniu profilem zaufanym.
2. **Podłącz aplikację** — wklejasz token do KsięgaI i od tej chwili faktury idą przez KSeF automatycznie.
3. **Poinformuj biuro rachunkowe** — biuro potrzebuje swojego dostępu (przez NIP biura, nie przez Twój token).

## Co to jest "KSeF-ready"

Jeżeli nie chcesz jeszcze wysyłać faktur do KSeF, możesz pracować w trybie KSeF-ready: faktury są tworzone w prawidłowym formacie, ale jeszcze nie wysyłane. Połączysz się z KSeF kiedy będziesz gotowy.`,
    checklist: [
      'Sprawdź czy masz profil zaufany lub e-dowód do zalogowania do portalu KSeF.',
      'Zaloguj się do portalu KSeF i sprawdź czy widzisz swoją firmę.',
      'Wygeneruj token KSeF i skopiuj go od razu.',
      'Wklej token do ustawień firmy w KsięgaI.',
      'Poinformuj biuro rachunkowe — potrzebuje dostępu przez NIP swojej firmy.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Informacje MF o KSeF', href: 'https://www.podatki.gov.pl/ksef/', external: true },
    ],
    related_actions: [
      { label: 'Jak zdobyć token KSeF — instrukcja', href: '/poradnik/ksef-token' },
      { label: 'Jak nadać biuru dostęp do KSeF', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'KSeF dla JDG — szczegółowy przewodnik', href: '/poradnik/ksef-dla-jdg-jak-zaczac' },
      { label: 'KSeF dla spółki z o.o.', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'Czy KSeF jest już obowiązkowy?',
        answer: 'KSeF jest wdrażany etapowo. Sprawdź aktualne terminy na stronie podatki.gov.pl — daty obowiązkowości były kilkakrotnie zmieniane przez MF.',
      },
      {
        question: 'Czy JDG musi używać KSeF?',
        answer: 'Tak, KSeF dotyczy wszystkich podatników — zarówno JDG jak i spółek. Terminy i zakres obowiązkowości warto weryfikować na bieżąco z biurem rachunkowym.',
      },
      {
        question: 'Co się stanie jeśli nie podłączę się do KSeF na czas?',
        answer: 'Po wejściu w życie obowiązku faktury poza KSeF mogą być uznane za niewystawione. Zakres sankcji i wyjątki warto potwierdzić z doradcą podatkowym.',
      },
    ],
    article_type: 'guide',
    sort_order: 5,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  {
    id: 'fallback-ksef-token-short',
    slug: 'ksef-token',
    title: 'Token KSeF — gdzie go wziąć i gdzie wkleić',
    excerpt: 'Token KSeF to ciąg znaków, który generujesz w portalu KSeF i wklejasz do aplikacji. Widoczny tylko raz — skopiuj go od razu.',
    summary: 'Krótka, konkretna instrukcja: gdzie wygenerować token KSeF i co z nim zrobić w KsięgaI.',
    purpose: 'Wielu użytkowników trafia tu wprost z pytania "skąd wziąć token KSeF". Ten artykuł odpowiada dokładnie na to pytanie.',
    body_markdown: `## Czym jest token KSeF

Token KSeF to klucz dostępowy dla aplikacji — ciąg znaków, który mówi systemowi KSeF "ta aplikacja działa w imieniu tej firmy". Wklejasz go do KsięgaI raz i od tej chwili wysyłka faktur do KSeF działa automatycznie.

Token to nie jest hasło do portalu KSeF. Portal masz dla siebie. Token jest dla aplikacji.

## Gdzie wygenerować token

1. Wejdź na portal KSeF i zaloguj się profilem zaufanym lub e-dowodem.
2. Po zalogowaniu upewnij się, że jesteś w kontekście firmy (właściwy NIP).
3. Otwórz sekcję **Tokeny** (lub Zarządzanie tokenami).
4. Kliknij "Utwórz token" lub "Wygeneruj nowy token".
5. Nadaj tokenowi nazwę (np. "KsięgaI") — ułatwi identyfikację jeśli masz kilka tokenów.
6. System wyświetli kod tokena — **skopiuj go od razu**.

## Ważne: token widzisz tylko raz

Po opuszczeniu strony lub odświeżeniu kod tokena znika. Nie można go odtworzyć. Jeśli zamkniesz okno bez skopiowania — musisz wygenerować nowy token.

Nie wklejaj go w notatniku ani nie wysyłaj mailem. Wklej bezpośrednio do KsięgaI.

## Gdzie wkleić token w KsięgaI

1. Otwórz ustawienia firmy w KsięgaI.
2. Przejdź do sekcji KSeF lub Połączenia.
3. Wklej token i zapisz.
4. Sprawdź status — aplikacja potwierdzi poprawność połączenia.

## Co jeśli token przestał działać

Tokeny mogą wygasnąć lub zostać dezaktywowane. Jeśli KsięgaI zgłasza błąd połączenia z KSeF:
1. Wejdź do portalu KSeF i sprawdź status tokena.
2. Jeśli wygasł lub jest nieaktywny — wygeneruj nowy.
3. Podmień stary token na nowy w ustawieniach KsięgaI.`,
    checklist: [
      'Zaloguj się do portalu KSeF profilem zaufanym lub e-dowodem.',
      'Sprawdź że jesteś w kontekście właściwej firmy (NIP).',
      'Otwórz sekcję Tokeny i utwórz nowy token.',
      'Skopiuj kod tokena natychmiast — widoczny tylko raz.',
      'Wklej token do ustawień KSeF w KsięgaI i zapisz.',
      'Sprawdź status połączenia w aplikacji.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Pełna instrukcja połączenia z KSeF', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'Jak nadać dostęp biuru rachunkowemu', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'KSeF — czym jest i kogo dotyczy', href: '/poradnik/ksef' },
    ],
    faq: [
      {
        question: 'Co zrobić jeśli zamknąłem okno bez skopiowania tokena?',
        answer: 'Musisz wygenerować nowy token. Starego nie można odtworzyć. Przejdź do sekcji tokenów w KSeF i utwórz kolejny.',
      },
      {
        question: 'Czy mogę mieć kilka tokenów dla tej samej firmy?',
        answer: 'Tak. Możesz mieć osobny token dla każdej aplikacji, która łączy się z KSeF w imieniu firmy. Warto je oznaczać nazwami.',
      },
      {
        question: 'Czy token dla KsięgaI to to samo co dostęp biura rachunkowego?',
        answer: 'Nie. Token używa aplikacja (KsięgaI). Biuro rachunkowe dostaje dostęp innym mechanizmem — przez NIP swojej firmy w ustawieniach KSeF.',
      },
    ],
    article_type: 'guide',
    sort_order: 12,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  {
    id: 'fallback-crbr-short',
    slug: 'crbr',
    title: 'CRBR — zgłoszenie beneficjentów rzeczywistych po rejestracji spółki',
    excerpt: 'CRBR to obowiązek z terminem. Po wpisie do KRS musisz zgłosić kto realnie kontroluje spółkę — i zrobić to szybko.',
    summary: 'Krótki przewodnik po CRBR: co to jest, kto jest beneficjentem rzeczywistym, jak zgłosić i czego nie mylić.',
    purpose: 'CRBR jest jednym z pierwszych obowiązków po rejestracji spółki i jednym z najczęściej pomijanych. Ten artykuł tłumaczy co zrobić i dlaczego to ważne.',
    body_markdown: `## Co to jest CRBR

CRBR (Centralny Rejestr Beneficjentów Rzeczywistych) to publiczny rejestr prowadzony przez Ministerstwo Finansów. Po zarejestrowaniu spółki z o.o. musisz do niego zgłosić, kto jest **beneficjentem rzeczywistym** — czyli kto faktycznie kontroluje firmę.

To nie jest to samo co lista wspólników w umowie spółki. Beneficjent rzeczywisty to osoba fizyczna, która sprawuje kontrolę — bezpośrednio przez udziały (zwykle powyżej 25%) lub pośrednio przez inne podmioty.

## Kiedy i jak zgłosić

Zgłoszenia dokonujesz elektronicznie przez stronę podatki.gov.pl. Potrzebujesz profilu zaufanego lub e-dowodu. Termin liczy się od dnia wpisu do KRS — działaj szybko.

Kroki:
1. Wejdź na podatki.gov.pl → CRBR.
2. Zaloguj się profilem zaufanym.
3. Wybierz spółkę (po NIP lub KRS).
4. Wprowadź dane beneficjentów rzeczywistych.
5. Podpisz i wyślij zgłoszenie.
6. Zachowaj potwierdzenie.

## Kto jest beneficjentem rzeczywistym

W prostej spółce z o.o. — wspólnicy posiadający ponad 25% udziałów. Jeżeli żaden wspólnik nie przekracza progu albo struktura jest bardziej złożona (holding, fundusz) — zasady ustalenia beneficjenta mogą być inne. W takich przypadkach warto potwierdzić z prawnikiem.

## Czego nie mylić

- Wpisanie wspólników do umowy spółki lub KRS nie zastępuje zgłoszenia do CRBR.
- Zmiana wspólników lub struktury udziałów = obowiązek aktualizacji CRBR w terminie.
- Informacje w CRBR są publiczne.

## Co jeśli pominiesz ten krok

Brak zgłoszenia w terminie może skutkować karą finansową. Regulacje są egzekwowane — nie traktuj tego jak formalność do "zrobienia kiedyś".`,
    checklist: [
      'Ustal kto jest beneficjentem rzeczywistym spółki (kto posiada powyżej 25% udziałów lub sprawuje kontrolę).',
      'Przygotuj dane: imię, nazwisko, PESEL lub data urodzenia, obywatelstwo, kraj zamieszkania.',
      'Wejdź na podatki.gov.pl i zaloguj się profilem zaufanym.',
      'Wypełnij formularz CRBR i wyślij zgłoszenie.',
      'Zachowaj potwierdzenie złożenia zgłoszenia.',
      'Ustaw przypomnienie o aktualizacji przy każdej zmianie wspólników.',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie na podatki.gov.pl', href: 'https://www.podatki.gov.pl/crbr/', external: true },
    ],
    related_actions: [
      { label: 'Szczegółowy poradnik CRBR', href: '/poradnik/crbr-spolka-zoo-co-zglosic' },
      { label: 'Pierwsze obowiązki po rejestracji spółki', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'e-Doręczenia dla firmy', href: '/poradnik/e-doreczenia-dla-firmy' },
    ],
    faq: [
      {
        question: 'Czy CRBR dotyczy też JDG?',
        answer: 'Nie. CRBR dotyczy spółek (z o.o., akcyjnych i innych podmiotów wymienionych w ustawie), nie jednoosobowych działalności gospodarczych.',
      },
      {
        question: 'Co się stanie jeśli beneficjent zmieni się po zgłoszeniu?',
        answer: 'Masz obowiązek aktualizacji CRBR w ustawowym terminie po zmianie. Nieaktualne dane w rejestrze mogą skutkować karą.',
      },
      {
        question: 'Czy muszę zgłaszać prokurenta do CRBR?',
        answer: 'Prokurent nie jest automatycznie beneficjentem rzeczywistym. Beneficjent rzeczywisty to osoba sprawująca faktyczną kontrolę przez udziały lub inne mechanizmy — zakres warto potwierdzić z prawnikiem.',
      },
    ],
    article_type: 'checklist',
    sort_order: 5,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[2],
  },

  {
    id: 'fallback-e-urzad-short',
    slug: 'e-urzad',
    title: 'e-Urząd Skarbowy dla firmy — pierwsze logowanie i konto organizacji',
    excerpt: 'e-Urząd Skarbowy ma dwa tryby: konto prywatne i konto organizacji. Do działania w imieniu firmy potrzebujesz drugiego.',
    summary: 'Przewodnik po e-Urzędzie Skarbowym dla przedsiębiorców: różnica między kontem prywatnym a kontem organizacji, jak uzyskać dostęp i dlaczego to ważne przed KSeF.',
    purpose: 'Wielu właścicieli firm loguje się do e-US prywatnym kontem i nie rozumie czemu nie widzi danych firmy. Ten artykuł wyjaśnia dlaczego i co zrobić.',
    body_markdown: `## Dwa tryby e-Urzędu Skarbowego

e-Urząd Skarbowy (podatki.gov.pl) ma dwa odrębne konteksty:

- **Konto prywatne** — Twoje osobiste rozliczenia, PIT, deklaracje jako osoby fizycznej.
- **Konto organizacji** — dostęp do konta podatkowego firmy: NIP firmy, JPK, KSeF, deklaracje firmowe.

Logując się profilem zaufanym wchodzisz domyślnie na konto prywatne. Żeby działać w imieniu firmy, musisz przełączyć się na konto organizacji — albo uzyskać do niego dostęp jeśli go jeszcze nie masz.

## Kto może uzyskać konto organizacji

Osoba, która jest wpisana w KRS jako uprawniona do reprezentacji spółki (prezes, członek zarządu) lub właściciel JDG (automatycznie powiązany z NIP firmy).

Inne osoby (pracownicy, biuro rachunkowe) mogą uzyskać dostęp przez pełnomocnictwa nadawane przez osobę uprawnioną.

## Jak przełączyć się na konto organizacji

Po zalogowaniu do e-US:
1. Poszukaj opcji "Przełącz na podmiot" lub "Działaj jako organizacja".
2. Wybierz NIP firmy z listy dostępnych podmiotów.
3. Jeśli firma nie pojawia się na liście — musisz wnioskować o dostęp.

Jeśli dopiero rejestrujesz spółkę — konto organizacji zazwyczaj staje się dostępne po pojawieniu się NIP w rejestrach (może minąć kilka dni od rejestracji).

## Dlaczego to ważne przed KSeF

Wiele działań związanych z KSeF wykonuje się z poziomu e-US lub bezpośrednio w portalu KSeF — ale logując się jako przedstawiciel firmy, nie jako osoba prywatna. Brak konta organizacji to blokada na drodze do KSeF.

## Jak nadać dostęp biuru rachunkowemu

Z poziomu konta organizacji możesz zarządzać pełnomocnictwami. Biuro rachunkowe, które ma pełnomocnictwo (UPL-1), może działać w imieniu firmy w e-US. To osobny krok od dostępu do KSeF.`,
    checklist: [
      'Zaloguj się do e-Urzędu Skarbowego profilem zaufanym lub e-dowodem.',
      'Sprawdź czy firma pojawia się na liście dostępnych podmiotów.',
      'Przełącz się na konto organizacji (NIP firmy).',
      'Jeśli brak dostępu — złóż wniosek o konto organizacji.',
      'Sprawdź czy biuro rachunkowe ma aktualne pełnomocnictwo UPL-1.',
    ],
    official_links: [
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'Jak uzyskać konto organizacji w e-US', href: '/poradnik/konto-organizacji-e-urzad-skarbowy' },
      { label: 'KSeF — jak zacząć', href: '/poradnik/ksef' },
      { label: 'Pierwsze obowiązki po rejestracji spółki', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy konto prywatne w e-US wystarcza do obsługi firmy?',
        answer: 'Nie. Do działań podatkowych w imieniu spółki potrzebujesz konta organizacji lub właściwego pełnomocnictwa. Konto prywatne daje dostęp tylko do Twoich osobistych rozliczeń.',
      },
      {
        question: 'Dlaczego firma nie pojawia się na liście podmiotów?',
        answer: 'Może minąć kilka dni od rejestracji zanim NIP firmy jest widoczny w systemach e-US. Jeśli minął tydzień i nadal jej nie ma — skontaktuj się z właściwym US.',
      },
      {
        question: 'Czy JDG też potrzebuje konta organizacji?',
        answer: 'JDG-owcy są identyfikowani przez swój NIP, który jest jednocześnie NIP firmy. W praktyce logując się profilem zaufanym masz dostęp zarówno do konta osobistego jak i firmowego w jednym miejscu.',
      },
    ],
    article_type: 'guide',
    sort_order: 15,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[1],
  },

  {
    id: 'fallback-checklista-spolka',
    slug: 'checklista-spolka-zoo',
    title: 'Checklista nowej spółki z o.o. — co zrobić w pierwszym miesiącu',
    excerpt: 'Rejestracja spółki to początek, nie koniec formalności. Ta checklista prowadzi przez pierwsze 30 dni krok po kroku.',
    summary: 'Praktyczna checklista dla właścicieli nowej spółki z o.o. — wszystko co trzeba zrobić w pierwszym miesiącu od wpisu do KRS.',
    purpose: 'Właściciele nowych spółek często nie wiedzą co i w jakiej kolejności zrobić po wpisie do KRS. Ta checklista daje konkretną kolejność działań.',
    body_markdown: `## Dzień 1–3: pilne i z terminem

- **CRBR** — zgłoś beneficjentów rzeczywistych na podatki.gov.pl. Termin liczy się od dnia wpisu do KRS. Kara za brak zgłoszenia może być dotkliwa.
- **Konto bankowe** — otwórz rachunek firmowy i wpłać kapitał zakładowy jeśli jeszcze nie zrobiono. Bez konta firmowego nie możesz prowadzić rozliczeń.

## Tydzień 1: formalności cyfrowe

- **e-Doręczenia** — aktywuj adres do e-Doręczeń. Spółki mają obowiązek. Ustal kto monitoruje skrzynkę.
- **e-Urząd Skarbowy** — sprawdź czy masz dostęp do konta organizacji (konto firmy, nie prywatne).
- **VAT** — zdecyduj czy rejestrujesz spółkę jako vatowca i złóż VAT-R jeśli tak. Warto potwierdzić z biurem rachunkowym.

## Tydzień 2: operacje i dokumentacja

- **Biuro rachunkowe lub księgowa** — ustal sposób przekazywania dokumentów, formaty, terminy miesięczne.
- **Pierwsza faktura** — skonfiguruj aplikację do fakturowania (KsięgaI lub inne), wystaw fakturę próbną i sprawdź poprawność danych.
- **ZUS wspólników** — ustal status ZUS z biurem rachunkowym. Jednoosobowy wspólnik zwykle ma obowiązek ZUS.

## Tydzień 3–4: przygotowanie do KSeF

- Ustal kto w spółce będzie zarządzał dostępem do KSeF (osoba z KRS).
- Wygeneruj token KSeF i podłącz do aplikacji.
- Nadaj dostęp biuru rachunkowemu przez NIP biura (osobny mechanizm od tokena).

## Przez cały pierwszy miesiąc

- Zbieraj **wszystkie** faktury kosztowe — najem, usługi, sprzęt. Brak faktury = brak kosztu.
- Dokumentuj każdą umowę i decyzję — spółka prowadzi pełną księgowość.
- Sprawdź terminy pierwszych deklaracji VAT i JPK z biurem rachunkowym.`,
    checklist: [
      'Dzień 1–3: Zgłoś CRBR na podatki.gov.pl.',
      'Dzień 1–3: Otwórz firmowe konto bankowe.',
      'Tydzień 1: Aktywuj e-Doręczenia i ustal kto monitoruje skrzynkę.',
      'Tydzień 1: Uzyskaj dostęp do konta organizacji w e-Urzędzie Skarbowym.',
      'Tydzień 1: Zdecyduj o VAT i złóż VAT-R jeśli potrzebne.',
      'Tydzień 2: Ustal z biurem rachunkowym sposób przekazywania dokumentów.',
      'Tydzień 2: Skonfiguruj aplikację do fakturowania.',
      'Tydzień 2: Ustal status ZUS wspólników z biurem rachunkowym.',
      'Tydzień 3–4: Wygeneruj token KSeF i połącz z aplikacją.',
      'Tydzień 3–4: Nadaj biuru rachunkowemu dostęp do KSeF przez NIP biura.',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie', href: 'https://www.podatki.gov.pl/crbr/', external: true },
      { label: 'e-Doręczenia dla przedsiębiorcy', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Szczegółowe obowiązki po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'KSeF dla spółki z o.o.', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'Pełna księgowość — o co chodzi', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
    ],
    faq: [
      {
        question: 'W jakiej kolejności zrobić CRBR i konto bankowe?',
        answer: 'Jedno i drugie jak najszybciej po wpisie do KRS. CRBR ma ustawowy termin — zrób go w pierwszych dniach. Konto bankowe też przyda się od razu do płatności za formalności.',
      },
      {
        question: 'Czy mogę wystawiać faktury bez podłączenia do KSeF?',
        answer: 'Tak, na razie tak. W trybie KSeF-ready faktury są w prawidłowym formacie, ale nie trafiają jeszcze do KSeF. Połączysz się kiedy będziesz gotowy lub kiedy stanie się obowiązkowe.',
      },
    ],
    article_type: 'checklist',
    sort_order: 15,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[3],
  },

  {
    id: 'fallback-zakladanie-firmy',
    slug: 'zakladanie-firmy',
    title: 'Zakładanie firmy w Polsce — JDG czy spółka z o.o.?',
    excerpt: 'Dwie najpopularniejsze formy działalności różnią się odpowiedzialnością, podatkami i formalnościami. Porównanie bez żargonu.',
    summary: 'Praktyczne porównanie JDG i spółki z o.o. dla osób, które dopiero decydują jaką formę działalności wybrać.',
    purpose: 'To jedno z pierwszych pytań każdej osoby zakładającej firmę. Ten artykuł daje konkretne porównanie — bez oceniania, bo obie formy mają swoje miejsce.',
    body_markdown: `## Dwie drogi — dwa różne zobowiązania

W Polsce najczęściej zakłada się albo JDG (jednoosobową działalność gospodarczą), albo spółkę z o.o. To nie jest tylko kwestia prestiżu nazwy — to fundamentalna różnica w odpowiedzialności, podatkach i formalnościach.

## JDG — prostszy start, pełna odpowiedzialność

**JDG (jednoosobowa działalność gospodarcza)** rejestrujesz przez CEIDG. Możesz zacząć działać następnego dnia. Nie potrzebujesz kapitału zakładowego.

Plusy:
- Rejestracja prosta i bezpłatna przez CEIDG
- Możliwe uproszczone formy opodatkowania (ryczałt, liniowy)
- Mniej formalności na co dzień
- Łatwa likwidacja

Minus: **odpowiadasz całym majątkiem osobistym** za zobowiązania firmy.

Jeżeli firma ma dług — egzekucja może sięgnąć Twojego mieszkania, samochodu, konta prywatnego.

## Spółka z o.o. — większa ochrona, więcej formalności

**Spółka z o.o.** to odrębna osoba prawna. Rejestracja przez KRS (S24 lub notarialnie). Wymaga kapitału zakładowego (minimum 5 000 zł).

Plusy:
- Odpowiedzialność ograniczona do wartości udziałów (co do zasady)
- Lepsza wiarygodność wobec większych kontrahentów
- Możliwość podziału udziałów między wspólników

Minus:
- Pełna księgowość obowiązkowa (droższe biuro rachunkowe)
- Więcej formalności po rejestracji (CRBR, e-Doręczenia, ZUS wspólnika)
- Wypłata pieniędzy z firmy = dywidenda lub wynagrodzenie (nie "własne pieniądze")

## Kiedy co wybrać

**JDG jest zwykle lepsza gdy:**
- dopiero testujesz pomysł
- świadczysz usługi jako freelancer bez dużego ryzyka prawnego
- obroty są relatywnie małe
- działasz sam

**Spółka z o.o. jest zwykle lepsza gdy:**
- planujesz działalność z większym ryzykiem finansowym lub prawnym
- chcesz mieć wspólników
- kontrahenci wymagają faktury od spółki
- myślisz o inwestorach lub sprzedaży firmy

To nie jest reguła bez wyjątków — zakres zależy od Twojej sytuacji, rodzaju działalności i planów. Warto potwierdzić wybór z doradcą podatkowym lub prawnikiem.

## Co po rejestracji — pierwsze kroki

Niezależnie od formy — zaraz po rejestracji czeka Cię kilka kroków: konto bankowe, e-Doręczenia, decyzja o VAT, ZUS, konfiguracja fakturowania i przygotowanie do KSeF.`,
    checklist: [
      'Zdecyduj o formie działalności (JDG przez CEIDG lub spółka z o.o. przez KRS / S24).',
      'Przy spółce: ustal kapitał zakładowy i dane wspólników.',
      'Przy JDG: wybierz formę opodatkowania (zasady ogólne, liniowy, ryczałt).',
      'Po rejestracji: otwórz konto bankowe firmowe.',
      'Przy spółce: zgłoś CRBR w ustawowym terminie.',
      'Przy spółce: aktywuj e-Doręczenia.',
      'Ustal z biurem rachunkowym obsługę księgowości i pierwszą fakturę.',
    ],
    official_links: [
      { label: 'CEIDG — rejestracja JDG', href: 'https://www.biznes.gov.pl/pl/firma/zakladanie-firmy/chce-zalozyc-jednoosobowa-dzialalnosc-gospodarcza', external: true },
      { label: 'S24 — rejestracja spółki online', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Checklista nowej spółki z o.o.', href: '/poradnik/checklista-spolka-zoo' },
      { label: 'Pierwsze obowiązki po rejestracji spółki', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'KSeF — co to jest i od kiedy obowiązkowy', href: '/poradnik/ksef' },
    ],
    faq: [
      {
        question: 'Czy mogę przekształcić JDG w spółkę z o.o. później?',
        answer: 'Tak, przekształcenie JDG w spółkę z o.o. jest możliwe. To złożony proces prawno-podatkowy — wymaga notariusza i zwykle doradcy podatkowego.',
      },
      {
        question: 'Czy jako wspólnik spółki z o.o. płacę ZUS?',
        answer: 'Jednoosobowy wspólnik spółki z o.o. co do zasady podlega ZUS. Przy dwóch lub więcej wspólnikach zasady są inne. Zakres warto potwierdzić z doradcą.',
      },
      {
        question: 'Ile kosztuje założenie spółki z o.o.?',
        answer: 'Rejestracja przez S24 (online) to koszt opłaty sądowej (250 zł). Przez notariusza — wyższy. Do tego dochodzi minimalny kapitał zakładowy 5 000 zł i koszty biura rachunkowego.',
      },
    ],
    article_type: 'guide',
    sort_order: 5,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-05-18T00:00:00.000Z',
    category: fallbackWikiCategories[3],
  },

  // ─── KATEGORIA: uchwaly-decyzje (fallbackWikiCategories[6]) ─────────────────

  {
    id: 'fallback-ksh-210-pelnomocnik',
    slug: 'ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu',
    title: 'KSH art. 210 — dlaczego spółka potrzebuje pełnomocnika do umów z członkami zarządu',
    excerpt: 'Każda umowa między sp. z o.o. a członkiem zarządu wymaga pełnomocnika powołanego uchwałą wspólników — bez tego kontrakt może być nieważny.',
    summary: 'Artykuł 210 KSH chroni spółkę przed konfliktem interesów. Wyjaśniamy, kiedy przepis działa, co grozi za jego pominięcie i jak prawidłowo powołać pełnomocnika.',
    purpose: 'Właściciele spółek często nie wiedzą, że umowa o pracę lub kontrakt menedżerski podpisany bez pełnomocnika narusza KSH i może być podważony przez audytora lub w sądzie.',
    body_markdown: `## Na czym polega zasada z art. 210 KSH

W spółce z ograniczoną odpowiedzialnością zarząd reprezentuje spółkę na zewnątrz. Problem pojawia się, gdy spółka chce zawrzeć umowę z osobą, która jednocześnie jest członkiem tego zarządu — np. podpisać umowę o pracę, kontrakt menedżerski albo umowę pożyczki.

Gdyby zarząd podpisywał taką umowę sam ze sobą, łatwo o konflikt interesów: człowiek stoi po obu stronach stołu negocjacyjnego. Art. 210 KSH eliminuje ten problem.

> **Art. 210 § 1 KSH:** W umowie między spółką a członkiem zarządu oraz w sporze z nim spółkę reprezentuje rada nadzorcza lub pełnomocnik powołany uchwałą zgromadzenia wspólników.

## Kiedy art. 210 KSH ma zastosowanie

Przepis dotyczy **każdej czynności prawnej** między spółką a członkiem zarządu:

- umowa o pracę lub kontrakt menedżerski z prezesem
- umowa pożyczki między spółką a wspólnikiem będącym jednocześnie w zarządzie
- umowa o świadczenie usług (np. doradztwo, najem)
- ugoda pozasądowa albo spór z członkiem zarządu
- aneksy do już zawartych umów

Przepis **nie dotyczy** umów między spółką a wspólnikiem, który nie zasiada w zarządzie.

## Co grozi za pominięcie art. 210 KSH

Umowa podpisana z naruszeniem art. 210 KSH jest **bezwzględnie nieważna** — z mocy prawa, bez potrzeby wyroków sądowych. Praktyczne konsekwencje:

- kontrakt menedżerski prezesa może zostać uznany za nieważny podczas audytu lub sporu
- ZUS lub urząd skarbowy może zakwestionować podstawę do wypłat z tytułu umowy
- przy transakcji M&A due diligence ujawni lukę, co obniży wycenę lub zablokuje deal
- biegły rewident może zgłosić zastrzeżenie do sprawozdania finansowego

## Jak prawidłowo powołać pełnomocnika

Procedura jest prosta, ale musi być udokumentowana:

1. Zwołaj Nadzwyczajne Zgromadzenie Wspólników (NZW) albo włącz punkt do porządku obrad najbliższego ZW.
2. Podejmij **uchwałę o powołaniu pełnomocnika** — wskaż imię i nazwisko osoby oraz zakres pełnomocnictwa (konkretna umowa lub rodzaj czynności).
3. Sporządź protokół z NZW z treścią uchwały.
4. Podpisz umowę z członkiem zarządu — ze strony spółki podpisuje powołany pełnomocnik.
5. Przechowaj uchwałę i protokół w archiwum spółki.

> **Ważne:** pełnomocnikiem może być wspólnik, inna osoba z zarządu (niezaangażowana w tę konkretną umowę) albo zewnętrzna osoba zaufana. Nie ma wymogu, by był prawnikiem.

## Spółka z radą nadzorczą

Jeśli spółka ma radę nadzorczą, to ona — nie pełnomocnik — reprezentuje spółkę w umowach z zarządem. Uchwała wspólników do powołania pełnomocnika jest potrzebna tylko wtedy, gdy rada nadzorcza nie istnieje.

## Czego nie wolno robić

- Nie podpisuj umowy z członkiem zarządu „bo wszyscy wspólnicy się zgadzają" bez formalnej uchwały — ustna zgoda nie spełnia wymogu art. 210.
- Nie pomijaj pełnomocnika przy aneksach do istniejących umów — każda zmiana umowy to nowa czynność prawna.
- Nie zakładaj, że prezes-jedyny wspólnik może sam podpisać umowę ze sobą — art. 210 § 2 KSH wymaga formy aktu notarialnego.`,
    checklist: [
      'Sprawdź, czy planowana umowa jest zawierana z osobą będącą członkiem zarządu.',
      'Zwołaj NZW lub dodaj punkt do porządku obrad najbliższego ZW.',
      'Podejmij uchwałę o powołaniu pełnomocnika z imienia i nazwiska.',
      'Sporządź i podpisz protokół z NZW z treścią uchwały.',
      'Podpisz umowę — ze strony spółki podpisuje powołany pełnomocnik.',
      'Przechowaj uchwałę i protokół w archiwum spółki.',
    ],
    official_links: [
      { label: 'Art. 210 KSH — tekst ustawy (Sejm RP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Zarządzaj uchwałami w KsięgaI', href: '/rejestracja' },
      { label: 'Zobacz cennik dla spółek', href: '/cennik' },
    ],
    faq: [
      {
        question: 'Czy prezes będący jedynym wspólnikiem też potrzebuje pełnomocnika?',
        answer: 'Tak, ale zasada jest zmodyfikowana. Art. 210 § 2 KSH mówi, że gdy jeden wspólnik jest jednocześnie jedynym członkiem zarządu, czynność prawna między nim a spółką wymaga formy aktu notarialnego.',
      },
      {
        question: 'Kto może być pełnomocnikiem z art. 210 KSH?',
        answer: 'Dowolna osoba wskazana uchwałą wspólników — może to być inny wspólnik, osoba spoza spółki, a nawet drugi członek zarządu (o ile nie jest stroną tej konkretnej umowy). Nie musi być prawnikiem.',
      },
      {
        question: 'Czy pełnomocnictwo z art. 210 KSH musi być notarialne?',
        answer: 'Nie, o ile umowa z zarządem nie wymaga formy notarialnej. Uchwała wspólników z protokołem wystarczy.',
      },
      {
        question: 'Co jeśli umowa z naruszeniem art. 210 już obowiązuje?',
        answer: 'Należy jak najszybciej zwołać ZW, podjąć uchwałę o ratyfikacji i podpisać umowę ponownie z pełnomocnikiem. Warto skonsultować się z prawnikiem, czy nieważność można konwalidować.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-05-23T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },

  // ─── KSH art. 210 — dlaczego spółka potrzebuje pełnomocnika (scenariusze) ─────
  {
    id: 'fallback-ksh-210-dlaczego',
    slug: 'ksh-art-210-dlaczego-spolka-potrzebuje-pelnomocnika-do-umow-z-czlonkami-zarzadu',
    title: 'KSH art. 210 — dlaczego spółka potrzebuje pełnomocnika do umów z członkami zarządu',
    excerpt: 'Każda umowa między sp. z o.o. a jej prezesem bez pełnomocnika jest nieważna z mocy prawa. Sprawdź, kiedy to dotyczy Cię — i dlaczego ZUS, audytor i notariusz sprawdzą to pierwsi.',
    summary: 'Wyjaśniamy, dlaczego art. 210 KSH istnieje, w jakich realnych sytuacjach właściciele spółek łamią go nieświadomie i jakie to ma konsekwencje — od nieważności umowy po problemy z due diligence przy sprzedaży firmy.',
    purpose: 'Wielu założycieli spółek dowiaduje się o art. 210 KSH dopiero przy audycie, transakcji M&A albo kontroli ZUS. Ten artykuł pokazuje, kiedy przepis uderza i dlaczego warto zadbać o pełnomocnika na starcie.',
    body_markdown: `## Problem, który przepis rozwiązuje

Wyobraź sobie, że jesteś prezesem spółki i chcesz podpisać z tą spółką umowę o pracę. Stoisz po obu stronach stołu: jako zarząd reprezentujesz spółkę i jako pracownik podpisujesz umowę. Nikt po stronie spółki nie chroni jej interesów przed ewentualnymi nadużyciami.

Art. 210 § 1 KSH rozwiązuje ten problem jednym zdaniem:

> *W umowie między spółką a członkiem zarządu oraz w sporze z nim spółkę reprezentuje rada nadzorcza lub pełnomocnik powołany uchwałą zgromadzenia wspólników.*

Bez tego mechanizmu zarząd mógłby dowolnie kształtować swoje własne wynagrodzenie, warunki pracy czy pożyczki od spółki bez żadnej zewnętrznej kontroli.

## Pięć sytuacji, w których właściciele spółek to pomijają

### 1. Umowa o pracę lub kontrakt menedżerski prezesa

To najczęstszy przypadek. Spółka chce zatrudnić swojego prezesa. Prezes sam podpisuje umowę „w imieniu spółki" i jako pracownik. Umowa jest nieważna.

Konsekwencja: ZUS może zakwestionować tytuł do ubezpieczenia. US może podważyć koszt wynagrodzenia. W razie sporu sąd pracy stwierdzi brak ważnej umowy.

### 2. Pożyczka od wspólnika będącego w zarządzie

Wspólnik-prezes chce pożyczyć spółce pieniądze (pożyczka wspólnika). Podpisuje umowę sam — jako pożyczkodawca i jako zarząd spółki. Klasyczne naruszenie art. 210.

Konsekwencja: umowa pożyczki jest nieważna, co komplikuje rozliczenie PCC (deklaracja PCC-3) i odsetki.

### 3. Wynajem prywatnego majątku spółce

Prezes chce wynająć spółce samochód, biuro albo sprzęt. Umowa najmu musi być podpisana przez pełnomocnika ze strony spółki — nawet jeśli to oczywisty deal rynkowy.

### 4. Umowa B2B: JDG wspólnika fakturuje spółkę

Jeśli wspólnik prowadzi też JDG i fakturuje spółkę za usługi, a jednocześnie zasiada w zarządzie — umowa o świadczenie usług między JDG a spółką wymaga pełnomocnika po stronie spółki.

### 5. Aneksy do już zawartych umów

Wiele spółek ma „historyczne" umowy podpisane bez pełnomocnika. Każdy aneks to nowa czynność prawna — i znowu wymaga pełnomocnika. Ratowanie starych umów aneksami bez pełnomocnika nie naprawia problemu, tylko go pogłębia.

## Gdzie to wychodzi na jaw

**Audyt finansowy lub due diligence M&A** — biegły rewident lub prawnicy kupującego sprawdzają wszystkie umowy z osobami powiązanymi. Brak pełnomocnika = zastrzeżenie w audycie lub obniżka wyceny.

**Kontrola ZUS** — ZUS bada ważność umowy o pracę jako tytułu do ubezpieczenia. Nieważna umowa = brak tytułu do ubezpieczenia i ryzyko zwrotu składek.

**Spór sądowy z byłym prezesem** — były prezes pozywa spółkę o wynagrodzenie lub odprawę. Spółka próbuje powołać się na warunki umowy, ale umowa jest nieważna. Spór rozstrzyga się bez umowy — często na niekorzyść spółki.

**Transakcja notarialna** — notariusz przy zbyciu udziałów lub innych czynnościach sprawdza dokumentację spółki i może odmówić poświadczenia jeśli widzi naruszenia.

## Szczególny przypadek: jedyny wspólnik = jedyny członek zarządu

Art. 210 § 2 KSH wprowadza dodatkowy obowiązek: gdy spółka ma jednego wspólnika, który jest jednocześnie jedynym członkiem zarządu, każda czynność prawna między nim a spółką **wymaga formy aktu notarialnego**.

Dotyczy to klasycznej sytuacji: solo founder zakłada sp. z o.o., jest jedynym wspólnikiem i prezesem. Każda umowa między nim a tą spółką — pożyczka, wynajem, kontrakt — musi być zawarta u notariusza.

Akt notarialny to nie formalność, którą można pominąć „bo to tylko my" — to warunek ważności czynności.

## Jak temu zaradzić

Procedura jest prosta. Wystarczy jedna uchwała wspólników:

1. Zwołaj Zgromadzenie Wspólników (zwykłe lub nadzwyczajne).
2. Podejmij **uchwałę o powołaniu pełnomocnika** — z imieniem, nazwiskiem i zakresem (konkretna umowa lub kategoria czynności).
3. Sporządź protokół.
4. Podpisz umowę — ze strony spółki podpisuje pełnomocnik.

Szczegółowy opis procedury znajdziesz w artykule: [KSH art. 210 — procedura krok po kroku](/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu).`,
    checklist: [
      'Sprawdź wszystkie umowy spółki z członkami zarządu — czy były podpisane przez pełnomocnika?',
      'Zidentyfikuj aneksy do tych umów — każdy też wymaga pełnomocnika.',
      'Jeśli jesteś jedynym wspólnikiem i prezesem — sprawdź czy umowy ze sobą mają formę notarialną.',
      'Dla nowych umów: zwołaj ZW i podejmij uchwałę o powołaniu pełnomocnika przed podpisaniem.',
      'Przechowuj uchwały i protokoły w archiwum spółki.',
    ],
    official_links: [
      { label: 'Art. 210 KSH — tekst ustawy (Sejm RP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Procedura powołania pełnomocnika z art. 210 KSH', href: '/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
      { label: 'Kiedy i jak powołać pełnomocnika w spółce', href: '/poradnik/pelnomocnik-spolka-zoo-kiedy-i-jak-powolac' },
      { label: 'Zarządzaj uchwałami w KsięgaI', href: '/rejestracja' },
    ],
    faq: [
      {
        question: 'Czy art. 210 KSH dotyczy też umów z prokurą?',
        answer: 'Nie bezpośrednio. Prokurent nie jest członkiem zarządu. Ale jeśli prokurent jest też wspólnikiem z realną kontrolą, warto skonsultować zakres przepisu z prawnikiem.',
      },
      {
        question: 'Co jeśli mamy radę nadzorczą?',
        answer: 'Wtedy to rada nadzorcza reprezentuje spółkę w umowach z zarządem — nie potrzebujesz osobnego pełnomocnika. Wystarczy uchwała rady i podpis jej przewodniczącego lub upoważnionego członka.',
      },
      {
        question: 'Czy nieważną umowę można naprawić wstecznie?',
        answer: 'Doktrynalnie nieważność bezwzględna nie podlega konwalidacji. W praktyce najlepiej podpisać nową, ważną umowę z datą bieżącą i uzgodnić rozliczenie za okres wcześniejszy. Skonsultuj się z radcą prawnym.',
      },
      {
        question: 'Czy pełnomocnik musi być wspólnikiem?',
        answer: 'Nie. Może to być dowolna osoba wskazana uchwałą — inny wspólnik, prawnik, zaufana osoba zewnętrzna. Ważne, żeby uchwała precyzowała zakres pełnomocnictwa.',
      },
    ],
    article_type: 'guide',
    sort_order: 11,
    published_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },

  {
    id: 'fallback-pelnomocnik-spolka-zoo',
    slug: 'pelnomocnik-spolka-zoo-kiedy-i-jak-powolac',
    title: 'Pełnomocnik w sp. z o.o. — kiedy jest potrzebny i jak go powołać',
    excerpt: 'Kiedy zarząd nie może sam reprezentować spółki, potrzebny jest pełnomocnik. Wyjaśniamy, kiedy to obowiązkowe i jak unikać typowych błędów.',
    summary: 'Przewodnik po pełnomocnictwach w spółce z o.o.: różnice między pełnomocnikiem a prokurentem, kiedy wymagana jest uchwała wspólników, jak prawidłowo udokumentować powołanie.',
    purpose: 'Brak pełnomocnika lub błędy w jego powołaniu to jeden z najczęstszych powodów nieważności umów w spółkach z o.o. Ten artykuł pokazuje, kiedy działać i co przygotować.',
    body_markdown: `## Dwa różne rodzaje umocowania

W spółce z o.o. najczęściej spotykamy dwa rodzaje umocowania do działania w imieniu spółki:

**Prokura** — ustanawiana przez zarząd, wpisywana do KRS, uprawnia do wszelkich czynności sądowych i pozasądowych związanych z prowadzeniem przedsiębiorstwa. Prokurent działa samodzielnie, nie potrzebuje odrębnych upoważnień dla każdej umowy.

**Pełnomocnictwo** — może być ogólne (do czynności zwykłego zarządu) lub szczególne (do konkretnej czynności). Udzielane przez zarząd albo — w szczególnych przypadkach — przez zgromadzenie wspólników. Nie wpisuje się do KRS.

## Kiedy wymagana jest uchwała wspólników (a nie wystarczy decyzja zarządu)

Są sytuacje, gdy to nie zarząd, ale zgromadzenie wspólników musi powołać pełnomocnika:

- **Art. 210 KSH** — umowy i spory między spółką a członkiem zarządu (szczegółowo opisujemy w osobnym artykule)
- **Art. 253 KSH** — gdy spółka wytacza powództwo w sporze ze wspólnikiem, który jest jednocześnie w zarządzie
- **Umowa spółki może rozszerzyć listę** — niektóre umowy spółki wymagają zgody ZW dla czynności przekraczających zwykły zarząd

## Pełnomocnictwo udzielone przez zarząd — kiedy to wystarczy

W typowych sytuacjach zarząd może samodzielnie udzielić pełnomocnictwa:

- pełnomocnictwo do podpisania konkretnej umowy z kontrahentem
- upoważnienie pracownika do reprezentowania spółki w postępowaniu urzędowym
- pełnomocnictwo procesowe do działania przed sądem

W tych przypadkach wystarczy pisemna decyzja zarządu — nie jest potrzebna uchwała wspólników.

## Jak prawidłowo powołać pełnomocnika z uchwały ZW

1. Zwołaj Nadzwyczajne Zgromadzenie Wspólników lub dodaj punkt do porządku obrad ZZW.
2. Podejmij uchwałę zawierającą: imię i nazwisko pełnomocnika, zakres umocowania (konkretna umowa lub kategoria czynności), okres obowiązywania (jeśli ma być ograniczony).
3. Sporządź protokół z ZW z pełną treścią uchwały — musi być podpisany przez przewodniczącego i protokolanta.
4. Przekaż pełnomocnikowi odpis uchwały — to jego podstawa do działania.
5. Pełnomocnik podpisuje umowę w imieniu spółki, powołując się na uchwałę (np. „działając jako pełnomocnik spółki na podstawie Uchwały nr X ZW z dnia...").

## Jak długo przechowywać dokumenty

- Uchwała i protokół z ZW: przez cały okres istnienia spółki + 5 lat po jej rozwiązaniu
- Kopia podpisanej umowy: standardowo 10 lat od jej wygaśnięcia
- Podczas audytu lub due diligence audytorzy będą sprawdzać, czy pełnomocnictwo istniało w dniu podpisania umowy

> **Praktyczna rada:** Numeruj uchwały (np. Uchwała nr 3/2026/ZW) i trzymaj je w jednym miejscu — chronologicznie. W razie kontroli skarbowej lub audytu bankowego zaoszczędzisz wiele godzin szukania.

## Prokura a pełnomocnictwo — co wybrać

Jeśli chcesz dać komuś stałe szerokie uprawnienia do działania w imieniu spółki, rozważ prokurę — jest trwalsza i nie wymaga odnowienia przy każdej umowie. Pełnomocnictwo jest lepsze do jednorazowych lub ograniczonych zadań, gdy nie chcesz wpisywać osoby do KRS.`,
    checklist: [
      'Ustal, czy sytuacja wymaga uchwały ZW (np. art. 210 KSH) czy wystarczy decyzja zarządu.',
      'Przygotuj projekt uchwały z imieniem pełnomocnika i zakresem umocowania.',
      'Zwołaj ZW lub NZW i podejmij uchwałę.',
      'Sporządź protokół z ZW z treścią uchwały — podpisz przez przewodniczącego i protokolanta.',
      'Przekaż pełnomocnikowi odpis uchwały jako podstawę działania.',
      'Podpisz umowę z pełnomocnikiem powołującym się na uchwałę.',
      'Archiwizuj uchwałę, protokół i umowę w jednym miejscu.',
    ],
    official_links: [
      { label: 'Art. 210 KSH — tekst ustawy (Sejm RP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
      { label: 'Prokura — art. 1091–1099 KC', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093', external: true },
    ],
    related_actions: [
      { label: 'Rejestruj uchwały w KsięgaI', href: '/rejestracja' },
      { label: 'Przeczytaj o KSH art. 210', href: '/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
    ],
    faq: [
      {
        question: 'Czy pełnomocnictwo z uchwały ZW trzeba wpisać do KRS?',
        answer: 'Nie. Pełnomocnictwo udzielone przez zgromadzenie wspólników nie podlega wpisowi do KRS. Do KRS wpisuje się tylko prokurę.',
      },
      {
        question: 'Czy pełnomocnik może udzielić dalszego pełnomocnictwa?',
        answer: 'Tylko jeśli uchwała wprost na to zezwala lub wynika to z okoliczności. W praktyce przy pełnomocnictwach do konkretnych umów lepiej unikać subdelegacji.',
      },
      {
        question: 'Czy pełnomocnictwo wygasa, gdy zmienia się skład zarządu?',
        answer: 'Zależy od podstawy. Pełnomocnictwo udzielone przez zarząd wygasa, gdy zarząd traci uprawnienie do jego udzielenia. Pełnomocnictwo z uchwały ZW nie wygasa automatycznie ze zmianą zarządu.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-05-23T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },

  {
    id: 'fallback-uchwaly-archiwum-kontrola',
    slug: 'dokumentacja-uchwal-kontrola-audyt-spolka-zoo',
    title: 'Dlaczego brak dokumentacji uchwał kosztuje spółkę podczas kontroli',
    excerpt: 'Brakująca uchwała to nieważna umowa, zakwestionowany koszt lub problem przy audycie. Pokazujemy, gdzie spółki tracą i jak KsięgaI pomaga tego unikać.',
    summary: 'Przewodnik po ryzykach związanych z brakiem dokumentacji uchwał i decyzji w sp. z o.o. — co sprawdzają audytorzy, jakie sankcje grożą spółce i jak moduł decyzji w KsięgaI rozwiązuje ten problem.',
    purpose: 'Wielu właścicieli spółek traktuje uchwały jak formalność. Ten artykuł pokazuje konkretne scenariusze, w których brak uchwały lub jej złe udokumentowanie zamienia się w realne straty.',
    body_markdown: `## Uchwały to nie formalność — to dowód

W spółce z ograniczoną odpowiedzialnością każda ważna decyzja powinna mieć podstawę prawną: uchwałę wspólników albo decyzję zarządu utrwaloną w protokole. Nie chodzi o biurokrację — chodzi o to, że bez dokumentacji spółka nie może udowodnić, że działała zgodnie z prawem.

Audytorzy, urzędy skarbowe i banki nie pytają „czy podjęliście tę decyzję?". Pytają „pokaż uchwałę". Jeśli jej nie ma, konsekwencje mogą być poważne.

## Co sprawdzają audytorzy i urzędy skarbowe

**Biegły rewident** przy badaniu sprawozdania rocznego:
- weryfikuje, czy wynagrodzenia zarządu mają podstawę w uchwałach
- sprawdza, czy umowy z podmiotami powiązanymi były zawarte z pełnomocnikiem (art. 210 KSH)
- ocenia, czy zmiany kapitałowe (dopłaty, podwyższenie kapitału) mają komplet dokumentów

**Urząd Skarbowy** podczas kontroli:
- kwestionuje koszty uzyskania przychodu, gdy brak uchwały zatwierdzającej wydatek ponadstandardowy
- może uznać wynagrodzenie zarządu za ukrytą dywidendę, jeśli nie ma uchwały ustalającej wysokość
- sprawdza protokoły ZGW przy przeniesieniu środków między wspólnikami

**Bank** przy udzielaniu kredytu lub factoringu:
- żąda uchwały o zaciągnięciu zobowiązania, jeśli przekracza progi z umowy spółki
- wymaga protokołu ZGW zatwierdzającego sprawozdanie, zanim rozpatrzy wniosek kredytowy

**Inwestor lub nabywca** w procesie due diligence M&A:
- przegląda komplet uchwał z ostatnich 3–5 lat
- brak dokumentów lub luki w numeracji to sygnał ryzyka, który obniża wycenę

## Najczęstsze błędy dokumentacyjne spółek

- **Brak uchwały o wynagrodzeniu zarządu** — umowa o pracę podpisana bez uchwały ZW może nie stanowić ważnej podstawy do wypłat
- **Brak pełnomocnika do umów z zarządem** — naruszenie art. 210 KSH, umowa nieważna z mocy prawa
- **Uchwały podejmowane bez formalnego ZW** — niespełnione wymogi zwołania, brak kworum, brak protokołu
- **Brak numeracji i archiwum** — przy audycie niemożliwe jest wykazanie ciągłości dokumentacji
- **Uchwały w mailach** — podjęcie uchwały przez e-mail jest dopuszczalne tylko gdy umowa spółki to przewiduje i przy zachowaniu formy pisemnej z podpisami

## Co traci spółka bez porządku w dokumentach

> Brak uchwały przy wynagrodzeniu zarządu 120 000 zł/rok może oznaczać zakwestionowanie kosztów przez US — podatek CIT od nieuznanego kosztu to 19 000 zł rocznie.

> Nieważna umowa z naruszeniem art. 210 KSH wykryta w due diligence M&A może obniżyć wycenę spółki lub zablokować transakcję na etapie SPA.

> Brak protokołów ZW przy audycie bankowym opóźnia decyzję kredytową o tygodnie lub miesiące.

## Jak KsięgaI organizuje uchwały i decyzje

Moduł decyzji w KsięgaI działa na dwóch poziomach odpowiadających strukturze spółki:

**Uchwały strategiczne — Zgromadzenie Wspólników**

Rejestruj uchwały wspólników z numerem, datą, treścią i statusem. Każda uchwała może mieć przypisane dokumenty (skan protokołu, pełnomocnictwo) i powiązane umowy.

---

*Przykład widoku w aplikacji:*

> **Uchwała nr 3/2026/ZW** · Zgromadzenie Wspólników · 12 marca 2026
> Powołanie pełnomocnika do umów z zarządem (art. 210 KSH) — Jan Kowalski
> Status: **Aktywna** · Powiązane umowy: 2 · Dokumenty: protokół ZW, skan uchwały

> **Uchwała nr 2/2026/ZW** · Zgromadzenie Wspólników · 10 lutego 2026
> Zatwierdzenie wynagrodzenia członka zarządu — 15 000 zł/mies.
> Status: **Aktywna** · Powiązane umowy: 1 kontrakt menedżerski

---

**Decyzje operacyjne — Zarząd**

Rejestruj decyzje zarządu z obszaru kosztów, umów, kadr i sprzedaży. Przypisuj odpowiedzialność i linkuj do faktur lub kontraktów.

---

*Przykład widoku w aplikacji:*

> **Decyzja Zarządu nr 7/2026** · Obszar: Koszty i operacje · 5 maja 2026
> Zakup oprogramowania księgowego — budżet do 24 000 zł netto
> Odpowiedzialny: Piotr Nowak (CFO) · Powiązane faktury: 3

> **Decyzja Zarządu nr 5/2026** · Obszar: Umowy i relacje · 20 kwietnia 2026
> Podpisanie umowy ramowej z dostawcą logistyki — Logistyka Sp. z o.o.
> Status: **Wykonana** · Dokument: umowa_logistyka_2026.pdf

---

Gdy przychodzi audyt, nie szukasz dokumentów w mailach — filtrujesz decyzje po roku, eksportujesz listę z powiązaniami i oddajesz audytorowi komplet w kilka minut.

## Jak zacząć porządkować dokumentację

1. Zrób przegląd ostatnich 2 lat — jakie decyzje podjęto, które mają protokoły, których brakuje.
2. Uzupełnij zaległe uchwały (gdzie możliwe — data wsteczna z adnotacją o konwalidacji; w ważnych przypadkach skonsultuj prawnika).
3. Wprowadź numerację: rok/numer/organ (np. 2026/001/ZW dla wspólników, 2026/007/ZG dla zarządu).
4. Wybierz jedno miejsce na archiwum — papierowe + skan w aplikacji.
5. Uzupełniaj na bieżąco — najlepiej w ciągu 7 dni od podjęcia decyzji.`,
    checklist: [
      'Zrób przegląd uchwał z ostatnich 2 lat — zidentyfikuj luki.',
      'Wprowadź numerację uchwał i protokołów (rok/numer/organ).',
      'Archiwizuj protokoły ZW i decyzje zarządu w jednym miejscu.',
      'Sprawdź, czy umowy z członkami zarządu mają pełnomocnika (art. 210 KSH).',
      'Skanuj podpisane uchwały i dołączaj do powiązanych umów.',
      'Ustal zasadę: decyzja → protokół → archiwizacja w ciągu 7 dni.',
    ],
    official_links: [
      { label: 'Art. 210 KSH — Sejm RP', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
      { label: 'Art. 248 KSH — protokoły ze zgromadzeń', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Zarządzaj uchwałami w KsięgaI', href: '/rejestracja' },
      { label: 'KSH art. 210 — dlaczego pełnomocnik jest kluczowy', href: '/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
      { label: 'Pełnomocnik w sp. z o.o. — kiedy i jak', href: '/poradnik/uchwaly-decyzje/pelnomocnik-spolka-zoo-kiedy-i-jak-powolac' },
    ],
    faq: [
      {
        question: 'Jak długo przechowywać protokoły ze zgromadzeń wspólników?',
        answer: 'Przez cały czas istnienia spółki, a po jej rozwiązaniu przez co najmniej 5 lat. Protokoły ZW są dokumentami korporacyjnymi i nie mają skróconego okresu przechowywania.',
      },
      {
        question: 'Czy uchwały można podejmować przez e-mail?',
        answer: 'Tak, jeśli umowa spółki to dopuszcza i wszyscy wspólnicy wyrażą zgodę na taki tryb. Wymagana jest forma pisemna (podpis pod treścią uchwały lub oddzielne oświadczenia). Rekomendowane jest potwierdzenie przez wszystkich wspólników.',
      },
      {
        question: 'Co to jest "tryb obiegowy" podejmowania uchwał?',
        answer: 'To sposób podejmowania uchwał bez formalnego zgromadzenia — każdy wspólnik podpisuje uchwałę indywidualnie. Dopuszczalny tylko jeśli umowa spółki to przewiduje i żaden wspólnik nie sprzeciwia się temu trybowi.',
      },
      {
        question: 'Czy biegły rewident zawsze sprawdza uchwały?',
        answer: 'Spółki z o.o. podlegają obowiązkowemu badaniu, gdy spełniają co najmniej dwa z trzech kryteriów: aktywa powyżej 2,5 mln EUR, przychody powyżej 5 mln EUR lub zatrudnienie powyżej 50 osób. Przy badaniu biegły zawsze weryfikuje dokumentację korporacyjną.',
      },
    ],
    article_type: 'guide',
    sort_order: 30,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-05-23T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },

  // ─── KATEGORIA: finanse-spolki (fallbackWikiCategories[7]) ──────────────────

  {
    id: 'fallback-finansowanie-spolki',
    slug: 'finansowanie-spolki-pozyczka-wspolnika-doplaty-kapital',
    title: 'Jak sfinansować spółkę z o.o. — pożyczka wspólnika, dopłaty i inne metody',
    excerpt: 'Spółka potrzebuje gotówki? Najprostsza droga to pożyczka od wspólnika — bez PCC, bez notariusza, bez banku. Ale są szczegóły, które warto znać.',
    summary: 'Przegląd metod finansowania sp. z o.o.: pożyczka wspólnika (warunki zwolnienia z PCC, KSH art. 210), dopłaty do spółki, podwyższenie kapitału, leasing i kredyt bankowy.',
    purpose: 'Właściciele spółek często sięgają po własne oszczędności, by zasilić firmę — i robią to bez dokumentacji, co tworzy problemy podatkowe. Ten artykuł pokazuje, jak robić to prawidłowo.',
    body_markdown: `## Spółka potrzebuje pieniędzy — skąd je wziąć

Sp. z o.o. to odrębna osoba prawna. Nie możesz "dosypać" do niej gotówki tak jak do swojego portfela — każdy przepływ pieniędzy między właścicielem a spółką musi mieć formę prawną i być udokumentowany. Brak dokumentacji = ryzyko podatkowe.

Najczęstsze metody dofinansowania spółki przez właścicieli:

- **Pożyczka wspólnika** — najpopularniejsza, elastyczna, zwracana z odsetkami lub bez
- **Dopłaty do spółki** — trwalsze wzmocnienie kapitałowe, nie są długiem
- **Podwyższenie kapitału zakładowego** — formalne, wymaga KRS
- **Kredyt bankowy lub leasing** — zewnętrzne finansowanie

## Pożyczka od wspólnika — najprostsze wejście

### Jak to działa

Wspólnik pożycza spółce pieniądze na podstawie pisemnej umowy pożyczki (art. 720 KC). Spółka jest dłużnikiem, wspólnik wierzycielem. W przyszłości spółka oddaje pożyczkę — z odsetkami lub bez.

Zalety:
- nie wymaga zgody banku ani notariusza
- wspólnik może pożyczyć w dowolnym momencie i na elastycznych warunkach
- pożyczka jest pasywnością spółki, nie kosztem (chyba że są odsetki — te są kosztem uzyskania przychodu)
- gdy spółka odda pieniądze, wspólnik nie płaci dodatkowego podatku

### PCC — kiedy jest, kiedy go nie ma

Pożyczka między osobami fizycznymi lub firmami co do zasady podlega podatkowi od czynności cywilnoprawnych (PCC) w wysokości **0,5%** od kwoty pożyczki.

**Jednak pożyczka od wspólnika do spółki korzysta ze zwolnienia z PCC** pod warunkiem, że wspólnik posiada co najmniej **10% udziałów** w spółce (art. 9 pkt 10 lit. i) ustawy o PCC). W takim przypadku:

- nie składasz deklaracji PCC-3
- nie płacisz podatku od czynności
- wystarczy pisemna umowa pożyczki

Jeśli wspólnik posiada **mniej niż 10% udziałów**, pożyczka podlega PCC 0,5% — trzeba złożyć PCC-3 w ciągu 14 dni od zawarcia umowy i wpłacić podatek.

> **Uwaga:** przepisy PCC dotyczące pożyczek wspólniczych były zmieniane — zawsze warto potwierdzić aktualny stan przepisów z doradcą podatkowym lub księgowym przed podpisaniem umowy.

### Oprocentowanie — czy musi być

Pożyczka może być nieoprocentowana. Jednak w relacji między podmiotami powiązanymi (a wspólnik i spółka są podmiotami powiązanymi) organy podatkowe mogą zakwestionować brak odsetek i uznać, że spółka powinna była płacić odsetki według stawki rynkowej.

**Bezpieczniejsza praktyka:** ustal oprocentowanie na poziomie rynkowym (np. WIBOR + marża). Odsetki będą kosztem uzyskania przychodu spółki i przychodem wspólnika (podatek 19% PIT zryczałtowany lub skala — zależy od sposobu rozliczenia).

Przy kwotach poniżej progów dokumentacyjnych dla cen transferowych ryzyko jest ograniczone — ale istnieje.

### Umowa pożyczki — co powinna zawierać

- strony umowy (wspólnik jako pożyczkodawca, spółka jako pożyczkobiorca)
- kwota pożyczki
- waluta
- oprocentowanie (lub zapis, że pożyczka jest nieoprocentowana)
- termin zwrotu (konkretna data lub "na żądanie")
- sposób wypłaty (przelew na konto spółki)
- podpisy obu stron

> **Ważne:** jeśli pożyczkodawcą jest wspólnik będący jednocześnie **członkiem zarządu**, do podpisania umowy po stronie spółki potrzebny jest **pełnomocnik powołany uchwałą wspólników** (KSH art. 210). Zarząd nie może sam ze sobą zawierać umów. [Przeczytaj więcej o KSH art. 210 →](/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu)

## Dopłaty do spółki (art. 177–179 KSH)

Dopłaty to inny mechanizm — wspólnik "dosypuje" pieniądze do spółki, ale nie są to długi. Spółka nie musi ich oddawać (chyba że wspólnicy tak postanowią).

Jak działają:
- wymagają zapisu w **umowie spółki** (musi być klauzula o możliwości uchwalania dopłat)
- uchwalane przez **Zgromadzenie Wspólników**, proporcjonalnie do udziałów
- zwiększają kapitał zapasowy spółki, a nie kapitał zakładowy
- mogą być zwrócone wspólnikom uchwałą ZW, o ile nie są potrzebne do pokrycia straty

Dopłaty **nie podlegają PCC** i są korzystniejsze niż pożyczka, gdy spółka nie ma jak oddać pieniędzy w krótkim terminie.

## Podwyższenie kapitału zakładowego

Bardziej formalne wzmocnienie finansowe — wspólnicy wnoszą wkłady, a kapitał zakładowy rośnie. Wymaga:

1. uchwały ZW o podwyższeniu kapitału
2. objęcia nowych udziałów
3. zmiany umowy spółki (notariusz lub S24)
4. wpisu zmiany do KRS

Podwyższenie kapitału trwale zmienia strukturę spółki. Wycofanie tych środków jest bardziej skomplikowane niż spłata pożyczki.

## Kredyt bankowy, leasing i inne zewnętrzne finansowanie

Jeśli spółka ma historię finansową i zdolność kredytową, zewnętrzne finansowanie może być tańsze niż środki własne wspólników.

**Kredyt obrotowy** — na bieżące potrzeby finansowe, krótkoterminowy.

**Leasing** — finansowanie środków trwałych (maszyny, samochody, sprzęt) bez angażowania własnego kapitału.

**Faktoring** — sprzedaż należności do firmy faktoringowej, żeby nie czekać na płatność od klientów.

**Linia kredytowa** — elastyczne finansowanie bieżącej działalności z banku.

## Którą metodę wybrać

| Metoda | Koszt | Formalności | Zwrot środków |
|---|---|---|---|
| Pożyczka wspólnika | niski (brak PCC przy ≥10%) | umowa pisemna | tak, wg umowy |
| Dopłaty | brak podatku | uchwała ZW | możliwy uchwałą |
| Podwyższenie kapitału | brak podatku | notariusz + KRS | trudny |
| Kredyt bankowy | odsetki bankowe | wniosek, zabezpieczenia | harmonogram |

Pożyczka wspólnika jest najczęściej wybierana przez małe spółki z o.o. ze względu na szybkość i prostotę. Dopłaty sprawdzają się, gdy chcesz trwale wzmocnić kapitał bez tworzenia zobowiązania.`,
    checklist: [
      'Ustal, czy wspólnik posiada ≥10% udziałów — to warunkuje zwolnienie z PCC.',
      'Sporządź pisemną umowę pożyczki z kwotą, terminem i oprocentowaniem.',
      'Jeśli wspólnik jest jednocześnie w zarządzie — powołaj pełnomocnika uchwałą ZW (art. 210 KSH).',
      'Przelej środki na konto spółki — zachowaj potwierdzenie przelewu.',
      'Zaksięguj pożyczkę jako zobowiązanie spółki wobec wspólnika.',
      'Ustal termin zwrotu i pilnuj go — nierozliczone pożyczki wzbudzają pytania podczas kontroli.',
    ],
    official_links: [
      { label: 'Art. 9 pkt 10 ustawy o PCC — Sejm RP', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000861088', external: true },
      { label: 'Art. 177 KSH — dopłaty do spółki', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Zarządzaj finansami spółki w KsięgaI', href: '/rejestracja' },
      { label: 'KSH art. 210 — pełnomocnik do umów z zarządem', href: '/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
      { label: 'Jak wyprowadzić zysk ze spółki', href: '/poradnik/finanse-spolki/jak-wyprowadzic-zysk-ze-spolki-zoo-dywidenda-wynajem-b2b' },
    ],
    faq: [
      {
        question: 'Czy pożyczka od wspólnika zawsze jest wolna od PCC?',
        answer: 'Nie. Zwolnienie z PCC przysługuje, gdy wspólnik posiada co najmniej 10% udziałów w spółce. Przy mniejszym udziale obowiązuje PCC 0,5% i konieczność złożenia deklaracji PCC-3 w 14 dni.',
      },
      {
        question: 'Czy nieoprocentowana pożyczka od wspólnika to problem podatkowy?',
        answer: 'Potencjalnie tak — organy podatkowe mogą uznać, że spółka powinna była zapłacić odsetki rynkowe, a ich brak to nieodpłatne świadczenie. W praktyce ryzyko jest niższe przy małych kwotach i krótkim terminie, ale bezpieczniej ustalić symboliczne oprocentowanie.',
      },
      {
        question: 'Czy mogę przelać pieniądze na konto spółki bez umowy?',
        answer: 'Nie rekomendujemy. Przelew bez podstawy prawnej (umowy pożyczki lub uchwały o dopłatach) tworzy ryzyko zakwestionowania przez US lub biegłego rewidenta. Sporządzenie umowy zajmuje 15 minut i daje spółce jasną podstawę zobowiązania.',
      },
      {
        question: 'Czym różni się pożyczka od dopłaty?',
        answer: 'Pożyczka to dług spółki — musi być oddana w umówionym terminie. Dopłata to trwałe wzmocnienie kapitałowe — spółka nie jest zobowiązana do jej zwrotu, chyba że wspólnicy tak postanowią uchwałą.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-05-23T00:00:00.000Z',
    category: fallbackWikiCategories[7],
  },

  {
    id: 'fallback-wyprowadzanie-zysku-spolka',
    slug: 'jak-wyprowadzic-zysk-ze-spolki-zoo-dywidenda-wynajem-b2b',
    title: 'Jak wyprowadzić zysk ze spółki z o.o. — dywidenda, wynajem, wynagrodzenie i JDG B2B',
    excerpt: 'Spółka zarabia, ale pieniądze leżą na koncie firmowym. Masz kilka legalnych metod, żeby do nich dotrzeć — każda ma inny koszt podatkowy i inne wymogi formalne.',
    summary: 'Przegląd metod pobierania wynagrodzenia i zysku ze sp. z o.o.: dywidenda, zaliczka na dywidendę, wynajem prywatnych rzeczy spółce, kontrakt menedżerski, umowa o pracę i JDG B2B.',
    purpose: 'Właściciele spółek często wypłacają pieniądze ad hoc — bez uchwał, bez dokumentacji, bez świadomości skutków podatkowych. Ten artykuł porządkuje dostępne metody i pokazuje ich realne koszty.',
    body_markdown: `## Pieniądze w spółce to nie twoje pieniądze — jeszcze

Sp. z o.o. to odrębna osoba prawna. Zysk spółki nie jest automatycznie zyskiem właściciela — żeby do niego dotrzeć, potrzebujesz jednej z kilku dostępnych legalnych metod. Każda z nich różni się podatkowo, składkami ZUS i wymogami formalnymi.

Dobrzy właściciele spółek świadomie dobierają mix metod do swojej sytuacji — nie polegają na jednej ścieżce.

## Dywidenda — klasyczna wypłata zysku

### Jak to działa

Dywidenda to udział w zysku netto spółki, wypłacany wspólnikom po zatwierdzeniu rocznego sprawozdania finansowego. To najprostsza i najczystsza forma — zysk spółki staje się zyskiem właściciela.

**Procedura:**
1. Spółka kończy rok z zyskiem netto.
2. Zwołujesz Zwyczajne Zgromadzenie Wspólników (do 30 czerwca roku następnego).
3. ZZW zatwierdza sprawozdanie finansowe i **podejmuje uchwałę o podziale zysku**.
4. Dywidenda jest wypłacana w terminie wskazanym w uchwale.

**Podatek:** 19% PIT zryczałtowany (podatek od zysków kapitałowych, tzw. "podatek Belki"). Spółka pobiera go jako płatnik i odprowadza do US — właściciel dostaje kwotę netto.

**ZUS:** brak — dywidenda nie jest tytułem do ubezpieczeń społecznych.

### Zaliczka na dywidendę — w trakcie roku

Jeśli nie chcesz czekać do końca roku, zarząd może wypłacić **zaliczkę na dywidendę** — ale tylko gdy:
- spółka wypracowała zysk co najmniej w pierwszym półroczu bieżącego roku
- zatwierdzone sprawozdanie za poprzedni rok wykazywało zysk
- zarząd podjął stosowną uchwałę (i umowa spółki to dopuszcza)

Zaliczka podlega temu samemu podatkowi 19% i tak samo wyklucza ZUS.

> **Uwaga:** zaliczka na dywidendę zostaje rozliczona z dywidendą roczną. Jeśli zysk roczny okaże się niższy niż wypłacone zaliczki, wspólnicy muszą nadwyżkę zwrócić spółce.

## Wynajem prywatnych rzeczy spółce

### Jak to działa

Masz samochód, mieszkanie, lokal biurowy albo sprzęt? Możesz wynająć je swojej spółce. Spółka płaci Ci czynsz — i zalicza go w koszty uzyskania przychodu (obniża podatek spółki). Ty dostaniesz regularne wpływy niezależne od wyników spółki.

**Co można wynajmować:**
- samochód osobowy lub dostawczy
- lokal biurowy lub mieszkanie (gdy służy działalności spółki)
- sprzęt komputerowy, maszyny, narzędzia
- prawa autorskie, licencje (tu mowa o sublicencji — inna konstrukcja)

### Opodatkowanie wynajmu

Przychody z wynajmu prywatnego (nie w ramach działalności gospodarczej) można opodatkować **ryczałtem od przychodów ewidencjonowanych**:
- **8,5%** od przychodów do 100 000 zł rocznie
- **12,5%** od nadwyżki powyżej 100 000 zł

**ZUS: brak** — najem prywatny nie jest tytułem do ubezpieczeń.

To jedna z najtańszych podatkowo metod wypłaty, jeśli masz coś, co spółka faktycznie może używać.

### Na co uważać

- Czynsz musi być **rynkowy** — transakcja z podmiotem powiązanym może być kwestionowana przez US, jeśli czynsz odbiega od stawek rynkowych
- Przy umowie najmu z samym sobą jako zarządem: **art. 210 KSH** — spółka musi mieć pełnomocnika powołanego uchwałą ZW do podpisania umowy ([szczegóły tutaj](/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu))
- Samochód wynajmowany spółce: spółka może odliczyć 75% VAT i zaliczać czynsz w koszty (przy użytku mieszanym — szczegóły zależą od sposobu użytkowania)

## Wynagrodzenie za zarządzanie spółką

### Trzy możliwe formy

**Wynagrodzenie z tytułu powołania** (art. 201–205 KSH): jeśli zarząd jest powołany uchwałą wspólników, ZW może też ustalić wynagrodzenie za pełnienie funkcji. Prosto formalnie, ale wymaga uchwały.

**Kontrakt menedżerski**: umowa cywilnoprawna między spółką a osobą zarządzającą. Elastyczna forma — można ustalić dowolne wynagrodzenie i warunki. Wymaga pełnomocnika (art. 210 KSH), jeśli menedżer jest wspólnikiem.

**Umowa o pracę**: zatrudnienie siebie jako prezesa na etacie. Pełna ochrona pracownicza, ale też pełny ZUS.

### Podatek i ZUS przy wynagrodzeniu zarządu

| Forma | PIT | ZUS |
|---|---|---|
| Uchwała ZW (bez umowy) | skala 12%/32% | może podlegać ZUS jako działalność* |
| Kontrakt menedżerski | skala 12%/32% | tak — ZUS jak zlecenie |
| Umowa o pracę | skala 12%/32% | tak — pełny ZUS pracowniczy |

*Jednoosobowy wspólnik i jedyny zarząd spółki podlega ZUS — to skomplikowany obszar, warto omówić z doradcą.

Wynagrodzenie zarządu to koszt spółki (obniża CIT o 19%), ale ZUS i PIT po stronie osoby zarządzającej są wyższe niż przy dywidendzie czy wynajmie.

## JDG B2B — fakturowanie własnej spółki

### Jak to działa

Prowadzisz własną działalność gospodarczą (JDG) i jednocześnie jesteś wspólnikiem lub zarządem spółki? Możesz wystawiać faktury swojej spółce za usługi, które faktycznie dla niej wykonujesz.

Spółka płaci za faktury (koszt uzyskania przychodu), Ty rozliczasz przychód w JDG — np. **podatkiem liniowym 19%** lub **ryczałtem** (stawka zależy od PKD).

**Typowe usługi fakturowane spółce przez właściciela:**
- doradztwo strategiczne, zarządzanie
- usługi IT, programowanie
- marketing, obsługa mediów społecznościowych
- usługi administracyjne

### Wymagania

Żeby B2B było legalne i bezpieczne podatkowo:

1. **Faktyczne świadczenie usług** — musisz realnie wykonywać pracę na rzecz spółki, nie tylko wystawiać fakturę
2. **Rynkowa cena** — wynagrodzenie JDG musi odpowiadać stawkom rynkowym (podmioty powiązane)
3. **Ceny transferowe** — jeśli transakcje przekroczą progi dokumentacyjne (2 mln PLN netto rocznie za usługi), trzeba sporządzić dokumentację cen transferowych
4. **Oddzielność działalności** — JDG nie powinna być w sposób oczywisty "przykrywką" na wynagrodzenie pracownicze

### Ryzyko "reklasyfikacji"

Organy podatkowe mogą zakwestionować B2B jako stosunek pracy, jeśli:
- JDG ma spółkę jako jedynego klienta
- brak swobody w organizacji pracy, określone godziny pracy
- narzędzia i sprzęt należą do spółki
- faktury są stałe bez względu na wykonaną pracę

Taka reklasyfikacja oznacza zaległości ZUS i PIT według skali za cały sporny okres — ze znacznymi odsetkami.

### ZUS przy JDG

- przez pierwsze 6 miesięcy: ulga na start (brak składek społecznych)
- przez 2 lata: preferencyjny ZUS (niższe składki)
- po 2 latach: pełny ZUS przedsiębiorcy

Preferencyjny ZUS plus podatek liniowy 19% to jeden z powodów, dla których B2B przez JDG jest popularne wśród właścicieli spółek.

## Jak zestawić metody — przykładowy mix

Nie ma jednej optymalnej metody. Właściciele spółek często łączą kilka ścieżek:

- **Wynajem samochodu lub lokalu** → tani podatkowo (ryczałt 8,5%), bieżące wpływy, bez ZUS
- **Kontrakt menedżerski** → regularne wynagrodzenie za zarządzanie, koszt spółki
- **Dywidenda roczna** → zysk po CIT do podziału, 19% podatek, bez ZUS
- **JDG B2B** → jeśli masz realną działalność i świadczysz usługi

> **Zawsze warto ustalić mix z doradcą podatkowym** — optymalny dobór zależy od formy opodatkowania JDG, struktury udziałowej i sytuacji ZUS właściciela.`,
    checklist: [
      'Ustal, które metody pasują do twojej sytuacji — ZUS, forma opodatkowania, udziały.',
      'Dywidenda: upewnij się, że ZZW zatwierdza sprawozdanie i podejmuje uchwałę o podziale zysku.',
      'Wynajem: sporządź pisemną umowę najmu z ceną rynkową; jeśli jesteś w zarządzie — potrzebujesz pełnomocnika (art. 210 KSH).',
      'Wynagrodzenie zarządu: przygotuj uchwałę ZW lub kontrakt menedżerski z pełnomocnikiem.',
      'JDG B2B: dokumentuj faktycznie wykonane usługi i pilnuj rynkowej ceny faktur.',
      'Przy transakcjach z własną spółką powyżej 2 mln PLN/rok — sporządź dokumentację cen transferowych.',
    ],
    official_links: [
      { label: 'Ustawa o PIT — dywidenda i zyski kapitałowe', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19910800350', external: true },
      { label: 'Art. 193–198 KSH — podział zysku w sp. z o.o.', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Zarządzaj finansami spółki w KsięgaI', href: '/rejestracja' },
      { label: 'Jak finansować spółkę — pożyczka wspólnika i dopłaty', href: '/poradnik/finanse-spolki/finansowanie-spolki-pozyczka-wspolnika-doplaty-kapital' },
      { label: 'KSH art. 210 — pełnomocnik do umów z zarządem', href: '/poradnik/uchwaly-decyzje/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
    ],
    faq: [
      {
        question: 'Czy mogę pobierać dywidendę co miesiąc?',
        answer: 'Dywidenda roczna — raz po zatwierdzeniu sprawozdania. W ciągu roku możesz wypłacać zaliczki na dywidendę, jeśli umowa spółki to dopuszcza i spółka wypracowała zysk. Zaliczki podlegają takiemu samemu podatkowi 19%.',
      },
      {
        question: 'Czy wynajmowanie samochodu własnej spółce jest legalne?',
        answer: 'Tak, pod warunkiem że czynsz jest rynkowy, umowa jest pisemna, a samochód faktycznie jest używany przez spółkę. Umowę ze strony spółki musi podpisać pełnomocnik (jeśli właściciel jest w zarządzie) — wymóg z art. 210 KSH.',
      },
      {
        question: 'Jak bardzo opłacalne jest B2B przez JDG w porównaniu do dywidendy?',
        answer: 'Zależy od skali. Przy podatku liniowym 19% JDG kontra 19% CIT spółki + 19% dywidendy efektywne opodatkowanie zysku przez dywidendę wynosi ok. 34%. B2B przez JDG (podatek liniowy 19% + ZUS) bywa korzystniejsze — ale wymaga realnej działalności i dokumentacji.',
      },
      {
        question: 'Czy mogę wynagrodzić siebie za pełnienie funkcji zarządu bez umowy?',
        answer: 'Tak — na podstawie uchwały ZW ustalającej wynagrodzenie zarządu. To najprostsza forma: nie ma umowy, jest uchwała. Wynagrodzenie podlega PIT według skali i może podlegać ZUS w zależności od struktury udziałowej.',
      },
      {
        question: 'Co to są ceny transferowe i kiedy mnie dotyczą?',
        answer: 'Obowiązek dokumentacji cen transferowych pojawia się, gdy suma transakcji między podmiotami powiązanymi (np. Ty i Twoja spółka) przekracza 2 mln PLN netto rocznie dla transakcji usługowych. Poniżej tego progu dokumentacja nie jest wymagana, ale ceny i tak muszą być rynkowe.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-05-23T00:00:00.000Z',
    category: fallbackWikiCategories[7],
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
