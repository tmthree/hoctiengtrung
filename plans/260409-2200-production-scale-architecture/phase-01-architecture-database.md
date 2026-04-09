# Phase 1: System Architecture & Database Design

## 1. Technology Decision Matrix

### Giữ nguyên (đã proven)

| Component | Technology | Lý do giữ |
|-----------|-----------|-----------|
| Framework | Next.js 16 (App Router) | SSR + Server Actions, đã deploy Vercel |
| Database | Neon PostgreSQL | Serverless, connection pooling built-in, đã có data |
| ORM | Prisma 7 | Type-safe, adapter pattern cho Neon |
| Auth base | Better Auth | Session management tốt, đã integrate |
| Hosting | Vercel | Auto-scale, edge network, zero-config deploy |
| i18n | next-intl | Đã cấu hình vi/en |
| UI | shadcn/ui + Tailwind | Component library ổn định |

### Thêm mới

| Component | Technology | Lý do chọn |
|-----------|-----------|-----------|
| JWT tokens | Better Auth JWT plugin | Không cần rip out auth, plugin chính thức |
| Caching | Upstash Redis | Serverless Redis, Vercel-native, free tier 10K cmd/day |
| Payment | Stripe | Hỗ trợ VND, webhook robust, idempotency key built-in |
| Rate Limit | Upstash Ratelimit | Dùng chung Redis, sliding window algorithm |
| Email | Resend | Transactional email (receipt, password reset) |
| Monitoring | Vercel Analytics + Sentry | Error tracking + performance monitoring |

### Tại sao KHÔNG chọn

| Option | Lý do bỏ |
|--------|----------|
| Microservices | Overkill cho 100 CCU. Modular Monolith đủ, dễ maintain với team nhỏ |
| Custom JWT from scratch | Better Auth đã handle token signing, refresh rotation. Tự viết = tự tạo bug bảo mật |
| Redis self-hosted | Cần manage infra. Upstash serverless = 0 ops |
| PayPal/MoMo | Stripe hỗ trợ VND, API tốt hơn, webhook idempotency built-in |
| NextAuth.js | Đã dùng Better Auth, migration không đáng |
| MongoDB | Relational data (User→Order→Payment) cần ACID transactions |

---

## 2. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│  React 19 + TanStack Query + next-intl (vi/en)                │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                          │
│  CDN (static assets) + Edge Functions (middleware)              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Next.js Proxy (src/proxy.ts)                            │   │
│  │  ├── Locale detection (vi|en)                            │   │
│  │  ├── JWT validation (access token from cookie/header)    │   │
│  │  ├── Role-based route protection                         │   │
│  │  └── Rate limiting check (Upstash)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐
│  SERVER      │ │  SERVER      │ │  API ROUTES              │
│  COMPONENTS  │ │  ACTIONS     │ │  /api/auth/[...all]      │
│              │ │              │ │  /api/webhooks/stripe     │
│  lib/queries │ │  lib/actions │ │  /api/webhooks/health     │
│  (read-only) │ │  (mutations) │ │                          │
└──────┬───────┘ └──────┬───────┘ └────────────┬─────────────┘
       │                │                       │
       ▼                ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER (lib/)                         │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Auth     │  │ Payment  │  │ Content  │  │ Progress     │   │
│  │ Module   │  │ Module   │  │ Module   │  │ Module       │   │
│  │          │  │          │  │          │  │              │   │
│  │ - JWT    │  │ - Stripe │  │ - CRUD   │  │ - SM-2       │   │
│  │ - RBAC   │  │ - Orders │  │ - Search │  │ - Streaks    │   │
│  │ - Session│  │ - Webhook│  │ - HSK    │  │ - Stats      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │               │            │
│  ┌────▼──────────────▼──────────────▼───────────────▼────────┐  │
│  │              Prisma ORM (PrismaNeon Adapter)               │  │
│  └────────────────────────────┬───────────────────────────────┘  │
└───────────────────────────────┼──────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                                   ▼
┌──────────────────────┐            ┌──────────────────────┐
│  NEON PostgreSQL     │            │  UPSTASH REDIS       │
│  (Singapore region)  │            │  (Serverless)        │
│                      │            │                      │
│  ├── Auth tables     │            │  ├── Session cache   │
│  ├── Content tables  │            │  ├── Course catalog  │
│  ├── Order/Payment   │            │  ├── Rate limit      │
│  ├── User progress   │            │  ├── Leaderboard     │
│  └── Indexes + Pool  │            │  └── Idempotency keys│
└──────────────────────┘            └──────────────────────┘

              ┌─────────────────────────────────────┐
              │         EXTERNAL SERVICES            │
              │                                      │
              │  Stripe ──── Payment processing      │
              │  Resend ──── Transactional email     │
              │  Sentry ──── Error monitoring        │
              │  Vercel ──── Analytics + Logs        │
              └─────────────────────────────────────┘
