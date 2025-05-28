<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');

// Conexão com o banco
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

if (!$pdo) {
    die("Não foi possível conectar ao banco de dados");
}

require_once('../../model/CategoriaModel.php');
$categoriaModel = new CategoriaModel($pdo);

// Obtendo apenas as categorias
$categorias = $categoriaModel->listarCategorias();
?>

<?php require_once('../componentes/head.php'); ?>
<body>

<main class="content">
    <h1>Categorias</h1>
    
    <div class="card">
        <h2>
            Lista de Categorias
            
        </h2>
       
        
        <?php if (empty($categorias)): ?>
            <p>Nenhuma categoria cadastrada.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                       
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($categorias as $categoria): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($categoria['nome']); ?></td>
                            
                            <td class="actions">
                                <a href="editar_categoria.php?id=<?php echo $categoria['id']; ?>"><span class="material-symbols-outlined">edit</span></a><!-- editar-->
                                <a href="excluir_categoria.php?id=<?php echo $categoria['id']; ?>" 
                                   onclick="return confirm('Tem certeza que deseja excluir?')"><span class="material-symbols-outlined">delete</span></a><!-- excluir -->
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <a href="adicionar_categoria.php" class="btn btn-add">+ Nova Categoria</a>
    </div>
</main>

<?php require_once('../componentes/footer.php'); ?>

</body>
</html>