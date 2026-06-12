"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  AlertTriangle,
  ArrowRight,
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

const ACCESS_FEATURES = [
  "Profil firmy gotowy do przejęcia",
  "Checklista po rejestracji dostępna",
  "Konfiguracja KSeF do aktywacji",
  "Fakturowanie do uruchomienia",
];

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

// ─── Company info card (left panel + mobile sheet content) ───────────────────
function CompanyInfoCard({ invite }: { invite: InviteData }) {
  const companyTypeLabel = COMPANY_TYPE_LABELS[invite.company_type] ?? invite.company_type;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-800">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          <Building2 className="h-3 w-3" />
          Zaproszenie do firmy
        </span>
        <h2 className="mt-4 text-xl font-bold text-white leading-snug">
          Dołącz do <span className="text-blue-400">{invite.company_name}</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400 leading-6">
          Utwórz konto i przejdź do zarządzania profilem firmy w KsięgaI.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {companyTypeLabel && (
            <span className="rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs text-slate-300">
              {companyTypeLabel}
            </span>
          )}
          {invite.krs && (
            <span className="rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs text-slate-300">
              KRS {invite.krs}
            </span>
          )}
          {invite.nip && (
            <span className="rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs text-slate-300">
              NIP {invite.nip}
            </span>
          )}
          {invite.regon && (
            <span className="rounded-full border border-slate-700/80 bg-slate-950/50 px-3 py-1 text-xs text-slate-300">
              REGON {invite.regon}
            </span>
          )}
        </div>
      </div>

      {/* Feature checklist */}
      <div className="px-6 py-4 border-b border-slate-800 space-y-2.5">
        {ACCESS_FEATURES.map((row) => (
          <div key={row} className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span className="text-sm text-slate-300">{row}</span>
          </div>
        ))}
      </div>

      {/* Recipient email */}
      <div className="px-6 py-4 bg-slate-950/30">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Zaproszenie dla</p>
        <p className="text-sm font-medium text-white">{invite.recipient_email}</p>
      </div>
    </div>
  );
}

