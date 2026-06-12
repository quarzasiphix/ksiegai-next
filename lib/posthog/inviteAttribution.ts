"use client";

import posthog from "posthog-js";

const STORAGE_KEY = "pending_invite_attribution";

export interface InviteAttribution {
  invite_token_hash: string;
  invite_token_prefix: string;
  invite_company_name?: string | null;
  invite_recipient_email?: string | null;
  invite_recipient_name?: string | null;
  invite_company_type?: string | null;
}

export function storeInviteAttribution(data: InviteAttribution) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getInviteAttribution(): InviteAttribution | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InviteAttribution;
  } catch {
    return null;
  }
}

export function registerInviteAttribution(properties?: Partial<InviteAttribution> | null) {
  const current = getInviteAttribution();
  const next = { ...current, ...properties };
  if (!next.invite_token_hash) return;
  storeInviteAttribution(next as InviteAttribution);
  posthog.register({
    invite_flow: true,
    invite_token_hash: next.invite_token_hash,
    invite_token_prefix: next.invite_token_prefix ?? next.invite_token_hash.slice(0, 12),
    invite_company_name: next.invite_company_name ?? null,
    invite_recipient_email: next.invite_recipient_email ?? null,
    invite_recipient_name: next.invite_recipient_name ?? null,
    invite_company_type: next.invite_company_type ?? null,
  });
}

export function identifyInvitedUser(userId: string, email?: string | null, extra?: Record<string, unknown>) {
  const invite = getInviteAttribution();
  posthog.identify(userId, {
    email: email ?? null,
    invite_flow: Boolean(invite),
    invite_token_hash: invite?.invite_token_hash ?? null,
    invite_token_prefix: invite?.invite_token_prefix ?? null,
    invite_company_name: invite?.invite_company_name ?? null,
    invite_recipient_email: invite?.invite_recipient_email ?? email ?? null,
    invite_recipient_name: invite?.invite_recipient_name ?? null,
    invite_company_type: invite?.invite_company_type ?? null,
    ...(extra ?? {}),
  });
}

export function captureInviteEvent(event: string, properties?: Record<string, unknown>) {
  const invite = getInviteAttribution();
  posthog.capture(event, {
    invite_flow: Boolean(invite),
    invite_token_hash: invite?.invite_token_hash ?? null,
    invite_token_prefix: invite?.invite_token_prefix ?? null,
    invite_company_name: invite?.invite_company_name ?? null,
    invite_recipient_email: invite?.invite_recipient_email ?? null,
    invite_recipient_name: invite?.invite_recipient_name ?? null,
    invite_company_type: invite?.invite_company_type ?? null,
    ...(properties ?? {}),
  });
}
