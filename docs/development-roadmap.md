# Development Roadmap — Học Tiếng Trung

**Last Updated**: April 6, 2026 | **Current Phase**: v0.1.0 (Complete)

## Timeline Overview

```
Phase 1-8        Phase 9          Phase 10        Phase 11+
(Complete)       (Q2 2026)        (Q3 2026)       (Future)
v0.1.0           v0.2.0           v0.3.0          v1.0.0
Beta Ready       Mobile Polish    Advanced        Production
```

---

## Completed Phases ✅

### Phase 1: Environment & Setup (Complete)
**Status**: ✅ Complete | **Duration**: 1 week | **Progress**: 100%

- Next.js 16 project scaffold with TypeScript, Tailwind CSS v4
- Neon PostgreSQL + Prisma ORM integration
- Better Auth configuration (email/password)
- next-intl setup (Vietnamese/English)
- TanStack Query + Zod ecosystem
- ESLint configuration

**Deliverables**: Project structure, dev environment ready

---

### Phase 2: Authentication System (Complete)
**Status**: ✅ Complete | **Duration**: 1.5 weeks | **Progress**: 100%

- User registration (email/password)
- Email verification flow
- Login with session-based auth
- Forgot password (email reset)
- Session middleware (src/proxy.ts)
- Admin role system
- Logout functionality

**Deliverables**: Auth fully functional, protected routes working

---

### Phase 3: Landing & Marketing Pages (Complete)
**Status**: ✅ Complete | **Duration**: 1 week | **Progress**: 100%

- TalkPal-inspired hero section
- Features showcase (6 key features)
- HSK levels overview
- How-it-works section
- Call-to-action buttons
- Footer with links
- Mobile responsive design
- Locale switcher (Vietnamese/English)

**Deliverables**: Public marketing site ready

---

### Phase 4: Database Schema & Seeding (Complete)
**Status**: ✅ Complete | **Duration**: 1 week | **Progress**: 100%

- Prisma schema: 12 models (auth + content + progress)
- Migrations setup for Neon
- Seed script: HSK 1-6 vocabulary (~2,500 words) + sample lessons
- Relationships: lessons ↔ vocabulary, user progress tracking
- Enums: HSK levels, lesson types, exercise types, user roles
- Database indexing for performance

**Deliverables**: Schema ready, seed data available

---

### Phase 5: Lessons Module (Complete)
**Status**: ✅ Complete | **Duration**: 1.5 weeks | **Progress**: 100%

- Lessons browse page (pagination, HSK filter)
- Lesson detail page with rich content renderer
- Content types: text blocks, audio, images, nested arrays
- Lesson card component with progress indicator
- Server-side data fetching
- Admin CRUD (create, edit, delete lessons)
- Lesson form with JSON content editor

**Deliverables**: Full lesson management system

---

### Phase 6: Vocabulary & Flashcards (Complete)
**Status**: ✅ Complete | **Duration**: 2 weeks | **Progress**: 100%

- Vocabulary browse page (search, filter, pagination)
- Word detail page (pinyin, definition, examples, part of speech)
- Flashcard deck component (SM-2 spaced repetition)
- SM-2 algorithm implementation (interval, ease, next review date)
- Flashcard statistics (due, completed, retention rate)
- Admin CRUD (create, edit, delete words)
- Bulk CSV import (chinese, pinyin, definition, hskLevel)
- CSV parsing & validation

**Deliverables**: Complete vocabulary & flashcard system

---

### Phase 7: Quiz & Practice Engine (Complete)
**Status**: ✅ Complete | **Duration**: 2 weeks | **Progress**: 100%

- Practice hub / mode selector
- 6 exercise types implemented:
  1. Multiple choice (4 options)
  2. Fill in the blank (single/multiple characters)
  3. Listening (audio + multiple choice)
  4. Tone recognition (4 tone options)
  5. Pinyin input (romanization)
  6. Matching (words ↔ definitions)
- Quiz flow manager with progress tracking
- Question generator from lesson content
- Validation & answer checking
- Quiz results page (score, breakdown, review option)
- Server actions for answer submission

**Deliverables**: Full-featured practice engine

---

### Phase 8: Dashboard & Profile (Complete)
**Status**: ✅ Complete | **Duration**: 1.5 weeks | **Progress**: 100%

**Dashboard**:
- Stats overview (words learned, lessons completed, streak)
- Streak calendar (visual 7-day/30-day view)
- HSK progress chart (words/lessons per level)
- Daily goal ring (visual progress)
- Continue learning widget
- Recent activity feed

**Profile**:
- User profile form (name, email, avatar)
- Daily goal settings (5-120 minutes adjustable)
- Achievement grid (milestone badges)
- Learning statistics
- Password change
- Logout

