<?php
require_once '../../../data/config.php'; 

// Buscar imagens no banco (pegando id e caminho)
$sql = "SELECT id, caminho FROM imagens ORDER BY data_upload DESC";
$stmt = $pdo->query($sql);
$imagens = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Galeria Imagens</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>

    <h2>Galeria Imagens</h2>

    <section>
        <div class="container">
            <?php if (count($imagens) > 0): ?>
                <?php foreach ($imagens as $img): ?>
                    <div class="image-box">
                        <img src="<?= htmlspecialchars($img['caminho']) ?>" alt="Imagem">
                        <a href="download.php?id=<?= $img['id'] ?>">Download</a>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>Nenhuma imagem encontrada na galeria.</p>
            <?php endif; ?>
        </div>
    </section>

    <p>
        <a href="../../../../index.php">Voltar</a>
    </p>

</body>
</html>
