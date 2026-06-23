<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
withPatientLogin();
$patient = currentPatient();
$board = getAppointmentBoard(date('Y-m-d'));
$upcomingStmt = getPDO()->prepare('SELECT * FROM appointments WHERE patient_id = :patient_id AND date >= :today ORDER BY date, start_time');
$upcomingStmt->execute([':patient_id' => $patient['id'], ':today' => date('Y-m-d')]);
$upcoming = $upcomingStmt->fetchAll(PDO::FETCH_ASSOC);
$error = $_GET['error'] ?? null;
$success = $_GET['success'] ?? null;
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do paciente | PsicoABA</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div class="container">
    <header class="header">
        <div class="brand">
            <img src="assets/images/aba-heart.svg" alt="Logo ABA">
            <div>
                <h1>Portal do paciente</h1>
                <p>Agende sua consulta ABA em horários de 50 minutos.</p>
            </div>
        </div>
        <a class="button" href="auth.php?action=logout">Sair</a>
    </header>

    <?php if ($success === '1'): ?>
        <div class="status success">Atendimento agendado com sucesso.</div>
    <?php elseif ($error === '1'): ?>
        <div class="status error">Preencha data e horário corretamente.</div>
    <?php elseif ($error === '2'): ?>
        <div class="status error">Horário indisponível. Escolha outro intervalo.</div>
    <?php endif; ?>

    <div class="grid grid-2">
        <div class="card">
            <h2>Bem-vindo, <?= htmlentities($patient['name'], ENT_QUOTES, 'UTF-8') ?></h2>
            <p>Código de paciente: <strong><?= htmlentities($patient['patient_code'], ENT_QUOTES, 'UTF-8') ?></strong></p>
            <p>Contato: <?= htmlentities($patient['contact'], ENT_QUOTES, 'UTF-8') ?></p>
            <p>Idade: <?= getPatientAge($patient['birthdate']) ?> anos</p>
            <p>O agendamento considera 50 minutos de consulta, com possibilidade de repetir todas as terças se selecionado.</p>
        </div>

        <div class="card">
            <h3>Próximas consultas</h3>
            <?php if (count($upcoming) === 0): ?>
                <p>Ainda não há consultas agendadas.</p>
            <?php else: ?>
                <ul style="padding-left: 1rem; margin: 0;">
                    <?php foreach ($upcoming as $appointment): ?>
                        <li><?= date('d/m/Y', strtotime($appointment['date'])) ?> às <?= $appointment['start_time'] ?> (50 min)</li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </div>

    <div class="grid grid-2">
        <div class="card">
            <h2>Agendar nova consulta</h2>
            <form action="process.php?task=book" method="post">
                <label>
                    Data da consulta
                    <input id="appointment-date" type="date" name="date" required min="<?= date('Y-m-d') ?>">
                </label>
                <label>
                    Horário de início
                    <select name="time" required>
                        <?php foreach (parseSlots() as $slot): ?>
                            <option value="<?= $slot ?>"><?= $slot ?></option>
                        <?php endforeach; ?>
                    </select>
                </label>
                <div id="repeat-wrapper" style="display:none; margin-top: 1rem;">
                    <label class="label-inline">
                        <input type="checkbox" name="repeat" value="1">
                        Repetir todas as terças-feiras
                    </label>
                </div>
                <button class="primary" type="submit">Agendar consulta</button>
            </form>
        </div>

        <div class="card">
            <h2>Quadro de horários</h2>
            <p>Os horários marcados aparecem com o nome do paciente. As consultas têm 50 minutos.</p>
            <div class="schedule-board">
                <?php foreach ($board as $day): ?>
                    <div class="day-card">
                        <h4><?= htmlentities($day['label'], ENT_QUOTES, 'UTF-8') ?></h4>
                        <?php if (count($day['slots']) === 0): ?>
                            <span class="slot available">Nenhum agendamento</span>
                        <?php else: ?>
                            <?php foreach ($day['slots'] as $item): ?>
                                <div class="slot">
                                    <span><?= $item['start_time'] ?></span>
                                    <span class="badge"><?= htmlentities($item['patient_name'], ENT_QUOTES, 'UTF-8') ?></span>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <div class="card">
        <h2>Agente de psicologia</h2>
        <p>Use o assistente para receber dicas simples de rotina ABA.</p>
        <textarea placeholder="Digite um tema, por exemplo: transição entre atividades, reforço positivo ou rotina de mesa."></textarea>
        <button class="primary" data-agent="psychology">Pedir sugestão</button>
        <div class="agent-output" style="margin-top: 1rem; color: #1f2937;"></div>
    </div>

    <footer>
        <p>Use o código de paciente para retornar ao portal e agendar sua próxima sessão.</p>
    </footer>
</div>
<script src="assets/js/app.js"></script>
</body>
</html>
