const { generateResponse } = require("../handlers/bot");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    // Processa apenas mensagens que começam com '!bot'
    if (msg.body.startsWith("!bot")) {
      try {
        const prompt = msg.body.slice(4).trim();

        if (!prompt) {
          msg.reply("Por favor, forneça uma pergunta ou comando após o !bot.");
          return;
        }

        const thinkingMsg = await msg.reply("Processando Resposta... ⏳");
        const response = await generateResponse(prompt);

        // Envia a resposta final
        await msg.reply(response);

      } catch (error) {
        console.error("Erro no response_bot:", error);
        msg.reply("Ocorreu um erro ao processar sua solicitação ao bot.");
      }
    }
  });
};
