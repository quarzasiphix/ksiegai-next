import { createClient } from '@supabase/supabase-js';
import type { Decision, AuthorityMatrix, EnforcementRule, AssetRegistry } from '../types/decision-gate';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export class DecisionService {
  static async createDecision(decision: Partial<Decision>) {
    const { data, error } = await supabase
      .from('decisions')
      .insert([decision])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getDecisions(businessProfileId: string, filters?: {
    status?: string;
    type?: string;
  }) {
    let query = supabase
      .from('decisions')
      .select('*')
      .eq('business_profile_id', businessProfileId)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.type) {
      query = query.eq('decision_type', filters.type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getDecisionById(id: string) {
    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateDecision(id: string, updates: Partial<Decision>) {
    const { data, error } = await supabase
      .from('decisions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async approveDecision(decisionId: string, approverId: string, comment?: string) {
    const { data: decision, error: decisionError } = await supabase
      .from('decisions')
      .update({ 
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString()
      })
      .eq('id', decisionId)
      .select()
      .single();

    if (decisionError) throw decisionError;

    const { data: approval, error: approvalError } = await supabase
      .from('decision_approvals')
      .insert([{
        decision_id: decisionId,
        approver_id: approverId,
        approver_authority: 'owner',
        action: 'approved',
        comment,
        sequence_order: 1
      }])
      .select()
      .single();

    if (approvalError) throw approvalError;

    return { decision, approval };
  }

  static async rejectDecision(decisionId: string, approverId: string, reason: string) {
    const { data: decision, error: decisionError } = await supabase
      .from('decisions')
      .update({ 
        status: 'rejected',
        rejection_reason: reason
      })
      .eq('id', decisionId)
      .select()
      .single();

    if (decisionError) throw decisionError;

    const { data: approval, error: approvalError } = await supabase
      .from('decision_approvals')
      .insert([{
        decision_id: decisionId,
        approver_id: approverId,
        approver_authority: 'owner',
        action: 'rejected',
        comment: reason,
        sequence_order: 1
      }])
      .select()
      .single();

    if (approvalError) throw approvalError;

    return { decision, approval };
  }

  static async checkDecisionValidity(decisionId: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_decision_valid', {
      p_decision_id: decisionId
    });

    if (error) throw error;
    return data;
  }

  static async getAvailableBudget(decisionId: string) {
    const decision = await this.getDecisionById(decisionId);
    return decision.budget_amount - decision.spent_amount;
  }
}

export class AuthorityService {
  static async grantAuthority(authority: Partial<AuthorityMatrix>) {
    const { data, error } = await supabase
      .from('authority_matrix')
      .insert([authority])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getAuthorities(businessProfileId: string) {
    const { data, error } = await supabase
      .from('authority_matrix')
      .select('*, user:user_id(email)')
      .eq('business_profile_id', businessProfileId)
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  }

  static async revokeAuthority(id: string) {
    const { data, error } = await supabase
      .from('authority_matrix')
      .update({ is_active: false })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserAuthority(businessProfileId: string, userId: string) {
    const { data, error } = await supabase
      .from('authority_matrix')
      .select('*')
      .eq('business_profile_id', businessProfileId)
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('authority_level', { ascending: true })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
}

export class EnforcementService {
  static async createRule(rule: Partial<EnforcementRule>) {
    const { data, error } = await supabase
      .from('enforcement_rules')
      .insert([rule])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getRules(businessProfileId: string) {
    const { data, error } = await supabase
      .from('enforcement_rules')
      .select('*')
      .eq('business_profile_id', businessProfileId)
      .order('priority', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  static async updateRule(id: string, updates: Partial<EnforcementRule>) {
    const { data, error } = await supabase
      .from('enforcement_rules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteRule(id: string) {
    const { error } = await supabase
      .from('enforcement_rules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async logEnforcement(log: {
    business_profile_id: string;
    entity_type: string;
    entity_id: string;
    rule_id?: string;
    action: 'blocked' | 'warned' | 'allowed_with_override';
    reason: string;
    user_id: string;
    override_by?: string;
  }) {
    const { data, error } = await supabase
      .from('enforcement_log')
      .insert([log])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getEnforcementLog(businessProfileId: string, limit = 100) {
    const { data, error } = await supabase
      .from('enforcement_log')
      .select('*')
      .eq('business_profile_id', businessProfileId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
}

export class AssetService {
  static async registerAsset(asset: Partial<AssetRegistry>) {
    const { data, error } = await supabase
      .from('asset_registry')
      .insert([asset])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getAssets(businessProfileId: string) {
    const { data, error } = await supabase
      .from('asset_registry')
      .select('*, decision:decision_id(*)')
      .eq('business_profile_id', businessProfileId)
      .order('registered_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async updateAsset(id: string, updates: Partial<AssetRegistry>) {
    const { data, error } = await supabase
      .from('asset_registry')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async calculateDepreciation(assetId: string) {
    const asset = await this.getAssets('').then(assets => 
      assets.find(a => a.id === assetId)
    );

    if (!asset || !asset.useful_life_years) return null;

    const monthsSinceAcquisition = Math.floor(
      (Date.now() - new Date(asset.acquisition_date).getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    const depreciableAmount = asset.acquisition_value - asset.residual_value;
    const monthlyDepreciation = depreciableAmount / (asset.useful_life_years * 12);
    const accumulatedDepreciation = Math.min(
      monthlyDepreciation * monthsSinceAcquisition,
      depreciableAmount
    );

    return {
      accumulated_depreciation: accumulatedDepreciation,
      current_book_value: asset.acquisition_value - accumulatedDepreciation,
      monthly_depreciation: monthlyDepreciation
    };
  }
}
