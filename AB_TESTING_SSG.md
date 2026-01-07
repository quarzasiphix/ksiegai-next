# A/B Testing with Static Site Generation (SSG)

## The Challenge

Traditional A/B testing requires runtime database queries to fetch test configurations. However, **Cloudflare Pages with static export** (`output: 'export'`) cannot make server-side database calls at runtime.

## Solution: Build-Time Variant Injection

Instead of fetching A/B test data at runtime, we **pre-compile** active test variants into the static build.

---

## Implementation Steps

### 1. Create Build-Time Fetch Script

Create `scripts/fetch-ab-tests.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchABTests() {
  console.log('Fetching active A/B tests...');
  
  const { data, error } = await supabase
    .from('ab_test_definitions')
    .select('*')
    .eq('status', 'active');
  
  if (error) {
    console.error('Error fetching A/B tests:', error);
    process.exit(1);
  }
  
  // Transform data for client use
  const testsMap = {};
  data.forEach(test => {
    testsMap[test.page_path] = {
      id: test.id,
      test_key: test.test_key,
      page_path: test.page_path,
      traffic_allocation: test.traffic_allocation,
      variants: test.variants,
      primary_goal: test.primary_goal,
    };
  });
  
  // Write to public directory
  const outputPath = path.join(__dirname, '../public/ab-tests.json');
  fs.writeFileSync(outputPath, JSON.stringify(testsMap, null, 2));
  
  console.log(`✓ Wrote ${data.length} active tests to ${outputPath}`);
}

fetchABTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
```

### 2. Update package.json

```json
{
  "scripts": {
    "prebuild": "node scripts/fetch-ab-tests.js",
    "build": "next build",
    "deploy": "npm run build && wrangler pages deploy out"
  }
}
```

### 3. Create Client-Side A/B Library

Update `lib/abTesting.ts`:

```typescript
'use client';

import abTestsData from '@/public/ab-tests.json';

interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  changes: Record<string, any>;
}

interface ABTest {
  id: string;
  test_key: string;
  page_path: string;
  traffic_allocation: number;
  variants: ABTestVariant[];
  primary_goal: string;
}

const AB_TESTS: Record<string, ABTest> = abTestsData;

// Cookie helpers
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 30) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

// Weighted random selection
function selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant {
  const random = Math.random();
  let cumulative = 0;
  
  for (const variant of variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return variant;
    }
  }
  
  return variants[0]; // Fallback
}

// Get or assign variant for current user
export function getVariant(pagePath: string): ABTestVariant | null {
  const test = AB_TESTS[pagePath];
  if (!test) return null;
  
  // Check traffic allocation
  const sessionId = getSessionId();
  const hash = simpleHash(sessionId + test.id);
  if (hash > test.traffic_allocation) {
    return null; // User not in test
  }
  
  // Check existing assignment
  const cookieName = `ab_${test.test_key}`;
  const storedVariantId = getCookie(cookieName);
  
  if (storedVariantId) {
    const variant = test.variants.find(v => v.id === storedVariantId);
    if (variant) return variant;
  }
  
  // Assign new variant
  const variant = selectVariantByWeight(test.variants);
  setCookie(cookieName, variant.id);
  
  // Track assignment (async, non-blocking)
  trackAssignment(test.id, variant.id, sessionId);
  
  return variant;
}

// Session ID management
function getSessionId(): string {
  let sessionId = getCookie('ab_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    setCookie('ab_session_id', sessionId, 365);
  }
  return sessionId;
}

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

// Track assignment (fire and forget)
async function trackAssignment(testId: string, variantId: string, sessionId: string) {
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_id: testId,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'assignment',
      }),
    });
  } catch (err) {
    console.error('Failed to track assignment:', err);
  }
}

// Track conversion
export async function trackConversion(testKey: string) {
  const sessionId = getSessionId();
  const cookieName = `ab_${testKey}`;
  const variantId = getCookie(cookieName);
  
  if (!variantId) return;
  
  const test = Object.values(AB_TESTS).find(t => t.test_key === testKey);
  if (!test) return;
  
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_id: test.id,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'conversion',
      }),
    });
  } catch (err) {
    console.error('Failed to track conversion:', err);
  }
}

// Track custom event
export async function trackEvent(testKey: string, eventName: string, metadata?: Record<string, any>) {
  const sessionId = getSessionId();
  const cookieName = `ab_${testKey}`;
  const variantId = getCookie(cookieName);
  
  if (!variantId) return;
  
  const test = Object.values(AB_TESTS).find(t => t.test_key === testKey);
  if (!test) return;
  
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_id: test.id,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'custom',
        event_name: eventName,
        metadata,
      }),
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}
```

