# Cloudflare Pages Deployment Guide

## Overview

This guide explains how to deploy the Next.js static site to Cloudflare Pages with proper environment variable configuration for the A/B testing system.

## The Build Error You Encountered

```
Error: supabaseKey is required.
Failed to collect page data for /api/ab-track
```

**Root Cause**: Next.js API routes don't work with `output: "export"` (static site generation). When building for Cloudflare Pages, API routes are attempted to be statically generated, causing them to fail when environment variables aren't available at build time.

**Solution**: Use Cloudflare Functions instead of Next.js API routes.

## Architecture Changes

### Before (Broken)
```
app/api/ab-track/route.ts  ❌ Next.js API route (doesn't work with static export)
```

### After (Fixed)
```
functions/api/ab-track.ts  ✅ Cloudflare Function (works with static sites)
```

## Cloudflare Functions

Cloudflare Functions are serverless functions that run on Cloudflare's edge network. They're automatically deployed alongside your static site.

### File Structure
```
ksiegai-next/
├── functions/           # Cloudflare Functions directory
│   └── api/
│       └── ab-track.ts  # Handles /api/ab-track requests
├── out/                 # Static build output (generated)
└── public/              # Static assets
```

### How It Works

1. **Static Site**: Next.js builds static HTML/CSS/JS to `out/` directory
2. **Functions**: Cloudflare deploys functions from `functions/` directory
3. **Routing**: Requests to `/api/ab-track` are handled by the Cloudflare Function
4. **Edge Execution**: Functions run on Cloudflare's edge, close to users

## Environment Variables Setup

### Required Variables

You need to set these in Cloudflare Pages dashboard:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Example: `https://rncrzxjyffxmfbnxlqtm.supabase.co`
   - Scope: Both build and runtime

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Your Supabase service role key (secret)
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Scope: Runtime only (not needed for build)

### How to Set Environment Variables

#### Option 1: Cloudflare Dashboard

1. Go to **Cloudflare Dashboard** → **Pages**
2. Select your project (e.g., `ksiegai-marketing`)
3. Go to **Settings** → **Environment variables**
4. Click **Add variable**
5. Add both variables:
   - Variable name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Environment: **Production** and **Preview**
6. Repeat for `SUPABASE_SERVICE_ROLE_KEY`
7. Click **Save**

#### Option 2: Wrangler CLI

```bash
# Set production environment variables
wrangler pages secret put NEXT_PUBLIC_SUPABASE_URL
wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY

# Or use .dev.vars for local development
echo "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co" > .dev.vars
echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key" >> .dev.vars
```

### Important Notes

- **NEXT_PUBLIC_** prefix: Variables with this prefix are embedded in the static build
- **Service role key**: Keep this secret! Don't commit to git
- **Build vs Runtime**: Build variables are available during `next build`, runtime variables are available to Cloudflare Functions

## Deployment Process

### Automatic Deployment (GitHub)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Fix Cloudflare deployment with Functions"
   git push origin main
   ```

2. **Cloudflare Auto-Deploys**:
   - Cloudflare Pages watches your GitHub repo
   - Automatically triggers build on push
   - Runs `npm install` → `npx next build`
   - Deploys `out/` directory + `functions/`

3. **Check Build Logs**:
   - Go to Cloudflare Dashboard → Pages → Your Project
   - Click on latest deployment
   - View build logs for errors

### Manual Deployment (Wrangler CLI)

```bash
# Build locally
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=ksiegai-marketing

# Or use npm script (if configured)
npm run deploy
```

## Testing the Deployment

### 1. Test Static Site

Visit your Cloudflare Pages URL:
```
https://ksiegai-marketing.pages.dev
```

Check that:
- ✅ Page loads correctly
- ✅ A/B test variant is assigned
- ✅ Content shows correct variant
- ✅ No console errors

### 2. Test A/B Tracking Function

Open browser console and test the API:

```javascript
// Test assignment tracking
fetch('/api/ab-track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    test_id: 'your-test-id',
    session_id: 'test-session-123',
    variant_id: 'variant_a',
    event_type: 'assignment'
  })
})
.then(r => r.json())
.then(console.log);

// Expected response: { success: true }
```

### 3. Verify Supabase Data

Check Supabase tables:

```sql
-- Check assignments
SELECT * FROM ab_test_assignments 
ORDER BY assigned_at DESC 
LIMIT 10;

