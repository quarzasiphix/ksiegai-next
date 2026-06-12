"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { supabase } from "@/lib/supabase";

const COOKIE_NAME = "ksiegai_invite_token";
const STORAGE_KEY = "ksiegai_invite_token";
const LEGACY_STORAGE_KEY = "pending_invite_token";
const MAX_AGE = 90 * 24 * 60 * 60; // 90 days
const OVERLAY_TRIGGER_KEY = "ksiegai_invite_welcome_pending";

async function sha256hex(text: string) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function InviteTokenCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get("invite");
    if (!token || typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, token);
    localStorage.setItem(LEGACY_STORAGE_KEY, token);

    const clean = new URL(window.location.href);
    clean.searchParams.delete("invite");
    window.history.replaceState({}, "", clean.toString());

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

    void (async () => {
      const tokenHash = await sha256hex(token);
      const { data, error } = await (supabase.rpc as any)("lookup_admin_invite", { p_token_hash: tokenHash });
      if (error || !data?.is_valid || data?.status === "claimed") {
        sessionStorage.removeItem(OVERLAY_TRIGGER_KEY);
        return;
      }

      sessionStorage.setItem(
        OVERLAY_TRIGGER_KEY,
        JSON.stringify({
          invite_token_hash: tokenHash,
          created_at: Date.now(),
        }),
      );
    })();
  }, [searchParams]);

  return null;
}
