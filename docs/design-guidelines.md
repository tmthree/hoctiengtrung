# Design Guidelines — Học Tiếng Trung

Phong cách lấy cảm hứng từ TalkPal.ai — clean, modern, friendly language learning aesthetic.

## Color Palette

### Primary Colors
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--primary` | `#2E3BC7` | rgb(46, 59, 199) | CTA buttons, links, active states, sidebar accents |
| `--primary-hover` | `#252FA3` | — | Button hover state |
| `--primary-foreground` | `#FFFFFF` | — | Text on primary backgrounds |

### Accent Colors
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--accent` | `#CF2562` | rgb(207, 37, 98) | Promo banners, badges, highlights, streak fire |
| `--accent-hover` | `#B01E53` | — | Accent hover state |
| `--accent-foreground` | `#FFFFFF` | — | Text on accent backgrounds |

### Neutral Colors
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--background` | `#FBFBFE` | rgb(251, 251, 254) | Page background (near-white, slight blue tint) |
| `--foreground` | `#282828` | rgb(40, 40, 40) | Headings, primary text |
| `--muted` | `#F6F7FB` | rgb(246, 247, 251) | Section backgrounds, card backgrounds |
| `--muted-foreground` | `#676768` | rgb(103, 103, 104) | Body text, descriptions, secondary text |
| `--border` | `#E5E7EB` | — | Card borders, dividers |
| `--card` | `#FFFFFF` | — | Card backgrounds |

### HSK Level Colors
| Level | Color | Hex | Description |
|-------|-------|-----|-------------|
| HSK 1 | Green | `#22C55E` | Beginner |
| HSK 2 | Blue | `#3B82F6` | Elementary |
| HSK 3 | Purple | `#8B5CF6` | Intermediate |
| HSK 4 | Orange | `#F59E0B` | Upper-Intermediate |
| HSK 5 | Red | `#EF4444` | Advanced |
| HSK 6 | Rose | `#CF2562` | Mastery |

### Feedback Colors
| State | Hex | Usage |
|-------|-----|-------|
| Success | `#22C55E` | Correct answers, completed lessons |
| Error | `#EF4444` | Wrong answers, validation errors |
| Warning | `#F59E0B` | Attention, incomplete |
| Info | `#3B82F6` | Tips, notifications |

## Typography

### Font Stack
- **Headings & UI**: `Inter` (fallback: system-ui, sans-serif)
- **Chinese characters**: `Noto Sans SC` (Google Fonts — Simplified Chinese)
- **Vietnamese text**: `Inter` handles Vietnamese diacritics well

### Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Hero) | 48px / 3rem | 700 (bold) | 1.2 |
| H2 (Section) | 36px / 2.25rem | 700 | 1.3 |
| H3 (Card title) | 24px / 1.5rem | 600 (semibold) | 1.4 |
| H4 (Subtitle) | 20px / 1.25rem | 600 | 1.5 |
| Body | 16px / 1rem | 400 (regular) | 1.6 |
| Small / Caption | 14px / 0.875rem | 400 | 1.5 |
| Chinese (large) | 48-64px | 400 | 1.2 |
| Chinese (inline) | inherit | 400 | inherit |
| Pinyin | 14px / 0.875rem | 400 | 1.2 |

## Layout Patterns

### Hero Section
- **Left side**: Large heading (bold), subtitle text (muted color), CTA button (primary, full-width on mobile)
- **Right side**: Illustration or decorative element (phone mockup, Chinese character animation)
- **Background**: `--background` with subtle gradient or pattern
- Max width container: `1280px`, centered
- Padding: `80px` vertical on desktop, `40px` on mobile

### Section Pattern
- Alternating backgrounds: `--background` → `--muted` → `--background`
- Section padding: `80px` vertical
- Badge/pill above heading: small text, pill shape, accent color border
- Centered headings for feature sections

### Cards
- Background: white (`--card`)
- Border: 1px `--border`
- Border radius: `12px` (lg)
- Padding: `24px`
- Subtle shadow on hover: `shadow-md`
- Language/HSK cards: circular icon + label below

### Navigation
- Sticky top navbar, white background, subtle bottom border
- Logo left, nav links center, auth buttons + locale switcher right
- Mobile: hamburger → slide-in sheet from left
- Active link: primary color underline or background

### Buttons
- **Primary**: `--primary` bg, white text, rounded-full (pill shape), `px-8 py-3`
- **Secondary**: transparent bg, `--primary` text + border, rounded-full
- **Ghost**: transparent, text only, hover bg-muted
- All buttons: `font-weight: 500`, transition duration 200ms

### Spacing System
- Use Tailwind default spacing scale (4px base)
- Section gaps: `py-20` (80px)
- Card gaps: `gap-6` (24px)
- Content max-width: `max-w-7xl` (1280px)

## Component Style Guide

### Badge/Pill
- Small, rounded-full, border with colored text
- Example: "✦ 6 CẤP ĐỘ HSK" — pill shape, primary border, primary text

### Progress Indicators
- Linear progress bars: rounded, 8px height, primary color fill
- Circular progress: SVG ring, primary stroke, text in center
- Streak calendar: grid of dots, accent color for active days

### Chinese Text Display
- Large character: 48-64px, `Noto Sans SC`, dark foreground
- Pinyin: 14px above character using `<ruby>` tag, muted color
- Meaning: 14px below, muted foreground
- Container: centered, generous padding

### Flashcard
- Full-width card with 3D CSS flip animation
- Front: large Chinese character centered, white bg
- Back: pinyin, meaning, example sentence
- Quality buttons below: color-coded (red=Again, orange=Hard, green=Good, blue=Easy)

## Responsive Breakpoints
- Mobile: < 768px (1 column, stacked layout)
- Tablet: 768px-1024px (2 columns)
- Desktop: > 1024px (full layout, sidebar visible)

## Animation
- Page transitions: subtle fade
- Card hover: translateY(-2px) + shadow increase
- Flashcard flip: rotateY(180deg) with perspective
- Progress updates: smooth width transitions
- Micro-interactions: button press scale(0.98)
