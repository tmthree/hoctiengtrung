# System Architecture — Học Tiếng Trung

**Status**: v0.1.0 (Implementation Complete)

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | Next.js 16 (App Router, React 19) | 16.2.2 | SSR, server components, turbopack |
| Language | TypeScript | 5 | Type safety, strict mode |
| Styling | Tailwind CSS + shadcn/ui | v4 | Utility-first CSS, accessible UI |
| Database | Neon PostgreSQL | — | Serverless Postgres, pooling |
| ORM | Prisma | 7.6.0 | Type-safe queries, migrations |
| Auth | Better Auth | 1.5.6 | Email/password + OAuth (Google, GitHub) |
| i18n | next-intl | 4.9.0 | Vietnamese UI (English optional) |
| Client State | TanStack Query | 5.96.2 | Caching, optimistic updates |
| Validation | Zod | 4.3.6 | Runtime schema validation |
| Hosting | Vercel | — | Edge deployment, auto-scaling |
| Build Tool | Turbopack | — | Fast incremental builds |

## Data Flow

```
User Browser (HTTPS)
    ↓
Vercel Edge Network (CDN + serverless)
    ↓
Next.js 16 Middleware (src/proxy.ts)
    ├── Locale detection (next-intl routing)
    ├── Session validation (Better Auth session cookie)
    ├── Route protection (redirect unauthenticated → /login)
    └── Admin check (role-based access)
    ↓
App Router (Server Components by default)
    ├── Page.tsx (fetch data) → lib/queries/* → Prisma → Neon
    ├── Client Components ("use client") → Forms/Interactivity
    │   └── Server Actions (lib/actions/*) → Mutations → Neon
    └── API Routes → Better Auth handler (/api/auth/[...all])
```

## Auth Flow (Better Auth)

1. **Sign Up / Login**: User submits form → `signIn()` / `signUp()` server action
2. **Credential Validation**: Better Auth checks User + Account table (password hashed)
3. **Session Creation**: Sets secure, HTTP-only session cookie (token in DB)
4. **Middleware Protection**:
   - Reads session cookie on every request
   - Extracts user ID + role from token
   - Redirects unauthenticated users → /login
   - Redirects authenticated users on /login → /dashboard
5. **Admin Authorization**: Admin routes check `user.role === "ADMIN"`
6. **Session Expiry**: Token expires after 30 days (configurable)

## Route Architecture (41 routes)

```
app/[locale]/                    # Locale wrapper (vi|en)
│
├── layout.tsx, error.tsx, not-found.tsx
├── proxy.ts                     # Middleware (renamed from middleware.ts in Next.js 16)
│
├── page.tsx                     # Landing page (public)
│
├── (marketing)/                 # Public pages
│   ├── layout.tsx
│   ├── page.tsx                 # Marketing home
│   ├── about/page.tsx
│   ├── pricing/page.tsx
│   └── contact/page.tsx
│
├── (auth)/                      # Auth pages (redirect if logged in)
│   ├── layout.tsx               # Centered card layout
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── forgot-password/page.tsx
│
├── (app)/                       # Protected routes (auth required)
│   ├── layout.tsx               # Sidebar + topbar
│   ├── dashboard/
│   │   ├── page.tsx             # Stats, streak, progress
│   │   └── loading.tsx
│   ├── lessons/
│   │   ├── page.tsx             # Browse lessons (paginated, filterable by HSK)
│   │   ├── [id]/page.tsx        # Lesson detail (content + exercises)
│   │   └── loading.tsx
│   ├── vocabulary/
│   │   ├── page.tsx             # Word list (search, filter, paginate)
│   │   ├── [id]/page.tsx        # Word detail (pinyin, definition, examples)
│   │   └── loading.tsx
│   ├── practice/
│   │   ├── page.tsx             # Practice hub (flashcards + quiz modes)
│   │   ├── flashcards/page.tsx  # Spaced repetition deck (SM-2)
│   │   └── quiz/[lessonId]/page.tsx  # 6 exercise types
│   └── profile/
│       ├── page.tsx             # User profile, achievements, settings
│       └── loading.tsx
│
├── (admin)/admin/               # Admin panel (admin role only)
│   ├── layout.tsx               # Admin sidebar
│   ├── page.tsx                 # Dashboard (stats, charts)
│   ├── users/page.tsx           # User management table
│   ├── lessons/
│   │   ├── page.tsx             # Lesson list (admin CRUD)
│   │   ├── new/page.tsx         # Create lesson form
│   │   └── [id]/edit/page.tsx   # Edit lesson form
│   └── vocabulary/
│       ├── page.tsx             # Vocabulary list (admin CRUD)
│       ├── new/page.tsx         # Create word form
│       └── [id]/edit/page.tsx   # Edit word form (bulk import in main page)
│
└── api/
    └── auth/[...all]/route.ts   # Better Auth handler
```

