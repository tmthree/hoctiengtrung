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
