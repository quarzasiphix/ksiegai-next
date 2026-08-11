// Post-signup/claim redirect target for every invite entry surface
// (rejestracja, logowanie, auth/callback, InviteRegistrationPage). All of
// them land the user on `/onboard/invite` — the app repo's "Sprawdź dane
// firmy" review screen — never a wizard route directly. That screen shows
// the prefilled company data and a "Potwierdź i przejdź do samouczka" /
// "Potwierdź i skonfiguruj [type]" button; only *its own* handleConfirm (in
// ksef-ai, a separate same-named function in
// ksef-ai/src/shared/lib/inviteOnboarding.ts) computes the actual
// per-entity-type wizard path (`/onboard/jdg`, `/onboard/spolka`, etc.) and
// navigates there with `autoAccept` state. Skipping straight to the wizard
// route from here bypasses that confirmation step entirely — confirmed bug,
// fixed 2026-08-05 (previously this function computed the wizard path
// itself, which every one of the 6 call sites below then fed straight into
// redirectToApp).
export function getInviteOnboardingPath(_companyType?: string | null): string {
  return "/onboard/invite";
}
