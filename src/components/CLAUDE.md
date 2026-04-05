# src/components/ — React Components

## Organization

Feature-based folders, NOT type-based:

```
components/
├── ui/           # shadcn/ui (CLI-managed, DO NOT edit manually)
├── layout/       # App shell: sidebar, topbar, navbar, footer
├── shared/       # Cross-cutting: used by 3+ features
├── auth/         # Login, register, social login forms
├── dashboard/    # Progress overview, streak, activity
├── lessons/      # Lesson cards, content, exercises
├── vocabulary/   # Word cards, flashcards, word lists
├── practice/     # Quiz, listening, writing canvas
├── profile/      # Stats, settings, achievements
└── admin/        # Data tables, forms, bulk import
```

## Conventions

- **Server Components** by default — add `"use client"` only when needed
- **Props interface** defined in same file, above component
- **One component per file** (exception: small helper components)
- **kebab-case** file naming: `lesson-card.tsx`, `flashcard-deck.tsx`
- **Max 200 lines** — extract into sub-components if larger

## shadcn/ui Rules

- `ui/` folder is managed by `npx shadcn@latest add <name>`
- Customize via `className` prop or wrapper components
- Never edit files in `ui/` directly

## Shared Components

Only put in `shared/` if used by 3+ feature folders:
- `chinese-text.tsx` — Chinese character with pinyin annotation
- `hsk-level-filter.tsx` — HSK 1-6 filter selector
- `search-input.tsx`, `pagination.tsx`, `empty-state.tsx`, etc.
