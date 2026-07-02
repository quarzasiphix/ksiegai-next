import type { Metadata } from "next";
import InvoiceGeneratorClient from "./InvoiceGeneratorClient";

export const metadata: Metadata = {
  title: "Darmowy generator faktur | KsięgaI",
  description:
    "Wygeneruj prostą fakturę VAT online w przeglądarce. Uzupełnij dane, policz netto i VAT oraz przygotuj podgląd do druku lub zapisu jako PDF.",
  alternates: {
    canonical: "https://www.ksiegai.pl/generator-faktur/",
  },
  openGraph: {
    title: "Darmowy generator faktur online | KsięgaI",
    description:
      "Prosty generator faktur dla freelancerów, JDG i małych firm. Wypełnij dane kontrahenta, policz VAT i przygotuj dokument do wydruku.",
    url: "https://www.ksiegai.pl/generator-faktur",
    type: "website",
    locale: "pl_PL",
  },
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorClient />;
}
