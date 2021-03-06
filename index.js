const bumpDisboard = require('./disboard');
const bumpDiscordMe = require('./discordMe');
const bumpDiscordServers = require('./discordServers');
const bumpTopgg = require('./topgg');

async function tryDisboard() {
  try {
    await bumpDisboard();
  } catch (ex) {
    console.error('FAILED TO BUMP DISBOARD.ORG');
    console.error(ex);
  }
}

async function tryDiscordMe() {
  try {
    await bumpDiscordMe();
  } catch (ex) {
    console.error('FAILED TO BUMP DISCORD.ME');
    console.error(ex);
  }
}

async function runHourlyBumps() {
  await tryDisboard();
  await tryDiscordMe();
  console.log('Bumping done.');
}

async function runDailyBumps() {
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

  console.log('Daily Bumping done.');
}

const cliArguments = process.argv.slice(2);
if (cliArguments.length) {
  if (cliArguments[0] === '--repeat') {
    setInterval(runHourlyBumps, 1000 * 60 * 60);
  }
  if (cliArguments[0] === '--daily') {
    runDailyBumps()
  }
  if (cliArguments[0] === '--disboard') {
    tryDisboard()
  }
  if (cliArguments[0] === '--discordme') {
    tryDiscordMe()
  }
} else {
  runHourlyBumps();
}
