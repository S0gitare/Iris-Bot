<div align="center">

# Íris Bot

**A smart WhatsApp assistant — powered by Google Gemini**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## Overview

**Íris** is a modular and extensible WhatsApp bot that combines everyday utilities with conversational AI. She understands context, analyzes images, and responds naturally — all directly in WhatsApp.

---

## Commands

| Command | Description |
|---|---|
| `!help` | Display the command menu |
| `!sticker` | Convert images and videos into stickers |
| `!bot <question>` | Chat with AI (supports text and images) |
| `!bot reset` | Clear the conversation history |

### Highlights

- **Conversation memory** — retains up to 20 messages of context per user
- **Image analysis** — send an image with `!bot` and ask anything about it
- **Rate limiting** — max 5 requests per minute per user
- **Structured logging** — via [Pino](https://getpino.io/) with configurable log level
- **Extensible command registry** — add new commands without touching the core
- **Docker-ready** — production image with Chromium built in

---

## Architecture

```
src/
├── config/
│   └── index.js               # Prefix, bot name, rate limit settings
├── core/
│   ├── main.js                # Entry point and client initialization
│   └── commandRegistry.js     # Command registration and dispatch
├── handlers/
│   ├── bot.js                 # Google Gemini integration
│   └── help.js                # Help command handler
└── utils/
    ├── conversationHistory.js  # Per-user history (up to 20 messages)
    ├── rateLimiter.js          # Sliding window rate control
    ├── logger.js               # Structured logging with Pino
    └── menu.js                 # Help menu text
```

---

## Installation

### Prerequisites

- Node.js `>= 20`
- API key from [Google AI Studio](https://aistudio.google.com/)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/iris-bot.git
cd iris-bot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your key:
#   GEMINI_API=your_key_here

# 4. Start the bot
npm start
```

After starting, a **QR Code** will appear in the terminal. Scan it from WhatsApp:  
`Settings → Linked Devices → Link a Device`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API` | Yes | Google Gemini API key |
| `LOG_LEVEL` | No | Pino log level (`info` by default) |

---

## Docker

```bash
# Build the image
docker build -t iris-bot .

# Run the container
docker run -e GEMINI_API=your_key_here iris-bot
```

The image is based on `node:20-slim` with Chromium included — no extra setup needed.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [whatsapp-web.js](https://wwebjs.dev/) | WhatsApp connection via Puppeteer |
| [Google Generative AI](https://ai.google.dev/) | Gemini 1.5 Flash conversational AI model |
| [Pino](https://getpino.io/) | High-performance structured logging |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

---

## Disclaimer

> This project is for **educational purposes only**. It is not an official WhatsApp/Meta product.  
> Automating WhatsApp may violate their [Terms of Service](https://www.whatsapp.com/legal/terms-of-service).  
> Use at your own risk.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

- Credit the original author
- Do not use for spam or malicious purposes
