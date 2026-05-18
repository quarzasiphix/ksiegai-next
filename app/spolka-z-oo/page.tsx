import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  FileText,
  Shield,
  ThumbsUp,
  Users,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "KsięgaI dla spółek z o.o. – obieg dokumentów, role i KSeF",
  description:
    "System ewidencji i obiegu dokumentów dla spółek z o.o.: workflow zatwierdzania, role i pełnomocnictwa, KSeF-ready, JPK i ślad audytowy.",
  keywords:
    "spółka z o.o. faktury, KSeF spółka, obieg dokumentów spółka, workflow zatwierdzania, JPK spółka, role użytkowników księgowość",
  alternates: { canonical: "https://ksiegai.pl/spolka-z-oo" },
  openGraph: {
    title: "KsięgaI dla spółek z o.o. – obieg dokumentów i KSeF",
    description:
      "Pełen obieg dokumentów dla spółki z o.o.: roles, workflow zatwierdzania, KSeF, JPK i ślad audytowy.",
    url: "https://ksiegai.pl/spolka-z-oo",
    type: "website",
    locale: "pl_PL",
  },
};

export default function SpolkaZOoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="spolka-z-oo" persona="spolka" intent="trial" />
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/30 mb-6">
              <Building className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">Spółka z o.o.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight max-w-3xl">
              Obieg dokumentów i KSeF dla spółki z o.o.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
              Pełen obieg zatwierdzania dokumentów z podziałem ról, śladem audytowym i obsługą KSeF —
              gotowy na wymogi kontroli i obowiązkowy KSeF.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "spolka-z-oo", persona: "spolka", cta_id: "hero_primary", text: "Zacznij trial Premium", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Zacznij 30-dniowy trial Premium
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/jak-to-dziala"
                event="cta_clicked"
                eventProps={{ page: "spolka-z-oo", persona: "spolka", cta_id: "hero_secondary", text: "Zobacz workflow", destination: "/jak-to-dziala" }}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
              >
                Zobacz workflow dla spółki
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Typowe problemy spółki
                </h2>
                <div className="space-y-3">
                  {[
                    "Uzgodnienia faktur przez email — brak śladu",
                    "Brak jednoznacznej odpowiedzialności za zatwierdzenie",
                    "Dokumenty w różnych miejscach: PDF, mail, komunikator",
                    "Niespójne dane przed wysyłką do KSeF",
                    "Kontrola wymaga godzin zbierania dokumentów",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">✗</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 border border-green-200 dark:border-green-800/30">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Co daje KsięgaI
                </h2>
                <div className="space-y-3">
                  {[
                    "Uzgodnienia przy dokumencie — zawsze widoczne",
                    "Kto zatwierdził, kiedy i na jakiej podstawie",
                    "Jeden rejestr: wpływy, uzgodnienia, zatwierdzenia",
                    "Walidacja dokumentów przed wysyłką do KSeF",
                    "Dane gotowe do kontroli od pierwszego dnia",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Kluczowe funkcje dla spółki
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: ThumbsUp,
                  iconClass: "text-blue-600 dark:text-blue-400",
                  bgClass: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Workflow zatwierdzania",
                  desc: "Dokumenty wymagające akceptacji trafiają do kolejki. Każde zatwierdzenie lub odrzucenie jest zapisane z timestampem i uzasadnieniem.",
                },
                {
                  icon: Users,
                  iconClass: "text-purple-600 dark:text-purple-400",
                  bgClass: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Role i pełnomocnictwa",
                  desc: "Właściciel, zarząd, księgowa, asystent — każdy widzi i robi tylko to, do czego ma uprawnienia. Podział ról konfigurowalny dla każdej firmy.",
                },
                {
                  icon: Shield,
                  iconClass: "text-green-600 dark:text-green-400",
                  bgClass: "bg-green-100 dark:bg-green-900/30",
                  title: "KSeF + JPK + walidacje",
                  desc: "Przygotowanie dokumentów, walidacja przed wysyłką do KSeF, eksport JPK_V7M i JPK_FA. Środowisko testowe oddzielone od produkcji.",
                },
                {
                  icon: FileText,
                  iconClass: "text-amber-600 dark:text-amber-400",
                  bgClass: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Ślad audytowy",
                  desc: "Pełna historia: kto dodał dokument, kto komentował, kto zatwierdził. Eksport historii zmian dla potrzeb audytu lub kontroli.",
                },
              ].map(({ icon: Icon, iconClass, bgClass, title, desc }) => (
                <div
                  key={title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgClass}`}>
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App preview: approval queue */}
      <section className="py-12 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Podgląd
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Kolejka zatwierdzania
              </h2>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-slate-500 font-mono">ksiegai.app / zatwierdzenia</span>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">
                Do zatwierdzenia — 3 dokumenty
              </p>
              <div className="space-y-3 mb-5">
                {[
                  {
                    id: "FV/2025/088",
                    vendor: "Oracle Polska Sp. z o.o.",
                    amount: "18 400 zł",
                    note: "Licencja roczna — wymaga zatw. zarządu",
                    urgent: true,
                  },
                  {
                    id: "FV/2025/089",
                    vendor: "Usługi Serwisowe",
                    amount: "2 200 zł",
                    note: "Naprawa sprzętu biurowego",
                    urgent: false,
                  },
                  {
                    id: "UMW/2025/012",
                    vendor: "Wynajem biura",
                    amount: "5 900 zł / mies.",
                    note: "Umowa najmu — aneks",
                    urgent: false,
                  },
                ].map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-white">{doc.id}</p>
                        {doc.urgent && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/20">
                            Pilne
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{doc.vendor}</p>
                      <p className="text-xs text-slate-500 mt-1">{doc.note}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-white">{doc.amount}</p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300">
                        Oczekuje
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                  Ostatnie zatwierdzenia
                </p>
                <div className="space-y-1.5">
                  {[
                    "Jan K. (Zarząd) zatwierdził FV/2025/085 — 45 600 zł",
                    "Anna M. (Główna Księgowa) zdekretowała FV/2025/086",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                      <p className="text-xs text-slate-400">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-3 italic">Dane demonstracyjne.</p>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-blue-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            30 dni Premium dla Twojej spółki
          </h2>
          <p className="text-purple-100 mb-8 max-w-lg mx-auto">
            Pełen obieg zatwierdzania, KSeF, JPK i ślad audytowy — przetestuj bez ograniczeń.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/rejestracja"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
            >
              Zacznij trial Premium
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dla-ksiegowych"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
            >
              Wersja dla biur rachunkowych
            </Link>
          </div>
          <p className="mt-4 text-xs text-purple-200">
            Bez karty • Bez automatycznego odnowienia • Plan podstawowy bezterminowo po zakończeniu trialu
          </p>
        </div>
      </section>
    </div>
  );
}
