"use client";

export type RememberedLoginProfile = {
  userId: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  lastLoginMethod?: PendingLoginAttempt["method"] | null;
  lastUsedAt: string;
};

export type PendingLoginAttempt = {
  email?: string;
  displayName: string;
  method: "password" | "magic_link" | "google";
  startedAt: string;
};

export type RememberedProfileAuthToken = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user_id: string;
  email: string;
  savedAt: string;
};

const PROFILE_STORAGE_KEY = "ksiegai:auth:profiles";
const PROFILE_TOKEN_STORAGE_KEY = "ksiegai:auth:profile-tokens";
const PENDING_LOGIN_STORAGE_KEY = "ksiegai:auth:pending-login";
const PREFERRED_PROFILE_STORAGE_KEY = "ksiegai:auth:preferred-profile";
const MAX_REMEMBERED_PROFILES = 5;
const PENDING_LOGIN_MAX_AGE_MS = 30 * 60 * 1000;

type AuthUserLike = {
  id: string;
  email?: string | null;
  user_metadata?: {
    full_name?: string | null;
    name?: string | null;
    avatar_url?: string | null;
    picture?: string | null;
  };
};

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function normalizeDisplayName(user: AuthUserLike): string {
  const metadataName = user.user_metadata?.full_name || user.user_metadata?.name;
  if (metadataName && metadataName.trim()) {
    return metadataName.trim();
  }

  if (user.email) {
    const [localPart] = user.email.split("@");
    if (localPart?.trim()) {
      return localPart.trim();
    }
  }

  return "Ostatni użytkownik";
}

function sortProfiles(profiles: RememberedLoginProfile[]): RememberedLoginProfile[] {
  return [...profiles].sort(
    (left, right) => new Date(right.lastUsedAt).getTime() - new Date(left.lastUsedAt).getTime(),
  );
}

function loadRememberedProfileAuthTokens(): RememberedProfileAuthToken[] {
  if (!canUseStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(PROFILE_TOKEN_STORAGE_KEY);
    if (!rawValue) return [];
    const parsed = JSON.parse(rawValue) as RememberedProfileAuthToken[];
    return parsed.filter(
      (token) =>
        token?.user_id &&
        token?.email &&
        token?.access_token &&
        token?.refresh_token &&
        Number.isFinite(token?.expires_at),
    );
  } catch {
    return [];
  }
}

function persistRememberedProfileAuthTokens(tokens: RememberedProfileAuthToken[]): void {
  if (!canUseStorage()) return;

  window.localStorage.setItem(
    PROFILE_TOKEN_STORAGE_KEY,
    JSON.stringify(tokens.slice(0, MAX_REMEMBERED_PROFILES)),
  );
}

function pruneRememberedProfileAuthTokens(allowedUserIds: string[]): void {
  if (!canUseStorage()) return;

  const nextTokens = loadRememberedProfileAuthTokens().filter((token) => allowedUserIds.includes(token.user_id));
  persistRememberedProfileAuthTokens(nextTokens);
}

export function loadRememberedProfiles(): RememberedLoginProfile[] {
  if (!canUseStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!rawValue) return [];
    const parsed = JSON.parse(rawValue) as RememberedLoginProfile[];
    return sortProfiles(
      parsed
        .filter((profile) => profile?.userId && profile?.email && profile?.displayName)
        .map((profile) => ({
          ...profile,
          lastLoginMethod: profile.lastLoginMethod ?? null,
        })),
    );
  } catch {
    return [];
  }
}

export function saveRememberedProfile(
  user: AuthUserLike,
  lastLoginMethod?: PendingLoginAttempt["method"] | null,
): RememberedLoginProfile | null {
  if (!canUseStorage() || !user.id || !user.email) return null;

  const existingProfile = loadRememberedProfiles().find((profile) => profile.userId === user.id);
  const nextProfile: RememberedLoginProfile = {
    userId: user.id,
    email: user.email,
    displayName: normalizeDisplayName(user),
    avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    lastLoginMethod: lastLoginMethod ?? existingProfile?.lastLoginMethod ?? null,
    lastUsedAt: new Date().toISOString(),
  };

  const existingProfiles = loadRememberedProfiles().filter((profile) => profile.userId !== user.id);
  const nextProfiles = sortProfiles([nextProfile, ...existingProfiles]).slice(0, MAX_REMEMBERED_PROFILES);
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfiles));
  pruneRememberedProfileAuthTokens(nextProfiles.map((profile) => profile.userId));
  return nextProfile;
}

export function removeRememberedProfile(userId: string): void {
  if (!canUseStorage()) return;

  const nextProfiles = loadRememberedProfiles().filter((profile) => profile.userId !== userId);
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfiles));
  removeRememberedProfileAuthToken(userId);

  const preferredProfile = getPreferredLoginProfile();
  if (preferredProfile?.userId === userId) {
    clearPreferredLoginProfile();
  }
}

