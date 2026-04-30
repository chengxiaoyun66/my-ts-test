// import { test, expect } from '@playwright/test';

// test('新建货品流程 - 完整断言', async ({ page }) => {
//   // ---------- 1. 登录 ----------
//   await page.goto('https://test.piyuan.cn/');
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: '登录数据后台' }).click();
//   const page1 = await page1Promise;

//   await page1.getByRole('textbox', { name: '请输入手机号' }).click();
//   await page1.getByRole('textbox', { name: '请输入手机号' }).fill('13800000033');
//   await page1.getByRole('textbox', { name: '请输入密码' }).click();
//   await page1.getByRole('textbox', { name: '请输入密码' }).fill('123456');
//   await page1.getByRole('button', { name: '立即登录' }).click();

//   // ---------- 2. 进入货品管理 ----------
//   await page1.getByRole('button', { name: '进入' }).nth(1).click();
//   await page1.getByText('收起').click();
//   await page1.getByRole('button', { name: '进入' }).first().click();
//   await page1.getByRole('menubar').locator('div').filter({ hasText: /^货品$/ }).dblclick();
//   await page1.getByRole('menubar').locator('div').filter({ hasText: /^货品$/ }).click();
//   await page1.getByRole('menuitem', { name: ' 货品' }).locator('span').click();

//   // ---------- 3. 新建货品 ----------
//   await page1.getByRole('button', { name: '新建货品' }).click();

//   // 生成随机货号：格式 A#随机数-随机数，例如 "A#123-456"
// const uniqueGoodsNo = `A#${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}`;
// console.log(`本次测试创建的货号: ${uniqueGoodsNo}`);

//   await page1.getByRole('textbox', { name: '* 货号' }).click();
//   await page1.getByRole('textbox', { name: '* 货号' }).fill(uniqueGoodsNo);
// //   await page1.getByRole('combobox', { name: '* 分类' }).click();
// //   await page1.locator('#el-id-6814-760').getByText('外套', { exact: true }).click();
//   await page1.getByRole('combobox', { name: '分类' }).click();
//   await page1.waitForSelector('.el-select-dropdown:visible', { timeout: 5000 });
//   await page1.locator('.el-select-dropdown').getByText('外套', { exact: true }).click();
// //   await page1.locator('.el-select-dropdown').getByText('外套', { exact: false }).click();
//   await page1.locator('div').filter({ hasText: /^请选择套装$/ }).nth(4).click();
//   await page1.getByRole('option', { name: '非套装' }).click();
//   await page1.getByText('编辑').nth(2).click();
//   await page1.locator('label:nth-child(3) > .el-checkbox__input > .el-checkbox__inner').first().click();
//   await page1.getByRole('button', { name: '确 定' }).click();
//   await page1.getByRole('spinbutton', { name: '* 销售价A' }).click();
//   await page1.getByRole('spinbutton', { name: '* 销售价A' }).fill('5');
//   await page1.getByRole('button', { name: '确定' }).click();  // 保存按钮

//   // ---------- 4. 三重断言（核心） ----------

//   // 断言1：成功提示 “创建商品成功” 出现（toast 消息）
//   await expect(page1.locator('text=创建商品成功')).toBeVisible({ timeout: 10000 });

//   // 断言2：新建弹窗关闭
//   // 如果你的弹窗是 Element UI 的对话框，通常类名为 .el-dialog__wrapper
//   await expect(page1.locator('.el-dialog__wrapper')).not.toBeVisible({ timeout: 5000 });

//   // 断言3：货品列表中显示新添加的货号
//   // 注意：保存后页面可能刷新或列表重新加载，需要等待货号出现
//   await expect(page1.locator(`text=${uniqueGoodsNo}`)).toBeVisible({ timeout: 10000 });

//   // 可选：额外打印成功信息
//   console.log('✅ 测试通过：货品已成功创建并出现在列表中');
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { GoodsPage } from '../pages/GoodsPage';

test('完整业务流程：登录 → 新建货品', async ({ page }) => {
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