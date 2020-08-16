const login = require('./utils/login');
const startBrowser = require('./utils/startBrowser');
const getServerIds = require('./utils/getServerIds');

module.exports = async function bumpTopgg() {
  console.log('Start bumping top.gg');
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto('https://top.gg/login');
  await page.waitForNavigation();

  // Login
  await login(page);
  await page.waitForNavigation();

  // Accept Cookies
  await page.click('button[mode="primary"]');

  const servers = getServerIds();
  for (let i = 0; i < servers.length; ++i) {
    // Go to server bump page
    await page.goto(`https://top.gg/servers/${servers[i]}/vote`);

    // Click Bump Button
    await page.waitForNavigation();
    await page.click('#votingvoted');
  }

  await new Promise(r => setTimeout(r, 2000));

  await browser.close();
};
