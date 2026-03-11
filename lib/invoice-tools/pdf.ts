import {
  type AnonymousInvoiceDraft,
  buildInvoiceFilename,
  formatCurrency,
  formatTaxId,
  getInvoiceTotals,
  getItemTotals,
} from "@/lib/invoice-tools/anonymousInvoice";

const PAGE_WIDTH = 1240;
const PAGE_HEIGHT = 1754;

export const downloadAnonymousInvoicePdf = async (draft: AnonymousInvoiceDraft) => {
  const canvas = renderInvoiceCanvas(draft);
  const jpegBlob = await canvasToJpegBlob(canvas);
  const pdfBlob = await createPdfFromJpeg(jpegBlob, canvas.width, canvas.height);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = buildInvoiceFilename(draft.invoiceNumber);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 300);
};

const renderInvoiceCanvas = (draft: AnonymousInvoiceDraft) => {
  const canvas = document.createElement("canvas");
  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Brak wsparcia dla generowania PDF w tej przeglądarce.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#0f172a";
  context.font = "bold 56px Arial";
  context.fillText("FAKTURA VAT", 80, 100);

  context.fillStyle = "#2563eb";
  context.fillRect(80, 130, 1080, 8);

  context.fillStyle = "#475569";
  context.font = "24px Arial";
  context.fillText(`Numer: ${draft.invoiceNumber}`, 80, 190);
  context.fillText(`Data wystawienia: ${draft.issueDate}`, 80, 228);
  context.fillText(`Data sprzedaży: ${draft.saleDate}`, 80, 266);
  context.fillText(`Termin płatności: ${draft.dueDate}`, 80, 304);
  context.fillText(`Sposób płatności: ${draft.paymentMethod}`, 80, 342);

  drawPartyCard(context, {
    x: 80,
    y: 400,
    title: "Sprzedawca",
    party: draft.seller,
  });

  drawPartyCard(context, {
    x: 650,
    y: 400,
    title: "Nabywca",
    party: draft.buyer,
  });

  const tableTop = 660;
  drawTableHeader(context, tableTop);

  let rowY = tableTop + 72;
  draft.items.forEach((item, index) => {
    const totals = getItemTotals(item);
    drawTableRow(context, {
      y: rowY,
      index: index + 1,
      name: item.name || "Pozycja",
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      vatRate: item.vatRate,
      net: totals.net,
      gross: totals.gross,
    });
    rowY += 66;
  });

  const invoiceTotals = getInvoiceTotals(draft.items);
  const summaryTop = Math.max(rowY + 40, 1180);
  drawSummaryCard(context, {
    x: 740,
    y: summaryTop,
    totals: invoiceTotals,
  });

  if (draft.notes.trim()) {
    context.fillStyle = "#0f172a";
    context.font = "bold 22px Arial";
    context.fillText("Uwagi", 80, summaryTop + 28);
    context.fillStyle = "#475569";
    context.font = "20px Arial";
    wrapText(context, draft.notes, 80, summaryTop + 66, 520, 30);
  }

  context.fillStyle = "#94a3b8";
  context.font = "20px Arial";
  context.fillText(
    "Dokument wygenerowany lokalnie w KsięgaI. Dane nie są zapisywane na serwerze bez Twojego konta.",
    80,
    1670,
  );

  context.fillText("ksiegai.pl/darmowy-generator-faktur", 80, 1708);

  return canvas;
};

const drawPartyCard = (
  context: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    title: string;
    party: AnonymousInvoiceDraft["seller"];
  },
) => {
  context.fillStyle = "#f8fafc";
  context.strokeStyle = "#cbd5e1";
  context.lineWidth = 2;
  context.fillRect(options.x, options.y, 490, 210);
  context.strokeRect(options.x, options.y, 490, 210);

  context.fillStyle = "#2563eb";
  context.font = "bold 26px Arial";
  context.fillText(options.title, options.x + 24, options.y + 38);

  context.fillStyle = "#0f172a";
  context.font = "bold 24px Arial";
  context.fillText(options.party.name || "Brak nazwy", options.x + 24, options.y + 82);

  context.fillStyle = "#475569";
  context.font = "22px Arial";
  const lines = [
    options.party.taxId ? `NIP: ${formatTaxId(options.party.taxId)}` : "NIP: -",
    options.party.street || "Adres: -",
    [options.party.postalCode, options.party.city].filter(Boolean).join(" ") || "Kod i miasto: -",
    options.party.email || "",
  ].filter(Boolean);

  lines.forEach((line, index) => {
    context.fillText(line, options.x + 24, options.y + 118 + index * 30);
  });
};