export function getLatestRememberedProfile(): RememberedLoginProfile | null {
  return loadRememberedProfiles()[0] ?? null;
}

export function saveRememberedProfileAuthToken(
  user: Pick<AuthUserLike, "id" | "email">,
  token: Pick<RememberedProfileAuthToken, "access_token" | "refresh_token" | "expires_at" | "user_id">,
): void {
  if (!canUseStorage() || !user.id || !user.email) return;

  const normalizedEmail = user.email.trim().toLowerCase();
  const nextToken: RememberedProfileAuthToken = {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expires_at: token.expires_at,
    user_id: token.user_id,
    email: normalizedEmail,
    savedAt: new Date().toISOString(),
  };

  const nextTokens = [
    nextToken,
    ...loadRememberedProfileAuthTokens().filter((existingToken) => existingToken.user_id !== user.id),
  ];
  persistRememberedProfileAuthTokens(nextTokens);
}

export function getRememberedProfileAuthToken(
  profile: Pick<RememberedLoginProfile, "userId" | "email">,
): RememberedProfileAuthToken | null {
  if (!canUseStorage()) return null;

  const normalizedEmail = profile.email.trim().toLowerCase();

  return (
    loadRememberedProfileAuthTokens().find((token) => token.user_id === profile.userId) ||
    loadRememberedProfileAuthTokens().find((token) => token.email.trim().toLowerCase() === normalizedEmail) ||
    null
  );
}

export function removeRememberedProfileAuthToken(userId: string): void {
  if (!canUseStorage()) return;

  const nextTokens = loadRememberedProfileAuthTokens().filter((token) => token.user_id !== userId);
  persistRememberedProfileAuthTokens(nextTokens);
}

export function setPreferredLoginProfile(profile: Pick<RememberedLoginProfile, "userId" | "email">): void {
  if (!canUseStorage() || !profile.userId || !profile.email) return;

  window.localStorage.setItem(
    PREFERRED_PROFILE_STORAGE_KEY,
    JSON.stringify({
      userId: profile.userId,
      email: profile.email.trim().toLowerCase(),
    }),
  );
}

export function getPreferredLoginProfile(): RememberedLoginProfile | null {
  if (!canUseStorage()) return null;

  try {
    const rawValue = window.localStorage.getItem(PREFERRED_PROFILE_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as { userId?: string; email?: string };
    const normalizedEmail = parsed.email?.trim().toLowerCase();
    if (!parsed.userId || !normalizedEmail) {
      clearPreferredLoginProfile();
      return null;
    }

    const match =
      loadRememberedProfiles().find((profile) => profile.userId === parsed.userId) ||
      loadRememberedProfiles().find((profile) => profile.email.trim().toLowerCase() === normalizedEmail);

    if (!match) {
      clearPreferredLoginProfile();
      return null;
    }

    return match;
  } catch {
    clearPreferredLoginProfile();
    return null;
  }
}

export function clearPreferredLoginProfile(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(PREFERRED_PROFILE_STORAGE_KEY);
}

export function setPendingLoginAttempt(attempt: PendingLoginAttempt): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PENDING_LOGIN_STORAGE_KEY, JSON.stringify(attempt));
}

export function getPendingLoginAttempt(): PendingLoginAttempt | null {
  if (!canUseStorage()) return null;

  try {
    const rawValue = window.localStorage.getItem(PENDING_LOGIN_STORAGE_KEY);
    if (!rawValue) return null;
    const parsed = JSON.parse(rawValue) as PendingLoginAttempt;
    const startedAtMs = new Date(parsed.startedAt).getTime();
    if (!parsed.displayName || !parsed.method || Number.isNaN(startedAtMs)) {
      clearPendingLoginAttempt();
      return null;
    }

    if (Date.now() - startedAtMs > PENDING_LOGIN_MAX_AGE_MS) {
      clearPendingLoginAttempt();
      return null;
    }

    return parsed;
  } catch {
    clearPendingLoginAttempt();
    return null;
  }
}

export function clearPendingLoginAttempt(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(PENDING_LOGIN_STORAGE_KEY);
}

export function createPendingLoginAttempt(params: {
  email?: string;
  displayName?: string;
  method: PendingLoginAttempt["method"];
}): PendingLoginAttempt {
  const normalizedEmail = params.email?.trim().toLowerCase();
  const fallbackName = normalizedEmail?.split("@")[0];

  return {
    email: normalizedEmail,
    displayName: params.displayName?.trim() || fallbackName || "wybranego konta",
    method: params.method,
    startedAt: new Date().toISOString(),
  };
}

export function getPendingLoginLabel(attempt: PendingLoginAttempt | null): string | null {
  if (!attempt) return null;
  return attempt.email || attempt.displayName;
}
