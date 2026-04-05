# src/hooks/ — Custom React Hooks

## Conventions

- **Prefix**: always `use-` (e.g., `use-flashcard-session.ts`)
- **Client-only**: hooks always run in Client Components
- **Single responsibility**: one hook = one concern
- **Max 200 lines**: extract complex logic into utility functions in `lib/`

## Planned Hooks

- `use-auth.ts` — Access auth session in Client Components
- `use-flashcard-session.ts` — SM-2 spaced repetition state machine
- `use-audio-player.ts` — Audio playback for pronunciation
- `use-quiz-state.ts` — Quiz flow state (questions, answers, timer)
- `use-writing-canvas.ts` — Canvas drawing for stroke practice
- `use-debounce.ts` — Debounced search input
- `use-media-query.ts` — Responsive breakpoint detection
