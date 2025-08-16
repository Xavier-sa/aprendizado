<?php
require_once 'paginacaoModel.php';

// Obtem parâmetros da URL
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 0;
$busca = isset($_GET['busca']) ? '%' . $_GET['busca'] . '%' : '%';

// Obtém os dados paginados
$pessoas = listarPessoas($pagina, 20, $busca);
