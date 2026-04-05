# Deployment Guide — Học Tiếng Trung

## Platform: Vercel

### Prerequisites

- Vercel account linked to GitHub repo
- Neon PostgreSQL database created
- Domain `hoctiengtrung.app` configured in Vercel

### Environment Variables (Vercel Dashboard)

```
DATABASE_URL=postgresql://...@ep-xxx.region.neon.tech/dbname?sslmode=require
DIRECT_URL=postgresql://...@ep-xxx.region.neon.tech/dbname?sslmode=require
BETTER_AUTH_SECRET=<random-32-char-string>
BETTER_AUTH_URL=https://hoctiengtrung.app
NEXT_PUBLIC_APP_URL=https://hoctiengtrung.app
NEXT_PUBLIC_APP_NAME=Học Tiếng Trung
```

Optional OAuth:
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### Deploy Commands

```bash
# First deploy
vercel                       # Link project
vercel env pull .env.local   # Pull env vars locally

# Database setup
npx prisma generate
npx prisma db push           # Push schema to production Neon
npm run db:seed              # Seed initial HSK data

# Production build test
npm run build
```

### Auto-Deploy Flow

1. Push to `main` → Vercel auto-deploys to production
2. Push to PR branch → Vercel creates preview deployment
3. Neon DB branching: preview deployments can use DB branches

### Custom Domain Setup

1. Vercel Dashboard → Project → Settings → Domains
2. Add `hoctiengtrung.app`
3. Configure DNS: CNAME `@` → `cname.vercel-dns.com`
4. SSL auto-provisioned by Vercel

### Monitoring

- Vercel Analytics (built-in)
- Vercel Speed Insights (Core Web Vitals)
- Neon Dashboard for DB metrics

### Rollback

```bash
vercel rollback              # Rollback to previous deployment
```

### CI/CD Notes

- Build command: `npm run build` (auto-detected by Vercel)
- Output directory: `.next` (auto-detected)
- Node.js version: 20.x (set in Vercel project settings)
- Prisma client generated during build via `postinstall` script
