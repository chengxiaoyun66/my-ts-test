import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    headless: true,
    // headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    // slowMo: '1000',
  },
});