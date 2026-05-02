import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { GoodsPage } from '../pages/GoodsPage';

dotenv.config();

test('完整业务流程：登录 → 新建货品', async ({ page }) => {
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(60000);
  await page.goto('https://test.piyuan.cn/');

  // const loginPage = new LoginPage(page);
  // goodsPage 变量将在后面声明
  const loginPage = new LoginPage(page);
  const loginPopup = await loginPage.goToLoginPage();
  const popupLogin = new LoginPage(loginPopup);
  await popupLogin.login('13800000033', '123456');

  await expect(loginPopup.getByText('欢迎登录海豚智能')).toBeVisible();

  // 注意：使用 loginPopup 而不是 page
  const goodsPage = new GoodsPage(loginPopup);
  await goodsPage.navigateToGoods();
  await goodsPage.openNewGoodsDialog();

  const uniqueGoodsNo = `A#${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}`;
  await goodsPage.fillGoodsNo(uniqueGoodsNo);
  await goodsPage.selectCategory('外套');
  await goodsPage.selectSuit('非套装');
  await goodsPage.selectSize();          // 新增
  await goodsPage.setPriceA('5');
  await goodsPage.save();

  await expect(loginPopup.locator('text=创建商品成功')).toBeVisible();
  await expect(loginPopup.locator(`text=${uniqueGoodsNo}`)).toBeVisible();
});