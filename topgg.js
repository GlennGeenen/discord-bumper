const login = require('./utils/login');
const getServerIds = require('./utils/getServerIds');
const runScript = require('./utils/runBrowser');

async function topgg(page) {
  await page.goto('https://top.gg/login');

  // Discord login flow
  await login(page);
  await page.waitForNavigation();

  // Accept Cookies
  await page.click('button[mode="primary"]');

  const servers = getServerIds();
  for (let i = 0; i < servers.length; ++i) {
    // Go to server bump page
    await page.goto(`https://top.gg/servers/${servers[i]}/vote`);

    // Click Bump Button
    await page.waitForSelector('#votingvoted');
    await page.click('#votingvoted');
  }

  await new Promise(r => setTimeout(r, 1000));
}

module.exports = async function bumpTopgg() {
  console.log('Start bumping top.gg');
  await runScript(topgg);
};
