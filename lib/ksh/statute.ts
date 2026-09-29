import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isIncludedInConsolidatedText, KSH_AMENDMENTS } from './amendments';
import type { KshBlock, KshStatuteArticle, KshStatuteSnapshot, KshStructureUnit } from './types';

/**
 * Read at build time with fs (not `import`) so the 1.2 MB snapshot can never
 * end up in a client bundle and does not slow down type-checking.
 */
let cached: KshStatuteSnapshot | null = null;

export function getKshStatute(): KshStatuteSnapshot {
  if (cached) return cached;
  const raw = readFileSync(join(process.cwd(), 'data/ksh/statute.json'), 'utf8');
  const snapshot = JSON.parse(raw) as KshStatuteSnapshot;
  assertAmendmentsAccountedFor(snapshot);
  cached = snapshot;
  return snapshot;
}

/**
 * Guard against silently showing outdated law: every amending act ELI knew
 * about at ingest time must either be part of the consolidated text or be
 * tracked in lib/ksh/amendments.ts.
 */
function assertAmendmentsAccountedFor(snapshot: KshStatuteSnapshot) {
  const tracked = new Set(KSH_AMENDMENTS.map((amendment) => amendment.eli));
  const unaccounted = snapshot.amendingActsSeen.filter(
    (act) => !isIncludedInConsolidatedText(act.eli) && !tracked.has(act.eli),
  );
  if (unaccounted.length) {
    throw new Error(
      `[ksh] Amending acts not tracked in lib/ksh/amendments.ts: ${unaccounted
        .map((act) => act.eli)
        .join(', ')}. Review them before building.`,
    );
  }
}

export function getStatuteArticle(number: string): KshStatuteArticle | null {
  return getKshStatute().articles[number] ?? null;
}

const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };

/** "300-1" → "300¹" */
export function formatKshNumber(number: string): string {
  return number.replace(/-(\d+)/g, (_, digits: string) => digits.replace(/\d/g, (d) => SUPERSCRIPT[d]));
}

export function blocksToPlainText(blocks: KshBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'text') return block.text;
      const prefix = block.type === 'para' ? `§ ${block.label}. ` : block.type === 'tire' ? '– ' : `${block.label}) `;
      return prefix + blocksToPlainText(block.content);
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Tytuł → Dział → Rozdział → Oddział for breadcrumbs and the hub grouping. */
export function getArticleLocation(article: KshStatuteArticle): KshStructureUnit[] {
  const byId = new Map(getKshStatute().structure.map((unit) => [unit.id, unit]));
  return article.path.map((id) => byId.get(id)).filter((unit): unit is KshStructureUnit => Boolean(unit));
}

/** Paragraph symbols ("1", "1-1") that exist in an article — used to validate § anchors. */
export function getParagraphSymbols(article: KshStatuteArticle): string[] {
  return article.content.filter((block) => block.type === 'para').map((block) => (block as { symbol: string }).symbol);
}

/**
 * KSH articles referenced inside an article's own wording ("o którym mowa w
 * art. 173 § 1"). References followed by another act's name are skipped.
 */
export function getStatuteCrossReferences(article: KshStatuteArticle): string[] {
  const text = blocksToPlainText(article.content);
  const found = new Set<string>();
  const re = /\bart\.\s*(\d+)([¹²³⁴⁵⁶⁷⁸⁹⁰]*)(?:\s*§\s*\d+[¹²³⁴⁵⁶⁷⁸⁹⁰]*)?(?:\s*pkt\s*\d+)?(?![^.;]{0,40}?\b(?:ustawy|Kodeksu cywilnego|k\.c\.|rozporządzenia|dyrektywy))/g;
  const fromSuper: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  for (const match of text.matchAll(re)) {
    const sup = [...match[2]].map((c) => fromSuper[c]).join('');
    const number = sup ? `${match[1]}-${sup}` : match[1];
    if (number !== article.number && getKshStatute().articles[number]) found.add(number);
  }
  return [...found];
}
