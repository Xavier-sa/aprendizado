import mysql.connector

# Dados de conexão
host = "localhost.local"  # Pode usar 'localhost' ou '127.0.0.1', dependendo da sua configuração
user = "root"             # Usuário padrão do MySQL no XAMPP
password = ""             # Senha (normalmente está em branco no XAMPP)
database = "filmesdb"     # Nome do banco de dados
port = 3306               # Porta padrão do MySQL

# Conectando ao banco de dados
connection = None  # Inicializa a variável connection fora do bloco try
try:
    # Conecta ao banco de dados
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=port  # Incluindo a porta
    )

    if connection.is_connected():
        print("Conexão bem-sucedida ao banco de dados")

    # Cria um cursor para executar comandos SQL
    cursor = connection.cursor()

    # Executa a consulta para obter todos os filmes
    cursor.execute("SELECT * FROM filme")  # 'filme' é o nome da tabela

    # Obtém todas as linhas de resultado
    result = cursor.fetchall()

    if result:
        # Exibe os nomes das colunas (se houver)
        columns = [desc[0] for desc in cursor.description]
        print(f"Colunas: {columns}")
        
        # Exibe os resultados de cada filme
        for row in result:
            print(row)
    else:
        print("Nenhum filme encontrado no banco de dados.")

except mysql.connector.Error as err:
    print(f"Erro ao conectar ou executar consulta: {err}")

finally:
    if connection and connection.is_connected():  # Verifica se a conexão está ativa
        cursor.close()  # Fecha o cursor
        connection.close()  # Fecha a conexão com o banco
        print("Conexão encerrada.")

# Aqui você quer imprimir o nome do banco de dados
print("Banco de dados: filmesdb")
