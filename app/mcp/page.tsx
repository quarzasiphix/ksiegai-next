import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Landmark,
  FileText,
  Calculator,
  ClipboardList,
  ShieldCheck,
  Eye,
  Lock,
  Terminal,
  CheckCircle2,
  FolderOpen,
  Check,
  ChevronDown,
  Globe,
  Gavel,
  FileSignature,
  ListChecks,
  CreditCard,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PageAnalytics } from "@/components/analytics/PageAnalytics";

export const metadata: Metadata = {
  title: "Połącz AI z KsięgaI (MCP) — asystent księgowy dla Twojego agenta AI",
  description:
    "KsięgaI udostępnia serwer MCP — połącz Claude, Claude Code lub innego agenta AI ze swoją księgowością: faktury, plan kont, saldo, import wyciągów bankowych. Księgowania zawsze za Twoją zgodą.",
  keywords:
    "MCP, Model Context Protocol, AI księgowość, Claude MCP, agent AI faktury, automatyzacja księgowości AI",
  alternates: { canonical: "https://www.ksiegai.pl/mcp/" },
  openGraph: {
    title: "Połącz AI z KsięgaI (MCP)",
    description:
      "Serwer MCP dla KsięgaI: Twoja AI widzi faktury, plan kont i saldo, a każde księgowanie wymaga Twojej zgody.",
    url: "https://www.ksiegai.pl/mcp",
    type: "website",
    locale: "pl_PL",
  },
};

