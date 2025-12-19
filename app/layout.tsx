import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KsięgaI - Księgowość bez myślenia dla polskich firm",
  description: "Przestań martwić się księgowością, podatkami i fakturami. KsięgaI ogarnia faktury, wydatki i zgodność podatkową za Ciebie — bez stresu, bez chaosu.",
  keywords: "księgowość, faktury, KSeF, JPK, polska księgowość, automatyczna księgowość",
  openGraph: {
    title: "KsięgaI - Księgowość bez myślenia",
    description: "Wystawiasz faktury. Resztą zajmuje się system.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
