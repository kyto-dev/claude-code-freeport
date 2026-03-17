# Freeport — Personal Finance App

## Project Overview
Personal finance control webapp. Users track income, expenses, budgets, and financial goals.

**Stack:** Next.js 14+ (App Router) · Supabase (auth + database) · TypeScript · Tailwind CSS

---

## Architecture

### Directory Structure
```
src/
  app/
    (auth)/          # Login, register — no layout wrapper
    dashboard/       # Protected pages
    api/             # Route handlers (server-side only)
  components/
    ui/              # Primitives: Button, Input, Badge, Card
    forms/           # Domain forms: TransactionForm, BudgetForm
    layout/          # Sidebar, Navbar, PageShell
  hooks/             # useTransactions, useBudgets, useAuth
  lib/
    supabase/        # Client + server Supabase instances
    validations/     # Zod schemas
  types/             # Domain types: Transaction, Budget, Category
  utils/             # Pure helpers: formatCurrency, dateRange
  styles/            # Global CSS, design tokens
```

### Data Flow
- Server Components fetch data directly via Supabase server client
- Client Components use custom hooks that call Supabase client (for realtime/interactivity)
- API routes are only used for webhooks or third-party integrations — not for basic CRUD

---

## Supabase

### Client Initialization
Always use the correct client for the context:

```ts
// src/lib/supabase/server.ts — Server Components, Route Handlers, Server Actions
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: ... } }
  )
}

// src/lib/supabase/client.ts — Client Components only
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Row Level Security (RLS)
**All tables MUST have RLS enabled.** Every finance record belongs to a user.

Standard policy pattern:
```sql
-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "users_own_data" ON transactions
  FOR ALL USING (auth.uid() = user_id);
```

Never bypass RLS with the service role key on the client side. Use service role only in trusted server environments (e.g., admin webhooks).

### Database Conventions
- All tables have `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`
- All tables have `user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- All tables have `created_at timestamptz DEFAULT now()` and `updated_at timestamptz DEFAULT now()`
- Use `updated_at` triggers, not manual updates in application code
- Monetary values stored as `integer` (cents), never `float`
- Currency codes stored as `text` (ISO 4217: `MXN`, `USD`, etc.)

### Migrations
- All schema changes go in `supabase/migrations/` as timestamped SQL files
- Never modify the database schema directly in production
- Migration naming: `YYYYMMDDHHMMSS_describe_change.sql`

---

## Next.js

### App Router Conventions
- Prefer Server Components by default — add `'use client'` only when needed (event handlers, hooks, browser APIs)
- Data fetching happens in Server Components or Server Actions, not in `useEffect`
- Use `loading.tsx` and `error.tsx` at each route segment
- Protect dashboard routes via middleware that checks the Supabase session

### Middleware (Auth Guard)
```ts
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...)
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = { matcher: ['/dashboard/:path*'] }
```

### Server Actions
Prefer Server Actions over API routes for form mutations:
```ts
'use server'

export async function createTransaction(formData: FormData) {
  const supabase = createClient() // server client
  const parsed = transactionSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }

  const { error } = await supabase.from('transactions').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
}
```

---

## TypeScript

### Domain Types
Define in `src/types/`. Mirror the database schema exactly:

```ts
// src/types/transaction.ts
export type TransactionType = 'income' | 'expense' | 'transfer'

export interface Transaction {
  id: string
  user_id: string
  amount: number        // always in cents
  currency: string      // ISO 4217
  type: TransactionType
  category_id: string
  description: string | null
  date: string          // ISO 8601 date
  created_at: string
  updated_at: string
}

export type NewTransaction = Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>
```

### Validation
Use Zod for all external input (forms, API payloads):
```ts
// src/lib/validations/transaction.ts
export const transactionSchema = z.object({
  amount: z.number().int().positive(),
  currency: z.string().length(3),
  type: z.enum(['income', 'expense', 'transfer']),
  category_id: z.string().uuid(),
  description: z.string().max(255).nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})
```

---

## Finance Domain Rules

### Money Handling
- **Never use floats for money.** Store and compute in integer cents.
- Display helper: `formatCurrency(cents: number, currency: string): string`
- Example: `1500` = `$15.00 MXN`

### Categories
- Categories are user-scoped (each user has their own, plus system defaults)
- System defaults are seeded via migration, not hardcoded in the app

### Budgets
- Budgets reference a category + month + year
- Spent amount is derived from transactions, never stored redundantly
- Use a Supabase view or function to compute `budget_with_spending`

---

## Security

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Env vars prefixed with `NEXT_PUBLIC_` are public — only anon key and URL go there
- Validate and sanitize all user input with Zod before any DB operation
- RLS is the last line of defense — always verify policies when adding tables
- No financial data in URL params or logs

---

## Code Style

- Components: PascalCase files (`TransactionCard.tsx`)
- Hooks: camelCase prefixed with `use` (`useTransactions.ts`)
- Utils: camelCase (`formatCurrency.ts`)
- Types: PascalCase interfaces, snake_case for DB column names
- No `any`. Use `unknown` and narrow types explicitly.
- Prefer `const` assertions and discriminated unions over loose string types

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server only, never expose to client
```

---

## Memory System

All project memory lives in `.claude/memory/`. Keep these files up to date across sessions so context is never lost.

### Files

| File | Purpose |
|---|---|
| `projectContext.md` | Stable product overview, tech stack, architecture decisions |
| `activeContext.md` | Current session state: what's in progress, open questions, blockers |
| `progress.md` | Phase and task checklist — check off completed items |
| `decisionLog.md` | Architecture/implementation decisions with rationale |
| `conventions.md` | Coding patterns and project-specific rules discovered during development |
| `sessionHistory.md` | One summary entry per session (date + what was done + next steps) |

### When to Write

| Event | File |
|---|---|
| Architectural or implementation decision made | `decisionLog.md` |
| Task completed or phase milestone reached | `progress.md` |
| New coding pattern or convention discovered | `conventions.md` |
| Core product or tech stack change | `projectContext.md` |
| Starting a session | `activeContext.md` — update what's in scope |
| Ending a session | `sessionHistory.md` — append summary; `activeContext.md` — update open questions |

### Rules
- **Always read `activeContext.md` and `progress.md` at the start of each session** before doing any work
- **Always update `activeContext.md` and `sessionHistory.md` at the end of each session**
- `decisionLog.md` entries must include: decision, alternatives considered, and reason chosen
- `progress.md` uses checkboxes: `- [ ]` pending, `- [x]` done, `- [~]` in progress
- Never delete entries from `decisionLog.md` or `sessionHistory.md` — append only
- Keep `activeContext.md` lean: only what's relevant to the current or next session

### Entry Formats

**decisionLog.md**
```
## YYYY-MM-DD — Decision title
**Decision:** What was decided
**Alternatives:** What else was considered
**Reason:** Why this was chosen
```

**sessionHistory.md**
```
## YYYY-MM-DD
**Done:** bullet list of completed work
**Next:** what to tackle next session
**Blockers:** anything unresolved
```

---

## Common Pitfalls to Avoid

- Do not call Supabase in `useEffect` for initial data load — use Server Components
- Do not store JWT tokens manually — Supabase SSR handles cookies automatically
- Do not round monetary values with `toFixed` before storing — keep as integers
- Do not create API routes for CRUD that can be Server Actions
- Do not disable RLS to "fix" a query — fix the policy instead
