import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, ExternalLink } from 'lucide-react';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import {
  WIKI_ENTITY_HUBS,
  getWikiArticlesForEntity,
  getWikiEntityHubBySlug,
  type WikiEntityHub,
} from '@/lib/wiki';

export function buildEntityHubMetadata(entitySlug: string): Metadata {
  const hub = getWikiEntityHubBySlug(entitySlug);
  if (!hub) return { title: 'Poradnik nie znaleziony | KsięgaI' };
  const url = `https://www.ksiegai.pl${hub.path}/`;
  return {
    title: `${hub.name} — obowiązki i formalności krok po kroku | KsięgaI`,
    description: hub.description,
    keywords: `${hub.name.toLowerCase()}, poradnik ${hub.shortLabel.toLowerCase()}, obowiązki po rejestracji, KSeF, konto organizacji, CRBR, NIP-8`,
    alternates: { canonical: url },
    openGraph: {
      title: `${hub.name} | Poradnik KsięgaI`,
      description: hub.description,
      url,
      type: 'website',
      locale: 'pl_PL',
    },
  };
}

export async function EntityHubPage({ entitySlug }: { entitySlug: string }) {
  const hub: WikiEntityHub | null = getWikiEntityHubBySlug(entitySlug);
  if (!hub) notFound();

  const grouped = await getWikiArticlesForEntity(hub.entityType);
  const totalArticles = grouped.reduce((n, g) => n + g.articles.length, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${hub.name} — KsięgaI`,
    description: hub.description,
    url: `https://www.ksiegai.pl${hub.path}`,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Poradnik dla przedsiębiorców – KsięgaI',
      url: 'https://www.ksiegai.pl/poradnik',
    },
    publisher: { '@type': 'Organization', name: 'Tovernet Sp. z o.o.', url: 'https://www.ksiegai.pl' },
    numberOfItems: totalArticles,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Poradnik', item: 'https://www.ksiegai.pl/poradnik' },
      { '@type': 'ListItem', position: 2, name: hub.name, item: `https://www.ksiegai.pl${hub.path}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-14 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/poradnik" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{hub.name}</span>
            </nav>

            <Link
              href="/poradnik"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć do poradnika
            </Link>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-300" />
              <span>Poradnik wg formy prawnej</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              {hub.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{hub.tagline}</p>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-500 dark:text-slate-400">{hub.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {WIKI_ENTITY_HUBS.map((item) => {
                const active = item.entityType === hub.entityType;
                return (
                  <Link
                    key={item.entityType}
                    href={`${item.path}/`}
                    className={
                      active
                        ? 'rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700 dark:text-sky-300'
                        : 'rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-sky-300'
                    }
                  >
                    {item.shortLabel}
                  </Link>
                );
              })}
            </div>

            {hub.marketingHref ? (
              <div className="mt-6">
                <Link
                  href={hub.marketingHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  Zobacz, jak KsięgaI wspiera tę formę działalności
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl space-y-12">
            {grouped.length ? (
              grouped.map(({ category, articles }) => (
                <section
                  key={category.slug}
                  className="rounded-[32px] border border-black/10 bg-white/70 p-6 shadow-[0_28px_90px_-56px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.03] sm:p-8"
                >
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link href={`/poradnik/kategoria/${category.slug}`} className="group inline-flex items-center gap-2">
                          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300 md:text-3xl">
                            {category.name}
                          </h2>
                          <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:text-sky-600 dark:group-hover:text-sky-300" />
                        </Link>
                        <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                          {articles.length} {articles.length === 1 ? 'poradnik' : 'poradniki'}
                        </span>
                      </div>
                      {category.description ? (
                        <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">{category.description}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((article) => (
                      <WikiArticleCard key={article.slug} article={article} category={category} showCategory={false} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-[28px] border border-dashed border-black/10 bg-white/70 p-8 dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Ta sekcja dopiero powstaje</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  Poradniki dla tej formy prawnej są w przygotowaniu. Zajrzyj do{' '}
                  <Link href="/poradnik" className="font-semibold text-sky-700 hover:underline dark:text-sky-300">głównego poradnika</Link>.
                </p>
              </div>
            )}

            <section className="rounded-[32px] border border-black/10 bg-black/[0.02] p-8 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
                Zajmij się organizacją, formalnościami zajmie się KsięgaI
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Faktury, KSeF, pełna księgowość, terminy i dokumenty — w jednym prowadzonym procesie.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="https://app.ksiegai.pl/rejestracja"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  Zacznij za darmo
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/cennik"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                >
                  Zobacz cennik
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
