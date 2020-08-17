const login = require('./utils/login');
const runScript = require('./utils/runBrowser');

async function disboard(page) {
  await page.goto('https://disboard.org/login');

  // Discord login flow
  await login(page);

  // Click All Bump Buttons
  await page.waitForSelector('.button-bump');
  const bumpButtons = await page.$$('.button-bump');
  for (let i = 0; i < bumpButtons.length; ++i) {
    await bumpButtons[i].click();
    await page.waitForNavigation();
  }

  await new Promise(r => setTimeout(r, 2000));
}

module.exports = async function bumpDisboard() {
  console.log('Start bumping disboard.org');
  await runScript(disboard);
};
