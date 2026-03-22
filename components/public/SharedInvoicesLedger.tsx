"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  fetchSharedInvoiceDocument,
  getSharedInvoiceAppUrl,
  type SharedInvoiceDocumentPayload,
  type SharedInvoiceListItem,
} from "@/lib/publicShare";

function formatPolishDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("pl-PL").format(date);
}

function formatMoney(amount?: number | null, currency?: string | null) {
  const resolvedCurrency = currency || "PLN";
  const numericAmount = typeof amount === "number" ? amount : 0;

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: resolvedCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

function buildInvoiceRows(payload: SharedInvoiceDocumentPayload): SharedInvoiceListItem[] {
  const rows: SharedInvoiceListItem[] = [];

  if (payload.invoice && payload.share?.slug) {
    rows.push({
      slug: payload.share.slug,
      id: String(payload.invoice.id),
      number: payload.invoice.number ?? null,
      issue_date: payload.invoice.issue_date ?? null,
      due_date: payload.invoice.due_date ?? null,
      total_gross_value:
        typeof payload.invoice.total_gross_value === "number"
          ? payload.invoice.total_gross_value
          : Number(payload.invoice.total_gross_value ?? 0),
      currency: payload.invoice.currency ?? "PLN",
      payment_status: payload.invoice.payment_status ?? null,
      is_paid:
        payload.invoice.is_paid === true || payload.invoice.is_paid === 1
          ? true
          : payload.invoice.is_paid === false || payload.invoice.is_paid === 0
            ? false
            : null,
      customer_name: payload.invoice?.customers?.name ?? null,
      customer_tax_id: payload.invoice?.customers?.tax_id ?? null,
      expires_at: payload.share.expires_at ?? null,
      view_once: payload.share.view_once,
      viewed_at: payload.share.viewed_at ?? null,
      created_at: payload.share.created_at,
    });
  }

  for (const invoice of payload.relatedInvoices || []) {
    rows.push(invoice);
  }

  const deduped = new Map<string, SharedInvoiceListItem>();
  for (const row of rows) {
    if (!row.slug) continue;
    deduped.set(row.slug, row);
  }

  return Array.from(deduped.values()).sort((left, right) => {
    const rightTs = new Date(right.issue_date || right.created_at || 0).getTime();
    const leftTs = new Date(left.issue_date || left.created_at || 0).getTime();
    return rightTs - leftTs;
  });
}

export default function SharedInvoicesLedger() {
  const searchParams = useSearchParams();
  const slug = (searchParams.get("slug") || "").trim();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<SharedInvoiceDocumentPayload | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!slug) {
        setPayload(null);
        setError("Brakuje identyfikatora udostępnionej faktury.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchSharedInvoiceDocument(slug);
        if (!active) return;
        setPayload(data);
      } catch (err: any) {
        if (!active) return;
        setPayload(null);
        setError(err?.message || "Nie udało się pobrać listy udostępnionych faktur.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [slug]);

  const invoiceRows = useMemo(() => {
    if (!payload) return [];
    return buildInvoiceRows(payload);
  }, [payload]);

  const customerName =
    payload?.invoice?.customers?.name ||
    invoiceRows[0]?.customer_name ||
    "Klient";

  const customerTaxId =
    payload?.invoice?.customers?.tax_id ||
    invoiceRows[0]?.customer_tax_id ||
    null;

  return (
    <section className="bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
                Udostępnione faktury
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Wszystkie udostępnione faktury klienta
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                  Ten widok pokazuje faktury, które zostały jawnie udostępnione temu samemu odbiorcy.
                  Lista jest zawężona do tego samego klienta i tego samego wystawcy.
                </p>
              </div>
            </div>
            {slug ? (
              <Link
                href={getSharedInvoiceAppUrl(slug)}
                className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
              >
                Wróć do otwartej faktury
              </Link>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Klient</div>
              <div className="mt-2 text-lg font-semibold text-white">{customerName}</div>
              <div className="mt-1 text-sm text-slate-300">
                {customerTaxId ? `NIP ${customerTaxId}` : "Brak NIP klienta w udostępnionej fakturze"}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Liczba faktur</div>
              <div className="mt-2 text-lg font-semibold text-white">{invoiceRows.length}</div>
              <div className="mt-1 text-sm text-slate-300">Widoczne są tylko aktywne linki do faktur.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Aktualny link</div>
              <div className="mt-2 break-all text-sm text-slate-200">{slug || "Brak slug"}</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center px-6 py-12 text-slate-300">
              Ładowanie udostępnionych faktur...
            </div>
          ) : error ? (
            <div className="space-y-4 px-6 py-10 text-slate-200">
              <h2 className="text-xl font-semibold text-white">Nie udało się otworzyć listy faktur</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">{error}</p>
              <p className="text-sm text-slate-400">
                Użyj pełnego linku z wiadomości e-mail albo wróć do konkretnej udostępnionej faktury i spróbuj ponownie.
              </p>
            </div>
          ) : invoiceRows.length === 0 ? (
            <div className="space-y-4 px-6 py-10 text-slate-200">
              <h2 className="text-xl font-semibold text-white">Brak innych udostępnionych faktur</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Dla tego odbiorcy nie ma obecnie innych aktywnych, jawnie udostępnionych faktur.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">Numer</th>
                    <th className="px-5 py-4 font-medium">Data wystawienia</th>
                    <th className="px-5 py-4 font-medium">Termin płatności</th>
                    <th className="px-5 py-4 font-medium">Kwota brutto</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium text-right">Akcja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoiceRows.map((invoice) => {
                    const isCurrent = invoice.slug === payload?.share?.slug;
                    const paid = invoice.is_paid === true || invoice.payment_status === "paid";

                    return (
                      <tr key={invoice.slug} className="transition hover:bg-white/[0.03]">
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">{invoice.number || "Bez numeru"}</span>
                            {isCurrent ? (
                              <span className="inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-0.5 text-[11px] font-medium text-cyan-200">
                                Otwarta faktura
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top text-slate-300">{formatPolishDate(invoice.issue_date)}</td>
                        <td className="px-5 py-4 align-top text-slate-300">{formatPolishDate(invoice.due_date)}</td>
                        <td className="px-5 py-4 align-top font-medium text-white">
                          {formatMoney(invoice.total_gross_value, invoice.currency)}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <span
                            className={
                              paid
                                ? "inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-200"
                                : "inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-200"
                            }
                          >
                            {paid ? "Opłacona" : "Do zapłaty"}
                          </span>
                        </td>
                        <td className="px-5 py-4 align-top text-right">
                          <Link
                            href={getSharedInvoiceAppUrl(invoice.slug)}
                            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
                          >
                            Otwórz fakturę
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
