/**
 * Citation parser regression tests. Run: `npm run ksh:test`
 * (Node ≥ 22 — uses --experimental-strip-types, no test framework needed).
 */
import assert from 'node:assert/strict';
import { findKshCitations, linkKshCitations } from '../../lib/ksh/citations.ts';

const cases: [string, [string[], string | null][]][] = [
  ['zgodnie z art. 210 KSH umowę podpisuje pełnomocnik', [[['210'], null]]],
  ['Art. 210 § 2 KSH wymaga formy aktu notarialnego', [[['210'], '2']]],
  ['art. 210 § 1¹ KSH', [[['210'], '1-1']]],
  ['art. 300¹ KSH', [[['300-1'], null]]],
  ['art. 177–179 KSH', [[['177', '178', '179'], null]]],
  ['art. 210 i 211 KSH', [[['210', '211'], null]]],
  ['art. 228 pkt 3 KSH', [[['228'], null]]],
  ['KSH art. 210', [[['210'], null]]],
  ['art. 551 § 5 Kodeksu spółek handlowych', [[['551'], '5']]],
  ['art. 210 k.s.h.', [[['210'], null]]],
  // Paragraph ranges stay within one article (regression: "§ 1–2" was read as art. 2).
  ['art. 17 § 1–2 KSH', [[['17'], '1']]],
  ['art. 208 § 5¹–5³ KSH', [[['208'], '5-1']]],
  // Not KSH: another act, or no act named at all.
  ['art. 43 § 1 ustawy z dnia 29 sierpnia 1997 r.', []],
  ['zgodnie z art. 210 umowy', []],
];

for (const [input, expected] of cases) {
  const actual = findKshCitations(input).map((c) => [c.articles, c.paragraph]);
  assert.deepEqual(actual, expected, `findKshCitations(${JSON.stringify(input)})`);
}

const linked = linkKshCitations(
  [
    '## Nagłówek z art. 210 KSH',
    '[Link o KSH art. 210](/poradnik/x) oraz art. 210 KSH i ponownie art. 210 KSH',
    '**Art. 17 § 1 KSH:** treść',
  ].join('\n'),
  { isLinkable: (n) => ['210', '17'].includes(n), hrefFor: (n, p) => `/poradnik/ksh/art-${n}/${p ? `#par-${p}` : ''}` },
);
assert.equal(
  linked,
  [
    '## Nagłówek z art. 210 KSH',
    '[Link o KSH art. 210](/poradnik/x) oraz [art. 210 KSH](/poradnik/ksh/art-210/) i ponownie art. 210 KSH',
    '**[Art. 17 § 1 KSH](/poradnik/ksh/art-17/#par-1):** treść',
  ].join('\n'),
);

console.log(`[ksh] citation tests passed (${cases.length + 1})`);
