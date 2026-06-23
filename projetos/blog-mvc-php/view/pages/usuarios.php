<!-- ok funcionando-->

<?php
require_once('../../config/env.php');
require_once('../componentes/navbar.php');
require_once('../componentes/sidebar.php');
require_once('../../config/database.php');
require_once('../../model/UsuarioModel.php');

$database = new Database("localhost", "3306", "root", "", "xavier_solutions");


$pdo = $database->createConnection();

if (!$pdo) {
    die("Não foi possível conectar ao banco de dados");
}


$usuarioModel = new UsuarioModel($pdo);

$usuarios = $usuarioModel->listarUsuarios();

?>

<?php require_once('../componentes/head.php'); ?>
<body>
    <!-- Arquivo responsável pela tela de Usuários -->
    <main class="content">
        <h1>Usuários</h1>
        
        <!-- Tabela de Usuários -->
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                
                <?php foreach ($usuarios as $usuario): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($usuario['id']); ?></td>
                        <td><?php echo htmlspecialchars($usuario['nome']); ?></td>
                        <td><?php echo htmlspecialchars($usuario['email']); ?></td>
                        <td><?php echo htmlspecialchars($usuario['telefone']); ?></td>
                        <td>
                            <!-- Ações possíveis, como editar ou excluir -->
                             <a href="editar_usuario.php?id=<?php echo $usuario['id']; ?>"><span class="material-symbols-outlined">edit</span></a> <!-- editar -->
                            <a href="excluir_usuario.php?id=<?php echo $usuario['id']; ?>" onclick="return confirm('Tem certeza que deseja excluir?')"><span class="material-symbols-outlined">delete</span></a><!-- excluir -->
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        
              
        <a href="adicionar_usuario.php" class="btn"><span class="material-symbols-outlined">add</span> Novo Usuário</a>
      
    </main>

    <!-- Rodapé -->
    <?php require_once('../componentes/footer.php'); ?>
</body>
</html>