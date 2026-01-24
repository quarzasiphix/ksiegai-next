import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // For static export, we can't use request.url directly
  // This route will be handled by the client-side callback instead
  // Redirect to the callback page which will handle the verification
  return NextResponse.redirect(new URL('/auth/callback', 'https://ksiegai.pl'));
}
