# A/B Testing System - Complete Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Components](#architecture-components)
3. [Weight Distribution & Randomization](#weight-distribution--randomization)
4. [Data Flow](#data-flow)
5. [SEO & Performance Optimization](#seo--performance-optimization)
6. [Admin Panel Management](#admin-panel-management)
7. [Database Schema](#database-schema)
8. [Implementation Details](#implementation-details)

---

## System Overview

The A/B testing system is designed for **Static Site Generation (SSG)** with Cloudflare Pages deployment. It provides:

- **Zero-flicker variant assignment** using pre-hydration scripts
- **Cookie-based persistence** for consistent user experience
- **Weighted random distribution** for traffic allocation
- **SEO-safe implementation** with proper hydration handling
- **Real-time analytics tracking** via Supabase
- **Admin panel** for test management and results analysis

### Key Design Principles

1. **Client-side variant selection** (SSG-compatible)
2. **Build-time test configuration** (static JSON file)
3. **Cookie persistence** (365-day expiry)
4. **No server-side rendering** required
5. **Progressive enhancement** (works without JavaScript)

---

## Architecture Components

### 1. Configuration Layer

**File**: `public/ab-tests.json`

```json
{
  "/": {
    "id": "2f1462a3-951b-4936-8c75-c602801c28b6",
    "test_key": "ksef_fear_vs_efficiency_test",
    "name": "Home Page Headline Test",
    "page_path": "/",
    "traffic_allocation": 1,
    "primary_goal": "signup",
    "secondary_goals": ["demo_request", "pricing_view"],
    "variants": [
      {
        "id": "variant_a",
        "name": "Variant A – Control & Risk",
        "weight": 0.5,
        "changes": {
          "headline": "KSeF bez chaosu, błędów i ryzyka kontroli",
          "subheadline": "...",
          "cta": "..."
        }
      },
      {
        "id": "variant_b",
        "name": "Variant B – Efficiency & Scale",
        "weight": 0.5,
        "changes": { ... }
      }
    ]
  }
}
```

**Purpose**: Static configuration file generated at build time, loaded synchronously on page load.

### 2. Core Library Layer

#### `lib/ab-testing-ssg.ts` (Primary Implementation)

**Key Functions**:

- `loadABTests()`: Fetches `/ab-tests.json` and caches in `window.__AB_TESTS_CACHE`
- `getVariant(test)`: Assigns or retrieves variant for a user
- `getSessionId()`: Generates/retrieves persistent session ID
- `trackAssignment()`: Records variant assignment to Supabase
- `trackConversion()`: Records conversion events
- `trackPageView()`: Records page views
- `setupTimeTracking()`: Tracks time on page
- `setupScrollTracking()`: Tracks scroll depth

**Features**:
- Debug mode with `window.abTestDebug` commands
- Analytics skip for debug sessions
- Cookie-based variant persistence
- LocalStorage for cross-page consistency

#### `lib/abTesting.ts` (Supabase Integration)

Provides database integration for:
- Fetching active tests from Supabase
- Storing assignments
- Tracking events

#### `lib/ab-testing.ts` (Legacy Simple Implementation)

Older implementation with basic localStorage-only approach. Less featured than SSG version.

### 3. React Hooks Layer

#### `hooks/useABTestSSG.ts` (Recommended)

```typescript
const { variant, isLoading, trackConversion, trackEvent } = useABTestSSG('/', {
  trackTime: true,
  trackScroll: true,
});
```

**Features**:
- Automatic test loading from static JSON
- Variant assignment with cookie persistence
- Built-in time and scroll tracking
- Conversion and event tracking helpers

**Lifecycle**:
1. Loads tests from `/ab-tests.json`
2. Finds test for current page path
3. Gets or assigns variant (cookie-based)
4. Tracks page view
5. Sets up time/scroll tracking
6. Returns variant data and tracking functions

#### `hooks/useABTest.ts` (Supabase-based)

Alternative hook that fetches tests from Supabase at runtime (not SSG-compatible).

#### `hooks/useVariant.ts` (Legacy)

Simple hook for basic A/B testing without full feature set.

### 4. Component Layer

#### `components/landing-variants.tsx`

Provides variant-specific content components:
- `HeroHeadline`
- `HeroSubheadline`
- `HeroMicrocopy`
- `HeroMechanism`
- `KSeFBanner`
- `TrackedCTAButton`

**Usage**:
```tsx
<HeroHeadline variant={variant} />
```

### 5. Page Implementation

#### `app/page.tsx`

**Critical Features**:

1. **Pre-hydration Script** (lines 98-162):
   - Runs **before React renders**
   - Synchronously loads `/ab-tests.json`
   - Checks cookie for existing variant
   - Caches content in `window.__AB_HERO_CONTENT`
   - **Prevents flicker** by having content ready before render

2. **State Management**:
   ```tsx
   const [content, setContent] = useState(() => {
     if (typeof window !== 'undefined' && (window as any).__AB_HERO_CONTENT) {
       return (window as any).__AB_HERO_CONTENT;
     }
     return getVariantContent();
   });
   ```

3. **Hydration Safety**:
   - Uses `suppressHydrationWarning` on dynamic content
   - Ensures server/client content matches

---

## Weight Distribution & Randomization

### How 50/50 Split Works

#### Deterministic Hash-Based Selection

**File**: `lib/ab-testing-ssg.ts:277-296`

```typescript
function selectVariantForTest(test: ABTest): ABTestVariant {
  // Use deterministic hash-based selection for consistent assignment
  // This ensures the same user always gets the same variant across sessions
  const sessionId = getSessionId();
  const hash = simpleHash(sessionId + test.test_key);
  
  // Convert hash (0-1) to variant using cumulative weights
  const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
  let threshold = hash * totalWeight;
  
  for (const variant of test.variants) {
    threshold -= variant.weight;
    if (threshold <= 0) {
      return variant;
    }
  }
  
  return test.variants[0];
}
```

**How it works for distributed users**:

1. **Session ID Generation**: Each user gets a unique session ID (e.g., `1704672000000-k3j9d8f2a`)
2. **Deterministic Hash**: `simpleHash(sessionId + test_key)` produces a consistent 0-1 value
3. **Weighted Distribution**: Hash maps to variant based on cumulative weights

**Example with 50/50 split**:

```
User A: sessionId = "abc123"
  → hash("abc123" + "test_key") = 0.234
  → 0.234 * 1.0 = 0.234
  → 0.234 - 0.5 = -0.266 → Variant A ✓

User B: sessionId = "xyz789"
  → hash("xyz789" + "test_key") = 0.789
  → 0.789 * 1.0 = 0.789
  → 0.789 - 0.5 = 0.289
  → 0.289 - 0.5 = -0.211 → Variant B ✓

User C: sessionId = "def456"
  → hash("def456" + "test_key") = 0.123
  → 0.123 * 1.0 = 0.123
  → 0.123 - 0.5 = -0.377 → Variant A ✓
```

**Why this approach works globally**:

✅ **Deterministic**: Same user always gets same variant (hash is consistent)
✅ **Distributed**: Works across all users worldwide (no server coordination needed)
✅ **Statistically sound**: Hash function provides uniform distribution
✅ **Cookie-independent**: Even if cookies are cleared, same session ID = same variant
✅ **No database required**: Pure client-side calculation (SSG-compatible)

**Hash Function** (`lib/ab-testing-ssg.ts:147-154`):
```typescript
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}
```

This hash function ensures:
- Same input → same output (deterministic)
- Uniform distribution across 0-1 range
- Fast computation (no crypto overhead)

### Traffic Allocation

**File**: `lib/ab-testing-ssg.ts:228-236`

```typescript
export function getVariant(test: ABTest): ABTestVariant | null {
  // Check traffic allocation
  const sessionId = getSessionId();
  const hash = simpleHash(sessionId + test.id);
  if (hash > test.traffic_allocation) {
    return null; // User not in test
  }
  // ... assign variant
}
```

**Traffic Allocation Logic**:
1. `traffic_allocation: 1.0` = 100% of users see test
2. `traffic_allocation: 0.5` = 50% of users see test, 50% see control
3. Uses deterministic hash of session ID for consistency
4. Same user always gets same allocation decision

**Hash Function** (`lib/ab-testing-ssg.ts:147-154`):
```typescript
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}
```

Returns consistent 0-1 value for same input, enabling stable traffic allocation.

---

## Data Flow

### User First Visit

```
1. Browser loads page HTML
   ↓
2. Pre-hydration script executes (beforeInteractive)
   ↓
3. Check cookie: ab_ksef_fear_vs_efficiency_test
   ↓
4. Cookie NOT found → Assign variant
   ↓
5. selectVariantForTest() → Alternating toggle or weighted random
   ↓
6. Set cookie: ab_ksef_fear_vs_efficiency_test=variant_a
   ↓
7. Store in localStorage: ab_variant_assignments
   ↓
8. Cache content in window.__AB_HERO_CONTENT
   ↓
9. React hydrates with correct content (no flicker)
   ↓
10. useABTestSSG hook initializes
   ↓
11. trackAssignment() → Supabase insert
   ↓
12. trackPageView() → Supabase insert
   ↓
13. setupTimeTracking() → Track on exit
   ↓
14. setupScrollTracking() → Track milestones
```

### User Return Visit

```
1. Browser loads page HTML
   ↓
2. Pre-hydration script executes
   ↓
3. Check cookie: ab_ksef_fear_vs_efficiency_test=variant_a
   ↓
4. Cookie FOUND → Load variant_a content
   ↓
5. Cache in window.__AB_HERO_CONTENT
   ↓
6. React hydrates with same content (consistent)
   ↓
7. useABTestSSG hook sees existing assignment
   ↓
8. Skip trackAssignment() (already tracked)
   ↓
9. trackPageView() → New page view event
```

### Conversion Tracking

```
User clicks CTA button
   ↓
trackConversion('signup', value, metadata)
   ↓
Get test ID from test_key
   ↓
Get assignment ID from session
   ↓
Insert into ab_test_events:
  - event_type: 'conversion'
  - event_name: 'signup'
  - variant_id: 'variant_a'
  - assignment_id: <uuid>
```

---

## SEO & Performance Optimization

### SEO Safety

1. **No Content Cloaking**:
   - All variants are legitimate content variations
   - No deceptive practices
   - Transparent to search engines

2. **Consistent Rendering**:
   - Server renders default content (Variant A)
   - Client hydrates with assigned variant
   - Uses `suppressHydrationWarning` to prevent React errors

3. **Canonical URLs**:
   - All variants share same URL
   - No URL parameters for variants
   - Search engines see unified page

4. **Structured Data**:
   - Schema.org markup remains consistent
   - Meta tags use default values
   - No variant-specific SEO elements

### Performance Optimization

1. **Zero Network Delay**:
   - Tests loaded from static `/ab-tests.json`
   - No API calls before render
   - Synchronous XHR in pre-hydration (acceptable for small JSON)

2. **Cookie-Based Persistence**:
   - Instant variant retrieval
   - No database lookup needed
   - 365-day expiry for long-term consistency

3. **Lazy Analytics**:
   - Tracking is fire-and-forget
   - Non-blocking async calls
   - Errors don't affect user experience

4. **Minimal JavaScript**:
   - Core logic ~580 lines
   - Tree-shakeable exports
   - No heavy dependencies

### Flicker Prevention

**Problem**: React hydration mismatch causes content flash

**Solution**: Pre-hydration script

```html
<Script id="ab-variant-preload" strategy="beforeInteractive">
  // Synchronously load variant BEFORE React renders
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/ab-tests.json', false); // Synchronous!
  xhr.send();
  window.__AB_HERO_CONTENT = { ... };
</Script>
```

**Result**: Content is ready before first paint, zero flicker.

---

## Admin Panel Management

### Test Creation Flow

**File**: `admin-ksiegai/src/modules/AB/screens/ABTestCreate.tsx`

1. **Basic Configuration**:
   - Test name and description
   - Page path (e.g., `/`, `/pricing`)
   - Test key (unique identifier)
   - Traffic allocation (0-100%)
   - Primary goal (signup, purchase, etc.)
   - Secondary goals (optional)

2. **Variant Definition**:
   - Variant name
   - Weight (0-1, must sum to 1.0)
   - Content changes (key-value pairs)

3. **Validation**:
   - Weights must sum to 1.0
   - Test key must be unique
   - At least 2 variants required

4. **Export to JSON**:
   - Admin saves test to Supabase
   - Build script fetches active tests
   - Generates `/public/ab-tests.json`

### Test Management

**File**: `admin-ksiegai/src/modules/AB/screens/ABTests.tsx`

**Features**:
- List all tests with status badges
- Filter by name/page path
- Quick actions: Start, Pause, Edit, View Results
- Stats overview: Total, Active, Draft, Completed

**Status Workflow**:
```
draft → active → paused → completed
         ↓                    ↑
         └────────────────────┘
```

### Results Analysis

**File**: `admin-ksiegai/src/modules/AB/screens/ABTestDetail.tsx`

**Metrics Displayed**:
1. **Total Assignments**: Users assigned to test
2. **Total Conversions**: Goal completions
3. **Conversion Rate**: Conversions / Assignments
4. **Confidence Level**: Statistical significance (z-test)

**Per-Variant Stats**:
- Assignments count
- Conversions count
- Conversion rate percentage
- Page views
- Visual progress bar

**Statistical Significance**:
```typescript
// Simple z-test for two proportions
const p1 = control.conversions / control.assignments;
const p2 = variant.conversions / variant.assignments;
const pooled = (control.conversions + variant.conversions) / 
               (control.assignments + variant.assignments);

const se = Math.sqrt(pooled * (1 - pooled) * 
           (1 / control.assignments + 1 / variant.assignments));

const z = Math.abs((p1 - p2) / se);
const confidence = (1 - Math.exp(-z * z / 2)) * 100;
```

**Winner Declaration**:
- Manual declaration by admin
- Recommended when confidence > 95%
- Sets `winner_variant_id` and `status: completed`

### Variant Editor

**File**: `admin-ksiegai/src/modules/AB/components/ABTestVariantEditor.tsx`

**Features**:
- Dynamic key-value pair editor
- Weight slider with percentage display
- Common key suggestions (headline, cta, etc.)
- Drag-and-drop reordering
- Real-time validation

---

## Database Schema

### Tables

#### `ab_test_definitions`
```sql
CREATE TABLE ab_test_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  page_path TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  traffic_allocation DECIMAL(3,2) DEFAULT 1.0,
  variants JSONB NOT NULL,
  primary_goal TEXT NOT NULL,
  secondary_goals TEXT[],
  winner_variant_id TEXT,
  confidence_level DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Variants JSONB Structure**:
```json
[
  {
    "id": "variant_a",
    "name": "Control",
    "weight": 0.5,
    "changes": {
      "headline": "...",
      "cta": "..."
    }
  }
]
```

#### `ab_test_assignments`
```sql
CREATE TABLE ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID REFERENCES ab_test_definitions(id),
  session_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(test_id, session_id)
);
```

**Purpose**: One record per user per test, tracks which variant assigned.

#### `ab_test_events`
```sql
CREATE TABLE ab_test_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID REFERENCES ab_test_definitions(id),
  assignment_id UUID REFERENCES ab_test_assignments(id),
  variant_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'conversion', 'click', 'scroll', 'time_on_page', 'custom')),
  event_name TEXT,
  event_value DECIMAL(10,2),
  event_metadata JSONB,
  page_path TEXT,
  time_on_page INTEGER,
  scroll_depth INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Purpose**: All user interactions and conversions.

### Indexes

```sql
CREATE INDEX idx_assignments_test_session ON ab_test_assignments(test_id, session_id);
CREATE INDEX idx_events_test_variant ON ab_test_events(test_id, variant_id);
CREATE INDEX idx_events_type ON ab_test_events(event_type);
CREATE INDEX idx_events_assignment ON ab_test_events(assignment_id);
```

---

## Implementation Details

### Build Process

1. **Pre-build Script**: `scripts/fetch-ab-tests.js`
   ```javascript
   const { data } = await supabase
     .from('ab_test_definitions')
     .select('*')
     .eq('status', 'active');
   
   fs.writeFileSync('./public/ab-tests.json', JSON.stringify(data));
   ```

2. **Package.json**:
   ```json
   {
     "scripts": {
       "prebuild": "node scripts/fetch-ab-tests.js",
       "build": "next build"
     }
   }
   ```

3. **Deployment**:
   - Cloudflare Pages runs `npm run build`
   - Pre-build fetches active tests
   - Static JSON included in build
   - No runtime database dependency

### Debug Mode

**Activation**:
```javascript
// In browser console
window.abTestDebug.switchVariant('ksef_fear_vs_efficiency_test', 'variant_b');
// Refresh page to see variant B
```

**Features**:
- Force specific variant
- Disable analytics tracking
- List current overrides
- Clear overrides

**Implementation**:
```typescript
window.abTestDebug = {
  switchVariant: (testKey, variantId) => {
    setDebugOverride(testKey, variantId);
    setDebugAnalyticsDisabled(true);
    setCookie(`ab_${testKey}`, variantId);
  },
  clearVariant: (testKey) => setDebugOverride(testKey, null),
  disableDebug: () => { /* clear all */ },
  listOverrides: () => getDebugOverrides()
};
```

### Cookie Management

**Cookie Name**: `ab_{test_key}`

**Example**: `ab_ksef_fear_vs_efficiency_test=variant_a`

**Properties**:
- Path: `/`
- Max-Age: 365 days
- SameSite: Lax
- No HttpOnly (needs JS access)
- No Secure flag (works on HTTP/HTTPS)

**Helpers**:
```typescript
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}
```

### Session ID Generation

**Format**: `{timestamp}-{random9chars}`

**Example**: `1704672000000-k3j9d8f2a`

**Storage**: Cookie `ab_session_id` (365 days)

**Purpose**: Anonymous user tracking across sessions

---

## Summary

### How 50/50 Distribution Works Across All Users

**Short Answer**: Uses deterministic hash-based selection that maps each user's session ID to a variant, ensuring consistent assignment and statistically accurate 50/50 distribution across all distributed users worldwide.

**Long Answer**:
1. Each user gets a unique session ID (stored in cookie for 365 days)
2. Session ID is hashed with test key to produce a deterministic 0-1 value
3. Hash value maps to variant based on cumulative weights
4. Same user always gets same variant (deterministic)
5. Different users get uniformly distributed variants (hash uniformity)

**Example**:
- User A (session: "abc123") → hash = 0.234 → Variant A
- User B (session: "xyz789") → hash = 0.789 → Variant B  
- User C (session: "def456") → hash = 0.123 → Variant A
- User D (session: "mno012") → hash = 0.891 → Variant B

Over thousands of users, the hash function's uniform distribution ensures accurate 50/50 split without any server coordination or global state.

### Efficiency

- **Fast**: Zero-flicker, pre-hydration, static JSON
- **Smooth**: Cookie persistence, no page reloads
- **SEO-friendly**: Server renders default, client hydrates variant
- **Scalable**: No database calls on page load
- **Reliable**: Deterministic assignment, consistent experience

### Current Implementation Status

✅ **Working**:
- Static JSON configuration
- Cookie-based variant assignment
- Pre-hydration script (zero flicker)
- Admin panel for test management
- Supabase analytics tracking
- Statistical significance calculation
- Debug mode

🔄 **Active Test**:
- Home page headline test
- 2 variants (Control & Risk vs Efficiency & Scale)
- 50/50 weight distribution
- 100% traffic allocation
- Primary goal: signup conversions
