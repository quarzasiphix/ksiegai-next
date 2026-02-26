import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 md:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              KsięgaI
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Księgowość, która nie kradnie Twojego czasu.
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              Produkt <a href="https://tovernet.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Tovernet Sp. z o.o.</a>
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              🇵🇱 Zgodne z KSeF i polskimi przepisami
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#funkcje" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Funkcje
                </a>
              </li>
              <li>
                <a href="/#premium" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Premium
                </a>
              </li>
              <li>
                <Link href="/cennik" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cennik
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Dla spółek
                </Link>
              </li>
            </ul>
          </div>

          {/* Firma */}
          <div>
            <h3 className="text-white font-semibold mb-4">Firma</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jak-to-dziala" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Jak to działa
                </Link>
              </li>
              <li>
                <a href="mailto:kontakt@ksiegai.pl" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontakt
                </a>
              </li>
              <li>
                <Link href="/infrastructure" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Infrastruktura
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Prawne */}
          <div>
            <h3 className="text-white font-semibold mb-4">Prawne</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/regulamin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link href="/rodo" className="text-gray-400 hover:text-white transition-colors text-sm">
                  RODO
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="mb-4 pb-4 border-b border-gray-800">
            <p className="text-gray-500 text-xs text-center max-w-4xl mx-auto">
              <strong>Ważne:</strong> KsięgaI jest oprogramowaniem wspierającym księgowość. Nie świadczymy usług biura rachunkowego ani doradztwa podatkowego.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} KsięgaI by <a href="https://tovernet.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Tovernet Sp. z o.o.</a> Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-6">
              <a href="mailto:kontakt@ksiegai.pl" className="text-gray-400 hover:text-white transition-colors text-sm">
                kontakt@ksiegai.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
