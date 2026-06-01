require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const logger = require('../utils/logger');
const registry = require('./commandRegistry');

const helpHandler = require('../handlers/help');
const stickersHandler = require('../handlers/stickers');
const responseBotHandler = require('../handlers/response_bot');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ...(process.env.PUPPETEER_EXECUTABLE_PATH && {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    }),
  },
});

registry.register('help', helpHandler);
registry.register('sticker', stickersHandler, { mediaRequired: true });
registry.register('bot', responseBotHandler, { startsWith: true });

client.on('qr', (qr) => {
  logger.info('QR Code recebido — escaneie pelo WhatsApp em Dispositivos Conectados:');
  logger.info(qr);
});

client.on('ready', () => logger.info('Bot online e pronto para uso!'));
client.on('auth_failure', (msg) => logger.error({ msg }, 'Falha na autenticação'));
client.on('disconnected', (reason) => logger.warn({ reason }, 'Cliente desconectado'));

registry.setup(client);

client.initialize().catch((err) => logger.error({ err }, 'Erro ao inicializar o cliente'));
