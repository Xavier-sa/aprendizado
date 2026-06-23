<?php
session_start();
define('DATA_FILE', __DIR__ . '/data.json');

function readData()
{
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
$userId = $_SESSION['user'] ?? null;

/* ================= AUTH ================= */

if (isset($_POST['login'])) {
    foreach ($data['users'] as $u) {
        if ($u['email'] === $_POST['email'] && password_verify($_POST['password'], $u['password'])) {
            $_SESSION['user'] = $u['id'];
            session_regenerate_id(true);
            header("Location:index.php");
            exit;
        }
    }
    $error = "Credenciais inválidas";
}

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location:index.php");
    exit;
}

/* ================= BANCO CRUD ================= */

if ($userId && isset($_POST['add_bank'])) {
    $data['banks'][] = [
        "id" => generateId($data['banks']),
        "user_id" => $userId,
        "name" => $_POST['bank_name']
    ];
    writeData($data);
    header("Location:index.php");
    exit;
}

if ($userId && isset($_GET['delete_bank'])) {
    $bankId = (int)$_GET['delete_bank'];

    // Verifica se tem transação vinculada
    foreach ($data['transactions'] as $t) {
        if ($t['bank_id'] == $bankId) {
            die("Não é possível remover banco com transações.");
        }
    }

    $data['banks'] = array_values(array_filter(
        $data['banks'],
        fn($b) => !($b['id'] == $bankId && $b['user_id'] == $userId)
    ));
    writeData($data);
    header("Location:index.php");
    exit;
}

/* ================= TRANSAÇÕES ================= */

if ($userId && isset($_POST['add_transaction'])) {
    $data['transactions'][] = [
        "id" => generateId($data['transactions']),
        "user_id" => $userId,
        "bank_id" => (int)$_POST['bank_id'],
        "type" => $_POST['type'],
        "amount" => (float)$_POST['amount'],
        "description" => $_POST['description'],
        "date" => $_POST['date']
    ];
    writeData($data);
    header("Location:index.php");
    exit;
}

/* ================= DASHBOARD ================= */

$userBanks = array_filter($data['banks'], fn($b) => $b['user_id'] == $userId);
$userTransactions = array_filter($data['transactions'], fn($t) => $t['user_id'] == $userId);

$totalReceita = 0;
$totalDespesa = 0;

foreach ($userTransactions as $t) {
    if ($t['type'] == "RECEITA") $totalReceita += $t['amount'];
    if ($t['type'] == "DESPESA") $totalDespesa += $t['amount'];
}

$saldo = $totalReceita - $totalDespesa;
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Sistema Financeiro</title>
    <style>
        body {
            font-family: Arial;
            background: #F4F7F9;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 900px;
            margin: auto;
        }

        .card {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .top-total {
            background: #6FA8DC;
            color: #fff;
            font-size: 24px;
            text-align: center;
        }

        .receitas {
            background: #93C47D;
            color: #fff;
        }

        .despesas {
            background: #fff;
            border-left: 6px solid #E06666;
        }

        button {
            background: #6FA8DC;
            color: #fff;
            border: none;
            padding: 6px 10px;
            border-radius: 6px;
            cursor: pointer;
        }

        input,
        select {
            padding: 6px;
            margin: 4px 0;
            width: 100%;
        }

        .bank-item {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
        }

        .arrow {
            color: #E06666;
            font-weight: bold;
        }

        .logout {
            float: right;
        }
    </style>
</head>

<body>
    <div class="container">

        <?php if (!$userId): ?>

            <div class="card">
                <h2>Login</h2>
                <?php if ($error): ?><p style="color:red"><?= $error ?></p><?php endif; ?>
                <form method="POST">
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Senha" required>
                    <button name="login">Entrar</button>
                </form>
            </div>

        <?php else: ?>

            <a class="logout" href="?logout=1">Sair</a>

            <!-- TOTAL GERAL -->
            <div class="card top-total">
                Total Disponível<br>
                R$ <?= number_format($saldo, 2, ',', '.') ?>
            </div>

            <!-- RECEITAS -->
            <div class="card receitas">
                <h3>Entradas</h3>
                R$ <?= number_format($totalReceita, 2, ',', '.') ?>
            </div>

            <!-- DESPESAS -->
            <div class="card despesas">
                <h3>Saídas</h3>
                R$ <?= number_format($totalDespesa, 2, ',', '.') ?>
            </div>

            <!-- BANCOS -->
            <div class="card">
                <h3>Bancos</h3>

                <?php foreach ($userBanks as $b): ?>
                    <div class="bank-item">
                        <?= e($b['name']) ?>
                        <a href="?delete_bank=<?= $b['id'] ?>">❌</a>
                    </div>
                <?php endforeach; ?>

                <form method="POST">
                    <input name="bank_name" placeholder="Novo banco (Nubank, Itaú, Caixa...)">
                    <button name="add_bank">Adicionar Banco</button>
                </form>
            </div>

            <!-- NOVA TRANSAÇÃO -->
            <div class="card">
                <h3>Nova Transação</h3>
                <form method="POST">
                    <select name="bank_id">
                        <?php foreach ($userBanks as $b): ?>
                            <option value="<?= $b['id'] ?>"><?= e($b['name']) ?></option>
                        <?php endforeach; ?>
                    </select>

                    <select name="type">
                        <option value="RECEITA">Receita</option>
                        <option value="DESPESA">Despesa</option>
                    </select>

                    <input type="number" step="0.01" name="amount" placeholder="Valor" required>
                    <input type="text" name="description" placeholder="Descrição">
                    <input type="date" name="date" required>
                    <button name="add_transaction">Adicionar</button>
                </form>
            </div>

            <!-- LISTA TRANSAÇÕES -->
            <div class="card">
                <h3>Histórico</h3>
                <?php foreach ($userTransactions as $t): ?>
                    <div>
                        <?= $t['type'] == "DESPESA" ? "<span class='arrow'>↓</span>" : "" ?>
                        <?= e($t['date']) ?> -
                        <?= e($t['description']) ?> -
                        R$ <?= number_format($t['amount'], 2, ',', '.') ?>
                    </div>
                <?php endforeach; ?>
            </div>

        <?php endif; ?>

    </div>
</body>

</html>