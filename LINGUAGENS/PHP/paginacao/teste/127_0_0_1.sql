-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16/08/2025 às 02:57
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `galeria_voucher`
--
CREATE DATABASE IF NOT EXISTS `galeria_voucher` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `galeria_voucher`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno_turma`
--

CREATE TABLE `aluno_turma` (
  `aluno_turma_id` int(11) NOT NULL,
  `pessoa_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `data_matricula` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aluno_turma`
--

INSERT INTO `aluno_turma` (`aluno_turma_id`, `pessoa_id`, `turma_id`, `data_matricula`) VALUES
(1, 6, 1, '2024-01-20'),
(2, 7, 1, '2024-01-20'),
(3, 8, 1, '2024-01-21'),
(4, 9, 1, '2024-01-21'),
(5, 10, 2, '2024-01-22'),
(6, 11, 2, '2024-01-22'),
(7, 12, 2, '2024-01-23'),
(8, 13, 2, '2024-01-23'),
(9, 14, 3, '2024-02-15'),
(10, 15, 3, '2024-02-15'),
(11, 16, 3, '2024-02-16'),
(12, 17, 3, '2024-02-16'),
(13, 18, 4, '2024-03-10'),
(14, 19, 4, '2024-03-10'),
(15, 20, 4, '2024-03-11'),
(16, 21, 4, '2024-03-11');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidade`
--