```

---

## 3. Modular Monolith — Module Boundaries

```
src/lib/
├── modules/
│   ├── auth/           # Auth Module
│   │   ├── auth.ts             # Better Auth config + JWT plugin
│   │   ├── auth-client.ts      # Client-side auth
│   │   ├── rbac.ts             # Role checking utilities
│   │   └── token-utils.ts      # JWT helpers
│   │
│   ├── payment/        # Payment Module
│   │   ├── stripe.ts           # Stripe client singleton
│   │   ├── checkout.ts         # Create checkout session
│   │   ├── webhook-handler.ts  # Process Stripe events
│   │   └── subscription.ts     # Manage subscriptions
│   │
│   ├── content/        # Content Module (existing, reorganized)
│   │   ├── queries/            # Read operations
│   │   └── actions/            # Write operations
│   │
│   └── progress/       # Progress Module (existing, reorganized)
│       ├── queries/
│       └── actions/
│
├── cache/              # Cache Layer
│   ├── redis.ts               # Upstash Redis client
│   ├── keys.ts                # Cache key patterns
│   └── strategies.ts          # Cache-aside, write-through
│
└── shared/             # Shared utilities
    ├── db.ts
    ├── utils.ts
    └── validators/
```

**Module Communication Rules**:
- Modules communicate via **public function exports** (not direct DB access across modules)
- Payment module calls Auth module's `getUserById()`, NOT `db.user.findUnique()`
- Each module owns its Prisma queries for its own tables
- Shared types in `src/types/`

---

## 4. RBAC Design — 3 Roles

```
┌─────────────────────────────────────────────────────────┐
│                    PERMISSION MATRIX                     │
├──────────────────┬──────────┬────────────┬──────────────┤
│ Action           │ STUDENT  │ INSTRUCTOR │    ADMIN     │
├──────────────────┼──────────┼────────────┼──────────────┤
│ View courses     │    ✓     │     ✓      │      ✓       │
│ Enroll/Purchase  │    ✓     │     ✓      │      ✓       │
│ Take quizzes     │    ✓     │     ✓      │      ✓       │
│ Review flashcard │    ✓     │     ✓      │      ✓       │
│ View own progress│    ✓     │     ✓      │      ✓       │
├──────────────────┼──────────┼────────────┼──────────────┤
│ Create lessons   │    ✗     │  Own only  │      ✓       │
│ Edit lessons     │    ✗     │  Own only  │      ✓       │
│ Create exercises │    ✗     │  Own only  │      ✓       │
│ View student     │    ✗     │ Own course │      ✓       │
│   progress       │          │  students  │              │
│ Revenue dashboard│    ✗     │  Own only  │   All data   │
├──────────────────┼──────────┼────────────┼──────────────┤
│ Manage users     │    ✗     │     ✗      │      ✓       │
│ Manage pricing   │    ✗     │     ✗      │      ✓       │
│ Platform settings│    ✗     │     ✗      │      ✓       │
│ View all revenue │    ✗     │     ✗      │      ✓       │
│ Bulk import/CSV  │    ✗     │     ✗      │      ✓       │
└──────────────────┴──────────┴────────────┴──────────────┘
```

**Role enum migration**: `LEARNER` → `STUDENT` (rename), add `INSTRUCTOR`

---

## 5. Entity-Relationship Diagram (ERD)

### 5a. Auth & User Domain

```
┌──────────────────────────┐       ┌──────────────────────────┐
│         User             │       │        Session           │
├──────────────────────────┤       ├──────────────────────────┤
│ id          PK  cuid     │──┐    │ id          PK  cuid     │
│ name        String       │  │    │ userId      FK  → User   │
│ email       String @uniq │  │    │ token       String @uniq │
│ emailVerified Boolean    │  │    │ expiresAt   DateTime     │
│ image       String?      │  │    │ ipAddress   String?      │
│ role        Role enum    │  │    │ userAgent   String?      │
│ plan        Plan enum    │  │    │ createdAt   DateTime     │
│ planExpiresAt DateTime?  │  │    │ updatedAt   DateTime     │
│ dailyGoalMinutes Int     │  │    └──────────────────────────┘
│ stripeCustomerId String? │  │
│ createdAt   DateTime     │  │    ┌──────────────────────────┐
│ updatedAt   DateTime     │  │    │       Account            │
└──────────────────────────┘  │    ├──────────────────────────┤
                              ├───>│ id          PK           │
  enum Role {                 │    │ userId      FK  → User   │
    STUDENT                   │    │ providerId  String       │
    INSTRUCTOR                │    │ accountId   String       │
    ADMIN                     │    │ accessToken String?      │
  }                           │    │ refreshToken String?     │
                              │    │ password    String?      │
  enum Plan {                 │    └──────────────────────────┘
    FREE                      │
    PREMIUM                   │    ┌──────────────────────────┐
    PRO (instructor plan)     │    │    RefreshToken  (NEW)   │
  }                           │    ├──────────────────────────┤
                              ├───>│ id          PK  cuid     │
                              │    │ userId      FK  → User   │
                              │    │ token       String @uniq │
                              │    │ family      String       │
                              │    │ expiresAt   DateTime     │
                              │    │ revokedAt   DateTime?    │
                              │    │ replacedBy  String?      │
                              │    │ createdAt   DateTime     │
                              │    │ @@index([userId])        │
                              │    │ @@index([family])        │
                              │    └──────────────────────────┘
