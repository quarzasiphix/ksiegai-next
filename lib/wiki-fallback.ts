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
];
