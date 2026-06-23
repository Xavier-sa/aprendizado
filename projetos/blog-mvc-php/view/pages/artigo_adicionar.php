<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');
require_once('../../model/ArtigoModel.php');
require_once('../../model/UsuarioModel.php');
require_once('../../model/CategoriaModel.php');

// Conexão com o banco de dados
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

// Verifica se a conexão foi bem-sucedida
if (!$pdo instanceof PDO) {
    die("Não foi possível conectar ao banco de dados");
}

// Instanciando os modelos
$artigoModel = new ArtigoModel($pdo);
$usuarioModel = new UsuarioModel($pdo);
$categoriaModel = new CategoriaModel($pdo);

// Carrega todos os usuários e categorias
$usuarios = $usuarioModel->listarUsuarios();
$categorias = $categoriaModel->listarCategorias();

// Processa o formulário quando for POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitização de entrada para evitar problemas com XSS
    $titulo = htmlspecialchars(trim($_POST['titulo']), ENT_QUOTES, 'UTF-8');
    $conteudo = htmlspecialchars(trim($_POST['conteudo']), ENT_QUOTES, 'UTF-8');
    $id_categoria = (int) $_POST['id_categoria'];
    $id_usuario = (int) $_POST['id_usuario'];

    // Validação básica
    if (empty($titulo) || empty($conteudo) || empty($id_categoria) || empty($id_usuario)) {
        $_SESSION['error'] = "Todos os campos devem ser preenchidos!";
    } else {
        // Chama o método para criar o artigo
        $resultado = $artigoModel->criarArtigo($titulo, $conteudo, $id_categoria, $id_usuario);

        if ($resultado) {
            $_SESSION['success'] = "Artigo adicionado com sucesso!";
            header("Location: artigos.php");
            exit;
        } else {
            $_SESSION['error'] = "Erro ao adicionar o artigo. Tente novamente!";
            header("Location: artigo_adicionar.php");
            exit;
        }
    }
}
?>

<?php require_once('../componentes/head.php'); ?>
<body>
    <main class="content">
        <h1>Adicionar Artigo</h1>

        <!-- Exibição de mensagens de erro ou sucesso -->
        <?php if (isset($_SESSION['error'])): ?>
            <div class="alert alert-danger"><?= $_SESSION['error']; ?></div>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['success'])): ?>
            <div class="alert alert-success"><?= $_SESSION['success']; ?></div>
            <?php unset($_SESSION['success']); ?>
        <?php endif; ?>

        <div class="card">
            <form method="POST" action="artigo_adicionar.php">
                <div class="form-group">
                    <label for="titulo">Título:</label>
                    <input type="text" name="titulo" id="titulo" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="conteudo">Conteúdo:</label>
                    <textarea name="conteudo" id="conteudo" class="form-control" rows="5" required></textarea>
                </div>

                <div class="form-group">
                    <label for="id_categoria">Categoria:</label>
                    <select name="id_categoria" id="id_categoria" class="form-control" required>
                        <option value="">Selecione a categoria</option>
                        <?php foreach ($categorias as $categoria): ?>
                            <option value="<?= $categoria['id']; ?>"><?= htmlspecialchars($categoria['nome']); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label for="id_usuario">Usuário:</label>
                    <select name="id_usuario" id="id_usuario" class="form-control" required>
                        <option value="">Selecione o usuário</option>
                        <?php foreach ($usuarios as $usuario): ?>
                            <option value="<?= $usuario['id']; ?>"><?= htmlspecialchars($usuario['nome']); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Adicionar Artigo</button>
                <a href="artigos.php" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </main>

    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>
