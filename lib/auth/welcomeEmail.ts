import { supabase } from "@/lib/supabase";

const WELCOME_SENT_PREFIX = "welcome_email_sent:";
const NEW_USER_WINDOW_MS = 24 * 60 * 60 * 1000;

function getWelcomeSentKey(userId: string): string {
  return `${WELCOME_SENT_PREFIX}${userId}`;
}

function isFreshlyRegistered(createdAt?: string): boolean {
  if (!createdAt) return false;
  const createdMs = new Date(createdAt).getTime();
  if (Number.isNaN(createdMs)) return false;
  return Date.now() - createdMs <= NEW_USER_WINDOW_MS;
}

export async function sendWelcomeEmailIfNewUser(params: {
  userId: string;
  email?: string;
  createdAt?: string;
}): Promise<void> {
  const { userId, email, createdAt } = params;
  if (!userId || !email) return;
  if (!isFreshlyRegistered(createdAt)) return;
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
