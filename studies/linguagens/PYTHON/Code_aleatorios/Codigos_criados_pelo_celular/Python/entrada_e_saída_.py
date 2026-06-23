import sqlite3
from datetime import datetime

# Conectar ao banco de dados SQLite (ou criar se não existir)
def conectar_db():
    conn = sqlite3.connect('controle_veiculos.db')
    return conn

# Criar tabela no banco de dados
def criar_tabela():
    conn = conectar_db()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS entradas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            rg_cpf TEXT,
            horario_entrada TEXT,
            horario_saida TEXT,
            placa TEXT,
            empresa TEXT,
            destino TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Adicionar entrada de veículo
def adicionar_entrada(nome, rg_cpf, placa, empresa, destino):
    conn = conectar_db()
    c = conn.cursor()
    horario_entrada = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute('''
        INSERT INTO entradas (nome, rg_cpf, horario_entrada, placa, empresa, destino)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (nome, rg_cpf, horario_entrada, placa, empresa, destino))
    conn.commit()
    conn.close()

# Adicionar saída de veículo
def adicionar_saida(placa):
    conn = conectar_db()
    c = conn.cursor()
    horario_saida = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    c.execute('''
        UPDATE entradas
        SET horario_saida = ?
        WHERE placa = ? AND horario_saida IS NULL
    ''', (horario_saida, placa))
    conn.commit()
    conn.close()

# Buscar registros
def buscar_registros(campo, valor):
    conn = conectar_db()
    c = conn.cursor()
    query = f'''
        SELECT * FROM entradas
        WHERE {campo} = ?
    '''
    c.execute(query, (valor,))
    resultados = c.fetchall()
    conn.close()
    return resultados

# Listar todos os registros
def listar_registros():
    conn = conectar_db()
    c = conn.cursor()
    c.execute('''
        SELECT * FROM entradas
    ''')
    registros = c.fetchall()
    conn.close()
    return registros

# Função principal para interação com o usuário
def menu():
    criar_tabela()
    while True:
        print("\nControle de Entrada de Veículos")
        print("1. Adicionar Entrada")
        print("2. Adicionar Saída")
        print("3. Buscar Registros")
        print("4. Listar Todos os Registros")
        print("5. Sair")
        escolha = input("Escolha uma opção: ")
        
        if escolha == '1':
            nome = input("Nome: ")
            rg_cpf = input("RG/CPF: ")
            placa = input("Placa do veículo: ")
            empresa = input("Empresa: ")
            destino = input("Destino: ")
            adicionar_entrada(nome, rg_cpf, placa, empresa, destino)
            print("Entrada registrada com sucesso!")
        
        elif escolha == '2':
            placa = input("Placa do veículo: ")
            adicionar_saida(placa)
            print("Saída registrada com sucesso!")
        
        elif escolha == '3':
            campo = input("Campo para busca (nome, rg_cpf, placa, empresa): ")
            valor = input("Valor para busca: ")
            resultados = buscar_registros(campo, valor)
            if resultados:
                for resultado in resultados:
                    print(resultado)
            else:
                print("Nenhum registro encontrado.")
        
        elif escolha == '4':
            registros = listar_registros()
            if registros:
                for registro in registros:
                    print(registro)
            else:
                print("Nenhum registro encontrado.")
        
        elif escolha == '5':
            break
        
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    menu()
