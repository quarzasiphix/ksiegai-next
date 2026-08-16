// Shared invite-open tracking, extracted from app/rejestracja/RegisterClient.tsx
// (2026-08-11) so any landing surface that can receive an `?invite=` link —
// not just /rejestracja itself — can mark the invite as opened server-side.
//
// Real bug this fixes: the invite campaign email
// (ksef-ai/supabase/functions/_shared/notifications/email/templates/invites/invite-campaign-template.ts)
// embeds ~9 links total — the main CTA (repeated 4x) AND ~5 "poradnik" (blog/
// guide) article links, all carrying `?invite={{invite_token}}`. Only
// /rejestracja ever read that param and called the RPC that flips
// admin_company_invites.status from 'pending' to 'opened'
// (public.lookup_admin_invite, via the `invite.lookup` public-api action).
// A recipient who clicked a poradnik link first (curiosity — "what's NIP-8?"
// — very plausible before finishing registration) had their token silently
// dropped: the poradnik article page never read the query param, so the
// invite never got marked opened even though they genuinely engaged.
import { publicApiAction } from "../gateway";

export const INVITE_COOKIE_NAME = "ksiegai_invite_token";
export const INVITE_STORAGE_KEY = "ksiegai_invite_token";
export const LEGACY_INVITE_STORAGE_KEY = "pending_invite_token";
const INVITE_MAX_AGE = 90 * 24 * 60 * 60;

export async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getStoredInviteToken(): string | null {
  if (typeof window === "undefined") return null;

  const legacyToken = localStorage.getItem(LEGACY_INVITE_STORAGE_KEY);
  if (legacyToken) return legacyToken;

  const canonicalToken = localStorage.getItem(INVITE_STORAGE_KEY);
  if (canonicalToken) return canonicalToken;

  const cookiePrefix = `${INVITE_COOKIE_NAME}=`;
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  return cookieToken ? decodeURIComponent(cookieToken) : null;
}

export function persistInviteToken(token: string): void {
  localStorage.setItem(LEGACY_INVITE_STORAGE_KEY, token);
  localStorage.setItem(INVITE_STORAGE_KEY, token);
  document.cookie = [
    `${INVITE_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "path=/",
    "domain=.ksiegai.pl",
    `max-age=${INVITE_MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}

/**
 * Fire-and-forget: hashes the raw token and calls the same `invite.lookup`
 * public-api action /rejestracja uses, whose server-side RPC
 * (lookup_admin_invite) flips a pending invite to 'opened' as a side effect.
 * Safe to call from any page — errors are swallowed, this is a tracking
 * signal, never something that should block rendering or throw into a
 * server/client boundary.
 */
export async function markInviteOpened(token: string): Promise<void> {
  try {
    const tokenHash = await sha256hex(token);
    await publicApiAction("invite.lookup", { tokenHash });
  } catch {
    // best-effort — see file header
  }
}
