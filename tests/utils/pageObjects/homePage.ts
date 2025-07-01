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
  }

  async acceptCookies() {
    try {
      await this.cookieAcceptButton.click({ timeout: 5000 });
    } catch (e) {
      // Cookie banner might not be visible
    }
  }

  async openNavigationMenu() {
    // Check if menu button is visible (mobile view)
    if (await this.menuButton.isVisible({ timeout: 1000 })) {
      await this.menuButton.click();
    }
    // In desktop view, navigation is already visible
  }
}