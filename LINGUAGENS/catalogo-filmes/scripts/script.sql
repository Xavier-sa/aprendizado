-- cria o banco de dados
create database filmesdb;

-- instrução perigosa, ela exclui TUDO!!!
-- drop database filmesdb;

-- seleciona o banco para uso
use filmesdb;

-- cria a tabela de filme
create table filme (
	id int auto_increment primary key,
	titulo varchar(255) not null,
	ano int not null, 
	-- tipo de dado para texto gigantes.
	-- nem todo DB vai ter esse tipo
	descricao text
);

-- cria a tabela de usuario
create table usuario (
	id int auto_increment primary key,
	nome varchar(255) not null,
	email varchar(255) not null,
);


-- retorna tudo
select * from filme;

-- retorna 1 por id
select * from filme where id = 12;

-- retorna o nome e ano de todos
select titulo, ano from filme;

-- conta a quantidade de registros
select count(*) from filme;

-- atualizar o registro
update filme set titulo = 'TESTE' where id = 2;
update filme set titulo = 'TESTE' where titulo = 'Um Sonho de Liberdade';

delete from filme where id = 2;

insert into filme (titulo, ano, descricao) 
	values ('Um Sonho', 1994, 'DESCRICAO');
