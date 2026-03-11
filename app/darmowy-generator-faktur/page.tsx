import type { Metadata } from "next";
import AnonymousInvoiceGenerator from "@/components/invoice-tools/AnonymousInvoiceGenerator";

export const metadata: Metadata = {
  title: "Darmowy generator faktur bez konta | KsięgaI",
  description:
    "Wystaw fakturę bez rejestracji. Uzupełnij dane po NIP z rejestru VAT MF, zapisz swoje dane lokalnie i pobierz PDF od razu.",
  alternates: {
    canonical: "https://ksiegai.pl/darmowy-generator-faktur",
  },
  openGraph: {
    title: "Darmowy generator faktur bez konta | KsięgaI",
    description:
      "Publiczny generator faktur KsięgaI: NIP, autouzupełnianie z rejestru VAT MF, lokalne zapamiętanie sprzedawcy i szybki PDF.",
    url: "https://ksiegai.pl/darmowy-generator-faktur",
    type: "website",
  },
};

export default function FreeInvoiceGeneratorPage() {
  return <AnonymousInvoiceGenerator />;
}
