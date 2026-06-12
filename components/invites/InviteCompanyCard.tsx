"use client";

import { Building2, CheckCircle2, MapPin } from "lucide-react";
import type { FullInviteData } from "./InviteActivationOverlay";

const COMPANY_TYPE_LABELS: Record<string, string> = {
  sp_zoo: "Sp. z o.o.",
  sa: "Spółka akcyjna",
  jdg: "Jednoosobowa dz. gosp.",
  sp_jawna: "Spółka jawna",
  sp_komandytowa: "Spółka komandytowa",
  dzialalnosc: "Działalność gospodarcza",
};

const STATUS_ROWS = [
  "Dane firmy przygotowane",
  "Checklista po KRS dostępna",
  "Konfiguracja KSeF do aktywacji",
  "Fakturowanie do uruchomienia",
];

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

function formatCapital(n: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);
}

interface Props {
  invite: FullInviteData;
  /** Hide the illustration image — useful inside the compact mobile overlay */
  hideIllustration?: boolean;
}

export function InviteCompanyCard({ invite, hideIllustration = false }: Props) {
  const companyTypeLabel = invite.company_type
    ? (COMPANY_TYPE_LABELS[invite.company_type] ?? invite.company_type)
    : null;

  const addressLine = [
    invite.address,
    [invite.postal_code, invite.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  const board = parsePersonList(invite.board_members);
  const shareholders = parsePersonList(invite.shareholders);
  const capital = invite.share_capital;

  const cells = [
    board.length ? { label: "Zarząd", value: board.map((m) => m.name).join(", ") } : null,
    shareholders.length ? { label: "Wspólnicy", value: shareholders.map((s) => s.name).join(", ") } : null,
    capital !== null && capital !== undefined ? { label: "Kapitał", value: formatCapital(capital) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
      {/* Title section */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-800">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          <Building2 className="h-3 w-3" />
          Profil spółki przygotowany
        </span>
        <h2 className="mt-4 text-xl font-bold text-white leading-snug">
          Profil <span className="text-blue-400">{invite.company_name}</span> jest przygotowany.
        </h2>
        <p className="mt-2 text-sm text-slate-400 leading-6">
          Odblokuj dostęp do konfiguracji KSeF, danych spółki, checklisty po KRS i obsługi faktur.
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

      {/* Checklist rows + optional illustration */}
      <div className="px-6 py-2 border-b border-slate-800 flex items-center gap-4">
        <div className="flex-1 space-y-2.5 py-2">
          {STATUS_ROWS.map((row) => (
            <div key={row} className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-sm text-slate-300">{row}</span>
            </div>
          ))}
        </div>
        {!hideIllustration && (
          <img
            src="/email-assets/register-ksef.png"
            alt="KSeF i faktury"
            className="w-64 shrink-0 select-none opacity-90"
            draggable={false}
          />
        )}
      </div>

      {/* Address */}
      {addressLine ? (
        <div className="px-6 py-4 border-b border-slate-800">
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 mb-1">
            <MapPin className="h-3 w-3" /> Adres
          </p>
          <p className="text-sm text-slate-300">{addressLine}</p>
        </div>
      ) : null}

      {/* Board · Shareholders · Capital */}
      {cells.length > 0 ? (
        <div className="border-b border-slate-800">
          <div
            className="grid px-6 py-4"
            style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
          >
            {cells.map((cell, i) => (
              <div key={cell.label} className={i > 0 ? "pl-4 border-l border-slate-800" : ""}>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{cell.label}</p>
                <p className="text-xs text-slate-300 leading-snug">{cell.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Invited email */}
      <div className="px-6 py-4 bg-slate-950/30">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Zaproszenie dla</p>
        <p className="text-sm font-medium text-white">{invite.recipient_email}</p>
      </div>
    </div>
  );
}