const drawTableHeader = (context: CanvasRenderingContext2D, top: number) => {
  context.fillStyle = "#e2e8f0";
  context.fillRect(80, top, 1080, 52);

  context.fillStyle = "#0f172a";
  context.font = "bold 20px Arial";
  context.fillText("Lp.", 96, top + 34);
  context.fillText("Pozycja", 150, top + 34);
  context.fillText("Ilość", 650, top + 34);
  context.fillText("Cena netto", 760, top + 34);
  context.fillText("VAT", 930, top + 34);
  context.fillText("Brutto", 1020, top + 34);
};

const drawTableRow = (
  context: CanvasRenderingContext2D,
  row: {
    y: number;
    index: number;
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    vatRate: number;
    net: number;
    gross: number;
  },
) => {
  context.strokeStyle = "#e2e8f0";
  context.lineWidth = 1;
  context.strokeRect(80, row.y - 34, 1080, 52);

  context.fillStyle = "#0f172a";
  context.font = "20px Arial";
  context.fillText(String(row.index), 96, row.y);
  wrapText(context, row.name, 150, row.y, 450, 24, 1);
  context.fillText(`${row.quantity.toFixed(2)} ${row.unit}`.trim(), 650, row.y);
  context.fillText(formatCurrency(row.net / Math.max(row.quantity || 1, 1)), 760, row.y);
  context.fillText(`${row.vatRate}%`, 940, row.y);
  context.fillText(formatCurrency(row.gross), 1020, row.y);
};

const drawSummaryCard = (
  context: CanvasRenderingContext2D,
  options: {
    x: number;
    y: number;
    totals: ReturnType<typeof getInvoiceTotals>;
  },
) => {
  context.fillStyle = "#eff6ff";
  context.strokeStyle = "#93c5fd";
  context.lineWidth = 2;
  context.fillRect(options.x, options.y, 420, 180);
  context.strokeRect(options.x, options.y, 420, 180);

  context.fillStyle = "#1d4ed8";
  context.font = "bold 26px Arial";
  context.fillText("Podsumowanie", options.x + 24, options.y + 40);

  context.fillStyle = "#334155";
  context.font = "22px Arial";
  context.fillText(`Netto: ${formatCurrency(options.totals.net)}`, options.x + 24, options.y + 84);
  context.fillText(`VAT: ${formatCurrency(options.totals.vat)}`, options.x + 24, options.y + 118);

  context.fillStyle = "#0f172a";
  context.font = "bold 30px Arial";
  context.fillText(`Do zapłaty: ${formatCurrency(options.totals.gross)}`, options.x + 24, options.y + 160);
};

const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
) => {
  const words = text.split(/\s+/);
  let line = "";
  let currentLine = 0;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width <= maxWidth) {
      line = testLine;
      continue;
    }

    context.fillText(line, x, y + currentLine * lineHeight);
    currentLine += 1;
    if (currentLine >= maxLines) {
      return;
    }
    line = word;
  }

  if (line && currentLine < maxLines) {
    context.fillText(line, x, y + currentLine * lineHeight);
  }
};

const canvasToJpegBlob = async (canvas: HTMLCanvasElement) => {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((value) => resolve(value), "image/jpeg", 0.95);
  });

  if (!blob) {
    throw new Error("Nie udało się przygotować obrazu faktury.");
  }

  return blob;
};

const createPdfFromJpeg = async (jpegBlob: Blob, width: number, height: number) => {
  const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
  const objects: Uint8Array[] = [];
  const offsets: number[] = [];

  const encoder = new TextEncoder();
  const pushObject = (content: string | Uint8Array) => {
    const body = typeof content === "string" ? encoder.encode(content) : content;
    objects.push(body);
  };

  pushObject("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  pushObject("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  pushObject(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
  );

  const imageHeader = encoder.encode(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
  );
  const imageFooter = encoder.encode("\nendstream\nendobj\n");
  pushObject(joinBuffers([imageHeader, jpegBytes, imageFooter]));

  const contentStream = "q\n595 0 0 842 0 0 cm\n/Im0 Do\nQ\n";
  pushObject(`5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`);

  let size = encoder.encode("%PDF-1.4\n").length;
  objects.forEach((object) => {
    offsets.push(size);
    size += object.length;
  });

  const xrefStart = size;
  const xrefLines = ["xref", `0 ${objects.length + 1}`, "0000000000 65535 f "];
  offsets.forEach((offset) => {
    xrefLines.push(`${String(offset).padStart(10, "0")} 00000 n `);
  });

  const xref = encoder.encode(`${xrefLines.join("\n")}\n`);
  const trailer = encoder.encode(
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`,
  );

  return new Blob([toBlobPart(encoder.encode("%PDF-1.4\n")), ...objects.map(toBlobPart), toBlobPart(xref), toBlobPart(trailer)], {
    type: "application/pdf",
  });
};

const joinBuffers = (chunks: Uint8Array[]) => {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });

  return result;
};

const toBlobPart = (value: Uint8Array) => Uint8Array.from(value);
