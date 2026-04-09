# Load Tests

k6 load tests for hoctiengtrung.app. Verifies 100+ CCU capacity across auth, browsing, and payment flows.

## Prerequisites

Install k6:
```bash
brew install k6           # macOS
choco install k6          # Windows
sudo apt install k6       # Ubuntu/Debian
```

## Run Tests

```bash
# Smoke test — 5 VUs, 30s, all endpoints (use in CI/CD)
k6 run tests/load/k6-smoke.js

# Auth load test — 100 CCU, ~2 min
k6 run tests/load/k6-auth-load.js

# Browse load test — 100 CCU, 3 min
k6 run tests/load/k6-browse-load.js

# Payment load test — 50 CCU + double-click, ~2 min
k6 run tests/load/k6-payment-load.js
```

### Against production
```bash
BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-smoke.js
BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-auth-load.js
BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-browse-load.js
BASE_URL=https://hoctiengtrung.app k6 run tests/load/k6-payment-load.js
```

### With HTML report output
```bash
k6 run --out json=results.json tests/load/k6-auth-load.js
```

## Pass/Fail Criteria

| Metric | Threshold | Meaning |
|--------|-----------|---------|
| `http_req_duration p(95)` | < 2000ms | 95% of requests under 2s |
| `http_req_failed rate` | < 5% | Less than 5% errors |
| `login_duration p(95)` | < 1500ms | Login endpoint responsive |
| `register_duration p(95)` | < 2000ms | Register endpoint responsive |
| `checkout_duration p(95)` | < 3000ms | Checkout completes under 3s |
| `duplicate_order_rate` | < 1% | No duplicate orders from double-clicks |
| checks passing rate | > 95% | Business logic assertions pass |

## Test Files

| File | Scenarios | Peak VUs | Duration |
|------|-----------|----------|----------|
| `k6-smoke.js` | default | 5 | 30s |
| `k6-auth-load.js` | login_spike, register_steady | 100 | ~2m |
| `k6-browse-load.js` | browse_courses | 100 | 3m |
| `k6-payment-load.js` | concurrent_checkout, double_click_simulation | 50+10 | ~2m |
| `config.js` | shared helpers | — | — |

## Notes

- Test emails follow pattern `{prefix}+{VU}_{ITER}_{timestamp}@test.com` — safe to run repeatedly
- Payment tests use courseId `hsk1-beginner` — replace with a real seeded course ID for production runs
- The `double_click_simulation` scenario validates idempotency: two identical checkout requests must produce exactly 1 order
- Smoke test is safe to run against production (low load, no destructive operations beyond test account creation)
