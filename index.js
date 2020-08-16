const bumpDisboard = require('./disboard');
const bumpDiscordMe = require('./discordMe');
const bumpDiscordServers = require('./discordServers');
const bumpTopgg = require('./topgg');

async function runAllBumps() {
  try {
    await bumpDisboard();
  } catch (ex) {
    console.error('FAILED TO BUMP DISBOARD.ORG');
    console.error(ex);
  }

  try {
    await bumpDiscordMe();
  } catch (ex) {
    console.error('FAILED TO BUMP DISCORD.ME');
    console.error(ex);
  }

  try {
    await bumpDiscordServers();
  } catch (ex) {
    console.error('FAILED TO BUMP DISCORDSERVERS.COM');
    console.error(ex);
  }

  try {
    await bumpTopgg();
  } catch (ex) {
    console.error('FAILED TO BUMP TOP.GG');
    console.error(ex);
  }

  console.log('Bumping done.');
}

const cliArguments = process.argv.slice(2);
console.log(cliArguments);

if (cliArguments.length) {
  setInterval(runAllBumps, 1000 * 60 * 60);
} else {
  runAllBumps();
}
