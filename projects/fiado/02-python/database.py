# fiado_manager/database.py

import mysql.connector
from mysql.connector import Error
from config import Config
from typing import List, Dict, Optional, Any

class DBConnection:
    """Gerencia a conexão única e as operações básicas com o banco de dados."""

    def __init__(self):
        """Inicializa a conexão com as credenciais do config."""
        self.connection = None
        try:
            self.connection = mysql.connector.connect(
                host=Config.MYSQL_HOST,
                database=Config.MYSQL_DATABASE,
                user=Config.MYSQL_USER,
                password=Config.MYSQL_PASSWORD
            )
            if self.connection.is_connected():
                print("Conexão MySQL bem-sucedida.")
        except Error as e:
            print(f"Erro ao conectar ao MySQL: {e}")
            
    def execute_query(self, query: str, params: Optional[tuple] = None) -> bool:
        """Executa uma consulta de escrita (INSERT, UPDATE, DELETE)."""
        cursor = None
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, params or ())
            self.connection.commit()
            return True
        except Error as e:
            print(f"Erro ao executar consulta: {e}")
            if self.connection:
                self.connection.rollback()
            return False
        finally:
            if cursor:
                cursor.close()

    def fetch_all(self, query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
        """Executa uma consulta de leitura e retorna todos os resultados."""
        cursor = None
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            return cursor.fetchall()
        except Error as e:
            print(f"Erro ao buscar dados: {e}")
            return []
        finally:
            if cursor:
                cursor.close()

    def fetch_one(self, query: str, params: Optional[tuple] = None) -> Optional[Dict[str, Any]]:
        """Executa uma consulta de leitura e retorna o primeiro resultado."""
        result = self.fetch_all(query, params)
        return result[0] if result else None

    def __del__(self):
        """Fecha a conexão ao destruir a instância, se estiver aberta."""
        if self.connection and self.connection.is_connected():
            self.connection.close()

# Exporta a instância para ser usada pelos Models
db = DBConnection()