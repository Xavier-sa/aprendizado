<?php
require_once('../config/env.php');
require_once('../config/database.php');
require_once('../model/UsuarioModel.php');

// Conexão com o banco
$database = new Database("localhost", "3306", "root", "", "xavier_solutions");
$pdo = $database->createConnection();

// Verifica a conexão
if (!$pdo) {
    die("Não foi possível conectar ao banco de dados");
}

// Instancia o modelo
$usuarioModel = new UsuarioModel($pdo);

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    // Verifica o e-mail no banco
    $usuario = $usuarioModel->verificarLogin($email);
    
    if ($usuario) {
        // Inicia a sessão e armazena dados do usuário
        session_start();
        $_SESSION['usuario'] = [
            'id' => $usuario['id'],
            'nome' => $usuario['nome'],
            'email' => $usuario['email']
        ];
        
        // Redireciona para a página inicial
        header("Location: ../view/pages/home.php");
        exit;
    } else {
        // Redireciona de volta ao login com mensagem de erro
        header("Location: ../view/pages/login.php?erro=email");
        exit;
    }
} else {
    // Se não foi POST, redireciona para o login
    header("Location: ../view/pages/login.php");
    exit;
}