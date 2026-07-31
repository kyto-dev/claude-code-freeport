# Freeport

A personal finance tracker (Next.js + Supabase) for logging income, expenses, and budgets, with AI-assisted receipt/invoice capture via the Anthropic API. UI is in Spanish, default currency is CLP.

> **Status:** early scaffold. Auth, dashboard, categories, trends, and upload pages are UI shells (`... coming soon`) — Supabase auth/data wiring is not implemented yet (see `src/app/(auth)/login/page.tsx`).

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in the values, see Configuration below
npm run dev                  # http://localhost:3000
```

Other scripts (from `package.json`):

```bash
npm run build   # next build
npm run start   # next start (serve production build)
npm run lint    # next lint
```

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `ANTHROPIC_API_KEY` | Anthropic API key, used server-side for invoice data extraction (`@anthropic-ai/sdk` is in `package.json`; wiring not yet implemented) |

## Database

`supabase-schema.sql` at the repo root is the schema (run it against a Supabase project, e.g. via the SQL editor or `psql`). It defines, with RLS enabled on every table and policies scoping rows to `auth.uid()`:

- `profiles` — one row per user, `currency` defaults to `CLP`
- `categories` — user-owned spending categories (emoji, color, optional budget); a trigger seeds Spanish defaults (Hogar, Alimentación, Transporte, Entretenimiento, Salud, Otros) on signup
- `invoices` — uploaded receipt/invoice files plus the raw AI extraction (`ai_raw_response`, `ai_confidence`) and a `pending | confirmed | error` status
- `transactions` — spend records, optionally linked back to the invoice they came from

There is no `supabase/migrations/` folder yet — this file is the only source of schema.

## Project structure

```
src/
  app/
    (app)/        # dashboard, categories, trends, upload — protected shell pages
    (auth)/       # login, register
  components/
    layout/       # Sidebar (nav: Resumen, Categorías, Tendencias, Subir Factura)
  lib/
    supabase/     # client.ts (browser) and server.ts (SSR) Supabase clients
    types.ts      # Profile, Category, Invoice, Transaction, ExtractedInvoiceData
```

Route groups `(app)` and `(auth)` split the shell layout from the auth pages, per Next.js App Router convention.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Supabase (`@supabase/supabase-js`, `@supabase/ssr`) · Anthropic SDK · Zustand · React Hook Form + Zod

No CI workflow, Dockerfile, or deploy config is present in this repo yet.
