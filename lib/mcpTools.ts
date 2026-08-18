import {
  Building2,
  FileText,
  FolderOpen,
  Calculator,
  ClipboardList,
  Landmark,
  Users,
  Gavel,
  FileSignature,
  ListChecks,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

// Single source of truth for the /mcp marketing overview + /mcp/[slug] wiki
// pages. Tool names/descriptions/tiers are transcribed from the actual tool
// registrations in ksiegai-mcp/src/mcp-agent.ts and the tier map in
// ksef-ai/supabase/functions/public-api/domains/mcp/mcp.actions.ts
// (TIER_ALLOWED_TOOLS) — keep in sync when tools are added/changed there.

export type McpTier = "read_only" | "draft_write" | "full_post";

export const TIER_LABELS: Record<McpTier, string> = {
  read_only: "Tylko odczyt",
  draft_write: "Wersja robocza",
  full_post: "Pełne uprawnienia",
};

export const TIER_DESCRIPTIONS: Record<McpTier, string> = {
  read_only: "Dostępne w każdym połączeniu — samo czytanie danych, zero zmian.",
  draft_write: "Tworzy lub zmienia dane, ale nigdy nie księguje na stałe ani nie wysyła pieniędzy — wymaga poziomu „wersja robocza” lub wyższego.",
  full_post: "Realna, nieodwracalna operacja (księgowanie, wysyłka) — wymaga najwyższego poziomu uprawnień połączenia i zawsze poprzedzona jest podglądem oraz Twoim wyraźnym potwierdzeniem.",
};

export interface McpTool {
  name: string;
  tier: McpTier;
  description: string;
}

export interface McpCategory {
  slug: string;
  title: string;
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
  summary: string;
  tools: McpTool[];
}

export const mcpCategories: McpCategory[] = [
  {
    slug: "firma",
    title: "Firma",
    icon: Building2,
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    summary: "Punkt wyjścia dla każdego agenta — lista firm, do których połączenie ma dostęp.",
    tools: [
      { name: "list_business_profiles", tier: "read_only", description: "List the ksiegai business profile(s) this connection is authorized for (id, name, entity type, tax regime, VAT-exempt status). A connection can cover one or more businesses, each with its own permission tier (Ustawienia -> Połącz AI (MCP)) - call this first to get the businessProfileId(s), required by every other tool. An empty result means no business has been granted to this connection yet - tell the user to add one in Ustawienia -> Połącz AI (MCP) -> edit this connection." },
    ],
  },
  {
    slug: "faktury",
    title: "Faktury",
    icon: FileText,
    iconClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
    summary: "Odczyt pełnych danych faktur sprzedażowych i kosztowych, dodawanie faktur kosztowych do weryfikacji.",
    tools: [
      { name: "list_invoices", tier: "read_only", description: "List invoices (income and expense) for this connection's business profile - full detail per invoice (customer/supplier, line items, amounts, VAT, KSeF status), not just headers. Optionally filter by date range (issueDate) and/or contractorTaxId (NIP) to pull every invoice for one counterparty, e.g. \"all invoices from/to NIP 1234567890 this year\"." },
      { name: "add_expense_invoice", tier: "draft_write", description: "Record a cost/expense invoice or receipt (e.g. one the caller already read and extracted from an email or attachment - this tool does no OCR/extraction itself, pass in already-structured fields). Requires a connection with draft_write or full_post permission tier. Always lands with posting_status/accounting_status='needs_review' and acceptance_status='pending' - it is NEVER auto-posted to the ledger or auto-accepted, regardless of input. A human reviews it in ksiegai's normal expense/posting queue before it affects any balance or tax calculation." },
    ],
  },
  {
    slug: "dokumenty",
    title: "Dokumenty",
    icon: FolderOpen,
    iconClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-100 dark:bg-cyan-900/30",
    summary: "Dokumenty firmowe — umowy, uchwały, licencje, sprawozdania — przegląd i bezpieczne pobieranie plików.",
    tools: [
      { name: "list_company_documents", tier: "read_only", description: "List company documents (contracts, resolutions, licenses, financial statements, tax filings, etc) for this connection's business profile - metadata only (title, category, dates, file name), not file content. Use get_company_document for a single document's detail plus a download URL." },
      { name: "get_company_document", tier: "read_only", description: "Get one company document's full metadata plus a time-limited (1 hour) signed download URL for its file. Use list_company_documents first to find the documentId." },
      { name: "upload_company_document", tier: "draft_write", description: "Upload a company document (e.g. a contract, resolution, license, or financial statement the caller already has as a file) and record its metadata. The caller supplies the file's raw bytes as base64 - this tool does no OCR/extraction, it just stores what it's given. Requires a connection with draft_write or full_post permission tier." },
    ],
  },
  {
    slug: "ksiegowosc",
    title: "Księgowość",
    icon: Calculator,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    summary: "Plan kont, salda i zapisy księgowe — od założenia planu kont po zaksięgowanie zapisu, zawsze z Twoim potwierdzeniem.",
    tools: [
      { name: "get_chart_of_accounts", tier: "read_only", description: "List the chart of accounts (COA) for this connection's business profile." },
      { name: "setup_chart_of_accounts", tier: "draft_write", description: "Set up the starter chart of accounts (28-row Polish COA) for a business profile that doesn't have one yet, plus the account-key map (resolves semantic keys like BANK_MAIN/AR_CUSTOMERS/VAT_OUTPUT to specific account codes) that other posting tools rely on. Safe to call defensively before drafting journal entries for a new business - if a chart of accounts already exists, returns alreadyExists:true instead of an error. Requires draft_write or full_post permission tier." },
      { name: "create_chart_account", tier: "draft_write", description: "Add a new account to this business profile's chart of accounts. Use setup_chart_of_accounts first if the profile has no chart of accounts at all. Requires draft_write or full_post permission tier." },
      { name: "update_chart_account", tier: "draft_write", description: "Edit an existing chart-of-accounts entry (partial update - only pass fields you want to change). Also used to reactivate a previously deactivated account (isActive: true). Requires draft_write or full_post permission tier." },
      { name: "deactivate_chart_account", tier: "draft_write", description: "Soft-delete (deactivate) a chart-of-accounts entry - it stops appearing for new postings but its historical postings are unaffected and it can be reactivated later via update_chart_account. Blocked if the account is still referenced by any DRAFT (unposted) journal entry lines - resolve those first. Requires draft_write or full_post permission tier." },
      { name: "get_balance_sheet", tier: "read_only", description: "Per-account balances (current, month-to-date change, year-to-date change) as of a given date - the raw data behind the balance sheet / trial balance. Only includes posted journal entries. Cross-reference with get_chart_of_accounts for account codes/names/types (asset/liability/equity/revenue/expense)." },
      { name: "draft_journal_entry", tier: "draft_write", description: "Create a manual journal entry (debits/credits must balance to within 0.01) for something not covered by a bank transaction or invoice - e.g. a correction, accrual, or depreciation entry. Requires draft_write or full_post permission tier. ALWAYS created as entry_status='draft' - never auto-posted, regardless of tier. Use preview_journal_entry_posting then post_journal_entry (with explicit user confirmation) to actually post it to the ledger." },
      { name: "preview_journal_entry_posting", tier: "draft_write", description: "Dry-run preview of posting a draft journal entry - shows the entry and its lines, but posts NOTHING. Required before post_journal_entry will succeed (same journalEntryId, within 15 minutes). Show this briefing to the user and get their explicit go-ahead before calling post_journal_entry - never chain straight from preview to post without the user confirming in between." },
      { name: "post_journal_entry", tier: "full_post", description: "Post a draft journal entry to the ledger - a REAL, immediate write, not reversible via this tool. Requires a connection with full_post permission tier, AND a matching preview_journal_entry_posting call for the exact same journalEntryId within the last 15 minutes, AND the user has explicitly confirmed after seeing that preview. Never call this speculatively or without the user's explicit go-ahead. After posting, give the user a short briefing of exactly what was posted." },
    ],
  },
  {
    slug: "kolejka-i-raporty",
    title: "Kolejka i raporty",
    icon: ClipboardList,
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-100 dark:bg-rose-900/30",
    summary: "Co jeszcze czeka na zaksięgowanie i jak wygląda wynik finansowy okresu — czysty odczyt.",
    tools: [
      { name: "get_posting_queue", tier: "read_only", description: "The posting queue - every unposted/needs-review economic event for this business profile: invoices, financing contracts (loans, capital contributions), shareholder loan repayments, bank transactions, and Stripe period settlements, each with a suggested debit/credit posting template (chart-of-accounts codes) and, for bank transactions, a possible match against an outstanding invoice. Read-only - use this to see what still needs accounting attention, then classify_bank_transaction / preview_bank_transaction_posting+post_bank_transaction / draft_journal_entry to actually act on an item." },
      { name: "get_period_report", tier: "read_only", description: "Real profit & loss for one calendar month - revenue total, expense total, net result, and a per-account breakdown (code, name, type, current balance, this-period movement, year-to-date movement), built from posted journal entries only. Cross-reference get_chart_of_accounts for full account names/types if not returned inline." },
      { name: "list_journal_entries", tier: "read_only", description: "List journal entries (with their lines) for this business profile - the general ledger. Optionally filter by status (draft/posted/void/reversed), date range, or source_type (e.g. invoice, bank_transaction, manual). Use this to see the actual postings behind get_period_report's totals or get_balance_sheet's balances." },
    ],
  },
  {
    slug: "bank",
    title: "Bank",
    icon: Landmark,
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
    summary: "Rachunki i transakcje bankowe — import wyciągu, klasyfikacja i księgowanie, zawsze z podglądem przed zapisem.",
    tools: [
      { name: "list_bank_accounts", tier: "read_only", description: "List bank accounts for this connection's business profile (id, provider, IBAN, currency, linked COA account)." },
      { name: "list_bank_transactions", tier: "read_only", description: "List bank transactions for one bank account (from list_bank_accounts) - includes classification, status (imported/needs_review/matched/posted/etc), and amounts." },
      { name: "import_bank_statement", tier: "draft_write", description: "Import bank transactions the caller already read and extracted from a statement (PDF, CSV, screenshot, whatever - this tool does no parsing/OCR itself, pass in already-structured rows). Requires a connection with draft_write or full_post permission tier. Lands every transaction as status='imported'/'needs_review', same as any normal statement import - nothing is classified or posted yet, use classify_bank_transaction and post_bank_transaction (after preview + user confirmation) for that." },
      { name: "update_bank_transaction", tier: "draft_write", description: "Correct a bank transaction's own fields (e.g. a bad import — wrong date/amount/description/counterparty). Requires draft_write or full_post tier. Rejected if the transaction's status is posted or reconciled - reverse the journal entry first. Does NOT touch status/classification/journal_entry_id - use classify_bank_transaction or the post/preview tools for those." },
      { name: "delete_bank_transaction", tier: "draft_write", description: "Permanently delete a bank transaction row (e.g. a duplicate or bad import). Requires draft_write or full_post tier. Rejected if the transaction's status is posted or reconciled - reverse the journal entry and void it first. Not reversible via this tool." },
      { name: "classify_bank_transaction", tier: "draft_write", description: "Classify a bank transaction (e.g. invoice_payment, expense_payment, foreign_service_purchase, shareholder_loan, bank_loan, loan_granted, loan_repayment_received, capital_contribution, stripe_payout, tax_payment, salary, bank_transfer, fee, technical_verification_deposit, other). Requires a connection with draft_write or full_post permission tier. Always leaves status='needs_review' regardless of confidence - classification alone never posts anything or marks a transaction ready." },
      { name: "preview_bank_transaction_posting", tier: "draft_write", description: "Dry-run preview of posting a bank transaction to the ledger - shows the transaction detail and which chart-of-accounts account would be credited/debited, but posts NOTHING. Required before post_bank_transaction will succeed (same bankTransactionId+creditAccountId, within 15 minutes). Show this briefing to the user and get their explicit go-ahead before calling post_bank_transaction - never chain straight from preview to post without the user confirming in between." },
      { name: "post_bank_transaction", tier: "full_post", description: "Post a bank transaction to the ledger - creates a REAL journal entry, not reversible via this tool. Requires a connection with full_post permission tier, AND a matching preview_bank_transaction_posting call for the exact same bankTransactionId+creditAccountId within the last 15 minutes, AND the user has explicitly confirmed after seeing that preview. Never call this speculatively or without the user's explicit go-ahead. After posting, give the user a short briefing of exactly what was posted (accounts, amounts, date)." },
    ],
  },
  {
    slug: "zespol",
    title: "Zespół",
    icon: Users,
    iconClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-100 dark:bg-sky-900/30",
    summary: "Zarządzanie dostępem do firmy — zaproszenia, role, usuwanie członków zespołu.",
    tools: [
      { name: "list_team_members", tier: "read_only", description: "List the members of a business profile's team (owner + everyone invited and accepted), with their role." },
      { name: "list_team_invitations", tier: "read_only", description: "List all invitations sent for a business profile (pending, accepted, declined, expired, cancelled)." },
      { name: "invite_team_member", tier: "draft_write", description: "Invite someone to join a business profile's team by email - sends them a real invite email with an accept link. Requires draft_write or full_post permission tier. Roles: admin (full operational access, can invite others), accountant (invoices/expenses/documents/reports), pelnomocnik (documents + legal representation), viewer (read-only). Confirm the recipient's email and intended role with the user before calling this - it immediately sends a real email." },
      { name: "resend_team_invitation", tier: "draft_write", description: "Resend the invite email for an existing pending invitation (same link/token) - e.g. it got lost or spam-filtered." },
      { name: "cancel_team_invitation", tier: "draft_write", description: "Cancel a pending team invitation before it's accepted." },
      { name: "update_team_member_role", tier: "draft_write", description: "Change an existing team member's role (also resets their permission preset to that role's defaults - see invite_team_member's description for what each role grants). Cannot change the owner's role." },
      { name: "remove_team_member", tier: "draft_write", description: "Remove a member from a business profile's team - they immediately lose access. Cannot remove the owner. Confirm with the user before calling this - it's not reversible from here (they'd need a new invitation to rejoin)." },
    ],
  },
  {
    slug: "uchwaly-i-decyzje",
    title: "Uchwały i decyzje",
    icon: Gavel,
    iconClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-100 dark:bg-indigo-900/30",
    summary: "Uchwały wspólników/zarządu, decyzje/mandaty i zgodność z KSH art. 210 §1 — łącznie z wykrywaniem, kiedy transakcja z członkiem zarządu wymaga pełnomocnika.",
    tools: [
      { name: "list_resolutions", tier: "read_only", description: "List uchwały (shareholder/board resolutions) for this business profile. Includes KSH art. 210 §1 proxy-appointment resolutions (resolutionType='article_210_proxy_appointment')." },
      { name: "get_resolution", tier: "read_only", description: "Full detail for one uchwała: the resolution itself, per-voter vote records, and the latest cached quorum/pass-fail validation result." },
      { name: "list_decisions", tier: "read_only", description: "List decisions (the mandate/authorization layer behind resolutions - every contract/invoice/expense should trace back to one of these). decisionType is 'strategic_shareholders' (uchwała wspólników-level) or 'operational_board' (uchwała zarządu-level, must have a parent strategic decision)." },
      { name: "get_decision", tier: "read_only", description: "Single decision by id - the mandate/authorization row's full detail." },
      { name: "get_authority_chain", tier: "read_only", description: "The full strategic->mandate->board->execution-object authority chain for a contract/invoice/expense, plus its cached governance validation (whether a valid decision authorizes it, and whether it needs a KSH art. 210 §1 proxy resolution). Reads the cache only - call refresh_governance_validation first if you need this recomputed after a recent change." },
      { name: "check_ksh_compliance_for_loan", tier: "read_only", description: "Check a shareholder/board-member loan against KSH (Kodeks spółek handlowych) art. 15 (board-member loan requires shareholder consent, no threshold), art. 210 §1 (if the counterparty is a board member, the company must be represented by the rada nadzorcza or a shareholder-appointed pełnomocnik - the board member can't sign for both sides), and art. 230 (loan exceeding 2x share capital needs consent). Returns which articles apply, whether each is satisfied, and an overall compliant flag. Use this before treating a shareholder loan as properly authorized." },
      { name: "refresh_governance_validation", tier: "draft_write", description: "Recompute the cached governance/authority-chain validation (incl. KSH art. 210 §1 conflict detection) for a contract/invoice/expense. Only updates a validation-cache table, doesn't change any real authorization - call this before get_authority_chain if you suspect the cached result is stale (e.g. after creating a new decision or proxy resolution)." },
      { name: "refresh_representation_validation", tier: "draft_write", description: "Recompute who must sign/represent the company for a contract (incl. its own KSH art. 210 §1 proxy check) - a narrower sibling of refresh_governance_validation focused on signing authority rather than the full mandate chain. Only meaningful for contracts today." },
      { name: "create_resolution", tier: "draft_write", description: "Draft a new uchwała (shareholder/board resolution) - ALWAYS created as status='draft', never auto-adopted (adoption requires the real vote/quorum flow in the app). For a KSH art. 210 §1 proxy appointment (needed when a contract/loan involves a board member as counterparty), set resolutionType='article_210_proxy_appointment', adoptingBody='shareholders', and exactly one of article210ProxyShareholderId / article210ProxyRepresentativeBoardMemberId / article210ProxyRepresentativeExternalName to name who represents the company for that matter." },
      { name: "create_decision", tier: "draft_write", description: "Draft a new decision (mandate/authorization) - ALWAYS created as status='draft', never immediately active. A human must review and activate it in the app before it authorizes anything. decisionType 'operational_board' requires parentDecisionId pointing at a 'strategic_shareholders' decision." },
      { name: "pause_decision", tier: "draft_write", description: "Freeze an active decision without revoking it - blocks it from authorizing new actions while flagged for review, reversibly (unlike revocation, which goes through an approval chain). Use this when you suspect a decision is being relied on incorrectly (e.g. missing an art. 210 proxy) and want to stop further action on it pending human review. Requires draft_write or full_post permission tier." },
      { name: "resume_decision", tier: "full_post", description: "Restore a paused decision back to active, letting it authorize actions again. Higher trust than pause_decision (restoring authority is the risk-increasing direction) - requires full_post permission tier." },
    ],
  },
  {
    slug: "umowy",
    title: "Umowy",
    icon: FileSignature,
    iconClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
    summary: "Umowy dowolnego typu — najem, pożyczka, B2B, umowa o pracę, NDA i inne — zawsze tworzone jako wersja robocza.",
    tools: [
      { name: "list_contracts", tier: "read_only", description: "List all contracts for this business profile (any contract type)." },
      { name: "get_contract", tier: "read_only", description: "Single contract by id, full detail." },
      { name: "create_contract", tier: "draft_write", description: "Create a contract of any type (general, employment, service, lease, rental, lending_for_use, loan, loan_shareholder, capital_contribution, purchase, board_member, management_board, supervisory_board, nda, partnership, other). ALWAYS created inert (lifecycle_state='draft') regardless of what you specify - a human must review and activate it in the app. If boardMemberId is set, the response includes a warning to check_ksh_compliance_for_loan / get_authority_chain before treating it as authorized (KSH art. 210 §1 may require a proxy resolution). If decisionId is set, it must belong to this business profile and be an active decision - otherwise the call is rejected. Requires draft_write or full_post permission tier." },
      { name: "update_contract", tier: "draft_write", description: "Edit an existing contract (partial update - only pass fields you want to change). Does NOT support changing lifecycle_state (activation is a separate, not-yet-built capability) - this tool can only edit a contract's details, never move it out of draft. Requires draft_write or full_post permission tier." },
    ],
  },
  {
    slug: "zgodnosc",
    title: "Zgodność",
    icon: ListChecks,
    iconClass: "text-teal-600 dark:text-teal-400",
    bgClass: "bg-teal-100 dark:bg-teal-900/30",
    summary: "Obowiązki formalne firmy (CRBR, e-Doręczenia, KSeF i inne) — co jeszcze trzeba zrobić i odhaczanie zadań.",
    tools: [
      { name: "list_checklist_tasks", tier: "read_only", description: "List compliance checklist tasks for this business profile (CRBR, konto organizacji w e-Urząd Skarbowy, ZAW-FA, e-Doręczenia, KSeF activation, and other company-lifecycle deadlines). Each task has a status (todo/done/blocked/skipped/not_applicable) and, when relevant, a due_date. Use this to answer 'what compliance tasks are still outstanding for this company'." },
      { name: "list_checklist_rules", tier: "read_only", description: "List the active checklist rule definitions (the templates checklist tasks are generated from) - titles, descriptions, and which entity types/tax regimes each rule applies to. The rules themselves are global, not business-profile-scoped, but businessProfileId is still required (used for connection auth/tier checks, same as every other tool)." },
      { name: "update_checklist_task_status", tier: "draft_write", description: "Mark a compliance checklist task's status (todo/done/blocked/skipped/not_applicable). Setting 'done' stamps completed_at/completed_by; moving away from 'done' clears them. Requires draft_write or full_post permission tier." },
    ],
  },
  {
    slug: "stripe",
    title: "Stripe",
    icon: CreditCard,
    iconClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-100 dark:bg-violet-900/30",
    summary: "Pobieranie danych bezpośrednio z API Stripe, dopasowanie wypłat do banku i faktur, i zamknięcie księgowania.",
    tools: [
      { name: "list_payment_provider_accounts", tier: "read_only", description: "List this business's connected payment provider accounts (Stripe, Revolut, etc. — owner-manual integrations, not Stripe Connect hosted checkout). Returns id, provider, display name, mode (test/live), and status - never secret/API-key values. Call this first to get paymentProviderAccountId, required by every other Stripe tool." },
      { name: "import_stripe_fees", tier: "draft_write", description: "Pull fresh fee data from Stripe's LIVE API for one account and month - scans every balance transaction in the period, upserts stripe_fee_items (idempotent, safe to re-run), and derives/updates the period's settlement (gross sales, refunds, fees, expected payout). May take a few seconds. Requires draft_write or full_post permission tier." },
      { name: "import_stripe_payouts", tier: "draft_write", description: "Pull fresh payout data from Stripe's LIVE API for one account and month - upserts stripe_payouts and stripe_payout_items (idempotent, safe to re-run). May take a few seconds. Requires draft_write or full_post permission tier." },
      { name: "list_stripe_fee_summaries", tier: "read_only", description: "List monthly Stripe fee summaries (one per account per month) - total fees, reverse-charge VAT, and posting status (draft/posted/needs_review/confirmed)." },
      { name: "list_stripe_fee_items", tier: "read_only", description: "List the individual fee line items behind one monthly fee summary (from list_stripe_fee_summaries)." },
      { name: "get_stripe_period_settlement", tier: "read_only", description: "Full reconciliation detail for one account+month: gross sales, refunds, disputes, Stripe fees, reverse-charge VAT, expected payout, and which journal entries (if any) have posted the sale/fee legs. get_posting_queue already surfaces settlements needing posting with a ready debit/credit template - use this tool for direct lookup of a specific period instead." },
      { name: "list_stripe_payouts", tier: "read_only", description: "List Stripe payouts (transfers to the business's bank account) - amount, arrival date, and whether it's been matched to a bank transaction yet." },
      { name: "list_stripe_payout_items", tier: "read_only", description: "List the individual payments/fees/refunds/adjustments that make up one Stripe payout (from list_stripe_payouts)." },
      { name: "list_stripe_invoice_payments", tier: "read_only", description: "List recent Stripe Connect invoice payments (hosted checkout, not the fee/payout reconciliation tables above) for this business, each already resolved to its ksiegai invoice number and customer name where applicable - use this to answer 'which invoice did this Stripe payment pay' or 'has invoice X been paid via Stripe'. Most recent 20." },
      { name: "match_stripe_payout_to_bank_transaction", tier: "draft_write", description: "Bank-transfer matching: for Stripe payouts still awaiting a match (or one specific payoutDbId), looks for a bank_transactions row within ±4 days of the payout's arrival date with a matching amount and links them (bank_match_status -> 'matched'). Requires draft_write or full_post permission tier." },
      { name: "auto_classify_stripe_bank_transactions", tier: "draft_write", description: "Auto-classify unclassified expense bank transactions that look like Stripe transfers (counterparty/description containing 'stripe') - only acts for VAT-exempt business profiles (returns classified:0 otherwise, by design). Requires draft_write or full_post permission tier." },
      { name: "confirm_stripe_payout", tier: "draft_write", description: "Manually confirm a Stripe payout (bank_match_status -> 'matched' if bankTransactionId given, else 'manual_confirmed') and record its financial_event. This is a bookkeeping record, not a journal entry - still use draft_journal_entry/post_journal_entry separately for the actual GL posting. Requires draft_write or full_post permission tier." },
      { name: "link_stripe_settlement_journal_entry", tier: "draft_write", description: "After posting a journal entry for a Stripe settlement's sale or fee leg (via draft_journal_entry + post_journal_entry, using get_posting_queue's template), call this to record the link and update the settlement's status - otherwise it keeps reappearing in get_posting_queue forever. A settlement can need both a sale and a fee entry; status only becomes 'posted' once both applicable legs are linked." },
      { name: "link_stripe_fee_summary_journal_entry", tier: "draft_write", description: "After posting a journal entry for a Stripe monthly fee summary (via draft_journal_entry + post_journal_entry), call this to mark the summary as posted and record the link." },
    ],
  },
];

export function getMcpCategory(slug: string): McpCategory | undefined {
  return mcpCategories.find((c) => c.slug === slug);
}

export function totalMcpToolCount(): number {
  return mcpCategories.reduce((sum, c) => sum + c.tools.length, 0);
}
