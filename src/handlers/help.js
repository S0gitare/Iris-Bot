const menu = require("../utils/menu");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    if (msg.body === "!help") {
      msg.reply(menu);
    }
  });
};
