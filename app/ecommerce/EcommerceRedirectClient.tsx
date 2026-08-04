"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function EcommerceRedirectClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ecommerce-ksiegowosc/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <p className="text-sm text-gray-500 dark:text-gray-400">Przekierowanie…</p>
    </div>
  );
}
