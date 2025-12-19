import type { Metadata } from "next";
import { CheckCircle2, Crown, Zap, Shield, Building, Calculator, CreditCard, Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cennik KsięgaI | Nowoczesna księgowość JDG i spółek z o.o.",
  description:
    "Transparentny cennik KsięgaI. Plan dla JDG od 19 zł, pakiet Spółka Standard z pełną automatyzacją (89 zł) oraz rozwiązania Enterprise. Wybierz model dopasowany do odpowiedzialności Twojej firmy.",
  alternates: {
    canonical: "https://www.ksiegai.pl/cennik",
  },
  openGraph: {
    title: "KsięgaI – cennik dla JDG i spółek",
    description:
      "Jedno narzędzie do rozliczeń KSeF, CIT, JPK i governance. Sprawdź, który plan KsięgaI najlepiej chroni Twoją firmę.",
    url: "https://www.ksiegai.pl/cennik",
    type: "website",
    locale: "pl_PL",
  },
};

const plans = [
  {
    name: "JDG Start",
    tagline: "Dla jednoosobowych działalności w trybie lean",
    price: "19 zł",
    cadence: "miesiąc",
    icon: Calculator,
    features: [
      "Faktury + ewidencja przychodów",
      "Import banku: CSV teraz, integracje bankowe w przygotowaniu",
      "KSeF-ready: walidacje, archiwum i workflow wysyłki",
      "Zestawienia VAT/PIT do eksportu (jeśli dotyczy)",
    ],
    cta: { label: "Rozpocznij 7-dniowy trial", href: "/rejestracja" },
    highlight: false,
  },
  {
    name: "Spółka Standard",
    tagline: "Pełna księgowość i governance dla spółek z o.o.",
    price: "89 zł",
    cadence: "miesiąc",
    annual: "999 zł/rok – oszczędzasz 69 zł",
    badge: "Najczęściej wybierany",
    icon: Shield,
    features: [
      "Wszystko z JDG + workflow zatwierdzania (wyjątki + audyt)",
      "JPK_V7M i CIT-8: przygotowanie + eksport + walidacje",
      "Repozytorium uchwał, majątku i amortyzacji",
      "Priorytetowe wsparcie (SLA do 4h w dni robocze)",
      "Rejestr ryzyk i kontrola płynności",
    ],
    cta: { label: "Rozpocznij 7-dniowy trial", href: "/rejestracja" },
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "Dla grup kapitałowych, banków i fintechów",
    price: "Wycena indywidualna",
    cadence: "",
    icon: Building,
    features: [
      "Wdrożenie on-prem / VPC",
      "Wsparcie compliance i bezpieczeństwa (dedykowany opiekun wdrożenia)",
      "Integracje na zamówienie (ERP, BI)",
      "Plan dla biór rachunkowych: multi-klient + role + SLA (wycena)",
    ],
    cta: { label: "Porozmawiajmy", href: "mailto:kontakt@ksiegai.pl" },
    highlight: false,
  },
];

const comparison = [
  { label: "Limit dokumentów", jdg: "Bez limitu", standard: "Bez limitu + segmentacja spółek", enterprise: "Bez limitu, multi-brand" },
  { label: "Deklaracje podatkowe", jdg: "PIT, JPK_V7K", standard: "JPK_V7M, CIT-8, VAT-UE", enterprise: "Pełny pakiet + raporty custom" },
  { label: "Zespoły / uprawnienia", jdg: "1 użytkownik", standard: "Do 10 użytkowników", enterprise: "Dowolna liczba + SSO" },
  { label: "Wsparcie", jdg: "Standard (24h)", standard: "Priorytet (4h)", enterprise: "Dedykowany opiekun (1h)" },
  { label: "Governance", jdg: "Checklista JDG", standard: "Repozytorium uchwał", enterprise: "Audyt i risk management" },
];

const proofPoints = [
  {
    icon: Zap,
    title: "Pełna automatyzacja",
    copy: "Importy bankowe, rozpoznawanie dokumentów i KSeF-ready walidacje działają w tle – księgowy tylko akceptuje wyjątki.",
  },
  {
    icon: Shield,
    title: "Zgodność i bezpieczeństwo",
    copy: "Szyfrowanie danych, role użytkowników i ślad audytowy. Zawsze wiesz: kto, co, kiedy i dlaczego zatwierdził.",
  },
  {
    icon: CreditCard,
    title: "Model subskrypcyjny",
    copy: "Stała opłata miesięczna zamiast prowizji od dokumentów. Budżetujesz odpowiedzialność.",
  },
  {
    icon: Star,
    title: "Wsparcie ekspertów",
    copy: "Workflow konsultowany z księgowymi. System wspiera proces — nie świadczy usług księgowych ani doradztwa podatkowego.",
  },
];

const faqs = [
  {
    q: "Czy mogę przejść z JDG na Spółkę w trakcie abonamentu?",
    a: "Tak. Rozliczamy różnicę w cyklu rozliczeniowym i przenosimy wszystkie dane bez utraty historii.",
  },
  {
    q: "Czy potrzebuję karty kredytowej, aby rozpocząć trial?",
    a: "Nie. Trial trwa 7 dni i obejmuje pełny zakres funkcji Spółka Standard. Po zakończeniu wybierasz plan albo eksportujesz swoje dane.",
  },
  {
    q: "Jak wygląda wdrożenie Enterprise?",
    a: "Rozpoczynamy od warsztatów bezpieczeństwa i mapy procesów. Następnie wdrażamy system w Twojej infrastrukturze albo w dedykowanej chmurze KsięgaI.",
  },
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "KsięgaI – plan Spółka Standard",
  description: "Pełna księgowość, governance i automatyzacje dla spółek z o.o.",
  brand: { "@type": "Brand", name: "KsięgaI" },
  offers: {
    "@type": "Offer",
    url: "https://www.ksiegai.pl/cennik",
    priceCurrency: "PLN",
    price: "89",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
  },
};

