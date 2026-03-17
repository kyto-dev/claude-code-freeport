---
name: Decision Log
description: Architecture and implementation decisions with rationale
type: project
---

# Decision Log

## 2026-03-17 — Use Server Actions over API routes for mutations
**Decision:** Use Next.js Server Actions for all form mutations (create/update/delete).
**Alternatives:** Traditional API route handlers (`/api/...`).
**Reason:** Server Actions reduce boilerplate, colocate logic with UI, and work seamlessly with `revalidatePath`. API routes reserved for webhooks and third-party integrations only.

---

## 2026-03-17 — Store money as integer cents
**Decision:** All monetary values stored as `integer` (cents) in the database.
**Alternatives:** `numeric(10,2)` decimal, or JavaScript `number` float.
**Reason:** Eliminates floating-point rounding errors in financial calculations. Display formatting handled by `formatCurrency()` utility.

---

## 2026-03-17 — Supabase RLS as data access control
**Decision:** Every table has RLS enabled with `user_id` ownership policies. No application-level ownership checks needed.
**Alternatives:** Application-level WHERE clauses on every query.
**Reason:** RLS enforces security at the database level regardless of application bugs. Defense in depth.

---

## 2026-03-17 — Next.js App Router with Server Components by default
**Decision:** Use App Router. Default to Server Components; add `'use client'` only when required.
**Alternatives:** Pages Router, or client-heavy SPA approach.
**Reason:** Better performance, direct server-side Supabase access without API overhead, built-in streaming and Suspense support.
