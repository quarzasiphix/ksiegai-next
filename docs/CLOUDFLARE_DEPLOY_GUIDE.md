# Cloudflare Pages Deployment Guide

**Date**: 2024-01-24  
**Platform**: Cloudflare Pages  
**Purpose**: Deploy Google login fixes to ksiegai-next

---

## 🚀 Cloudflare Pages Deployment

### Option 1: Direct Build (Recommended)

```bash
cd ksiegai-next
npm run build
```

Then upload the `/out` folder to Cloudflare Pages:
1. Go to Cloudflare Dashboard → Pages
2. Select your project
3. Upload `/out` folder contents
4. Deploy

### Option 2: Wrangler CLI

```bash
cd ksiegai-next
npm install -g wrangler
wrangler pages deploy out --project-name=ksiegai-next
```

### Option 3: Git Integration (Best for Continuous Updates)

If your project is connected to Git:
1. Push the changes to your repository
2. Cloudflare Pages will auto-build and deploy
3. Make sure build command is `npm run build`
4. Output directory is `out`

---

## 🔧 Cloudflare Pages Configuration

### Build Settings (in Cloudflare Dashboard)
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node version**: 18 or latest

### Environment Variables
Set these in Cloudflare Pages → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://rncrzxjyffxmfbnxlqtm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_DOMAIN=app.ksiegai.pl
```

---

## 📋 Pre-Deployment Checklist

### 1. Verify Next.js Config
Ensure `next.config.js` has static export:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig
```

### 2. Test Build Locally
```bash
cd ksiegai-next
npm run build
# Verify /out folder contains all files
ls out/
```

### 3. Check Package.json
Ensure build script exists:
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

---

## 🎯 Deployment Steps

### Step 1: Build the Project
```bash
cd ksiegai-next
npm install
npm run build
```

### Step 2: Deploy to Cloudflare Pages

#### Method A: Web Dashboard
1. Go to Cloudflare Dashboard → Pages
2. Click "Upload assets"
3. Drag and drop the entire `/out` folder
4. Click "Deploy site"

#### Method B: Wrangler CLI
```bash
# Install Wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy out --project-name=ksiegai-next
```

#### Method C: Git Push (if connected)
```bash
git add .
git commit -m "Fix Google login session issues"
git push origin main
# Cloudflare will auto-deploy
```

---

## 🔍 Post-Deployment Verification

### 1. Check Deployment Status
- Cloudflare Pages should show "Success"
- Visit the deployed URL
- Check that new files are serving

### 2. Test Google Login
1. Go to your deployed site
2. Clear browser cache (Ctrl+F5)
3. Go to `/logowanie`
4. Click "Zaloguj przez Google"
5. Complete authentication
6. **Expected**: Should stay logged in

### 3. Check Console Logs
**Should NOT see**:
```
Multiple GoTrueClient instances detected
POST /auth/v1/token?grant_type=refresh_token 400
[Header] Auth state changed: SIGNED_OUT
```

**Should see**:
```
[Header] Found cross-domain token, restoring session
[Header] Auth state changed: SIGNED_IN
[crossDomainAuth] Storing auth token
```

---

## 🚨 Common Cloudflare Issues

### Issue: Static Export Problems
**Solution**: Ensure `next.config.js` has `output: 'export'`

### Issue: Missing Environment Variables
**Solution**: Add them in Cloudflare Pages → Settings → Environment Variables

### Issue: Cache Not Updating
**Solution**: 
- Clear Cloudflare cache in dashboard
- Use Purge Cache → Custom Purge → `https://ksiegai.pl/*`

### Issue: 404 Errors on New Routes
**Solution**: Ensure `trailingSlash: true` in next.config.js

---

## 🎯 Quick Deploy Command

```bash
cd ksiegai-next && npm run build && wrangler pages deploy out --project-name=ksiegai-next
```

---

## 📊 Success Indicators

✅ **Deployment Success**:
- Cloudflare Pages shows green checkmark
- Site loads without errors
- New JavaScript files are served

✅ **Google Login Fixed**:
- No multiple client warnings
- Login persists after authentication
- User stays logged in across page refreshes

---

**Your Google login issues will be resolved once deployed to Cloudflare Pages!** 🚀
