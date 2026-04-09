/**
 * k6 Browse Load Test — hoctiengtrung.app
 *
 * Simulates read-heavy browsing of lessons and vocabulary pages.
 * Scenario:
 *   - browse_courses: 100 VUs constant for 3 minutes (peak browsing)
 *
 * Run: k6 run tests/load/k6-browse-load.js
 * Run (prod): BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-browse-load.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend } from 'k6/metrics';
import { BASE_URL, jsonHeaders } from './config.js';

// Per-page duration tracking for detailed performance analysis
const landingDuration = new Trend('page_landing_duration', true);
const lessonsDuration = new Trend('page_lessons_duration', true);
const lessonsFilterDuration = new Trend('page_lessons_filter_duration', true);
const vocabDuration = new Trend('page_vocab_duration', true);
const vocabPaginatedDuration = new Trend('page_vocab_paginated_duration', true);

export const options = {
  scenarios: {
    browse_courses: {
      executor: 'constant-vus',
      vus: 100,
      duration: '3m',
      exec: 'browseFlow',
    },
  },
  thresholds: {
    // Per-page: 95th percentile under 2s
    page_landing_duration: ['p(95)<2000'],
    page_lessons_duration: ['p(95)<2000'],
    page_lessons_filter_duration: ['p(95)<2000'],
    page_vocab_duration: ['p(95)<2000'],
    page_vocab_paginated_duration: ['p(95)<2000'],
    // Overall: 99th percentile under 5s, error rate under 2%
    http_req_duration: ['p(99)<5000'],
    http_req_failed: ['rate<0.02'],
  },
};

/** Check that a page response is healthy and non-empty. */
function pageChecks(res, pageName) {
  return check(res, {
    [`${pageName}: status 200`]: (r) => r.status === 200,
    [`${pageName}: body > 1KB`]: (r) => r.body && r.body.length > 1024,
    [`${pageName}: not error page`]: (r) =>
      r.body && !r.body.includes('Internal Server Error'),
  });
}

/** Scenario: browse_courses — simulate a typical browsing session */
export function browseFlow() {
  group('landing', () => {
    const res = http.get(`${BASE_URL}/vi`, { headers: { Accept: 'text/html' } });
    landingDuration.add(res.timings.duration);
    pageChecks(res, 'landing');
  });

  sleep(2 + Math.random() * 3); // 2–5s reading landing page

  group('lessons_list', () => {
    const res = http.get(`${BASE_URL}/vi/lessons`, {
      headers: { Accept: 'text/html' },
    });
    lessonsDuration.add(res.timings.duration);
    pageChecks(res, 'lessons_list');
  });

  sleep(1 + Math.random() * 2); // 1–3s

  group('lessons_hsk1_filter', () => {
    const res = http.get(`${BASE_URL}/vi/lessons?hskLevel=1`, {
      headers: { Accept: 'text/html' },
    });
    lessonsFilterDuration.add(res.timings.duration);
    pageChecks(res, 'lessons_hsk1_filter');
  });

  sleep(1 + Math.random()); // 1–2s

  group('vocabulary_list', () => {
    const res = http.get(`${BASE_URL}/vi/vocabulary`, {
      headers: { Accept: 'text/html' },
    });
    vocabDuration.add(res.timings.duration);
    pageChecks(res, 'vocabulary_list');
  });

  sleep(1 + Math.random() * 2); // 1–3s

  group('vocabulary_paginated', () => {
    const res = http.get(`${BASE_URL}/vi/vocabulary?hskLevel=2&page=2`, {
      headers: { Accept: 'text/html' },
    });
    vocabPaginatedDuration.add(res.timings.duration);
    pageChecks(res, 'vocabulary_paginated');
  });

  sleep(1 + Math.random()); // 1–2s cool-down before next iteration
}
