import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;
  readonly signupMessage: Locator;
  readonly trustedCreatorsSection: Locator;
  readonly subscriptionsSection: Locator;
  readonly messagingSection: Locator;
  readonly payToViewSection: Locator;
  readonly featuresSection: Locator;
  readonly faqSection: Locator;
  readonly fanvueAiLink: Locator;
  readonly ourMissionLink: Locator;
  readonly supportLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly menuButton: Locator;
  readonly cookieAcceptButton: Locator;

  // Enhanced popup selectors based on actual HTML structure
  readonly hubspotModal: Locator;
  readonly hubspotCloseButton: Locator;
  readonly hubspotForm: Locator;
  readonly hubspotOverlay: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = page.locator('h1').first();
    this.signupMessage = page.locator('p:has-text("Sign up before the end of the month")');
    this.trustedCreatorsSection = page.locator('h1:has-text("Trusted by the world\'s biggest creators")');
    this.subscriptionsSection = page.locator('h2:has-text("Earn money from Subscriptions")');
    this.messagingSection = page.locator('h2:has-text("Connect with your fans with Messaging")');
    this.payToViewSection = page.locator('h2:has-text("Sell content with Pay-to-View")');
    this.featuresSection = page.locator('h2:has-text("All the features you need to Succeed")');
    this.faqSection = page.locator('h2:has-text("Frequently asked questions")');
    this.menuButton = page.getByRole('button', { name: 'menu' });
    this.fanvueAiLink = page.getByRole('link', { name: 'fanvue AI' });
    this.ourMissionLink = page.getByRole('link', { name: 'Our Mission' });
    this.supportLink = page.getByRole('link', { name: 'Support' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up', exact: true }).first();
    this.cookieAcceptButton = page.getByRole('link', { name: 'OK', exact: true });
    
    // Enhanced HubSpot modal selectors based on actual HTML structure
    this.hubspotModal = page.locator('body[data-hs-container-type="MODAL"]');
    this.hubspotCloseButton = page.locator('#interactive-close-button, [aria-label="Close"]');
    this.hubspotForm = page.locator('form[id*="hs-form"]');
    this.hubspotOverlay = page.locator('body[data-hs-container-type="MODAL"] .body-wrapper');
  }

  async acceptCookies() {
    try {
      await this.cookieAcceptButton.click({ timeout: 5000 });
    } catch (e) {
      // Cookie banner might not be visible
    }
  }

  /**
   * Enhanced popup detection and dismissal with multiple strategies
   */
  async dismissPopupModal() {
    const maxAttempts = 3;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        // Check if HubSpot modal is visible
        const isModalVisible = await this.hubspotModal.isVisible({ timeout: 2000 });
        
        if (!isModalVisible) {
          // No modal found, we're good
          return;
        }
        
        console.log(`Attempt ${attempt}: HubSpot modal detected, attempting to close...`);
        
        // Strategy 1: Click the specific close button
        if (await this.hubspotCloseButton.isVisible({ timeout: 1000 })) {
          await this.hubspotCloseButton.click();
          console.log('Clicked close button');
        } else {
          // Strategy 2: Press Escape key
          await this.page.keyboard.press('Escape');
          console.log('Pressed Escape key');
        }
        
        // Wait for modal to disappear
        await this.hubspotModal.waitFor({ state: 'hidden', timeout: 3000 });
        console.log('Modal successfully dismissed');
        return;
        
      } catch (e) {
        console.log(`Attempt ${attempt} failed: ${e.message}`);
        if (attempt === maxAttempts) {
          console.log('All attempts failed, continuing with test');
        }
        // Wait before next attempt
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Safely get text content with popup interference handling
   */
  async getTextContentWithPopupHandling(locator: Locator, retries = 3): Promise<string | null> {
    for (let i = 0; i < retries; i++) {
      try {
        // Dismiss any popups before reading content
        await this.dismissPopupModal();
        
        // Wait for the element to be stable
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        
        // Get the text content
        const text = await locator.textContent();
        
        // Validate that we got meaningful content (not popup text)
        if (text && !this.isPopupText(text)) {
          return text;
        }
        
        console.log(`Retry ${i + 1}: Got potential popup text, retrying...`);
        
      } catch (e) {
        console.log(`Retry ${i + 1} failed: ${e.message}`);
      }
      
      // Wait before retry
      await this.page.waitForTimeout(1000);
    }
    
    // Final attempt without popup handling
    return await locator.textContent();
  }

  /**
   * Detect if text content is from a popup rather than main content
   */
  private isPopupText(text: string): boolean {
    const popupIndicators = [
      'start earning',
      'creator journey',
      'start your creator',
      'become a verified creator in under three minutes',
      'your email address'
    ];
    
    const lowerText = text.toLowerCase();
    return popupIndicators.some(indicator => lowerText.includes(indicator));
  }

  /**
   * Enhanced method to wait for page to be stable without popup interference
   */
  async waitForStableContent(timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      // Dismiss any popups
      await this.dismissPopupModal();
      
      try {
        // Check if main heading is accessible and has expected content
        const heading = await this.mainHeading.textContent({ timeout: 2000 });
        if (heading && !this.isPopupText(heading)) {
          // Content is stable and not from popup
          return;
        }
      } catch (e) {
        // Continue waiting
      }
      
      await this.page.waitForTimeout(500);
    }
  }

  async openNavigationMenu() {
    // Dismiss popup before interacting with navigation
    await this.dismissPopupModal();
    
    // Check if menu button is visible (mobile view)
    if (await this.menuButton.isVisible({ timeout: 1000 })) {
      await this.menuButton.click();
    }
    // In desktop view, navigation is already visible
  }
}