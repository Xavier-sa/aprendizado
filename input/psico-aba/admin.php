<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
withLogin('admin');
$patients = getPatients();
$totals = getFinanceTotals();
$financeItems = getFinanceItems();
$appointments = getAppointmentBoard(date('Y-m-d'));
$ageGroups = getAgeDistribution();
$consultationCounts = getConsultationCounts();
$abaDescription = getMetaText('aba_description', 'Descreva o ABA aqui para que a psicóloga possa atualizar sempre que necessário.');
$success = $_GET['success'] ?? null;
$error = $_GET['error'] ?? null;
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin | PsicoABA</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div class="container">
    <header class="header">
        <div class="brand">
            <img src="assets/images/aba-heart.svg" alt="Logo ABA">
            <div>
                <h1>Painel Administrativo</h1>
                <p>Gestão de pacientes, finanças e evolução ABA.</p>
            </div>
        </div>
        <a class="button" href="logout.php">Sair</a>
    </header>

    <?php if ($success === 'description'): ?>
        <div class="status success">Texto ABA atualizado com sucesso.</div>
    <?php elseif ($success === 'finance'): ?>
        <div class="status success">Lançamento financeiro registrado.</div>
    <?php elseif ($error === 'finance'): ?>
        <div class="status error">Dados financeiros incompletos ou inválidos.</div>
    <?php endif; ?>

    <nav class="tab-menu">
        <a href="#dashboard" data-section-link="dashboard" class="active">Visão geral</a>
        <a href="#pacientes" data-section-link="pacientes">Pacientes</a>
        <a href="#financas" data-section-link="financas">Finanças</a>
        <a href="#aba" data-section-link="aba">Sobre ABA</a>
        <a href="#agentes" data-section-link="agentes">Agentes</a>
    </nav>

    <section id="dashboard" class="screen active">
        <div class="grid grid-3">
            <div class="card">
                <h3>Pacientes</h3>
                <p><?= count($patients) ?></p>
            </div>
            <div class="card">
                <h3>Receita</h3>
                <p><?= formatCurrency($totals['income']) ?></p>
            </div>
            <div class="card">
                <h3>Saldo</h3>
                <p><?= formatCurrency($totals['balance']) ?></p>
            </div>
        </div>

        <div class="grid grid-2">
            <div class="card chart-card">
                <h3>Distribuição por idade</h3>
                <canvas id="ageChart"></canvas>
                <div class="chart-legend">
                    <?php foreach ($ageGroups as $label => $value): ?>
                        <span><span class="legend-dot" style="background: hsl(<?= rand(190, 250) ?>, 75%, 55%);"></span><?= $label ?> (<?= $value ?>)</span>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="card chart-card">
                <h3>Consultas por paciente</h3>
                <canvas id="consultationChart"></canvas>
                <div class="chart-legend">
                    <?php foreach (array_slice($consultationCounts, 0, 5) as $item): ?>
                        <span><span class="legend-dot" style="background: hsl(<?= rand(0, 60) ?>, 75%, 55%);"></span><?= htmlentities($item['name'], ENT_QUOTES, 'UTF-8') ?> (<?= $item['count'] ?>)</span>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Agenda semanal</h3>
            <div class="schedule-board">
                <?php foreach ($appointments as $day): ?>
                    <div class="day-card">
                        <h4><?= htmlentities($day['label'], ENT_QUOTES, 'UTF-8') ?></h4>
                        <?php if (count($day['slots']) === 0): ?>
                            <span class="slot available">Sem agendamentos</span>
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
    </section>

    <section id="pacientes" class="screen">
        <div class="card">
            <h3>Lista de pacientes</h3>
            <?php if (count($patients) === 0): ?>
                <p>Nenhum paciente cadastrado ainda.</p>
            <?php else: ?>
                <div class="grid grid-2">
                    <?php foreach ($patients as $patient): ?>
                        <div class="card" style="background: #f8fafc;">
                            <h4><?= htmlentities($patient['name'], ENT_QUOTES, 'UTF-8') ?></h4>
                            <p><strong>Idade:</strong> <?= getPatientAge($patient['birthdate']) ?> anos</p>
                            <p><strong>Contato:</strong> <?= htmlentities($patient['contact'], ENT_QUOTES, 'UTF-8') ?></p>
                            <p><strong>Código:</strong> <?= htmlentities($patient['patient_code'], ENT_QUOTES, 'UTF-8') ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <section id="financas" class="screen">
        <div class="grid grid-2">
            <div class="card">
                <h3>Adicionar lançamento</h3>
                <form action="process.php?task=add_finance" method="post">
                    <label>
                        Tipo
                        <select name="type" required>
                            <option value="income">Receita</option>
                            <option value="expense">Despesa</option>
                        </select>
                    </label>
                    <label>
                        Categoria
                        <input type="text" name="category" required placeholder="Ex: consultas, livros, equipamento">
                    </label>
                    <label>
                        Valor
                        <input type="number" step="0.01" min="0.01" name="amount" required placeholder="0.00">
                    </label>
                    <label>
                        Observação
                        <textarea name="note" placeholder="Ex: compra de mesa, jogo didático"></textarea>
                    </label>
                    <button class="primary" type="submit">Salvar lançamento</button>
                </form>
            </div>
            <div class="card">
                <h3>Resumo financeiro</h3>
                <p><strong>Receita:</strong> <?= formatCurrency($totals['income']) ?></p>
                <p><strong>Despesas:</strong> <?= formatCurrency($totals['expense']) ?></p>
                <p><strong>Saldo:</strong> <?= formatCurrency($totals['balance']) ?></p>
                <div style="margin-top: 1rem;">
                    <h4>Últimos lançamentos</h4>
                    <?php if (count($financeItems) === 0): ?>
                        <p>Nenhuma entrada ou saída registrada.</p>
                    <?php else: ?>
                        <ul style="padding-left: 1rem; margin: 0;">
                            <?php foreach ($financeItems as $item): ?>
                                <li><?= htmlentities($item['date'], ENT_QUOTES, 'UTF-8') ?> - <?= htmlentities($item['category'], ENT_QUOTES, 'UTF-8') ?>: <?= formatCurrency($item['amount']) ?> (<?= $item['type'] ?>)</li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <section id="aba" class="screen">
        <div class="card">
            <h3>Texto editável sobre ABA</h3>
            <form action="process.php?task=save_description" method="post">
                <label>
                    Conteúdo sobre ABA
                    <textarea name="description" required><?= htmlentities($abaDescription, ENT_QUOTES, 'UTF-8') ?></textarea>
                </label>
                <button class="primary" type="submit">Atualizar explicação</button>
            </form>
        </div>
    </section>

    <section id="agentes" class="screen">
        <div class="grid grid-2">
            <div class="card agent-card">
                <h3>Agente de Psicologia</h3>
                <p>Receba sugestões rápidas de organização terapêutica ABA.</p>
                <textarea placeholder="Ex: rotina diária, reforço positivo, avaliação de progresso"></textarea>
                <button class="primary" data-agent="psychology">Gerar orientação</button>
                <div class="agent-output" style="margin-top: 1rem; color: #111827;"></div>
            </div>
            <div class="card agent-card">
                <h3>Agente de Finanças</h3>
                <p>Peça dicas sobre controle de receitas, despesas e compras de materiais.</p>
                <textarea placeholder="Ex: custos de brinquedos terapêuticos, balanço mensal, investimento em móveis"></textarea>
                <button class="primary" data-agent="finance">Gerar orientação</button>
                <div class="agent-output" style="margin-top: 1rem; color: #111827;"></div>
            </div>
        </div>
    </section>

    <footer>
        <p>Administre consultas, pacientes e finanças de forma clara para sua prática ABA.</p>
    </footer>
</div>
<script>
    window.dashboardData = {
        ageGroups: <?= json_encode($ageGroups, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT) ?>,
        consultationCounts: <?= json_encode($consultationCounts, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT) ?>
    };
</script>
<script src="assets/js/app.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        if (window.renderCharts) {
            window.renderCharts(window.dashboardData);
        }
    });
</script>
</body>
</html>
