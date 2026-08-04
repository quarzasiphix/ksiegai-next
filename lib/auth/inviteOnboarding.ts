export function getInviteOnboardingPath(companyType?: string | null): string {
  const normalized = (companyType ?? "").toLowerCase();

  if (normalized === "jdg" || normalized === "dzialalnosc") {
    return "/onboard/jdg";
  }

  if (normalized === "stowarzyszenie") {
    return "/onboard/stowarzyszenie";
  }

  if (normalized === "fundacja") {
    return "/onboard/fundacja";
  }

  return "/onboard/spolka";
}