const tools = [
  {
    group: "Firma",
    icon: Building2,
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
    items: [
      { name: "list_business_profiles", desc: "Lista Twoich firm (JDG / spółki) dostępnych dla agenta, z NIP, REGON i formą opodatkowania." },
    ],
  },
  {
    group: "Faktury",
    icon: FileText,
    iconClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
    items: [
      { name: "list_invoices", desc: "Odczyt wystawionych i otrzymanych faktur — pełne dane (pozycje, kwoty, VAT), filtrowane po okresie lub po NIP kontrahenta." },
      { name: "add_expense_invoice", desc: "Dodanie faktury kosztowej (np. z e-maila lub skanu, który agent sam odczytał) — trafia do weryfikacji." },
    ],
  },
  {
    group: "Dokumenty",
    icon: FolderOpen,
    iconClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-100 dark:bg-cyan-900/30",
    items: [
      { name: "list_company_documents / get_company_document", desc: "Przegląd dokumentów firmowych (umowy, uchwały, licencje, sprawozdania) i bezpieczny link do pobrania pliku." },
      { name: "upload_company_document", desc: "Dodanie dokumentu, który agent już posiada jako plik (np. podpisana umowa) wraz z metadanymi." },
    ],
  },
  {
    group: "Księgowość",
    icon: Calculator,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    items: [
      { name: "get_chart_of_accounts", desc: "Plan kont firmy — aktywne konta i ich grupy." },
      { name: "setup_chart_of_accounts", desc: "Zakłada startowy plan kont dla nowej firmy — bezpieczne do wywołania wielokrotnie, nic nie nadpisuje istniejącego planu." },
      { name: "create_chart_account / update_chart_account", desc: "Dodanie nowego konta księgowego lub edycja istniejącego (nazwa, typ, stawka VAT) — również reaktywacja wcześniej wyłączonego konta." },
      { name: "deactivate_chart_account", desc: "Wyłączenie konta z użycia — zablokowane, jeśli konto ma jeszcze niezaksięgowane zapisy robocze." },
      { name: "get_balance_sheet", desc: "Salda kont na dany dzień lub okres — baza pod analizę i raporty." },
      { name: "draft_journal_entry", desc: "Ręczny zapis księgowy (korekta, naliczenie itp.) — zawsze jako wersja robocza, nigdy automatycznie zaksięgowany." },
      { name: "preview_journal_entry_posting → post_journal_entry", desc: "Agent najpierw przygotowuje podgląd zapisu, dopiero potem może go zaksięgować — ten sam mechanizm co przy transakcjach bankowych." },
    ],
  },
  {
    group: "Kolejka i raporty",
    icon: ClipboardList,
    iconClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-100 dark:bg-rose-900/30",
    items: [
      { name: "get_posting_queue", desc: "Faktury, transakcje bankowe i umowy czekające na zaksięgowanie, z proponowaną dekretacją." },
      { name: "get_period_report", desc: "Rzeczywisty rachunek zysków i strat za wybrany miesiąc, liczony z zaksięgowanych zapisów." },
      { name: "list_journal_entries", desc: "Księga główna — zapisy księgowe (robocze i zaksięgowane), z filtrowaniem po dacie i statusie." },
    ],
  },
  {
    group: "Bank",
    icon: Landmark,
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
    items: [
      { name: "list_bank_accounts / list_bank_transactions", desc: "Rachunki firmowe i historia transakcji." },
      { name: "import_bank_statement", desc: "Import wyciągu bankowego, który agent sam odczytał (obraz/PDF/CSV) i przetworzył — bez OCR po stronie serwera." },
      { name: "classify_bank_transaction", desc: "Propozycja klasyfikacji transakcji — trafia jako „do weryfikacji”." },
      { name: "update_bank_transaction / delete_bank_transaction", desc: "Poprawka lub usunięcie transakcji (np. błędny import, duplikat) — zablokowane, gdy transakcja jest już zaksięgowana." },
      { name: "preview_bank_transaction_posting → post_bank_transaction", desc: "Agent najpierw przygotowuje podgląd księgowania, dopiero potem może je zaksięgować — patrz sekcja bezpieczeństwa." },
    ],
  },
  {
    group: "Uchwały i decyzje",
    icon: Gavel,
    iconClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-100 dark:bg-indigo-900/30",
    items: [
      { name: "list_resolutions / get_resolution", desc: "Uchwały wspólników i zarządu — treść, głosy, status kworum." },
      { name: "list_decisions / get_decision", desc: "Decyzje (mandaty/upoważnienia) stojące za każdą umową, fakturą czy wydatkiem." },
      { name: "get_authority_chain", desc: "Pełny łańcuch upoważnienia dla umowy/faktury/wydatku — czy istnieje właściwa decyzja i uchwała." },
      { name: "check_ksh_compliance_for_loan", desc: "Sprawdzenie pożyczki od wspólnika/członka zarządu pod kątem KSH art. 15, 210 §1 i 230 — czy spółka może być reprezentowana przez tę samą osobę po obu stronach umowy." },
      { name: "create_resolution", desc: "Przygotowanie uchwały (np. powołanie pełnomocnika z art. 210 KSH) — zawsze jako wersja robocza, wymaga realnego głosowania w aplikacji." },
      { name: "create_decision", desc: "Przygotowanie decyzji/mandatu — zawsze jako wersja robocza." },
      { name: "pause_decision → resume_decision", desc: "Wstrzymanie aktywnej decyzji, jeśli agent podejrzewa problem (np. brak wymaganego pełnomocnictwa) — odwracalne, bez utraty historii." },
    ],
  },
  {
    group: "Umowy",
    icon: FileSignature,
    iconClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
    items: [
      { name: "list_contracts / get_contract", desc: "Wszystkie umowy firmy — dowolnego typu (najem, pożyczka, B2B, umowa o pracę, NDA i inne)." },
      { name: "create_contract / update_contract", desc: "Utworzenie lub edycja umowy dowolnego typu — zawsze jako wersja robocza; jeśli dotyczy członka zarządu, agent dostaje przypomnienie o sprawdzeniu zgodności z KSH art. 210." },
    ],
  },
  {
    group: "Zgodność (compliance)",
    icon: ListChecks,
    iconClass: "text-teal-600 dark:text-teal-400",
    bgClass: "bg-teal-100 dark:bg-teal-900/30",
    items: [
      { name: "list_checklist_tasks", desc: "Zaległe obowiązki formalne firmy — CRBR, konto w e-Urzędzie Skarbowym, ZAW-FA, e-Doręczenia, aktywacja KSeF i inne terminy związane z formą prawną." },
      { name: "list_checklist_rules", desc: "Definicje reguł, z których generowane są zadania — dla jakich form/reżimów podatkowych obowiązują." },
      { name: "update_checklist_task_status", desc: "Oznaczenie zadania jako wykonane/zablokowane/nie dotyczy." },
    ],
  },
  {
    group: "Stripe",
    icon: CreditCard,
    iconClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-100 dark:bg-violet-900/30",
    items: [
      { name: "list_payment_provider_accounts", desc: "Podłączone konta płatnicze (Stripe i inne) — bez danych dostępowych." },
      { name: "import_stripe_fees / import_stripe_payouts", desc: "Pobranie świeżych danych bezpośrednio z API Stripe za dany miesiąc — prowizje i wypłaty, bezpiecznie do wielokrotnego uruchomienia." },
      { name: "list_stripe_fee_summaries / list_stripe_fee_items", desc: "Miesięczne zestawienia prowizji Stripe i poszczególne pozycje." },
      { name: "get_stripe_period_settlement", desc: "Pełne rozliczenie okresu: sprzedaż brutto, zwroty, prowizje, VAT odwrotne obciążenie, oczekiwana wypłata." },
      { name: "list_stripe_payouts / list_stripe_payout_items", desc: "Wypłaty Stripe na konto bankowe i ich składowe." },
      { name: "list_stripe_invoice_payments", desc: "Dopasowanie płatności Stripe do faktury w KsięgaI — które faktury zostały opłacone przez Stripe." },
      { name: "match_stripe_payout_to_bank_transaction", desc: "Automatyczne dopasowanie wypłaty Stripe do transakcji bankowej (data ±4 dni, zgodna kwota)." },
      { name: "confirm_stripe_payout", desc: "Ręczne potwierdzenie wypłaty Stripe, z lub bez dopasowanej transakcji bankowej." },
      { name: "link_stripe_settlement_journal_entry / link_stripe_fee_summary_journal_entry", desc: "Po zaksięgowaniu (draft_journal_entry + post_journal_entry) — powiązanie zapisu księgowego z rozliczeniem Stripe, żeby nie pojawiało się już w kolejce do zaksięgowania." },
    ],
  },
];

