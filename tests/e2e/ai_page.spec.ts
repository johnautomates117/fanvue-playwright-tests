import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Fanvue AI Page Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.acceptCookies();
    // Wait for stable content without popup interference
    await homePage.waitForStableContent();
  });

  test('should navigate to and verify content on fanvue AI page', async () => {
    // openNavigationMenu already handles popup dismissal
    await homePage.openNavigationMenu();
    await homePage.fanvueAiLink.click();
    await expect(homePage.page).toHaveURL(/.*fanvue-ai/);
    await expect(homePage.page).toHaveTitle(/.*AI|fanvue AI/);
    // Add assertions for AI page specific content
    // await expect(homePage.aiPageMainHeading).toBeVisible();
  });
});