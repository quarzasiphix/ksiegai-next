import { supabase } from "@/lib/supabase";
import { getInvoiceTotals, sanitizeTaxId, type AnonymousInvoiceDraft } from "@/lib/invoice-tools/anonymousInvoice";

const ANONYMOUS_INVOICE_SOURCE = "anonymous_generator";

export async function persistAnonymousInvoiceDraft(draft: AnonymousInvoiceDraft) {
  const submissionId = crypto.randomUUID();
  const totals = getInvoiceTotals(draft.items);

  const { data, error } = await supabase.functions.invoke("store-anonymous-invoice", {
    body: {
      source: ANONYMOUS_INVOICE_SOURCE,
      submissionId,
      seller: {
        ...draft.seller,
        taxId: sanitizeTaxId(draft.seller.taxId),
      },
      buyer: {
        ...draft.buyer,
        taxId: sanitizeTaxId(draft.buyer.taxId),
      },
      invoiceNumber: draft.invoiceNumber,
      issueDate: draft.issueDate,
      saleDate: draft.saleDate,
      dueDate: draft.dueDate,
      paymentMethod: draft.paymentMethod,
      notes: draft.notes,
      items: draft.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        vatRate: item.vatRate,
      })),
      totals,
    },
  });

  if (error) {
    throw new Error(error.message || "Nie udało się zapisać faktury do późniejszego odzyskania.");
  }

  return data as { id: string; success: boolean; reused: boolean };
}
