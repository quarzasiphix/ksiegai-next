# A/B Testing Quick Start Guide

## 🚀 Setup (One Time)

### 1. Environment Variables
Ensure these are in your `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://rncrzxjyffxmfbnxlqtm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Verify Database Tables
Required tables (should already exist):
- `ab_test_definitions`
- `ab_test_assignments`
- `ab_test_events`

## 📝 Creating Your First Test

### Step 1: Create Test in Admin Panel

Go to admin panel → A/B Tests → Create Test

**Example Test Configuration:**
```json
{
  "name": "Homepage Hero CTA Test",
  "test_key": "homepage_hero_cta",
  "page_path": "/",
  "status": "active",
  "traffic_allocation": 1.0,
  "primary_goal": "registration",
  "variants": [
    {
      "id": "control",
      "name": "Control - Original",
      "weight": 0.5,
      "changes": {
        "heroTitle": "Faktura nie trafia do KSeF, dopóki strony jej nie uzgodnią",
        "heroSubtitle": "KsięgaI to warstwa kontroli i odpowiedzialności między Twoim systemem ERP a KSeF",
        "ctaText": "Dołącz do sieci zweryfikowanych firm"
      }
    },
    {
      "id": "variant_direct",
      "name": "Variant - Direct CTA",
      "weight": 0.5,
      "changes": {
        "heroTitle": "Uzgadniaj faktury przed wysłaniem do KSeF",
        "heroSubtitle": "Negocjuj, weryfikuj i akceptuj dokumenty z pełnym śladem audytu",
        "ctaText": "Rozpocznij za darmo"
      }
    }
  ]
}
```

### Step 2: Build Your Site
```bash
npm run build
```

This will:
1. Run `prebuild` script
2. Fetch active tests from Supabase
3. Create `public/ab-tests.json`
4. Build static site with tests embedded

### Step 3: Deploy
```bash
npx wrangler pages deploy out
```

## 🎯 Using Tests in Your Code

### Basic Usage
```tsx
import { useABTestSSG } from '@/hooks/useABTestSSG';

export default function MyPage() {
  const { variant, isLoading, trackConversion, trackEvent } = useABTestSSG('/');

  const title = variant?.changes?.heroTitle || 'Default Title';
  
  return <h1>{title}</h1>;
}
```

### With Tracking
```tsx
const handleCTAClick = () => {
  // Track the click
  trackEvent('click', 'hero_cta_clicked', {
    variant: variant?.name,
    location: 'hero_section'
  });
  
  // Navigate or perform action
  router.push('/signup');
};

const handleSignupComplete = () => {
  // Track conversion
  trackConversion('registration', 1, {
    source: 'hero_cta',
    variant: variant?.name
  });
};
```

## 📊 Viewing Results

### In Admin Panel
1. Navigate to `/ab-tests` in admin panel
2. Click on your test
3. View real-time metrics:
   - Assignments per variant
   - Conversions per variant
   - Conversion rates
   - Statistical significance
   - Time on page
   - Scroll depth

### When to Declare Winner
- Wait for **95%+ statistical significance**
- Ensure sufficient sample size (100+ conversions recommended)
- Run for at least 1-2 weeks to account for day-of-week variations

## 🔄 Updating Tests

### To Modify a Test:
1. Update test in admin panel
2. Rebuild: `npm run build`
3. Redeploy: `npx wrangler pages deploy out`

⚠️ **Important**: Changes require rebuild and redeploy

### To Pause a Test:
1. Set status to "paused" in admin panel
2. Rebuild and redeploy
3. Users will see default content

### To Complete a Test:
1. Click "Declare Winner" in admin panel
2. Implement winning variant permanently in code
3. Remove A/B test logic
4. Set test status to "completed"

## 📈 Metrics Tracked Automatically

- ✅ **Page Views**: Every time variant is shown
- ✅ **Time on Page**: Duration before leaving
- ✅ **Scroll Depth**: 25%, 50%, 75%, 100% milestones
- ✅ **Assignments**: Which variant each user sees
- ✅ **User Context**: User agent, referrer, UTM params

## 🎨 Advanced Patterns

### Multiple Elements
```tsx
const { variant } = useABTestSSG('/');

const heroTitle = variant?.changes?.heroTitle || 'Default';
const heroSubtitle = variant?.changes?.heroSubtitle || 'Default';
const ctaText = variant?.changes?.ctaText || 'Default';
const ctaColor = variant?.changes?.ctaColor || 'blue';
```

### Conditional Components
```tsx
{variant?.id === 'variant_new_design' ? (
  <NewHeroComponent />
) : (
  <OriginalHeroComponent />
)}
```

### Track Custom Events
```tsx
// Track video play
trackEvent('custom', 'video_played', {
  video_id: 'intro_video',
  timestamp: Date.now()
});

// Track feature interaction
trackEvent('custom', 'feature_clicked', {
  feature: 'pricing_calculator',
  interaction_type: 'expand'
});
```

## 🐛 Troubleshooting

### Tests Not Loading
```bash
# Check if ab-tests.json was created
ls public/ab-tests.json

# Check build logs
npm run build
```

### Events Not Tracking
1. Open browser console
2. Check for errors in Network tab
3. Verify `/api/ab-track` endpoint responds
4. Check Supabase permissions

### Build Fails
```bash
# Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Test Supabase connection
node scripts/fetch-ab-tests.js
```

## 📞 Common Issues

**Issue**: "No A/B tests found"
- **Solution**: Create a test in admin panel and set status to "active"

**Issue**: "Failed to track event"
- **Solution**: Check Supabase service role key has write permissions

**Issue**: "Variant not persisting"
- **Solution**: Check browser cookies are enabled

**Issue**: "Statistical significance not increasing"
- **Solution**: Need more traffic or longer test duration

## 🎯 Best Practices

1. **Start Simple**: Test one element at a time
2. **Be Patient**: Wait for statistical significance
3. **Track Everything**: Use custom events liberally
4. **Document Learnings**: Note insights in admin panel
5. **Clean Up**: Remove completed tests from code
6. **Monitor Performance**: Check time-on-page metrics

## 📚 Example Test Ideas

- **Hero CTA Text**: "Get Started" vs "Start Free Trial"
- **Hero Title**: Feature-focused vs Benefit-focused
- **Pricing Display**: Monthly vs Annual first
- **Social Proof**: Testimonials vs Statistics
- **Form Length**: Short vs Detailed
- **Button Color**: Blue vs Green vs Orange

## 🔗 Resources

- Full documentation: `README_AB_TESTING_SSG.md`
- Admin panel: `/ab-tests`
- API endpoint: `/api/ab-track`
- Database: Supabase project "Fakturing"
