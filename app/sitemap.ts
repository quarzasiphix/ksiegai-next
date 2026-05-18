import { MetadataRoute } from 'next'
import { getAllWikiCategorySlugs, getAllWikiSlugs } from '@/lib/wiki';

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
  { path: '/poradnik', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/infrastructure', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/governance', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/regulamin', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-prywatnosci', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/rodo', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/polityka-zwrotow', changeFrequency: 'monthly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [wikiSlugs, wikiCategorySlugs] = await Promise.all([
    getAllWikiSlugs(),
    getAllWikiCategorySlugs(),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: staticLastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...wikiCategorySlugs.map((slug) => ({
      url: `${baseUrl}/poradnik/kategoria/${slug}`,
      lastModified: staticLastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    })),
    ...wikiSlugs.map(({ slug, updated_at }) => ({
      url: `${baseUrl}/poradnik/${slug}`,
      lastModified: new Date(updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
