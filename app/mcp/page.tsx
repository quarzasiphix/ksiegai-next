import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Landmark,
  FileText,
  Calculator,
  ShieldCheck,
  Eye,
  Lock,
  Terminal,
  CheckCircle2,
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
      { name: "list_invoices", desc: "Odczyt wystawionych i otrzymanych faktur w wybranym okresie." },
      { name: "add_expense_invoice", desc: "Dodanie faktury kosztowej (np. z e-maila lub skanu, który agent sam odczytał) — trafia do weryfikacji." },
    ],
  },
  {
    group: "Księgowość",
    icon: Calculator,
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    items: [
      { name: "get_chart_of_accounts", desc: "Plan kont firmy — aktywne konta i ich grupy." },
      { name: "get_balance_sheet", desc: "Salda kont na dany dzień lub okres — baza pod analizę i raporty." },
    ],
  },
  {
    group: "Bank",
    icon: Landmark,
    iconClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
    items: [
      { name: "list_bank_accounts / list_bank_transactions", desc: "Rachunki firmowe i historia transakcji." },
      { name: "import_bank_statement", desc: "Import wyciągu bankowego, który agent przetworzył." },
      { name: "classify_bank_transaction", desc: "Propozycja klasyfikacji transakcji — trafia jako „do weryfikacji”." },
      { name: "preview_bank_transaction_posting → post_bank_transaction", desc: "Agent najpierw przygotowuje podgląd księgowania, dopiero potem może je zaksięgować — patrz sekcja bezpieczeństwa." },
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
                MCP jest w becie i dziś przeznaczone dla użytkowników technicznych. Jednoklikowe
                generowanie tokenu w Ustawieniach jest w budowie — poniżej aktualny sposób.
              </p>
            </div>

            <ol className="space-y-8">
              {/* Step 1 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">1</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Zaloguj się do KsięgaI</h3>
                  <p className="text-sm text-gray-400">
                    Zaloguj się na <Link href="/logowanie" className="text-purple-400 hover:text-purple-300 underline">app.ksiegai.pl</Link> w przeglądarce, na koncie firmy, którą ma obsługiwać agent.
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">2</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Pobierz token dostępu</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Otwórz narzędzia deweloperskie przeglądarki (F12) → zakładka
                    <span className="text-gray-300"> Application/Storage → Local Storage → app.ksiegai.pl</span>,
                    znajdź klucz zaczynający się od <code className="text-purple-300 font-mono text-xs">sb-</code>
                    i skopiuj pole <code className="text-purple-300 font-mono text-xs">access_token</code>.
                  </p>
                  <p className="text-xs text-amber-400/90 bg-amber-900/20 border border-amber-500/20 rounded-lg px-3 py-2">
                    Token wygasa po ok. godzinie — w becie odśwież go, gdy agent zacznie dostawać błąd 401.
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">3</span>
                <div className="flex-1 w-full min-w-0">
                  <h3 className="text-white font-semibold mb-1">Skonfiguruj klienta MCP</h3>
                  <p className="text-sm text-gray-400 mb-3">Serwer: <code className="text-purple-300 font-mono text-xs">https://mcp.ksiegai.pl/mcp</code></p>

                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Claude Code</p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 mb-4 overflow-x-auto">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Terminal className="h-3.5 w-3.5" />
                      <span className="text-xs font-mono">terminal</span>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{`claude mcp add --transport http ksiegai \\
  https://mcp.ksiegai.pl/mcp \\
  --header "Authorization: Bearer <TWÓJ_TOKEN>"`}</pre>
                  </div>

                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Claude Desktop / inni klienci MCP</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Klienci bez natywnej obsługi nagłówków HTTP łączą się przez most{" "}
                    <code className="text-purple-300 font-mono">mcp-remote</code>:
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-emerald-300 whitespace-pre">{`{
  "mcpServers": {
    "ksiegai": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.ksiegai.pl/mcp",
        "--header",
        "Authorization:Bearer <TWÓJ_TOKEN>"
      ]
    }
  }
}`}</pre>
                  </div>
                </div>
              </li>

              {/* Step 4 */}
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">4</span>
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
                  q: "Dlaczego token trzeba pobierać ręcznie?",
                  a: "MCP jest w becie. Panel z jednoklikowym generowaniem i odwoływaniem tokenów dostępu w Ustawieniach jest w budowie.",
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
