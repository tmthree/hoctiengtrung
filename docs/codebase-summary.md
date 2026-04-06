# Codebase Summary — Học Tiếng Trung

**Last Updated**: April 2026 | **Status**: v0.1.0 (Initial Implementation)

## Quick Stats

| Metric | Count |
|--------|-------|
| Total Source Files | 148 |
| React Components | 76 |
| Pages & Layouts | 30 |
| API Routes & Handlers | 1 |
| Lib Functions (queries, actions, validators) | 24 |
| Custom Hooks | 3 |
| UI Components (shadcn/ui) | 17 |
| Prisma Models | 12 |

## Directory Structure

### `src/app/` — Next.js 16 App Router (30 files)

```
src/app/
├── layout.tsx                    # Root layout
├── error.tsx                     # Global error boundary
├── not-found.tsx                 # 404 page
├── proxy.ts                      # next-intl middleware (Next.js 16 naming)
│
└── [locale]/                     # Locale prefix wrapper (vi|en)
    ├── layout.tsx                # Locale-aware root layout
    ├── page.tsx                  # Landing page (public)
    │
    ├── (marketing)/              # Public pages (no auth required)
    │   ├── layout.tsx
    │   ├── page.tsx              # Marketing home
    │   ├── about/page.tsx        # About page
    │   ├── pricing/page.tsx      # Pricing page
    │   └── contact/page.tsx      # Contact page
    │
    ├── (auth)/                   # Auth pages (redirect if logged in)
    │   ├── layout.tsx            # Centered card layout
    │   ├── login/page.tsx        # Login form
    │   ├── register/page.tsx     # Register form
    │   └── forgot-password/page.tsx
    │
    ├── (app)/                    # Protected learner area
    │   ├── layout.tsx            # Sidebar + topbar
    │   ├── dashboard/            # Dashboard with stats, streak, progress
    │   │   ├── page.tsx
    │   │   └── loading.tsx
    │   ├── lessons/              # Browse & study lessons
    │   │   ├── page.tsx
    │   │   ├── [id]/page.tsx     # Lesson detail
    │   │   └── loading.tsx
    │   ├── vocabulary/           # Word list & flashcards
    │   │   ├── page.tsx
    │   │   ├── [id]/page.tsx     # Word detail
    │   │   └── loading.tsx
    │   ├── practice/             # Practice modes
    │   │   ├── page.tsx          # Hub
    │   │   ├── flashcards/page.tsx    # Spaced repetition
    │   │   └── quiz/[lessonId]/page.tsx # 6 exercise types
    │   └── profile/              # User profile, achievements
    │       ├── page.tsx
    │       └── loading.tsx
    │
    └── (admin)/admin/            # Admin panel (ADMIN role)
        ├── layout.tsx            # Admin sidebar
        ├── page.tsx              # Dashboard
        ├── users/page.tsx        # User management
        ├── lessons/              # Lesson CRUD
        │   ├── page.tsx
        │   ├── new/page.tsx
        │   └── [id]/edit/page.tsx
        └── vocabulary/           # Vocabulary CRUD + bulk import
            ├── page.tsx
            ├── new/page.tsx
            ├── [id]/edit/page.tsx
            └── (bulk import handled in page)
```

### `src/components/` — React Components (76 files)

#### **UI Components** (17 files, shadcn/ui)
- `ui/` — Unstyled, accessible components: `avatar`, `badge`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `tooltip`

#### **Feature Components**

| Feature | Files | Purpose |
|---------|-------|---------|
| **Admin** | 8 | Dashboard stats, CRUD forms (lesson/vocab), user/vocabulary tables, bulk CSV import |
| **Auth** | 3 | Login, register, forgot-password forms with validation |
| **Dashboard** | 5 | Stats overview, streak calendar, HSK progress chart, daily goal ring, continue learning widget |
| **Landing** | 5 | TalkPal-inspired hero, features, HSK levels display, how-it-works, CTA |
| **Layout** | 8 | Navbar, sidebar, topbar, admin sidebar, mobile nav, user menu, locale switcher, footer, logo |
| **Lessons** | 2 | Lesson card, rich content renderer (supports text, audio, images) |
| **Practice** | 7 | Quiz flow manager, 6 exercise types (multiple-choice, fill-blank, listening, tone, pinyin, matching), results display |
| **Profile** | 3 | User profile form, daily goal settings, achievements grid |
| **Shared** | 7 | Chinese text display, search input, pagination, HSK filter, empty state, contact form |
| **Vocabulary** | 4 | Flashcard deck (SM-2), word detail, vocabulary card, flashcard stats |

