import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { WikiCategorySidebar } from '@/components/wiki/WikiCategorySidebar';
import {
  getWikiArticlesByCategory,
  getAllWikiCategorySlugs,
  getWikiArticlesForCategory,
  getWikiCategoryBySlug,
} from '@/lib/wiki';
import {
  getQuickTopics,
  getWikiPresentationCategory,
  splitKsefArticlesByStage,
} from '@/lib/wiki-presentation';

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
      canonical: `https://www.ksiegai.pl/poradnik/kategoria/${category.slug}/`,
    },
    openGraph: {
      title: `${category.name} | Poradnik KsięgaI`,
      description: category.description || `Poradniki i checklisty KsięgaI dla kategorii ${category.name}.`,
      url: `https://www.ksiegai.pl/poradnik/kategoria/${category.slug}`,
      type: 'website',
      locale: 'pl_PL',
    },
  };
}

export default async function WikiCategoryPage({ params }: PageProps) {
  const grouped = await getWikiArticlesByCategory();
  const { category, articles } = await getWikiArticlesForCategory(params.slug);
  if (!category) notFound();
  const categorySidebarItems = grouped.map(({ category, articles }) => ({
    category,
    count: articles.length,
  }));
  const presentation = getWikiPresentationCategory(category.slug);
  const isKsefCategory = category.slug === 'ksef';
  const { initialRegistration, informational } = isKsefCategory
    ? splitKsefArticlesByStage(articles)
    : { initialRegistration: [], informational: articles };
  const featuredArticle = isKsefCategory
    ? initialRegistration[0] ?? informational[0] ?? null
    : articles[0] ?? null;
  const remainingArticles = isKsefCategory
    ? [
        ...initialRegistration.filter((article) => article.slug !== featuredArticle?.slug),
        ...informational.filter((article) => article.slug !== featuredArticle?.slug),
      ]
    : articles.slice(1);
  const quickTopics = getQuickTopics(articles);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Poradnik',
        item: 'https://www.ksiegai.pl/poradnik',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://www.ksiegai.pl/poradnik/kategoria/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-14 dark:border-white/10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/poradnik" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{category.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
              <div>
                <Link
                  href="/poradnik"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Wróć do poradnika
                </Link>
                <div className="mt-6 inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                  {presentation.badge}
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                  {category.name}
                </h1>
                {category.description ? (
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{category.description}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-sky-500/10 px-3 py-1.5 text-sm font-medium text-sky-700 dark:text-sky-300">
                    {articles.length} {articles.length === 1 ? 'aktywny poradnik' : 'aktywnych poradników'}
                  </span>
                  <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                    Tematy: {quickTopics.length}
                  </span>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/85 p-6 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  <span>Najczęstsze tematy</span>
                </div>
                <div className="mt-4 space-y-2">
                  {quickTopics.map((topic) => (
                    <div
                      key={topic}
                      className="rounded-2xl border border-black/5 bg-black/[0.02] px-3 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-14">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
            <WikiCategorySidebar items={categorySidebarItems} activeCategorySlug={category.slug} />

            <div className="space-y-10">
            {featuredArticle ? (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
                <WikiArticleCard article={featuredArticle} category={category} showCategory={false} variant="featured" />

                <div className="rounded-[28px] border border-black/10 bg-white/85 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Połącz to z produktem
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {presentation.ctaTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {presentation.ctaDescription}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link
                      href={presentation.ctaHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                    >
                      {presentation.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/cennik"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                    >
                      Zobacz cennik
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-8 border-t border-black/5 pt-6 dark:border-white/10">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{presentation.roadmapTitle}</div>
                    <div className="mt-4 space-y-2">
                      {presentation.roadmapTopics.map((topic) => (
                        <div
                          key={topic}
                          className="rounded-2xl border border-black/5 bg-black/[0.02] px-3 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {remainingArticles.length ? (
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {isKsefCategory ? 'Dalsze poradniki w tej kategorii' : 'Wszystkie poradniki w tej kategorii'}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {isKsefCategory
                        ? 'Najpierw ścieżka startowa dla JDG lub spółki, potem tematy operacyjne: tokeny, dostępy i dalsza obsługa KSeF.'
                        : 'Każdy poradnik prowadzi od formalności lub problemu do konkretnego następnego kroku.'}
                    </p>
                  </div>
                </div>

                {isKsefCategory ? (
                  <div className="space-y-8">
                    {initialRegistration.filter((article) => article.slug !== featuredArticle?.slug).length ? (
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            Rejestracja początkowa KSeF
                          </h3>
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            Druga ścieżka startowa
                          </span>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                          {initialRegistration
                            .filter((article) => article.slug !== featuredArticle?.slug)
                            .map((article) => (
                              <WikiArticleCard key={article.slug} article={article} category={category} showCategory={false} />
                            ))}
                        </div>
                      </div>
                    ) : null}

                    {informational.filter((article) => article.slug !== featuredArticle?.slug).length ? (
                      <div className="border-t border-black/5 pt-8 dark:border-white/10">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            Pozostałe poradniki KSeF
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            Instrukcje uzupełniające po pierwszym wejściu: token, uprawnienia dla biura i podobne tematy operacyjne.
                          </p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                          {informational
                            .filter((article) => article.slug !== featuredArticle?.slug)
                            .map((article) => (
                              <WikiArticleCard key={article.slug} article={article} category={category} showCategory={false} />
                            ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {remainingArticles.map((article) => (
                      <WikiArticleCard key={article.slug} article={article} category={category} showCategory={false} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-black/10 bg-white/70 p-8 dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Ta sekcja dopiero się rozbudowuje
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  Mamy już główny poradnik dla tej kategorii. Kolejne tematy są przygotowane w roadmapie poniżej, żeby poradnik rósł razem z realnymi potrzebami firm i księgowych.
                </p>
              </div>
            )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
