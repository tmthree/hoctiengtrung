/**
 * k6 Auth Load Test — hoctiengtrung.app
 *
 * Validates authentication endpoints under concurrent load.
 * Scenarios:
 *   - login_spike:      100 VUs ramp up → sustain → ramp down
 *   - register_steady:   20 VUs constant for 2 minutes
 *
 * Run: k6 run tests/load/k6-auth-load.js
 * Run (prod): BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-auth-load.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import {
  BASE_URL,
  jsonHeaders,
  uniqueEmail,
  extractSessionCookie,
  authHeaders,
} from './config.js';

// Custom per-endpoint metrics
const loginDuration = new Trend('login_duration', true);
const registerDuration = new Trend('register_duration', true);
const dashboardDuration = new Trend('dashboard_duration', true);
const duplicateOrderRate = new Rate('duplicate_order_rate');

export const options = {
  scenarios: {
    login_spike: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 100 }, // ramp up to 100 VUs
        { duration: '60s', target: 100 }, // sustain 100 VUs
        { duration: '30s', target: 0 },   // ramp down
      ],
      gracefulRampDown: '10s',
      exec: 'loginFlow',
    },
    register_steady: {
      executor: 'constant-vus',
      vus: 20,
      duration: '2m',
      exec: 'registerFlow',
    },
  },
  thresholds: {
    login_duration: ['p(95)<1500'],       // 95th percentile login under 1.5s
    register_duration: ['p(95)<2000'],    // 95th percentile register under 2s
    http_req_failed: ['rate<0.05'],       // overall error rate under 5%
  },
};

/**
 * Register a new unique user, then immediately sign in and hit the dashboard.
 * Used by both scenarios to reduce test data setup overhead.
 */
function registerAndLogin(email, password) {
  let sessionCookie = null;

  group('register', () => {
    const payload = JSON.stringify({ email, password, name: `Load Tester ${__VU}` });
    const res = http.post(`${BASE_URL}/api/auth/sign-up/email`, payload, {
      headers: jsonHeaders,
    });
    registerDuration.add(res.timings.duration);

    check(res, {
      'register: 200 or 422 (duplicate)': (r) =>
        r.status === 200 || r.status === 201 || r.status === 422,
    });
  });

  sleep(1 + Math.random() * 2); // 1–3s think time

  group('login', () => {
    const payload = JSON.stringify({ email, password });
    const res = http.post(`${BASE_URL}/api/auth/sign-in/email`, payload, {
      headers: jsonHeaders,
    });
    loginDuration.add(res.timings.duration);

    check(res, {
      'login: status 200': (r) => r.status === 200,
      'login: has set-cookie': (r) => r.headers['Set-Cookie'] !== undefined,
    });

    sessionCookie = extractSessionCookie(res);
  });

  return sessionCookie;
}

/** Scenario: login_spike — register + login + hit dashboard */
export function loginFlow() {
  const email = uniqueEmail('spike');
  const password = 'LoadTest@123!';
  const sessionCookie = registerAndLogin(email, password);

  sleep(1 + Math.random() * 2);

  group('dashboard', () => {
    const res = http.get(`${BASE_URL}/vi/dashboard`, {
      headers: authHeaders(sessionCookie),
      redirects: 0, // detect redirect to /login separately
    });
    dashboardDuration.add(res.timings.duration);

    check(res, {
      'dashboard: 200 (authenticated)': (r) => r.status === 200,
      'dashboard: not redirect to login': (r) =>
        !(r.status >= 300 && r.status < 400 && (r.headers['Location'] || '').includes('login')),
    });
  });

  sleep(1 + Math.random()); // 1–2s think time

  group('token_refresh', () => {
    // Attempt token refresh — endpoint may not exist, so accept 404 gracefully
    const res = http.post(`${BASE_URL}/api/auth/token`, '{}', {
      headers: authHeaders(sessionCookie),
    });
    check(res, {
      'token refresh: not 500': (r) => r.status !== 500,
    });
  });

  sleep(1 + Math.random());
}

/** Scenario: register_steady — focus on registration throughput */
export function registerFlow() {
  const email = uniqueEmail('steady');
  const password = 'LoadTest@123!';

  group('register_only', () => {
    const payload = JSON.stringify({ email, password, name: `Steady ${__VU}` });
    const res = http.post(`${BASE_URL}/api/auth/sign-up/email`, payload, {
      headers: jsonHeaders,
    });
    registerDuration.add(res.timings.duration);

    check(res, {
      'register steady: 200 or 422': (r) =>
        r.status === 200 || r.status === 201 || r.status === 422,
      'register steady: not 500': (r) => r.status !== 500,
    });
  });

  sleep(2 + Math.random() * 3); // 2–5s between registrations
}
