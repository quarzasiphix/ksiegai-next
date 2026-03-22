import { supabase } from "@/lib/supabase";

export interface SharedInvoiceListItem {
  slug: string;
  id: string;
  number: string | null;
  issue_date: string | null;
  due_date: string | null;
  total_gross_value: number | null;
  currency: string | null;
  payment_status: string | null;
  is_paid: boolean | null;
  customer_name: string | null;
  customer_tax_id: string | null;
  expires_at?: string | null;
  view_once?: boolean;
  viewed_at?: string | null;
  created_at?: string | null;
}

export interface SharedInvoiceDocumentPayload {
  share: {
    id: string;
    slug: string;
    share_type: "invoice" | "contract" | "combo";
    invoice_id?: string | null;
    contract_id?: string | null;
    view_once: boolean;
    expires_at?: string | null;
    viewed_at?: string | null;
    created_at: string;
  };
  invoice?: any | null;
  contract?: any | null;
  relatedInvoices?: SharedInvoiceListItem[];
}

export async function fetchSharedInvoiceDocument(
  slug: string,
): Promise<SharedInvoiceDocumentPayload> {
  const { data, error } = await supabase.functions.invoke("shared-doc", {
    body: { slug },
  });

  if (error) {
    throw error;
  }

  return {
    ...data,
    relatedInvoices: Array.isArray(data?.relatedInvoices) ? data.relatedInvoices : [],
  } as SharedInvoiceDocumentPayload;
}

export function getSharedInvoiceAppUrl(slug: string): string {
  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const appBaseUrl =
      hostname === "localhost" || hostname === "127.0.0.1"
        ? "http://localhost:8080"
        : "https://app.ksiegai.pl";

    return appBaseUrl + "/share/" + encodeURIComponent(slug);
  }

  const configuredBaseUrl = process.env.NEXT_PUBLIC_KSEF_AI_APP_URL || "https://app.ksiegai.pl";
  return configuredBaseUrl.replace(/\/$/, "") + "/share/" + encodeURIComponent(slug);
}
