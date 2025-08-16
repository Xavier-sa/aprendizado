<?php
require_once 'Database.php';

/**
 * Retorna os registros paginados da tabela pessoas
 */
function listarPessoas($pagina = 0, $limite = 20, $busca = '%') {
    $pdo = Database::conectar();
    $offset = $pagina * $limite;

    $sql = "SELECT * FROM pessoas WHERE nome LIKE :busca LIMIT :limite OFFSET :offset";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':busca', $busca, PDO::PARAM_STR);
    $stmt->bindParam(':limite', $limite, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Retorna o total de registros filtrados da tabela pessoas
 */
function contarPessoas($busca = '%') {
    $pdo = Database::conectar();

    $sql = "SELECT COUNT(*) FROM pessoas WHERE nome LIKE :busca";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':busca', $busca, PDO::PARAM_STR);
    $stmt->execute();

    return (int)$stmt->fetchColumn();
}
