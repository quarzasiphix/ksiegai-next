<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the KsięgaI Next.js marketing site. The following changes were made:

- **Installed packages**: `posthog-js` and `posthog-node` added to `package.json`.
- **Environment variables**: `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` written to `.env.local` and covered by `.gitignore`. The existing `PostHogProvider` component already references these variables and was left intact.
- **User identification**: `posthog.identify(userId, { email })` is called in three places — the login page's `onAuthStateChange` (SIGNED_IN), the registration page's `onAuthStateChange` (SIGNED_IN), and the auth callback page immediately after a session is established. This ensures all auth paths correlate front-end and back-end events to the same distinct ID.
- **Error tracking**: `posthog.captureException(error)` added to the auth callback error path.
- **15 events instrumented** across 7 files.

## Event table

| Event | Description | File |
|---|---|---|
| `login_initiated` | User submitted a login form (password or magic link) | `app/logowanie/page.tsx` |
| `login_google_clicked` | User clicked "Zaloguj przez Google" on the login page | `app/logowanie/page.tsx` |
| `login_failed` | Login attempt failed (wrong password or OTP error) | `app/logowanie/page.tsx` |
| `magic_link_sent` | Magic link successfully sent on the login page | `app/logowanie/page.tsx` |
| `register_google_clicked` | User clicked "Kontynuuj przez Google" on registration | `app/rejestracja/page.tsx` |
| `register_email_form_opened` | User expanded the email registration form | `app/rejestracja/page.tsx` |
| `register_magic_link_sent` | Registration magic link successfully sent | `app/rejestracja/page.tsx` |
| `auth_callback_completed` | OAuth/magic-link callback succeeded; session established | `app/auth/callback/page.tsx` |
| `invoice_generator_printed` | User clicked "Drukuj / zapisz jako PDF" in the free generator | `app/generator-faktur/InvoiceGeneratorClient.tsx` |
| `invoice_generator_signup_cta_clicked` | User clicked "Załóż konto" CTA in the free generator | `app/generator-faktur/InvoiceGeneratorClient.tsx` |
| `hero_cta_clicked` | Anonymous visitor clicked the primary hero CTA | `app/page.tsx` |
| `hero_go_to_app_clicked` | Logged-in user clicked "Przejdź do aplikacji" in the hero | `components/home/HomeHero.tsx` |
| `header_go_to_app_clicked` | Logged-in user clicked "Przejdź do aplikacji" in the header | `components/Header.tsx` |
| `pricing_cta_clicked` | *(tracked via PostHog autocapture — server component)* | `app/cennik/page.tsx` |
| `premium_cta_clicked` | *(tracked via PostHog autocapture — server component)* | `app/premium/page.tsx` |

## Next steps

We've built a dashboard and 5 insights for you to monitor user behaviour as data starts flowing in:

- [Analytics basics dashboard](/dashboard/685485)
- [Registration Funnel](/insights/F9wlU3qU) — hero CTA → magic link sent → auth completed
- [Login Method Breakdown](/insights/XGWecHdi) — login_initiated broken down by `method` property
- [Key Conversion Events Over Time](/insights/gtdrOoXC) — hero clicks, signups, and auth completions
- [Invoice Generator to Signup Funnel](/insights/WN3tJ7GN) — invoice printed → signup CTA clicked
- [Login Failures vs Successes](/insights/nGPgC02M) — login_failed vs auth_callback_completed over time

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
