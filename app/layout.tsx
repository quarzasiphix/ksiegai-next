import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu | Tovernet",
  description: "Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Pełna zgodność z KSeF, JPK i polskimi przepisami. Proste w użyciu, zaawansowane dla księgowych i power-userów.",
  keywords: "księgowość online, faktury KSeF, JPK-V7M, automatyczna księgowość, księgowość dla JDG, księgowość dla spółek, polski program księgowy, Tovernet, księgowość w chmurze",
  authors: [{ name: "Tovernet Sp. z o.o.", url: "https://tovernet.com" }],
  creator: "Tovernet Sp. z o.o.",
  publisher: "Tovernet Sp. z o.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu",
    description: "Automatyzacja faktur, podatków i KSeF dla przedsiębiorców, którzy wolą budować firmę niż pilnować papierów. Pełna zgodność z polskimi przepisami.",
    type: "website",
    locale: "pl_PL",
    url: "https://ksiegai.pl",
    siteName: "KsięgaI",
    images: [
      {
        url: "https://ksiegai.pl/og-image.png",
        width: 1200,
        height: 630,
        alt: "KsięgaI - Profesjonalna księgowość online dla polskich firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KsięgaI - Księgowość, która nie kradnie Twojego czasu",
    description: "Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Zgodność z KSeF i JPK.",
    images: ["https://ksiegai.pl/og-image.png"],
  },
  alternates: {
    canonical: "https://ksiegai.pl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
