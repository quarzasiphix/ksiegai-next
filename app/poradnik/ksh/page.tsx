import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ExternalLink, Scale } from 'lucide-react';
import { KSH_AMENDMENTS } from '@/lib/ksh/amendments';
import { getAllKshPages, KSH_BASE_PATH, KSH_SITE_URL, type KshPage } from '@/lib/ksh/registry';
import { formatKshNumber, getArticleLocation, getKshStatute } from '@/lib/ksh/statute';
import { formatWikiDate } from '@/lib/wiki-presentation';

const TITLE = 'Kodeks spółek handlowych (KSH) – przepisy wyjaśnione dla spółek';
const DESCRIPTION =
  'Najważniejsze przepisy Kodeksu spółek handlowych dla sp. z o.o.: aktualna treść z tekstu jednolitego, wyjaśnienie, przykłady, błędy i powiązane uchwały.';

export const metadata: Metadata = {
  title: `${TITLE} | KsięgaI`,
  description: DESCRIPTION,
  keywords: 'kodeks spółek handlowych, ksh, przepisy ksh, ksh sp. z o.o., art. ksh wyjaśnienie',
  alternates: { canonical: `${KSH_SITE_URL}${KSH_BASE_PATH}/` },
  openGraph: {
    title: `${TITLE} | KsięgaI`,
    description: DESCRIPTION,
    url: `${KSH_SITE_URL}${KSH_BASE_PATH}/`,
    type: 'website',
    locale: 'pl_PL',
  },
};

function groupByDivision(pages: KshPage[]) {
  const groups = new Map<string, { heading: string; pages: KshPage[] }>();
  for (const page of pages) {
    const location = getArticleLocation(page.statute);
    const titl = location.find((unit) => unit.kind === 'titl');
    const bran = location.find((unit) => unit.kind === 'bran');
    const key = bran?.id ?? titl?.id ?? 'other';
    const heading = [titl?.title, bran?.title].filter(Boolean).join(' – ') || 'Pozostałe';
    if (!groups.has(key)) groups.set(key, { heading, pages: [] });
    groups.get(key)!.pages.push(page);
  }
  return [...groups.values()];
}

export default async function KshHubPage() {
  const statute = getKshStatute();
  const pages = await getAllKshPages();
  const featured = pages.filter((page) => page.tier === 'A');
  const reference = pages.filter((page) => page.tier !== 'A');
  const pending = KSH_AMENDMENTS.filter((amendment) => amendment.status === 'pending');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${KSH_SITE_URL}${KSH_BASE_PATH}/`,
    inLanguage: 'pl-PL',
    about: {
      '@type': 'Legislation',
      name: statute.act.title,
      legislationIdentifier: statute.consolidatedText.citation,
      legislationJurisdiction: 'PL',
      sameAs: statute.act.isapUrl,
    },
    hasPart: featured.map((page) => ({ '@type': 'Article', headline: page.title, url: `${KSH_SITE_URL}${page.path}` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-14 dark:border-white/10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/poradnik/" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Kodeks spółek handlowych</span>
            </nav>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-300" />
              KSH w praktyce
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-6xl">{TITLE}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Przepisy, na które najczęściej trafia właściciel sp. z o.o. — umowy z zarządem, uchwały wspólników, zgromadzenia,
              finanse spółki. Przy każdym: aktualna treść z tekstu jednolitego, wyjaśnienie prostym językiem i to, co spółka musi zrobić.
            </p>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Omówione przepisy</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {featured.map((page) => (
                    <Link
                      key={page.number}
                      href={page.path}
                      className="group rounded-[24px] border border-black/10 bg-white/92 p-6 transition hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="text-sm font-semibold text-sky-700 dark:text-sky-300">Art. {formatKshNumber(page.number)} KSH</div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{page.shortTitle}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{page.commentary?.keyTakeaway}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                        Czytaj omówienie <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {reference.length ? (
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Przepisy, do których odwołują się poradniki</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Treść przepisu i lista poradników, które go stosują. Omówienia dodajemy stopniowo.
                  </p>
                  <div className="mt-6 space-y-8">
                    {groupByDivision(reference).map((group) => (
                      <div key={group.heading}>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{group.heading}</h3>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {group.pages.map((page) => (
                            <Link
                              key={page.number}
                              href={page.path}
                              className="flex items-baseline gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm transition hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.03]"
                            >
                              <span className="shrink-0 font-semibold text-slate-950 dark:text-white">Art. {formatKshNumber(page.number)}</span>
                              <span className="text-slate-600 dark:text-slate-300">{page.shortTitle}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 text-sm leading-7 dark:border-white/10 dark:bg-white/[0.04]">
                <h2 className="text-lg font-semibold">Stan prawny</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Treść przepisów pochodzi z tekstu jednolitego KSH ogłoszonego w {statute.consolidatedText.citation} (obwieszczenie z{' '}
                  {formatWikiDate(statute.consolidatedText.announcementDate)}). Zmiany ogłoszone później śledzimy osobno i oznaczamy przy
                  przepisach, których dotyczą.
                </p>
                <a
                  href={statute.act.isapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-medium text-sky-700 hover:underline dark:text-sky-300"
                >
                  KSH w ISAP <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </section>
              {pending.length ? (
                <section className="rounded-[28px] border border-amber-300/60 bg-amber-50/80 p-6 text-sm leading-7 dark:border-amber-400/20 dark:bg-amber-400/10">
                  <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100">Zmiany, które jeszcze nie weszły w życie</h2>
                  <ul className="mt-3 space-y-3 text-amber-950 dark:text-amber-100">
                    {pending.map((amendment) => (
                      <li key={amendment.eli}>
                        <strong>{formatWikiDate(amendment.effectiveFrom)}</strong> — {amendment.note} ({amendment.citation})
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
