export function getInviteOnboardingPath(companyType?: string | null): string {
  const normalized = (companyType ?? "").toLowerCase();

  if (normalized === "jdg" || normalized === "dzialalnosc") {
    return "/onboard/jdg";
  }

  return "/onboard/spolka";
}