**Deliverables**: Complete user dashboard & profile

---

## Upcoming Phases

### Phase 9: Testing, Performance & Mobile Polish (Q2 2026)
**Priority**: HIGH | **Estimated Duration**: 3 weeks | **Target**: v0.2.0

#### 9a. Mobile Optimization
- [ ] Refine responsive design (detail pages, forms)
- [ ] Touch-friendly UI (larger buttons, adjusted spacing)
- [ ] Mobile-specific navigation (collapse sidebar, slide-out menu)
- [ ] Test on iOS (iPhone 12+) and Android (Galaxy S21+)
- [ ] Performance on slow networks (3G simulation)

#### 9b. Real Audio Files
- [ ] Procure/generate MP3 files for all vocabulary words
- [ ] Audio for tone examples (4 tones for common characters)
- [ ] Audio for listening exercise sentences
- [ ] Audio caching & lazy loading
- [ ] Audio player component refinement

#### 9c. Testing Suite
- [ ] Unit tests: utils, validators, spaced repetition logic
- [ ] Component tests: forms, flashcard deck, quiz flow
- [ ] E2E tests: auth flow, lesson completion, quiz submission
- [ ] Accessibility tests (WCAG 2.1 AA)
- [ ] Performance tests (Lighthouse, Web Vitals)

#### 9d. Performance Tuning
- [ ] Image optimization (next/image, Vercel CDN)
- [ ] Bundle analysis & code splitting review
- [ ] Database query optimization (N+1 prevention)
- [ ] Caching strategy refinement (TanStack Query + HTTP cache headers)
- [ ] Turbopack build time analysis

**Success Criteria**:
- ✅ Lighthouse score > 90 (Performance, Accessibility, SEO)
- ✅ All unit/component tests passing (>80% coverage)
- ✅ E2E tests for critical user journeys
- ✅ Mobile fully responsive & performant
- ✅ Real audio files integrated & tested

---

### Phase 10: Advanced Features & Scaling (Q3 2026)
**Priority**: MEDIUM | **Estimated Duration**: 4 weeks | **Target**: v0.3.0

#### 10a. Expanded Vocabulary
- [ ] Increase HSK corpus to 8,000+ words (current: ~2,500)
- [ ] Add phrase & idiom content (chengyu, common phrases)
- [ ] Community vocabulary contributions (crowd-sourced)
- [ ] Pronunciation variant support (simplified/traditional)
- [ ] Etymology & character composition (stroke order, radicals)

#### 10b. Admin Analytics Dashboard
- [ ] User statistics (sign-ups, active users, retention)
- [ ] Learning statistics (lessons completed, avg quiz score)
- [ ] Vocabulary analytics (most reviewed words, difficulty distribution)
- [ ] Time-series charts (daily/weekly/monthly trends)
- [ ] Export reports (CSV, PDF)
- [ ] User list with filters (role, registration date, last activity)

#### 10c. User Data Export
- [ ] Export learning progress (CSV: date, lesson, score)
- [ ] Export vocabulary reviews (CSV: word, interval, nextReview)
- [ ] Export achievements & statistics (PDF report)
- [ ] Scheduled export (email daily/weekly digest)

#### 10d. Social Features
- [ ] Public leaderboard (top learners, streak leaders)
- [ ] Friend system (add friends, view stats)
- [ ] Study groups (create, join, challenge friends)
- [ ] Community challenges (limited-time group goals)
- [ ] Badges & social sharing

#### 10e. Content Expansion
- [ ] YouTube video integration (lessons with video content)
- [ ] Podcast/audio lesson content
- [ ] Reading materials (articles, short stories)
- [ ] Cultural content (Chinese customs, festivals)

**Success Criteria**:
- ✅ Vocabulary corpus > 8,000 words
- ✅ Admin dashboard with 5+ chart types
- ✅ User export fully functional
- ✅ Social features beta-tested with 100+ users
- ✅ Video/podcast content integrated

---

### Phase 11: Certification & Advanced Learning (Q4 2026+)
**Priority**: LOW | **Estimated Duration**: 6+ weeks | **Target**: v1.0.0

#### 11a. Offline Support
- [ ] Service Worker for offline access (cached lessons, vocabulary)
- [ ] IndexedDB for local progress storage
- [ ] Sync when online (reupload progress, fetch new content)
- [ ] Offline quiz/flashcard practice
- [ ] Download content bundles for offline use

#### 11b. AI Features
- [ ] Writing practice with AI feedback (GPT integration)
- [ ] AI conversation partner (voice input, spoken feedback)
- [ ] Personalized learning recommendations
- [ ] Smart review reminders (SM-2 optimization)
- [ ] Difficulty adaptation (adjust based on performance)

