import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ExternalLink, ListChecks } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { KsefInviteCTA } from '@/components/wiki/KsefInviteCTA';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { WikiCategorySidebar } from '@/components/wiki/WikiCategorySidebar';
import { getAllWikiSlugs, getRelatedWikiArticles, getWikiArticle, getWikiArticlesByCategory } from '@/lib/wiki';
import { formatWikiDate, getWikiPresentationCategory } from '@/lib/wiki-presentation';

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
      canonical: `https://www.ksiegai.pl/poradnik/${article.slug}/`,
    },
    openGraph: {
      title: `${article.title} | Poradnik KsięgaI`,
      description,
      url: `https://www.ksiegai.pl/poradnik/${article.slug}`,
      type: 'article',
      locale: 'pl_PL',
    },
  };
}

export default async function WikiArticlePage({ params }: PageProps) {
  const grouped = await getWikiArticlesByCategory();
  const article = await getWikiArticle(params.slug);
  if (!article) notFound();
  const categorySidebarItems = grouped.map(({ category, articles }) => ({
    category,
    count: articles.length,
  }));
  const related = await getRelatedWikiArticles(article.category.slug, article.slug, 3);
  const presentation = getWikiPresentationCategory(article.category.slug);
  const faqItems = (article.faq ?? []).map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
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
      url: 'https://www.ksiegai.pl',
    },
    mainEntityOfPage: `https://www.ksiegai.pl/poradnik/${article.slug}`,
  };

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
        name: article.category.name,
        item: `https://www.ksiegai.pl/poradnik/kategoria/${article.category.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://www.ksiegai.pl/poradnik/${article.slug}`,
      },
    ],
  };

  const howToJsonLd =
    article.article_type === 'guide' && article.checklist.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: article.title,
          description: article.excerpt || article.summary,
          step: article.checklist.map((item, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: item,
            text: item,
          })),
        }
      : null;

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
      {howToJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      ) : null}
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-14 dark:border-white/10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
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
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {article.category.name}
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                  <span>{presentation.badge}</span>
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                  {article.title}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {article.excerpt || article.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>Aktualizacja: {formatWikiDate(article.updated_at)}</span>
                  <span>•</span>
                  <span>{article.category.name}</span>
                  <span>•</span>
                  <span>{article.article_type === 'checklist' ? 'Checklist praktyczna' : 'Przewodnik krok po kroku'}</span>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/85 p-6 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04]">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Co znajdziesz w środku
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p>Konkretną kolejność działań, checklistę i oficjalne linki potrzebne do wykonania tego kroku.</p>
                  <p>Jeżeli temat łączy się z pracą w KsięgaI, pokazujemy też następny krok w aplikacji.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_minmax(0,760px)_320px] xl:grid-cols-[260px_minmax(0,820px)_340px]">
            <WikiCategorySidebar items={categorySidebarItems} activeCategorySlug={article.category.slug} />

            <article className="rounded-[32px] border border-black/10 bg-white/92 p-6 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04] md:p-10">
              {article.purpose ? (
                <div className="mb-10 rounded-[24px] border border-sky-200/70 bg-sky-50/80 p-5 text-sm leading-7 text-slate-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-slate-200">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                    Po co ten poradnik
                  </div>
                  <p className="mt-3 text-base leading-8">{article.purpose}</p>
                </div>
              ) : null}

              {article.category.slug === 'ksef' && (
                <KsefInviteCTA variant="inline" position="mid" articleSlug={article.slug} />
              )}

              {article.body_markdown ? (
                <MarkdownRenderer content={article.body_markdown} />
              ) : (
                <p className="text-muted-foreground">
                  Treść artykułu jest w trakcie przygotowania. Skorzystaj z checklisty i oficjalnych linków po prawej, żeby wykonać najważniejsze kroki już teraz.
                </p>
              )}

              {article.category.slug === 'ksef' && (
                <KsefInviteCTA variant="inline" position="end" articleSlug={article.slug} />
              )}

              {article.related_actions.length ? (
                <section className="mt-12 rounded-[24px] border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.03]">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Co dalej w KsięgaI
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Jeżeli chcesz od razu przełożyć ten temat na pracę w systemie, zacznij od jednego z poniższych kroków.
                  </p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {article.related_actions.map((action) => (
                      <Link
                        key={`${action.href}-${action.label}`}
                        href={action.href}
                        className="inline-flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm font-semibold text-slate-800 transition hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-sky-300"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {article.checklist.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="mb-4 flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-sky-600 dark:text-sky-300" />
                    <h2 className="text-lg font-semibold">Checklist</h2>
                  </div>
                  <div className="space-y-3">
                    {article.checklist.map((item, index) => (
                      <div key={`${item}-${index}`} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-3 text-sm leading-7 dark:border-white/10 dark:bg-white/[0.03]">
                        <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-slate-700 dark:text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.official_links.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="mb-4 text-lg font-semibold">Oficjalne linki</h2>
                  <div className="space-y-3">
                    {article.official_links.map((link) => (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm transition-colors hover:border-sky-500/30 hover:bg-sky-50/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                      >
                        <span className="text-slate-700 dark:text-slate-200">{link.label}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.faq?.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="mb-4 text-lg font-semibold">FAQ</h2>
                  <div className="space-y-4">
                    {article.faq.map((item) => (
                      <div key={item.question} className="rounded-2xl border border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <h3 className="text-sm font-semibold">{item.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {related.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-lg font-semibold">Powiązane poradniki</h2>
                  <div className="mt-4 space-y-3">
                    {related.map((item) => (
                      <WikiArticleCard
                        key={item.slug}
                        article={item}
                        category={item.category}
                        variant="compact"
                        className="p-4"
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              {article.category.slug === 'ksef' ? (
                <KsefInviteCTA variant="sidebar" articleSlug={article.slug} />
              ) : (
                <section className="rounded-[28px] border border-black/10 bg-black/[0.03] p-6 dark:border-white/10 dark:bg-white/[0.03]">
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{presentation.ctaTitle}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {presentation.ctaDescription}
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link
                      href={presentation.ctaHref}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                    >
                      {presentation.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/cennik"
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-black/[0.03] dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.04]"
                    >
                      Zobacz cennik
                    </Link>
                  </div>
                </section>
              )}
            </aside>
          </div>
        </section>

        {related.length ? (
          <section className="border-t border-black/5 bg-black/[0.02] px-4 py-12 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Powiązane poradniki</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Najpierw pokazujemy poradniki z tej samej kategorii, a potem tematy, które zwykle pojawiają się zaraz po nich.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <WikiArticleCard key={item.slug} article={item} category={item.category} variant="default" />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
