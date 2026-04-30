import { test, expect } from '@playwright/test';

test('成功登录并跳转到后台', async ({ page }) => {
  // 1. 打开首页
  await page.goto('https://test.piyuan.cn/');

  // 2. 点击“登录数据后台”链接，会打开新标签页
  const newPagePromise = page.context().waitForEvent('page');
  await page.getByRole('link', { name: '登录数据后台' }).click();
  const loginPage = await newPagePromise;

  // 3. 在新标签页中输入账号密码
  await loginPage.getByRole('textbox', { name: '请输入手机号' }).fill('13800000033');
  await loginPage.getByRole('textbox', { name: '请输入密码' }).fill('123456');
  await loginPage.getByRole('button', { name: '立即登录' }).click();

  // 4. 验证登录成功：跳转到某个后台页面，或者出现“欢迎”文字
  // 根据你的实际项目，可能是 URL 改变，或者出现某个元素
//   await expect(loginPage).toHaveURL(/.*dashboard/);  // 假设后台地址包含 dashboard
  // 或者
  await expect(loginPage.locator('text=欢迎登录海豚智能')).toBeVisible();
});