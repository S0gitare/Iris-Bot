const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const setupHandlerHelp = require("../handlers/help");
const setupHandleSticker = require("../handlers/stickers");
const setupHandleResponseBot = require("../handlers/response_bot");

const client = new Client({ authStrategy: new LocalAuth() });

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));
client.on("ready", () => console.log("Bot online!"));

setupHandlerHelp(client);
setupHandleSticker(client);
setupHandleResponseBot(client);

client.initialize();
