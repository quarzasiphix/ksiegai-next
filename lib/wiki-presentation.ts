import type { WikiArticle, WikiArticleListItem, WikiCategory } from '@/lib/wiki';

export type WikiPresentationCategory = {
  badge: string;
  shortLabel: string;
  accentClassName: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
  roadmapTitle: string;
  roadmapTopics: string[];
};

const DEFAULT_PRESENTATION: WikiPresentationCategory = {
  badge: 'Poradnik KsięgaI',
  shortLabel: 'Przewodnik',
  accentClassName:
    'from-sky-500/20 via-cyan-500/10 to-transparent dark:from-sky-400/20 dark:via-cyan-400/10 dark:to-transparent',
  ctaTitle: 'Uporządkuj ten proces w KsięgaI',
  ctaDescription:
    'Połącz dokumenty, checklisty i kolejne kroki w jednym miejscu, żeby księgowa i zarząd widzieli ten sam stan sprawy.',
  ctaLabel: 'Załóż konto w KsięgaI',
  ctaHref: '/rejestracja',
  roadmapTitle: 'Kolejne tematy w tej sekcji',
  roadmapTopics: [
    'Jak ułożyć dokumenty i odpowiedzialności po starcie firmy',
    'Jak przygotować checklistę obowiązków dla księgowej i zarządu',
    'Jak połączyć formalności urzędowe z codzienną pracą w aplikacji',
  ],
};

