const { generateResponse } = require('./bot');
const { isRateLimited } = require('../utils/rateLimiter');
const { clearHistory } = require('../utils/conversationHistory');
const config = require('../config');
const logger = require('../utils/logger');

async function responseBotHandler(msg, client) {
  const cmdPrefix = `${config.prefix}bot`;
  const prompt = msg.body.slice(cmdPrefix.length).trim();

  if (prompt.toLowerCase() === 'reset') {
    clearHistory(msg.from);
    await msg.reply('Histórico de conversa limpo! ✅').catch(() => {});
    return;
  }

  if (isRateLimited(msg.from)) {
    await msg.reply('Você está enviando mensagens muito rápido. Aguarde um momento.').catch(() => {});
    return;
  }

  if (!prompt && !msg.hasMedia) {
    await msg.reply(`Por favor, forneça uma pergunta após ${cmdPrefix}.`).catch(() => {});
    return;
  }

  try {
    const thinkingMsg = await msg.reply('Processando Resposta... ⏳');

    let imageData = null;
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      imageData = { mimetype: media.mimetype, data: media.data };
    }

    const response = await generateResponse(prompt, msg.from, imageData);
    await msg.reply(response);

    try { await thinkingMsg.delete(true); } catch (_) {}
  } catch (error) {
    logger.error({ err: error }, 'Erro no response_bot');
    await msg.reply('Ocorreu um erro ao processar sua solicitação.').catch(() => {});
  }
}

module.exports = responseBotHandler;
