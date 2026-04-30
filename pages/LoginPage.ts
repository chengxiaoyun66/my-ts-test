import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly linkToLoginPage: Locator;  // 首页上的“登录数据后台”链接

  constructor(page: Page) {
    this.page = page;
    // 根据实际页面元素调整选择器
    this.linkToLoginPage = page.getByRole('link', { name: '登录数据后台' });
    this.phoneInput = page.getByRole('textbox', { name: '请输入手机号' });
    this.passwordInput = page.getByRole('textbox', { name: '请输入密码' });
    this.loginButton = page.getByRole('button', { name: '立即登录' });
  }

  // 从首页点击登录链接，进入登录页（由于是弹窗，返回新页面）
  async goToLoginPage(): Promise<Page> {
    const pagePromise = this.page.waitForEvent('popup');
    await this.linkToLoginPage.click();
    const loginPage = await pagePromise;
    return loginPage;
  }

  // 在登录页上执行登录操作
  async login(phone: string, password: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}