"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentProps } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, unknown>;
};

export function TrackedLink({ event, eventProps, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        posthog.capture(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
