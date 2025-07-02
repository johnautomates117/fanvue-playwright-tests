import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('Homepage Verification', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    // Accept cookies if present
    await homePage.acceptCookies();
    // Wait for stable content without popup interference
    await homePage.waitForStableContent();
  });

  test('should verify homepage title and main heading', async () => {
    await expect(homePage.page).toHaveTitle('Fanvue');
    await expect(homePage.mainHeading).toBeVisible();
    
    // Use robust text content method that handles popup interference
    const headingText = await homePage.getTextContentWithPopupHandling(homePage.mainHeading);
    
    // Verify content is not from popup and contains expected text
    expect(headingText).toBeTruthy();
    expect(headingText?.toLowerCase()).toContain('creator');
    
    // Check for either "platform" OR other expected content since homepage text may vary
    const hasExpectedContent = 
      headingText?.toLowerCase().includes('platform') ||
      headingText?.toLowerCase().includes('revenue') ||
      headingText?.toLowerCase().includes('earning');
    
    expect(hasExpectedContent).toBe(true);
  });

  test('should verify key sections and navigation links', async () => {
    // Ensure stable content before checking sections
    await homePage.waitForStableContent();
    
    await expect(homePage.signupMessage).toBeVisible();
    await expect(homePage.trustedCreatorsSection).toBeVisible();
    await expect(homePage.subscriptionsSection).toBeVisible();
    await expect(homePage.messagingSection).toBeVisible();
    await expect(homePage.payToViewSection).toBeVisible();
    await expect(homePage.featuresSection).toBeVisible();
    await expect(homePage.faqSection).toBeVisible();

    // Verify navigation links - openNavigationMenu already handles popup dismissal
    await homePage.openNavigationMenu();
    await expect(homePage.fanvueAiLink).toBeVisible();
    await expect(homePage.ourMissionLink).toBeVisible();
    await expect(homePage.supportLink).toBeVisible();
    await expect(homePage.loginLink).toBeVisible();
    
    // Sign Up link is always visible
    await expect(homePage.signUpLink).toBeVisible();
  });

  test('should handle popup interference gracefully', async () => {
    // This test specifically validates our popup handling
    await homePage.dismissPopupModal();
    
    // Verify main content is accessible after popup handling
    const headingText = await homePage.getTextContentWithPopupHandling(homePage.mainHeading);
    expect(headingText).toBeTruthy();
    
    // Verify we can read actual homepage content, not popup content
    const lowerText = headingText?.toLowerCase() || '';
    expect(lowerText).not.toContain('start earning');
    expect(lowerText).not.toContain('creator journey');
  });
});