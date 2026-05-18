import { MetadataRoute } from 'next'
import { getWikiArticlesByCategory } from '@/lib/wiki';

const baseUrl = 'https://ksiegai.pl';
const staticLastModified = new Date('2026-05-18T00:00:00+02:00');

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
  { path: '/jdg', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/spolka-z-oo', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/faktury', changeFrequency: 'weekly', priority: 0.75 },
  { path: '/platnosci-online', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/bezpieczenstwo-danych', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/poradnik', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/infrastructure', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/governance', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/regulamin', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-prywatnosci', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/rodo', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-zwrotow', changeFrequency: 'monthly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groupedArticles = await getWikiArticlesByCategory();
  const wikiEntries = groupedArticles.flatMap(({ category, articles }) => {
    const newestArticleTimestamp = Math.max(
      ...articles.map((article) => new Date(article.updated_at || article.published_at || staticLastModified).getTime()),
    );
    const categoryLastModified = new Date(newestArticleTimestamp);

    return [
      {
        url: `${baseUrl}/poradnik/kategoria/${category.slug}`,
        lastModified: categoryLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      },
      ...articles.map((article) => ({
        url: `${baseUrl}/poradnik/${article.slug}`,
        lastModified: new Date(article.updated_at || article.published_at || staticLastModified),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: staticLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...wikiEntries,
  ]
}
