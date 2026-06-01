const config = require('../config');

const requests = new Map();

function isRateLimited(number) {
  const now = Date.now();
  const { maxRequests, windowMs } = config.rateLimit;

  const prev = requests.get(number) || [];
  const recent = prev.filter(t => now - t < windowMs);
  recent.push(now);
  requests.set(number, recent);

  return recent.length > maxRequests;
}

module.exports = { isRateLimited };
