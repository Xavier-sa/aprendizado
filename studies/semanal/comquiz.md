PRATICAR NO BANCO DE DADOS

## exercício prático para trabalhar com **JOIN** e **GROUP BY**, que são conceitos muito úteis em SQL. Aqui vai:

---

### 📝 **Exercício prático de SQL:**

Vamos imaginar que você tem duas tabelas: **`clientes`** e **`pedidos`**.

#### 1. Tabela **clientes**:
| id_cliente | nome     | cidade    |
|------------|----------|-----------|
| 1          | João     | São Paulo|
| 2          | Maria    | Rio de Janeiro|
| 3          | Carlos   | Belo Horizonte|
| 4          | Ana      | São Paulo|

#### 2. Tabela **pedidos**:
| id_pedido | id_cliente | data       | valor |
|-----------|------------|------------|-------|
| 1         | 1          | 2025-04-01 | 120.50|
| 2         | 2          | 2025-04-03 | 85.00 |
| 3         | 1          | 2025-04-10 | 220.00|
| 4         | 3          | 2025-04-04 | 150.00|
| 5         | 4          | 2025-04-02 | 50.00 |
| 6         | 2          | 2025-04-05 | 200.00|

### **Objetivos do exercício:**

1. **Exercício com JOIN**:
   - Crie uma consulta que mostre todos os **nomes dos clientes** junto com os **valores dos pedidos**, fazendo a junção entre as tabelas `clientes` e `pedidos` pela chave `id_cliente`.
   
2. **Exercício com GROUP BY**:
   - Crie uma consulta que mostre a **soma total dos pedidos** por cliente e classifique os resultados pela **soma total em ordem decrescente**.
   
---

### **Dicas**:

1. **JOIN**: A ideia aqui é combinar dados de duas tabelas relacionadas por uma chave comum.
   - Exemplo de consulta `JOIN`:
     ```sql
     SELECT clientes.nome, pedidos.valor
     FROM clientes
     JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente;
     ```
   
2. **GROUP BY**: Serve para agrupar os dados por uma ou mais colunas e executar funções agregadas (como `SUM()`, `AVG()`, etc.) sobre elas.
   - Exemplo de consulta `GROUP BY`:
     ```sql
     SELECT clientes.nome, SUM(pedidos.valor) AS total_pedidos
     FROM clientes
     JOIN pedidos ON clientes.id_cliente = pedidos.id_cliente
     GROUP BY clientes.nome
     ORDER BY total_pedidos DESC;
     ```

---

