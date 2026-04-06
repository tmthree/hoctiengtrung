// SM-2 Spaced Repetition Algorithm implementation
// Used to calculate optimal review intervals for vocabulary flashcards

export interface ReviewResult {
  ease: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
}

/**
 * SM-2 Spaced Repetition Algorithm
 * @param quality 0-5 (0-2 = failed, 3-5 = success)
 * @param currentEase current ease factor (min 1.3, default 2.5)
 * @param currentInterval current interval in days
 * @param currentRepetitions consecutive correct count
 */
export function calculateNextReview(
  quality: number,
  currentEase: number = 2.5,
  currentInterval: number = 0,
  currentRepetitions: number = 0
): ReviewResult {
  let ease = currentEase;
  let interval: number;
  let repetitions: number;

  if (quality < 3) {
    // Failed — reset streak
    repetitions = 0;
    interval = 0;
  } else {
    // Success — increment streak and calculate interval
    repetitions = currentRepetitions + 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(currentInterval * ease);
    }
  }

  // Update ease factor using SM-2 formula
  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { ease, interval, repetitions, nextReview };
}
