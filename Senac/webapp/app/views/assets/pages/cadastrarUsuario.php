<?php
require_once '../../../data/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];

    $sql = "INSERT INTO usuarios (nome) VALUES (?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome]);

    echo "Usuário cadastrado com sucesso!";
}
?>

<form method="POST">
    <input type="text" name="nome" placeholder="Nome do usuário" required>
    <button type="submit">Cadastrar</button>
</form>
