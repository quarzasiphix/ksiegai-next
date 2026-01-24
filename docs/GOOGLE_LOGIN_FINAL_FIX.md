# Google Login Final Fix - Multiple Client Instances

**Date**: 2024-01-24  
**Issue**: Multiple GoTrueClient instances + refresh token already used error  
**Status**: ✅ Fixed - Ready for redeployment

---

## 🔍 Root Cause Analysis

### Issues Identified
1. **Multiple Supabase Client Instances** - Found in multiple files
2. **Refresh Token Already Used** - Token being used by multiple instances
3. **Session Conflicts** - Multiple clients fighting over same session

### Evidence from Logs
```
Multiple GoTrueClient instances detected in the same browser context
POST /auth/v1/token?grant_type=refresh_token 400 (Bad Request)
{"code": "refresh_token_already_used", "message": "Invalid Refresh Token: Already Used"}
[Header] Auth state changed: SIGNED_IN → SIGNED_OUT
```

---

## 🛠️ Fixes Applied

### 1. Fixed Multiple Client Instances

#### Files Updated:
- ✅ `components/Header.tsx` - Uses singleton client
- ✅ `app/logowanie/page.tsx` - Uses singleton client  
- ✅ `app/auth/callback/page.tsx` - Uses singleton client
- ✅ `app/rejestracja/page.tsx` - Uses singleton client
- ✅ `lib/supabase-client.ts` - Re-exports singleton
- ✅ `lib/ab-testing-ssg.ts` - Uses singleton client

#### Singleton Implementation:
```typescript
// lib/supabase.ts
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};
```

### 2. Enhanced Session Management
- Added expiration checking before session restoration
- Added error handling for failed session restoration
- Clear invalid tokens automatically
- Better auth state change handling

### 3. Improved Token Management
- Clear old tokens before setting new ones
- Better cross-domain cookie handling
- Proper cleanup on sign out

---

## 🚀 Deployment Steps

### Step 1: Clean Build
```bash
cd ksiegai-next
rm -rf out .next node_modules/.cache
npm install
npm run build
```

### Step 2: Deploy to Cloudflare Pages
```bash
# Method A: Web Dashboard
# Upload the entire /out folder to Cloudflare Pages

# Method B: Wrangler CLI
wrangler pages deploy out --project-name=ksiegai-next
```

### Step 3: Clear Caches
1. **Cloudflare Cache**: Purge `https://ksiegai.pl/*`
2. **Browser Cache**: Hard refresh (Ctrl+F5)
3. **Test in Incognito**: Bypass all cache

---

## 🔍 Verification Steps

### 1. Check Console Logs
**Should NOT see**:
```
Multiple GoTrueClient instances detected
POST /auth/v1/token?grant_type=refresh_token 400
refresh_token_already_used
[Header] Auth state changed: SIGNED_OUT
```

**Should see**:
```
[Header] Found cross-domain token, restoring session
[Header] Auth state changed: SIGNED_IN 6992a5f3-d1e7-4caf-ac2d-5ba2301028cc
[crossDomainAuth] Storing auth token
```

### 2. Test Google Login Flow
1. Go to `https://ksiegai.pl/logowanie`
2. Click "Zaloguj przez Google"
3. Complete authentication
4. **Expected**: Should stay logged in, no immediate logout

### 3. Verify Session Persistence
- Refresh page multiple times
- Navigate between pages
- Close and reopen browser
- **Expected**: Should remain logged in

---

## 🎯 Expected Behavior After Fix

### Before Fix
❌ Multiple client instances
❌ Refresh token conflicts
❌ Login works then immediately fails
❌ Session lost on page refresh

### After Fix
✅ Single Supabase client instance
✅ No refresh token conflicts
✅ Login persists properly
✅ Session maintained across refreshes

---

## 🚨 Troubleshooting

### If Still Seeing Multiple Client Warnings
1. **Clear browser cache completely**
2. **Check all imports use `supabase` from `@/lib/supabase`**
3. **Verify no direct `createClient()` calls remain**

### If Still Getting Refresh Token Errors
1. **Clear all browser cookies for ksiegai.pl**
2. **Use incognito/private mode**
3. **Check Supabase auth logs for token issues**

### If Session Still Lost
1. **Verify cookie domain is `.ksiegai.pl`**
2. **Check token expiration in console**
3. **Ensure proper error handling in setSession**

---

## 📊 Technical Details

### Why Multiple Clients Cause Issues
1. **Token Conflicts**: Each client tries to refresh the same token
2. **Race Conditions**: Multiple clients competing for session
3. **Token Invalidation**: Token gets marked as "already used"

### Singleton Pattern Benefits
- **Single Source of Truth**: One client manages session
- **No Token Conflicts**: Only one client handles refresh
- **Consistent State**: All components use same client
- **Better Performance**: Reduced memory usage

---

## 🎯 Quick Deploy Command

```bash
cd ksiegai-next && rm -rf out .next && npm install && npm run build && wrangler pages deploy out --project-name=ksiegai-next
```

---

## 📞 If Issues Persist After Deployment

### 1. Verify Deployment Success
- Check Cloudflare Pages build logs
- Ensure new files are deployed
- Verify no build errors

### 2. Test Clean Environment
- Use incognito mode
- Clear all cache and cookies
- Test on different browser

### 3. Check Network Tab
- Look for JavaScript errors
- Verify CSS files are loading
- Check for 404 errors

---

**The multiple client instance issue should be completely resolved after redeployment!** 🎉

**Key Fix**: All components now use the same singleton Supabase client, eliminating refresh token conflicts and session loss.
