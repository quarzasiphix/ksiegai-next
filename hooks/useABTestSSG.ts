import { useEffect, useState } from 'react';
import {
  loadABTests,
  getVariant,
  trackPageView,
  trackConversion as trackConversionLib,
  trackEvent as trackEventLib,
  setupTimeTracking,
  setupScrollTracking,
  type ABTest,
  type ABTestVariant,
} from '@/lib/ab-testing-ssg';

interface UseABTestResult {
  variant: ABTestVariant | null;
  isLoading: boolean;
  trackConversion: (eventName: string, value?: number, metadata?: Record<string, any>) => void;
  trackEvent: (
    eventType: 'click' | 'signup' | 'purchase' | 'scroll' | 'time_on_page' | 'custom',
    eventName: string,
    metadata?: Record<string, any>
  ) => void;
}

/**
 * React hook for A/B testing with SSG support
 * 
 * Features:
 * - Loads tests from static JSON (built at compile time)
 * - Assigns variants client-side
 * - Tracks page views, conversions, and custom events
 * - Automatically tracks time on page and scroll depth
 * 
 * @param pagePath - The page path to test (e.g., '/', '/pricing')
 * @param options - Configuration options
 */
export function useABTestSSG(
  pagePath: string,
  options: {
    trackTime?: boolean;
    trackScroll?: boolean;
  } = {}
): UseABTestResult {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState<ABTest | null>(null);

  useEffect(() => {
    let cleanupTime: (() => void) | undefined;
    let cleanupScroll: (() => void) | undefined;

    async function initializeTest() {
      try {
        // Load all active tests from static JSON
        const tests = await loadABTests();
        
        // Find test for current page
        const currentTest = tests[pagePath];
        
        if (!currentTest) {
          setIsLoading(false);
          return;
        }

        setTest(currentTest);

        // Get or assign variant
        const assignedVariant = getVariant(currentTest);

        if (assignedVariant) {
          setVariant(assignedVariant);
          
          // Track page view
          trackPageView(currentTest.id, assignedVariant.id, pagePath);

          // Setup time tracking if enabled
          if (options.trackTime !== false) {
            cleanupTime = setupTimeTracking(currentTest.test_key, pagePath);
          }

          // Setup scroll tracking if enabled
          if (options.trackScroll !== false) {
            cleanupScroll = setupScrollTracking(currentTest.test_key, pagePath);
          }
        }
      } catch (error) {
        console.error('Error initializing A/B test:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeTest();

    // Cleanup function
    return () => {
      if (cleanupTime) cleanupTime();
      if (cleanupScroll) cleanupScroll();
    };
  }, [pagePath, options.trackTime, options.trackScroll]);

  const trackConversion = (eventName: string, value?: number, metadata?: Record<string, any>) => {
    if (test && variant) {
      trackConversionLib(test.test_key, eventName, value, metadata);
    }
  };

  const trackEvent = (
    eventType: 'click' | 'signup' | 'purchase' | 'scroll' | 'time_on_page' | 'custom',
    eventName: string,
    metadata?: Record<string, any>
  ) => {
    if (test && variant) {
      trackEventLib(test.test_key, eventType, eventName, metadata);
    }
  };

  return {
    variant,
    isLoading,
    trackConversion,
    trackEvent,
  };
}