// ─── Mobile bottom sheet overlay ─────────────────────────────────────────────
function MobileCompanySheet({
  invite,
  onContinue,
}: {
  invite: InviteData;
  onContinue: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onContinue}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[24px] shadow-[0_-8px_40px_rgba(2,6,23,0.7)]">
        <div className="flex justify-center pt-3 pb-2 bg-slate-900 rounded-t-[24px]">
          <div className="h-1 w-10 rounded-full bg-slate-700" />
        </div>
        <CompanyInfoCard invite={invite} />
        <div className="bg-slate-900 border-t border-slate-800 px-5 py-4">
          <style>{`
            @keyframes team-invite-shimmer {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .team-invite-cta {
              background: linear-gradient(270deg, #1d4ed8, #3b82f6, #2563eb, #60a5fa, #2563eb);
              background-size: 300% 300%;
              animation: team-invite-shimmer 3s ease infinite;
            }
          `}</style>
          <button
            type="button"
            onClick={onContinue}
            className="team-invite-cta w-full flex items-center justify-center gap-2 rounded-xl text-white font-semibold py-4 text-sm"
          >
            Utwórz konto i dołącz
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function InviteRegistrationPage({ token }: InviteRegistrationPageProps) {
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const tokenHashRef = useRef<string>("");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
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
        setShowMobileSheet(true);
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

    return () => { cancelled = true; };
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

  // ─── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-lg animate-pulse space-y-4">
          <div className="h-7 w-48 rounded-full bg-slate-800" />
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="px-6 pt-6 pb-5 border-b border-slate-800 space-y-3">
              <div className="h-5 w-3/4 rounded bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-800/60" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-24 rounded-full bg-slate-800" />
                <div className="h-6 w-20 rounded-full bg-slate-800" />
              </div>
            </div>
            <div className="px-6 py-4 space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-52 rounded bg-slate-800/60" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error state ─────────────────────────────────────────────────────────────
  if (loadError || !invite) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mb-5">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Nieprawidłowe zaproszenie</h1>
          <p className="text-sm text-slate-400 mb-6">{loadError}</p>
          <a
            href="/rejestracja"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Zarejestruj się standardowo
          </a>
        </div>
      </div>
    );
  }

  // ─── Confirmation (email sent) ───────────────────────────────────────────────
  if (emailSent) {
    const provider = getInboxProvider(invite.recipient_email);
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 mb-5">
              <Mail className="h-7 w-7 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Sprawdź skrzynkę</h2>
            <p className="text-sm text-slate-400 mb-1">Wysłaliśmy link aktywacyjny na:</p>
            <p className="text-sm font-semibold text-white mb-4">{invite.recipient_email}</p>
            <p className="text-sm text-slate-400 mb-6">
              Kliknij link w e-mailu — zostaniesz zalogowany i{" "}
              <span className="text-white font-medium">{invite.company_name}</span> zostanie dodana do Twojego panelu.
            </p>
            {provider && (
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-3.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-500 transition-colors mb-3"
              >
                <ExternalLink className="h-4 w-4" />
                Przejdź do {provider.name}
              </a>
            )}
            <p className="text-xs text-slate-500">
              Link jest ważny przez 24 godziny. Nie udostępniaj go innym osobom.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main: two-column desktop / form + overlay mobile ───────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-start justify-center p-4 py-6 lg:py-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">

          {/* ── Left: company card (desktop only) ── */}
          <div className="hidden lg:block">
            <CompanyInfoCard invite={invite} />
          </div>

          {/* ── Right: auth form ── */}
          <div className="min-w-0">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dołącz do firmy</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Aktywuj dostęp do profilu {invite.company_name} w KsięgaI.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-7 space-y-4">
              {/* Locked email */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
                    E-mail zaproszenia
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {invite.recipient_email}
                  </p>
                </div>
                <Lock className="h-4 w-4 text-gray-300 dark:text-gray-600 shrink-0" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Hidden email so browsers associate the password with the right account */}
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={invite.recipient_email}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
                />
                {/* Password */}
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ustaw hasło, żeby aktywować dostęp do profilu firmy.
                  </p>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (showConfirm) { setShowConfirm(false); setPasswordRepeat(""); }
                      }}
                      onBlur={() => { if (password.length >= 8) setShowConfirm(true); }}
                      required
                      autoComplete="new-password"
                      placeholder="Hasło"
                      autoFocus
                      className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {showConfirm && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                    <input
                      type="password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                      required
                      autoComplete="new-password"
                      autoFocus
                      placeholder="Powtórz hasło"
                      className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-0 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400"
                    />
                  </div>
                )}

                {/* Authorization checkbox */}
                <label className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={authorized}
                    onChange={(e) => setAuthorized(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Potwierdzam, że jestem uprawniony(-a) do zarządzania tą firmą lub działam za zgodą osoby uprawnionej.
                  </span>
                </label>

                {formError && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !authorized}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Aktywowanie…" : "Aktywuj dostęp do firmy"}
                </button>

                <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-1">
                  Rejestrując się, akceptujesz{" "}
                  <a href="/regulamin" className="hover:underline">Regulamin</a>{" "}
                  i{" "}
                  <a href="/polityka-prywatnosci" className="hover:underline">Politykę prywatności</a>.
                </p>
              </form>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Masz już konto?{" "}
                <a href="/logowanie" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Zaloguj się i połącz z zaproszeniem
                </a>
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Zaproszenie ważne do{" "}
                {new Date(invite.expires_at).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile bottom sheet */}
      {showMobileSheet && (
        <MobileCompanySheet
          invite={invite}
          onContinue={() => setShowMobileSheet(false)}
        />
      )}
    </div>
  );
}
