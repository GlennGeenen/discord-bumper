const login = require('./utils/login');
const startBrowser = require('./utils/startBrowser');

module.exports = async function bumpDiscordMe() {
  console.log('Start bumping Discord.me');
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto('https://discord.me');
  await page.waitFor('.acceptcookies')
  await page.click('.acceptcookies');

  // Login
  await page.click('.login-btn');
  await login(page);

  // Go to server
  await page.waitForNavigation();
  // await page.click('a[href="/dashboard"]')
  await page.goto('https://discord.me/dashboard');

  // Click All Bump Buttons
  await page.waitForSelector('.bump-btn');
  const bumpButtons = await page.$$('.bump-btn');
  for (let i = 0; i < bumpButtons.length; ++i) {
    await bumpButtons[i].click();
    await page.click('#bump-server-submit');
  }

  await browser.close();
};
