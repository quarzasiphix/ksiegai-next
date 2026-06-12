import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, FileText, Minus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deklaracje podatkowe — JDG i spółka z o.o. | Poradnik KsięgaI',
  description:
    'Praktyczny przewodnik po deklaracjach i formularzach podatkowych dla JDG i spółki z o.o. JPK_V7, VAT-R, VAT-UE, ZUS DRA, CIT-8, PIT-36, PIT-28, PIT-11 i inne — kogo dotyczy, kiedy złożyć, najczęstsze błędy.',
  keywords:
    'deklaracje podatkowe, JDG deklaracje, spółka z o.o. deklaracje, JPK, VAT-9M, NIP-8, CIT-8, PIT-11, ZUS DRA, VAT-R, PIT-36, PIT-28, deklaracje podatkowe Polska',
  alternates: { canonical: 'https://www.ksiegai.pl/poradnik/deklaracje/' },
  openGraph: {
    title: 'Deklaracje — JDG i spółka z o.o. | Poradnik KsięgaI',
    description:
      'Praktyczny przewodnik po deklaracjach podatkowych dla polskich przedsiębiorców. Dowiedz się kto i kiedy składa JPK, VAT, CIT, PIT i ZUS.',
    url: 'https://www.ksiegai.pl/poradnik/deklaracje',
    type: 'website',
    locale: 'pl_PL',
  },
};

type DeclarationCard = {
  name: string;
  slug: string;
  appliesTo: 'JDG' | 'Spółka' | 'Obie';
  frequency: string;
  shortDescription: string;
};

const JDG_DECLARATIONS: DeclarationCard[] = [
  {
    name: 'CEIDG-1',
    slug: 'ceidg-1-jdg',
    appliesTo: 'JDG',
    frequency: 'Przy rejestracji i zmianach',
    shortDescription:
      'Formularz rejestracji JDG w CEIDG. Służy też do aktualizacji danych, zawieszenia, wznowienia i zamknięcia działalności.',
  },
  {
    name: 'JPK_V7',
    slug: 'jpk-v7-deklaracja-vat',
    appliesTo: 'Obie',
    frequency: 'Co miesiąc (do 25. dnia)',
    shortDescription:
      'Połączona deklaracja VAT i rejestr faktur w jednym pliku XML. Obowiązkowy dla każdego czynnego vatowca — zastąpił stary VAT-7 i JPK_VAT.',
  },
  {
    name: 'VAT-R',
    slug: 'vat-r-rejestracja-vatowca',
    appliesTo: 'Obie',
    frequency: 'Jednorazowo (rejestracja)',
    shortDescription:
      'Formularz rejestracji jako czynny podatnik VAT. Składasz go przed pierwszą transakcją VAT lub gdy przekroczysz próg 200 000 zł obrotu rocznie.',
  },
  {
    name: 'VAT-UE',
    slug: 'vat-ue-transakcje-unijne',
    appliesTo: 'Obie',
    frequency: 'Jednorazowo (rejestracja)',
    shortDescription:
      'Rejestracja do transakcji wewnątrzwspólnotowych z UE. Potrzebna, gdy kupujesz usługi lub towary od firm z UE lub sprzedajesz do UE.',
  },
  {
    name: 'VAT-9M',
    slug: 'vat-9m-import-uslug',
    appliesTo: 'Obie',
    frequency: 'Miesięcznie (gdy są transakcje)',
    shortDescription:
      'Deklaracja VAT dla firm niezarejestrowanych jako vatowcy, które kupują usługi od zagranicznych dostawców (np. subskrypcje SaaS z UE).',
  },
  {
    name: 'ZUS DRA',
    slug: 'zus-dra-deklaracja-zus',
    appliesTo: 'Obie',
    frequency: 'Co miesiąc (do 10. dnia)',
    shortDescription:
      'Miesięczna deklaracja rozliczeniowa do ZUS. JDG deklaruje własne składki; pracodawca — składki za pracowników i zleceniobiorców.',
  },
  {
    name: 'PIT-36',
    slug: 'pit-36-jdg-zasady-ogolne',
    appliesTo: 'JDG',
    frequency: 'Raz w roku (do 30 kwietnia)',
    shortDescription:
      'Roczne zeznanie podatkowe dla JDG na zasadach ogólnych (skala 12%/32%). Łączy przychody z działalności z innymi dochodami i uwzględnia ulgi.',
  },
  {
    name: 'PIT-36L',
    slug: 'pit-36l-podatek-liniowy-jdg',
    appliesTo: 'JDG',
    frequency: 'Raz w roku (do 30 kwietnia)',
    shortDescription:
      'Roczne zeznanie podatkowe dla JDG na podatku liniowym (19% flat). Stała stawka bez progresji — ale bez większości ulg podatkowych.',
  },
  {
    name: 'PIT-28',
    slug: 'pit-28-ryczalt-od-przychodow',
    appliesTo: 'JDG',
    frequency: 'Raz w roku (do 15 lutego)',
    shortDescription:
      'Roczna deklaracja dla JDG na ryczałcie ewidencjonowanym. Podatek od przychodu (nie dochodu) — stawki od 2% do 17% zależnie od rodzaju działalności.',
  },
  {
    name: 'PIT-11',
    slug: 'pit-11-informacja-o-dochodach',
    appliesTo: 'Obie',
    frequency: 'Raz w roku (koniec lutego)',
    shortDescription:
      'Roczna informacja o dochodach i zaliczkach wystawiana pracownikom i zleceniobiorcom. Obowiązek pracodawcy — wysyłana też do Urzędu Skarbowego.',
  },
  {
    name: 'PIT-4R / PIT-8AR',
    slug: 'pit-4r-pit-8ar-zaliczki-podatku',
    appliesTo: 'Obie',
    frequency: 'Raz w roku (do 31 stycznia)',
    shortDescription:
      'Roczne podsumowanie zaliczek na podatek pobranych od pracowników (PIT-4R) i zryczałtowanego podatku (PIT-8AR, np. od dywidend).',
  },
];

