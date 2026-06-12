export const PUBLIC_PRICING = {
  jdg: {
    name: "JDG Start",
    monthlyPricePln: 49,
  },
  spolkaStandard: {
    name: "Spółka Standard",
    monthlyPricePln: 89,
    annualPricePln: 999,
    annualSavingsPln: 69,
  },
} as const;

export function formatPln(amount: number): string {
  return `${amount} zł`;
}

export function formatPlnMonthly(amount: number): string {
  return `${formatPln(amount)}/miesiąc`;
}

export function formatPlnMonthlyShort(amount: number): string {
  return `${formatPln(amount)}/mies.`;
}

export function formatPlnAnnual(amount: number): string {
  return `${formatPln(amount)}/rok`;
}
