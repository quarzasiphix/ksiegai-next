import { createClient } from '@supabase/supabase-js';

interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface CloudflareContext {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
  data: Record<string, any>;
}

export const onRequestPost = async (context: CloudflareContext): Promise<Response> => {
  try {
    const { env, request } = context;
    
    // Get Supabase credentials from environment
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const body = await request.json() as any;
    const {
      test_id,
      test_key,
      variant_id,
      session_id,
      event_type,
      event_name,
      event_value,
      event_metadata,
      page_path,
      user_agent,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    // Get client IP from Cloudflare headers
    const ip_address = request.headers.get('cf-connecting-ip') ||
                       request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip');

    if (event_type === 'assignment') {
      // Record new assignment
      const { error } = await supabase
        .from('ab_test_assignments')
        .insert({
          test_id,
          session_id,
          variant_id,
          user_agent: user_agent || request.headers.get('user-agent'),
          ip_address,
          referrer,
          utm_source,
          utm_medium,
          utm_campaign,
          assigned_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error recording assignment:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to record assignment' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // For other events, find test_id if only test_key is provided
    let actualTestId = test_id;
    
    if (!actualTestId && test_key) {
      const { data: testData } = await supabase
        .from('ab_test_definitions')
        .select('id')
        .eq('test_key', test_key)
        .single();
      
      if (testData) {
        actualTestId = testData.id;
      }
    }

    if (!actualTestId) {
      return new Response(
        JSON.stringify({ error: 'Test not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get assignment ID
    const { data: assignment } = await supabase
      .from('ab_test_assignments')
      .select('id')
      .eq('test_id', actualTestId)
      .eq('session_id', session_id)
      .single();

    if (!assignment) {
      console.error('No assignment found for event tracking');
      return new Response(
        JSON.stringify({ error: 'Assignment not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Record event
    const eventData: any = {
      test_id: actualTestId,
      assignment_id: assignment.id,
      variant_id,
      event_type,
      created_at: new Date().toISOString(),
    };

    // Add optional fields
    if (event_name) eventData.event_name = event_name;
    if (event_value !== undefined) eventData.event_value = event_value;
    if (event_metadata) eventData.event_metadata = event_metadata;
    if (page_path) eventData.page_path = page_path;
    
    // Extract time_on_page and scroll_depth from metadata if present
    if (event_metadata?.time_on_page !== undefined) {
      eventData.time_on_page = event_metadata.time_on_page;
    }
    if (event_metadata?.scroll_depth !== undefined) {
      eventData.scroll_depth = event_metadata.scroll_depth;
    }

    const { error } = await supabase
      .from('ab_test_events')
      .insert(eventData);

    if (error) {
      console.error('Error recording event:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to record event' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('AB tracking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Handle OPTIONS for CORS
export const onRequestOptions = async (): Promise<Response> => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
