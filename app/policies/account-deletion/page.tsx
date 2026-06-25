import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Mail, Smartphone, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Usunięcie konta | KsięgaI",
  description:
    "Jak usunąć konto KsięgaI, jakie dane są usuwane, a jakie muszą być przechowywane z powodów prawnych. Instrukcja krok po kroku.",
  alternates: { canonical: "https://www.ksiegai.pl/policies/account-deletion" },
  openGraph: {
    title: "Usunięcie konta | KsięgaI",
    description:
      "Instrukcja usunięcia konta KsięgaI i informacje o retencji danych zgodnie z prawem podatkowym.",
    url: "https://www.ksiegai.pl/policies/account-deletion",
    type: "website",
    locale: "pl_PL",
  },
};

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gray-950 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/30 border border-red-500/30 mb-6">
              <Trash2 className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm font-semibold">Usunięcie konta</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Jak usunąć konto KsięgaI
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Konto możesz usunąć samodzielnie w aplikacji lub przez e-mail.
              Dane osobowe są usuwane natychmiast — dokumenty księgowe mogą być
              przechowywane dłużej z powodów prawnych.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Ostatnia aktualizacja: 25 czerwca 2026
            </p>
          </div>
        </div>
      </section>

      {/* Two methods */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Dwa sposoby usunięcia konta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* In-app */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-blue-100 dark:bg-blue-900/30">
                  <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                  Opcja 1 — w aplikacji
                </h3>
                <ol className="space-y-2">
                  {[
                    "Zaloguj się do aplikacji KsięgaI",
                    "Przejdź do Ustawienia",
                    'Wybierz "Profil użytkownika"',
                    'Przewiń do sekcji "Strefa niebezpieczna"',
                    'Naciśnij "Usuń konto" i potwierdź',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                  Konto jest usuwane natychmiast po potwierdzeniu.
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-purple-100 dark:bg-purple-900/30">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                  Opcja 2 — przez e-mail
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Wyślij wiadomość na{" "}
                  <a
                    href="mailto:kontakt@ksiegai.pl?subject=Wniosek%20o%20usunięcie%20konta%20RODO"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    kontakt@ksiegai.pl
                  </a>{" "}
                  z tytułem:
                </p>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 border border-gray-700">
                  <p className="text-sm text-white font-mono">
                    Wniosek o usunięcie konta RODO
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Potwierdzimy usunięcie w ciągu <strong className="text-gray-900 dark:text-white">30 dni</strong>.
                  Opcja e-mailowa jest dostępna gdy nie możesz zalogować się do konta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What gets deleted */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Deleted immediately */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  Co zostaje usunięte natychmiast
                </h2>
                <div className="space-y-2">
                  {[
                    "Konto logowania (e-mail, hasło)",
                    "Dane profilu: imię, nazwisko, telefon, avatar",
                    "Dane logowania Google (jeśli używane)",
                    "Preferencje i ustawienia konta",
                    "Historia sesji i logowania",
                    "Tokeny autoryzacyjne",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retained for legal */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Co może być przechowywane dłużej
                </h2>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4 mb-4">
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    Dokumenty księgowe i podatkowe muszą być przechowywane przez
                    okres wynikający z polskich przepisów — nawet po usunięciu konta.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      label: "Faktury VAT i dokumenty księgowe",
                      period: "5 lat od końca roku podatkowego",
                      law: "ustawa o VAT, ustawa o rachunkowości",
                    },
                    {
                      label: "Faktury za subskrypcję",
                      period: "5 lat od daty wystawienia",
                      law: "obowiązek podatkowy",
                    },
                    {
                      label: "Logi bezpieczeństwa",
                      period: "do 12 miesięcy",
                      law: "uzasadniony interes (ochrona przed nadużyciami)",
                    },
                    {
                      label: "Dane do dochodzenia roszczeń",
                      period: "do 6 lat",
                      law: "art. 118 KC — przedawnienie roszczeń majątkowych",
                    },
                  ].map(({ label, period, law }) => (
                    <div
                      key={label}
                      className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">{period}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{law}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third party note */}
      <section className="py-10 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Dane podmiotów trzecich
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Faktury zawierają dane kontrahentów (NIP, nazwa, adres). Są to dokumenty
              handlowe — ich przechowywanie wynika z prawa podatkowego niezależnie od
              statusu Twojego konta. Dane te nie są wykorzystywane przez KsięgaI do
              żadnych celów marketingowych.
            </p>
          </div>
        </div>
      </section>

      {/* Contact + links */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Administrator danych
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tovernet sp. z o.o., NIP: 7322228540
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                E-mail:{" "}
                <a
                  href="mailto:kontakt@ksiegai.pl"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  kontakt@ksiegai.pl
                </a>
                {" "}— odpowiadamy w ciągu 30 dni
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/polityka-prywatnosci"
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                Polityka prywatności →
              </Link>
              <Link
                href="/regulamin"
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                Regulamin →
              </Link>
              <Link
                href="/bezpieczenstwo-danych"
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                Bezpieczeństwo danych →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
