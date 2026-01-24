"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { storeAuthToken, redirectToApp } from "@/lib/auth/crossDomainAuth";

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      // Handle OAuth callback - exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error('Auth callback error:', error);
        window.location.href = '/rejestracja?error=auth_failed';
        return;
      }

      const { session } = data;

      if (session) {
        // Store token for cross-domain access
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        // Check if we need to redirect back to localhost
        const localhostRedirect = sessionStorage.getItem('localhost_redirect');
        if (localhostRedirect) {
          const { from, port } = JSON.parse(localhostRedirect);
          console.log("[AuthCallback] Redirecting back to localhost:", port);
          sessionStorage.removeItem('localhost_redirect');
          
          // Redirect back to localhost
          window.location.href = `http://localhost:${port}/dashboard`;
          return;
        }
        
        // Check URL parameters for localhost redirect
        const urlParams = new URLSearchParams(window.location.search);
        const redirectFrom = urlParams.get('from');
        const localhostPort = urlParams.get('port');
        
        if (redirectFrom === 'localhost' && localhostPort) {
          console.log("[AuthCallback] Redirecting back to localhost from URL params:", localhostPort);
          window.location.href = `http://localhost:${localhostPort}/dashboard`;
          return;
        }

        // Always redirect to app subdomain root - let app routing handle onboarding
        redirectToApp('/');
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
