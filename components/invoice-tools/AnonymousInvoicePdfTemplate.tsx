import {
  type AnonymousInvoiceDraft,
  formatCurrency,
  formatTaxId,
  getInvoiceTotals,
  getItemTotals,
} from "@/lib/invoice-tools/anonymousInvoice";

type AnonymousInvoicePdfTemplateProps = {
  draft: AnonymousInvoiceDraft;
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "794px",
    minHeight: "1123px",
    background: "#ffffff",
    color: "#0f172a",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
    padding: "40px 36px 48px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "28px",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    margin: 0,
    fontSize: "38px",
    lineHeight: 1.1,
    fontWeight: 700,
    color: "#0f172a",
  },
  eyebrow: {
    margin: 0,
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  metaCard: {
    minWidth: "260px",
    border: "1px solid #bfdbfe",
    background: "#eff6ff",
    borderRadius: "16px",
    padding: "18px 20px",
    boxSizing: "border-box",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    fontSize: "14px",
    lineHeight: 1.5,
    marginBottom: "8px",
  },
  metaLabel: {
    color: "#475569",
  },
  metaValue: {
    color: "#0f172a",
    fontWeight: 600,
    textAlign: "right",
  },
  parties: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "28px",
  },
  partyCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "20px 22px",
    background: "#f8fafc",
    minHeight: "190px",
    boxSizing: "border-box",
  },
  partyLabel: {
    margin: "0 0 12px",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  partyName: {
    margin: "0 0 10px",
    fontSize: "22px",
    lineHeight: 1.25,
    fontWeight: 700,
  },
  partyText: {
    margin: "0 0 6px",
    color: "#334155",
    fontSize: "15px",
    lineHeight: 1.45,
  },
  sectionTitle: {
    margin: "0 0 14px",
    fontSize: "18px",
    lineHeight: 1.2,
    fontWeight: 700,
    color: "#0f172a",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "24px",
  },
  tableHead: {
    background: "#e2e8f0",
  },
  th: {
    textAlign: "left",
    fontSize: "13px",
    fontWeight: 700,
    color: "#0f172a",
    padding: "12px 10px",
    borderBottom: "1px solid #cbd5e1",
  },
  td: {
    fontSize: "14px",
    color: "#0f172a",
    padding: "12px 10px",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top",
  },
  textRight: {
    textAlign: "right",
  },
  summaryWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "24px",
  },
  notesCard: {
    flex: 1,
    minHeight: "120px",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    padding: "18px 20px",
    background: "#ffffff",
    boxSizing: "border-box",
  },
  summaryCard: {
    width: "300px",
    border: "1px solid #bfdbfe",
    borderRadius: "18px",
    padding: "18px 20px",
    background: "#eff6ff",
    boxSizing: "border-box",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    fontSize: "15px",
    lineHeight: 1.5,
    marginBottom: "8px",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid #93c5fd",
    fontSize: "20px",
    lineHeight: 1.3,
    fontWeight: 700,
    color: "#0f172a",
  },
  footer: {
    marginTop: "36px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "12px",
    lineHeight: 1.5,
  },
};

function renderPartyLines(party: AnonymousInvoiceDraft["seller"]) {
  return [
    party.taxId ? `NIP: ${formatTaxId(party.taxId)}` : "NIP: -",
    party.street || "Adres: -",
    [party.postalCode, party.city].filter(Boolean).join(" ") || "Kod pocztowy i miasto: -",
    party.email || "",
  ].filter(Boolean);
}

export default function AnonymousInvoicePdfTemplate({ draft }: AnonymousInvoicePdfTemplateProps) {
  const totals = getInvoiceTotals(draft.items);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.titleWrap}>
          <p style={styles.eyebrow}>KsięgaI</p>
          <h1 style={styles.title}>Faktura VAT</h1>
        </div>

        <div style={styles.metaCard}>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Numer</span>
            <span style={styles.metaValue}>{draft.invoiceNumber}</span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Data wystawienia</span>
            <span style={styles.metaValue}>{draft.issueDate}</span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Data sprzedaży</span>
            <span style={styles.metaValue}>{draft.saleDate}</span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Termin płatności</span>
            <span style={styles.metaValue}>{draft.dueDate}</span>
          </div>
          <div style={{ ...styles.metaRow, marginBottom: 0 }}>
            <span style={styles.metaLabel}>Sposób płatności</span>
            <span style={styles.metaValue}>{draft.paymentMethod}</span>
          </div>
        </div>
      </div>

      <div style={styles.parties}>
        <div style={styles.partyCard}>
          <p style={styles.partyLabel}>Sprzedawca</p>
          <p style={styles.partyName}>{draft.seller.name || "Brak nazwy"}</p>
          {renderPartyLines(draft.seller).map((line) => (
            <p key={`seller-${line}`} style={styles.partyText}>
              {line}
            </p>
          ))}
        </div>

        <div style={styles.partyCard}>
          <p style={styles.partyLabel}>Nabywca</p>
          <p style={styles.partyName}>{draft.buyer.name || "Brak nazwy"}</p>
          {renderPartyLines(draft.buyer).map((line) => (
            <p key={`buyer-${line}`} style={styles.partyText}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <p style={styles.sectionTitle}>Pozycje faktury</p>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.th}>Lp.</th>
            <th style={styles.th}>Pozycja</th>
            <th style={{ ...styles.th, ...styles.textRight }}>Ilość</th>
            <th style={{ ...styles.th, ...styles.textRight }}>Cena netto</th>
            <th style={{ ...styles.th, ...styles.textRight }}>VAT</th>
            <th style={{ ...styles.th, ...styles.textRight }}>Netto</th>
            <th style={{ ...styles.th, ...styles.textRight }}>Brutto</th>
          </tr>
        </thead>
        <tbody>
          {draft.items.map((item, index) => {
            const itemTotals = getItemTotals(item);
            return (
              <tr key={item.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.name || "Pozycja"}</td>
                <td style={{ ...styles.td, ...styles.textRight }}>
                  {item.quantity.toFixed(2)} {item.unit}
                </td>
                <td style={{ ...styles.td, ...styles.textRight }}>{formatCurrency(item.unitPrice)}</td>
                <td style={{ ...styles.td, ...styles.textRight }}>{item.vatRate}%</td>
                <td style={{ ...styles.td, ...styles.textRight }}>{formatCurrency(itemTotals.net)}</td>
                <td style={{ ...styles.td, ...styles.textRight }}>{formatCurrency(itemTotals.gross)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={styles.summaryWrap}>
        <div style={styles.notesCard}>
          <p style={styles.sectionTitle}>Uwagi</p>
          <p style={{ ...styles.partyText, margin: 0 }}>{draft.notes.trim() || "Brak dodatkowych uwag."}</p>
        </div>

        <div style={styles.summaryCard}>
          <p style={styles.sectionTitle}>Podsumowanie</p>
          <div style={styles.summaryRow}>
            <span>Razem netto</span>
            <span>{formatCurrency(totals.net)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Razem VAT</span>
            <span>{formatCurrency(totals.vat)}</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Do zapłaty</span>
            <span>{formatCurrency(totals.gross)}</span>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        Dokument wygenerowany lokalnie w KsięgaI bez zakładania konta. Dane pozostają w tej przeglądarce, dopóki nie
        zdecydujesz się ich zapisać lub utworzyć konta.
      </div>
    </div>
  );
}
