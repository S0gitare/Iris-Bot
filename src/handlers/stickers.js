const { isRateLimited } = require('../utils/rateLimiter');
const logger = require('../utils/logger');

async function stickersHandler(msg, client) {
  if (isRateLimited(msg.from)) {
    await msg.reply('Você está enviando mensagens muito rápido. Aguarde um momento.').catch(() => {});
    return;
  }

  try {
    await msg.reply('Processando Figurinha... ⏳').catch(() => {});
    const media = await msg.downloadMedia();
    await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
  } catch (error) {
    logger.error({ err: error }, 'Erro ao gerar figurinha');
    await msg.reply('Desculpe, ocorreu um erro ao gerar sua figurinha.').catch(() => {});
  }
}

module.exports = stickersHandler;
