# A/B Test User Attribution System

## Overview

This document explains how the A/B testing system tracks which variant a user saw when they registered, allowing you to attribute user signups to specific test variants.

## How It Works

### 1. User Visits Landing Page

When a user visits the homepage:

```typescript
// app/page.tsx
const { variant, trackEvent } = useABTestSSG('/', {
  trackTime: true,
  trackScroll: true,
});
```

**What happens:**
1. System generates or retrieves session ID (stored in cookie)
2. Session ID is hashed with test key to determine variant
3. Variant assignment is stored in:
   - Cookie: `ab_ksef_fear_vs_efficiency_test=variant_a`
   - localStorage: `ab_variant_assignments`
   - Supabase: `ab_test_assignments` table

**Database record created:**
```sql
INSERT INTO ab_test_assignments (
  test_id,
  session_id,
  variant_id,
  user_agent,
  referrer,
  utm_source,
  utm_medium,
  utm_campaign,
  assigned_at
) VALUES (...);
```

### 2. User Clicks Register Button

When user clicks the CTA button:

```typescript
const handleCtaClick = () => {
  trackEvent('click', 'hero_cta_clicked', { variant: variant?.name });
  
  // GTM tracking
  window.dataLayer.push({
    event: 'cta_click',
    variant_name: variant?.name,
    variant_id: variant?.id,
    // ...
  });
};
```

This tracks the click event but doesn't create a conversion yet.

### 3. User Completes Registration

When user successfully registers (via magic link or Google OAuth):

```typescript
// app/rejestracja/page.tsx
const trackRegistrationConversion = async (userId: string) => {
  // Get all A/B test assignments for this session
  const { data: assignments } = await supabase
    .from('ab_test_assignments')
    .select('id, test_id, variant_id')
    .eq('session_id', sessionId);

  // Track conversion event for each test
  const conversionEvents = assignments.map(assignment => ({
    test_id: assignment.test_id,
    assignment_id: assignment.id,
    variant_id: assignment.variant_id,
    event_type: 'conversion',
    event_name: 'registration',
    event_metadata: {
      user_id: userId,
      registration_method: email ? 'magic_link' : 'google_oauth',
      timestamp: new Date().toISOString(),
    },
  }));

  await supabase.from('ab_test_events').insert(conversionEvents);

  // CRITICAL: Link user_id to assignment
  await supabase
    .from('ab_test_assignments')
    .update({ user_id: userId })
    .eq('session_id', sessionId);

  // Store variant info in user metadata
  await supabase.auth.updateUser({
    data: {
      ab_test_variants: variantData,
      ab_session_id: sessionId,
    },
  });
};
```

**What happens:**
1. **Conversion event created** in `ab_test_events` table
2. **User ID linked** to assignment in `ab_test_assignments.user_id`
3. **User metadata updated** with variant information

## Database Schema

### ab_test_assignments Table

```sql
CREATE TABLE ab_test_assignments (
  id UUID PRIMARY KEY,
  test_id UUID REFERENCES ab_test_definitions(id),
  session_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),  -- ← Links to registered user
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(test_id, session_id)
);
```

**Key field:** `user_id` - Set when user registers, links assignment to user account

### ab_test_events Table

