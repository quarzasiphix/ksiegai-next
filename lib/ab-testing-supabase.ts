/**
 * A/B Testing with Supabase Integration
 * Tracks variants, assignments, and conversions in the database
 */

import { supabase } from './supabase-client';

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  changes: Record<string, any>;
}

export interface ABTest {
  id: string;
  test_key: string;
  variants: ABTestVariant[];
  page_path: string;
}

/**
 * Get active A/B test for current page
 */
export async function getActiveTest(pagePath: string): Promise<ABTest | null> {
  try {
    const { data, error } = await supabase.rpc('get_active_test_for_page', {
      page: pagePath,
    });

    if (error || !data || data.length === 0) {
      return null;
    }

    return {
      id: data[0].test_id,
      test_key: data[0].test_key,
      variants: data[0].variants,
      page_path: pagePath,
    };
  } catch (error) {
    console.error('Error fetching active test:', error);
    return null;
  }
}

/**
 * Get or assign variant for user session
 */
export async function getVariantAssignment(
  testId: string,
  sessionId: string,
  variants: ABTestVariant[]
): Promise<string> {
  try {
    // Check if assignment already exists
    const { data: existing, error: fetchError } = await supabase
      .from('ab_test_assignments')
      .select('variant_id')
      .eq('test_id', testId)
      .eq('session_id', sessionId)
      .single();

    if (existing && !fetchError) {
      return existing.variant_id;
    }

    // Assign new variant based on weights
    const variant = selectVariantByWeight(variants);

    // Store assignment
    const { error: insertError } = await supabase
      .from('ab_test_assignments')
      .insert({
        test_id: testId,
        session_id: sessionId,
        variant_id: variant.id,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        assigned_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error storing assignment:', insertError);
    }

    return variant.id;
  } catch (error) {
    console.error('Error in getVariantAssignment:', error);
    // Fallback to first variant
    return variants[0]?.id || 'control';
  }
}

/**
 * Select variant based on weights
 */
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
 * Track page view event
 */
export async function trackPageView(
  testId: string,
  assignmentId: string,
  variantId: string,
  pagePath: string
) {
  try {
    await supabase.from('ab_test_events').insert({
      test_id: testId,
      assignment_id: assignmentId,
      variant_id: variantId,
      event_type: 'page_view',
      page_path: pagePath,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track conversion event
 */
export async function trackConversion(
  testId: string,
  sessionId: string,
  variantId: string,
  eventName: string,
  eventValue?: number,
  metadata?: Record<string, any>
) {
  try {
    // Get assignment ID
    const { data: assignment } = await supabase
      .from('ab_test_assignments')
      .select('id')
      .eq('test_id', testId)
      .eq('session_id', sessionId)
      .single();

    if (!assignment) {
      console.error('No assignment found for conversion tracking');
      return;
    }

    await supabase.from('ab_test_events').insert({
      test_id: testId,
      assignment_id: assignment.id,
      variant_id: variantId,
      event_type: 'conversion',
      event_name: eventName,
      event_value: eventValue,
      event_metadata: metadata || {},
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}

/**
 * Track custom event
 */
export async function trackEvent(
  testId: string,
  sessionId: string,
  variantId: string,
  eventType: 'click' | 'signup' | 'purchase' | 'custom',
  eventName: string,
  metadata?: Record<string, any>
) {
  try {
    const { data: assignment } = await supabase
      .from('ab_test_assignments')
      .select('id')
      .eq('test_id', testId)
      .eq('session_id', sessionId)
      .single();

    if (!assignment) return;

    await supabase.from('ab_test_events').insert({
      test_id: testId,
      assignment_id: assignment.id,
      variant_id: variantId,
      event_type: eventType,
      event_name: eventName,
      event_metadata: metadata || {},
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

/**
 * Get session ID (from cookie or generate new)
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const cookieName = 'ab_session_id';
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }

  // Generate new session ID
  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  document.cookie = `${cookieName}=${sessionId}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
  
  return sessionId;
}
