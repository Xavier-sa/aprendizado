-- INSERT

-- Inserir dados na tabela Funcionarios
INSERT INTO Funcionarios (nome, cargo, salario) 
VALUES 
    ('Carlos Silva', 'Analista de Sistemas', 3000.00),
    ('Fernanda Oliveira', 'Desenvolvedora', 4000.00),
    ('João Pereira', 'DBA', 4500.00);


-- SELECT
-- Selecionar todos os dados da tabela Funcionarios
SELECT * FROM Funcionarios;

-- Selecionar apenas o nome e o cargo dos funcionários
SELECT nome, cargo FROM Funcionarios;


-- UPDATE


-- Atualizar o salário de Fernanda Oliveira
UPDATE Funcionarios 
SET salario = 4500.00
WHERE nome = 'Fernanda Oliveira';

--*DELETE


-- Deletar o funcionário João Pereira
DELETE FROM Funcionarios
WHERE nome = 'João Pereira';
