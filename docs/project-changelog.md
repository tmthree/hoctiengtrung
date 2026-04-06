# Project Changelog — Học Tiếng Trung

**Current Version**: v0.1.0 | **Last Updated**: April 6, 2026

## Version 0.1.0 — Initial Implementation (Complete)

**Release Date**: April 6, 2026
**Status**: Ready for beta testing & Neon deployment

### Features Implemented

#### **Phase 1: Environment & Setup** ✅
- Next.js 16 project with TypeScript, Tailwind CSS v4, shadcn/ui
- Neon PostgreSQL + Prisma ORM integration
- Better Auth (email/password) setup with User/Session/Account models
- next-intl i18n (Vietnamese default, English optional)
- TanStack Query + Zod for client state & validation

#### **Phase 2: Authentication** ✅
- Login page with email/password validation
- Register page with name, email, password fields
- Forgot password flow (email verification link)
- Session-based auth with 30-day cookie expiry
- Admin role authorization system
- Auth guard middleware (src/proxy.ts)

#### **Phase 3: Landing Page** ✅
- TalkPal-inspired design: hero section, features, HSK levels overview, how-it-works, CTA
- Responsive layout (desktop + mobile)
- Locale switcher (Vietnamese/English)
- Footer with links

#### **Phase 4: Database Schema** ✅
- 12 Prisma models: User, Session, Account, Verification, Lesson, Exercise, Vocabulary, LessonVocabulary, UserProgress, VocabularyReview, QuizAttempt, LearningStreak
- HSK level enums (1-6)
- Lesson types: GRAMMAR, CONVERSATION, READING, CULTURE
- Exercise types: MULTIPLE_CHOICE, FILL_BLANK, LISTENING, TONE, PINYIN, MATCHING
- User roles: LEARNER, ADMIN
- Indexes on frequently queried fields (hskLevel, isPublished, userId)

#### **Phase 5: Lessons Module** ✅
- Lessons page: browse all lessons, filter by HSK level, pagination
- Lesson detail page: rich content rendering (text, audio, images, nested arrays)
- Lesson card component with metadata (HSK level, type, progress indicator)
- Server-side data fetching via `lib/queries/lessons.ts`
- Admin CRUD: create, edit, delete lessons

#### **Phase 6: Vocabulary & Flashcards** ✅
- Vocabulary page: browse words, search, filter by HSK level, pagination
- Word detail page: pinyin, definition, examples, part of speech
- Flashcard deck with SM-2 spaced repetition algorithm
- Flashcard stats: reviews due, completion percentage
- Server Actions: `recordVocabularyReview()` implements SM-2 interval/ease calculation
- Admin CRUD: create, edit, delete words
- Bulk CSV import: upload file with columns (chinese, pinyin, definition, hskLevel)

#### **Phase 7: Quiz & Practice Engine** ✅
- Practice hub: quick access to flashcards and quiz modes
- Quiz flow manager with 6 exercise types:
  1. **Multiple Choice**: Pick correct definition/translation
  2. **Fill in the Blank**: Complete sentence with missing character(s)
  3. **Listening**: Audio playback + multiple choice
  4. **Tone Recognition**: Identify correct tone from audio
  5. **Pinyin Input**: Type pinyin for displayed Chinese text
  6. **Matching**: Match Chinese words to English definitions
- Exercise renderer: generates questions from lesson content + vocabulary
- Quiz results page: score, breakdown by exercise type, review option
- Validation: submit quiz answers via `submitQuizAnswer()` server action

#### **Phase 8: Dashboard & Profile** ✅
- **Dashboard**:
  - Stats overview: total words learned, lessons completed, current streak
  - Streak calendar: visual representation of learning consistency
  - HSK progress chart: words & lessons completed per level (1-6)
  - Daily goal ring: visual progress toward daily goal
  - Continue learning: quick access to in-progress lesson/flashcard
  - Recent activity feed: timestamped actions
