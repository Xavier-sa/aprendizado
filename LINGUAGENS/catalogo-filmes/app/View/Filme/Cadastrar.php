<?php

require __DIR__ . "\..\..\Config\Database.php";
require __DIR__ . "\..\..\Model\Filme.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["titulo"]) && isset($_POST["ano"])) {

        $filmeModel = new Filme($conn);
        $filmeModel->insert(
            $_POST["titulo"],
            $_POST["ano"],
            $_POST["descricao"]
        );

        return header("Location: Listar.php");
    }
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filmes</title>

    <link rel="stylesheet" href="http:/catalogo-filmes/public/css/style.css">
</head>
<body>
<section class="container">
    <h2>Cadastro de filmes</h2>
    <form action="Cadastrar.php" method="POST">
        <div>
            <label for="titulo">Título</label>
            <input type="text" name="titulo" required>
        </div>
        <div>
            <label for="ano">Ano</label>
            <input type="number" name="ano" required>
        </div>
        <div>
            <label for="descricao">Descrição</label>
            <textarea name="descricao" rows="5"></textarea>
        </div>

        <button>Salvar</button>
    </form>
</section>
</body>
</html>