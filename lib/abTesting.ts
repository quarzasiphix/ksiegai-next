/**
 * A/B Testing Client Library for Next.js Frontend
 * Handles variant assignment, storage, and tracking
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  status: 'draft' | 'active' | 'paused' | 'completed';
  traffic_allocation: number;
  variants: ABTestVariant[];
}

interface VariantAssignment {
  testId: string;
  variantId: string;
  assignedAt: number;
}

const STORAGE_KEY = 'ksiegai_ab_assignments';
const SESSION_ID_KEY = 'ksiegai_session_id';

/**
 * Generate or retrieve session ID for anonymous tracking
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get all stored variant assignments
 */
function getStoredAssignments(): Record<string, VariantAssignment> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Store variant assignment
 */
function storeAssignment(testId: string, variantId: string): void {
  if (typeof window === 'undefined') return;
  
  const assignments = getStoredAssignments();
  assignments[testId] = {
    testId,
    variantId,
    assignedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

/**
 * Weighted random selection based on variant weights
 */
function selectVariant(variants: ABTestVariant[]): ABTestVariant {
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
 * Fetch active A/B tests for a specific page
 */
export async function getActiveTestsForPage(pagePath: string): Promise<ABTest[]> {
  try {
    const { data, error } = await supabase
      .from('ab_test_definitions')
      .select('*')
      .eq('page_path', pagePath)
      .eq('status', 'active');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching A/B tests:', error);
    return [];
  }
}

/**
 * Get or assign variant for a test
 */
export function getVariantForTest(test: ABTest): ABTestVariant | null {
  // Check if user is in traffic allocation
  if (Math.random() > test.traffic_allocation) {
    return null; // User not in test
  }
  
  // Check for existing assignment
  const assignments = getStoredAssignments();
  const existing = assignments[test.id];
  
  if (existing) {
    const variant = test.variants.find(v => v.id === existing.variantId);
    if (variant) return variant;
  }
  
  // Assign new variant
  const variant = selectVariant(test.variants);
  storeAssignment(test.id, variant.id);
  
  return variant;
}

/**
 * Track A/B test assignment event
 */
export async function trackAssignment(
  testId: string,
  variantId: string,
  userId?: string
): Promise<void> {
  try {
    await supabase.from('ab_test_events').insert({
      test_id: testId,
      variant_id: variantId,
      event_type: 'assignment',
      user_id: userId || null,
      session_id: getSessionId(),
      metadata: {
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error tracking assignment:', error);
  }
}

/**
 * Track A/B test conversion event
 */
export async function trackConversion(
  testId: string,
  variantId: string,
  conversionType: string,
  value?: number,
  userId?: string
): Promise<void> {
  try {
    await supabase.from('ab_test_events').insert({
      test_id: testId,
      variant_id: variantId,
      event_type: 'conversion',
      conversion_type: conversionType,
      conversion_value: value || null,
      user_id: userId || null,
      session_id: getSessionId(),
      metadata: {
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}

/**
 * Track page view for A/B test
 */
export async function trackPageView(
  testId: string,
  variantId: string,
  userId?: string
): Promise<void> {
  try {
    await supabase.from('ab_test_events').insert({
      test_id: testId,
      variant_id: variantId,
      event_type: 'page_view',
      user_id: userId || null,
      session_id: getSessionId(),
      metadata: {
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        timestamp: new Date().toISOString(),
        page_url: typeof window !== 'undefined' ? window.location.href : null,
      },
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Get all active variant assignments for current user
 */
export function getAllAssignments(): Record<string, VariantAssignment> {
  return getStoredAssignments();
}

/**
 * Clear all A/B test assignments (for testing)
 */
export function clearAllAssignments(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
