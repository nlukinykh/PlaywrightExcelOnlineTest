## How to run this project

### 1️⃣ Clone this repository
```sh
git clone https://github.com/nlukinykh/PlaywrightExcelOnlineTest
cd PlaywrightExcelOnlineTest
```
### 2️⃣ Create and update .env
    Copy .example.env to .env
    Use your Microsoft 365 credentials in .env
### 3️⃣ Install dependencies
```sh
npm install
```
### 4️⃣ Install Playwright (if necessary)
```sh
npx playwright install
```
### 5️⃣ Run tests
```sh
npx playwright test
```

## About this project

This is my first project with stack Playwright and Typescript (+ Microsoft 365 - I didn't use it earlier). So, it may include some incorrect solutions. To correct work, please, update your settings of account: use Europe date format dd/mm/yyyy.

### excel-online.test.ts 
- This file contains a test that uses a document from my Microsoft 365 test account. Thanks to the beforeEach method, the program has already logged into the account and opened the document via a link.
Since Excel spreadsheets are not recognized and the document is rendered using canvas, I decided to interact with the document through mouse and keyboard actions.
#### activateCellA1
- Finds the canvas and clicks at the coordinates { x: 10, y: 10 }, which is approximately in the middle of cell A1.
#### enterFormula
- Enters the formula =TODAY() with a 100-millisecond delay, presses Enter, and then waits for 2 seconds to ensure that the formula is applied in the cell.
#### closeTooltip 
- A function created to handle tooltips that sometimes appear after entering a formula.
- If a tooltip appears, the program clicks somewhere in the middle of the page to avoid clicking on buttons or the tooltip itself.
#### captureCellScreenshot
- Since direct interaction with the table is still not possible, I take a screenshot of the cell and extract text from it using the function extractTextFromScreenshot().
- Then, I compare the extracted text with the expected date in a specific format.
  
After the test case finishes, test.afterEach restores the document to its original state and closes the page.
