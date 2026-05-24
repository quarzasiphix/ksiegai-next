"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ExternalLink,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import posthog from "posthog-js";

const COMPANY_TYPE_LABELS: Record<string, string> = {
  sp_zoo: "Spółka z o.o.",
  sa: "Spółka akcyjna",
  jdg: "Jednoosobowa działalność gospodarcza",
  sp_jawna: "Spółka jawna",
  sp_komandytowa: "Spółka komandytowa",
  dzialalnosc: "Działalność gospodarcza",
};

const INBOX_PROVIDERS: Record<string, { name: string; url: string }> = {
  "gmail.com": { name: "Gmail", url: "https://mail.google.com" },
  "googlemail.com": { name: "Gmail", url: "https://mail.google.com" },
  "yahoo.com": { name: "Yahoo Mail", url: "https://mail.yahoo.com" },
  "outlook.com": { name: "Outlook", url: "https://outlook.live.com/mail" },
  "hotmail.com": { name: "Outlook", url: "https://outlook.live.com/mail" },
  "live.com": { name: "Outlook", url: "https://outlook.live.com/mail" },
  "o2.pl": { name: "O2 Poczta", url: "https://poczta.o2.pl" },
  "wp.pl": { name: "WP Poczta", url: "https://poczta.wp.pl" },
  "onet.pl": { name: "Onet Poczta", url: "https://poczta.onet.pl" },
  "interia.pl": { name: "Interia", url: "https://poczta.interia.pl" },
  "proton.me": { name: "Proton Mail", url: "https://mail.proton.me" },
  "protonmail.com": { name: "Proton Mail", url: "https://mail.proton.me" },
  "icloud.com": { name: "iCloud Mail", url: "https://www.icloud.com/mail" },
};

function getInboxProvider(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? INBOX_PROVIDERS[domain] ?? null : null;
}

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface InviteData {
  id: string;
  company_name: string;
  nip: string | null;
  krs: string | null;
  regon: string | null;
  company_type: string;
  recipient_email: string;
  recipient_name: string | null;
  status: string;
  expires_at: string;
  is_valid: boolean;
}

type InviteRegistrationPageProps = {
  token: string | null;
};

