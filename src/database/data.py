import sqlite3
import sys


def Database_init(db_file):
    try:
        connection = sqlite3.connect("Data.db")
        cursor = connection.cursor()

        cursor.execute(
            """CREATE TABLE IF NOT EXISTS stickers (
                Number TEXT,
                Date TEXT)"""
        )
        return connection, cursor

    except sqlite3.Error as e:
        print("Erro ao se conectar ao banco de dados")
        sys.exit(1)


if __name__ == "__main__":
    connection, cursor = Database_init("Data.db")

    try:
        acao = sys.argv[1]

        if acao == "add":
            number = sys.argv[2]
            date = sys.argv[3]

            cursor.execute(
                "INSERT OR REPLACE INTO stickers (Number, Date) VALUES (?, ?)",
                (number, date),
            )
            connection.commit()

    except IndexError:
        print("erro: argumentos insuficientes")
    finally:
        connection.close()
