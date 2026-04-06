# Documentation Hub — Học Tiếng Trung

Welcome to the documentation for the "Học Tiếng Trung" web application. This directory contains comprehensive guides for developers, designers, and project managers.

## Quick Navigation

### For Developers

| Document | Purpose | Read First? |
|----------|---------|-------------|
| [Code Standards](./code-standards.md) | File naming, structure, patterns | ✅ Yes |
| [System Architecture](./system-architecture.md) | Tech stack, data flow, routes | ✅ Yes |
| [Codebase Summary](./codebase-summary.md) | Directory structure, file counts | ✅ Yes |
| [Database Schema](./database-schema.md) | Prisma models, relationships | As needed |
| [Deployment Guide](./deployment-guide.md) | Deploy to Vercel, configure Neon | Before deploy |

### For Project Managers & Teams

| Document | Purpose |
|----------|---------|
| [Project Changelog](./project-changelog.md) | Version history, features, status |
| [Development Roadmap](./development-roadmap.md) | Phases 9-11, timeline, milestones, KPIs |
| [Project Overview & PDR](./project-overview-pdr.md) | Business goals, requirements, success criteria |

### For Designers

| Document | Purpose |
|----------|---------|
| [Design Guidelines](./design-guidelines.md) | Component styles, branding, patterns |
| [Domain Glossary](./domain-glossary.md) | Terms, definitions, domain model |

---

## Current Status

**Version**: v0.1.0 (Initial Implementation Complete)
**Status**: ✅ Ready for deployment to Vercel + Neon DB
**Last Updated**: April 6, 2026

### What's Complete
- ✅ All 8 phases implemented (auth, lessons, vocabulary, flashcards, quiz, dashboard, profile, admin)
- ✅ 148 source files, 76 components, 12 database models
- ✅ Next.js 16, Tailwind CSS v4, shadcn/ui, Prisma 7, Better Auth
- ✅ Landing page, marketing pages, full feature set
- ✅ SM-2 spaced repetition algorithm for flashcards
- ✅ 6 quiz exercise types implemented
- ✅ Admin CRUD + bulk vocabulary import
- ✅ Responsive design (desktop + mobile)

### What's Next
- Deploy to Vercel + Neon PostgreSQL (target: Apr 13)
- Phase 9: Mobile optimization, real audio files, testing suite (target: May 31)
- Phase 10: Advanced features, analytics, social (target: Jul 31)
- Phase 11: Offline, AI, certification, native apps (target: Oct 31+)

---

## How to Use These Docs

### Getting Started (New Developer)

1. **Read** → `Code Standards` (5 min)
   - Understand file naming, component structure, patterns
2. **Read** → `System Architecture` (10 min)
   - Understand tech stack, data flow, routes
3. **Read** → `Codebase Summary` (10 min)
   - Understand directory structure, 148 files
4. **Explore** → Source code at `src/` (visual scanning, not deep dive)

**Time**: ~30 minutes to be productive.

### Before Implementation

1. **Check** → `Code Standards` for the specific file type
2. **Read** → Relevant phase in `Development Roadmap`
3. **Check** → `Database Schema` if adding/modifying models
4. **Ask** → Questions in team Slack or discussion boards

### Before Deployment

1. **Read** → `Deployment Guide`
2. **Check** → Environment variables needed
3. **Verify** → Database migrations are ready
4. **Test** → Locally with production settings

### For Project Status

1. **Check** → `Project Changelog` for v0.1.0 summary
2. **Check** → `Development Roadmap` for Phase 9+ planning
3. **Check** → KPIs and success criteria for current/next phase

---

## Documentation Structure

```
docs/
├── README.md                          # This file (navigation hub)
├── code-standards.md                  # Code style, naming, patterns
├── system-architecture.md             # Tech stack, data flow, routes
├── codebase-summary.md                # Directory structure, file inventory
├── database-schema.md                 # Prisma models & relationships
├── deployment-guide.md                # Vercel + Neon setup
├── design-guidelines.md               # UI/UX patterns, components
├── domain-glossary.md                 # Terms, definitions
├── project-overview-pdr.md            # Business goals, requirements
├── project-changelog.md               # Version history, features
└── development-roadmap.md             # Phases 9-11, timeline, metrics
```

---

## Key Statistics

| Metric | Value |
|--------|-------|
| **Source Files** | 148 |
| **React Components** | 76 |
| **Pages & Layouts** | 30 |
| **API Routes** | 1 |
| **Lib Functions** | 24 |
| **Custom Hooks** | 3 |
| **Database Models** | 12 |
| **Lines of Code (est.)** | ~8,000 |
| **Documentation Files** | 11 |

---

## Tech Stack at a Glance

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js 16 | 16.2.2 |
| Language | TypeScript | 5 |
| UI Library | React 19 | 19.2.4 |
| Styling | Tailwind CSS | 4 |
| Components | shadcn/ui | — |
| Database | PostgreSQL (Neon) | — |
| ORM | Prisma | 7.6.0 |
| Auth | Better Auth | 1.5.6 |
| i18n | next-intl | 4.9.0 |
| State | TanStack Query | 5.96.2 |
| Validation | Zod | 4.3.6 |
| Deploy | Vercel | — |

---

## Important Links

- **GitHub**: [Project Repo](https://github.com/yourusername/Chinese_manager)
- **Domain**: hoctiengtrung.app
- **Database**: Neon PostgreSQL (Serverless)
- **Hosting**: Vercel
- **Admin**: TBD (after Vercel deploy)

---

## Contributing

When making changes to the codebase:

1. **Update relevant docs** if changing architecture, tech, or major features
2. **Follow code standards** outlined in `code-standards.md`
3. **Keep files focused** (max 200 LOC per file)
4. **Commit message** should mention if docs updated
5. **PR checklist** should reference which docs were affected

Example:
```
feat: add user export feature

- Implemented CSV export for learning progress
- Updated Database Schema docs (new UserExport model)
- Updated Development Roadmap (Phase 10 progress)
```

---

## Questions?

- **Architecture questions**: See `System Architecture` or ask lead engineer
- **Code style questions**: See `Code Standards`
- **Feature implementation**: See `Development Roadmap` phase documents
- **Deployment questions**: See `Deployment Guide`
- **Domain terminology**: See `Domain Glossary`

---

## Maintenance

This documentation is **living**. Please update it when:
- Adding new features or pages
- Changing architecture or tech stack
- Completing development phases
- Adding/removing files or models
- Documenting lessons learned

**Last Review**: April 6, 2026
**Next Review**: After Phase 9 (late May 2026)

---

*Generated as part of v0.1.0 documentation update. See `project-changelog.md` for full details.*
