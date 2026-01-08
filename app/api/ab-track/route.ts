import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a function to get Supabase client lazily
function getSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    
    const body = await request.json();
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

    // Get client IP
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       request.headers.get('cf-connecting-ip');

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
        return NextResponse.json({ error: 'Failed to record assignment' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // For other events, we need to find the test_id if only test_key is provided
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
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
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
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
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
      return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AB tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
