import { MetadataRoute } from 'next'
import { getWikiArticlesByCategory, WIKI_ENTITY_HUBS } from '@/lib/wiki';
import { mcpCategories } from '@/lib/mcpTools';
import { getAllKshPages } from '@/lib/ksh/registry';

const baseUrl = 'https://www.ksiegai.pl';
const staticLastModified = new Date('2026-09-07T00:00:00+02:00');

const staticRoutes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/premium', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/rejestracja', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/cennik', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/generator-faktur', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/darmowy-generator-faktur', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/jak-to-dziala', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/dla-ksiegowych', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/ksef', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/mcp', changeFrequency: 'weekly', priority: 0.65 },
  { path: '/jdg', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/spolka-z-oo', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/start-podmiotu', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/faktury', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/platnosci-online', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/stripe-dla-saas', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/ecommerce-ksiegowosc', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/shopify-ksiegowosc', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/woocommerce-ksiegowosc', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/bezpieczenstwo-danych', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/poradnik', changeFrequency: 'weekly', priority: 0.7 },
  ...WIKI_ENTITY_HUBS.map((hub) => ({
    path: hub.path.replace(/^https?:\/\/[^/]+/, ''),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })),
  { path: '/infrastructure', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/governance', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/tovernet', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/regulamin', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-prywatnosci', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/rodo', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-zwrotow', changeFrequency: 'monthly', priority: 0.5 },
];

const mcpCategoryEntries = mcpCategories.map((category) => ({
  url: `${baseUrl}/mcp/${category.slug}/`,
  lastModified: staticLastModified,
  changeFrequency: 'weekly' as const,
  priority: 0.55,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groupedArticles = await getWikiArticlesByCategory();
  const wikiEntries = groupedArticles.flatMap(({ category, articles }) => {
    const newestArticleTimestamp = Math.max(
      ...articles.map((article) => new Date(article.updated_at || article.published_at || staticLastModified).getTime()),
    );
    const categoryLastModified = new Date(newestArticleTimestamp);

    return [
      {
        url: `${baseUrl}/poradnik/kategoria/${category.slug}/`,
        lastModified: categoryLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      },
      ...articles.map((article) => ({
        url: `${baseUrl}/poradnik/${article.slug}/`,
        lastModified: new Date(article.updated_at || article.published_at || staticLastModified),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];
  });

  // Only Tier A KSH pages are indexable; Tier B reference pages are noindex.
  const kshPages = (await getAllKshPages()).filter((page) => page.tier === 'A');
  const kshLastModified = kshPages.reduce(
    (latest, page) => Math.max(latest, new Date(page.commentary!.updatedAt).getTime()),
    staticLastModified.getTime(),
  );
  const kshEntries = [
    {
      url: `${baseUrl}/poradnik/ksh/`,
      lastModified: new Date(kshLastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    },
    ...kshPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(page.commentary!.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: route.path === '' ? `${baseUrl}/` : `${baseUrl}${route.path}/`,
      lastModified: staticLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...wikiEntries,
    ...kshEntries,
    ...mcpCategoryEntries,
  ]
}
