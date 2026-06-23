<?php
require_once __DIR__ . '/config.php';
$abaDescription = getMetaText('aba_description', 'O ABA (Análise do Comportamento Aplicada) é uma abordagem terapêutica centrada em comportamentos observáveis e reforço positivo para melhorar autonomia e qualidade de vida.');
if (currentUser()) {
    header('Location: admin.php');
    exit;
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PsicoABA | Agendamento</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div class="container">
    <header class="header">
        <div class="brand">
            <img src="assets/images/aba-heart.svg" alt="Logo ABA">
            <div>
                <h1>PsicoABA</h1>
                <p>Agendamento inteligente para psicóloga ABA</p>
            </div>
        </div>
        <a class="button" href="register.php">Cadastrar paciente</a>
    </header>

    <div class="grid grid-2">
        <div class="card">
            <h2>Login administrativo</h2>
            <p>Use seu e-mail e senha para acessar o painel de administração.</p>
            <?php if (!empty($_GET['error'])): ?>
                <div class="status error">Credenciais inválidas ou acesso negado.</div>
            <?php endif; ?>
            <form action="auth.php" method="post">
                <input type="hidden" name="mode" value="admin">
                <label>
                    E-mail
                    <input type="email" name="email" required placeholder="admin@psicoaba.com">
                </label>
                <label>
                    Senha
                    <input type="password" name="password" required placeholder="Senha segura">
                </label>
                <button class="primary" type="submit">Entrar como psicóloga</button>
            </form>
        </div>

        <div class="card">
            <h2>Login do paciente</h2>
            <p>Entre com o código de paciente para agendar ou revisar consultas.</p>
            <?php if (!empty($_GET['patient_error'])): ?>
                <div class="status error">Código de paciente inválido. Verifique e tente novamente.</div>
            <?php endif; ?>
            <form action="auth.php" method="post">
                <input type="hidden" name="mode" value="patient">
                <label>
                    Código do paciente
                    <input type="text" name="patient_code" required placeholder="EXEMPLO123" maxlength="16">
                </label>
                <button class="primary" type="submit">Acessar portal do paciente</button>
            </form>
        </div>
    </div>

    <section class="card">
        <div class="grid grid-2">
            <div>
                <h2>O que é ABA?</h2>
                <p><?= htmlentities($abaDescription, ENT_QUOTES, 'UTF-8') ?></p>
                <a class="button" href="register.php">Cadastrar um novo paciente</a>
            </div>
            <div>
                <img src="assets/images/aba-graph.svg" alt="ABA gráfico" style="width: 100%; max-width: 320px;">
            </div>
        </div>
    </section>

    <footer>
        <p>Projeto simples para agendamento de psicóloga especialista em ABA. Sistema preparado para localhost e servidor PHP.</p>
    </footer>
</div>
<script src="assets/js/app.js"></script>
</body>
</html>
