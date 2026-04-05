# src/types/ — TypeScript Type Definitions

## Conventions

- **Prisma types**: Use Prisma-generated types for DB entities (don't redefine)
- **Custom types**: Only for non-DB types (API responses, UI state, etc.)
- **One file per domain**: `lesson.ts`, `vocabulary.ts`, `practice.ts`
- **index.ts**: Re-export common types for convenience

## Files

- `lesson.ts` — Lesson content JSON shapes, exercise question/answer types
- `vocabulary.ts` — Stroke order data, flashcard session state
- `practice.ts` — Quiz state, answer submission types
- `progress.ts` — Dashboard stats, streak data
- `api.ts` — Generic API response wrapper types
- `index.ts` — Common re-exports

## Naming

- Types/Interfaces: PascalCase (`LessonContent`, `FlashcardState`)
- Enums: PascalCase with UPPER_CASE values
- Prefer `interface` for object shapes, `type` for unions/intersections
