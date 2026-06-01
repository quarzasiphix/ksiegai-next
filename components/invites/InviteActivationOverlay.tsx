"use client";

import { ArrowRight, Building2, CheckCircle2, ChevronDown, ChevronUp, MapPin, Users } from "lucide-react";
import { useState } from "react";

const COMPANY_TYPE_LABELS: Record<string, string> = {
  sp_zoo: "Spółka z o.o.",
  sa: "Spółka akcyjna",
  jdg: "Jednoosobowa działalność gospodarcza",
  sp_jawna: "Spółka jawna",
  sp_komandytowa: "Spółka komandytowa",
  dzialalnosc: "Działalność gospodarcza",
};

export interface FullInviteData {
  company_name: string;
  nip: string | null;
  krs: string | null;
  regon: string | null;
  company_type: string | null;
  recipient_email: string;
  recipient_name: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  shareholders: unknown;
  board_members: unknown;
  share_capital: number | null;
  is_valid: boolean;
  recipient_has_account?: boolean;
}

interface PersonEntry {
  name: string;
  role?: string;
  share?: string;
}

function parsePersonList(raw: unknown): PersonEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (x): x is PersonEntry =>
      typeof x === "object" && x !== null && typeof (x as PersonEntry).name === "string",
  );
}

function formatCapital(capital: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(capital);
}

const STATUS_ROWS = [
  "Dane firmy przygotowane",
  "Checklista po KRS dostępna",
  "Konfiguracja KSeF do aktywacji",
  "Fakturowanie do uruchomienia",
];

interface Props {
  invite: FullInviteData;
  onContinue: () => void;
}

export default function InviteActivationOverlay({ invite, onContinue }: Props) {
  const [expanded, setExpanded] = useState(false);

  const companyTypeLabel = invite.company_type
    ? (COMPANY_TYPE_LABELS[invite.company_type] ?? invite.company_type)
    : null;

  const addressLine = [
    invite.address,
    [invite.postal_code, invite.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const boardMembers = parsePersonList(invite.board_members);
  const shareholders = parsePersonList(invite.shareholders);
  const hasExtras =
    !!addressLine ||
    (invite.share_capital !== null && invite.share_capital !== undefined) ||
    boardMembers.length > 0 ||
    shareholders.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <Building2 className="h-3 w-3" />
            Profil spółki przygotowany
          </span>
        </div>

        {/* Card */}
        <div className="rounded-[20px] border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
          {/* Title */}
          <div className="px-6 pt-6 pb-5 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white leading-snug">
              Profil <span className="text-blue-400">{invite.company_name}</span> jest przygotowany.
            </h1>
            <p className="mt-2 text-sm text-slate-400 leading-6">
              Odblokuj dostęp do konfiguracji KSeF, danych spółki, checklisty po KRS i obsługi faktur.
            </p>

            {/* Company identifiers */}
            <div className="mt-4 flex flex-wrap gap-2">
              {companyTypeLabel && (
                <span className="rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
                  {companyTypeLabel}
                </span>
              )}
              {invite.krs && (
                <span className="rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
                  KRS {invite.krs}
                </span>
              )}
              {invite.nip && (
                <span className="rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
                  NIP {invite.nip}
                </span>
              )}
              {invite.regon && (
                <span className="rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
                  REGON {invite.regon}
                </span>
              )}
            </div>
          </div>

          {/* Status rows */}
          <div className="px-6 py-4 border-b border-slate-800 space-y-2.5">
            {STATUS_ROWS.map((row) => (
              <div key={row} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-300">{row}</span>
              </div>
            ))}
          </div>

          {/* Invite recipient */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/30">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Zaproszenie dla</p>
            <p className="text-sm font-medium text-white">{invite.recipient_email}</p>
          </div>

          {/* Expandable company details */}
          {hasExtras && (
            <div className="px-6 py-4 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                {expanded ? "Ukryj dane spółki" : "Zobacz dane spółki"}
              </button>

              {expanded && (
                <div className="mt-4 space-y-4">
                  {addressLine && (
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
                        <MapPin className="h-3 w-3" /> Adres
                      </p>
                      <p className="text-sm text-slate-300">{addressLine}</p>
                    </div>
                  )}
                  {invite.share_capital !== null && invite.share_capital !== undefined && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
                        Kapitał zakładowy
                      </p>
                      <p className="text-sm text-slate-300">{formatCapital(invite.share_capital)}</p>
                    </div>
                  )}
                  {boardMembers.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
                        <Users className="h-3 w-3" /> Zarząd
                      </p>
                      <ul className="space-y-1">
                        {boardMembers.map((m, i) => (
                          <li key={i} className="text-sm text-slate-300">
                            {m.name}
                            {m.role ? ` — ${m.role}` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {shareholders.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">
                        Wspólnicy
                      </p>
                      <ul className="space-y-1">
                        {shareholders.map((s, i) => (
                          <li key={i} className="text-sm text-slate-300">
                            {s.name}
                            {s.share ? ` — ${s.share}` : ""}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Primary CTA */}
          <div className="px-6 py-5">
            <button
              type="button"
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 text-sm transition-colors"
            >
              Dalej — odblokuj dostęp
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          Zaproszenie przypisane do adresu {invite.recipient_email}
        </p>
      </div>
    </div>
  );
}
