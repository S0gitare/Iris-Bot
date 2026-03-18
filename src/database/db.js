const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../Data.db");
const db = new sqlite3.Database(dbPath);

// Inicializa o banco de dados
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS stickers (
      Number TEXT,
      Date TEXT
    )
  `);
});

/**
 * Adiciona um registro de figurinha ao banco de dados.
 * @param {string} number - O número do remetente.
 * @param {string} date - A data do envio.
 */
function addStickerRecord(number, date) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO stickers (Number, Date) VALUES (?, ?)",
      [number, date],
      function (err) {
        if (err) {
          console.error("Erro ao inserir no banco de dados:", err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

module.exports = { addStickerRecord };
