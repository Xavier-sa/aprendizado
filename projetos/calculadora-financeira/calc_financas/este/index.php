<?php
session_start();

define('DATA_FILE', __DIR__ . '/data.json');

function readData()
{
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, json_encode([
            "users" => [],
            "banks" => [],
            "transactions" => []
        ], JSON_PRETTY_PRINT));
    }
    return json_decode(file_get_contents(DATA_FILE), true);
}

function writeData($data)
{
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}

function generateId($items)
{
    if (empty($items)) return 1;
    return max(array_column($items, 'id')) + 1;
}

function e($v)
{
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

$data = readData();
$error = "";

/* ================= AUTH ================= */

if (isset($_POST['register'])) {
    foreach ($data['users'] as $u) {
        if ($u['email'] === $_POST['email']) {
            $error = "Email já cadastrado";
        }
    }

    if (!$error) {
        $userId = generateId($data['users']);
        $data['users'][] = [
            "id" => $userId,
            "name" => $_POST['name'],
            "email" => $_POST['email'],
            "password" => password_hash($_POST['password'], PASSWORD_DEFAULT)
        ];

        // Criar banco principal
        $bankId = generateId($data['banks']);
        $data['banks'][] = [
            "id" => $bankId,
            "user_id" => $userId,
            "name" => "Principal"
        ];

        // Inserir entradas iniciais
        $initial = [
            ["ACERTO", 1000],
            ["FGTS", 5000],
            ["CAUSA", 30000]
        ];

        foreach ($initial as $i) {
            $data['transactions'][] = [
                "id" => generateId($data['transactions']),
                "user_id" => $userId,
                "bank_id" => $bankId,
                "type" => "INCOME",
                "amount" => $i[1],
                "description" => $i[0],
                "date" => date('Y-m-d')
            ];
        }

        writeData($data);
        $_SESSION['user'] = $userId;
        header("Location: index.php");
        exit;
    }
}

if (isset($_POST['login'])) {
    foreach ($data['users'] as $u) {
        if (
            $u['email'] === $_POST['email'] &&
            password_verify($_POST['password'], $u['password'])
        ) {
            session_regenerate_id(true);
            $_SESSION['user'] = $u['id'];
            header("Location: index.php");
            exit;
        }
    }
    $error = "Credenciais inválidas";
}

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

/* ================= PROTEÇÃO ================= */

$userId = $_SESSION['user'] ?? null;

/* ================= CRUD TRANSACTION ================= */

if ($userId && isset($_POST['add_transaction'])) {
    $data['transactions'][] = [
        "id" => generateId($data['transactions']),
        "user_id" => $userId,
        "bank_id" => $_POST['bank_id'],
        "type" => $_POST['type'],
        "amount" => (float)$_POST['amount'],
        "description" => $_POST['description'],
        "date" => $_POST['date']
    ];
    writeData($data);
    header("Location: index.php");
    exit;
}

/* ================= DASHBOARD DATA ================= */

$totalIncome = 0;
$totalExpense = 0;

$userTransactions = array_filter($data['transactions'], fn($t) => $t['user_id'] == $userId);
$userBanks = array_filter($data['banks'], fn($b) => $b['user_id'] == $userId);

foreach ($userTransactions as $t) {
    if ($t['type'] == "INCOME") $totalIncome += $t['amount'];
    else $totalExpense += $t['amount'];
}
$balance = $totalIncome - $totalExpense;

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Mini Sistema Financeiro</title>
    <style>
        body {
            font-family: Arial;
            background: #F4F7F9;
            padding: 30px;
        }

        .card {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        button {
            background: #6FA8DC;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
        }

        input,
        select {
            padding: 6px;
            margin: 4px 0;
            width: 100%;
        }

        h2 {
            color: #6FA8DC;
        }

        .balance {
            font-size: 22px;
            color: #93C47D;
        }

        .error {
            color: red;
        }
    </style>
</head>

<body>

    <?php if (!$userId): ?>

        <div class="card">
            <h2>Login / Registro</h2>
            <?php if ($error): ?><p class="error"><?= e($error) ?></p><?php endif; ?>
            <form method="POST">
                <input name="name" placeholder="Nome (registro)">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Senha" required>
                <button name="login">Entrar</button>
                <button name="register">Registrar</button>
            </form>
        </div>

    <?php else: ?>

        <a href="?logout=1">Sair</a>

        <div class="card">
            <h2>Dashboard</h2>
            <p>Entradas: R$ <?= number_format($totalIncome, 2, ',', '.') ?></p>
            <p>Saídas: R$ <?= number_format($totalExpense, 2, ',', '.') ?></p>
            <p class="balance">Saldo: R$ <?= number_format($balance, 2, ',', '.') ?></p>
        </div>

        <div class="card">
            <h2>Nova Transação</h2>
            <form method="POST">
                <select name="bank_id">
                    <?php foreach ($userBanks as $b): ?>
                        <option value="<?= $b['id'] ?>"><?= e($b['name']) ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="type">
                    <option value="INCOME">Entrada</option>
                    <option value="EXPENSE">Saída</option>
                </select>
                <input type="number" step="0.01" name="amount" placeholder="Valor" required>
                <input type="text" name="description" placeholder="Descrição">
                <input type="date" name="date" required>
                <button name="add_transaction">Adicionar</button>
            </form>
        </div>

        <div class="card">
            <h2>Transações</h2>
            <table width="100%">
                <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Descrição</th>
                </tr>
                <?php foreach ($userTransactions as $t): ?>
                    <tr>
                        <td><?= e($t['date']) ?></td>
                        <td><?= e($t['type']) ?></td>
                        <td>R$ <?= number_format($t['amount'], 2, ',', '.') ?></td>
                        <td><?= e($t['description']) ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        </div>

    <?php endif; ?>

</body>

</html>