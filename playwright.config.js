// ~/cleanpro-site/playwright.config.js
// Playwright configuration
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',     // where your tests live
  timeout: 60 * 1000,     // per-test timeout (increased for Cloud Run cold starts)
  retries: 1,             // retry once on failure
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 45 * 1000,  // navigation timeout for Cloud Run
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
