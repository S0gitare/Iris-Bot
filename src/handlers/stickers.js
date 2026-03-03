module.exports = function (client) {
  client.on("message_create", async (msg) => {
    console.log("Mensagem Recebida!");

    if (msg.hasMedia && msg.body === "!sticker") {
      msg.reply("Processando Figurinha... ⏳");
      const media = await msg.downloadMedia();

      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
      });
    }
  });
};
