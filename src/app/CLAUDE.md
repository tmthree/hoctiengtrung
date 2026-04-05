# src/app/ — App Router Pages & API Routes

## Structure

```
app/
├── layout.tsx              # Root layout (html, body, fonts, providers)
├── globals.css             # Tailwind directives, font-face
├── not-found.tsx           # Global 404
├── error.tsx               # Global error boundary
├── [locale]/               # next-intl locale segment
│   ├── layout.tsx          # NextIntlClientProvider
│   ├── page.tsx            # Landing page
│   ├── (marketing)/        # Public pages (navbar + footer layout)
│   ├── (auth)/             # Auth pages (centered card layout)
│   ├── (app)/              # Learner area (sidebar + topbar layout, auth required)
│   └── (admin)/            # Admin panel (admin sidebar layout, admin role required)
└── api/
    └── auth/[...all]/      # Better Auth catch-all handler
```

## Conventions

- **Route groups** `()` = different layouts, no URL segment
- **page.tsx** = Server Component by default
- **loading.tsx** = Suspense fallback per route
- **error.tsx** = Error boundary per route
- Data fetching: import from `@/lib/queries/*` directly in Server Components
- Mutations: import Server Actions from `@/lib/actions/*`
- i18n: use `getTranslations()` in Server Components, `useTranslations()` in Client Components

## Auth Guard

Middleware handles auth redirects:
- Unauthenticated → `/[locale]/login` for (app) and (admin) routes
- Authenticated → `/[locale]/dashboard` for (auth) routes
- Non-admin → `/[locale]/dashboard` for (admin) routes
