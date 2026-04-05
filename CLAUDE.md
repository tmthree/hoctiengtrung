# CLAUDE.md — Học Tiếng Trung (hoctiengtrung.app)

## Project Description

Web app tự học tiếng Trung từ cơ bản đến nâng cao. UI tiếng Việt. Tương tự Duolingo/HelloChinese nhưng tập trung cho người Việt.

**Domain**: hoctiengtrung.app
**Deploy**: Vercel
**Database**: Neon PostgreSQL

## Dev Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run db:push      # Push schema to Neon
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed HSK vocabulary data
npm run db:studio    # Open Prisma Studio
npx prisma generate  # Regenerate Prisma client
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui (New York style, zinc base)
- **Database**: Neon PostgreSQL + Prisma ORM
- **Auth**: Better Auth (email/password + OAuth)
- **i18n**: next-intl (Vietnamese default, English optional)
- **State**: TanStack Query (client-side caching)
- **Validation**: Zod (shared schemas)

## Architecture Overview

```
Browser → Vercel Edge → Next.js Middleware (i18n + auth guard)
                          ↓
                    App Router
                    ├── (marketing)  → Public pages (no auth)
                    ├── (auth)       → Login/Register (redirect if logged in)
                    ├── (app)        → Learning area (auth required)
                    └── (admin)      → Content management (admin role)
                          ↓
                    Server Components → lib/queries/* → Prisma → Neon PostgreSQL
                    Client Components → lib/actions/* (Server Actions) → Prisma → Neon
```

## Key Conventions

- **File naming**: kebab-case, descriptive (e.g., `spaced-repetition-controls.tsx`)
- **Components**: Feature-based folders under `src/components/`
- **Data fetching**: Server Components use `lib/queries/*`, mutations use `lib/actions/*`
- **Validation**: Zod schemas in `lib/validators/*`, shared by actions + forms
- **shadcn/ui**: `src/components/ui/` is CLI-managed — do NOT edit manually
- **i18n**: Translation files in `/messages/vi.json`, namespaced by feature
- **Max file size**: 200 lines — split if larger

## Route Groups

| Group | Path | Layout | Auth |
|-------|------|--------|------|
| (marketing) | /about, /pricing | Public navbar + footer | No |
| (auth) | /login, /register | Centered card | No (redirect if logged in) |
| (app) | /dashboard, /lessons, /vocabulary, /practice, /profile | Sidebar + topbar | Yes |
| (admin) | /admin/* | Admin sidebar | Yes + ADMIN role |

## Important Links

- **Docs**: `docs/` — architecture, code standards, DB schema, deploy guide, glossary
- **Plans**: `plans/` — implementation plans and reports
- **Skills**: `.claude/skills/` — reusable AI skills (added after 2-3 features)

IMPORTANT: Before implementing any feature — read relevant skills in .claude/skills/ and docs in docs/ first.
