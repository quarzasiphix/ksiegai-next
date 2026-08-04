import type { Metadata } from "next";
import { EcommerceRedirectClient } from "./EcommerceRedirectClient";

// Static export (output: "export") has no server-side redirect() support —
// this is a short-URL alias for /ecommerce-ksiegowosc, which stays canonical
// to avoid duplicate-content indexing. Redirect happens client-side.
export const metadata: Metadata = {
  title: "Księgowość sklepu internetowego | KsięgaI",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.ksiegai.pl/ecommerce-ksiegowosc/" },
};

export default function EcommerceShortUrlPage() {
  return <EcommerceRedirectClient />;
}
