#!/usr/bin/env node
/**
 * KSH statute ingest.
 *
 * Downloads the official consolidated text (tekst jednolity) of the Kodeks
 * spółek handlowych from the Sejm ELI API and writes a structured snapshot to
 * data/ksh/statute.json. The snapshot is GENERATED — never edit it by hand.
 * Amendments published after the consolidated text are tracked separately in
 * lib/ksh/amendments.ts and applied as reviewed article versions.
 *
 * Usage:
 *   node scripts/ksh/ingest-ksh.mjs                 # fetch from api.sejm.gov.pl
 *   node scripts/ksh/ingest-ksh.mjs --html file.html  # parse a local copy
 *
 * No dependencies: the ELI HTML is regular enough for a tiny tag-stack parser.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT_FILE = resolve(ROOT, 'data/ksh/statute.json');

// Base act and the consolidated text this snapshot is built from.
const BASE_ACT = { eli: 'DU/2000/1037', isapId: 'WDU20000941037' };
const CONSOLIDATED = { eli: 'DU/2024/18', isapId: 'WDU20240000018' };
const ELI_API = 'https://api.sejm.gov.pl/eli/acts';

// ─── Tiny HTML → tree parser ────────────────────────────────────────────────

const VOID_TAGS = new Set(['meta', 'link', 'br', 'img', 'hr', 'input', 'col', 'wbr']);

function parseAttrs(raw) {
  const attrs = {};
  for (const m of raw.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return attrs;
}

function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?)>|([^<]+)/gi;
  for (const m of html.matchAll(re)) {
    if (m[5] !== undefined) {
      stack[stack.length - 1].children.push({ tag: '#text', text: m[5] });
      continue;
    }
    if (!m[2]) continue; // comment / doctype
    const tag = m[2].toLowerCase();
    if (m[1]) {
      // closing tag: pop up to the matching element (tolerates stray tags)
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
      continue;
    }
    const el = { tag, attrs: parseAttrs(m[3]), children: [] };
    stack[stack.length - 1].children.push(el);
    if (!VOID_TAGS.has(tag) && !m[4]) stack.push(el);
  }
  return root;
}

const hasClass = (el, cls) => (el.attrs?.class ?? '').split(/\s+/).includes(cls);

function findById(node, id) {
  if (node.attrs?.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findById(child, id);
    if (found) return found;
  }
  return null;
}

// ─── Text extraction ────────────────────────────────────────────────────────

const SUPERSCRIPT = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const toSuperscript = (s) => s.replace(/\d/g, (d) => SUPERSCRIPT[d]);

const ENTITIES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", ndash: '–', mdash: '—' };
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

const clean = (s) => decodeEntities(s).replace(/\s+/g, ' ').trim();

/**
 * Flattens an element to text. <sup> becomes Unicode superscript; footnote
 * tooltips (gloss links) are removed from the text and collected separately.
 */
function textOf(el, footnotes) {
  if (el.tag === '#text') return el.text;
  if (el.tag === 'a' && hasClass(el, 'gloss-link')) {
    const inner = findFirst(el, (n) => hasClass(n, 'pro-gloss-inner'));
    if (inner && footnotes) {
      const text = clean(textOf(inner, null));
      if (text && !footnotes.includes(text)) footnotes.push(text);
    }
    return '';
  }
  const inner = el.children.map((c) => textOf(c, footnotes)).join('');
  return el.tag === 'sup' ? toSuperscript(decodeEntities(inner).trim()) : inner;
}

function findFirst(node, pred) {
  for (const child of node.children ?? []) {
    if (child.tag !== '#text' && pred(child)) return child;
    const found = child.children ? findFirst(child, pred) : null;
    if (found) return found;
  }
  return null;
}

// ─── Unit walker ────────────────────────────────────────────────────────────

const UNIT_KINDS = ['titl', 'bran', 'chpt', 'schp', 'arti', 'para', 'pint', 'lett', 'tire', 'pass'];

function unitKind(el) {
  if (el.tag !== 'div' || !hasClass(el, 'unit')) return null;
  for (const kind of UNIT_KINDS) if (hasClass(el, `unit_${kind}`)) return kind;
  return 'other';
}

/** "arti_300_1" → "300-1"; "para_1_1" → "1-1"; "lett_a" → "a" */
const symbolFromDataId = (dataId) => (dataId ?? '').replace(/^[a-z]+_/, '').replace(/_/g, '-');

/** "300-1" → "300¹"; "1-1" → "1¹" */
const displaySymbol = (symbol) => symbol.replace(/-(\d+)/g, (_, d) => toSuperscript(d));

/**
 * Walks an article/§/point subtree into ordered blocks. A unit's own sentence
 * lives in `xText` divs inside `.unit-inner`; nested units follow, and trailing
 * text (e.g. "– w terminie …" after a list) is kept in document order.
 */
