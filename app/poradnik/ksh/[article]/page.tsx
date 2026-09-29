import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Gavel,
  Scale,
  XCircle,
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { KshStatuteText } from '@/components/ksh/KshStatuteText';
import { getAmendmentsForArticle } from '@/lib/ksh/amendments';
import {
  getAllKshPages,
  getKshCitingGuides,
  getKshPage,
  getRelatedKshPages,
  KSH_BASE_PATH,
  KSH_SITE_URL,
  kshNumberFromSlug,
  linkKshMarkdown,
} from '@/lib/ksh/registry';
import { formatKshNumber, getArticleLocation, getKshStatute } from '@/lib/ksh/statute';
import { formatWikiDate } from '@/lib/wiki-presentation';

type PageProps = { params: { article: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getAllKshPages();
  return pages.map((page) => ({ article: `art-${page.number}` }));
}

async function loadPage(slug: string) {
  const number = kshNumberFromSlug(slug);
  return number ? getKshPage(number) : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await loadPage(params.article);
  if (!page) return { title: 'Przepis nie znaleziony | KsięgaI' };

  const url = `${KSH_SITE_URL}${page.path}`;
  const label = `Art. ${formatKshNumber(page.number)} KSH`;
  const description =
    page.commentary?.metaDescription ??
    `${label} – aktualna treść przepisu Kodeksu spółek handlowych (${page.shortTitle}) i poradniki KsięgaI, które się do niego odwołują.`;

  return {
    title: `${page.title} | KsięgaI`,
    description,
    keywords: `${label.toLowerCase()}, art ${formatKshNumber(page.number)} ksh, ${formatKshNumber(page.number)} ksh, kodeks spółek handlowych, ${page.shortTitle}`,
    alternates: { canonical: url },
    // Tier B reference pages stay out of the index until they have commentary.
    robots: page.tier === 'A' ? undefined : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      title: `${page.title} | KsięgaI`,
      description,
      url,
      type: 'article',
      locale: 'pl_PL',
    },
  };
}

