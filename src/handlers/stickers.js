const { exec } = require("child_process");

module.exports = function (client) {
  client.on("message_create", async (msg) => {
    console.log("Mensagem Recebida!");

    if (msg.hasMedia && msg.body === "!sticker") {
      msg.reply("Processando Figurinha... ⏳");
      const media = await msg.downloadMedia();

      const number = msg.from;
      const date = new Date().toLocaleDateString("pt-br");

      const command = `python src/database/data.py add "${number}" "${date}"`;

      exec(command, (error, srtdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar o comando: ${error}`);
          return;
        }
        console.log(srtdout);
      });

      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
      });
    }
  });
};
