# Project Overview & PDR — Học Tiếng Trung

**Product Name**: Học Tiếng Trung (Learn Chinese)
**Version**: v0.1.0
**Status**: Implementation Complete, Ready for Deployment
**Last Updated**: April 6, 2026

---

## Executive Summary

Học Tiếng Trung is a web-based language learning platform designed to teach Mandarin Chinese to Vietnamese speakers. Inspired by Duolingo and HelloChinese, it provides structured lessons (HSK 1-6), vocabulary practice with spaced repetition, interactive quizzes with 6 exercise types, and comprehensive progress tracking. The platform is built on Next.js 16 with TypeScript, deployed on Vercel, and backed by Neon PostgreSQL.

**Target Audience**: Vietnamese speakers (18+) wanting to learn Mandarin Chinese
**Business Model**: Freemium (limited free lessons) + Premium ($9.99/month) [Phase 11]
**Go-to-Market**: B2C (Direct to consumers), B2B (Schools/institutions) [Phase 11]

---

## Product Vision

### Long-Term Goal (v1.0.0, Oct 2026)
Create the **#1 Chinese learning platform for Vietnamese speakers** with 10,000+ monthly active users, certification exam support, native mobile apps, and AI-powered personalized learning.

### Core Mission
Make Mandarin Chinese accessible, engaging, and effective for every Vietnamese learner through structured lessons, interactive practice, and progress tracking.

### Core Values
1. **Accessibility**: Free core features, low-cost premium, offline support
2. **Engagement**: Gamification (streaks, achievements), social features (leaderboards)
3. **Effectiveness**: Research-backed (SM-2 spaced repetition, HSK curriculum)
4. **Localization**: UI in Vietnamese, culturally relevant content

---

## Product Definition Requirements (PDR)

### 1. Functional Requirements

#### 1.1 Authentication & User Management
- **Requirement**: Users must register with email/password or OAuth (Google, GitHub)
- **Acceptance Criteria**:
  - Email verification required before accessing lessons
  - Secure session management (30-day expiry)
  - Admin role can manage users, create content
  - Password reset via email

#### 1.2 Lesson System
- **Requirement**: Structured lessons organized by HSK level (1-6) with multiple types (grammar, conversation, reading, culture)
- **Acceptance Criteria**:
  - Lessons contain rich content (text, audio, images, nested blocks)
  - Lessons are paginated, filterable by level
  - Users can mark lessons as completed
  - Admin can create, edit, delete lessons (CRUD)
  - Lessons track user progress (not started, in progress, completed)

#### 1.3 Vocabulary & Flashcard System
- **Requirement**: Users practice vocabulary with spaced repetition (SM-2 algorithm)
- **Acceptance Criteria**:
  - 2,500+ words available (expandable to 8,000+)
  - Flashcard deck shows Chinese character, pinyin, definition
  - User reviews change review interval based on SM-2 algorithm
  - Flashcard stats show due/completed/retention rate
  - Bulk import (CSV) for admin to add words
  - Words searchable and filterable by HSK level

#### 1.4 Quiz & Practice Engine
- **Requirement**: Interactive quiz modes with 6 exercise types
- **Acceptance Criteria**:
  - Multiple choice: 4 options, 1 correct answer
  - Fill in blank: typed response matching character(s)
  - Listening: audio playback + multiple choice
  - Tone recognition: identify correct tone from audio options
  - Pinyin input: romanization of Chinese characters
  - Matching: pair words with definitions
  - Quiz scores tracked and saved to database
  - Users can review quiz attempts with explanation

#### 1.5 Progress Tracking & Dashboard
- **Requirement**: Users see learning progress with visualizations
- **Acceptance Criteria**:
  - Dashboard shows stats (words learned, lessons completed, streak)
  - Streak calendar shows learning consistency (7-day/30-day view)
  - HSK progress chart shows words/lessons per level
  - Daily goal ring visualizes progress toward daily target
  - Continue learning widget shows current lesson/flashcard
  - All stats persist across sessions

