import { Page, FrameLocator } from '@playwright/test';
import Tesseract from 'tesseract.js';

// make a screenshot of cell A1
export async function captureCellScreenshot(page: Page, frame: FrameLocator) {
  const canvas = frame.locator('#Sheet0_0_0_1 canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error("Не удалось получить bounding box для canvas");

  await page.screenshot({ 
    path: 'cell_A1.png', 
    // magical numbers for 1 standard cell in Excel without borders
    clip: { x: box.x, y: box.y, width: 75, height: 18 }
  });
}

// recognize the text from the screenshot
export async function extractTextFromScreenshot(): Promise<string> {
  const { data: { text } } = await Tesseract.recognize('cell_A1.png', 'eng');
  return text.replace(/\s+/g, '').replace(/O/g, '0').replace(/I/g, '1').trim();
}