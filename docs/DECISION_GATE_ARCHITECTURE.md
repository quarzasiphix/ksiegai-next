# Decision Gate Architecture

## Core Principle

**Nothing material can happen unless:**
1. A decision exists
2. The decision is approved
3. The decision references scope and budget

This is where you quietly become infrastructure.

## Database Schema

### Core Tables

#### `decisions`
The gate that controls everything. Every material operation must reference an approved decision.

**Key fields:**
- `decision_number`: Sequential identifier (DEC/2025/001)
- `title`, `description`: What this decision covers
- `decision_type`: purchase, sale, investment, contract, asset_acquisition, etc.
- `scope_description`: Detailed scope
- `budget_amount`, `spent_amount`: Financial limits and tracking
- `status`: draft, pending_approval, approved, rejected, executed, cancelled, expired
- `required_authority`: Minimum authority level needed for approval
- `valid_from`, `valid_until`: Validity period
- `decision_maker`, `responsible_person`: Accountability chain

#### `authority_matrix`
Defines who can approve what. The governance structure.

**Key fields:**
- `user_id`, `authority_level`: Who has what level
- `max_decision_amount`: Financial limits
- `allowed_decision_types`: What types they can approve
- `valid_from`, `valid_until`: Authority validity period

**Authority levels:**
- `owner`: Full decision authority
- `director`: Strategic decisions
- `manager`: Operational decisions
- `accountant`: Financial control
- `supervisor`: Team oversight
- `employee`: Task execution

#### `enforcement_rules`
Accountant-defined rules that the system enforces.

**Rule types:**
- `invoice_export`: Control export to accounting
- `asset_registration`: Require registration before depreciation
- `expense_approval`: Control expense approval
- `contract_validity`: Requirements for valid contracts
- `decision_required`: Operations requiring decisions
- `field_required`: Mandatory fields
- `approval_chain`: Multi-level approvals

**Enforcement actions:**
- `block`: Complete operation block
- `warn`: Show warning but allow
- `require_approval`: Redirect to approval

#### `asset_registry`
All assets must be registered before depreciation.

**Key fields:**
- `decision_id`: REQUIRED - links to acquisition decision
- `asset_number`, `asset_name`, `asset_category`
- `acquisition_value`, `acquisition_date`
- `depreciation_method`, `useful_life_years`
- `current_book_value`, `accumulated_depreciation`
- `status`: active, disposed, fully_depreciated

#### `enforcement_log`
Audit trail of all enforcement actions.

**Tracks:**
- What was blocked/warned
- Which rule was violated
- Who tried the action
- Whether override was used

## Enforcement Mechanisms

### Invoice Export
```sql
ALTER TABLE invoices 
  ADD COLUMN can_export_to_accounting BOOLEAN GENERATED ALWAYS AS (
    CASE 
      WHEN decision_id IS NULL THEN false
      ELSE true
    END
  ) STORED;
```

**Result:** Invoices without decisions cannot be exported. The button is simply disabled.

### Asset Depreciation
Assets in `asset_registry` MUST have a `decision_id`. Without registration, depreciation is impossible.

### Expense Risk Flagging
```sql
ALTER TABLE expenses
  ADD COLUMN risk_flag TEXT CHECK (risk_flag IN ('approved', 'personal_risk', 'pending'));
```

**Result:** Expenses without approval are flagged as `personal_risk`.

### Contract Validity
```sql
ALTER TABLE contracts
  ADD COLUMN is_valid BOOLEAN GENERATED ALWAYS AS (
    CASE 
      WHEN decision_id IS NULL OR user_id IS NULL THEN false
      ELSE true
    END
  ) STORED;
```

**Result:** Contracts without owner or decision are marked invalid.

## Governance Onboarding Flow

### The Killer Question
During onboarding, ask:

> **"Who is allowed to make binding decisions in this company?"**

Then:
1. Require them to define it
2. Log it in `authority_matrix`
3. Enforce it system-wide

At that moment, you are no longer a tool. You are governance.

## Accountant Dashboard

The accountant defines:
- Required fields
- Approval rules
- Export rules

The client cannot bypass them.

**This flips the power dynamic:**
- ❌ Without KsięgaI: Accountant fights chaos
- ✅ With KsięgaI: Accountant is the gatekeeper, system enforces

## API Services

### DecisionService
```typescript
DecisionService.createDecision(decision)
DecisionService.approveDecision(decisionId, approverId, comment)
DecisionService.rejectDecision(decisionId, approverId, reason)
DecisionService.checkDecisionValidity(decisionId)
DecisionService.getAvailableBudget(decisionId)
```

### AuthorityService
```typescript
AuthorityService.grantAuthority(authority)
AuthorityService.getAuthorities(businessProfileId)
AuthorityService.revokeAuthority(id)
AuthorityService.getUserAuthority(businessProfileId, userId)
```

### EnforcementService
```typescript
EnforcementService.createRule(rule)
EnforcementService.getRules(businessProfileId)
EnforcementService.updateRule(id, updates)
EnforcementService.logEnforcement(log)
EnforcementService.getEnforcementLog(businessProfileId)
```

### AssetService
```typescript
AssetService.registerAsset(asset)
AssetService.getAssets(businessProfileId)
AssetService.calculateDepreciation(assetId)
```

## Infrastructure Framing

### Language to Use

✅ **Good:**
- "Single source of truth for your company"
- "Where decisions, money and assets meet"
- "Built for audit, not excuses"
- "The system your accountant can rely on"

❌ **Bad:**
- "Save time"
- "Automate accounting"
- "All-in-one ERP"

### Entry Offer

**Don't lead with rigidity. Lead with safety.**

> "Run your company with full traceability — without changing how you work."

Then gradually:
1. Introduce rules
2. Introduce approvals
3. Introduce exclusivity

Infrastructure is adopted progressively, not imposed.

## Target Industries

Industries with:
- Real assets (real estate, transport, warehouses, zoo)
- Real liability
- Real audits
- Real consequences

They don't need "cool software". They need order that survives stress.

## The Core Message

> "We don't help you run your business. We define where it is recorded."

That's infrastructure language.

## Implementation Checklist

- [x] Database schema with decision gates
- [x] Authority matrix for governance
- [x] Enforcement rules system
- [x] Asset registry with mandatory decisions
- [x] Enforcement logging
- [x] Decision service API
- [x] Governance onboarding flow
- [x] Accountant dashboard
- [x] Infrastructure framing in UI
- [ ] Integration with existing invoice/expense flows
- [ ] Real-time enforcement in UI
- [ ] Notification system for approvals
- [ ] Reporting dashboard for auditors

## Next Steps

1. **Connect enforcement to existing flows**: Add decision selection to invoice/expense creation
2. **Build approval workflows**: Email/in-app notifications for pending approvals
3. **Create audit reports**: Dashboard showing all decisions, approvals, and enforcement actions
4. **Test with real accountant**: Get feedback on rule definition UX
5. **Document for end users**: How to create decisions, request approvals, etc.
