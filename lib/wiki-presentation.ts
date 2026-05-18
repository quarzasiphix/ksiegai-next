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
    ctaTitle: 'Połącz KSeF w KsięgaI',
    ctaDescription:
      'Token, weryfikacja firmy i dalsza praca z fakturami powinny być spięte w jednym miejscu, bez skakania między notatkami.',
    ctaLabel: 'Załóż konto i podłącz firmę',
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
