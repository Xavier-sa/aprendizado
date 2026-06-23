CREATE DATABASE  webapp;
-- drop database webapp;
USE webapp;

CREATE TABLE imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho VARCHAR(255) NOT NULL,
    tipo_mime VARCHAR(50) NOT NULL,
    tamanho INT NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabela de relacionamento (imagem_usuario)
CREATE TABLE imagem_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagem_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (imagem_id) REFERENCES imagens(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