#### 1.6 User Profile & Achievements
- **Requirement**: Users manage profile and track achievements
- **Acceptance Criteria**:
  - Profile shows name, email, avatar, registration date
  - Daily goal adjustable (5-120 minutes)
  - Achievements displayed as badges (7-day streak, 50 words, etc.)
  - Password changeable
  - Profile editable
  - Can logout from any page

#### 1.7 Admin Panel
- **Requirement**: Administrators manage content and users
- **Acceptance Criteria**:
  - User management: view, filter, edit user roles
  - Lesson CRUD: create, list, edit, delete lessons
  - Vocabulary CRUD: create, list, edit, delete words
  - Bulk vocabulary import (CSV: chinese, pinyin, definition, hskLevel)
  - Admin dashboard with stats (users, lessons, vocabulary count)
  - Admin role required for all admin operations

#### 1.8 Internationalization
- **Requirement**: UI available in Vietnamese and English
- **Acceptance Criteria**:
  - All user-facing strings in `/messages/vi.json` (Vietnamese)
  - English translations in `/messages/en.json` (optional for v0.2.0)
  - Locale switcher in navbar
  - Routes include locale prefix (e.g., `/vi/dashboard`, `/en/dashboard`)
  - Default locale: Vietnamese

### 2. Non-Functional Requirements

#### 2.1 Performance
- **Requirement**: Fast page loads and responsive interactions
- **Acceptance Criteria**:
  - Lighthouse score > 90 (Performance, Accessibility, SEO)
  - First Contentful Paint (FCP) < 2 seconds
  - Largest Contentful Paint (LCP) < 2.5 seconds
  - Time to Interactive (TTI) < 4 seconds
  - Core Web Vitals all "Good"

#### 2.2 Scalability
- **Requirement**: Handle 10,000+ monthly active users
- **Acceptance Criteria**:
  - Database connection pooling (Neon)
  - Caching strategy (TanStack Query client-side)
  - Stateless API design (Vercel serverless)
  - No single point of failure

#### 2.3 Reliability
- **Requirement**: 99.9% uptime
- **Acceptance Criteria**:
  - Vercel managed hosting (auto-scaling, DDoS protection)
  - Database backups (Neon automated)
  - Error tracking (Sentry integration)
  - Monitoring & alerting (Vercel Analytics + custom)

#### 2.4 Security
- **Requirement**: Protect user data and prevent unauthorized access
- **Acceptance Criteria**:
  - HTTPS only (Vercel + custom domain)
  - Passwords hashed (bcrypt via Better Auth)
  - SQL injection prevented (Prisma parameterized)
  - XSS prevented (React auto-escaping)
  - CSRF protected (Next.js middleware)
  - Rate limiting on auth endpoints
  - No secrets in git (environment variables only)

#### 2.5 Accessibility
- **Requirement**: WCAG 2.1 AA compliance
- **Acceptance Criteria**:
  - Keyboard navigable (Tab, Enter, Arrow keys)
  - Color contrast > 4.5:1 (normal text)
  - Alt text on images
  - Form labels associated with inputs
  - Focus indicators visible
  - Screen reader compatible

#### 2.6 Mobile Responsiveness
- **Requirement**: Works on mobile devices (375px-1920px widths)
- **Acceptance Criteria**:
  - Responsive layouts (no horizontal scroll)
  - Touch-friendly buttons (48px minimum)
  - Mobile-specific navigation (collapse sidebar)
  - Performance on 3G networks (< 4s load)
  - iOS & Android compatible

---

## Success Metrics & KPIs

### v0.1.0 (April 2026)
| KPI | Target | Status |
|-----|--------|--------|
| Feature Completeness | 100% (8 phases) | ✅ Complete |
| Code Coverage | N/A (Phase 9) | Planned |
| Documentation | 100% | ✅ Complete |
| Build Errors | 0 | ✅ Pass |
| Lighthouse Score | > 80 | Pending (Phase 9) |

