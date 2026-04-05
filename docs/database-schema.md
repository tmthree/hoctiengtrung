# Database Schema — Học Tiếng Trung

Database: Neon PostgreSQL + Prisma ORM

## Entity Overview

```
User ─────┬──→ UserProgress (per lesson)
          ├──→ VocabularyReview (spaced repetition state)
          ├──→ QuizAttempt (exercise history)
          └──→ LearningStreak (daily activity)

Lesson ───┬──→ LessonVocabulary ←── Vocabulary
          └──→ Exercise
```

## Tables

### Auth (managed by Better Auth)

- **user** — id, name, email, emailVerified, image, role (LEARNER/ADMIN), createdAt, updatedAt
- **session** — id, userId, token, expiresAt, ipAddress, userAgent
- **account** — id, userId, provider, providerAccountId, accessToken, refreshToken
- **verification** — id, identifier, value, expiresAt

### Content

- **lesson** — id, title, description, hskLevel (1-6), type (GRAMMAR/CONVERSATION/READING/CULTURE/BUSINESS), content (JSON), order, isPublished, createdAt, updatedAt
- **vocabulary** — id, simplified, traditional, pinyin, meaning (Vietnamese), exampleSentence, examplePinyin, exampleMeaning, audioUrl, strokeOrder (JSON), hskLevel (1-6), category, createdAt
- **lesson_vocabulary** — id, lessonId, vocabularyId, order (sequence within lesson)
- **exercise** — id, lessonId, type (MULTIPLE_CHOICE/FILL_BLANK/LISTENING/MATCHING/WRITING/READING/TONE/PINYIN), question (JSON), answer (JSON), explanation, order, difficulty (1-5)

### Learning Progress

- **user_progress** — id, userId, lessonId, status (NOT_STARTED/IN_PROGRESS/COMPLETED), score, completedAt, lastAccessedAt
- **vocabulary_review** — id, userId, vocabularyId, ease (float, default 2.5), interval (days), repetitions (count), nextReview (DateTime), lastReview (DateTime)
- **quiz_attempt** — id, userId, exerciseId, isCorrect, userAnswer (JSON), timeSpent (seconds), attemptedAt
- **learning_streak** — id, userId, date (Date), minutesStudied, wordsLearned, exercisesCompleted

## Key Indexes

- `vocabulary_review(userId, nextReview)` — "due for review" query
- `vocabulary(hskLevel)` — filter by HSK level
- `vocabulary(simplified)` — search by character
- `user_progress(userId, lessonId)` — unique constraint
- `learning_streak(userId, date)` — unique constraint

## SM-2 Algorithm Fields (vocabulary_review)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| ease | Float | 2.5 | Easiness factor (min 1.3) |
| interval | Int | 0 | Days until next review |
| repetitions | Int | 0 | Consecutive correct answers |
| nextReview | DateTime | now | When to show this word again |

## Notes

- HSK levels 1-6 map to Chinese proficiency standards
- Exercise question/answer are JSON — shape depends on exercise type
- Stroke order stored as JSON array of SVG path data
- Audio files stored in public/audio/ or external CDN