const SPOLKA_DECLARATIONS: DeclarationCard[] = [
  {
    name: 'NIP-8',
    slug: 'nip-8-spolka-zoo',
    appliesTo: 'Spółka',
    frequency: 'Jednorazowo po rejestracji',
    shortDescription:
      'Zgłoszenie uzupełniające po wpisie do KRS. Przekazuje dane, których KRS nie zbiera: numery bankowe, adresy operacyjne, dane biura rachunkowego.',
  },
  {
    name: 'JPK_V7',
    slug: 'jpk-v7-deklaracja-vat',
    appliesTo: 'Obie',
    frequency: 'Co miesiąc (do 25. dnia)',
    shortDescription:
      'Połączona deklaracja VAT i rejestr faktur w jednym pliku XML. Obowiązkowy dla każdego czynnego vatowca — zastąpił stary VAT-7 i JPK_VAT.',
  },
  {
    name: 'VAT-R',
    slug: 'vat-r-rejestracja-vatowca',
    appliesTo: 'Obie',
    frequency: 'Jednorazowo (rejestracja)',
    shortDescription:
      'Formularz rejestracji jako czynny podatnik VAT. Składasz go przed pierwszą transakcją VAT lub gdy przekroczysz próg 200 000 zł obrotu rocznie.',
  },
  {
    name: 'VAT-UE',
    slug: 'vat-ue-transakcje-unijne',
    appliesTo: 'Obie',
    frequency: 'Jednorazowo (rejestracja)',
    shortDescription:
      'Rejestracja do transakcji wewnątrzwspólnotowych z UE. Potrzebna, gdy kupujesz usługi lub towary od firm z UE lub sprzedajesz do UE.',
  },
  {
    name: 'VAT-9M',
    slug: 'vat-9m-import-uslug',
    appliesTo: 'Obie',
    frequency: 'Miesięcznie (gdy są transakcje)',
    shortDescription:
      'Deklaracja VAT dla firm niezarejestrowanych jako vatowcy, które kupują usługi od zagranicznych dostawców (np. subskrypcje SaaS z UE).',
  },
  {
    name: 'ZUS DRA',
    slug: 'zus-dra-deklaracja-zus',
    appliesTo: 'Obie',
    frequency: 'Co miesiąc (do 5. dnia)',
    shortDescription:
      'Miesięczna deklaracja rozliczeniowa do ZUS — dla spółek z o.o. zatrudniających pracowników. Jednoosobowy wspólnik sp. z o.o. może też mieć własne składki ZUS.',
  },
  {
    name: 'CIT-8',
    slug: 'cit-8-podatek-dochodowy-spolka-zoo',
    appliesTo: 'Spółka',
    frequency: 'Raz w roku (do 31 marca)',
    shortDescription:
      'Roczne zeznanie podatku dochodowego od osób prawnych. Spółka płaci 9% (mały podatnik) lub 19% CIT od dochodu. Zaliczki co miesiąc.',
  },
  {
    name: 'PIT-11',
    slug: 'pit-11-informacja-o-dochodach',
    appliesTo: 'Obie',
    frequency: 'Raz w roku (koniec lutego)',
    shortDescription:
      'Roczna informacja o dochodach i zaliczkach — wystawiana pracownikom, zleceniobiorcom i członkom zarządu. Obowiązek spółki jako pracodawcy.',
  },
  {
    name: 'PIT-4R / PIT-8AR',
    slug: 'pit-4r-pit-8ar-zaliczki-podatku',
    appliesTo: 'Obie',
    frequency: 'Raz w roku (do 31 stycznia)',
    shortDescription:
      'Roczne podsumowanie zaliczek na podatek pobranych od pracowników (PIT-4R) i zryczałtowanego podatku (PIT-8AR) — np. od dywidend wypłacanych wspólnikom.',
  },
  {
    name: 'e-Sprawozdanie finansowe',
    slug: 'e-sprawozdanie-finansowe-spolka-zoo',
    appliesTo: 'Spółka',
    frequency: 'Raz w roku (do 30 czerwca)',
    shortDescription:
      'Roczne sprawozdanie finansowe (bilans, rachunek zysków i strat) w formacie XML składane do KRS. Wymagane od każdej spółki z o.o. — niezależnie od wielkości.',
  },
  {
    name: 'CRBR',
    slug: 'crbr-spolka-zoo-co-zglosic',
    appliesTo: 'Spółka',
    frequency: 'Po rejestracji i przy zmianach',
    shortDescription:
      'Zgłoszenie beneficjentów rzeczywistych do Centralnego Rejestru Beneficjentów Rzeczywistych. Obowiązkowe po wpisie do KRS i po każdej zmianie struktury właścicielskiej.',
  },
];

