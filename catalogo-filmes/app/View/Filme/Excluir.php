<?php

require __DIR__ . "\..\..\Config\Database.php";
require __DIR__ . "\..\..\Model\Filme.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    return header("Location: Listar.php");
}

$id = (int) $_POST["id"];

$filmeModel = new Filme($conn);
$sucesso = $filmeModel->delete($id);

if ($sucesso === TRUE) {
    return header("Location: Listar.php?mensagem=sucesso");
} else {
    return header("Location: Listar.php?mensagem=erro");
}
