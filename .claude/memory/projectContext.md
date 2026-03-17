---
name: Project Context
description: Stable product overview, tech stack, and architecture for Freeport
type: project
---

# Freeport — Project Context

## Product
Personal finance control webapp. Users track income, expenses, budgets, and financial goals.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Validation:** Zod
- **Deployment:** TBD

## Key Architecture Decisions
- Server Components by default, `'use client'` only when necessary
- Server Actions for form mutations (not API routes)
- Supabase RLS enforced on all tables
- Money stored as integer cents (never floats)
- Middleware-based auth guard for `/dashboard` routes

## Domain Entities
- Transactions (income / expense / transfer)
- Categories (system defaults + user-scoped)
- Budgets (category + month + year)
- Goals (savings targets)

## Status
Project initialized. Directory structure scaffolded. No code written yet.
