import { publicApiAction } from "../gateway";
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

  let data: { id: string; success: boolean; reused: boolean };
  try {
    data = await publicApiAction<{ id: string; success: boolean; reused: boolean }>("anonymousInvoice.create", {
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
    });
  } catch (error) {
    throw new Error(
      (error instanceof Error && error.message) || "Nie udało się zapisać faktury do późniejszego odzyskania.",
    );
  }

  return { ...data, submissionId };
}
