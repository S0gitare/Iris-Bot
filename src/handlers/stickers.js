const { isRateLimited, RATE_LIMIT_MSG } = require('../utils/rateLimiter');
const logger = require('../utils/logger');

async function stickersHandler(msg, client) {
  if (isRateLimited(msg.from)) {
    await msg.reply(RATE_LIMIT_MSG).catch(() => {});
    return;
  }

  try {
    await msg.reply('Processando Figurinha... ⏳').catch(() => {});
    const media = await msg.downloadMedia();
    if (!media) {
      logger.warn({ from: msg.from }, 'downloadMedia retornou null');
      await msg.reply('Não foi possível baixar a mídia. Tente novamente.').catch(() => {});
      return;
    }
    await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
  } catch (error) {
    logger.error({ err: error }, 'Erro ao gerar figurinha');
    await msg.reply('Desculpe, ocorreu um erro ao gerar sua figurinha.').catch(() => {});
  }
}

module.exports = stickersHandler;
