import {
  type AnonymousInvoiceDraft,
  buildInvoiceFilename,
} from "@/lib/invoice-tools/anonymousInvoice";
import React from "react";
import AnonymousInvoicePdfTemplate from "@/components/invoice-tools/AnonymousInvoicePdfTemplate";

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

export const downloadAnonymousInvoicePdf = async (draft: AnonymousInvoiceDraft) => {
  const canvas = await renderInvoiceCanvas(draft);
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

const renderInvoiceCanvas = async (draft: AnonymousInvoiceDraft) => {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const markup = renderToStaticMarkup(React.createElement(AnonymousInvoicePdfTemplate, { draft }));
  const dataUrl = buildSvgDataUrl(markup, PAGE_WIDTH, PAGE_HEIGHT);
  const image = await loadImage(dataUrl);

  const canvas = document.createElement("canvas");
  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Brak wsparcia dla generowania PDF w tej przeglądarce.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
};

const buildSvgDataUrl = (markup: string, width: number, height: number) => {
  const escapedMarkup = markup
    .replace(/&nbsp;/g, "&#160;")
    .replace(/#/g, "%23")
    .replace(/\n/g, " ");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:#ffffff;">
          ${escapedMarkup}
        </div>
      </foreignObject>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Nie udało się wyrenderować szablonu PDF."));
    image.src = src;
  });

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
