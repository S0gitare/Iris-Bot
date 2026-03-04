import sqlite3
import sys


def Database_init(db_file):
    try:
        connection = sqlite3.connect("Data.db")
        cursor = connection.cursor()

        cursor.execute(
            """CREATE TABLE IF NOT EXISTS Anotacoes (
                comando TEXT PRIMARY KEY,
                texto TEXT NOT NULL)"""
        )
        return connection, cursor

    except sqlite3.Error as e:
        print("Erro ao se conextar ao banco de dados")
        sys.exit(1)


if __name__ == "__main__":
    connection, cursor = Database_init("Data.db")

    try:
        acao = sys.argv[1]

        if acao == "salvar":
            chave = sys.argv[2]
            valor = sys.argv[3]
            cursor.execute(
                "REPLACE INTO Anotacoes (comando, texto) VALUES (?, ?)", (chave, valor)
            )
            connection.commit()
        elif acao == "ler":
            chave = sys.argv[2]
            cursor.execute("SELECT texto FROM Anotacoes WHERE comando = ?", (chave))
            result = cursor.fetchone()

            if result:
                print(result[0])

            else:
                print("erro")

    except IndexError:
        print("Erro: Faltam argumentos. Use: python banco.py salvar <chave> <valor>")

    finally:
        connection.close()
