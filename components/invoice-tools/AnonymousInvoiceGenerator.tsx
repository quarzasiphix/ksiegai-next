"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  Loader2,
  ReceiptText,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import {
  clearStoredSeller,
  createEmptyItem,
  fetchCompanyByTaxId,
  formatCurrency,
  formatTaxId,
  getDefaultInvoiceDraft,
  getInvoiceTotals,
  getItemTotals,
  isInvoiceDraftValid,
  loadStoredSeller,
  saveSellerToStorage,
  sanitizeTaxId,
  type TaxIdLookupSource,
  type AnonymousInvoiceDraft,
  type InvoiceItemDraft,
  type InvoicePartyDraft,
} from "@/lib/invoice-tools/anonymousInvoice";
import { downloadAnonymousInvoicePdf } from "@/lib/invoice-tools/pdf";

type PartyKey = "seller" | "buyer";

export default function AnonymousInvoiceGenerator() {
  const [draft, setDraft] = useState<AnonymousInvoiceDraft>(() => getDefaultInvoiceDraft());
  const [message, setMessage] = useState<string | null>(null);
  const [lookupState, setLookupState] = useState<{ party: PartyKey | null; loading: boolean }>({
    party: null,
    loading: false,
  });
  const [lookupSource, setLookupSource] = useState<Record<PartyKey, TaxIdLookupSource | null>>({
    seller: null,
    buyer: null,
  });
  const [isSavingSeller, setIsSavingSeller] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const lastAutoLookupRef = useRef<Record<PartyKey, string>>({
    seller: "",
    buyer: "",
  });

  useEffect(() => {
    const storedSeller = loadStoredSeller();
    if (!storedSeller) return;

    setDraft((currentDraft) => ({
      ...currentDraft,
      seller: {
        ...currentDraft.seller,
        ...storedSeller,
      },
    }));
  }, []);

  useEffect(() => {
    const normalizedTaxId = sanitizeTaxId(draft.seller.taxId);
    if (normalizedTaxId.length < 10) {
      lastAutoLookupRef.current.seller = "";
      return;
    }

    if (lookupState.loading || lastAutoLookupRef.current.seller === normalizedTaxId) {
      return;
    }

    lastAutoLookupRef.current.seller = normalizedTaxId;
    void handleLookup("seller");
  }, [draft.seller.taxId, lookupState.loading]);

  useEffect(() => {
    const normalizedTaxId = sanitizeTaxId(draft.buyer.taxId);
    if (normalizedTaxId.length < 10) {
      lastAutoLookupRef.current.buyer = "";
      return;
    }

    if (lookupState.loading || lastAutoLookupRef.current.buyer === normalizedTaxId) {
      return;
    }

    lastAutoLookupRef.current.buyer = normalizedTaxId;
    void handleLookup("buyer");
  }, [draft.buyer.taxId, lookupState.loading]);

  const totals = useMemo(() => getInvoiceTotals(draft.items), [draft.items]);
  const canGeneratePdf = useMemo(() => isInvoiceDraftValid(draft), [draft]);

  const updateParty = (partyKey: PartyKey, field: keyof InvoicePartyDraft, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [partyKey]: {
        ...currentDraft[partyKey],
        [field]: field === "taxId" ? sanitizeTaxId(value) : value,
      },
    }));
  };

  const updateInvoiceField = (field: keyof AnonymousInvoiceDraft, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  };

  const updateItem = <K extends keyof InvoiceItemDraft>(itemId: string, field: K, value: InvoiceItemDraft[K]) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      items: currentDraft.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    }));
  };

  const addItem = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      items: [...currentDraft.items, createEmptyItem()],
    }));
  };

  const removeItem = (itemId: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      items: currentDraft.items.length === 1
        ? currentDraft.items
        : currentDraft.items.filter((item) => item.id !== itemId),
    }));
  };

  const handleLookup = async (partyKey: PartyKey) => {
    setMessage(null);
    setLookupState({ party: partyKey, loading: true });

    try {
      const result = await fetchCompanyByTaxId(draft[partyKey].taxId);
      setDraft((currentDraft) => ({
        ...currentDraft,
        [partyKey]: {
          ...currentDraft[partyKey],
          name: result.name,
          taxId: result.taxId,
          street: result.street,
          postalCode: result.postalCode,
          city: result.city,
        },
      }));
      setLookupSource((currentState) => ({
        ...currentState,
        [partyKey]: result.source,
      }));
      setMessage(
        partyKey === "seller"
          ? `Dane sprzedawcy pobrane z: ${result.sourceLabel}.`
          : `Dane nabywcy pobrane z: ${result.sourceLabel}.`,
      );
    } catch (error) {
      setLookupSource((currentState) => ({
        ...currentState,
        [partyKey]: null,
      }));
      setMessage(error instanceof Error ? error.message : "Nie udało się pobrać danych z rejestru VAT MF.");
    } finally {
      setLookupState({ party: null, loading: false });
    }
  };

  const handleSaveSeller = () => {
    setIsSavingSeller(true);
    try {
      saveSellerToStorage(draft.seller);
      setMessage("Dane sprzedawcy zapisane lokalnie w tej przeglądarce.");
    } finally {
      setIsSavingSeller(false);
    }
  };

  const handleClearSeller = () => {
    clearStoredSeller();
    setDraft((currentDraft) => ({
      ...currentDraft,
      seller: {
        ...currentDraft.seller,
        name: "",
        taxId: "",
        street: "",
        postalCode: "",
        city: "",
        email: "",
      },
    }));
    setMessage("Lokalnie zapisane dane sprzedawcy zostały usunięte.");
  };

  const handleGeneratePdf = async () => {
    setMessage(null);
    setIsGeneratingPdf(true);

    try {
      await downloadAnonymousInvoicePdf(draft);
      setShowSignupPrompt(true);
      setMessage("Faktura została pobrana jako PDF.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Nie udało się wygenerować PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
                <Sparkles className="h-4 w-4" />
                Darmowy generator faktur bez konta
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Wystaw fakturę w 2 minuty. Bez rejestracji, bez zapisywania w systemie.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Wpisujesz NIP, pobierasz dane z rejestru VAT MF, zapisujesz swoje dane lokalnie na później i od
                razu pobierasz PDF. Dopiero po wygenerowaniu faktury możesz zdecydować, czy chcesz założyć konto.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                <FeaturePill icon={ShieldCheck} text="Dane sprzedawcy zapisujemy tylko w Twojej przeglądarce" />
                <FeaturePill icon={Building2} text="Autouzupełnianie NIP z oficjalnego rejestru MF" />
                <FeaturePill icon={ReceiptText} text="PDF gotowy do pobrania od razu po wypełnieniu" />
              </div>
              <div className="mt-8 max-w-2xl rounded-3xl border border-blue-400/20 bg-blue-500/10 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-blue-500/20 p-3 text-blue-100">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">Najpierw NIP</p>
                    <p className="mt-2 text-base leading-7 text-slate-100">
                      Zacznij od pola NIP sprzedawcy. Po wpisaniu 10 cyfr generator sam spróbuje pobrać nazwę i adres z
                      rejestru VAT MF, więc reszta formularza robi się prawie sama.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Szybki workflow</p>
              <ol className="mt-5 space-y-4 text-sm text-slate-200">
                <li className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-blue-50">
                  1. Wpisz pierwszy NIP. Po 10 cyfrach uruchamiamy wyszukiwanie automatycznie.
                </li>
                <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  2. Dodaj nabywcę i pozycje faktury.
                </li>
                <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  3. Pobierz PDF i opcjonalnie przejdź do pełnego konta KsięgaI.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {message && (
            <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              {message}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <PartyCard
                  title="Sprzedawca"
                  description="To jest pierwszy krok. Zacznij od NIP, a resztę danych spróbujemy uzupełnić automatycznie."
                  party={draft.seller}
                  onChange={(field, value) => updateParty("seller", field, value)}
                  onLookup={() => handleLookup("seller")}
                  isLookupLoading={lookupState.loading && lookupState.party === "seller"}
                  lookupModeLabel="Autowyszukiwanie po NIP"
                  lookupSource={lookupSource.seller}
                  footer={
                    <div className="flex flex-wrap gap-3">
                      <ActionButton icon={Save} onClick={handleSaveSeller} disabled={isSavingSeller}>
                        Zapamiętaj lokalnie
                      </ActionButton>
                      <ActionButton icon={Trash2} onClick={handleClearSeller} variant="secondary">
                        Usuń zapisane dane
                      </ActionButton>
                    </div>
                  }
                />

                <PartyCard
                  title="Nabywca"
                  description="Jeśli kontrahent ma NIP, też pobierzemy dane automatycznie. Gdy API nie odpowiada, wpisz je ręcznie."
                  party={draft.buyer}
                  onChange={(field, value) => updateParty("buyer", field, value)}
                  onLookup={() => handleLookup("buyer")}
                  isLookupLoading={lookupState.loading && lookupState.party === "buyer"}
                  lookupModeLabel="Automatyczne uzupełnianie kontrahenta"
                  lookupSource={lookupSource.buyer}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">Dane faktury</h2>
                    <p className="mt-1 text-sm text-slate-600">Ustaw numer, daty i płatność. Wszystko działa lokalnie.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <LabeledInput label="Numer faktury" value={draft.invoiceNumber} onChange={(value) => updateInvoiceField("invoiceNumber", value)} />
                  <LabeledInput label="Data wystawienia" type="date" value={draft.issueDate} onChange={(value) => updateInvoiceField("issueDate", value)} />
                  <LabeledInput label="Data sprzedaży" type="date" value={draft.saleDate} onChange={(value) => updateInvoiceField("saleDate", value)} />
                  <LabeledInput label="Termin płatności" type="date" value={draft.dueDate} onChange={(value) => updateInvoiceField("dueDate", value)} />
                  <LabeledInput label="Metoda płatności" value={draft.paymentMethod} onChange={(value) => updateInvoiceField("paymentMethod", value)} />
                </div>

                <div className="mt-4">
                  <LabeledInput label="Uwagi na fakturze" value={draft.notes} onChange={(value) => updateInvoiceField("notes", value)} placeholder="Np. Dziękujemy za współpracę." />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">Pozycje faktury</h2>
                    <p className="mt-1 text-sm text-slate-600">Dodaj usługę lub towar. Kwoty netto, VAT i brutto przeliczymy od razu.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Dodaj pozycję
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.items.map((item, index) => {
                    const itemTotals = getItemTotals(item);

                    return (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Pozycja {index + 1}
                          </p>
                          {draft.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-sm font-medium text-slate-500 transition hover:text-rose-600"
                            >
                              Usuń
                            </button>
                          )}
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_110px_110px_130px_110px]">
                          <LabeledInput label="Nazwa" value={item.name} onChange={(value) => updateItem(item.id, "name", value)} placeholder="Np. Obsługa administracyjna marzec 2026" />
                          <LabeledInput label="Ilość" type="number" value={String(item.quantity)} onChange={(value) => updateItem(item.id, "quantity", Number(value) || 0)} />
                          <LabeledInput label="Jednostka" value={item.unit} onChange={(value) => updateItem(item.id, "unit", value)} />
                          <LabeledInput label="Cena netto" type="number" value={String(item.unitPrice)} onChange={(value) => updateItem(item.id, "unitPrice", Number(value) || 0)} />
                          <LabeledInput label="VAT %" type="number" value={String(item.vatRate)} onChange={(value) => updateItem(item.id, "vatRate", Number(value) || 0)} />
                        </div>

                        <div className="mt-4 grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-3">
                          <Stat label="Netto" value={formatCurrency(itemTotals.net)} />
                          <Stat label="VAT" value={formatCurrency(itemTotals.vat)} />
                          <Stat label="Brutto" value={formatCurrency(itemTotals.gross)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
                    <ReceiptText className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">Podsumowanie</h2>
                    <p className="text-sm text-slate-600">Gotowe do pobrania jako PDF.</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-blue-200">Do zapłaty</p>
                      <p className="mt-2 text-4xl font-semibold">{formatCurrency(totals.gross)}</p>
                    </div>
                    <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-300" />
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-slate-200">
                    <div className="flex items-center justify-between">
                      <span>Łącznie netto</span>
                      <span>{formatCurrency(totals.net)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>VAT</span>
                      <span>{formatCurrency(totals.vat)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sprzedawca</span>
                      <span className="max-w-[180px] truncate text-right">{draft.seller.name || "Uzupełnij dane"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>NIP sprzedawcy</span>
                      <span>{draft.seller.taxId ? formatTaxId(draft.seller.taxId) : "-"}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGeneratePdf}
                  disabled={!canGeneratePdf || isGeneratingPdf}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isGeneratingPdf ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  Pobierz PDF
                </button>

                {!canGeneratePdf && (
                  <p className="mt-3 text-sm text-slate-500">
                    Uzupełnij sprzedawcę, nabywcę i co najmniej jedną pozycję, aby pobrać gotową fakturę.
                  </p>
                )}

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Jak działa pamięć danych?</p>
                  <p className="mt-2">
                    Tylko dane sprzedawcy zapisujemy lokalnie w `localStorage`, żeby przy kolejnej fakturze nie wpisywać ich od zera.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {showSignupPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center gap-3 text-blue-600">
              <CheckCircle2 className="h-8 w-8" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em]">Faktura gotowa</p>
            </div>
            <h3 className="mt-5 text-3xl font-semibold text-slate-950">
              Chcesz już nie robić tego ręcznie następnym razem?
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Konto w KsięgaI pozwala zapisywać klientów, historię faktur i wracać do dokumentów bez lokalnych szkiców. Jeśli
              na razie potrzebujesz tylko jednego PDF, po prostu zamknij to okno.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rejestracja"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Załóż konto w KsięgaI
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={() => setShowSignupPrompt(false)}
                className="rounded-2xl border border-slate-300 px-5 py-3.5 text-base font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Zostań przy darmowym generatorze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PartyCard({
  title,
  description,
  party,
  onChange,
  onLookup,
  isLookupLoading,
  lookupModeLabel,
  lookupSource,
  footer,
}: {
  title: string;
  description: string;
  party: InvoicePartyDraft;
  onChange: (field: keyof InvoicePartyDraft, value: string) => void;
  onLookup: () => void;
  isLookupLoading: boolean;
  lookupModeLabel: string;
  lookupSource: TaxIdLookupSource | null;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">{lookupModeLabel}</p>
              <p className="mt-1 text-sm text-slate-600">Najważniejsze pole. Po wpisaniu pełnego NIP dane powinny wpaść same.</p>
            </div>
            <button
              type="button"
              onClick={onLookup}
              disabled={isLookupLoading}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-400 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLookupLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Szukaj po NIP
            </button>
          </div>

          <div className="mt-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">NIP</span>
              <input
                type="text"
                value={party.taxId}
                onChange={(event) => onChange("taxId", event.target.value)}
                placeholder="1234567890"
                className="w-full rounded-2xl border-2 border-blue-300 bg-white px-4 py-4 text-xl font-semibold tracking-[0.16em] text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <p className="mt-2 text-sm text-slate-500">
              {party.taxId ? `Wpisany NIP: ${formatTaxId(party.taxId)}` : "Wpisz 10 cyfr, a lookup uruchomi się automatycznie."}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
              {lookupSource === "mf_vat"
                ? "Źródło lookupu: Wykaz VAT MF"
                : "Źródło lookupu: najpierw lokalna walidacja NIP, potem wykaz VAT MF"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              CEIDG jest osobnym rejestrem. Jego API wymaga autoryzowanego backendu, więc ten darmowy generator nie łączy się z nim bezpośrednio z przeglądarki.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <LabeledInput label="Email" value={party.email} onChange={(value) => onChange("email", value)} placeholder="biuro@firma.pl" />
        <div className="md:col-span-2">
          <LabeledInput label="Nazwa" value={party.name} onChange={(value) => onChange("name", value)} placeholder="Pełna nazwa firmy" />
        </div>
        <div className="md:col-span-2">
          <LabeledInput label="Ulica i numer" value={party.street} onChange={(value) => onChange("street", value)} placeholder="ul. Przykładowa 10/2" />
        </div>
        <LabeledInput label="Kod pocztowy" value={party.postalCode} onChange={(value) => onChange("postalCode", value)} placeholder="00-000" />
        <LabeledInput label="Miasto" value={party.city} onChange={(value) => onChange("city", value)} placeholder="Warszawa" />
      </div>

      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function FeaturePill({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
      <Icon className="h-4 w-4 text-blue-200" />
      {text}
    </span>
  );
}

function ActionButton({
  icon: Icon,
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  icon: typeof Save;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "bg-slate-950 text-white hover:bg-slate-800"
      : "border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-950";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}
