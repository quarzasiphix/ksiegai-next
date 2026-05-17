# Notes
Created: legacy-existing (exact date unknown)
Last modified: 2026-05-17 12:28 CEST

## 2026-05-17 - Proxied PostHog through first-party Cloudflare Pages function path

What changed:
- Updated [components/PostHogProvider.tsx](/mnt/c/k/ksiegai-next/components/PostHogProvider.tsx) so deployed builds use the first-party `/ingest` path for PostHog instead of calling `https://eu.i.posthog.com` directly from the browser.
- Added [functions/ingest/[[path]].ts](/mnt/c/k/ksiegai-next/functions/ingest/[[path]].ts) as a Cloudflare Pages Function proxy that forwards `/ingest` and `/ingest/*` to the PostHog EU host.
- Restored [wrangler.jsonc](/mnt/c/k/ksiegai-next/wrangler.jsonc) to the normal Pages-oriented shape instead of the separate-Worker setup.
- The proxy strips `cookie`, `authorization`, `origin`, `referer`, and `host` headers before forwarding so first-party site credentials are not leaked upstream.

Why:
- production `ksiegai.pl` was still requesting PostHog assets and config from the third-party `eu.i.posthog.com` domain
- that is commonly blocked by browser privacy tooling and ad blockers
- this site is deployed through Cloudflare Pages, so the proxy must live in the Pages `functions/` surface instead of a separate Worker-only entrypoint
- routing analytics through the app's own domain makes delivery more reliable on Cloudflare without changing the rest of the static export architecture

Verification evidence (2026-05-17):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksiegai-next && npm run build` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-17 - Fixed poradnik static export crash for fallback categories

What changed:
- Updated [lib/wiki.ts](/mnt/c/k/ksiegai-next/lib/wiki.ts) so fallback wiki categories with non-UUID ids do not get passed into a UUID-only `category_id` database filter.
- Added a small UUID guard and skipped the DB category query when the category comes from fallback content like `fallback-compliance`.

Why:
- public poradnik fallback categories use ids like `fallback-compliance`
- export was crashing in `getWikiArticlesForCategory()` because Supabase/Postgres was receiving `.eq('category_id', 'fallback-compliance')`
- Postgres correctly rejected that with `invalid input syntax for type uuid`

Verification evidence (2026-05-17):
- `cd ksiegai-next && npm run build` -> passed
- this specifically clears the failing static export paths under:
  - `/poradnik/[slug]`
  - `/poradnik/kategoria/[slug]`

## 2026-05-17 - Disabled PostHog on local `ksiegai-next` hosts

What changed:
- Updated [components/PostHogProvider.tsx](/mnt/c/k/ksiegai-next/components/PostHogProvider.tsx) so PostHog only initializes when the browser is not on a loopback host.
- Added explicit local-host detection for:
  - `localhost`
  - `127.*`
  - `0.0.0.0`
  - `[::1]`
- When running on those local hosts, the provider now returns children without booting PostHog.

Why:
- `ksiegai-next` was still initializing PostHog on local `127.0.0.1`, which caused external `config.js` requests during dev even though analytics should stay off locally.

Verification evidence (2026-05-17):
- Regex sanity check confirmed:
  - `localhost` -> `true`
  - `127.0.0.1` -> `true`
  - `0.0.0.0` -> `true`
  - `[::1]` -> `true`
  - `example.com` -> `false`
- `cd ksiegai-next && npx tsc --noEmit --pretty false` did not complete in this environment, so typecheck is still pending.

## 2026-05-16 - Centralized public pricing values

What changed:
- Added `lib/pricing.ts` as the shared source for public JDG and Spółka Standard plan amounts.
- Updated `/cennik`, `/premium`, and `/regulamin` to read pricing copy from the shared module instead of repeating hardcoded numbers.
- Moved the `/cennik` plan cards and schema price onto the centralized values so public marketing copy and legal copy drift less easily.

Verification evidence (2026-05-16):
- `cd ksiegai-next && npx tsc --noEmit` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-16 - Public poradnik article routes and simplified homepage hero

What changed:
- Added public article pages at `/poradnik/[slug]` with server metadata, structured data, checklist sidebar, official links, and related article cards.
- Added public category pages at `/poradnik/kategoria/[slug]`.
- Extended `app/sitemap.ts` to include `/poradnik`, public wiki categories, and public wiki article URLs.
- Added fallback public wiki categories/articles in `lib/wiki-fallback.ts` for key SEO topics (`KSeF token`, `konto organizacji e-US`, `CRBR`, `e-Doręczenia`) so the poradnik works even when CMS rows are sparse.
- Added visible breadcrumb trails plus breadcrumb schema on public wiki article/category pages.
- Added visible FAQ sections on article pages when FAQ data exists.
- Added public `llms.txt`.
- Simplified the homepage hero by removing the client-side A/B hero/preload path and switching to one static message focused on KSeF + Stripe + checklist workflows.
- Reduced hero clutter by removing the third equal-weight CTA and replacing it with three compact proof cards.
- Added `Poradnik` to the footer and tightened SEO-facing copy on `/cennik` and `/poradnik` to mention KSeF and Stripe more explicitly.

Verification evidence (2026-05-16):
- `cd ksiegai-next && npx tsc --noEmit` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-09 - Token-based quick resume for saved `/logowanie` profiles

What changed:
- Added per-profile remembered session token storage alongside the existing remembered-profile list.
- `/logowanie` now tries direct session restore for the clicked profile before falling back to Google, magic-link, or password confirmation.
- `/auth/callback`, `/logowanie`, and the shared header auth listener now refresh the stored profile token whenever a session is created or refreshed.

Verification evidence (2026-05-09):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksiegai-next && npm run build` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-04 - Split local dev and export build output directories

