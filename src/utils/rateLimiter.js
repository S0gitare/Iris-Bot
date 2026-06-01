const config = require('../config');

const requests = new Map();
const RATE_LIMIT_MSG = 'Você está enviando mensagens muito rápido. Aguarde um momento.';

function isRateLimited(number) {
  const now = Date.now();
  const { maxRequests, windowMs } = config.rateLimit;

  const prev = requests.get(number) || [];
  const recent = prev.filter(t => now - t < windowMs);

  if (recent.length >= maxRequests) return true;

  recent.push(now);
  requests.set(number, recent);
  return false;
}

module.exports = { isRateLimited, RATE_LIMIT_MSG };
