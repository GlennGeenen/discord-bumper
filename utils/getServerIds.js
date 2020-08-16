// Load ENV
require('dotenv').config();

module.exports = function getServerIds() {
  const servers = [
    '700895290399654020', // Practical Stoic
  ];
  if (process.env.DISCORDSERVERS_IDS) {
    const arr = process.env.DISCORDSERVERS_IDS.split(',');
    arr.forEach(s => servers.push(s));
  }
  return servers;
}
