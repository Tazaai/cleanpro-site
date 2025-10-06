// ~/cleanpro-site/playwright.config.js
// Playwright configuration
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',     // where your tests live
  timeout: 30 * 1000,     // per-test timeout
  retries: 1,             // retry once on failure
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
