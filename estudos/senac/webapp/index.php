<?php
require_once '.data';

// Buscar todos os usuários para o <select>
$sql = "SELECT id, nome FROM usuarios ORDER BY nome";
$stmt = $pdo->query($sql);
$usuarios = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>File Upload</title>
    <link rel="stylesheet" href="./app/views/assets/css/style.css">
</head>
<body>
    <section>
        <a href="cadastrarUsuario.php">Cadastrar Usuário</a>
    </section>

    <form action="./app/views/assets/pages/upload.php" method="POST" enctype="multipart/form-data">
        <label for="usuario">Selecione o usuário:</label>
        <select name="usuario_id" id="usuario" required>
            <option value="" disabled selected>Escolha um usuário</option>
            <?php foreach ($usuarios as $usuario): ?>
                <option value="<?= $usuario['id'] ?>"><?= htmlspecialchars($usuario['nome']) ?></option>
            <?php endforeach; ?>
        </select>

        <br><br>

        <input type="file" name="foto" accept="image/*" required>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
