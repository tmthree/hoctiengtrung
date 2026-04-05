# src/config/ — Application Configuration

## Files

- `site.ts` — Site metadata (name, description, URLs, OG image)
- `routing.ts` — next-intl routing config (locales, defaultLocale)

## Usage

```tsx
// site.ts
export const siteConfig = {
  name: "Học Tiếng Trung",
  description: "Tự học tiếng Trung từ cơ bản đến nâng cao",
  url: "https://hoctiengtrung.app",
  locale: "vi",
}

// routing.ts
export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
})
```

## Conventions

- Config values are plain objects (not React components)
- Import in both Server and Client Components
- Environment-specific values use `process.env` / `NEXT_PUBLIC_*`
