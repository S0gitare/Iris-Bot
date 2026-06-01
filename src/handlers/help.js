const menu = require('../utils/menu');

async function helpHandler(msg) {
  await msg.reply(menu).catch(() => {});
}

module.exports = helpHandler;
