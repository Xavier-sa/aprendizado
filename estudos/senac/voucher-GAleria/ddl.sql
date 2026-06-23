-- Criação do banco de dados
CREATE DATABASE galeria_voucher;
USE galeria_voucher;

-- Tabela de Unidades/Polos
CREATE TABLE unidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(50) NOT NULL
);

-- Inserção dos polos pré-cadastrados
INSERT INTO unidade (nome, cidade) VALUES 
('Senac Campo Grande', 'Campo Grande'),
('Senac Corumbá', 'Corumbá'),
('Senac Dourados', 'Dourados'),
('Senac Ponta Porã', 'Ponta Porã'),
('Senac Três Lagoas', 'Três Lagoas');

-- Tabela de Administradores
CREATE TABLE administrador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Docentes
CREATE TABLE docente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    administrador_id INT,
    FOREIGN KEY (administrador_id) REFERENCES administrador(id)
);

-- Tabela de Turmas
CREATE TABLE turma (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    ano VARCHAR(10) NOT NULL,
    descricao TEXT,
    unidade_id INT NOT NULL,
    FOREIGN KEY (unidade_id) REFERENCES unidade(id)
);

-- Tabela de relação Docente-Turma (N:M)
CREATE TABLE docente_turma (
    docente_id INT,
    turma_id INT,
    PRIMARY KEY (docente_id, turma_id),
    FOREIGN KEY (docente_id) REFERENCES docente(id),
    FOREIGN KEY (turma_id) REFERENCES turma(id)
);

-- Tabela de Alunos
CREATE TABLE aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    foto VARCHAR(255),
    turma_id INT NOT NULL,
    FOREIGN KEY (turma_id) REFERENCES turma(id)
);

-- Tabela de Projetos
CREATE TABLE projeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    link VARCHAR(255),
    turma_id INT NOT NULL,
    FOREIGN KEY (turma_id) REFERENCES turma(id)
);

-- Tabela de Estatísticas (contadores dinâmicos)
CREATE TABLE estatistica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total_alunos INT DEFAULT 0,
    total_projetos INT DEFAULT 0,
    total_turmas INT DEFAULT 0,
    total_horas_curso INT DEFAULT 0,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    administrador_id INT,
    FOREIGN KEY (administrador_id) REFERENCES administrador(id)
);

-- Tabela de Logs de Acesso
CREATE TABLE log_acesso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_usuario ENUM('Visitante', 'Aluno', 'Docente', 'Administrador'),
    acao VARCHAR(100),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45)
);

-- Stored Procedure para atualizar estatísticas
DELIMITER //
CREATE PROCEDURE atualizar_estatisticas()
BEGIN
    DECLARE alunos INT;
    DECLARE projetos INT;
    DECLARE turmas INT;
    
    SELECT COUNT(*) INTO alunos FROM aluno;
    SELECT COUNT(*) INTO projetos FROM projeto;
    SELECT COUNT(*) INTO turmas FROM turma;
    
    UPDATE estatistica 
    SET total_alunos = alunos,
        total_projetos = projetos,
        total_turmas = turmas,
        data_atualizacao = NOW()
    WHERE id = 1;
END //
DELIMITER ;

-- Trigger para atualizar estatísticas quando novo aluno é inserido
DELIMITER //
CREATE TRIGGER after_aluno_insert
AFTER INSERT ON aluno
FOR EACH ROW
BEGIN
    CALL atualizar_estatisticas();
END //
DELIMITER ;

-- Trigger para atualizar estatísticas quando novo projeto é inserido
DELIMITER //
CREATE TRIGGER after_projeto_insert
AFTER INSERT ON projeto
FOR EACH ROW
BEGIN
    CALL atualizar_estatisticas();
END //
DELIMITER ;



