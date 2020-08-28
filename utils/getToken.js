// Load ENV
require('dotenv').config();

const speakeasy = require('speakeasy');

module.exports = function getToken() {
  return speakeasy.totp({
    secret: process.env.TOTP_SECRET,
    encoding: 'base32'
  });
}
