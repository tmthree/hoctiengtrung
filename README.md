# Học Tiếng Trung — hoctiengtrung.app

Web app tự học tiếng Trung cho người Việt, từ cơ bản (HSK 1) đến nâng cao (HSK 6).

## Tính năng chính

- **Bài học có cấu trúc**: Theo cấp độ HSK 1-6, bao gồm ngữ pháp, hội thoại, đọc hiểu
- **Từ vựng & Flashcard**: Hệ thống lặp lại ngắt quãng (Spaced Repetition - SM2)
- **Luyện tập đa dạng**: Trắc nghiệm, nghe, viết chữ Hán, đọc hiểu
- **Theo dõi tiến độ**: Dashboard, streak, thành tích, thống kê học tập
- **Quản trị nội dung**: Admin panel để quản lý bài học, từ vựng, người dùng

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Neon PostgreSQL + Prisma ORM
- Better Auth
- next-intl (UI tiếng Việt)
- TanStack Query + Zod
- Deploy: Vercel

## Cài đặt

```bash
# Clone repo
git clone <repo-url>
cd Chinese_manager

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Neon DB URL, auth secrets, etc.

# Setup database
npx prisma generate
npm run db:push
npm run db:seed

# Start dev server
npm run dev
```

## Cấu trúc thư mục

```
src/
├── app/          # Next.js App Router pages & API routes
├── components/   # React components (feature-based)
├── lib/          # Utilities, actions, queries, validators
├── hooks/        # Custom React hooks
├── types/        # TypeScript type definitions
├── providers/    # React context providers
├── config/       # Site & routing config
└── i18n/         # Internationalization setup
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run db:push` | Push schema to DB |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

## License

Private — All rights reserved.