type ComparisonRow = {
  name: string;
  slug: string;
  jdg: string | false;
  spolka: string | false;
  when: string;
};

const COMPARISON_TABLE: ComparisonRow[] = [
  { name: 'CEIDG-1', slug: 'ceidg-1-jdg', jdg: 'Tak', spolka: false, when: 'Rejestracja, aktualizacja, zamknięcie' },
  { name: 'NIP-8', slug: 'nip-8-spolka-zoo', jdg: false, spolka: 'Tak', when: 'Po rejestracji w KRS' },
  { name: 'JPK_V7', slug: 'jpk-v7-deklaracja-vat', jdg: 'Czynny vatowiec', spolka: 'Czynny vatowiec', when: 'Co miesiąc (do 25.)' },
  { name: 'VAT-R', slug: 'vat-r-rejestracja-vatowca', jdg: 'Przy rejestracji VAT', spolka: 'Przy rejestracji VAT', when: 'Przed pierwszą transakcją VAT' },
  { name: 'VAT-UE', slug: 'vat-ue-transakcje-unijne', jdg: 'Przy transakcjach z UE', spolka: 'Przy transakcjach z UE', when: 'Przed pierwszą transakcją z UE' },
  { name: 'VAT-9M', slug: 'vat-9m-import-uslug', jdg: 'Przy imporcie usług (bez VAT)', spolka: 'Przy imporcie usług (bez VAT)', when: 'Co miesiąc gdy są transakcje' },
  { name: 'ZUS DRA', slug: 'zus-dra-deklaracja-zus', jdg: 'Tak (własne składki)', spolka: 'Tak (przy zatrudnieniu)', when: 'Co miesiąc (do 5. lub 10.)' },
  { name: 'PIT-36', slug: 'pit-36-jdg-zasady-ogolne', jdg: 'Zasady ogólne', spolka: false, when: 'Raz w roku, do 30 kwietnia' },
  { name: 'PIT-36L', slug: 'pit-36l-podatek-liniowy-jdg', jdg: 'Podatek liniowy', spolka: false, when: 'Raz w roku, do 30 kwietnia' },
  { name: 'PIT-28', slug: 'pit-28-ryczalt-od-przychodow', jdg: 'Ryczałt', spolka: false, when: 'Raz w roku, do 15 lutego' },
  { name: 'CIT-8', slug: 'cit-8-podatek-dochodowy-spolka-zoo', jdg: false, spolka: 'Tak', when: 'Raz w roku, do 31 marca' },
  { name: 'PIT-11', slug: 'pit-11-informacja-o-dochodach', jdg: 'Przy zatrudnieniu', spolka: 'Tak (pracownicy, zarząd)', when: 'Raz w roku, do końca lutego' },
  { name: 'PIT-4R / PIT-8AR', slug: 'pit-4r-pit-8ar-zaliczki-podatku', jdg: 'Przy zatrudnieniu', spolka: 'Tak (+ dywidendy)', when: 'Raz w roku, do 31 stycznia' },
  { name: 'e-Sprawozdanie fin.', slug: 'e-sprawozdanie-finansowe-spolka-zoo', jdg: false, spolka: 'Tak', when: 'Raz w roku, do 30 czerwca' },
  { name: 'CRBR', slug: 'crbr-spolka-zoo-co-zglosic', jdg: false, spolka: 'Tak', when: 'Po rejestracji i przy zmianach' },
];

