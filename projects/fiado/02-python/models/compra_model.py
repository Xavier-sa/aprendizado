# fiado_manager/models/compra_model.py

from database import db
from typing import List, Dict, Optional

class CompraModel:
    """Gerencia as operações de dados para a tabela 'compras'."""

    def __init__(self):
        self._db = db

    def get_aggregated_purchases(self, status_filter: Optional[int] = None) -> List[Dict]:
        """
        Busca compras agrupadas por cliente, calculando totais e concatenando detalhes.
        Esta é a consulta principal para a aba de relatórios.
        """
        sql = """
            SELECT 
                cl.id as cliente_id,
                cl.nome as cliente_nome,
                cl.telefone,
                COUNT(c.id) as total_itens,
                SUM(c.valor) as valor_total,
                SUM(CASE WHEN c.pago = 0 THEN c.valor ELSE 0 END) as valor_pendente,
                SUM(CASE WHEN c.pago = 1 THEN c.valor ELSE 0 END) as valor_pago,
                GROUP_CONCAT(
                    CONCAT(
                        c.id, '|', c.produto, '|', c.valor, '|', 
                        DATE_FORMAT(c.data_compra, '%d/%m/%Y'), '|', c.pago, '|', c.data_compra
                    )
                    ORDER BY c.data_compra DESC
                    SEPARATOR '@@'
                ) as compras_detalhes
            FROM clientes cl
            LEFT JOIN compras c ON cl.id = c.cliente_id
        """
        params = []
        
        if status_filter is not None and status_filter in [0, 1]:
            sql += " WHERE c.pago = %s"
            params.append(status_filter)
        
        sql += """ 
            GROUP BY cl.id, cl.nome, cl.telefone
            HAVING COUNT(c.id) > 0
            ORDER BY cl.nome
        """
        return self._db.fetch_all(sql, tuple(params))

    def get_system_totals(self) -> Optional[Dict]:
        """Calcula os totais gerais (pendente, pago, clientes, etc.)."""
        sql = """
            SELECT 
                COUNT(DISTINCT cliente_id) as total_clientes,
                COUNT(id) as total_compras,
                SUM(valor) as total_geral,
                SUM(CASE WHEN pago = 0 THEN valor ELSE 0 END) as total_pendente,
                SUM(CASE WHEN pago = 1 THEN valor ELSE 0 END) as total_pago
            FROM compras
        """
        return self._db.fetch_one(sql)

    def get_purchase_for_edit(self, compra_id: int) -> Optional[Dict]:
        """Busca uma compra específica para edição."""
        query = "SELECT * FROM compras WHERE id = %s"
        return self._db.fetch_one(query, (compra_id,))

    def create_purchase(self, cliente_id: int, produto: str, valor: float, data_compra: str, pago: bool) -> bool:
        """Adiciona uma nova compra."""
        query = """
            INSERT INTO compras (cliente_id, produto, valor, data_compra, pago, data_pagamento) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        data_pagamento = 'CURDATE()' if pago else None
        
        # Ajusta a data de pagamento se for pago
        if pago:
            query = query.replace(', %s)', ', CURDATE())')
            params = (cliente_id, produto, valor, data_compra, pago)
        else:
            params = (cliente_id, produto, valor, data_compra, pago, data_pagamento)

        return self._db.execute_query(query, params)

    def update_purchase(self, compra_id: int, produto: str, valor: float, data_compra: str, pago: bool) -> bool:
        """Atualiza os dados de uma compra existente, incluindo o status de pagamento."""
        
        # Implementação da melhoria: atualizar data_pagamento se status for PAGO/PENDENTE
        if pago:
            query = "UPDATE compras SET produto = %s, valor = %s, data_compra = %s, pago = %s, data_pagamento = CURDATE() WHERE id = %s"
        else:
            query = "UPDATE compras SET produto = %s, valor = %s, data_compra = %s, pago = %s, data_pagamento = NULL WHERE id = %s"
            
        return self._db.execute_query(query, (produto, valor, data_compra, pago, compra_id))

    def set_payment_status(self, compra_id: int, pago: bool) -> bool:
        """Marca uma compra como paga ou pendente, atualizando a data de pagamento."""
        if pago:
            query = "UPDATE compras SET pago = 1, data_pagamento = CURDATE() WHERE id = %s"
        else:
            query = "UPDATE compras SET pago = 0, data_pagamento = NULL WHERE id = %s"
        return self._db.execute_query(query, (compra_id,))
        
    def delete_purchase(self, compra_id: int) -> bool:
        """Deleta uma compra pelo ID."""
        query = "DELETE FROM compras WHERE id = %s"
        return self._db.execute_query(query, (compra_id,))