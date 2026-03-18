const { addStickerRecord } = require("../database/db");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    // Verifica se a mensagem tem mídia e o corpo é '!sticker'
    if (msg.hasMedia && msg.body === "!sticker") {
      try {
        msg.reply("Processando Figurinha... ⏳");

        const media = await msg.downloadMedia();
        const number = msg.from;
        const date = new Date().toLocaleDateString("pt-br");

        // Adiciona registro ao banco de dados usando Node.js
        await addStickerRecord(number, date);

        // Envia a mídia como figurinha
        await client.sendMessage(msg.from, media, {
          sendMediaAsSticker: true,
        });

      } catch (error) {
        console.error("Erro ao gerar figurinha:", error);
        msg.reply("Desculpe, ocorreu um erro ao gerar sua figurinha.");
      }
    }
  });
};
