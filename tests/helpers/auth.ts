import { Page } from '@playwright/test';
import { config } from '../config';

export async function loginToOffice(page: Page): Promise<void> {
  await page.goto(config.urls.login);

  // Enter email
  await page.fill('input[type="email"]', config.credentials.email);
  await page.click('input[type="submit"]');

  // Enter password
  await page.waitForSelector('input[type="email"]', { state: 'detached' });
  await page.fill('input[type="password"]', config.credentials.password);
  await page.click('button[type="submit"]');

  await page.waitForSelector('input[type="password"]', { state: 'detached' });
  
  // Click on Decline button on the form "Stay signed in?"
  const declineButton = page.locator('button[id="declineButton"]');
  const acceptButton = page.locator('button[id="acceptButton"]')
  if (await declineButton.isEnabled() && await acceptButton.isEnabled()) {
    await declineButton.click();
  }
}