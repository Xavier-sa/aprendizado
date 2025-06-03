<?php
require_once '../../../data/config.php'; 

echo '<pre>';
print_r($_FILES['foto']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['foto'])) {
        $imagem = $_FILES['foto'];

        // tratamento para tipo de arquivos apenas imagens
        $mimeTypesPermitidas = ['image/jpeg', 'image/png'];
        $extensoesPermitidas = ['jpg', 'jpeg', 'png'];


        // Verifica tamanho máximo 
        if ($imagem['size'] > 16000000) {
            die('Arquivo muito grande (máx. 16MB)');
        }

        $diretorioDestino = './uploads/';
        // Cria diretório se não existir
        if (!is_dir($diretorioDestino)) {
            mkdir($diretorioDestino, 0755, true);
        }




        // se o mime da imagem não estiver na lista: erro
        if (!in_array($imagem['type'], $mimeTypesPermitidas)) {
            die('Tipo de arquivo iválido!');
        }

        // parse da extensão do arquivo e verifica se é valido
        $extensaoImagem = strtolower(pathinfo(
            $imagem['name'], 
            PATHINFO_EXTENSION
        ));
        if (!in_array($extensaoImagem, $extensoesPermitidas)) {
            die('Extensão de arquivo iválida!');
        }

        $diretorioDestino = './uploads/';

        // tratamento para manter o nome único
        $nomeUnico = uniqid() . '_' . $imagem['name'];
        $caminhoImagem = $diretorioDestino . $nomeUnico;

        $salvou = move_uploaded_file(
            $imagem['tmp_name'],
            $caminhoImagem
        );

        if ($salvou) {
            $sql = "INSERT INTO imagens (nome_arquivo, caminho, tipo_mime, tamanho) VALUES (:nome_arquivo, :caminho, :tipo_mime, :tamanho)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nome_arquivo' => $nomeUnico,
                ':caminho' => $caminhoImagem,
                ':tipo_mime' => $imagem['type'],
                ':tamanho' => $imagem['size']
            ]);
        }


    }
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
    <link rel="stylesheet" href="./app/views/assets/css/style.css">
</head>
<body>
    <?php if ($salvou): ?>
        <p>
            Imagem salva com sucesso em <?= $caminhoImagem ?>.
            <a href="../../../../index.php">Voltar</a>
            <a href="./galeria.php">Ver Galeria</a>
        </p>
    <?php endif ?>
</body>
</html>
