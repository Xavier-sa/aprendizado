<?php
require_once '../data/config.php'; 

$salvou = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['foto']) && isset($_POST['usuario_id'])) {
        $imagem = $_FILES['foto'];
        $usuario_id = (int) $_POST['usuario_id'];

        $mimeTypesPermitidas = ['image/jpeg', 'image/png'];
        $extensoesPermitidas = ['jpg', 'jpeg', 'png'];
        $tamanhoMaximoEmBytes = 16 * 1024 * 1024; // 16MB

        if ($imagem['size'] > $tamanhoMaximoEmBytes) {
            die('Arquivo muito grande (máx. 16MB)');
        }

        if (!in_array($imagem['type'], $mimeTypesPermitidas)) {
            die('Tipo de arquivo inválido!');
        }

        $extensaoImagem = strtolower(pathinfo($imagem['name'], PATHINFO_EXTENSION));
        if (!in_array($extensaoImagem, $extensoesPermitidas)) {
            die('Extensão de arquivo inválida!');
        }

        $diretorioDestino = '../img/uploads/';
        if (!is_dir($diretorioDestino)) {
            mkdir($diretorioDestino, 0755, true);
        }

        $nomeUnico = uniqid() . '_' . $imagem['name'];
        $caminhoImagem = $diretorioDestino . $nomeUnico;

        $salvou = move_uploaded_file($imagem['tmp_name'], $caminhoImagem);

        if ($salvou) {
            $sql = "INSERT INTO imagens (nome_arquivo, caminho, tipo_mime, tamanho) 
                    VALUES (:nome_arquivo, :caminho, :tipo_mime, :tamanho)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nome_arquivo' => $nomeUnico,
                ':caminho' => $caminhoImagem,
                ':tipo_mime' => $imagem['type'],
                ':tamanho' => $imagem['size']
            ]);

            $imagem_id = $pdo->lastInsertId();

            // Relacionar imagem com usuário
            $sqlRel = "INSERT INTO imagem_usuario (imagem_id, usuario_id) VALUES (:imagem_id, :usuario_id)";
            $stmtRel = $pdo->prepare($sqlRel);
            $stmtRel->execute([
                ':imagem_id' => $imagem_id,
                ':usuario_id' => $usuario_id
            ]);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Upload Resultado</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <section>
        <a href="../../../../index.php">Voltar</a>
    </section>

    <?php if ($salvou): ?>
        <p>
            ✅ Imagem salva com sucesso! <br>
            Caminho: <?= htmlspecialchars($caminhoImagem) ?><br>
            <a href="./galeria.php">Ver Galeria</a>
        </p>
    <?php else: ?>
        <p>❌ Erro ao salvar imagem.</p>
    <?php endif ?>
</body>
</html>
