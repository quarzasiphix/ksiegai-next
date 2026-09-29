/**
 * KSH citation detection and auto-linking.
 *
 * Pure, dependency-free module: no Next/React/fs imports, so it can be shared
 * with other apps (e.g. ksef-ai) as-is if they ever need to link citations.
 *
 * Recognised forms (case-insensitive act name):
 *   art. 210 KSH · Art. 210 § 2 KSH · art. 210 § 1¹ KSH · art. 228 pkt 3 KSH
 *   art. 177–179 KSH · art. 210 i 211 KSH · art. 201, 202 KSH
 *   KSH art. 210 · art. 551 § 5 Kodeksu spółek handlowych · art. 210 k.s.h.
 * A bare "art. 210" without the act name is never linked — it could be any act.
 */

const SUP_TO_DIGIT: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

const NUM = String.raw`\d+(?:[¹²³⁴⁵⁶⁷⁸⁹⁰]+|\^\d+)?`;
// "§ 2", and paragraph ranges "§ 1–2" / "§ 5¹–5³" (the range stays inside one article).
const PAR = String.raw`\s*§\s*(${NUM})(?:\s*[–—-]\s*${NUM})?`;
const TAIL = String.raw`(?:\s*(?:pkt|ust\.)\s*\d+[a-z]?)?`;
const ACT = String.raw`(?:KSH|k\.\s?s\.\s?h\.?|[Kk]odeksu spółek handlowych|[Kk]odeks spółek handlowych)`;
const MORE = String.raw`(?:\s*(?:[–—-]|,|\bi\b|\boraz\b)\s*(?:art\.\s*)?${NUM}(?:${PAR})?${TAIL})*`;

// art. N [§ P] [pkt X] [– M | , M | i M]* ACT
const FORWARD = new RegExp(String.raw`\b[Aa]rt(?:\.|ykuł(?:u|em)?)\s*(${NUM})(?:${PAR})?${TAIL}(${MORE})\s+${ACT}(?![\p{L}])`, 'gu');
// KSH art. N [§ P]
const INVERTED = new RegExp(String.raw`\bKSH\s+art\.\s*(${NUM})(?:${PAR})?${TAIL}`, 'gu');

/** "300¹" | "300^1" → "300-1" (statute machine form); "210" → "210". */
export function normalizeKshNumber(raw: string): string {
  const caret = raw.match(/^(\d+)\^(\d+)$/);
  if (caret) return `${caret[1]}-${caret[2]}`;
  const sup = raw.match(/^(\d+)([¹²³⁴⁵⁶⁷⁸⁹⁰]+)$/);
  if (sup) return `${sup[1]}-${[...sup[2]].map((c) => SUP_TO_DIGIT[c]).join('')}`;
  return raw;
}

export type KshCitation = {
  start: number;
  end: number;
  raw: string;
  /** Machine article numbers, first one is the primary target. */
  articles: string[];
  /** Paragraph of the primary article, machine form ("1-1" for § 1¹). */
  paragraph: string | null;
};

/** Parses the "– 179", ", 202 i 203" tail; plain numeric ranges are expanded. */
function expandMore(first: string, more: string): string[] {
  const numbers: string[] = [];
  let previous = first;
  const re = new RegExp(String.raw`\s*([–—-]|,|\bi\b|\boraz\b)\s*(?:art\.\s*)?(${NUM})`, 'gu');
  for (const m of more.matchAll(re)) {
    const current = normalizeKshNumber(m[2]);
    const isRange = /[–—-]/.test(m[1]);
    if (isRange && /^\d+$/.test(previous) && /^\d+$/.test(current)) {
      const from = Number(previous);
      const to = Number(current);
      if (to > from && to - from <= 30) {
        for (let n = from + 1; n < to; n++) numbers.push(String(n));
      }
    }
    numbers.push(current);
    previous = current;
  }
  return numbers;
}

/** Finds KSH citations in plain text (does not know about markdown). */
export function findKshCitations(text: string): KshCitation[] {
  const citations: KshCitation[] = [];
  for (const m of text.matchAll(FORWARD)) {
    const primary = normalizeKshNumber(m[1]);
    citations.push({
      start: m.index!,
      end: m.index! + m[0].length,
      raw: m[0],
      articles: [primary, ...expandMore(primary, m[3] ?? '')],
      paragraph: m[2] ? normalizeKshNumber(m[2]) : null,
    });
  }
  for (const m of text.matchAll(INVERTED)) {
    const start = m.index!;
    if (citations.some((c) => start < c.end && c.start < start + m[0].length)) continue;
    citations.push({
      start,
      end: start + m[0].length,
      raw: m[0],
      articles: [normalizeKshNumber(m[1])],
      paragraph: m[2] ? normalizeKshNumber(m[2]) : null,
    });
  }
  return citations.sort((a, b) => a.start - b.start);
}

/** Article → how often it is cited and which paragraphs. For reverse indexes. */
export function collectCitedArticles(texts: string[]): Map<string, { count: number; paragraphs: Set<string> }> {
  const result = new Map<string, { count: number; paragraphs: Set<string> }>();
  for (const text of texts) {
    for (const citation of findKshCitations(text)) {
      citation.articles.forEach((number, index) => {
        const entry = result.get(number) ?? { count: 0, paragraphs: new Set<string>() };
        entry.count += 1;
        if (index === 0 && citation.paragraph) entry.paragraphs.add(citation.paragraph);
        result.set(number, entry);
      });
    }
  }
  return result;
}

export type LinkKshOptions = {
  /** Only these article numbers get links (pages that exist). */
  isLinkable: (number: string) => boolean;
  /** Builds the href; paragraph is the machine symbol or null. */
  hrefFor: (number: string, paragraph: string | null) => string;
  /** Don't link citations of this article (e.g. the KSH page itself). */
  excludeArticle?: string;
  /** Link only the first citation of each article (default true). */
  firstOnly?: boolean;
};

/**
 * Rewrites KSH citations in markdown into markdown links. Existing links,
 * inline code and heading lines are left untouched.
 */
export function linkKshCitations(markdown: string, options: LinkKshOptions): string {
  const firstOnly = options.firstOnly ?? true;
  const linked = new Set<string>();

  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*#{1,6}\s/.test(line)) return line;

      // Mask existing markdown links and inline code so we never nest links.
      const protectedRanges: [number, number][] = [];
      for (const m of line.matchAll(/\[[^\]]*\]\([^)]*\)|`[^`]*`/g)) {
        protectedRanges.push([m.index!, m.index! + m[0].length]);
      }

      let out = '';
      let cursor = 0;
      for (const citation of findKshCitations(line)) {
        if (protectedRanges.some(([s, e]) => citation.start < e && s < citation.end)) continue;
        const target = citation.articles.find((number) => options.isLinkable(number) && number !== options.excludeArticle);
        if (!target) continue;
        if (firstOnly && linked.has(target)) continue;
        linked.add(target);
        const paragraph = target === citation.articles[0] ? citation.paragraph : null;
        out += line.slice(cursor, citation.start) + `[${citation.raw}](${options.hrefFor(target, paragraph)})`;
        cursor = citation.end;
      }
      return out + line.slice(cursor);
    })
    .join('\n');
}
