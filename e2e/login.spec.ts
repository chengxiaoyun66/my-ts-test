
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('使用POM登录', async ({ page }) => {
  await page.goto('https://test.piyuan.cn/');

  const loginPageObj = new LoginPage(page);
  const loginPopup = await loginPageObj.goToLoginPage();

  const popupLoginPage = new LoginPage(loginPopup);
  await popupLoginPage.login('13800000033', '123456');
  // 登录成功后，欢迎语出现在弹窗页面上
  await expect(loginPopup.getByText('欢迎登录海豚智能')).toBeVisible();
});