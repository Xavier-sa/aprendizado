<?php
require_once __DIR__ . "/../../../../Config/env.php";
require_once __DIR__ . "/../../../componentes/head.php";
$currentTab = 'alunos';
?>

<body class="body-adm">
    <div class="container-adm">
        <?php require_once __DIR__ . "/../../../componentes/adm/sidebar.php"; ?>
        <?php require_once __DIR__ . "/../../../componentes/adm/nav.php"; ?>

        <main class="main-turmas-turmas">
            <div class="tabs-adm-turmas">
                
                    <a class="tab-adm-turmas <?= ($currentTab == 'dados-gerais') ? 'active' : '' ?>" href="cadastroTurmas.php">DADOS GERAIS</a>
                    <a class="tab-adm-turmas <?= ($currentTab == 'projetos') ? 'active' : '' ?>" href="sobre.php">PROJETOS</a>
                    <a class="tab-adm-turmas <?= ($currentTab == 'docentes') ? 'active' : '' ?>" href="docentes.php">DOCENTES</a>
                    <a class="tab-adm-turmas <?= ($currentTab == 'alunos') ? 'active' : '' ?>" href="alunos.php">ALUNOS</a>
                </div>
            

            <div class="form-group-buton" style="margin: 20px 0;">
                <input type="text" id="pesquisa" class="input-text" placeholder="Pesquisar Aluno" />
                <?php buttonComponent('primary', 'Pesquisar', true); ?>
            </div>

            <div class="tabela-principal-lista-alunos">
                <div class="tabela-container-lista-alunos">
                    <table id="tabela-alunos">
                        <thead>
                            <tr>
                                <th>NOME</th>a
                                <th>POLO</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $usuarios = [
                                ['nome' => 'João Silva', 'polo' => 'Campo Grande'],
                                ['nome' => 'Maria Santos', 'polo' => 'Campo Grande'],
                                ['nome' => 'Pedro Oliveira', 'polo' => 'Campo Grande'],
                                ['nome' => 'Ana Costa', 'polo' => 'Campo Grande'],
                                ['nome' => 'Carlos Ferreira', 'polo' => 'Campo Grande'],
                                ['nome' => 'Lucia Rodrigues', 'polo' => 'Campo Grande'],
                                ['nome' => 'Roberto Almeida', 'polo' => 'Campo Grande'],
                                ['nome' => 'Fernanda Lima', 'polo' => 'Campo Grande'],
                                ['nome' => 'Marcos Pereira', 'polo' => 'Campo Grande'],
                                ['nome' => 'Juliana Martins', 'polo' => 'Campo Grande'],
                                ['nome' => 'Rafael Souza', 'polo' => 'Campo Grande'],
                                ['nome' => 'Patricia Santos', 'polo' => 'Campo Grande'],
                                ['nome' => 'Lucas Mendes', 'polo' => 'Campo Grande'],
                                ['nome' => 'Camila Alves', 'polo' => 'Campo Grande'],
                                ['nome' => 'Diego Costa', 'polo' => 'Campo Grande'],
                                ['nome' => 'Amanda Silva', 'polo' => 'Dourados'],
                                ['nome' => 'Thiago Oliveira', 'polo' => 'Dourados'],
                                ['nome' => 'Carolina Lima', 'polo' => 'Dourados'],
                                ['nome' => 'Bruno Santos', 'polo' => 'Dourados'],
                                ['nome' => 'Isabela Costa', 'polo' => 'Dourados'],
                                ['nome' => 'Gabriel Ferreira', 'polo' => 'Dourados'],
                                ['nome' => 'Mariana Rodrigues', 'polo' => 'Dourados'],
                                ['nome' => 'Leonardo Almeida', 'polo' => 'Dourados'],
                                ['nome' => 'Beatriz Martins', 'polo' => 'Dourados'],
                                ['nome' => 'Ricardo Pereira', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Vanessa Silva', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Felipe Santos', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Daniela Costa', 'polo' => 'Três Lagoas'],
                                ['nome' => 'André Oliveira', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Tatiana Lima', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Rodrigo Ferreira', 'polo' => 'Três Lagoas'],
                                ['nome' => 'Cristina Alves', 'polo' => 'Três Lagoas']
                            ];
                            usort($usuarios, function ($a, $b) {
                                return strcasecmp($a['nome'], $b['nome']);
                            });
                            foreach ($usuarios as $usuario) {
                                echo '<tr>';
                                echo '<td>' . $usuario['nome'] . '</td>';
                                echo '<td>' . $usuario['polo'] . '</td>';
                                echo '<td class="acoes">';
                                echo '<span class="material-symbols-outlined acao-edit" style="cursor: pointer; margin-right: 10px;" title="Editar">edit</span>';
                                echo '<span class="material-symbols-outlined acao-delete" style="cursor: pointer;" title="Excluir">delete</span>';
                                echo '</td>';
                                echo '</tr>';
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Filtro de pesquisa simples
        document.querySelector('.form-group-buton button').addEventListener('click', () => {
            const termo = document.getElementById('pesquisa').value.toLowerCase();
            const linhas = document.querySelectorAll('#tabela-alunos tbody tr');

            linhas.forEach(linha => {
                const nome = linha.children[0].textContent.toLowerCase();
                const polo = linha.children[1].textContent.toLowerCase();

                if (nome.includes(termo) || polo.includes(termo)) {
                    linha.style.display = '';
                } else {
                    linha.style.display = 'none';
                }
            });
        });
    </script>
</body>

</html>