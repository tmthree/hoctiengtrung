# Implementation Plan: Học Tiếng Trung (hoctiengtrung.app)

**Created**: 2026-04-05
**Phases**: 8
**Tech**: Next.js 15 + Tailwind v4 + shadcn/ui + Neon PostgreSQL + Prisma + Better Auth + next-intl + TanStack Query + Zod

---

## Context

Project scaffolding (Skill OS) đã tạo xong: CLAUDE.md, docs/, module CLAUDE.md, directories. Chưa có code. Cần implement full web app học tiếng Trung từ foundation đến deploy.

## Design Reference

Phong cách lấy cảm hứng từ **TalkPal.ai** — xem chi tiết tại `docs/design-guidelines.md`.

**Key colors**: Primary indigo `#2E3BC7`, accent rose `#CF2562`, background `#FBFBFE`, muted section `#F6F7FB`
**Fonts**: Inter (UI) + Noto Sans SC (Chinese characters)
**Style**: Clean, minimal, pill-shaped CTA buttons, rounded cards, alternating section backgrounds, hero with left text + right illustration

---

## Phase 1: Foundation — Init, Dependencies, Core Config

**Goal**: Dev server chạy được với Tailwind v4, shadcn/ui, Prisma → Neon, Better Auth, next-intl, TanStack Query, middleware.

