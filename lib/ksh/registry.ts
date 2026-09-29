import 'server-only';
import { getWikiArticleTextIndex } from '@/lib/wiki';
import { getAmendmentsForArticle } from './amendments';
import { collectCitedArticles, linkKshCitations } from './citations';
import { KSH_COMMENTARIES } from './commentary';
import { formatKshNumber, getArticleLocation, getKshStatute, getStatuteArticle, getStatuteCrossReferences } from './statute';
import { KSH_ARTICLE_TOPICS } from './topics';
import type { KshCommentary, KshStatuteArticle, KshTier } from './types';

export const KSH_BASE_PATH = '/poradnik/ksh';
export const KSH_SITE_URL = 'https://www.ksiegai.pl';

export type KshPage = {
  number: string;
  tier: KshTier;
  statute: KshStatuteArticle;
  commentary: KshCommentary | null;
  /** "Art. 210 KSH – umowa między spółką a członkiem zarządu" / "Art. 201 KSH – Zarząd". */
  title: string;
  /** Short label for chips/lists: topic, or the Oddział/Rozdział title. */
  shortTitle: string;
  path: string;
};

export type KshCitingGuide = { slug: string; title: string; excerpt: string; count: number; pinned: boolean };

type Registry = {
  pages: Map<string, KshPage>;
  citedBy: Map<string, KshCitingGuide[]>;
};

export function kshArticlePath(number: string, paragraph?: string | null): string {
  return `${KSH_BASE_PATH}/art-${number}/${paragraph ? `#par-${paragraph}` : ''}`;
}

/** "art-210" → "210"; "art-300-1" → "300-1". */
export function kshNumberFromSlug(slug: string): string | null {
  const match = slug.match(/^art-(\d+(?:-\d+)?)$/);
  return match ? match[1] : null;
}

function structuralTitle(statute: KshStatuteArticle): string {
  const location = getArticleLocation(statute);
  // Deepest unit with a title (Oddział → Rozdział → Dział).
  for (let i = location.length - 1; i >= 0; i--) {
    if (location[i].title) return location[i].title;
  }
  return 'Kodeks spółek handlowych';
}

function buildPage(statute: KshStatuteArticle, commentary: KshCommentary | null): KshPage {
  const label = `Art. ${formatKshNumber(statute.number)} KSH`;
  const shortTitle = commentary?.topic ?? KSH_ARTICLE_TOPICS[statute.number] ?? structuralTitle(statute);
  return {
    number: statute.number,
    tier: commentary?.tier ?? 'B',
    statute,
    commentary,
    title: commentary?.seoTitle ?? `${label} – ${shortTitle}`,
    shortTitle,
    path: kshArticlePath(statute.number),
  };
}

function assertCommentaryIsCurrent(commentary: KshCommentary, statute: KshStatuteArticle) {
  if (commentary.verification.statuteSha256 !== statute.textSha256) {
    throw new Error(
      `[ksh] Statute text of art. ${statute.number} changed since its commentary was verified ` +
        `(${commentary.verification.lastVerifiedAt}). Review lib/ksh/commentary and update verification.statuteSha256.`,
    );
  }
  const unhandled = getAmendmentsForArticle(statute.number).filter(
    (amendment) => amendment.status === 'pending' && amendment.effectiveFrom <= new Date().toISOString().slice(0, 10),
  );
  if (unhandled.length) {
    throw new Error(
      `[ksh] Art. ${statute.number}: amendment(s) ${unhandled.map((a) => a.eli).join(', ')} are now in force but still marked pending.`,
    );
  }
}

let registryPromise: Promise<Registry> | null = null;

/**
 * Pages exist for:
 *  - Tier A: every article with commentary (indexed),
 *  - Tier B: articles cited by poradniki, listed as related, or referenced in
 *    Tier A wording — so auto-links never hit a dead end (noindex until they
 *    get commentary).
 */
