const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getHistory, addToHistory } = require('../utils/conversationHistory');
const logger = require('../utils/logger');

if (!process.env.GEMINI_API) {
  logger.error('GEMINI_API não está definida. Configure a variável de ambiente antes de iniciar.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function generateResponse(prompt, senderNumber, imageData = null) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const history = getHistory(senderNumber);
    const chat = model.startChat({ history });

    let messageParts;
    if (imageData) {
      messageParts = [
        { inlineData: { mimeType: imageData.mimetype, data: imageData.data } },
        { text: prompt || 'Descreva esta imagem.' },
      ];
    } else {
      messageParts = [{ text: prompt }];
    }

    const result = await chat.sendMessage(messageParts);
    const responseText = result.response.text();
    addToHistory(senderNumber, 'user', prompt || '[imagem]');
    addToHistory(senderNumber, 'model', responseText);

    return responseText;
  } catch (error) {
    logger.error({ err: error }, 'Erro ao gerar resposta com IA');
    return 'Desculpe, ocorreu um erro ao processar sua solicitação.';
  }
}

module.exports = { generateResponse };
