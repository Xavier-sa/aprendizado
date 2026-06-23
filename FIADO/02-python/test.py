from database import Database

def test_connection():
    db = Database()
    connection = db.get_connection()
    
    if connection:
        print("✅ Conexão estabelecida com sucesso!")
        
        # Testar consulta
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print("📊 Tabelas no banco:", tables)
        
        cursor.close()
    else:
        print("❌ Falha na conexão")

if __name__ == "__main__":
    test_connection()