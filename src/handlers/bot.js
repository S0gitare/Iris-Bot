require("dotenv").config();
require("@google/generative-ai");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function generateResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent(prompt);

  return response.response.text();
}

module.exports = { generateResponse };
