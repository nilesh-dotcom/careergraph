# 🧪 CareerGraph - E2E Testing Guide

This guide explains how to run the automated test suite for CareerGraph.

## 📦 What's Included

4 comprehensive test suites with 30+ test cases:

1. **01-pages.spec.ts** - Page loading & navigation
   - Homepage, Analyze, Results, Login, Signup pages
   - Navigation links
   - Responsive design (mobile, tablet, desktop)

2. **02-api-integration.spec.ts** - API & Environment Variables
   - API key configuration validation
   - Authentication checks
   - Performance metrics
   - Network resilience

3. **03-user-flow.spec.ts** - Full User Journey
   - Signup flow validation
   - Analyze page form fields
   - Resume upload mechanism
   - Login flow
   - Results page accessibility

4. **04-results-page.spec.ts** - Results Page Validation
   - Content structure verification
   - Data integrity checks
   - Accessibility compliance
   - Responsive design

---

## 🚀 Quick Start

### 1. Install Dependencies (if needed)
```bash
npm install
```

### 2. Run All Tests
```bash
npm test
```

### 3. Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headless (background) |
| `npm run test:ui` | Run tests with interactive UI (recommended) |
| `npm run test:headed` | Run tests in visible browser windows |
| `npm run test:debug` | Run tests with debugger for troubleshooting |

---

## ✅ Test Coverage

### ✨ Feature Verification
- [x] All pages load without errors
- [x] Navigation works between pages
- [x] Responsive design on all devices
- [x] Form fields are present and accessible
- [x] File upload mechanism exists
- [x] Results page loads
- [x] API endpoints are configured

### 🔐 Security & Performance
- [x] Authentication is required
- [x] Unauthenticated requests are rejected
- [x] Pages load in <5 seconds
- [x] Network resilience

### ♿ Accessibility
- [x] Proper heading hierarchy
- [x] Images have alt text
- [x] Focus management for keyboard navigation
- [x] Screen reader compatibility

---

## 📊 Expected Test Results

When running `npm test`, you should see:
```
✓ 30+ tests passed
✓ 0 tests failed
✓ All pages loading
✓ API endpoints responding
✓ No console errors
```

---

## 🆘 Troubleshooting

### Tests Fail with "Connection refused"
**Solution:** Make sure dev server is running
```bash
npm run dev
# In another terminal:
npm test
```

### Tests Timeout
**Solution:** Playwright config automatically starts dev server. If issues:
```bash
# Increase timeout in playwright.config.ts:
use: {
  timeout: 30000, // 30 seconds
}
```

### API Tests Fail with 500 Error
**Possible issues:**
- [ ] Environment variables not set in `.env.local`
- [ ] Missing OPENAI_API_KEY
- [ ] Missing RAPIDAPI_KEY
- [ ] Supabase URL or keys incorrect

**Solution:**
```bash
# Verify .env.local has all required keys
cat .env.local

# Should show:
# OPENAI_API_KEY=sk-proj-...
# RAPIDAPI_KEY=47b642...
# NEXT_PUBLIC_SUPABASE_URL=https://...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### "Failed to launch browser"
**Solution:** Install browser dependencies
```bash
npx playwright install
```

---

## 📈 Continuous Integration (Optional)

To run tests on every push to GitHub, add this to `.github/workflows/test.yml`:

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🎯 Test Execution Flow

```
npm test
    ↓
Playwright starts Next.js dev server
    ↓
Launches Chromium, Firefox, Safari browsers
    ↓
Runs 4 test suites sequentially:
    • 01-pages.spec.ts (6 tests)
    • 02-api-integration.spec.ts (8 tests)
    • 03-user-flow.spec.ts (9 tests)
    • 04-results-page.spec.ts (8 tests)
    ↓
Generates HTML report in ./playwright-report/
    ↓
Closes browsers and reports results
```

---

## 📝 Test Reports

After running tests, a detailed report is generated:

```bash
# View the HTML report
open playwright-report/index.html

# Or on Linux:
xdg-open playwright-report/index.html
```

The report shows:
- ✅ Each test result
- 📸 Screenshots on failure
- 🎬 Video recordings (if enabled)
- ⏱️ Execution times
- 🌍 Browser versions tested

---

## 🔧 Customizing Tests

### Add a New Test
Create a new file in `tests/e2e/`:

```typescript
import { test, expect } from '@playwright/test';

test('my new test', async ({ page }) => {
  await page.goto('/');
  // Your test here
});
```

### Modify Test Timeout
In any test:
```typescript
test('slow test', async ({ page }) => {
  await page.goto('/', { timeout: 60000 }); // 60 seconds
});
```

### Skip a Test
```typescript
test.skip('not ready yet', async ({ page }) => {
  // This test won't run
});
```

### Run Only One Test File
```bash
npx playwright test tests/e2e/01-pages.spec.ts
```

### Run Only Tests Matching a Pattern
```bash
npx playwright test -g "should load"
```

---

## 📞 Need Help?

- Playwright Docs: https://playwright.dev
- Report Issues: Check browser console (F12) for errors
- Test Results: Check `playwright-report/` after running tests

---

## ✨ Best Practices

1. ✅ Run tests before pushing to GitHub
2. ✅ Check test report for failures
3. ✅ Fix broken tests immediately
4. ✅ Keep tests fast (<30s per test)
5. ✅ Don't test third-party services directly

---

## 🎉 You're All Set!

Your CareerGraph app now has automated testing. Run the tests regularly to ensure everything keeps working!

```bash
npm test  # Run all tests
npm run test:ui  # Run with interactive UI
```

Happy testing! 🚀
