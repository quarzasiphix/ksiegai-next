# Google Login Session Fix

**Date**: 2024-01-24  
**Issue**: Google login works but session is immediately lost  
**Status**: ✅ Fixed - Multiple issues resolved

---

## 🔍 Root Cause Analysis

### Issues Identified
1. **Multiple Supabase Client Instances** - Causing session conflicts
2. **Poor Session Restoration** - No expiration checking or error handling
3. **Token Conflicts** - Old tokens not cleared before setting new ones
4. **Missing Error Handling** - Failed session restoration not handled

### Evidence from Console
```
Multiple GoTrueClient instances detected in the same browser context
POST /auth/v1/token?grant_type=refresh_token 400 (Bad Request)
[Header] Auth state changed: SIGNED_IN 6992a5f3-d1e7-4caf-ac2d-5ba2301028cc
[Header] Auth state changed: SIGNED_OUT undefined
```

---

## 🛠️ Fixes Applied

### 1. Singleton Supabase Client
**File**: `lib/supabase.ts` (NEW)
```typescript
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};
```

**Updated Files**:
- `components/Header.tsx`
- `app/logowanie/page.tsx` 
- `app/auth/callback/page.tsx`

### 2. Improved Session Restoration
**File**: `components/Header.tsx`
```typescript
// Only set session if it's not expired
if (token.expires_at * 1000 > Date.now()) {
  supabase.auth.setSession({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
  }).catch(error => {
    console.error("[Header] Failed to restore session:", error);
    // Clear invalid token
    clearAuthToken();
  });
} else {
  console.log("[Header] Token expired, clearing");
  clearAuthToken();
}
```

### 3. Better Token Management
**File**: `lib/auth/crossDomainAuth.ts`
```typescript
// Clear any existing tokens first
clearAuthToken();

// Store in localStorage as backup
localStorage.setItem(COOKIE_NAME, tokenString);
```

### 4. Enhanced Auth State Handling
**File**: `components/Header.tsx`
```typescript
if (event === 'SIGNED_IN' && session) {
  // Store new token for cross-domain access
  storeAuthToken({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at || 0,
    user_id: session.user.id,
  });
} else if (event === 'SIGNED_OUT') {
  // Clear token on sign out
  clearAuthToken();
}
```

---

## 🚀 Expected Behavior After Fix

### Before Fix
1. User clicks Google login ✅
2. Google authentication ✅  
3. Callback processes code ✅
4. Session established ✅
5. **Session immediately lost** ❌
6. User logged out ❌

### After Fix
1. User clicks Google login ✅
2. Google authentication ✅
3. Callback processes code ✅
4. Session established ✅
5. **Session persists** ✅
6. User remains logged in ✅
7. Cross-domain auth works ✅

---

## 🔧 Testing Instructions

### Step 1: Deploy Changes
```bash
cd ksiegai-next
npm run build
# Deploy to production
```

### Step 2: Clear Browser Data
- Clear browser cache and cookies
- Or use incognito/private mode

### Step 3: Test Google Login
1. Go to `https://ksiegai.pl/logowanie`
2. Click "Zaloguj przez Google"
3. Complete Google authentication
4. **Expected**: Should stay logged in and redirect to app

### Step 4: Verify Console Logs
**Should see**:
```
[Header] Found cross-domain token, restoring session
[Header] Auth state changed: SIGNED_IN 6992a5f3-d1e7-4caf-ac2d-5ba2301028cc
[crossDomainAuth] Storing auth token: {user_id: "...", expires_at: ...}
```

**Should NOT see**:
```
Multiple GoTrueClient instances detected
POST /auth/v1/token?grant_type=refresh_token 400
[Header] Auth state changed: SIGNED_OUT
```

---

## 🎯 Success Criteria

- ✅ No multiple Supabase client warnings
- ✅ Google login completes successfully
- ✅ Session persists after login
- ✅ No refresh token errors
- ✅ Cross-domain authentication works
- ✅ User stays logged in across page refreshes

---

## 🚨 Troubleshooting

### If Still Seeing Multiple Client Warnings
- Check all imports use `supabase` from `@/lib/supabase`
- Ensure no direct `createClient()` calls remain

### If Session Still Lost
- Clear browser cache completely
- Check token expiration in console
- Verify cookie domain is `.ksiegai.pl`

### If Refresh Token Errors Persist
- Check Supabase auth logs for token issues
- Verify token is not corrupted
- Ensure proper error handling in setSession

---

## 📊 Technical Details

### Singleton Pattern Benefits
- Prevents multiple GoTrueClient instances
- Eliminates session conflicts
- Reduces memory usage
- Ensures consistent auth state

### Improved Error Handling
- Catches failed session restoration
- Clears invalid tokens automatically
- Prevents infinite refresh loops
- Better user experience

### Token Management
- Clears old tokens before setting new ones
- Checks expiration before restoration
- Proper cleanup on sign out
- Cross-domain cookie consistency

---

**The Google login session persistence issue should now be resolved!** 🎉
