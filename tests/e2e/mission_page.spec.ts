import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Our Mission Page Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.acceptCookies();
  });

  test('should navigate to and verify content on Our Mission page', async () => {
    await homePage.openNavigationMenu();
    await homePage.ourMissionLink.click();
    await expect(homePage.page).toHaveURL(/.*notion.*|.*mission/);
    await expect(homePage.page).toHaveTitle(/.*Mission|Fanvue Mission/);
    // Add assertions for Mission page specific content
    // await expect(homePage.missionPageMainHeading).toBeVisible();
  });
});