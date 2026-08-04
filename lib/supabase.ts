import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

/**
 * Routes only /auth/v1/* traffic (login, signup, otp, OAuth, ...) through
 * ksiegai-gateway (api.ksiegai.pl) instead of straight to Supabase — see
 * ksef-ai/supabase/functions/EDGE_FUNCTION_ARCHITECTURE.md's gateway
 * integration contract and ksiegai-gateway/src/routes/auth.ts's generic
 * GoTrue passthrough. REST/RPC calls are untouched. Falls through to
 * calling Supabase directly whenever NEXT_PUBLIC_API_GATEWAY_URL isn't
 * set, or for any request shape this doesn't recognize — auth must never
 * hard-break because the gateway is unreachable or unconfigured.
 */
const gatewayAwareFetch: typeof fetch = (input, init) => {
  if (gatewayUrl && (typeof input === "string" || input instanceof URL)) {
    const parsed = new URL(input.toString());
    if (parsed.pathname.startsWith("/auth/v1/")) {
      const rewritten = new URL(gatewayUrl);
      rewritten.pathname = "/v1/auth/" + parsed.pathname.slice("/auth/v1/".length);
      rewritten.search = parsed.search;
      return fetch(rewritten.toString(), init);
    }
  }
  return fetch(input, init);
};

// Singleton Supabase client to prevent multiple instances
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'sb-marketing-auth', // Isolated storage key for marketing domain
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      },
      global: { fetch: gatewayAwareFetch },
    });
  }
  return supabaseInstance;
};

export const supabase = getSupabaseClient();
