<!-- ok funcionando-->

<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');
require_once('../../model/UsuarioModel.php');

// Instanciando a conexão com o banco de dados
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();  // Criando a conexão e armazenando na variável $pdo

// Instanciando o modelo do usuário
$usuarioModel = new UsuarioModel($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Coletando os dados do formulário
    $dados = [
        'nome' => $_POST['nome'],
        'email' => $_POST['email'],
        'telefone' => $_POST['telefone'],
        'data_nascimento' => $_POST['data_nascimento'],
        'cpf' => $_POST['cpf'],
        // 'senha' => $_POST['senha']
    ];

    // Chamando o método do modelo para adicionar o usuário
    $usuarioModel->criarUsuario($dados);

    // Redirecionando para a lista de usuários após a inserção
    header('Location: usuarios.php');
    exit;

    
}

?>

<?php require_once('../componentes/head.php'); ?>
<body>
    <!-- Arquivo responsável pela tela de Adicionar Usuário -->
    <main class="content">
        <div class="cadastrar-usuario">
        <h1>Adicionar Novo Usuário</h1>
        
        <!-- Formulário de Adição de Usuário -->
        <form method="POST">
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input type="text" id="telefone" name="telefone" required>
            </div>

            <div class="form-group">
                <label for="data_nascimento">Data de Nascimento:</label>
                <input type="date" id="data_nascimento" name="data_nascimento" required>
            </div>

            <div class="form-group">
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required>
            </div>

            <!--  futuramente senha<div class="form-group">
                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required>
            </div> -->

            <div class="form-group">
                <button type="submit" class="btn"><span class="material-symbols-outlined">ADD</span>Novo Usuário</button>
            </div>
        </form>
        </div>
    </main>

    <!-- Rodapé -->
    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>
