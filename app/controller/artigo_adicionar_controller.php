<?php
require_once('../../config/env.php');
require_once('../../config/database.php');
require_once('../../model/ArtigoModel.php');
require_once('../../model/UsuarioModel.php');
require_once('../../model/CategoriaModel.php');

$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

if (!$pdo) {
    die("Não foi possível conectar ao banco de dados");
}

$artigoModel = new ArtigoModel($pdo);
$usuarioModel = new UsuarioModel($pdo);
$categoriaModel = new CategoriaModel($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = filter_input(INPUT_POST, 'titulo', FILTER_SANITIZE_STRING);
    $conteudo = filter_input(INPUT_POST, 'conteudo', FILTER_SANITIZE_STRING);
    $id_categoria = filter_input(INPUT_POST, 'id_categoria', FILTER_VALIDATE_INT);
    $id_usuario = filter_input(INPUT_POST, 'id_usuario', FILTER_VALIDATE_INT);

    if (empty($titulo) || empty($conteudo) || !$id_categoria || !$id_usuario) {
        $_SESSION['erro'] = "Todos os campos devem ser preenchidos corretamente!";
        $_SESSION['form_data'] = $_POST;
        header("Location: artigo_adicionar.php");
        exit;
    }

    try {
        $usuarioExiste = $usuarioModel->obterUsuarioPorId($id_usuario);
        $categoriaExiste = $categoriaModel->obterCategoriaPorId($id_categoria);
        
        if (!$usuarioExiste || !$categoriaExiste) {
            throw new Exception("Usuário ou categoria inválidos");
        }

        $resultado = $artigoModel->criarArtigo($titulo, $conteudo, $id_categoria, $id_usuario);
        
        if ($resultado) {
            header("Location: artigos.php?sucesso=1");
            exit;
        } else {
            throw new Exception("Erro ao adicionar o artigo no banco de dados");
        }
    } catch (Exception $e) {
        $_SESSION['erro'] = $e->getMessage();
        $_SESSION['form_data'] = $_POST;
        header("Location: artigo_adicionar.php");
        exit;
    }
} else {
    header("Location: artigo_adicionar.php");
    exit;
}
?>