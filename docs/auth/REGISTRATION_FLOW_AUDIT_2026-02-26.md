# Registration + Marketing Audit (2026-02-26)

## Scope
- Registration and login flows in `ksiegai-next`
- Email-related behavior in onboarding/auth flow
- SEO and crawlability baseline for marketing routes

## Flow Map (Implemented)
1. User opens `/rejestracja` or `/logowanie`.
2. Auth via Supabase:
   - Magic link (`signInWithOtp`)
   - Google OAuth (`signInWithOAuth`, redirect to `/auth/callback`)
   - Password login (`/logowanie` only)
3. On signed-in session:
   - `ksiegai_auth_token` is written to cookie + localStorage.
   - Redirect to `app.ksiegai.pl` (`/` for registration, `/dashboard` for login).
4. Welcome email attempt:
   - `sendWelcomeEmailIfNewUser(...)` invokes edge function `send-auth-email`.

## Verification Evidence
- `cd ksiegai-next && npx tsc --noEmit` -> pass
- `cd ksiegai-next && npm run build` -> blocked in local sandbox (`Jest worker` crash after SWC/cache permission constraints)
- `curl -X POST https://rncrzxjyffxmfbnxlqtm.supabase.co/functions/v1/send-auth-email` with empty payload -> `400 {"error":"email and type are required"}`
- `curl -X POST .../send-auth-email` with `email/type/templateKey` -> `500 {"error":"Email service not configured"}`

## Findings

### High
1. Welcome email backend is reachable but not configured.
   - `send-auth-email` exists, but currently returns `500 Email service not configured`.
   - Impact: registration works, but welcome/onboarding emails are not delivered from this path.

2. A/B registration conversion tracking is disabled in registration page.
   - `trackRegistrationConversion` has RPC call commented out.
   - Impact: signup attribution for marketing experiments is incomplete.

### Medium
1. SEO inconsistencies and crawl friction existed:
   - Mixed canonical host (`www.ksiegai.pl` vs `ksiegai.pl`).
   - Sitemap omitted key public routes.
   - Footer linked to non-existing internal pages (`/o-nas`, `/kontakt`, `/blog`).
   - GTM ID was hardcoded placeholder (`GTM-XXXXXXX`).

2. Auth pages (`/logowanie`, `/rejestracja`) had no dedicated metadata policy.
   - Impact: unnecessary indexation risk for transactional pages.

## Fixes Applied in This Work Unit
- Normalized canonical and OG URL host to `https://ksiegai.pl` on key pages.
- Expanded sitemap with existing public routes and legal page coverage.
- Added dedicated metadata for auth pages with `noindex,nofollow`.
- Replaced hardcoded GTM placeholder with env-driven `NEXT_PUBLIC_GTM_ID` guard.
- Removed footer links to non-existing routes and mapped to real routes/contact.

## Remaining Actions
1. Configure `send-auth-email` secrets/provider in Supabase Edge runtime (or replace with approved delivery path).
2. Re-enable secure signup conversion tracking (`track_registration_conversion`) with typed-safe client call.
3. Re-run production-equivalent build in unrestricted environment and confirm exported output artifacts.
