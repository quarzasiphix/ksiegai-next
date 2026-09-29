import { getAmendmentsForArticle } from '@/lib/ksh/amendments';
import { getAllKshPages, getKshCitingGuides, getKshPage, KSH_SITE_URL, type KshPage } from '@/lib/ksh/registry';
import { blocksToPlainText, formatKshNumber, getKshStatute } from '@/lib/ksh/statute';
import type { KshBlock, KshUnit } from '@/lib/ksh/types';

/**
 * Versioned, static JSON contract consumed by other KsięgaI surfaces (ksef-ai
 * <KshRef/>, ksiegai-mcp). Generated at build time — no runtime server.
 *
 *   /poradnik/ksh/data/v1/index.json     — all articles that have pages
 *   /poradnik/ksh/data/v1/art-210.json   — one article: wording, summary, amendments
 *
 * Breaking changes go to /v2/; v1 keeps its shape.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getAllKshPages();
  return [{ file: 'index.json' }, ...pages.map((page) => ({ file: `art-${page.number}.json` }))];
}

function paragraphs(blocks: KshBlock[]) {
  const paras = blocks
    .filter((block): block is KshUnit => block.type === 'para')
    .map((para) => ({ symbol: para.symbol as string | null, label: `§ ${para.label}` as string | null, text: blocksToPlainText(para.content) }));
  // Articles without § (e.g. art. 228) are exposed as one pseudo-paragraph.
  return paras.length ? paras : [{ symbol: null, label: null, text: blocksToPlainText(blocks) }];
}

function summaryOf(page: KshPage) {
  return {
    number: page.number,
    label: `Art. ${formatKshNumber(page.number)} KSH`,
    tier: page.tier,
    title: page.title,
    shortTitle: page.shortTitle,
    url: `${KSH_SITE_URL}${page.path}`,
    summary: page.commentary?.summary ?? null,
  };
}

export async function GET(_request: Request, { params }: { params: { file: string } }) {
  const statute = getKshStatute();
  const source = {
    act: statute.act.title,
    consolidatedText: statute.consolidatedText.citation,
    isapUrl: statute.consolidatedText.isapUrl,
  };

  if (params.file === 'index.json') {
    const pages = await getAllKshPages();
    return Response.json({ version: 1, generatedAt: new Date().toISOString(), source, articles: pages.map(summaryOf) });
  }

  const number = params.file.match(/^art-(\d+(?:-\d+)?)\.json$/)?.[1];
  const page = number ? await getKshPage(number) : null;
  if (!page) return new Response('Not found', { status: 404 });

  const guides = await getKshCitingGuides(page.number);
  return Response.json({
    version: 1,
    generatedAt: new Date().toISOString(),
    source,
    ...summaryOf(page),
    keyTakeaway: page.commentary?.keyTakeaway ?? null,
    paragraphs: paragraphs(page.statute.content),
    footnotes: page.statute.footnotes,
    amendments: getAmendmentsForArticle(page.number).map(({ eli, citation, effectiveFrom, note, status }) => ({
      eli,
      citation,
      effectiveFrom,
      note,
      status,
    })),
    lastVerifiedAt: page.commentary?.verification.lastVerifiedAt ?? null,
    guides: guides.slice(0, 5).map((guide) => ({ title: guide.title, url: `${KSH_SITE_URL}/poradnik/${guide.slug}/` })),
  });
}
