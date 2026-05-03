"use client";

import { useEffect } from "react";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error("[app/global-error]", error);
  }, [error]);

  return (
    <html lang="pl">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Aplikacja nie mogła się uruchomić</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Odśwież stronę lub uruchom ponownie serwer developerski.
          </p>
          <button
            onClick={reset}
            className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Spróbuj ponownie
          </button>
        </div>
      </body>
    </html>
  );
}