### v0.2.0 (May 2026)
| KPI | Target | Status |
|-----|--------|--------|
| Beta Users | 100+ | Projected |
| Mobile Traffic | 40%+ | Projected |
| Test Coverage | > 80% | Planned |
| Lighthouse Score | > 90 | Planned |
| Audio Files | 100% integrated | Planned |

### v1.0.0 (Oct 2026)
| KPI | Target |
|-----|--------|
| Monthly Active Users | 10,000+ |
| Premium Subscribers | 500+ |
| Lesson Completion Rate | 60%+ |
| User Retention (30-day) | 40%+ |
| App Store Ratings | 4.5+ stars |
| NPS (Net Promoter Score) | 50+ |

---

## Feature Roadmap

### Phase 1-8: v0.1.0 ✅ COMPLETE
- ✅ Environment setup (Next.js 16, TypeScript, Tailwind, Prisma)
- ✅ Authentication (email/password, Better Auth)
- ✅ Landing page (TalkPal-inspired design)
- ✅ Database schema (12 Prisma models)
- ✅ Lessons module (browse, detail, admin CRUD)
- ✅ Vocabulary & flashcards (SM-2 spaced repetition)
- ✅ Quiz engine (6 exercise types)
- ✅ Dashboard & profile (stats, achievements, settings)

### Phase 9: v0.2.0 🏗️ PLANNED (May 2026)
- Mobile optimization (responsive design refinement)
- Real audio files (MP3 for vocabulary, listening exercises)
- Testing suite (unit, component, E2E tests)
- Performance tuning (image optimization, caching)

### Phase 10: v0.3.0 🏗️ PLANNED (Jul 2026)
- Expanded vocabulary (8,000+ words)
- Admin analytics (user stats, time-series charts, export)
- User data export (CSV, PDF reports)
- Social features (leaderboards, friend system, group challenges)
- Content expansion (videos, podcasts, reading materials)

### Phase 11: v1.0.0 🏗️ PLANNED (Oct 2026+)
- Offline support (Service Workers, IndexedDB)
- AI features (writing feedback, conversation partner)
- Certification exams (HSK mock exams, scoring)
- Native apps (iOS, Android via React Native)
- Monetization (freemium model, premium subscription)

---

## Technical Requirements

### Technology Stack
- **Framework**: Next.js 16.2.2 (App Router, server components)
- **Language**: TypeScript 5 (strict mode)
- **Frontend**: React 19.2.4 + Tailwind CSS v4
- **Components**: shadcn/ui (17 components)
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma 7.6.0
- **Auth**: Better Auth 1.5.6
- **State**: TanStack Query 5.96.2 + Zod 4.3.6
- **i18n**: next-intl 4.9.0
- **Deploy**: Vercel (Edge runtime)
- **Testing**: TBD (Phase 9: Vitest + Playwright)

### System Requirements
- Node.js 18+
- npm 9+ or yarn 3+
- Git 2.30+
- Neon PostgreSQL account
- Vercel account (for deployment)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Risk Assessment & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Slow Neon cold starts | Medium | Low | Use connection pooling, optimize queries |
| Audio file licensing | High | Medium | Partner with content creators, use TTS |
| User churn (after free trial) | High | High | Add social features, improve engagement, analyze dropoff |
| Mobile responsiveness issues | Low | Medium | Test on real devices, fix CSS at each phase |
| Database migration failures | Low | High | Test migrations in staging, maintain rollback plan |
| Authentication bugs | Low | Medium | Comprehensive testing, security audit (Phase 9) |
| Performance degradation | Medium | Medium | Monitoring + alerts, optimize at each phase |

---

## Go-to-Market Strategy

### v0.1.0: Beta (Apr 2026)
- **Target**: 100 beta testers (internal + friends)
- **Channels**: Direct invite, email list, social media
- **Goal**: Validate product, collect feedback, identify bugs

