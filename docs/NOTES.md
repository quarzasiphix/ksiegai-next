# Notes

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
