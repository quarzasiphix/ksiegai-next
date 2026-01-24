# Cloudflare Pages Deployment Fix

## Problem Summary

Your Cloudflare Pages build was failing with:
```
Error: supabaseKey is required.
Failed to collect page data for /api/ab-track
```

## Root Cause

Next.js API routes (`app/api/`) don't work with `output: "export"` (static site generation). During the build process, Next.js tries to statically generate API routes, which fails when Supabase environment variables aren't available.

## Solution Applied

### 1. Removed Next.js API Route
- **Deleted**: `app/api/ab-track/route.ts`
- **Reason**: API routes are incompatible with static export

### 2. Created Cloudflare Function
- **Created**: `functions/api/ab-track.ts`
- **Type**: Cloudflare Pages Function (serverless edge function)
- **Benefits**:
  - Works with static sites
  - Runs on Cloudflare's edge network
  - Has access to environment variables at runtime
  - No build-time dependency on env vars

### 3. Updated Configuration
- **Updated**: `.gitignore` to exclude `.dev.vars` and wrangler files
- **Kept**: `next.config.ts` simple (no special API route handling needed)

## What You Need to Do

### Step 1: Set Environment Variables in Cloudflare

Go to your Cloudflare Pages dashboard and add these environment variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://rncrzxjyffxmfbnxlqtm.supabase.co` (or your Supabase URL)
   - Environment: Production + Preview

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your Supabase service role key from Supabase dashboard
   - Environment: Production + Preview
   - ⚠️ Keep this secret!

**How to find these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Commit and Push

```bash
git add .
git commit -m "Fix: Convert API route to Cloudflare Function for static export"
git push origin main
```

Cloudflare will automatically:
1. Detect the push
2. Run the build (`npm install` → `npx next build`)
3. Deploy the static site from `out/` directory
4. Deploy the Cloudflare Function from `functions/` directory

### Step 3: Verify Deployment

After the build completes:

1. **Check Build Logs**: Ensure no errors
2. **Visit Site**: `https://your-project.pages.dev`
3. **Test A/B Tracking**: Open browser console and run:

```javascript
fetch('/api/ab-track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    test_id: 'test-id',
    session_id: 'test-session',
    variant_id: 'variant_a',
    event_type: 'assignment'
  })
})
.then(r => r.json())
.then(console.log);
// Should return: { success: true }
```

## Files Changed

### Created
- ✅ `functions/api/ab-track.ts` - Cloudflare Function for A/B tracking
- ✅ `docs/CLOUDFLARE_DEPLOYMENT.md` - Comprehensive deployment guide

### Modified
- ✅ `.gitignore` - Added `.dev.vars` and wrangler files
- ✅ `app/api/ab-track/route.ts` - Removed (deleted entire `app/api/` directory)

### No Changes Needed
- ✅ `next.config.ts` - Already configured for static export
- ✅ `wrangler.jsonc` - Already configured correctly
- ✅ Client-side A/B testing code - Still works the same

## Why This Works

### Static Export + Cloudflare Functions = Perfect Combo

1. **Static Site**: 
   - Next.js builds HTML/CSS/JS to `out/` directory
   - No server needed
   - Fast, cached by Cloudflare CDN

2. **Cloudflare Functions**:
   - Handle dynamic API requests
   - Run on edge (low latency)
   - Have access to environment variables
   - Scale automatically

3. **A/B Testing Flow**:
   ```
   User visits page
   → Static HTML loads instantly (from CDN)
   → Client-side JS assigns variant (hash-based)
   → Tracking calls /api/ab-track
   → Cloudflare Function handles request
   → Data saved to Supabase
   ```

## Troubleshooting

### Build Still Fails

**Check**: Did you remove the `app/api/` directory?
```bash
# Verify it's deleted
ls app/api  # Should show "cannot find the path"
```

### Function Returns 500 Error

**Check**: Are environment variables set in Cloudflare dashboard?
1. Go to Cloudflare Pages → Your Project → Settings → Environment variables
2. Verify both variables are present
3. Redeploy if you just added them

### No Data in Supabase

**Check**: 
1. Verify Supabase URL and key are correct
2. Check Cloudflare Function logs for errors
3. Verify Supabase tables exist: `ab_test_assignments`, `ab_test_events`

## Next Steps

1. ✅ Set environment variables in Cloudflare
2. ✅ Push code to GitHub
3. ✅ Wait for build to complete
4. ✅ Test the deployment
5. ✅ Monitor Supabase for incoming data

## Additional Documentation

See `docs/CLOUDFLARE_DEPLOYMENT.md` for:
- Detailed setup instructions
- Local development guide
- Security best practices
- Monitoring and debugging
- Performance optimization

---

**Summary**: The build will now succeed because we're using Cloudflare Functions instead of Next.js API routes. Just set the environment variables in Cloudflare dashboard and push the code!
