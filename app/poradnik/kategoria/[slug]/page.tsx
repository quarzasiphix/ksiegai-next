import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckSquare, ChevronRight } from 'lucide-react';
import {
  getAllWikiCategorySlugs,
  getWikiArticlesForCategory,
  getWikiCategoryBySlug,
} from '@/lib/wiki';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllWikiCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getWikiCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Kategoria nie znaleziona | KsięgaI' };
  }

  return {
    title: `${category.name} | Poradnik KsięgaI`,
    description: category.description || `Poradniki i checklisty KsięgaI dla kategorii ${category.name}.`,
    alternates: {
      canonical: `https://ksiegai.pl/poradnik/kategoria/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Poradnik KsięgaI`,
      description: category.description || `Poradniki i checklisty KsięgaI dla kategorii ${category.name}.`,
      url: `https://ksiegai.pl/poradnik/kategoria/${category.slug}`,
      type: 'website',
      locale: 'pl_PL',
    },
  };
}

export default async function WikiCategoryPage({ params }: PageProps) {
  const { category, articles } = await getWikiArticlesForCategory(params.slug);
  if (!category) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Poradnik',
        item: 'https://ksiegai.pl/poradnik',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://ksiegai.pl/poradnik/kategoria/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/poradnik" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{category.name}</span>
            </nav>
          <Link
            href="/poradnik"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć do poradnika
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{articles.length} artykułów</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{category.name}</h1>
          {category.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
          ) : null}
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-4xl space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/poradnik/${article.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30 hover:bg-muted/20"
              >
                <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold transition-colors group-hover:text-primary">{article.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{article.excerpt || article.summary}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
