# prisma/ — Database Schema & Migrations

## Setup

- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Prisma with `@prisma/adapter-neon`
- **Connection**: Pooled URL (`DATABASE_URL`) + Direct URL (`DIRECT_URL`)

## Files

- `schema.prisma` — Full database schema
- `seed.ts` — HSK vocabulary seeder
- `migrations/` — Prisma migration files (auto-generated)

## Commands

```bash
npx prisma generate      # Regenerate client after schema change
npm run db:push          # Push schema to DB (dev)
npm run db:migrate       # Create + apply migration (production)
npm run db:seed          # Run seed script
npx prisma studio        # Visual DB browser
```

## Conventions

- Schema uses `camelCase` for field names, `PascalCase` for models
- Always add `@@index` for frequently queried fields
- Use `@default(cuid())` for IDs
- JSON fields for flexible data (lesson content, exercise questions, stroke order)
- Enum for fixed sets: `Role`, `HskLevel`, `LessonType`, `ExerciseType`, `ProgressStatus`

## Neon-Specific

- Use connection pooler URL for `DATABASE_URL` (port 5432 → pooler)
- Use direct URL for `DIRECT_URL` (migrations need direct connection)
- Scale-to-zero: first query after idle may be slow (~500ms cold start)
