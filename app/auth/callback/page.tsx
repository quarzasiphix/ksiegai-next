"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { storeAuthToken, redirectToApp } from "@/lib/auth/crossDomainAuth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      // Get the session from the URL hash
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        window.location.href = '/rejestracja?error=auth_failed';
        return;
      }

      if (session) {
        // Store token for cross-domain access
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        // Check if user has business profile
        const { data: profiles } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', session.user.id);

        // Redirect to app subdomain
        if (profiles && profiles.length > 0) {
          redirectToApp('/dashboard');
        } else {
          redirectToApp('/welcome');
        }
      } else {
        // No session, redirect to registration
        window.location.href = '/rejestracja';
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Logowanie...</p>
      </div>
    </div>
  );
}
