# Google Tag Manager Setup Guide

## Overview

This guide explains how to set up Google Tag Manager (GTM) for tracking user interactions, specifically the hero register button clicks, while maintaining compatibility with the existing A/B testing system.

## Implementation

### 1. GTM Script Integration

The GTM scripts are added to `app/layout.tsx`:

#### DataLayer Initialization
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
```

#### Main GTM Script
```typescript
<Script
  id="gtm-script"
  src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"
  strategy="afterInteractive"
/>
```

#### Noscript Fallback
```typescript
<noscript
  dangerouslySetInnerHTML={{
    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  }}
/>
```

### 2. Register Button Tracking

The hero register button in `app/page.tsx` now includes GTM tracking:

```typescript
const handleCtaClick = () => {
  // Track with A/B testing system
  trackEvent('click', 'hero_cta_clicked', { variant: variant?.name });
  
  // Track with Google Tag Manager
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'cta_click',
      event_category: 'engagement',
      event_action: 'hero_register_button_click',
      event_label: content.cta,
      variant_name: variant?.name,
      variant_id: variant?.id,
      button_text: content.cta,
      page_location: window.location.href,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }
};
```

## Setup Instructions

### Step 1: Create GTM Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account
3. Create a container for your website
4. Copy the Container ID (format: `GTM-XXXXXXX`)

### Step 2: Update Container ID

Replace `GTM-XXXXXXX` in `app/layout.tsx` with your actual GTM container ID:

```typescript
src="https://www.googletagmanager.com/gtm.js?id=GTM-YOUR_CONTAINER_ID"
```

### Step 3: Configure GTM Tags

#### 1. Google Analytics 4 Tag
1. In GTM, go to **Tags** → **New**
2. Choose **Google Analytics: GA4 Configuration**
3. Enter your GA4 Measurement ID
4. Trigger: **All Pages**

#### 2. CTA Click Event Tag
1. **Tags** → **New**
2. Choose **Google Analytics: GA4 Event**
3. Event Name: `cta_click`
4. GA4 Tag: Select your GA4 configuration tag
5. Trigger: **Custom Event** → Event Name: `cta_click`

#### 3. Trigger for CTA Clicks
1. **Triggers** → **New**
2. Choose **Custom Event**
3. Event Name: `cta_click`
4. This trigger fires on: **All Custom Events**

### Step 4: Test Your Setup

#### GTM Preview Mode
1. In GTM, click **Preview**
2. Enter your website URL
3. Click **Connect**
4. Open your website in the new tab
5. Click the register button
6. Check the GTM debug console for the `cta_click` event

#### Browser Console Check
```javascript
// Check if dataLayer is initialized
console.log(window.dataLayer);

// Manually test event push
window.dataLayer.push({
  event: 'test_event',
  custom_parameter: 'test_value'
});
```

## Event Data Structure

### CTA Click Event

When users click the register button, GTM receives:

```javascript
{
  event: 'cta_click',
  event_category: 'engagement',
  event_action: 'hero_register_button_click',
  event_label: 'Zobacz jak wygląda bezpieczny KSeF', // Button text
  variant_name: 'Variant A – Control & Risk',        // A/B test variant
  variant_id: 'variant_a',                           // Variant ID
  button_text: 'Zobacz jak wygląda bezpieczny KSeF', // Button text
  page_location: 'https://ksiegai.pl/',              // Full URL
  page_path: '/',                                    // Page path
  timestamp: '2024-01-08T01:44:00.000Z'            // Click timestamp
}
```

### A/B Test Integration

The system maintains dual tracking:
- **A/B Testing System**: Tracks conversions for variant analysis
- **GTM**: Tracks events for Google Analytics and marketing tools

## Advanced Configuration

### Custom Dimensions

In GA4, create custom dimensions to capture A/B test data:

1. Go to **GA4 Admin** → **Custom definitions** → **Custom dimensions**
2. Create dimension: `variant_name` (Scope: Event)
3. Create dimension: `variant_id` (Scope: Event)

### Enhanced Ecommerce

For registration funnel tracking:

```typescript
// Enhanced ecommerce event for registration start
window.dataLayer.push({
  event: 'begin_registration',
  ecommerce: {
    currency: 'PLN',
    value: 0,
    items: [{
      item_id: 'registration_free',
      item_name: 'Free Registration',
      category: 'service',
      quantity: 1,
      price: 0
    }]
  },
  variant_name: variant?.name,
  variant_id: variant?.id
});
```

### Cross-Domain Tracking

If you have multiple domains:

```javascript
// In GTM, configure cross-domain measurement
window.dataLayer.push({
  event: 'page_view',
  page_location: window.location.href,
  page_referrer: document.referrer,
  custom_domain: 'ksiegai.pl'
});
```

## Troubleshooting

### Common Issues

#### 1. GTM Not Loading
- Check container ID is correct
- Verify no ad blockers are blocking GTM
- Check browser console for errors

#### 2. Events Not Firing
- Verify `dataLayer` is initialized
- Check event name matches trigger configuration
- Use GTM Preview mode to debug

#### 3. Data Not Appearing in GA4
- Ensure GA4 tag is firing before custom events
- Check GA4 measurement ID is correct
- Verify custom dimensions are configured

### Debug Tools

#### GTM DataLayer Inspector
```javascript
// Monitor dataLayer changes
window.dataLayer.push = function() {
  console.log('dataLayer.push:', arguments);
  Array.prototype.push.apply(window.dataLayer, arguments);
};
```

#### Event Validation
```javascript
// Validate event structure
function validateGTMEvent(event) {
  const required = ['event', 'event_category', 'event_action'];
  return required.every(field => event[field]);
}
```

## Best Practices

### 1. Event Naming
- Use consistent naming conventions
- Use snake_case for event names
- Be descriptive but concise

### 2. Data Consistency
- Always include variant data for A/B tests
- Maintain consistent parameter names
- Use proper data types

### 3. Privacy Compliance
- Update privacy policy for tracking
- Implement consent management if needed
- Respect user privacy preferences

### 4. Performance
- Use `afterInteractive` strategy for non-critical scripts
- Minimize dataLayer pushes
- Avoid blocking page load

## Integration with Existing Systems

### A/B Testing Compatibility

The GTM implementation is fully compatible with the existing A/B testing system:

- **No conflicts**: Both systems track independently
- **Enriched data**: GTM events include A/B test variant information
- **Unified analytics**: GA4 receives both engagement and conversion data

### Future Enhancements

Consider adding GTM tracking for:

1. **Form interactions**: Field focus, validation errors
2. **Scroll engagement**: Depth milestones, time on page
3. **Navigation clicks**: Header, footer, internal links
4. **Video engagement**: Play, pause, completion
5. **Download tracking**: PDF, whitepaper downloads

## Security Considerations

- GTM scripts are loaded from Google's CDN
- No sensitive data is sent to GTM
- All tracking respects user privacy settings
- Scripts use appropriate loading strategies

---

## Quick Start Checklist

- [ ] Create GTM account and container
- [ ] Update container ID in `layout.tsx`
- [ ] Configure GA4 tag in GTM
- [ ] Set up CTA click event tag
- [ ] Test with GTM Preview mode
- [ ] Verify events in GA4
- [ ] Set up custom dimensions for A/B test data
- [ ] Monitor real-time data

This setup provides comprehensive tracking while maintaining the performance and SEO benefits of your existing A/B testing system.
