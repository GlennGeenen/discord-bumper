// Load ENV
require('dotenv').config();

const puppeteer = require('puppeteer');

module.exports = async function startBrowser() {
  let options = {};
  if (process.env.DEBUG === 'true') {
    options = {
      headless: false,
      slowMo: 100,
    };
  }
  return puppeteer.launch(options);
}