<?php
session_start();

// Limpa todos os dados da sessão
$_SESSION = array();

// Destrói a sessão
session_destroy();

// Redireciona para a página de login
header("Location: login.php");
exit;