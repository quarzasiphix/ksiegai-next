"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Mail, ChevronDown } from "lucide-react";
import { storeAuthToken, redirectToApp } from "@/lib/auth/crossDomainAuth";
import { getSessionId } from "@/lib/ab-testing-supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sessionId] = useState(() => getSessionId());
  const [variantAssignments, setVariantAssignments] = useState<Record<string, string>>({});

  // Load variant assignments from session storage on mount
  useEffect(() => {
    async function loadVariantAssignments() {
      try {
        const { data } = await supabase
          .from('ab_test_assignments')
          .select('test_id, variant_id')
          .eq('session_id', sessionId);
        
        if (data) {
          const assignments: Record<string, string> = {};
          data.forEach(a => {
            assignments[a.test_id] = a.variant_id;
          });
          setVariantAssignments(assignments);
        }
      } catch (err) {
        console.error('Error loading variant assignments:', err);
      }
    }
    
    if (sessionId) {
      loadVariantAssignments();
    }
  }, [sessionId]);

  // Handle auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Track registration conversion for all active A/B tests
        await trackRegistrationConversion(session.user.id);
        
        // Store token for cross-domain access
        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        // Redirect to app subdomain root - let app routing handle onboarding
        redirectToApp('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [variantAssignments, sessionId]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Magic link registration
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Podaj adres e-mail");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) {
      setError("Nie udało się wysłać linku. Spróbuj ponownie.");
    } else {
      setMagicLinkSent(true);
      setResendCooldown(60);
    }
  };

  // Resend magic link
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (error) {
      setError("Nie udało się wysłać linku. Spróbuj ponownie.");
    } else {
      setResendCooldown(60);
    }
  };

  // Track registration conversion for all active A/B tests
  const trackRegistrationConversion = async (userId: string) => {
    try {
      // Get all assignments for this session
      const { data: assignments } = await supabase
        .from('ab_test_assignments')
        .select('id, test_id, variant_id')
        .eq('session_id', sessionId);

      if (!assignments || assignments.length === 0) return;

      // Track conversion event for each test
      const conversionEvents = assignments.map(assignment => ({
        test_id: assignment.test_id,
        assignment_id: assignment.id,
        variant_id: assignment.variant_id,
        event_type: 'conversion',
        event_name: 'registration',
        event_metadata: {
          user_id: userId,
          registration_method: email ? 'magic_link' : 'google_oauth',
          timestamp: new Date().toISOString(),
        },
        created_at: new Date().toISOString(),
      }));

      await supabase.from('ab_test_events').insert(conversionEvents);

      // Update assignments with user_id
      await supabase
        .from('ab_test_assignments')
        .update({ user_id: userId })
        .eq('session_id', sessionId);

      // Store variant info in user metadata
      if (assignments.length > 0) {
        const variantData: Record<string, string> = {};
        assignments.forEach(a => {
          variantData[a.test_id] = a.variant_id;
        });
        
        await supabase.auth.updateUser({
          data: {
            ab_test_variants: variantData,
            ab_session_id: sessionId,
          },
        });
      }
    } catch (err) {
      console.error('Error tracking registration conversion:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (err) {
      setError("Nie udało się zalogować przez Google. Spróbuj ponownie.");
      setLoading(false);
    }
  };

  const handleEmailVerified = () => {
    redirectToApp('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {magicLinkSent ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sprawdź swoją skrzynkę
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Wysłaliśmy link logowania na adres:
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                {email}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Kliknij link w e-mailu</strong>, a zostaniesz automatycznie zalogowany i przekierowany do aplikacji.
                </p>
              </div>

              <button
                onClick={handleEmailVerified}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Email zweryfikowany — kontynuuj
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Nie otrzymałeś e-maila?
                </p>
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0 
                    ? `Wyślij ponownie (${resendCooldown}s)` 
                    : 'Wyślij link ponownie'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Jeszcze chwila — i księgowość masz z głowy.
              </h1>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                🇵🇱 Dla polskich przedsiębiorców • zgodne z KSeF
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Załóż konto, a KsięgaI zajmie się resztą.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <GoogleIcon className="h-5 w-5" />
                  Kontynuuj przez Google
                </button>
                
                {!showEmailForm ? (
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 flex items-center justify-center gap-2"
                  >
                    Użyj adresu e-mail
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleMagicLink} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Adres e-mail
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="twoj@email.pl"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Wyślemy Ci bezpieczny link do logowania.
                        </p>
                      </div>
                      
                      {error && (
                        <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          {error}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Wysyłanie...' : 'Kontynuuj'}
                      </button>
                      
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Kontynuując, akceptujesz <a href="/regulamin" className="text-blue-600 hover:underline">Regulamin</a> i <a href="/polityka-prywatnosci" className="text-blue-600 hover:underline">Politykę prywatności</a>.
                      </p>
                    </form>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Po rejestracji możesz od razu wystawić pierwszą fakturę.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Masz już konto? <a href="/logowanie" className="text-blue-600 hover:underline font-medium">Zaloguj się</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