CREATE TABLE `cidade` (
  `cidade_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cidade`
--

INSERT INTO `cidade` (`cidade_id`, `nome`) VALUES
(1, 'Campo Grande'),
(2, 'Dourados'),
(3, 'Corumbá'),
(4, 'Três Lagoas'),
(5, 'Ponta Porã'),
(6, 'Naviraí'),
(7, 'Aquidauana'),
(8, 'Coxim');

-- --------------------------------------------------------

--
-- Estrutura para tabela `docente_turma`
--

CREATE TABLE `docente_turma` (
  `docente_turma_id` int(11) NOT NULL,
  `pessoa_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  `data_associacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `docente_turma`
--

INSERT INTO `docente_turma` (`docente_turma_id`, `pessoa_id`, `turma_id`, `data_associacao`) VALUES
(1, 2, 1, '2024-01-15'),
(2, 3, 2, '2024-01-15'),
(3, 4, 3, '2024-02-10'),
(4, 5, 4, '2024-03-05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagem`
--

CREATE TABLE `imagem` (
  `imagem_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `text` text DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `data_upload` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imagem`
--

INSERT INTO `imagem` (`imagem_id`, `url`, `text`, `descricao`, `data_upload`) VALUES
(1, 'Upload/turma.jpg', 'Imagem 1', 'Descrição da imagem 1', '2025-08-13 20:16:37'),
(2, 'Upload/turma.jpg', 'Imagem 2', 'Descrição da imagem 2', '2025-08-13 20:16:37'),
(3, 'Upload/turma.jpg', 'Imagem 3', 'Descrição da imagem 3', '2025-08-13 20:16:37'),
(4, 'Upload/turma.jpg', 'Imagem 4', 'Descrição da imagem 4', '2025-08-13 20:16:37'),
(5, 'Upload/turma.jpg', 'Imagem 5', 'Descrição da imagem 5', '2025-08-13 20:16:37');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagem_projeto`
--

CREATE TABLE `imagem_projeto` (
  `imagem_projeto_id` int(11) NOT NULL,
  `imagem_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `projeto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `pessoa_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `imagem_id` int(11) DEFAULT NULL,
  `perfil` enum('aluno','professor','adm') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoa`
--

INSERT INTO `pessoa` (`pessoa_id`, `email`, `nome`, `linkedin`, `github`, `imagem_id`, `perfil`) VALUES
(1, 'admin@adm.com', 'Administrador Sistema', NULL, NULL, NULL, 'adm'),
(2, 'joao.silva@senac.com', 'João Silva', 'linkedin.com/in/joaosilva', 'github.com/joaosilva', NULL, 'professor'),
(3, 'maria.souza@senac.com', 'Maria Souza', 'linkedin.com/in/mariasouza', 'github.com/mariasouza', NULL, 'professor'),
(4, 'carlos.santos@senac.com', 'Carlos Santos', 'linkedin.com/in/carlossantos', 'github.com/carlossantos', NULL, 'professor'),
(5, 'ana.costa@senac.com', 'Ana Costa', 'linkedin.com/in/anacosta', 'github.com/anacosta', NULL, 'professor'),
(6, 'lucas.oliveira@aluno.senac.com', 'Lucas Oliveira', 'linkedin.com/in/lucasoliveira', 'github.com/lucasoliveira', NULL, 'aluno'),
(7, 'julia.santos@aluno.senac.com', 'Julia Santos', 'linkedin.com/in/juliasantos', 'github.com/juliasantos', NULL, 'aluno'),
(8, 'rafael.costa@aluno.senac.com', 'Rafael Costa', 'linkedin.com/in/rafaelcosta', 'github.com/rafaelcosta', NULL, 'aluno'),
(9, 'amanda.pereira@aluno.senac.com', 'Amanda Pereira', 'linkedin.com/in/amandapereira', 'github.com/amandapereira', NULL, 'aluno'),
(10, 'gabriel.rodrigues@aluno.senac.com', 'Gabriel Rodrigues', 'linkedin.com/in/gabrielrodrigues', 'github.com/gabrielrodrigues', NULL, 'aluno'),
(11, 'carolina.lima@aluno.senac.com', 'Carolina Lima', 'linkedin.com/in/carolinalima', 'github.com/carolinalima', NULL, 'aluno'),
(12, 'thiago.martins@aluno.senac.com', 'Thiago Martins', 'linkedin.com/in/thiagomartins', 'github.com/thiagomartins', NULL, 'aluno'),
(13, 'beatriz.fernandes@aluno.senac.com', 'Beatriz Fernandes', 'linkedin.com/in/beatrizfernandes', 'github.com/beatrizfernandes', NULL, 'aluno'),
(14, 'marcos.almeida@aluno.senac.com', 'Marcos Almeida', 'linkedin.com/in/marcosalmeida', 'github.com/marcosalmeida', NULL, 'aluno'),
(15, 'laura.gomes@aluno.senac.com', 'Laura Gomes', 'linkedin.com/in/lauragomes', 'github.com/lauragomes', NULL, 'aluno'),
(16, 'pedro.silva@aluno.senac.com', 'Pedro Silva', 'linkedin.com/in/pedrosilva', 'github.com/pedrosilva', NULL, 'aluno'),
(17, 'isabela.carvalho@aluno.senac.com', 'Isabela Carvalho', 'linkedin.com/in/isabelacarvalho', 'github.com/isabelacarvalho', NULL, 'aluno'),
(18, 'daniel.oliveira@aluno.senac.com', 'Daniel Oliveira', 'linkedin.com/in/danieloliveira', 'github.com/danieloliveira', NULL, 'aluno'),
(19, 'sofia.rodrigues@aluno.senac.com', 'Sofia Rodrigues', 'linkedin.com/in/sofiarodrigues', 'github.com/sofiarodrigues', NULL, 'aluno'),
(20, 'matheus.costa@aluno.senac.com', 'Matheus Costa', 'linkedin.com/in/matheuscosta', 'github.com/matheuscosta', NULL, 'aluno'),
(21, 'valentina.lima@aluno.senac.com', 'Valentina Lima', 'linkedin.com/in/valentinalima', 'github.com/valentinalima', NULL, 'aluno');

-- --------------------------------------------------------

--
-- Estrutura para tabela `polo`
--

CREATE TABLE `polo` (
  `polo_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cidade_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `polo`
--

INSERT INTO `polo` (`polo_id`, `nome`, `cidade_id`) VALUES
(1, 'SENAC Centro', 1),
(2, 'SENAC Universitário', 1),
(3, 'SENAC Dourados', 2),
(4, 'SENAC Corumbá', 3),
(5, 'SENAC Três Lagoas', 4),
(6, 'SENAC Ponta Porã', 5),
(7, 'SENAC Naviraí', 6),
(8, 'SENAC Aquidauana', 7),
(9, 'SENAC Coxim', 8);

-- --------------------------------------------------------

--
-- Estrutura para tabela `projeto`
--

CREATE TABLE `projeto` (
  `projeto_id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `turma_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `projeto`
--

INSERT INTO `projeto` (`projeto_id`, `nome`, `descricao`, `link`, `turma_id`) VALUES
(1, 'Sistema de Gestão Escolar', 'Sistema completo para gerenciamento de escolas, incluindo matrículas, notas e frequência', 'https://github.com/turma144/gestao-escolar', 1),
(2, 'App de Delivery', 'Aplicativo mobile para delivery de alimentos com geolocalização e pagamento online', 'https://github.com/turma144/delivery-app', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `turma`
--

CREATE TABLE `turma` (
  `turma_id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `imagem_id` int(11) DEFAULT NULL,
  `polo_id` int(11) NOT NULL,
  `exibir_pagina_dev` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `turma`
--

INSERT INTO `turma` (`turma_id`, `nome`, `descricao`, `data_inicio`, `data_fim`, `imagem_id`, `polo_id`, `exibir_pagina_dev`) VALUES
(1, 'Turma 144', 'Desenvolvimento de Sistemas - Manhã', '2024-02-01', '2024-12-15', 1, 1, NULL),
(2, 'Turma 145', 'Desenvolvimento Web - Tarde', '2024-02-01', '2024-12-15', 2, 3, NULL),
(3, 'Turma 146', 'Redes de Computadores - Noite', '2024-03-01', '2024-11-30', 3, 4, NULL),
(4, 'Turma 147', 'Administração de Sistemas - Manhã', '2024-04-01', '2024-10-31', 4, 5, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `usuario_id` int(11) NOT NULL,
  `pessoa_id` int(11) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`usuario_id`, `pessoa_id`, `senha`) VALUES
(1, 1, '$2y$10$8tL6uFsbg4xzhYaoDU9JVeYDvJZtMXdd3jEsJppMSHis.atBmHutC'),
(2, 2, '$2y$10$8tL6uFsbg4xzhYaoDU9JVeYDvJZtMXdd3jEsJppMSHis.atBmHutC'),
(3, 3, '$2y$10$8tL6uFsbg4xzhYaoDU9JVeYDvJZtMXdd3jEsJppMSHis.atBmHutC'),
(4, 4, '$2y$10$8tL6uFsbg4xzhYaoDU9JVeYDvJZtMXdd3jEsJppMSHis.atBmHutC'),
(5, 5, '$2y$10$8tL6uFsbg4xzhYaoDU9JVeYDvJZtMXdd3jEsJppMSHis.atBmHutC');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aluno_turma`
--
ALTER TABLE `aluno_turma`
  ADD PRIMARY KEY (`aluno_turma_id`),
  ADD UNIQUE KEY `pessoa_id` (`pessoa_id`,`turma_id`),
  ADD KEY `turma_id` (`turma_id`);

--
-- Índices de tabela `cidade`
--
ALTER TABLE `cidade`
  ADD PRIMARY KEY (`cidade_id`);

--
-- Índices de tabela `docente_turma`
--
ALTER TABLE `docente_turma`
  ADD PRIMARY KEY (`docente_turma_id`),
  ADD UNIQUE KEY `pessoa_id` (`pessoa_id`,`turma_id`),
  ADD KEY `turma_id` (`turma_id`);

--
-- Índices de tabela `imagem`
--
ALTER TABLE `imagem`
  ADD PRIMARY KEY (`imagem_id`);

--
-- Índices de tabela `imagem_projeto`
--
ALTER TABLE `imagem_projeto`
  ADD PRIMARY KEY (`imagem_projeto_id`),
  ADD KEY `imagem_id` (`imagem_id`),
  ADD KEY `projeto_id` (`projeto_id`);

--
-- Índices de tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`pessoa_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `imagem_id` (`imagem_id`);

--
-- Índices de tabela `polo`
--
ALTER TABLE `polo`
  ADD PRIMARY KEY (`polo_id`),
  ADD KEY `cidade_id` (`cidade_id`);

--
-- Índices de tabela `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`projeto_id`),
  ADD KEY `turma_id` (`turma_id`);

--
-- Índices de tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`turma_id`),
  ADD KEY `imagem_id` (`imagem_id`),
  ADD KEY `polo_id` (`polo_id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario_id`),
  ADD KEY `pessoa_id` (`pessoa_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aluno_turma`
--
ALTER TABLE `aluno_turma`
  MODIFY `aluno_turma_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `cidade`
--
ALTER TABLE `cidade`
  MODIFY `cidade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `docente_turma`
--
ALTER TABLE `docente_turma`
  MODIFY `docente_turma_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `imagem`
--
ALTER TABLE `imagem`
  MODIFY `imagem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `imagem_projeto`
--
ALTER TABLE `imagem_projeto`
  MODIFY `imagem_projeto_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `pessoa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `polo`
--
ALTER TABLE `polo`
  MODIFY `polo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `projeto`
--
ALTER TABLE `projeto`
  MODIFY `projeto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `turma_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aluno_turma`
--
ALTER TABLE `aluno_turma`
  ADD CONSTRAINT `aluno_turma_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`pessoa_id`),
  ADD CONSTRAINT `aluno_turma_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turma` (`turma_id`);

--
-- Restrições para tabelas `docente_turma`
--
ALTER TABLE `docente_turma`
  ADD CONSTRAINT `docente_turma_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`pessoa_id`),
  ADD CONSTRAINT `docente_turma_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turma` (`turma_id`);

--
-- Restrições para tabelas `imagem_projeto`
--
ALTER TABLE `imagem_projeto`
  ADD CONSTRAINT `imagem_projeto_ibfk_1` FOREIGN KEY (`imagem_id`) REFERENCES `imagem` (`imagem_id`),
  ADD CONSTRAINT `imagem_projeto_ibfk_2` FOREIGN KEY (`projeto_id`) REFERENCES `projeto` (`projeto_id`);

--
-- Restrições para tabelas `pessoa`
--
ALTER TABLE `pessoa`
  ADD CONSTRAINT `pessoa_ibfk_1` FOREIGN KEY (`imagem_id`) REFERENCES `imagem` (`imagem_id`);

--
-- Restrições para tabelas `polo`
--
ALTER TABLE `polo`
  ADD CONSTRAINT `polo_ibfk_1` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`cidade_id`);

--
-- Restrições para tabelas `projeto`
--
ALTER TABLE `projeto`
  ADD CONSTRAINT `projeto_ibfk_1` FOREIGN KEY (`turma_id`) REFERENCES `turma` (`turma_id`);

--
-- Restrições para tabelas `turma`
--
ALTER TABLE `turma`
  ADD CONSTRAINT `turma_ibfk_1` FOREIGN KEY (`imagem_id`) REFERENCES `imagem` (`imagem_id`),
  ADD CONSTRAINT `turma_ibfk_2` FOREIGN KEY (`polo_id`) REFERENCES `polo` (`polo_id`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`pessoa_id`);
--
-- Banco de dados: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Despejando dados para a tabela `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"teste_paginacao\",\"table\":\"pessoas\"}]');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Despejando dados para a tabela `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-08-16 00:57:32', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"pt_BR\"}');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Estrutura para tabela `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Índices de tabela `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Índices de tabela `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Índices de tabela `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Índices de tabela `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Índices de tabela `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Índices de tabela `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Índices de tabela `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Índices de tabela `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Índices de tabela `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Índices de tabela `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Índices de tabela `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Índices de tabela `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Índices de tabela `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Índices de tabela `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Banco de dados: `teste_paginacao`
--
CREATE DATABASE IF NOT EXISTS `teste_paginacao` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `teste_paginacao`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoas`
--

CREATE TABLE `pessoas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `idade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoas`
--

INSERT INTO `pessoas` (`id`, `nome`, `idade`) VALUES
(1, 'Nome_1', 23),
(2, 'Nome_2', 45),
(3, 'Nome_3', 30),
(4, 'Nome_4', 28),
(5, 'Nome_5', 19),
(6, 'Nome_6', 34),
(7, 'Nome_7', 41),
(8, 'Nome_8', 26),
(9, 'Nome_9', 33),
(10, 'Nome_10', 52),
(11, 'Nome_11', 22),
(12, 'Nome_12', 27),
(13, 'Nome_13', 38),
(14, 'Nome_14', 24),
(15, 'Nome_15', 36),
(16, 'Nome_16', 48),
(17, 'Nome_17', 31),
(18, 'Nome_18', 29),
(19, 'Nome_19', 20),
(20, 'Nome_20', 25),
(21, 'Nome_21', 39),
(22, 'Nome_22', 37),
(23, 'Nome_23', 42),
(24, 'Nome_24', 40),
(25, 'Nome_25', 35),
(26, 'Nome_26', 32),
(27, 'Nome_27', 21),
(28, 'Nome_28', 46),
(29, 'Nome_29', 43),
(30, 'Nome_30', 50),
(31, 'Nome_31', 49),
(32, 'Nome_32', 18),
(33, 'Nome_33', 44),
(34, 'Nome_34', 47),
(35, 'Nome_35', 51),
(36, 'Nome_36', 55),
(37, 'Nome_37', 56),
(38, 'Nome_38', 60),
(39, 'Nome_39', 61),
(40, 'Nome_40', 58),
(41, 'Nome_41', 62),
(42, 'Nome_42', 63),
(43, 'Nome_43', 64),
(44, 'Nome_44', 65),
(45, 'Nome_45', 66),
(46, 'Nome_46', 67),
(47, 'Nome_47', 68),
(48, 'Nome_48', 69),
(49, 'Nome_49', 70),
(50, 'Nome_50', 71),
(51, 'Nome_51', 72),
(52, 'Nome_52', 73),
(53, 'Nome_53', 74),
(54, 'Nome_54', 75),
(55, 'Nome_55', 76),
(56, 'Nome_56', 77),
(57, 'Nome_57', 78),
(58, 'Nome_58', 79),
(59, 'Nome_59', 80),
(60, 'Nome_60', 81),
(61, 'Nome_61', 82),
(62, 'Nome_62', 83),
(63, 'Nome_63', 84),
(64, 'Nome_64', 85),
(65, 'Nome_65', 86),
(66, 'Nome_66', 87),
(67, 'Nome_67', 88),
(68, 'Nome_68', 89),
(69, 'Nome_69', 90),
(70, 'Nome_70', 91),
(71, 'Nome_71', 92),
(72, 'Nome_72', 93),
(73, 'Nome_73', 94),
(74, 'Nome_74', 95),
(75, 'Nome_75', 96),
(76, 'Nome_76', 97),
(77, 'Nome_77', 98),
(78, 'Nome_78', 99),
(79, 'Nome_79', 100),
(80, 'Nome_80', 101),
(81, 'Nome_81', 102),
(82, 'Nome_82', 103),
(83, 'Nome_83', 104),
(84, 'Nome_84', 105),
(85, 'Nome_85', 106),
(86, 'Nome_86', 107),
(87, 'Nome_87', 108),
(88, 'Nome_88', 109),
(89, 'Nome_89', 110);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `pessoas`
--
ALTER TABLE `pessoas`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
