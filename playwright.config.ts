import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  timeout: 90000,
  retries: 1, 
  reporter: [
    ['list'],                          // 终端输出
    ['html', { outputFolder: 'playwright-report' }]  // HTML 报告
  ],
  use: {
    headless: true,
    // headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 60000,  // 页面导航超时单独设置
    actionTimeout: 30000,
    trace: 'on-first-retry',    // 仅在重试时记录 trace
  },
});

