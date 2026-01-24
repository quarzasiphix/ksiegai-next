# ksiegai-next Agent Guide

## Application Overview

**Name**: ksiegai-next (KsięgaI Marketing & Auth Site)  
**URL**: `ksiegai.pl`  
**Tech Stack**: Next.js 14 (App Router) + TypeScript + Supabase Auth  
**Purpose**: SEO-optimized landing page, user acquisition, auth entry point

**User Personas**:
- Prospective customers researching accounting solutions
- New users registering for KsięgaI
- Returning users logging in

---

## Critical Context

### This App is Authoritative For:
- ✅ Public-facing marketing content
- ✅ SEO optimization and discoverability
- ✅ User registration and initial auth flow
- ✅ AB test configuration (consumed at build time)
- ✅ User acquisition funnel

### Non-Negotiables:
- **SEO First**: Every page must have proper metadata
- **Performance**: Static generation where possible
- **AB Testing**: Prebuild fetch from Supabase
- **Auth Redirect**: Proper cross-domain token flow to app.ksiegai.pl

---

## Project Structure

```
ksiegai-next/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # ⭐ Root layout, SEO metadata
│   ├── page.tsx                   # ⭐ Homepage
│   ├── globals.css                # Global styles
│   ├── auth/
│   │   ├── login/page.tsx         # Login page
│   │   ├── register/page.tsx      # Registration page
│   │   └── callback/page.tsx      # OAuth callback
│   ├── cennik/page.tsx            # Pricing page
│   ├── dla-ksiegowych/page.tsx    # For accountants page
│   ├── jak-to-dziala/page.tsx     # How it works
│   ├── faq-section.tsx            # FAQ component
│   ├── premium/                   # Premium plan pages
│   ├── polityka-prywatnosci/      # Privacy policy
│   ├── regulamin/                 # Terms of service
│   ├── rodo/                      # GDPR info
│   ├── api/                       # API routes
│   │   └── ab-tests/route.ts      # AB test API endpoint
│   ├── manifest.ts                # PWA manifest
│   ├── robots.ts                  # Robots.txt generator
│   └── sitemap.ts                 # Sitemap generator
├── components/                    # React components
│   ├── Header.tsx                 # Site header/nav
│   ├── Footer.tsx                 # Site footer
│   └── ...                        # Other components
├── lib/                           # Utilities
│   └── supabase.ts                # Supabase client
├── scripts/
│   └── fetch-ab-tests.js          # ⭐ Prebuild AB test fetch
├── public/                        # Static assets
│   ├── og-image.png               # OpenGraph image
│   └── ...
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.js
```

---

## Routing Architecture

### Next.js App Router

**Pattern**: File-system based routing in `app/` directory

**Route Structure**:
```
app/
├── page.tsx              → /
├── layout.tsx            → Root layout (wraps all pages)
├── auth/
│   ├── login/page.tsx    → /auth/login
│   └── register/page.tsx → /auth/register
├── cennik/page.tsx       → /cennik
└── api/
    └── route.ts          → API endpoint
```

**Layouts**:
- `layout.tsx` files create nested layouts
- Root layout (`app/layout.tsx`) wraps entire app
- Shared UI (header, footer) in root layout

**Metadata**:
- SEO metadata in `layout.tsx` and `page.tsx`
- OpenGraph, Twitter cards configured
- Dynamic metadata via `generateMetadata()` function

### Adding a New Page

1. Create directory in `app/` with `page.tsx`
2. Add metadata export
3. Implement page component
4. Update sitemap if needed

**Example**:
```typescript
// app/moja-strona/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moja Strona - KsięgaI',
  description: 'Opis strony dla SEO',
};

export default function MojaStrona() {
  return (
    <div>
      <h1>Moja Strona</h1>
    </div>
  );
}
```

### Dynamic Routes

