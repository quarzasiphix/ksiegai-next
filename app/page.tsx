"use client";

import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  BookOpen,
  Building,
  Calculator,
  CheckCircle2,
  CreditCard,
  Crown,
  Download,
  FileText,
  Inbox,
  MessageSquare,
  Receipt,
  Shield,
  ThumbsUp,
  Users,
  Zap,
} from "lucide-react";
import FAQSection from "./faq-section";
import HomeHero from "../components/home/HomeHero";
import posthog from "posthog-js";

export default function Home() {
  const handleCtaClick = () => {
    posthog.capture("hero_cta_clicked", { source: "static_home_hero" });
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        event_category: "engagement",
        event_action: "hero_register_button_click",
        event_label: "Załóż konto",
        button_text: "Załóż konto",
        page_location: window.location.href,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Top banner */}
        <div className="bg-blue-600">
          <div className="container mx-auto px-4 py-2.5 text-center">
            <p className="text-sm text-white font-medium">
              KSeF wchodzi obowiązkowo.{" "}
              <Link href="/ksef" className="underline hover:text-blue-100 transition-colors">
                Sprawdź, czy jesteś gotowy →
              </Link>
            </p>
          </div>
        </div>

        {/* Structured Data */}
        <Script
          id="software-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  name: "KsięgaI",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  creator: {
                    "@type": "Organization",
                    name: "Tovernet Sp. z o.o.",
                    url: "https://tovernet.online",
                  },
                  description:
                    "System do faktur, KSeF, płatności online Stripe i obiegu dokumentów firmy w jednym miejscu.",
                  featureList:
                    "Faktury; Płatności Stripe; Obsługa KSeF; Rejestr dokumentów; Checklista obowiązków firmy; Ślad audytowy",
                  inLanguage: "pl-PL",
                },
                {
                  "@type": "Organization",
                  name: "Tovernet Sp. z o.o.",
                  url: "https://ksiegai.pl",
                  taxID: "7322228540",
                },
                {
                  "@type": "WebSite",
                  name: "KsięgaI",
                  url: "https://ksiegai.pl",
                  inLanguage: "pl-PL",
                },
              ],
            }),
          }}
        />

        {/* Hero */}
        <HomeHero onAnonymousPrimaryCtaClick={handleCtaClick} />

        {/* 1 — Use-case router */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                  Dla kogo
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Znajdź swój punkt wejścia
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(
                  [
                    {
                      label: "Mam JDG",
                      desc: "Jednoosobowa działalność gospodarcza",
                      icon: Receipt,
                      href: "/jdg",
                      iconClass: "text-blue-600 dark:text-blue-400",
                      bgClass: "bg-blue-100 dark:bg-blue-900/30",
                    },
                    {
                      label: "Mam spółkę z o.o.",
                      desc: "Pełen obieg dokumentów i role",
                      icon: Building,
                      href: "/spolka-z-oo",
                      iconClass: "text-purple-600 dark:text-purple-400",
                      bgClass: "bg-purple-100 dark:bg-purple-900/30",
                    },
                    {
                      label: "Prowadzę biuro rachunkowe",
                      desc: "Zarządzanie wieloma klientami",
                      icon: Calculator,
                      href: "/dla-ksiegowych",
                      iconClass: "text-green-600 dark:text-green-400",
                      bgClass: "bg-green-100 dark:bg-green-900/30",
                    },
                    {
                      label: "Zakładam firmę",
                      desc: "Checklisty i pierwsze kroki",
                      icon: Zap,
                      href: "/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo",
                      iconClass: "text-amber-600 dark:text-amber-400",
                      bgClass: "bg-amber-100 dark:bg-amber-900/30",
                    },
                  ] as const
                ).map(({ label, desc, icon: Icon, href, iconClass, bgClass }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${bgClass}`}
                    >
                      <Icon className={`h-5 w-5 ${iconClass}`} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{label}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                    <p className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Zobacz <ArrowRight className="h-3 w-3" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2 — Core features */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Wszystko czego potrzebuje firma
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Faktury, KSeF, płatności, dokumenty i dostęp dla księgowej — w jednym systemie.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {(
                  [
                    {
                      label: "Faktury",
                      desc: "Wystawiaj i zarządzaj dokumentami sprzedaży",
                      icon: Receipt,
                      href: "/faktury",
                    },
                    {
                      label: "KSeF",
                      desc: "Gotowy na obowiązkowy KSeF od pierwszego dnia",
                      icon: Shield,
                      href: "/ksef",
                    },
                    {
                      label: "Płatności online",
                      desc: "Stripe: link do płatności przy każdej fakturze",
                      icon: CreditCard,
                      href: "/platnosci-online",
                    },
                    {
                      label: "Rejestr dokumentów",
                      desc: "Jeden rejestr wpływów, uzgodnień i decyzji",
                      icon: FileText,
                      href: "/jak-to-dziala",
                    },
                    {
                      label: "Role i dostęp",
                      desc: "Księgowa, właściciel, pełnomocnik — każdy w swoim zakresie",
                      icon: Users,
                      href: "/dla-ksiegowych",
                    },
                    {
                      label: "Eksport danych",
                      desc: "Twoje dane zawsze dostępne, bez blokad",
                      icon: Download,
                      href: "/bezpieczenstwo-danych",
                    },
                  ] as const
                ).map(({ label, desc, icon: Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-gray-800 transition-all"
                  >
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-3" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 — App preview */}
        <section className="py-12 sm:py-20 bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                  Podgląd aplikacji
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Jak wygląda praca w systemie
                </h2>
                <p className="text-slate-500 text-sm">Dane demonstracyjne.</p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 p-4 sm:p-6 shadow-2xl shadow-black/50">
                {/* Window chrome */}
                <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">ksiegai.app / dokumenty</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  {/* Left: document list */}
                  <div className="lg:col-span-2 space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3 font-semibold">
                      Dokumenty — Styczeń 2025
                    </p>
                    {[
                      {
                        id: "FV/2025/001",
                        vendor: "AWS EMEA SARL",
                        amount: "4 200 zł",
                        status: "Zatwierdzona",
                        ok: true,
                      },
                      {
                        id: "FV/2025/002",
                        vendor: "Allegro Business",
                        amount: "890 zł",
                        status: "Do zatwierdzenia",
                        ok: false,
                        active: true,
                      },
                      {
                        id: "FV/2025/003",
                        vendor: "T-Mobile Polska",
                        amount: "320 zł",
                        status: "Do zatwierdzenia",
                        ok: false,
                      },
                      {
                        id: "FV/2025/004",
                        vendor: "Allegro Business",
                        amount: "1 100 zł",
                        status: "Zatwierdzona",
                        ok: true,
                      },
                    ].map((doc) => (
                      <div
                        key={doc.id}
                        className={`rounded-2xl border p-3 transition-all ${
                          doc.active
                            ? "border-blue-400/40 bg-blue-500/10"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-white">{doc.id}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{doc.vendor}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-semibold text-white">{doc.amount}</p>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                doc.ok
                                  ? "bg-emerald-400/10 text-emerald-300"
                                  : "bg-amber-400/10 text-amber-300"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: document detail */}
                  <div className="lg:col-span-3 rounded-[20px] border border-white/10 bg-slate-950/60 p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
                          Faktura kosztowa
                        </p>
                        <h3 className="text-lg font-semibold text-white mt-1">FV/2025/002</h3>
                        <p className="text-sm text-slate-400">Allegro Business • 890,00 zł</p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 flex-shrink-0">
                        Oczekuje
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                      {[
                        { label: "Kwota netto", value: "723,58 zł" },
                        { label: "VAT 23%", value: "166,42 zł" },
                        { label: "Data", value: "15.01.25" },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3"
                        >
                          <p className="text-xs text-slate-400">{label}</p>
                          <p className="text-sm font-semibold text-white mt-1">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Audit trail */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-3">
                        Ślad uzgodnień
                      </p>
                      <div className="space-y-2.5">
                        {[
                          {
                            dot: "bg-blue-400",
                            bg: "bg-blue-500/20",
                            text: "Dokument wpłynął do rejestru",
                            time: "15 sty, 09:14",
                          },
                          {
                            dot: "bg-purple-400",
                            bg: "bg-purple-500/20",
                            text: 'Anna K.: „Sprawdzam kategorię"',
                            time: "15 sty, 11:02",
                          },
                          {
                            dot: "bg-amber-400",
                            bg: "bg-amber-500/20",
                            text: "Oczekuje na zatwierdzenie",
                            time: "Dzisiaj",
                          },
                        ].map(({ dot, bg, text, time }) => (
                          <div key={text} className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`}
                            >
                              <div className={`w-2 h-2 rounded-full ${dot}`} />
                            </div>
                            <div>
                              <p className="text-xs text-white font-medium">{text}</p>
                              <p className="text-xs text-slate-500">{time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                      >
                        Zatwierdź
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.06] transition-colors"
                      >
                        Komentarz
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-slate-600 mt-4 italic">
                Dane przykładowe. Interfejs może różnić się od wersji produkcyjnej.
              </p>
            </div>
          </div>
        </section>

        {/* 4 — KSeF teaser */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 mb-4">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                      KSeF
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Gotowy na obowiązkowy KSeF
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    KsięgaI przygotowuje dane, waliduje dokumenty i prowadzi ślad uzgodnień — tak, żebyś
                    na wejście obowiązkowego KSeF był gotowy bez paniki.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/ksef"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
                    >
                      Jak działa KSeF w KsięgaI <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/poradnik/ksef-dla-jdg-jak-zaczac"
                      className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:underline text-sm"
                    >
                      Poradnik KSeF krok po kroku →
                    </Link>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Token KSeF powiązany z profilem firmy",
                    "Walidacja dokumentów przed wysyłką",
                    "Przygotowanie paczek JPK",
                    "Ślad audytowy: kto, co, kiedy zatwierdził",
                    "Środowisko testowe i produkcyjne — bez ryzyka pomyłki",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — Payments teaser */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* Mini payment status preview */}
                <div className="rounded-2xl bg-gray-900 p-5 border border-gray-800 order-2 md:order-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-4">
                    Płatności — status
                  </p>
                  <div className="space-y-3">
                    {[
                      { inv: "FV/2025/010", amount: "12 000 zł", status: "Opłacona", ok: "emerald" },
                      { inv: "FV/2025/011", amount: "5 500 zł", status: "Oczekuje", ok: "amber" },
                      { inv: "FV/2025/012", amount: "2 300 zł", status: "Link wysłany", ok: "blue" },
                    ].map((item) => (
                      <div
                        key={item.inv}
                        className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{item.inv}</p>
                          <p className="text-xs text-slate-400">{item.amount}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            item.ok === "emerald"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : item.ok === "amber"
                              ? "bg-amber-400/10 text-amber-300"
                              : "bg-blue-400/10 text-blue-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 mb-4">
                    <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                      Płatności online
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Stripe przy każdej fakturze
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Wystawiasz fakturę — od razu dostępny link do płatności online. Klient płaci kartą
                    lub przelewem, a Ty widzisz status w czasie rzeczywistym.
                  </p>
                  <Link
                    href="/platnosci-online"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
                  >
                    Dowiedz się więcej o płatnościach <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 — Document workflow */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Obieg dokumentu w 3 krokach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                Wpływ → uzgodnienie → zatwierdzenie. Każdy krok ma ślad, uprawnienia i historię.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-left">
                {(
                  [
                    {
                      step: 1,
                      icon: Inbox,
                      title: "Wpływ",
                      desc: "Dokument trafia do rejestru i jest przypisany do kontekstu firmy.",
                      iconClass: "text-blue-600 dark:text-blue-400",
                      bgClass: "bg-blue-100 dark:bg-blue-900/30",
                    },
                    {
                      step: 2,
                      icon: MessageSquare,
                      title: "Uzgodnienie",
                      desc: "Komentarze i załączniki pozostają przy dokumencie.",
                      iconClass: "text-purple-600 dark:text-purple-400",
                      bgClass: "bg-purple-100 dark:bg-purple-900/30",
                    },
                    {
                      step: 3,
                      icon: ThumbsUp,
                      title: "Zatwierdzenie",
                      desc: "Decyzja zapisuje: kto, kiedy, na jakiej podstawie.",
                      iconClass: "text-green-600 dark:text-green-400",
                      bgClass: "bg-green-100 dark:bg-green-900/30",
                    },
                  ] as const
                ).map(({ step, icon: Icon, title, desc, iconClass, bgClass }) => (
                  <div
                    key={step}
                    className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${bgClass}`}
                    >
                      <Icon className={`h-5 w-5 ${iconClass}`} />
                    </div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1">
                      Krok {step}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/jak-to-dziala"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline text-sm"
              >
                Zobacz pełny przykład obiegu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7 — Basic vs Premium */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Plan podstawowy i Premium
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-green-500 dark:border-green-600">
                  <div className="flex items-center gap-2 mb-1">
                    <Inbox className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
                      Podstawowy — bez opłat
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Rejestr i podstawowy obieg
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Rejestr wpływów dokumentów",
                      "Uzgodnienia przy dokumencie",
                      "Eksport danych",
                      "Wiele podmiotów",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/rejestracja"
                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Zacznij bezpłatnie <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-amber-400 dark:border-amber-600">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="h-5 w-5 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                      Premium — 30 dni testowo
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    KSeF, automatyzacja i kontrola
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Workflow zatwierdzania + role",
                      "KSeF-ready + JPK + walidacje",
                      "Integracja bankowa + auto-dopasowanie",
                      "Rozrachunki i płatności",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/rejestracja"
                    className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Wypróbuj Premium <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
                KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura
                rachunkowego ani doradztwa podatkowego.
              </p>
            </div>
          </div>
        </section>

        {/* 8 — Poradnik teaser */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 mb-3">
                    <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                      Poradnik
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Przydatne przewodniki
                  </h2>
                </div>
                <Link
                  href="/poradnik"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                >
                  Zobacz wszystkie →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Jak zdobyć token KSeF",
                    href: "/poradnik/jak-zdobyc-token-ksef-i-podlaczyc-firme",
                    desc: "Krok po kroku przez e-Urząd Skarbowy i aktywację tokenu.",
                  },
                  {
                    title: "CRBR po rejestracji spółki",
                    href: "/poradnik/crbr-spolka-zoo-co-zglosic",
                    desc: "Zgłoszenie beneficjentów rzeczywistych — terminy i wymogi.",
                  },
                  {
                    title: "Konto w e-Urzędzie Skarbowym",
                    href: "/poradnik/konto-organizacji-e-urzad-skarbowy",
                    desc: "Aktywacja konta dla organizacji i nadanie pełnomocnictw.",
                  },
                  {
                    title: "Checklista nowej spółki z o.o.",
                    href: "/poradnik/pierwsze-obowiazki-po-zalozeniu-spolki-zoo",
                    desc: "Co zrobić po rejestracji, żeby firma działała poprawnie.",
                  },
                ].map(({ title, href, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-start gap-4 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Utwórz ewidencję firmy i zacznij obieg dokumentów
              </h2>
              <p className="text-blue-100 mb-8">
                System prowadzi rejestry i przygotowuje dane. Ty zatwierdzasz wyjątki.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/rejestracja"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3.5 rounded-2xl font-semibold shadow-xl transition-all text-sm"
                >
                  Rozpocznij ewidencję firmy
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dla-ksiegowych"
                  className="inline-flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all text-sm"
                >
                  Wersja dla biur rachunkowych
                </Link>
              </div>
              <p className="mt-4 text-xs text-blue-200">
                Plan podstawowy bezterminowo bez opłat • Premium 30 dni testowo
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