```

### 5b. Content Domain (enhanced)

```
┌────────────────────────────┐     ┌──────────────────────────┐
│         Course (NEW)       │     │        Lesson            │
├────────────────────────────┤     ├──────────────────────────┤
│ id          PK  cuid      │──┐  │ id          PK  cuid     │
│ title       String         │  │  │ courseId    FK  → Course  │ ← NEW
│ slug        String @uniq   │  │  │ title       String       │
│ description String         │  ├─>│ description String       │
│ language    Language enum   │  │  │ hskLevel    Int          │
│ level       Int (HSK 1-9)  │  │  │ type        LessonType   │
│ price       Int (cents)    │  │  │ content     Json          │
│ currency    String "VND"   │  │  │ order       Int           │
│ thumbnail   String?        │  │  │ isPublished Boolean       │
│ isPublished Boolean        │  │  │ isFree      Boolean       │ ← NEW (preview)
│ isFeatured  Boolean        │  │  │ createdAt   DateTime     │
│ instructorId FK  → User    │  │  │ updatedAt   DateTime     │
│ enrollCount Int @default(0)│  │  └──────────────────────────┘
│ createdAt   DateTime       │  │
│ updatedAt   DateTime       │  │  ┌──────────────────────────┐
│ @@index([language, level]) │  │  │     Enrollment (NEW)     │
│ @@index([instructorId])    │  │  ├──────────────────────────┤
│ @@index([slug])            │  │  │ id          PK  cuid     │
└────────────────────────────┘  ├─>│ userId      FK  → User   │
                                │  │ courseId    FK  → Course  │
  enum Language {               │  │ status      EnrollStatus  │
    CHINESE                     │  │ enrolledAt  DateTime     │
    ENGLISH (future)            │  │ expiresAt   DateTime?    │
  }                             │  │ @@unique([userId,courseId])│
                                │  └──────────────────────────┘
                                │
                                │  enum EnrollStatus {
                                │    ACTIVE
                                │    EXPIRED
                                │    REFUNDED
                                │  }
