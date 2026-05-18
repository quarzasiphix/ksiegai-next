import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink, Layers3, Sparkles } from 'lucide-react';
import { WikiArticleCard } from '@/components/wiki/WikiArticleCard';
import { getWikiArticlesByCategory } from '@/lib/wiki';
import { getFeaturedArticles, getWikiPresentationCategory } from '@/lib/wiki-presentation';

export const metadata: Metadata = {
  title: 'Poradnik dla przedsiębiorców | KsięgaI',
  description: 'Praktyczne przewodniki, checklisy i instrukcje dla polskich przedsiębiorców. KSeF, rejestracja spółki, CRBR, e-Doręczenia, podatki – krok po kroku.',
  keywords: 'poradnik przedsiębiorcy, KSeF jak zacząć, rejestracja spółki krok po kroku, CRBR zgłoszenie, e-doręczenia firma, checklist przedsiębiorca',
  alternates: { canonical: 'https://ksiegai.pl/poradnik' },
  openGraph: {
    title: 'Poradnik dla przedsiębiorców | KsięgaI',
    description: 'Praktyczne przewodniki i checklisy dla polskich przedsiębiorców.',
    url: 'https://ksiegai.pl/poradnik',
    type: 'website',
  },
};

export default async function PoradnikPage() {
  const grouped = await getWikiArticlesByCategory();
  const totalArticles = grouped.reduce((n, g) => n + g.articles.length, 0);
  const totalCategories = grouped.length;
  const featuredArticles = getFeaturedArticles(grouped);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Poradnik dla przedsiębiorców – KsięgaI',
    description: 'Praktyczne przewodniki i checklisy dla polskich przedsiębiorców.',
    url: 'https://ksiegai.pl/poradnik',
    publisher: {
      '@type': 'Organization',
      name: 'Tovernet Sp. z o.o.',
      url: 'https://ksiegai.pl',
    },
    numberOfItems: totalArticles,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-16 dark:border-white/10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                <span>Poradnik KsięgaI</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">
                Poradnik dla przedsiębiorców
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Praktyczne przewodniki o KSeF, rejestracji firmy, obowiązkach po wpisie do KRS,
                podatkach, dokumentach i płatnościach. Konkret: co zrobić, kiedy i jak to połączyć z pracą w KsięgaI.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-black/20">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Layers3 className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  <span>Stan poradnika</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{totalArticles}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">aktywnych poradników</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{totalCategories}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">głównych kategorii</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.38)] dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  <span>Najczęstsze obszary</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {grouped.map(({ category }) => {
                    const presentation = getWikiPresentationCategory(category.slug);
                    return (
                      <Link
                        key={category.slug}
                        href={`/poradnik/kategoria/${category.slug}`}
                        className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-sm text-slate-700 transition hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-sky-300"
                      >
                        {presentation.shortLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {featuredArticles.length ? (
          <section className="px-4 py-14 md:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Polecane poradniki
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Zacznij od tematów, które najczęściej blokują start
                  </h2>
                </div>
                <Link
                  href="/rejestracja"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  Załóż konto i uporządkuj proces
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-5 xl:grid-cols-3">
                {featuredArticles.map((article, index) => (
                  <WikiArticleCard
                    key={article.slug}
                    article={article}
                    category={article.category}
                    showCategory
                    variant={index === 0 ? 'featured' : 'default'}
                    className={index === 0 ? 'xl:col-span-2' : ''}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-7xl space-y-12">
            {grouped.map(({ category, articles }) => {
              const presentation = getWikiPresentationCategory(category.slug);

              return (
                <section
                  key={category.slug}
                  className="rounded-[32px] border border-black/10 bg-white/70 p-6 shadow-[0_28px_90px_-56px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.03] sm:p-8"
                >
                  <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                        {presentation.badge}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
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
                        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                          {category.description}
                        </p>
                      ) : null}
                    </div>

                    <Link
                      href={`/poradnik/kategoria/${category.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-sky-300"
                    >
                      Zobacz całą kategorię
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((article) => (
                      <WikiArticleCard
                        key={article.slug}
                        article={article}
                        category={category}
                        showCategory={false}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="border-t border-black/5 bg-black/[0.02] px-4 py-14 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-black/10 bg-white/85 p-8 text-center shadow-[0_28px_90px_-56px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
              Zajmij się firmą, resztą zajmie się KsięgaI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Automatyczne faktury, pełna obsługa KSeF, płatności online przez Stripe, JPK i rozliczenia — wszystko w jednym miejscu.
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
          </div>
        </section>
      </main>
    </>
  );
}
