const config = require('../config');
const logger = require('../utils/logger');

class CommandRegistry {
  constructor() {
    this.commands = [];
  }

  register(name, handler, options = {}) {
    this.commands.push({ name, handler, ...options });
  }

  setup(client) {
    client.on('message_create', async (msg) => {
      for (const { name, handler, startsWith, mediaRequired } of this.commands) {
        const fullCmd = `${config.prefix}${name}`;
        const matches = startsWith ? msg.body.startsWith(fullCmd) : msg.body === fullCmd;

        if (matches && (!mediaRequired || msg.hasMedia)) {
          try {
            await handler(msg, client);
          } catch (err) {
            logger.error({ err, cmd: name }, 'Erro ao executar comando');
            msg.reply('Ocorreu um erro interno.').catch(() => {});
          }
          return;
        }
      }
    });
  }
}

module.exports = new CommandRegistry();
