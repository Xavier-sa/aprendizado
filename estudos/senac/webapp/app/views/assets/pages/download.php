<?php
require_once '../../../data/config.php'; 

// Recebe o ID da imagem via GET (ex: download.php?id=123)
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die('ID inválido.');
}

$id = (int)$_GET['id'];

// Busca o caminho e nome no banco
$sql = "SELECT nome_arquivo, caminho FROM imagens WHERE id = :id LIMIT 1";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);
$imagem = $stmt->fetch();

if (!$imagem) {
    die('Imagem não encontrada.');
}

$caminhoArquivo = $imagem['caminho'];

if (!file_exists($caminhoArquivo)) {
    die('Arquivo não encontrado no servidor.');
}

// Força download
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($imagem['nome_arquivo']) . '"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($caminhoArquivo));
readfile($caminhoArquivo);
exit;