What changed:
- Added `distDir: isDevCommand ? ".next-dev" : ".next"` in `next.config.js`.
- Local `next dev` now writes to `.next-dev`, while build/export keeps using `.next`.

Why:
- The app mixes two incompatible modes:
  - local dev server (`next dev`)
  - static export build for Cloudflare Pages (`next build` with `output: "export"`)
- Reusing the same `.next` directory let local runtime pick up stale export artifacts, which caused missing manifest errors such as `middleware-manifest.json`.

Verification evidence (2026-05-04):
- Config inspection confirms dev/build outputs are now separated by lifecycle event.

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-04 - Moved TypeScript build toolchain into production deps

What changed:
- Moved `typescript`, `@types/node`, `@types/react`, and `@types/react-dom` into `dependencies` in `package.json`.
- Refreshed `package-lock.json` so production-only installs use the same dependency split.

Verification evidence (2026-05-04):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `package-lock.json` root package entry now lists the TypeScript toolchain under `dependencies`

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-04 - Removed runtime `@/` imports from `ksiegai-next`

What changed:
- Replaced runtime `@/` path-alias imports across `app/`, `components/`, `hooks/`, and `lib/` with relative imports.
- Kept the same module graph and behavior; this is a build-compatibility change only.

Verification evidence (2026-05-04):
- `rg` scan across `app/`, `components/`, `hooks/`, and `lib/` found no remaining runtime `@/` imports.
- `cd ksiegai-next && npx tsc --noEmit` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-04 - Fixed Cloudflare build blockers in `ksiegai-next`

What changed:
- Moved `tailwindcss`, `postcss`, and `autoprefixer` into runtime `dependencies` in `package.json` so production-only installs still have the CSS toolchain that `next build` requires.
- Added `baseUrl: "."` to `tsconfig.json` so the existing `@/*` alias resolves reliably during Next builds.
- Resolved a leftover merge conflict in `app/sitemap.ts` by keeping both live public routes: `/generator-faktur` and `/darmowy-generator-faktur`.
- Refreshed `package-lock.json` after the dependency section change.

Verification evidence (2026-05-04):
- `cd ksiegai-next && npx tsc --noEmit` -> originally failed on merge conflict markers in `app/sitemap.ts`; passed after conflict cleanup.
- `cd ksiegai-next && npm run build` -> advanced past the earlier Tailwind/alias failures; local build now stops only on missing Linux SWC binary in this WSL workspace (`node_modules/@next` contains `swc-win32-x64-msvc`, not the Linux package).

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-04 - Added `ksiegai-next/.env.production` scaffold

What changed:
- Added `ksiegai-next/.env.production` with the production Supabase URL, anon key, app domain, marketing domain, optional GTM slot, and `NODE_ENV=production`.
- Left `SUPABASE_SERVICE_ROLE_KEY` as an explicit replacement token because no private production secret is stored in the repo and this file should not invent one.

Verification evidence (2026-05-04):
- Cross-checked file contents against current `ksiegai-next` runtime env usage in `app/layout.tsx`, `app/api/ab-track/route.ts`, `lib/supabase.ts`, `lib/abTesting.ts`, and `lib/auth/crossDomainAuth.ts`.

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-05-03 - `/logowanie` hydration mismatch from remembered-profile bootstrap

What changed:
- Removed the render-time fallback to `getLatestRememberedProfile()` inside `app/logowanie/page.tsx`.
- The login page now derives remembered-profile bootstrap only from React state that is populated after client mount, so the server HTML and first client render stay aligned.

Verification evidence (2026-05-03):
- `cd ksiegai-next && npx tsc --noEmit` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-04-11 - Logged-in homepage hero with business profiles and selected-app handoff

What changed:
- Replaced the anonymous homepage hero for authenticated users with a dedicated return panel on `/`:
  - shows a welcome-back state,
  - loads accessible business profiles,
  - shows pending/unread KSeF evidence counts from `ksef_invoices_received`,
  - lets the user choose which business profile should open in the app.
