"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type PageAnalyticsProps = {
  page: string;
  persona?: string;
  intent?: string;
  properties?: Record<string, unknown>;
};

export function PageAnalytics({ page, persona, intent, properties }: PageAnalyticsProps) {
  useEffect(() => {
    posthog.capture("page_engaged", {
      page,
      ...(persona && { persona }),
      ...(intent && { intent }),
      ...properties,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
