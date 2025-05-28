<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: login.php?erro=acesso");
    exit;
}

//  Verifica se o usuário tem permissão para acessar esta página