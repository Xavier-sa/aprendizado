<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');
require_once('../../model/CategoriaModel.php');
require_once('../../model/ArtigoModel.php'); // Para verificar artigos relacionados

// Conexão com o banco
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

// Instanciando os modelos
$categoriaModel = new CategoriaModel($pdo);
$artigoModel = new ArtigoModel($pdo);

// Verifica se foi passado um ID válido
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
    
    // Busca a categoria antes de excluir
    $categoria = $categoriaModel->obterCategoriaPorId($id);
    
    if (!$categoria) {
        die("Categoria não encontrada!");
    }

    // Verifica se há artigos relacionados
    $totalArtigos = $categoriaModel->contarArtigosPorCategoria($id);

    // Processa a exclusão quando for POST (confirmação)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Se houver artigos, não permite excluir
        if ($totalArtigos > 0) {
            $erro = "Não é possível excluir. Existem $totalArtigos artigo(s) vinculado(s) a esta categoria.";
        } else {
            // Executa a exclusão
            $resultado = $categoriaModel->excluirCategoria($id);
            
            if ($resultado) {
                header('Location: categorias.php?excluido=1');
                exit;
            } else {
                $erro = "Falha ao excluir categoria";
            }
        }
    }
} else {
    die("ID da categoria não especificado!");
}
?>

<?php require_once('../componentes/head.php'); ?>  
<body>
    <main class="content">
        <h1>Excluir Categoria</h1>
        
        <?php if (isset($erro)): ?>
            <div class="alert alert-danger"><?= $erro ?></div>
        <?php endif; ?>
        
        <div class="confirmation">
            <p>Você está prestes a excluir a categoria:</p>
            <p><strong>Nome:</strong> <?= htmlspecialchars($categoria['nome']) ?></p>
            
            <?php if ($totalArtigos > 0): ?>
                <div class="alert alert-danger">
                    Atenção! Existem <?= $totalArtigos ?> artigo(s) vinculado(s) a esta categoria.
                    <br>Para excluir, primeiro mova ou exclua esses artigos.
                </div>
            <?php endif; ?>
            
            <form method="POST">
                <?php if ($totalArtigos == 0): ?>
                    <button type="submit" class="btn btn-danger">
                        <span class="material-symbols-outlined">delete</span>
                        Confirmar Exclusão
                    </button>
                <?php endif; ?>
                <a href="categorias.php" class="btn btn-secondary">
                    <span class="material-symbols-outlined">cancel</span>
                    Cancelar
                </a>
            </form>
        </div>
    </main>

    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>