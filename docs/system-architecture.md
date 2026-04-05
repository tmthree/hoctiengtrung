# System Architecture — Học Tiếng Trung

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15 (App Router, React 19) | SSR, SSG, Server Components |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | UI components |
| Database | Neon PostgreSQL | Serverless Postgres |
| ORM | Prisma | Type-safe DB queries |
| Auth | Better Auth | Authentication |
| i18n | next-intl | Vietnamese UI |
| Client State | TanStack Query | Caching, optimistic updates |
| Validation | Zod | Schema validation |
| Hosting | Vercel | Edge deployment |

## Data Flow

```
User Browser
    ↓ HTTPS
Vercel Edge Network
    ↓
Next.js Middleware (src/middleware.ts)
    ├── Locale detection (next-intl)
    └── Auth guard (Better Auth session check)
    ↓
App Router
    ├── Server Components → lib/queries/* → Prisma → Neon PostgreSQL
    ├── Client Components → Server Actions (lib/actions/*) → Prisma → Neon
    └── API Routes → Better Auth handler, file uploads
```

## Auth Flow

1. User submits login form → Client calls Better Auth `signIn()`
2. Better Auth validates credentials against DB
3. Session cookie set (HTTP-only, secure)
4. Middleware reads session cookie on subsequent requests
5. Protected routes redirect to /login if no valid session
6. Admin routes additionally check `user.role === "ADMIN"`

## Route Architecture

```
app/[locale]/
├── page.tsx              → Landing (public)
├── (marketing)/          → About, Pricing, Contact (public)
├── (auth)/               → Login, Register, Forgot Password (public, redirect if auth)
├── (app)/                → Dashboard, Lessons, Vocab, Practice, Profile (auth required)
└── (admin)/admin/        → Admin panel (admin role required)
```

## Deployment Model

- **Platform**: Vercel (auto-deploy from GitHub main branch)
- **Preview**: Each PR gets preview deployment + Neon DB branch
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: `.env.local` for dev, Vercel env vars for production
- **Domain**: hoctiengtrung.app (Vercel custom domain)

## Key Patterns

- **Server Components by default** — `"use client"` only when needed
- **Server Actions for mutations** — no REST API for app operations
- **Feature-based component folders** — not grouped by type
- **Zod schemas shared** between server actions and client forms
- **SM-2 algorithm** for spaced repetition flashcards