function walkUnit(el, footnotes) {
  const kind = unitKind(el);
  const symbol = symbolFromDataId(el.attrs['data-id']);
  const inner = el.children.find((c) => c.tag === 'div' && hasClass(c, 'unit-inner'));
  const heading = el.children.find((c) => c.tag === 'h3');
  // Footnotes attached to the unit label (e.g. TK annotations on "§ 1").
  if (heading) textOf(heading, footnotes);

  const content = [];
  for (const child of inner?.children ?? []) {
    if (child.tag === '#text') continue;
    if (child.attrs?.['data-template'] === 'xText' || child.attrs?.['data-template'] === 'xEnum') {
      const text = clean(textOf(child, footnotes));
      if (text) content.push({ type: 'text', text });
      continue;
    }
    if (unitKind(child)) {
      content.push(walkUnit(child, footnotes));
    }
  }
  return { type: kind, symbol, label: displaySymbol(symbol), content };
}

function headingOf(el) {
  const h3 = el.children.find((c) => c.tag === 'h3');
  if (!h3) return { label: '', title: '' };
  const ps = h3.children.filter((c) => c.tag === 'p');
  if (ps.length >= 2) return { label: clean(textOf(ps[0], null)), title: clean(textOf(ps[1], null)) };
  return { label: clean(textOf(h3, null)), title: '' };
}

function plainText(unit) {
  return unit.content
    .map((b) => (b.type === 'text' ? b.text : plainText(b)))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function collect(root) {
  const structure = [];
  const articles = {};
  const order = [];

  const visit = (el, path) => {
    for (const child of el.children ?? []) {
      if (child.tag === '#text') continue;
      const kind = unitKind(child);
      if (kind === 'arti') {
        const footnotes = [];
        const unit = walkUnit(child, footnotes);
        const text = plainText(unit);
        const key = unit.symbol;
        if (articles[key]) throw new Error(`Duplicate article ${key}`);
        articles[key] = {
          number: key,
          label: `Art. ${unit.label}`,
          slug: `art-${key}`,
          eliUnitId: child.attrs.id,
          path,
          repealed: /^\(uchylony\)$/i.test(text),
          content: unit.content,
          footnotes,
          textSha256: createHash('sha256').update(text).digest('hex'),
        };
        order.push(key);
        continue;
      }
      if (kind && ['titl', 'bran', 'chpt', 'schp'].includes(kind)) {
        const { label, title } = headingOf(child);
        structure.push({ id: child.attrs.id, kind, label, title, parent: path[path.length - 1] ?? null });
        const inner = child.children.find((c) => c.tag === 'div' && hasClass(c, 'unit-inner'));
        visit(inner ?? child, [...path, child.attrs.id]);
        continue;
      }
      visit(child, path);
    }
  };

  visit(root, []);
  return { structure, articles, order };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const htmlArg = process.argv.indexOf('--html');
  let html;
  if (htmlArg !== -1) {
    html = readFileSync(process.argv[htmlArg + 1], 'utf8');
  } else {
    const res = await fetch(`${ELI_API}/${CONSOLIDATED.eli}/text.html`);
    if (!res.ok) throw new Error(`ELI text fetch failed: HTTP ${res.status}`);
    html = await res.text();
  }

  const [baseMeta, consolidatedMeta] = await Promise.all([
    fetchJson(`${ELI_API}/${BASE_ACT.eli}`),
    fetchJson(`${ELI_API}/${CONSOLIDATED.eli}`),
  ]);

  const tree = parseHtml(html);
  const body = findById(tree, 'part_2');
  if (!body) throw new Error('Consolidated text body (#part_2) not found — ELI HTML layout changed?');

  const { structure, articles, order } = collect(body);
  if (order.length < 900) throw new Error(`Only ${order.length} articles parsed — refusing to write a partial snapshot.`);

  const amendingActs = (baseMeta.references?.['Akty zmieniające'] ?? [])
    .map((ref) => ({ eli: ref.id, date: ref.date }))
    .sort((a, b) => a.eli.localeCompare(b.eli, 'en', { numeric: true }));

  const snapshot = {
    generatedBy: 'scripts/ksh/ingest-ksh.mjs',
    generatedAt: new Date().toISOString(),
    act: {
      name: 'Kodeks spółek handlowych',
      shortName: 'KSH',
      title: baseMeta.title,
      eli: BASE_ACT.eli,
      isapUrl: `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=${BASE_ACT.isapId}`,
      inForce: baseMeta.inForce,
      eliChangeDate: baseMeta.changeDate,
    },
    consolidatedText: {
      eli: CONSOLIDATED.eli,
      citation: 'Dz.U. 2024 poz. 18',
      title: consolidatedMeta.title,
      announcementDate: consolidatedMeta.announcementDate,
      isapUrl: `https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=${CONSOLIDATED.isapId}`,
      sourceSha256: createHash('sha256').update(html).digest('hex'),
    },
    // Full amending-act list as seen by ELI at ingest time. lib/ksh/amendments.ts
    // must account for every act not included in the consolidated text.
    amendingActsSeen: amendingActs,
    structure,
    order,
    articles,
  };

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(snapshot));
  console.log(`[ksh] ${order.length} articles, ${structure.length} structural units → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error('[ksh] ingest failed:', err.message);
  process.exit(1);
});
