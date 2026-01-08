import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');

  if (token_hash && type) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });

    if (!error) {
      // Redirect to callback to handle session storage
      return NextResponse.redirect(new URL('/auth/callback', requestUrl.origin));
    }

    // If error, redirect to registration with error
    return NextResponse.redirect(
      new URL(`/rejestracja?error=verification_failed`, requestUrl.origin)
    );
  }

  // Missing parameters
  return NextResponse.redirect(
    new URL('/rejestracja?error=invalid_link', requestUrl.origin)
  );
}