export default function InviteRegistrationPage({ token }: InviteRegistrationPageProps) {
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const tokenHashRef = useRef<string>("");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoadError("Brakuje tokenu zaproszenia.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const hash = await sha256hex(token);
        if (cancelled) return;
        tokenHashRef.current = hash;

        const { data, error } = await (supabase.rpc as any)("lookup_admin_invite", {
          p_token_hash: hash,
        });

        if (cancelled) return;

        if (error || !data) {
          setLoadError("Zaproszenie nie zostało znalezione lub wygasło.");
          return;
        }

        const inv = data as InviteData;
        if (!inv.is_valid) {
          if (inv.status === "claimed") {
            setLoadError("To zaproszenie zostało już wykorzystane.");
          } else if (inv.status === "revoked") {
            setLoadError("To zaproszenie zostało anulowane.");
          } else {
            setLoadError("To zaproszenie wygasło.");
          }
          return;
        }

        setInvite(inv);
        posthog.capture("invite_page_opened", {
          invite_id: inv.id,
          company_type: inv.company_type,
        });
      } catch {
        if (!cancelled) {
          setLoadError("Nie udało się załadować zaproszenia. Spróbuj ponownie.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invite) return;

    setFormError(null);

    if (password.length < 8) {
      setFormError("Hasło musi mieć co najmniej 8 znaków.");
      return;
    }
    if (password !== passwordRepeat) {
      setFormError("Hasła muszą być identyczne.");
      return;
    }
    if (!authorized) {
      setFormError("Musisz potwierdzić uprawnienie do zarządzania tą firmą.");
      return;
    }

    setSubmitting(true);

    try {
      const redirectTo =
        typeof window !== "undefined" && window.location.hostname.includes("localhost")
          ? `http://localhost:${window.location.port || 3000}/auth/callback?reg=invite&inv=${tokenHashRef.current}`
          : `${window.location.origin}/auth/callback?reg=invite&inv=${tokenHashRef.current}`;

      const { error } = await supabase.auth.signUp({
        email: invite.recipient_email,
        password,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        if (error.message.includes("already registered") || error.message.includes("User already registered")) {
          setFormError(
            "Konto z tym adresem e-mail już istnieje. Zaloguj się i wróć do linku zaproszenia."
          );
        } else {
          setFormError(error.message);
        }
        return;
      }

      await (supabase.rpc as any)("mark_invite_signup_started", {
        p_token_hash: tokenHashRef.current,
      });

      posthog.capture("invite_signup_started", {
        invite_id: invite.id,
        company_type: invite.company_type,
      });

      setEmailSent(true);
    } catch {
      setFormError("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (loadError || !invite) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mb-5">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Nieprawidłowe zaproszenie</h1>
          <p className="text-sm text-gray-400 mb-6">{loadError}</p>
          <a
            href="/rejestracja"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Zarejestruj się standardowo
          </a>
        </div>
      </div>
    );
  }

  if (emailSent) {
    const provider = getInboxProvider(invite.recipient_email);
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-8 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 mb-5">
              <Mail className="h-7 w-7 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Sprawdź skrzynkę</h2>
            <p className="text-sm text-gray-400 mb-1">Wysłaliśmy link aktywacyjny na:</p>
            <p className="text-sm font-semibold text-white mb-4">{invite.recipient_email}</p>
            <p className="text-sm text-gray-400 mb-6">
              Kliknij link w e-mailu — zostaniesz zalogowany i{" "}
              <span className="text-white">{invite.company_name}</span> zostanie dodana do Twojego panelu.
            </p>
            {provider && (
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl bg-blue-600 text-sm font-medium text-white hover:bg-blue-500 transition-colors mb-3"
              >
                <ExternalLink className="h-4 w-4" />
                Otwórz {provider.name}
              </a>
            )}
            <p className="text-xs text-gray-500">
              Link jest ważny przez 24 godziny. Nie udostępniaj go innym osobom.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const companyTypeLabel = COMPANY_TYPE_LABELS[invite.company_type] ?? invite.company_type;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-4">
            <Building2 className="h-7 w-7 text-blue-400" />
          </div>
          <p className="text-sm text-blue-400 font-medium mb-1">Zaproszenie do KsięgaI</p>
          <h1 className="text-2xl font-bold text-white">
            Rejestracja dla <span className="text-blue-400">{invite.company_name}</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Dokończ rejestrację i przejmij profil firmy przygotowany dla Ciebie.
          </p>
        </div>

        <div className="rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 bg-gray-900/80">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Typ firmy</p>
                <p className="text-sm font-medium text-white">{companyTypeLabel}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">E-mail zaproszenia</p>
                <p className="text-sm font-medium text-white break-all">{invite.recipient_email}</p>
              </div>
              {invite.nip ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">NIP</p>
                  <p className="text-sm font-medium text-white">{invite.nip}</p>
                </div>
              ) : null}
              {invite.krs ? (
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">KRS</p>
                  <p className="text-sm font-medium text-white">{invite.krs}</p>
                </div>
              ) : null}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Hasło</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-11 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Ustaw hasło do konta"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Powtórz hasło</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-11 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Powtórz hasło"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-gray-800 bg-gray-950/80 p-4">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-950 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm leading-6 text-gray-300">
                Potwierdzam, że jestem uprawniony(-a) do zarządzania tą firmą lub działam za zgodą osoby uprawnionej.
              </span>
            </label>

            {formError && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{formError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !authorized}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? "Tworzę konto…" : "Utwórz konto i aktywuj firmę"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Masz już konto?{" "}
            <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Zaloguj się
            </a>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          To zaproszenie jest ważne do{" "}
          {new Date(invite.expires_at).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          .
        </p>
      </div>
    </div>
  );
}
