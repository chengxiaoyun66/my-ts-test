import { Page, Locator } from '@playwright/test';

export class GoodsPage {
  readonly page: Page;
  readonly goodsMenu: Locator;
  readonly newGoodsButton: Locator;
  readonly goodsNoInput: Locator;
  readonly categoryCombo: Locator;
  readonly categoryOption: (name: string) => Locator;
  readonly priceAInput: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // 菜单定位（根据你的页面调整，如果不需要菜单导航可以简化）
    this.goodsMenu = page.getByRole('menubar').locator('div').filter({ hasText: /^货品$/ });
    this.newGoodsButton = page.getByRole('button', { name: '新建货品' });
    this.goodsNoInput = page.getByRole('textbox', { name: '* 货号' });
    this.categoryCombo = page.getByRole('combobox', { name: '* 分类' });
    this.categoryOption = (name: string) => page.locator('.el-select-dropdown').getByText(name, { exact: true });
    this.priceAInput = page.getByRole('spinbutton', { name: '* 销售价A' });
    this.confirmButton = page.getByRole('button', { name: '确定' }).last();
  }

  // 导航到货品列表页（可根据实际页面结构调整）
  async navigateToGoods() {
    // 如果你的登录后直接有货品菜单，可以简化下面的步骤；否则保留旧脚本中的导航逻辑
    await this.page.getByRole('button', { name: '进入' }).nth(1).click();
    await this.page.getByText('收起').click();
    await this.page.getByRole('button', { name: '进入' }).first().click();
    await this.page.getByRole('menubar').locator('div').filter({ hasText: /^货品$/ }).dblclick();
    await this.page.getByRole('menubar').locator('div').filter({ hasText: /^货品$/ }).click();
    await this.page.getByRole('menuitem', { name: ' 货品' }).locator('span').click();
  }

  async openNewGoodsDialog() {
    await this.newGoodsButton.click();
  }

  async fillGoodsNo(no: string) {
    await this.goodsNoInput.fill(no);
  }

  async selectCategory(name: string) {
    await this.categoryCombo.click();
    await this.page.waitForSelector('.el-select-dropdown:visible', { timeout: 5000 });
    await this.categoryOption(name).click();
  }

  // 选择套装（重要：先点击触发下拉，再选选项）
 async selectSuit(name: string) {
  // 1. 找到“请选择套装”文字，并点击其父级可点击区域（通常是前面的 label 或 div）
  const suitText = this.page.getByText('请选择套装');
  // 点击该文本所在的区域（可能是一个 label 或 span）
  await suitText.click();
  // 如果上面不行，尝试点击它的父元素
  // await suitText.locator('..').click();

  // 2. 等待下拉菜单出现（Element UI 的 dropdown）
  await this.page.waitForSelector('.el-select-dropdown:visible', { timeout: 5000 });
  // 3. 选择对应选项（如“非套装”）
  await this.page.locator('.el-select-dropdown').getByRole('option', { name }).click();
}
async selectSize() {
  // 1. 点击“编辑”打开尺码选择弹窗
  await this.page.getByText('编辑').nth(2).click();

  // 2. 勾选第一个尺码（可根据需求改为指定尺码）
  const checkbox = this.page.locator('label:nth-child(3) > .el-checkbox__input > .el-checkbox__inner').first();
  await checkbox.check({ timeout: 5000 });

  // 3. 点击尺码弹窗中的“确定”按钮（关闭弹窗）
  // 根据你的页面，按钮文字可能是“确 定”或“确定”，且可能在 .el-dialog__footer 中
  const sizeConfirmBtn = this.page.locator('.el-dialog__footer .el-button--primary, button:has-text("确 定")').first();
  await sizeConfirmBtn.click();

  // 可选：等待弹窗彻底关闭
  await this.page.waitForSelector('.el-dialog__wrapper', { state: 'hidden', timeout: 5000 });
}

  async setPriceA(price: string) {
    await this.priceAInput.fill(price);
  }

  async save() {
    await this.confirmButton.click();
  }
}