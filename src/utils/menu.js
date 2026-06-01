const config = require('../config');

const p = config.prefix;

const menu = `⚙️ - Menu ${config.botName}

➤ ${p}help
Exibe este menu de ajuda.

➤ ${p}sticker
Transforma fotos e vídeos em figurinhas.

➤ ${p}bot <pergunta>
Conversa com a IA. Suporta imagens e mantém contexto da conversa.

➤ ${p}bot reset
Limpa o histórico da conversa.`.trim();

module.exports = menu;
