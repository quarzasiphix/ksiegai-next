"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Calculator, Download, FileText, Sparkles } from "lucide-react";
import posthog from "posthog-js";

type PartyFields = {
  name: string;
  address: string;
  city: string;
  nip: string;
};

type InvoiceFormState = {
  invoiceNumber: string;
  issueDate: string;
  saleDate: string;
  dueDate: string;
  paymentMethod: string;
  seller: PartyFields;
  buyer: PartyFields;
  itemName: string;
  quantity: string;
  unit: string;
  unitPriceNet: string;
  vatRate: string;
};

const today = new Date().toISOString().slice(0, 10);

const defaultState: InvoiceFormState = {
  invoiceNumber: "FV/03/2026/001",
  issueDate: today,
  saleDate: today,
  dueDate: today,
  paymentMethod: "Przelew 7 dni",
  seller: {
    name: "Studio Atlas Sp. z o.o.",
    address: "ul. Miedziana 18",
    city: "00-835 Warszawa",
    nip: "5253029987",
  },
  buyer: {
    name: "Nova Commerce Sp. z o.o.",
    address: "ul. Grzybowska 87",
    city: "00-844 Warszawa",
    nip: "7011122233",
  },
  itemName: "Projekt i wdrozenie strony produktowej",
  quantity: "1",
  unit: "usl.",
  unitPriceNet: "2500",
  vatRate: "23",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(value);
}

