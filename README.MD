# Discord Server Bump Script

This script will bump your discord server on following websites:
- disboard.org
- discord.me
- discordservers.com
- top.gg

## Install

Make sure you have Node.js installed from https://nodejs.org

```
npm i -g discord-bumper
```

## Configuration

This instruction will also show on first try. You are required to create a .env config file in the discord-bumper directory with following content

```
DISCORD_USERNAME=USERNAME_HERE
DISCORD_PASSWORD=PASSWORD_HERE
DISCORDSERVERS_IDS=IDS_HERE
TOTP_SECRET=SECRET_HERE
```
DISCORDSERVERS_IDS is optional. You can use a comma seperated list for the server ids, you can find the id by going to https://discordservers.com and see the id in the address bar when you select a server.

TOTP_SECRET is optional for when you activated 2FA

## Usage

To Bump on all sites:
```
discord-bumper
```

To keep it running and repeat every hour:
```
discord-bumper --repeat
```

To run the daily bumps:
```
discord-bumper --daily
```
