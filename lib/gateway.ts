/**
 * Client for the ksiegai gateway (api.ksiegai.pl) — the only backend surface
 * ksiegai-next should talk to for public flows (shared invoices, the
 * anonymous invoice generator, VAT verification). Direct
 * supabase.functions.invoke calls are being migrated here call-site by
 * call-site; new public features must go through the gateway from the start.
 *
 * The gateway wraps every response in an envelope:
 *   success: { data: <upstream payload>, meta: { requestId, timestamp } }
 *   error:   { error: { code, message }, meta: { requestId, timestamp } }
 * gatewayFetch unwraps it and throws GatewayError on the error shape.
 */

const GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? "https://api.ksiegai.pl";

export class GatewayError extends Error {
  readonly code: string;
  readonly requestId: string | null;

  constructor(code: string, message: string, requestId: string | null) {
    super(message);
    this.code = code;
    this.requestId = requestId;
  }
}

type GatewayEnvelope<T> = {
  data?: T;
  error?: { code: string; message: string };
  meta?: { requestId?: string };
};

export async function gatewayFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  let envelope: GatewayEnvelope<T>;
  try {
    envelope = (await response.json()) as GatewayEnvelope<T>;
  } catch {
    throw new GatewayError("invalid_response", `Gateway returned non-JSON (HTTP ${response.status})`, null);
  }

  const requestId = envelope.meta?.requestId ?? null;
  if (!response.ok || envelope.error) {
    throw new GatewayError(
      envelope.error?.code ?? "upstream_error",
      envelope.error?.message ?? `Gateway request failed (HTTP ${response.status})`,
      requestId,
    );
  }

  return envelope.data as T;
}

/** POST an action to the gateway's generic public-api proxy (/v1/public).
 * Actions must be on the gateway's allowlist — see
 * ksiegai-gateway/src/routes/public.ts PUBLIC_API_ACTION_ALLOWLIST.
 * Pass `accessToken` for actions that need to identify the caller (e.g.
 * abTest.trackConversion) — the gateway forwards it to public-api, which
 * resolves the user from it. Omit it for genuinely anonymous actions. */
export function publicApiAction<T>(action: string, payload: Record<string, unknown> = {}, accessToken?: string): Promise<T> {
  return gatewayFetch<T>("/v1/public", {
    method: "POST",
    headers: accessToken ? { authorization: `Bearer ${accessToken}` } : undefined,
    body: JSON.stringify({ action, ...payload }),
  });
}