## Prisma Models (12 total)

**Auth Models** (Better Auth):
- User (id, name, email, role, dailyGoalMinutes, createdAt)
- Session (userId, token, expiresAt)
- Account (userId, providerId, accessToken, refreshToken)
- Verification (email verification tokens)

**Content Models**:
- Lesson (title, hskLevel 1-6, type: GRAMMAR|CONVERSATION|READING|CULTURE, content: JSON)
- Exercise (lessonId, type: MULTIPLE_CHOICE|FILL_BLANK|LISTENING|TONE|PINYIN|MATCHING, questions: JSON)
- Vocabulary (chinese, pinyin, definition, hskLevel, partOfSpeech, examples: JSON)
- LessonVocabulary (join table, lessonId ↔ vocabularyId)

**User Progress Models**:
- UserProgress (userId, lessonId, status: NOT_STARTED|IN_PROGRESS|COMPLETED, completedAt)
- VocabularyReview (userId, vocabularyId, interval, ease, nextReviewDate — SM-2 fields)
- QuizAttempt (userId, lessonId, exerciseType, score, answeredAt)
- LearningStreak (userId, currentStreak, lastActivityDate, longestStreak)

## Deployment Model

**Platform**: Vercel (Next.js native, optimized for edge runtime)

| Environment | Database | Config | Deploy |
|-------------|----------|--------|--------|
| **Local Dev** | Neon (connection pooler) | `.env.local` | `npm run dev` |
| **Preview** | Neon (branched DB) | Vercel env vars | PR auto-deploy |
| **Production** | Neon (main DB) | Vercel env vars (secured) | Manual/auto on `main` push |

**Environment Variables**:
- `DATABASE_URL` — Neon pooler (port 5432, for queries)
- `DIRECT_URL` — Neon direct (for migrations only)
- `BETTER_AUTH_SECRET` — Session signing key
- `BETTER_AUTH_URL` — Auth callback URL (e.g., https://hoctiengtrung.app)
- `NODE_ENV` — development|production

## Performance Optimizations

| Strategy | Implementation |
|----------|-----------------|
| **Server Components** | Default; only `"use client"` when needed (forms, interactivity) |
| **Image Optimization** | TBD: `next/image` component with Vercel image CDN |
| **Code Splitting** | Automatic via App Router; lazy-load practice components |
| **Database Pooling** | Neon connection pooler (multi-tenant, ~100 connections) |
| **Caching** | TanStack Query (client-side), HTTP cache headers on API |
| **Turbopack** | Replaces webpack; 10x faster builds |
| **SSR** | All pages rendered on-demand (no pre-generation) |

## Key Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| **Server Components** | Fetch data, render layout | `DashboardPage` reads user streak from DB |
| **Client Components** | Forms, hooks, interactivity | `LoginForm` with `useFormState` |
| **Server Actions** | Mutations, auth-protected operations | `submitQuizAnswer()` validates + saves to DB |
| **Zod Validation** | Input validation (client + server) | `loginSchema` validates email + password |
| **SM-2 Algorithm** | Spaced repetition for flashcards | `VocabularyReview` model stores interval/ease |
| **i18n** | Locale-aware UI + routing | `getTranslations()` in server; `useTranslations()` in client |
| **TanStack Query** | Data fetching + caching (client) | `useQuery({ queryKey: ['lessons'], queryFn: ... })` |

## Security

| Layer | Measure |
|-------|---------|
| **Transport** | HTTPS only (Vercel + domain) |
| **Session** | Secure, HTTP-only cookies; 30-day expiry |
| **Passwords** | Hashed with bcrypt (Better Auth) |
| **CSRF** | Protected via Next.js built-in middleware |
| **SQL Injection** | Prisma parameterized queries |
| **XSS** | React auto-escaping + CSP headers (Vercel) |
| **Admin Access** | Role check on every admin route |
| **Secrets** | Environment variables in Vercel (not committed to git) |
