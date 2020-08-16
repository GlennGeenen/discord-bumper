// Load ENV
require('dotenv').config();
const path = require('path');

if (!process.env.DISCORD_USERNAME || !process.env.DISCORD_PASSWORD) {
  console.error('DISCORD_USERNAME and DISCORD_PASSWORD are required.');
  console.error(`Are you sure you created a .env file in ${path.resolve(__dirname, '../')}`);
  process.exit(1);
}

module.exports = async function discordLogin(page, shouldAuthorize = true) {
  // Login
  await page.waitForNavigation();
  await page.type('input[name="email"]', process.env.DISCORD_USERNAME);
  await page.type('input[name="password"]', process.env.DISCORD_PASSWORD);
  await page.click('button[type="submit"]');

  // Authorize
  if (shouldAuthorize) {
    await page.waitForNavigation();
    const buttons = await page.$$('button[type=button]');
    // First button is Cancel second is Authorize
    await buttons[1].click();
  }
}