/**
 * Legal-form buckets the poradnik is split into. An article/category with no
 * explicit `entityTypes` defaults to `['spolka']` (the wiki grew up sp. z o.o.-first).
 */
export type WikiEntityType = 'spolka' | 'jdg' | 'stowarzyszenie' | 'fundacja';

export const ALL_WIKI_ENTITY_TYPES: WikiEntityType[] = ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'];

export type FallbackWikiCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  /** Which entity hubs this category surfaces in. Absent → all entities. */
  entityTypes?: WikiEntityType[];
};

export type FallbackWikiFaqItem = {
  question: string;
  answer: string;
};

export type FallbackWikiArticle = {
  id: string;
  slug: string;
  title: string;
  /** Optional on-page H1 when it should differ from the SEO <title>. */
  h1?: string | null;
  /**
   * Legal forms this article applies to. Absent → `['spolka']`.
   * Drives the /poradnik/dla-<entity> hub pages and entity-scoped invite emails.
   */
  entityTypes?: WikiEntityType[];
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
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
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
  {
    id: 'fallback-struktury-spolek',
    slug: 'struktury-spolek-i-podatki',
    name: 'Struktury spółek i podatki',
    description: 'Praktyczne wyjaśnienia struktur prawnych i podatkowych: JDG, spółka z o.o., holdingi, fundusz rodzinny, spółki osobowe i podstawy międzynarodowego planowania podatkowego.',
    sort_order: 55,
  },
  {
    id: 'fallback-deklaracje',
    slug: 'deklaracje',
    name: 'Deklaracje',
    description: 'Praktyczny przewodnik po deklaracjach i formularzach podatkowych dla JDG i spółki z o.o. — JPK, VAT, ZUS, PIT, CIT i inne. Co to jest, kogo dotyczy i kiedy trzeba złożyć.',
    sort_order: 60,
  },
  // ─── NGO (fundacja / stowarzyszenie) — appended so numeric indices above stay stable ───
  {
    id: 'fallback-start-ngo',
    slug: 'start-ngo',
    name: 'Start organizacji (fundacja / stowarzyszenie)',
    description: 'Pierwsze obowiązki fundacji i stowarzyszenia rejestrowego po wpisie do KRS — NIP-8, CRBR, konto organizacji w e-US, e-Doręczenia, nadzór i sprawozdawczość — czego nigdzie nie tłumaczą wprost.',
    sort_order: 7,
    entityTypes: ['fundacja', 'stowarzyszenie'],
  },
  {
    id: 'fallback-ngo-sprawozdawczosc',
    slug: 'ngo-sprawozdawczosc',
    name: 'Sprawozdawczość i nadzór NGO',
    description: 'Coroczne sprawozdanie z działalności fundacji do ministra, nadzór starosty nad stowarzyszeniem, sprawozdania finansowe organizacji i rozdzielenie działalności statutowej, odpłatnej i gospodarczej.',
    sort_order: 63,
    entityTypes: ['fundacja', 'stowarzyszenie'],
  },
];

/** Index helpers for the NGO categories (appended, so not at a stable small index). */
const CAT_START_NGO = fallbackWikiCategories.find((c) => c.slug === 'start-ngo')!;
const CAT_NGO_SPRAWOZDAWCZOSC = fallbackWikiCategories.find((c) => c.slug === 'ngo-sprawozdawczosc')!;
const CAT_URZAD_SKARBOWY = fallbackWikiCategories.find((c) => c.slug === 'urzad-skarbowy')!;
const CAT_COMPLIANCE = fallbackWikiCategories.find((c) => c.slug === 'compliance')!;
const CAT_KSEF = fallbackWikiCategories.find((c) => c.slug === 'ksef')!;

export const fallbackWikiArticles: FallbackWikiArticle[] = [
  {
    id: 'fallback-ksef-token',
    slug: 'jak-zdobyc-token-ksef-i-podlaczyc-firme',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'Jak zdobyć token KSeF i podłączyć firmę do KsięgaI',
    excerpt: 'Najprostsza ścieżka: logujesz się do KSeF, tworzysz token, kopiujesz kod i wklejasz go do KsięgaI.',
    summary: 'Instrukcja krok po kroku, jak zdobyć token KSeF i wkleić go do KsięgaI.',
    purpose: 'Bez tokena firma nie połączy się z KSeF. To blokuje legalną wysyłkę e-faktur z aplikacji i pobieranie dokumentów z KSeF.',
    body_markdown: `## Jak wygląda najprostsza ścieżka

Nie szukaj przycisku typu "włącz KSeF" w aplikacji. Najpierw musisz zdobyć token w samym KSeF. Dopiero potem wracasz do KsięgaI i wklejasz kod w oknie połączenia.

**JDG** łączy się z KSeF samodzielnie przez profil zaufany. **Spółka z o.o.** najpierw musi mieć pierwszą osobę z uprawnieniami w KSeF: [Konto Organizacji w e-US](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka) → [ZAW-FA](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep) → pierwsze wejście do KSeF. Token generujesz dopiero potem.

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
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'KSeF dla JDG — jak zacząć', href: '/poradnik/ksef-dla-jdg-jak-zaczac' },
      { label: 'Załóż konto w KsięgaI', href: '/rejestracja' },
    ],
    faq: [
      {
        question: 'Skąd wziąć token KSeF?',
        answer: 'Token tworzysz w samym portalu KSeF po zalogowaniu się jako osoba, która ma dostęp do firmy. W spółce z o.o. najpierw trzeba mieć pierwszą osobę z uprawnieniami w KSeF (po ZAW-FA lub uwierzytelnieniu pieczęcią kwalifikowaną).',
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
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },
  // ─── Konto organizacji w e-US — spółka z o.o. (główny filar klastra) ─────────
  // Uwaga: dawny ogólny artykuł "konto-organizacji-e-urzad-skarbowy" został
  // scalony z tym filarem (301 w public/_redirects + alias w lib/wiki.ts),
  // żeby trzy główne artykuły nie konkurowały o to samo zapytanie.
  {
    id: 'fallback-konto-organizacji-spolka',
    slug: 'konto-organizacji-e-urzad-skarbowy-spolka',
    title: 'Konto organizacji w e-Urzędzie Skarbowym dla nowej spółki z o.o. — krok po kroku',
    h1: 'Nowa spółka nie pojawia się w e-Urzędzie Skarbowym? Jak uzyskać Konto Organizacji',
    excerpt: 'Członek zarządu nowej spółki z o.o. nie dostaje automatycznie dostępu do jej Konta Organizacji tylko dlatego, że widnieje w KRS. Pierwszego użytkownika trzeba formalnie wyznaczyć wnioskiem w urzędzie skarbowym.',
    summary: 'Praktyczny przewodnik dla nowej sp. z o.o.: dlaczego spółka nie pojawia się w e-Urzędzie Skarbowym, jak ustanowić pierwszego użytkownika Konta Organizacji wnioskiem w US, dlaczego kolejnych użytkowników dodaje się dopiero online, jak to się ma do NIP-8, UPL-1 i ZAW-FA oraz jaka jest właściwa kolejność kroków do KSeF.',
    purpose: 'Zarząd nowej spółki loguje się do e-US i nie widzi firmy — a potem dostaje sprzeczne rady. Ten artykuł prowadzi przez sprawdzoną ścieżkę: od wniosku o dostęp do Konta Organizacji, przez NIP-8, aż po ZAW-FA i KSeF. Rozdziela też pojęcia, które w internecie bywają mylone: Konto Organizacji, UPL-1 i uprawnienia w KSeF.',
    body_markdown: `## W skrócie

Nowa spółka z o.o. nie „pojawia się" sama w e-Urzędzie Skarbowym. Zanim ktokolwiek zacznie działać w jej imieniu, spółka musi wyznaczyć **pierwszego użytkownika Konta Organizacji** w odrębnej procedurze dostępu. Poniżej opisujemy sprawdzoną, najmniej zawodną ścieżkę dla świeżo zarejestrowanej spółki — oraz to, czym różni się ona od oficjalnych sposobów opisanych przez Ministerstwo Finansów.

> **Członek zarządu nowej spółki z o.o. nie otrzymuje automatycznie dostępu do jej Konta Organizacji tylko dlatego, że widnieje w KRS.** Pierwszego użytkownika trzeba formalnie wyznaczyć we wniosku o przyznanie dostępu do Konta Organizacji. Dopiero użytkownik z dostępem rozszerzonym może później dodawać kolejne osoby online.

> **Możliwość złożenia UPL-1 lub NIP-8 nie jest dowodem posiadania dostępu do Konta Organizacji.** Konto Organizacji, UPL-1 i uprawnienia w KSeF to trzy odrębne mechanizmy — prawne i techniczne — których nie należy używać zamiennie.

## Czy członek zarządu automatycznie widzi nową spółkę w e-US?

Nie. Wpis w KRS jako osoba uprawniona do reprezentacji (prezes, członek zarządu) wskazuje, **kto może wystąpić o dostęp** do Konta Organizacji — ale sam z siebie nie czyni tej osoby użytkownikiem konta. Nawet pełnomocnik ogólny spółki, jeśli nie został osobno dodany jako użytkownik Konta Organizacji, nie ma do niego dostępu w e-US.

Reprezentacja w KRS i dostęp do Konta Organizacji (UKO) to dwie różne rzeczy. Nie zakładaj, że bycie w zarządzie „załatwia" dostęp do e-US w imieniu spółki.

## Dlaczego spółka nie pojawia się po zalogowaniu?

Po zalogowaniu profilem zaufanym jesteś w **kontekście osoby prywatnej** — widzisz swój PIT i swoje sprawy. Żeby zobaczyć spółkę, musisz przełączyć się na jej Konto Organizacji. Jeśli po kliknięciu „Zmień kontekst" / „Przełącz podmiot" spółki nie ma na liście, to najczęściej dlatego, że **nikt nie został jeszcze wyznaczony jako użytkownik jej Konta Organizacji** — a nie dlatego, że „NIP się nie zsynchronizował".

Rzadziej brak spółki na liście wynika z realnego błędu danych: błędnie wpisany PESEL reprezentanta w KRS albo stary NIP po przekształceniu. To trzeba poprawić u źródła (w KRS), ale u nowej spółki bez żadnego użytkownika Konta Organizacji pierwszym krokiem i tak jest złożenie wniosku o dostęp.

## Pierwszy użytkownik a kolejni użytkownicy — to dwa różne przypadki

To jest sedno problemu, o który rozbija się większość poradników.

### Jak ustanowić pierwszego użytkownika Konta Organizacji?

Dla spółki, która nie ma jeszcze żadnego użytkownika Konta Organizacji, pierwszą osobę wyznacza się formalnie przez **„Wniosek o przyznanie dostępu / odebranie dostępu do Konta Organizacji w e-Urzędzie Skarbowym"**.

Wniosek:

- składają **osoby uprawnione do reprezentacji spółki** zgodnie z zasadą reprezentacji z KRS (albo pełnomocnik ogólny),
- wskazuje dane osoby, której nadaje się dostęp, oraz **rodzaj dostępu**: podstawowy albo rozszerzony,
- kierowany jest do **urzędu skarbowego właściwego w sprawach ewidencji podatników** dla tej spółki.

Pierwszy użytkownik powinien co do zasady dostać **dostęp rozszerzony** — tylko taki użytkownik może później dodawać i odbierać dostęp kolejnym osobom przez e-US (patrz niżej).

Sprawdzona, najmniej zawodna ścieżka dla świeżo zarejestrowanej spółki, którą stosujemy przy wdrożeniach kolejnych nowych spółek, to **złożenie wypełnionego wniosku osobiście w placówce właściwego urzędu skarbowego**. Załatwiasz sprawę przy okienku, od razu wyjaśniasz ewentualne braki, a przy okazji możesz w tej samej wizycie złożyć NIP-8.

### Dlaczego pierwszego użytkownika nie można po prostu dodać online?

Bo to problem „jajka i kury":

- zarządzanie użytkownikami odbywa się **wewnątrz Konta Organizacji** (sekcja „Dane organizacji → Użytkownicy"),
- wejść tam może tylko ktoś, kto **już ma dostęp rozszerzony**,
- w nowej spółce nikt takiego dostępu nie ma — więc nie ma z czyjego konta dodać pierwszej osoby.

Instrukcje „jak dodać użytkownika online" opisują **kolejnych** użytkowników, a nie ustanowienie pierwszego. Do pierwszego zawsze potrzebny jest wniosek złożony poza kontem organizacji.

## Oficjalne sposoby złożenia wniosku a ścieżka sprawdzona w praktyce

**Zgodnie z informacją Ministerstwa Finansów** wniosek o dostęp do Konta Organizacji można złożyć również elektronicznie — jako załącznik do pisma ogólnego w e-Urzędzie Skarbowym lub przez ePUAP, podpisany kwalifikowanym podpisem elektronicznym albo profilem zaufanym przez wszystkie osoby reprezentujące spółkę. Jeżeli ta droga jest u Was aktualna i wykonalna (wszyscy reprezentanci mają podpisy i mogą podpisać ten sam plik), można z niej skorzystać.

**W praktyce** dla nowej spółki najmniej niejednoznaczna jest wizyta w urzędzie z papierowym wnioskiem: nie zależy od tego, czy w danym momencie działa podpisanie załącznika, i pozwala od ręki wyjaśnić braki. Nie oznacza to, że droga elektroniczna jest „niewłaściwa" — to kwestia niezawodności przy pierwszym uruchomieniu.

Nie zakładaj też, że pierwszego użytkownika da się „wyklikać" z konta organizacyjnego, do którego nikt nie ma jeszcze dostępu — to niemożliwe.

## Jakie dokumenty zabrać do Urzędu Skarbowego?

Przygotuj:

- **wypełniony wniosek o przyznanie dostępu do Konta Organizacji** (rodzaj dostępu: zwykle rozszerzony dla pierwszej osoby),
- **NIP i numer KRS spółki** oraz aktualny odpis / wydruk z KRS,
- **dokument tożsamości** osoby, która ma zostać wyznaczona jako użytkownik,
- **podpisy zgodne z zasadą reprezentacji spółki** z KRS (jeśli reprezentacja jest łączna — podpisy wszystkich wymaganych osób),
- **dokument pełnomocnictwa**, jeśli wniosek składa osoba inna niż uprawnieni reprezentanci,
- **dane potrzebne do NIP-8**, jeśli chcesz złożyć go przy tej samej wizycie (patrz niżej).

Nie dokładaj „na wszelki wypadek" załączników, których formularz nie wymaga — zakres wymaganych dokumentów potwierdź w aktualnej instrukcji na podatki.gov.pl albo w swoim urzędzie.

## Czy podczas tej samej wizyty można złożyć NIP-8?

Tak — i zwykle warto. **NIP-8 to zgłoszenie danych uzupełniających** spółki wpisanej do KRS: rachunki bankowe, adresy miejsc prowadzenia działalności, miejsce przechowywania dokumentacji rachunkowej, dane kontaktowe, dane biura rachunkowego. Tych informacji KRS nie przekazuje do urzędu automatycznie.

Termin: co do zasady **21 dni od wpisu do KRS** dla danych istotnych dla urzędu skarbowego oraz **7 dni** dla danych niezbędnych dla ZUS (gdy spółka jest płatnikiem składek) lub od zmiany danych. Za niezłożenie w terminie grozi grzywna (kodeks karny skarbowy).

Ważne — i często mylone: **NIP-8 nie jest prawnie zależny od Konta Organizacji**, ale to nie znaczy, że da się go złożyć bez żadnego uprawnienia. Papierowo w urzędzie podpisują go osoby uprawnione do reprezentacji zgodnie z KRS. **Złożenie elektroniczne wymaga sposobu podpisu** — podpisu kwalifikowanego, aktywnego UPL-1 albo podpisania z poziomu kontekstu organizacji w e-US. Zwykły członek zarządu nowej spółki, który nie ma podpisu kwalifikowanego, aktywnego UPL-1 ani dostępu do Konta Organizacji, powinien **zanieść wypełniony NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika** i złożyć oba przy jednej wizycie.

Gdy dostęp do Konta Organizacji już istnieje, NIP-8 składasz wprost z kontekstu organizacji — **nie nadawaj sobie w tym celu UPL-1**. Sam fakt, że w jakiejś spółce udało się złożyć NIP-8 albo UPL-1, nie świadczy o tym, że spółka ma użytkownika Konta Organizacji.

## Konto Organizacji, UPL-1 i KSeF to trzy różne rzeczy

| Mechanizm | Do czego służy | Jak się go uzyskuje |
|---|---|---|
| **Dostęp do Konta Organizacji (UKO)** | Działanie w e-US w imieniu spółki: podgląd deklaracji, JPK, pełnomocnictwa, złożenie ZAW-FA | Wniosek o dostęp do Konta Organizacji (pierwszy użytkownik); kolejni — online przez użytkownika z dostępem rozszerzonym |
| **UPL-1** | Upoważnienie konkretnej osoby do **podpisywania i składania deklaracji** spółki środkami komunikacji elektronicznej (np. JPK_V7, CIT-8) | Formularz UPL-1 do naczelnika US (papierowo lub przez e-US); odwołanie — OPL-1 |
| **Uprawnienia w KSeF** | Wystawianie i odbieranie faktur ustrukturyzowanych w imieniu spółki oraz nadawanie dalszych uprawnień | Pierwsza osoba: ZAW-FA (albo uwierzytelnienie pieczęcią kwalifikowaną); kolejne — wewnątrz KSeF |

To są trzy osobne uprawnienia. Posiadanie jednego z nich nie oznacza posiadania pozostałych.

## Czy UPL-1 daje dostęp do Konta Organizacji? Czy Konto Organizacji zastępuje UPL-1?

Nie w żadną stronę — to dwa różne uprawnienia.

- **UPL-1 nie daje dostępu do Konta Organizacji.** UPL-1 dotyczy podpisywania deklaracji elektronicznych, a nie logowania się do e-US w kontekście spółki. Fakt, że komuś udało się złożyć UPL-1 dla spółki, nie znaczy, że ta osoba ma dostęp do jej Konta Organizacji.
- **Konto Organizacji nie zawsze zastępuje UPL-1.** Użytkownik Konta Organizacji może w e-US wykonywać czynności spółki i podpisywać część dokumentów z poziomu tego konta. UPL-1 pozostaje jednak potrzebny, gdy deklaracje ma podpisywać i składać **inna wyznaczona osoba lub biuro rachunkowe** albo gdy wymaga tego dany proces elektronicznego składania deklaracji. Nie „nadawaj sobie UPL-1", żeby po prostu złożyć dokument, który i tak możesz złożyć jako użytkownik Konta Organizacji.

## Praktyczna uwaga: co może wydarzyć się w e-US

To obserwacja z uruchamiania kilku świeżo zarejestrowanych polskich spółek — bez wskazywania konkretnych osób ani firm.

Ten sam członek zarządu, wpisany w KRS w kilku nowych spółkach, może **widzieć różne opcje dla różnych spółek**:

- w jednej spółce interfejs e-US (ścieżka z poziomu konta osoby prywatnej) **nieoczekiwanie pozwolił** złożyć UPL-1 w imieniu spółki; spółka nadała UPL-1 tej samej osobie z zarządu; po aktywacji UPL-1 osoba ta mogła elektronicznie podpisać i złożyć NIP-8 spółki;
- w innych nowych spółkach, gdzie ta sama osoba również była w zarządzie, e-US **nie zaoferował ani nie pozwolił** wykonać tej samej operacji UPL-1.

Wniosek: to zachowanie interfejsu bywa **niespójne** i nie należy go traktować jako dowodu ogólnej reguły prawnej. Z jednego udanego złożenia UPL-1 nie wynika, że dana osoba miała już dostęp do Konta Organizacji — to osobne uprawnienie. Bezpieczny plan to ustanowić dostęp do Konta Organizacji wprost (wnioskiem) i przygotować NIP-8 na tę samą wizytę w urzędzie, niezależnie od tego, co akurat pokaże interfejs.

## Dlaczego dla jednej spółki można było wysłać UPL-1, a dla innej nie?

Nie ma na to pewnej, ogólnej odpowiedzi. W praktyce zależy to od stanu powiązań danej spółki w systemach e-US w danym momencie i od tego, jaką ścieżkę udostępnia interfejs. Kluczowe jest to, **czego z tego nie wolno wnioskować**: pojedyncze udane (lub nieudane) złożenie UPL-1 nie mówi nic o tym, czy spółka ma użytkownika Konta Organizacji ani czy ma uprawnienia w KSeF. Traktuj to jako wyjątkowo dostępną drogę, a nie standard.

## Jak po uzyskaniu Konta Organizacji złożyć ZAW-FA?

Gdy działasz już z poziomu Konta Organizacji spółki, **ZAW-FA** wyznacza pierwszą osobę fizyczną z uprawnieniami do zarządzania uprawnieniami w KSeF (uprawnienia „właścicielskie"). ZAW-FA można złożyć papierowo (osobiście lub pocztą) albo elektronicznie przez e-Urząd Skarbowy. Po skutecznym ZAW-FA ta osoba loguje się do KSeF, może wystawiać i odbierać faktury oraz nadawać dalsze uprawnienia — w tym token/certyfikat dla aplikacji takiej jak KsięgaI i dostęp dla biura rachunkowego. Szczegóły: [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

## Czy spółka z pieczęcią kwalifikowaną potrzebuje ZAW-FA?

Jeśli spółka ma odpowiednią **pieczęć kwalifikowaną** (zawierającą NIP), może uwierzytelnić się w KSeF bez ZAW-FA i wyznaczyć pierwszą osobę fizyczną bezpośrednio w systemie. To alternatywna droga, a nie główny scenariusz dla zwykłej, małej, świeżo zarejestrowanej spółki — te zwykle pieczęci nie mają i idą ścieżką ZAW-FA.

## Jak nadać dostęp kolejnej osobie lub księgowej?

Gdy pierwszy użytkownik z **dostępem rozszerzonym** już działa:

- **kolejnych użytkowników e-US** dodajesz online: w kontekście spółki wejdź w „Dane organizacji → Użytkownicy" i nadaj dostęp (podstawowy lub rozszerzony);
- **biuro rachunkowe do podpisywania deklaracji** — przez **UPL-1** (biuro składa je samodzielnie albo Ty w e-US), niezależnie od Konta Organizacji;
- **biuro rachunkowe do obsługi faktur w KSeF** — przez uprawnienia w KSeF nadane po stronie NIP biura, już po ZAW-FA / pierwszym uwierzytelnieniu spółki w KSeF.

## Kolejność kroków dla nowej spółki

1. Rejestracja spółki i nadanie NIP (wpis do KRS).
2. **Pierwszy użytkownik Konta Organizacji** — wniosek o dostęp (dla nowej spółki: najpewniej osobiście w US).
3. Praca w **kontekście spółki** w e-US.
4. **NIP-8** — dane uzupełniające (termin 21 dni od wpisu do KRS; można złożyć przy tej samej wizycie).
5. **ZAW-FA** — pierwsza osoba z uprawnieniami w KSeF (albo uwierzytelnienie pieczęcią kwalifikowaną).
6. **Dalsze uprawnienia w KSeF** — dla osób, biura rachunkowego, aplikacji.
7. **Połączenie z KsięgaI** — token/certyfikat KSeF wklejony w ustawieniach firmy.

## Zastrzeżenie

Stan na 7 września 2026 r. Procedury e-Urzędu Skarbowego i KSeF bywają zmieniane — przed działaniem sprawdź aktualne instrukcje na podatki.gov.pl i ksef.podatki.gov.pl. KsięgaI to oprogramowanie do prowadzenia firmy i fakturowania, a nie doradztwo podatkowe ani prawne; w sprawach wątpliwych skonsultuj się z księgową, doradcą podatkowym lub właściwym urzędem.`,
    checklist: [
      'Ustal, kto (zgodnie z reprezentacją z KRS) wystąpi o dostęp i kto ma być pierwszym użytkownikiem Konta Organizacji.',
      'Wypełnij „Wniosek o przyznanie dostępu do Konta Organizacji w e-Urzędzie Skarbowym" — dla pierwszej osoby zaznacz dostęp rozszerzony.',
      'Przygotuj odpis z KRS, NIP i KRS spółki, dokument tożsamości osoby wyznaczanej oraz pełnomocnictwo, jeśli wniosek składa ktoś inny niż reprezentanci.',
      'Zbierz dane do NIP-8: rachunki bankowe, adresy działalności, miejsce przechowywania dokumentacji, dane kontaktowe, dane biura rachunkowego.',
      'Złóż wniosek o dostęp do Konta Organizacji — dla nowej spółki najpewniej osobiście w placówce właściwego US.',
      'Przy tej samej wizycie złóż NIP-8 (termin: 21 dni od wpisu do KRS), jeśli nie został jeszcze skutecznie złożony.',
      'Po aktywacji dostępu przełącz się na kontekst spółki w e-US i sprawdź podgląd deklaracji, JPK i sekcję „Użytkownicy".',
      'Złóż ZAW-FA, aby wyznaczyć pierwszą osobę z uprawnieniami w KSeF (lub uwierzytelnij spółkę pieczęcią kwalifikowaną).',
      'Nadaj dalsze uprawnienia: kolejni użytkownicy e-US online, biuro rachunkowe przez UPL-1, obsługa faktur przez uprawnienia w KSeF.',
      'Wygeneruj token/certyfikat KSeF i połącz spółkę z KsięgaI.',
    ],
    official_links: [
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
      { label: 'Konto Organizacji — zasady (podatki.gov.pl)', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'Wniosek o przyznanie/odebranie dostępu do Konta Organizacji (PDF)', href: 'https://www.podatki.gov.pl/media/ckdf0mxs/wniosek-o-przyznanie-dost%C4%99pu_odebranie-dost%C4%99pu-do-konta-organizacji-w-e-urzedzie-skarbowym-2.pdf', external: true },
      { label: 'Jak dodać lub odebrać użytkownikowi dostęp do Konta Organizacji', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/pytania-i-odpowiedzi/konto-organizacji/8-jak-zlozyc-wniosek-o-przyznanie-lub-odebranie-uzytkownikowi-dostepu-do-konta-organizacji', external: true },
      { label: 'ZAW-FA — formularz (PDF)', href: 'https://ksef.podatki.gov.pl/media/em1k4cmk/zaw-fa.pdf', external: true },
      { label: 'Biznes.gov.pl — zgłoszenie NIP-8', href: 'https://www.biznes.gov.pl/pl/portal/ou1478', external: true },
      { label: 'UPL-1 — pełnomocnictwo do podpisywania deklaracji elektronicznych', href: 'https://www.gov.pl/web/gov/wyznacz-pelnomocnika-do-podpisywania-elektronicznej-deklaracji-podatkowej', external: true },
    ],
    related_actions: [
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'NIP-8 po rejestracji spółki z o.o.', href: '/poradnik/nip-8-spolka-zoo' },
      { label: 'Pierwsze obowiązki po założeniu spółki z o.o.', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'e-Urząd Skarbowy — konto prywatne a konto organizacji', href: '/poradnik/e-urzad' },
    ],
    faq: [
      {
        question: 'Czy członek zarządu automatycznie widzi nową spółkę w e-Urzędzie Skarbowym?',
        answer: 'Nie. Wpis w KRS wskazuje, kto może wystąpić o dostęp do Konta Organizacji, ale nie czyni tej osoby użytkownikiem konta. Nawet pełnomocnik ogólny bez osobnego dodania jako użytkownik nie ma dostępu do Konta Organizacji.',
      },
      {
        question: 'Jak ustanowić pierwszego użytkownika Konta Organizacji nowej spółki?',
        answer: 'Przez „Wniosek o przyznanie dostępu do Konta Organizacji w e-Urzędzie Skarbowym", podpisany zgodnie z reprezentacją spółki z KRS i złożony w urzędzie skarbowym właściwym w sprawach ewidencji. Dla nowej spółki najpewniejszą drogą jest złożenie wniosku osobiście w placówce US. Oficjalnie dopuszczalna jest też droga elektroniczna (pismo ogólne w e-US lub ePUAP z podpisem kwalifikowanym albo profilem zaufanym).',
      },
      {
        question: 'Dlaczego pierwszego użytkownika nie można dodać online?',
        answer: 'Dodawanie użytkowników działa tylko wewnątrz Konta Organizacji i tylko dla osoby z dostępem rozszerzonym. W nowej spółce nikt takiego dostępu nie ma, więc nie ma z czyjego konta dodać pierwszej osoby. Instrukcje „dodaj użytkownika online" opisują kolejnych, a nie pierwszego użytkownika.',
      },
      {
        question: 'Czy złożenie NIP-8 wymaga dostępu do Konta Organizacji?',
        answer: 'NIP-8 nie jest prawnie zależny od Konta Organizacji, ale złożenie elektroniczne i tak wymaga sposobu podpisu (podpis kwalifikowany, aktywny UPL-1 albo podpisanie z kontekstu organizacji w e-US). Członek zarządu nowej spółki bez żadnego z tych narzędzi powinien złożyć NIP-8 papierowo w urzędzie — najlepiej razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika. Termin to co do zasady 21 dni od wpisu do KRS (7 dni dla danych potrzebnych ZUS lub od zmiany danych).',
      },
      {
        question: 'Czy UPL-1 daje dostęp do Konta Organizacji?',
        answer: 'Nie. UPL-1 to pełnomocnictwo do podpisywania i składania deklaracji elektronicznych, a nie dostęp do e-US w kontekście spółki. Możliwość złożenia UPL-1 nie oznacza, że dana osoba ma dostęp do Konta Organizacji.',
      },
      {
        question: 'Dlaczego dla jednej spółki dało się złożyć UPL-1 online, a dla innej nie?',
        answer: 'To niespójne zachowanie interfejsu e-US, zależne od stanu powiązań danej spółki i udostępnionej ścieżki. Nie jest to reguła prawna. Nie należy z tego wnioskować, że spółka ma użytkownika Konta Organizacji ani uprawnienia w KSeF.',
      },
      {
        question: 'Czy spółka z pieczęcią kwalifikowaną musi składać ZAW-FA?',
        answer: 'Nie, jeśli pieczęć zawiera NIP — wtedy spółka uwierzytelnia się w KSeF bezpośrednio i wyznacza pierwszą osobę fizyczną w systemie. Zwykłe nowe małe spółki najczęściej pieczęci nie mają i idą ścieżką ZAW-FA.',
      },
      {
        question: 'Jak nadać dostęp kolejnej osobie lub księgowej?',
        answer: 'Kolejnych użytkowników e-US dodaje online użytkownik z dostępem rozszerzonym w „Dane organizacji → Użytkownicy". Biuro rachunkowe do podpisywania deklaracji dostaje UPL-1. Obsługę faktur w KSeF nadaje się osobno w KSeF, po ZAW-FA lub pierwszym uwierzytelnieniu spółki.',
      },
    ],
    article_type: 'guide',
    sort_order: 25,
    published_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[1],
  },

  {
    id: 'fallback-nip8-spolka',
    slug: 'nip-8-spolka-zoo',
    title: 'NIP-8 po rejestracji spółki z o.o. — termin, dane uzupełniające i jak złożyć',
    excerpt: 'Wpis do KRS i nadanie NIP nie przekazują urzędowi wszystkiego. NIP-8 uzupełnia dane spółki — masz na to co do zasady 21 dni od wpisu do KRS. NIP-8 nie jest prawnie zależny od Konta Organizacji, ale złożenie elektroniczne wymaga sposobu podpisu.',
    summary: 'Kiedy spółka z o.o. składa NIP-8 (termin 21 dni od wpisu do KRS, 7 dni dla danych ZUS), jakie dane uzupełniające trzeba podać, jak i gdzie go złożyć oraz jak to się ma do Konta Organizacji i UPL-1 (osobne mechanizmy, ale do złożenia elektronicznego i tak potrzebny jest podpis).',
    purpose: 'Właściciele spółek zakładają, że po KRS i nadaniu NIP nic więcej nie trzeba robić — a NIP-8 ma termin i sankcję. Ten artykuł porządkuje, co i kiedy zgłosić oraz rozdziela NIP-8 od Konta Organizacji i UPL-1.',
    body_markdown: `## Co to jest NIP-8

NIP-8 to **zgłoszenie danych uzupełniających** podmiotu wpisanego do KRS. Wpis do KRS i automatyczne nadanie NIP oraz REGON to za mało, żeby urząd skarbowy, GUS i ZUS miały komplet informacji o spółce. NIP-8 dopina dane operacyjne, których KRS nie przekazuje.

## Kiedy złożyć NIP-8 — termin

Termin liczy się od dnia wpisu spółki do KRS:

- **21 dni** — na dane istotne dla urzędu skarbowego i statystyki publicznej,
- **7 dni** — na dane niezbędne dla ZUS, gdy spółka jest płatnikiem składek, oraz na zgłoszenie zmiany danych, gdy zmiana nastąpi później.

Za niezłożenie zgłoszenia identyfikacyjnego lub aktualizacyjnego w terminie grozi grzywna na podstawie Kodeksu karnego skarbowego. Nie odkładaj NIP-8 „na później".

## Jakie dane trafiają do NIP-8

Dane uzupełniające, których nie ma w KRS, m.in.:

- numery **rachunków bankowych** spółki (firmowych),
- **adresy miejsc prowadzenia działalności** inne niż sama siedziba,
- **miejsce przechowywania dokumentacji rachunkowej**,
- **dane kontaktowe** (telefon, e-mail),
- dane **biura rachunkowego** lub jednostki prowadzącej księgowość,
- ewentualny szczególny status podatkowy.

## Gdzie i jak złożyć NIP-8

NIP-8 kierujesz do **naczelnika urzędu skarbowego właściwego ze względu na siedzibę spółki**. Możesz go złożyć:

- **papierowo** w urzędzie (osobiście) — formularz podpisują osoby uprawnione do reprezentacji spółki zgodnie z KRS,
- **elektronicznie** przez e-Urząd Skarbowy — wtedy potrzebny jest sposób podpisu: podpis kwalifikowany, aktywne UPL-1 albo podpisanie z poziomu kontekstu organizacji w e-US.

**NIP-8 nie jest prawnie zależny od Konta Organizacji — ale to nie jest cała instrukcja.** Zwykły członek zarządu świeżo zarejestrowanej spółki, który nie ma podpisu kwalifikowanego, aktywnego UPL-1 ani dostępu do Konta Organizacji, nie złoży NIP-8 elektronicznie. W tej sytuacji **zanieś wypełniony NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika** i złóż oba przy jednej wizycie.

Gdy dostęp do Konta Organizacji już istnieje, NIP-8 składasz wprost z kontekstu organizacji — **nie nadawaj sobie w tym celu UPL-1**.

## NIP-8, Konto Organizacji i UPL-1 — nie myl tych pojęć

- **NIP-8** to zgłoszenie danych spółki. Nie daje żadnego dostępu ani uprawnień.
- **Dostęp do Konta Organizacji** to możliwość działania w e-US w imieniu spółki. Pierwszego użytkownika wyznacza się osobnym wnioskiem — [opisujemy to w przewodniku o Koncie Organizacji dla nowej spółki](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka).
- **UPL-1** to pełnomocnictwo do podpisywania deklaracji elektronicznych. Fakt, że komuś udało się złożyć UPL-1 albo NIP-8 dla spółki, **nie dowodzi**, że ta osoba ma dostęp do Konta Organizacji.

W praktyce zdarza się, że interfejs e-US dla jednej nowej spółki pozwoli tej samej osobie z zarządu złożyć UPL-1, a dla innej nie. To niespójne zachowanie systemu, a nie reguła — nie planuj wokół niego procesu. Bezpiecznie: dane do NIP-8 przygotuj na wizytę w urzędzie.

## Praktyczna kolejność po założeniu spółki

1. Sprawdź, że spółka ma wpis do KRS i nadany NIP.
2. Zbierz dane uzupełniające: rachunki bankowe, adresy, miejsce przechowywania dokumentacji, dane kontaktowe, dane biura rachunkowego.
3. Ustal, czym podpiszesz NIP-8: podpis kwalifikowany lub aktywne UPL-1 → możesz elektronicznie; brak jednego i drugiego oraz brak dostępu do Konta Organizacji → złóż papierowo w urzędzie.
4. Nową spółką bez tych narzędzi: zanieś NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika i złóż oba przy jednej wizycie (termin NIP-8: 21 dni od wpisu do KRS).
5. Gdy masz już dostęp do Konta Organizacji: złóż NIP-8 wprost z kontekstu organizacji — nie nadawaj sobie w tym celu UPL-1.
6. Aktualizuj NIP-8 przy każdej zmianie danych (np. nowy rachunek, zmiana biura) — w terminie 7 dni od zmiany.`,
    checklist: [
      'Sprawdź, że spółka ma wpis do KRS i nadany NIP.',
      'Ustal termin: 21 dni od wpisu do KRS (7 dni dla danych potrzebnych ZUS lub od zmiany danych).',
      'Zbierz numery firmowych rachunków bankowych spółki oraz pozostałe dane uzupełniające.',
      'Spisz adresy miejsc prowadzenia działalności i miejsce przechowywania dokumentacji rachunkowej.',
      'Przygotuj dane kontaktowe spółki i dane biura rachunkowego.',
      'Ustal sposób podpisu: podpis kwalifikowany / aktywne UPL-1 → elektronicznie; bez nich i bez dostępu do Konta Organizacji → papierowo w urzędzie.',
      'Nową spółką bez podpisu kwalifikowanego i UPL-1: złóż NIP-8 papierowo razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika, przy jednej wizycie.',
      'Gdy masz już dostęp do Konta Organizacji: złóż NIP-8 z kontekstu organizacji, bez nadawania sobie UPL-1.',
      'Ustaw przypomnienie o aktualizacji NIP-8 przy każdej zmianie danych (7 dni).',
    ],
    official_links: [
      { label: 'Biznes.gov.pl — zgłoszenie NIP-8', href: 'https://www.biznes.gov.pl/pl/portal/ou1478', external: true },
      { label: 'Formularze podatkowe (NIP-8)', href: 'https://www.podatki.gov.pl/formularze-podatkowe/', external: true },
    ],
    related_actions: [
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'e-Doręczenia dla spółki z o.o.', href: '/poradnik/e-doreczenia-spolka' },
      { label: 'Pierwsze obowiązki po założeniu spółki z o.o.', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Ile czasu na złożenie NIP-8 po rejestracji spółki?',
        answer: 'Co do zasady 21 dni od dnia wpisu do KRS na dane istotne dla urzędu skarbowego, a 7 dni na dane niezbędne dla ZUS (gdy spółka jest płatnikiem składek) oraz na późniejsze zmiany danych. Za spóźnienie grozi grzywna.',
      },
      {
        question: 'Czy do złożenia NIP-8 potrzebuję dostępu do Konta Organizacji?',
        answer: 'NIP-8 nie jest prawnie zależny od Konta Organizacji, ale to nie cała instrukcja: złożenie elektroniczne wymaga sposobu podpisu (podpis kwalifikowany, aktywne UPL-1 albo podpisanie z kontekstu organizacji w e-US). Zwykły członek zarządu nowej spółki bez żadnego z tych narzędzi powinien złożyć NIP-8 papierowo w urzędzie — najlepiej razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika, przy jednej wizycie.',
      },
      {
        question: 'Czy możliwość złożenia UPL-1 lub NIP-8 oznacza, że mam dostęp do Konta Organizacji?',
        answer: 'Nie. To trzy odrębne mechanizmy. Złożenie UPL-1 albo NIP-8 nie jest dowodem posiadania dostępu do Konta Organizacji.',
      },
      {
        question: 'Jakie dane najczęściej zgłasza się przez NIP-8?',
        answer: 'Numery firmowych rachunków bankowych, adresy miejsc prowadzenia działalności, miejsce przechowywania dokumentacji rachunkowej, dane kontaktowe i dane biura rachunkowego — czyli to, czego KRS nie przekazuje urzędowi.',
      },
    ],
    article_type: 'guide',
    sort_order: 18,
    published_at: '2026-05-25T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[3],
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
    id: 'fallback-crbr-alias-beneficjent-rzeczywisty',
    slug: 'crbr-spolka-zoo-beneficjent-rzeczywisty',
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
    sort_order: 11,
    published_at: '2026-05-16T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
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
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'Jak nadać biuru rachunkowemu dostęp do KSeF',
    excerpt: 'Biuro rachunkowe może dostać dostęp do Twojego KSeF przez swój NIP — bez udostępniania tokena ani loginu.',
    summary: 'Instrukcja nadania dostępu do KSeF dla biura rachunkowego lub księgowej przez mechanizm NIP — inny niż token używany przez aplikacje.',
    purpose: 'Dwa najczęstsze pytania po połączeniu z KSeF to: jak dać dostęp biuru rachunkowemu i dlaczego to jest inaczej niż token. Ten poradnik wyjaśnia różnicę i prowadzi przez kroki.',
    body_markdown: `## Zanim nadasz dostęp — spółka musi być już w KSeF

Ten poradnik zakłada, że Twoja firma ma już pierwszą osobę z uprawnieniami w KSeF. W **spółce z o.o.** oznacza to wcześniejszą ścieżkę: pierwszy użytkownik [Konta Organizacji w e-US](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka) → [ZAW-FA](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep) (albo uwierzytelnienie pieczęcią kwalifikowaną z NIP) → pierwsze wejście do KSeF. Dopiero wtedy jest z czego nadawać dostęp biuru. Dostęp biura do e-US w sprawach deklaracji to osobna rzecz — pełnomocnictwo **UPL-1**, nie KSeF.

## Dwa sposoby dostępu do KSeF

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
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
    ],
    faq: [
      {
        question: 'Czy w nowej spółce mogę od razu nadać biuru dostęp do KSeF?',
        answer: 'Nie. Najpierw spółka musi mieć pierwszą osobę z uprawnieniami w KSeF: Konto Organizacji w e-US → ZAW-FA (albo pieczęć kwalifikowana z NIP) → pierwsze wejście do KSeF. Dopiero wtedy jest z czego nadawać dostęp biuru.',
      },
      {
        question: 'Czy dostęp biura do KSeF to to samo co UPL-1?',
        answer: 'Nie. UPL-1 upoważnia biuro do podpisywania i składania deklaracji w e-US. Dostęp do faktur w KSeF to osobne uprawnienie nadawane w KSeF po stronie NIP biura.',
      },
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
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  // ─── KSeF dla JDG ────────────────────────────────────────────────────────────
  {
    id: 'fallback-ksef-jdg',
    slug: 'ksef-dla-jdg-jak-zaczac',
    entityTypes: ['jdg'],
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
    title: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej — Konto Organizacji i ZAW-FA',
    h1: 'KSeF dla nowej spółki z o.o. — od Konta Organizacji przez ZAW-FA do połączenia z aplikacją',
    excerpt: 'Nowa spółka z o.o. bez pieczęci kwalifikowanej wchodzi do KSeF w ustalonej kolejności: najpierw pierwszy użytkownik Konta Organizacji w e-US, potem ZAW-FA, potem dalsze uprawnienia w KSeF i token dla aplikacji.',
    summary: 'Jak spółka z o.o. bez kwalifikowanej pieczęci autoryzuje się w KSeF: rola Konta Organizacji w e-US, złożenie ZAW-FA dla pierwszej osoby, dalsze uprawnienia w KSeF, certyfikat/token dla aplikacji i dostęp dla biura rachunkowego — z rozdzieleniem tych pojęć. Alternatywa z pieczęcią kwalifikowaną opisana osobno.',
    purpose: 'Ten artykuł zaczyna się tam, gdzie kończy się problem „spółka nie widzi się w e-US". Zakłada, że pierwszy użytkownik Konta Organizacji jest już wyznaczony, i prowadzi przez autoryzację w KSeF, nie powielając całego przewodnika o Koncie Organizacji.',
    body_markdown: `## Ten artykuł zaczyna się po rozwiązaniu problemu z e-US

Autoryzacja spółki w KSeF ma sens dopiero wtedy, gdy spółka może działać w e-Urzędzie Skarbowym we własnym kontekście. Jeśli nowa spółka nie pojawia się w e-US, najpierw wyznacz **pierwszego użytkownika Konta Organizacji** — opisujemy to krok po kroku w osobnym przewodniku: [Konto Organizacji w e-US dla nowej spółki z o.o.](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka). Tutaj zakładamy, że ten etap jest już za Wami.

## Sześć pojęć, których nie wolno mylić

| Pojęcie | Co to jest |
|---|---|
| **Dostęp do Konta Organizacji (UKO)** | Możliwość działania w e-US w imieniu spółki. Warunek wstępny, nie część KSeF. |
| **UPL-1** | Pełnomocnictwo do podpisywania i składania **deklaracji** elektronicznych spółki. Dotyczy deklaracji, nie KSeF. |
| **ZAW-FA** | Zawiadomienie, którym spółka wyznacza **pierwszą osobę fizyczną** z uprawnieniami do zarządzania uprawnieniami w KSeF. |
| **Dalsze uprawnienia w KSeF** | Uprawnienia nadawane **wewnątrz KSeF** kolejnym osobom i podmiotom przez osobę wyznaczoną w ZAW-FA. |
| **Certyfikat / token KSeF** | Poświadczenie dla **aplikacji** (np. KsięgaI), żeby działała w imieniu spółki w KSeF. |
| **Dostęp dla biura rachunkowego** | Uprawnienie w KSeF nadane po stronie NIP biura — biuro obsługuje faktury z własnych narzędzi. |

Posiadanie jednego z tych elementów nie oznacza posiadania pozostałych. Samo bycie w KRS nie daje żadnego z nich automatycznie.

## Właściwa kolejność dla nowej spółki bez pieczęci kwalifikowanej

1. **Rejestracja i NIP** — spółka wpisana do KRS, nadany NIP.
2. **Pierwszy użytkownik Konta Organizacji** — wyznaczony wnioskiem w urzędzie skarbowym (dla nowej spółki zwykle osobiście).
3. **Kontekst spółki w e-US** — użytkownik przełącza się na Konto Organizacji i widzi sprawy spółki.
4. **ZAW-FA** — spółka wyznacza pierwszą osobę fizyczną z uprawnieniami w KSeF (uprawnienia „właścicielskie").
5. **Pierwsza osoba z dostępem do KSeF** — po skutecznym ZAW-FA loguje się do KSeF i może wystawiać oraz odbierać faktury.
6. **Dalsze uprawnienia w KSeF** — ta osoba nadaje w KSeF dostęp kolejnym pracownikom i biuru rachunkowemu (po stronie NIP biura).
7. **Połączenie z KsięgaI** — certyfikat/token KSeF wygenerowany dla spółki i wklejony w ustawieniach firmy w KsięgaI.

## Co robi ZAW-FA i jak je złożyć

**ZAW-FA** (zawiadomienie o nadaniu lub odebraniu uprawnień do korzystania z KSeF) służy podmiotom, które nie mogą samodzielnie uwierzytelnić się w KSeF pieczęcią kwalifikowaną. Zawiadomienie:

- wyznacza **pierwszą osobę fizyczną**, która w imieniu spółki będzie zarządzać uprawnieniami w KSeF,
- składa się do **naczelnika urzędu skarbowego** — papierowo (osobiście lub pocztą) albo elektronicznie przez e-Urząd Skarbowy; dopuszczalne jest też złożenie przez e-Doręczenia z podpisem elektronicznym,
- po skutecznym przyjęciu daje wskazanej osobie pełny dostęp do wystawiania i odbierania faktur oraz do nadawania dalszych uprawnień.

Uprawnienia nadane przez ZAW-FA oraz domyślne uprawnienia „właścicielskie" przypisane do NIP są uznawane także w KSeF 2.0.

## Alternatywa: spółka z pieczęcią kwalifikowaną

Jeśli spółka ma **kwalifikowaną pieczęć elektroniczną zawierającą NIP**, może uwierzytelnić się w KSeF bezpośrednio, bez ZAW-FA, i od razu wyznaczyć pierwszą osobę fizyczną z uprawnieniami. Uwaga: pieczęć kwalifikowana **bez numeru NIP** nie wystarcza do samodzielnego uwierzytelnienia — wtedy i tak potrzebne jest ZAW-FA.

To rozwiązanie dla podmiotów, które pieczęć już mają (często większe organizacje). Zwykła, mała, świeżo zarejestrowana spółka z o.o. przeważnie pieczęci nie ma i idzie ścieżką ZAW-FA opisaną wyżej.

## Dalsze uprawnienia i dostęp dla biura rachunkowego

Po tym, jak pierwsza osoba działa już w KSeF, nadaje ona **wewnątrz KSeF**:

- dostęp innym osobom fizycznym w spółce (np. dział finansowy),
- dostęp **biuru rachunkowemu po stronie jego NIP** — biuro loguje się do własnego KSeF i widzi spółkę na liście podmiotów; nie potrzebuje tokena ani hasła spółki,
- **certyfikat/token** dla aplikacji takiej jak KsięgaI do automatycznej wysyłki i synchronizacji faktur.

Zakres uprawnień (odczyt, wystawianie, pełny) ustalasz przy nadawaniu. Szczegóły nadawania dostępu biuru: [Jak nadać biuru rachunkowemu dostęp do KSeF](/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej).

## Zmiana zarządu

Zmiany w KRS nie porządkują automatycznie uprawnień w e-US ani w KSeF. Po zmianie zarządu:

- nowa osoba uprawniona do reprezentacji powinna zostać **użytkownikiem Konta Organizacji** (wnioskiem lub online, jeśli jest już użytkownik z dostępem rozszerzonym),
- przejrzyj uprawnienia w KSeF i odbierz dostęp osobom, które odeszły,
- sprawdź ważność certyfikatów/tokenów i w razie potrzeby wygeneruj nowe.

## Zastrzeżenie

Stan na 7 września 2026 r. Zasady KSeF i e-Urzędu Skarbowego bywają zmieniane — przed działaniem sprawdź aktualne instrukcje na ksef.podatki.gov.pl i podatki.gov.pl. KsięgaI to oprogramowanie do fakturowania i prowadzenia firmy, a nie doradztwo podatkowe ani prawne; w sprawach wątpliwych skonsultuj się z księgową, doradcą podatkowym lub urzędem.`,
    checklist: [
      'Upewnij się, że spółka ma już wyznaczonego pierwszego użytkownika Konta Organizacji i działa we własnym kontekście w e-US.',
      'Ustal, która osoba fizyczna ma zostać wskazana w ZAW-FA jako pierwsza z uprawnieniami w KSeF.',
      'Złóż ZAW-FA do naczelnika US (papierowo lub przez e-US) — albo, jeśli spółka ma pieczęć kwalifikowaną z NIP, pomiń ZAW-FA i uwierzytelnij się w KSeF bezpośrednio.',
      'Po skutecznym ZAW-FA zaloguj wskazaną osobę do KSeF i sprawdź, że może wystawiać i odbierać faktury.',
      'Nadaj w KSeF dalsze uprawnienia: pracownikom oraz biuru rachunkowemu po stronie jego NIP.',
      'Wygeneruj certyfikat/token KSeF dla spółki i skopiuj go od razu.',
      'Wklej token do ustawień KSeF w KsięgaI i sprawdź status połączenia.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'ZAW-FA — formularz (PDF)', href: 'https://ksef.podatki.gov.pl/media/em1k4cmk/zaw-fa.pdf', external: true },
      { label: 'KSeF — uprawnienia i autoryzacja', href: 'https://ksef.podatki.gov.pl/ksef-news/uprawnienia-i-autoryzacja/', external: true },
      { label: 'Podręcznik KSeF 2.0 — rozpoczęcie korzystania (PDF)', href: 'https://ksef.podatki.gov.pl/media/cq3laefg/podrecznik-ksef-2-0-cz-i-rozpoczecie-korzystania-z-ksef.pdf', external: true },
    ],
    related_actions: [
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'Jak nadać biuru rachunkowemu dostęp do KSeF', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'Jak zdobyć token KSeF i podłączyć firmę do KsięgaI', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'Pierwsze obowiązki po założeniu spółki z o.o.', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy sama obecność w KRS wystarcza, żeby wejść do KSeF spółki?',
        answer: 'Nie. Wpis w KRS wskazuje, kto może uruchomić proces po stronie spółki. Przed pierwszym wejściem do KSeF potrzebny jest dostęp do Konta Organizacji w e-US, a następnie ZAW-FA (albo uwierzytelnienie pieczęcią kwalifikowaną z NIP).',
      },
      {
        question: 'Czy spółka z pieczęcią kwalifikowaną musi składać ZAW-FA?',
        answer: 'Nie, jeśli pieczęć zawiera NIP — spółka uwierzytelnia się w KSeF bezpośrednio i wyznacza pierwszą osobę fizyczną w systemie. Pieczęć bez NIP nie wystarcza i wtedy ZAW-FA jest potrzebne.',
      },
      {
        question: 'Czy Konto Organizacji, UPL-1 i ZAW-FA to to samo?',
        answer: 'Nie. Konto Organizacji to dostęp do e-US w imieniu spółki. UPL-1 to pełnomocnictwo do podpisywania deklaracji. ZAW-FA wyznacza pierwszą osobę z uprawnieniami w KSeF. To trzy odrębne mechanizmy.',
      },
      {
        question: 'Kiedy mogę wygenerować token KSeF do KsięgaI?',
        answer: 'Po tym, jak spółka ma pierwszą osobę z uprawnieniami w KSeF (po ZAW-FA lub uwierzytelnieniu pieczęcią). Certyfikat/token dla aplikacji nadaje się na końcu, nie na początku.',
      },
      {
        question: 'Jak biuro rachunkowe dostaje dostęp do KSeF spółki?',
        answer: 'Przez uprawnienie nadane w KSeF po stronie NIP biura — po tym, jak spółka przeszła ścieżkę Konto Organizacji → ZAW-FA → pierwsza osoba w KSeF. Biuro nie potrzebuje tokena ani hasła spółki.',
      },
    ],
    article_type: 'guide',
    sort_order: 40,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
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
- **Konto Organizacji w e-Urzędzie Skarbowym** — żeby działać w e-US w imieniu spółki, trzeba **wyznaczyć pierwszego użytkownika Konta Organizacji**. Sama reprezentacja w KRS nie daje tego dostępu i samo czekanie zwykle nic nie zmienia — dla nowej spółki najpewniejszą drogą jest złożenie wniosku o dostęp osobiście w urzędzie. Krok po kroku: [Konto Organizacji w e-US dla nowej spółki z o.o.](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka).

## NIP-8 — dane uzupełniające (termin 21 dni)

**NIP-8** zgłasza dane, których KRS nie przekazuje urzędowi: firmowe rachunki bankowe, adresy miejsc prowadzenia działalności, miejsce przechowywania dokumentacji, dane kontaktowe, dane biura rachunkowego. Termin to co do zasady **21 dni od wpisu do KRS** (7 dni dla danych potrzebnych ZUS). NIP-8 nie jest prawnie zależny od Konta Organizacji, ale złożenie elektroniczne wymaga sposobu podpisu (podpis kwalifikowany, aktywne UPL-1 albo podpisanie z kontekstu organizacji w e-US). Zwykły członek zarządu bez tych narzędzi: **zanieś NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika** i złóż oba przy jednej wizycie. Szczegóły: [NIP-8 po rejestracji spółki z o.o.](/poradnik/nip-8-spolka-zoo).

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
- ustalić, kto po stronie spółki uruchomi ścieżkę do KSeF: Konto Organizacji w e-US → **ZAW-FA** (wyznaczenie pierwszej osoby z uprawnieniami w KSeF) → dalsze uprawnienia
- zapytać biuro rachunkowe, czy ma własny system obsługi KSeF
- wybrać aplikację fakturową (np. KsięgaI), która jest KSeF-ready

Pełna kolejność dla spółki: [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

## Organizacja dokumentów od pierwszego dnia

Spółka z o.o. prowadzi pełną księgowość. Każda faktura, umowa i wyciąg bankowy musi trafić do biura rachunkowego lub systemu. Zacznij porządkować dokumenty od razu — nawet jeśli pierwsza faktura pojawi się za miesiąc.

Warto ustalić z biurem rachunkowym jaki jest preferowany sposób przekazywania dokumentów i w jakiej formie.`,
    checklist: [
      'Zgłoś beneficjentów rzeczywistych do CRBR — priorytet i termin ustawowy.',
      'Otwórz firmowe konto bankowe i wpłać kapitał zakładowy jeśli jeszcze nie zrobiono.',
      'Aktywuj adres do e-Doręczeń i ustal kto będzie monitorować skrzynkę.',
      'Wyznacz pierwszego użytkownika Konta Organizacji w e-US (wniosek o dostęp — dla nowej spółki zwykle osobiście w urzędzie).',
      'Złóż NIP-8 z danymi uzupełniającymi w terminie 21 dni od wpisu do KRS — papierowo przy tej samej wizycie w urzędzie, jeśli nie masz podpisu kwalifikowanego ani aktywnego UPL-1.',
      'Zdecyduj o rejestracji VAT i złóż formularz VAT-R jeśli potrzebne.',
      'Ustal z biurem rachunkowym status ZUS wspólników.',
      'Ustal, kto uruchomi ścieżkę do KSeF: Konto Organizacji → ZAW-FA → dalsze uprawnienia.',
      'Ustal z biurem rachunkowym sposób przekazywania dokumentów.',
    ],
    official_links: [
      { label: 'CRBR — rejestracja', href: 'https://www.podatki.gov.pl/crbr/', external: true },
      { label: 'e-Doręczenia dla przedsiębiorcy', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
      { label: 'Konto Organizacji w e-Urzędzie Skarbowym', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'Biznes.gov.pl — zgłoszenie NIP-8', href: 'https://www.biznes.gov.pl/pl/portal/ou1478', external: true },
    ],
    related_actions: [
      { label: 'Poradnik CRBR — co zgłosić', href: '/poradnik/crbr-spolka-zoo-co-zglosic' },
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'NIP-8 po rejestracji spółki z o.o.', href: '/poradnik/nip-8-spolka-zoo' },
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'Ile czasu mam na zgłoszenie do CRBR po rejestracji spółki?',
        answer: 'Termin jest ustawowy i liczy się od dnia wpisu do KRS. Nie zwlekaj — zrób to w pierwszych dniach po rejestracji.',
      },
      {
        question: 'Czy będąc w zarządzie mam automatycznie dostęp do spółki w e-Urzędzie Skarbowym?',
        answer: 'Nie. Wpis w KRS pozwala wystąpić o dostęp do Konta Organizacji, ale go nie nadaje. Pierwszego użytkownika trzeba wyznaczyć wnioskiem; dla nowej spółki najpewniej osobiście w urzędzie.',
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
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[3],
  },

  // ─── Księgowość: pełna księgowość w spółce ──────────────────────────────────
  {
    id: 'fallback-pelna-ksiegowosc',
    slug: 'pelna-ksiegowosc-spolka-zoo-o-co-chodzi',
    entityTypes: ['spolka', 'stowarzyszenie', 'fundacja'],
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
    entityTypes: ['spolka', 'stowarzyszenie', 'fundacja'],
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
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
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
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
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

**JDG** — trzy kroki:

1. **Zdobądź token KSeF** — generujesz go w portalu KSeF po zalogowaniu profilem zaufanym.
2. **Podłącz aplikację** — wklejasz token do KsięgaI i od tej chwili faktury idą przez KSeF automatycznie.
3. **Poinformuj biuro rachunkowe** — biuro potrzebuje swojego dostępu (przez NIP biura, nie przez Twój token).

**Spółka z o.o.** — ścieżka jest dłuższa: najpierw pierwszy użytkownik [Konta Organizacji w e-US](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka), potem **ZAW-FA** (albo uwierzytelnienie pieczęcią kwalifikowaną z NIP), a dopiero potem token/certyfikat dla aplikacji. Szczegóły: [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

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
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  {
    id: 'fallback-ksef-token-short',
    slug: 'ksef-token',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
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
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'e-Urząd Skarbowy dla firmy — konto prywatne a Konto Organizacji',
    excerpt: 'e-Urząd Skarbowy ma dwa konteksty: osoby prywatnej i organizacji. Żeby działać w imieniu firmy, potrzebujesz Konta Organizacji — a w nowej spółce trzeba je najpierw uruchomić, wyznaczając pierwszego użytkownika.',
    summary: 'Jak działa e-Urząd Skarbowy dla przedsiębiorcy: różnica między kontem osoby prywatnej a Kontem Organizacji, dlaczego reprezentacja w KRS nie daje automatycznie dostępu, jak wygląda to u JDG i jak nadać dostęp biuru rachunkowemu.',
    purpose: 'Właściciele firm logują się do e-US prywatnym profilem i nie rozumieją, czemu nie widzą danych firmy. Ten artykuł wyjaśnia dwa konteksty i kieruje do szczegółowego przewodnika dla nowej spółki.',
    body_markdown: `## Dwa konteksty e-Urzędu Skarbowego

e-Urząd Skarbowy (podatki.gov.pl) ma dwa odrębne konteksty:

- **Kontekst osoby prywatnej** — Twoje osobiste rozliczenia: PIT, deklaracje jako osoby fizycznej.
- **Konto Organizacji** — konto podatkowe firmy: NIP firmy, JPK, deklaracje firmowe, pełnomocnictwa, złożenie ZAW-FA do KSeF.

Logując się profilem zaufanym wchodzisz domyślnie w kontekst osoby prywatnej. Żeby działać w imieniu firmy, musisz przełączyć się na Konto Organizacji — a jeśli go jeszcze nie masz, najpierw uzyskać do niego dostęp.

## Kto może działać w Koncie Organizacji

O dostęp do Konta Organizacji może wystąpić osoba wpisana w KRS jako uprawniona do reprezentacji spółki (prezes, członek zarządu) albo pełnomocnik ogólny. Ważne: **wpis w KRS ani pełnomocnictwo ogólne nie nadają dostępu automatycznie** — pierwszego użytkownika Konta Organizacji trzeba formalnie wyznaczyć wnioskiem. Kolejnych użytkowników dodaje online użytkownik z dostępem rozszerzonym.

Pracownicy i biura rachunkowe nie występują o Konto Organizacji — dostają dostęp do e-US przez pełnomocnictwa (UPL-1) albo są dodawani jako użytkownicy przez osobę z dostępem rozszerzonym.

## Nowa spółka nie pojawia się po zalogowaniu?

Jeśli po kliknięciu „Zmień kontekst" / „Przełącz podmiot" spółki nie ma na liście, najczęściej znaczy to, że **nikt nie został jeszcze wyznaczony jako użytkownik jej Konta Organizacji** — a nie że „NIP się nie zsynchronizował" i wystarczy poczekać. W nowej spółce trzeba przejść procedurę dostępu.

Pełen proces krok po kroku (wniosek, dokumenty, kolejność do KSeF) opisujemy tutaj: **[Konto Organizacji w e-Urzędzie Skarbowym dla nowej spółki z o.o.](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka)**.

## Jak to wygląda u JDG

Jednoosobowa działalność jest identyfikowana przez NIP przedsiębiorcy, który jest jednocześnie NIP firmy. W praktyce, logując się profilem zaufanym, JDG-owiec ma w e-US dostęp do swoich spraw osobistych i firmowych w jednym miejscu — bez odrębnej procedury dostępu do Konta Organizacji, która dotyczy podmiotów wpisanych do KRS.

## Dlaczego to ważne przed KSeF

Część działań związanych z KSeF (m.in. złożenie ZAW-FA) wykonuje się z poziomu firmy, nie osoby prywatnej. Bez działania w kontekście Konta Organizacji nie ruszysz z autoryzacją spółki w KSeF. Kolejność dla spółki opisujemy w przewodniku [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

## Jak nadać dostęp biuru rachunkowemu

Z poziomu Konta Organizacji zarządzasz pełnomocnictwami. Biuro rachunkowe z **UPL-1** może podpisywać i składać deklaracje w imieniu firmy. To osobny mechanizm od dostępu do KSeF i od dodania kogoś jako użytkownika Konta Organizacji.

## Zastrzeżenie

Stan na 7 września 2026 r. Procedury e-Urzędu Skarbowego bywają zmieniane — sprawdź aktualne instrukcje na podatki.gov.pl. KsięgaI to oprogramowanie, a nie doradztwo podatkowe ani prawne.`,
    checklist: [
      'Zaloguj się do e-Urzędu Skarbowego profilem zaufanym lub e-dowodem.',
      'Sprawdź, w jakim jesteś kontekście (osoba prywatna vs organizacja) i czy firma jest na liście podmiotów.',
      'Jeśli to nowa spółka i nie ma jej na liście — przejdź procedurę wyznaczenia pierwszego użytkownika Konta Organizacji (patrz przewodnik dla nowej spółki).',
      'Po uzyskaniu dostępu przełącz się na Konto Organizacji i sprawdź podgląd deklaracji oraz JPK.',
      'Sprawdź, czy biuro rachunkowe ma aktualne pełnomocnictwo UPL-1.',
    ],
    official_links: [
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
      { label: 'Konto Organizacji — zasady (podatki.gov.pl)', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
    ],
    related_actions: [
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o. — krok po kroku', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'Pierwsze obowiązki po założeniu spółki z o.o.', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy konto osoby prywatnej w e-US wystarcza do obsługi firmy?',
        answer: 'Nie. Do działań w imieniu spółki potrzebujesz Konta Organizacji albo właściwego pełnomocnictwa. Kontekst osoby prywatnej daje dostęp tylko do Twoich osobistych rozliczeń.',
      },
      {
        question: 'Czy członek zarządu automatycznie widzi nową spółkę w e-US?',
        answer: 'Nie. Wpis w KRS pozwala wystąpić o dostęp do Konta Organizacji, ale go nie nadaje. Pierwszego użytkownika trzeba wyznaczyć wnioskiem; samo czekanie zwykle nic nie zmienia.',
      },
      {
        question: 'Czy JDG też przechodzi procedurę Konta Organizacji?',
        answer: 'Nie. JDG jest identyfikowana przez NIP przedsiębiorcy i w e-US ma dostęp do spraw osobistych i firmowych w jednym miejscu. Procedura Konta Organizacji dotyczy podmiotów wpisanych do KRS.',
      },
    ],
    article_type: 'guide',
    sort_order: 15,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
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
- **Konto Organizacji w e-US** — wyznacz pierwszego użytkownika Konta Organizacji (wniosek o dostęp; dla nowej spółki zwykle osobiście w urzędzie). Wpis w KRS tego dostępu nie nadaje. Patrz: [Konto Organizacji dla nowej spółki z o.o.](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka).
- **NIP-8** — zgłoś dane uzupełniające (rachunki bankowe, adresy, dokumentacja, dane kontaktowe) w terminie **21 dni od wpisu do KRS**. NIP-8 nie jest prawnie zależny od Konta Organizacji, ale wersję elektroniczną trzeba czymś podpisać (podpis kwalifikowany / aktywne UPL-1 / kontekst organizacji w e-US). Bez tego zanieś NIP-8 papierowo razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika, przy jednej wizycie.
- **VAT** — zdecyduj czy rejestrujesz spółkę jako vatowca i złóż VAT-R jeśli tak. Warto potwierdzić z biurem rachunkowym.

## Tydzień 2: operacje i dokumentacja

- **Biuro rachunkowe lub księgowa** — ustal sposób przekazywania dokumentów, formaty, terminy miesięczne.
- **Pierwsza faktura** — skonfiguruj aplikację do fakturowania (KsięgaI lub inne), wystaw fakturę próbną i sprawdź poprawność danych.
- **ZUS wspólników** — ustal status ZUS z biurem rachunkowym. Jednoosobowy wspólnik zwykle ma obowiązek ZUS.

## Tydzień 3–4: droga do KSeF

- Po uruchomieniu Konta Organizacji złóż **ZAW-FA** — wyznacza pierwszą osobę z uprawnieniami w KSeF (spółka z pieczęcią kwalifikowaną z NIP może pominąć ZAW-FA).
- Po pierwszym wejściu do KSeF nadaj dalsze uprawnienia i wygeneruj token/certyfikat dla aplikacji.
- Nadaj dostęp biuru rachunkowemu po stronie NIP biura (osobny mechanizm od tokena). Kolejność: [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

## Przez cały pierwszy miesiąc

- Zbieraj **wszystkie** faktury kosztowe — najem, usługi, sprzęt. Brak faktury = brak kosztu.
- Dokumentuj każdą umowę i decyzję — spółka prowadzi pełną księgowość.
- Sprawdź terminy pierwszych deklaracji VAT i JPK z biurem rachunkowym.`,
    checklist: [
      'Dzień 1–3: Zgłoś CRBR na podatki.gov.pl.',
      'Dzień 1–3: Otwórz firmowe konto bankowe.',
      'Tydzień 1: Aktywuj e-Doręczenia i ustal kto monitoruje skrzynkę.',
      'Tydzień 1: Wyznacz pierwszego użytkownika Konta Organizacji w e-US (wniosek o dostęp — dla nowej spółki zwykle osobiście w urzędzie).',
      'Tydzień 1: Złóż NIP-8 z danymi uzupełniającymi (termin 21 dni od wpisu do KRS) — papierowo razem z wnioskiem o dostęp do Konta Organizacji, jeśli nie masz podpisu kwalifikowanego ani UPL-1.',
      'Tydzień 1: Zdecyduj o VAT i złóż VAT-R jeśli potrzebne.',
      'Tydzień 2: Ustal z biurem rachunkowym sposób przekazywania dokumentów.',
      'Tydzień 2: Skonfiguruj aplikację do fakturowania.',
      'Tydzień 2: Ustal status ZUS wspólników z biurem rachunkowym.',
      'Tydzień 3–4: Po uruchomieniu Konta Organizacji złóż ZAW-FA (albo uwierzytelnij spółkę pieczęcią kwalifikowaną z NIP).',
      'Tydzień 3–4: Po pierwszym wejściu do KSeF wygeneruj token/certyfikat i połącz z aplikacją.',
      'Tydzień 3–4: Nadaj biuru rachunkowemu dostęp do KSeF po stronie NIP biura.',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie', href: 'https://www.podatki.gov.pl/crbr/', external: true },
      { label: 'e-Doręczenia dla przedsiębiorcy', href: 'https://www.gov.pl/web/e-doreczenia/dla-przedsiebiorcy', external: true },
      { label: 'Konto Organizacji w e-Urzędzie Skarbowym', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Szczegółowe obowiązki po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'NIP-8 po rejestracji spółki z o.o.', href: '/poradnik/nip-8-spolka-zoo' },
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'W jakiej kolejności zrobić CRBR i konto bankowe?',
        answer: 'Jedno i drugie jak najszybciej po wpisie do KRS. CRBR ma ustawowy termin — zrób go w pierwszych dniach. Konto bankowe też przyda się od razu do płatności za formalności.',
      },
      {
        question: 'Czy do konta spółki w e-US wystarczy być w zarządzie?',
        answer: 'Nie. Wpis w KRS pozwala wystąpić o dostęp do Konta Organizacji, ale go nie nadaje. Pierwszego użytkownika trzeba wyznaczyć wnioskiem — kolejnych dodaje się później online.',
      },
      {
        question: 'Czy mogę wystawiać faktury bez podłączenia do KSeF?',
        answer: 'Tak, na razie tak. W trybie KSeF-ready faktury są w prawidłowym formacie, ale nie trafiają jeszcze do KSeF. Połączysz się kiedy będziesz gotowy lub kiedy stanie się obowiązkowe.',
      },
    ],
    article_type: 'checklist',
    sort_order: 15,
    published_at: '2026-05-18T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: fallbackWikiCategories[3],
  },

  {
    id: 'fallback-zakladanie-firmy',
    slug: 'zakladanie-firmy',
    entityTypes: ['jdg', 'spolka'],
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

  {
    id: 'fallback-rejestracja-spolki-s24',
    slug: 'rejestracja-spolki-zoo-ekrs-s24',
    title: 'Jak zarejestrować spółkę z o.o. przez eKRS S24 — krok po kroku',
    excerpt: 'S24 to najszybszy i najtańszy sposób rejestracji sp. z o.o. — bez notariusza, przez internet. Kluczowy warunek: każda osoba podpisująca umowę spółki musi mieć własny podpis kwalifikowany lub profil zaufany.',
    summary: 'Przewodnik po rejestracji spółki z o.o. w systemie eKRS S24 — co przygotować, jak działają podpisy elektroniczne i co zrobić zaraz po wpisie do KRS.',
    purpose: 'S24 rejestruje spółkę zwykle w 1 dzień roboczy za 250 zł. Ale jedna nieprzygotowana osoba bez profilu zaufanego może zablokować cały proces. Ten poradnik wyjaśnia jak to działa, zanim zaczniesz.',
    body_markdown: `## Czym jest eKRS S24

S24 to system elektronicznej rejestracji spółki z o.o. przez internet, prowadzony przez Ministerstwo Sprawiedliwości. Nie potrzebujesz notariusza — cały proces odbywa się online, a umowa spółki opiera się na ustandaryzowanym wzorcu.

**Główne różnice wobec rejestracji notarialnej:**

| | S24 (online) | Notariusz |
|---|---|---|
| Koszt opłaty sądowej | 250 zł | 600 zł |
| Czas rozpatrzenia | ~1 dzień roboczy | kilka dni roboczych |
| Umowa spółki | standardowy wzorzec | dowolna treść |
| Wymaga profilu zaufanego / podpisu | tak — każda osoba | tak — u notariusza |

S24 jest odpowiedni, gdy struktura spółki jest prosta i nie potrzebujesz niestandardowych zapisów w umowie.

## Kto musi mieć podpis kwalifikowany lub profil zaufany

To najważniejsza rzecz do sprawdzenia przed dniem złożenia wniosku. **Każda osoba, która podpisuje umowę spółki w S24, musi mieć własny środek identyfikacji elektronicznej.** Nie można podpisać za kogoś innego.

Umowę spółki podpisują **wszyscy wspólnicy**. Jeżeli członkowie zarządu są jednocześnie wspólnikami — co jest typową sytuacją przy zakładaniu nowej spółki — podpisują jako wspólnicy.

Dostępne środki podpisu w S24:

- **Profil zaufany (ePUAP)** — bezpłatny, zakłada się przez mObywatel lub bankowość internetową. Wystarczający dla obywateli polskich z numerem PESEL. Najwygodniejsza opcja.
- **Podpis kwalifikowany (KPE)** — płatny (~100–250 zł/rok, wydawany przez certyfikowane centra). Wymagany dla cudzoziemców bez PESEL-u lub gdy profil zaufany jest niedostępny.
- **Podpis osobisty (e-Dowód)** — wymaga dowodu z chipem i zainstalowanej aplikacji. Rzadziej używany w praktyce.

**Praktyczna konsekwencja:** jeśli rejestrujesz spółkę razem z kilkoma wspólnikami, każda z tych osób musi mieć aktywny profil zaufany lub podpis kwalifikowany *przed* dniem składania wniosku. Jeden nieprzygotowany wspólnik blokuje cały proces — wniosek nie zostanie złożony, dopóki wszyscy nie podpiszą.

## Co przygotować przed złożeniem wniosku

Zbierz poniższe dane dla każdej osoby i dla samej spółki:

**Dane wspólników i zarządu:**
- imię i nazwisko
- numer PESEL
- adres zamieszkania
- aktywny środek podpisu (profil zaufany / podpis kwalifikowany)

**Dane spółki:**
- proponowana nazwa spółki (z dopiskiem "spółka z ograniczoną odpowiedzialnością" lub "sp. z o.o.")
- adres siedziby
- przedmiot działalności (kody PKD — minimum jeden przewodni kod)
- wysokość kapitału zakładowego (minimum **5 000 zł**)
- podział udziałów między wspólnikami (każdy udział minimum 50 zł)
- skład zarządu i sposób reprezentacji (jednoosobowo lub łącznie)

## Krok po kroku — rejestracja w S24

1. Wejdź na portal **ekrs.ms.gov.pl** i zaloguj się przez profil zaufany lub podpis kwalifikowany.
2. Wybierz ścieżkę rejestracji spółki z o.o. przez wzorzec umowy.
3. Wypełnij formularz: nazwa spółki, siedziba, PKD, kapitał, wspólnicy, zarząd.
4. Przejrzyj wygenerowany wzorzec umowy spółki — to standardowy dokument, którego treści nie możesz edytować.
5. Wyślij zaproszenie do podpisania do każdego ze wspólników — portal generuje link dla każdej osoby.
6. **Każda osoba loguje się do portalu osobno** i składa swój podpis swoim profilem zaufanym lub podpisem kwalifikowanym. Podpisy są zbierane sekwencyjnie — nie muszą odbywać się jednocześnie, ale wszyscy muszą podpisać przed złożeniem wniosku.
7. Po zebraniu wszystkich podpisów, wnioskodawca (zazwyczaj jedna z osób zakładających spółkę) składa wniosek i opłaca **250 zł** opłaty sądowej.
8. Wniosek trafia do sądu rejestrowego. Przy braku błędów formalnych wpis do KRS następuje zwykle w **1 dzień roboczy**.

## Czego wzorzec S24 nie pozwala zmienić

Rejestracja przez S24 wiąże się z jednym istotnym ograniczeniem — umowa spółki jest gotowym wzorcem. Nie możesz wprowadzić:

- niestandardowych praw i obowiązków wspólników
- uprzywilejowania udziałów (np. dodatkowych głosów lub preferencyjnej dywidendy)
- ograniczeń zbywalności udziałów wykraczających poza standardowe
- własnych zasad umorzenia udziałów
- szczegółowych zasad podejmowania uchwał innych niż przewiduje kodeks

Jeśli potrzebujesz któregokolwiek z powyższych, musisz zarejestrować spółkę **notarialnie**.

## Co dostajesz po wpisie do KRS

Po skutecznej rejestracji spółka automatycznie otrzymuje:

- **numer KRS** — widoczny od razu
- **NIP** — nadawany automatycznie przez US, pojawia się w KRS po kilku dniach
- **REGON** — nadawany automatycznie przez GUS, pojawia się w KRS po kilku dniach

Aktualny stan wpisu sprawdzisz w wyszukiwarce KRS na **ekrs.ms.gov.pl** lub przez **rejestr.io**.

## Co zrobić zaraz po wpisie

Wpis do KRS to dopiero początek. Zaraz po rejestracji masz do wykonania kilka obowiązkowych i pilnych kroków — sprawdź checklistę po prawej stronie. Najważniejsze z terminami:

- **14 dni roboczych od wpisu** — zgłoszenie beneficjentów rzeczywistych do **CRBR** (za brak grozi wysoka kara)
- **jak najszybciej** — **konto bankowe dla spółki** (potrzebne do wpłaty kapitału i płatności)
- **21 dni od wpisu do KRS** — **NIP-8** (dane uzupełniające: firmowe rachunki bankowe, adresy działalności, miejsce przechowywania dokumentacji, dane kontaktowe; 7 dni dla danych potrzebnych ZUS). NIP-8 nie jest prawnie zależny od Konta Organizacji, ale złożenie elektroniczne wymaga podpisu (podpis kwalifikowany / aktywne UPL-1 / kontekst organizacji w e-US) — bez tego złóż go papierowo razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika.
- **jak najszybciej** — wyznaczenie **pierwszego użytkownika Konta Organizacji w e-US** (wniosek o dostęp; wpis w KRS tego dostępu nie nadaje). Dla nowej spółki zwykle osobiście w urzędzie — można przy tej samej wizycie złożyć NIP-8.
- **e-Doręczenia** — skrzynka do korespondencji urzędowej dla spółki
- **przed pierwszą transakcją** — **rejestracja VAT**, jeśli chcesz być vatowcem od razu
`,
    checklist: [
      'Sprawdź, czy WSZYSCY wspólnicy i zarząd mają aktywny profil zaufany lub podpis kwalifikowany.',
      'Przygotuj dane osobowe wszystkich wspólników i zarządu (imię, nazwisko, PESEL, adres).',
      'Ustal podział udziałów i wysokość kapitału zakładowego (min. 5 000 zł, min. 50 zł na udział).',
      'Wybierz kody PKD (przedmiot działalności) — co najmniej jeden przewodni.',
      'Ustal adres siedziby spółki.',
      'Zaloguj się do portalu ekrs.ms.gov.pl i utwórz wniosek rejestracyjny.',
      'Zaproś wszystkich wspólników do podpisania — każda osoba podpisuje osobno swoim profilem zaufanym lub podpisem kwalifikowanym.',
      'Opłać wniosek (250 zł) i złóż po zebraniu wszystkich podpisów.',
      'Sprawdź wpis w KRS — NIP i REGON pojawią się po kilku dniach.',
      'W ciągu 14 dni roboczych od wpisu: zgłoś beneficjentów rzeczywistych do CRBR.',
      'Jak najszybciej: otwórz konto bankowe dla spółki.',
      'Złóż NIP-8 z danymi uzupełniającymi w terminie 21 dni od wpisu do KRS — papierowo razem z wnioskiem o dostęp do Konta Organizacji, jeśli nie masz podpisu kwalifikowanego ani aktywnego UPL-1.',
      'Wyznacz pierwszego użytkownika Konta Organizacji w e-US (wniosek o dostęp — dla nowej spółki zwykle osobiście w urzędzie).',
      'Aktywuj skrzynkę e-Doręczeń dla spółki.',
      'Zdecyduj o rejestracji VAT przed pierwszą transakcją (jeśli planujesz być vatowcem).',
      'Po uruchomieniu Konta Organizacji zaplanuj ZAW-FA i połączenie spółki z KSeF.',
    ],
    official_links: [
      { href: 'https://ekrs.ms.gov.pl/', label: 'Portal eKRS — rejestracja przez S24', external: true },
      { href: 'https://www.gov.pl/web/gov/zaloz-spolke-z-ograniczona-odpowiedzialnoscia-przez-internet', label: 'Gov.pl — rejestracja sp. z o.o. online', external: true },
      { href: 'https://www.podatki.gov.pl/crbr/', label: 'CRBR — zgłoszenie beneficjentów', external: true },
      { href: 'https://www.biznes.gov.pl/pl/portal/ou1478', label: 'Biznes.gov.pl — zgłoszenie NIP-8', external: true },
      { href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', label: 'Konto Organizacji w e-Urzędzie Skarbowym', external: true },
      { href: 'https://ekrs.ms.gov.pl/rdf/pd/search_df', label: 'Wyszukiwarka KRS', external: true },
    ],
    related_actions: [
      { label: 'Zgłoszenie do CRBR po rejestracji', href: '/poradnik/crbr-spolka-zoo-co-zglosic' },
      { label: 'NIP-8 po rejestracji spółki z o.o.', href: '/poradnik/nip-8-spolka-zoo' },
      { label: 'Konto Organizacji w e-US dla nowej spółki z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'Pierwsze obowiązki po założeniu spółki z o.o.', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy profil zaufany wystarczy do podpisania umowy spółki w S24?',
        answer: 'Tak — profil zaufany jest akceptowaną formą podpisu w S24 dla osób fizycznych z numerem PESEL. Jest bezpłatny i można go założyć przez mObywatel lub bankowość internetową.',
      },
      {
        question: 'Co jeśli jeden ze wspólników nie ma profilu zaufanego?',
        answer: 'Wniosek nie może zostać złożony, dopóki wszyscy wspólnicy nie złożą podpisu. Wspólnik bez profilu zaufanego musi go założyć lub uzyskać podpis kwalifikowany przed złożeniem wniosku. Alternatywą jest rejestracja notarialna.',
      },
      {
        question: 'Czy wspólnicy muszą podpisywać umowę jednocześnie?',
        answer: 'Nie — każda osoba loguje się do portalu eKRS osobno i podpisuje w swoim czasie. Wniosek zostaje złożony dopiero po zebraniu wszystkich podpisów.',
      },
      {
        question: 'Ile trwa rejestracja przez S24?',
        answer: 'Przy braku błędów formalnych sąd rejestrowy rozpatruje wniosek S24 zazwyczaj w 1 dzień roboczy. NIP i REGON są nadawane automatycznie i pojawiają się w KRS po kilku dniach.',
      },
      {
        question: 'Czy przez S24 mogę zmienić cokolwiek w umowie spółki?',
        answer: 'Nie. Wzorzec umowy S24 jest ustandaryzowany i nie podlega edycji. Jeśli potrzebujesz niestandardowych zapisów (np. uprzywilejowanie udziałów, szczególne zasady zbywalności), musisz zarejestrować spółkę notarialnie.',
      },
      {
        question: 'Ile wynosi minimalny kapitał zakładowy sp. z o.o.?',
        answer: '5 000 zł. Każdy udział musi wynosić minimum 50 zł. Kapitał można wnieść gotówką po rejestracji — na otwarty rachunek bankowy spółki.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-06-03T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
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

Według przeważającego stanowiska orzecznictwa i doktryny umowa podpisana z naruszeniem art. 210 KSH jest **nieważna** i nie da się jej skutecznie „potwierdzić” po fakcie. Praktyczne konsekwencje:

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

> **Ważne:** pełnomocnikiem może być wspólnik albo zewnętrzna osoba zaufana — nie musi być prawnikiem. To, czy może nim być inny członek zarządu, bywało w orzecznictwie sporne, dlatego najbezpieczniej wskazać osobę spoza zarządu.

## Spółka z radą nadzorczą

Art. 210 § 1 KSH wskazuje radę nadzorczą **lub** pełnomocnika powołanego uchwałą wspólników. Jeśli spółka ma radę nadzorczą, umowę z członkiem zarządu może podpisać rada — ale wspólnicy nadal mogą powołać do tego pełnomocnika. W spółce bez rady nadzorczej jedyną drogą jest uchwała wspólników.

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
        answer: 'Nie, jeżeli jest też jedynym członkiem zarządu. Art. 210 § 2 KSH wyłącza wtedy zasadę z § 1 — zamiast pełnomocnika czynność prawna między nim a spółką wymaga formy aktu notarialnego (wyjątek: czynności na wzorcu w systemie teleinformatycznym). Jeżeli zarząd jest wieloosobowy, pełnomocnika powołuje jedyny wspólnik uchwałą.',
      },
      {
        question: 'Kto może być pełnomocnikiem z art. 210 KSH?',
        answer: 'Osoba wskazana uchwałą wspólników — np. inny wspólnik albo osoba spoza spółki. Nie musi być prawnikiem. Powołanie innego członka zarządu bywało w orzecznictwie sporne, więc bezpieczniej wskazać osobę spoza zarządu.',
      },
      {
        question: 'Czy pełnomocnictwo z art. 210 KSH musi być notarialne?',
        answer: 'Nie, o ile umowa z zarządem nie wymaga formy notarialnej. Uchwała wspólników z protokołem wystarczy.',
      },
      {
        question: 'Co jeśli umowa z naruszeniem art. 210 już obowiązuje?',
        answer: 'Nie zakładaj, że wystarczy „uchwała o ratyfikacji” — według przeważającego stanowiska takiej umowy nie da się skutecznie potwierdzić. Podejmij uchwałę o powołaniu pełnomocnika, zawrzyj umowę ponownie w prawidłowej reprezentacji i ureguluj rozliczenia za okres wcześniejszy, najlepiej z prawnikiem.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
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

Art. 210 § 2 KSH zmienia zasady: gdy spółka ma jednego wspólnika, który jest jednocześnie jedynym członkiem zarządu, pełnomocnika się nie powołuje, a każda czynność prawna między nim a spółką **wymaga formy aktu notarialnego** (wyjątek z § 3: czynności dokonywane na wzorcu w systemie teleinformatycznym).

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
        answer: 'Wtedy umowę z członkiem zarządu może podpisać w imieniu spółki rada nadzorcza (na podstawie uchwały rady). Art. 210 mówi „rada nadzorcza lub pełnomocnik”, więc wspólnicy nadal mogą zamiast tego powołać pełnomocnika.',
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
    updated_at: '2026-09-29T00:00:00.000Z',
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
- **Art. 253 KSH** — w sporze o uchylenie lub stwierdzenie nieważności uchwały wspólników spółkę reprezentuje zarząd, chyba że wspólnicy uchwałą ustanowią w tym celu pełnomocnika (a gdy zarząd nie może działać i brak takiego pełnomocnika — sąd ustanawia kuratora)
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
      { label: 'Przeczytaj o KSH art. 210', href: '/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
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
        answer: 'Nie automatycznie. Pełnomocnictwo udziela spółka (działająca przez zarząd), więc zmiana składu zarządu go nie wygasza — nowy zarząd może je jednak odwołać. Pełnomocnik z art. 210 KSH powołany uchwałą wspólników działa, dopóki wspólnicy go nie odwołają lub nie wyczerpie się zakres umocowania.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-23T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
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
      { label: 'KSH art. 210 — dlaczego pełnomocnik jest kluczowy', href: '/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
      { label: 'Pełnomocnik w sp. z o.o. — kiedy i jak', href: '/poradnik/pelnomocnik-spolka-zoo-kiedy-i-jak-powolac' },
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

  // ─── Uchwały i zgromadzenia (2026-09) — legal statements verified against
  // the KSH consolidated text Dz.U. 2024 poz. 18 on 2026-09-29. ─────────────
  {
    id: 'fallback-uchwala-zarzadu-a-wspolnikow',
    slug: 'uchwala-zarzadu-a-uchwala-wspolnikow-roznice',
    title: 'Uchwała zarządu a uchwała wspólników — różnice w sp. z o.o.',
    entityTypes: ['spolka'],
    excerpt:
      'Kto podejmuje uchwałę, w jakich sprawach, jaką większością i co grozi, gdy jej zabraknie. Porównanie uchwał zarządu i uchwał wspólników na podstawie KSH.',
    summary:
      'Zarząd prowadzi sprawy spółki, wspólnicy decydują o sprawach właścicielskich. Różni się organ, tryb, większość głosów, forma i skutek braku uchwały — zestawiamy to w jednym miejscu.',
    purpose:
      'Decyzja podjęta przez niewłaściwy organ to najczęstsza przyczyna wadliwych umów w małych spółkach. Czynność, dla której ustawa wymaga uchwały wspólników, dokonana bez niej jest nieważna.',
    body_markdown: `## Po co spółce uchwały i decyzje

Sp. z o.o. jest osobnym podmiotem — nie „decyduje” za nią właściciel ani prezes jako osoba prywatna, tylko jej organy: zarząd, zgromadzenie wspólników i (jeżeli jest) rada nadzorcza. Uchwała albo udokumentowana decyzja to dowód, że dana sprawa została rozstrzygnięta przez uprawniony organ w przewidzianym trybie. Sprawdza to biegły rewident, urząd skarbowy przy kontroli kosztów, bank, kupujący udziały i sąd.

Zarząd prowadzi sprawy spółki i reprezentuje ją (art. 201 § 1 KSH). Wspólnicy podejmują uchwały w sprawach, które KSH i umowa spółki zastrzegają dla nich (art. 228 KSH).

## Porównanie w jednej tabeli

| | Uchwała zarządu | Uchwała wspólników |
|---|---|---|
| Kto podejmuje | Członkowie zarządu — tylko przy zarządzie wieloosobowym | Wspólnicy (w spółce jednoosobowej — jedyny wspólnik) |
| Kiedy jest wymagana | Sprawy przekraczające zwykłe czynności spółki albo takie, którym sprzeciwił się inny członek zarządu (art. 208 § 4 KSH) | Sprawy z art. 228 KSH, inne sprawy z KSH (np. art. 210 KSH, art. 15 KSH) i z umowy spółki |
| Warunek ważności | Wszyscy członkowie prawidłowo zawiadomieni o posiedzeniu (art. 208 § 5 KSH) | Prawidłowe zwołanie zgromadzenia albo pisemna zgoda wszystkich wspólników (art. 227 § 2 KSH) |
| Większość | Bezwzględna większość głosów | Bezwzględna większość (art. 245 KSH); 2/3 lub 3/4 w sprawach z art. 246 KSH |
| Tryb | Posiedzenie, pisemnie lub zdalnie (art. 208 § 5¹–5³ KSH) | Zgromadzenie, pisemnie bez zgromadzenia lub zdalny udział (art. 234¹ KSH) |
| Zapis | Protokół / rejestr uchwał zarządu | Księga protokołów (art. 248 KSH) |
| Brak uchwały | Członek zarządu naraża się na odpowiedzialność wobec spółki | Co do zasady czynność nieważna, jeżeli uchwały wymaga ustawa (art. 17 § 1 KSH) — z wyjątkami, np. art. 230 KSH |

## Uchwały zarządu — kiedy są potrzebne

Przy zarządzie wieloosobowym każdy członek zarządu może bez uchwały prowadzić sprawy nieprzekraczające zwykłych czynności spółki (art. 208 § 3 KSH). Uprzednia uchwała zarządu jest wymagana, gdy:

- sprawa przekracza zakres zwykłych czynności spółki, albo
- choćby jeden z pozostałych członków zarządu sprzeciwi się jej przeprowadzeniu (art. 208 § 4 KSH).

Powołanie prokurenta wymaga zgody **wszystkich** członków zarządu, a odwołać prokurę może każdy z nich (art. 208 § 6–7 KSH).

Jednoosobowy zarząd nie podejmuje uchwał w rozumieniu art. 208 — po prostu działa. Ważne decyzje (zakup środka trwałego, regulamin wynagrodzeń, polityka rozliczania kosztów) i tak warto zapisywać jako decyzje zarządu: to one uzasadniają wydatki przy kontroli.

Więcej: [Posiedzenie zarządu i uchwały zarządu](/poradnik/posiedzenie-zarzadu-uchwaly-zarzadu/).

## Uchwały wspólników — kiedy są potrzebne

Art. 228 KSH wymienia sprawy wymagające uchwały wspólników, m.in.:

- zatwierdzenie sprawozdania zarządu i sprawozdania finansowego oraz absolutorium,
- roszczenia o naprawienie szkody wyrządzonej przy zawiązaniu spółki lub sprawowaniu zarządu albo nadzoru,
- zbycie i wydzierżawienie przedsiębiorstwa lub jego zorganizowanej części,
- nabycie i zbycie nieruchomości — jeżeli umowa spółki nie stanowi inaczej,
- zwrot dopłat.

Do tego inne przepisy KSH, np.:

- powołanie i odwołanie członków zarządu — jeżeli umowa spółki nie stanowi inaczej (art. 201 § 4 KSH),
- umowy między spółką a członkiem zarządu — reprezentuje ją rada nadzorcza lub pełnomocnik powołany uchwałą wspólników (art. 210 KSH),
- kredyt, pożyczka lub poręczenie dla członka zarządu, rady nadzorczej, prokurenta — zgoda zgromadzenia (art. 15 KSH),
- rozporządzenie prawem lub zaciągnięcie zobowiązania o wartości dwukrotnie przewyższającej kapitał zakładowy — jeżeli umowa spółki nie stanowi inaczej (art. 230 KSH); brak tej uchwały nie powoduje jednak nieważności czynności,
- zmiana umowy spółki — w protokole notarialnym (art. 255 KSH).

Umowa spółki może ten katalog rozszerzyć.

## Co się dzieje, gdy uchwały zabraknie

- **Uchwała wymagana przez ustawę:** czynność prawna dokonana bez niej jest nieważna. Zgodę można jednak wyrazić także po fakcie — najpóźniej w ciągu dwóch miesięcy od złożenia oświadczenia przez spółkę; takie potwierdzenie działa wstecz (art. 17 § 1–2 KSH). Wyjątek: przy zobowiązaniach powyżej dwukrotności kapitału zakładowego art. 230 KSH wprost wyłącza tę sankcję — czynność jest ważna, ale zarząd odpowiada wobec spółki.
- **Uchwała wymagana wyłącznie przez umowę spółki:** czynność jest ważna, ale członkowie zarządu odpowiadają wobec spółki za naruszenie umowy (art. 17 § 3 KSH).

## Najczęstsze pomyłki

- Prezes podpisuje umowę z samym sobą „bo wspólnicy się zgadzają” — potrzebny jest pełnomocnik powołany uchwałą wspólników (art. 210 KSH).
- Uchwała zarządu podjęta bez zawiadomienia jednego z członków zarządu.
- Zmiana umowy spółki zwykłą uchwałą zamiast w protokole notarialnym.
- Brak jakiegokolwiek zapisu decyzji — ustne ustalenia nie są dowodem.`,
    checklist: [
      'Przed ważną decyzją sprawdź, czy wymaga jej art. 228 KSH, inny przepis KSH albo umowa spółki.',
      'Jeżeli tak — przygotuj uchwałę wspólników (na zgromadzeniu albo pisemnie).',
      'Przy zarządzie wieloosobowym sprawy ponad zwykłe czynności przeprowadzaj przez uchwałę zarządu.',
      'Zapisz każdą uchwałę i powiąż ją z umową lub wydatkiem, którego dotyczy.',
    ],
    official_links: [
      { label: 'Kodeks spółek handlowych — tekst jednolity (ISAP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240000018', external: true },
    ],
    related_actions: [
      { label: 'Zgromadzenie wspólników — kiedy i jak zwołać', href: '/poradnik/zgromadzenie-wspolnikow-kiedy-i-jak-zwolac/' },
      { label: 'Kiedy spółka z o.o. potrzebuje uchwały?', href: '/poradnik/kiedy-spolka-zoo-potrzebuje-uchwaly/' },
      { label: 'Prowadź uchwały i decyzje w KsięgaI', href: '/rejestracja/' },
    ],
    faq: [
      {
        question: 'Czy wspólnik, który jest też prezesem, może sam podjąć uchwałę wspólników?',
        answer:
          'Tylko jeżeli jest jedynym wspólnikiem — wtedy wykonuje wszystkie uprawnienia zgromadzenia wspólników (art. 156 KSH). Przy kilku wspólnikach uchwałę podejmują wszyscy wspólnicy zgodnie z KSH i umową spółki.',
      },
      {
        question: 'Czy uchwała zarządu może zastąpić uchwałę wspólników?',
        answer:
          'Nie. W sprawach zastrzeżonych dla wspólników uchwała zarządu nie wystarcza — a czynność, dla której ustawa wymaga uchwały wspólników, dokonana bez niej jest nieważna (art. 17 § 1 KSH).',
      },
      {
        question: 'Czy uchwały wspólników można podjąć bez spotkania?',
        answer:
          'Tak, jeżeli wszyscy wspólnicy wyrażą na piśmie zgodę na postanowienie, które ma być powzięte, albo na głosowanie pisemne (art. 227 § 2 KSH).',
      },
    ],
    article_type: 'guide',
    sort_order: 31,
    published_at: '2026-09-29T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },
  {
    id: 'fallback-zgromadzenie-wspolnikow',
    slug: 'zgromadzenie-wspolnikow-kiedy-i-jak-zwolac',
    title: 'Zgromadzenie wspólników sp. z o.o. — kiedy jest potrzebne i jak je zwołać',
    entityTypes: ['spolka'],
    excerpt:
      'Zwyczajne i nadzwyczajne zgromadzenie wspólników: kto zwołuje, w jakim terminie, jak wysłać zaproszenia, kiedy można obejść się bez formalnego zwołania i bez zgromadzenia.',
    summary:
      'Zgromadzenie zwołuje zarząd listem poleconym, kurierem albo — za pisemną zgodą wspólnika — e-mailem, co najmniej dwa tygodnie wcześniej. Wyjaśniamy też kworum, pełnomocników, udział online i uchwały pisemne.',
    purpose:
      'Wadliwie zwołane zgromadzenie otwiera drogę do zaskarżenia uchwał. W małych spółkach da się je legalnie uprościć — trzeba tylko wiedzieć, na jakiej podstawie.',
    body_markdown: `## Czym jest zgromadzenie wspólników

Zgromadzenie wspólników to organ, w którym właściciele sp. z o.o. podejmują uchwały. Uchwały wspólników co do zasady podejmuje się na zgromadzeniu (art. 227 § 1 KSH). „Zgromadzenie” dotyczy wyłącznie wspólników — zarząd i rada nadzorcza odbywają **posiedzenia**.

## Kiedy zgromadzenie jest potrzebne

- **Zwyczajne zgromadzenie wspólników** — raz w roku, w ciągu sześciu miesięcy po zakończeniu roku obrotowego (art. 231 § 1 KSH). Zatwierdza sprawozdania, dzieli zysk lub pokrywa stratę i udziela absolutorium. Szczegóły: [Zwyczajne zgromadzenie wspólników](/poradnik/zwyczajne-zgromadzenie-wspolnikow-termin-uchwaly/).
- **Nadzwyczajne zgromadzenie wspólników** — w przypadkach wskazanych w KSH lub umowie spółki, a także gdy uprawnieni do zwołania uznają to za wskazane (art. 232 KSH). W praktyce: zawsze, gdy potrzebna jest uchwała wspólników w ciągu roku — np. powołanie członka zarządu, pełnomocnik do umowy z członkiem zarządu, dopłaty, zmiana umowy spółki.
- **Obowiązkowo przy dużej stracie** — jeżeli bilans wykaże stratę przewyższającą sumę kapitałów zapasowego i rezerwowych oraz połowę kapitału zakładowego, zarząd musi niezwłocznie zwołać zgromadzenie w sprawie dalszego istnienia spółki (art. 233 § 1 KSH).

## Kto zwołuje

| Kto | Kiedy |
|---|---|
| Zarząd | Zawsze — to podstawowa kompetencja (art. 235 § 1 KSH) |
| Rada nadzorcza / komisja rewizyjna | Zwyczajne — gdy zarząd nie zwoła go w terminie; nadzwyczajne — gdy uznają to za wskazane, a zarząd nie zwoła go w 2 tygodnie od ich żądania (art. 235 § 2 KSH) |
| Wspólnicy z co najmniej 1/10 kapitału | Mogą żądać zwołania nadzwyczajnego zgromadzenia — na piśmie, najpóźniej miesiąc przed proponowanym terminem (art. 236 § 1 KSH) |
| Wspólnicy z co najmniej 1/20 kapitału | Mogą żądać umieszczenia spraw w porządku obrad najbliższego zgromadzenia — najpóźniej 3 tygodnie przed terminem (art. 236 § 1¹ KSH) |

Jeżeli zarząd nie zwoła zgromadzenia w ciągu dwóch tygodni od żądania wspólników, sąd rejestrowy może upoważnić ich do zwołania (art. 237 § 1 KSH).

## Jak zwołać — krok po kroku

1. **Przygotuj porządek obrad i projekty uchwał.** Uchwał w sprawach spoza porządku obrad podjąć nie można, chyba że cały kapitał zakładowy jest reprezentowany i nikt nie zgłosił sprzeciwu (art. 239 § 1 KSH).
2. **Wyślij zaproszenia co najmniej dwa tygodnie przed terminem** — listem poleconym albo przesyłką kurierską. Zamiast tego możesz wysłać zaproszenie e-mailem lub na adres do doręczeń elektronicznych, jeżeli wspólnik wcześniej wyraził na to pisemną zgodę i podał adres (art. 238 § 1 KSH).
3. **W zaproszeniu wskaż** dzień, godzinę, miejsce i szczegółowy porządek obrad; przy zmianie umowy spółki — istotne elementy proponowanych zmian (art. 238 § 2 KSH).
4. **Miejsce:** siedziba spółki, chyba że umowa spółki wskazuje inne miejsce w Polsce (art. 234 KSH).
5. **Przeprowadź zgromadzenie i sporządź protokół** z listą obecności, a uchwały wpisz do księgi protokołów (art. 248 KSH).

## Kworum, głosy i pełnomocnicy

- **Kworum:** jeżeli KSH lub umowa spółki nie stanowią inaczej, zgromadzenie jest ważne bez względu na liczbę reprezentowanych udziałów (art. 241 KSH).
- **Głosy:** na każdy udział o równej wartości nominalnej przypada jeden głos, chyba że umowa spółki stanowi inaczej (art. 242 KSH).
- **Większość:** bezwzględna większość głosów (art. 245 KSH); 2/3 przy zmianie umowy spółki, rozwiązaniu spółki i zbyciu przedsiębiorstwa, 3/4 przy istotnej zmianie przedmiotu działalności (art. 246 § 1 KSH).
- **Pełnomocnik wspólnika:** pełnomocnictwo musi być udzielone na piśmie pod rygorem nieważności, a jego kopię dołącza się do księgi protokołów. Pełnomocnikiem nie może być członek zarządu ani pracownik spółki (art. 243 KSH).
- **Wyłączenie od głosowania:** wspólnik nie głosuje nad uchwałami dotyczącymi jego odpowiedzialności wobec spółki, absolutorium, zwolnienia z zobowiązania i sporu między nim a spółką (art. 244 KSH).
- **Głosowanie tajne:** przy wyborach, odwołaniu członków organów, pociągnięciu ich do odpowiedzialności, w sprawach osobowych oraz na żądanie choćby jednego wspólnika (art. 247 § 2 KSH).

## Jak legalnie uprościć zgromadzenie

**Zgromadzenie bez formalnego zwołania.** Uchwały można podjąć mimo braku formalnego zwołania, jeżeli cały kapitał zakładowy jest reprezentowany, a nikt z obecnych nie zgłosił sprzeciwu dotyczącego odbycia zgromadzenia lub wniesienia poszczególnych spraw do porządku obrad (art. 240 KSH). W spółce dwóch wspólników, którzy się spotykają — to najprostsza droga.

**Uchwały bez zgromadzenia.** Jeżeli wszyscy wspólnicy wyrażą na piśmie zgodę na postanowienie, które ma być powzięte, albo na głosowanie pisemne, uchwałę można podjąć bez odbycia zgromadzenia (art. 227 § 2 KSH). Zarząd wpisuje takie uchwały do księgi protokołów (art. 248 § 3 KSH).

**Zgromadzenie online.** Wspólnicy mogą uczestniczyć zdalnie, jeżeli umowa spółki tego nie wyklucza; decyduje zwołujący, a zasady określa regulamin (art. 234¹ KSH). Zaproszenie musi wtedy zawierać informacje o sposobie udziału, głosowania i zgłaszania sprzeciwu (art. 238 § 3 KSH).

**Spółka jednoosobowa.** Jedyny wspólnik wykonuje wszystkie uprawnienia zgromadzenia wspólników (art. 156 KSH) — nie zwołuje niczego, tylko podejmuje uchwały na piśmie.

## Zaskarżanie uchwał

Uchwała sprzeczna z umową spółki lub dobrymi obyczajami i godząca w interesy spółki albo mająca na celu pokrzywdzenie wspólnika może być zaskarżona powództwem o uchylenie (art. 249 KSH). Uchwała sprzeczna z ustawą — powództwem o stwierdzenie nieważności (art. 252 KSH). Wadliwe zwołanie zgromadzenia daje prawo do zaskarżenia także wspólnikowi, który na nim nie był (art. 250 KSH).`,
    checklist: [
      'Ustal, czy potrzebujesz zgromadzenia, czy wystarczy uchwała pisemna wszystkich wspólników (art. 227 § 2 KSH).',
      'Przygotuj porządek obrad i projekty uchwał.',
      'Wyślij zaproszenia co najmniej 2 tygodnie przed terminem: list polecony, kurier albo e-mail za pisemną zgodą wspólnika.',
      'Sprawdź pełnomocnictwa wspólników (forma pisemna, nie członek zarządu ani pracownik).',
      'Sporządź protokół z listą obecności i wynikami głosowań.',
      'Wpisz uchwały do księgi protokołów i dołącz dowody zwołania.',
    ],
    official_links: [
      { label: 'Kodeks spółek handlowych — tekst jednolity (ISAP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240000018', external: true },
    ],
    related_actions: [
      { label: 'Zwyczajne zgromadzenie wspólników — termin i uchwały', href: '/poradnik/zwyczajne-zgromadzenie-wspolnikow-termin-uchwaly/' },
      { label: 'Uchwała zarządu a uchwała wspólników', href: '/poradnik/uchwala-zarzadu-a-uchwala-wspolnikow-roznice/' },
      { label: 'Planuj zgromadzenia i uchwały w KsięgaI', href: '/rejestracja/' },
    ],
    faq: [
      {
        question: 'Mamy dwóch wspólników. Czy musimy wysyłać listy polecone?',
        answer:
          'Nie, jeżeli obaj jesteście obecni i nikt nie zgłasza sprzeciwu — wtedy działa art. 240 KSH. Możecie też podjąć uchwały pisemnie bez zgromadzenia (art. 227 § 2 KSH).',
      },
      {
        question: 'Czy zgromadzenie jest ważne, jeżeli przyszła tylko część wspólników?',
        answer:
          'Tak — jeżeli zostało prawidłowo zwołane, a KSH i umowa spółki nie wymagają kworum, jest ważne bez względu na liczbę reprezentowanych udziałów (art. 241 KSH).',
      },
      {
        question: 'Czy prezes może głosować jako pełnomocnik wspólnika?',
        answer: 'Nie. Członek zarządu i pracownik spółki nie mogą być pełnomocnikami na zgromadzeniu wspólników (art. 243 § 3 KSH).',
      },
      {
        question: 'Czy zaproszenie e-mailem jest ważne?',
        answer:
          'Tylko wobec wspólnika, który wcześniej wyraził na to pisemną zgodę i podał adres e-mail (art. 238 § 1 KSH). Pozostałych zaprasza się listem poleconym lub kurierem.',
      },
    ],
    article_type: 'guide',
    sort_order: 32,
    published_at: '2026-09-29T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },
  {
    id: 'fallback-zwyczajne-zgromadzenie-wspolnikow',
    slug: 'zwyczajne-zgromadzenie-wspolnikow-termin-uchwaly',
    title: 'Zwyczajne zgromadzenie wspólników — termin, porządek obrad i uchwały',
    entityTypes: ['spolka'],
    excerpt:
      'Do 30 czerwca (przy roku kalendarzowym) każda sp. z o.o. musi zatwierdzić sprawozdanie finansowe, zdecydować o zysku lub stracie i udzielić absolutorium. Co dokładnie, w jakiej kolejności i co łatwo przeoczyć.',
    summary:
      'Zwyczajne zgromadzenie wspólników odbywa się w ciągu sześciu miesięcy po końcu roku obrotowego. Wyjaśniamy obowiązkowy porządek obrad, terminy z ustawy o rachunkowości, wygasające mandaty zarządu i wersję dla spółki jednoosobowej.',
    purpose:
      'Bez zatwierdzonego sprawozdania finansowego spółka nie złoży go do KRS i nie podzieli zysku. To obowiązek każdej sp. z o.o. — także takiej, która nie miała przychodów.',
    body_markdown: `## Termin

Zwyczajne zgromadzenie wspólników powinno odbyć się w ciągu **sześciu miesięcy po upływie każdego roku obrotowego** (art. 231 § 1 KSH). Jeżeli rok obrotowy spółki pokrywa się z kalendarzowym — do **30 czerwca**.

Terminy z ustawy o rachunkowości, które się z tym łączą:

| Krok | Termin |
|---|---|
| Sporządzenie sprawozdania finansowego przez zarząd | 3 miesiące od dnia bilansowego (zwykle do 31 marca) |
| Zatwierdzenie przez zgromadzenie wspólników | 6 miesięcy od dnia bilansowego (zwykle do 30 czerwca) |
| Złożenie do KRS (Repozytorium Dokumentów Finansowych) | 15 dni od zatwierdzenia |

## Obowiązkowy porządek obrad

Art. 231 § 2 KSH wymienia sprawy, które muszą znaleźć się na zwyczajnym zgromadzeniu:

1. **Rozpatrzenie i zatwierdzenie** sprawozdania zarządu z działalności spółki oraz sprawozdania finansowego za ubiegły rok obrotowy.
2. **Uchwała o podziale zysku albo pokryciu straty** — jeżeli umowa spółki nie wyłączyła tego spod kompetencji zgromadzenia.
3. **Absolutorium** dla członków organów spółki z wykonania obowiązków.

Absolutorium dotyczy **wszystkich** osób, które pełniły funkcję członka zarządu, rady nadzorczej lub komisji rewizyjnej w ostatnim roku obrotowym — także tych, które odeszły w trakcie roku (art. 231 § 3 KSH). Członek zarządu nie głosuje nad własnym absolutorium, jeżeli jest wspólnikiem (art. 244 KSH).

Zgromadzenie może zająć się też innymi sprawami (art. 231 § 5 KSH) — w praktyce często dokłada się tu powołanie zarządu na kolejną kadencję.

## Podział zysku

Wspólnik ma prawo do udziału w zysku wynikającym z rocznego sprawozdania finansowego i przeznaczonym do podziału uchwałą zgromadzenia (art. 191 § 1 KSH). Kwota do podziału nie może przekroczyć zysku za ostatni rok obrotowy powiększonego o niepodzielone zyski z lat ubiegłych i kwoty z kapitałów utworzonych z zysku — pomniejszonej o niepokryte straty i udziały własne (art. 192 KSH). Dywidendę dostają wspólnicy, którym udziały przysługiwały w dniu powzięcia uchwały o podziale zysku (art. 193 § 1 KSH).

## Nie przegap wygasających mandatów zarządu

Jeżeli umowa spółki nie stanowi inaczej, mandat członka zarządu wygasa z dniem odbycia zgromadzenia zatwierdzającego sprawozdanie finansowe za pierwszy pełny rok obrotowy pełnienia funkcji (art. 202 § 1 KSH). Przy powołaniu na dłużej niż rok — za ostatni pełny rok obrotowy kadencji (art. 202 § 2 KSH).

Przykład: prezes powołany w maju 2025 r., umowa spółki nie określa kadencji. Pierwszy pełny rok obrotowy to 2026, więc mandat wygaśnie na zgromadzeniu zatwierdzającym sprawozdanie za 2026 r. — w 2027 r. Jeżeli ma dalej pełnić funkcję, w porządku obrad tego zgromadzenia umieść uchwałę o powołaniu na kolejną kadencję.

## Spółka jednoosobowa i uchwały pisemne

W spółce jednoosobowej jedyny wspólnik wykonuje wszystkie uprawnienia zgromadzenia wspólników (art. 156 KSH) — sam podejmuje uchwały zatwierdzające, na piśmie, i wpisuje je do księgi protokołów.

Przy kilku wspólnikach zgromadzenie może się nie odbywać fizycznie, jeżeli wszyscy wspólnicy zgodzą się na piśmie na treść uchwał albo na głosowanie pisemne (art. 227 § 2 KSH).

## Działalność zawieszona przez cały rok

Jeżeli działalność spółki była zawieszona przez cały rok obrotowy i nie doszło do zamknięcia ksiąg, zwyczajne zgromadzenie za ten rok może się nie odbyć na podstawie uchwały wspólników. Sprawy te przechodzą wtedy na kolejne zwyczajne zgromadzenie (art. 231 § 6 KSH).

## Duża strata

Jeżeli bilans wykaże stratę przewyższającą sumę kapitałów zapasowego i rezerwowych oraz połowę kapitału zakładowego, zarząd jest obowiązany niezwłocznie zwołać zgromadzenie w celu powzięcia uchwały dotyczącej dalszego istnienia spółki (art. 233 § 1 KSH). Taka uchwała bywa łączona ze zwyczajnym zgromadzeniem.`,
    checklist: [
      'Upewnij się, że sprawozdanie finansowe zostało sporządzone i podpisane (do 3 miesięcy od dnia bilansowego).',
      'Sprawdź, czy na tym zgromadzeniu wygasają mandaty członków zarządu (art. 202 KSH).',
      'Zwołaj zgromadzenie albo przygotuj uchwały pisemne wszystkich wspólników.',
      'Podejmij uchwały: zatwierdzenie sprawozdań, podział zysku albo pokrycie straty, absolutorium dla każdego członka organów z ubiegłego roku.',
      'Wpisz uchwały do księgi protokołów.',
      'Złóż sprawozdanie finansowe wraz z uchwałą do KRS w ciągu 15 dni od zatwierdzenia.',
    ],
    official_links: [
      { label: 'Kodeks spółek handlowych — tekst jednolity (ISAP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240000018', external: true },
      { label: 'eKRS — złożenie dokumentów finansowych', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'e-Sprawozdanie finansowe sp. z o.o.', href: '/poradnik/e-sprawozdanie-finansowe-spolka-zoo/' },
      { label: 'Zgromadzenie wspólników — kiedy i jak zwołać', href: '/poradnik/zgromadzenie-wspolnikow-kiedy-i-jak-zwolac/' },
      { label: 'Planuj zgromadzenia w KsięgaI', href: '/rejestracja/' },
    ],
    faq: [
      {
        question: 'Czy spółka bez przychodów też musi odbyć zwyczajne zgromadzenie?',
        answer:
          'Tak. Obowiązek z art. 231 KSH dotyczy każdej sp. z o.o. Wyjątek to rok, w którym działalność była zawieszona przez cały czas i nie zamknięto ksiąg — wtedy wspólnicy mogą uchwałą przenieść sprawy na następne zgromadzenie (art. 231 § 6 KSH).',
      },
      {
        question: 'Co jeśli zgromadzenie odbędzie się po 30 czerwca?',
        answer:
          'Termin z art. 231 § 1 KSH zostaje przekroczony, a za nim przesuwa się też złożenie sprawozdania do KRS. Nieterminowe złożenie sprawozdania może skutkować wezwaniem i grzywną w postępowaniu przymuszającym przed sądem rejestrowym. Zwołaj zgromadzenie jak najszybciej.',
      },
      {
        question: 'Czy trzeba podjąć uchwałę, gdy spółka miała stratę?',
        answer: 'Tak — uchwała o pokryciu straty jest częścią obowiązkowego porządku obrad (art. 231 § 2 pkt 2 KSH).',
      },
    ],
    article_type: 'guide',
    sort_order: 33,
    published_at: '2026-09-29T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
    category: fallbackWikiCategories[6],
  },
  {
    id: 'fallback-posiedzenie-zarzadu',
    slug: 'posiedzenie-zarzadu-uchwaly-zarzadu',
    title: 'Posiedzenie zarządu i uchwały zarządu w sp. z o.o. — kiedy są wymagane',
    entityTypes: ['spolka'],
    excerpt:
      'Zarząd nie odbywa „zgromadzeń”, tylko posiedzenia. Kiedy uchwała zarządu jest potrzebna, jak ją podjąć (także zdalnie i pisemnie) i czym różni się od reprezentacji spółki.',
    summary:
      'Przy zarządzie wieloosobowym zwykłe sprawy może prowadzić każdy członek zarządu sam, ale sprawy ponad zwykły zarząd wymagają uprzedniej uchwały. Wyjaśniamy art. 208 KSH, prokurę, konflikt interesów i sytuację jednoosobowego zarządu.',
    purpose:
      'W spółkach z dwoma lub trzema członkami zarządu decyzje często zapadają „na korytarzu”. Gdy sprawa przekracza zwykłe czynności, brak uchwały zarządu naraża jego członków na odpowiedzialność wobec spółki.',
    body_markdown: `## Posiedzenie zarządu, a nie „zgromadzenie zarządu”

W sp. z o.o. „zgromadzenie” to organ wspólników. Zarząd (i rada nadzorcza) odbywa **posiedzenia** i podejmuje na nich **uchwały zarządu**. Przepisy o uchwałach zarządu stosuje się, gdy zarząd jest wieloosobowy — i tylko wtedy, gdy umowa spółki nie stanowi inaczej (art. 208 § 1 KSH).

## Kiedy uchwała zarządu jest potrzebna

- Każdy członek zarządu ma prawo i obowiązek prowadzenia spraw spółki (art. 208 § 2 KSH).
- Sprawy **nieprzekraczające zwykłych czynności** spółki może prowadzić samodzielnie, bez uchwały (art. 208 § 3 KSH).
- **Uprzednia uchwała zarządu** jest wymagana, gdy sprawa przekracza zakres zwykłych czynności spółki albo gdy przed jej załatwieniem choćby jeden z pozostałych członków zarządu się sprzeciwi (art. 208 § 4 KSH).

KSH nie definiuje „zwykłych czynności”. W praktyce ocenia się je według skali działalności spółki: bieżące zakupy, faktury sprzedażowe i typowe umowy z klientami to zwykłe czynności; zakup nieruchomości, duży kredyt, nowa linia biznesowa, zatrudnienie kluczowego menedżera — zwykle już nie. Umowa spółki albo regulamin zarządu może to doprecyzować.

## Jak podjąć uchwałę zarządu

| Zasada | Podstawa |
|---|---|
| Wszyscy członkowie muszą być prawidłowo zawiadomieni o posiedzeniu | art. 208 § 5 KSH |
| Uchwała zapada bezwzględną większością głosów | art. 208 § 5 KSH |
| Udział w posiedzeniu zdalnie (wideo, telefon) | art. 208 § 5¹ KSH — chyba że umowa spółki stanowi inaczej |
| Uchwała w trybie pisemnym lub zdalnym, bez posiedzenia | art. 208 § 5² KSH — chyba że umowa spółki stanowi inaczej |
| Głos na piśmie za pośrednictwem innego członka zarządu | art. 208 § 5³ KSH — chyba że umowa spółki stanowi inaczej |
| Głos rozstrzygający prezesa przy równości głosów | art. 208 § 8 KSH — tylko jeżeli przewiduje to umowa spółki |

## Prokura

Powołanie prokurenta wymaga zgody **wszystkich** członków zarządu, ale odwołać prokurę może każdy członek zarządu samodzielnie (art. 208 § 6–7 KSH).

## Konflikt interesów

W przypadku sprzeczności interesów spółki z interesami członka zarządu, jego małżonka, krewnych i powinowatych do drugiego stopnia oraz osób, z którymi jest powiązany osobiście, członek zarządu powinien ujawnić konflikt i wstrzymać się od udziału w rozstrzyganiu takiej sprawy (art. 209 KSH). Umowy między spółką a członkiem zarządu i tak podpisuje po stronie spółki rada nadzorcza albo pełnomocnik powołany uchwałą wspólników (art. 210 KSH).

## Uchwała zarządu a reprezentacja spółki

Uchwała zarządu to **decyzja wewnętrzna** — rozstrzyga, czy spółka coś zrobi. To, **kto podpisze** umowę na zewnątrz, wynika z zasad reprezentacji. Przy wieloosobowym zarządzie, jeżeli umowa spółki nie stanowi inaczej, do składania oświadczeń w imieniu spółki potrzebne jest współdziałanie dwóch członków zarządu albo członka zarządu z prokurentem (art. 205 § 1 KSH). Prawa członka zarządu do reprezentacji nie można ograniczyć ze skutkiem wobec osób trzecich (art. 204 § 2 KSH) — dlatego umowa podpisana bez wewnętrznej uchwały zwykle jest ważna, ale członek zarządu odpowiada wobec spółki.

## Jednoosobowy zarząd

Jednoosobowy zarząd nie zwołuje posiedzeń i nie podejmuje uchwał w rozumieniu art. 208 KSH — decyduje samodzielnie. Mimo to warto zapisywać ważne decyzje (z datą i uzasadnieniem): to dowód dla wspólników, księgowej i urzędu skarbowego, dlaczego spółka poniosła dany wydatek.

## Uchwały, które zawsze należą do wspólników

Uchwała zarządu nie zastąpi uchwały wspólników w sprawach zastrzeżonych dla wspólników — np. z art. 228 KSH, powołania członka zarządu (art. 201 § 4 KSH) czy umów z członkiem zarządu (art. 210 KSH). Porównanie: [Uchwała zarządu a uchwała wspólników](/poradnik/uchwala-zarzadu-a-uchwala-wspolnikow-roznice/).`,
    checklist: [
      'Sprawdź, czy zarząd jest wieloosobowy i czy umowa spółki zmienia zasady z art. 208 KSH.',
      'Ustal (najlepiej w regulaminie zarządu), co w Twojej spółce przekracza zwykłe czynności.',
      'Przed sprawą ponad zwykłe czynności zawiadom wszystkich członków zarządu i podejmij uchwałę.',
      'Członek zarządu w konflikcie interesów ujawnia go i nie głosuje.',
      'Protokołuj uchwały zarządu i przechowuj je razem z dokumentami, których dotyczą.',
    ],
    official_links: [
      { label: 'Kodeks spółek handlowych — tekst jednolity (ISAP)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240000018', external: true },
    ],
    related_actions: [
      { label: 'Uchwała zarządu a uchwała wspólników', href: '/poradnik/uchwala-zarzadu-a-uchwala-wspolnikow-roznice/' },
      { label: 'Pełnomocnik w sp. z o.o. — kiedy i jak powołać', href: '/poradnik/pelnomocnik-spolka-zoo-kiedy-i-jak-powolac/' },
      { label: 'Rejestr uchwał zarządu w KsięgaI', href: '/rejestracja/' },
    ],
    faq: [
      {
        question: 'Czy zarząd może podjąć uchwałę mailowo?',
        answer:
          'Tak — art. 208 § 5² KSH pozwala podejmować uchwały zarządu w trybie pisemnym lub przy użyciu środków porozumiewania się na odległość, chyba że umowa spółki stanowi inaczej. Wszyscy członkowie muszą zostać zawiadomieni.',
      },
      {
        question: 'Co jeśli członkowie zarządu mają po równo głosów?',
        answer:
          'Uchwała nie zapada, bo potrzebna jest bezwzględna większość. Głos rozstrzygający prezesa działa tylko wtedy, gdy przewiduje go umowa spółki (art. 208 § 8 KSH).',
      },
      {
        question: 'Czy do powołania prokurenta wystarczy decyzja prezesa?',
        answer: 'Przy zarządzie wieloosobowym nie — wymagana jest zgoda wszystkich członków zarządu (art. 208 § 6 KSH).',
      },
    ],
    article_type: 'guide',
    sort_order: 34,
    published_at: '2026-09-29T00:00:00.000Z',
    updated_at: '2026-09-29T00:00:00.000Z',
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

> **Ważne:** jeśli pożyczkodawcą jest wspólnik będący jednocześnie **członkiem zarządu**, do podpisania umowy po stronie spółki potrzebny jest **pełnomocnik powołany uchwałą wspólników** (KSH art. 210). Zarząd nie może sam ze sobą zawierać umów. [Przeczytaj więcej o KSH art. 210 →](/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu)

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
      { label: 'KSH art. 210 — pełnomocnik do umów z zarządem', href: '/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
      { label: 'Jak wyprowadzić zysk ze spółki', href: '/poradnik/jak-wyprowadzic-zysk-ze-spolki-zoo-dywidenda-wynajem-b2b' },
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
- Przy umowie najmu z samym sobą jako zarządem: **art. 210 KSH** — spółka musi mieć pełnomocnika powołanego uchwałą ZW do podpisania umowy ([szczegóły tutaj](/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu))
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
      { label: 'Jak finansować spółkę — pożyczka wspólnika i dopłaty', href: '/poradnik/finansowanie-spolki-pozyczka-wspolnika-doplaty-kapital' },
      { label: 'KSH art. 210 — pełnomocnik do umów z zarządem', href: '/poradnik/ksh-art-210-pelnomocnik-umowy-z-czlonkami-zarzadu' },
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

  // ─── Struktury spółek i podatki ──────────────────────────────────────────────

  {
    id: 'fallback-struktury-jdg-vs-spolka',
    slug: 'jdg-czy-spolka-zoo-co-wybrac',
    entityTypes: ['jdg', 'spolka'],
    title: 'JDG czy spółka z o.o. — co wybrać?',
    excerpt: 'JDG jest prosta i tania w obsłudze, ale właściciel odpowiada za długi całym swoim majątkiem. Sp. z o.o. daje ograniczoną odpowiedzialność, lecz wymaga pełnej księgowości i więcej formalności.',
    summary: 'Porównanie JDG i sp. z o.o. pod kątem odpowiedzialności, podatków, ZUS, kosztów obsługi i sytuacji, w których każda forma ma przewagę.',
    purpose: 'Wybór formy działalności ma długofalowe konsekwencje podatkowe, prawne i operacyjne. Decyzja podjęta bez analizy może kosztować dużo więcej niż wcześniejsza konsultacja z doradcą.',
    body_markdown: `## Na czym polega podstawowa różnica

JDG (jednoosobowa działalność gospodarcza) to najprostsza forma prowadzenia firmy w Polsce. Rejestrujesz ją w CEIDG bezpłatnie, bez kapitału startowego ani notariusza. Spółka z o.o. to odrębna osoba prawna — ma własny NIP, własny majątek i własne zobowiązania.

## Odpowiedzialność

W **JDG** odpowiadasz za zobowiązania firmy całym swoim majątkiem — prywatnym i firmowym. Wierzyciel może sięgnąć do Twoich oszczędności, samochodu czy nieruchomości.

W **spółce z o.o.** ryzyko jest co do zasady ograniczone do wkładu wspólnika. Twój prywatny majątek jest oddzielony od majątku spółki — o ile nie zaciągałeś zobowiązań jako osoba prywatna (np. poręczenia, kredyty osobiste).

Ważny wyjątek: zarząd sp. z o.o. może odpowiadać osobiście za zobowiązania spółki w określonych sytuacjach — m.in. przy niezłożeniu wniosku o upadłość w terminie lub przy zaległościach podatkowych (art. 116 Ordynacji podatkowej).

## Podatki

**JDG** może rozliczać się na zasadach ogólnych (skala 12%/32%), podatkiem liniowym (19%) lub ryczałtem od przychodów ewidencjonowanych. Nie ma podatku od dywidend — cały zysk to dochód właściciela.

**Sp. z o.o.** płaci CIT: 19%, lub 9% dla małych podatników i nowych firm (do 2 mln EUR przychodu). Wypłata zysku jako dywidenda podlega dodatkowym 19% PIT po stronie wspólnika. To tzw. podwójne opodatkowanie — ale przy odpowiednio wysokich dochodach może być łącznie korzystniejsze niż wysoka stawka PIT w JDG.

## ZUS

Właściciel JDG płaci pełne składki ZUS niezależnie od zarobków (lub korzysta z Małego ZUS Plus i preferencyjnych stawek na starcie).

Wspólnik sp. z o.o. co do zasady nie podlega ZUS jako wspólnik. Wyjątek: **jednoosobowa sp. z o.o.** — tu zasady są zbliżone do JDG. Jeśli wspólnik pełni funkcję zarządu za wynagrodzeniem lub jest zatrudniony w spółce, ZUS jest naliczany od tego wynagrodzenia.

## Księgowość

JDG może prowadzić uproszczoną ewidencję: Książkę Przychodów i Rozchodów (KPiR) lub ewidencję ryczałtu. Koszty biura rachunkowego są niższe.

Sp. z o.o. jest zobowiązana do **pełnej księgowości** — planu kont, dziennika, bilansu i rachunku wyników. To wyższy koszt obsługi i więcej dokumentów do prowadzenia na bieżąco.

## Kiedy JDG ma więcej sensu

- Mała działalność, niskie ryzyko prawne, brak wspólników.
- Proste usługi z ryczałtem i niskimi kosztami operacyjnymi.
- Chcesz minimalnych kosztów startowych i prostych formalności.

## Kiedy sp. z o.o. może być lepszym wyborem

- Działalność z wyższym ryzykiem — budownictwo, handel, produkcja, kontrakty z dużymi zobowiązaniami.
- Kilku wspólników — sp. z o.o. daje czytelną strukturę udziałową i zasady współpracy.
- Planowany wzrost, pozyskanie inwestorów lub przejęcie firmy.
- Wysokie dochody, gdzie podwójne opodatkowanie i tak wychodzi korzystnie w porównaniu z PIT.
- Większa wiarygodność wobec klientów korporacyjnych i banków.

## Nie ma jednej dobrej odpowiedzi

Wybór zależy od poziomu przychodów, ryzyka, planów na przyszłość i gotowości na wyższe koszty administracyjne. Warto skonsultować się z doradcą podatkowym przed podjęciem decyzji.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Przed podjęciem decyzji dotyczących formy działalności skonsultuj się z doradcą podatkowym lub prawnikiem.`,
    checklist: [
      'Sprawdź planowany poziom przychodów i kosztów — to wpływa na opłacalność różnych form opodatkowania.',
      'Oceń, jakie ryzyko prawne i finansowe niesie Twoja działalność.',
      'Zastanów się, czy będziesz miał wspólnika lub planujesz pozyskanie inwestora.',
      'Porównaj koszty ZUS i obsługi księgowej dla obu form przy Twoim poziomie przychodów.',
      'Skonsultuj wybór z doradcą podatkowym przed złożeniem dokumentów rejestracyjnych.',
    ],
    official_links: [
      { label: 'CEIDG — rejestracja JDG', href: 'https://www.biznes.gov.pl/pl/firma/rejestracja-firmy/chce-zalozyc-jednoosobowa-dzialalnosc-gospodarcza', external: true },
      { label: 'Portal S24 — rejestracja sp. z o.o. online', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Rodzaje spółek w Polsce — przewodnik', href: '/poradnik/rodzaje-spolek-w-polsce-przewodnik' },
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Jak przygotować spółkę do pełnej księgowości', href: '/poradnik/jak-przygotowac-spolke-zoo-do-pelnej-ksiegowosci' },
      { label: 'Załóż konto w KsięgaI', href: '/rejestracja' },
    ],
    faq: [
      {
        question: 'Czy mogę zmienić JDG na spółkę z o.o.?',
        answer: 'Tak. Możesz przekształcić JDG w sp. z o.o. na podstawie art. 551 § 5 Kodeksu spółek handlowych. To proces formalny, który wymaga notariusza, aktualizacji rejestrów i zmiany umów. Warto zacząć od konsultacji z doradcą podatkowym i prawnikiem.',
      },
      {
        question: 'Czy sp. z o.o. zawsze ma podwójne opodatkowanie?',
        answer: 'Podwójne opodatkowanie dotyczy wypłaty zysku jako dywidendy — spółka płaci CIT, a wspólnik płaci 19% PIT od dywidendy. Można to częściowo ograniczyć innymi legalnymi formami wynagrodzenia, ale każda z nich ma swoje zasady i ograniczenia.',
      },
      {
        question: 'Czy właściciel sp. z o.o. płaci ZUS?',
        answer: 'Wspólnik wieloosobowej sp. z o.o. co do zasady nie płaci ZUS jako wspólnik. Jednoosobowa sp. z o.o. podlega ZUS na zasadach zbliżonych do JDG. Jeśli wspólnik jest zatrudniony lub pełni funkcję zarządu za wynagrodzeniem, ZUS jest naliczany od wynagrodzenia.',
      },
      {
        question: 'Jaki jest minimalny kapitał zakładowy sp. z o.o.?',
        answer: 'Minimalny kapitał zakładowy sp. z o.o. wynosi 5 000 zł. Nie musi być wpłacony wyłącznie w gotówce — może też stanowić wkład niepieniężny (aport), np. sprzęt lub prawa majątkowe.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-rodzaje-spolek',
    slug: 'rodzaje-spolek-w-polsce-przewodnik',
    entityTypes: ['spolka', 'jdg'],
    title: 'Rodzaje spółek w Polsce — prosty przewodnik',
    excerpt: 'Polskie prawo gospodarcze oferuje kilka form spółek. Każda różni się odpowiedzialnością, opodatkowaniem, kosztami rejestracji i typowym zastosowaniem.',
    summary: 'Przegląd form prawnych: sp. z o.o., SA, PSA, spółka komandytowa, spółka jawna i JDG jako punkt odniesienia — różnice w odpowiedzialności, podatkach i typowych zastosowaniach.',
    purpose: 'Wielu założycieli nie zdaje sobie sprawy, że poza sp. z o.o. istnieje kilka innych form prawnych — każda z różnym profilem odpowiedzialności, opodatkowania i kosztów.',
    body_markdown: `## Spółka z ograniczoną odpowiedzialnością (sp. z o.o.)

Najpopularniejsza forma spółki kapitałowej w Polsce. Minimalny kapitał: 5 000 zł, przynajmniej jeden wspólnik. Wspólnicy odpowiadają do wysokości wkładu. Spółka płaci CIT (9% lub 19%). Wymagana pełna księgowość. Dobra dla większości małych i średnich firm prowadzących działalność z ryzykiem prawnym lub finansowym.

## Prosta spółka akcyjna (PSA)

Nowa forma (od 2021 r.) stworzona z myślą o startupach i firmach technologicznych. Minimalny kapitał: 1 zł. Elastyczna struktura — możliwość emisji akcji za wkład niepieniężny, w tym pracę. Płaci CIT. Brak obligatoryjnej rady nadzorczej. Interesujący wybór dla projektów wymagających elastycznego podziału własności i zaangażowania pracowników.

## Spółka akcyjna (SA)

Stosowana przy dużych spółkach, spółkach giełdowych lub pozyskujących kapitał od wielu inwestorów. Minimalny kapitał: 100 000 zł. Skomplikowana struktura: zarząd, rada nadzorcza, walne zgromadzenie akcjonariuszy. Wymagana pełna księgowość i audyt powyżej określonych progów. Rzadko wybierana przez małe i średnie firmy.

## Spółka komandytowa

Spółka osobowa z dwoma rodzajami wspólników: **komplementariuszem** (odpowiada całym swoim majątkiem, prowadzi sprawy spółki) i **komandytariuszem** (odpowiada tylko do sumy komandytowej). Od 2021 r. płaci CIT jak spółka kapitałowa. Stosowana m.in. jako forma holdingu, przy specyficznych modelach biznesowych lub w tradycyjnych strukturach rodzinnych.

## Spółka jawna

Prosta spółka osobowa. Wszyscy wspólnicy odpowiadają solidarnie całym swoim majątkiem za zobowiązania spółki. Nie płaci CIT — wspólnicy rozliczają dochody indywidualnie (PIT). Uproszczona ewidencja możliwa poniżej ustawowych limitów przychodów. Odpowiednia dla małych, opartych na zaufaniu partnerstw — np. firm rodzinnych lub usługowych.

## JDG — punkt odniesienia

Jednoosobowa działalność gospodarcza nie jest spółką, ale warto ją uwzględnić w porównaniu: zero wymaganego kapitału, pełna osobista odpowiedzialność właściciela, prostsza ewidencja (KPiR lub ryczałt), ZUS zawsze. Dla wielu osób to najlepszy punkt startowy przed ewentualnym przejściem do sp. z o.o.

## Szybkie porównanie

**JDG:** brak kapitału, pełna odpowiedzialność, PIT, KPiR lub ryczałt

**Sp. jawna:** brak kapitału, pełna odpowiedzialność solidarna wspólników, PIT, uproszczona lub pełna ewidencja

**Sp. komandytowa:** brak kapitału, odpowiedzialność mieszana (komplementariusz pełna, komandytariusz ograniczona), CIT, pełna księgowość

**Sp. z o.o.:** min. 5 000 zł kapitału, odpowiedzialność ograniczona do wkładu, CIT 9%/19%, pełna księgowość

**PSA:** min. 1 zł kapitału, odpowiedzialność ograniczona, CIT, pełna księgowość

**SA:** min. 100 000 zł kapitału, odpowiedzialność ograniczona, CIT, pełna księgowość i audyt

## Którą wybrać?

Nie ma jednej odpowiedzi. Wybór zależy od skali działalności, ryzyka, liczby wspólników i planów na przyszłość. Sp. z o.o. to sensowna domyślna opcja dla większości firm — ale warto sprawdzić, czy PSA, sp. komandytowa lub inna forma nie pasuje lepiej do Twojego modelu.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Skonsultuj wybór formy prawnej z doradcą.`,
    checklist: [
      'Oceń, ilu wspólników bierze udział w przedsięwzięciu i jak chcesz ułożyć odpowiedzialność.',
      'Sprawdź, czy Twoja działalność wymaga ograniczonej odpowiedzialności (ryzyko kontraktowe, finansowe).',
      'Porównaj obciążenia podatkowe dla różnych form przy Twoim modelu wypłat.',
      'Sprawdź koszty rejestracji i obsługi księgowej dla wybranej formy.',
      'Skonsultuj się z prawnikiem lub doradcą podatkowym przed rejestracją.',
    ],
    official_links: [
      { label: 'Kodeks spółek handlowych — tekst jednolity', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
      { label: 'Portal Biznes.gov.pl — rejestracja firm', href: 'https://www.biznes.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'JDG czy spółka z o.o. — co wybrać', href: '/poradnik/jdg-czy-spolka-zoo-co-wybrac' },
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Holding spółek — co to jest i kiedy ma sens', href: '/poradnik/holding-spolek-co-to-jest' },
    ],
    faq: [
      {
        question: 'Która forma spółki jest najpopularniejsza w Polsce?',
        answer: 'Spółka z ograniczoną odpowiedzialnością (sp. z o.o.) — ze względu na ograniczoną odpowiedzialność, stosunkowo niski kapitał zakładowy i ugruntowaną praktykę prawną i podatkową.',
      },
      {
        question: 'Czy spółka jawna płaci CIT?',
        answer: 'Co do zasady nie — wspólnicy rozliczają dochody ze spółki jawnej jako własny PIT. Wyjątek: jeśli wspólnikiem jest osoba prawna (np. sp. z o.o.), spółka jawna może zostać objęta CIT.',
      },
      {
        question: 'Czym różni się PSA od sp. z o.o.?',
        answer: 'Prosta spółka akcyjna ma minimalny kapitał 1 zł (vs 5 000 zł), bardziej elastyczną strukturę akcyjną, możliwość emisji akcji za pracę, i uproszczone zasady zarządzania. To forma dedykowana startupom i projektom wymagającym elastycznego podziału własności.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-spolka-podatki',
    slug: 'spolka-zoo-jakie-podatki',
    title: 'Spółka z o.o. — jakie podatki płaci?',
    excerpt: 'Sp. z o.o. płaci CIT od zysku, VAT jeśli jest czynnym podatnikiem, a jeśli zatrudnia lub wypłaca wynagrodzenie zarządu — także PIT i ZUS od tych wynagrodzeń. Dywidenda dla wspólnika podlega osobnemu 19% PIT.',
    summary: 'Przegląd podatków sp. z o.o.: CIT, VAT, PIT/ZUS od wynagrodzeń, podatek od dywidendy i dlaczego pieniądze na koncie firmowym nie są automatycznie Twoim dochodem.',
    purpose: 'Wielu nowych właścicieli spółek myli przychód na koncie firmowym z własnym dochodem. Zrozumienie systemu podatkowego sp. z o.o. jest kluczowe, żeby uniknąć kosztownych błędów.',
    body_markdown: `## CIT — podatek dochodowy od osób prawnych

Sp. z o.o. płaci CIT od osiągniętego dochodu (przychody minus koszty uzyskania przychodu).

**Stawki CIT:**
- **9%** — dla małych podatników (przychody do 2 mln EUR rocznie) i nowych spółek w pierwszym roku podatkowym
- **19%** — stawka podstawowa

CIT jest rozliczany rocznie (zeznanie CIT-8), ale w ciągu roku spółka wpłaca **zaliczki** miesięczne lub kwartalne.

## VAT — jeśli spółka jest podatnikiem VAT

Spółka nie jest automatycznie podatnikiem VAT. Rejestracja jako czynny podatnik VAT jest obowiązkowa przy przekroczeniu limitu sprzedaży (200 000 zł rocznie) lub dobrowolna wcześniej.

Czynny podatnik VAT:
- wystawia faktury z VAT
- odlicza VAT naliczony od zakupów firmowych
- składa JPK_V7M lub JPK_V7K i wpłaca różnicę

## PIT i ZUS od wynagrodzeń

Jeśli spółka zatrudnia pracowników lub wypłaca wynagrodzenie zarządu, staje się płatnikiem PIT i ZUS. Spółka pobiera i odprowadza podatek oraz składki — nie płaci ich za siebie, lecz w imieniu pracowników i zleceniobiorców.

Wynagrodzenie członków zarządu może być wypłacane na podstawie:
- umowy o pracę (pełny PIT i ZUS)
- umowy zlecenia (PIT i ZUS zależnie od sytuacji)
- uchwały zgromadzenia wspólników (PIT według skali, ZUS może nie wystąpić przy wieloosobowej sp. z o.o.)

## Podatek od dywidendy

Wypłata zysku wspólnikom (dywidenda) podlega zryczałtowanemu PIT w wysokości **19%**. Spółka potrąca podatek i wpłaca go do urzędu skarbowego — wspólnik otrzymuje kwotę netto.

To tzw. podwójne opodatkowanie: spółka najpierw zapłaciła CIT od zysku, a teraz wspólnik płaci PIT od dywidendy. Łączne obciążenie przy CIT 19% i dywidendzie 19% wynosi ok. 34%.

## Pieniądze na koncie firmowym to nie Twój dochód

To jeden z najważniejszych wniosków dla nowych właścicieli spółek. Przychód zaksięgowany na fakturze lub wpłata na rachunek spółki **nie są** automatycznie Twoim dochodem — są dochodem spółki. Żeby pieniądze trafiły do Ciebie, musi nastąpić formalna wypłata: dywidenda, wynagrodzenie, pożyczka lub inna udokumentowana transakcja.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Przed podjęciem decyzji podatkowych skonsultuj się z doradcą.`,
    checklist: [
      'Sprawdź, czy spółka kwalifikuje się do stawki CIT 9% (przychody do 2 mln EUR).',
      'Upewnij się, że spółka jest zarejestrowana jako podatnik VAT — jeśli powinna być.',
      'Ustal z księgową, jaka forma wynagrodzenia zarządu jest stosowana i czy wymaga uchwały.',
      'Zaplanuj wypłatę dywidendy po zatwierdzeniu sprawozdania finansowego.',
      'Zadbaj o rozdzielność finansów spółki od prywatnych — oddzielne konto, dokumentacja każdej wypłaty.',
    ],
    official_links: [
      { label: 'Ustawa o CIT — tekst jednolity', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19920210086', external: true },
      { label: 'VAT — rejestracja i rozliczenia (podatki.gov.pl)', href: 'https://www.podatki.gov.pl/vat/', external: true },
    ],
    related_actions: [
      { label: 'JDG czy spółka z o.o. — co wybrać', href: '/poradnik/jdg-czy-spolka-zoo-co-wybrac' },
      { label: 'Jak wypłacać pieniądze ze spółki z o.o.', href: '/poradnik/jak-wyplacac-pieniadze-ze-spolki-zoo' },
      { label: 'Jak przygotować spółkę do pełnej księgowości', href: '/poradnik/jak-przygotowac-spolke-zoo-do-pelnej-ksiegowosci' },
      { label: 'Kiedy spółka z o.o. potrzebuje uchwały', href: '/poradnik/kiedy-spolka-zoo-potrzebuje-uchwaly' },
    ],
    faq: [
      {
        question: 'Czy nowa spółka z o.o. płaci 9% CIT?',
        answer: 'Tak — nowe spółki z o.o. mogą korzystać ze stawki 9% CIT w pierwszym roku podatkowym, niezależnie od przychodów. W kolejnych latach stawka 9% przysługuje małym podatnikom z przychodami do 2 mln EUR rocznie.',
      },
      {
        question: 'Kiedy spółka musi zarejestrować się jako podatnik VAT?',
        answer: 'Obowiązek rejestracji jako czynny podatnik VAT pojawia się, gdy sprzedaż przekroczy 200 000 zł rocznie (w poprzednim roku lub w bieżącym). Można zarejestrować się wcześniej dobrowolnie — co daje prawo do odliczania VAT od zakupów.',
      },
      {
        question: 'Ile wynosi łączne opodatkowanie przy wypłacie dywidendy?',
        answer: 'Przy stawce CIT 19% i podatku od dywidendy 19% łączne efektywne opodatkowanie zysku wynosi ok. 34% (spółka płaci 19% CIT od zysku brutto, a wspólnik płaci 19% od dywidendy wypłaconej z zysku netto). Przy CIT 9% łączne opodatkowanie wynosi ok. 26,3%.',
      },
      {
        question: 'Czy spółka płaci VAT od dywidendy?',
        answer: 'Nie. Dywidenda to wypłata zysku — nie jest sprzedażą towarów ani usług, więc nie podlega VAT. Podlega natomiast zryczałtowanemu PIT 19%, który spółka potrąca i wpłaca do urzędu skarbowego.',
      },
    ],
    article_type: 'guide',
    sort_order: 30,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-wyplaty-ze-spolki',
    slug: 'jak-wyplacac-pieniadze-ze-spolki-zoo',
    title: 'Jak wypłacać pieniądze ze spółki z o.o.?',
    excerpt: 'Pieniądze ze spółki z o.o. możesz wypłacić jako dywidendę, wynagrodzenie zarządu, wynagrodzenie z umowy o pracę, kontrakt B2B przez JDG, czynsz za najem lub zwrot pożyczki. Każda metoda wymaga dokumentacji i właściwego rozliczenia.',
    summary: 'Przegląd legalnych metod wypłaty środków ze spółki z o.o. — dywidenda, wynagrodzenie zarządu, umowa o pracę, B2B, najem, pożyczka i zwrot kosztów — wraz z obowiązkami dokumentacyjnymi.',
    purpose: 'Brak formalnej dokumentacji przy wypłatach ze spółki to częsty powód zakwestionowania kosztów przez organy podatkowe lub pretensji wspólników. Każda wypłata musi mieć podstawę prawną i ślad w księgowości.',
    body_markdown: `## Dywidenda

Dywidenda to wypłata zysku spółki na rzecz wspólników po zakończeniu roku obrotowego. Wymaga:
- zatwierdzenia sprawozdania finansowego przez zgromadzenie wspólników
- uchwały o podziale zysku
- spółka potrąca i odprowadza 19% PIT do urzędu skarbowego

W ciągu roku można wypłacać **zaliczki na dywidendę**, jeśli umowa spółki to dopuszcza i spółka wypracowała zysk. Zaliczki podlegają tym samym zasadom podatkowym.

Dywidenda nie podlega ZUS — to jej podstawowa przewaga nad wynagrodzeniem w kontekście składek społecznych.

## Wynagrodzenie zarządu na podstawie uchwały

Prostą formą regularnej wypłaty jest wynagrodzenie zarządu ustalone uchwałą zgromadzenia wspólników. Nie wymaga umowy. Podlega PIT według skali (12%/32%), a ZUS — zależnie od struktury udziałowej i statusu ubezpieczenia.

To dobra opcja dla osób prowadzących spółkę jednoosobowo lub w małym gronie, które chcą regularnej wypłaty bez zatrudnienia.

## Umowa o pracę

Wspólnik lub inna osoba może być zatrudniona w spółce na umowę o pracę. To pełne koszty: PIT według skali, składki ZUS pracownicze i pracodawcy. Wynagrodzenie z umowy o pracę jest kosztem spółki (obniża CIT).

Ważne: umowa o pracę z jedynym wspólnikiem jednoosobowej sp. z o.o. jest podważana przez ZUS jako pozorna. W takiej sytuacji lepiej stosować inne formy.

## Kontrakt B2B przez JDG

Wspólnik lub osoba blisko związana ze spółką może świadczyć usługi na jej rzecz przez własną JDG na podstawie umowy B2B. To realna opcja, jeśli usługi są faktycznie świadczone, wycenione rynkowo i udokumentowane. Podlega PIT (liniowy lub ryczałt) i ZUS w JDG.

Organy podatkowe kontrolują transakcje między powiązanymi podmiotami — cena musi być rynkowa.

## Najem nieruchomości lub sprzętu spółce

Jeśli wspólnik lub osoba trzecia wynajmuje spółce nieruchomość, samochód lub sprzęt — czynsz jest kosztem spółki i przychodem wynajmującego (PIT z najmu). Umowa musi być pisemna, czynsz rynkowy.

Ważne: jeśli wspólnik jest jednocześnie członkiem zarządu, umowę ze strony spółki musi podpisać pełnomocnik powołany przez zgromadzenie wspólników (art. 210 KSH).

## Spłata pożyczki

Jeśli wspólnik pożyczył spółce pieniądze (pożyczka wspólnika), spłata tej pożyczki nie jest dochodem wspólnika — to zwrot kapitału. Odsetki od pożyczki są jednak opodatkowane PIT po stronie wspólnika. Pożyczka musi być udokumentowana umową i wpisana do ksiąg rachunkowych.

## Zwrot poniesionych kosztów

Pracownicy i osoby działające w imieniu spółki mogą otrzymać zwrot wydatków faktycznie poniesionych w imieniu spółki — np. delegacje, zakupy firmowe. Zwrot kosztów nie jest dochodem, ale wymaga dokumentacji: faktur, rachunków, oświadczeń.

## Dlaczego każda metoda wymaga dokumentacji

Brak właściwej dokumentacji naraża spółkę na zakwestionowanie kosztów przez urząd skarbowy i może skutkować uznaniem wypłaty za ukrytą dywidendę — opodatkowaną bez możliwości odliczenia kosztów. Każda transakcja powinna mieć podstawę prawną (uchwała, umowa, faktura) i odzwierciedlenie w księgach.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Przed wdrożeniem konkretnej formy wypłat skonsultuj się z doradcą podatkowym lub biurem rachunkowym.`,
    checklist: [
      'Ustal z księgową, jaka forma wypłaty jest najlepsza przy Twojej strukturze udziałowej i poziomie dochodów.',
      'Upewnij się, że każda wypłata ma podstawę prawną: uchwałę, umowę lub fakturę.',
      'Nie mieszaj finansów prywatnych z firmowymi — każda transakcja przez konto spółki musi być udokumentowana.',
      'Przed wypłatą dywidendy zatwierdź sprawozdanie finansowe i podejmij uchwałę o podziale zysku.',
      'Sprawdź, czy umowy z podmiotami powiązanymi mają rynkowe warunki i wymaganą formę (np. pełnomocnik przy art. 210 KSH).',
    ],
    official_links: [
      { label: 'Art. 210 KSH — umowy z zarządem', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Kiedy spółka z o.o. potrzebuje uchwały', href: '/poradnik/kiedy-spolka-zoo-potrzebuje-uchwaly' },
      { label: 'Jak przygotować spółkę do pełnej księgowości', href: '/poradnik/jak-przygotowac-spolke-zoo-do-pelnej-ksiegowosci' },
    ],
    faq: [
      {
        question: 'Czy dywidenda podlega ZUS?',
        answer: 'Nie. Dywidenda wypłacana wspólnikom sp. z o.o. nie podlega składkom ZUS. To jedna z jej głównych różnic w stosunku do wynagrodzenia.',
      },
      {
        question: 'Ile razy w roku można wypłacić dywidendę?',
        answer: 'Klasyczna dywidenda roczna jest wypłacana raz — po zatwierdzeniu sprawozdania finansowego. Jeśli umowa spółki to dopuszcza i spółka wypracowała zysk, można wypłacać zaliczki na dywidendę w ciągu roku.',
      },
      {
        question: 'Czy mogę po prostu przelać sobie pieniądze ze spółki?',
        answer: 'Nie. Przelew ze spółki na konto prywatne bez podstawy prawnej i dokumentacji jest traktowany jako wypłata bez tytułu. Może zostać zakwestionowany przez urząd skarbowy i potraktowany jako ukryta dywidenda lub przychód podlegający opodatkowaniu.',
      },
      {
        question: 'Co to jest ukryta dywidenda?',
        answer: 'Ukryta dywidenda to nieformalna, niedokumentowana korzyść udzielana wspólnikowi przez spółkę — np. zapłata za usługi po zawyżonych cenach, bezpłatne korzystanie z majątku spółki lub zwroty kosztów bez dokumentów. Organy podatkowe mogą ją zakwestionować i opodatkować.',
      },
    ],
    article_type: 'guide',
    sort_order: 40,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-holding',
    slug: 'holding-spolek-co-to-jest',
    title: 'Holding spółek — co to jest i kiedy ma sens?',
    excerpt: 'Holding to struktura, w której jedna spółka (matka) posiada udziały w innych spółkach (córkach). Pozwala separować ryzyko, centralnie zarządzać przepływami pieniędzy i porządkować własność aktywów.',
    summary: 'Czym jest holding, jak wygląda struktura matka-córka, kiedy separacja operacji od aktywów ma sens i kiedy holding jest niepotrzebną komplikacją.',
    purpose: 'Wielu przedsiębiorców słyszy o holdingach i zastanawia się, czy to coś dla nich. Warto rozumieć, kiedy taka struktura faktycznie pomaga — a kiedy tylko komplikuje życie i podnosi koszty.',
    body_markdown: `## Co to jest holding

Holding to nieformalne określenie struktury, w której jedna spółka — zwana spółką dominującą lub holdingową — posiada udziały w jednej lub kilku spółkach zależnych (operacyjnych lub majątkowych).

Nie ma jednej definicji prawnej holdingu w polskim prawie. To po prostu struktura właścicielska opisana przez relacje między spółkami.

## Jak wygląda typowa struktura

Przykład: masz spółkę z o.o., która prowadzi działalność operacyjną (wykonuje usługi, sprzedaje produkty). Zakładasz drugą spółkę z o.o. i przenosisz do niej własność nieruchomości lub maszyn. Spółka majątkowa wynajmuje aktywa spółce operacyjnej. Udziały w obu spółkach trzymasz w trzeciej spółce holdingowej.

### Dlaczego to działa

- Spółka operacyjna ponosi ryzyko kontraktowe i biznesowe — ale jej majątek jest ograniczony (aktywa są w spółce majątkowej).
- Spółka majątkowa jest chroniona przed roszczeniami wobec spółki operacyjnej.
- Dywidendy płynące od córek do holdingu mogą korzystać ze zwolnienia z podatku przy spełnieniu określonych warunków.

## Kiedy holding ma sens

- **Wiele linii biznesowych lub marek** — każda w osobnej spółce, ryzyko jednej nie przenoszone na inne.
- **Oddzielenie aktywów od operacji** — nieruchomości, IP, know-how w spółce majątkowej, ryzykowna sprzedaż w spółce operacyjnej.
- **Kilku wspólników z różnymi udziałami w poszczególnych projektach** — holding umożliwia czytelne ułożenie własności.
- **Planowanie sukcesji** — holding może ułatwić przekazanie majątku lub zaangażowanie kolejnego pokolenia.
- **Większa skala działalności** — przy przychodach i aktywach uzasadniających koszty dodatkowych spółek.

## Kiedy holding jest overkill

- Jednoosobowa mała firma z jedną działalnością i małymi aktywami.
- Przychody nie uzasadniają kosztów obsługi prawnej i księgowej kilku spółek.
- Brak planów na wzrost, wspólników lub dodatkowe projekty.
- Nie ma realnego ryzyka, które uzasadniałoby separację majątku.

## Koszty i obowiązki holdingu

Każda spółka w strukturze to odrębna pełna księgowość, odrębne deklaracje podatkowe, odrębne konto bankowe, odrębne uchwały i zgromadzenia. Koszty obsługi rosną proporcjonalnie do liczby spółek. Zarządzanie relacjami między spółkami wymaga starannej dokumentacji i spójnych umów wewnątrzgrupowych.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Struktury holdingowe wymagają indywidualnej analizy — skonsultuj się z doradcą.`,
    checklist: [
      'Oceń, czy masz realny powód do separacji podmiotów (ryzyko, aktywa, wspólnicy, skala).',
      'Policz koszty obsługi każdej dodatkowej spółki — księgowość, konto, deklaracje, uchwały.',
      'Sprawdź z doradcą, czy dywidendy w planowanej strukturze kwalifikują się do zwolnienia podatkowego.',
      'Zaplanuj umowy wewnątrzgrupowe (najem, licencje, usługi) z rynkowymi cenami.',
      'Upewnij się, że struktura ma uzasadnienie ekonomiczne, a nie jest tworzona wyłącznie dla optymalizacji podatkowej.',
    ],
    official_links: [
      { label: 'Przepisy KSH o spółkach powiązanych', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Jedna spółka czy kilka spółek', href: '/poradnik/jedna-czy-kilka-spolek' },
      { label: 'Rodzaje spółek w Polsce — przewodnik', href: '/poradnik/rodzaje-spolek-w-polsce-przewodnik' },
      { label: 'Jak wypłacać pieniądze ze spółki z o.o.', href: '/poradnik/jak-wyplacac-pieniadze-ze-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy holding jest legalny?',
        answer: 'Tak. Struktury holdingowe są całkowicie legalne i powszechnie stosowane w Polsce i na świecie. Ważne, żeby transakcje między spółkami powiązanymi były prowadzone po cenach rynkowych i dokumentowane zgodnie z przepisami o cenach transferowych.',
      },
      {
        question: 'Czy dywidendy między spółkami w grupie są opodatkowane?',
        answer: 'Dywidendy wypłacane przez spółkę zależną do spółki dominującej mogą korzystać ze zwolnienia z CIT, jeśli spółka dominująca posiada co najmniej 10% udziałów przez co najmniej 2 lata. To tzw. zwolnienie dywidendowe (art. 22 ust. 4 ustawy o CIT). Warunki należy sprawdzić z doradcą.',
      },
      {
        question: 'Ile spółek potrzeba do holdingu?',
        answer: 'Minimalnie dwie: spółka dominująca i co najmniej jedna spółka zależna. W praktyce holding może obejmować dowolną liczbę podmiotów, w tym spółki w innych krajach.',
      },
    ],
    article_type: 'guide',
    sort_order: 50,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-jedna-kilka-spolek',
    slug: 'jedna-czy-kilka-spolek',
    title: 'Jedna spółka czy kilka spółek?',
    excerpt: 'Jedna spółka jest prostsza i tańsza w obsłudze. Kilka spółek może mieć sens, gdy działalności różnią się ryzykiem, wspólnikami lub aktywami wymagającymi separacji.',
    summary: 'Kiedy jedna sp. z o.o. wystarczy, a kiedy warto rozważyć kilka podmiotów — separacja ryzyka, aktywów, wspólników i marek, a także realne koszty i obowiązki przy rozbudowanych strukturach.',
    purpose: 'Decyzja o tworzeniu kolejnych spółek powinna być oparta na realnych potrzebach biznesowych, nie wyłącznie na zasadzie "tak robią duże firmy".',
    body_markdown: `## Kiedy jedna spółka wystarczy

Większość małych i średnich firm bez trudu mieści się w jednej sp. z o.o. Jedna spółka to:
- jeden NIP, jedno konto, jedna pełna księgowość
- jeden zestaw deklaracji i sprawozdań
- mniej formalności, mniejsze koszty obsługi
- prostsze zarządzanie

Jeśli prowadzisz jedną działalność, masz jednego lub kilku wspólników o prostej strukturze i nie masz dużych aktywów wymagających ochrony — jedna spółka jest zazwyczaj właściwym wyborem.

## Kiedy kilka spółek może mieć sens

### Separacja ryzyka

Jeśli prowadzisz działalność o wysokim ryzyku (np. budownictwo, handel z dużymi zobowiązaniami) obok działalności niskoryzykownej (np. wynajem, IP) — warto rozważyć oddzielenie ich w osobnych spółkach. Problemy w jednej nie przenoszą się automatycznie na drugą.

### Oddzielenie aktywów

Nieruchomości, maszyny, marki i know-how mogą być przechowywane w osobnej spółce majątkowej. Spółka operacyjna wynajmuje aktywa, nie jest ich właścicielem — więc przy problemach finansowych aktywa są lepiej chronione.

### Różni wspólnicy w różnych projektach

Jeśli do jednego projektu angażujesz inwestora lub partnera, który nie powinien mieć udziałów w całej Twojej działalności — oddzielna spółka na ten projekt jest czystszym rozwiązaniem niż skomplikowane porozumienia wspólnicze w jednej firmie.

### Osobne marki lub kanały sprzedaży

Czasem osobna spółka per marka lub kanał jest uzasadniona biznesowo — np. przy franczyzie, sprzedaży różnych produktów różnym grupom klientów lub wdrażaniu inwestorów branżowych do konkretnych linii.

## Realne koszty kilku spółek

Każda dodatkowa spółka to:
- odrębna pełna księgowość (wyższy koszt biura rachunkowego)
- odrębne konto bankowe
- odrębne deklaracje podatkowe i sprawozdania finansowe
- odrębne uchwały, zgromadzenia wspólników, aktualizacje KRS
- więcej czasu zarządu na zarządzanie dokumentacją i relacjami między podmiotami

Błąd wielu przedsiębiorców: tworzenie kolejnych spółek bez policzenia kosztów obsługi i bez rzeczywistego uzasadnienia biznesowego.

## Dokumentacja relacji między spółkami

Jeśli spółki są powiązane (np. jeden właściciel), każda transakcja między nimi musi być udokumentowana umową, fakturą i prowadzona po cenach rynkowych. Organy podatkowe sprawdzają transakcje między podmiotami powiązanymi pod kątem cen transferowych.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Decyzję o tworzeniu kilku podmiotów warto omówić z doradcą.`,
    checklist: [
      'Oceni, czy masz realny powód do rozdzielenia działalności — ryzyko, aktywa, wspólnicy, projekt.',
      'Policz koszty obsługi każdej dodatkowej spółki zanim ją założysz.',
      'Upewnij się, że między spółkami powiązanymi będziesz prowadzić dokumentację cen transferowych.',
      'Zaplanuj umowy wewnątrzgrupowe z rynkowymi warunkami.',
      'Sprawdź z doradcą, czy struktura ma uzasadnienie ekonomiczne.',
    ],
    official_links: [
      { label: 'Przepisy o cenach transferowych (art. 11a–11t ustawy o CIT)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19920210086', external: true },
    ],
    related_actions: [
      { label: 'Holding spółek — co to jest i kiedy ma sens', href: '/poradnik/holding-spolek-co-to-jest' },
      { label: 'Fundusz rodzinny — co to jest', href: '/poradnik/fundusz-rodzinny-co-to-jest' },
      { label: 'JDG czy spółka z o.o. — co wybrać', href: '/poradnik/jdg-czy-spolka-zoo-co-wybrac' },
    ],
    faq: [
      {
        question: 'Czy mogę mieć dwie spółki z o.o. jako jedyny wspólnik?',
        answer: 'Tak. Jedna osoba fizyczna może być jedynym wspólnikiem dowolnej liczby sp. z o.o. Każda spółka jest odrębnym podmiotem prawnym z własnym NIP, rachunkami i księgowością.',
      },
      {
        question: 'Czy transakcje między moimi spółkami muszą być po cenach rynkowych?',
        answer: 'Tak. Transakcje między podmiotami powiązanymi muszą być prowadzone na warunkach rynkowych. Jeśli przekraczają określone progi wartości, wymagają dokumentacji cen transferowych. Zawyżone lub zaniżone ceny mogą zostać zakwestionowane przez urząd skarbowy.',
      },
      {
        question: 'Kiedy warto mieć osobną spółkę majątkową?',
        answer: 'Gdy posiadasz aktywa o znacznej wartości (nieruchomości, maszyny, IP), które chcesz chronić przed ryzykiem operacyjnym. Spółka majątkowa wynajmuje aktywa spółce operacyjnej — jeśli ta ma problemy finansowe, aktywa są w oddzielnym podmiocie.',
      },
    ],
    article_type: 'guide',
    sort_order: 60,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-fundusz-rodzinny',
    slug: 'fundusz-rodzinny-co-to-jest',
    title: 'Fundusz rodzinny — co to jest?',
    excerpt: 'Fundusz rodzinny to polska instytucja prawna służąca do gromadzenia i zarządzania majątkiem w perspektywie wielopokoleniowej. Nie jest to narzędzie dla każdego — ma określone wymagania, obowiązki i ograniczenia.',
    summary: 'Czym jest fundusz rodzinny, kto może go założyć, jak działa pod względem podatkowym i dla kogo może być właściwym rozwiązaniem.',
    purpose: 'Fundusz rodzinny jest często przedstawiany jako magiczne rozwiązanie podatkowe lub sukcesyjne. Warto zrozumieć, co naprawdę oferuje, a czego nie robi.',
    body_markdown: `## Co to jest fundacja rodzinna

> **Uwaga terminologiczna:** „fundacja rodzinna" (potocznie „fundusz rodzinny") to instytucja z **ustawy z 26 stycznia 2023 r. o fundacji rodzinnej**, służąca sukcesji i zarządzaniu majątkiem rodzinnym. To **nie jest** klasyczna fundacja z ustawy o fundacjach z 1984 r. (organizacja pozarządowa realizująca cele społeczne). Różnią się rejestrem, celem, opodatkowaniem i obowiązkami. Poradniki dla fundacji-NGO znajdziesz w sekcji [Poradnik dla fundacji](/poradnik/dla-fundacji).

Fundacja rodzinna to nowy podmiot prawa polskiego (od 2023 r.), stworzony z myślą o zarządzaniu i ochronie majątku rodzinnego w długim horyzoncie czasowym. Reguluje go ustawa z 26 stycznia 2023 r. o fundacji rodzinnej.

Fundusz rodzinny:
- jest odrębną osobą prawną (nie spółką, lecz fundacją)
- może posiadać udziały w spółkach, nieruchomości, inne aktywa
- służy przekazywaniu majątku beneficjentom (np. dzieciom, wnukom) według ustalonego statutu
- nie jest instrumentem inwestycyjnym ani zarządzania działalnością operacyjną

## Dla kogo może być właściwy

Fundusz rodzinny jest rozwiązaniem dla:
- właścicieli rodzinnych firm z dużym zgromadzonym majątkiem
- osób planujących sukcesję (przekazanie firmy lub majątku kolejnemu pokoleniu)
- rodzin chcących centralnie zarządzać majątkiem wielopokoleniowym bez konieczności natychmiastowego podziału

**Nie jest** rozwiązaniem dla:
- małych firm szukających optymalizacji podatkowej
- startupów lub firm w fazie wzrostu bez zakumulowanego majątku
- osób, które chcą swobodnie wypłacać pieniądze i uniknąć podatków

## Jak działa podatkowo

Fundusz rodzinny korzysta z preferencji podatkowych:
- zwolnienie z CIT w zakresie działalności dozwolonej (m.in. posiadanie udziałów, wynajem nieruchomości, pożyczki do beneficjentów)
- 15% CIT przy wypłatach do beneficjentów (zamiast standardowego CIT + podatku od dywidendy)
- zwolnienie z PIT dla beneficjentów z I grupy podatkowej (małżonek, dzieci, rodzice)

Poza zakresem dozwolonej działalności — np. handel, usługi — fundusz płaci standardowy CIT 25%.

## Obowiązki i ograniczenia

Fundusz rodzinny:
- wymaga minimalnego funduszu założycielskiego: 100 000 zł
- musi mieć statut sporządzony w formie aktu notarialnego
- podlega rejestracji w specjalnym rejestrze fundacji rodzinnych
- ma zarząd i radę nadzorczą (obowiązkową przy ponad 25 beneficjentach)
- musi prowadzić pełną księgowość i składać deklaracje podatkowe

Fundusz nie może prowadzić działalności operacyjnej poza zakresem ustawy. Korzystanie z funduszu wyłącznie w celu obejścia podatków jest monitorowane przez organy skarbowe.

## Kiedy warto się zainteresować, a kiedy nie

Warto rozważyć fundusz rodzinny, jeśli:
- masz firmę wartą kilka milionów złotych i myślisz o przekazaniu jej dzieciom
- masz zdywersyfikowany majątek (udziały, nieruchomości) i chcesz nim zarządzać centralnie
- sukcesja jest realnym problemem w horyzoncie kilku–kilkunastu lat

Nie warto zakładać funduszu, jeśli:
- szukasz prostej redukcji podatków przy bieżącej działalności
- nie masz zakumulowanego majątku przekraczającego koszty obsługi funduszu
- działalność jest operacyjna i nie pasuje do dozwolonego zakresu funduszu

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Decyzja o założeniu funduszu rodzinnego wymaga indywidualnej analizy prawnej, podatkowej i sukcesyjnej.`,
    checklist: [
      'Oceń, czy masz wystarczający majątek i horyzont sukcesyjny, żeby uzasadnić fundusz rodzinny.',
      'Sprawdź, czy planowana działalność mieści się w dozwolonym zakresie ustawy o fundacji rodzinnej.',
      'Skonsultuj się z prawnikiem specjalizującym się w prawie spadkowym i sukcesyjnym.',
      'Policz koszty notarialne, rejestracyjne i bieżącej obsługi funduszu.',
      'Porównaj fundusz rodzinny z innymi instrumentami sukcesji (testament, umowa darowizny, holding).',
    ],
    official_links: [
      { label: 'Ustawa z 26 stycznia 2023 r. o fundacji rodzinnej', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20230000326', external: true },
      { label: 'Rejestr fundacji rodzinnych (KRS)', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Jedna spółka czy kilka spółek', href: '/poradnik/jedna-czy-kilka-spolek' },
      { label: 'Holding spółek — co to jest i kiedy ma sens', href: '/poradnik/holding-spolek-co-to-jest' },
      { label: 'Rodzaje spółek w Polsce — przewodnik', href: '/poradnik/rodzaje-spolek-w-polsce-przewodnik' },
    ],
    faq: [
      {
        question: 'Czy fundusz rodzinny to to samo co spółka holdingowa?',
        answer: 'Nie. Fundusz rodzinny (fundacja rodzinna) jest osobną instytucją prawną, nie spółką. Ma specyficzne zasady opodatkowania, obowiązki i zakres dozwolonej działalności. Spółka holdingowa jest spółką kapitałową z ogólnymi zasadami.',
      },
      {
        question: 'Czy fundusz rodzinny pozwala uniknąć podatku od dywidendy?',
        answer: 'Fundusz rodzinny może korzystać ze zwolnienia z CIT w zakresie dozwolonej działalności i z preferencyjnej stawki 15% przy wypłatach do beneficjentów. To inne zasady niż standardowy CIT + podatek od dywidendy, ale nie jest to unikanie podatku — to odmienny reżim podatkowy przewidziany przez ustawę.',
      },
      {
        question: 'Jaki jest minimalny majątek do założenia funduszu rodzinnego?',
        answer: 'Ustawa wymaga minimalnego funduszu założycielskiego w wysokości 100 000 zł. To jednak tylko formalny próg — realny majątek, który uzasadnia koszty funduszu i prawnika, powinien być znacznie wyższy.',
      },
    ],
    article_type: 'guide',
    sort_order: 70,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-firma-za-granica',
    slug: 'firma-za-granica-podatki-polska',
    title: 'Firma za granicą a podatki w Polsce',
    excerpt: 'Zarejestrowanie spółki za granicą nie eliminuje automatycznie polskich obowiązków podatkowych. Rezydencja podatkowa, miejsce zarządzania i przepisy o zagranicznej spółce kontrolowanej (CFC) mogą sprawić, że polskie podatki nadal obowiązują.',
    summary: 'Dlaczego zagraniczna firma nie oznacza automatycznie braku polskich podatków — rezydencja podatkowa, miejsce efektywnego zarządzania, CFC, umowy o unikaniu podwójnego opodatkowania i ryzyka compliance.',
    purpose: 'Wiele osób zakłada spółki za granicą z przekonaniem, że to automatycznie rozwiązuje kwestię podatków. Niezrozumienie przepisów o rezydencji podatkowej i CFC może skutkować poważnymi problemami z organami skarbowymi.',
    body_markdown: `## Rejestracja za granicą nie wystarczy

Założenie spółki w Wielkiej Brytanii, Estonii, Holandii czy na Cyprze nie eliminuje automatycznie Twoich polskich obowiązków podatkowych. Polskie prawo podatkowe zawiera kilka mechanizmów, które sprawiają, że zagraniczna spółka może nadal podlegać opodatkowaniu w Polsce.

## Rezydencja podatkowa osoby fizycznej

Jeśli mieszkasz w Polsce przez ponad 183 dni w roku lub masz tu centrum interesów życiowych (rodzina, dom, główne zobowiązania), jesteś **polskim rezydentem podatkowym**. To oznacza, że Twój globalny dochód — z dowolnego kraju — podlega opodatkowaniu w Polsce.

Dochód z zagranicznej spółki (np. dywidenda, wynagrodzenie) nie jest zwolniony z polskiego PIT tylko dlatego, że spółka jest zarejestrowana za granicą.

## Miejsce efektywnego zarządzania (zarząd faktyczny)

Polska ustawa o CIT stanowi, że spółka, której **faktyczne zarządzanie** odbywa się w Polsce, jest polskim rezydentem podatkowym — niezależnie od miejsca rejestracji.

Jeśli zarząd podejmuje decyzje w Polsce, dokumenty są w Polsce, pracownicy są w Polsce — organy podatkowe mogą uznać, że spółka powinna płacić CIT w Polsce, a nie za granicą.

## Zagraniczne spółki kontrolowane (CFC — Controlled Foreign Companies)

Polskie przepisy o CFC (art. 24a ustawy o CIT i art. 30f ustawy o PIT) nakładają obowiązek doliczenia do podstawy opodatkowania zysku zagranicznej spółki kontrolowanej, jeśli:
- Polski rezydent posiada co najmniej 50% udziałów lub głosów w zagranicznej spółce
- Efektywna stawka podatkowa spółki jest niższa niż 14,25% (połowa polskiej stawki CIT)
- Spółka osiąga przede wszystkim dochody pasywne (odsetki, dywidendy, prawa własności intelektualnej, usługi wewnątrzgrupowe)

W takim przypadku zysk zagranicznej spółki jest doliczany do Twojego dochodu w Polsce i opodatkowany polskim PIT.

## Umowy o unikaniu podwójnego opodatkowania

Polska zawarła umowy o unikaniu podwójnego opodatkowania z wieloma krajami. Umowy te określają, które państwo ma prawo opodatkować dany dochód. Jednak **umowa o unikaniu podwójnego opodatkowania nie zwalnia z obowiązku raportowania** — może jedynie pozwolić na odliczenie podatku zapłaconego za granicą.

## Ryzyko compliance

Niezadeklarowanie dochodu ze zagranicznej spółki lub nieprawidłowe stosowanie przepisów o CFC to ryzyko:
- zaległości podatkowych z odsetkami
- sankcji karno-skarbowych
- kontroli podatkowej obejmującej kilka lat wstecz

Polskie organy podatkowe mają dostęp do informacji o zagranicznych rachunkach i spółkach dzięki automatycznej wymianie informacji podatkowych (DAC2/CRS).

## Co to oznacza w praktyce

Zagraniczne struktury korporacyjne mogą mieć uzasadnienie biznesowe — dostęp do rynków, partnerzy, specyfika branży. Ale nie eliminują polskich zobowiązań podatkowych przy braku rzeczywistej substancji ekonomicznej za granicą.

Jeśli planujesz działalność zagraniczną, zrób to z doradcą podatkowym, który zna przepisy obu krajów i potrafi ocenić, jak polskie przepisy o CFC i rezydencji podatkowej będą miały zastosowanie w Twojej sytuacji.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej ani podatkowej. Kwestie rezydencji podatkowej i CFC wymagają indywidualnej analizy prawnej i podatkowej.`,
    checklist: [
      'Ustal swoją polską rezydencję podatkową — czy mieszkasz w Polsce przez większość roku.',
      'Sprawdź, czy zagraniczna spółka ma rzeczywistą substancję ekonomiczną (zarząd, pracownicy, biuro) za granicą.',
      'Oceń z doradcą, czy spółka kwalifikuje się jako CFC i jakie obowiązki z tego wynikają.',
      'Sprawdź umowę o unikaniu podwójnego opodatkowania z krajem, gdzie planujesz zarejestrować spółkę.',
      'Zaplanuj dokumentację potwierdzającą ekonomiczne uzasadnienie zagranicznej struktury.',
    ],
    official_links: [
      { label: 'Art. 24a ustawy o CIT — CFC', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19920210086', external: true },
      { label: 'Umowy o unikaniu podwójnego opodatkowania (MF)', href: 'https://www.gov.pl/web/finanse/umowy-o-unikaniu-podwojnego-opodatkowania', external: true },
    ],
    related_actions: [
      { label: 'JDG czy spółka z o.o. — co wybrać', href: '/poradnik/jdg-czy-spolka-zoo-co-wybrac' },
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Holding spółek — co to jest i kiedy ma sens', href: '/poradnik/holding-spolek-co-to-jest' },
    ],
    faq: [
      {
        question: 'Czy mogę nie płacić polskich podatków zakładając spółkę za granicą?',
        answer: 'Nie automatycznie. Jeśli jesteś polskim rezydentem podatkowym i masz kontrolę nad zagraniczną spółką, polskie przepisy o CFC mogą sprawić, że zysk tej spółki i tak będzie opodatkowany w Polsce. Brak realnej substancji ekonomicznej za granicą jest sygnałem alarmowym dla organów skarbowych.',
      },
      {
        question: 'Kiedy zagraniczne dochody są zwolnione od polskiego podatku?',
        answer: 'Zależy to od umowy o unikaniu podwójnego opodatkowania z danym krajem i od rodzaju dochodu. Umowy te mogą przyznawać wyłączne prawo opodatkowania jednemu z państw lub przewidywać metodę kredytu podatkowego (odliczenia podatku zagranicznego). Konkretna sytuacja wymaga analizy danej umowy.',
      },
      {
        question: 'Co to jest automatyczna wymiana informacji podatkowych?',
        answer: 'To system, w ramach którego banki i instytucje finansowe w ponad 100 krajach automatycznie przekazują informacje o rachunkach zagranicznych do organów podatkowych kraju rezydencji właściciela. Polska uczestniczy w tym systemie (DAC2/CRS). Polskie organy podatkowe mają dostęp do informacji o Twoich zagranicznych rachunkach i spółkach.',
      },
    ],
    article_type: 'guide',
    sort_order: 80,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-przygotowanie-ksiegowosc',
    slug: 'jak-przygotowac-spolke-zoo-do-pelnej-ksiegowosci',
    entityTypes: ['spolka', 'stowarzyszenie', 'fundacja'],
    title: 'Jak przygotować spółkę z o.o. do pełnej księgowości',
    excerpt: 'Czysta księgowość spółki zaczyna się przed pierwszą fakturą. Odpowiednie konto bankowe, dostęp dla księgowej, dokumenty kosztowe i gotowość do KSeF to podstawy, które warto ułożyć zaraz po rejestracji.',
    summary: 'Praktyczna lista tego, co trzeba przygotować po rejestracji sp. z o.o.: dane firmy, konto, faktury, umowy, dokumenty kosztowe, dostęp do e-US, KSeF i workflow dokumentów z biurem rachunkowym.',
    purpose: 'Wiele spółek zaczyna działalność bez porządnego przygotowania — faktury idą pocztą, dokumenty giną, konto prywatne miesza się z firmowym. To generuje problemy podczas pierwszego sprawozdania i każdej kontroli.',
    body_markdown: `## Dlaczego przygotowanie zaczyna się przed pierwszą fakturą

Pełna księgowość wymaga kompletnych i chronologicznych zapisów od pierwszego dnia działalności. Braki w dokumentacji kosztów z pierwszych miesięcy mogą być niemożliwe do uzupełnienia. Zaczęcie z porządkiem jest wielokrotnie tańsze niż późniejsze naprawianie.

## Dane spółki

Zanim wystawisz pierwszą fakturę, upewnij się, że masz:
- NIP spółki (nadawany przez urząd skarbowy, zwykle kilka dni po wpisie do KRS)
- REGON (nadawany przez GUS)
- aktualny adres siedziby zgodny z KRS
- numer KRS
- imię i nazwisko oraz PESEL każdego członka zarządu

Dane te muszą być spójne na fakturach, umowach i w KRS.

## Konto bankowe spółki

Spółka musi mieć osobne konto bankowe — nigdy nie używaj konta prywatnego do transakcji firmowych. Konto jest powiązane z NIP spółki i wymagane m.in. przy rejestracji VAT i zgłoszeniu do KSeF.

## Faktury i numeracja

Ustal z biurem rachunkowym schemat numeracji faktur. Faktury sprzedaży muszą być wystawiane w KSeF (obowiązek od 2026 r. dla większości podatników). Zadbaj o połączenie spółki z KSeF przez upoważnienie lub token.

## Umowy i dokumenty kosztowe

Każdy wydatek firmowy musi mieć dokument: fakturę, rachunek lub inny dowód księgowy. Dotyczy to:
- zakupów sprzętu i wyposażenia
- usług (marketing, IT, doradztwo, wynajem)
- wynagrodzeń i zleceń
- kosztów podróży i delegacji

Dokumenty przechowuj w sposób umożliwiający ich szybkie odnalezienie — elektronicznie lub papierowo, ale zawsze kompletnie.

## Dostęp dla biura rachunkowego

Biuro rachunkowe lub księgowa potrzebuje dostępu do:
- e-Urzędu Skarbowego (przez pełnomocnictwo UPL-1 składane przez zarząd)
- JPK — do składania jednolitych plików kontrolnych
- KSeF — do pobierania i wysyłania faktur
- konta bankowego lub wyciągów (przynajmniej miesięcznych)

Pełnomocnictwa UPL-1 składa zarząd spółki przez e-US.

## KSeF — gotowość do e-faktur

Od 2026 r. faktury sprzedaży spółki z o.o. muszą trafiać do Krajowego Systemu e-Faktur. Przygotuj się wcześniej:
- uzyskaj token KSeF lub skonfiguruj dostęp przez profil zaufany zarządu
- podłącz spółkę do KSeF w systemie fakturowania lub w KsięgaI
- upewnij się, że biuro rachunkowe ma dostęp do faktur z KSeF

## Plan kont

Biuro rachunkowe przygotuje zakładowy plan kont dostosowany do Twojej działalności. Nie musisz go tworzyć sam, ale warto rozumieć podstawy — żebyś wiedział, co biuro pyta i dlaczego.

## Obieg dokumentów — workflow

Ustal z biurem rachunkowym:
- w jakiej formie dostarczasz dokumenty (skany, e-mail, aplikacja)
- z jaką częstotliwością (cotygodniowo, co miesiąc)
- jak komunikujecie się w sprawie brakujących dokumentów
- kto podpisuje i wysyła JPK, VAT-7, CIT-8

Dobry obieg dokumentów zaczyna się od pierwszego miesiąca działalności — nie od pierwszej kontroli.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny. Szczegóły przygotowania zależą od Twojej działalności i ustaleń z biurem rachunkowym.`,
    checklist: [
      'Otwórz konto bankowe na spółkę — oddzielne od prywatnego.',
      'Potwierdź NIP, REGON i dane KRS — muszą być spójne na wszystkich dokumentach.',
      'Podpisz umowę z biurem rachunkowym i ustal workflow dokumentów.',
      'Złóż pełnomocnictwo UPL-1 dla biura rachunkowego przez e-US.',
      'Podłącz spółkę do KSeF — token lub upoważnienie zarządu.',
      'Ustal schemat numeracji faktur z biurem rachunkowym.',
      'Zbieraj i przechowuj wszystkie dokumenty kosztowe od pierwszego dnia działalności.',
    ],
    official_links: [
      { label: 'KSeF — informacje ogólne', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'e-Urząd Skarbowy — pełnomocnictwa (UPL-1)', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Jak zdobyć token KSeF i podłączyć firmę', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'Konto organizacji w e-Urzędzie Skarbowym dla sp. z o.o.', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'Załóż konto w KsięgaI', href: '/rejestracja' },
    ],
    faq: [
      {
        question: 'Od kiedy spółka musi prowadzić pełną księgowość?',
        answer: 'Sp. z o.o. prowadzi pełną księgowość od pierwszego dnia działalności — bez żadnych progów przychodowych. Obowiązek pełnej księgowości wynika z przepisów Kodeksu spółek handlowych i ustawy o rachunkowości.',
      },
      {
        question: 'Czy mogę sam prowadzić księgowość spółki z o.o.?',
        answer: 'Formalnie tak — przepisy nie wymagają zatrudnienia zewnętrznego biura. W praktyce jednak pełna księgowość wymaga specjalistycznej wiedzy: plan kont, dziennik, bilans, rachunek wyników, JPK, CIT-8. Błędy w księgach mogą skutkować karami i problemami podczas kontroli.',
      },
      {
        question: 'Co to jest UPL-1 i do czego służy?',
        answer: 'UPL-1 to pełnomocnictwo ogólne do podpisywania deklaracji składanych w formie elektronicznej. Składając UPL-1 dla biura rachunkowego, upoważniasz je do przesyłania JPK, deklaracji VAT i innych dokumentów do organów podatkowych w imieniu spółki.',
      },
      {
        question: 'Kiedy spółka musi być w KSeF?',
        answer: 'Od 1 lutego 2026 r. dla dużych podatników (sprzedaż powyżej 200 mln zł w 2024 r.) i od 1 kwietnia 2026 r. dla pozostałych podatników VAT. Warto przygotować się wcześniej — podłączyć spółkę do KSeF i przetestować wystawianie faktur.',
      },
    ],
    article_type: 'guide',
    sort_order: 90,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  {
    id: 'fallback-struktury-kiedy-uchwala',
    slug: 'kiedy-spolka-zoo-potrzebuje-uchwaly',
    title: 'Kiedy spółka z o.o. potrzebuje uchwały?',
    excerpt: 'Sp. z o.o. podejmuje decyzje w formie uchwał — zarządu lub zgromadzenia wspólników. Część uchwał jest wymagana przez Kodeks spółek handlowych, część przez umowę spółki. Brak wymaganych uchwał może skutkować nieważnością czynności lub odpowiedzialnością zarządu.',
    summary: 'Kiedy i jaka uchwała jest wymagana w sp. z o.o. — uchwały wspólników vs uchwały zarządu, przykłady praktyczne, dlaczego dokumentacja korporacyjna musi być spójna z umowami i fakturami.',
    purpose: 'Wielu właścicieli sp. z o.o. nie wie, kiedy powinni podjąć uchwałę — i podejmuje ważne decyzje biznesowe bez właściwej dokumentacji korporacyjnej. To ryzyko prawne i podatkowe.',
    body_markdown: `## Co to jest uchwała

Uchwała to formalna decyzja organu spółki — zarządu lub zgromadzenia wspólników — podjęta w trybie i formie określonej przez Kodeks spółek handlowych (KSH) i umowę spółki. Uchwały dokumentują wolę wspólników lub decyzje zarządu i tworzą podstawę prawną dla konkretnych działań spółki.

## Uchwały zgromadzenia wspólników

Zgromadzenie wspólników (ZW) podejmuje decyzje w sprawach zastrzeżonych przez KSH lub umowę spółki. Do najważniejszych uchwał ZW należą:

### Wymagane przez KSH
- zatwierdzenie sprawozdania finansowego za rok obrotowy
- podział zysku lub pokrycie straty (decyzja o dywidendzie)
- udzielenie absolutorium członkom zarządu
- zmiana umowy spółki (wymaga formy aktu notarialnego)
- podwyższenie lub obniżenie kapitału zakładowego
- zbycie i wydzierżawienie przedsiębiorstwa lub jego zorganizowanej części
- powołanie i odwołanie członków zarządu (jeśli umowa nie stanowi inaczej)
- ustanowienie prokury (w wielu spółkach — zależy od umowy)
- wyrażenie zgody na zawarcie umowy między spółką a jej wspólnikiem lub członkiem zarządu, gdy wartość przekracza dwukrotność kapitału zakładowego

### Wymagane przez umowę spółki
Umowa spółki może rozszerzać katalog spraw wymagających zgody ZW — np. zaciąganie zobowiązań powyżej określonej kwoty, zatrudnianie pracowników, zbycie istotnych składników majątkowych.

## Uchwały zarządu

Zarząd podejmuje uchwały w sprawach bieżącego zarządzania spółką. Przykłady:
- udzielenie pełnomocnictwa do określonych czynności
- wyrażenie zgody na transakcję przekraczającą ustalony limit (jeśli zarząd jest wieloosobowy)
- przyjęcie regulaminu zarządu
- decyzje o zaciągnięciu kredytu lub leasingu (jeśli umowa spółki nie wymaga zgody ZW)

Przy zarządzie wieloosobowym sprawy przekraczające czynności zwykłego zarządu wymagają uchwały (co do zasady — jednomyślnej lub większościowej, zależnie od regulaminu).

## Szczególny przypadek: umowy z członkiem zarządu

Jeśli spółka zawiera umowę z członkiem zarządu (np. umowę o pracę, umowę B2B, umowę najmu), musi ją podpisać **pełnomocnik powołany przez zgromadzenie wspólników** (art. 210 KSH). Zarząd nie może sam podpisać umowy z samym sobą. Naruszenie tego przepisu skutkuje nieważnością umowy.

## Dlaczego dokumentacja musi być spójna

Brak wymaganej uchwały przy:
- wypłacie wynagrodzenia zarządu — może skutkować zakwestionowaniem kosztu podatkowego
- zawarciu umowy bez pełnomocnika (art. 210) — umowa jest nieważna
- dywidendzie bez uchwały o podziale zysku — wypłata nie ma podstawy prawnej
- zaciągnięciu zobowiązania bez zgody ZW (jeśli wymagana) — zarząd może odpowiadać osobowo

Dokumentacja korporacyjna (uchwały, protokoły) musi być spójna z umowami, fakturami, przelewami i zapisami księgowymi.

## Jak archiwizować uchwały

KSH nie określa wprost sposobu archiwizacji, ale przepisy o rachunkowości wymagają przechowywania dokumentacji przez określone okresy (5–10 lat). Uchwały powinny być przechowywane:
- w księdze protokołów spółki (papierowo lub elektronicznie)
- w sposób umożliwiający ich szybkie odnalezienie podczas kontroli
- z podpisami wszystkich wymaganych osób

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady prawnej. Konkretne wymogi dotyczące uchwał zależą od treści Twojej umowy spółki — skonsultuj się z prawnikiem lub biurem rachunkowym.`,
    checklist: [
      'Sprawdź umowę spółki — jakie decyzje wymagają uchwały zgromadzenia wspólników.',
      'Zaplanuj coroczne zgromadzenie wspólników do 30 czerwca — zatwierdzenie sprawozdania i uchwała o podziale zysku.',
      'Przed zawarciem umowy między spółką a członkiem zarządu — powołaj pełnomocnika (art. 210 KSH).',
      'Przy wieloosobowym zarządzie — sprawdź, czy regulamin zarządu określa, kiedy wymagana jest uchwała.',
      'Archiwizuj uchwały w księdze protokołów z podpisami — przechowuj przez co najmniej 5–10 lat.',
    ],
    official_links: [
      { label: 'Art. 210 KSH — umowy z zarządem', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
      { label: 'Dział III KSH — sp. z o.o., zgromadzenie wspólników', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20000941037', external: true },
    ],
    related_actions: [
      { label: 'Jak wypłacać pieniądze ze spółki z o.o.', href: '/poradnik/jak-wyplacac-pieniadze-ze-spolki-zoo' },
      { label: 'Spółka z o.o. — jakie podatki płaci', href: '/poradnik/spolka-zoo-jakie-podatki' },
      { label: 'Jak przygotować spółkę do pełnej księgowości', href: '/poradnik/jak-przygotowac-spolke-zoo-do-pelnej-ksiegowosci' },
    ],
    faq: [
      {
        question: 'Czy uchwała zgromadzenia wspólników musi mieć formę aktu notarialnego?',
        answer: 'Nie zawsze. Forma notarialna jest wymagana przy zmianach umowy spółki i przy niektórych innych czynnościach wskazanych w KSH. Większość uchwał ZW (np. zatwierdzenie sprawozdania, uchwała o dywidendzie, absolutorium) nie wymaga notariusza — wystarczy pisemny protokół podpisany przez przewodniczącego i sekretarza.',
      },
      {
        question: 'Czy wspólnik będący jedynym właścicielem musi zwoływać formalne zgromadzenie wspólników?',
        answer: 'Przy jednoosobowej sp. z o.o. jedyny wspólnik podejmuje uchwały samodzielnie i zamiast protokołu sporządza pisemne oświadczenie. Forma jest uproszczona, ale uchwała nadal musi istnieć i być udokumentowana.',
      },
      {
        question: 'Co się stanie, jeśli spółka wypłaci dywidendę bez uchwały?',
        answer: 'Wypłata dywidendy bez uchwały o podziale zysku nie ma podstawy prawnej. Może zostać zakwestionowana przez urząd skarbowy, a wspólnicy mogą być zobowiązani do zwrotu kwot pobranych bez tytułu prawnego. Uchwała jest warunkiem legalności wypłaty.',
      },
      {
        question: 'Kto może być pełnomocnikiem przy umowie z zarządem (art. 210 KSH)?',
        answer: 'Pełnomocnikiem jest każda osoba wskazana w uchwale zgromadzenia wspólników — może to być inny wspólnik, pracownik lub osoba trzecia. Nie może to być ten sam członek zarządu, z którym spółka zawiera umowę.',
      },
    ],
    article_type: 'guide',
    sort_order: 100,
    published_at: '2026-05-26T00:00:00.000Z',
    updated_at: '2026-05-26T00:00:00.000Z',
    category: fallbackWikiCategories[8],
  },

  // ─── Deklaracje: CEIDG-1 ─────────────────────────────────────────────────────
  {
    id: 'fallback-ceidg-1',
    slug: 'ceidg-1-jdg',
    entityTypes: ['jdg'],
    title: 'CEIDG-1 — co to jest i kiedy JDG składa wniosek',
    excerpt: 'CEIDG-1 to podstawowy formularz JDG: rejestrujesz firmę, zmieniasz dane, zawieszasz lub zamykasz działalność. Bez niego nie ma wpisu do CEIDG.',
    summary: 'Przewodnik po formularzu CEIDG-1 dla JDG: kiedy go składasz, co można zmienić, ile masz czasu na aktualizację i jak to zrobić elektronicznie.',
    purpose: 'Właściciele JDG często nie wiedzą, że zmiana adresu, rachunku bankowego czy kodu PKD wymaga aktualizacji CEIDG-1. Ten poradnik wyjaśnia kiedy i jak.',
    body_markdown: `## Co to jest CEIDG-1?

CEIDG-1 to formularz zgłoszenia do Centralnej Ewidencji i Informacji o Działalności Gospodarczej. Wypełniasz go kiedy:

- **rejestrujesz JDG** — to Twój pierwszy kontakt z CEIDG
- **zmieniasz dane firmy** — adres, nazwę, kody PKD, formę opodatkowania, rachunek bankowy
- **zawieszasz działalność** — na okres od 30 dni do 24 miesięcy
- **wznawiasz działalność** po zawieszeniu
- **zamykasz JDG** — wykreślenie z CEIDG

Jeden formularz, pięć zastosowań.

## Kogo dotyczy?

Wyłącznie osoby fizyczne prowadzące jednoosobową działalność gospodarczą (JDG). Spółka z o.o. nie korzysta z CEIDG — spółka rejestruje się i zgłasza zmiany przez KRS i formularz NIP-8.

## Kiedy jest potrzebna?

- **Rejestracja:** możesz to zrobić w dniu startu lub z datą wsteczną do 7 dni — wpis do CEIDG jest bezpłatny i natychmiastowy.
- **Zmiana danych:** masz **7 dni roboczych** od zaistnienia zmiany. Niedotrzymanie terminu jest niezgodne z prawem.
- **Zawieszenie / wznowienie / zamknięcie:** składasz wniosek we wskazanym dniu.

## Kto zwykle to składa?

Właściciel JDG samodzielnie, przez:
- **biznes.gov.pl** (online, przez profil zaufany lub e-dowód) — najwygodniejsza ścieżka
- Urząd Gminy lub Miasta — jeśli wolisz papierowo lub nie masz profilu zaufanego

Biuro rachunkowe może pomóc przygotować formularz, ale samo złożenie wymaga Twojego logowania lub podpisu.

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Formularz rejestracji | CEIDG-1 (CEIDG) | KRS / formularz S24 |
| Termin na aktualizację danych | 7 dni roboczych | 7 dni od zdarzenia |
| Kto składa zmiany | Właściciel osobiście | Zarząd przez KRS |
| Koszt rejestracji | Bezpłatny | Bezpłatny (S24) lub notarialny |

Spółka z o.o. nie składa CEIDG-1 — zmienia dane przez KRS i formularz NIP-8.

## Najczęstsze błędy

- **Brak aktualizacji po zmianie adresu lub rachunku bankowego** — masz 7 dni roboczych. Stare dane w CEIDG mogą blokować zwroty podatkowe lub prowadzić do problemów z korespondencją urzędową.
- **Zapomnienie o zmianie formy opodatkowania** — jeśli chcesz w nowym roku rozliczać się ryczałtem lub podatkiem liniowym, musisz zmienić to w CEIDG do 20 dnia miesiąca po uzyskaniu pierwszego dochodu, albo złożyć oświadczenie do końca roku.
- **Niezamknięcie JDG po zaprzestaniu działalności** — jeśli zapomniałeś wykreślić firmę z CEIDG, formalnie nadal istnieje.

## Jak KsięgaI może pomóc

CEIDG-1 to formularz zewnętrzny — KsięgaI nie składa go za Ciebie do CEIDG. Ale aplikacja może pomóc:
- **Pilnować dokumentacji firmy** tak, żebyś wiedział kiedy coś wymaga aktualizacji
- **Wskazać powiązane kroki** — np. jeśli zmieniasz formę opodatkowania, warto zaktualizować też ustawienia konta i kategoryzację przychodów
- Gdy Twoje biuro rachunkowe korzysta z KsięgaI — ma aktualny obraz dokumentów firmy i może szybko reagować na zmiany

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Terminy i zasady mogą się różnić w zależności od Twojej sytuacji — przed ważnymi zmianami skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Sprawdź, czy wszystkie dane w CEIDG są aktualne (adres, PKD, forma opodatkowania, rachunek bankowy).',
      'Po każdej zmianie danych — złóż aktualizację CEIDG-1 w ciągu 7 dni roboczych.',
      'Przed zmianą formy opodatkowania — sprawdź termin złożenia oświadczenia (zwykle do 20. dnia miesiąca lub do końca roku).',
      'Po zawieszeniu działalności pamiętaj o wznowieniu lub formalnym zamknięciu.',
    ],
    official_links: [
      { label: 'Rejestracja i zmiana danych JDG — biznes.gov.pl', href: 'https://www.biznes.gov.pl/pl/portal/001', external: true },
      { label: 'CEIDG — Centralny Rejestr', href: 'https://www.biznes.gov.pl/pl/firma/zakladanie-firmy/chce-zarejestrowac-dzialalnosc-jednoosobowa-firme/proc_482-rejestracja-dzialalnosci-gospodarczej-w-ceidg', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki po rejestracji spółki', href: '/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo' },
      { label: 'VAT-R — rejestracja VAT', href: '/poradnik/vat-r-rejestracja-vatowca' },
      { label: 'ZUS DRA — deklaracja ZUS', href: '/poradnik/zus-dra-deklaracja-zus' },
    ],
    faq: [
      {
        question: 'Czy CEIDG-1 trzeba składać co roku?',
        answer: 'Nie. CEIDG-1 składasz tylko przy rejestracji i kiedy coś się zmienia (dane, forma opodatkowania, adres, zawieszenie, zamknięcie). Nie ma obowiązku corocznego potwierdzania.',
      },
      {
        question: 'Ile czasu mam na zgłoszenie zmiany adresu w CEIDG?',
        answer: '7 dni roboczych od dnia, w którym zmiana nastąpiła. Warto zrobić to od razu — opóźnienie może powodować problemy z korespondencją urzędową i zwrotami podatkowymi.',
      },
      {
        question: 'Czy biuro rachunkowe może złożyć CEIDG-1 za mnie?',
        answer: 'Biuro może pomóc przygotować formularz, ale samo złożenie online wymaga Twojego logowania profilem zaufanym lub e-dowodem. Papierowo możesz udzielić pełnomocnictwa.',
      },
      {
        question: 'Czy spółka z o.o. rejestruje się przez CEIDG-1?',
        answer: 'Nie. Spółka z o.o. rejestruje się w Krajowym Rejestrze Sądowym (KRS) przez formularz S24 lub notarialnie. CEIDG-1 dotyczy wyłącznie JDG.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: JPK_V7 ───────────────────────────────────────────────────────
  {
    id: 'fallback-jpk-v7',
    slug: 'jpk-v7-deklaracja-vat',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'JPK_V7 — co to jest i kto musi składać co miesiąc',
    excerpt: 'JPK_V7 to obowiązkowy miesięczny plik vatowca. Łączy rejestr VAT z deklaracją w jednym pliku XML — zastąpił stare VAT-7 i JPK_VAT.',
    summary: 'Przewodnik po JPK_V7: czym jest, kto i kiedy składa, co zawiera plik oraz jak KsięgaI automatyzuje ten obowiązek.',
    purpose: 'Vatowcy często słyszą "JPK" i "VAT-7" naprzemiennie, nie wiedząc, że to teraz jedna wspólna deklaracja. Ten poradnik wyjaśnia co i kiedy składasz.',
    body_markdown: `## Co to jest JPK_V7?

JPK_V7 (Jednolity Plik Kontrolny dla podatku VAT) to obowiązkowy plik XML, który każdy czynny podatnik VAT składa co miesiąc lub co kwartał do Urzędu Skarbowego.

Zastąpił stare formularze:
- VAT-7 i VAT-7K (dawna deklaracja VAT)
- JPK_VAT (dawny rejestr VAT w formacie JPK)

Teraz są one **połączone w jeden plik**: JPK_V7 zawiera i rejestr faktur, i część deklaracyjną. Dwa obowiązki w jednym kroku.

Istnieją dwa warianty:
- **JPK_V7M** — dla podatników rozliczających VAT **miesięcznie**
- **JPK_V7K** — dla podatników rozliczających VAT **kwartalnie** (pierwsze dwa miesiące kwartału mają tylko część ewidencyjną; trzeci miesiąc zawiera pełną deklarację)

## Kogo dotyczy?

Wszystkich czynnych podatników VAT — zarówno JDG, jak i spółek z o.o. — niezależnie od wielkości przychodów. Obowiązek zaczyna się od momentu rejestracji jako czynny podatnik VAT (formularz VAT-R).

Firmy zwolnione z VAT (małe firmy poniżej progu lub zwolnione podmiotowo) **nie składają JPK_V7**.

## Kiedy jest potrzebna?

- **JPK_V7M:** do **25. dnia** następnego miesiąca (np. za styczeń — do 25 lutego)
- **JPK_V7K:** do 25. dnia po zakończeniu kwartału (pełna deklaracja); dla miesięcy 1. i 2. kwartału — do 25. dnia następnego miesiąca (sama ewidencja)

Jeśli 25. wypada w weekend lub święto — termin przesuwa się na następny dzień roboczy.

## Kto zwykle to składa?

Biuro rachunkowe lub główna księgowa na podstawie danych z systemu fakturowego. W praktyce:
- zbiera faktury sprzedaży i zakupu za miesiąc
- wgrywa je do systemu JPK
- generuje i wysyła plik elektronicznie przez JPK Portal lub oprogramowanie księgowe

Jako właściciel Twoje zadanie to dostarczyć kompletne dokumenty na czas.

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Obowiązek JPK_V7 | Tak (jeśli czynny vatowiec) | Tak (jeśli czynny vatowiec) |
| Kto podpisuje plik | Właściciel lub pełnomocnik (UPL-1) | Zarząd lub pełnomocnik (UPL-1) |
| Termin | Do 25. dnia następnego miesiąca | Do 25. dnia następnego miesiąca |
| Stawka VAT | Zależy od działalności | Zależy od działalności |

Zasady są identyczne — różni się tylko kto podpisuje i kto jest podatnikiem.

## Najczęstsze błędy

- **Brakujące faktury kosztowe** — jeśli nie dostarczysz wszystkich faktur kosztowych biuru, VAT naliczony nie zostanie ujęty, a nadpłacisz podatek.
- **Faktury z błędnym NIP nabywcy** — błędny NIP w fakturze zakupowej może skutkować zakwestionowaniem odliczenia VAT przy kontroli.
- **Opóźnione dostarczenie dokumentów biuru** — biuro rachunkowe nie może zamknąć pliku JPK bez kompletnych danych. Opóźnienie z Twojej strony = opóźnienie w złożeniu.
- **Korekty JPK** — jeśli po złożeniu znajdziesz błąd, trzeba złożyć korektę. Warto sprawdzać dokumenty przed terminem, nie po.

## Jak KsięgaI może pomóc

KsięgaI integruje się z KSeF i automatycznie pobiera faktury sprzedaży i zakupu. Dla biura rachunkowego oznacza to:
- faktury sprzedaży są już w systemie i gotowe do importu do JPK
- dokumenty kosztowe mają OCR i kategoryzację
- dopasowanie płatności bankowych do faktur jest automatyczne

Biuro rachunkowe lub księgowa mają kompletny, porządny zestaw danych bez konieczności ręcznego zbierania dokumentów.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zasady JPK_V7 mogą zależeć od Twojej formy rozliczeń VAT i rodzaju działalności — szczegóły potwierdź z biurem rachunkowym.`,
    checklist: [
      'Sprawdź, czy jesteś czynnym podatnikiem VAT — jeśli tak, obowiązuje Cię JPK_V7.',
      'Ustal z biurem rachunkowym termin dostarczania dokumentów przed 25. dniem miesiąca.',
      'Zbieraj faktury kosztowe na bieżąco — nie odkładaj na koniec miesiąca.',
      'Sprawdź czy faktury zakupowe mają poprawny NIP wystawcy i nabywcy.',
      'Jeśli wdrażasz KSeF — przekaż biuru dostęp, żeby mogło pobierać faktury automatycznie.',
    ],
    official_links: [
      { label: 'JPK_V7 — informacje podatki.gov.pl', href: 'https://www.podatki.gov.pl/jednolity-plik-kontrolny/jpk_vat-z-deklaracja/', external: true },
      { label: 'Portal JPK e-Deklaracje', href: 'https://www.podatki.gov.pl/jednolity-plik-kontrolny/', external: true },
    ],
    related_actions: [
      { label: 'VAT-R — rejestracja VAT', href: '/poradnik/vat-r-rejestracja-vatowca' },
      { label: 'KSeF dla JDG', href: '/poradnik/ksef-dla-jdg-jak-zaczac' },
      { label: 'KSeF dla spółki z o.o.', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
    ],
    faq: [
      {
        question: 'Czy JPK_V7 zastąpił VAT-7?',
        answer: 'Tak. Od 2020 roku JPK_V7 zastąpił zarówno formularz VAT-7/VAT-7K, jak i stary plik JPK_VAT. Teraz to jedna, połączona deklaracja.',
      },
      {
        question: 'Jak często składa się JPK_V7?',
        answer: 'Miesięcznie (JPK_V7M) lub kwartalnie (JPK_V7K). Większość małych firm rozlicza VAT miesięcznie. Wariant kwartalny jest dostępny dla małych podatników po spełnieniu warunków.',
      },
      {
        question: 'Czy firma zwolniona z VAT składa JPK_V7?',
        answer: 'Nie. JPK_V7 dotyczy wyłącznie czynnych podatników VAT. Firmy na zwolnieniu podmiotowym (np. poniżej progu 200 000 zł) nie składają tego pliku.',
      },
      {
        question: 'Co się stanie jeśli złożę JPK_V7 po terminie?',
        answer: 'Urząd Skarbowy może nałożyć karę porządkową za niezłożenie w terminie. Korekta po terminie jest możliwa, ale warto unikać opóźnień. Biuro rachunkowe powinno pilnować terminu 25. dnia.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: VAT-R ────────────────────────────────────────────────────────
  {
    id: 'fallback-vat-r',
    slug: 'vat-r-rejestracja-vatowca',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'VAT-R — kiedy i jak zarejestrować się jako podatnik VAT',
    excerpt: 'VAT-R to formularz rejestracji VAT. Składasz go zanim wystawisz pierwszą fakturę z VAT — i zanim przekroczysz ustawowy próg obrotu.',
    summary: 'Przewodnik po VAT-R: kiedy musisz zarejestrować się jako czynny vatowiec, kiedy możesz to zrobić dobrowolnie i co dzieje się po rejestracji.',
    purpose: 'Wiele osób nie wie, że jest różnica między "podatnikiem VAT" a "czynnym podatnikiem VAT". VAT-R to właśnie ta granica — ten poradnik wyjaśnia kiedy i jak ją przekroczyć.',
    body_markdown: `## Co to jest VAT-R?

VAT-R to formularz rejestracji jako podatnik VAT. Składasz go w Urzędzie Skarbowym przed pierwszą transakcją podlegającą VAT lub przed przekroczeniem progu zwalniającego z VAT.

Istnieją dwie sytuacje:
- **Rejestracja obowiązkowa** — gdy Twoje przychody ze sprzedaży podlegającej VAT przekraczają 200 000 zł rocznie, lub gdy prowadzisz działalność wyłączoną ze zwolnienia (np. usługi prawnicze, sprzedaż niektórych towarów)
- **Rejestracja dobrowolna** — kiedy chcesz odliczać VAT od zakupów firmowych, mimo że przychody są poniżej progu

## Kogo dotyczy?

Każdej firmy — JDG i spółki z o.o. — która chce lub musi być czynnym podatnikiem VAT. Formularz jest taki sam dla obu form.

## Kiedy jest potrzebna?

- **Przed pierwszą transakcją** — jeśli rejestrujesz się dobrowolnie lub Twoja działalność wyklucza zwolnienie
- **Przed przekroczeniem progu** — nie czekaj na przekroczenie 200 000 zł — złóż VAT-R zanim to nastąpi
- **Przed transakcją wewnątrzwspólnotową** — jeśli kupujesz lub sprzedajesz towar/usługę do/z UE, możesz potrzebować VAT-UE (osobny formularz, ale VAT-R jest warunkiem wstępnym)

Rejestracja jako VAT-R nie jest jednorazowa — możesz też złożyć aktualizację (np. zmiana danych, wyrejestrowanie lub przejście na metodę kasową).

## Kto zwykle to składa?

Właściciel firmy lub biuro rachunkowe — formularz składa się do właściwego Urzędu Skarbowego. Można to zrobić elektronicznie przez e-Deklaracje lub papierowo.

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Formularz rejestracji VAT | VAT-R | VAT-R |
| Kto podpisuje | Właściciel lub pełnomocnik | Zarząd lub pełnomocnik |
| Próg zwolnienia z VAT | 200 000 zł rocznie | 200 000 zł rocznie |
| Gdzie składać | US właściwy dla firmy | US właściwy dla firmy |

Zasady są identyczne. Różni się tylko kto podpisuje formularz.

## Najczęstsze błędy

- **Czekanie z rejestracją do przekroczenia progu** — jeśli przekroczysz 200 000 zł bez wcześniejszej rejestracji, możesz odpowiadać za niezapłacony VAT od kwoty nadpisu progu.
- **Wystawianie faktur VAT przed rejestracją** — nie możesz wystawiać faktur z VAT zanim urząd potwierdzi rejestrację. Faktura VAT bez rejestracji to problem.
- **Niezaktualizowanie VAT-R przy zmianie danych** — zmiana adresu lub danych firmy powinna być odzwierciedlona w aktualizacji VAT-R.
- **Nierejestrowanie się dobrowolnie mimo wysokich zakupów** — jeśli masz duże wydatki firmowe (sprzęt, usługi), a nie jesteś vatowcem, nie możesz odliczyć VAT od tych zakupów.

## Jak KsięgaI może pomóc

KsięgaI nie składa VAT-R za Ciebie, ale może pomóc w codziennym zarządzaniu VAT:
- **Faktury sprzedaży** mają poprawnie oznaczone stawki VAT
- **Dokumenty kosztowe** z VAT naliczonym są przechowywane w systemie i gotowe do odliczenia
- Przez integrację z KSeF faktury trafiają bezpośrednio do biura rachunkowego bez manualnego zbierania

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Obowiązek rejestracji VAT zależy od rodzaju działalności i skali obrotów — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Ustal, czy Twoja działalność wymaga obowiązkowej rejestracji VAT (np. usługi prawnicze, sprzedaż określonych towarów).',
      'Śledź przychody — zbliżając się do 200 000 zł rocznie złóż VAT-R przed przekroczeniem progu.',
      'Jeśli chcesz odliczać VAT od zakupów firmowych — rozważ dobrowolną rejestrację.',
      'Po rejestracji — zacznij wystawiać faktury z VAT i składać JPK_V7 co miesiąc.',
    ],
    official_links: [
      { label: 'Formularz VAT-R — podatki.gov.pl', href: 'https://www.podatki.gov.pl/vat/formularze/', external: true },
      { label: 'Kiedy rejestrować się jako podatnik VAT', href: 'https://www.podatki.gov.pl/vat/wyjasnienia/kiedy-zarejestrowac-sie-jako-podatnik-vat/', external: true },
    ],
    related_actions: [
      { label: 'JPK_V7 — comiesięczna deklaracja VAT', href: '/poradnik/jpk-v7-deklaracja-vat' },
      { label: 'VAT-UE — transakcje z UE', href: '/poradnik/vat-ue-transakcje-unijne' },
      { label: 'VAT-9M — VAT dla niezarejestrowanych', href: '/poradnik/vat-9m-import-uslug' },
    ],
    faq: [
      {
        question: 'Czy muszę się rejestrować jako VAT od razu po otwarciu firmy?',
        answer: 'Nie zawsze. Jeśli przychody nie przekroczą 200 000 zł rocznie i działalność nie wymaga obowiązkowej rejestracji, możesz być zwolniony. Warto ustalić z biurem czy rejestracja jest korzystna w Twojej sytuacji.',
      },
      {
        question: 'Jak długo czeka się na rejestrację VAT?',
        answer: 'Urząd Skarbowy potwierdza rejestrację zwykle w ciągu kilku dni roboczych. Przed złożeniem pierwszej faktury VAT upewnij się, że masz potwierdzenie rejestracji.',
      },
      {
        question: 'Czy JDG i spółka z o.o. mają taki sam próg zwolnienia z VAT?',
        answer: 'Tak, obydwie formy mają ten sam próg — 200 000 zł wartości sprzedaży netto rocznie. Ale niektóre rodzaje działalności wykluczają zwolnienie niezależnie od obrotu.',
      },
    ],
    article_type: 'guide',
    sort_order: 30,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: VAT-UE ───────────────────────────────────────────────────────
  {
    id: 'fallback-vat-ue',
    slug: 'vat-ue-transakcje-unijne',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'VAT-UE — kiedy rejestrować się do transakcji wewnątrzwspólnotowych',
    excerpt: 'Kupujesz usługi od zagranicznej firmy z UE? Sprzedajesz towary do innego kraju UE? Zanim wystawisz pierwszą fakturę — sprawdź czy potrzebujesz rejestracji VAT-UE.',
    summary: 'Przewodnik po VAT-UE: co to jest, kogo dotyczy transakcji wewnątrzwspólnotowych, kiedy złożyć formularz i jak wygląda weryfikacja numeru VAT-UE.',
    purpose: 'Właściciele firm kupujący oprogramowanie lub usługi z zagranicy często nie wiedzą, że takie transakcje wymagają rejestracji VAT-UE. Ten poradnik wyjaśnia kiedy i jak.',
    body_markdown: `## Co to jest VAT-UE?

VAT-UE to rejestracja do transakcji wewnątrzwspólnotowych w unijnym systemie VIES. Po rejestracji firma otrzymuje numer NIP z prefiksem "PL" (np. PL1234567890), który jest widoczny w unijnej bazie VIES dla kontrahentów z UE.

Formularz rejestracyjny to VAT-R (zaznaczasz odpowiedni pole dotyczące transakcji wewnątrzwspólnotowych) lub aktualizacja istniejącej rejestracji VAT.

## Kogo dotyczy?

Firm, które:
- **kupują usługi od dostawców z UE** (np. oprogramowanie SaaS, reklamy w Google/Meta, usługi konsultingowe od firm z UE) — mechanizm odwrotnego obciążenia VAT
- **sprzedają towary lub usługi do firm z UE** zarejestrowanych jako podatnicy VAT
- **nabywają towary wewnątrzwspólnotowo** (WNT — zakup towarów z innego kraju UE)
- **dokonują wewnątrzwspólnotowej dostawy towarów** (WDT — sprzedaż towarów do innego kraju UE)

## Kiedy jest potrzebna?

Przed **pierwszą transakcją wewnątrzwspólnotową**. Jeśli np. subskrybujesz narzędzie SaaS od firmy z UE (np. z Niemiec lub Holandii), powinieneś być zarejestrowany w VAT-UE zanim wystawisz rozliczenie.

Co ważne: jeśli nie jesteś czynnym podatnikiem VAT w Polsce (zwolnienie podmiotowe), a kupujesz usługi od zagranicznych firm z UE — i tak możesz mieć obowiązek rozliczenia VAT z tytułu importu usług (formularz VAT-9M).

## Kto zwykle to składa?

Biuro rachunkowe lub właściciel firmy — aktualizacja VAT-R składana do właściwego Urzędu Skarbowego. Rejestracja jest bezpłatna.

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Formularz | VAT-R (aktualizacja) | VAT-R (aktualizacja) |
| Numer VAT-UE | PL + NIP | PL + NIP |
| Dostępność w VIES | Tak, po rejestracji | Tak, po rejestracji |

Brak różnic — zasady są takie same.

## Najczęstsze błędy

- **Brak rejestracji przy subskrypcji zagranicznych narzędzi SaaS** — zakup subskrypcji od np. firmy z Irlandii lub Holandii to WNS (wewnątrzwspólnotowe nabycie usług), które wymaga rozliczenia VAT.
- **Podanie numeru VAT-UE kontrahentowi bez sprawdzenia ważności** — przed wystawieniem faktury bez VAT dla kontrahenta z UE warto sprawdzić jego numer VAT-UE w VIES.
- **Niewykazywanie transakcji w JPK_V7** — transakcje wewnątrzwspólnotowe mają specjalne oznaczenia w JPK_V7 i muszą być poprawnie oznakowane.

## Jak KsięgaI może pomóc

KsięgaI może pomóc kategoryzować faktury kosztowe od zagranicznych dostawców i właściwie oznaczać transakcje wewnątrzwspólnotowe. Biuro rachunkowe korzystające z KsięgaI ma te dokumenty w systemie i może je poprawnie ująć w JPK_V7.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zasady dotyczące transakcji wewnątrzwspólnotowych mogą być skomplikowane — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Sprawdź czy kupujesz lub sprzedajesz towary/usługi do/od firm z UE.',
      'Jeśli tak — złóż aktualizację VAT-R z zaznaczeniem transakcji wewnątrzwspólnotowych.',
      'Przed wystawieniem faktury VAT-0 (WDT) — zweryfikuj numer VAT-UE kontrahenta w bazie VIES.',
      'Informuj biuro rachunkowe o wszystkich zagranicznych fakturach kosztowych.',
    ],
    official_links: [
      { label: 'VIES — weryfikacja numerów VAT-UE', href: 'https://ec.europa.eu/taxation_customs/vies/', external: true },
      { label: 'VAT w transakcjach wewnątrzwspólnotowych — podatki.gov.pl', href: 'https://www.podatki.gov.pl/vat/wyjasnienia/transakcje-wewnatrzwspolnotowe/', external: true },
    ],
    related_actions: [
      { label: 'VAT-R — rejestracja VAT', href: '/poradnik/vat-r-rejestracja-vatowca' },
      { label: 'VAT-9M — import usług bez VAT', href: '/poradnik/vat-9m-import-uslug' },
      { label: 'JPK_V7 — comiesięczna deklaracja', href: '/poradnik/jpk-v7-deklaracja-vat' },
    ],
    faq: [
      {
        question: 'Czy każda firma kupująca od zagranicznego dostawcy musi mieć VAT-UE?',
        answer: 'Nie każda, ale firmy kupujące usługi od firm z UE (np. SaaS, reklamy) co do zasady rozliczają VAT z tytułu importu usług. Zakres i metoda zależą od rejestracji VAT firmy.',
      },
      {
        question: 'Jak sprawdzić czy mój zagraniczny kontrahent ma ważny numer VAT-UE?',
        answer: 'Przez unijną bazę VIES (vies.ec.europa.eu). Weryfikacja jest bezpłatna i pozwala sprawdzić aktywność numeru przed wystawieniem faktury bez VAT.',
      },
      {
        question: 'Czy rejestracja VAT-UE jest płatna?',
        answer: 'Nie. Rejestracja do transakcji wewnątrzwspólnotowych jest bezpłatna i odbywa się przez aktualizację formularza VAT-R.',
      },
    ],
    article_type: 'guide',
    sort_order: 40,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: VAT-9M ───────────────────────────────────────────────────────
  {
    id: 'fallback-vat-9m',
    slug: 'vat-9m-import-uslug',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'VAT-9M — kiedy firma bez VAT płaci podatek od zagranicznych usług',
    excerpt: 'Nie jesteś vatowcem, ale kupujesz usługi od zagranicznych firm? VAT-9M to deklaracja właśnie dla tego przypadku — rozliczasz VAT mimo że nie jesteś czynnym podatnikiem.',
    summary: 'Wyjaśnienie VAT-9M: kto składa tę deklarację, kiedy powstaje obowiązek VAT od importu usług i jak wygląda rozliczenie dla firmy zwolnionej z VAT.',
    purpose: 'Właściciele małych firm zwolnionych z VAT często nie wiedzą, że subskrypcja zagranicznego SaaS czy usługi z UE mogą generować obowiązek rozliczenia VAT. VAT-9M to odpowiedź na ten problem.',
    body_markdown: `## Co to jest VAT-9M?

VAT-9M to deklaracja podatkowa składana przez podmioty, które **nie są czynnymi podatnikami VAT** (są zwolnione podmiotowo lub przedmiotowo), ale mają jednorazowe lub nieregularne transakcje objęte VAT — przede wszystkim **import usług**.

Import usług to sytuacja, gdy polska firma kupuje usługę od zagranicznego dostawcy (np. z USA, Niemiec, Francji), który nie nalicza polskiego VAT. Polski nabywca musi rozliczyć VAT samodzielnie, stosując mechanizm odwrotnego obciążenia.

## Kogo dotyczy?

Firm i osób prowadzących działalność, które:
- **nie są czynnymi podatnikami VAT** (są na zwolnieniu podmiotowym — poniżej 200 000 zł obrotu — lub prowadzą działalność wyłącznie zwolnioną)
- **kupują usługi od zagranicznych podmiotów** (np. subskrypcja Adobe, Notion, Slack, Google Ads, usługi od firm z UE lub spoza UE)
- mają nabycie wewnątrzwspólnotowe towarów powyżej ustawowego progu (50 000 zł)

Jeśli jesteś czynnym vatowcem — te transakcje rozliczasz przez JPK_V7, nie VAT-9M.

## Kiedy jest potrzebna?

VAT-9M składa się **za każdy miesiąc**, w którym wystąpiła taka transakcja — do **25. dnia następnego miesiąca**. Jeśli w danym miesiącu nie było żadnej takiej transakcji, nie składasz deklaracji za ten miesiąc.

## Kto zwykle to składa?

Właściciel firmy lub biuro rachunkowe. Jest to deklaracja samodzielna — nie ma tu możliwości delegowania na pracownika bez pełnomocnictwa.

## JDG vs spółka z o.o.

| | JDG (zwolniona z VAT) | Spółka z o.o. (zwolniona z VAT) |
|---|---|---|
| Obowiązek VAT-9M | Tak, przy imporcie usług | Tak, przy imporcie usług |
| Termin | Do 25. następnego miesiąca | Do 25. następnego miesiąca |

Zasady są identyczne — liczy się status VAT firmy, nie jej forma prawna.

## Najczęstsze błędy

- **Brak świadomości obowiązku** — większość małych firm zwolnionych z VAT nie wie, że zakup subskrypcji zagranicznego narzędzia generuje obowiązek VAT-9M.
- **Zbieranie faktur na koniec roku** — VAT-9M składa się miesięcznie za miesiące, w których były transakcje. Zbieranie faktur zagranicznych na koniec roku i składanie jednej deklaracji to błąd.
- **Mylenie z VAT-UE** — VAT-UE to rejestracja do VIES, VAT-9M to deklaracja rozliczeniowa. To dwie różne rzeczy, choć oba pojęcia dotyczą zagranicznych transakcji.

## Jak KsięgaI może pomóc

KsięgaI przechowuje faktury zagraniczne i może je oznaczać jako wymagające rozliczenia VAT. Biuro rachunkowe widzi te dokumenty w systemie i może na czas złożyć VAT-9M za miesiące, w których były transakcje.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zasady rozliczania importu usług mogą być skomplikowane — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Sprawdź, czy Twoja firma jest zwolniona z VAT (poniżej progu lub działalność zwolniona).',
      'Zidentyfikuj wszystkie zagraniczne subskrypcje i usługi kupowane od dostawców spoza Polski.',
      'Informuj biuro rachunkowe o każdej fakturze zagranicznej co miesiąc.',
      'Jeśli składasz VAT-9M samodzielnie — pamiętaj o terminie do 25. następnego miesiąca.',
    ],
    official_links: [
      { label: 'Formularz VAT-9M — podatki.gov.pl', href: 'https://www.podatki.gov.pl/vat/formularze/', external: true },
    ],
    related_actions: [
      { label: 'VAT-R — rejestracja VAT', href: '/poradnik/vat-r-rejestracja-vatowca' },
      { label: 'VAT-UE — transakcje z UE', href: '/poradnik/vat-ue-transakcje-unijne' },
      { label: 'JPK_V7 — dla czynnych vatowców', href: '/poradnik/jpk-v7-deklaracja-vat' },
    ],
    faq: [
      {
        question: 'Czy mała firma z przychodami 50 000 zł rocznie musi składać VAT-9M?',
        answer: 'Jeśli kupujesz usługi od zagranicznych firm (np. software SaaS, reklamy Google) — co do zasady tak, musisz rozliczyć VAT z tytułu importu usług. Warto potwierdzić z biurem rachunkowym czy Twoje konkretne transakcje generują ten obowiązek.',
      },
      {
        question: 'Co to jest import usług?',
        answer: 'To sytuacja, gdy polska firma kupuje usługę od zagranicznego dostawcy, który nie nalicza polskiego VAT. Polska firma musi wtedy samodzielnie rozliczyć VAT jako nabywca (mechanizm odwrotnego obciążenia).',
      },
      {
        question: 'Czy VAT-9M trzeba składać jeśli nie było żadnych transakcji zagranicznych?',
        answer: 'Nie. VAT-9M składasz tylko za miesiące, w których wystąpiły transakcje objęte tym obowiązkiem. Brak transakcji = brak deklaracji za ten miesiąc.',
      },
    ],
    article_type: 'guide',
    sort_order: 50,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: ZUS DRA ─────────────────────────────────────────────────────
  {
    id: 'fallback-zus-dra',
    slug: 'zus-dra-deklaracja-zus',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'ZUS DRA — comiesięczna deklaracja ZUS dla przedsiębiorcy i pracodawcy',
    excerpt: 'ZUS DRA to miesięczna deklaracja rozliczeniowa do ZUS. Składają ją JDG i pracodawcy — nalicza składki na ubezpieczenia społeczne za siebie i za pracowników.',
    summary: 'Przewodnik po ZUS DRA: kto składa, kiedy, co deklaruje JDG a co pracodawca i jak zmienił się obowiązek przy małym ZUS plus.',
    purpose: 'Wielu przedsiębiorców słyszy "ZUS DRA" nie wiedząc czym różni się od "składek ZUS". Ten poradnik wyjaśnia co to jest, kiedy składasz i co się w nim wpisuje.',
    body_markdown: `## Co to jest ZUS DRA?

ZUS DRA to miesięczna deklaracja rozliczeniowa składana do ZUS. Służy do:
- **rozliczenia składek na ubezpieczenia społeczne** (emerytalne, rentowe, chorobowe, wypadkowe)
- **rozliczenia składki zdrowotnej** (lub informacji o jej podstawie)
- **rozliczenia składek za pracowników** — jeśli zatrudniasz

W skrócie: ZUS DRA to "zeznanie do ZUS" analogiczne do deklaracji podatkowej, tyle że do ZUS. Na jego podstawie ZUS wie ile i za kogo opłacasz składki.

## Kogo dotyczy?

- **JDG** (jednoosobowa działalność gospodarcza) — przedsiębiorca deklaruje swoje składki
- **Pracodawca** (JDG lub spółka z o.o.) zatrudniający pracowników lub zleceniobiorców — deklaruje składki za każdą zatrudnioną osobę
- **Wspólnik jednoosobowej spółki z o.o.** — co do zasady podlega ZUS jak przedsiębiorca

Razem z ZUS DRA (deklaracja zbiorcza) składane są raporty imienne RCA, RSA lub RZA — osobne dla każdej osoby ubezpieczonej.

## Kiedy jest potrzebna?

Terminy różnią się w zależności od typu płatnika:
- **Jednostki budżetowe i samorządowe:** do **3. dnia** następnego miesiąca
- **Pracodawcy (firmy):** do **5. dnia** następnego miesiąca
- **Osoby fizyczne opłacające wyłącznie za siebie** (JDG bez pracowników): do **10. dnia** następnego miesiąca

Jeśli termin wypada w weekend lub święto — przesuwa się na następny dzień roboczy.

## Kto zwykle to składa?

- **JDG bez pracowników:** właściciel samodzielnie przez PUE ZUS lub biuro rachunkowe z upoważnieniem
- **Firma z pracownikami:** biuro rachunkowe lub kadry — składają DRA + raporty imienne za każdą osobę

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| ZUS od właściciela | Tak (co do zasady) | Jednoosobowy wspólnik — tak; wieloosobowy — zazwyczaj nie z tytułu udziałów |
| Podstawa składek | Zadeklarowana podstawa (min. 60% lub 30% przeciętnego wynagrodzenia, zależnie od okresu) | Wynagrodzenie z umowy |
| ZUS za pracowników | Tak, jeśli zatrudnia | Tak, jeśli zatrudnia |

Uwaga: zasady ZUS dla wspólnika jednoosobowej spółki z o.o. są specyficzne i zmieniały się na przestrzeni lat. Warto potwierdzić aktualny status z doradcą lub biurem rachunkowym.

## Najczęstsze błędy

- **Nieprawidłowa podstawa wymiaru składek** — szczególnie w trakcie "małego ZUS plus" lub "ulgi na start". Zmiana podstawy wymaga aktualizacji deklaracji.
- **Nieterminowe złożenie** — nawet jeden dzień opóźnienia może skutkować naliczeniem odsetek od zaległych składek.
- **Brak zgłoszenia nowego pracownika przed złożeniem DRA** — jeśli zatrudniłeś kogoś, najpierw zgłoś go (ZUS ZUA lub ZUS ZZA), a dopiero potem złóż DRA za miesiąc, w którym zaczął pracować.

## Jak KsięgaI może pomóc

KsięgaI przechowuje dokumenty kadrowe i listy płac. Dla biura rachunkowego, które obsługuje Twoje kadry, oznacza to:
- bieżący dostęp do danych wynagrodzeniowych
- powiązanie płatności ZUS z dokumentami
- pełny ślad audytowy płatności składek

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady z zakresu ubezpieczeń społecznych. Zasady ZUS zależą od formy działalności, okresu prowadzenia firmy i konfiguracji zatrudnienia — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Ustal termin składania ZUS DRA dla swojej firmy (do 5. lub 10. dnia następnego miesiąca).',
      'Jeśli zatrudniasz pracowników — zgłoś ich do ZUS przed złożeniem DRA za miesiąc, w którym zaczęli pracę.',
      'Sprawdź aktualną podstawę wymiaru składek ZUS dla JDG (ulga na start, mały ZUS plus, standardowa podstawa).',
      'Upewnij się, że biuro rachunkowe ma upoważnienie do składania deklaracji ZUS w Twoim imieniu.',
    ],
    official_links: [
      { label: 'PUE ZUS — platforma usług elektronicznych', href: 'https://www.zus.pl/pue', external: true },
      { label: 'Deklaracje rozliczeniowe ZUS — informacje', href: 'https://www.zus.pl/firmy/przedsiebiorcy/rejestracja/obowiazki-platnika-skladek', external: true },
    ],
    related_actions: [
      { label: 'PIT-11 — informacja dla pracowników', href: '/poradnik/pit-11-informacja-o-dochodach' },
      { label: 'PIT-4R/PIT-8AR — roczne zaliczki', href: '/poradnik/pit-4r-pit-8ar-zaliczki-podatku' },
    ],
    faq: [
      {
        question: 'Czy JDG bez pracowników musi składać ZUS DRA?',
        answer: 'Tak. JDG opłacająca składki za siebie składa ZUS DRA (lub skróconą deklarację ZUS DRA, jeśli nie zmienia się podstawa) do 10. dnia następnego miesiąca. Niektórzy przedsiębiorcy mogą korzystać z rozwiązania bez obowiązku składania DRA co miesiąc jeśli nic się nie zmienia — warto potwierdzić z biurem.',
      },
      {
        question: 'Kiedy zmienia się termin składania ZUS DRA?',
        answer: 'Termin zależy od tego, czy opłacasz składki za siebie (10. dzień), czy też zatrudniasz pracowników (5. dzień). Zmiana statusu zatrudnienia zmienia termin.',
      },
      {
        question: 'Co to są raporty imienne RCA/RSA/RZA przy ZUS DRA?',
        answer: 'To szczegółowe raporty do DRA, składane osobno za każdego ubezpieczonego pracownika lub zleceniobiorcę. RCA dotyczy składek społecznych i zdrowotnej, RSA — przerw w ubezpieczeniu, RZA — tylko składki zdrowotnej (zleceniobiorcy).',
      },
    ],
    article_type: 'guide',
    sort_order: 60,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: PIT-36 ───────────────────────────────────────────────────────
  {
    id: 'fallback-pit-36',
    slug: 'pit-36-jdg-zasady-ogolne',
    entityTypes: ['jdg'],
    title: 'PIT-36 — roczne rozliczenie JDG na zasadach ogólnych (skala podatkowa)',
    excerpt: 'PIT-36 to roczna deklaracja podatkowa JDG rozliczającej się na skali podatkowej. Składasz ją do końca kwietnia za poprzedni rok — i dopiero wtedy wiesz ile naprawdę zapłaciłeś.',
    summary: 'Przewodnik po PIT-36: kto składa, kiedy, co można odliczyć, jak działa skala podatkowa i czym różni się od PIT-36L i PIT-28.',
    purpose: 'JDG na zasadach ogólnych często nie rozumieją różnicy między zaliczką miesięczną a rocznym PIT-36. Ten poradnik wyjaśnia jak to działa i czego pilnować przez cały rok.',
    body_markdown: `## Co to jest PIT-36?

PIT-36 to roczne zeznanie podatkowe składane przez osoby fizyczne, które mają przychody z:
- **JDG (działalności gospodarczej) na zasadach ogólnych** — skala podatkowa 12% / 32%
- działalności rolniczej podlegającej podatkowi dochodowemu
- innych źródeł wymagających tego formularza

Formularz PIT-36 jest bardziej rozbudowany niż PIT-37 (pracownicy). Umożliwia m.in. wspólne rozliczenie z małżonkiem, rozliczenie dzieci, a także różne odliczenia specyficzne dla przedsiębiorców.

## Kogo dotyczy?

JDG, która wybrała **zasady ogólne** (skala podatkowa) jako formę opodatkowania. To forma domyślna — jeśli przy rejestracji nie wybrałeś ryczałtu (PIT-28) ani podatku liniowego (PIT-36L), prawdopodobnie rozliczasz się przez PIT-36.

## Kiedy jest potrzebna?

- **Termin złożenia:** do **30 kwietnia** za poprzedni rok podatkowy
- W trakcie roku: płacisz **zaliczki miesięczne lub kwartalne** na podatek. PIT-36 to roczne "rozliczenie" — porównujesz zapłacone zaliczki z faktycznym podatkiem i albo dopłacasz, albo dostajesz zwrot.

## Kto zwykle to składa?

Właściciel JDG lub biuro rachunkowe przez e-Deklaracje. Deklaracja musi być podpisana elektronicznie lub profilem zaufanym.

## JDG vs spółka z o.o.

| | JDG (zasady ogólne) | Spółka z o.o. |
|---|---|---|
| Roczne zeznanie | PIT-36 | CIT-8 (spółka) + PIT właściciela od wypłat |
| Stawka podatku | 12% / 32% (skala) | 9% / 19% CIT + 19% PIT od dywidendy |
| Termin | 30 kwietnia | 31 marca (CIT-8) |
| Ulgi i odliczenia | Tak (dzieci, darowizny, IKZE, internet) | CIT-8 — ograniczone |

Spółka z o.o. płaci CIT, a właściciel osobno PIT od wynagrodzenia lub dywidendy.

## Najczęstsze błędy

- **Niezbilansowanie zaliczek z rocznym podatkiem** — jeśli w trakcie roku nie płaciłeś zaliczek lub płaciłeś za mało, przy rocznym rozliczeniu może pojawić się duża dopłata z odsetkami.
- **Pominięcie odliczeń** — PIT-36 pozwala na ulgi (np. IP Box, B+R, ulga dla klasy średniej, składki ZUS, IKZE). Warto sprawdzić z biurem co można odliczyć.
- **Błędna ewidencja przychodów i kosztów w KPiR** — PIT-36 bazuje na KPiR (Księdze Przychodów i Rozchodów). Błędy w ewidencji = błędne zeznanie.
- **Niemeldowanie dochodów z innych źródeł** — PIT-36 łączy dochód z JDG z innymi przychodami (np. najem, zlecenia). Zapomniane źródła to błąd w deklaracji.

## Jak KsięgaI może pomóc

KsięgaI porządkuje faktury i dokumenty kosztowe przez cały rok. Biuro rachunkowe mające dostęp do kompletnych danych może prawidłowo uzupełnić KPiR i na tej podstawie przygotować PIT-36. Automatyczne dopasowanie płatności i dokumentów zmniejsza ryzyko pominięcia kosztów.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zakres odliczeń i właściwa forma opodatkowania dla JDG zależy od indywidualnej sytuacji — skonsultuj się z biurem rachunkowym lub doradcą podatkowym.`,
    checklist: [
      'Sprawdź, czy rozliczasz się na zasadach ogólnych (skala podatkowa 12%/32%) — to warunkuje konieczność składania PIT-36.',
      'Płać zaliczki na podatek dochodowy regularnie w ciągu roku (miesięcznie lub kwartalnie).',
      'Zbieraj dokumenty potwierdzające koszty uzyskania przychodu przez cały rok.',
      'Złóż PIT-36 do 30 kwietnia za poprzedni rok podatkowy.',
      'Sprawdź z biurem rachunkowym czy masz prawo do dodatkowych odliczeń (ulgi, składki ZUS, IKZE).',
    ],
    official_links: [
      { label: 'PIT-36 — formularz i informacje', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-36/', external: true },
      { label: 'Podatek dochodowy JDG — podatki.gov.pl', href: 'https://www.podatki.gov.pl/pit/', external: true },
    ],
    related_actions: [
      { label: 'PIT-36L — podatek liniowy dla JDG', href: '/poradnik/pit-36l-podatek-liniowy-jdg' },
      { label: 'PIT-28 — ryczałt od przychodów', href: '/poradnik/pit-28-ryczalt-od-przychodow' },
      { label: 'Pełna księgowość — o co chodzi', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
    ],
    faq: [
      {
        question: 'Czym różni się PIT-36 od PIT-37?',
        answer: 'PIT-37 składają pracownicy i zleceniobiorcy — pracodawca pobiera zaliczki. PIT-36 składają przedsiębiorcy prowadzący JDG, którzy samodzielnie płacą zaliczki przez rok i rozliczają się rocznym zeznaniem.',
      },
      {
        question: 'Do kiedy muszę złożyć PIT-36?',
        answer: 'Do 30 kwietnia za poprzedni rok podatkowy. Można złożyć wcześniej — nie ma minimalnego okresu oczekiwania.',
      },
      {
        question: 'Czy JDG na podatku liniowym składa PIT-36?',
        answer: 'Nie. Podatek liniowy (19% flat) rozlicza się formularzem PIT-36L, nie PIT-36.',
      },
      {
        question: 'Kiedy powinienem zmienić z zasad ogólnych na ryczałt lub podatek liniowy?',
        answer: 'To decyzja zależna od Twojej sytuacji — poziomu dochodów, kosztów działalności, możliwości odliczeń. Warto przeprowadzić kalkulację z biurem rachunkowym przed końcem roku, bo zmiana formy opodatkowania obowiązuje od nowego roku.',
      },
    ],
    article_type: 'guide',
    sort_order: 70,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: PIT-36L ─────────────────────────────────────────────────────
  {
    id: 'fallback-pit-36l',
    slug: 'pit-36l-podatek-liniowy-jdg',
    entityTypes: ['jdg'],
    title: 'PIT-36L — roczne rozliczenie JDG na podatku liniowym',
    excerpt: 'PIT-36L to roczna deklaracja JDG, która wybrała podatek liniowy — 19% od dochodu bez progresji i bez większości ulg podatkowych.',
    summary: 'Przewodnik po PIT-36L: dla kogo jest podatek liniowy, kiedy składasz deklarację, jakich ulg nie możesz stosować i kiedy warto zmienić formę opodatkowania.',
    purpose: 'JDG na liniowym często nie wiedzą czego nie mogą odliczyć przy podatku liniowym. Ten poradnik wyjaśnia kiedy liniowy się opłaca i co tracisz w zamian za stałą stawkę.',
    body_markdown: `## Co to jest PIT-36L?

PIT-36L to roczne zeznanie podatkowe dla JDG rozliczającej się **podatkiem liniowym** (19% od dochodu, bez progresji). "L" oznacza właśnie "liniowy".

Podatek liniowy to alternatywa dla zasad ogólnych (12%/32%) i ryczałtu. Korzyść: stała stawka 19% niezależnie od wysokości dochodu, bez skoku na 32% przy przekroczeniu progu. Koszt: brak większości popularnych ulg podatkowych.

## Kogo dotyczy?

JDG, która złożyła oświadczenie o wyborze podatku liniowego. Wyboru dokonuje się przez CEIDG-1 — do 20. dnia miesiąca następnego po uzyskaniu pierwszego dochodu w roku, lub do końca roku na kolejny rok podatkowy.

## Kiedy jest potrzebna?

- **Termin:** do **30 kwietnia** za poprzedni rok podatkowy
- W ciągu roku: płacisz **zaliczki miesięczne lub kwartalne** (19% od dochodu narastająco)
- PIT-36L jest rocznym "wyrównaniem" zaliczek z rzeczywistym podatkiem

## Kto zwykle to składa?

Właściciel JDG lub biuro rachunkowe przez e-Deklaracje z podpisem kwalifikowanym lub profilem zaufanym.

## JDG vs spółka z o.o.

| | JDG (podatek liniowy) | Spółka z o.o. |
|---|---|---|
| Formularz roczny | PIT-36L | CIT-8 |
| Stawka podatku | 19% od dochodu | 9% lub 19% CIT |
| Ulgi | Ograniczone | Brak standardowych ulg PIT |

## Co możesz, a czego nie możesz przy podatku liniowym

**Możesz** odliczyć:
- Składki ZUS społeczne (jako koszt działalności lub odliczenie)
- Część składki zdrowotnej jako odliczenie od dochodu (po zmianach podatkowych)
- Koszty uzyskania przychodu (tak jak na zasadach ogólnych)
- Straty z lat ubiegłych

**Nie możesz** odliczyć:
- Ulgi na dziecko
- Ulgi dla klasy średniej
- Wspólnego rozliczenia z małżonkiem
- Wielu innych ulg dostępnych na zasadach ogólnych

## Najczęstsze błędy

- **Wybór podatku liniowego przy niskich dochodach** — jeśli dochód nie przekracza drugiego progu podatkowego (w 2024: ok. 120 000 zł), zasady ogólne mogą być korzystniejsze ze względu na niższe stawki i dostępność ulg.
- **Pominięcie odliczenia składki zdrowotnej** — po zmianach z 2023 roku część składki zdrowotnej można odliczyć od dochodu. Warto sprawdzić aktualny zakres z biurem.
- **Próba rozliczenia się wspólnie z małżonkiem** — nie ma takiej możliwości na podatku liniowym.

## Jak KsięgaI może pomóc

Tak jak przy PIT-36: KsięgaI pilnuje kompletności dokumentów przez rok. Biuro rachunkowe mając pełny obraz przychodów i kosztów może prawidłowo ustalić podstawę opodatkowania i przygotować PIT-36L.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Wybór formy opodatkowania to decyzja indywidualna — skonsultuj się z biurem rachunkowym lub doradcą podatkowym.`,
    checklist: [
      'Upewnij się, że w CEIDG masz zaznaczony podatek liniowy jako forma opodatkowania.',
      'Płać zaliczki na podatek liniowy (19%) regularnie w ciągu roku.',
      'Złóż PIT-36L do 30 kwietnia za poprzedni rok.',
      'Sprawdź z biurem co możesz odliczyć (składki ZUS, koszty, strata z lat ubiegłych).',
      'Pod koniec roku oceń z biurem czy podatek liniowy nadal jest korzystny w stosunku do zasad ogólnych lub ryczałtu.',
    ],
    official_links: [
      { label: 'PIT-36L — formularz i informacje', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-36l/', external: true },
    ],
    related_actions: [
      { label: 'PIT-36 — zasady ogólne', href: '/poradnik/pit-36-jdg-zasady-ogolne' },
      { label: 'PIT-28 — ryczałt od przychodów', href: '/poradnik/pit-28-ryczalt-od-przychodow' },
      { label: 'CEIDG-1 — zmiana formy opodatkowania', href: '/poradnik/ceidg-1-jdg' },
    ],
    faq: [
      {
        question: 'Kiedy podatek liniowy jest opłacalny dla JDG?',
        answer: 'Gdy dochody przekraczają drugi próg podatkowy (ok. 120 000 zł rocznie) i nie korzystasz z wielu ulg podatkowych. Przy niższych dochodach zasady ogólne mogą być korzystniejsze — warto przeprowadzić kalkulację z biurem.',
      },
      {
        question: 'Jak zmienić formę opodatkowania z zasad ogólnych na liniowy?',
        answer: 'Przez aktualizację CEIDG-1 — zaznaczasz podatek liniowy. Zmiana obowiązuje od nowego roku podatkowego (oświadczenie do końca roku) lub od miesiąca, w którym zaczął się nowy rok (do 20. dnia następnego miesiąca po pierwszym dochodzie).',
      },
      {
        question: 'Czy mogę być na podatku liniowym i jednocześnie być pracownikiem?',
        answer: 'Możesz, ale podatek liniowy dotyczy wyłącznie przychodów z JDG. Wynagrodzenie z umowy o pracę jest opodatkowane na zasadach ogólnych przez pracodawcę.',
      },
    ],
    article_type: 'guide',
    sort_order: 80,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: PIT-28 ───────────────────────────────────────────────────────
  {
    id: 'fallback-pit-28',
    slug: 'pit-28-ryczalt-od-przychodow',
    entityTypes: ['jdg'],
    title: 'PIT-28 — roczne rozliczenie JDG na ryczałcie ewidencjonowanym',
    excerpt: 'PIT-28 to roczna deklaracja JDG opodatkowanej ryczałtem. Płacisz podatek od przychodu (nie dochodu) — bez możliwości odliczania kosztów, ale z niższymi stawkami dla wielu branż.',
    summary: 'Przewodnik po PIT-28: kiedy ryczałt jest korzystny, jakie są stawki ryczałtu dla różnych typów działalności, kiedy złożyć PIT-28 i czego nie można odliczyć.',
    purpose: 'JDG na ryczałcie często nie rozumieją różnicy między podatkiem od przychodu a od dochodu. Ten poradnik wyjaśnia co to zmienia w praktyce i kiedy ryczałt ma sens.',
    body_markdown: `## Co to jest PIT-28?

PIT-28 to roczne zeznanie podatkowe dla JDG rozliczającej się **ryczałtem od przychodów ewidencjonowanych**. Kluczowa cecha: podatek jest naliczany od **przychodu**, nie od dochodu.

Oznacza to: **nie odliczasz kosztów uzyskania przychodu** (bo podatek jest od przychodu brutto), ale w zamian możesz mieć niższe stawki podatkowe niż na zasadach ogólnych.

Stawki ryczałtu (zależą od rodzaju działalności):
- **2%** — działalność rolnicza, sprzedaż surowców
- **3%** — działalność handlowa, gastronomia
- **5.5%** — roboty budowlane, produkcja
- **8.5%** — wolne zawody, usługi, wynajem (część)
- **10%** — wynajem nieruchomości (część)
- **12%** — usługi IT, programowanie, konsulting techniczny
- **14%** — wolne zawody (lekarze, stomatolodzy, architekci, etc.)
- **15%** — usługi pośrednictwa, handel udziałami i papierami
- **17%** — inne usługi niemieszczące się w wyżej wymienionych

## Kogo dotyczy?

JDG, która wybrała ryczałt jako formę opodatkowania. Nie wszystkie rodzaje działalności mogą korzystać z ryczałtu — istnieją wykluczenia (np. pewne usługi doradcze, działalność regulowana).

## Kiedy jest potrzebna?

- **Termin:** do **15 lutego** za poprzedni rok podatkowy (inny termin niż PIT-36 i PIT-36L!)
- W ciągu roku: płacisz **zaliczki miesięczne lub kwartalne**

## Kto zwykle to składa?

Właściciel JDG lub biuro rachunkowe przez e-Deklaracje.

## JDG vs spółka z o.o.

| | JDG (ryczałt) | Spółka z o.o. |
|---|---|---|
| Formularz roczny | PIT-28 | CIT-8 |
| Podstawa podatku | Przychód (nie dochód) | Dochód |
| Możliwość odliczenia kosztów | Brak | Tak |
| Termin | 15 lutego | 31 marca |

Spółka z o.o. nie może wybrać ryczałtu — to forma dostępna tylko dla JDG i innych podmiotów wymienionych w ustawie.

## Kiedy ryczałt jest korzystny?

Ryczałt opłaca się gdy:
- Koszty prowadzenia działalności są **niskie** (software house, konsultant, IT freelancer)
- Stawka ryczałtu (np. 8.5% lub 12%) jest **niższa** niż stawka po odliczeniu kosztów na zasadach ogólnych
- Nie zależy Ci na ulgach podatkowych niedostępnych na ryczałcie

Ryczałt może **nie** opłacać się gdy:
- Masz wysokie koszty (sprzęt, podwykonawcy, wynajem biura) — nie odliczysz ich
- Stawka ryczałtu dla Twojej działalności jest wysoka (14%, 15%, 17%)

## Najczęstsze błędy

- **Zła stawka ryczałtu dla działalności** — każdy rodzaj działalności ma przypisaną stawkę. Błędna stawka = błędnie naliczony podatek.
- **Brak ewidencji przychodów** — ryczałtowiec ma obowiązek prowadzenia ewidencji przychodów. To uproszczona forma, ale musi istnieć.
- **Mieszanie stawek bez rozdzielenia przychodów** — jeśli prowadzisz kilka rodzajów działalności z różnymi stawkami, musisz je rozdzielić w ewidencji.

## Jak KsięgaI może pomóc

KsięgaI rejestruje faktury sprzedaży i pozwala kategoryzować przychody według typów działalności. Biuro rachunkowe ma kompletną ewidencję przychodów potrzebną do PIT-28.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Właściwa stawka ryczałtu i opłacalność tej formy opodatkowania zależy od Twojej działalności — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Sprawdź stawkę ryczałtu właściwą dla Twojej działalności (PKD i opis usług).',
      'Prowadź ewidencję przychodów — obowiązek ryczałtowca.',
      'Jeśli prowadzisz działalność mieszaną — rozdziel przychody według różnych stawek.',
      'Złóż PIT-28 do 15 lutego za poprzedni rok (termin wcześniejszy niż PIT-36 i PIT-36L).',
      'Przed końcem roku oceń z biurem czy ryczałt nadal jest korzystny.',
    ],
    official_links: [
      { label: 'PIT-28 — formularz i informacje', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-28/', external: true },
      { label: 'Ryczałt od przychodów ewidencjonowanych', href: 'https://www.podatki.gov.pl/pit/informacje-dla-przedsiebiorcow/ryczalt-od-przychodow-ewidencjonowanych/', external: true },
    ],
    related_actions: [
      { label: 'PIT-36 — zasady ogólne', href: '/poradnik/pit-36-jdg-zasady-ogolne' },
      { label: 'PIT-36L — podatek liniowy', href: '/poradnik/pit-36l-podatek-liniowy-jdg' },
      { label: 'CEIDG-1 — wybór formy opodatkowania', href: '/poradnik/ceidg-1-jdg' },
    ],
    faq: [
      {
        question: 'Jaką stawkę ryczałtu płaci programista lub specjalista IT?',
        answer: 'Co do zasady usługi IT i programistyczne są objęte stawką 12%. Jednak zakres tej stawki jest ściśle zdefiniowany — warto potwierdzić z biurem rachunkowym czy Twoja działalność mieści się w tej kategorii.',
      },
      {
        question: 'Do kiedy składa się PIT-28?',
        answer: 'Do 15 lutego za poprzedni rok podatkowy — to wcześniejszy termin niż PIT-36 (30 kwietnia) i PIT-36L (30 kwietnia). Warto o tym pamiętać, by nie przegapić terminu.',
      },
      {
        question: 'Czy na ryczałcie można odliczyć składki ZUS?',
        answer: 'Tak — składki ZUS społeczne można odliczyć od przychodu (podstawa ryczałtu), a część składki zdrowotnej — jako odliczenie. Szczegółowy zakres zależy od aktualnych przepisów — warto potwierdzić z biurem.',
      },
      {
        question: 'Czy mogę zmienić formę opodatkowania z ryczałtu na zasady ogólne w trakcie roku?',
        answer: 'Co do zasady nie. Zmiana formy opodatkowania możliwa jest zwykle od nowego roku podatkowego lub w określonych sytuacjach. Warto zaplanować taką decyzję z biurem przed końcem roku.',
      },
    ],
    article_type: 'guide',
    sort_order: 90,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: PIT-11 ───────────────────────────────────────────────────────
  {
    id: 'fallback-pit-11',
    slug: 'pit-11-informacja-o-dochodach',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'PIT-11 — co to jest i kiedy firma musi go wystawić pracownikom',
    excerpt: 'PIT-11 to roczna informacja o dochodach i zaliczkach przekazywana pracownikom i do urzędu skarbowego. Jeśli zatrudniasz ludzi lub wypłacasz im zlecenia — PIT-11 jest Twoim obowiązkiem.',
    summary: 'Przewodnik po PIT-11: kto wystawia, komu, kiedy, co zawiera i co się dzieje jeśli prześlesz go po terminie.',
    purpose: 'JDG i spółki zatrudniające ludzi lub wypłacające zlecenia często nie wiedzą o PIT-11 dopóki pracownik nie zapyta gdzie jest jego PIT. Ten poradnik wyjaśnia kiedy i jak to działa.',
    body_markdown: `## Co to jest PIT-11?

PIT-11 to roczna informacja o dochodach uzyskanych przez pracownika lub zleceniobiorcę i pobranych z nich zaliczkach na podatek dochodowy. Wystawia ją płatnik (pracodawca, zleceniodawca) — nie pracownik.

To nie jest deklaracja składana przez firmę do US w jej własnym imieniu. PIT-11 dotyczy **dochodów osób, którym firma wypłaciła wynagrodzenie i pobrała zaliczkę na podatek**.

PIT-11 trafia do:
1. **Pracownika lub zleceniobiorcy** — potrzebuje go do złożenia własnego zeznania rocznego (PIT-37 lub PIT-36)
2. **Urzędu Skarbowego** — elektronicznie przez e-Deklaracje

## Kogo dotyczy?

Każdej firmy (JDG lub spółki z o.o.), która w danym roku:
- zatrudniała pracowników na umowę o pracę
- wypłacała wynagrodzenia z umów zlecenia lub o dzieło
- wypłacała wynagrodzenia członkom zarządu
- wypłacała inne świadczenia, od których pobierała zaliczkę na PIT

## Kiedy jest potrzebna?

- **Do końca stycznia** — wysłanie PIT-11 **do Urzędu Skarbowego** drogą elektroniczną
- **Do końca lutego** — przekazanie PIT-11 **pracownikowi/zleceniobiorcy**

Uwaga: to **dwa osobne terminy**. Urząd dostaje wcześniej, pracownik może dostać do końca lutego.

## Kto zwykle to składa?

Biuro rachunkowe lub dział kadr i płac. Wymaga dostępu do danych z list płac za cały rok.

## JDG vs spółka z o.o.

| | JDG zatrudniająca | Spółka z o.o. |
|---|---|---|
| Obowiązek PIT-11 | Tak (przy zatrudnieniu/zleceniach) | Tak (przy zatrudnieniu/zleceniach/zarządzie) |
| Termin do US | Koniec stycznia | Koniec stycznia |
| Termin do pracownika | Koniec lutego | Koniec lutego |
| Kto wystawia | Właściciel lub biuro | Zarząd lub biuro |

Obowiązek jest identyczny — różni się tylko kto jest płatnikiem.

## Najczęstsze błędy

- **Spóźniony PIT-11 lub brak PIT-11** — pracownik czeka na PIT-11 żeby złożyć własne zeznanie. Spóźnienie może powodować napięcia i problemy z US.
- **Błędny NIP lub PESEL w PIT-11** — błąd w danych identyfikacyjnych może skutkować koniecznością korekty i problemami w US pracownika.
- **Pominięcie umów o dzieło** — małe jednorazowe zlecenia lub umowy o dzieło też wymagają PIT-11 jeśli były pobierane zaliczki.
- **Nieprawidłowa kwota zaliczek** — PIT-11 musi zgadzać się z faktycznie wpłaconymi do US zaliczkami. Rozbieżność wymaga korekty.

## Jak KsięgaI może pomóc

KsięgaI przechowuje dokumenty kadrowe i dane z list płac. Biuro rachunkowe korzystające z systemu ma dostęp do pełnych danych wynagrodzeniowych i może wystawić PIT-11 bez konieczności manualnego zbierania dokumentów z całego roku.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Szczegółowe zasady dotyczące PIT-11 zależą od formy zatrudnienia i rodzaju wypłacanych świadczeń — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Ustal, komu w roku poprzednim wypłacałeś wynagrodzenia lub honoraria z pobraniem zaliczki na podatek.',
      'Przekaż biuru rachunkowemu kompletne listy płac i umowy za cały rok.',
      'Wyślij PIT-11 elektronicznie do Urzędu Skarbowego do końca stycznia.',
      'Przekaż PIT-11 każdemu pracownikowi i zleceniobiorcy do końca lutego.',
    ],
    official_links: [
      { label: 'PIT-11 — formularz i informacje', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-11/', external: true },
    ],
    related_actions: [
      { label: 'PIT-4R/PIT-8AR — roczne zaliczki', href: '/poradnik/pit-4r-pit-8ar-zaliczki-podatku' },
      { label: 'ZUS DRA — deklaracja ZUS', href: '/poradnik/zus-dra-deklaracja-zus' },
    ],
    faq: [
      {
        question: 'Czy muszę wystawiać PIT-11 dla osoby, której wypłaciłem zlecenie za 500 zł?',
        answer: 'Co do zasady tak, jeśli pobierałeś zaliczkę na podatek od tego zlecenia. Zlecenia do kwoty wolnej od podatku lub objęte zwolnieniem mogą podlegać innym zasadom — warto potwierdzić z biurem.',
      },
      {
        question: 'Co się dzieje jeśli nie wyślę PIT-11 na czas do US?',
        answer: 'US może nałożyć karę za niezłożenie w terminie. Ponadto pracownik może nie mieć podstaw do złożenia własnego zeznania rocznego w terminie. Warto traktować te terminy poważnie.',
      },
      {
        question: 'Czy PIT-11 wystawia się dla prezesa spółki z o.o. za wynagrodzenie zarządu?',
        answer: 'Tak. Wynagrodzenie zarządu (na podstawie uchwały) jest przychodem ze stosunku powołania i wymaga PIT-11, podobnie jak wynagrodzenie pracownika.',
      },
    ],
    article_type: 'guide',
    sort_order: 100,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: PIT-4R / PIT-8AR ────────────────────────────────────────────
  {
    id: 'fallback-pit-4r-pit-8ar',
    slug: 'pit-4r-pit-8ar-zaliczki-podatku',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'PIT-4R i PIT-8AR — roczne deklaracje pracodawcy z zaliczek na podatek',
    excerpt: 'Zatrudniasz pracowników lub wypłacasz zlecenia? Co roku musisz złożyć PIT-4R (zaliczki od wynagrodzeń) i ewentualnie PIT-8AR (zryczałtowany podatek). Oba terminy to koniec stycznia.',
    summary: 'Wyjaśnienie PIT-4R i PIT-8AR: czym są, kto je składa, jaki jest termin i jak mają się do PIT-11 wystawianego pracownikom.',
    purpose: 'Właściciele firm zatrudniających pracowników często mylą PIT-4R z PIT-11 i nie wiedzą że to dwa różne obowiązki. Ten poradnik wyjaśnia różnicę i terminy.',
    body_markdown: `## Co to jest PIT-4R?

PIT-4R to roczna deklaracja płatnika (pracodawcy), w której podsumowuje **wszystkie zaliczki na podatek dochodowy pobrane od pracowników i zleceniobiorców** w ciągu roku i przekazane do Urzędu Skarbowego.

W skrócie: w ciągu roku co miesiąc pobierasz zaliczkę od wynagrodzenia pracownika i wpłacasz do US. PIT-4R to roczne "podsumowanie" tych wpłat.

## Co to jest PIT-8AR?

PIT-8AR to roczna deklaracja ze zryczałtowanego podatku dochodowego pobranego przez płatnika. Dotyczy m.in.:
- niektórych przychodów z umów o dzieło (gdy zastosowano zryczałtowany podatek)
- odsetek od pożyczek od osób fizycznych (jeśli pobierałeś podatek)
- dywidend wypłacanych osobom fizycznym (np. wspólnicy spółki z o.o.)
- innych przypadków zryczałtowanego podatku (np. nagrody, wygrane)

## Kogo dotyczy?

Każdego **płatnika** — firmy (JDG lub spółki z o.o.), który:
- zatrudniał pracowników i odprowadzał zaliczki na ich PIT (PIT-4R)
- pobierał zryczałtowany podatek od przychodów (PIT-8AR)

## Kiedy jest potrzebna?

Obydwa formularze: do **31 stycznia** za poprzedni rok podatkowy — wysyłane **elektronicznie** do Urzędu Skarbowego.

Uwaga: PIT-11 (dla pracownika) ma termin do końca lutego — ale PIT-4R i PIT-8AR idą do US już do 31 stycznia.

## Kto zwykle to składa?

Biuro rachunkowe lub dział kadr i płac — na podstawie zsumowanych danych z list płac za cały rok.

## JDG vs spółka z o.o.

| | JDG zatrudniająca | Spółka z o.o. |
|---|---|---|
| PIT-4R | Tak, gdy zatrudnia | Tak, gdy zatrudnia |
| PIT-8AR | Tak, gdy wypłaca dywidendy lub zryczałtowany podatek | Tak (dywidendy, niektóre świadczenia) |
| Termin | 31 stycznia | 31 stycznia |

Spółka z o.o. wypłacająca dywidendy wspólnikom **zawsze** ma obowiązek PIT-8AR.

## Najczęstsze błędy

- **Mylenie PIT-4R z PIT-11** — PIT-4R to deklaracja płatnika do US (podsumowanie zaliczek). PIT-11 to informacja dla pracownika. To dwa odrębne obowiązki, oba konieczne.
- **Nieskładanie PIT-8AR przy dywidendach** — spółki z o.o. wypłacające dywidendę wspólnikom muszą pobrać 19% zryczałtowanego PIT od dywidendy i rozliczyć to przez PIT-8AR.
- **Błędne zsumowanie zaliczek** — jeśli kwoty w PIT-4R nie zgadzają się z faktycznie wpłaconymi do US zaliczkami, US może wezwać do wyjaśnienia.

## Jak KsięgaI może pomóc

KsięgaI zbiera dane wynagrodzeniowe i dokumenty finansowe, które biuro rachunkowe potrzebuje do PIT-4R i PIT-8AR. Dla spółek wypłacających dywidendy — dokumentacja uchwał i przelewów dywidendowych jest dostępna w jednym miejscu.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zasady poboru zryczałtowanego podatku mogą być skomplikowane — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Ustal, czy w poprzednim roku pobierałeś zaliczki od pracowników — jeśli tak, złóż PIT-4R do 31 stycznia.',
      'Ustal, czy wypłacałeś dywidendy lub inne przychody ze zryczałtowanym podatkiem — jeśli tak, złóż PIT-8AR do 31 stycznia.',
      'Przekaż biuru rachunkowemu kompletne listy płac i potwierdzenia wpłat do US za cały rok.',
      'Pamiętaj: PIT-4R/PIT-8AR do US do 31 stycznia; PIT-11 do pracownika do końca lutego.',
    ],
    official_links: [
      { label: 'PIT-4R — formularz', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-4r/', external: true },
      { label: 'PIT-8AR — formularz', href: 'https://www.podatki.gov.pl/pit/formularze-pit/pit-8ar/', external: true },
    ],
    related_actions: [
      { label: 'PIT-11 — informacja dla pracownika', href: '/poradnik/pit-11-informacja-o-dochodach' },
      { label: 'ZUS DRA — deklaracja ZUS', href: '/poradnik/zus-dra-deklaracja-zus' },
      { label: 'Jak wypłacać pieniądze ze spółki z o.o.', href: '/poradnik/jak-wyplacac-pieniadze-ze-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Czy firma zatrudniająca 2 osoby musi składać i PIT-4R i PIT-11?',
        answer: 'Tak. PIT-4R to deklaracja pracodawcy do US (podsumowanie zaliczek). PIT-11 to informacja dla każdego pracownika osobno. Oba obowiązki istnieją niezależnie od siebie.',
      },
      {
        question: 'Czy PIT-8AR dotyczy tylko spółek z o.o. wypłacających dywidendy?',
        answer: 'Nie tylko. PIT-8AR dotyczy każdego podmiotu pobierającego zryczałtowany podatek — np. od odsetek od pożyczek, nagród, wygranych lub dywidend. Większość małych JDG bez tych transakcji nie składa PIT-8AR.',
      },
      {
        question: 'Jaki jest termin złożenia PIT-4R i PIT-8AR?',
        answer: '31 stycznia za poprzedni rok podatkowy — wysyłane elektronicznie do właściwego Urzędu Skarbowego.',
      },
    ],
    article_type: 'guide',
    sort_order: 110,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: CIT-8 ───────────────────────────────────────────────────────
  {
    id: 'fallback-cit-8',
    slug: 'cit-8-podatek-dochodowy-spolka-zoo',
    title: 'CIT-8 — roczna deklaracja podatkowa spółki z o.o.',
    excerpt: 'CIT-8 to roczne zeznanie spółki z o.o. z podatku dochodowego od osób prawnych. Składasz je do końca marca za poprzedni rok — i to właśnie wtedy wiesz ile CIT-u spółka zapłaci.',
    summary: 'Przewodnik po CIT-8: kto składa, kiedy, jakie są stawki CIT, co można odliczyć i czym różni się podatek spółki od podatku właściciela JDG.',
    purpose: 'Właściciele spółek z o.o. często pytają: "kiedy spółka płaci podatek?". CIT-8 to odpowiedź — ten poradnik wyjaśnia jak działa roczny podatek dochodowy spółki.',
    body_markdown: `## Co to jest CIT-8?

CIT-8 to roczne zeznanie podatkowe w podatku dochodowym od osób prawnych (CIT). Każda spółka z o.o. (i inne osoby prawne) ma obowiązek złożyć CIT-8 za każdy rok podatkowy.

W trakcie roku spółka płaci **zaliczki na CIT** co miesiąc. CIT-8 to roczne podsumowanie — porównujesz zapłacone zaliczki z faktycznym CIT i albo dopłacasz resztę, albo dostajesz zwrot.

## Kogo dotyczy?

Wszystkich spółek z o.o. (i innych osób prawnych). Nie dotyczy JDG — właściciel JDG płaci PIT, nie CIT.

## Kiedy jest potrzebna?

- **Termin złożenia:** do **3 miesięcy po zakończeniu roku podatkowego**
  - Dla roku kończącego się 31 grudnia → do **31 marca** następnego roku
  - Dla roku kończącego się w innym miesiącu → analogicznie 3 miesiące po jego zakończeniu
- W ciągu roku: spółka płaci **miesięczne zaliczki na CIT** do 20. dnia następnego miesiąca
- Małe podatnicy mogą wybrać zaliczki kwartalne

## Stawki CIT (2024/2025)

- **9% CIT** — dla **małych podatników** (przychody brutto poniżej 2 mln EUR w poprzednim roku)
- **19% CIT** — dla pozostałych spółek

Uwaga: 9% to stawka preferencyjna, ale nie przysługuje spółce w pierwszym roku jeśli była "tworzona" z innej spółki w celu skorzystania z niższej stawki. Szczegóły warto potwierdzić z biurem.

## Kto zwykle to składa?

Biuro rachunkowe lub główna księgowa — CIT-8 wymaga dostępu do pełnych ksiąg rachunkowych za rok. Podpisywany przez osobę uprawnioną do reprezentacji (zarząd) lub pełnomocnika podatkowego (UPL-1).

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Podatek dochodowy | PIT (12%/32% lub 19% lub ryczałt) | CIT (9% lub 19%) |
| Formularz roczny | PIT-36, PIT-36L lub PIT-28 | CIT-8 |
| Podatek właściciela od wypłaty | Brak (JDG = właściciel) | PIT 19% od dywidendy |
| Termin | 30 kwietnia (PIT-36/L) lub 15 lutego (PIT-28) | 31 marca |

W spółce z o.o. istnieje **podwójne opodatkowanie**: spółka płaci CIT od zysku, a właściciel płaci 19% PIT od dywidendy. Warto brać to pod uwagę przy planowaniu wypłat.

## Najczęstsze błędy

- **Nieterminowe zaliczki miesięczne** — spóźnienie z zaliczką generuje odsetki podatkowe od zaległości.
- **Nieprawidłowe ustalenie czy spółka jest małym podatnikiem** — stawka 9% zależy od przychodów za poprzedni rok. Warto potwierdzić z biurem przed ustaleniem stawki zaliczek.
- **Brak dokumentacji kosztów** — CIT bazuje na pełnej księgowości. Koszty bez dokumentów = koszty zakwestionowane przez US.
- **Pominięcie cen transferowych** — jeśli spółka dokonuje transakcji z podmiotami powiązanymi (np. wspólnikiem, inną spółką właściciela), mogą obowiązywać wymogi dotyczące dokumentacji cen transferowych.

## Jak KsięgaI może pomóc

Spółka z o.o. prowadzi pełną księgowość. KsięgaI porządkuje faktury, dokumenty i płatności przez cały rok — biuro rachunkowe ma kompletne dane do zamknięcia roku i przygotowania CIT-8 bez konieczności żmudnego zbierania dokumentów z całego roku.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady podatkowej. Zasady CIT i uprawnienie do stawki 9% są szczegółowo regulowane — skonsultuj się z biurem rachunkowym lub doradcą podatkowym.`,
    checklist: [
      'Sprawdź czy spółka kwalifikuje się do stawki 9% CIT (przychody poniżej 2 mln EUR w poprzednim roku).',
      'Płać miesięczne zaliczki na CIT do 20. dnia następnego miesiąca.',
      'Dostarcz biuru rachunkowemu kompletne dokumenty za cały rok przed terminem zamknięcia ksiąg.',
      'Złóż CIT-8 do 31 marca (dla roku kończącego się 31 grudnia).',
      'Jeśli spółka wypłaca dywidendy — zaplanuj z biurem PIT-8AR od dywidendy.',
    ],
    official_links: [
      { label: 'CIT-8 — formularz i informacje', href: 'https://www.podatki.gov.pl/cit/formularze-cit/', external: true },
      { label: 'Podatek dochodowy od osób prawnych — podatki.gov.pl', href: 'https://www.podatki.gov.pl/cit/', external: true },
    ],
    related_actions: [
      { label: 'Pełna księgowość w spółce z o.o.', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
      { label: 'e-Sprawozdanie finansowe spółki', href: '/poradnik/e-sprawozdanie-finansowe-spolka-zoo' },
      { label: 'Jak wypłacać pieniądze ze spółki z o.o.', href: '/poradnik/jak-wyplacac-pieniadze-ze-spolki-zoo' },
    ],
    faq: [
      {
        question: 'Do kiedy spółka z o.o. musi złożyć CIT-8?',
        answer: 'Do 3 miesięcy po zakończeniu roku podatkowego. Dla roku kończącego się 31 grudnia — do 31 marca. Jeśli rok podatkowy kończy się w innym miesiącu, termin przesuwa się odpowiednio.',
      },
      {
        question: 'Kiedy spółka płaci CIT 9% a kiedy 19%?',
        answer: 'Stawka 9% przysługuje małym podatnikom — spółkom, których przychody brutto w poprzednim roku nie przekroczyły 2 mln EUR (przeliczone na PLN według kursu NBP). Pozostałe spółki płacą 19%.',
      },
      {
        question: 'Czy właściciel spółki z o.o. składa też swój PIT?',
        answer: 'Tak. Spółka składa CIT-8, a właściciel-wspólnik składa swój roczny PIT od wypłaconych mu wynagrodzeń, dywidend lub innych przychodów z tytułu współpracy ze spółką.',
      },
      {
        question: 'Czy nowo założona spółka może od razu płacić CIT 9%?',
        answer: 'Co do zasady tak, jeśli spełnia warunki małego podatnika i nie jest "tworzona" z innej spółki w celu skorzystania z niższej stawki. Warto potwierdzić z biurem rachunkowym przed pierwszą zaliczką.',
      },
    ],
    article_type: 'guide',
    sort_order: 120,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Deklaracje: e-sprawozdanie finansowe ────────────────────────────────────
  {
    id: 'fallback-e-sprawozdanie',
    slug: 'e-sprawozdanie-finansowe-spolka-zoo',
    title: 'e-Sprawozdanie finansowe spółki z o.o. — co to jest i kiedy złożyć',
    excerpt: 'Każda spółka z o.o. musi co roku sporządzić i złożyć sprawozdanie finansowe w formie elektronicznej XML do KRS. To nie to samo co CIT-8 — to odrębny obowiązek z innym terminem.',
    summary: 'Przewodnik po e-sprawozdaniu finansowym spółki z o.o.: co to jest, co zawiera, kto je podpisuje, kiedy złożyć i jak odróżnić od CIT-8.',
    purpose: 'Właściciele spółek często mylą e-sprawozdanie finansowe z CIT-8 lub nie wiedzą że to dwa osobne obowiązki z różnymi terminami. Ten poradnik wyjaśnia czym jest e-sprawozdanie i co z nim zrobić.',
    body_markdown: `## Co to jest e-sprawozdanie finansowe?

Sprawozdanie finansowe to roczny dokument przedstawiający sytuację majątkową i wyniki finansowe spółki. Obejmuje:
- **Bilans** — stan aktywów i pasywów na koniec roku
- **Rachunek zysków i strat** — przychody, koszty i wynik finansowy
- **Informacja dodatkowa** — uzupełniające informacje do bilansu i rachunku
- Opcjonalnie: **Rachunek przepływów pieniężnych** i **Zestawienie zmian w kapitale własnym** (obowiązkowe dla większych spółek)

"e-Sprawozdanie" oznacza, że od kilku lat musi być sporządzone w **formacie XML** (elektronicznym) zgodnym ze strukturą Ministerstwa Finansów, a nie w formacie PDF czy Word.

## Kogo dotyczy?

Wszystkich spółek z o.o. (i innych podmiotów prowadzących pełną księgowość). Każda spółka z o.o. ma obowiązek sporządzania rocznego sprawozdania finansowego — bez wyjątków, niezależnie od wielkości czy aktywności.

## Kiedy jest potrzebna?

Proces sprawozdania finansowego ma kilka etapów:

1. **Sporządzenie sprawozdania** — przez kierownika jednostki (zarząd) z pomocą głównej księgowej lub biura rachunkowego. Termin: **do 3 miesięcy po zakończeniu roku** (do 31 marca dla roku kończącego się 31 grudnia)
2. **Zatwierdzenie przez zgromadzenie wspólników** — uchwałą. Termin: **do 6 miesięcy po zakończeniu roku** (do 30 czerwca)
3. **Złożenie do KRS** — po zatwierdzeniu, w ciągu **15 dni** od zatwierdzenia
4. **Przesłanie do urzędu skarbowego** — od 2022 roku następuje automatycznie przez KRS, ale warto potwierdzić z biurem

## Kto zwykle to sporządza i składa?

Biuro rachunkowe sporządza sprawozdanie na podstawie ksiąg rachunkowych. Podpisuje je:
- **Zarząd spółki** (każdy członek uprawniony do reprezentacji) — podpisem kwalifikowanym lub profilem zaufanym
- **Główna księgowa** (jeśli jest osobno)

Złożenie do KRS odbywa się przez system e-KRS lub przez pełnomocnika.

## JDG vs spółka z o.o.

| | JDG | Spółka z o.o. |
|---|---|---|
| Obowiązek sprawozdania finansowego | Brak (chyba że prowadzi pełną księgowość dobrowolnie lub z obowiązku) | Tak, obowiązkowe co roku |
| Format | — | XML (e-Sprawozdanie) |
| Gdzie składać | — | KRS + US (automatycznie) |
| Termin zatwierdzenia | — | 6 miesięcy po zakończeniu roku |

JDG na KPiR lub ryczałcie nie sporządza sprawozdania finansowego.

## Najczęstsze błędy

- **Mylenie z CIT-8** — CIT-8 to zeznanie podatkowe do Urzędu Skarbowego. Sprawozdanie finansowe to raport o stanie firmy do KRS. To dwa osobne obowiązki: CIT-8 do 31 marca, sprawozdanie do KRS do 30 czerwca (po zatwierdzeniu przez ZW).
- **Spóźnione zgromadzenie wspólników** — zatwierdzenie sprawozdania wymaga uchwały zgromadzenia wspólników. Warto zaplanować zgromadzenie przed terminem, nie w ostatniej chwili.
- **Brak podpisu wszystkich wymaganych osób** — sprawozdanie podpisują wszyscy, którzy mają obowiązek — zarząd i ewentualnie biegły rewident.
- **Niezłożenie do KRS** — sprawozdanie złożone tylko do US (poprzez CIT-8) nie zwalnia z obowiązku złożenia do KRS. Obydwa obowiązki są osobne.

## Jak KsięgaI może pomóc

KsięgaI pilnuje obiegu dokumentów przez cały rok. Biuro rachunkowe mające kompletne dane może sprawnie zamknąć rok finansowy i sporządzić sprawozdanie zgodnie z terminami. Uchwały o zatwierdzeniu sprawozdania można przechowywać w module uchwał.

> **Informacja ogólna:** Ten artykuł ma charakter edukacyjny i nie stanowi porady finansowej ani prawnej. Zasady sprawozdawczości mogą się różnić w zależności od wielkości spółki — skonsultuj się z biurem rachunkowym.`,
    checklist: [
      'Zlecaj biurowi rachunkowemu sporządzenie sprawozdania finansowego do 31 marca.',
      'Zwołaj Zgromadzenie Wspólników i podejmij uchwałę zatwierdzającą sprawozdanie do 30 czerwca.',
      'Złóż zatwierdzone e-sprawozdanie do KRS w ciągu 15 dni od zatwierdzenia.',
      'Upewnij się że zarząd podpisał sprawozdanie kwalifikowanym podpisem lub profilem zaufanym.',
      'Sprawdź z biurem czy złożenie do KRS automatycznie przekazuje sprawozdanie do US.',
    ],
    official_links: [
      { label: 'e-Sprawozdania finansowe — Ministerstwo Finansów', href: 'https://www.podatki.gov.pl/e-sprawozdania-finansowe/', external: true },
      { label: 'Portal e-KRS', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'CIT-8 — roczny podatek spółki', href: '/poradnik/cit-8-podatek-dochodowy-spolka-zoo' },
      { label: 'Pełna księgowość w spółce z o.o.', href: '/poradnik/pelna-ksiegowosc-spolka-zoo-o-co-chodzi' },
      { label: 'Kiedy i jak przeprowadzić zgromadzenie wspólników', href: '/poradnik/kiedy-i-jak-zwolac-zgromadzenie-wspolnikow' },
    ],
    faq: [
      {
        question: 'Czym różni się CIT-8 od sprawozdania finansowego?',
        answer: 'CIT-8 to zeznanie podatkowe składane do Urzędu Skarbowego (do 31 marca). Sprawozdanie finansowe to dokument o stanie finansowym spółki składany do KRS (po zatwierdzeniu przez ZW, do 30 czerwca). Oba obowiązki są osobne.',
      },
      {
        question: 'Czy mała, nieaktywna spółka z o.o. też musi składać sprawozdanie?',
        answer: 'Tak. Każda spółka z o.o. wpisana do KRS ma obowiązek rocznego sprawozdania finansowego — nawet jeśli nie prowadziła działalności. Biuro rachunkowe może sporządzić zerowe sprawozdanie.',
      },
      {
        question: 'Kto podpisuje e-sprawozdanie finansowe?',
        answer: 'Zarząd spółki — każda osoba wpisana jako uprawniona do reprezentacji. Podpis odbywa się profilem zaufanym lub kwalifikowanym podpisem elektronicznym przez system e-KRS lub e-Sprawozdania MF.',
      },
      {
        question: 'Co grozi za niezłożenie sprawozdania do KRS?',
        answer: 'Sąd rejestrowy może wszcząć postępowanie przymuszające i nałożyć grzywnę. Brak sprawozdania może też skutkować problemami przy ubieganiu się o finansowanie lub zawieraniu umów z kontrahentami sprawdzającymi KRS.',
      },
    ],
    article_type: 'guide',
    sort_order: 130,
    published_at: '2026-06-06T00:00:00.000Z',
    updated_at: '2026-06-06T00:00:00.000Z',
    category: fallbackWikiCategories[9],
  },

  // ─── Obsługa i pomoc KSeF — statusy, błędy, problemy ────────────────────────
  {
    id: 'fallback-ksef-obsluga-pomoc',
    slug: 'obsluga-ksef-status-i-najczestsze-problemy',
    entityTypes: ['spolka', 'jdg', 'stowarzyszenie', 'fundacja'],
    title: 'Obsługa KSeF — statusy faktur, błędy i jak rozwiązać najczęstsze problemy',
    excerpt: 'Dokument "oczekuje na zatwierdzenie", faktura nie trafia do KSeF, token nie działa — co te komunikaty oznaczają i co z nimi zrobić.',
    summary: 'Praktyczny przewodnik po obsłudze KSeF: co oznaczają statusy dokumentów, najczęstsze błędy przy wysyłce faktur i gdzie szukać pomocy, kiedy coś nie działa.',
    purpose: 'Osoby, które już korzystają z KSeF, częściej szukają pomocy przy konkretnym problemie niż ogólnego wprowadzenia. Ten poradnik odpowiada wprost na te pytania.',
    body_markdown: `## Co oznaczają statusy dokumentu w KSeF

Po wysłaniu faktury do KSeF dokument przechodzi przez kilka stanów, zanim uzyska numer KSeF:

- **Oczekuje na przetworzenie** — dokument dotarł do systemu, ale nie został jeszcze zweryfikowany. Zwykle trwa to kilka sekund do kilku minut.
- **Dokument oczekuje na zatwierdzenie przez KSeF** — trwa walidacja struktury i danych. Jeśli ten status utrzymuje się długo (ponad kilkanaście minut), zwykle oznacza to duże obciążenie systemu MF, nie błąd po Twojej stronie. Nie wysyłaj faktury ponownie — poczekaj i sprawdź status później, żeby uniknąć duplikatu.
- **Przyjęty / nadany numer KSeF** — dokument przeszedł walidację, ma nadany numer KSeF i jest uznawany za wystawiony.
- **Odrzucony** — dokument nie przeszedł walidacji. System podaje kod błędu i opis — najczęściej dotyczy to niezgodności NIP, błędnej sumy kontrolnej lub nieprawidłowego formatu pola.

## Najczęstsze problemy i jak je rozwiązać

**Faktura nie trafia do KSeF mimo wysyłki**
Sprawdź najpierw status połączenia firmy z KSeF w ustawieniach — token mógł wygasnąć albo zostać unieważniony w portalu KSeF. Wygasły token trzeba wygenerować ponownie i podmienić w aplikacji.

**Dokument odrzucony — błąd walidacji**
Kod błędu w komunikacie wskazuje konkretne pole. Najczęstsze przyczyny: NIP nabywcy niezgodny z formatem, brak wymaganego elementu faktury (np. daty sprzedaży), błędna waluta lub duplikat numeru faktury już wysłanego wcześniej.

**Token przestał działać**
Tokeny KSeF mają termin ważności i mogą zostać cofnięte ręcznie w portalu. Jeśli aplikacja zgłasza błąd autoryzacji, wygeneruj nowy token zgodnie z [instrukcją podłączenia firmy](/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme) i zaktualizuj go w ustawieniach.

**Faktura wysłana dwa razy (duplikat)**
Jeśli ponowiłeś wysyłkę w trakcie długiego statusu "oczekuje na zatwierdzenie", KSeF może odrzucić drugą próbę jako duplikat numeru — to prawidłowe zachowanie, nie błąd. Sprawdź numer KSeF pierwszej wysyłki zamiast wysyłać fakturę po raz trzeci.

**Środowisko testowe vs produkcyjne**
KSeF ma osobne środowisko testowe (dla próbnych wysyłek) i produkcyjne. Token z jednego środowiska nie działa w drugim — to najczęstsza przyczyna komunikatu "nieprawidłowy token" przy pierwszym podłączeniu.

## Gdzie szukać pomocy poza aplikacją

- **Infolinia Krajowej Informacji Skarbowej** — pytania o przepisy i obowiązki związane z KSeF.
- **Portal podatki.gov.pl / KSeF** — status techniczny systemu, komunikaty o awariach i planowanych przerwach.
- **Wsparcie KsięgaI** — jeśli problem dotyczy samej integracji (token, wysyłka, statusy w aplikacji), napisz do wsparcia z numerem faktury i zrzutem ekranu błędu.

## Kiedy problem nie leży po Twojej stronie

W okresach szczytowego obciążenia (np. koniec miesiąca) KSeF bywa wolniejszy niż zwykle, a status "oczekuje na zatwierdzenie" może utrzymywać się dłużej niż normalnie. To ograniczenie systemu MF — sprawdzaj komunikaty o dostępności na portalu KSeF zamiast zakładać błąd po stronie własnej faktury.`,
    checklist: [
      'Sprawdź status dokumentu, zanim wyślesz go ponownie.',
      'Przy odrzuceniu — odczytaj kod błędu i sprawdź konkretne pole faktury.',
      'Przy błędzie autoryzacji — sprawdź ważność tokena i wygeneruj nowy, jeśli trzeba.',
      'Nie mieszaj tokenów ze środowiska testowego i produkcyjnego.',
      'Długi status "oczekuje na zatwierdzenie" zwykle oznacza obciążenie systemu MF, nie błąd Twojej faktury.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'Komunikaty i dostępność KSeF', href: 'https://www.podatki.gov.pl/ksef/', external: true },
      { label: 'Krajowa Informacja Skarbowa', href: 'https://www.podatki.gov.pl/kontakt/', external: true },
    ],
    related_actions: [
      { label: 'Jak zdobyć token KSeF — instrukcja', href: '/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme' },
      { label: 'KSeF dla JDG — jak zacząć', href: '/poradnik/ksef-dla-jdg-jak-zaczac' },
      { label: 'KSeF dla spółki z o.o. — dostęp', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'Faktury w KsięgaI', href: '/faktury' },
    ],
    faq: [
      {
        question: 'Co oznacza "dokument oczekuje na zatwierdzenie przez KSeF"?',
        answer: 'Dokument dotarł do systemu i jest w trakcie walidacji. Zwykle trwa to krótko, ale w okresach dużego obciążenia MF może się wydłużyć do kilkunastu minut lub dłużej. Nie wysyłaj faktury ponownie w tym czasie — poczekaj na zmianę statusu.',
      },
      {
        question: 'Gdzie uzyskam pomoc, jeśli KSeF odrzuca moją fakturę?',
        answer: 'Kod błędu przy odrzuceniu wskazuje konkretne pole faktury do poprawy. Jeśli problem dotyczy integracji z KsięgaI (nie samej treści faktury), napisz do wsparcia aplikacji z numerem dokumentu i treścią błędu.',
      },
      {
        question: 'Dlaczego mój token KSeF przestał działać?',
        answer: 'Tokeny mają termin ważności i można je cofnąć ręcznie w portalu KSeF. Jeśli logowanie się nie powiedzie, wygeneruj nowy token i podmień go w ustawieniach aplikacji.',
      },
      {
        question: 'Czy problemy z KSeF zawsze wynikają z błędu w mojej fakturze?',
        answer: 'Nie. Część problemów (długi czas przetwarzania, chwilowa niedostępność) wynika z obciążenia systemu Ministerstwa Finansów, nie z treści faktury. Sprawdź komunikaty o dostępności na portalu KSeF, zanim zaczniesz szukać błędu we własnych danych.',
      },
    ],
    article_type: 'guide',
    sort_order: 50,
    published_at: '2026-08-18T00:00:00.000Z',
    updated_at: '2026-08-18T00:00:00.000Z',
    category: fallbackWikiCategories[0],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NGO — fundacja / stowarzyszenie rejestrowe (klaster obowiązków po rejestracji)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'fallback-ngo-pierwsze-obowiazki-fundacji',
    slug: 'pierwsze-obowiazki-po-rejestracji-fundacji',
    entityTypes: ['fundacja'],
    title: 'Pierwsze obowiązki fundacji po rejestracji w KRS — pełna lista z terminami',
    h1: 'Fundacja jest w KRS — i co dalej? Obowiązki, o których nikt nie mówi',
    excerpt: 'Wpis do KRS to nie koniec. Fundacja ma po rejestracji NIP-8 (21 dni), CRBR (14 dni), konto organizacji w e-US, e-Doręczenia, a co roku sprawozdanie z działalności do właściwego ministra.',
    summary: 'Kompletna checklista obowiązków fundacji zaraz po wpisie do KRS: NIP-8, CRBR, rachunek bankowy, konto organizacji w e-Urzędzie Skarbowym, e-Doręczenia, nadzór ministra i starosty, coroczne sprawozdanie z działalności, sprawozdanie finansowe oraz rozdzielenie działalności statutowej, odpłatnej i gospodarczej.',
    purpose: 'Zarząd nowej fundacji zwykle nie wie, co i w jakiej kolejności załatwić po rejestracji — a część obowiązków ma ustawowe terminy i sankcje. Ten poradnik układa je w jedną listę i kieruje do szczegółowych instrukcji.',
    body_markdown: `## W skrócie

Rejestracja fundacji w KRS uruchamia kilka obowiązków — część z ustawowym terminem liczonym od dnia wpisu:

- **NIP-8** — dane uzupełniające do urzędu skarbowego, **21 dni** od wpisu do KRS,
- **CRBR** — zgłoszenie beneficjentów rzeczywistych, **14 dni** od wpisu do KRS,
- **konto bankowe** organizacji — jak najszybciej (numer zgłaszasz w NIP-8),
- **konto organizacji w e-Urzędzie Skarbowym** — żeby działać w e-US w imieniu fundacji,
- **e-Doręczenia** — adres do korespondencji urzędowej,
- co roku: **sprawozdanie z działalności** do właściwego ministra oraz **sprawozdanie finansowe**.

Fundacja jest osobą prawną — prowadzi pełną księgowość od pierwszego dnia, nawet jeśli nie ma jeszcze żadnych przychodów.

## Pierwsze dni: NIP-8 i CRBR

### NIP-8 — 21 dni od wpisu do KRS

Wpis do KRS nadaje NIP i REGON automatycznie, ale nie przekazuje urzędowi danych operacyjnych. **NIP-8** uzupełnia m.in.: numery rachunków bankowych, adresy miejsc prowadzenia działalności, miejsce przechowywania dokumentacji, dane kontaktowe, datę powstania obowiązku opłacania składek (jeśli fundacja zatrudnia). Termin: **21 dni** od wpisu do KRS; zmiana danych — 7 dni. Szczegóły i sposób podpisu: [NIP-8 dla fundacji i stowarzyszenia](/poradnik/nip-8-fundacja-stowarzyszenie).

### CRBR — 14 dni od wpisu do KRS

Fundacje wpisane do KRS są objęte **Centralnym Rejestrem Beneficjentów Rzeczywistych** (od 31 października 2021 r.). Zgłoszenie robi osoba uprawniona do reprezentacji zgodnie z KRS, bezpłatnie, przez [crbr.podatki.gov.pl](https://crbr.podatki.gov.pl/), w terminie **14 dni** od wpisu do KRS. Za brak zgłoszenia lub nieprawdziwe dane grozi kara do **1 000 000 zł**. Jak ustalić beneficjenta w fundacji (brak udziałowców): [CRBR dla fundacji i stowarzyszenia](/poradnik/crbr-fundacja-stowarzyszenie).

## Konto bankowe i konto organizacji w e-US

Otwórz **firmowy rachunek bankowy** fundacji (potrzebne: statut, odpis z KRS, dokumenty tożsamości zarządu) i zgłoś jego numer w NIP-8.

Żeby działać w e-Urzędzie Skarbowym w imieniu fundacji — składać JPK, zarządzać pełnomocnictwami, złożyć ZAW-FA do KSeF — potrzebujesz **konta organizacji**. **Wpis w KRS jako członek zarządu nie nadaje tego dostępu automatycznie.** Pierwszego użytkownika trzeba formalnie wyznaczyć wnioskiem, najczęściej osobiście w urzędzie. Cała procedura (identyczna jak dla spółki): [Konto organizacji w e-US dla fundacji i stowarzyszenia](/poradnik/konto-organizacji-e-urzad-skarbowy-ngo).

## e-Doręczenia

Fundacja wpisana do KRS ma obowiązek posiadania **adresu do e-Doręczeń**. Dla podmiotów rejestrowanych po 1 stycznia 2025 r. adres jest zwykle zakładany w procesie rejestracji w KRS — sprawdź, czy jest **aktywny** w Bazie Adresów Elektronicznych, i ustal, kto monitoruje skrzynkę. Szczegóły i aktualne terminy: [e-Doręczenia dla fundacji i stowarzyszenia](/poradnik/e-doreczenia-fundacja-stowarzyszenie).

## Nadzór nad fundacją

Fundacja podlega **podwójnemu nadzorowi**: właściwego **ministra** (wskazanego w KRS, adekwatnego do celów statutowych) oraz **starosty** właściwego ze względu na siedzibę. Organy nadzoru mogą żądać wyjaśnień, wglądu w dokumenty i uchwały. Ustal, który minister jest wpisany w Twoim KRS — do niego składasz coroczne sprawozdanie.

## Coroczne sprawozdanie z działalności do ministra

To obowiązek **wyłącznie fundacji** (stowarzyszenia go nie mają). Fundacja składa co roku właściwemu ministrowi **sprawozdanie z działalności** za rok poprzedni — w postaci elektronicznej, na urzędowym formularzu, podpisane podpisem kwalifikowanym, zaufanym albo osobistym. Termin, formularz i podstawa prawna: [Sprawozdanie z działalności fundacji](/poradnik/sprawozdanie-z-dzialalnosci-fundacji).

## Sprawozdanie finansowe

Fundacja sporządza **sprawozdanie finansowe** według ustawy o rachunkowości (organizacje nieprowadzące działalności gospodarczej mogą stosować uproszczony załącznik nr 6). SF sporządza się w **postaci elektronicznej** (struktura logiczna), podpisuje cały zarząd i osoba prowadząca księgi; składa się do Szefa KAS lub — jeśli fundacja jest w rejestrze przedsiębiorców — do KRS.

## Działalność statutowa, odpłatna i gospodarcza

Zanim fundacja zacznie pobierać opłaty lub sprzedawać, ustal charakter tych działań: **statutowa nieodpłatna**, **odpłatna działalność pożytku publicznego** (bez wpisu do rejestru przedsiębiorców, ale z wyodrębnieniem księgowym) czy **działalność gospodarcza** (wpis do rejestru przedsiębiorców KRS). Od tego zależą księgowość, VAT i KSeF. Zobacz: [Działalność w NGO — statutowa, odpłatna, gospodarcza](/poradnik/dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza).

## KSeF

Jeśli fundacja jest podatnikiem VAT i wystawia faktury, dotyczy jej **KSeF**. Ścieżka jest taka sama jak dla spółki bez pieczęci kwalifikowanej: konto organizacji w e-US → **ZAW-FA** → pierwsza osoba z uprawnieniami → dalsze uprawnienia → token dla aplikacji. Zobacz: [KSeF dla fundacji i stowarzyszenia](/poradnik/ksef-dla-fundacji-i-stowarzyszenia).

## Zastrzeżenie

Stan na 7 września 2026 r. Przepisy i procedury bywają zmieniane — sprawdź aktualne informacje na gov.pl, podatki.gov.pl i u właściwego ministra. KsięgaI to oprogramowanie do prowadzenia organizacji i fakturowania, a nie doradztwo podatkowe ani prawne.`,
    checklist: [
      'Zgłoś beneficjentów rzeczywistych do CRBR w terminie 14 dni od wpisu do KRS (crbr.podatki.gov.pl).',
      'Złóż NIP-8 z danymi uzupełniającymi w terminie 21 dni od wpisu do KRS.',
      'Otwórz firmowy rachunek bankowy fundacji i zgłoś jego numer w NIP-8.',
      'Wyznacz pierwszego użytkownika konta organizacji w e-US (wniosek o dostęp — zwykle osobiście w urzędzie).',
      'Sprawdź, czy adres do e-Doręczeń fundacji jest aktywny, i ustal osobę monitorującą skrzynkę.',
      'Ustal, który minister jest wpisany w KRS jako organ nadzoru — do niego składasz sprawozdanie z działalności.',
      'Zaplanuj coroczne sprawozdanie z działalności do ministra oraz sprawozdanie finansowe.',
      'Ustal charakter działań fundacji: statutowa nieodpłatna, odpłatna pożytku publicznego czy gospodarcza.',
      'Jeśli fundacja wystawia faktury i jest podatnikiem VAT — zaplanuj ścieżkę do KSeF (konto organizacji → ZAW-FA).',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie beneficjentów rzeczywistych', href: 'https://crbr.podatki.gov.pl/', external: true },
      { label: 'Konto Organizacji w e-Urzędzie Skarbowym', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'Formularz sprawozdania z działalności fundacji (Ministerstwo Sprawiedliwości)', href: 'https://www.gov.pl/web/sprawiedliwosc/formularz-sprawozdania-z-dzialalnosci-fundacji', external: true },
      { label: 'Fundacje — nadzór (Ministerstwo Sprawiedliwości)', href: 'https://www.gov.pl/web/sprawiedliwosc/fundacje-nadzor', external: true },
      { label: 'e-Doręczenia dla podmiotów niepublicznych', href: 'https://www.gov.pl/web/e-doreczenia', external: true },
    ],
    related_actions: [
      { label: 'Konto organizacji w e-US dla fundacji i stowarzyszenia', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-ngo' },
      { label: 'CRBR dla fundacji i stowarzyszenia', href: '/poradnik/crbr-fundacja-stowarzyszenie' },
      { label: 'NIP-8 dla fundacji i stowarzyszenia', href: '/poradnik/nip-8-fundacja-stowarzyszenie' },
      { label: 'Sprawozdanie z działalności fundacji', href: '/poradnik/sprawozdanie-z-dzialalnosci-fundacji' },
      { label: 'KSeF dla fundacji i stowarzyszenia', href: '/poradnik/ksef-dla-fundacji-i-stowarzyszenia' },
    ],
    faq: [
      {
        question: 'Ile czasu ma fundacja na CRBR i NIP-8 po rejestracji?',
        answer: 'CRBR — 14 dni od wpisu do KRS (kara do 1 mln zł za brak). NIP-8 — 21 dni od wpisu do KRS (grzywna za spóźnienie). Oba terminy liczą się od dnia wpisu.',
      },
      {
        question: 'Czy fundacja musi składać sprawozdanie do ministra co roku?',
        answer: 'Tak. Fundacja składa właściwemu ministrowi (wskazanemu w KRS) coroczne sprawozdanie z działalności za rok poprzedni, w postaci elektronicznej na urzędowym formularzu. Stowarzyszenia takiego obowiązku nie mają.',
      },
      {
        question: 'Czy członek zarządu fundacji automatycznie widzi ją w e-Urzędzie Skarbowym?',
        answer: 'Nie. Wpis w KRS pozwala wystąpić o dostęp do konta organizacji, ale go nie nadaje. Pierwszego użytkownika trzeba wyznaczyć wnioskiem — dla nowej organizacji zwykle osobiście w urzędzie.',
      },
      {
        question: 'Czy fundacja bez przychodów prowadzi księgowość?',
        answer: 'Tak. Fundacja jest osobą prawną i od dnia wpisu do KRS prowadzi pełne księgi rachunkowe, nawet bez żadnych operacji. Organizacje nieprowadzące działalności gospodarczej mogą stosować uproszczony załącznik nr 6 do ustawy o rachunkowości.',
      },
    ],
    article_type: 'checklist',
    sort_order: 10,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_START_NGO,
  },

  {
    id: 'fallback-ngo-pierwsze-obowiazki-stowarzyszenia',
    slug: 'pierwsze-obowiazki-po-rejestracji-stowarzyszenia',
    entityTypes: ['stowarzyszenie'],
    title: 'Pierwsze obowiązki stowarzyszenia po rejestracji w KRS — lista z terminami',
    h1: 'Stowarzyszenie jest w KRS — pierwsze obowiązki, o których nikt nie mówi',
    excerpt: 'Stowarzyszenie rejestrowe po wpisie do KRS ma NIP-8 (21 dni), CRBR (14 dni), konto organizacji w e-US, e-Doręczenia i nadzór starosty. Sprawozdania do ministra — w odróżnieniu od fundacji — nie składa.',
    summary: 'Checklista obowiązków stowarzyszenia rejestrowego zaraz po wpisie do KRS: NIP-8, CRBR, rachunek bankowy, konto organizacji w e-Urzędzie Skarbowym, e-Doręczenia, nadzór starosty, sprawozdanie finansowe, działalność statutowa, odpłatna i gospodarcza oraz KSeF. Czym różni się od obowiązków fundacji.',
    purpose: 'Zarząd nowego stowarzyszenia często nie wie, co załatwić po rejestracji ani czym jego obowiązki różnią się od obowiązków fundacji. Ten poradnik układa je w listę z terminami.',
    body_markdown: `## W skrócie

Wpis stowarzyszenia rejestrowego do KRS uruchamia obowiązki — część z ustawowym terminem od dnia wpisu:

- **CRBR** — zgłoszenie beneficjentów rzeczywistych, **14 dni** od wpisu do KRS,
- **NIP-8** — dane uzupełniające do urzędu skarbowego, **21 dni** od wpisu do KRS,
- **konto bankowe** organizacji — jak najszybciej (numer zgłaszasz w NIP-8),
- **konto organizacji w e-Urzędzie Skarbowym** — żeby działać w e-US w imieniu stowarzyszenia,
- **e-Doręczenia** — adres do korespondencji urzędowej,
- co roku: **sprawozdanie finansowe** (sprawozdania z działalności do ministra stowarzyszenie **nie składa**).

Stowarzyszenie rejestrowe jest osobą prawną — prowadzi pełną księgowość od pierwszego dnia, nawet bez przychodów.

## Pierwsze dni: CRBR i NIP-8

### CRBR — 14 dni od wpisu do KRS

Stowarzyszenia wpisane do KRS są objęte **Centralnym Rejestrem Beneficjentów Rzeczywistych** (od 31 października 2021 r.). Zgłoszenie robi osoba uprawniona do reprezentacji zgodnie z KRS, bezpłatnie, przez [crbr.podatki.gov.pl](https://crbr.podatki.gov.pl/), w terminie **14 dni** od wpisu do KRS. Kara za brak lub nieprawdziwe dane — do **1 000 000 zł**. W stowarzyszeniu nie ma udziałowców, więc beneficjentów ustala się według kontroli faktycznej. Jak to zrobić: [CRBR dla fundacji i stowarzyszenia](/poradnik/crbr-fundacja-stowarzyszenie).

### NIP-8 — 21 dni od wpisu do KRS

KRS nadaje NIP i REGON automatycznie, ale nie przekazuje urzędowi danych operacyjnych. **NIP-8** uzupełnia numery rachunków bankowych, adresy, miejsce przechowywania dokumentacji, dane kontaktowe, datę powstania obowiązku składek (jeśli stowarzyszenie zatrudnia). Termin: **21 dni** od wpisu do KRS; zmiana danych — 7 dni. Szczegóły: [NIP-8 dla fundacji i stowarzyszenia](/poradnik/nip-8-fundacja-stowarzyszenie).

## Konto bankowe i konto organizacji w e-US

Otwórz **firmowy rachunek bankowy** stowarzyszenia (statut, odpis z KRS, dokumenty tożsamości zarządu) i zgłoś numer w NIP-8.

Do działania w e-Urzędzie Skarbowym w imieniu stowarzyszenia potrzebujesz **konta organizacji**. **Wpis w KRS jako członek zarządu nie nadaje tego dostępu automatycznie** — pierwszego użytkownika trzeba wyznaczyć wnioskiem, zwykle osobiście w urzędzie. Cała procedura: [Konto organizacji w e-US dla fundacji i stowarzyszenia](/poradnik/konto-organizacji-e-urzad-skarbowy-ngo).

## e-Doręczenia

Stowarzyszenie rejestrowe (podmiot niepubliczny w KRS) ma obowiązek posiadania **adresu do e-Doręczeń**. Dla organizacji rejestrowanych po 1 stycznia 2025 r. adres jest zwykle zakładany przy rejestracji w KRS — sprawdź jego **aktywność** w Bazie Adresów Elektronicznych. Szczegóły i terminy: [e-Doręczenia dla fundacji i stowarzyszenia](/poradnik/e-doreczenia-fundacja-stowarzyszenie).

## Nadzór nad stowarzyszeniem

Organem nadzoru jest **starosta** (lub prezydent miasta na prawach powiatu) właściwy ze względu na siedzibę stowarzyszenia. Może żądać odpisów uchwał walnego zebrania, wyjaśnień od zarządu i przeprowadzać kontrolę. **Stowarzyszenie nie składa sprawozdania z działalności do ministra** — to obowiązek fundacji. Wyjątek: stowarzyszenie ze statusem organizacji pożytku publicznego składa sprawozdanie merytoryczne i finansowe w bazie sprawozdań OPP.

## Sprawozdanie finansowe

Stowarzyszenie rejestrowe sporządza **sprawozdanie finansowe** według ustawy o rachunkowości (organizacje nieprowadzące działalności gospodarczej mogą stosować uproszczony załącznik nr 6). SF sporządza się w **postaci elektronicznej**, podpisuje cały zarząd i osoba prowadząca księgi; składa się do Szefa KAS lub — jeśli stowarzyszenie prowadzi działalność gospodarczą i jest w rejestrze przedsiębiorców — do KRS. Zobacz: [Obowiązki sprawozdawcze stowarzyszenia](/poradnik/obowiazki-sprawozdawcze-stowarzyszenia).

## Działalność statutowa, odpłatna i gospodarcza

Zanim stowarzyszenie zacznie pobierać opłaty od uczestników lub sprzedawać, ustal charakter tych działań: **statutowa nieodpłatna**, **odpłatna działalność pożytku publicznego** czy **działalność gospodarcza** (wymaga wpisu do rejestru przedsiębiorców KRS). Zobacz: [Działalność w NGO — statutowa, odpłatna, gospodarcza](/poradnik/dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza).

## KSeF

Jeśli stowarzyszenie jest podatnikiem VAT i wystawia faktury, dotyczy go **KSeF** na ogólnych zasadach: konto organizacji w e-US → **ZAW-FA** → pierwsza osoba z uprawnieniami → token. Zobacz: [KSeF dla fundacji i stowarzyszenia](/poradnik/ksef-dla-fundacji-i-stowarzyszenia).

## Zastrzeżenie

Stan na 7 września 2026 r. Przepisy bywają zmieniane — sprawdź aktualne informacje na gov.pl i u właściwego starosty. KsięgaI to oprogramowanie, a nie doradztwo podatkowe ani prawne.`,
    checklist: [
      'Zgłoś beneficjentów rzeczywistych do CRBR w terminie 14 dni od wpisu do KRS.',
      'Złóż NIP-8 z danymi uzupełniającymi w terminie 21 dni od wpisu do KRS.',
      'Otwórz firmowy rachunek bankowy stowarzyszenia i zgłoś jego numer w NIP-8.',
      'Wyznacz pierwszego użytkownika konta organizacji w e-US (wniosek o dostęp — zwykle osobiście w urzędzie).',
      'Sprawdź, czy adres do e-Doręczeń stowarzyszenia jest aktywny, i wyznacz osobę monitorującą skrzynkę.',
      'Ustal właściwego starostę (organ nadzoru) ze względu na siedzibę stowarzyszenia.',
      'Zaplanuj coroczne sprawozdanie finansowe (do Szefa KAS lub KRS).',
      'Ustal charakter działań: statutowa nieodpłatna, odpłatna pożytku publicznego czy gospodarcza.',
      'Jeśli stowarzyszenie wystawia faktury i jest podatnikiem VAT — zaplanuj ścieżkę do KSeF.',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie beneficjentów rzeczywistych', href: 'https://crbr.podatki.gov.pl/', external: true },
      { label: 'Konto Organizacji w e-Urzędzie Skarbowym', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'e-Doręczenia dla podmiotów niepublicznych', href: 'https://www.gov.pl/web/e-doreczenia', external: true },
      { label: 'Sprawozdania finansowe organizacji do Szefa KAS', href: 'https://www.podatki.gov.pl/e-sprawozdania-finansowe/', external: true },
    ],
    related_actions: [
      { label: 'Konto organizacji w e-US dla fundacji i stowarzyszenia', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-ngo' },
      { label: 'CRBR dla fundacji i stowarzyszenia', href: '/poradnik/crbr-fundacja-stowarzyszenie' },
      { label: 'NIP-8 dla fundacji i stowarzyszenia', href: '/poradnik/nip-8-fundacja-stowarzyszenie' },
      { label: 'Obowiązki sprawozdawcze stowarzyszenia', href: '/poradnik/obowiazki-sprawozdawcze-stowarzyszenia' },
      { label: 'KSeF dla fundacji i stowarzyszenia', href: '/poradnik/ksef-dla-fundacji-i-stowarzyszenia' },
    ],
    faq: [
      {
        question: 'Czy stowarzyszenie składa sprawozdanie z działalności do ministra?',
        answer: 'Nie. To obowiązek fundacji. Stowarzyszenie rejestrowe podlega nadzorowi starosty i składa jedynie sprawozdanie finansowe (oraz — jeśli ma status OPP — sprawozdanie merytoryczne w bazie OPP).',
      },
      {
        question: 'Ile czasu ma stowarzyszenie na CRBR i NIP-8?',
        answer: 'CRBR — 14 dni od wpisu do KRS (kara do 1 mln zł). NIP-8 — 21 dni od wpisu do KRS. Oba liczą się od dnia wpisu.',
      },
      {
        question: 'Kto nadzoruje stowarzyszenie?',
        answer: 'Starosta (albo prezydent miasta na prawach powiatu) właściwy ze względu na siedzibę stowarzyszenia. Może żądać odpisów uchwał i wyjaśnień od zarządu.',
      },
      {
        question: 'Czy członek zarządu stowarzyszenia automatycznie widzi je w e-US?',
        answer: 'Nie. Wpis w KRS pozwala wystąpić o dostęp do konta organizacji, ale go nie nadaje. Pierwszego użytkownika trzeba wyznaczyć wnioskiem, zwykle osobiście w urzędzie.',
      },
    ],
    article_type: 'checklist',
    sort_order: 12,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_START_NGO,
  },

  {
    id: 'fallback-ngo-konto-organizacji',
    slug: 'konto-organizacji-e-urzad-skarbowy-ngo',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'Konto organizacji w e-Urzędzie Skarbowym dla fundacji i stowarzyszenia',
    h1: 'Fundacja lub stowarzyszenie nie pojawia się w e-Urzędzie Skarbowym? Jak uzyskać Konto Organizacji',
    excerpt: 'Procedura Konta Organizacji jest taka sama dla każdego podmiotu w KRS — także fundacji i stowarzyszenia. Wpis w KRS jako członek zarządu nie nadaje dostępu; pierwszego użytkownika trzeba wyznaczyć wnioskiem.',
    summary: 'Jak fundacja lub stowarzyszenie rejestrowe uzyskuje dostęp do Konta Organizacji w e-Urzędzie Skarbowym: dlaczego organizacja nie widnieje po zalogowaniu, jak wyznaczyć pierwszego użytkownika wnioskiem, jakie dokumenty (statut, odpis KRS, reprezentacja) przygotować i jak to się łączy z NIP-8 i ZAW-FA do KSeF.',
    purpose: 'Zarząd fundacji lub stowarzyszenia loguje się do e-US i nie widzi organizacji, a poradniki online mówią głównie o spółkach. Ten artykuł pokazuje, że procedura jest identyczna, i wskazuje różnice w dokumentach.',
    body_markdown: `## Procedura jest taka sama jak dla spółki

**Konto Organizacji w e-Urzędzie Skarbowym działa tak samo dla każdego podmiotu wpisanego do KRS — bez względu na formę prawną.** Oficjalna informacja Ministerstwa Finansów wprost wymienia stowarzyszenia i fundacje obok spółek. Dlatego cała mechanika — bootstrap pierwszego użytkownika, dostęp podstawowy vs rozszerzony, dodawanie kolejnych osób online — jest opisana w jednym miejscu:

> **[Konto organizacji w e-US dla nowej spółki z o.o. — krok po kroku](/poradnik/konto-organizacji-e-urzad-skarbowy-spolka)** — przeczytaj ten przewodnik jako podstawę. Poniżej tylko to, co jest inne dla fundacji i stowarzyszenia.

## Czy członek zarządu automatycznie widzi organizację w e-US?

Nie. Wpis w KRS jako osoba uprawniona do reprezentacji fundacji lub stowarzyszenia wskazuje, **kto może wystąpić o dostęp** do Konta Organizacji — ale sam z siebie nie czyni tej osoby użytkownikiem konta. Jeśli po zalogowaniu i kliknięciu „Zmień kontekst" / „Przełącz podmiot" organizacji nie ma na liście, to najczęściej dlatego, że **nikt nie został jeszcze wyznaczony jako jej użytkownik**.

## Jak wyznaczyć pierwszego użytkownika

Tak samo jak w spółce: przez **„Wniosek o przyznanie dostępu / odebranie dostępu do Konta Organizacji w e-Urzędzie Skarbowym"**, złożony do urzędu skarbowego właściwego w sprawach ewidencji dla organizacji. Dla nowej organizacji najpewniejszą drogą jest **złożenie wniosku osobiście w placówce US**. Pierwszy użytkownik powinien dostać **dostęp rozszerzony** — tylko taki może potem dodawać kolejne osoby online (sekcja „Dane organizacji → Użytkownicy").

## Co jest inne dla fundacji i stowarzyszenia — dokumenty

Do urzędu zabierz:

- **wypełniony wniosek o dostęp do Konta Organizacji**,
- **statut** organizacji (w spółce to umowa/akt założycielski — tu statut),
- **aktualny odpis / wydruk z KRS**,
- **dokument tożsamości** osoby wyznaczanej na użytkownika,
- **podpisy zgodne z zasadą reprezentacji ze STATUTU i wpisu w KRS** — w wielu fundacjach i stowarzyszeniach reprezentacja jest łączna (np. dwóch członków zarządu); wtedy wniosek podpisuje komplet wymaganych osób,
- **pełnomocnictwo**, jeśli wniosek składa ktoś inny niż osoby uprawnione do reprezentacji,
- **dane do NIP-8**, jeśli chcesz złożyć go przy tej samej wizycie.

## NIP-8 i ta sama wizyta

**Złożenie NIP-8 nie jest prawnie zależne od Konta Organizacji**, ale złożenie elektroniczne wymaga sposobu podpisu (podpis kwalifikowany, aktywne UPL-1 albo podpisanie z kontekstu organizacji w e-US). Zwykły członek zarządu nowej organizacji bez tych narzędzi powinien **zanieść NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji** i złożyć oba przy jednej wizycie. Szczegóły: [NIP-8 dla fundacji i stowarzyszenia](/poradnik/nip-8-fundacja-stowarzyszenie).

## Po co Konto Organizacji fundacji i stowarzyszeniu

Z poziomu Konta Organizacji organizacja: przegląda deklaracje i JPK, zarządza pełnomocnictwami (UPL-1 dla biura rachunkowego), a przede wszystkim **składa ZAW-FA** — pierwszy krok do KSeF. Bez Konta Organizacji nie ruszysz z autoryzacją organizacji w KSeF. Zobacz: [KSeF dla fundacji i stowarzyszenia](/poradnik/ksef-dla-fundacji-i-stowarzyszenia).

## Zastrzeżenie

Stan na 7 września 2026 r. Sprawdź aktualne instrukcje na podatki.gov.pl. KsięgaI to oprogramowanie, a nie doradztwo podatkowe ani prawne.`,
    checklist: [
      'Przeczytaj przewodnik o Koncie Organizacji dla spółki — mechanika jest identyczna.',
      'Ustal osoby uprawnione do reprezentacji zgodnie ze statutem i wpisem w KRS.',
      'Wypełnij wniosek o przyznanie dostępu do Konta Organizacji — dostęp rozszerzony dla pierwszej osoby.',
      'Przygotuj statut, aktualny odpis z KRS, dokument tożsamości wyznaczanej osoby i pełnomocnictwo, jeśli wniosek składa ktoś inny niż reprezentanci.',
      'Zbierz dane do NIP-8 i złóż go przy tej samej wizycie w urzędzie.',
      'Złóż wniosek — dla nowej organizacji najpewniej osobiście w placówce właściwego US.',
      'Po aktywacji przełącz się na kontekst organizacji i sprawdź podgląd deklaracji oraz sekcję „Użytkownicy".',
      'Zaplanuj ZAW-FA, jeśli organizacja wystawia faktury i wchodzi do KSeF.',
    ],
    official_links: [
      { label: 'Konto Organizacji — zasady (podatki.gov.pl)', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/konto-organizacji', external: true },
      { label: 'Wniosek o przyznanie/odebranie dostępu do Konta Organizacji (PDF)', href: 'https://www.podatki.gov.pl/media/ckdf0mxs/wniosek-o-przyznanie-dost%C4%99pu_odebranie-dost%C4%99pu-do-konta-organizacji-w-e-urzedzie-skarbowym-2.pdf', external: true },
      { label: 'e-Urząd Skarbowy', href: 'https://www.podatki.gov.pl/e-urzad-skarbowy/', external: true },
    ],
    related_actions: [
      { label: 'Konto organizacji w e-US dla nowej spółki — pełna mechanika', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-spolka' },
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'NIP-8 dla fundacji i stowarzyszenia', href: '/poradnik/nip-8-fundacja-stowarzyszenie' },
    ],
    faq: [
      {
        question: 'Czy Konto Organizacji dla fundacji różni się od tego dla spółki?',
        answer: 'Sama procedura jest identyczna — wniosek o dostęp, pierwszy użytkownik, dostęp rozszerzony, dodawanie kolejnych osób online. Różnią się dokumenty: zamiast umowy spółki dołączasz statut, a reprezentacja wynika ze statutu i KRS (często łączna).',
      },
      {
        question: 'Czy stowarzyszenie może wyznaczyć pierwszego użytkownika online?',
        answer: 'Nie. Online dodaje się dopiero kolejnych użytkowników, przez osobę z dostępem rozszerzonym. Pierwszego zawsze wyznacza się wnioskiem złożonym poza kontem organizacji.',
      },
      {
        question: 'Czy do NIP-8 fundacji potrzebne jest Konto Organizacji?',
        answer: 'Nie jest prawnie wymagane. Papierowo NIP-8 podpisują osoby uprawnione do reprezentacji zgodnie z KRS. Elektroniczne złożenie wymaga podpisu kwalifikowanego, aktywnego UPL-1 albo kontekstu organizacji w e-US.',
      },
    ],
    article_type: 'guide',
    sort_order: 22,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_URZAD_SKARBOWY,
  },

  {
    id: 'fallback-ngo-nip8',
    slug: 'nip-8-fundacja-stowarzyszenie',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'NIP-8 dla fundacji i stowarzyszenia — termin, dane uzupełniające, jak złożyć',
    excerpt: 'Fundacja i stowarzyszenie rejestrowe składają NIP-8 z danymi uzupełniającymi w ciągu 21 dni od wpisu do KRS. Nie zależy prawnie od Konta Organizacji, ale wersja elektroniczna wymaga sposobu podpisu.',
    summary: 'Kiedy fundacja i stowarzyszenie składają NIP-8 (21 dni od wpisu do KRS, 7 dni na zmianę), jakie dane uzupełniające podać, gdzie i jak go złożyć oraz jak to się ma do Konta Organizacji i UPL-1.',
    purpose: 'Zarząd nowej organizacji zakłada, że po KRS i nadaniu NIP nic więcej nie trzeba — a NIP-8 ma termin i sankcję. Ten artykuł porządkuje, co i kiedy zgłosić.',
    body_markdown: `## Co to jest NIP-8

NIP-8 to **zgłoszenie danych uzupełniających** podmiotu wpisanego do KRS. Wpis nadaje NIP i REGON, ale nie przekazuje urzędowi danych operacyjnych organizacji. NIP-8 je dopina.

## Termin

Liczony od dnia wpisu do KRS:

- **21 dni** — na dane istotne dla urzędu skarbowego i statystyki publicznej,
- **7 dni** — na dane niezbędne dla ZUS (gdy organizacja jest płatnikiem składek) oraz na zgłoszenie każdej późniejszej zmiany danych.

Za niezłożenie w terminie grozi grzywna (Kodeks karny skarbowy).

## Jakie dane trafiają do NIP-8

- numery **firmowych rachunków bankowych** organizacji,
- **adresy miejsc prowadzenia działalności** inne niż sama siedziba,
- **miejsce przechowywania dokumentacji rachunkowej**,
- **dane kontaktowe** (telefon, e-mail),
- **przeważający rodzaj działalności (PKD)**,
- **data powstania obowiązku opłacania składek**, jeśli organizacja zatrudnia,
- dane **biura rachunkowego**, jeśli prowadzi księgi.

## Jak złożyć — i czy potrzebne jest Konto Organizacji

NIP-8 kierujesz do **naczelnika urzędu skarbowego właściwego ze względu na siedzibę** organizacji.

**NIP-8 nie jest prawnie zależny od Konta Organizacji.** Papierowo w urzędzie podpisują go osoby uprawnione do reprezentacji zgodnie z KRS (w fundacjach i stowarzyszeniach reprezentacja bywa łączna — wtedy komplet podpisów). **Złożenie elektroniczne** przez e-Urząd Skarbowy wymaga sposobu podpisu: podpisu kwalifikowanego, aktywnego UPL-1 albo podpisania z poziomu kontekstu organizacji w e-US.

Zwykły członek zarządu nowej organizacji, który nie ma podpisu kwalifikowanego, aktywnego UPL-1 ani dostępu do Konta Organizacji, powinien **zanieść wypełniony NIP-8 do urzędu razem z wnioskiem o dostęp do Konta Organizacji dla pierwszego użytkownika** i złożyć oba przy jednej wizycie.

Gdy dostęp do Konta Organizacji już istnieje, NIP-8 składasz wprost z kontekstu organizacji — **nie nadawaj sobie w tym celu UPL-1**.

## NIP-8, Konto Organizacji i UPL-1 to trzy różne rzeczy

- **NIP-8** to zgłoszenie danych. Nie daje żadnego dostępu.
- **Konto Organizacji** to działanie w e-US w imieniu organizacji — patrz [Konto organizacji w e-US dla fundacji i stowarzyszenia](/poradnik/konto-organizacji-e-urzad-skarbowy-ngo).
- **UPL-1** to pełnomocnictwo do podpisywania deklaracji elektronicznych. Możliwość złożenia UPL-1 albo NIP-8 nie dowodzi posiadania dostępu do Konta Organizacji.

## Zastrzeżenie

Stan na 7 września 2026 r. Sprawdź aktualne informacje na podatki.gov.pl i biznes.gov.pl. KsięgaI to oprogramowanie, a nie doradztwo podatkowe ani prawne.`,
    checklist: [
      'Sprawdź, że organizacja ma wpis do KRS i nadany NIP.',
      'Ustal termin: 21 dni od wpisu do KRS (7 dni dla danych potrzebnych ZUS lub od zmiany danych).',
      'Zbierz numery firmowych rachunków bankowych i pozostałe dane uzupełniające.',
      'Ustal PKD przeważające i miejsce przechowywania dokumentacji rachunkowej.',
      'Ustal sposób podpisu: podpis kwalifikowany / aktywne UPL-1 → elektronicznie; bez nich i bez Konta Organizacji → papierowo.',
      'Nową organizacją bez tych narzędzi: złóż NIP-8 papierowo razem z wnioskiem o dostęp do Konta Organizacji, przy jednej wizycie.',
      'Ustaw przypomnienie o aktualizacji NIP-8 przy każdej zmianie danych (7 dni).',
    ],
    official_links: [
      { label: 'Biznes.gov.pl — zgłoszenie NIP-8', href: 'https://www.biznes.gov.pl/pl/portal/ou1478', external: true },
      { label: 'Formularze podatkowe (NIP-8)', href: 'https://www.podatki.gov.pl/formularze-podatkowe/', external: true },
    ],
    related_actions: [
      { label: 'Konto organizacji w e-US dla fundacji i stowarzyszenia', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-ngo' },
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'CRBR dla fundacji i stowarzyszenia', href: '/poradnik/crbr-fundacja-stowarzyszenie' },
    ],
    faq: [
      {
        question: 'Ile czasu na NIP-8 po rejestracji fundacji lub stowarzyszenia?',
        answer: 'Co do zasady 21 dni od dnia wpisu do KRS; 7 dni na dane potrzebne ZUS oraz na późniejsze zmiany danych. Za spóźnienie grozi grzywna.',
      },
      {
        question: 'Czy do NIP-8 potrzebne jest Konto Organizacji?',
        answer: 'Nie jest prawnie wymagane. Papierowo podpisują go osoby uprawnione do reprezentacji zgodnie z KRS. Elektroniczne złożenie wymaga podpisu kwalifikowanego, aktywnego UPL-1 albo kontekstu organizacji w e-US.',
      },
      {
        question: 'Czy możliwość złożenia UPL-1 lub NIP-8 oznacza dostęp do Konta Organizacji?',
        answer: 'Nie. To trzy odrębne mechanizmy — złożenie UPL-1 albo NIP-8 nie jest dowodem posiadania dostępu do Konta Organizacji.',
      },
    ],
    article_type: 'guide',
    sort_order: 24,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_START_NGO,
  },

  {
    id: 'fallback-ngo-crbr',
    slug: 'crbr-fundacja-stowarzyszenie',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'CRBR dla fundacji i stowarzyszenia — kogo zgłosić i w jakim terminie',
    excerpt: 'Fundacje i stowarzyszenia wpisane do KRS są objęte CRBR od 31 października 2021 r. Zgłoszenie w 14 dni od wpisu, bez udziałowców — beneficjentów ustala się według faktycznej kontroli.',
    summary: 'Jak fundacja i stowarzyszenie zgłaszają beneficjentów rzeczywistych do CRBR: termin 14 dni od wpisu do KRS, kto zgłasza, jak ustalić beneficjenta bez udziałowców (kontrola faktyczna, zarząd jako rozwiązanie ostateczne), kary i aktualizacja.',
    purpose: 'Wiele nowych fundacji i stowarzyszeń nie wie, że CRBR ich dotyczy, albo nie wie, kogo wpisać, skoro nie ma wspólników. Ten artykuł to wyjaśnia.',
    body_markdown: `## Czy CRBR dotyczy fundacji i stowarzyszenia

Tak. Od **31 października 2021 r.** fundacje oraz stowarzyszenia podlegające wpisowi do KRS są **podmiotami zobowiązanymi** do zgłaszania informacji do **Centralnego Rejestru Beneficjentów Rzeczywistych**.

## Termin

**14 dni od dnia wpisu do KRS.** Aktualizacja danych — w terminie 14 dni od zmiany. Zgłoszenie jest bezpłatne i składa się elektronicznie na [crbr.podatki.gov.pl](https://crbr.podatki.gov.pl/), z podpisem kwalifikowanym lub profilem zaufanym.

## Kto zgłasza

Wyłącznie **osoba uprawniona do reprezentacji** organizacji zgodnie z KRS (członek zarządu / komplet zarządu przy reprezentacji łącznej). Nie można tego zlecić pełnomocnikowi ani biuru rachunkowemu — zgłoszenie podpisuje reprezentant.

## Kto jest beneficjentem rzeczywistym, skoro nie ma udziałowców

W fundacji i stowarzyszeniu nie ma wspólników ani udziałów, więc kryterium własnościowe nie działa. Beneficjenta ustala się według **faktycznej kontroli**:

- osoby fizyczne sprawujące kontrolę nad organizacją poprzez posiadane uprawnienia (np. fundator z realnym wpływem, osoba powołująca lub odwołująca zarząd, osoba finansująca i wpływająca na decyzje),
- jeżeli po wyczerpaniu innych możliwości nie da się wskazać takiej osoby — jako beneficjentów wykazuje się **osoby zajmujące wyższe stanowiska kierownicze**, czyli zwykle **członków zarządu**.

Zawsze udokumentuj, dlaczego wskazałeś dane osoby — to podstawa przy ewentualnej kontroli.

## Kary

Za niezgłoszenie w terminie, zgłoszenie nieprawdziwych danych lub brak aktualizacji: kara pieniężna do **1 000 000 zł** dla organizacji oraz do **50 000 zł** dla beneficjenta, który nie przekazał organizacji wymaganych informacji.

## Zastrzeżenie

Stan na 7 września 2026 r. Sprawdź aktualne komunikaty Ministerstwa Finansów o CRBR. KsięgaI to oprogramowanie, a nie doradztwo prawne.`,
    checklist: [
      'Potwierdź, że organizacja jest wpisana do KRS (CRBR dotyczy fundacji i stowarzyszeń rejestrowych).',
      'Ustal beneficjentów rzeczywistych według kontroli faktycznej; jeśli nie da się wskazać — członków zarządu.',
      'Udokumentuj sposób ustalenia beneficjentów.',
      'Zaloguj się na crbr.podatki.gov.pl profilem zaufanym lub podpisem kwalifikowanym.',
      'Złóż zgłoszenie w terminie 14 dni od wpisu do KRS; zgłoszenie podpisuje reprezentant zgodnie z KRS.',
      'Zachowaj urzędowe potwierdzenie (UPO).',
      'Aktualizuj CRBR w 14 dni od każdej zmiany składu zarządu lub sposobu kontroli.',
    ],
    official_links: [
      { label: 'CRBR — zgłoszenie', href: 'https://crbr.podatki.gov.pl/', external: true },
      { label: 'Nowe podmioty zobowiązane do CRBR od 31 X 2021 (Ministerstwo Finansów)', href: 'https://www.gov.pl/web/finanse/i-a-zgloszenie-informacji-do-centralnego-rejestru-beneficjentow-rzeczywistych-zwanego-dalej-crbr--nowe-podmioty-zobowiazane-do-zglaszania-informacji-do-crbr-po-zmianach-obowiazujacych-od-31-x-2021', external: true },
      { label: 'Kto musi być w CRBR (biznes.gov.pl)', href: 'https://www.biznes.gov.pl/pl/portal/00165', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'NIP-8 dla fundacji i stowarzyszenia', href: '/poradnik/nip-8-fundacja-stowarzyszenie' },
    ],
    faq: [
      {
        question: 'Czy CRBR dotyczy każdej fundacji i stowarzyszenia?',
        answer: 'Dotyczy fundacji i stowarzyszeń podlegających wpisowi do KRS (od 31 października 2021 r.). Stowarzyszenia zwykłe, nierejestrowe, nie są w KRS i CRBR ich nie obejmuje.',
      },
      {
        question: 'Kogo wpisać jako beneficjenta, skoro nie ma udziałowców?',
        answer: 'Osoby fizyczne sprawujące faktyczną kontrolę nad organizacją. Jeśli po analizie nie da się wskazać takiej osoby — członków zarządu jako osoby na wyższych stanowiskach kierowniczych. Sposób ustalenia trzeba udokumentować.',
      },
      {
        question: 'Ile czasu na zgłoszenie do CRBR?',
        answer: '14 dni od wpisu do KRS, a przy zmianach — 14 dni od zdarzenia. Kara za brak lub nieprawdziwe dane sięga 1 mln zł dla organizacji.',
      },
    ],
    article_type: 'guide',
    sort_order: 26,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_COMPLIANCE,
  },

  {
    id: 'fallback-ngo-e-doreczenia',
    slug: 'e-doreczenia-fundacja-stowarzyszenie',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'e-Doręczenia dla fundacji i stowarzyszenia — obowiązek, adres, kto monitoruje',
    excerpt: 'Fundacja i stowarzyszenie rejestrowe (podmioty niepubliczne w KRS) mają obowiązek posiadania adresu do e-Doręczeń. Dla organizacji rejestrowanych od 2025 r. adres powstaje przy wpisie do KRS — trzeba go tylko aktywować.',
    summary: 'Jak działa obowiązek e-Doręczeń dla fundacji i stowarzyszenia rejestrowego: kiedy adres powstaje, jak sprawdzić jego aktywność w Bazie Adresów Elektronicznych, kto powinien monitorować skrzynkę i co grozi za ignorowanie korespondencji.',
    purpose: 'Nowe organizacje często nie wiedzą, że mają skrzynkę do e-Doręczeń, i przegapiają pierwsze urzędowe pisma. Ten artykuł mówi, co sprawdzić i jak to ustawić.',
    body_markdown: `## Obowiązek e-Doręczeń dla organizacji

**e-Doręczenia** to publiczny, prawnie skuteczny odpowiednik listu poleconego za potwierdzeniem odbioru. Podmioty niepubliczne wpisane do **KRS** — w tym **fundacje i stowarzyszenia rejestrowe** — mają obowiązek posiadania **adresu do doręczeń elektronicznych** wpisanego do **Bazy Adresów Elektronicznych (BAE)**.

## Kiedy adres powstaje

- **Organizacje rejestrowane w KRS od 1 stycznia 2025 r.** — wniosek o utworzenie adresu do e-Doręczeń składa się **razem z wnioskiem o wpis do KRS**; adres powstaje w toku rejestracji. Twoim zadaniem jest **aktywacja** skrzynki i sprawdzenie, że adres jest wpisany do BAE.
- **Organizacje zarejestrowane wcześniej** — obowiązek wszedł etapami; jeśli nie masz jeszcze adresu, załóż go przez [gov.pl/web/e-doreczenia](https://www.gov.pl/web/e-doreczenia) i sprawdź aktualny termin dla podmiotów KRS.

## Co zrobić po rejestracji

1. Sprawdź w BAE, czy adres do e-Doręczeń organizacji istnieje i jest **aktywny**.
2. Zaloguj się do skrzynki (przez [Konto Przedsiębiorcy / gov.pl](https://www.gov.pl/web/e-doreczenia)) i dokończ aktywację, jeśli trzeba.
3. **Wyznacz osobę (i zastępcę), która regularnie sprawdza skrzynkę** — pisma z e-Doręczeń wywołują skutki prawne z upływem terminu, nawet jeśli nikt ich nie odczytał.
4. Rozważ nadanie dostępu do skrzynki księgowej lub biuru rachunkowemu.

## Dlaczego to ważne

Po wpisaniu adresu do BAE urzędy i sądy doręczają organizacji korespondencję **elektronicznie**. Nieodebrane pismo uznaje się za doręczone po 14 dniach. Ignorowanie skrzynki to realne ryzyko przegapienia wezwania z urzędu skarbowego, sądu rejestrowego albo organu nadzoru.

## Zastrzeżenie

Stan na 7 września 2026 r. Terminy wdrożenia e-Doręczeń były zmieniane — sprawdź aktualne informacje na gov.pl/web/e-doreczenia. KsięgaI to oprogramowanie, a nie doradztwo prawne.`,
    checklist: [
      'Sprawdź w Bazie Adresów Elektronicznych, czy organizacja ma adres do e-Doręczeń i czy jest aktywny.',
      'Dokończ aktywację skrzynki, jeśli adres powstał przy rejestracji w KRS, ale nie został uruchomiony.',
      'Jeśli organizacja jest starsza i nie ma adresu — załóż go na gov.pl/web/e-doreczenia.',
      'Wyznacz osobę i zastępcę odpowiedzialnych za regularne sprawdzanie skrzynki.',
      'Rozważ nadanie dostępu do skrzynki księgowej lub biuru rachunkowemu.',
      'Ustaw powiadomienia e-mail o nowej korespondencji w skrzynce.',
    ],
    official_links: [
      { label: 'e-Doręczenia — informacje i aktywacja', href: 'https://www.gov.pl/web/e-doreczenia', external: true },
      { label: 'Baza Adresów Elektronicznych', href: 'https://www.gov.pl/web/e-doreczenia/baza-adresow-elektronicznych', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'Konto organizacji w e-US dla fundacji i stowarzyszenia', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-ngo' },
    ],
    faq: [
      {
        question: 'Czy fundacja i stowarzyszenie muszą mieć e-Doręczenia?',
        answer: 'Tak, jako podmioty niepubliczne wpisane do KRS mają obowiązek posiadania adresu do doręczeń elektronicznych w Bazie Adresów Elektronicznych.',
      },
      {
        question: 'Organizacja zarejestrowana w 2025 lub 2026 roku — czy adres już mamy?',
        answer: 'Najprawdopodobniej tak. Od 1 stycznia 2025 r. wniosek o adres do e-Doręczeń składa się razem z wnioskiem o wpis do KRS. Trzeba sprawdzić aktywność adresu w BAE i uruchomić skrzynkę.',
      },
      {
        question: 'Co się stanie, jeśli nikt nie sprawdza skrzynki?',
        answer: 'Pismo doręczone elektronicznie uznaje się za doręczone po 14 dniach, nawet nieodczytane. Można w ten sposób przegapić wezwanie z urzędu, sądu rejestrowego lub organu nadzoru.',
      },
    ],
    article_type: 'guide',
    sort_order: 28,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_COMPLIANCE,
  },

  {
    id: 'fallback-ngo-ksef',
    slug: 'ksef-dla-fundacji-i-stowarzyszenia',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'KSeF dla fundacji i stowarzyszenia — kiedy dotyczy i jak uzyskać dostęp',
    h1: 'KSeF w fundacji i stowarzyszeniu — kiedy Cię dotyczy i od czego zacząć',
    excerpt: 'KSeF dotyczy fundacji i stowarzyszenia, które są podatnikami VAT i wystawiają faktury. Ścieżka dostępu jest taka sama jak dla spółki bez pieczęci kwalifikowanej: konto organizacji w e-US → ZAW-FA → dalsze uprawnienia.',
    summary: 'Kiedy KSeF obejmuje fundację lub stowarzyszenie (podatnik VAT wystawiający faktury, także zwolniony z VAT), a kiedy nie (tylko darowizny i składki bez faktur), oraz jak organizacja bez pieczęci kwalifikowanej uzyskuje dostęp: konto organizacji, ZAW-FA, pierwsza osoba z uprawnieniami, token dla aplikacji, dostęp dla biura rachunkowego.',
    purpose: 'Organizacje nie wiedzą, czy KSeF ich dotyczy, bo „nie prowadzą firmy". Kryterium jest inne — wystawianie faktur jako podatnik VAT. Ten artykuł to porządkuje i pokazuje ścieżkę dostępu.',
    body_markdown: `## Kiedy KSeF dotyczy organizacji

KSeF (Krajowy System e-Faktur) obejmuje **podatników VAT wystawiających faktury** — niezależnie od formy prawnej. Fundacja lub stowarzyszenie **jest objęte KSeF**, jeżeli:

- jest czynnym podatnikiem VAT i wystawia faktury (np. za działalność gospodarczą lub odpłatną),
- jest podatnikiem VAT zwolnionym, ale **wystawia faktury** (faktura na żądanie, faktury w ramach działalności odpłatnej) — obowiązek e-faktur obejmuje etapami także podatników zwolnionych.

KSeF **nie dotyczy** organizacji, która przyjmuje wyłącznie **darowizny, składki członkowskie i dotacje** i **nie wystawia żadnych faktur** — to nie są czynności fakturowane.

Zakres i terminy obowiązkowości bywają zmieniane — potwierdź z księgową, od kiedy dotyczy Twojej organizacji.

## Ścieżka dostępu — jak dla spółki bez pieczęci kwalifikowanej

Organizacja jest podmiotem w KRS i zwykle **nie ma kwalifikowanej pieczęci elektronicznej**, więc idzie tą samą ścieżką co spółka z o.o. bez pieczęci:

1. **Rejestracja i NIP** — organizacja wpisana do KRS.
2. **Pierwszy użytkownik konta organizacji w e-US** — wniosek o dostęp (dla nowej organizacji zwykle osobiście w urzędzie). Zobacz: [Konto organizacji w e-US dla fundacji i stowarzyszenia](/poradnik/konto-organizacji-e-urzad-skarbowy-ngo).
3. **Kontekst organizacji w e-US** — użytkownik przełącza się na organizację.
4. **ZAW-FA** — organizacja wyznacza pierwszą osobę fizyczną z uprawnieniami w KSeF (uprawnienia „właścicielskie").
5. **Pierwsza osoba w KSeF** — po skutecznym ZAW-FA loguje się do KSeF, wystawia i odbiera faktury.
6. **Dalsze uprawnienia** — dla kolejnych osób i dla **biura rachunkowego** (po stronie NIP biura).
7. **Token / certyfikat KSeF** — dla aplikacji takiej jak KsięgaI, na końcu.

Pełne wyjaśnienie każdego etapu (w tym alternatywa z pieczęcią kwalifikowaną): [KSeF dla spółki z o.o. bez pieczęci kwalifikowanej](/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep).

## Rozdziel pojęcia

- **Konto Organizacji** — dostęp do e-US w imieniu organizacji (warunek wstępny).
- **UPL-1** — pełnomocnictwo do podpisywania deklaracji (np. JPK_V7), nie do KSeF.
- **ZAW-FA** — wyznaczenie pierwszej osoby z uprawnieniami w KSeF.
- **Token / certyfikat** — dla aplikacji, nadawany po ZAW-FA.

## Zastrzeżenie

Stan na 7 września 2026 r. Zakres i terminy KSeF bywają zmieniane — sprawdź ksef.podatki.gov.pl i potwierdź z księgową. KsięgaI to oprogramowanie, a nie doradztwo podatkowe.`,
    checklist: [
      'Ustal z księgową, czy organizacja jest podatnikiem VAT i wystawia faktury — jeśli tak, KSeF ją obejmuje.',
      'Jeśli organizacja przyjmuje tylko darowizny, składki i dotacje bez faktur — KSeF na razie nie dotyczy.',
      'Wyznacz pierwszego użytkownika konta organizacji w e-US (wniosek o dostęp).',
      'Z kontekstu organizacji złóż ZAW-FA, aby wyznaczyć pierwszą osobę z uprawnieniami w KSeF.',
      'Po skutecznym ZAW-FA zaloguj tę osobę do KSeF i sprawdź wystawianie oraz odbiór faktur.',
      'Nadaj dalsze uprawnienia: kolejnym osobom i biuru rachunkowemu po stronie NIP biura.',
      'Wygeneruj token / certyfikat KSeF i połącz organizację z KsięgaI.',
    ],
    official_links: [
      { label: 'Portal KSeF', href: 'https://ksef.podatki.gov.pl/', external: true },
      { label: 'ZAW-FA — formularz (PDF)', href: 'https://ksef.podatki.gov.pl/media/em1k4cmk/zaw-fa.pdf', external: true },
      { label: 'KSeF — uprawnienia i autoryzacja', href: 'https://ksef.podatki.gov.pl/ksef-news/uprawnienia-i-autoryzacja/', external: true },
    ],
    related_actions: [
      { label: 'KSeF dla spółki z o.o. bez pieczęci kwalifikowanej — pełna ścieżka', href: '/poradnik/ksef-spolka-z-oo-kto-moze-nadac-dostep' },
      { label: 'Konto organizacji w e-US dla fundacji i stowarzyszenia', href: '/poradnik/konto-organizacji-e-urzad-skarbowy-ngo' },
      { label: 'Jak nadać biuru rachunkowemu dostęp do KSeF', href: '/poradnik/jak-nadac-dostep-ksef-dla-ksiegowej' },
      { label: 'Działalność w NGO — statutowa, odpłatna, gospodarcza', href: '/poradnik/dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza' },
    ],
    faq: [
      {
        question: 'Czy KSeF dotyczy fundacji, która nie prowadzi działalności gospodarczej?',
        answer: 'Może dotyczyć. Kryterium to bycie podatnikiem VAT i wystawianie faktur — np. w działalności odpłatnej pożytku publicznego. Jeśli organizacja przyjmuje wyłącznie darowizny, składki i dotacje bez faktur, KSeF jej nie obejmuje.',
      },
      {
        question: 'Czy organizacja potrzebuje pieczęci kwalifikowanej do KSeF?',
        answer: 'Nie musi. Bez pieczęci idzie ścieżką: konto organizacji w e-US → ZAW-FA → pierwsza osoba z uprawnieniami. Pieczęć kwalifikowana z NIP pozwala pominąć ZAW-FA, ale małe organizacje zwykle jej nie mają.',
      },
      {
        question: 'Kiedy generujemy token KSeF dla KsięgaI?',
        answer: 'Na końcu — po tym, jak organizacja ma pierwszą osobę z uprawnieniami w KSeF (po ZAW-FA). Token służy aplikacji, nie zastępuje wcześniejszych kroków.',
      },
    ],
    article_type: 'guide',
    sort_order: 45,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_KSEF,
  },

  {
    id: 'fallback-ngo-sprawozdanie-fundacji',
    slug: 'sprawozdanie-z-dzialalnosci-fundacji',
    entityTypes: ['fundacja'],
    title: 'Sprawozdanie z działalności fundacji do ministra — termin, formularz, jak złożyć',
    excerpt: 'Fundacja składa co roku właściwemu ministrowi sprawozdanie z działalności za rok poprzedni — w postaci elektronicznej, na urzędowym formularzu, z podpisem kwalifikowanym, zaufanym lub osobistym. Stowarzyszenia tego obowiązku nie mają.',
    summary: 'Kompletna instrukcja corocznego sprawozdania z działalności fundacji: podstawa prawna (art. 12 ustawy o fundacjach), właściwy minister wskazany w KRS, termin (za rok poprzedni do końca roku następnego), urzędowy formularz z rozporządzenia Ministra Sprawiedliwości z 20 grudnia 2022 r., forma elektroniczna, podpis i sposób przekazania.',
    purpose: 'To obowiązek wyłącznie fundacji, łatwy do przegapienia i różny u każdego ministra. Ten artykuł zbiera podstawę prawną, termin i praktykę w jednym miejscu.',
    body_markdown: `## Na czym polega obowiązek

Fundacja ma obowiązek **corocznego składania właściwemu ministrowi sprawozdania ze swojej działalności** (art. 12 ust. 2 ustawy z 6 kwietnia 1984 r. o fundacjach). Sprawozdanie pozwala organowi nadzoru ocenić, czy fundacja realizuje cele statutowe. **Stowarzyszenia nie mają tego obowiązku.**

## Do którego ministra

Do **ministra właściwego ze względu na cele statutowe fundacji** — ten minister jest **wskazany we wpisie do KRS** (rubryka „organ sprawujący nadzór"). Sprawdź go w odpisie z KRS. Różni ministrowie (Sprawiedliwości, Zdrowia, Kultury, Cyfryzacji, Rodziny i Polityki Społecznej itd.) publikują własne komunikaty i adresy do składania.

## Termin

Sprawozdanie składa się **za rok poprzedni, najpóźniej do końca roku następnego**. Przykładowo sprawozdanie za 2025 r. — do **31 grudnia 2026 r.** Niektórzy ministrowie wskazują wcześniejsze terminy porządkowe — sprawdź komunikat swojego ministra.

## Formularz i forma

- Sprawozdanie sporządza się na **jednolitym urzędowym formularzu** określonym w **rozporządzeniu Ministra Sprawiedliwości z 20 grudnia 2022 r.** w sprawie jednolitego wzoru formularza sprawozdania z działalności fundacji (Dz. U. z 2022 r. poz. 2791).
- Formularz jest udostępniony w **Biuletynie Informacji Publicznej** na stronie urzędu obsługującego Ministra Sprawiedliwości.
- Sprawozdanie sporządza się w **postaci elektronicznej** i opatruje **kwalifikowanym podpisem elektronicznym, podpisem zaufanym albo podpisem osobistym** osób uprawnionych do reprezentacji.

## Jak przekazać ministrowi

Elektronicznie — przez **e-Doręczenia** lub pocztą elektroniczną na adres wskazany przez ministra (część ministrów wskazuje preferowaną formę i skrzynkę). Zachowaj potwierdzenie wysłania.

## Co jeszcze

- Fundacja **ze statusem OPP** dodatkowo zamieszcza sprawozdanie merytoryczne i finansowe w **bazie sprawozdań OPP** (Narodowy Instytut Wolności) — to odrębny obowiązek.
- Sprawozdanie z działalności to **nie to samo** co sprawozdanie finansowe (bilans, RZiS) — oba są wymagane, ale idą w różne miejsca.

## Zastrzeżenie

Stan na 7 września 2026 r. Sprawdź aktualny komunikat właściwego ministra i treść rozporządzenia. KsięgaI to oprogramowanie, a nie doradztwo prawne.`,
    checklist: [
      'Sprawdź w odpisie z KRS, który minister jest wpisany jako organ nadzoru fundacji.',
      'Znajdź komunikat tego ministra o sprawozdaniach fundacji (adres, preferowana forma, termin porządkowy).',
      'Pobierz jednolity formularz sprawozdania z BIP Ministerstwa Sprawiedliwości.',
      'Wypełnij sprawozdanie za rok poprzedni w postaci elektronicznej.',
      'Podpisz podpisem kwalifikowanym, zaufanym lub osobistym przez osoby uprawnione do reprezentacji.',
      'Prześlij do ministra przez e-Doręczenia lub e-mail wskazany w komunikacie; zachowaj potwierdzenie.',
      'Nie myl tego ze sprawozdaniem finansowym — to odrębny dokument składany gdzie indziej.',
      'Fundacja OPP: dodatkowo zamieść sprawozdania w bazie sprawozdań OPP.',
    ],
    official_links: [
      { label: 'Formularz sprawozdania z działalności fundacji (Ministerstwo Sprawiedliwości)', href: 'https://www.gov.pl/web/sprawiedliwosc/formularz-sprawozdania-z-dzialalnosci-fundacji', external: true },
      { label: 'Fundacje — nadzór (Ministerstwo Sprawiedliwości)', href: 'https://www.gov.pl/web/sprawiedliwosc/fundacje-nadzor', external: true },
      { label: 'Rozporządzenie MS z 20.12.2022 (Dz.U. 2022 poz. 2791)', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20220002791', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Działalność w NGO — statutowa, odpłatna, gospodarcza', href: '/poradnik/dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza' },
      { label: 'Obowiązki sprawozdawcze stowarzyszenia', href: '/poradnik/obowiazki-sprawozdawcze-stowarzyszenia' },
    ],
    faq: [
      {
        question: 'Do kiedy fundacja składa sprawozdanie z działalności?',
        answer: 'Za rok poprzedni najpóźniej do końca roku następnego (np. za 2025 r. do 31 grudnia 2026 r.). Niektórzy ministrowie wskazują wcześniejsze terminy porządkowe.',
      },
      {
        question: 'Czy stowarzyszenie też składa sprawozdanie do ministra?',
        answer: 'Nie. To obowiązek wyłącznie fundacji, wynikający z ustawy o fundacjach. Stowarzyszenie podlega nadzorowi starosty.',
      },
      {
        question: 'W jakiej formie składa się sprawozdanie?',
        answer: 'W postaci elektronicznej, na jednolitym urzędowym formularzu z rozporządzenia MS z 20 grudnia 2022 r., podpisane podpisem kwalifikowanym, zaufanym albo osobistym, i przesłane ministrowi przez e-Doręczenia lub e-mail.',
      },
    ],
    article_type: 'guide',
    sort_order: 10,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_NGO_SPRAWOZDAWCZOSC,
  },

  {
    id: 'fallback-ngo-sprawozdawczosc-stowarzyszenia',
    slug: 'obowiazki-sprawozdawcze-stowarzyszenia',
    entityTypes: ['stowarzyszenie'],
    title: 'Obowiązki sprawozdawcze stowarzyszenia — nadzór starosty, sprawozdanie finansowe',
    excerpt: 'Stowarzyszenie rejestrowe nie składa sprawozdania z działalności do ministra. Podlega nadzorowi starosty i składa sprawozdanie finansowe — do Szefa KAS albo do KRS, zależnie od tego, czy prowadzi działalność gospodarczą.',
    summary: 'Co i komu raportuje stowarzyszenie rejestrowe: nadzór starosty (odpisy uchwał walnego zebrania, wyjaśnienia), sprawozdanie finansowe (termin, forma elektroniczna, KAS vs KRS), dodatkowe obowiązki stowarzyszenia OPP oraz czym to się różni od obowiązków fundacji.',
    purpose: 'Zarządy stowarzyszeń często przenoszą na siebie „obowiązki fundacji", których nie mają, albo pomijają sprawozdanie finansowe. Ten artykuł rozdziela jedno od drugiego.',
    body_markdown: `## Czego stowarzyszenie NIE musi robić

Stowarzyszenie rejestrowe **nie składa** corocznego sprawozdania z działalności do ministra — to obowiązek wyłącznie fundacji (ustawa o fundacjach). Nie ma też ministra jako organu nadzoru.

## Nadzór starosty

Organem nadzoru nad stowarzyszeniem jest **starosta** (lub prezydent miasta na prawach powiatu) właściwy ze względu na siedzibę. Starosta może:

- żądać **odpisów uchwał walnego zebrania członków**,
- żądać **wyjaśnień** od zarządu,
- w razie nieprawidłowości — wystąpić o ich usunięcie, a w skrajnych przypadkach wnioskować do sądu o środki nadzorcze.

W praktyce: prowadź porządną dokumentację uchwał i protokołów walnego zebrania oraz posiedzeń zarządu — to pierwsze, o co poprosi starosta.

## Sprawozdanie finansowe

Stowarzyszenie rejestrowe jest osobą prawną i **prowadzi pełne księgi rachunkowe** (ustawa o rachunkowości). Organizacje **nieprowadzące działalności gospodarczej** mogą stosować uproszczony **załącznik nr 6** do ustawy o rachunkowości.

- **Sporządzenie SF** — w ciągu 3 miesięcy od dnia bilansowego (zwykle do 31 marca), w **postaci elektronicznej** (ustrukturyzowany plik), podpisane przez **cały zarząd** oraz osobę prowadzącą księgi.
- **Zatwierdzenie** — przez organ zatwierdzający (walne zebranie) w ciągu 6 miesięcy od dnia bilansowego.
- **Złożenie** — jeśli stowarzyszenie **nie prowadzi działalności gospodarczej**: do **Szefa KAS** w terminie 10 dni od zatwierdzenia. Jeśli **prowadzi działalność gospodarczą** i jest w rejestrze przedsiębiorców: do **KRS** w terminie 15 dni od zatwierdzenia.

## Stowarzyszenie ze statusem OPP

Dodatkowo zamieszcza **sprawozdanie merytoryczne i finansowe** w **bazie sprawozdań organizacji pożytku publicznego** (Narodowy Instytut Wolności), w terminie do 15 lipca (albo 30 listopada, zależnie od roku obrotowego).

## Podatki

Stowarzyszenie składa też **CIT-8** z załącznikiem CIT-8/O (dochody na cele statutowe zwykle korzystają ze zwolnienia, ale zeznanie i tak trzeba złożyć). Jeśli jest podatnikiem VAT — JPK_V7.

## Zastrzeżenie

Stan na 7 września 2026 r. Terminy sprawozdawcze zależą od roku obrotowego i statusu organizacji — potwierdź z księgową. KsięgaI to oprogramowanie, a nie doradztwo podatkowe.`,
    checklist: [
      'Ustal właściwego starostę (organ nadzoru) ze względu na siedzibę stowarzyszenia.',
      'Prowadź uporządkowaną dokumentację uchwał i protokołów walnego zebrania oraz zarządu.',
      'Ustal, czy stowarzyszenie prowadzi działalność gospodarczą — od tego zależy miejsce złożenia sprawozdania finansowego.',
      'Sporządź sprawozdanie finansowe w postaci elektronicznej do 31 marca; podpisuje cały zarząd i osoba prowadząca księgi.',
      'Zwołaj walne zebranie i zatwierdź sprawozdanie w ciągu 6 miesięcy od dnia bilansowego.',
      'Złóż sprawozdanie finansowe: do Szefa KAS (10 dni od zatwierdzenia) lub do KRS (15 dni), zależnie od działalności gospodarczej.',
      'Złóż CIT-8 z załącznikiem CIT-8/O za rok podatkowy.',
      'Stowarzyszenie OPP: zamieść sprawozdania w bazie sprawozdań OPP w wymaganym terminie.',
    ],
    official_links: [
      { label: 'e-Sprawozdania finansowe (podatki.gov.pl)', href: 'https://www.podatki.gov.pl/e-sprawozdania-finansowe/', external: true },
      { label: 'Sprawozdania finansowe do Szefa KAS', href: 'https://www.podatki.gov.pl/e-sprawozdania-finansowe/przekazywanie-sprawozdania-do-szefa-kas/', external: true },
      { label: 'Baza sprawozdań OPP (Narodowy Instytut Wolności)', href: 'https://sprawozdaniaopp.niw.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'Sprawozdanie z działalności fundacji (dla porównania)', href: '/poradnik/sprawozdanie-z-dzialalnosci-fundacji' },
      { label: 'Działalność w NGO — statutowa, odpłatna, gospodarcza', href: '/poradnik/dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza' },
    ],
    faq: [
      {
        question: 'Czy stowarzyszenie składa sprawozdanie z działalności do ministra?',
        answer: 'Nie. Ten obowiązek dotyczy tylko fundacji. Stowarzyszenie podlega nadzorowi starosty, który może żądać odpisów uchwał walnego zebrania i wyjaśnień.',
      },
      {
        question: 'Gdzie stowarzyszenie składa sprawozdanie finansowe?',
        answer: 'Do Szefa KAS (jeśli nie prowadzi działalności gospodarczej) w 10 dni od zatwierdzenia, albo do KRS (jeśli jest w rejestrze przedsiębiorców) w 15 dni od zatwierdzenia. Sprawozdanie jest elektroniczne i podpisuje je cały zarząd.',
      },
      {
        question: 'Czy stowarzyszenie bez przychodów składa CIT-8?',
        answer: 'Tak. Zeznanie CIT-8 (z załącznikiem CIT-8/O) składa się nawet gdy dochód jest w całości zwolniony jako przeznaczony na cele statutowe.',
      },
    ],
    article_type: 'guide',
    sort_order: 12,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_NGO_SPRAWOZDAWCZOSC,
  },

  {
    id: 'fallback-ngo-dzialalnosc',
    slug: 'dzialalnosc-w-ngo-statutowa-odplatna-gospodarcza',
    entityTypes: ['fundacja', 'stowarzyszenie'],
    title: 'Działalność w NGO — statutowa, odpłatna pożytku publicznego i gospodarcza',
    excerpt: 'Zanim fundacja lub stowarzyszenie zacznie pobierać opłaty albo sprzedawać, musi rozstrzygnąć, czy to działalność statutowa nieodpłatna, odpłatna pożytku publicznego, czy gospodarcza. Od tego zależą księgi, VAT, KSeF i wpis do rejestru przedsiębiorców.',
    summary: 'Trzy tryby aktywności w NGO: statutowa nieodpłatna, odpłatna działalność pożytku publicznego (bez wpisu do rejestru przedsiębiorców, z wyodrębnieniem księgowym, limit wynagrodzeń, przychód nie wyższy niż koszty) i działalność gospodarcza (wpis do rejestru przedsiębiorców KRS). Jak je rozdzielić w księgach i co z tego wynika dla VAT i KSeF.',
    purpose: 'Zarządy NGO mieszają te pojęcia i albo niepotrzebnie rejestrują działalność gospodarczą, albo prowadzą ją bez wpisu. Ten artykuł porządkuje różnice i skutki.',
    body_markdown: `## Trzy tryby aktywności

### 1. Działalność statutowa nieodpłatna

Realizacja celów statutowych bez pobierania opłat od odbiorców — finansowana z darowizn, składek, dotacji, zbiórek. To podstawowy tryb każdej fundacji i stowarzyszenia.

### 2. Odpłatna działalność pożytku publicznego

Działania **w zakresie celów statutowych**, za które organizacja pobiera opłatę od odbiorców, przy czym:

- **przychód nie może być wyższy niż koszty** tej działalności (bez zysku),
- **wynagrodzenia osób** przy tej działalności są ustawowo limitowane,
- **nie wymaga wpisu do rejestru przedsiębiorców**,
- **wymaga rachunkowego wyodrębnienia** (osobne konta, przypisanie kosztów i przychodów).

To nie jest działalność gospodarcza — ale przekroczenie warunków (zysk, zbyt wysokie wynagrodzenia) zamienia ją w działalność gospodarczą z mocy prawa.

### 3. Działalność gospodarcza

Zarobkowa, zorganizowana i ciągła sprzedaż towarów lub usług. Dla NGO:

- **wymaga wpisu do rejestru przedsiębiorców KRS** (obok wpisu w rejestrze stowarzyszeń/fundacji),
- **cały dochód** musi być przeznaczony na cele statutowe,
- **musi być wyodrębniona księgowo** od działalności statutowej,
- **nie może pokrywać się przedmiotowo** (ten sam kod PKD) z działalnością odpłatną pożytku publicznego.

## Skutki dla księgowości

Niezależnie od trybu, fundacja i stowarzyszenie prowadzą **pełne księgi rachunkowe**. Jeśli występuje działalność odpłatna lub gospodarcza — **plan kont musi rozdzielać** przychody i koszty statutowe, odpłatne i gospodarcze. Bez tego nie udowodnisz przy kontroli, że warunki działalności odpłatnej są zachowane, ani nie rozliczysz poprawnie CIT.

## Skutki dla VAT i KSeF

- Odpłatna działalność pożytku publicznego i działalność gospodarcza to zwykle **czynności opodatkowane VAT** (albo zwolnione przedmiotowo) — organizacja może stać się **podatnikiem VAT** i mieć obowiązek **JPK_V7**.
- Jeśli organizacja **wystawia faktury** jako podatnik VAT — dotyczy jej **KSeF**. Zobacz: [KSeF dla fundacji i stowarzyszenia](/poradnik/ksef-dla-fundacji-i-stowarzyszenia).
- Sama działalność statutowa nieodpłatna (darowizny, składki, dotacje) nie jest sprzedażą i nie rodzi obowiązku fakturowania.

## Zastrzeżenie

Stan na 7 września 2026 r. Kwalifikacja działalności ma poważne skutki podatkowe — potwierdź ją z księgową lub doradcą podatkowym przed rozpoczęciem odpłatnych działań. KsięgaI to oprogramowanie, a nie doradztwo podatkowe.`,
    checklist: [
      'Wypisz wszystkie działania organizacji, za które pobierasz lub planujesz pobierać opłaty.',
      'Dla każdego rozstrzygnij: statutowa nieodpłatna, odpłatna pożytku publicznego czy gospodarcza.',
      'Sprawdź, czy odpłatna działalność mieści się w celach statutowych i czy przychód nie przekracza kosztów.',
      'Jeśli planujesz działalność gospodarczą — przygotuj wniosek o wpis do rejestru przedsiębiorców KRS.',
      'Upewnij się, że działalność gospodarcza i odpłatna nie pokrywają się tym samym kodem PKD.',
      'Ustaw plan kont, który rozdziela przychody i koszty statutowe, odpłatne i gospodarcze.',
      'Z księgową ustal status VAT i obowiązek JPK_V7.',
      'Jeśli organizacja wystawia faktury jako podatnik VAT — zaplanuj ścieżkę do KSeF.',
    ],
    official_links: [
      { label: 'Działalność odpłatna i nieodpłatna pożytku publicznego (Narodowy Instytut Wolności)', href: 'https://niw.gov.pl/', external: true },
      { label: 'Ustawa o działalności pożytku publicznego i o wolontariacie', href: 'https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20030960873', external: true },
      { label: 'Rejestr przedsiębiorców KRS', href: 'https://ekrs.ms.gov.pl/', external: true },
    ],
    related_actions: [
      { label: 'Pierwsze obowiązki fundacji po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-fundacji' },
      { label: 'Pierwsze obowiązki stowarzyszenia po rejestracji', href: '/poradnik/pierwsze-obowiazki-po-rejestracji-stowarzyszenia' },
      { label: 'KSeF dla fundacji i stowarzyszenia', href: '/poradnik/ksef-dla-fundacji-i-stowarzyszenia' },
    ],
    faq: [
      {
        question: 'Czy odpłatna działalność pożytku publicznego to działalność gospodarcza?',
        answer: 'Nie, o ile przychód nie przekracza kosztów tej działalności, a wynagrodzenia mieszczą się w ustawowym limicie. Nie wymaga wpisu do rejestru przedsiębiorców, ale wymaga wyodrębnienia księgowego. Przekroczenie warunków zamienia ją w działalność gospodarczą.',
      },
      {
        question: 'Czy fundacja może prowadzić działalność gospodarczą?',
        answer: 'Tak, jeśli statut to przewiduje. Wymaga wpisu do rejestru przedsiębiorców KRS, przeznaczenia całego dochodu na cele statutowe i wyodrębnienia księgowego. Nie może pokrywać się przedmiotowo z działalnością odpłatną pożytku publicznego.',
      },
      {
        question: 'Czy przyjmowanie darowizn i składek to sprzedaż objęta KSeF?',
        answer: 'Nie. Darowizny, składki członkowskie i dotacje nie są czynnościami fakturowanymi. KSeF dotyczy organizacji dopiero gdy jest podatnikiem VAT i wystawia faktury.',
      },
    ],
    article_type: 'guide',
    sort_order: 20,
    published_at: '2026-09-07T00:00:00.000Z',
    updated_at: '2026-09-07T00:00:00.000Z',
    category: CAT_NGO_SPRAWOZDAWCZOSC,
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
