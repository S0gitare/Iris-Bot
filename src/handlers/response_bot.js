const { generateResponse } = require("../handlers/bot");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    if (msg.body.startsWith("!bot")) {
      const prompt = msg.body.slice(4).trim();
      msg.reply("Processando Resposta... ⏳");

      msg.reply(await generateResponse(prompt));
    }
  });
};
