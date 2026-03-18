const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const setupHandlerHelp = require("../handlers/help");
const setupHandleSticker = require("../handlers/stickers");
const setupHandleResponseBot = require("../handlers/response_bot");

// Configuração do cliente com estratégia de autenticação local
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

// Evento para gerar QR Code
client.on("qr", (qr) => {
  console.log("Escaneie o QR Code abaixo para conectar:");
  qrcode.generate(qr, { small: true });
});

// Evento quando o bot estiver online
client.on("ready", () => {
  console.log("Bot online e pronto para uso!");
});

// Evento de erro de autenticação
client.on("auth_failure", (msg) => {
  console.error("Falha na autenticação:", msg);
});

// Evento de desconexão
client.on("disconnected", (reason) => {
  console.log("Cliente desconectado:", reason);
});

// Configuração dos handlers
setupHandlerHelp(client);
setupHandleSticker(client);
setupHandleResponseBot(client);

// Inicialização do cliente com tratamento de erros
client.initialize().catch((err) => {
  console.error("Erro ao inicializar o cliente:", err);
});
