import { Suspense } from "react";
import InvitePageClient from "./InvitePageClient";

export default function InvitePage() {
  return (
    <Suspense>
      <InvitePageClient />
    </Suspense>
  );
}
