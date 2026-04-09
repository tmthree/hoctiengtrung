# Code Standards — Học Tiếng Trung

## File Naming

- **kebab-case** for all files: `lesson-card.tsx`, `auth-actions.ts`
- **Descriptive names** — LLM tools should understand purpose from filename alone
- Components: `<feature>-<purpose>.tsx` (e.g., `flashcard-deck.tsx`)
- Actions: `<domain>-actions.ts` (e.g., `vocabulary-actions.ts`)
- Queries: `<domain>.ts` in `lib/queries/` (e.g., `lessons.ts`)
- Validators: `<domain>.ts` in `lib/validators/` (e.g., `lesson.ts`)

## File Size

- **Max 200 lines** per code file
- Split large files into focused modules
- Extract shared logic into `lib/` or `hooks/`

## Component Patterns

```tsx
// Server Component (default) — no directive needed
export default async function LessonList() {
  const lessons = await getLessons()
  return <div>...</div>
}

// Client Component — explicit directive
"use client"
export function FlashcardDeck({ words }: Props) {
  const [index, setIndex] = useState(0)
  return <div>...</div>
}
```

## Data Fetching

```tsx
// Server Component → direct query
import { getLessons } from "@/lib/queries/lessons"
const lessons = await getLessons()

// Client mutation → Server Action
import { createLesson } from "@/lib/actions/lesson-actions"
const result = await createLesson(formData)
```

## Validation Pattern

```tsx
// lib/validators/lesson.ts
export const createLessonSchema = z.object({
  title: z.string().min(1),
  hskLevel: z.number().min(1).max(6),
})

// Shared by: Server Action (validation) + Client Form (form state)
```

## Imports

- Use `@/` path alias for `src/` imports
- Group imports: React → Next.js → External → Internal → Types
- No barrel files (index.ts re-exports) — import directly

## TypeScript

- Strict mode enabled
- Prefer `interface` for component props
- Use Prisma generated types for DB entities
- Custom types in `src/types/`

## Styling

- Tailwind CSS utility classes
- shadcn/ui for complex components (Dialog, Table, etc.)
- `cn()` utility from `lib/utils.ts` for conditional classes
- No CSS modules, no styled-components

## Error Handling

- Server Actions: return `{ success: boolean, error?: string, data?: T }`
- API Routes: proper HTTP status codes
- Client: toast notifications for user-facing errors
- Never silently swallow errors

## i18n

- All user-facing strings in `/messages/vi.json`
- Namespaced by feature: `auth.login`, `lessons.title`, etc.
- Server Components: `getTranslations('namespace')`
- Client Components: `useTranslations('namespace')`

## JWT & Token Management

```tsx
// src/lib/auth-tokens.ts exports:
import { generateAccessToken, rotateRefreshToken, revokeTokenFamily } from "@/lib/auth-tokens"

// Generate new token pair
const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role })
const refreshToken = await generateRefreshToken(user)

// Rotate tokens (old → new pair, same family)
const { accessToken, refreshToken, userId } = await rotateRefreshToken(oldToken)

// Revoke all tokens in family (logout)
await revokeTokenFamily(tokenFamily)
```

- Access tokens: 15-minute JWT with role
- Refresh tokens: 7-day opaque UUID, stored in DB with family tracking
- Breach detection: If old token already revoked, revoke entire family
- Endpoints: `/api/auth/token/issue` (new pair), `/api/auth/token` (rotate)

## RBAC & Permissions

```tsx
// src/lib/rbac.ts exports:
import { hasPermission, requireRole, requirePermission } from "@/lib/rbac"

// Check permission
if (hasPermission(user.role, "course:create")) { ... }

// Require role in Server Action
export async function createCourse(data: FormData) {
  const session = await getSession()
  requireRole(session, "INSTRUCTOR", "ADMIN")
  // ... rest of logic
}

// Require specific permission
requirePermission(session, "course:edit")
```

Roles: LEARNER (none), INSTRUCTOR (course/lesson ops), ADMIN (all + user management).

## Payment Integration

```tsx
// Server Action: create checkout session with idempotency
import { createCheckoutSession } from "@/lib/actions/payment-actions"
const { success, url, error } = await createCheckoutSession(courseId)

// Stripe client (singleton)
import { stripe } from "@/lib/stripe"
const session = await stripe.checkout.sessions.retrieve(sessionId)

// Webhook: Stripe calls POST /api/webhooks/stripe with signature
// Handler verifies signature, checks event idempotency, dispatches to processor
```

Layer 1 idempotency: Reuse recent PENDING order if same user + course + < 30min.
Layer 2 idempotency: Check WebhookEvent.stripeEventId to prevent duplicate processing.
Layer 3 idempotency: Stripe prevents duplicate charges via checksum.

## Error Handling Pattern

```tsx
// Server Actions return consistent shape
export async function action(data: FormData) {
  try {
    const parsed = validator.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message }
    }
    const result = await db.model.create({ data: parsed.data })
    return { success: true, data: result }
  } catch (err) {
    console.error("[action]", err)
    return { success: false, error: "Đã xảy ra lỗi, vui lòng thử lại" }
  }
}
```

Always return `{ success, error?, data? }`. Vietnamese error messages.