- **Profile**:
  - User profile form: name, email, profile picture (avatar)
  - Daily goal settings: adjustable minutes per day (5-120)
  - Achievement grid: badges for milestones (7-day streak, 50 words, etc.)
  - Statistics: total words reviewed, lessons completed, longest streak
  - Settings: change password, logout

### Bug Fixes & Improvements
- Fixed locale prefix handling in middleware (`[locale]` param)
- Corrected file naming conventions (kebab-case throughout)
- Optimized query performance with Prisma `select` fields
- Added loading skeletons for better UX
- Implemented error boundaries and 404 page
- Validated all forms with Zod schemas

### Tech Stack Details
- **Framework**: Next.js 16.2.2 (turbopack, App Router)
- **Runtime**: React 19.2.4 + TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui (17 components)
- **Database**: Neon PostgreSQL + Prisma 7.6.0
- **Auth**: Better Auth 1.5.6
- **State Management**: TanStack Query 5.96.2
- **Validation**: Zod 4.3.6, React Hook Form 7.72.1
- **i18n**: next-intl 4.9.0
- **UI Icons**: Lucide React 1.7.0

### Files Created/Modified
- **Source files**: 148 total
- **React components**: 76 (11 feature groups + 17 UI components)
- **Pages & layouts**: 30 (1 root + 6 layouts + 23 pages)
- **Lib functions**: 24 (queries, actions, validators, constants, utils)
- **Custom hooks**: 3 (use-auth, use-flashcard-session, use-quiz-state)
- **Prisma models**: 12 with migrations

### Known Limitations (for Phase 9+)
- **Audio Files**: Currently using placeholder URLs; need real MP3/audio files for listening exercises
- **Mobile Responsiveness**: Core layouts done; detail pages need refinement (e.g., word cards on mobile)
- **HSK Vocabulary**: Seeded with ~2,500 words; expand to full corpus (8,000+ for HSK 6)
- **Admin Analytics**: Stats dashboard ready; add time-series graphs, export reports
- **User Data Export**: Bulk import done; add user progress export (CSV/PDF)
- **Offline Support**: TBD (Service Workers + IndexedDB)
- **Image Optimization**: Use `next/image` for Vercel image CDN
- **Performance Monitoring**: Add Sentry or Vercel Analytics

### Next Steps
1. Deploy to Vercel with custom domain (hoctiengtrung.app)
2. Set up Neon PostgreSQL: configure environment variables, run migrations
3. Seed production database with complete vocabulary data
4. Test end-to-end flows in staging environment
5. Add real audio files for listening exercises
6. Set up monitoring & error tracking (Sentry)
7. Gather feedback & plan Phase 9 enhancements

### Breaking Changes
None — this is the initial v0.1.0 release.

### Contributors
- Initial implementation by development team

---

## Future Versions

### v0.2.0 — Enhancements & Mobile Polish
- Improve mobile responsiveness (detail pages, forms)
- Add real audio files (tone examples, listening exercises)
- Expand HSK vocabulary corpus to 8,000+ words
- Admin analytics dashboard (time-series, user stats, export)
- User data export (CSV/PDF)

### v0.3.0 — Advanced Features
- Offline support (Service Workers, IndexedDB)
- Social features (leaderboards, friend challenges)
- Podcast/video content integration
- Writing practice with AI feedback
- Community vocabulary contributions

### v1.0.0 — Production Ready
- Full test coverage (unit + E2E)
- Performance optimizations (image CDN, advanced caching)
- Multi-platform support (iOS app, Android app)
- Advanced analytics dashboard
- Certification exams

---

## Deployment History

| Version | Date | Platform | Status |
|---------|------|----------|--------|
| v0.1.0 | Apr 6, 2026 | Local (TBD: Vercel) | Dev Complete |

---

## Notes
- All code follows standards in `docs/code-standards.md`
- Architecture documented in `docs/system-architecture.md`
- Database schema in `docs/database-schema.md`
- Deployment guide in `docs/deployment-guide.md`
