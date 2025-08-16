<?php
require_once 'paginacaoModel.php';

// Parâmetros da URL
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 0;
$limite = 20;
$busca = isset($_GET['busca']) ? '%' . $_GET['busca'] . '%' : '%';

// Dados paginados
$pessoas = listarPessoas($pagina, $limite, $busca);

// Total para cálculo de páginas
$totalRegistros = contarPessoas($busca);
$totalPaginas = ceil($totalRegistros / $limite);
