const MAX_HISTORY = 20;
const histories = new Map();

function getHistory(number) {
  return histories.get(number) || [];
}

function addToHistory(number, role, text) {
  const history = histories.get(number) || [];
  history.push({ role, parts: [{ text }] });
  if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
  histories.set(number, history);
}

function clearHistory(number) {
  histories.delete(number);
}

module.exports = { getHistory, addToHistory, clearHistory };
