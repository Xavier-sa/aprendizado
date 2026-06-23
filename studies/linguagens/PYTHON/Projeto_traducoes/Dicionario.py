import sqlite3

class Dicionario:
    def __init__(self, db_name="dicionario.db"):
        self.db_name = db_name
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self._criar_tabelas()

    def _criar_tabelas(self):
        # Criar as tabelas se não existirem
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS palavras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            palavra TEXT NOT NULL
        )""")
        
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS traducoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            palavra_id INTEGER,
            traducao TEXT NOT NULL,
            FOREIGN KEY (palavra_id) REFERENCES palavras(id)
        )""")
        
        self.cursor.execute("""
        CREATE TABLE IF NOT EXISTS frases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            frase TEXT NOT NULL,
            palavra_id INTEGER,
            FOREIGN KEY (palavra_id) REFERENCES palavras(id)
        )""")
        
        self.conn.commit()

    def adicionar_palavra(self, palavra):
        self.cursor.execute("INSERT INTO palavras (palavra) VALUES (?)", (palavra,))
        self.conn.commit()

    def adicionar_traducao(self, palavra, traducao):
        # Obter o id da palavra
        self.cursor.execute("SELECT id FROM palavras WHERE palavra = ?", (palavra,))
        palavra_id = self.cursor.fetchone()
        
        if palavra_id:
            palavra_id = palavra_id[0]
            self.cursor.execute("INSERT INTO traducoes (palavra_id, traducao) VALUES (?, ?)", (palavra_id, traducao))
            self.conn.commit()
        else:
            print(f"A palavra '{palavra}' não existe no dicionário.")
    
    def adicionar_frase(self, frase, palavra):
        # Obter o id da palavra
        self.cursor.execute("SELECT id FROM palavras WHERE palavra = ?", (palavra,))
        palavra_id = self.cursor.fetchone()
        
        if palavra_id:
            palavra_id = palavra_id[0]
            self.cursor.execute("INSERT INTO frases (frase, palavra_id) VALUES (?, ?)", (frase, palavra_id))
            self.conn.commit()
        else:
            print(f"A palavra '{palavra}' não existe no dicionário.")
    
    def buscar_traducoes(self, palavra):
        # Buscar as traduções para a palavra
        self.cursor.execute("""
        SELECT t.traducao
        FROM traducoes t
        JOIN palavras p ON p.id = t.palavra_id
        WHERE p.palavra = ?
        """, (palavra,))
        traducoes = self.cursor.fetchall()
        return [tr[0] for tr in traducoes]

    def buscar_frases(self, palavra):
        # Buscar as frases que usam a palavra
        self.cursor.execute("""
        SELECT f.frase
        FROM frases f
        JOIN palavras p ON p.id = f.palavra_id
        WHERE p.palavra = ?
        """, (palavra,))
        frases = self.cursor.fetchall()
        return [f[0] for f in frases]

    def fechar_conexao(self):
        self.conn.close()

# Testando a classe Dicionario
if __name__ == "__main__":
    # Criar uma instância do dicionário
    dicionario = Dicionario()

    # Adicionar palavras
    dicionario.adicionar_palavra("casa")
    dicionario.adicionar_palavra("livro")

    # Adicionar traduções
    dicionario.adicionar_traducao("casa", "house")
    dicionario.adicionar_traducao("livro", "book")

    # Adicionar frases
    dicionario.adicionar_frase("Eu estou na casa.", "casa")
    dicionario.adicionar_frase("Ele está lendo um livro.", "livro")

    # Buscar traduções
    traducoes_casa = dicionario.buscar_traducoes("casa")
    print("Traduções de 'casa':", traducoes_casa)

    # Buscar frases
    frases_casa = dicionario.buscar_frases("casa")
    print("Frases com 'casa':", frases_casa)
    
    
    # Fechar a conexão
    dicionario.fechar_conexao()
