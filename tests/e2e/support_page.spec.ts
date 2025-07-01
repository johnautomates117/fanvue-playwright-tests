import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Support Page Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.acceptCookies();
  });

  test('should navigate to and verify Support page', async () => {
    await homePage.openNavigationMenu();
    await homePage.supportLink.click();
    await expect(homePage.page).toHaveURL(/.*help.fanvue.com/);
    await expect(homePage.page).toHaveTitle(/.*Support|Help Center|Fanvue Help/);
  });
});