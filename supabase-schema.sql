-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────────────────────
create table public.profiles (
  id           uuid        primary key references auth.users(id) on delete cascade,
  display_name text,
  currency     text        not null default 'CLP',
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users own their profile"
  on public.profiles
  for all
  using (auth.uid() = id);

-- ─── Categories ──────────────────────────────────────────────────────────────
create table public.categories (
  id         uuid        primary key default uuid_generate_v4(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  name       text        not null,
  emoji      text        not null default '📦',
  color      text        not null default '#6b6050',
  budget     integer,
  sort_order smallint    not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, name)
);

alter table public.categories enable row level security;

create policy "Users own their categories"
  on public.categories
  for all
  using (auth.uid() = user_id);

-- ─── Invoices ────────────────────────────────────────────────────────────────
create table public.invoices (
  id               uuid           primary key default uuid_generate_v4(),
  user_id          uuid           not null references auth.users(id) on delete cascade,
  storage_path     text,
  file_name        text,
  mime_type        text,
  ai_raw_response  jsonb,
  ai_confidence    numeric(4, 3),
  status           text           not null default 'pending'
                                  check (status in ('pending', 'confirmed', 'error')),
  created_at       timestamptz    not null default now()
);

alter table public.invoices enable row level security;

create policy "Users own their invoices"
  on public.invoices
  for all
  using (auth.uid() = user_id);

-- ─── Transactions ─────────────────────────────────────────────────────────────
create table public.transactions (
  id          uuid        primary key default uuid_generate_v4(),
  user_id     uuid        not null references auth.users(id) on delete cascade,
  invoice_id  uuid        references public.invoices(id) on delete set null,
  category_id uuid        not null references public.categories(id),
  merchant    text        not null,
  amount      integer     not null,
  txn_date    date        not null,
  notes       text,
  created_at  timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Users own their transactions"
  on public.transactions
  for all
  using (auth.uid() = user_id);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
create index on public.transactions (user_id, txn_date desc);
create index on public.transactions (user_id, category_id);
create index on public.transactions (invoice_id);

-- ─── Trigger: seed profile + default categories on new user signup ────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Create profile row
  insert into public.profiles (id)
  values (new.id);

  -- Seed default categories
  insert into public.categories (user_id, name, emoji, color, sort_order)
  values
    (new.id, 'Hogar',           '🏠', '#c9a255', 1),
    (new.id, 'Alimentación',    '🛒', '#5aad74', 2),
    (new.id, 'Transporte',      '🚗', '#4f82c4', 3),
    (new.id, 'Entretenimiento', '🎬', '#c47db0', 4),
    (new.id, 'Salud',           '❤️',  '#c85555', 5),
    (new.id, 'Otros',           '📦', '#6b6050', 6);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
