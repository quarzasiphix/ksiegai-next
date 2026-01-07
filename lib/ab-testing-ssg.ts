'use client';

/**
 * A/B Testing for Static Site Generation (SSG)
 * Optimized for Cloudflare Pages with static export
 * 
 * Features:
 * - Build-time variant injection
 * - Client-side variant selection
 * - Cookie-based persistence
 * - Time-on-page tracking
 * - Scroll depth tracking
 * - SEO-safe (no flicker)
 */

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  changes: Record<string, any>;
}

export interface ABTest {
  id: string;
  test_key: string;
  name: string;
  page_path: string;
  traffic_allocation: number;
  variants: ABTestVariant[];
  primary_goal: string;
  secondary_goals?: string[];
}

// Cookie helpers
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

// Session ID management
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = getCookie('ab_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    setCookie('ab_session_id', sessionId, 365);
  }
  return sessionId;
}

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Simple hash function for consistent traffic allocation
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // Normalize to 0-1
}

// Weighted random selection
function selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) {
      return variant;
    }
  }
  
  return variants[0]; // Fallback
}

/**
 * Load A/B tests from static JSON file
 */
export async function loadABTests(): Promise<Record<string, ABTest>> {
  try {
    const response = await fetch('/ab-tests.json');
    if (!response.ok) {
      console.warn('No A/B tests configuration found');
      return {};
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading A/B tests:', error);
    return {};
  }
}

/**
 * Get or assign variant for current user
 */
export function getVariant(test: ABTest): ABTestVariant | null {
  if (!test) return null;
  
  // Check traffic allocation
  const sessionId = getSessionId();
  const hash = simpleHash(sessionId + test.id);
  if (hash > test.traffic_allocation) {
    return null; // User not in test
  }
  
  // Check existing assignment
  const cookieName = `ab_${test.test_key}`;
  const storedVariantId = getCookie(cookieName);
  
  if (storedVariantId) {
    const variant = test.variants.find(v => v.id === storedVariantId);
    if (variant) {
      logVariantSelection(test.test_key, variant.id, 'existing');
      return variant;
    }
  }
  
  // Assign new variant
  const variant = selectVariantForTest(test);
  setCookie(cookieName, variant.id);
  
  // Track assignment (async, non-blocking)
  trackAssignment(test.id, variant.id, sessionId);
  logVariantSelection(test.test_key, variant.id, 'assigned');
  
  return variant;
}

function selectVariantForTest(test: ABTest): ABTestVariant {
  if (typeof window !== 'undefined' && test.variants.length === 2) {
    const toggleKey = `ab_${test.test_key}_toggle`;
    const lastAssigned = window.localStorage.getItem(toggleKey);

    // Alternate between 0 and 1 for strict 50/50 distribution per browser session
    const nextIndex = lastAssigned === '0' ? 1 : 0;
    window.localStorage.setItem(toggleKey, nextIndex.toString());

    const alternatingVariant = test.variants[nextIndex] ?? test.variants[0];
    return alternatingVariant;
  }

  return selectVariantByWeight(test.variants);
}

function logVariantSelection(testKey: string, variantId: string, source: 'existing' | 'assigned') {
  if (typeof window === 'undefined') return;
  const label = variantId === 'control' ? 'Variant A (control)' : `Variant B (${variantId})`;
  console.log(`[ABTest] ${testKey}: ${label} (${source})`);
}

/**
 * Track assignment (fire and forget)
 */
async function trackAssignment(testId: string, variantId: string, sessionId: string) {
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_id: testId,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'assignment',
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      }),
    });
  } catch (err) {
    console.error('Failed to track assignment:', err);
  }
}

/**
 * Track page view with time tracking
 */
export async function trackPageView(testId: string, variantId: string, pagePath: string) {
  const sessionId = getSessionId();
  
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_id: testId,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'page_view',
        page_path: pagePath,
      }),
    });
  } catch (err) {
    console.error('Failed to track page view:', err);
  }
}

/**
 * Track conversion
 */
export async function trackConversion(testKey: string, eventName: string, value?: number, metadata?: Record<string, any>) {
  const sessionId = getSessionId();
  const cookieName = `ab_${testKey}`;
  const variantId = getCookie(cookieName);
  
  if (!variantId) return;
  
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_key: testKey,
        variant_id: variantId,
        session_id: sessionId,
        event_type: 'conversion',
        event_name: eventName,
        event_value: value,
        event_metadata: metadata,
      }),
    });
  } catch (err) {
    console.error('Failed to track conversion:', err);
  }
}

/**
 * Track custom event
 */
export async function trackEvent(
  testKey: string,
  eventType: 'click' | 'signup' | 'purchase' | 'scroll' | 'time_on_page' | 'custom',
  eventName: string,
  metadata?: Record<string, any>
) {
  const sessionId = getSessionId();
  const cookieName = `ab_${testKey}`;
  const variantId = getCookie(cookieName);
  
  if (!variantId) return;
  
  try {
    await fetch('/api/ab-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_key: testKey,
        variant_id: variantId,
        session_id: sessionId,
        event_type: eventType,
        event_name: eventName,
        event_metadata: metadata,
      }),
    });
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}

/**
 * Track time on page when user leaves
 */
export function setupTimeTracking(testKey: string, pagePath: string) {
  if (typeof window === 'undefined') return;
  
  const startTime = Date.now();
  
  const trackTimeOnPage = () => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000); // seconds
    trackEvent(testKey, 'time_on_page', 'page_exit', {
      time_on_page: timeOnPage,
      page_path: pagePath,
    });
  };
  
  // Track on page unload
  window.addEventListener('beforeunload', trackTimeOnPage);
  
  // Track on visibility change (tab switch)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackTimeOnPage();
    }
  });
  
  // Cleanup function
  return () => {
    window.removeEventListener('beforeunload', trackTimeOnPage);
  };
}

/**
 * Track scroll depth
 */
export function setupScrollTracking(testKey: string, pagePath: string) {
  if (typeof window === 'undefined') return;
  
  let maxScrollDepth = 0;
  const milestones = [25, 50, 75, 100];
  const trackedMilestones = new Set<number>();
  
  const trackScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercent = Math.floor((scrolled / scrollHeight) * 100);
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
    }
    
    // Track milestones
    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackEvent(testKey, 'scroll', `scroll_${milestone}`, {
          scroll_depth: milestone,
          page_path: pagePath,
        });
      }
    });
  };
  
  window.addEventListener('scroll', trackScroll, { passive: true });
  
  // Track final scroll depth on exit
  const trackFinalScroll = () => {
    trackEvent(testKey, 'scroll', 'final_scroll_depth', {
      scroll_depth: maxScrollDepth,
      page_path: pagePath,
    });
  };
  
  window.addEventListener('beforeunload', trackFinalScroll);
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', trackScroll);
    window.removeEventListener('beforeunload', trackFinalScroll);
  };
}
