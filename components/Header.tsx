"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { getAuthToken } from "@/lib/auth/crossDomainAuth";
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
      supabase.auth.setSession({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      });
    }

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
            KsięgaI
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#funkcje" className="text-gray-300 hover:text-white transition-colors text-sm">
              Funkcje
            </a>
            <Link href="/premium" className="text-gray-300 hover:text-white transition-colors text-sm">
              Premium
            </Link>
            <Link href="/cennik" className="text-gray-300 hover:text-white transition-colors text-sm">
              Cennik
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-sm font-medium text-white truncate max-w-[120px]">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <LogOut className="h-3 w-3" />
                    <span className="hidden md:inline">Wyloguj</span>
                  </button>
                </div>
                <Link href={`${process.env.NEXT_PUBLIC_APP_DOMAIN || 'http://localhost:5173'}/dashboard`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Przejdź do aplikacji
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/logowanie">
                  <button className="text-gray-300 hover:text-white px-4 py-2 transition-colors">
                    Zaloguj się
                  </button>
                </Link>
                <Link href="/rejestracja">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
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
