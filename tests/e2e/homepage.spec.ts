import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Homepage Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    // Accept cookies if present
    await homePage.acceptCookies();
    // Dismiss any popup modals that might interfere with tests
    await homePage.dismissPopupModal();
  });

  test('should verify homepage title and main heading', async () => {
    await expect(homePage.page).toHaveTitle('Fanvue');
    await expect(homePage.mainHeading).toBeVisible();
    
    // Ensure popup is dismissed before reading heading text
    await homePage.dismissPopupModal();
    
    // Check that the heading contains key phrases
    const headingText = await homePage.mainHeading.textContent();
    expect(headingText?.toLowerCase()).toContain('platform');
    expect(headingText?.toLowerCase()).toContain('creator');
  });

  test('should verify key sections and navigation links', async () => {
    // Ensure popup is dismissed before checking sections
    await homePage.dismissPopupModal();
    
    await expect(homePage.signupMessage).toBeVisible();
    await expect(homePage.trustedCreatorsSection).toBeVisible();
    await expect(homePage.subscriptionsSection).toBeVisible();
    await expect(homePage.messagingSection).toBeVisible();
    await expect(homePage.payToViewSection).toBeVisible();
    await expect(homePage.featuresSection).toBeVisible();
    await expect(homePage.faqSection).toBeVisible();

    // Verify navigation links - need to open menu first
    await homePage.openNavigationMenu();
    await expect(homePage.fanvueAiLink).toBeVisible();
    await expect(homePage.ourMissionLink).toBeVisible();
    await expect(homePage.supportLink).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    
    // Sign Up link is always visible
    await expect(homePage.signUpLink).toBeVisible();
  });
});