```

### 5c. Payment Domain (NEW)

```
┌────────────────────────────┐     ┌──────────────────────────────┐
│         Order (NEW)        │     │      Payment (NEW)            │
├────────────────────────────┤     ├──────────────────────────────┤
│ id          PK  cuid      │──┐  │ id            PK  cuid       │
│ userId      FK  → User     │  │  │ orderId       FK  → Order    │
│ courseId    FK  → Course   │  │  │ stripePaymentId String @uniq │
│ status      OrderStatus    │  ├─>│ amount        Int (cents)    │
│ amount      Int (cents)    │  │  │ currency      String         │
│ currency    String         │  │  │ status        PaymentStatus  │
│ stripeSessionId String?    │  │  │ method        String?        │
│ idempotencyKey String @uniq│  │  │ failureReason String?        │
│ createdAt   DateTime       │  │  │ paidAt        DateTime?      │
│ updatedAt   DateTime       │  │  │ refundedAt    DateTime?      │
│ @@index([userId])          │  │  │ createdAt     DateTime       │
│ @@index([stripeSessionId]) │  │  │ @@index([orderId])           │
│ @@index([idempotencyKey])  │  │  │ @@index([stripePaymentId])   │
└────────────────────────────┘  │  └──────────────────────────────┘
                                │
  enum OrderStatus {            │  enum PaymentStatus {
    PENDING                     │    PENDING
    PAID                        │    SUCCEEDED
    FAILED                      │    FAILED
    REFUNDED                    │    REFUNDED
    CANCELLED                   │  }
  }                             │
                                │  ┌──────────────────────────────┐
                                │  │   WebhookEvent (NEW)          │
                                │  ├──────────────────────────────┤
                                │  │ id            PK  cuid       │
                                ├─>│ stripeEventId String @uniq   │
                                │  │ type          String         │
                                │  │ payload       Json           │
                                │  │ processedAt   DateTime?      │
                                │  │ error         String?        │
                                │  │ createdAt     DateTime       │
                                │  │ @@index([stripeEventId])     │
                                │  └──────────────────────────────┘
```

### 5d. Full Relationship Map

```
User ─────┬───< Session          (1:N) Sessions per user
          ├───< Account          (1:N) OAuth providers
          ├───< RefreshToken     (1:N) Token rotation chain
          ├───< Order            (1:N) Purchase history
          ├───< Enrollment       (1:N) Course access
          ├───< UserProgress     (1:N) Lesson completion
          ├───< VocabularyReview (1:N) Spaced repetition
          ├───< QuizAttempt      (1:N) Exercise results
          ├───< LearningStreak   (1:N) Daily activity
          └───< Course           (1:N) Created courses (INSTRUCTOR)

Course ───┬───< Lesson           (1:N) Ordered lessons
          ├───< Enrollment       (1:N) Enrolled students
          └───< Order            (1:N) Purchase orders

Order ────┬───< Payment          (1:N) Payment attempts (retry)
          └───< WebhookEvent     (1:N) Stripe webhook log

Lesson ───┬───< Exercise         (1:N)
          ├───< LessonVocabulary (N:M via join table)
          └───< UserProgress     (1:N)
```

---

## 6. Database Indexing Strategy (100+ CCU)

### Hot Queries & Required Indexes

| Query Pattern | Frequency | Index |
|--------------|-----------|-------|
| User by email (login) | Every auth | `User.email` (unique, already indexed) |
| Session by token | Every request | `Session.token` (unique, already indexed) |
| Refresh token lookup | Token refresh | `RefreshToken.token` (unique) |
| Refresh token family | Rotation check | `RefreshToken.family` |
| Courses by language+level | Browse page | `Course(language, level)` composite |
| Lessons by courseId, ordered | Course detail | `Lesson(courseId, order)` composite |
| Enrollment check | Access control | `Enrollment(userId, courseId)` unique |
| Order by idempotencyKey | Double-click guard | `Order.idempotencyKey` (unique) |
| Order by stripeSessionId | Webhook processing | `Order.stripeSessionId` |
| Payment by stripePaymentId | Webhook dedup | `Payment.stripePaymentId` (unique) |
| WebhookEvent by stripeEventId | Idempotency | `WebhookEvent.stripeEventId` (unique) |
| UserProgress by user+lesson | Progress check | Already `@@unique([userId, lessonId])` |
| VocabularyReview due cards | Flashcard session | Already `@@index([userId, nextReview])` |

### Connection Pooling

```
Neon PostgreSQL Connection Architecture:

