"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

const ARTICLE_KEY_PREFIX = "poradnik_last_visit:";
const ANY_KEY = "poradnik_last_visit_any";

/**
 * Tracks return visits to /poradnik (blog) articles — the gap flagged
 * 2026-08-23: PostHog's autocapture already fires a $pageview on every
 * visit, but nothing distinguishes "first time reading this" from "came
 * back a day later without ever registering," which is exactly the signal
 * InvitesAnalyticsSheet's hot-lead scoring already treats as high-value for
 * EMAIL opens ("Wrócił po 24h+", +15pts) — this is the same idea applied to
 * blog reads, closing the gap noted in
 * project_invite_krs_funnel_full_picture.md ("no visibility into how many
 * people actually looked at their pre-filled data / read the linked
 * articles before registering").
 *
 * Two localStorage keys per visit:
 *  - per-article (`poradnik_last_visit:<pathname>`) — revisited THIS article.
 *  - site-wide (`poradnik_last_visit_any`) — came back to the blog at all,
 *    possibly a different article.
 * Both are per-browser, not per-person — same caveat as any localStorage-based
 * signal (private window / different device won't carry it), acceptable
 * here since it's a secondary engagement signal, not the source of truth.
 *
 * If invite attribution is already registered (InviteTokenCapture.tsx —
 * they arrived via an invite email link at some point), registerInviteAttribution's
 * posthog.register() super-properties are already attached to the session,
 * so invite_recipient_email/invite_token_hash ride along on these captures
 * automatically without needing to re-read them here.
 */
export function PoradnikRevisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!pathname || !pathname.startsWith("/poradnik")) return;

    const now = Date.now();
    const articleKey = `${ARTICLE_KEY_PREFIX}${pathname}`;

    const lastArticleVisit = window.localStorage.getItem(articleKey);
    const lastAnyVisit = window.localStorage.getItem(ANY_KEY);

    if (lastArticleVisit) {
      const daysSince = (now - Number(lastArticleVisit)) / 86_400_000;
      posthog.capture("poradnik_article_revisited", {
        article_path: pathname,
        days_since_last_visit: Math.round(daysSince * 10) / 10,
      });
    } else if (lastAnyVisit) {
      // Different article than last time, but they've been on the blog before.
      const daysSince = (now - Number(lastAnyVisit)) / 86_400_000;
      posthog.capture("poradnik_blog_revisited", {
        article_path: pathname,
        days_since_last_visit: Math.round(daysSince * 10) / 10,
      });
    }

    window.localStorage.setItem(articleKey, String(now));
    window.localStorage.setItem(ANY_KEY, String(now));
  }, [pathname]);

  return null;
}
