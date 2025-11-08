# fiado_manager/models/cliente_model.py

from database import db
from typing import List, Dict, Optional

class ClienteModel:
    """Gerencia as operações de dados para a tabela 'clientes'."""

    def __init__(self):
        self._db = db

    def get_all(self) -> List[Dict]:
        """Busca todos os clientes, ordenados por nome."""
        query = "SELECT * FROM clientes ORDER BY nome"
        return self._db.fetch_all(query)

    def get_by_id(self, cliente_id: int) -> Optional[Dict]:
        """Busca um cliente pelo ID."""
        query = "SELECT * FROM clientes WHERE id = %s"
        return self._db.fetch_one(query, (cliente_id,))

    def create(self, nome: str, telefone: Optional[str]) -> bool:
        """Cria um novo cliente."""
        query = "INSERT INTO clientes (nome, telefone) VALUES (%s, %s)"
        return self._db.execute_query(query, (nome, telefone))