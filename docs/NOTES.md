# Notes

## 2026-03-22 - Removed public shared invoice ledger route

What changed:
- Removed the dedicated public route `app/udostepnione-faktury/page.tsx`.
- Deleted `components/public/SharedInvoicesLedger.tsx` and `lib/publicShare.ts`.
- The client invoice list now lives only in `ksef-ai` behind the existing `/share/:slug` slug-gated flow.

Verification evidence (2026-03-22):
- `trash-put .next/types/app/udostepnione-faktury` to clear stale generated type output after deleting the route
- `cd ksiegai-next && npx tsc --noEmit` -> passed

## 2026-03-22 - Shared invoice ledger access

What changed:
- Kept the public ledger flow anchored to a valid share slug while extending it to invoice-bearing `combo` shares as well as plain `invoice` shares.
- Clarified public UI copy so clients understand they can only see other invoices that still have an active share link.

Verification evidence (2026-03-22):
- `cd ksiegai-next && npx tsc --noEmit` -> passed
- `cd ksef-ai && npx tsc --noEmit` -> passed

Scope notes:
- No database schema or RLS changes were introduced.
- Public access remains slug-gated through the `shared-doc` edge function; this work only broadens which active invoice share rows can populate the same-client ledger.
