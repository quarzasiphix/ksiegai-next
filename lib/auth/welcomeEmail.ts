import { supabase } from "@/lib/supabase";

const WELCOME_SENT_PREFIX = "welcome_email_sent:";
const NEW_USER_WINDOW_MS = 24 * 60 * 60 * 1000;
const AUTH_FLOW_ORIGIN_KEY = "ksiegai_auth_flow_origin";

export type AuthFlowOrigin = "register" | "login";

function getWelcomeSentKey(userId: string): string {
  return `${WELCOME_SENT_PREFIX}${userId}`;
}

function isFreshlyRegistered(createdAt?: string): boolean {
  if (!createdAt) return false;
  const createdMs = new Date(createdAt).getTime();
  if (Number.isNaN(createdMs)) return false;
  return Date.now() - createdMs <= NEW_USER_WINDOW_MS;
}

export function setAuthFlowOrigin(origin: AuthFlowOrigin): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_FLOW_ORIGIN_KEY, origin);
}

export function consumeAuthFlowOrigin(): AuthFlowOrigin | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(AUTH_FLOW_ORIGIN_KEY);
  sessionStorage.removeItem(AUTH_FLOW_ORIGIN_KEY);
  if (value === "register" || value === "login") {
    return value;
  }
  return null;
}

export async function sendWelcomeEmailIfNewUser(params: {
  userId: string;
  email?: string;
  createdAt?: string;
  force?: boolean;
}): Promise<void> {
  const { userId, email, createdAt, force = false } = params;
  if (!userId || !email) return;
  if (!force && !isFreshlyRegistered(createdAt)) return;
  if (typeof window === "undefined") return;

  const sentKey = getWelcomeSentKey(userId);
  if (localStorage.getItem(sentKey) === "1") return;

  try {
    const appUrl = window.location.hostname.includes("localhost")
      ? "http://localhost:8080"
      : "https://app.ksiegai.pl";

    const { error } = await supabase.functions.invoke("send-auth-email", {
      body: {
        email,
        type: "magiclink",
        templateKey: "welcome_email",
        redirectTo: `${appUrl}/`,
        variables: {
          user_name: email.split("@")[0] || "Użytkowniku",
          app_url: `${appUrl}/`,
          year: new Date().getFullYear(),
        },
      },
    });

    if (error) {
      console.error("[welcomeEmail] Failed to send welcome email:", error);
      return;
    }

    localStorage.setItem(sentKey, "1");
  } catch (error) {
    console.error("[welcomeEmail] Unexpected error:", error);
  }
}
