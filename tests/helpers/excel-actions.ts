import { Page, FrameLocator } from '@playwright/test';
import { config } from '../config';

// transition to Excel Book
export async function navigateToWorkbook(page: Page): Promise<void> {
  await page.goto(config.urls.workbook);
  
  // Wait for Excel Online to fully load
  const frame = page.frameLocator('iframe');
  try {
    await frame.locator('#Sheet0_0_0_1 div canvas').waitFor({ timeout: 10000 });
    console.log("Excel Online is loaded");
  } catch (error) {
    throw new Error("Excel Online is not loaded");
  }
}

// click on A1 by coordinates
export async function activateCellA1(page: Page, frame: FrameLocator) {
  const canvas = frame.locator('#Sheet0_0_0_1 canvas');
  await canvas.click({ position: { x: 10, y: 10 } });
  
  console.log("Cell A1 is activated");
}

// enter the formula into an active cell
export async function enterFormula(page: Page, formula: string) {
  await page.keyboard.type(formula, { delay: 500 });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // wait for update result
  
  console.log("Formula should be entered");
}

// close a pop-up hint
export async function closeTooltip(page: Page, frame: FrameLocator) {
  const tooltip = frame.locator('div[id^="BaseCallout"] div[role="dialog"]');
  if (await tooltip.isVisible()) {
    await page.mouse.click(500, 500);
    console.log("Tooltip is closed");
  }
}