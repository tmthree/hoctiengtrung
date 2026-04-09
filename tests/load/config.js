/**
 * Shared k6 load test configuration for hoctiengtrung.app
 * Import this in every test file to ensure consistent thresholds and settings.
 */

export const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Global thresholds applied to all tests (override per-test as needed)
export const thresholds = {
  http_req_duration: ['p(95)<2000'], // 95th percentile under 2s
  http_req_failed: ['rate<0.05'],    // less than 5% error rate
  http_reqs: ['rate>50'],            // at least 50 req/s throughput
};

// Default JSON headers for API calls
export const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * Build a unique email address per virtual user + iteration.
 * Prevents email collision across parallel VUs and test reruns.
 */
export function uniqueEmail(prefix = 'loadtest') {
  return `${prefix}+${__VU}_${__ITER}_${Date.now()}@test.com`;
}

/**
 * Extract session cookie string from a k6 response object.
 * Better Auth sets a `better-auth.session_token` cookie on successful login.
 */
export function extractSessionCookie(response) {
  const setCookie = response.headers['Set-Cookie'] || '';
  const match = setCookie.match(/(better-auth\.session_token=[^;]+)/);
  return match ? match[1] : null;
}

/**
 * Return cookie jar headers for an authenticated request.
 */
export function authHeaders(sessionCookie) {
  if (!sessionCookie) return jsonHeaders;
  return {
    ...jsonHeaders,
    Cookie: sessionCookie,
  };
}
