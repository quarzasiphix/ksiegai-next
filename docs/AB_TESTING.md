# A/B Testing Infrastructure

This document describes the A/B testing infrastructure implemented for the KsięgaI landing page.

## Overview

The A/B testing system allows you to test different landing page variants to optimize conversion rates. Currently, two variants are implemented:

- **Variant A (Pre-KSeF Standard)**: Lead story focuses on "Inbox faktur dla polskich firm — zanim trafią do KSeF"
- **Variant B (Accountant Lock-in)**: Lead story focuses on "System, który księgowa polubi — i nie będzie chciała zmienić"

## Architecture

### Core Files

1. **`lib/ab-testing.ts`**: Core A/B testing logic
   - Variant assignment and persistence
   - Analytics tracking integration
   - Conversion tracking

2. **`hooks/useVariant.ts`**: React hooks for variant management
   - `useVariant()`: Get current variant
   - `useIsHydrated()`: Check if client-side hydration is complete

3. **`components/landing-variants.tsx`**: Variant-specific components
   - `HeroHeadline`: Different headlines per variant
   - `HeroSubheadline`: Different subheadlines per variant
   - `HeroMicrocopy`: Different microcopy per variant
   - `HeroMechanism`: Different mechanism explanations per variant
   - `KSeFBanner`: Different banner messages per variant
   - `TrackedCTAButton`: CTA button with conversion tracking

## Usage

### Basic Implementation

To use the A/B testing system in your landing page:

```tsx
'use client';

import { useVariant } from '@/shared/hooks/useVariant';
import { HeroHeadline, HeroSubheadline, KSeFBanner } from '@/components/landing-variants';

export default function LandingPage() {
  const variant = useVariant();

  return (
    <div>
      <KSeFBanner variant={variant} />
      <section>
        <HeroHeadline variant={variant} />
        <HeroSubheadline variant={variant} />
        {/* ... rest of your content */}
      </section>
    </div>
  );
}
```

### Tracking Conversions

Track important conversion events:

```tsx
import { trackConversion } from '@/lib/ab-testing';

// Track signup
trackConversion('signup', { plan: 'free' });

// Track premium upgrade
trackConversion('upgrade', { plan: 'premium' });

// Track any custom event
trackConversion('custom_event', { metadata: 'value' });
```

### Testing Variants Manually

For testing purposes, you can force a specific variant:

```tsx
import { setVariant, clearVariant } from '@/lib/ab-testing';

// Force variant A
setVariant('A');

// Force variant B
setVariant('B');

// Clear variant assignment (get new random assignment)
clearVariant();
```

You can also use URL parameters for testing:
- `?variant=A` - Force variant A
- `?variant=B` - Force variant B

## Analytics Integration

The system is designed to integrate with your analytics platform. Currently supports:

### Google Analytics (gtag.js)

Events are automatically sent to Google Analytics if `gtag` is available:

- `variant_assigned`: When a user is assigned to a variant
- `cta_click`: When a CTA button is clicked
- Custom conversion events via `trackConversion()`

### Custom Analytics Endpoint

You can uncomment and configure the fetch calls in `lib/ab-testing.ts` to send data to your own analytics endpoint:

```typescript
fetch('/api/analytics/variant', {
  method: 'POST',
  body: JSON.stringify({ variant, timestamp: Date.now() }),
});
```

## Variant Configuration

Edit `lib/ab-testing.ts` to configure variants:

```typescript
export const VARIANTS: Record<LandingPageVariant, VariantConfig> = {
  A: {
    id: 'A',
    name: 'Pre-KSeF Standard',
    description: 'Lead story: "Inbox faktur dla polskich firm — zanim trafią do KSeF"',
    weight: 50, // 50% of traffic
  },
  B: {
    id: 'B',
    name: 'Accountant Lock-in',
    description: 'Lead story: "System, który księgowa polubi — i nie będzie chciała zmienić"',
    weight: 50, // 50% of traffic
  },
};
```

## Best Practices

1. **Run tests for sufficient duration**: Aim for at least 2-4 weeks to account for weekly patterns
2. **Wait for statistical significance**: Don't make decisions on small sample sizes
3. **Test one thing at a time**: Keep variants focused on a single hypothesis
4. **Document your hypotheses**: Write down what you expect to happen and why
5. **Monitor both metrics**: Track both conversion rate and user engagement

## Metrics to Track

Key metrics for landing page optimization:

- **Primary**: Signup conversion rate
- **Secondary**: 
  - Time on page
  - Scroll depth
  - CTA click-through rate
  - Premium upgrade rate
  - Bounce rate

## Adding New Variants

To add a new variant (e.g., Variant C):

1. Update the type in `lib/ab-testing.ts`:
   ```typescript
   export type LandingPageVariant = 'A' | 'B' | 'C';
   ```

2. Add variant config:
   ```typescript
   C: {
     id: 'C',
     name: 'Your Variant Name',
     description: 'Description of the variant',
     weight: 33, // Adjust weights to total 100
   }
   ```

3. Add variant-specific content in `components/landing-variants.tsx`:
   ```tsx
   if (variant === 'C') {
     return <YourCustomContent />;
   }
   ```

## Troubleshooting

### Variant not persisting across page loads
- Check if localStorage is enabled in the browser
- Verify no browser extensions are blocking localStorage

### Analytics events not firing
- Check browser console for errors
- Verify gtag.js is loaded
- Check if ad blockers are interfering

### Seeing flash of wrong variant
- Use `useIsHydrated()` hook to conditionally render content
- Consider server-side variant assignment with cookies

## Future Enhancements

Potential improvements to consider:

1. **Server-side variant assignment**: Use cookies for SSR consistency
2. **Multi-armed bandit**: Automatically adjust traffic to winning variant
3. **Segment-based testing**: Different variants for different user segments
4. **Visual editor**: No-code variant creation
5. **Advanced analytics**: Cohort analysis, funnel tracking, heatmaps
