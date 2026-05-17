import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ExternalLink, ListChecks } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getAllWikiSlugs, getRelatedWikiArticles, getWikiArticle } from '@/lib/wiki';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllWikiSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getWikiArticle(params.slug);
  if (!article) {
    return {
      title: 'Artykuł nie znaleziony | KsięgaI',
    };
  }

  const description = article.excerpt || article.summary || article.purpose || `Poradnik: ${article.title}`;

  return {
    title: `${article.title} | Poradnik KsięgaI`,
    description,
    keywords: `${article.title}, ${article.category.name}, poradnik przedsiębiorcy, KSeF, księgowość online`,
    alternates: {
      canonical: `https://ksiegai.pl/poradnik/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Poradnik KsięgaI`,
      description,
      url: `https://ksiegai.pl/poradnik/${article.slug}`,
      type: 'article',
      locale: 'pl_PL',
    },
  };
}

export default async function WikiArticlePage({ params }: PageProps) {
  const article = await getWikiArticle(params.slug);
  if (!article) notFound();

  const related = await getRelatedWikiArticles(article.category.slug, article.slug, 4);

  const faqItems = article.checklist.map((item) => ({
    '@type': 'Question',
    name: item,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `W KsięgaI znajdziesz checklistę i kolejne kroki dla: ${article.title}.`,
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.summary,
    dateModified: article.updated_at,
    datePublished: article.published_at || article.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Tovernet Sp. z o.o.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KsięgaI',
      url: 'https://ksiegai.pl',
    },
    mainEntityOfPage: `https://ksiegai.pl/poradnik/${article.slug}`,
  };

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
        name: article.category.name,
        item: `https://ksiegai.pl/poradnik/kategoria/${article.category.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://ksiegai.pl/poradnik/${article.slug}`,
      },
    ],
  };

  const faqJsonLd = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems,
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <main className="min-h-screen bg-background">
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20 px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/poradnik" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/poradnik/kategoria/${article.category.slug}`} className="transition-colors hover:text-foreground">
                {article.category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{article.title}</span>
            </nav>
            <Link
              href={`/poradnik/kategoria/${article.category.slug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {article.category.name}
            </Link>
            <div className="mb-4 inline-flex rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              Poradnik KsięgaI
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{article.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {article.excerpt || article.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>Aktualizacja: {new Date(article.updated_at).toLocaleDateString('pl-PL')}</span>
              <span>•</span>
              <span>{article.category.name}</span>
            </div>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
              {article.purpose ? (
                <div className="mb-8 rounded-xl border border-blue-200/60 bg-blue-50/70 p-4 text-sm text-blue-950">
                  <strong>Po co ten poradnik:</strong> {article.purpose}
                </div>
              ) : null}

              {article.body_markdown ? (
                <MarkdownRenderer content={article.body_markdown} />
              ) : (
                <p className="text-muted-foreground">
                  Treść artykułu jest w trakcie przygotowania. Skorzystaj z checklisty po prawej i wróć później po pełny poradnik.
                </p>
              )}
            </article>

            <aside className="space-y-6">
              {article.checklist.length ? (
                <section className="rounded-2xl border border-border/60 bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Checklist</h2>
                  </div>
                  <div className="space-y-3">
                    {article.checklist.map((item, index) => (
                      <div key={`${item}-${index}`} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.official_links.length ? (
                <section className="rounded-2xl border border-border/60 bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold">Oficjalne linki</h2>
                  <div className="space-y-3">
                    {article.official_links.map((link) => (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-3 text-sm transition-colors hover:bg-muted/40"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.faq?.length ? (
                <section className="rounded-2xl border border-border/60 bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold">FAQ</h2>
                  <div className="space-y-4">
                    {article.faq.map((item) => (
                      <div key={item.question} className="rounded-xl border border-border/50 p-4">
                        <h3 className="text-sm font-semibold">{item.question}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-2xl border border-border/60 bg-muted/30 p-6">
                <h2 className="text-lg font-semibold">Chcesz to robić w jednym systemie?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  KsięgaI obsługuje KSeF, przyjmuje płatności online przez Stripe i porządkuje dokumenty, checklisty oraz obowiązki firmy.
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/rejestracja"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Załóż konto
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/cennik"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-background"
                  >
                    Zobacz cennik
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </section>

        {related.length ? (
          <section className="border-t border-border/40 bg-muted/20 px-4 py-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-6 text-2xl font-bold">Powiązane poradniki</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/poradnik/${item.slug}`}
                    className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30 hover:bg-muted/20"
                  >
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.excerpt || item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
