<?php
require_once '../includes/auth.php';
require_once '../includes/storage.php';
require_once '../includes/helpers.php';

requireAuth();

define('BANKS_FILE', '../data/banks.json');
define('TRANSACTIONS_FILE', '../data/transactions.json');

$userId = $_SESSION['user']['id'];

$banks = array_filter(readJson(BANKS_FILE), fn($b) => $b['user_id'] == $userId);
$transactions = array_filter(readJson(TRANSACTIONS_FILE), fn($t) => $t['user_id'] == $userId);

$totalIncome = 0;
$totalExpense = 0;

foreach ($transactions as $t) {
    if ($t['type'] === 'INCOME') $totalIncome += $t['amount'];
    if ($t['type'] === 'EXPENSE') $totalExpense += $t['amount'];
}

$balance = $totalIncome - $totalExpense;
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="../assets/style.css">
</head>

<body>

    <div class="header">
        <h2>Dashboard</h2>
        <a href="logout.php">Sair</a>
    </div>

    <div class="cards">
        <div class="card">Entradas: R$ <?= $totalIncome ?></div>
        <div class="card">Saídas: R$ <?= $totalExpense ?></div>
        <div class="card">Saldo: R$ <?= $balance ?></div>
    </div>

</body>

</html>