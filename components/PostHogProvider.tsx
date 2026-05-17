'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense, ReactNode, useState } from 'react';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
      ph.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH ?? '/ingest';
  const [shouldUsePosthog, setShouldUsePosthog] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const isLocalhost = /^(localhost|127(?:\.\d+){0,3}|0\.0\.0\.0|\[::1\])$/i.test(hostname);
    setShouldUsePosthog(Boolean(apiKey) && !isLocalhost);
  }, [apiKey]);

  useEffect(() => {
    if (!shouldUsePosthog || !apiKey) return;
    posthog.init(apiKey, {
      api_host: apiHost,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
    });
  }, [apiKey, apiHost, shouldUsePosthog]);

  if (!shouldUsePosthog) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
