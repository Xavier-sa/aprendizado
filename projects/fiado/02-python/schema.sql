-- Verificar se o banco existe
SHOW DATABASES;

-- Criar o banco se não existir
CREATE DATABASE IF NOT EXISTS fiado_db;

-- Usar o banco
USE fiado_db;

-- Criar tabelas
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    data_cadastro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_compra DATE NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);