-- Check events
SELECT * FROM ab_test_events 
ORDER BY created_at DESC 
LIMIT 10;
```

## Troubleshooting

### Build Still Fails

**Error**: `Missing Supabase environment variables`

**Solution**: 
1. Verify environment variables are set in Cloudflare dashboard
2. Make sure `NEXT_PUBLIC_SUPABASE_URL` is set for **build** environment
3. Redeploy after setting variables

### Function Returns 500 Error

**Error**: `Missing Supabase configuration`

**Solution**:
1. Check that `SUPABASE_SERVICE_ROLE_KEY` is set for **production** environment
2. Verify the key is correct (copy from Supabase dashboard)
3. Check Cloudflare Function logs for detailed error

### CORS Issues

**Error**: `Access-Control-Allow-Origin` error in browser

**Solution**: The Cloudflare Function already includes CORS headers. If still seeing errors:

```typescript
// Add to functions/api/ab-track.ts response headers
headers: {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

### Environment Variables Not Working

**Checklist**:
- [ ] Variables are set in Cloudflare dashboard
- [ ] Variables are set for correct environment (Production/Preview)
- [ ] Variable names match exactly (case-sensitive)
- [ ] Redeployed after setting variables
- [ ] No typos in variable values

## Local Development

### Setup

1. **Install Wrangler**:
   ```bash
   npm install -g wrangler
   ```

2. **Create `.dev.vars`** (gitignored):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Run Dev Server**:
   ```bash
   # Terminal 1: Next.js dev server
   npm run dev

   # Terminal 2: Cloudflare Functions dev server
   npx wrangler pages dev out --port 8788
   ```

### Testing Functions Locally

```bash
# Build the site
npm run build

# Run Cloudflare Pages locally with functions
npx wrangler pages dev out

# Test function
curl -X POST http://localhost:8788/api/ab-track \
  -H "Content-Type: application/json" \
  -d '{"test_id":"test","session_id":"123","variant_id":"a","event_type":"assignment"}'
```

## Performance Considerations

### Edge Functions Benefits

- **Low Latency**: Functions run on Cloudflare's edge network (close to users)
- **No Cold Starts**: Cloudflare Functions have minimal cold start time
- **Global Distribution**: Same function code runs in 200+ data centers
- **Cost Effective**: Free tier includes 100,000 requests/day

### Optimization Tips

1. **Minimize Function Size**: Keep `functions/api/ab-track.ts` lean
2. **Use Supabase Connection Pooling**: Reuse Supabase client when possible
3. **Cache Static Assets**: Cloudflare automatically caches `out/` directory
4. **Enable Compression**: Cloudflare auto-compresses responses

## Security Best Practices

### Environment Variables

- ✅ Use `SUPABASE_SERVICE_ROLE_KEY` only in Cloudflare Functions (server-side)
- ✅ Use `NEXT_PUBLIC_SUPABASE_URL` for client-side (safe to expose)
- ❌ Never commit `.dev.vars` to git
- ❌ Never expose service role key in client-side code

### Supabase Security

```sql
-- Enable Row Level Security on all tables
ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_events ENABLE ROW LEVEL SECURITY;

-- Create policy for service role only
CREATE POLICY "Service role can insert assignments"
ON ab_test_assignments FOR INSERT
TO service_role
USING (true);
```

## Monitoring

### Cloudflare Analytics

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. Click **Analytics** tab
3. Monitor:
   - Page views
   - Function invocations
   - Error rates
   - Response times

### Supabase Logs

1. Go to **Supabase Dashboard** → Your Project
2. Click **Logs** → **API Logs**
3. Filter by table: `ab_test_assignments`, `ab_test_events`

### Custom Monitoring

Add logging to Cloudflare Function:

```typescript
export const onRequestPost = async (context: CloudflareContext): Promise<Response> => {
  const startTime = Date.now();
  
  try {
    // ... function logic ...
    
    const duration = Date.now() - startTime;
    console.log(`[AB Track] Success in ${duration}ms`);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('[AB Track] Error:', error);
    // ... error handling ...
  }
};
```

## Next Steps

1. ✅ Set environment variables in Cloudflare dashboard
2. ✅ Push code to GitHub (auto-deploys)
3. ✅ Verify build succeeds
4. ✅ Test A/B tracking function
5. ✅ Monitor Supabase for incoming data
6. ✅ Set up custom domain (optional)

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## Quick Reference

### File Locations
- **Cloudflare Function**: `functions/api/ab-track.ts`
- **Next.js Config**: `next.config.ts`
- **Wrangler Config**: `wrangler.jsonc`
- **Build Output**: `out/` (gitignored)

### Commands
```bash
# Build
npm run build

# Deploy
npx wrangler pages deploy out

# Local dev
npx wrangler pages dev out

# Set secrets
wrangler pages secret put VARIABLE_NAME
```

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (secret)