#### 11c. Certification & Exams
- [ ] HSK mock exams (full-length, timed)
- [ ] Official HSK certification pathway
- [ ] Practice test banks (1,000+ questions)
- [ ] Exam result certificates (downloadable PDF)
- [ ] Score history & progress tracking

#### 11d. Platform Expansion
- [ ] iOS native app (React Native)
- [ ] Android native app (React Native)
- [ ] Desktop app (Electron)
- [ ] Tablet optimization
- [ ] Cross-platform sync (account-based)

#### 11e. Monetization
- [ ] Freemium model (limited lessons/vocabulary free)
- [ ] Premium subscription ($9.99/month)
- [ ] Annual plan ($99/year)
- [ ] Enterprise licensing for schools
- [ ] Content partnerships (revenue share)

**Success Criteria**:
- ✅ Offline functionality tested & stable
- ✅ AI features integrated with external APIs
- ✅ Full HSK exam simulation working
- ✅ Native mobile apps in App Store/Play Store
- ✅ 10,000+ active monthly users

---

## Deployment Timeline

| Milestone | Target Date | Status |
|-----------|------------|--------|
| v0.1.0 Beta | Apr 6, 2026 | ✅ Complete |
| Vercel Deployment | Apr 13, 2026 | ⏳ Pending |
| Neon DB Setup | Apr 13, 2026 | ⏳ Pending |
| v0.2.0 Release | May 31, 2026 | 📅 Planned |
| v0.3.0 Release | Jul 31, 2026 | 📅 Planned |
| v1.0.0 Release | Oct 31, 2026 | 📅 Planned |

---

## Resource Allocation

### Current (Phase 9 Planning)
- **Development**: 2 full-time engineers
- **Design**: 1 part-time UI/UX designer
- **QA**: 1 part-time tester
- **PM**: 1 product manager

### Phase 9-10 (Scaling)
- **Development**: 3 full-time engineers
- **Design**: 1 full-time UI/UX designer
- **QA**: 2 full-time testers
- **PM**: 1 product manager
- **DevOps**: 0.5 part-time (Vercel + monitoring)

### Phase 11+ (Production)
- **Development**: 4-5 engineers (iOS, Android, backend, frontend)
- **Design**: 1 full-time designer
- **QA**: 2-3 testers
- **Support**: 1 customer success
- **PM**: 1 product manager

---

## Dependencies & Blockers

### Current Blockers (None)
- v0.1.0 is self-contained and ready for deployment

### Future Blockers
| Phase | Blocker | Mitigation |
|-------|---------|-----------|
| 9 | Audio file procurement | Partner with language experts or use TTS (text-to-speech) |
| 10 | Vocabulary sourcing | Use existing HSK data + community contributions |
| 11 | AI integration costs | Negotiate API rates, consider self-hosted models |
| 11 | App store approvals | Start iOS/Android builds by Q3 2026 |
| 11 | School licensing | Legal review, education partnership agreements |

---

## Metrics & Success KPIs

| Phase | KPI | Target |
|-------|-----|--------|
| v0.1.0 | Users registered | 100+ (beta) |
| v0.2.0 | MAU (monthly active users) | 500+ |
| v0.2.0 | Mobile traffic | 40%+ |
| v0.3.0 | MAU | 2,000+ |
| v0.3.0 | Avg. lesson completion rate | 60%+ |
| v1.0.0 | MAU | 10,000+ |
| v1.0.0 | Premium subscribers | 500+ |
| v1.0.0 | App ratings (iOS + Android) | 4.5+ stars |

---

## Notes for Teams

### For Development
- Read `docs/code-standards.md` & `docs/system-architecture.md` before each phase
- Follow kebab-case naming and max 200 LOC per file
- Use Server Components by default; only `"use client"` when needed
- Validate all inputs with Zod; test error paths

### For QA
- Test on real devices (iOS + Android for Phase 11)
- Cover user journeys, not just individual screens
- Check performance on slow networks (Lighthouse throttle)
- Validate accessibility (WCAG 2.1 AA)

### For Design
- Maintain TalkPal-inspired aesthetic throughout
- Mobile-first approach (design for 375px width)
- Follow shadcn/ui guidelines for component variants
- Collect user feedback (heatmaps, user interviews)

### For Product
- Gather user feedback after each release
- Adjust scope based on actual usage patterns
- Monitor churn rate & review reasons
- Plan quarterly roadmap reviews

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| Apr 6, 2026 | 1.0 | Initial roadmap created (v0.1.0 complete, Phase 9+ planned) |

