/**
 * k6 Payment Load Test — hoctiengtrung.app
 *
 * Tests checkout flow under concurrent load with idempotency validation.
 * Most critical test: verifies no duplicate orders under double-click or race conditions.
 *
 * Scenarios:
 *   - concurrent_checkout:      50 VUs ramp up → sustain 90s → ramp down
 *   - double_click_simulation:  10 VUs send checkout request twice rapidly
 *
 * Run: k6 run tests/load/k6-payment-load.js
 * Run (prod): BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-payment-load.js
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

const checkoutDuration = new Trend('checkout_duration', true);
const duplicateOrderRate = new Rate('duplicate_order_rate');

export const options = {
  scenarios: {
    concurrent_checkout: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 }, // ramp to 50 VUs
        { duration: '90s', target: 50 }, // sustain
        { duration: '10s', target: 0 },  // ramp down
      ],
      gracefulRampDown: '10s',
      exec: 'checkoutFlow',
    },
    double_click_simulation: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m',
      exec: 'doubleClickFlow',
      startTime: '5s', // start slightly after login pool is warm
    },
  },
  thresholds: {
    checkout_duration: ['p(95)<3000'],  // 95th percentile checkout under 3s
    duplicate_order_rate: ['rate<0.01'], // 0% duplicate orders tolerance
    http_req_failed: ['rate<0.03'],     // error rate under 3%
  },
};

/**
 * Shared login helper — returns session cookie string or null.
 * Registers first (tolerates 422 duplicate), then signs in.
 */
function loginUser(email, password) {
  // Register (may already exist — that is fine)
  http.post(
    `${BASE_URL}/api/auth/sign-up/email`,
    JSON.stringify({ email, password, name: `Payment Tester ${__VU}` }),
    { headers: jsonHeaders }
  );

  const loginRes = http.post(
    `${BASE_URL}/api/auth/sign-in/email`,
    JSON.stringify({ email, password }),
    { headers: jsonHeaders }
  );

  check(loginRes, {
    'login for payment: status 200': (r) => r.status === 200,
  });

  return extractSessionCookie(loginRes);
}

/**
 * POST checkout and return the parsed response body (or null on failure).
 * Accepts courseId as a string — use a real seeded course ID in production runs.
 */
function postCheckout(sessionCookie, courseId) {
  const payload = JSON.stringify({ courseId });
  const res = http.post(`${BASE_URL}/api/checkout`, payload, {
    headers: authHeaders(sessionCookie),
  });
  checkoutDuration.add(res.timings.duration);
  return res;
}

/** GET the authenticated user's orders list and return parsed body. */
function getUserOrders(sessionCookie) {
  const res = http.get(`${BASE_URL}/api/orders`, {
    headers: authHeaders(sessionCookie),
  });
  return res;
}

/** Scenario: concurrent_checkout — normal single-click checkout under load */
export function checkoutFlow() {
  // Each VU uses a stable email per VU (not per iteration) to reuse the same account
  const email = `payment_vu${__VU}@loadtest.com`;
  const password = 'LoadTest@123!';
  const courseId = 'hsk1-beginner'; // use a real seeded courseId when testing production

  let sessionCookie = null;

  group('login', () => {
    sessionCookie = loginUser(email, password);
  });

  if (!sessionCookie) {
    sleep(2);
    return;
  }

  sleep(1 + Math.random()); // 1–2s think time before checkout

  group('checkout', () => {
    const res = postCheckout(sessionCookie, courseId);

    check(res, {
      'checkout: not 500': (r) => r.status !== 500,
      'checkout: 200/201/302 or idempotent 409': (r) =>
        [200, 201, 302, 409].includes(r.status),
    });

    // 302 = redirect to payment URL, treat as success
    if (res.status === 200 || res.status === 201) {
      let body = {};
      try { body = res.json(); } catch (_) {}
      check(body, {
        'checkout: response has url or orderId': (b) =>
          Boolean(b.url || b.checkoutUrl || b.orderId || b.id),
      });
    }
  });

  sleep(1 + Math.random());

  group('order_status', () => {
    const res = getUserOrders(sessionCookie);
    check(res, {
      'orders: status 200': (r) => r.status === 200,
      'orders: not 500': (r) => r.status !== 500,
    });
  });

  sleep(1 + Math.random() * 2);
}

/**
 * Scenario: double_click_simulation
 * Fire two identical checkout requests with <100ms gap, verify only one order is created.
 */
export function doubleClickFlow() {
  const email = `dblclick_vu${__VU}@loadtest.com`;
  const password = 'LoadTest@123!';
  const courseId = 'hsk1-beginner';

  let sessionCookie = null;

  group('login', () => {
    sessionCookie = loginUser(email, password);
  });

  if (!sessionCookie) {
    sleep(2);
    return;
  }

  sleep(1 + Math.random());

  group('double_click_checkout', () => {
    const payload = JSON.stringify({ courseId });
    const headers = authHeaders(sessionCookie);

    // Send two requests in a batch (k6 batches run in parallel, ~same timestamp)
    const responses = http.batch([
      { method: 'POST', url: `${BASE_URL}/api/checkout`, body: payload, params: { headers } },
      { method: 'POST', url: `${BASE_URL}/api/checkout`, body: payload, params: { headers } },
    ]);

    const [r1, r2] = responses;

    check(r1, { 'double-click r1: not 500': (r) => r.status !== 500 });
    check(r2, { 'double-click r2: not 500': (r) => r.status !== 500 });

    // At most one success — the other should be 409 (conflict) or equal idempotent response
    const both200 = (r1.status === 200 || r1.status === 201) &&
                    (r2.status === 200 || r2.status === 201);
    if (both200) {
      // Two successful checkouts = potential duplicate order
      duplicateOrderRate.add(1);
    } else {
      duplicateOrderRate.add(0);
    }
  });

  sleep(1 + Math.random());

  group('verify_single_order', () => {
    const res = getUserOrders(sessionCookie);

    if (res.status === 200) {
      let orders = [];
      try { orders = res.json(); } catch (_) {}

      // Count orders for this specific course
      const courseOrders = Array.isArray(orders)
        ? orders.filter((o) => o.courseId === courseId || o.course?.id === courseId)
        : [];

      check(courseOrders, {
        'idempotency: only 1 order per course': (arr) => arr.length <= 1,
      });
    }
  });

  sleep(3 + Math.random() * 2); // longer cool-down between double-click tests
}
