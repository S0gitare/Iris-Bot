import sqlite3
import sys


class Database:
    def __init__(self, db_file):
        self.db_file = db_file
        self.connection = None

        def connect(self):
            try:
                self.connection = sqlite3.connect(self.db_file)
            except sqlite3.Error as e:
                print(f"Error connecting to database: {e}")
                sys.exit(1)

        def cursor(self):
            if self.connection is None:
                self.connect()
            cursor.execute(
                """CREATE TABLE IF NOT EXISTS Anotacoes (
        comando TEXT PRIMARY KEY,
        texto TEXT NOT NULL"""
            )
            return self.connection.cursor()
