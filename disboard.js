const login = require('./utils/login');
const startBrowser = require('./utils/startBrowser');

module.exports = async function bumpDisboard() {
  console.log('Start bumping disboard.org');
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto('https://disboard.org/login');

  // Login
  await login(page);

  // Click All Bump Buttons
  await page.waitForSelector('.button-bump');
  const bumpButtons = await page.$$('.button-bump');
  for (let i = 0; i < bumpButtons.length; ++i) {
    await bumpButtons[i].click();
    await page.waitForNavigation();
  }

  await new Promise(r => setTimeout(r, 2000));

  await browser.close();
};
