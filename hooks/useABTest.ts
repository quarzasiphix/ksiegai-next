import { useEffect, useState } from 'react';
import {
  getActiveTest,
  getVariantAssignment,
  getSessionId,
  trackPageView,
  trackConversion as trackConversionDB,
  trackEvent as trackEventDB,
  type ABTest,
  type ABTestVariant,
} from '@/lib/ab-testing-supabase';

interface UseABTestResult {
  variant: ABTestVariant | null;
  isLoading: boolean;
  trackConversion: (eventName: string, value?: number, metadata?: Record<string, any>) => void;
  trackEvent: (eventType: 'click' | 'signup' | 'purchase' | 'custom', eventName: string, metadata?: Record<string, any>) => void;
}

export function useABTest(pagePath: string): UseABTestResult {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testId, setTestId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    async function initializeTest() {
      try {
        // Get session ID
        const sid = getSessionId();
        setSessionId(sid);

        // Get active test for page
        const test = await getActiveTest(pagePath);
        
        if (!test) {
          setIsLoading(false);
          return;
        }

        setTestId(test.id);

        // Get or assign variant
        const variantId = await getVariantAssignment(test.id, sid, test.variants);
        const assignedVariant = test.variants.find(v => v.id === variantId);

        if (assignedVariant) {
          setVariant(assignedVariant);
          
          // Track page view
          trackPageView(test.id, sid, variantId, pagePath);
        }
      } catch (error) {
        console.error('Error initializing A/B test:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeTest();
  }, [pagePath]);

  const trackConversion = (eventName: string, value?: number, metadata?: Record<string, any>) => {
    if (testId && sessionId && variant) {
      trackConversionDB(testId, sessionId, variant.id, eventName, value, metadata);
    }
  };

  const trackEvent = (
    eventType: 'click' | 'signup' | 'purchase' | 'custom',
    eventName: string,
    metadata?: Record<string, any>
  ) => {
    if (testId && sessionId && variant) {
      trackEventDB(testId, sessionId, variant.id, eventType, eventName, metadata);
    }
  };

  return {
    variant,
    isLoading,
    trackConversion,
    trackEvent,
  };
}
