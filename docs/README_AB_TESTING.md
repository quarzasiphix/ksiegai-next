# A/B Testing System - Implementation Guide

## Overview

The A/B testing system is now fully integrated into the Next.js frontend, tracking user variants from landing page through registration.

## How It Works

### 1. **Landing Page (`/`)**
- Uses `useABTest('/')` hook to fetch active tests for homepage
- Randomly assigns variants based on weights
- Tracks page views and CTA clicks
- Stores assignment in database via session ID

### 2. **Registration Page (`/rejestracja`)**
- Retrieves variant assignments from session
- Tracks registration as conversion event
- Links variant data to user account on signup
- Stores variant info in user metadata

### 3. **Admin Panel**
- Create/manage A/B tests via `/ab-tests`
- Define variants with custom content changes
- Monitor results and conversions in real-time

## Creating an A/B Test

### Step 1: Create Test in Admin Panel

```typescript
{
  name: "Homepage Hero Test",
  test_key: "homepage_hero_v1",
  page_path: "/",
  status: "active",
  traffic_allocation: 1.0, // 100% of users
  variants: [
    {
      id: "control",
      name: "Control",
      weight: 0.5,
      changes: {
        heroTitle: "Faktura nie trafia do KSeF, dopóki strony jej nie uzgodnią",
        heroSubtitle: "KsięgaI to warstwa kontroli...",
        ctaText: "Dołącz do sieci zweryfikowanych firm"
      }
    },
    {
      id: "variant_a",
      name: "Variant A - Direct Value",
      weight: 0.5,
      changes: {
        heroTitle: "Zacznij księgowość w 15 minut",
        heroSubtitle: "Bez migracji, bez komplikacji - działasz od pierwszego dnia",
        ctaText: "Rozpocznij za darmo"
      }
    }
  ],
  primary_goal: "registration"
}
```

### Step 2: Variant Content is Applied Automatically

The landing page reads `variant.changes` and applies:
- `heroTitle` → Main headline
- `heroSubtitle` → Subheadline
- `ctaText` → Call-to-action button text

### Step 3: Track Conversions

Registration automatically tracks as conversion:
```typescript
event_type: 'conversion'
event_name: 'registration'
event_metadata: {
  user_id: "...",
  registration_method: "magic_link" | "google_oauth"
}
```

## Database Schema

### `ab_test_definitions`
- Test configuration and variants
- Managed via admin panel

### `ab_test_assignments`
- Links session_id → variant_id
- Updated with user_id on registration
- Tracks user_agent for analytics

### `ab_test_events`
- Page views, clicks, conversions
- Linked to assignments
- Used for calculating results

## Variant Assignment Flow

```
1. User visits landing page (/)
   ↓
2. useABTest hook checks for active test
   ↓
3. System checks if session_id has assignment
   ↓
4. If no assignment: randomly select variant by weight
   ↓
5. Store assignment in database
   ↓
6. Track page_view event
   ↓
7. User clicks CTA → track click event
   ↓
8. User registers → track conversion event
   ↓
9. Link assignment to user_id
   ↓
10. Store variant data in user.metadata
```

## Key Features

✅ **Persistent Assignments**: Session-based, survives page refreshes
✅ **User Linking**: Variants linked to user account on signup
✅ **Conversion Tracking**: Automatic registration conversion tracking
✅ **Metadata Storage**: Variant info saved in user profile
✅ **Multi-Test Support**: Can run multiple tests simultaneously
✅ **Weight-Based Distribution**: Control traffic split per variant
✅ **Real-Time Analytics**: Admin panel shows live results

## Example Variant Changes

### Homepage Hero Test
```json
{
  "heroTitle": "Alternative headline",
  "heroSubtitle": "Alternative subtitle",
  "ctaText": "Alternative CTA"
}
```

### Pricing Test
```json
{
  "pricingTitle": "Different pricing message",
  "showDiscount": true,
  "discountPercent": 20
}
```

### Social Proof Test
```json
{
  "showTestimonials": true,
  "testimonialCount": 3,
  "showTrustBadges": true
}
```

## Checking Results

1. Go to Admin Panel → A/B Tests
2. Click on test to view results
3. See conversion rates per variant
4. Statistical significance calculated automatically
5. Declare winner when confidence > 95%

## Best Practices

1. **One Variable at a Time**: Test one change per experiment
2. **Sufficient Sample Size**: Run until statistical significance
3. **Clear Hypothesis**: Know what you're testing and why
4. **Track Multiple Metrics**: Primary goal + secondary metrics
5. **Document Learnings**: Record insights in test description

## Technical Notes

- Session ID stored in cookie (1 year expiry)
- Assignments cached in database
- Conversion tracking is fire-and-forget (no blocking)
- User metadata updated asynchronously
- Works with both magic link and OAuth registration
