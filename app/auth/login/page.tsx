"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthLoginRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("returnTo");
    const target =
      returnTo && returnTo.length > 0
        ? `/logowanie?returnTo=${encodeURIComponent(returnTo)}`
        : "/logowanie";

    router.replace(target);
  }, [router, searchParams]);

  return null;
}
