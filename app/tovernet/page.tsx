import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TOVERNET_URL = "https://tovernet.online";
const CASE_STUDY_URL = "https://tovernet.online/pl/projekty/ksiegai/";

export const metadata: Metadata = {
  title: "Tovernet — twórca i dystrybutor KsięgaI",
  description:
    "KsięgaI to własny produkt firmy Tovernet — projektowany, wdrażany i utrzymywany przez ten sam zespół. Zobacz case study tej realizacji.",
  alternates: {
    canonical: "https://www.ksiegai.pl/tovernet/",
  },
  openGraph: {
    title: "Tovernet — twórca i dystrybutor KsięgaI",
    description: "Kto stoi za KsięgaI i jak wygląda ta realizacja od strony technicznej.",
    url: "https://www.ksiegai.pl/tovernet",
    type: "website",
    locale: "pl_PL",
  },
};

export default function TovernetPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-6 md:px-4 py-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
          <span className="text-sm font-semibold text-blue-300">Deweloper i dystrybutor</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Tovernet</h1>
        <p className="text-gray-300 leading-relaxed text-lg">
          <strong className="text-white">KsięgaI</strong> to własny produkt firmy{" "}
          <a
            href={TOVERNET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-semibold underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300"
          >
            Tovernet
          </a>
          {" "}— zaprojektowany, wdrożony i prowadzony na co dzień przez ten sam zespół, nie
          przekazany do zewnętrznego wykonawcy. Tovernet buduje i utrzymuje strony oraz systemy
          techniczne dla firm z różnych branż, a KsięgaI jest jednym z własnych, prowadzonych
          na bieżąco produktów.
        </p>
        <p className="mt-4 text-gray-400 leading-relaxed">
          KsięgaI nie jest biurem rachunkowym ani nie świadczy doradztwa podatkowego — to
          oprogramowanie wspierające księgowość. Kwestie techniczne, infrastrukturę i rozwój
          produktu prowadzi Tovernet.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={CASE_STUDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Zobacz case study KsięgaI
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={TOVERNET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border border-gray-700 text-gray-200 hover:border-blue-500 hover:text-blue-300 transition-colors"
          >
            Odwiedź Tovernet
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            ← Wróć do strony głównej
          </Link>
        </p>
      </div>
    </div>
  );
}
