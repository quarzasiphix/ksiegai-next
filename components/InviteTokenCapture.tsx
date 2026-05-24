"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const COOKIE_NAME = "ksiegai_invite_token";
const STORAGE_KEY = "ksiegai_invite_token";
const MAX_AGE = 90 * 24 * 60 * 60; // 90 days

export function InviteTokenCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get("invite");
    if (!token || typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, token);

    // Cookie accessible to all .ksiegai.pl subdomains (app.ksiegai.pl etc.)
    document.cookie = [
      `${COOKIE_NAME}=${encodeURIComponent(token)}`,
      "path=/",
      "domain=.ksiegai.pl",
      `max-age=${MAX_AGE}`,
      "SameSite=Lax",
    ].join("; ");

    posthog.capture("invite_link_clicked", {
      invite_token_prefix: token.slice(0, 8),
      page: window.location.pathname,
      source: "marketing_email",
    });
  }, [searchParams]);

  return null;
}
