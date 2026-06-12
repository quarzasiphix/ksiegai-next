# ksiegai-next Supabase Migrations
Created: 2026-05-25 16:38 CEST
Last modified: 2026-05-25 16:38 CEST

Shared KsięgaI Supabase migrations were moved to:

- [ksef-ai/supabase/migrations](/p/k/ksef-ai/supabase/migrations)

Rules:

- do not add shared backend migrations in `ksiegai-next/`
- add all schema/RPC/RLS/Edge-function-adjacent SQL for this shared Supabase project under `ksef-ai/supabase/migrations/`
- keep this directory as a marker only unless `ksiegai-next` ever gets a truly separate Supabase project