### `src/lib/` — Business Logic (24 files)

#### **queries/** — Data fetching (Server Components)
- `lessons.ts` — Fetch lessons, lesson by ID, lesson by HSK level
- `vocabulary.ts` — Fetch words, words by lesson/HSK, word by ID
- `user-progress.ts` — Fetch user progress, streak, daily stats
- `quiz.ts` — Fetch quiz exercises, quiz results

#### **actions/** — Server Actions (mutations)
- `auth-actions.ts` — Sign in, sign up, sign out, reset password
- `lesson-actions.ts` — Create, update, delete lessons (admin only)
- `vocabulary-actions.ts` — Create, update, delete words; bulk import CSV
- `quiz-actions.ts` — Submit quiz answers, record quiz attempts
- `profile-actions.ts` — Update profile, change password, set daily goal
- `flashcard-actions.ts` — Record vocabulary review (SM-2 algorithm)

#### **validators/** — Zod schemas
- `auth.ts` — Login, register, reset password schemas
- `lesson.ts` — Create/update lesson schema
- `vocabulary.ts` — Create/update word, bulk import schema
- `quiz.ts` — Quiz answer submission schema
- `profile.ts` — Profile update schema

#### **constants/** — Static data
- `hsk-levels.ts` — HSK level definitions (1-6)
- `exercise-types.ts` — Exercise type enum & metadata
- `error-messages.ts` — Standardized error messages

#### **utils/** — Utilities
- `db.ts` — Prisma client initialization
- `auth.ts` — Better Auth setup & session helpers
- `cn.ts` — Tailwind class merge utility
- `spaced-repetition.ts` — SM-2 algorithm implementation
- `date-utils.ts` — Streak calculation, formatting
- `slug.ts` — URL slug generation

### `src/hooks/` — Custom React Hooks (3 files)
- `use-auth.ts` — Auth state & session management
- `use-flashcard-session.ts` — Flashcard deck state (card position, stats)
- `use-quiz-state.ts` — Quiz session state (current exercise, answers, results)

### `src/types/` — TypeScript Types (1 file)
- `lesson.ts` — Content block type definitions (text, audio, image, nested arrays)

### `src/config/` — Configuration (2 files)
- `site.ts` — Site metadata, feature flags
- `routing.ts` — next-intl routing config (locales, defaultLocale)

### `src/i18n/` — Internationalization (2 files)
- `navigation.ts` — Locale-aware navigation helper
- `request.ts` — Server-side i18n request handler

### `src/providers/` — React Context Providers (2 files)
- `query-provider.tsx` — TanStack Query client setup
- `theme-provider.tsx` — next-themes dark/light mode provider

### `prisma/` — Database (3 files)
- `schema.prisma` — 12 models: User, Session, Account, Verification, Lesson, Exercise, Vocabulary, LessonVocabulary, UserProgress, VocabularyReview, QuizAttempt, LearningStreak
- `seed.ts` — Populate HSK 1-6 vocabulary (~2,500 words) + sample lessons
- `.env` — Database connection strings (Neon PostgreSQL)

### `messages/` — Translation Files (1+ files)
- `vi.json` — Vietnamese UI strings (namespaced by feature: `auth.*`, `lessons.*`, `dashboard.*`, etc.)
- `en.json` — English (optional future support)

### Root Configuration Files
- `next.config.ts` — Next.js config (turbopack, i18n plugin, redirects)
- `tailwind.config.ts` — Tailwind CSS v4 (theme colors, animations)
- `tsconfig.json` — TypeScript strict mode, `@/` path alias
- `eslint.config.ts` — ESLint rules (no-unused, type safety)
- `package.json` — Dependencies (Next.js 16, Prisma 7, shadcn/ui, Better Auth, etc.)