### Install
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias="@/*"
npx shadcn@latest init
npm i @prisma/client @prisma/adapter-neon @neondatabase/serverless better-auth next-intl @tanstack/react-query zod next-themes clsx tailwind-merge lucide-react
npm i -D prisma tsx
```

### Files to create/modify

| File | Purpose |
|------|---------|
| `next.config.ts` | NextConfig + createNextIntlPlugin |
| `src/app/globals.css` | Tailwind v4 `@import "tailwindcss"`, `@theme` tokens, shadcn CSS vars |
| `src/app/layout.tsx` | Root layout: html, body, Inter + Noto Sans SC fonts, providers |
| `src/app/not-found.tsx` | Global 404 |
| `src/app/error.tsx` | Global error boundary |
| `src/config/site.ts` | siteConfig: name, description, url |
| `src/config/routing.ts` | defineRouting: locales ["vi","en"], defaultLocale "vi" |
| `src/i18n/request.ts` | getRequestConfig — loads locale JSON |
| `src/i18n/navigation.ts` | createNavigation(routing) — Link, redirect, usePathname, useRouter |
| `src/lib/db.ts` | Prisma singleton + PrismaNeon adapter |
| `src/lib/auth.ts` | betterAuth() server config + nextCookies() plugin |
| `src/lib/auth-client.ts` | createAuthClient() |
| `src/lib/utils.ts` | cn() helper |
| `src/providers/query-provider.tsx` | QueryClientProvider singleton |
| `src/providers/theme-provider.tsx` | next-themes ThemeProvider |
| `src/middleware.ts` | Combined: next-intl locale + Better Auth guard on (app)/(admin) |
| `src/app/api/auth/[...all]/route.ts` | Better Auth catch-all handler |
| `prisma/schema.prisma` | Full schema: User(Role), Session, Account, Verification, Lesson, Vocabulary, LessonVocabulary, Exercise, UserProgress, VocabularyReview, QuizAttempt, LearningStreak |
| `messages/vi.json` | Common namespace: save, cancel, delete, loading, error, back, next, search |
| `messages/en.json` | Mirror English |
| `src/app/[locale]/layout.tsx` | NextIntlClientProvider |
| `src/app/[locale]/page.tsx` | Placeholder landing |
| `package.json` | Add scripts: db:push, db:migrate, db:seed, db:studio |

### Verify
- `npm run dev` → localhost:3000 OK
- `/` redirects to `/vi`
- `npx prisma db push` → schema deployed to Neon
- `npm run build` → no errors

---

## Phase 2: Layouts & Navigation

**Goal**: 4 layout shells + responsive sidebar, topbar, navbar, footer, locale switcher.
**Depends on**: Phase 1

### shadcn components
```bash
npx shadcn@latest add button sheet separator avatar dropdown-menu
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/constants/navigation.ts` | App nav items + admin nav items (icons, paths, labels) |
| `src/components/layout/navbar.tsx` | Public navbar: logo, links, locale switcher, login/register |
| `src/components/layout/footer.tsx` | Footer: links, copyright |
| `src/components/layout/sidebar.tsx` | App sidebar: nav items, active state, Sheet on mobile |
| `src/components/layout/topbar.tsx` | Mobile hamburger, breadcrumb area, user avatar dropdown |
| `src/components/layout/admin-sidebar.tsx` | Admin-specific nav |
| `src/components/layout/locale-switcher.tsx` | "use client" — vi/en dropdown |
| `src/components/layout/user-menu.tsx` | "use client" — avatar, name, logout |
| `src/components/layout/mobile-nav.tsx` | "use client" — Sheet-based sidebar |
| `src/app/[locale]/(marketing)/layout.tsx` | Navbar + Footer |
| `src/app/[locale]/(auth)/layout.tsx` | Centered card layout |
| `src/app/[locale]/(app)/layout.tsx` | Sidebar + Topbar + main |
| `src/app/[locale]/(admin)/admin/layout.tsx` | Admin sidebar + header |
| `messages/vi.json` | nav namespace |

### Verify
- `/vi` → marketing layout (navbar + footer visible)
- `/vi/login` → auth layout (centered card shell)
- `/vi/dashboard` → redirect to login (no session)
- Locale switcher toggles `/vi` ↔ `/en`
- Responsive at 375px, 768px, 1280px

---

## Phase 3: Authentication

**Goal**: Email/password login, register, forgot-password. Auth guard end-to-end.
**Depends on**: Phase 2

### Install
```bash
npx shadcn@latest add input label card form toast sonner
npm i @hookform/resolvers react-hook-form
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/validators/auth.ts` | loginSchema, registerSchema, forgotPasswordSchema (Vietnamese errors) |
| `src/components/auth/login-form.tsx` | react-hook-form + zodResolver → authClient.signIn.email() |
| `src/components/auth/register-form.tsx` | → authClient.signUp.email() |
| `src/components/auth/forgot-password-form.tsx` | Email input → Better Auth forgot password |
| `src/components/auth/social-login-buttons.tsx` | Google OAuth (conditional on env var) |
| `src/app/[locale]/(auth)/login/page.tsx` | Card + LoginForm + links |
| `src/app/[locale]/(auth)/register/page.tsx` | Card + RegisterForm |
| `src/app/[locale]/(auth)/forgot-password/page.tsx` | Card + ForgotPasswordForm |
| `src/hooks/use-auth.ts` | Wrapper for authClient.useSession() |
| `src/components/layout/user-menu.tsx` | **Update**: real session + logout |

### Verify
- Register → user in Prisma Studio
- Login → redirect to /vi/dashboard
- Logout → back to /vi/login
- /vi/dashboard accessible when logged in
- /vi/login while logged in → redirect to /vi/dashboard
- Vietnamese error messages on invalid input

---

## Phase 4: Landing & Marketing

**Goal**: Landing page (hero, features, CTA), About, Contact, Pricing.
**Depends on**: Phase 2, Phase 3 (auth links)
**Can parallel with**: Phase 5

### Files

| File | Purpose |
|------|---------|
| `src/app/[locale]/page.tsx` | Hero, features grid (6 cards), how-it-works, CTA banner |
| `src/components/shared/chinese-text.tsx` | `<ruby>` pinyin annotation component |
| `src/app/[locale]/(marketing)/about/page.tsx` | Mission, methodology, HSK overview |
| `src/app/[locale]/(marketing)/contact/page.tsx` | Contact form UI |
| `src/app/[locale]/(marketing)/pricing/page.tsx` | Free tier card |
| `messages/vi.json` | landing, about, contact, pricing namespaces |

### Verify
- `/vi` renders full landing with hero, features, CTA
- CTA → `/vi/register`
- `chinese-text` shows pinyin above characters correctly
- Responsive at mobile/desktop
- Lighthouse > 90

---

## Phase 5: Lessons & Vocabulary

**Goal**: HSK 1-3 seed data, lesson list/detail, vocabulary list/detail, filtering, pagination.
**Depends on**: Phase 1 (schema), Phase 3 (auth guard)

### Install
```bash
npx shadcn@latest add table tabs select dialog scroll-area skeleton
npm i @tanstack/react-table
```

### Files

| File | Purpose |
|------|---------|
| `prisma/seed.ts` | HSK 1-3 vocabulary (~600 words), 15 lessons, exercises |
| `src/lib/queries/lessons.ts` | getLessons(), getLessonById(), getLessonVocabulary() |
| `src/lib/queries/vocabulary.ts` | getVocabulary(), getVocabularyById() |
| `src/lib/constants/hsk-levels.ts` | Level definitions, colors, word counts |
| `src/lib/constants/exercise-types.ts` | Exercise type labels (Vietnamese) |
| `src/components/shared/hsk-level-filter.tsx` | HSK 1-6 tab filter → URL searchParams |
| `src/components/shared/search-input.tsx` | Debounced search → URL searchParams |
| `src/components/shared/pagination.tsx` | Page nav buttons |
| `src/components/shared/empty-state.tsx` | Empty state with icon + message |
| `src/components/lessons/lesson-card.tsx` | Title, HSK badge, description, progress |
| `src/components/lessons/lesson-content.tsx` | Render lesson content JSON blocks |
| `src/components/lessons/lesson-vocabulary-list.tsx` | Vocabulary table for lesson |
| `src/components/vocabulary/vocabulary-card.tsx` | Character, pinyin, meaning |
| `src/components/vocabulary/word-detail.tsx` | Full detail: character, pinyin, meaning, example, stroke order placeholder |
| `src/app/[locale]/(app)/lessons/page.tsx` | HSK filter + search + LessonList + pagination |
| `src/app/[locale]/(app)/lessons/[id]/page.tsx` | Lesson content + vocabulary + quiz link |
| `src/app/[locale]/(app)/vocabulary/page.tsx` | HSK filter + search + VocabularyList + pagination |
| `src/app/[locale]/(app)/vocabulary/[id]/page.tsx` | Word detail |
| `src/types/lesson.ts` | LessonContent JSON types, ExerciseQuestion/Answer unions |
| `messages/vi.json` | lessons, vocabulary namespaces |

### Verify
- `npm run db:seed` → data in Prisma Studio
- `/vi/lessons` → lesson cards, HSK filter works
- `/vi/lessons/[id]` → content + vocabulary table
- `/vi/vocabulary` → word grid, search filters
- `/vi/vocabulary/[id]` → word detail
- Pagination, loading skeletons, empty state all work

---

## Phase 6: Flashcards & Practice

**Goal**: SM-2 spaced repetition, flashcard deck, quiz engine (6 exercise types).
**Depends on**: Phase 5

### Install
```bash
npx shadcn@latest add progress radio-group slider
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/spaced-repetition.ts` | Pure SM-2 function: calculateNextReview(quality, ease, interval, reps) |
| `src/lib/actions/vocabulary-actions.ts` | submitReview(), startFlashcardSession() |
| `src/lib/actions/quiz-actions.ts` | submitQuizAnswer(), completeQuiz() |
| `src/lib/actions/streak-actions.ts` | recordStudyActivity() |
| `src/lib/queries/exercises.ts` | getExercisesByLesson(), getDueReviews() |
| `src/lib/validators/practice.ts` | reviewSchema, quizAnswerSchema |
| `src/hooks/use-flashcard-session.ts` | Deck state: cards, currentIndex, isFlipped, stats |
| `src/hooks/use-quiz-state.ts` | Quiz flow: exercises, currentIndex, answers, score |
| `src/hooks/use-audio-player.ts` | Audio play/pause |
| `src/components/vocabulary/flashcard-deck.tsx` | 3D flip card + quality rating (Again/Hard/Good/Easy) |
| `src/components/vocabulary/flashcard-stats.tsx` | Session summary |
| `src/components/practice/quiz-flow.tsx` | Exercise orchestrator + progress bar |
| `src/components/practice/exercise-multiple-choice.tsx` | 4 options, green/red feedback |
| `src/components/practice/exercise-fill-blank.tsx` | Sentence + input blank |
| `src/components/practice/exercise-listening.tsx` | Audio + answer |
| `src/components/practice/exercise-matching.tsx` | Click-to-match pairs |
| `src/components/practice/exercise-tone.tsx` | Tone selection buttons |
| `src/components/practice/exercise-pinyin.tsx` | Character → pinyin input |
| `src/components/practice/quiz-results.tsx` | Score, breakdown, retry |
| `src/app/[locale]/(app)/practice/page.tsx` | Practice hub: flashcards + quizzes |
| `src/app/[locale]/(app)/practice/flashcards/page.tsx` | FlashcardDeck |
| `src/app/[locale]/(app)/practice/quiz/[lessonId]/page.tsx` | QuizFlow |
| `messages/vi.json` | practice namespace |

### Verify
- `/vi/practice` → practice hub
- `/vi/practice/flashcards` → due words as cards
- Card flip animation + quality rating → vocabulary_review updated in DB
- SM-2: "Again" resets interval; "Good" increases interval
- `/vi/practice/quiz/[id]` → exercises render correctly per type
- Quiz results shows score + breakdown
- learning_streak row created for today

---

## Phase 7: Dashboard & Profile

**Goal**: Progress overview, streak calendar, daily goals, achievements, profile settings.
**Depends on**: Phase 3, Phase 5, Phase 6

### Install
```bash
npx shadcn@latest add calendar chart tooltip switch
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/queries/progress.ts` | getUserStats(), getStreakCalendar(), getRecentActivity() |
| `src/lib/queries/achievements.ts` | getUserAchievements() |
| `src/lib/actions/profile-actions.ts` | updateProfile(), updateDailyGoal() |
| `src/lib/validators/profile.ts` | updateProfileSchema, updateGoalSchema |
| `src/lib/constants/achievements.ts` | Achievement definitions + conditions |
| `src/components/dashboard/stats-overview.tsx` | 4 stat cards: lessons, words, streak, time |
| `src/components/dashboard/streak-calendar.tsx` | Month calendar with activity dots |
| `src/components/dashboard/daily-goal-ring.tsx` | SVG circular progress ring |
| `src/components/dashboard/recent-activity.tsx` | Activity timeline |
| `src/components/dashboard/continue-learning.tsx` | Next lesson/review suggestion |
| `src/components/dashboard/hsk-progress.tsx` | HSK level progress bars |
| `src/components/profile/profile-form.tsx` | Name edit + avatar |
| `src/components/profile/daily-goal-setting.tsx` | Minutes slider |
| `src/components/profile/achievement-grid.tsx` | Achievement badges (locked/unlocked) |
| `src/components/profile/study-stats.tsx` | Detailed stats |
| `src/app/[locale]/(app)/dashboard/page.tsx` | Full dashboard layout |
| `src/app/[locale]/(app)/profile/page.tsx` | Profile page |
| `messages/vi.json` | dashboard, profile namespaces |

### Verify
- `/vi/dashboard` → real stats from user activity
- Streak calendar highlights study days
- Daily goal ring reflects progress
- `/vi/profile` → save name, set daily goal, view achievements
- Achievement unlocks based on real conditions

---

## Phase 8: Admin Panel

**Goal**: Lesson/vocabulary CRUD, bulk CSV import, exercise management, user management, admin stats.
**Depends on**: Phase 3 (admin role), Phase 5 (content models)
**Can parallel with**: Phase 7

### Install
```bash
npm i papaparse && npm i -D @types/papaparse
```

### Files

| File | Purpose |
|------|---------|
| `src/lib/queries/admin.ts` | getAdminStats(), getAllUsers(), getAllLessonsAdmin() |
| `src/lib/actions/admin-lesson-actions.ts` | CRUD lessons (admin role check) |
| `src/lib/actions/admin-vocabulary-actions.ts` | CRUD + bulkImportVocabulary() |
| `src/lib/actions/admin-exercise-actions.ts` | CRUD exercises |
| `src/lib/actions/admin-user-actions.ts` | updateUserRole() |
| `src/lib/validators/admin.ts` | All admin Zod schemas |
| `src/components/admin/admin-stats.tsx` | 4 stat cards |
| `src/components/admin/lesson-table.tsx` | TanStack Table + sort/filter |
| `src/components/admin/lesson-form.tsx` | Create/edit lesson form |
| `src/components/admin/vocabulary-table.tsx` | TanStack Table + search |
| `src/components/admin/vocabulary-form.tsx` | Create/edit vocabulary form |
| `src/components/admin/vocabulary-bulk-import.tsx` | CSV upload → preview → import |
| `src/components/admin/exercise-form.tsx` | Dynamic form by exercise type |
| `src/components/admin/user-table.tsx` | User list + role management |
| `src/app/[locale]/(admin)/admin/page.tsx` | Admin dashboard |
| `src/app/[locale]/(admin)/admin/lessons/page.tsx` | Lesson table |
| `src/app/[locale]/(admin)/admin/lessons/new/page.tsx` | Create lesson |
| `src/app/[locale]/(admin)/admin/lessons/[id]/edit/page.tsx` | Edit lesson |
| `src/app/[locale]/(admin)/admin/vocabulary/page.tsx` | Vocabulary table + bulk import |
| `src/app/[locale]/(admin)/admin/vocabulary/new/page.tsx` | Add word |
| `src/app/[locale]/(admin)/admin/vocabulary/[id]/edit/page.tsx` | Edit word |
| `src/app/[locale]/(admin)/admin/users/page.tsx` | User management |
| `messages/vi.json` | admin namespace |

### Verify
- Non-admin → redirect from `/vi/admin`
- Lesson CRUD → changes reflected in `/vi/lessons`
- Vocabulary CRUD → reflected in `/vi/vocabulary`
- Bulk CSV import: upload 50 rows → all imported
- Exercise CRUD → appears in lesson quiz
- User role change → new access level works
- Vietnamese validation errors on all forms

---

## Phase Dependency Graph

```
Phase 1 (Foundation)
    ↓
Phase 2 (Layouts)
    ↓
Phase 3 (Auth) ─────────────────────────────────────┐
    ↓                    ↓                           ↓
Phase 4 (Landing)    Phase 5 (Lessons/Vocab)    Phase 8 (Admin)
  [parallel]             ↓                      [parallel]
                     Phase 6 (Practice)
                         ↓
                     Phase 7 (Dashboard)
```

## Critical Files

| File | Why |
|------|-----|
| `prisma/schema.prisma` | Every feature depends on schema |
| `src/middleware.ts` | i18n routing + auth guard for all routes |
| `src/lib/db.ts` | Every query/action imports this |
| `src/lib/auth.ts` | Auth config, session, role checking |
| `src/lib/spaced-repetition.ts` | Core SM-2 algorithm |

## Total Estimated Files

| Phase | Files |
|-------|:-----:|
| 1 Foundation | ~22 |
| 2 Layouts | ~15 |
| 3 Auth | ~12 |
| 4 Landing | ~8 |
| 5 Lessons/Vocab | ~25 |
| 6 Practice | ~20 |
| 7 Dashboard/Profile | ~18 |
| 8 Admin | ~22 |
| **Total** | **~142** |
