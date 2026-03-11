export type InvoicePartyDraft = {
  name: string;
  taxId: string;
  street: string;
  postalCode: string;
  city: string;
  email: string;
};

export type InvoiceItemDraft = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  vatRate: number;
};

export type AnonymousInvoiceDraft = {
  invoiceNumber: string;
  issueDate: string;
  saleDate: string;
  dueDate: string;
  paymentMethod: string;
  notes: string;
  seller: InvoicePartyDraft;
  buyer: InvoicePartyDraft;
  items: InvoiceItemDraft[];
};

export type InvoiceTotals = {
  net: number;
  vat: number;
  gross: number;
};

export type ViesLookupResult = {
  name: string;
  taxId: string;
  street: string;
  postalCode: string;
  city: string;
};

export const SELLER_STORAGE_KEY = "ksiegai:anonymous-invoice:seller";

const DEFAULT_VAT_RATE = 23;

export const createEmptyParty = (): InvoicePartyDraft => ({
  name: "",
  taxId: "",
  street: "",
  postalCode: "",
  city: "",
  email: "",
});

export const createEmptyItem = (): InvoiceItemDraft => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  unit: "szt.",
  unitPrice: 0,
  vatRate: DEFAULT_VAT_RATE,
});

export const getDefaultInvoiceDraft = (): AnonymousInvoiceDraft => {
  const today = new Date();
  const todayIso = toIsoDate(today);
  const dueDate = new Date(today);
  dueDate.setDate(dueDate.getDate() + 7);

  return {
    invoiceNumber: getSuggestedInvoiceNumber(today),
    issueDate: todayIso,
    saleDate: todayIso,
    dueDate: toIsoDate(dueDate),
    paymentMethod: "Przelew",
    notes: "",
    seller: createEmptyParty(),
    buyer: createEmptyParty(),
    items: [createEmptyItem()],
  };
};

export const sanitizeTaxId = (taxId: string) => taxId.replace(/\D/g, "");

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(value);

export const formatTaxId = (taxId: string) => {
  const digits = sanitizeTaxId(taxId);
  if (digits.length !== 10) return taxId;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
};

export const getItemTotals = (item: InvoiceItemDraft): InvoiceTotals => {
  const quantity = Number.isFinite(item.quantity) ? item.quantity : 0;
  const unitPrice = Number.isFinite(item.unitPrice) ? item.unitPrice : 0;
  const vatRate = Number.isFinite(item.vatRate) ? item.vatRate : DEFAULT_VAT_RATE;
  const net = roundCurrency(quantity * unitPrice);
  const vat = roundCurrency((net * vatRate) / 100);
  const gross = roundCurrency(net + vat);
  return { net, vat, gross };
};

export const getInvoiceTotals = (items: InvoiceItemDraft[]): InvoiceTotals =>
  items.reduce<InvoiceTotals>(
    (accumulator, item) => {
      const itemTotals = getItemTotals(item);
      return {
        net: roundCurrency(accumulator.net + itemTotals.net),
        vat: roundCurrency(accumulator.vat + itemTotals.vat),
        gross: roundCurrency(accumulator.gross + itemTotals.gross),
      };
    },
    { net: 0, vat: 0, gross: 0 },
  );

export const loadStoredSeller = (): InvoicePartyDraft | null => {
  if (typeof window === "undefined") return null;

  try {
    const rawValue = window.localStorage.getItem(SELLER_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as Partial<InvoicePartyDraft>;
    return {
      ...createEmptyParty(),
      ...parsed,
    };
  } catch {
    return null;
  }
};

export const saveSellerToStorage = (seller: InvoicePartyDraft) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SELLER_STORAGE_KEY,
    JSON.stringify({
      name: seller.name,
      taxId: sanitizeTaxId(seller.taxId),
      street: seller.street,
      postalCode: seller.postalCode,
      city: seller.city,
      email: seller.email,
    }),
  );
};

export const clearStoredSeller = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SELLER_STORAGE_KEY);
};

export const fetchCompanyByTaxId = async (taxId: string): Promise<ViesLookupResult> => {
  const normalizedTaxId = sanitizeTaxId(taxId);
  if (normalizedTaxId.length !== 10) {
    throw new Error("Podaj poprawny 10-cyfrowy NIP.");
  }

  const date = toIsoDate(new Date());
  const response = await fetch(
    `https://wl-api.mf.gov.pl/api/search/nip/${normalizedTaxId}?date=${date}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać danych z rejestru VAT MF.");
  }

  const payload = (await response.json()) as {
    result?: {
      subject?: {
        name?: string | null;
        nip?: string | null;
        workingAddress?: string | null;
        residenceAddress?: string | null;
      } | null;
    } | null;
  };

  const subject = payload.result?.subject;
  if (!subject?.name) {
    throw new Error("Nie znaleziono firmy dla podanego NIP.");
  }

  const address = parsePolishAddress(subject.workingAddress || subject.residenceAddress || "");
  return {
    name: subject.name,
    taxId: subject.nip || normalizedTaxId,
    street: address.street,
    postalCode: address.postalCode,
    city: address.city,
  };
};

export const buildInvoiceFilename = (invoiceNumber: string) => {
  const sanitizedNumber = invoiceNumber.trim().replace(/[/\\?%*:|"<>]/g, "-") || "faktura";
  return `faktura-${sanitizedNumber}.pdf`;
};

export const isInvoiceDraftValid = (draft: AnonymousInvoiceDraft) => {
  const hasSeller = draft.seller.name.trim() && sanitizeTaxId(draft.seller.taxId).length === 10;
  const hasBuyer = draft.buyer.name.trim().length > 0;
  const hasItems = draft.items.some((item) => item.name.trim() && item.quantity > 0);
  return Boolean(hasSeller && hasBuyer && hasItems && draft.invoiceNumber.trim());
};

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const roundCurrency = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const getSuggestedInvoiceNumber = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `FV/${year}/${month}/${day}`;
};

const parsePolishAddress = (rawAddress: string) => {
  const normalized = rawAddress.replace(/\s+/g, " ").trim();
  const postalCodeMatch = normalized.match(/(\d{2}-\d{3})\s+(.+)$/);

  if (!postalCodeMatch) {
    return {
      street: normalized,
      postalCode: "",
      city: "",
    };
  }

  const street = normalized.slice(0, postalCodeMatch.index).trim().replace(/,\s*$/, "");
  return {
    street,
    postalCode: postalCodeMatch[1],
    city: postalCodeMatch[2].trim(),
  };
};