## Key Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend** | Next.js | 16.2.2 | Server components, SSR, App Router |
| **Language** | TypeScript | 5 | Type safety |
| **UI Framework** | React | 19.2.4 | Component rendering |
| **Styling** | Tailwind CSS | 4 | Utility-first CSS |
| **Components** | shadcn/ui | — | Accessible UI library |
| **Database** | PostgreSQL (Neon) | — | Serverless DB |
| **ORM** | Prisma | 7.6.0 | Type-safe DB queries |
| **Auth** | Better Auth | 1.5.6 | Email/password + OAuth |
| **i18n** | next-intl | 4.9.0 | Vietnamese/English support |
| **State** | TanStack Query | 5.96.2 | Client caching |
| **Forms** | React Hook Form + Zod | 7.72/4.3.6 | Form validation |
| **Deploy** | Vercel | — | Edge hosting |

## Code Patterns

### Server vs Client Components
- **Server Components (default)**: Pages, data fetching, layout
- **Client Components** (`"use client"`): Forms, interactive widgets, hooks
- Examples: `DashboardPage` (server) → fetches data → renders `StatsOverview` (client with charts)

### Data Flow
```
User Action (browser)
    ↓
Server Action (lib/actions/*)
    ↓
Prisma ORM
    ↓
Neon PostgreSQL
    ↑
Response (success/error) → TanStack Query → UI update
```

### Validation
- Zod schemas in `lib/validators/*`
- Shared by: server actions (parse input) + client forms (form state)
- Example: `createLessonSchema` validates both action input & form submission

### SM-2 Spaced Repetition
- Implemented in `lib/spaced-repetition.ts`
- Tracks `interval`, `ease`, `nextReviewDate` in `VocabularyReview` model
- Called on every vocabulary review via `flashcard-actions.ts`

### i18n Pattern
- All user-facing strings in `/messages/vi.json` (namespaced)
- Server: `getTranslations('namespace')`
- Client: `useTranslations('namespace')`
- Example: `<h1>{t('dashboard.title')}</h1>`

## File Organization Best Practices

1. **Kebab-case naming**: `flashcard-deck.tsx`, `lesson-actions.ts`
2. **Descriptive names**: LLM tools understand purpose from filename
3. **Max 200 lines per file**: Enforced via code review
4. **Feature-based folders**: Grouped by user journey, not type
5. **No barrel exports**: Import directly from files
6. **@/ path alias**: All imports relative to `src/`

## Build & Deployment

### Local Development
```bash
npm install
npm run dev          # Start dev server (localhost:3000)
npm run lint         # Check linting
npm run db:push      # Sync schema to Neon
npm run db:seed      # Populate sample data
```

### Production
```bash
npm run build        # Compile & bundle
npm run start        # Start server
```

### Vercel Deployment
- Auto-deployed from `main` branch
- Environment variables set in Vercel dashboard
- Neon branch database created per PR preview

## Testing & Quality
- ESLint enabled (strict TypeScript, no-unused-vars)
- Unit tests: TBD (Phase 9)
- E2E tests: TBD (Phase 9)
- Manual testing: Performed on all major features

## Known Limitations & TODOs

- Real audio files: Placeholder URLs → replace with actual MP3/audio files
- Mobile responsiveness: Core layouts done, detail pages need refinement
- HSK vocabulary: Seeded with ~2,500 words; expand to full corpus
- Admin analytics: Stats dashboard ready; add time-series graphs
- Export/import: Bulk CSV import done; add user data export
- Offline support: TBD (future phase)
- Performance: SSR ✓, Edge caching → add image optimization

## Notes for Developers

- Always read `docs/code-standards.md` before writing code
- Check `docs/system-architecture.md` for data flow
- Follow Prisma naming conventions (CamelCase models, camelCase fields)
- Use `cn()` utility for conditional Tailwind classes
- Never commit `.env.local` or secrets to git
- Run `npm run lint` before submitting PRs
