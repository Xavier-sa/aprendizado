<?php
require_once 'controlar_paginacao.php';
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Lista de Pessoas</title>
</head>

<body>
    <h1>Lista de Pessoas</h1>

    <form method="GET">
        <input type="text" name="busca" placeholder="Buscar por nome" value="<?= htmlspecialchars($_GET['busca'] ?? '') ?>">
        <input type="submit" value="Buscar">
    </form>

    <table border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
        </tr>
        <?php if (count($pessoas) > 0): ?>
            <?php foreach ($pessoas as $p): ?>
                <tr>
                    <td><?= $p['id'] ?></td>
                    <td><?= htmlspecialchars($p['nome']) ?></td>
                    <td><?= $p['idade'] ?></td>
                </tr>
            <?php endforeach; ?>
        <?php else: ?>
            <tr>
                <td colspan="3">Nenhum registro encontrado.</td>
            </tr>
        <?php endif; ?>
    </table>

    <div>
        <p>Total de registros: <?= $totalRegistros ?></p>
        <p>Página <?= $pagina + 1 ?> de <?= $totalPaginas ?></p>

        <?php if ($pagina > 0): ?>
            <a href="?pagina=<?= $pagina - 1 ?>&busca=<?= urlencode($_GET['busca'] ?? '') ?>">← Anterior</a>
        <?php endif; ?>

        <?php if ($pagina + 1 < $totalPaginas): ?>
            <a href="?pagina=<?= $pagina + 1 ?>&busca=<?= urlencode($_GET['busca'] ?? '') ?>">Próxima →</a>
        <?php endif; ?>
    </div>

    <!-- Paginação -->


</body>
</html>