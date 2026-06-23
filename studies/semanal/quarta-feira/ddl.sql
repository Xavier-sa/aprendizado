-- Criação da tabela 'Funcionarios'
CREATE TABLE Funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada funcionário
    nome VARCHAR(100) NOT NULL,        -- Nome do funcionário
    cargo VARCHAR(50),                 -- Cargo do funcionário
    salario DECIMAL(10, 2)             -- Salário do funcionário
);



