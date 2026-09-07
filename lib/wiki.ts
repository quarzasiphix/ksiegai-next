import { supabaseServer } from './supabase-server';
import {
  fallbackWikiArticles,
  fallbackWikiCategories,
  ALL_WIKI_ENTITY_TYPES,
  type FallbackWikiFaqItem,
  type WikiEntityType,
} from './wiki-fallback';

export type { WikiEntityType } from './wiki-fallback';
export { ALL_WIKI_ENTITY_TYPES } from './wiki-fallback';

/** Entity hub landing pages: /poradnik/dla-<slug>/ */
export type WikiEntityHub = {
  entityType: WikiEntityType;
  /** URL segment after /poradnik/dla- */
  slug: string;
  /** Full route path */
  path: string;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  /** Marketing page for this legal form, if any. */
  marketingHref: string | null;
};

export const WIKI_ENTITY_HUBS: WikiEntityHub[] = [
  {
    entityType: 'spolka',
    slug: 'spolek',
    path: '/poradnik/dla-spolek',
    name: 'Poradnik dla spółek z o.o.',
    shortLabel: 'Spółka z o.o.',
    tagline: 'Od wpisu do KRS do pełnej gotowości operacyjnej.',
    description:
      'Obowiązki po rejestracji sp. z o.o.: CRBR, konto organizacji w e-US, NIP-8, e-Doręczenia, ZAW-FA i KSeF, pełna księgowość, uchwały i finanse spółki — krok po kroku.',
    marketingHref: '/spolka-z-oo',
  },
  {
    entityType: 'jdg',
    slug: 'jdg',
    path: '/poradnik/dla-jdg',
    name: 'Poradnik dla JDG',
    shortLabel: 'JDG',
    tagline: 'Jednoosobowa działalność — start i KSeF bez zbędnych kroków.',
    description:
      'Jednoosobowa działalność gospodarcza: pierwsze formalności po wpisie do CEIDG, VAT, ZUS, KSeF przez profil zaufany, faktury i deklaracje.',
    marketingHref: '/jdg',
  },
  {
    entityType: 'stowarzyszenie',
    slug: 'stowarzyszen',
    path: '/poradnik/dla-stowarzyszen',
    name: 'Poradnik dla stowarzyszeń',
    shortLabel: 'Stowarzyszenie',
    tagline: 'Stowarzyszenie rejestrowe w KRS — obowiązki, których nikt nie tłumaczy.',
    description:
      'Stowarzyszenie wpisane do KRS: pierwsze obowiązki po rejestracji, CRBR, NIP-8, konto organizacji w e-US, e-Doręczenia, nadzór starosty, sprawozdawczość, działalność statutowa, odpłatna i gospodarcza, KSeF.',
    marketingHref: null,
  },
  {
    entityType: 'fundacja',
    slug: 'fundacji',
    path: '/poradnik/dla-fundacji',
    name: 'Poradnik dla fundacji',
    shortLabel: 'Fundacja',
    tagline: 'Fundacja w KRS — od rejestracji do sprawozdania dla ministra.',
    description:
      'Fundacja wpisana do KRS: pierwsze obowiązki po rejestracji, CRBR, NIP-8, konto organizacji w e-US, e-Doręczenia, nadzór ministra i starosty, coroczne sprawozdanie z działalności, działalność statutowa, odpłatna i gospodarcza, KSeF.',
    marketingHref: null,
  },
];

export function getWikiEntityHub(entityType: WikiEntityType): WikiEntityHub {
  return WIKI_ENTITY_HUBS.find((hub) => hub.entityType === entityType) ?? WIKI_ENTITY_HUBS[0];
}

export function getWikiEntityHubBySlug(slug: string): WikiEntityHub | null {
  return WIKI_ENTITY_HUBS.find((hub) => hub.slug === slug) ?? null;
}

/** An article/category with no `entityTypes` applies to sp. z o.o. only. */
export function resolveArticleEntityTypes(entityTypes?: WikiEntityType[] | null): WikiEntityType[] {
  return entityTypes && entityTypes.length ? entityTypes : ['spolka'];
}

const wikiSlugAliases = {
  'nip-8-po-rejestracji-spolki-zoo': 'nip-8-spolka-zoo',
  // Konto Organizacji cluster consolidation (2026-09): the generic
  // "konto-organizacji-e-urzad-skarbowy" was merged into the new-spółka pillar.
  // A 301 in public/_redirects is the canonical consolidation on Cloudflare;
  // this alias keeps the statically generated page (and any non-CF render)
  // resolving to the pillar content with a canonical tag to the pillar URL.
  // The old slug is dropped from getWikiArticlesByCategory, so it no longer
  // appears in the sitemap.
  'konto-organizacji-e-urzad-skarbowy': 'konto-organizacji-e-urzad-skarbowy-spolka',
} as const;

export type WikiCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  entityTypes?: WikiEntityType[];
};