```sql
CREATE TABLE ab_test_events (
  id UUID PRIMARY KEY,
  test_id UUID REFERENCES ab_test_definitions(id),
  assignment_id UUID REFERENCES ab_test_assignments(id),
  variant_id TEXT NOT NULL,
  event_type TEXT NOT NULL,  -- 'conversion', 'page_view', 'click', etc.
  event_name TEXT,           -- 'registration', 'signup', etc.
  event_metadata JSONB,      -- Contains user_id and other data
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### User Metadata (auth.users)

```json
{
  "ab_test_variants": {
    "test-id-1": "variant_a",
    "test-id-2": "variant_b"
  },
  "ab_session_id": "1704672000000-k3j9d8f2a"
}
```

## Admin Panel Display

### Variant Performance View

The admin panel shows:

```
┌─────────────────────────────────────────────────────────┐
│ Variant A – Control & Risk                    [Winner] │
├─────────────────────────────────────────────────────────┤
│ Assignments        Registered Users    All Conversions  │
│     1,234               156                 234          │
│                                                          │
│ Conversion Rate         Page Views                      │
│    12.65%                2,456                          │
└─────────────────────────────────────────────────────────┘
```

**Key metrics:**
- **Assignments**: Total users assigned to this variant
- **Registered Users**: Users who completed registration (have `user_id`)
- **All Conversions**: All conversion events (clicks, views, etc.)
- **Conversion Rate**: `(Registered Users / Assignments) * 100`

### Fetching Data

```typescript
// admin-ksiegai/src/modules/AB/screens/ABTestDetail.tsx
const fetchABTestResults = async (testId: string) => {
  // Fetch assignments with user_id
  const { data: assignments } = await supabase
    .from("ab_test_assignments")
    .select("variant_id, user_id")
    .eq("test_id", testId);

  // Count converted users per variant
  const variantStats = variants.map((variant) => {
    const variantAssignments = assignments?.filter(
      (a) => a.variant_id === variant.id
    ) || [];
    
    const convertedUsers = variantAssignments.filter(
      (a) => a.user_id !== null
    ).length;

    return {
      variant_id: variant.id,
      variant_name: variant.name,
      assignments: variantAssignments.length,
      converted_users: convertedUsers,
      conversion_rate: (convertedUsers / variantAssignments.length) * 100,
    };
  });
};
```

## Complete User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User visits homepage                                         │
│    → Session ID generated: "1704672000000-k3j9d8f2a"           │
│    → Hash determines variant: 0.234 → Variant A                │
│    → Assignment stored in database                              │
│    → Cookie set: ab_ksef_fear_vs_efficiency_test=variant_a    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. User sees Variant A content                                  │
│    → Headline: "KSeF bez chaosu, błędów i ryzyka kontroli"    │
│    → CTA: "Zobacz jak wygląda bezpieczeństwo KSeF"            │
│    → Page view tracked                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. User clicks CTA button                                       │
│    → Click event tracked                                        │
│    → GTM event fired                                            │
│    → Redirected to /rejestracja                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. User enters email and registers                              │
│    → Magic link sent / Google OAuth                             │
│    → User confirms email / completes OAuth                      │
│    → User account created: user_id = "abc-123-def"            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Registration conversion tracked                              │
│    → Conversion event inserted into ab_test_events             │
│    → user_id linked to assignment in ab_test_assignments       │
│    → User metadata updated with variant info                    │
│    → Admin panel now shows this as a converted user            │
└─────────────────────────────────────────────────────────────────┘
```

## Querying User Attribution

### Get all users who registered from a specific variant

```sql
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as registered_at,
  a.variant_id,
  a.assigned_at as first_saw_variant,
  t.name as test_name
FROM ab_test_assignments a
JOIN auth.users u ON a.user_id = u.id
JOIN ab_test_definitions t ON a.test_id = t.id
WHERE a.test_id = 'your-test-id'
  AND a.variant_id = 'variant_a'
  AND a.user_id IS NOT NULL
ORDER BY u.created_at DESC;
```

### Get conversion rate by variant

```sql
SELECT 
  variant_id,
  COUNT(*) as total_assignments,
  COUNT(user_id) as converted_users,
  ROUND((COUNT(user_id)::NUMERIC / COUNT(*)::NUMERIC) * 100, 2) as conversion_rate
FROM ab_test_assignments
WHERE test_id = 'your-test-id'
GROUP BY variant_id;
```

### Get user's A/B test history

```sql
SELECT 
  t.name as test_name,
  a.variant_id,
  a.assigned_at,
  CASE 
    WHEN a.user_id IS NOT NULL THEN 'Converted'
    ELSE 'Not Converted'
  END as status
FROM ab_test_assignments a
JOIN ab_test_definitions t ON a.test_id = t.id
WHERE a.user_id = 'user-id-here'
ORDER BY a.assigned_at DESC;
```

## Using the Attribution Data

### 1. Analyze Variant Performance

Compare which variant drives more registrations:

```typescript
// In admin panel
const winningVariant = results.variants.reduce((prev, current) =>
  current.converted_users > prev.converted_users ? current : prev
);
```

### 2. Segment Users by Variant

Target users differently based on which variant they saw:

```typescript
// Get user's variant from metadata
const { data: { user } } = await supabase.auth.getUser();
const userVariants = user.user_metadata.ab_test_variants;

if (userVariants['test-id'] === 'variant_a') {
  // Show onboarding focused on security/control
} else {
  // Show onboarding focused on efficiency/productivity
}
```

