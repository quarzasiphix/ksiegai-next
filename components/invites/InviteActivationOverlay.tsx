"use client";

import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { InviteCompanyCard } from "./InviteCompanyCard";

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

interface Props {
  invite: FullInviteData;
  onContinue: () => void;
}

export default function InviteActivationOverlay({ invite, onContinue }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onContinue}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[24px] shadow-[0_-8px_40px_rgba(2,6,23,0.7)]">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 bg-slate-900 rounded-t-[24px]">
          <div className="h-1 w-10 rounded-full bg-slate-700" />
        </div>

        {/* Reuse the exact same card from the desktop layout */}
        <InviteCompanyCard invite={invite} hideIllustration />

        {/* CTA */}
        <div className="bg-slate-900 border-t border-slate-800 px-5 py-4">
          <button
            type="button"
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 text-sm transition-colors"
          >
            Dalej — odblokuj dostęp
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
