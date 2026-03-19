# 🤖 Íris Bot - WhatsApp Assistant

**Íris Bot** is a smart WhatsApp assistant that combines practical utilities, such as sticker creation, with the power of Google's Artificial Intelligence (Gemini).


---

## 🚀 Features

- **Sticker Creator:** Instantly transforms images sent with the `!sticker` command into stickers.
- **AI Integration:** Chat with the bot using the `!bot` command followed by a question (uses the `gemini-1.5-flash` model).
- **Database Logging:** Stores sticker usage logs in a local SQLite database.
- **Help Menu:** `!help` command to display all available options.

---

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [whatsapp-web.js](https://wwebjs.dev/) - Library for connecting to WhatsApp.
- [Google Generative AI](https://ai.google.dev/) - Gemini API for natural language processing.
- [SQLite3](https://www.sqlite.org/) - Lightweight database for local storage.
- [Dotenv](https://github.com/motdotla/dotenv) - Environment variable management.

---

## 🔧 How to Install and Run

### Prerequisites
- Node.js installed (version 16 or higher).
- An API key from [Google AI Studio](https://aistudio.google.com/).

### Step by Step

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/iris-bot.git
   cd iris-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API=YOUR_KEY_HERE
   ```

4. **Start the bot:**
   ```bash
   npm start
   ```

5. **Connect WhatsApp:**
   Scan the QR Code that appears in the terminal using the "Linked Devices" feature in your WhatsApp.

---

## ⚠️ Warning

This bot is created for educational purposes only. This is NOT an official WhatsApp bot. Using this bot may lead to your WhatsApp account being banned. Use it at your own risk. No one will be responsible for any consequences or account bans that may occur while using this bot.

---
 
## 📄 License

This project is licensed under the MIT License.

- Credit original author
- Not use for spam or malicious purposes