export type WikiArticle = {
  id: string;
  slug: string;
  title: string;
  /** Optional on-page H1 when it should differ from the SEO <title>. */
  h1?: string | null;
  entityTypes?: WikiEntityType[];
  excerpt: string;
  summary: string;
  purpose: string | null;
  body_markdown: string | null;
  checklist: string[];
  official_links: { href: string; label: string; external?: boolean }[];
  related_actions: { label: string; href: string }[];
  faq?: FallbackWikiFaqItem[];
  article_type: string;
  sort_order: number;
  published_at: string | null;
  updated_at: string;
  category: WikiCategory;
};

export type WikiArticleListItem = Pick<
  WikiArticle,
  'id' | 'slug' | 'title' | 'excerpt' | 'summary' | 'article_type' | 'sort_order' | 'published_at' | 'updated_at' | 'entityTypes'
>;

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function getCanonicalWikiSlug(slug: string): string {
  return slug in wikiSlugAliases ? wikiSlugAliases[slug as keyof typeof wikiSlugAliases] : slug;
}

function dedupeCategories(categories: WikiCategory[]): WikiCategory[] {
  const map = new Map<string, WikiCategory>();
  for (const category of categories) {
    if (!map.has(category.slug)) {
      map.set(category.slug, category);
    }
  }
  return [...map.values()].sort((a, b) => a.sort_order - b.sort_order);
}

function dedupeArticles<T extends { slug: string; sort_order: number }>(articles: T[]): T[] {
  const map = new Map<string, T>();
  for (const article of articles) {
    if (!map.has(article.slug)) {
      map.set(article.slug, article);
    }
  }
  return [...map.values()].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getWikiCategories(): Promise<WikiCategory[]> {
  const { data, error } = await supabaseServer
    .from('wiki_categories')
    .select('id, slug, name, description, sort_order')
    .contains('surfaces', ['marketing'])
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.warn('[wiki] getWikiCategories: DB read failed, using fallback only:', error.message);
  }
  return dedupeCategories([...((error ? [] : data) ?? []), ...fallbackWikiCategories]);
}

export async function getWikiCategoryBySlug(slug: string): Promise<WikiCategory | null> {
  const { data, error } = await supabaseServer
    .from('wiki_categories')
    .select('id, slug, name, description, sort_order')
    .eq('slug', slug)
    .contains('surfaces', ['marketing'])
    .eq('is_active', true)
    .maybeSingle();

  if (!error && data) return data;
  return fallbackWikiCategories.find((category) => category.slug === slug) || null;
}

export async function getWikiArticlesByCategory(): Promise<
  { category: WikiCategory; articles: WikiArticleListItem[] }[]
> {
  const { data, error } = await supabaseServer
    .from('wiki_articles')
    .select(`
      id, slug, title, excerpt, summary, sort_order, published_at, updated_at, article_type,
      category:wiki_categories(id, slug, name, description, sort_order)
    `)
    .eq('status', 'published')
    .contains('surfaces', ['marketing'])
    .order('sort_order');

  if (error) {
    console.warn('[wiki] getWikiArticlesByCategory: DB read failed, using fallback only:', error.message);
  }

  const grouped = new Map<string, { category: WikiCategory; articles: WikiArticleListItem[] }>();
  for (const row of (error ? [] : data) ?? []) {
    const cat = row.category as unknown as WikiCategory;
    if (!grouped.has(cat.slug)) grouped.set(cat.slug, { category: cat, articles: [] });
    grouped.get(cat.slug)!.articles.push({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      summary: row.summary,
      article_type: row.article_type,
      sort_order: row.sort_order,
      published_at: row.published_at,
      updated_at: row.updated_at,
      // DB rows carry no entityTypes yet — fallback merge below fills it, else default applies.
      entityTypes: undefined,
    });
  }

  for (const article of fallbackWikiArticles) {
    if (!grouped.has(article.category.slug)) {
      grouped.set(article.category.slug, { category: article.category, articles: [] });
    }
    const bucket = grouped.get(article.category.slug)!;
    if (!bucket.articles.find((item) => item.slug === article.slug)) {
      bucket.articles.push({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        summary: article.summary,
        article_type: article.article_type,
        sort_order: article.sort_order,
        published_at: article.published_at,
        updated_at: article.updated_at,
        entityTypes: article.entityTypes,
      });
    }
  }

  return [...grouped.values()]
    .map((group) => ({ category: group.category, articles: dedupeArticles(group.articles) }))
    .sort((a, b) => a.category.sort_order - b.category.sort_order);
}

/**
 * Articles grouped by category, filtered to a single legal form. An article with
 * no `entityTypes` counts as sp. z o.o.-only. Empty categories are dropped.
 */
export async function getWikiArticlesForEntity(entityType: WikiEntityType): Promise<
  { category: WikiCategory; articles: WikiArticleListItem[] }[]
> {
  const grouped = await getWikiArticlesByCategory();
  return grouped
    .map(({ category, articles }) => ({
      category,
      articles: articles.filter((article) =>
        resolveArticleEntityTypes(article.entityTypes).includes(entityType),
      ),
    }))
    .filter((group) => group.articles.length > 0);
}

