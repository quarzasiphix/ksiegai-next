// Cross-domain authentication utilities
// Handles token sharing between marketing site (www) and app subdomain

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || 'app.ksiegai.pl';
const COOKIE_NAME = 'ksiegai_auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user_id: string;
}

/**
 * Store auth token in cookie for cross-domain access
 * Sets cookie on parent domain (.ksiegai.pl) so both www and app can access
 */
export const storeAuthToken = (token: AuthToken): void => {
  if (typeof window === 'undefined') return;

  const tokenString = JSON.stringify(token);
  console.log('[crossDomainAuth] Storing auth token:', { 
    user_id: token.user_id, 
    expires_at: token.expires_at,
    hostname: window.location.hostname 
  });

  // Store in localStorage as backup
  localStorage.setItem(COOKIE_NAME, tokenString);

  // Set cookie on parent domain for cross-subdomain access
  const domain = window.location.hostname.includes('localhost') 
    ? 'localhost' 
    : '.ksiegai.pl';

  const cookieValue = `${COOKIE_NAME}=${encodeURIComponent(tokenString)}; domain=${domain}; path=/; max-age=${COOKIE_MAX_AGE}; ${window.location.protocol === 'https:' ? 'secure;' : ''} samesite=lax`;
  document.cookie = cookieValue;
  
  console.log('[crossDomainAuth] Cookie set with domain:', domain);
  console.log('[crossDomainAuth] Cookie value length:', cookieValue.length);
};

/**
 * Retrieve auth token from cookie or localStorage
 */
export const getAuthToken = (): AuthToken | null => {
  if (typeof window === 'undefined') return null;

  // Try cookie first
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(c => c.trim().startsWith(`${COOKIE_NAME}=`));
  
  if (authCookie) {
    try {
      const value = authCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(value));
    } catch (error) {
      console.error('Failed to parse auth cookie:', error);
    }
  }

  // Fallback to localStorage
  try {
    const stored = localStorage.getItem(COOKIE_NAME);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse auth from localStorage:', error);
    return null;
  }
};

/**
 * Clear auth token from both cookie and localStorage
 */
export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;

  // Clear localStorage
  localStorage.removeItem(COOKIE_NAME);

  // Clear cookie
  const domain = window.location.hostname.includes('localhost') 
    ? 'localhost' 
    : '.ksiegai.pl';

  document.cookie = `${COOKIE_NAME}=; domain=${domain}; path=/; max-age=0`;
};

/**
 * Redirect to app subdomain with auth token
 * Token is already in cookie, so app can read it immediately
 */
export const redirectToApp = (path: string = '/dashboard'): void => {
  if (typeof window === 'undefined') return;

  const appUrl = window.location.hostname.includes('localhost')
    ? `http://localhost:8080${path}` // Local dev - React app runs on port 8080
    : `https://${APP_DOMAIN}${path}`; // Production

  window.location.href = appUrl;
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: AuthToken): boolean => {
  return Date.now() >= token.expires_at * 1000;
};

/**
 * Validate and refresh token if needed
 */
export const validateToken = async (token: AuthToken): Promise<boolean> => {
  if (isTokenExpired(token)) {
    // Token expired, need to refresh
    // This would call Supabase refresh endpoint
    return false;
  }
  return true;
};
