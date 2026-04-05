# src/lib/ — Utilities, Actions, Queries, Validators

## Structure

```
lib/
├── auth.ts           # Better Auth server instance
├── auth-client.ts    # Better Auth client instance
├── db.ts             # Prisma client singleton (Neon adapter)
├── utils.ts          # cn(), formatDate, helpers
├── actions/          # Server Actions ("use server")
├── queries/          # Data fetching functions (Server Components)
├── validators/       # Zod schemas (shared by actions + forms)
└── constants/        # App constants (HSK levels, nav items, etc.)
```

## Patterns

### Server Actions (`actions/`)
```tsx
"use server"
import { createLessonSchema } from "@/lib/validators/lesson"
import { auth } from "@/lib/auth"

export async function createLesson(data: FormData) {
  const session = await auth.api.getSession(...)
  if (!session) return { success: false, error: "Unauthorized" }
  const parsed = createLessonSchema.safeParse(...)
  // ... Prisma operation
  return { success: true, data: lesson }
}
```

### Queries (`queries/`)
```tsx
import { db } from "@/lib/db"

export async function getLessons(hskLevel?: number) {
  return db.lesson.findMany({ where: { hskLevel, isPublished: true } })
}
```
- No `"use server"` — these are plain async functions
- Called directly in Server Components
- Never mutate data in queries

### Validators (`validators/`)
```tsx
import { z } from "zod"
export const createLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề bắt buộc"),
  hskLevel: z.number().min(1).max(6),
})
```
- Shared by Server Actions (validation) AND Client Forms (form state)
- Error messages in Vietnamese

### Constants (`constants/`)
- `hsk-levels.ts` — HSK level definitions, colors, descriptions
- `exercise-types.ts` — Exercise type enum and labels
- `navigation.ts` — Sidebar/navbar items
- `site.ts` — Site name, description, URLs
