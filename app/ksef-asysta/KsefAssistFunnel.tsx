"use client";

import { useState, type FormEvent } from "react";
import { Search, Building2, Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import posthog from "posthog-js";
import { gatewayFetch } from "@/lib/gateway";

type LookupResult = {
  found: boolean;
  name?: string;
  nip?: string;
  krs?: string;
  regon?: string;
  city?: string;
  legalForm?: string;
  companyType?: string;
};

type Step = "query" | "found" | "sent";

export default function KsefAssistFunnel() {
  const [step, setStep] = useState<Step>("query");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<LookupResult | null>(null);
  const [email, setEmail] = useState("");

  const handleLookup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = query.replace(/\D/g, "");
    if (trimmed.length !== 10) {
      setError("Podaj 10-cyfrowy numer NIP lub KRS.");
      return;
    }

    setLoading(true);
    try {
      const result = await gatewayFetch<LookupResult>("/v1/public/ksef-assist/lead", {
        method: "POST",
        body: JSON.stringify({ action: "lookup", query: trimmed }),
      });
      if (!result.found) {
        setError("Nie znaleźliśmy tej firmy w rejestrze KRS. Sprawdź numer i spróbuj ponownie.");
        setLoading(false);
        return;
      }
      posthog.capture("ksef_assist_funnel_company_found", { source: "ksiegai_next_seo" });
      setCompany(result);
      setStep("found");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendLink = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Podaj adres e-mail.");
      return;
    }

    setLoading(true);
    try {
      await gatewayFetch("/v1/public/ksef-assist/lead", {
        method: "POST",
        body: JSON.stringify({
          action: "createLead",
          email,
          nip: company?.nip,
          krs: company?.krs,
          regon: company?.regon,
          companyName: company?.name,
          companyType: company?.companyType,
          city: company?.city,
        }),
      });
      posthog.capture("ksef_assist_funnel_lead_created", { source: "ksiegai_next_seo" });
      setStep("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm">
      <style>{`
        @keyframes ksef-assist-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.35); }
          50%      { box-shadow: 0 0 26px 6px rgba(37, 99, 235, 0.5); }
        }
        .ksef-assist-glow-btn {
          animation: ksef-assist-glow 2.2s ease-in-out infinite;
        }
        @keyframes ksef-assist-input-highlight {
          0%, 100% { border-color: rgba(37, 99, 235, 0.3); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
          50%      { border-color: rgba(37, 99, 235, 0.9); box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14); }
        }
        .ksef-assist-input-highlight {
          animation: ksef-assist-input-highlight 2.2s ease-in-out infinite;
        }
      `}</style>
      {step === "query" && (
        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              NIP lub KRS firmy
            </label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="np. 0000012345"
                required
                className="ksef-assist-input-highlight w-full rounded-lg border-2 bg-white dark:bg-gray-950 py-2.5 pl-9 pr-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {error && (
            <p className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="ksef-assist-glow-btn flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Sprawdzam…" : "Sprawdź firmę"}
          </button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Dane pobieramy z jawnego rejestru KRS. Nie zapisujemy niczego bez Twojej zgody.
          </p>
        </form>
      )}

      {step === "found" && company && (
        <form onSubmit={handleSendLink} className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-4">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{company.name}</p>
              {company.city && <p className="text-xs text-gray-500 dark:text-gray-400">{company.city}</p>}
              {company.legalForm && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{company.legalForm}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Podaj e-mail, a wyślemy link do dokończenia aktywacji i umówienia asysty przy
            konfiguracji KSeF dla <strong>{company.name}</strong>.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@firma.pl"
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2.5 pl-9 pr-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {error && (
            <p className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-all disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Wysyłam…" : "Wyślij link"}
          </button>
          <button
            type="button"
            onClick={() => { setStep("query"); setCompany(null); setError(null); }}
            className="w-full text-center text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            To nie ta firma — wróć
          </button>
        </form>
      )}

      {step === "sent" && (
        <div className="py-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Sprawdź skrzynkę</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Wysłaliśmy link na <strong>{email}</strong>. Kliknij go, żeby dokończyć aktywację konta
            (jedno kliknięcie, bez hasła) i przejść do umówienia asysty przy KSeF.
          </p>
        </div>
      )}
    </div>
  );
}
