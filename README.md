# KsięgaI Marketing Site (Next.js)

SEO-optimized marketing site for ksiegai.pl built with Next.js 15, TypeScript, and Tailwind CSS.

## Architecture

**Marketing Site (www.ksiegai.pl)** → Next.js (this repo)
- Homepage with SEO optimization
- Registration flow with A/B testing
- Auth callback handling
- Cross-domain token sharing

**App (app.ksiegai.pl)** → React SPA (existing ksef-ai)
- Full application dashboard
- Invoice management
- Accounting features
- Protected routes

## Cross-Domain Authentication

Uses cookie-based token sharing on parent domain `.ksiegai.pl`:

1. User registers on `www.ksiegai.pl/rejestracja`
2. Supabase auth completes → token stored in cookie with domain `.ksiegai.pl`
3. User redirected to `app.ksiegai.pl/dashboard`
4. App reads token from cookie → auto-login

### Local Development

- Marketing: `http://localhost:3000`
- App: `http://localhost:5173`
- Tokens stored in localStorage (fallback for localhost)

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your Supabase credentials
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_DOMAIN=app.ksiegai.pl
NEXT_PUBLIC_MARKETING_DOMAIN=www.ksiegai.pl
```

## Routes

- `/` - Homepage (SEO optimized)
- `/rejestracja` - Registration page with magic link + Google OAuth
- `/logowanie` - Login page
- `/auth/callback` - OAuth callback handler
- `/regulamin` - Terms of service
- `/polityka-prywatnosci` - Privacy policy

## Key Features

✅ Server-side rendering for SEO
✅ Magic link authentication
✅ Google OAuth
✅ Cross-domain token sharing
✅ Mobile-first responsive design
✅ Dark mode support
✅ TypeScript strict mode
✅ Tailwind CSS styling

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

Configure domains:
- Production: `www.ksiegai.pl`
- App: `app.ksiegai.pl` (points to existing React app)

### Environment Setup

1. Set cookie domain to `.ksiegai.pl` in production
2. Configure CORS for Supabase to allow both domains
3. Set OAuth redirect URLs in Supabase dashboard:
   - `https://www.ksiegai.pl/auth/callback`
   - `https://app.ksiegai.pl/auth/callback`

## Cross-Domain Token Flow

```typescript
// lib/auth/crossDomainAuth.ts
storeAuthToken(token) // Sets cookie on .ksiegai.pl
redirectToApp('/dashboard') // Redirects to app.ksiegai.pl
```

App reads token:
```typescript
// In React app (ksef-ai)
const token = getCookie('ksiegai_auth_token')
supabase.auth.setSession(token)
```

## Development Workflow

1. **Marketing changes**: Edit files in this repo, deploy to Vercel
2. **App changes**: Edit ksef-ai repo, deploy separately
3. **Auth flow testing**: Test full flow from registration → app redirect

## Notes

- TypeScript errors about missing modules will resolve after `npm install`
- Tailwind warnings in CSS are expected (directives processed at build time)
- Cookie sharing requires same parent domain in production
