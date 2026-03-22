import type { Metadata } from "next";
import SharedInvoicesLedger from "@/components/public/SharedInvoicesLedger";

export const metadata: Metadata = {
  title: "Udostępnione faktury klienta | KsięgaI",
  description:
    "Publiczny indeks udostępnionych faktur dla jednego odbiorcy. Zobacz wszystkie faktury, które zostały jawnie wysłane temu klientowi.",
  alternates: {
    canonical: "https://ksiegai.pl/udostepnione-faktury",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function SharedInvoicesPage() {
  return <SharedInvoicesLedger />;
}