export default function McpPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageAnalytics page="mcp" intent="ai_integration" />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/30 mb-6">
              <Bot className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">MCP · Beta</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Połącz swoją AI z księgowością
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              KsięgaI udostępnia serwer MCP (Model Context Protocol). Podłącz Claude, Claude Code
              lub innego agenta AI — zobaczy faktury, plan kont i saldo, a każde księgowanie
              zaproponuje do Twojej akceptacji.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TrackedLink
                href="#tutorial"
                event="cta_clicked"
                eventProps={{ page: "mcp", cta_id: "hero_primary", text: "Podłącz swoją AI", destination: "#tutorial" }}
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm shadow-xl"
              >
                Podłącz swoją AI
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/rejestracja"
                event="cta_clicked"
                eventProps={{ page: "mcp", cta_id: "hero_secondary", text: "Załóż konto KsięgaI", destination: "/rejestracja" }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm border border-white/10"
              >
                Załóż konto KsięgaI
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why / safety pillars */}
      <section className="py-14 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Tylko Twoje dane",
                desc: "Agent widzi wyłącznie firmy, do których masz dostęp — dostęp jest zawsze przypisany do Twojego konta.",
              },
              {
                icon: Eye,
                title: "Podgląd przed księgowaniem",
                desc: "Zanim cokolwiek trafi do dziennika, agent najpierw przygotowuje podgląd. Zaksięgowanie to osobny krok.",
              },
              {
                icon: ShieldCheck,
                title: "Ślad każdej operacji",
                desc: "Faktury i transakcje dodane przez agenta trafiają ze statusem „do weryfikacji” — nic nie znika w tle.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-14 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Co Twoja AI może zrobić
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Zestaw narzędzi rośnie wraz z rozwojem MCP w KsięgaI. Aktualny stan:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tools.map(({ group, icon: Icon, iconClass, bgClass, items }) => (
                <div key={group} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bgClass}`}>
                      <Icon className={`h-4.5 w-4.5 ${iconClass}`} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">{group}</h3>
                  </div>
                  <ul className="space-y-3">
                    {items.map(({ name, desc }) => (
                      <li key={name}>
                        <code className="text-xs font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded">
                          {name}
                        </code>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial */}
      <section id="tutorial" className="py-14 sm:py-16 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-purple-400 mb-2 font-semibold">Instrukcja</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Podłączenie agenta AI</h2>
              <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
                MCP jest w becie. Podłączenie działa przez OAuth — dodajesz serwer w kliencie AI,
                otwiera się przeglądarka, logujesz się do KsięgaI i zatwierdzasz dostęp. Bez
                kopiowania tokenów.
              </p>
            </div>

            <ol className="space-y-8">
              {/* Step 1 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">1</span>
                <div className="flex-1 w-full min-w-0">
                  <h3 className="text-white font-semibold mb-1">Dodaj serwer w kliencie MCP</h3>
                  <p className="text-sm text-gray-400 mb-3">Serwer: <code className="text-purple-300 font-mono text-xs">https://mcp.ksiegai.pl/mcp</code></p>

                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Claude Code</p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 mb-4 overflow-x-auto">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Terminal className="h-3.5 w-3.5" />
                      <span className="text-xs font-mono">terminal</span>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{`claude mcp add --transport http ksiegai \\
  https://mcp.ksiegai.pl/mcp
claude mcp login ksiegai`}</pre>
                  </div>

                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Claude Desktop / inni klienci MCP</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Dodaj zdalny serwer HTTP pod tym adresem — klient sam wykryje OAuth i otworzy
                    przeglądarkę do logowania:
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{`{
  "mcpServers": {
    "ksiegai": {
      "url": "https://mcp.ksiegai.pl/mcp"
    }
  }
}`}</pre>
                  </div>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">2</span>
                <div className="flex-1 w-full min-w-0">
                  <h3 className="text-white font-semibold mb-1">Zaloguj się i zatwierdź</h3>
                  <p className="text-sm text-gray-400 mb-5">
                    W otwartej przeglądarce zaloguj się do{" "}
                    <Link href="/logowanie" className="text-purple-400 hover:text-purple-300 underline">app.ksiegai.pl</Link>,
                    wybierz firmy i poziom dostępu dla agenta — osobno dla każdej firmy, jeśli masz
                    ich więcej — i zatwierdź. Token odświeża się sam — nic nie trzeba kopiować ani
                    wygaśnięcia pilnować ręcznie. Dostęp możesz cofnąć w każdej chwili w Ustawieniach.
                  </p>

                  {/* Mock: the actual /settings/ai-mcp/authorize consent screen */}
                  <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-1.5 bg-black/30 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono">
                          <Globe className="h-3 w-3" />
                          app.ksiegai.pl/settings/ai-mcp/authorize
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 bg-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="h-4 w-4 text-purple-600" />
                        <h4 className="text-base font-bold text-gray-900">Autoryzuj „Claude Code”</h4>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Ten agent AI chce połączyć się z Twoją księgowością w KsięgaI.
                      </p>

                      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                        <div>
                          <label className="text-[11px] font-medium text-gray-500 mb-1 block">Nazwa połączenia</label>
                          <div className="text-sm text-gray-900 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">Claude Code</div>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-gray-500 mb-1.5 block">Firmy i poziom dostępu</label>
                          <div className="space-y-2">
                            {[
                              { name: "Moja Firma Sp. z o.o.", tier: "Pełny dostęp", checked: true },
                              { name: "ABC Consulting Kowalski", tier: "Tylko odczyt", checked: true },
                              { name: "XYZ Trading Sp. z o.o.", tier: null, checked: false },
                            ].map((row) => (
                              <div
                                key={row.name}
                                className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${row.checked ? "border-gray-200" : "border-gray-100"}`}
                              >
                                <span
                                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                                    row.checked ? "bg-blue-600" : "border border-gray-300"
                                  }`}
                                >
                                  {row.checked && <Check className="h-3 w-3 text-white" />}
                                </span>
                                <span className={`flex-1 text-sm truncate ${row.checked ? "text-gray-900" : "text-gray-400"}`}>
                                  {row.name}
                                </span>
                                {row.tier && (
                                  <span className="flex items-center gap-1 text-xs text-gray-700 border border-gray-200 rounded-md px-2 py-1 flex-shrink-0">
                                    {row.tier}
                                    <ChevronDown className="h-3 w-3 text-gray-400" />
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-gray-500 mb-1 block">Wygaśnięcie</label>
                          <div className="flex items-center justify-between text-sm text-gray-900 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                            90 dni
                            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                          </div>
                        </div>

                        <div className="w-full text-center bg-blue-600 text-white text-sm font-semibold rounded-lg py-2.5">
                          Autoryzuj „Claude Code”
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2.5">
                    Podgląd prawdziwego ekranu z Ustawień — dokładna treść zależy od liczby Twoich firm.
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">3</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Wypróbuj</h3>
                  <p className="text-sm text-gray-400">
                    Zapytaj agenta np. <span className="text-gray-300 italic">„Pokaż moje firmy w KsięgaI i podsumuj saldo Kasy”</span> lub{" "}
                    <span className="text-gray-300 italic">„Dodaj tę fakturę kosztową do KsięgaI”</span> po tym, jak sam ją odczyta.
                    Księgowania bankowe agent najpierw przygotuje do podglądu — zaakceptujesz je, prosząc o zaksięgowanie.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Najczęstsze pytania</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Czy agent może zaksięgować coś bez mojej zgody?",
                  a: "Nie. Faktury i transakcje dodane przez agenta trafiają ze statusem „do weryfikacji”, a księgowanie transakcji bankowej wymaga wcześniej przygotowanego podglądu — to dwa oddzielne kroki, więc nic nie księguje się automatycznie.",
                },
                {
                  q: "Czy agent widzi dane innych firm albo innych użytkowników?",
                  a: "Nie. Dostęp jest przypisany do Twojego konta i ograniczony do firm, do których masz uprawnienia — dokładnie tak samo jak w samej aplikacji.",
                },
                {
                  q: "Czy mogę korzystać z innego agenta niż Claude?",
                  a: "Tak — MCP to otwarty standard. Każdy klient obsługujący transport HTTP (bezpośrednio lub przez mcp-remote) może się połączyć.",
                },
                {
                  q: "Czy muszę ręcznie kopiować i odświeżać token?",
                  a: "Nie. Podłączenie idzie przez OAuth — logujesz się raz w przeglądarce i zatwierdzasz dostęp, klient AI sam odświeża token w tle. Możesz też w każdej chwili odwołać połączenie w Ustawieniach.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    {q}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Nie masz jeszcze konta KsięgaI?
          </h2>
          <p className="text-purple-100 mb-8 max-w-lg mx-auto">
            Załóż konto za darmo, skonfiguruj firmę i podłącz swoją AI przez MCP.
          </p>
          <TrackedLink
            href="/rejestracja"
            event="cta_clicked"
            eventProps={{ page: "mcp", cta_id: "footer_cta", text: "Załóż konto", destination: "/rejestracja" }}
            className="inline-flex items-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
          >
            Załóż konto
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