function SectionCard({ id, title, icon, children }: { id?: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-28 border-t border-black/5 pt-8 dark:border-white/10">
      <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {icon}
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function KshArticlePage({ params }: PageProps) {
  const page = await loadPage(params.article);
  if (!page) notFound();

  const statute = getKshStatute();
  const { commentary } = page;
  const label = `Art. ${formatKshNumber(page.number)} KSH`;
  const location = getArticleLocation(page.statute);
  const amendments = getAmendmentsForArticle(page.number);
  const pendingAmendments = amendments.filter((a) => a.status === 'pending');
  const annotations = amendments.filter((a) => a.status === 'annotation');
  const [related, citingGuides, explanation] = await Promise.all([
    getRelatedKshPages(page),
    getKshCitingGuides(page.number),
    commentary ? linkKshMarkdown(commentary.explanation, page.number) : Promise.resolve(null),
  ]);
  const url = `${KSH_SITE_URL}${page.path}`;

  const legislationJsonLd = {
    '@type': 'Legislation',
    name: `${statute.act.name} – ${label}`,
    legislationIdentifier: label,
    legislationJurisdiction: 'PL',
    legislationType: 'Ustawa',
    isPartOf: {
      '@type': 'Legislation',
      name: statute.act.title,
      legislationIdentifier: statute.consolidatedText.citation,
      sameAs: statute.act.isapUrl,
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': commentary ? 'Article' : 'WebPage',
    headline: page.title,
    name: page.title,
    description: commentary?.summary ?? `${label} – treść przepisu i powiązane poradniki.`,
    url,
    inLanguage: 'pl-PL',
    ...(commentary
      ? {
          datePublished: commentary.publishedAt,
          dateModified: commentary.updatedAt,
          author: { '@type': 'Organization', name: 'Tovernet Sp. z o.o.' },
          publisher: { '@type': 'Organization', name: 'KsięgaI', url: KSH_SITE_URL },
        }
      : {}),
    about: legislationJsonLd,
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Poradnik', item: `${KSH_SITE_URL}/poradnik/` },
      { '@type': 'ListItem', position: 2, name: 'Kodeks spółek handlowych', item: `${KSH_SITE_URL}${KSH_BASE_PATH}/` },
      { '@type': 'ListItem', position: 3, name: label, item: url },
    ],
  };

  const faqJsonLd = commentary?.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: commentary.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}

      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,white_18%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_34%),linear-gradient(to_bottom,#05070d,#09090b)]">
        <section className="border-b border-black/5 px-4 py-14 dark:border-white/10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/poradnik/" className="transition-colors hover:text-foreground">Poradnik</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`${KSH_BASE_PATH}/`} className="transition-colors hover:text-foreground">Kodeks spółek handlowych</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{label}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-300" />
              <span>{location.map((unit) => unit.title || unit.label).filter(Boolean).slice(-2).join(' · ')}</span>
            </div>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-5xl">
              {page.title}
            </h1>
            {commentary ? (
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{commentary.summary}</p>
            ) : (
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Aktualna treść przepisu z tekstu jednolitego Kodeksu spółek handlowych oraz poradniki KsięgaI, które się do niego odwołują.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span>Stan prawny: tekst jednolity {statute.consolidatedText.citation} z późn. zm.</span>
              {commentary ? (
                <>
                  <span>•</span>
                  <span>Zweryfikowano: {formatWikiDate(commentary.verification.lastVerifiedAt)}</span>
                </>
              ) : null}
            </div>

            {pendingAmendments.map((amendment) => (
              <div
                key={amendment.eli}
                className="mt-6 flex max-w-4xl gap-3 rounded-2xl border border-amber-300/70 bg-amber-50/90 p-4 text-sm leading-6 text-amber-950 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-100"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  <strong>Zmiana od {formatWikiDate(amendment.effectiveFrom)}:</strong> {amendment.note} Podstawa: {amendment.citation}.
                  Poniżej brzmienie obowiązujące dziś.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-12 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="min-w-0 rounded-[32px] border border-black/10 bg-white/92 p-6 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.42)] dark:border-white/10 dark:bg-white/[0.04] md:p-10">
              <section id="tresc" className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-300" />
                    Treść przepisu
                  </h2>
                  <a
                    href={statute.consolidatedText.isapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-300"
                  >
                    {statute.consolidatedText.citation} (ISAP) <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="mt-5 rounded-[24px] border border-black/10 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03] md:p-6">
                  <div className="mb-3 font-semibold text-slate-950 dark:text-white">{page.statute.label}.</div>
                  <KshStatuteText article={page.statute} />
                </div>
                {annotations.map((amendment) => (
                  <p key={amendment.eli} className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {amendment.title} ({amendment.citation}): {amendment.note}
                  </p>
                ))}
              </section>

              {commentary ? (
                <>
                  <div className="mt-10 rounded-[24px] border border-sky-200/70 bg-sky-50/80 p-5 text-slate-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-slate-200">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">W skrócie</div>
                    <p className="mt-3 text-base leading-8">{commentary.keyTakeaway}</p>
                  </div>

                  {explanation ? <div className="mt-2"><MarkdownRenderer content={explanation} /></div> : null}

                  <SectionCard id="kiedy" title="Kiedy przepis ma zastosowanie">
                    <ul className="space-y-3">
                      {commentary.appliesWhen.map((item) => (
                        <li key={item} className="flex gap-3 text-[16px] leading-7 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {commentary.doesNotApply?.length ? (
                      <>
                        <h3 className="mt-8 text-lg font-semibold text-slate-950 dark:text-white">Kiedy nie ma zastosowania</h3>
                        <ul className="mt-3 space-y-3">
                          {commentary.doesNotApply.map((item) => (
                            <li key={item} className="flex gap-3 text-[16px] leading-7 text-slate-700 dark:text-slate-300">
                              <XCircle className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </SectionCard>

                  <SectionCard id="przyklady" title="Przykłady z praktyki">
                    <div className="grid gap-4 md:grid-cols-2">
                      {commentary.examples.map((example) => (
                        <div key={example.title} className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
                          <h3 className="font-semibold text-slate-950 dark:text-white">{example.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{example.body}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard id="bledy" title="Najczęstsze błędy">
                    <div className="space-y-4">
                      {commentary.mistakes.map((mistake) => (
                        <div key={mistake.title} className="rounded-2xl border border-rose-200/70 bg-rose-50/60 p-5 dark:border-rose-400/20 dark:bg-rose-400/[0.07]">
                          <h3 className="font-semibold text-slate-950 dark:text-white">{mistake.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{mistake.body}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard id="co-zrobic" title="Co spółka musi zrobić">
                    <ol className="list-decimal space-y-3 pl-6 text-[16px] leading-8 text-slate-700 marker:font-semibold marker:text-sky-600 dark:text-slate-300 dark:marker:text-sky-300">
                      {commentary.whatToDo.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </SectionCard>

                  <SectionCard id="dokumenty" title="Uchwały i dokumenty" icon={<FileText className="h-6 w-6 text-sky-600 dark:text-sky-300" />}>
                    <div className="grid gap-3 md:grid-cols-2">
                      {commentary.documents.map((doc) => {
                        const inner = (
                          <>
                            <div className="font-semibold text-slate-950 dark:text-white">{doc.label}</div>
                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{doc.description}</p>
                          </>
                        );
                        return doc.href ? (
                          <Link key={doc.label} href={doc.href} className="rounded-2xl border border-black/10 bg-white p-4 transition hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.03]">
                            {inner}
                          </Link>
                        ) : (
                          <div key={doc.label} className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]">
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </SectionCard>

                  {commentary.caseLaw?.length ? (
                    <SectionCard id="orzecznictwo" title="Orzecznictwo" icon={<Gavel className="h-6 w-6 text-sky-600 dark:text-sky-300" />}>
                      <div className="space-y-3">
                        {commentary.caseLaw.map((ruling) => (
                          <div key={ruling.signature} className="rounded-2xl border border-black/10 p-4 text-sm leading-7 dark:border-white/10">
                            <div className="font-semibold text-slate-950 dark:text-white">
                              {ruling.court}, {formatWikiDate(ruling.date)}, {ruling.signature}
                            </div>
                            <p className="mt-1 text-slate-600 dark:text-slate-300">{ruling.holding}</p>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  ) : null}

                  {commentary.faq.length ? (
                    <SectionCard id="faq" title="Najczęstsze pytania">
                      <div className="space-y-4">
                        {commentary.faq.map((item) => (
                          <div key={item.question} className="rounded-2xl border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                            <h3 className="font-semibold text-slate-950 dark:text-white">{item.question}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  ) : null}
                </>
              ) : (
                <div className="mt-10 rounded-[24px] border border-black/10 bg-black/[0.02] p-5 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                  Komentarz do tego przepisu jest w przygotowaniu. Praktyczne omówienie znajdziesz w poradnikach, które się do niego
                  odwołują{citingGuides.length ? ' — lista obok' : ''}.
                </div>
              )}

              <p className="mt-12 border-t border-black/5 pt-6 text-xs leading-6 text-slate-500 dark:border-white/10 dark:text-slate-400">
                Treść przepisu pochodzi z tekstu jednolitego ogłoszonego w {statute.consolidatedText.citation} ({statute.consolidatedText.title}),
                z uwzględnieniem zmian śledzonych po jego ogłoszeniu. Omówienie ma charakter informacyjny i nie stanowi porady prawnej.
              </p>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                <h2 className="mb-4 text-lg font-semibold">Źródło</h2>
                <div className="space-y-3 text-sm">
                  <a href={statute.consolidatedText.isapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 transition-colors hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.03]">
                    <span>Tekst jednolity – {statute.consolidatedText.citation}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                  <a href={statute.act.isapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 transition-colors hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.03]">
                    <span>Kodeks spółek handlowych w ISAP (historia zmian)</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                </div>
              </section>

              {citingGuides.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-lg font-semibold">Poradniki o tym przepisie</h2>
                  <div className="mt-4 space-y-2">
                    {citingGuides.slice(0, 8).map((guide) => (
                      <Link key={guide.slug} href={`/poradnik/${guide.slug}/`} className="block rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm transition hover:border-sky-500/30 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.03] dark:hover:text-sky-300">
                        {guide.title}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {related.length ? (
                <section className="rounded-[28px] border border-black/10 bg-white/88 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-lg font-semibold">Powiązane przepisy KSH</h2>
                  <div className="mt-4 space-y-2">
                    {related.map((item) => (
                      <Link key={item.number} href={item.path} className="flex items-baseline gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm transition hover:border-sky-500/30 dark:border-white/10 dark:bg-white/[0.03]">
                        <span className="shrink-0 font-semibold text-slate-950 dark:text-white">Art. {formatKshNumber(item.number)}</span>
                        <span className="text-slate-600 dark:text-slate-300">{item.shortTitle}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-[28px] border border-black/10 bg-black/[0.03] p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Uchwały i decyzje spółki w jednym miejscu</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {commentary?.appActions[0]?.description ??
                    'KsięgaI prowadzi rejestr uchwał i decyzji spółki i łączy je z umowami oraz księgowością.'}
                </p>
                <Link
                  href={commentary?.appActions[0]?.href ?? '/rejestracja/'}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  {commentary?.appActions[0]?.label ?? 'Załóż konto w KsięgaI'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
