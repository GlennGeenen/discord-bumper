// Load ENV
require('dotenv').config();

const puppeteer = require('puppeteer');

async function startBrowser() {
  let options = {};
  if (process.env.DEBUG === 'true') {
    options = {
      headless: false,
      slowMo: 100,
    };
  }
  return puppeteer.launch(options);
}

module.exports = async function runBrowser(scriptToRun) {
  const browser = await startBrowser();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(10000);

  try {
    await scriptToRun(page);
    await browser.close();
  } catch (ex) {
    await browser.close();
    throw ex;
  }
};
