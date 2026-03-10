"use client";

import type { EmailOtpType } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import { redirectToApp, storeAuthToken } from "@/lib/auth/crossDomainAuth";
import { sendWelcomeEmailIfNewUser } from "@/lib/auth/welcomeEmail";
import { supabase } from "@/lib/supabase";

const SUPPORTED_EMAIL_OTP_TYPES = new Set<EmailOtpType>([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

function ConfirmEmailInner() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const confirmEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const rawType = params.get("type");
      const tokenHash = params.get("token_hash") || params.get("token");

      if (!rawType || !tokenHash) {
        if (!cancelled) {
          setErrorMessage("Link potwierdzający jest niekompletny.");
        }
        return;
      }

      if (!SUPPORTED_EMAIL_OTP_TYPES.has(rawType as EmailOtpType)) {
        if (!cancelled) {
          setErrorMessage("Ten typ linku potwierdzającego nie jest obsługiwany.");
        }
        return;
      }

      try {
        const type = rawType as EmailOtpType;
        const { data, error } = await supabase.auth.verifyOtp({
          type,
          token_hash: tokenHash,
        });

        if (error) {
          if (!cancelled) {
            setErrorMessage("Nie udało się potwierdzić adresu e-mail. Spróbuj otworzyć najnowszy link z wiadomości.");
          }
          return;
        }

        const session = data.session ?? (await supabase.auth.getSession()).data.session;
        if (!session) {
          if (!cancelled) {
            setErrorMessage("Potwierdzenie zakończyło się bez aktywnej sesji. Zaloguj się ponownie.");
          }
          return;
        }

        if (type === "signup" || type === "invite") {
          await sendWelcomeEmailIfNewUser({
            userId: session.user.id,
            email: session.user.email,
            createdAt: session.user.created_at,
            force: true,
          });
        }

        storeAuthToken({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at || 0,
          user_id: session.user.id,
        });

        redirectToApp(type === "recovery" ? "/dashboard" : "/");
      } catch (error) {
        if (!cancelled) {
          console.error("[auth/confirm] Unexpected confirmation error:", error);
          setErrorMessage("Wystąpił nieoczekiwany błąd podczas potwierdzania adresu e-mail.");
        }
      }
    };

    void confirmEmail();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
        {errorMessage ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nie udało się potwierdzić adresu</h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{errorMessage}</p>
            <a
              href="/rejestracja"
              className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              Wróć do rejestracji
            </a>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Potwierdzamy Twój adres e-mail</h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Za chwilę zalogujemy Cię do aplikacji i dokończymy aktywację konta.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmEmailInner />
    </Suspense>
  );
}
