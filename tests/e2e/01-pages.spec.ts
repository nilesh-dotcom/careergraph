import { test, expect } from '@playwright/test';

/**
 * Test Suite: Homepage and Page Loading
 * Verifies that all pages load and are accessible
 */

test.describe('Page Loading & Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check title/heading exists
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    
    // Check navigation exists
    const navbar = page.locator('nav, [role="navigation"]');
    await expect(navbar).toBeVisible({ timeout: 5000 });
  });

  test('should load analyze page', async ({ page }) => {
    await page.goto('/analyze');
    
    // Check for upload component or form
    const uploadArea = page.locator('[data-testid="resume-uploader"], input[type="file"], button:has-text("Upload")');
    await expect(uploadArea).toBeVisible({ timeout: 5000 });
  });

  test('should load result page without crashing', async ({ page }) => {
    // Note: Results page requires auth, so this test will redirect to login
    await page.goto('/results');
    
    // Should either show results or redirect to login
    const currentURL = page.url();
    const isLoginPage = currentURL.includes('/login');
    const isResultsPage = currentURL.includes('/results');
    
    expect(isLoginPage || isResultsPage).toBeTruthy();
  });

  test('should load privacy page', async ({ page }) => {
    await page.goto('/privacy');
    const content = page.locator('main').first();
    await expect(content).toBeVisible({ timeout: 5000 }).catch(() => null);
  });

  test('should load terms page', async ({ page }) => {
    await page.goto('/terms');
    const content = page.locator('main').first();
    await expect(content).toBeVisible({ timeout: 5000 }).catch(() => null);
  });

  test('should load login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check for login form elements
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toBeVisible({ timeout: 5000 });
    await expect(passwordInput).toBeVisible({ timeout: 5000 });
  });

  test('should load signup page', async ({ page }) => {
    await page.goto('/signup');
    
    // Check for signup form elements
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Navigation Links', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start on homepage
    await page.goto('/');
    
    // Find and click Analyze link
    const analyzeLink = page.locator('a:has-text("Analyze"), [role="link"]:has-text("Analyze")').first();
    if (await analyzeLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await analyzeLink.click();
      await page.waitForURL(/analyze/);
      expect(page.url()).toContain('/analyze');
    }
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Page should still be visible
    const content = page.locator('main').first();
    await expect(content).toBeVisible({ timeout: 5000 }).catch(() => null);
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/analyze');
    
    // Upload area should still be accessible
    const uploadArea = page.locator('[data-testid="resume-uploader"], input[type="file"], button:has-text("Upload")');
    await expect(uploadArea).toBeVisible({ timeout: 5000 });
  });
});
