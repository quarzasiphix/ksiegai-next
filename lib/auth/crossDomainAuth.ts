// Cross-domain authentication utilities
// Handles token sharing between marketing site (www) and app subdomain

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || 'app.ksiegai.pl';
const COOKIE_NAME = 'ksiegai_auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const HANDOFF_ATTRIBUTION_KEY = 'ksiegai_handoff_attribution';
const HANDOFF_UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user_id: string;
}

type SessionSetter = (session: {
  access_token: string;
  refresh_token: string;
}) => Promise<{ data: { session: unknown | null }; error: unknown | null }>;

type RedirectParams = Record<string, string | number | boolean | null | undefined>;

type HandoffAttributionParams = Partial<Record<(typeof HANDOFF_UTM_KEYS)[number], string>>;

const getDefaultHandoffAttribution = (): HandoffAttributionParams => ({
  utm_source: 'ksiegai_site',
});

const readStoredHandoffAttribution = (): HandoffAttributionParams => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.sessionStorage.getItem(HANDOFF_ATTRIBUTION_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as HandoffAttributionParams;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[crossDomainAuth] Failed to read stored handoff attribution:', error);
    return {};
  }
};

const writeStoredHandoffAttribution = (params: HandoffAttributionParams): void => {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(HANDOFF_ATTRIBUTION_KEY, JSON.stringify(params));
  } catch (error) {
    console.warn('[crossDomainAuth] Failed to store handoff attribution:', error);
  }
};

const extractHandoffAttribution = (search: string): HandoffAttributionParams => {
  const urlParams = new URLSearchParams(search);
  const nextParams: HandoffAttributionParams = {};

  for (const key of HANDOFF_UTM_KEYS) {
    const value = urlParams.get(key);
    if (value) {
      nextParams[key] = value;
    }
  }

  return nextParams;
};

const resolveHandoffAttribution = (): HandoffAttributionParams => {
  if (typeof window === 'undefined') return getDefaultHandoffAttribution();

  const fromUrl = extractHandoffAttribution(window.location.search);
  const stored = readStoredHandoffAttribution();
  const resolved = {
    ...getDefaultHandoffAttribution(),
    ...stored,
    ...fromUrl,
  };

  return resolved;
};

export const persistHandoffAttribution = (): void => {
  if (typeof window === 'undefined') return;
  writeStoredHandoffAttribution(resolveHandoffAttribution());
};

const buildAppPath = (path: string, params?: RedirectParams): string => {
  const searchParams = new URLSearchParams();
  const handoffAttribution = resolveHandoffAttribution();

  for (const [key, value] of Object.entries(handoffAttribution)) {
    if (!value) continue;
    searchParams.set(key, value);
  }

  for (const [key, value] of Object.entries(params || {})) {
    if (value == null) continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  if (!query) {
    return path;
  }

  return `${path}${path.includes('?') ? '&' : '?'}${query}`;
};

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

  // Clear any existing tokens first
  clearAuthToken();

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
export const redirectToApp = (path: string = '/dashboard', params?: RedirectParams): void => {
  if (typeof window === 'undefined') return;

  persistHandoffAttribution();
  const resolvedPath = buildAppPath(path, params);

  if (window.location.hostname.includes('localhost')) {
    // On localhost, cross-port cookies are unreliable — embed the auth token in
    // the URL so ksef-ai can bootstrap the session without cookie dependency.
    const token = getAuthToken();
    const tokenParam = token ? `_xat=${encodeURIComponent(JSON.stringify(token))}` : '';
    const sep = resolvedPath.includes('?') ? '&' : '?';
    const appUrl = `http://localhost:8080${resolvedPath}${tokenParam ? sep + tokenParam : ''}`;
    window.location.href = appUrl;
    return;
  }

  window.location.href = `https://${APP_DOMAIN}${resolvedPath}`;
};

/**
 * Check if user came from localhost and redirect back after login
 */
export const checkAndRedirectToLocalhost = (path: string = '/dashboard', params?: RedirectParams): void => {
  if (typeof window === 'undefined') return;

  // Check if there's a localhost redirect parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const redirectFrom = urlParams.get('from');
  const localhostPort = urlParams.get('port');
  const resolvedPath = buildAppPath(path, params);
  
  if (redirectFrom === 'localhost' && localhostPort) {
    console.log('[crossDomainAuth] Redirecting back to localhost:', localhostPort);
    const localUrl = `http://localhost:${localhostPort}${resolvedPath}`;
    window.location.href = localUrl;
    return;
  }
  
  // Default redirect
  redirectToApp(path, params);
};

/**
 * Store auth token and redirect back to localhost if needed
 */
export const storeAndRedirect = (
  token: AuthToken,
  path: string = '/dashboard',
  params?: RedirectParams,
): void => {
  // Store token first
  storeAuthToken(token);
  
  // Check if we need to redirect back to localhost
  checkAndRedirectToLocalhost(path, params);
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

export const restoreSessionFromAuthToken = async (
  setSession: SessionSetter,
  options?: {
    token?: AuthToken | null;
    onRestoreFailure?: (token: AuthToken) => void;
  },
): Promise<{ restored: boolean; token: AuthToken | null }> => {
  const token = options?.token ?? getAuthToken();
  if (!token) {
    return { restored: false, token: null };
  }

  const { data, error } = await setSession({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
  });

  if (error || !data.session) {
    if (options?.onRestoreFailure) {
      options.onRestoreFailure(token);
    } else {
      clearAuthToken();
    }
    return { restored: false, token };
  }

  return { restored: true, token };
};