**Pattern**: `[param]/page.tsx`

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>;
}
```

---

## SEO Optimization

### Root Layout Metadata

**File**: `@/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu",
  description: "Automatyzacja faktur, podatków i KSeF...",
  keywords: "księgowość online, faktury KSeF, JPK-V7M...",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "KsięgaI - Księgowość...",
    description: "...",
    type: "website",
    locale: "pl_PL",
    url: "https://ksiegai.pl",
    images: [{ url: "https://ksiegai.pl/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    images: ["https://ksiegai.pl/og-image.png"],
  },
  alternates: {
    canonical: "https://ksiegai.pl",
  },
};
```

### Sitemap Generation

**File**: `@/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ksiegai.pl',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://ksiegai.pl/cennik',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... more URLs
  ];
}
```

### Robots.txt

**File**: `@/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://ksiegai.pl/sitemap.xml',
  };
}
```

### Performance Optimization

**Static Generation**:
- All marketing pages statically generated at build time
- No runtime data fetching for content pages
- Fast initial page load

**Image Optimization**:
```typescript
import Image from 'next/image';

<Image
  src="/hero-image.png"
  alt="KsięgaI Dashboard"
  width={1200}
  height={630}
  priority // For above-fold images
/>
```

**Font Optimization**:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

// Use in layout
<body className={inter.className}>
```

---

## Authentication Flow

### Registration

**Page**: `@/app/auth/register/page.tsx`

**Flow**:
1. User fills registration form
2. Call Supabase Auth `signUp()`
3. Email verification sent (if enabled)
4. Set cross-domain token
5. Redirect to `app.ksiegai.pl`

**Code Pattern**:
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

const handleRegister = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://app.ksiegai.pl',
    },
  });
  
  if (error) {
    console.error('Registration failed:', error);
    return;
  }
  
  // Set cross-domain token
  localStorage.setItem('ksiegai_auth_token', data.session?.access_token);
  
  // Redirect to app
  window.location.href = 'https://app.ksiegai.pl';
};
```

### Login

**Page**: `@/app/auth/login/page.tsx`

**Flow**:
1. User enters credentials
2. Call Supabase Auth `signInWithPassword()`
3. Set cross-domain token
4. Redirect to `app.ksiegai.pl` with `returnTo` param

**Code Pattern**:
```typescript
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Login failed:', error);
    return;
  }
  
  // Set cross-domain token
  localStorage.setItem('ksiegai_auth_token', data.session?.access_token);
  
  // Redirect to app (preserve returnTo if present)
  const returnTo = new URLSearchParams(window.location.search).get('returnTo');
  const redirectUrl = returnTo 
    ? `https://app.ksiegai.pl${returnTo}`
    : 'https://app.ksiegai.pl/dashboard';
  
  window.location.href = redirectUrl;
};
```

### Cross-Domain Token Flow

**Purpose**: Transfer auth session from `ksiegai.pl` to `app.ksiegai.pl`

**Mechanism**:
1. After successful auth on ksiegai.pl
2. Store session token in localStorage with specific key
3. Redirect to app.ksiegai.pl
4. ksef-ai reads token from localStorage
5. Validates and establishes session
6. Clears token after successful validation

**Token Key**: `ksiegai_auth_token` (must match in both apps)

---

## AB Testing Integration

### Build-Time Fetch

**Script**: `@/scripts/fetch-ab-tests.js`

**Purpose**: Fetch AB test configurations from Supabase at build time

**Flow**:
1. `npm run prebuild` executes script
2. Script fetches active AB tests from Supabase
3. Writes to `public/ab-tests.json`
4. Next.js build includes file in static assets
5. Client-side code reads from static file (no runtime DB calls)

**Script Example**:
```javascript
// scripts/fetch-ab-tests.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fetchABTests() {
  const { data, error } = await supabase
    .from('ab_tests')
    .select('*')
    .eq('status', 'active');
  
  if (error) throw error;
  
  // Write to public directory
  const fs = require('fs');
  fs.writeFileSync(
    './public/ab-tests.json',
    JSON.stringify(data, null, 2)
  );
}

fetchABTests();
```

**package.json**:
```json
{
  "scripts": {
    "prebuild": "node scripts/fetch-ab-tests.js",
    "build": "next build"
  }
}
```

### Client-Side Usage

```typescript
// components/ABTestComponent.tsx
import { useEffect, useState } from 'react';

