"use client";

import { useEffect, useRef, useState } from "react";
import { PictureInPicture2, X } from "lucide-react";

declare global {
  interface Window {
    documentPictureInPicture?: {
      requestWindow: (options?: { width?: number; height?: number }) => Promise<Window>;
    };
  }
}

type AnonymousInvoicePdfPreviewProps = {
  pdfBlob: Blob | null;
};

export default function AnonymousInvoicePdfPreview({ pdfBlob }: AnonymousInvoicePdfPreviewProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [pipSupported, setPipSupported] = useState(false);
  const [pipActive, setPipActive] = useState(false);
  const embedRef = useRef<HTMLEmbedElement | null>(null);
  const pipWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    setPipSupported(typeof window !== "undefined" && "documentPictureInPicture" in window);
  }, []);

  useEffect(() => {
    if (!pdfBlob) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(pdfBlob);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfBlob]);

  useEffect(() => {
    return () => {
      pipWindowRef.current?.close();
    };
  }, []);

  const openPip = async () => {
    if (!window.documentPictureInPicture || !embedRef.current) return;
    try {
      const pipWindow = await window.documentPictureInPicture.requestWindow({ width: 420, height: 560 });
      pipWindowRef.current = pipWindow;
      pipWindow.document.body.style.margin = "0";
      pipWindow.document.body.append(embedRef.current);
      setPipActive(true);
      pipWindow.addEventListener("pagehide", () => {
        setPipActive(false);
        pipWindowRef.current = null;
      });
    } catch (error) {
      console.warn("Document Picture-in-Picture failed, staying inline:", error);
    }
  };

  if (!objectUrl) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Podgląd faktury</p>
        {pipSupported && (
          <button
            type="button"
            onClick={pipActive ? () => pipWindowRef.current?.close() : openPip}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {pipActive ? <X className="h-3.5 w-3.5" /> : <PictureInPicture2 className="h-3.5 w-3.5" />}
            {pipActive ? "Zamknij podgląd" : "Otwórz w osobnym oknie"}
          </button>
        )}
      </div>
      <div className={pipActive ? "hidden" : "block"}>
        <embed
          ref={embedRef}
          src={objectUrl}
          type="application/pdf"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
          style={{ height: "420px" }}
        />
      </div>
    </div>
  );
}
