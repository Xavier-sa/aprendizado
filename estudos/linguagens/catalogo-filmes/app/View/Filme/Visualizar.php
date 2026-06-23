<?php

require __DIR__ . "\..\..\Config\Database.php";
require __DIR__ . "\..\..\Model\Filme.php";

$filmeModel = new Filme($conn);

$id = $_GET["id"];

$filme = $filmeModel->findById($id);

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
    <h2>Detalhes do Filme</h2>

    <h3>Titulo: <?php echo $filme->titulo ?></h3>
    <p>Ano: <?php echo $filme->ano ?></p>
    <p>Descrição: <?php echo $filme->descricao ?></p>
</section>
</body>
</html>