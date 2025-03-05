import { Page } from '@playwright/test';
import { config } from '../config';

export async function loginToOffice(page: Page): Promise<void> {
  await page.goto(config.urls.login);

  // Enter email
  await page.fill('input[type="email"]', config.credentials.email);
  await page.click('input[type="submit"]');
  console.log("Entered email");

  // Enter password
  await page.waitForSelector('input[type="email"]', { state: 'detached' });
  await page.fill('input[type="password"]', config.credentials.password);
  await page.click('button[type="submit"]');
  console.log("Entered password");

  await page.waitForSelector('input[type="password"]', { state: 'detached' });
  
  const popup = page.locator('a[id="iShowSkip"]');
  try {
    await popup.waitFor({ state: 'attached', timeout: 500 }); 
    await popup.click();
    console.log("Pop up is closed");
  } catch {
    console.log("Pop up doesn't appear, continue the test");
  }
  
  const declineButton = page.locator('button[id="declineButton"]');
  const acceptButton = page.locator('button[id="acceptButton"]')
  if (await declineButton.isEnabled() && await acceptButton.isEnabled()) {
      await declineButton.click();
  }
  console.log("Logged in");
}