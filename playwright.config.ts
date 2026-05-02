import { defineConfig } from '@playwright/test';

// import dotenv from 'dotenv';
// import path from 'path';

// // 加载 .env 文件
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  use: {
    headless: true,
    // headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 60000,  // 页面导航超时单独设置
    // slowMo: '1000',
  },
});

