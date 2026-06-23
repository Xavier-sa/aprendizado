<!-- ok funcionando-->

<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');
require_once('../../model/UsuarioModel.php');

// Instanciando a conexão com o banco de dados
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

// Instanciando o modelo do usuário
$usuarioModel = new UsuarioModel($pdo);

// Verifica se foi passado um ID válido
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
    
    // Busca o usuário antes de excluir (para confirmar existência)
    $usuario = $usuarioModel->obterUsuarioPorId($id);
    
    if (!$usuario) {
        die("Usuário não encontrado!");
    }

    // Processa a exclusão quando for POST (confirmação)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Executa a exclusão
        $resultado = $usuarioModel->excluirUsuario($id);
        
        if ($resultado) {
            // Redireciona com mensagem de sucesso
            header('Location: usuarios.php?excluido=1');
            exit;
        } else {
            $erro = "Falha ao excluir usuário";
        }
    }
} else {
    die("ID do usuário não especificado!");
}
?>

<?php require_once('../componentes/head.php'); ?>
<body>
    <main class="content">
        <h1>Excluir Usuário</h1>
        
        <?php if (isset($erro)): ?>
            <div class="alert alert-danger"><?php echo $erro; ?></div>
        <?php endif; ?>
        
        <div class="confirmation">
            <p>Você está prestes a excluir o usuário:</p>
            <p><strong>Nome:</strong> <?php echo htmlspecialchars($usuario['nome']); ?></p>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($usuario['email']); ?></p>
            
            <form method="POST">
                <input type="hidden" name="confirmacao" value="1">
                <button type="submit" class="btn btn-danger">Confirmar Exclusão<span class="material-symbols-outlined">
                person_remove
                </span></button>
                <a href="usuarios.php" class="btn btn-secondary"><span class="material-symbols-outlined">cancel</span>Cancelar</a>
            </form>
        </div>
    </main>

    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>