### v0.2.0: Soft Launch (May 2026)
- **Target**: 500+ users
- **Channels**: Product Hunt, Reddit, Facebook groups (Vietnamese)
- **Messaging**: "Learn Chinese like Duolingo, built for Vietnamese speakers"
- **Goal**: Build community, grow organically, gather testimonials

### v1.0.0: Full Launch (Oct 2026)
- **Target**: 10,000+ users
- **Channels**: Google Ads, YouTube ads, partnerships with Vietnamese youtubers
- **Premium**: $9.99/month (unlimited lessons, offline mode, certifications)
- **B2B**: School partnerships, bulk licenses

---

## Budget & Resource Planning

### Phase 9-10 (May-Jul 2026): $40K-50K
- 2-3 engineers @ $5K/month = $15K
- 1 designer @ $3K/month = $3K
- 1 QA @ $2K/month = $2K
- Hosting (Vercel, Neon, services) = $1K
- Audio procurement/TTS = $3K
- Contingency = $5K

### Phase 11 (Aug-Oct 2026): $60K-80K
- 4-5 engineers = $20K
- iOS/Android developers = $10K
- Legal/partnerships = $5K
- Hosting & services = $3K
- Marketing = $5K
- Contingency = $10K

**Total 2026**: ~$100K-130K

---

## Compliance & Legal

- **Privacy**: GDPR-compliant (user data handling, consent)
- **Terms of Service**: TBD (before public launch)
- **Content Licensing**: HSK curriculum (public domain), audio (licensing TBD)
- **Accessibility**: WCAG 2.1 AA (Phase 9 audit)
- **Data Retention**: User data retained for 12 months after account deletion

---

## Success Criteria (v0.1.0)

| Criterion | Status |
|-----------|--------|
| All 8 phases implemented | ✅ Complete |
| 148 source files structured | ✅ Complete |
| Zero compile errors | ✅ Complete |
| Documentation 100% | ✅ Complete |
| Ready for Vercel deploy | ✅ Complete |
| Ready for Neon setup | ✅ Complete |

---

## Next Steps

1. **Deployment** (Week of Apr 13)
   - Deploy to Vercel
   - Configure Neon PostgreSQL
   - Set up environment variables
   - Run migrations & seed data
   - Test end-to-end in production

2. **Beta Testing** (Apr 20 - May 10)
   - Invite 100 beta testers
   - Gather feedback (surveys, user interviews)
   - Fix bugs & improve UX
   - Monitor performance & error logs

3. **Phase 9 Planning** (May 1-15)
   - Prioritize mobile, audio, testing
   - Assign engineers to tasks
   - Set up CI/CD pipeline
   - Define Phase 9 success metrics

4. **Phase 9 Execution** (May 16 - May 31)
   - Mobile optimization
   - Real audio integration
   - Testing suite
   - Performance tuning
   - Prepare for v0.2.0 release

---

## Appendix: Technical Decisions

### Why Next.js 16?
- Server components (rendering, performance)
- App Router (file-based routing, layouts)
- Vercel native support (optimal hosting)
- Edge runtime (global performance)

### Why Prisma?
- Type-safe ORM (no raw SQL errors)
- Auto-migrations (schema versioning)
- Query builder (readable, composable)
- Neon adapter (serverless native)

### Why Better Auth?
- Lightweight (not bloated Auth0)
- Self-hosted on Vercel (no vendor lock-in)
- OAuth support (Google, GitHub ready)
- Email verification (built-in)

### Why SM-2 Algorithm?
- Scientifically proven (40+ years research)
- Efficient (reviews only when needed)
- Customizable (interval, ease factor)
- Standard in flashcard apps (Anki, SuperMemo)

---

## Document Version History

| Date | Version | Changes |
|------|---------|---------|
| Apr 6, 2026 | 1.0 | Initial PDR created (v0.1.0 complete) |

---

*For implementation details, see `docs/system-architecture.md` and `docs/codebase-summary.md`.*
*For development phases, see `docs/development-roadmap.md`.*
*For code standards, see `docs/code-standards.md`.*
