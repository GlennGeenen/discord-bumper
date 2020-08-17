const login = require('./utils/login');
const getServerIds = require('./utils/getServerIds');
const runScript = require('./utils/runBrowser');

async function discordServers(page) {
  await page.goto('https://discordservers.com/login');

  // Discord login flow
  await login(page);
  await page.waitForNavigation();

  const servers = getServerIds();
  for (let i = 0; i < servers.length; ++i) {
    // Go to server bump page
    await page.goto(`https://discordservers.com/bump/${servers[i]}`);
    await page.waitForNavigation();

    const bumpButtons = await page.$$('button');
    for (let j = 0; j < bumpButtons.length; ++j) {
      const text = await page.evaluate(element => element.textContent, bumpButtons[j]);
      if (text === 'Give Free Gems!') {
        await bumpButtons[j].click();
      }
    }

    await new Promise(r => setTimeout(r, 1000));
  }
}

module.exports = async function bumpDiscordServers() {
  console.log('Start bumping discordservers.com');
  await runScript(discordServers);
};