┌─────────────────────────────────────────────┐
│           Vercel Serverless Functions         │
│  (Each request = 1 function invocation)      │
│                                              │
│  Function 1 ──┐                              │
│  Function 2 ──┤                              │
│  Function 3 ──┼──→ Neon Connection Pooler    │
│  ...          │    (PgBouncer, port 5432)    │
│  Function N ──┘    Max: 100 connections       │
│                         │                     │
│                    Neon PostgreSQL             │
│                    (10 max direct conn)        │
└─────────────────────────────────────────────┘

Current: Neon pooler (built-in) — handles 100+ CCU
Added:   Prisma connection_limit=10 per function instance
         + Neon autoscaling (0.25→4 compute units)
```

---

## 7. Caching Strategy (Upstash Redis)

```
┌─────────────────────────────────────────────────┐
│                CACHE LAYERS                       │
├─────────────────────────────────────────────────┤
│                                                   │
│  Layer 1: Browser Cache (TanStack Query)          │
│  ├── staleTime: 5min (course list)               │
│  ├── staleTime: 30s (user progress)              │
│  └── gcTime: 30min                               │
│                                                   │
│  Layer 2: Upstash Redis (Server-side)            │
│  ├── course:list:{lang}:{level}  TTL: 10min      │
│  ├── course:{id}                 TTL: 5min       │
│  ├── user:{id}:enrollments       TTL: 2min       │
│  ├── lesson:count:{courseId}     TTL: 10min      │
│  ├── leaderboard:{period}        TTL: 1min       │
│  └── ratelimit:{ip}:{endpoint}   TTL: 60s        │
│                                                   │
│  Layer 3: PostgreSQL (Source of truth)            │
│  └── All data with proper indexes                │
│                                                   │
│  Cache Invalidation:                              │
│  ├── Write-through: After DB write → delete key  │
│  ├── TTL-based: Auto-expire stale data           │
│  └── Manual: Admin actions flush related keys    │
└─────────────────────────────────────────────────┘
```

---

## 8. Payment Flow (Stripe)

```
Student clicks "Mua khóa học"
        │
        ▼
┌─────────────────────┐     ┌──────────────────────┐
│ 1. Create Order     │     │ 2. Stripe Checkout    │
│    (PENDING)        │────>│    Session created     │
│    + idempotencyKey │     │    with order.id       │
│    in our DB        │     │    as metadata         │
└─────────────────────┘     └──────────┬───────────┘
                                       │
                            Student pays on Stripe
                                       │
                                       ▼
┌─────────────────────┐     ┌──────────────────────┐
│ 4. Process Webhook  │◄────│ 3. Stripe sends       │
│                     │     │    webhook event       │
│  a. Check eventId   │     │    (checkout.complete) │
│     in WebhookEvent │     └──────────────────────┘
│     (idempotency)   │
│                     │
│  b. Verify Stripe   │
│     signature       │
│                     │
│  c. DB Transaction: │
│     - Payment.create│
│     - Order→PAID    │
│     - Enrollment    │
│       .create       │
│     - User.plan     │
│       →PREMIUM      │
│                     │
│  d. Log to          │
│     WebhookEvent    │
└─────────────────────┘

Idempotency Guard (3 layers):
1. Order.idempotencyKey — prevents duplicate orders from double-click
2. WebhookEvent.stripeEventId — prevents duplicate webhook processing
3. Payment.stripePaymentId — prevents duplicate payment records
```

---

## 9. New Prisma Schema Additions

```prisma
// ==================== NEW: Role update ====================

enum Role {
  STUDENT     // renamed from LEARNER
  INSTRUCTOR
  ADMIN
}

enum Plan {
  FREE
  PREMIUM
  PRO         // instructor plan
}

// ==================== NEW: Refresh Token ====================

model RefreshToken {
  id         String    @id @default(cuid())
  userId     String
  token      String    @unique
  family     String    // Token family for rotation detection
  expiresAt  DateTime
  revokedAt  DateTime?
  replacedBy String?   // Points to next token in rotation chain
  createdAt  DateTime  @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([family])
}

