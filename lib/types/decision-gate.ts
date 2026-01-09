export type AuthorityLevel = 
  | 'owner'
  | 'director'
  | 'manager'
  | 'accountant'
  | 'supervisor'
  | 'employee';

export type DecisionType = 
  | 'purchase'
  | 'sale'
  | 'investment'
  | 'contract'
  | 'asset_acquisition'
  | 'asset_disposal'
  | 'expense'
  | 'hiring'
  | 'dividend'
  | 'loan'
  | 'other';

export type DecisionStatus = 
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'executed'
  | 'cancelled'
  | 'expired';

export type EnforcementAction = 'block' | 'warn' | 'require_approval';

export type RuleType = 
  | 'invoice_export'
  | 'asset_registration'
  | 'expense_approval'
  | 'contract_validity'
  | 'decision_required'
  | 'field_required'
  | 'approval_chain';

export interface Decision {
  id: string;
  business_profile_id: string;
  decision_number: string;
  title: string;
  description?: string;
  decision_type: DecisionType;
  scope_description: string;
  budget_amount: number;
  budget_currency: string;
  spent_amount: number;
  status: DecisionStatus;
  required_authority: AuthorityLevel;
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  valid_from: string;
  valid_until?: string;
  decision_maker: string;
  responsible_person?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  attachments?: any[];
}

export interface AuthorityMatrix {
  id: string;
  business_profile_id: string;
  user_id: string;
  authority_level: AuthorityLevel;
  max_decision_amount?: number;
  allowed_decision_types?: DecisionType[];
  valid_from: string;
  valid_until?: string;
  is_active: boolean;
  granted_by: string;
  granted_at: string;
}

export interface EnforcementRule {
  id: string;
  business_profile_id: string;
  rule_name: string;
  rule_type: RuleType;
  entity_type: string;
  conditions: Record<string, any>;
  enforcement_action: EnforcementAction;
  error_message: string;
  required_fields?: string[];
  required_decision_type?: DecisionType;
  minimum_authority?: AuthorityLevel;
  is_active: boolean;
  priority: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AssetRegistry {
  id: string;
  business_profile_id: string;
  decision_id: string;
  asset_number: string;
  asset_name: string;
  asset_category: string;
  acquisition_value: number;
  acquisition_date: string;
  depreciation_method?: 'linear' | 'declining' | 'none';
  useful_life_years?: number;
  residual_value: number;
  current_book_value?: number;
  accumulated_depreciation: number;
  status: 'active' | 'disposed' | 'fully_depreciated';
  location?: string;
  responsible_person?: string;
  registered_by: string;
  registered_at: string;
}

export interface DecisionApproval {
  id: string;
  decision_id: string;
  approver_id: string;
  approver_authority: AuthorityLevel;
  action: 'approved' | 'rejected' | 'requested_changes';
  comment?: string;
  approved_at: string;
  sequence_order: number;
}

export interface EnforcementLog {
  id: string;
  business_profile_id: string;
  entity_type: string;
  entity_id: string;
  rule_id?: string;
  action: 'blocked' | 'warned' | 'allowed_with_override';
  reason: string;
  user_id: string;
  override_by?: string;
  created_at: string;
}
