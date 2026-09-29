import type { KshAmendment } from './types';

/**
 * Acts that changed KSH AFTER the consolidated text in data/ksh/statute.json
 * (Dz.U. 2024 poz. 18 — covers changes published before 5.12.2023).
 *
 * Every act listed by ELI as amending KSH that is newer than the consolidated
 * text MUST appear here — lib/ksh/statute.ts fails the build otherwise. When a
 * `pending` act comes into force, either re-run the ingest on a newer
 * consolidated text, or add reviewed versions for the affected articles and
 * mark the act `applied`.
 *
 * Verified against the Dziennik Ustaw PDFs on 2026-09-29.
 */
export const KSH_AMENDMENTS: KshAmendment[] = [
  {
    eli: 'DU/2024/96',
    citation: 'Dz.U. 2024 poz. 96',
    title: 'Wyrok Trybunału Konstytucyjnego z dnia 18 stycznia 2024 r., sygn. akt K 29/23',
    kind: 'constitutional-tribunal',
    effectiveFrom: '2024-01-26',
    articles: ['459', '460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '475', '476', '477', '478'],
    note:
      'Wyrok TK dotyczy wyłącznie stosowania przepisów o rozwiązaniu i likwidacji spółki akcyjnej do spółek publicznej radiofonii i telewizji. Nie zmienia brzmienia przepisów.',
    status: 'annotation',
  },
  {
    eli: 'DU/2026/176',
    citation: 'Dz.U. 2026 poz. 176',
    title: 'Ustawa z dnia 23 stycznia 2026 r. o zmianie ustawy – Kodeks spółek handlowych oraz niektórych innych ustaw',
    kind: 'statute',
    effectiveFrom: '2027-02-18',
    articles: [
      '130', '300-32', '300-33', '300-34', '300-35', '300-37', '304',
      '328-2', '328-3', '328-4', '328-5', '328-8', '328-9', '328-11', '328-13',
      '334', '337', '351', '352', '356', '361', '402-2', '406-1', '432', '434', '453', '476',
      '592', '593', '594',
    ],
    note:
      'Nowelizacja dotyczy głównie rejestru akcjonariuszy, akcji spółek akcyjnych, prostych spółek akcyjnych i komandytowo-akcyjnych.',
    status: 'pending',
  },
  {
    eli: 'DU/2026/187',
    citation: 'Dz.U. 2026 poz. 187',
    title: 'Ustawa z dnia 23 stycznia 2026 r. o zawodzie psychologa oraz samorządzie zawodowym psychologów',
    kind: 'statute',
    effectiveFrom: '2028-05-19',
    articles: ['88'],
    note: 'Nowe brzmienie art. 88 (katalog zawodów wspólników spółki partnerskiej — m.in. psycholog).',
    status: 'pending',
  },
  {
    eli: 'DU/2026/644',
    citation: 'Dz.U. 2026 poz. 644',
    title:
      'Ustawa z dnia 17 kwietnia 2026 r. o zmianie niektórych ustaw w związku z przekazywaniem informacji do europejskiego pojedynczego punktu dostępu',
    kind: 'statute',
    effectiveFrom: '2030-01-10',
    articles: ['402-7'],
    note: 'Dodaje art. 402⁷ (obowiązki informacyjne doradcy akcjonariusza do spraw głosowania).',
    status: 'pending',
  },
];

/**
 * Amending acts that ELI lists but that are already included in the
 * consolidated text (published before 5.12.2023). Anything in
 * `amendingActsSeen` not in this set nor in KSH_AMENDMENTS is unaccounted.
 */
export function isIncludedInConsolidatedText(eli: string): boolean {
  // The obwieszczenie covers acts published before 5.12.2023; the last 2023
  // amending acts ELI lists (poz. 739, 825, 1705) are all named in it.
  // Anything from 2024 onwards must be tracked in KSH_AMENDMENTS.
  return Number(eli.split('/')[1]) < 2024;
}

export function getAmendmentsForArticle(article: string): KshAmendment[] {
  return KSH_AMENDMENTS.filter((amendment) => amendment.articles.includes(article));
}
