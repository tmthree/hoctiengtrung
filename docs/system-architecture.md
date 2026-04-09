# System Architecture — Học Tiếng Trung

**Status**: v0.2.0 (Production-Scale with Payments & RBAC)

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
| JWT Auth | jsonwebtoken | 9.0.3 | Access/refresh token rotation |
| Payments | Stripe | 22.0.1 | Payment processing, webhooks |
| Rate Limiting | Upstash | 2.0.8 (ratelimit), 1.37.0 (redis) | Distributed rate limits, cache |
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

## Auth Flow (Dual Layer: Better Auth + JWT)

### Layer 1: Session-Based Auth (Better Auth)
1. **Sign Up / Login**: User submits form → `signIn()` / `signUp()` server action
2. **Credential Validation**: Better Auth checks User + Account table (password hashed)
3. **Session Creation**: Sets secure, HTTP-only session cookie (token in DB, 30-day expiry)
4. **Middleware Protection**:
   - Reads session cookie on every request
   - Extracts user ID + role from token
   - Redirects unauthenticated users → /login
   - Redirects authenticated users on /login → /dashboard
   - Enforces role-based access (LEARNER, INSTRUCTOR, ADMIN)

### Layer 2: JWT Access/Refresh Tokens
1. **Token Generation** (`generateAccessToken`): Creates 15-minute JWT with user role
2. **Refresh Token Rotation** (`rotateRefreshToken`):
   - Old refresh token (opaque UUID, stored in RefreshToken model) → revoked
   - New refresh token issued in same "family" (rotation chain tracking)
   - Breach detection: if old token already revoked, revoke entire family
3. **Endpoints**:
   - `POST /api/auth/token/issue` — Generate access + refresh token pair
   - `POST /api/auth/token` — Rotate tokens (consume old refresh, issue new pair)
4. **Used for**: Mobile apps, external integrations, manual token-based flows

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
    ├── auth/[...all]/route.ts          # Better Auth handler
    ├── auth/token/route.ts             # Refresh token rotation
    ├── auth/token/issue/route.ts       # Issue new token pair
    └── webhooks/stripe/
        ├── route.ts                    # Webhook handler (signature verification)
        └── stripe-webhook-handlers.ts  # Event processors (checkout, refund)