- Added empty-state hero behavior for authenticated users without any business profiles:
  - primary CTA now sends them straight to `ksef-ai` business-profile creation,
  - copy makes clear the setup should take about 5 minutes.
- Extended the shared `ksiegai-next` -> `ksef-ai` redirect helper so app entry can carry an incoming `businessProfileId` query without changing the existing `ksiegai_auth_token` payload.
- Updated `ksef-ai` business-profile bootstrap to consume that incoming `businessProfileId` once, validate it against accessible profiles, persist it as the selected profile, and then clean the URL.

Verification evidence (2026-04-11):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksef-ai && npx tsc --noEmit` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.
- Anonymous visitors still see the existing marketing hero.

## 2026-04-04 - Google auth callback now hands off to `app.ksiegai.pl` immediately

What changed:
- `/auth/callback` no longer waits for the welcome-email side effect before redirecting the browser to the app domain.
- Successful Google auth now stores the cross-domain token and hands off to `app.ksiegai.pl` on the fast path, while the welcome-email attempt continues in the background.
- Localhost post-login redirect handling remains unchanged.

Verification evidence (2026-04-04):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `git diff --check -- ksiegai-next/app/auth/callback/page.tsx ksiegai-next/docs/TODO.md ksiegai-next/docs/NOTES.md tovernet/docs/workspace/WORK_LOG.md` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-04-02 - `/logowanie` session resume and saved-account continue flow

What changed:
- `/logowanie` now explicitly bootstraps auth state before committing to the plain login form:
  - checks the current Supabase session,
  - falls back to restoring from the existing cross-domain `ksiegai_auth_token`,
  - surfaces a "Kontynuuj do aplikacji" card when a live resumable session exists.
- Remembered login profiles now store the last successful login method so saved accounts can behave differently:
  - `google` -> one-click OAuth resume,
  - `magic_link` -> one-click resend of the login link,
  - `password` -> immediately open password confirmation for that saved email.
- Saved password profiles now lock the email field and only ask for the missing password, which is the closest safe equivalent to the Facebook-style saved-account picker without storing credentials.
- `/auth/callback` now persists the successful profile together with its last used login method, so future visits can choose the correct resume path.

Verification evidence (2026-04-02):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `git diff --check -- ksiegai-next/lib/auth/loginProfiles.ts ksiegai-next/app/logowanie/page.tsx ksiegai-next/app/auth/callback/page.tsx ksiegai-next/docs/TODO.md` -> passed

Scope notes:
- No database schema, RLS, or Supabase backend contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.
- Password profiles still require the user to re-enter a password; this is intentional because the app does not and should not store reusable passwords locally.

## 2026-04-02 - Remembered login profiles on `/logowanie`

What changed:
- Added client-side remembered login profiles so `/logowanie` can show the most recently used user and keep a short list of saved identities.
- Added persistent pending-login state so password, magic-link, and Google sign-in flows keep showing which user is being authenticated even after refresh/navigation.
- Updated `/auth/callback` to reuse that pending identity label and save the successful user profile immediately after session exchange.

Verification evidence (2026-04-02):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksiegai-next && npm run build` -> blocked by existing repo/runtime issue: missing Next SWC linux/x64 binary, followed by the known `Jest worker encountered 1 child process exceptions, exceeding retry limit`
- `git diff --check -- ksiegai-next/lib/auth/loginProfiles.ts ksiegai-next/app/logowanie/page.tsx ksiegai-next/app/auth/callback/page.tsx` -> passed

Scope notes:
- No database schema, RLS, or Supabase contract changes.
- No change to the `ksiegai_auth_token` cross-domain handoff contract.

## 2026-03-22 - Removed public shared invoice ledger route

What changed:
- Removed the dedicated public route `app/udostepnione-faktury/page.tsx`.
- Deleted `components/public/SharedInvoicesLedger.tsx` and `lib/publicShare.ts`.
- The client invoice list now lives only in `ksef-ai` behind the existing `/share/:slug` slug-gated flow.

Verification evidence (2026-03-22):
- `trash-put .next/types/app/udostepnione-faktury` to clear stale generated type output after deleting the route
- `cd ksiegai-next && npx tsc --noEmit` -> passed

## 2026-03-22 - Shared invoice ledger access

What changed:
- Kept the public ledger flow anchored to a valid share slug while extending it to invoice-bearing `combo` shares as well as plain `invoice` shares.
- Clarified public UI copy so clients understand they can only see other invoices that still have an active share link.

Verification evidence (2026-03-22):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksef-ai && npx tsc --noEmit` -> passed

Scope notes:
- No database schema or RLS changes were introduced.
- Public access remains slug-gated through the `shared-doc` edge function; this work only broadens which active invoice share rows can populate the same-client ledger.
