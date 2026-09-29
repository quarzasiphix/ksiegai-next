#!/usr/bin/env node
/**
 * KSH amendment watcher.
 *
 * Compares the live Sejm ELI record for the Kodeks spółek handlowych with what
 * this repo knows about (data/ksh/statute.json + lib/ksh/amendments.ts) and
 * exits non-zero when:
 *   - ELI lists an amending act that is neither in the consolidated text nor
 *     tracked in lib/ksh/amendments.ts,
 *   - a newer consolidated text (tekst jednolity) has been announced,
 *   - a tracked `pending` amendment is already in force.
 *
 * Run manually or on a schedule: `npm run ksh:check`. Network only — never
 * part of `next build`.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const snapshot = JSON.parse(readFileSync(resolve(ROOT, 'data/ksh/statute.json'), 'utf8'));
const amendmentsSource = readFileSync(resolve(ROOT, 'lib/ksh/amendments.ts'), 'utf8');

// Lightweight parse of the tracked list — eli / effectiveFrom / status triples.
const tracked = [...amendmentsSource.matchAll(/eli: '([^']+)'[\s\S]*?effectiveFrom: '([^']+)'[\s\S]*?status: '([^']+)'/g)].map(
  ([, eli, effectiveFrom, status]) => ({ eli, effectiveFrom, status }),
);
const trackedIds = new Set(tracked.map((item) => item.eli));
const inConsolidated = (eli) => Number(eli.split('/')[1]) < 2024;

const res = await fetch(`https://api.sejm.gov.pl/eli/acts/${snapshot.act.eli}`);
if (!res.ok) {
  console.error(`[ksh] ELI request failed: HTTP ${res.status}`);
  process.exit(2);
}
const act = await res.json();
const problems = [];

const amending = act.references?.['Akty zmieniające'] ?? [];
for (const ref of amending) {
  if (!inConsolidated(ref.id) && !trackedIds.has(ref.id)) {
    problems.push(`New amending act not tracked: ${ref.id} (date ${ref.date}) — review and add to lib/ksh/amendments.ts`);
  }
}

const consolidated = (act.references?.['Inf. o tekście jednolitym'] ?? []).map((ref) => ref.id);
const newest = consolidated.sort((a, b) => a.localeCompare(b, 'en', { numeric: true })).at(-1);
if (newest && newest !== snapshot.consolidatedText.eli) {
  problems.push(`Newer consolidated text announced: ${newest} (snapshot uses ${snapshot.consolidatedText.eli}) — update CONSOLIDATED in scripts/ksh/ingest-ksh.mjs and re-run the ingest`);
}

const today = new Date().toISOString().slice(0, 10);
for (const item of tracked) {
  if (item.status === 'pending' && item.effectiveFrom <= today) {
    problems.push(`${item.eli} is in force since ${item.effectiveFrom} but still marked pending`);
  }
}

console.log(`[ksh] ELI changeDate: ${act.changeDate} · snapshot: ${snapshot.consolidatedText.citation} · tracked amendments: ${tracked.length}`);
if (problems.length) {
  for (const problem of problems) console.error(`[ksh] ✗ ${problem}`);
  process.exit(1);
}
console.log('[ksh] ✓ statute snapshot and amendment tracking are up to date');
