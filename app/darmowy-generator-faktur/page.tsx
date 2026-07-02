import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { CheckCircle2, FileText, Download, ShieldCheck, RefreshCw } from "lucide-react";
import AnonymousInvoiceGenerator from "../../components/invoice-tools/AnonymousInvoiceGenerator";

export const metadata: Metadata = {
  title: "Darmowy generator faktur online – wystaw fakturę bez rejestracji | KsięgaI",
  description:
    "Darmowy generator faktur VAT online bez zakładania konta. Autouzupełnianie danych z GUS/MF po NIP, pobierz PDF od razu. Faktury bez rejestracji dla JDG i spółek.",
  keywords:
    "generator faktur, darmowy generator faktur, faktura bez rejestracji, generator faktur online, darmowa faktura VAT, faktura PDF, faktura dla JDG",
  alternates: {
    canonical: "https://www.ksiegai.pl/darmowy-generator-faktur/",
  },
  openGraph: {
    title: "Darmowy generator faktur online – bez rejestracji | KsięgaI",
    description:
      "Wystaw fakturę VAT online bez zakładania konta. Autouzupełnianie danych z rejestru VAT MF po NIP, szybki PDF. Dla JDG i spółek.",
    url: "https://www.ksiegai.pl/darmowy-generator-faktur/",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: "https://www.ksiegai.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Darmowy generator faktur online – KsięgaI",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy generator faktur jest naprawdę darmowy?",
    answer:
      "Tak – generator faktur na tej stronie jest całkowicie bezpłatny. Nie trzeba zakładać konta ani podawać karty płatniczej. Wystawiasz fakturę, pobierasz PDF i gotowe.",
  },
  {
    question: "Czy mogę wystawić fakturę VAT bez konta?",
    answer:
      "Tak. Generator działa bez rejestracji. Wystarczy wpisać NIP sprzedawcy i nabywcy – dane firmy uzupełniają się automatycznie z rejestru VAT Ministerstwa Finansów.",
  },
  {
    question: "Skąd generator pobiera dane firmy?",
    answer:
      "Dane kontrahentów są pobierane automatycznie z publicznego rejestru VAT Ministerstwa Finansów (Biała Lista) po podaniu NIP. Nie musisz niczego wpisywać ręcznie.",
  },
  {
    question: "Czy faktura z generatora jest zgodna z przepisami?",
    answer:
      "Tak. Wystawiane faktury zawierają wszystkie obowiązkowe elementy wymagane przez polskie prawo: NIP, dane stron, datę, pozycje, stawkę VAT i kwoty. Obsługujemy faktury VAT oraz faktury bez VAT dla podmiotów zwolnionych.",
  },
  {
    question: "Co się stanie z moimi fakturami po założeniu konta?",
    answer:
      "Faktury wystawione bez rejestracji można powiązać z kontem KsięgaI po rejestracji – wszystkie dokumenty będą dostępne w jednym miejscu razem z narzędziami do księgowości, KSeF i płatności online.",
  },
  {
    question: "Czy generator obsługuje faktury dla JDG i spółek z o.o.?",
    answer:
      "Tak. Generator obsługuje zarówno JDG (jednoosobową działalność gospodarczą), jak i spółki z o.o. oraz inne formy prawne. Wybierz odpowiedni typ działalności podczas wystawiania faktury.",
  },
];

export default function FreeInvoiceGeneratorPage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Tool */}
      <AnonymousInvoiceGenerator />

      {/* SEO content block */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Darmowy generator faktur online – jak to działa?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Generator faktur KsięgaI pozwala wystawić fakturę VAT online w ciągu minuty – bez zakładania konta i bez instalowania żadnego oprogramowania.
            Wystarczy wpisać NIP, dane uzupełnią się automatycznie z rejestru VAT Ministerstwa Finansów, dodajesz pozycje i pobierasz gotowy PDF.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: FileText,
                title: "Faktura VAT i bez VAT",
                desc: "Obsługujemy faktury VAT (23%, 8%, 5%, 0%) oraz faktury dla podmiotów zwolnionych z VAT.",
              },
              {
                icon: RefreshCw,
                title: "Autouzupełnianie z GUS/MF",
                desc: "Po wpisaniu NIP dane firmy – nazwa, adres, status VAT – wczytują się automatycznie z Białej Listy MF.",
              },
              {
                icon: Download,
                title: "Pobierz PDF od razu",
                desc: "Gotowa faktura jest dostępna jako PDF do pobrania lub wydruku natychmiast po wypełnieniu formularza.",
              },
              {
                icon: ShieldCheck,
                title: "Zgodność z polskim prawem",
                desc: "Faktury zawierają wszystkie wymagane prawem elementy: NIP, daty, stawki VAT, numer faktury i dane stron.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <Icon className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Dla kogo jest darmowy generator faktur?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Generator faktur jest przeznaczony dla każdego, kto musi wystawić fakturę szybko i bez zbędnych formalności:
          </p>
          <ul className="space-y-2 mb-10">
            {[
              "Freelancerzy i JDG wystawiający okazjonalne faktury",
              "Spółki z o.o. szukające prostego narzędzia na start",
              "Osoby testujące KsięgaI przed rejestracją",
              "Każdy, kto potrzebuje faktury VAT online bez konta",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-12">
            <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
              Chcesz więcej niż pojedynczą fakturę?
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Zarejestruj konto KsięgaI – za darmo. Odzyskasz faktury wystawione bez konta, zyskasz dostęp do pełnej
              księgowości, obsługi KSeF, płatności Stripe i obiegu dokumentów.
            </p>
            <Link
              href="/rejestracja"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Załóż darmowe konto →
            </Link>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Często zadawane pytania
          </h2>
          <div className="space-y-5">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-gray-200 dark:border-gray-800 pb-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
