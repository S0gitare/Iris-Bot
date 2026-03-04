const { exec } = require("child_process");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    console.log("Mensagem Recebida!");

    if (msg.hasMedia && msg.body === "!sticker") {
      msg.reply("Processando Figurinha... ⏳");
      const media = await msg.downloadMedia();

      const id_sticker = msg.id.id;
      const data_base64 = media.data;

      const command = `python src/database/data.py salvar "${id_sticker}" "${data_base64}"`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar o comando: ${error.message}`);
          return;
        }
        console.log("figurinha salva");
      });

      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
      });
    }
  });
};