function parseNumber(value: string) {
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function InvoiceGeneratorClient() {
  const [form, setForm] = useState<InvoiceFormState>(defaultState);

  const quantity = parseNumber(form.quantity);
  const unitPriceNet = parseNumber(form.unitPriceNet);
  const vatRate = parseNumber(form.vatRate) / 100;
  const totals = {
    quantity,
    unitPriceNet,
    vatRate,
    net: quantity * unitPriceNet,
    vat: quantity * unitPriceNet * vatRate,
    gross: quantity * unitPriceNet * (1 + vatRate),
  };

  function updateField<Key extends keyof InvoiceFormState>(key: Key, value: InvoiceFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateParty(party: "seller" | "buyer", field: keyof PartyFields, value: string) {
    setForm((current) => ({
      ...current,
      [party]: {
        ...current[party],
        [field]: value,
      },
    }));
  }

  function handleFieldChange<Key extends keyof InvoiceFormState>(key: Key) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      updateField(key, event.target.value as InvoiceFormState[Key]);
    };
  }

  function handlePrint() {
    posthog.capture('invoice_generator_printed', { vat_rate: form.vatRate, gross_amount: totals.gross });
    window.print();
  }

  return (
    <div className="relative overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <section className="pb-10 pt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="grid gap-8 rounded-[2rem] bg-gray-900 px-8 py-10 text-white shadow-2xl shadow-cyan-950/20 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Darmowy generator faktur
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Wygeneruj fakture online w kilka minut.
                </h1>
                <p className="max-w-2xl text-lg text-gray-300">
                  Uzupełnij dane sprzedawcy i klienta, ustaw stawkę VAT i od razu przygotuj czysty podgląd do wydruku.
                  Bez logowania i bez instalacji.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-cyan-200">Tryb pracy</p>
                  <p className="mt-2 text-xl font-semibold">100% w przegladarce</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-cyan-200">Szablon</p>
                  <p className="mt-2 text-xl font-semibold">FV netto + VAT</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-cyan-200">Kolejny krok</p>
                  <p className="mt-2 text-xl font-semibold">Przejscie do KSeF-ready workflow</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-cyan-200">Podsumowanie</p>
                  <p className="text-2xl font-semibold">{formatCurrency(totals.gross)}</p>
                </div>
              </div>
              <dl className="mt-6 space-y-4 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <dt>Netto</dt>
                  <dd>{formatCurrency(totals.net)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>VAT</dt>
                  <dd>{formatCurrency(totals.vat)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Termin platnosci</dt>
                  <dd>{form.dueDate}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Metoda</dt>
                  <dd>{form.paymentMethod}</dd>
                </div>
              </dl>
              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  <Download className="h-4 w-4" />
                  Drukuj / zapisz jako PDF
                </button>
                <Link
                  href="/rejestracja"
                  onClick={() => posthog.capture('invoice_generator_signup_cta_clicked')}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Potrzebujesz pelnego workflow? Zaloz konto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6 rounded-[2rem] border border-gray-200 bg-white/90 p-6 shadow-lg shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-600 dark:text-cyan-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Edytor faktury</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wszystkie obliczenia aktualizuja sie na zywo.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>Numer faktury</span>
                <input
                  value={form.invoiceNumber}
                  onChange={handleFieldChange("invoiceNumber")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Metoda platnosci</span>
                <select
                  value={form.paymentMethod}
                  onChange={handleFieldChange("paymentMethod")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950"
                >
                  <option>Przelew 7 dni</option>
                  <option>Przelew 14 dni</option>
                  <option>Gotowka</option>
                  <option>Karta</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Data wystawienia</span>
                <input
                  type="date"
                  value={form.issueDate}
                  onChange={handleFieldChange("issueDate")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>Data sprzedazy</span>
                <input
                  type="date"
                  value={form.saleDate}
                  onChange={handleFieldChange("saleDate")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
              <label className="space-y-2 text-sm font-medium md:col-span-2">
                <span>Termin platnosci</span>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={handleFieldChange("dueDate")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Sprzedawca</h3>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Nazwa</span>
                  <input value={form.seller.name} onChange={(event) => updateParty("seller", "name", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Adres</span>
                  <input value={form.seller.address} onChange={(event) => updateParty("seller", "address", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Miasto</span>
                  <input value={form.seller.city} onChange={(event) => updateParty("seller", "city", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>NIP</span>
                  <input value={form.seller.nip} onChange={(event) => updateParty("seller", "nip", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
              </div>

              <div className="space-y-4 rounded-3xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-lg font-semibold">Nabywca</h3>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Nazwa</span>
                  <input value={form.buyer.name} onChange={(event) => updateParty("buyer", "name", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Adres</span>
                  <input value={form.buyer.address} onChange={(event) => updateParty("buyer", "address", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>Miasto</span>
                  <input value={form.buyer.city} onChange={(event) => updateParty("buyer", "city", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="block space-y-2 text-sm font-medium">
                  <span>NIP</span>
                  <input value={form.buyer.nip} onChange={(event) => updateParty("buyer", "nip", event.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-gray-200 p-5 dark:border-gray-800">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Pozycja</span>
                  <input value={form.itemName} onChange={handleFieldChange("itemName")} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Ilosc</span>
                  <input value={form.quantity} onChange={handleFieldChange("quantity")} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Jednostka</span>
                  <input value={form.unit} onChange={handleFieldChange("unit")} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Cena netto</span>
                  <input value={form.unitPriceNet} onChange={handleFieldChange("unitPriceNet")} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>VAT %</span>
                  <select value={form.vatRate} onChange={handleFieldChange("vatRate")} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white dark:border-gray-700 dark:bg-gray-950">
                    <option value="23">23%</option>
                    <option value="8">8%</option>
                    <option value="5">5%</option>
                    <option value="0">0%</option>
                    <option value="zw">zw</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg shadow-gray-200/40 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none print:shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-dashed border-gray-300 pb-6 dark:border-gray-700">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">KsięgaI demo</p>
                <h2 className="mt-2 text-3xl font-semibold">Faktura VAT</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Numer {form.invoiceNumber}</p>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Data wystawienia</span>
                  <span>{form.issueDate}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Data sprzedazy</span>
                  <span>{form.saleDate}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-gray-500">Termin platnosci</span>
                  <span>{form.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-gray-50 p-5 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Sprzedawca</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="font-semibold">{form.seller.name}</p>
                  <p>{form.seller.address}</p>
                  <p>{form.seller.city}</p>
                  <p>NIP {form.seller.nip}</p>
                </div>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5 dark:bg-gray-950">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Nabywca</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="font-semibold">{form.buyer.name}</p>
                  <p>{form.buyer.address}</p>
                  <p>{form.buyer.city}</p>
                  <p>NIP {form.buyer.nip}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-950">
                  <tr>
                    <th className="px-4 py-3 font-medium">Pozycja</th>
                    <th className="px-4 py-3 font-medium">Ilosc</th>
                    <th className="px-4 py-3 font-medium">Cena netto</th>
                    <th className="px-4 py-3 font-medium">VAT</th>
                    <th className="px-4 py-3 font-medium">Wartosc brutto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="px-4 py-4">{form.itemName}</td>
                    <td className="px-4 py-4">
                      {totals.quantity} {form.unit}
                    </td>
                    <td className="px-4 py-4">{formatCurrency(totals.net)}</td>
                    <td className="px-4 py-4">{form.vatRate === "zw" ? "zw" : `${form.vatRate}%`}</td>
                    <td className="px-4 py-4">{formatCurrency(totals.gross)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-4 md:justify-items-end">
              <div className="w-full max-w-sm rounded-3xl bg-cyan-50 p-5 dark:bg-cyan-500/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Razem netto</span>
                  <span className="font-medium">{formatCurrency(totals.net)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">VAT</span>
                  <span className="font-medium">{formatCurrency(totals.vat)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-cyan-200 pt-4 text-base font-semibold dark:border-cyan-500/20">
                  <span>Do zaplaty</span>
                  <span>{formatCurrency(totals.gross)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-5 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              To jest wersja demonstracyjna generatora w `ksiegai-next`. Jesli potrzebujesz historii dokumentow, wysylki,
              archiwum i procesu KSeF, przejdz do aplikacji po rejestracji.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
