CREATE DATABASE webapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE webapp_db;

CREATE TABLE imagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,
    caminho VARCHAR(255) NOT NULL,
    tipo_mime VARCHAR(50) NOT NULL,
    tamanho INT NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
