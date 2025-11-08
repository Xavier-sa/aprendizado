Vamos revisar cada bloco de SQL para identificar possíveis erros ou melhorias.

Exercício 2 (Cadastro de Veículos)

SQL

CREATE DATABASE IF NOT EXISTS cadastro_veiculos;
USE cadastro_veiculos;

CREATE TABLE proprietario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE marca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE modelo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca_id INT NOT NULL,
    modelo_id INT NOT NULL,
    categoria_id INT NOT NULL,
    placa VARCHAR(10) UNIQUE NOT NULL,
    ano_fabricacao INT NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES marca(id),
    FOREIGN KEY (modelo_id) REFERENCES modelo(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);
Observações: Parece correto. As tabelas estão bem definidas e as chaves estrangeiras referenciam as tabelas corretas.
Exercício 3 (Biblioteca)

SQL

CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso VARCHAR(50),
    tipo ENUM('professor', 'aluno', 'funcionario') NOT NULL
);

CREATE TABLE obra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE idioma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE editora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE autor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE exemplar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    obra_id INT NOT NULL,
    idioma_id INT NOT NULL,
    editora_id INT NOT NULL,
    FOREIGN KEY (obra_id) REFERENCES obra(id),
    FOREIGN KEY (idioma_id) REFERENCES idioma(id),
    FOREIGN KEY (editora_id) REFERENCES editora(id)
);

CREATE TABLE emprestimo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    exemplar_id INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (exemplar_id) REFERENCES exemplar(id)
);

CREATE TABLE obra_autor (
    obra_id INT,
    autor_id INT,
    PRIMARY KEY (obra_id, autor_id),
    FOREIGN KEY (obra_id) REFERENCES obra(id),
    FOREIGN KEY (autor_id) REFERENCES autor(id)
);
Observações: Parece correto. A tabela de relacionamento obra_autor para lidar com o relacionamento muitos-para-muitos entre obras e autores está bem definida.
Exercício 4 (Controle de Estoque)

SQL

CREATE DATABASE IF NOT EXISTS controle_estoque;
USE controle_estoque;

CREATE TABLE empresa_comercio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL
);

CREATE TABLE almoxarifado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('disponivel', 'indisponivel') NOT NULL
);

CREATE TABLE fornecedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE nota_fiscal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entrada BOOLEAN NOT NULL,
    saida BOOLEAN NOT NULL,
    cliente_id INT,
    produto_id INT NOT NULL,
    fornecedor_id INT,
    data_emissao DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);

CREATE TABLE produto_almoxarifado (
    produto_id INT,
    almoxarifado_id INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (produto_id, almoxarifado_id),
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (almoxarifado_id) REFERENCES almoxarifado(id)
);
Possível Melhoria: Na tabela nota_fiscal, as colunas entrada e saida são booleanas. Em geral, é mais comum ter uma única coluna para o tipo da nota fiscal (por exemplo, um ENUM com valores 'entrada' e 'saida') para simplificar as consultas e garantir que uma nota seja apenas de um tipo. No entanto, a forma atual não está incorreta, apenas pode ser menos intuitiva.
Exercício 5 (Flores)

SQL

CREATE DATABASE IF NOT EXISTS floricultura;
USE floricultura;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(100)
);

CREATE TABLE floricultura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL
);

CREATE TABLE flor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    id_floricultura INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (id_floricultura) REFERENCES floricultura(id)
);

CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_floricultura INT NOT NULL,
    quantidade_flor INT NOT NULL,
    data_pedido DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_floricultura) REFERENCES floricultura(id)
);
Possível Melhoria: O nome da coluna tipo na tabela flor poderia ser mais específico, como nome_flor ou especie. Além disso, a relação entre pedido e flor parece ser direta com a quantidade de flores no pedido. Se um pedido puder conter diferentes tipos de flores, seria mais adequado ter uma tabela de relacionamento (pedido_flor) com as colunas pedido_id, flor_id e quantidade.
Exercício 6 (Eleitoral)

SQL

CREATE DATABASE IF NOT EXISTS sistema_eleitoral;
USE sistema_eleitoral;

CREATE TABLE partido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sigla VARCHAR(20) NOT NULL
);

CREATE TABLE candidato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_partido INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    FOREIGN KEY (id_partido) REFERENCES partido(id)
);

CREATE TABLE eleitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    titulo VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE localidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    secao VARCHAR(50),
    zona VARCHAR(50),
    eleitores_id INT,
    FOREIGN KEY (eleitores_id) REFERENCES eleitor(id)
);

