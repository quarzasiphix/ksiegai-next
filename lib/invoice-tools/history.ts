const HISTORY_KEY = "ksiegai_anon_invoice_history";
const MAX_HISTORY_ENTRIES = 20;

export function addToInvoiceHistory(submissionId: string) {
  if (typeof window === "undefined") return;
  const ids = getInvoiceHistoryIds().filter((id) => id !== submissionId);
  ids.unshift(submissionId);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(ids.slice(0, MAX_HISTORY_ENTRIES)));
}

export function getInvoiceHistoryIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}
