---
name: Conventions
description: Coding patterns and project-specific rules for Freeport
type: project
---

# Conventions

## File Naming
- Components: `PascalCase.tsx` (e.g., `TransactionCard.tsx`)
- Hooks: `camelCase` prefixed with `use` (e.g., `useTransactions.ts`)
- Utils: `camelCase` (e.g., `formatCurrency.ts`)
- Types: `camelCase` file, `PascalCase` interface (e.g., `transaction.ts` → `Transaction`)
- Supabase migrations: `YYYYMMDDHHMMSS_describe_change.sql`

## TypeScript
- No `any` — use `unknown` and narrow explicitly
- Prefer discriminated unions over loose string types
- DB column names: `snake_case`; TypeScript properties: `camelCase` (map at the query layer if needed)
- `NewEntity` = `Omit<Entity, 'id' | 'user_id' | 'created_at' | 'updated_at'>`

## Supabase Queries
- Always destructure `{ data, error }` and handle errors before using data
- Use `.throwOnError()` only in Server Components where you want error.tsx to catch
- Use typed generics: `supabase.from('transactions').select<'*', Transaction>()`

## Components
- Props interfaces defined in the same file, named `[ComponentName]Props`
- No prop drilling more than 2 levels — lift to context or server-fetch instead
- `loading` and `error` states handled at the route segment level via `loading.tsx`/`error.tsx`

## Forms
- All forms use Server Actions + Zod validation
- Return `{ error }` on failure, call `revalidatePath` on success
- Client-side optimistic updates only when UX requires immediate feedback

## Money Display
```ts
// Always use this helper — never format inline
formatCurrency(amountInCents: number, currency: string): string
// e.g. formatCurrency(150000, 'MXN') → '$1,500.00 MXN'
```
