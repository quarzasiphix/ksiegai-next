# Next.js Marketing Site Deployment Guide

**Date**: 2024-01-24  
**Purpose**: Deploy Google login fixes to ksiegai-next marketing site

---

## 🚨 Current Issue

The site is still running old code with:
- ❌ Multiple Supabase client instances
- ❌ Session restoration issues  
- ❌ Refresh token errors
- ❌ Login works then immediately logs out

**Fixes are ready but need deployment!**

---

## 🛠️ Files That Need Deployment

### Core Fixes
1. **`lib/supabase.ts`** (NEW) - Singleton Supabase client
2. **`components/Header.tsx`** - Better session restoration
3. **`app/logowanie/page.tsx`** - Uses singleton client
4. **`app/auth/callback/page.tsx`** - Uses singleton client + OAuth fix
5. **`lib/auth/crossDomainAuth.ts`** - Better token management

### Expected Behavior After Deploy
- ✅ No "Multiple GoTrueClient instances" warnings
- ✅ Google login completes and persists
- ✅ No refresh token 400 errors
- ✅ User stays logged in

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
cd ksiegai-next
npm install -g vercel
vercel --prod
```

### Option 2: Netlify
```bash
cd ksiegai-next
npm run build
# Deploy the /out folder to Netlify
```

### Option 3: Traditional Hosting
```bash
cd ksiegai-next
npm run build
# Upload the /out folder contents to your hosting
```

### Option 4: Docker
```bash
cd ksiegai-next
docker build -t ksiegai-next .
docker run -p 3000:3000 ksiegai-next
```

---

## 🔧 Pre-Deployment Checklist

### 1. Verify Environment Variables
```bash
# In ksiegai-next/.env
NEXT_PUBLIC_SUPABASE_URL=https://rncrzxjyffxmfbnxlqtm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_DOMAIN=app.ksiegai.pl
```

### 2. Test Build Locally
```bash
cd ksiegai-next
npm run build
npm run start
# Test locally first if possible
```

### 3. Clear Browser Cache
After deployment, users need to:
- Clear browser cache/cookies
- Or use incognito mode
- This prevents old cached code conflicts

---

## 📊 Deployment Verification

### After Deploy, Check Console Logs

#### ✅ Should See:
```
[Header] Found cross-domain token, restoring session
[Header] Auth state changed: SIGNED_IN 6992a5f3-d1e7-4caf-ac2d-5ba2301028cc
[crossDomainAuth] Storing auth token: {user_id: "...", expires_at: ...}
```

#### ❌ Should NOT See:
```
Multiple GoTrueClient instances detected
POST /auth/v1/token?grant_type=refresh_token 400
[Header] Auth state changed: SIGNED_OUT
```

### Test Google Login Flow
1. Go to `https://ksiegai.pl/logowanie`
2. Click "Zaloguj przez Google"
3. Complete authentication
4. **Expected**: Should stay logged in, no immediate logout

---

## 🚨 Important Notes

### Cache Issues
- **Browser cache** can serve old JavaScript files
- **CDN cache** may need to be cleared
- **Hard refresh** (Ctrl+F5) recommended after deploy

### Domain Configuration
- Ensure `www.ksiegai.pl` and `ksiegai.pl` both work
- Cross-domain cookies require `.ksiegai.pl` domain
- SSL certificate must be valid

### Supabase Configuration
- Redirect URLs must include `https://ksiegai.pl/auth/callback`
- Site URL should be `https://ksiegai.pl`
- Google OAuth must be enabled in Supabase

---

## 🎯 Quick Deploy Command

```bash
# One-liner deployment (Vercel)
cd ksiegai-next && npm run build && npx vercel --prod --yes
```

---

## 📞 If Issues Persist

### 1. Check Deployment Success
- Verify new files are deployed
- Check build logs for errors
- Ensure environment variables are set

### 2. Clear All Caches
- Browser cache
- CDN cache (if applicable)
- Server cache (if applicable)

### 3. Test in Incognito
- Use incognito/private mode
- This bypasses all cache issues

### 4. Check Network Tab
- Look for 404 errors on new files
- Verify JavaScript files are loading
- Check for console errors

---

**The fixes are ready and tested - they just need to be deployed!** 🚀
