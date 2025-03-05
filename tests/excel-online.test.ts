import { test, expect } from '@playwright/test';
import { loginToOffice } from './helpers/auth';
import { navigateToWorkbook, activateCellA1, enterFormula, closeTooltip } from './helpers/excel-actions';
import { captureCellScreenshot, extractTextFromScreenshot } from './helpers/screenshot-utils';
import { format } from 'date-fns';

test.describe('Excel Online TODAY() Function Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginToOffice(page);
    await navigateToWorkbook(page);
  });

  test.afterEach(async ({ page }) => {
    await page.keyboard.press('Control+Z'); 
    console.log("Undo the changes");
    
    await page.close();
    console.log("Close the browser");
  });

  test('should return current date when using TODAY() function', async ({ page }) => {
    const frame = page.frameLocator('iframe');
    
    await activateCellA1(page, frame);
    await enterFormula(page, "=TODAY()");
    await closeTooltip(page, frame);
    await captureCellScreenshot(page, frame);

    const cellText = await extractTextFromScreenshot();
    const today = format(new Date(), 'dd/MM/yyyy'); 

    expect(cellText).toContain(today);
  });
});