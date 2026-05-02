import { defineConfig } from '@playwright/test';

<<<<<<< HEAD
// import dotenv from 'dotenv';
// import path from 'path';

// // 加载 .env 文件
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
=======
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
>>>>>>> 26c1a8e5d34e4b12329d89dda2ee98271eb5e7c4
  use: {
    headless: true,
    // headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
<<<<<<< HEAD
    navigationTimeout: 60000,  // 页面导航超时单独设置
    // slowMo: '1000',
  },
});

=======
    // slowMo: '1000',
  },
});
>>>>>>> 26c1a8e5d34e4b12329d89dda2ee98271eb5e7c4
