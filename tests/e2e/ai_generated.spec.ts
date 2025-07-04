import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pageObjects/homePage';

test.describe('AI Generated Fanvue Test', () => {
  test('Test generated by Claude AI to demonstrate the integration of AI-powered test generation with Playwright', async ({ page }) => {
    // Initialize HomePage with robust popup handling
    const homePage = new HomePage(page);
    
    // Step 1: Navigate to https://www.fanvue.com/
    await homePage.navigate();
    
    // Step 2: Accept cookies and handle popups
    await homePage.acceptCookies();
    await homePage.waitForStableContent();
    
    // Step 3: Verify the main heading is visible with robust content handling
    await expect(homePage.mainHeading).toBeVisible();
    
    // Use robust text content method that handles popup interference
    const headingText = await homePage.getTextContentWithPopupHandling(homePage.mainHeading);
    
    // Verify content contains expected text (matching actual homepage content)
    expect(headingText).toBeTruthy();
    expect(headingText?.toLowerCase()).toContain('creator');
    
    // Ensure we're in desktop view for navigation visibility
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Step 4: Click on 'fanvue AI' in navigation (with popup handling)
    await homePage.openNavigationMenu();
    await page.getByRole('link', { name: 'fanvue AI' }).click();
    
    // Step 5: Verify navigation to AI page
    await expect(page).toHaveURL(/.*fanvue-ai/);
    await expect(page).toHaveTitle(/.*AI/);
    const aiHeading = page.locator('h1:has-text("The only AI subscription platform")');
    await expect(aiHeading).toBeVisible();
    
    // Step 6: Go back to homepage
    await page.goBack();
    await expect(page).toHaveURL('https://www.fanvue.com/');
    
    // Wait for stable content after navigation back
    await homePage.waitForStableContent();
    
    // Step 7: Click on 'Our Mission' in navigation (with popup handling)
    await homePage.openNavigationMenu();
    await page.getByRole('link', { name: 'Our Mission' }).click();
    
    // Step 8: Verify navigation to mission page
    await expect(page).toHaveURL(/.*notion.*|.*mission/);
    await expect(page).toHaveTitle(/.*Mission|.*Values/);
  });
});