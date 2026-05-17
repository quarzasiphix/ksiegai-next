import { supabaseServer } from './supabase-server';
import { fallbackWikiArticles, fallbackWikiCategories, type FallbackWikiFaqItem } from './wiki-fallback';

export type WikiCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type WikiArticle = {
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
  faq?: FallbackWikiFaqItem[];
  article_type: string;
  sort_order: number;
  published_at: string | null;
  updated_at: string;
  category: WikiCategory;
};

export type WikiArticleListItem = Pick<
  WikiArticle,
  'id' | 'slug' | 'title' | 'excerpt' | 'summary' | 'article_type' | 'sort_order' | 'published_at' | 'updated_at'
>;

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
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

  if (error) throw error;
  return dedupeCategories([...(data ?? []), ...fallbackWikiCategories]);
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

  if (error) throw error;

  const grouped = new Map<string, { category: WikiCategory; articles: WikiArticleListItem[] }>();
  for (const row of data ?? []) {
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
      });
    }
  }

  return [...grouped.values()]
    .map((group) => ({ category: group.category, articles: dedupeArticles(group.articles) }))
    .sort((a, b) => a.category.sort_order - b.category.sort_order);
}

export async function getWikiArticle(slug: string): Promise<WikiArticle | null> {
  const { data, error } = await supabaseServer
    .from('wiki_articles')
    .select(`
      id, slug, title, excerpt, summary, purpose, body_markdown,
      checklist, official_links, related_actions,
      article_type, sort_order, published_at, updated_at,
      category:wiki_categories(id, slug, name, description, sort_order)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .contains('surfaces', ['marketing'])
    .single();

  if (!error && data) return data as unknown as WikiArticle;
  return fallbackWikiArticles.find((article) => article.slug === slug) || null;
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

    if (error) throw error;
    dbArticles = (data ?? []) as unknown as WikiArticle[];
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

  return articles.filter((article) => article.slug !== currentSlug).slice(0, limit);
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
  ]).map(({ slug, updated_at }) => ({ slug, updated_at }));
}
