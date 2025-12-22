'use client';

import { useEffect, useState } from 'react';
import { getVariant, type LandingPageVariant } from '@/lib/ab-testing';

/**
 * Hook to get the current A/B testing variant
 * Returns 'A' during SSR and hydrates with the actual variant on the client
 */
export function useVariant(): LandingPageVariant {
  const [variant, setVariant] = useState<LandingPageVariant>('A');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Get variant on client side
    const currentVariant = getVariant();
    setVariant(currentVariant);
    setIsHydrated(true);
  }, []);

  return variant;
}

/**
 * Hook to check if we're hydrated (useful to prevent flash of wrong variant)
 */
export function useIsHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
