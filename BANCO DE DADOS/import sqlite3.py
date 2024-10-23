import sqlite3

# Conectar ao banco de dados (ou criar se não existir)
conn = sqlite3.connect('guerreiros_z.db')

# Criar um cursor
cursor = conn.cursor()

# Criar tabela
cursor.execute('''
CREATE TABLE IF NOT EXISTS guerreiros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    poder INTEGER,
    especie TEXT,
    transformacoes TEXT
)
''')

# Salvar (commit) as mudanças
conn.commit()

# Fechar a conexão
conn.close()

def inserir_guerreiro(nome, poder, especie, transformacoes):
    conn = sqlite3.connect('guerreiros_z.db')
    cursor = conn.cursor()
    
    cursor.execute('''
    INSERT INTO guerreiros (nome, poder, especie, transformacoes)
    VALUES (?, ?, ?, ?)
    ''', (nome, poder, especie, transformacoes))
    
    conn.commit()
    conn.close()

# Exemplo de inserção
inserir_guerreiro('Goku', 9000, 'Saiyajin', 'Super Saiyajin')
inserir_guerreiro('Vegeta', 8500, 'Saiyajin', 'Super Saiyajin')

def listar_guerreiros():
    conn = sqlite3.connect('guerreiros_z.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM guerreiros')
    guerreiros = cursor.fetchall()
    
    for guerreiro in guerreiros:
        print(guerreiro)
    
    conn.close()

# Exibir todos os guerreiros
listar_guerreiros()