export function getKshRegistry(): Promise<Registry> {
  registryPromise ??= (async () => {
    const statute = getKshStatute();
    const pages = new Map<string, KshPage>();

    for (const commentary of KSH_COMMENTARIES) {
      const article = getStatuteArticle(commentary.article);
      if (!article) throw new Error(`[ksh] Commentary for missing article ${commentary.article}`);
      assertCommentaryIsCurrent(commentary, article);
      pages.set(article.number, buildPage(article, commentary));
    }

    const guides = await getWikiArticleTextIndex();
    const citedBy = new Map<string, KshCitingGuide[]>();
    for (const guide of guides) {
      for (const [number, { count }] of collectCitedArticles(guide.texts)) {
        if (!statute.articles[number]) continue;
        const list = citedBy.get(number) ?? [];
        list.push({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, count, pinned: false });
        citedBy.set(number, list);
      }
    }

    const tierB = new Set<string>(citedBy.keys());
    for (const commentary of KSH_COMMENTARIES) {
      commentary.relatedArticles.forEach((number) => tierB.add(number));
      getStatuteCrossReferences(statute.articles[commentary.article]).forEach((number) => tierB.add(number));
    }
    for (const number of tierB) {
      const article = statute.articles[number];
      if (!article || article.repealed || pages.has(number)) continue;
      pages.set(number, buildPage(article, null));
    }

    // Pinned guides first, then by citation count.
    for (const page of pages.values()) {
      const pinned = page.commentary?.relatedGuides ?? [];
      const auto = citedBy.get(page.number) ?? [];
      const merged: KshCitingGuide[] = [];
      for (const slug of pinned) {
        const guide = guides.find((item) => item.slug === slug);
        if (guide) {
          const count = auto.find((item) => item.slug === slug)?.count ?? 0;
          merged.push({ slug, title: guide.title, excerpt: guide.excerpt, count, pinned: true });
        }
      }
      for (const guide of [...auto].sort((a, b) => b.count - a.count)) {
        if (!merged.some((item) => item.slug === guide.slug)) merged.push(guide);
      }
      citedBy.set(page.number, merged);
    }

    return { pages, citedBy };
  })();
  return registryPromise;
}

export async function getKshPage(number: string): Promise<KshPage | null> {
  return (await getKshRegistry()).pages.get(number) ?? null;
}

export async function getAllKshPages(): Promise<KshPage[]> {
  const { pages } = await getKshRegistry();
  const order = getKshStatute().order;
  return [...pages.values()].sort((a, b) => order.indexOf(a.number) - order.indexOf(b.number));
}

export async function getKshCitingGuides(number: string): Promise<KshCitingGuide[]> {
  return (await getKshRegistry()).citedBy.get(number) ?? [];
}

/**
 * Related KSH pages: manual list, then references inside the statute text,
 * then neighbours in the same Oddział/Rozdział — only articles that have pages.
 */
export async function getRelatedKshPages(page: KshPage, limit = 8): Promise<KshPage[]> {
  const { pages } = await getKshRegistry();
  const statute = getKshStatute();
  const candidates = [
    ...(page.commentary?.relatedArticles ?? []),
    ...getStatuteCrossReferences(page.statute),
  ];
  const parent = page.statute.path[page.statute.path.length - 1];
  const index = statute.order.indexOf(page.number);
  for (const offset of [1, -1, 2, -2, 3, -3]) {
    const neighbour = statute.articles[statute.order[index + offset]];
    if (neighbour && neighbour.path[neighbour.path.length - 1] === parent) candidates.push(neighbour.number);
  }
  const seen = new Set<string>([page.number]);
  const result: KshPage[] = [];
  for (const number of candidates) {
    const related = pages.get(number);
    if (!related || seen.has(number)) continue;
    seen.add(number);
    result.push(related);
    if (result.length >= limit) break;
  }
  return result;
}

/** KSH pages cited by a poradnik — for the "Przepisy w tym poradniku" box. */
export async function getKshPagesCitedIn(texts: string[]): Promise<{ page: KshPage; count: number }[]> {
  const { pages } = await getKshRegistry();
  return [...collectCitedArticles(texts)]
    .map(([number, { count }]) => ({ page: pages.get(number), count }))
    .filter((item): item is { page: KshPage; count: number } => Boolean(item.page))
    .sort((a, b) => b.count - a.count);
}

/** Auto-links KSH citations in poradnik/commentary markdown. */
export async function linkKshMarkdown(markdown: string, excludeArticle?: string): Promise<string> {
  const { pages } = await getKshRegistry();
  return linkKshCitations(markdown, {
    isLinkable: (number) => pages.has(number),
    hrefFor: (number, paragraph) => {
      const statute = pages.get(number)?.statute;
      const hasParagraph = paragraph && statute?.content.some((b) => b.type === 'para' && b.symbol === paragraph);
      return kshArticlePath(number, hasParagraph ? paragraph : null);
    },
    excludeArticle,
  });
}