function AppliesBadge({ value }: { value: string | false }) {
  if (!value) {
    return (
      <span className="inline-flex items-center justify-center text-slate-300 dark:text-slate-600">
        <Minus className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
      {value}
    </span>
  );
}

function DeclarationCard({ card }: { card: DeclarationCard }) {
  const appliesToColor =
    card.appliesTo === 'JDG'
      ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300'
      : card.appliesTo === 'Spółka'
      ? 'bg-violet-500/10 text-violet-700 dark:text-violet-300'
      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';

  return (
    <div className="flex flex-col rounded-[24px] border border-black/10 bg-white/85 p-5 shadow-[0_16px_60px_-40px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.06]">
            <FileText className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </div>
          <h3 className="text-base font-semibold text-slate-950 dark:text-white">{card.name}</h3>
        </div>
        <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${appliesToColor}`}>
          {card.appliesTo === 'Obie' ? 'JDG & Spółka' : card.appliesTo}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.shortDescription}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
          {card.frequency}
        </span>
        <Link
          href={`/poradnik/${card.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 transition hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
        >
          Czytaj więcej
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function DeklaracjePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Deklaracje podatkowe — JDG i spółka z o.o.',
    description:
      'Praktyczny przewodnik po deklaracjach i formularzach podatkowych dla polskich przedsiębiorców.',
    url: 'https://www.ksiegai.pl/poradnik/deklaracje',
    publisher: {
      '@type': 'Organization',
      name: 'Tovernet Sp. z o.o.',
      url: 'https://www.ksiegai.pl',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Poradnik', item: 'https://www.ksiegai.pl/poradnik' },
      { '@type': 'ListItem', position: 2, name: 'Deklaracje', item: 'https://www.ksiegai.pl/poradnik/deklaracje' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        {/* ── Hero ── */}
        <section className="border-b border-black/5 px-4 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
            >
              <Link href="/poradnik" className="transition-colors hover:text-foreground">
                Poradnik
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Deklaracje</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,380px)] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                  <BookOpen className="h-4 w-4 text-rose-500 dark:text-rose-400" />
                  <span>Deklaracje podatkowe</span>
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                  Deklaracje dla JDG i spółki&nbsp;z&nbsp;o.o.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Słyszysz: JPK, VAT-9M, NIP-8, CIT-8, PIT-11, ZUS&nbsp;DRA — ale nie zawsze wiadomo co to jest,
                  kogo dotyczy i kiedy trzeba złożyć. Ten przewodnik rozkłada najważniejsze deklaracje na czynniki
                  pierwsze — osobno dla JDG i dla spółki z o.o.
                </p>
                <p className="mt-3 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/[0.06] dark:text-amber-300">
                  Artykuły mają charakter edukacyjny. Twoje konkretne obowiązki zależą od formy opodatkowania,
                  rejestracji VAT, zatrudnienia i konfiguracji biura rachunkowego — zawsze warto potwierdzić szczegóły
                  z doradcą.
                </p>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.05]">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Co znajdziesz w tej sekcji
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    'CEIDG-1 — rejestracja i zmiany JDG',
                    'JPK_V7 — obowiązkowy plik VAT',
                    'VAT-R, VAT-UE, VAT-9M',
                    'ZUS DRA — składki miesięcznie',
                    'PIT-36, PIT-36L, PIT-28 — roczne PIT JDG',
                    'CIT-8 — roczny podatek spółki',
                    'PIT-11, PIT-4R, PIT-8AR — przy zatrudnieniu',
                    'e-Sprawozdanie finansowe i CRBR',
                  ].map((topic) => (
                    <div
                      key={topic}
                      className="rounded-2xl border border-black/5 bg-black/[0.02] px-3 py-2.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── JDG Section ── */}
        <section className="px-4 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/[0.06] dark:text-sky-300">
                JDG
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                Deklaracje dla JDG
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Jednoosobowa działalność gospodarcza rozlicza się uproszczej niż spółka — ale i tak ma swój zestaw
                obowiązkowych formularzy. Niektóre dotyczą każdego JDG-owca, inne tylko przy VAT lub zatrudnieniu.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {JDG_DECLARATIONS.map((card) => (
                <DeclarationCard key={card.slug} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Spółka Section ── */}
        <section className="bg-slate-50/60 px-4 py-14 dark:bg-white/[0.015]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/[0.06] dark:text-violet-300">
                Spółka z o.o.
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                Deklaracje dla spółki z o.o.
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Spółka z o.o. to osobny podmiot podatkowy — płaci własny CIT, musi złożyć roczne sprawozdanie
                finansowe do KRS i obsługuje dodatkowe obowiązki przy zatrudnieniu i wypłatach dla wspólników.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {SPOLKA_DECLARATIONS.map((card) => (
                <DeclarationCard key={card.slug + '-spolka'} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section className="px-4 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Tabela porównawcza deklaracji
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Szybki przegląd — kto i kiedy składa każdą deklarację. Kliknij nazwę formularza, żeby przejść do
                szczegółowego poradnika.
              </p>
            </div>

            <div className="overflow-x-auto rounded-[24px] border border-black/10 bg-white/85 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10">
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                      Deklaracja
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-sky-700 dark:text-sky-300">JDG</th>
                    <th className="px-5 py-4 text-left font-semibold text-violet-700 dark:text-violet-300">
                      Spółka z o.o.
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-slate-700 dark:text-slate-200">
                      Kiedy potrzebna
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                  {COMPARISON_TABLE.map((row) => (
                    <tr key={row.name} className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                      <td className="px-5 py-3.5">
                        <Link
                          href={`/poradnik/${row.slug}`}
                          className="font-semibold text-slate-900 underline-offset-2 transition hover:text-sky-700 hover:underline dark:text-white dark:hover:text-sky-300"
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <AppliesBadge value={row.jdg} />
                      </td>
                      <td className="px-5 py-3.5">
                        <AppliesBadge value={row.spolka} />
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-black/5 bg-black/[0.02] px-4 py-14 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-black/10 bg-white/85 p-8 text-center shadow-[0_28px_90px_-56px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
              Masz dokumenty? KsięgaI upilnuje resztę.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Faktury, dokumenty kosztowe, płatności bankowe i KSeF — wszystko w jednym miejscu. Biuro rachunkowe
              zawsze ma kompletny materiał, a Ty wiesz co się dzieje w firmie.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="https://app.ksiegai.pl/rejestracja"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                Zacznij za darmo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/poradnik"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
              >
                Wróć do poradnika
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
