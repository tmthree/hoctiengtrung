/**
 * k6 Smoke Test — hoctiengtrung.app
 *
 * Quick 30-second sanity check (5 VUs) hitting all critical endpoints.
 * Use in CI/CD pre-deploy pipelines to catch regressions before full load tests.
 *
 * Pass: all checks green, no 5xx errors
 *
 * Run: k6 run tests/load/k6-smoke.js
 * Run (prod): BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-smoke.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { BASE_URL, jsonHeaders, uniqueEmail, extractSessionCookie, authHeaders } from './config.js';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<3000'], // relaxed for smoke
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  let sessionCookie = null;
  const email = uniqueEmail('smoke');
  const password = 'Smoke@Test123!';

  // 1. Landing page
  group('public_landing', () => {
    const res = http.get(`${BASE_URL}/vi`, { headers: { Accept: 'text/html' } });
    check(res, {
      'landing: 200': (r) => r.status === 200,
      'landing: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);

  // 2. Register
  group('auth_register', () => {
    const res = http.post(
      `${BASE_URL}/api/auth/sign-up/email`,
      JSON.stringify({ email, password, name: 'Smoke Tester' }),
      { headers: jsonHeaders }
    );
    check(res, {
      'register: 200/201 or 422': (r) => [200, 201, 422].includes(r.status),
      'register: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);

  // 3. Login
  group('auth_login', () => {
    const res = http.post(
      `${BASE_URL}/api/auth/sign-in/email`,
      JSON.stringify({ email, password }),
      { headers: jsonHeaders }
    );
    check(res, {
      'login: 200': (r) => r.status === 200,
      'login: not 5xx': (r) => r.status < 500,
    });
    sessionCookie = extractSessionCookie(res);
  });

  sleep(0.5);

  // 4. Dashboard (protected)
  group('app_dashboard', () => {
    const res = http.get(`${BASE_URL}/vi/dashboard`, {
      headers: authHeaders(sessionCookie),
      redirects: 0,
    });
    check(res, {
      'dashboard: 200 or redirect': (r) => r.status === 200 || (r.status >= 300 && r.status < 400),
      'dashboard: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);

  // 5. Lessons list
  group('app_lessons', () => {
    const res = http.get(`${BASE_URL}/vi/lessons`, {
      headers: authHeaders(sessionCookie),
    });
    check(res, {
      'lessons: 200': (r) => r.status === 200,
      'lessons: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);

  // 6. Vocabulary list
  group('app_vocabulary', () => {
    const res = http.get(`${BASE_URL}/vi/vocabulary`, {
      headers: authHeaders(sessionCookie),
    });
    check(res, {
      'vocabulary: 200': (r) => r.status === 200,
      'vocabulary: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);

  // 7. API health — auth endpoint accessible
  group('api_auth_endpoint', () => {
    // GET on the auth handler returns method-not-allowed or 200, not 5xx
    const res = http.get(`${BASE_URL}/api/auth/get-session`, {
      headers: authHeaders(sessionCookie),
    });
    check(res, {
      'auth api: not 5xx': (r) => r.status < 500,
    });
  });

  sleep(0.5);
}