```

## Prisma Models (18 total)

**Auth Models** (Better Auth):
- User (id, name, email, role: LEARNER|INSTRUCTOR|ADMIN, plan: FREE|PREMIUM|PRO, stripeCustomerId, dailyGoalMinutes)
- Session (userId, token, expiresAt, ipAddress, userAgent)
- Account (userId, providerId, accessToken, refreshToken)
- Verification (email verification tokens)
- RefreshToken (userId, token, family: string for rotation chain, expiresAt, revokedAt, replacedBy)

**Content Models**:
- Lesson (courseId?, title, hskLevel 1-6, type: GRAMMAR|CONVERSATION|READING|CULTURE|BUSINESS, content: JSON, isPublished, isFree)
- Course (id, instructorId, title, slug, description, level, price, thumbnail, isPublished, isFeatured, enrollCount)
- Exercise (lessonId, type: MULTIPLE_CHOICE|FILL_BLANK|LISTENING|MATCHING|WRITING|READING|TONE|PINYIN, question: JSON, answer: JSON)
- Vocabulary (simplified, traditional?, pinyin, meaning, exampleSentence, hskLevel, category, audioUrl, strokeOrder: JSON)
- LessonVocabulary (join table, lessonId ↔ vocabularyId)

**User Progress Models**:
- UserProgress (userId, lessonId, status: NOT_STARTED|IN_PROGRESS|COMPLETED, score?, completedAt)
- VocabularyReview (userId, vocabularyId, ease, interval, repetitions, nextReview, lastReview — SM-2 fields)
- QuizAttempt (userId, exerciseId, isCorrect, userAnswer: JSON, timeSpent, attemptedAt)
- LearningStreak (userId, date, minutesStudied, wordsLearned, exercisesCompleted)

**Enrollment & Payment Models**:
- Enrollment (userId, courseId, status: ACTIVE|EXPIRED|REFUNDED, enrolledAt, expiresAt)
- Order (userId, courseId, status: PENDING|PAID|FAILED|REFUNDED|CANCELLED, amount, currency, stripeSessionId, idempotencyKey)
- Payment (orderId, stripePaymentId, amount, currency, status: PENDING|SUCCEEDED|FAILED|REFUNDED, method, paidAt, refundedAt)
- WebhookEvent (stripeEventId unique, type, payload: JSON, processedAt, error)

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
- `BETTER_AUTH_SECRET` — Session + JWT signing key
- `BETTER_AUTH_URL` — Auth callback URL (e.g., https://hoctiengtrung.app)
- `STRIPE_SECRET_KEY` — Stripe API key (payment processing)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing key
- `UPSTASH_REDIS_REST_URL` — Redis for rate limiting + caching
- `UPSTASH_REDIS_REST_TOKEN` — Redis auth token
- `NODE_ENV` — development|production

## Payment Flow (Stripe Checkout)

**Checkout Creation** (`POST /api/actions/checkout` via Server Action):
1. Authenticate user (Better Auth session)
2. Validate course exists + is published + has price > 0
3. Check user not already enrolled
4. **Layer 1 Idempotency**: Reuse recent PENDING order (< 30min old) if one exists
5. Get or create Stripe customer (store ID in User.stripeCustomerId)
6. Create Order record with `idempotencyKey` (user_courseId_timestamp)
7. Call `stripe.checkout.sessions.create()` with order metadata
8. Store `stripeSessionId` in Order, return checkout URL to client

**Webhook Handler** (`POST /api/webhooks/stripe`):
1. Verify Stripe signature using STRIPE_WEBHOOK_SECRET
2. **Layer 2 Idempotency**: Check if `stripe_event_id` already processed (WebhookEvent table)
3. Record event for tracking (upsert handles race conditions)
4. Dispatch to handler based on event type:
   - `checkout.session.completed` → Create Payment record, enroll user, mark Order as PAID
   - `checkout.session.expired` → Mark Order as FAILED
   - `charge.refunded` → Create refund Payment, mark Order as REFUNDED
5. Mark WebhookEvent as `processedAt` after successful handling
6. Return 200 immediately (idempotency = safe to replay)

**Layer 3 Idempotency** (Stripe-side): Stripe prevents duplicate charges via checksum on metadata.

## Role-Based Access Control (RBAC)

**Roles** (enum):
- `LEARNER` — Free user, can access free lessons + practice
- `INSTRUCTOR` — Can create/edit courses and lessons (requires PRO plan)
- `ADMIN` — Full platform access, user management

**Permissions** (in `src/lib/rbac.ts`):

| Role | Permissions |
|------|-------------|
| LEARNER | (none) |
| INSTRUCTOR | course:create, course:edit, lesson:create, lesson:edit |
| ADMIN | all 8 permissions + user:manage, enrollment:view-all, content:manage |

**Authorization Checks**:
- Inline: `hasPermission(role, "course:create")` → boolean
- Server Actions: `requireRole(session, "INSTRUCTOR")` → throws if not INSTRUCTOR
- Route Guards: Middleware checks role before allowing (admin) routes
- Patterns in `lib/rbac.ts`: `requirePermission()`, `getPermissions()`

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
| **Server Actions** | Mutations, auth-protected operations | `createCheckoutSession()` validates + returns Stripe URL |
| **Zod Validation** | Input validation (client + server) | `createCheckoutSchema` validates courseId |
| **JWT Tokens** | Access/refresh pair with rotation | `generateAccessToken()`, `rotateRefreshToken()` |
| **RBAC** | Permission-based authorization | `requirePermission(session, "course:create")` |
| **Stripe Webhooks** | 3-layer idempotent payment handling | `processCheckoutCompleted()` in handler |
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
| **JWT Secrets** | Signed with BETTER_AUTH_SECRET (env var, not hardcoded) |
| **Refresh Token Breach** | Family-based rotation; entire family revoked on reuse |
| **Webhook Signature** | Stripe signature verification on every webhook |
| **Idempotency** | 3-layer (Order metadata, Webhook event tracking, Stripe checksum) |
| **Rate Limiting** | Upstash Redis-backed limits on payments, auth endpoints |
| **Role Authorization** | `requireRole()` + `requirePermission()` on sensitive operations |
| **Secrets** | Environment variables in Vercel (not committed to git) |
