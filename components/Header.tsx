"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { getAuthToken, redirectToApp, clearAuthToken, storeAuthToken } from "@/lib/auth/crossDomainAuth";
import { User, Crown, LogOut, Sun, Moon } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for existing auth token from cross-domain cookie
    const token = getAuthToken();
    if (token) {
      console.log("[Header] Found cross-domain token, restoring session");
      supabase.auth.setSession({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    } else {
      console.log("[Header] No cross-domain token found");
    }

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[Header] Auth state changed:", event, session?.user?.id);
      setUser(session?.user || null);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("[Header] Initial session check:", session?.user?.id);
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    console.log("[Header] Logging out - clearing cross-domain token");
    clearAuthToken();
    await supabase.auth.signOut();
    setUser(null);
    console.log("[Header] Logout complete");
  };

  const handleGoToApp = async () => {
    // Get current session and store token before redirecting
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      storeAuthToken({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at || 0,
        user_id: session.user.id,
      });
    }
    redirectToApp('/dashboard');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap items-center justify-between gap-2 sm:gap-4 py-3 min-w-0">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors">
            KsięgaI
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/#funkcje" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
              Funkcje
            </a>
            <Link href="/premium" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
              Premium
            </Link>
            <Link href="/cennik" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
              Cennik
            </Link>
          </nav>

          {/* Right Section */}
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap justify-end w-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap justify-end">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-700">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="hidden lg:flex flex-col max-w-[140px]">
                    <span className="text-xs sm:text-sm font-medium text-white truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] sm:text-xs text-gray-400 hover:text-white flex items-center gap-1 whitespace-nowrap"
                  >
                    <LogOut className="h-3 w-3" />
                    <span className="hidden lg:inline">Wyloguj</span>
                  </button>
                </div>
                <button 
                  onClick={handleGoToApp}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Przejdź do aplikacji
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
                <Link href="/logowanie">
                  <button className="text-gray-300 hover:text-white px-2 sm:px-4 py-2 transition-colors text-sm sm:text-base whitespace-nowrap">
                    Zaloguj się
                  </button>
                </Link>
                <Link href="/rejestracja">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap">
                    Zarejestruj się
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
