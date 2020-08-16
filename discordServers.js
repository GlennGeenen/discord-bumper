const login = require('./utils/login');
const startBrowser = require('./utils/startBrowser');
const getServerIds = require('./utils/getServerIds');

module.exports = async function bumpDiscordServers() {
  console.log('Start bumping discordservers.com');
  const browser = await startBrowser();
  const page = await browser.newPage();
  await page.goto('https://discordservers.com/login');
  await page.waitForNavigation();

  // Login
  await login(page, false);
  await page.waitForNavigation();

  const servers = getServerIds();
  for (let i = 0; i < servers.length; ++i) {
    // Go to server bump page
    await page.goto(`https://discordservers.com/bump/${servers[i]}`);

    // Click Bump Button
    await page.waitForNavigation();
    const bumpButtons = await page.$$('button');
    for (let j = 0; j < bumpButtons.length; ++j) {
      const buttonText = await bumpButtons[j].getProperty('innerText');
      if (buttonText.includes('bump')) {
        await bumpButtons[j].click();
      }
    }
  }

  await new Promise(r => setTimeout(r, 2000));

  await browser.close();
};
