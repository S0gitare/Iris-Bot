module.exports = function (client) {
  client.on("message_create", async (msg) => {
    if (msg.body === "!copy")
      if (msg.hasMedia && (msg.type === "audio" || msg.type === "ptt")) {
        const media = await msg.downloadMedia();

        const buffer = buffer.from(media.data, "base64");
      }
  });
};