export function ABTestComponent() {
  const [variant, setVariant] = useState('control');
  
  useEffect(() => {
    fetch('/ab-tests.json')
      .then(res => res.json())
      .then(tests => {
        const test = tests.find(t => t.name === 'homepage_hero');
        if (test) {
          setVariant(test.variant);
        }
      });
  }, []);
  
  return variant === 'variant_a' ? <HeroA /> : <HeroB />;
}
```

---

## Google Tag Manager Integration

### Configuration

**File**: `@/app/layout.tsx`

**GTM Setup**:
```typescript
<Script
  id="gtm-init"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    `,
  }}
/>

<Script
  id="gtm-script"
  src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"
  strategy="afterInteractive"
/>
```

**Noscript Fallback**:
```typescript
<noscript
  dangerouslySetInnerHTML={{
    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  }}
/>
```

### Event Tracking

**Custom Events**:
```typescript
// Track button click
const handleCTAClick = () => {
  window.dataLayer?.push({
    event: 'cta_click',
    cta_location: 'homepage_hero',
    cta_text: 'Zacznij za darmo',
  });
  
  // Navigate to registration
  router.push('/auth/register');
};
```

---

## Supabase Integration

### Client Setup

**File**: `@/lib/supabase.ts`

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();
```

**Usage in Components**:
```typescript
'use client';

import { supabase } from '@/lib/supabase';

export default function MyComponent() {
  const handleAction = async () => {
    const { data, error } = await supabase
      .from('table_name')
      .select('*');
    
    // Handle data...
  };
  
  return <div>...</div>;
}
```

### Server Components

**Pattern**: Use Server Actions or Route Handlers

```typescript
// app/api/data/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  const { data, error } = await supabase
    .from('table_name')
    .select('*');
  
  return Response.json({ data, error });
}
```

---

## Common Tasks

### Adding a New Marketing Page

1. Create directory in `app/` (e.g., `app/nowa-strona/`)
2. Add `page.tsx` with metadata
3. Implement page content
4. Update sitemap in `app/sitemap.ts`
5. Add to header navigation if needed

**Example**:
```typescript
// app/nowa-strona/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nowa Strona - KsięgaI',
  description: 'Opis dla SEO',
  openGraph: {
    title: 'Nowa Strona - KsięgaI',
    description: 'Opis dla SEO',
  },
};

export default function NowaStrona() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">Nowa Strona</h1>
      <p>Treść strony...</p>
    </div>
  );
}
```

### Modifying Auth Flow

1. Update auth pages in `app/auth/`
2. Ensure cross-domain token is set correctly
3. Test redirect to app.ksiegai.pl
4. Verify token validation in ksef-ai

### Adding AB Test

1. Create test in admin-ksiegai (writes to `ab_tests` table)
2. Run `npm run prebuild` to fetch tests
3. Implement variant logic in component
4. Deploy and monitor results

### Updating SEO Metadata

1. Modify `metadata` export in relevant `page.tsx` or `layout.tsx`
2. Update OpenGraph images if needed
3. Regenerate sitemap if URLs changed
4. Test with Google Search Console

---

## Development Workflow

### Local Development

```bash
npm run dev  # Start Next.js dev server on http://localhost:3000
```

**Features**:
- Hot module replacement
- Fast refresh
- Error overlay

### Build Process

```bash
npm run prebuild  # Fetch AB tests from Supabase
npm run build     # Next.js production build
npm run start     # Start production server
```

**Build Output**:
- Static pages in `.next/server/pages/`
- Client bundles in `.next/static/`
- AB tests in `public/ab-tests.json`

### Environment Variables

**Required**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://rncrzxjyffxmfbnxlqtm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Optional**:
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## Performance Considerations

### Static Generation

**All marketing pages are static** (generated at build time):
- Homepage (`/`)
- Pricing (`/cennik`)
- How it works (`/jak-to-dziala`)
- Legal pages (`/polityka-prywatnosci`, `/regulamin`, `/rodo`)

**Benefits**:
- Instant page loads
- No server-side rendering overhead
- CDN-friendly

### Image Optimization

**Use Next.js Image component**:
```typescript
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Description"
  width={1200}
  height={630}
  priority={true} // For above-fold images
  quality={90}
