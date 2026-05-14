-- legal_documents table for admin-editable legal/policy pages
create table if not exists legal_documents (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,           -- e.g. 'regulamin', 'polityka-prywatnosci', 'rodo', 'polityka-zwrotow'
  title text not null,
  content_markdown text not null default '',
  effective_date date not null default current_date,
  version text not null default '1.0',
  is_published boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_legal_documents_ts()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger trg_legal_documents_updated_at
before update on legal_documents
for each row execute function update_legal_documents_ts();

-- RLS
alter table legal_documents enable row level security;

-- Public reads only published docs
create policy "legal_docs_public_read"
on legal_documents for select
to anon, authenticated
using (is_published = true);

-- Admin users can manage all docs
create policy "legal_docs_admin_all"
on legal_documents for all
to authenticated
using (
  exists (
    select 1 from admin_users
    where admin_users.user_id = auth.uid()
      and admin_users.is_active = true
      and admin_users.role in ('admin', 'super_admin')
  )
)
with check (
  exists (
    select 1 from admin_users
    where admin_users.user_id = auth.uid()
      and admin_users.is_active = true
      and admin_users.role in ('admin', 'super_admin')
  )
);
