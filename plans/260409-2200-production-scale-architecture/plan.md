# Production-Scale Architecture Plan

**Created**: 2026-04-09
**Goal**: Scale hoctiengtrung.app to production-grade EdTech platform (100+ CCU, payments, RBAC, caching)
**Status**: Step 1 — Architecture & Database Design

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Architecture & Database Design | In Progress |
| 2 | Auth Enhancement (Access/Refresh Token) | Pending |
| 3 | Payment Integration (Stripe Webhook) | Pending |
| 4 | QA & Load Testing (k6) | Pending |

## Key Decisions

- **Evolve, don't rewrite** — existing system works, extend it
- **Modular Monolith** — not microservices (overkill for 100 CCU)
- **Better Auth + JWT plugin** — avoid ripping out auth layer
- **Stripe** — best-in-class for SaaS payments in Vietnam
- **Upstash Redis** — serverless Redis compatible with Vercel

## Phase Details

- [Phase 1: Architecture & ERD](./phase-01-architecture-database.md)
- Phase 2: Auth Enhancement (TBD)
- Phase 3: Payment Integration (TBD)
- Phase 4: Load Testing (TBD)