/>
```

**Automatic Optimizations**:
- WebP format conversion
- Responsive images
- Lazy loading (except `priority` images)

### Font Loading

**Optimized Google Fonts**:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevent FOIT
});
```

---

## SEO Best Practices

### Metadata Checklist

For every page, ensure:
- ✅ Unique `title` (50-60 characters)
- ✅ Compelling `description` (150-160 characters)
- ✅ Relevant `keywords`
- ✅ OpenGraph tags (title, description, image)
- ✅ Twitter Card tags
- ✅ Canonical URL

### Structured Data

**Add JSON-LD for rich snippets**:
```typescript
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KsięgaI',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PLN',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

### Internal Linking

**Use Next.js Link component**:
```typescript
import Link from 'next/link';

<Link href="/cennik">Zobacz cennik</Link>
```

**Benefits**:
- Prefetching on hover
- Client-side navigation
- SEO-friendly

---

## Deployment

### Vercel (Recommended)

**Automatic Deployment**:
1. Connect GitHub repo to Vercel
2. Configure environment variables
3. Set build command: `npm run build`
4. Deploy automatically on push

**Build Settings**:
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

### Custom Deployment

**Build**:
```bash
npm run prebuild
npm run build
```

**Start**:
```bash
npm run start
```

**Requirements**:
- Node.js 18+
- Environment variables configured

---

## Integration Points

### With ksef-ai

**Auth Flow**:
1. User authenticates on ksiegai.pl
2. Cross-domain token set in localStorage
3. Redirect to app.ksiegai.pl
4. ksef-ai validates token and establishes session

**Token Key**: `ksiegai_auth_token` (must match in both apps)

### With admin-ksiegai

**AB Tests**:
1. Admin creates/updates AB test in admin-ksiegai
2. Test written to `ab_tests` table in Supabase
3. ksiegai-next fetches at build time via `npm run prebuild`
4. Static JSON file served to clients

**No Runtime Integration**: All data fetched at build time

---

## Troubleshooting

### "AB tests not loading"

1. Check `public/ab-tests.json` exists
2. Verify `npm run prebuild` ran successfully
3. Check Supabase connection in script
4. Verify `ab_tests` table has active tests

### "Auth redirect not working"

1. Check cross-domain token is set in localStorage
2. Verify redirect URL is correct
3. Check CORS settings if needed
4. Test token validation in ksef-ai

### "SEO metadata not showing"

1. Verify `metadata` export in page/layout
2. Check build output for static generation
3. Test with Google Search Console
4. Validate OpenGraph with Facebook Debugger

### "Build failing"

1. Check `npm run prebuild` completes successfully
2. Verify environment variables are set
3. Check for TypeScript errors
4. Review build logs for specific errors

---

## Code Style & Conventions

### File Naming

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: PascalCase (`MyComponent.tsx`)
- **Utilities**: camelCase (`myUtil.ts`)

### Component Structure

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default function PageName() {
  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### Client vs Server Components

**Server Components** (default):
- No `'use client'` directive
- Can fetch data directly
- No browser APIs
- Better performance

**Client Components**:
- Add `'use client'` at top
- Can use hooks, event handlers
- Access to browser APIs
- Interactive features

---

## Quick Reference

### Key Files
- **Root Layout**: `app/layout.tsx`
- **Homepage**: `app/page.tsx`
- **Auth Pages**: `app/auth/*/page.tsx`
- **Sitemap**: `app/sitemap.ts`
- **Robots**: `app/robots.ts`
- **AB Test Script**: `scripts/fetch-ab-tests.js`

### Key Commands
```bash
npm run dev          # Start dev server
npm run prebuild     # Fetch AB tests
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
```

### Important URLs
- **Production**: `https://ksiegai.pl`
- **App Redirect**: `https://app.ksiegai.pl`
- **Supabase**: `https://rncrzxjyffxmfbnxlqtm.supabase.co`

---

**For system-wide architecture, see `@/ARCHITECTURE_OVERVIEW.md`**  
**For workspace rules, see `@/RULES.md`**
