require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

/**
 * Gera uma resposta usando o modelo Gemini do Google.
 * @param {string} prompt - O prompt de entrada para o bot.
 * @returns {Promise<string>} - A resposta gerada.
 */
async function generateResponse(prompt) {
  try {
    // Corrigido para um modelo válido (gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta com IA:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação.";
  }
}

module.exports = { generateResponse };
