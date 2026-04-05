# src/i18n/ — Internationalization Setup

## Files

- `request.ts` — next-intl `getRequestConfig` (loads locale messages)
- `navigation.ts` — Localized `Link`, `redirect`, `usePathname`, `useRouter`

## Translation Files

Located at project root: `/messages/vi.json`, `/messages/en.json`

### Namespace Structure
```json
{
  "common": { "save": "Lưu", "cancel": "Hủy", "delete": "Xóa" },
  "auth": { "login": "Đăng nhập", "register": "Đăng ký" },
  "dashboard": { "welcome": "Chào mừng trở lại" },
  "lessons": { "title": "Bài học", "level": "Cấp độ" },
  "vocabulary": { "flashcards": "Thẻ ghi nhớ" },
  "practice": { "quiz": "Bài kiểm tra" }
}
```

## Usage

```tsx
// Server Component
import { getTranslations } from "next-intl/server"
const t = await getTranslations("lessons")
<h1>{t("title")}</h1>

// Client Component
import { useTranslations } from "next-intl"
const t = useTranslations("lessons")
<h1>{t("title")}</h1>
```

## Conventions

- Vietnamese is default and primary language
- All user-facing strings must be in translation files
- Use namespaces matching feature folders
- Developer-facing text (logs, errors) can be in English
