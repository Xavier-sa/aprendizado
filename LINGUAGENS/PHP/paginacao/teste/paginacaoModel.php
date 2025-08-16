
<?php
require_once 'Database.php';

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
