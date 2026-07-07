const STORAGE_KEY = "ksiegai_anon_invoice_claim_id";
const COOKIE_NAME = "ksiegai_anon_invoice_claim_id";
const MAX_AGE = 30 * 24 * 60 * 60;

export function persistAnonInvoiceId(submissionId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, submissionId);
  document.cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(submissionId)}`,
    "path=/",
    "domain=.ksiegai.pl",
    `max-age=${MAX_AGE}`,
    "SameSite=Lax",
  ].join("; ");
}

export function getStoredAnonInvoiceId(): string | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;

  const cookiePrefix = `${COOKIE_NAME}=`;
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

export function clearAnonInvoiceId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  document.cookie = [
    `${COOKIE_NAME}=`,
    "path=/",
    "domain=.ksiegai.pl",
    "max-age=0",
    "SameSite=Lax",
  ].join("; ");
}
