import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  // Example for cookie handling, uncomment and implement if needed
  // async acceptCookies() {
  //   const cookieButton = this.page.locator('text=OK'); // Adjust selector as needed
  //   if (await cookieButton.isVisible()) {
  //     await cookieButton.click();
  //   }
  // }
}