CREATE TABLE localidade_eleitores_candidato (
    localidade_id INT,
    eleitores_id INT,
    candidato_id INT,
    PRIMARY KEY (localidade_id, eleitores_id, candidato_id),
    FOREIGN KEY (localidade_id) REFERENCES localidade(id),
    FOREIGN KEY (eleitores_id) REFERENCES eleitor(id),
    FOREIGN KEY (candidato_id) REFERENCES candidato(id)
);
Erro Grave: Na tabela localidade, a coluna eleitores_id como chave estrangeira para a tabela eleitor sugere um relacionamento um-para-muitos de localidade para eleitores, o que não faz sentido. Uma localidade pode ter muitos eleitores, e um eleitor pertence a uma localidade (seção/zona). O relacionamento correto seria ter localidade_id na tabela eleitor como chave estrangeira.
Erro Grave: A tabela localidade_eleitores_candidato parece tentar rastrear em qual localidade um eleitor votou em um candidato. No entanto, o nome sugere uma relação entre localidades, eleitores e candidatos, o que não é a estrutura típica para rastrear votos. Geralmente, haveria uma tabela voto com eleitor_id, candidato_id e talvez localidade_id (ou secao_id). A chave primária dessa tabela também precisaria ser reconsiderada.
Exercício 7 (Concurso Público)

SQL

CREATE DATABASE IF NOT EXISTS concurso_publico;
USE concurso_publico;

CREATE TABLE departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE cargo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE cargo_departamento (
    cargo_id INT,
    departamento_id INT,
    PRIMARY KEY (cargo_id, departamento_id),
    FOREIGN KEY (cargo_id) REFERENCES cargo(id),
    FOREIGN KEY (departamento_id) REFERENCES departamento(id)
);

CREATE TABLE concurso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edital VARCHAR(100) NOT NULL
);

CREATE TABLE cargo_concurso (
    cargo_id INT,
    concurso_id INT,
    PRIMARY KEY (cargo_id, concurso_id),
    FOREIGN KEY (cargo_id) REFERENCES cargo(id),
    FOREIGN KEY (concurso_id) REFERENCES concurso(id)
);

CREATE TABLE candidato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidato_id INT NOT NULL,
    cargo_id INT NOT NULL,
    concurso_id INT NOT NULL,
    data_inscricao DATE NOT NULL,
    FOREIGN KEY (candidato_id) REFERENCES candidato(id),
    FOREIGN KEY (cargo_id) REFERENCES cargo(id),
    FOREIGN KEY (concurso_id) REFERENCES concurso(id)
);
Observações: Parece correto. As tabelas de relacionamento cargo_departamento e cargo_concurso para lidar com relacionamentos muitos-para-muitos estão bem definidas.
Exercício 8 (Contratos)

SQL

CREATE DATABASE IF NOT EXISTS gestao_contratos;
USE gestao_contratos;

CREATE TABLE fornecedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL
);

CREATE TABLE contrato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50)
);

CREATE TABLE contrato_fornecedor (
    contrato_id INT,
    fornecedor_id INT,
    PRIMARY KEY (contrato_id, fornecedor_id),
    FOREIGN KEY (contrato_id) REFERENCES contrato(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);
Observações: Parece correto. A tabela de relacionamento contrato_fornecedor para lidar com o relacionamento muitos-para-muitos entre contratos e fornecedores está bem definida.
Exercício 9 (Controle de Equipamentos)

SQL

CREATE DATABASE IF NOT EXISTS controle_equipamentos;
USE controle_equipamentos;

CREATE TABLE departamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50)
);

CREATE TABLE tipo_equipamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50)
);

CREATE TABLE empregado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    departamento_id INT,
    FOREIGN KEY (departamento_id) REFERENCES departamento(id)
);
Observações: Parece correto. As tabelas básicas estão definidas. Para um sistema de controle de equipamentos mais completo, você provavelmente precisaria de uma tabela para os equipamentos em si, relacionando-os com departamentos e talvez tipos de equipamentos.
Exercício 10 (Hospedagem)

SQL

CREATE DATABASE IF NOT EXISTS hospedagem_hotel;
USE hospedagem_hotel;

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);
Observações: Apenas a tabela cliente foi criada. Para um sistema de hospedagem completo, você precisaria de tabelas para quartos, reservas, etc.
Resumo dos Erros e Possíveis Melhorias:

Exercício 4: Possível melhoria na modelagem da tabela nota_fiscal para a coluna de tipo (entrada/saída).
Exercício 5: Possível melhoria no nome da coluna tipo na tabela flor e na modelagem do relacionamento entre pedido e flor para permitir múltiplos tipos de flores por pedido.
Exercício 6: Erro Grave na tabela localidade com a chave estrangeira para eleitor. Erro Grave na estrutura da tabela localidade_eleitores_candidato para rastreamento de votos.
Exercícios 2, 3, 7, 8, 9, 10: Parecem corretos em sua estrutura básica, embora alguns (9 e 10) estejam incompletos para o escopo total do sistema proposto.
É importante corrigir os erros graves no Exercício 6 para garantir a integridade e a lógica do banco de dados para o sistema eleitoral.


DROP DATABASE IF EXISTS cadastro_veiculos;
DROP DATABASE IF EXISTS biblioteca;
DROP DATABASE IF EXISTS controle_estoque;
DROP DATABASE IF EXISTS floricultura;
DROP DATABASE IF EXISTS sistema_eleitoral;
DROP DATABASE IF EXISTS concurso_publico;
DROP DATABASE IF EXISTS gestao_contratos;
DROP DATABASE IF EXISTS controle_equipamentos;
DROP DATABASE IF EXISTS hospedagem_hotel;


