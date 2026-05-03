# Anonymous Generator Recovery Flow

`/darmowy-generator-faktur` stays public and accountless, but generated invoices are now persisted server-side before PDF download.

Flow:
- `ksiegai-next` calls the public Supabase Edge Function `store-anonymous-invoice`
- the function stores an immutable snapshot in `public.anonymous_generated_invoices`
- rows are keyed by seller NIP plus a client submission UUID
- if the user explicitly opts into newsletter/offers, the same request also upserts `newsletter_subscribers`
  with metadata linking the email to the seller NIP used in the generator
- nothing is attached to `public.invoices` yet, because a real `business_profile_id` does not exist at public-page time
- when the user later saves a business profile with the same NIP inside `ksef-ai`, `claim_anonymous_generator_invoices` creates the real `customers`, `invoices`, and `invoice_items` rows and marks the staging row as claimed
- when the authenticated user later saves that business profile, `link_newsletter_subscriber_to_business_profile` can bind the opted-in newsletter row to the created account if both email and seller NIP match

Safety rules:
- only rows with `claimed_at is null` can be attached
- claimed rows are never reassigned
- direct table access stays locked behind RLS; the public page writes only through the dedicated Edge Function
- newsletter consent is explicit and optional; the checkbox must be ticked before any marketing subscription row is created
