// TypeScript types for A/B Testing System

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  changes: Record<string, any>;
}

export interface ABTest {
  id: string;
  test_key: string;
  name: string;
  page_path: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  traffic_allocation: number;
  variants: ABTestVariant[];
  primary_goal: string;
  secondary_goals: string[];
  winner_variant_id: string | null;
  confidence_level: number | null;
  created_at: string;
  updated_at: string;
}

export interface ABTestAssignment {
  id: string;
  test_id: string;
  session_id: string;
  variant_id: string;
  user_id: string | null;
  user_agent: string | null;
  ip_address: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  assigned_at: string;
  updated_at: string;
}

export interface ABTestEvent {
  id: string;
  test_id: string;
  assignment_id: string;
  variant_id: string;
  event_type: 'page_view' | 'conversion' | 'click' | 'scroll' | 'time_on_page' | 'custom';
  event_name: string | null;
  event_value: number | null;
  event_metadata: Record<string, any> | null;
  page_path: string | null;
  time_on_page: number | null;
  scroll_depth: number | null;
  created_at: string;
}

// RPC Function Response Types

export interface TrackRegistrationConversionResponse {
  success: boolean;
  user_id?: string;
  conversions_tracked?: number;
  session_id?: string;
  error?: string;
}

export interface GetUserABVariantsResponse {
  variants: Record<string, string>;
  session_id: string | null;
  error?: string;
}

// Database RPC Function Types
declare module '@supabase/supabase-js' {
  interface Database {
    public: {
      Functions: {
        track_registration_conversion: {
          Args: {
            p_session_id: string;
            p_registration_method?: string;
          };
          Returns: TrackRegistrationConversionResponse;
        };
        get_user_ab_variants: {
          Args: Record<string, never>;
          Returns: GetUserABVariantsResponse;
        };
        get_ab_test_conversion_stats: {
          Args: {
            test_id_param: string;
          };
          Returns: Array<{
            variant_id: string;
            variant_name: string;
            total_assignments: number;
            converted_users: number;
            conversion_rate: number;
            user_emails: string[];
          }>;
        };
      };
    };
  }
}
