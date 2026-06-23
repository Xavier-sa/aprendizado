<?php
require_once __DIR__ . '/config.php';
$message = '';
if (!empty($_GET['success'])) {
    $code = htmlentities($_GET['code'] ?? '', ENT_QUOTES, 'UTF-8');
    $message = "Cadastro concluído! Código do paciente: <strong>{$code}</strong>. Use-o para acessar o portal do paciente.";
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de paciente | PsicoABA</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div class="container">
    <header class="header">
        <div class="brand">
            <img src="assets/images/aba-heart.svg" alt="Logo ABA">
            <div>
                <h1>Cadastrar paciente</h1>
                <p>Informações essenciais e consentimento LGPD</p>
            </div>
        </div>
        <a class="button" href="index.php">Voltar</a>
    </header>

    <?php if ($message): ?>
        <div class="status success"><?= $message ?></div>
    <?php endif; ?>

    <div class="card">
        <form action="process.php?task=register" method="post">
            <fieldset>
                <legend>Dados básicos</legend>
                <label>
                    Nome completo
                    <input type="text" name="name" required maxlength="120" placeholder="Nome do paciente">
                </label>
                <label>
                    Data de nascimento
                    <input type="date" name="birthdate" required>
                </label>
                <label>
                    Contato essencial
                    <input type="text" name="contact" required maxlength="80" placeholder="Telefone ou e-mail">
                </label>
            </fieldset>

            <fieldset>
                <legend>Proteção de dados</legend>
                <div class="label-inline">
                    <input type="checkbox" id="consent" name="consent" value="1" required>
                    <label for="consent">Autorizo o uso dos dados para agendamento e acompanhamento terapêutico (LGPD).</label>
                </div>
                <p>Coletamos apenas informações essenciais e respeitamos a privacidade do paciente.</p>
            </fieldset>

            <button class="primary" type="submit">Cadastrar paciente</button>
        </form>
    </div>

    <footer>
        <p>Ao cadastrar, será gerado um código de paciente para acesso ao portal de agendamento.</p>
    </footer>
</div>
<script src="assets/js/app.js"></script>
</body>
</html>
