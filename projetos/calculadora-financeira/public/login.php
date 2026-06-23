<?php
require_once '../includes/auth.php';
require_once '../includes/helpers.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['register'])) {
        if (!register($_POST['name'], $_POST['email'], $_POST['password'])) {
            $error = "Email já cadastrado.";
        } else {
            loginUser($_POST['email'], $_POST['password']);
            redirect('dashboard.php');
        }
    }

    if (isset($_POST['login'])) {
        if (!loginUser($_POST['email'], $_POST['password'])) {
            $error = "Credenciais inválidas.";
        } else {
            redirect('dashboard.php');
        }
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="../assets/style.css">
</head>

<body>
    <div class="card">
        <h2>Mini Sistema Financeiro</h2>

        <?php if ($error): ?>
            <p class="error"><?= e($error) ?></p>
        <?php endif; ?>

        <form method="POST">
            <input type="text" name="name" placeholder="Nome (registro)">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Senha" required>
            <button name="login">Entrar</button>
            <button name="register">Registrar</button>
        </form>
    </div>
</body>

</html>