// ==================== NEW: Course ====================

enum Language {
  CHINESE
  ENGLISH
}

model Course {
  id           String   @id @default(cuid())
  title        String
  slug         String   @unique
  description  String
  language     Language @default(CHINESE)
  level        Int      @default(1)
  price        Int      @default(0) // cents (VND * 100)
  currency     String   @default("VND")
  thumbnail    String?
  isPublished  Boolean  @default(false)
  isFeatured   Boolean  @default(false)
  enrollCount  Int      @default(0)
  instructorId String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  instructor  User          @relation("InstructorCourses", fields: [instructorId], references: [id])
  lessons     Lesson[]
  enrollments Enrollment[]
  orders      Order[]

  @@index([language, level])
  @@index([instructorId])
  @@index([slug])
  @@index([isPublished, isFeatured])
}

// ==================== NEW: Enrollment ====================

enum EnrollStatus {
  ACTIVE
  EXPIRED
  REFUNDED
}

model Enrollment {
  id         String       @id @default(cuid())
  userId     String
  courseId    String
  status     EnrollStatus @default(ACTIVE)
  enrolledAt DateTime     @default(now())
  expiresAt  DateTime?

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
}

// ==================== NEW: Order & Payment ====================

enum OrderStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  CANCELLED
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  courseId         String
  status          OrderStatus @default(PENDING)
  amount          Int         // cents
  currency        String      @default("VND")
  stripeSessionId String?     @unique
  idempotencyKey  String      @unique
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  course   Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  payments Payment[]

  @@index([userId])
  @@index([status])
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

model Payment {
  id              String        @id @default(cuid())
  orderId         String
  stripePaymentId String        @unique
  amount          Int
  currency        String        @default("VND")
  status          PaymentStatus @default(PENDING)
  method          String?       // card, bank_transfer, etc.
  failureReason   String?
  paidAt          DateTime?
  refundedAt      DateTime?
  createdAt       DateTime      @default(now())

  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
}

// ==================== NEW: Webhook Idempotency Log ====================

model WebhookEvent {
  id            String    @id @default(cuid())
  stripeEventId String    @unique
  type          String    // checkout.session.completed, etc.
  payload       Json
  processedAt   DateTime?
  error         String?
  createdAt     DateTime  @default(now())
}
```

---

## 10. Migration Strategy (Zero Downtime)

```
Step 1: Add new models + columns (non-breaking)
  - Add Course, Enrollment, Order, Payment, WebhookEvent, RefreshToken
  - Add courseId (nullable) to Lesson
  - Add stripeCustomerId (nullable) to User
  - Add isFree (nullable, default true) to Lesson

Step 2: Data migration
  - Create default Course per HSK level (auto-generated)
  - Link existing Lessons to their Course
  - Set existing users role: LEARNER → STUDENT

Step 3: Make courseId required
  - After migration, alter column to NOT NULL

Step 4: Deploy new code
  - New routes, payment flow, instructor dashboard
```

---

## 11. Docker-Ready Structure (future)

```dockerfile
# Dockerfile (when needed — Vercel handles this now)
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml (local dev alternative)
services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
    depends_on: [redis]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Role rename LEARNER→STUDENT breaks existing users | HIGH | DB migration script updates all rows |
| Stripe VND không hỗ trợ | MEDIUM | Stripe hỗ trợ VND. Fallback: USD conversion |
| Redis downtime | LOW | Graceful fallback to direct DB query |
| Neon cold start under load | MEDIUM | Keep-alive ping + connection pooler |
| Webhook replay attack | HIGH | stripeEventId unique constraint + signature verification |
| Double payment | CRITICAL | 3-layer idempotency (order key + event ID + payment ID) |

---

## Success Criteria

- [ ] Schema migration runs without data loss
- [ ] All 3 roles can login and see appropriate UI
- [ ] Course CRUD works for INSTRUCTOR and ADMIN
- [ ] Payment flow: click buy → Stripe → webhook → enrollment created
- [ ] Double webhook replay returns 200 OK without duplicate records
- [ ] 100 concurrent logins complete in < 2s avg response time
- [ ] Redis cache hit ratio > 80% for course listing pages
