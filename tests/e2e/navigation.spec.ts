import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Navigation Button Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.acceptCookies();
  });

  test('should navigate to Login page from homepage', async () => {
    await homePage.openNavigationMenu();
    await homePage.loginLink.click();
    await expect(homePage.page).toHaveURL(/.*signin|.*login/);
  });

  test('should navigate to Sign Up page from homepage', async ({ page }) => {
    // Sign Up link is always visible, no need to open menu
    await homePage.signUpLink.click();
    await expect(homePage.page).toHaveURL(/.*signup/);
  });
});