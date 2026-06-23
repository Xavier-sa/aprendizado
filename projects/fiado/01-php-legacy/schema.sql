-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS sistema_fiado;
USE sistema_fiado;

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de compras
CREATE TABLE IF NOT EXISTS compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_compra DATE NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    data_pagamento DATE NULL,
    observacao TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Inserir alguns dados de exemplo
INSERT INTO clientes (nome, telefone) VALUES 
('João Silva', '(67) 99999-1111'),
('Maria Santos', '(67) 99999-2222'),
('Pedro Oliveira', '(67) 99999-3333');

INSERT INTO compras (cliente_id, produto, valor, data_compra, pago) VALUES
(1, 'Arroz 5kg', 25.90, '2025-10-01', FALSE),
(1, 'Feijão 1kg', 8.50, '2025-10-02', FALSE),
(2, 'Óleo de soja', 6.90, '2025-10-03', TRUE),
(2, 'Açúcar 1kg', 4.50, '2025-10-04', FALSE),
(3, 'Café 500g', 12.90, '2025-10-01', FALSE);