import { test, expect } from '@playwright/test';

test('example', async ({ page }) => {
    await page.goto('https://www.baidu.com');
    await expect(page).toHaveTitle('百度一下，你就知道');
});