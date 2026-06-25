"use client";

import { useSearchParams } from "next/navigation";
import InviteRegistrationPage from "../../components/invites/InviteRegistrationPage";

export default function InvitePageClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? null;

  return <InviteRegistrationPage token={token} />;
}