export default function Pricing() {
  return (
    <div className="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-3xl bg-gray-900/95 px-6 py-12 text-white shadow-2xl shadow-blue-900/20 md:px-12">
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-blue-50">
                  <Crown className="h-4 w-4 text-amber-300" />
                  Cennik, który rośnie razem z Twoją odpowiedzialnością
                </div>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Nie płacisz za faktury.<br className="hidden md:block" /> Płacisz za spokój akcjonariuszy.
                </h1>
                <p className="text-lg text-blue-100">
                  KsięgaI automatyzuje dokumenty i podatki, ale przede wszystkim pilnuje governance. Wybierz plan, który
                  pokrywa Twoje ryzyko regulacyjne – od JDG po grupy kapitałowe.
                </p>
                <p className="text-base text-blue-200 mt-4">
                  Płacisz za workflow: kolejka wyjątków, walidacje, role użytkowników i ślad audytowy — czyli kontrolę procesu.
                </p>
                <p className="text-base text-blue-200 mt-2">
                  <strong>Dla JDG</strong> — prosty start. <strong>Dla spółek</strong> — pełna odpowiedzialność. <strong>Dla grup</strong> — kontrola na poziomie zarządu.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/rejestracja"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    Przetestuj 7 dni za darmo
                  </Link>
                  <a
                    href="#comparison"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white/90 transition hover:border-white hover:text-white"
                  >
                    Porównaj plany
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-blue-50 md:w-80">
                <div>
                  <p className="text-4xl font-semibold">87%</p>
                  <p className="text-blue-200">dokumentów rozliczonych automatycznie</p>
                  <p className="text-xs text-blue-300 mt-1">po pierwszych 14 dniach użytkowania</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">4 h</p>
                  <p className="text-blue-200">czas reakcji</p>
                  <p className="text-xs text-blue-300 mt-1">dla klientów z planem Spółka / Enterprise</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">12+</p>
                  <p className="text-blue-200">integracji</p>
                  <p className="text-xs text-blue-300 mt-1">banki, ERP, eksport danych</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative flex h-full flex-col rounded-3xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    plan.highlight
                      ? "border-blue-500 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                      : "border-gray-200/70 bg-white dark:border-gray-800 dark:bg-gray-900"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-300 px-4 py-1 text-xs font-semibold text-gray-900 shadow-lg">
                      {plan.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-2xl p-3 ${
                        plan.highlight ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{plan.name}</h3>
                      <p className={`text-sm ${plan.highlight ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>{plan.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-4xl font-bold">
                      {plan.price} {plan.cadence && <span className="text-base font-normal text-gray-500 dark:text-gray-400">/ {plan.cadence}</span>}
                    </p>
                    {plan.annual && <p className="mt-2 text-sm text-blue-100">{plan.annual}</p>}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${plan.highlight ? "text-emerald-200" : "text-emerald-500"}`} />
                        <span className={plan.highlight ? "text-blue-50" : "text-gray-700 dark:text-gray-200"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.cta.href} className="mt-auto block">
                    <button
                      className={`mt-8 w-full rounded-2xl border px-5 py-3 text-base font-semibold transition ${
                        plan.highlight
                          ? "border-white/30 bg-white text-blue-700 hover:bg-gray-100"
                          : "border-gray-300 bg-gray-50 text-gray-900 hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      }`}
                    >
                      {plan.cta.label}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
              <div>
                <p className="text-sm font-semibold text-blue-600">Porównanie planów</p>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Co dokładnie dostajesz w każdym pakiecie?</h2>
              </div>
              <Link
                href="/rejestracja"
                className="rounded-2xl bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900"
              >
                Wybierz plan
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-300">
                    <th className="py-3 pr-4 font-semibold">Obszar</th>
                    <th className="py-3 px-4 font-semibold">JDG Start</th>
                    <th className="py-3 px-4 font-semibold">Spółka Standard</th>
                    <th className="py-3 px-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800 dark:divide-gray-800 dark:text-gray-100">
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <td className="py-4 pr-4 font-semibold">{row.label}</td>
                      <td className="py-4 px-4">{row.jdg}</td>
                      <td className="py-4 px-4">{row.standard}</td>
                      <td className="py-4 px-4">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-blue-600 mb-2">Dlaczego KsięgaI?</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Technologia + ludzie = spokój</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{point.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{point.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-blue-600 mb-2">Najczęstsze pytania</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Masz wątpliwości? Odpowiadamy</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-blue-600 p-8 text-center text-white">
            <h3 className="mb-3 text-2xl font-semibold">Nie znalazłeś odpowiedzi?</h3>
            <p className="mb-6 text-blue-100">Skontaktuj się z nami – odpowiemy w ciągu 24 godzin.</p>
            <a
              href="mailto:kontakt@ksiegai.pl"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              kontakt@ksiegai.pl
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Gotowy na księgowość bez stresu?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Dołącz do przedsiębiorców, którzy wybrali odpowiedzialność zamiast chaosu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/rejestracja"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Rozpocznij 7-dniowy trial
            </Link>
            <a
              href="mailto:kontakt@ksiegai.pl"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Porozmawiaj z ekspertem
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">Bez karty kredytowej • Pełny dostęp • Anuluj w dowolnym momencie</p>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
    </div>
  );
}