### 3. Cohort Analysis

Track long-term metrics by variant:

```sql
-- 30-day retention by variant
SELECT 
  a.variant_id,
  COUNT(DISTINCT u.id) as total_users,
  COUNT(DISTINCT CASE 
    WHEN u.last_sign_in_at > NOW() - INTERVAL '30 days' 
    THEN u.id 
  END) as active_users,
  ROUND(
    COUNT(DISTINCT CASE 
      WHEN u.last_sign_in_at > NOW() - INTERVAL '30 days' 
      THEN u.id 
    END)::NUMERIC / COUNT(DISTINCT u.id)::NUMERIC * 100, 
    2
  ) as retention_rate
FROM ab_test_assignments a
JOIN auth.users u ON a.user_id = u.id
WHERE a.test_id = 'your-test-id'
  AND u.created_at > NOW() - INTERVAL '60 days'
GROUP BY a.variant_id;
```

## Migration Required

Run this migration to add `user_id` support:

```bash
# Apply migration
psql $DATABASE_URL -f supabase/migrations/20260108_add_user_id_to_ab_assignments.sql
```

Or in Supabase Dashboard:
1. Go to **SQL Editor**
2. Paste migration content
3. Click **Run**

## Verification Checklist

- [ ] `ab_test_assignments` table has `user_id` column
- [ ] Index exists on `user_id` for fast lookups
- [ ] Registration page tracks conversions on auth state change
- [ ] User metadata is updated with variant info
- [ ] Admin panel displays "Registered Users" count
- [ ] Conversion rate calculation uses `user_id` count

## Testing the Flow

### 1. Test Variant Assignment

```javascript
// Open homepage in incognito
// Check console for:
[ABTest] ksef_fear_vs_efficiency_test: Variant A (assigned)

// Check cookie:
document.cookie.includes('ab_ksef_fear_vs_efficiency_test=variant_a')
// Should be true
```

### 2. Test Registration Tracking

```javascript
// After registering, check Supabase:
SELECT * FROM ab_test_assignments 
WHERE user_id = 'your-user-id';
// Should return assignment with variant_id

SELECT * FROM ab_test_events 
WHERE event_type = 'conversion' 
  AND event_name = 'registration'
  AND event_metadata->>'user_id' = 'your-user-id';
// Should return conversion event
```

### 3. Test Admin Panel Display

1. Go to admin panel → A/B Tests → Select test
2. Check "Registered Users" column shows count > 0
3. Verify conversion rate is calculated correctly
4. Check that statistical significance updates

## Common Issues

### User ID not being set

**Symptom**: `user_id` remains NULL after registration

**Solution**: Verify auth state change listener is firing:
```typescript
useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await trackRegistrationConversion(session.user.id);
      }
    }
  );
  return () => authListener.subscription.unsubscribe();
}, []);
```

### Conversion rate is 0%

**Symptom**: Admin panel shows 0% conversion rate

**Possible causes:**
1. Migration not applied (no `user_id` column)
2. Registration tracking not firing
3. Session ID mismatch between landing and registration

**Debug**:
```sql
-- Check if any assignments have user_id
SELECT COUNT(*) FROM ab_test_assignments WHERE user_id IS NOT NULL;

-- Check conversion events
SELECT COUNT(*) FROM ab_test_events 
WHERE event_type = 'conversion' AND event_name = 'registration';
```

### Multiple variants for same user

**Symptom**: User has assignments for multiple variants of same test

**Cause**: Session ID changed between visits (cookies cleared)

**Expected behavior**: This is normal. Use the most recent assignment or the one with `user_id` set.

## Best Practices

1. **Always track conversions on auth state change**, not on form submit
2. **Store variant info in user metadata** for future segmentation
3. **Use session ID consistently** across landing and registration pages
4. **Monitor conversion tracking** in Supabase logs
5. **Run statistical significance tests** before declaring winners
6. **Archive test data** before starting new tests on same page

## Summary

The A/B test user attribution system:

✅ **Tracks** which variant each user saw
✅ **Links** user accounts to variant assignments via `user_id`
✅ **Stores** variant info in user metadata for segmentation
✅ **Displays** registered users count in admin panel
✅ **Calculates** conversion rates based on actual registrations
✅ **Enables** long-term cohort analysis by variant

This allows you to definitively answer: **"Which variant drove more user registrations?"**