const CATEGORY_PRESENTATION: Record<string, WikiPresentationCategory> = {
  ksef: {
    badge: 'KSeF',
    shortLabel: 'KSeF',
    accentClassName:
      'from-sky-500/25 via-blue-500/15 to-transparent dark:from-sky-400/25 dark:via-blue-400/15 dark:to-transparent',
    ctaTitle: 'Brakuje konfiguracji KSeF',
    ctaDescription:
      'Dostęp nie został nadany, księgowość nie ma uprawnień, faktury nie mają zamkniętego procesu — spółka nie jest gotowa operacyjnie do KSeF.',
    ctaLabel: 'Przejdź do konfiguracji KSeF',
    ctaHref: '/rejestracja',
    roadmapTitle: 'Tematy, które rozwijamy w sekcji KSeF',
    roadmapTopics: [
      'Jak podłączyć firmę do KSeF krok po kroku',
      'KSeF dla spółki z o.o. i KSeF dla JDG',
      'Co zrobić, gdy token KSeF wygasł',
      'Jak wysłać fakturę do KSeF i sprawdzić status',
      'KSeF a faktury z płatnością online',
    ],
  },
  'urzad-skarbowy': {
    badge: 'Urząd Skarbowy',
    shortLabel: 'e-Urząd Skarbowy',
    accentClassName:
      'from-emerald-500/20 via-teal-500/10 to-transparent dark:from-emerald-400/20 dark:via-teal-400/10 dark:to-transparent',
    ctaTitle: 'Przygotuj formalności podatkowe bez chaosu',
    ctaDescription:
      'Zanim wystartujesz z dokumentami i KSeF, uporządkuj dostęp do e-US, role i podstawowe obowiązki firmowe.',
    ctaLabel: 'Zobacz, jak działa KsięgaI',
    ctaHref: '/jak-to-dziala',
    roadmapTitle: 'Najczęstsze formalności w tej sekcji',
    roadmapTopics: [
      'Konto organizacji w e-Urzędzie Skarbowym',
      'ZAW-FA i dostęp do KSeF',
      'Uprawnienia do działania w imieniu spółki',
      'NIP-8 po rejestracji spółki',
    ],
  },
  compliance: {
    badge: 'Compliance po rejestracji',
    shortLabel: 'Compliance',
    accentClassName:
      'from-violet-500/20 via-fuchsia-500/10 to-transparent dark:from-violet-400/20 dark:via-fuchsia-400/10 dark:to-transparent',
    ctaTitle: 'Pilnuj obowiązków po rejestracji w jednym miejscu',
    ctaDescription:
      'CRBR, e-Doręczenia i pierwsze obowiązki spółki łatwo rozchodzą się po mailach. W KsięgaI możesz ułożyć je w jedną checklistę pracy.',
    ctaLabel: 'Zobacz cennik dla spółek',
    ctaHref: '/cennik',
    roadmapTitle: 'Kolejne obowiązki, które warto mieć pod ręką',
    roadmapTopics: [
      'CRBR po rejestracji spółki z o.o.',
      'NIP-8 po wpisie do KRS',
      'e-Doręczenia dla spółki z o.o.',
      'Pierwsze obowiązki spółki po wpisie do KRS',
    ],
  },
  'finanse-spolki': {
    badge: 'Finanse spółki',
    shortLabel: 'Finanse',
    accentClassName:
      'from-green-500/20 via-emerald-500/10 to-transparent dark:from-green-400/20 dark:via-emerald-400/10 dark:to-transparent',
    ctaTitle: 'Miej finanse spółki pod kontrolą w KsięgaI',
    ctaDescription:
      'Pożyczki wspólników, wypłaty zysku, faktury JDG — KsięgaI łączy przepływy pieniędzy z dokumentami tak, żeby było jasne, co skąd pochodzi i ile kosztuje podatkowo.',
    ctaLabel: 'Załóż konto dla spółki',
    ctaHref: '/rejestracja',
    roadmapTitle: 'Tematy finansowe, które rozwijamy',
    roadmapTopics: [
      'Dopłaty do spółki z o.o. — jak to działa i kiedy warto',
      'Ceny transferowe w małej spółce — kiedy musisz dokumentować',
      'Jak rozliczyć zysk między wspólnikami przy różnych udziałach',
      'Samochód w spółce — leasing, najem od wspólnika, zakup',
    ],
  },
  'struktury-spolek-i-podatki': {
    badge: 'Struktury i podatki',
    shortLabel: 'Struktury',
    accentClassName:
      'from-indigo-500/20 via-purple-500/10 to-transparent dark:from-indigo-400/20 dark:via-purple-400/10 dark:to-transparent',
    ctaTitle: 'Zapanuj nad finansami i dokumentami spółki w KsięgaI',
    ctaDescription:
      'Pełna księgowość, uchwały, faktury i KSeF w jednym miejscu — bez chaosu między umowami, wyciągami i rozliczeniami zarządu.',
    ctaLabel: 'Załóż konto dla spółki',
    ctaHref: '/rejestracja',
    roadmapTitle: 'Tematy, które rozwijamy w tej sekcji',
    roadmapTopics: [
      'JDG czy spółka z o.o. — co wybrać i kiedy',
      'Jakie podatki płaci spółka z o.o.',
      'Jak legalnie wypłacać pieniądze ze spółki',
      'Holding i kilka spółek — kiedy to ma sens',
      'Jak przygotować spółkę do pełnej księgowości',
    ],
  },
  deklaracje: {
    badge: 'Deklaracje',
    shortLabel: 'Deklaracje',
    accentClassName:
      'from-rose-500/20 via-pink-500/10 to-transparent dark:from-rose-400/20 dark:via-pink-400/10 dark:to-transparent',
    ctaTitle: 'Pilnuj terminów i dokumentów w KsięgaI',
    ctaDescription:
      'Deklaracje podatkowe i ZUS-owskie zależą od kompletności dokumentów. KsięgaI porządkuje faktury, płatności i dokumenty przez cały rok — biuro rachunkowe ma wszystko na czas.',
    ctaLabel: 'Załóż konto w KsięgaI',
    ctaHref: '/rejestracja',
    roadmapTitle: 'Kolejne deklaracje w tej sekcji',
    roadmapTopics: [
      'CEIDG-1 — rejestracja i aktualizacja danych JDG',
      'JPK_V7 — obowiązkowy plik VAT co miesiąc',
      'CIT-8 — roczny podatek dochodowy spółki',
      'PIT-36, PIT-36L, PIT-28 — roczne rozliczenie JDG',
      'ZUS DRA — miesięczna deklaracja ZUS',
    ],
  },
  'uchwaly-decyzje': {
    badge: 'Uchwały i decyzje',
    shortLabel: 'Uchwały',
    accentClassName:
      'from-amber-500/20 via-orange-500/10 to-transparent dark:from-amber-400/20 dark:via-orange-400/10 dark:to-transparent',
    ctaTitle: 'Trzymaj uchwały i decyzje w porządku w KsięgaI',
    ctaDescription:
      'Moduł uchwał w KsięgaI pozwala rejestrować decyzje zarządu i wspólników, przypisywać im dokumenty i być gotowym na kontrolę w każdej chwili.',
    ctaLabel: 'Załóż konto dla spółki',
    ctaHref: '/rejestracja',
    roadmapTitle: 'Tematy, które rozwijamy w tej sekcji',
    roadmapTopics: [
      'Protokół ze Zgromadzenia Wspólników — co musi zawierać',
      'Pełnomocnik do umów z zarządem — jak powołać zgodnie z KSH art. 210',
      'Uchwała o powołaniu i odwołaniu zarządu spółki z o.o.',
      'Archiwum uchwał spółki — jak długo przechowywać',
    ],
  },
};

export function getWikiPresentationCategory(slug?: string | null): WikiPresentationCategory {
  if (!slug) return DEFAULT_PRESENTATION;
  return CATEGORY_PRESENTATION[slug] ?? DEFAULT_PRESENTATION;
}

export function formatWikiDate(value?: string | null): string {
  if (!value) return 'Aktualizacja w przygotowaniu';
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function getWikiArticleTypeLabel(type?: string | null): string {
  switch (type) {
    case 'checklist':
      return 'Checklist';
    case 'guide':
      return 'Przewodnik';
    default:
      return 'Poradnik';
  }
}

export function getFeaturedArticles(
  groups: Array<{ category: WikiCategory; articles: WikiArticleListItem[] }>
): Array<WikiArticleListItem & { category: WikiCategory }> {
  return groups
    .flatMap((group) => group.articles.slice(0, 2).map((article) => ({ ...article, category: group.category })))
    .sort((left, right) => {
      const leftDate = new Date(left.updated_at || left.published_at || 0).getTime();
      const rightDate = new Date(right.updated_at || right.published_at || 0).getTime();
      return rightDate - leftDate || left.sort_order - right.sort_order;
    })
    .slice(0, 3);
}

export function getQuickTopics(articles: Array<WikiArticleListItem | WikiArticle>): string[] {
  return articles.slice(0, 5).map((article) => article.title);
}