### 4. Create Tracking API Route

Create `app/api/ab-track/route.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { test_id, variant_id, session_id, event_type, event_name, metadata } = body;
    
    if (event_type === 'assignment') {
      // Record assignment
      await supabase.from('ab_test_assignments').insert({
        test_id,
        variant_id,
        session_id,
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      });
    } else {
      // Record event
      await supabase.from('ab_test_events').insert({
        test_id,
        variant_id,
        session_id,
        event_type,
        event_name,
        metadata,
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AB tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
```

### 5. Use in Components

Update `app/page.tsx`:

```typescript
'use client';

import { getVariant, trackConversion } from '@/lib/abTesting';
import { useEffect, useState } from 'react';

export default function Home() {
  const [variant, setVariant] = useState<any>(null);
  
  useEffect(() => {
    const v = getVariant('/');
    setVariant(v);
  }, []);
  
  const handleCTAClick = () => {
    trackConversion('homepage_hero');
  };
  
  // Use variant changes or defaults
  const heroTitle = variant?.changes?.heroTitle || 'Default Hero Title';
  const heroSubtitle = variant?.changes?.heroSubtitle || 'Default subtitle';
  const ctaText = variant?.changes?.ctaText || 'Get Started';
  
  return (
    <div>
      <h1>{heroTitle}</h1>
      <p>{heroSubtitle}</p>
      <button onClick={handleCTAClick}>{ctaText}</button>
    </div>
  );
}
```

---

## Workflow

### Creating a New Test

1. **Admin Panel**: Create test with variants and changes
2. **Set Status**: Mark test as "active"
3. **Build**: Run `npm run build` (triggers `prebuild` script)
4. **Deploy**: Deploy to Cloudflare Pages

### Updating a Test

1. **Admin Panel**: Modify test configuration
2. **Rebuild**: Run `npm run build` again
3. **Redeploy**: Push new static build

### Viewing Results

1. **Admin Panel**: Navigate to `/ab-tests/:id`
2. **Real-time Stats**: View assignments, conversions, confidence level
3. **Declare Winner**: When confidence ≥ 95%, declare winning variant

---

## Advantages

✅ **No Runtime Database Calls**: Works with static export  
✅ **Fast Performance**: Variant selection happens client-side  
✅ **Cloudflare Compatible**: No edge functions needed  
✅ **Full Analytics**: Track assignments and conversions via API route  
✅ **Easy Management**: Admin panel for test configuration

## Limitations

⚠️ **Requires Rebuild**: Changing tests requires redeployment  
⚠️ **Not Real-Time**: Test changes take effect after next build  
⚠️ **Client-Side Only**: Variant selection happens in browser (SEO implications)

---

## SEO Considerations

For SEO-critical pages, consider:

1. **Server-Side Rendering**: Use Cloudflare Workers for SSR
2. **Default Variant for Bots**: Detect bots and serve control variant
3. **Canonical Tags**: Ensure all variants use same canonical URL

---

## Example Test Configuration

In admin panel, create test with:

```json
{
  "test_key": "homepage_hero",
  "page_path": "/",
  "status": "active",
  "traffic_allocation": 1.0,
  "variants": [
    {
      "id": "control",
      "name": "Control",
      "weight": 0.5,
      "changes": {
        "heroTitle": "Original Title",
        "heroSubtitle": "Original subtitle",
        "ctaText": "Get Started"
      }
    },
    {
      "id": "variant_a",
      "name": "Variant A",
      "weight": 0.5,
      "changes": {
        "heroTitle": "New Compelling Title",
        "heroSubtitle": "Better subtitle with benefits",
        "ctaText": "Start Free Trial"
      }
    }
  ],
  "primary_goal": "registration"
}
```

After build, this will be available in `/public/ab-tests.json` and loaded statically.

---

## Monitoring

- **Admin Panel**: Real-time dashboard at `/ab-tests/:id`
- **Supabase**: Query `ab_test_assignments` and `ab_test_events` tables
- **Cloudflare Analytics**: Monitor page performance by variant (via query params)

---

## Best Practices

1. **Test One Thing**: Change only one element per test
2. **Sufficient Sample Size**: Run until ≥95% confidence
3. **Avoid Flicker**: Load variant on first render (use cookie)
4. **Track Everything**: Log assignments, conversions, and custom events
5. **Document Changes**: Keep variant changes in admin panel for reference
