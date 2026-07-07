import { supabase } from "../supabase";
import { getInvoiceTotals, sanitizeVatOrTaxId, type AnonymousInvoiceDraft } from "./anonymousInvoice";

const ANONYMOUS_INVOICE_SOURCE = "anonymous_generator";

type AnonymousLeadPayload = {
  email: string;
  wantsNewsletter: boolean;
};

export async function persistAnonymousInvoiceDraft(
  draft: AnonymousInvoiceDraft,
  lead?: AnonymousLeadPayload,
  pdfBase64?: string,
  isReverseCharge = false,
) {
  const submissionId = crypto.randomUUID();
  const totals = getInvoiceTotals(draft.items, isReverseCharge);

  const { data, error } = await supabase.functions.invoke("store-anonymous-invoice", {
    body: {
      source: ANONYMOUS_INVOICE_SOURCE,
      submissionId,
      seller: {
        ...draft.seller,
        taxId: sanitizeVatOrTaxId(draft.seller.taxId),
      },
      buyer: {
        ...draft.buyer,
        taxId: sanitizeVatOrTaxId(draft.buyer.taxId),
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
      leadEmail: lead?.email,
      wantsNewsletter: lead?.wantsNewsletter ?? false,
      pdfBase64,
      isReverseCharge,
    },
  });

  if (error) {
    throw new Error(error.message || "Nie udało się zapisać faktury do późniejszego odzyskania.");
  }

  return { ...(data as { id: string; success: boolean; reused: boolean }), submissionId };
}
