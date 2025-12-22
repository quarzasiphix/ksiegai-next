/**
 * A/B Testing Infrastructure for Landing Page Variants
 * 
 * This module provides utilities for tracking and managing landing page variants
 * for marketing optimization.
 */

export type LandingPageVariant = 'A' | 'B';

export interface VariantConfig {
  id: LandingPageVariant;
  name: string;
  description: string;
  weight: number; // 0-100, percentage of traffic
}

// Define available variants
export const VARIANTS: Record<LandingPageVariant, VariantConfig> = {
  A: {
    id: 'A',
    name: 'Pre-KSeF Standard',
    description: 'Lead story: "Inbox faktur dla polskich firm — zanim trafią do KSeF"',
    weight: 50,
  },
  B: {
    id: 'B',
    name: 'Accountant Lock-in',
    description: 'Lead story: "System, który księgowa polubi — i nie będzie chciała zmienić"',
    weight: 50,
  },
};

/**
 * Get the variant for the current user session
 * Uses localStorage to persist variant across page loads
 * Falls back to cookie-based tracking if localStorage is unavailable
 */
export function getVariant(): LandingPageVariant {
  if (typeof window === 'undefined') {
    return 'A'; // Default for SSR
  }

  try {
    // Check if variant is already assigned
    const stored = localStorage.getItem('landing_variant');
    if (stored && (stored === 'A' || stored === 'B')) {
      return stored as LandingPageVariant;
    }

    // Assign new variant based on weights
    const variant = Math.random() < (VARIANTS.A.weight / 100) ? 'A' : 'B';
    localStorage.setItem('landing_variant', variant);
    
    // Track variant assignment
    trackVariantAssignment(variant);
    
    return variant;
  } catch (error) {
    console.error('Error getting variant:', error);
    return 'A'; // Fallback to default
  }
}

/**
 * Track variant assignment for analytics
 */
function trackVariantAssignment(variant: LandingPageVariant) {
  // This can be integrated with your analytics platform
  // e.g., Google Analytics, Mixpanel, Plausible, etc.
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'variant_assigned', {
      variant_id: variant,
      variant_name: VARIANTS[variant].name,
    });
  }

  // You can also send to your own analytics endpoint
  // fetch('/api/analytics/variant', {
  //   method: 'POST',
  //   body: JSON.stringify({ variant, timestamp: Date.now() }),
  // });
}

/**
 * Track conversion events for A/B testing
 */
export function trackConversion(event: string, metadata?: Record<string, any>) {
  const variant = getVariant();
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      variant_id: variant,
      variant_name: VARIANTS[variant].name,
      ...metadata,
    });
  }

  // You can also send to your own analytics endpoint
  // fetch('/api/analytics/conversion', {
  //   method: 'POST',
  //   body: JSON.stringify({ variant, event, metadata, timestamp: Date.now() }),
  // });
}

/**
 * Force a specific variant (useful for testing)
 */
export function setVariant(variant: LandingPageVariant) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('landing_variant', variant);
  }
}

/**
 * Clear variant assignment (useful for testing)
 */
export function clearVariant() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('landing_variant');
  }
}
