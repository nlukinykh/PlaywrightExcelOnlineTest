import { test, expect } from '@playwright/test';
import { loginToOffice, navigateToWorkbook } from './helpers/auth';
import { getTodayDateString, areDatesEqual } from './helpers/date';

test.describe('Excel Online TODAY() Function Tests', () => {
  test('should return current date when using TODAY() function', async ({ page }) => {
    // Login to Office 365
    await loginToOffice(page);

    // Navigate to the specific workbook
    await navigateToWorkbook(page);

    // Select cell A1
    await page.click('[data-rc-id="A1"]');

    // Enter TODAY() formula
    await page.keyboard.type('=TODAY()');
    await page.keyboard.press('Enter');

    // Get cell value after formula execution
    const cellValue = await page.textContent('[data-rc-id="A1"]');

    // Get today's date for comparison
    const expectedDate = getTodayDateString();

    // Compare dates
    expect(cellValue).toBeTruthy();
    expect(areDatesEqual(cellValue!, expectedDate)).toBeTruthy();
  });
});