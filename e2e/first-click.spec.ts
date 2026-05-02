import { test, expect } from '@playwright/test';

test('点击"登录数据后台"并验证新标签页', async ({ page, context }) => {
  await page.goto('https://test.piyuan.cn/');
  await page.waitForLoadState('networkidle');

  const loginBtn = page.locator('.box-text', { hasText: '登录数据后台' });
  await expect(loginBtn).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    loginBtn.click(),
  ]);

  await newPage.waitForLoadState('networkidle');

  expect(newPage.url()).toContain('/login');

  await expect(newPage.locator('text=账号登录')).toBeVisible();
  await page.waitForTimeout(3000);

  await newPage.close();
});
