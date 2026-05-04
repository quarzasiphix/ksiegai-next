# Notes

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