export function getAllWikiEntityHubSlugs(): string[] {
  return WIKI_ENTITY_HUBS.map((hub) => hub.slug);
}

export async function getWikiArticle(slug: string): Promise<WikiArticle | null> {
  const canonicalSlug = getCanonicalWikiSlug(slug);
  const { data, error } = await supabaseServer
    .from('wiki_articles')
    .select(`
      id, slug, title, excerpt, summary, purpose, body_markdown,
      checklist, official_links, related_actions,
      article_type, sort_order, published_at, updated_at,
      category:wiki_categories(id, slug, name, description, sort_order)
    `)
    .eq('slug', canonicalSlug)
    .eq('status', 'published')
    .contains('surfaces', ['marketing'])
    .single();

  if (!error && data) {
    const article = data as unknown as WikiArticle;
    // DB rows carry no entityTypes column yet — keep the fallback's tagging if we have one.
    const fallback = fallbackWikiArticles.find((item) => item.slug === canonicalSlug);
    return { ...article, entityTypes: article.entityTypes ?? fallback?.entityTypes };
  }
  return fallbackWikiArticles.find((article) => article.slug === canonicalSlug) || null;
}

export async function getWikiArticlesForCategory(categorySlug: string): Promise<{
  category: WikiCategory | null;
  articles: WikiArticle[];
}> {
  const category = await getWikiCategoryBySlug(categorySlug);
  if (!category) {
    return { category: null, articles: [] };
  }

  let dbArticles: WikiArticle[] = [];

  if (isUuid(category.id)) {
    const { data, error } = await supabaseServer
      .from('wiki_articles')
      .select(`
        id, slug, title, excerpt, summary, purpose, body_markdown,
        checklist, official_links, related_actions,
        article_type, sort_order, published_at, updated_at,
        category:wiki_categories(id, slug, name, description, sort_order)
      `)
      .eq('status', 'published')
      .eq('category_id', category.id)
      .contains('surfaces', ['marketing'])
      .order('sort_order');

    if (error) {
      console.warn('[wiki] getWikiArticlesForCategory: DB read failed, using fallback only:', error.message);
    } else {
      dbArticles = (data ?? []) as unknown as WikiArticle[];
    }
  }

  return {
    category,
    articles: dedupeArticles([
      ...dbArticles,
      ...fallbackWikiArticles.filter((article) => article.category.slug === category.slug),
    ]),
  };
}

export async function getRelatedWikiArticles(
  categorySlug: string,
  currentSlug: string,
  limit = 4
): Promise<WikiArticle[]> {
  const { category, articles } = await getWikiArticlesForCategory(categorySlug);
  if (!category) {
    return [];
  }

  const sameCategory = articles.filter((article) => article.slug !== currentSlug);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const grouped = await getWikiArticlesByCategory();
  const fallback = grouped
    .filter((group) => group.category.slug !== categorySlug)
    .flatMap((group) =>
      group.articles.map((article) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        entityTypes: article.entityTypes,
        excerpt: article.excerpt,
        summary: article.summary,
        purpose: null,
        body_markdown: null,
        checklist: [],
        official_links: [],
        related_actions: [],
        faq: [],
        article_type: article.article_type,
        sort_order: article.sort_order,
        published_at: article.published_at,
        updated_at: article.updated_at,
        category: group.category,
      }))
    )
    .filter((article) => article.slug !== currentSlug);

  return dedupeArticles([...sameCategory, ...fallback]).slice(0, limit);
}

export async function getAllWikiCategorySlugs(): Promise<string[]> {
  const categories = await getWikiCategories();
  return dedupeCategories(categories).map((category) => category.slug);
}

export async function getAllWikiSlugs(): Promise<{ slug: string; updated_at: string }[]> {
  const { data } = await supabaseServer
    .from('wiki_articles')
    .select('slug, updated_at')
    .eq('status', 'published')
    .contains('surfaces', ['marketing']);

  return dedupeArticles([
    ...((data ?? []) as Array<{ slug: string; updated_at: string; sort_order?: number }>).map((item) => ({
      slug: item.slug,
      updated_at: item.updated_at,
      sort_order: 0,
    })),
    ...fallbackWikiArticles.map((article) => ({
      slug: article.slug,
      updated_at: article.updated_at,
      sort_order: article.sort_order,
    })),
    ...Object.entries(wikiSlugAliases).map(([slug, canonicalSlug]) => {
      const dbArticle = (data ?? []).find((item) => item.slug === canonicalSlug);
      const fallbackArticle = fallbackWikiArticles.find((article) => article.slug === canonicalSlug);

      return {
        slug,
        updated_at: dbArticle?.updated_at ?? fallbackArticle?.updated_at ?? '2026-05-25T00:00:00.000Z',
        sort_order: fallbackArticle?.sort_order ?? 0,
      };
    }),
  ]).map(({ slug, updated_at }) => ({ slug, updated_at }));
}
