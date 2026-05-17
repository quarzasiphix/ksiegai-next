import { createClient } from '@supabase/supabase-js';

// Lightweight anon client for server-side RSC reads (no browser APIs needed).
// Only accesses rows permitted by RLS for the anon role.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
