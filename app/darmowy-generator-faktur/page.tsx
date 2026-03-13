import type { Metadata } from "next";
import AnonymousInvoiceGenerator from "@/components/invoice-tools/AnonymousInvoiceGenerator";

export const metadata: Metadata = {
  title: "Darmowy generator faktur bez konta | KsięgaI",
  description:
    "Wystaw fakturę bez rejestracji. Uzupełnij dane po NIP z rejestru VAT MF, pobierz PDF od razu i odzyskaj wcześniejsze faktury po założeniu konta.",
  alternates: {
    canonical: "https://ksiegai.pl/darmowy-generator-faktur",
  },
  openGraph: {
    title: "Darmowy generator faktur bez konta | KsięgaI",
    description:
      "Publiczny generator faktur KsięgaI: NIP, autouzupełnianie z rejestru VAT MF, szybki PDF i późniejsze odzyskanie faktur po rejestracji.",
    url: "https://ksiegai.pl/darmowy-generator-faktur",
    type: "website",
  },
};

export default function FreeInvoiceGeneratorPage() {
  return <AnonymousInvoiceGenerator />;
}
