import { Page } from '@playwright/test';
import { config } from '../config';

export async function loginToOffice(page: Page): Promise<void> {
  await page.goto(config.urls.login);

  // Enter email
  await page.fill('input[type="email"]', config.credentials.email);
  await page.click('input[type="submit"]');

  // Enter password
  await page.fill('input[type="password"]', config.credentials.password);
  await page.click('input[type="submit"]');

  // Wait for successful login
  await page.waitForNavigation();
}

export async function navigateToWorkbook(page: Page): Promise<void> {
  // Navigate directly to the specified workbook
  await page.goto(config.urls.workbook);

  // Wait for Excel Online to fully load
  await page.waitForSelector('.excel-canvas', {
    timeout: config.timeouts.navigation
  });

  // Wait a moment for the workbook to be fully interactive
  await page.waitForTimeout(2000);
}