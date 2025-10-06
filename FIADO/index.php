<?php
// config.php - Configuração do banco de dados
$host = 'localhost';
$dbname = 'sistema_fiado';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}

// Processar ações
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['acao'])) {
        switch ($_POST['acao']) {
            case 'add_cliente':
                $stmt = $pdo->prepare("INSERT INTO clientes (nome, telefone) VALUES (?, ?)");
                $stmt->execute([$_POST['nome'], $_POST['telefone']]);
                break;
            
            case 'add_compra':
                $stmt = $pdo->prepare("INSERT INTO compras (cliente_id, produto, valor, data_compra, pago) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $_POST['cliente_id'],
                    $_POST['produto'],
                    $_POST['valor'],
                    $_POST['data_compra'],
                    isset($_POST['pago']) ? 1 : 0
                ]);
                break;
            
            case 'editar_compra':
                $stmt = $pdo->prepare("UPDATE compras SET produto = ?, valor = ?, data_compra = ?, pago = ? WHERE id = ?");
                $stmt->execute([
                    $_POST['produto'],
                    $_POST['valor'],
                    $_POST['data_compra'],
                    isset($_POST['pago']) ? 1 : 0,
                    $_POST['compra_id']
                ]);
                break;
            
            case 'marcar_pago':
                $stmt = $pdo->prepare("UPDATE compras SET pago = 1, data_pagamento = CURDATE() WHERE id = ?");
                $stmt->execute([$_POST['compra_id']]);
                break;
            
            case 'marcar_pendente':
                $stmt = $pdo->prepare("UPDATE compras SET pago = 0, data_pagamento = NULL WHERE id = ?");
                $stmt->execute([$_POST['compra_id']]);
                break;
            
            case 'deletar_compra':
                $stmt = $pdo->prepare("DELETE FROM compras WHERE id = ?");
                $stmt->execute([$_POST['compra_id']]);
                break;
        }
        header("Location: " . $_SERVER['PHP_SELF']);
        exit;
    }
}

// Buscar dados para edição
$compra_editar = null;
if (isset($_GET['editar'])) {
    $stmt = $pdo->prepare("SELECT * FROM compras WHERE id = ?");
    $stmt->execute([$_GET['editar']]);
    $compra_editar = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Buscar clientes
$clientes = $pdo->query("SELECT * FROM clientes ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);

// Buscar compras AGRUPADAS por cliente com totais
$filtro_status = isset($_GET['status']) ? $_GET['status'] : '';

$sql = "SELECT 
    cl.id as cliente_id,
    cl.nome as cliente_nome,
    cl.telefone,
    COUNT(c.id) as total_itens,
    SUM(c.valor) as valor_total,
    SUM(CASE WHEN c.pago = 0 THEN c.valor ELSE 0 END) as valor_pendente,
    SUM(CASE WHEN c.pago = 1 THEN c.valor ELSE 0 END) as valor_pago,
    GROUP_CONCAT(
        CONCAT(c.id, '|', c.produto, '|', c.valor, '|', DATE_FORMAT(c.data_compra, '%d/%m/%Y'), '|', c.pago, '|', c.data_compra)
        ORDER BY c.data_compra DESC
        SEPARATOR '@@'
    ) as compras_detalhes
    FROM clientes cl
    LEFT JOIN compras c ON cl.id = c.cliente_id";

if ($filtro_status !== '') {
    $sql .= " WHERE c.pago = " . intval($filtro_status);
}

$sql .= " GROUP BY cl.id, cl.nome, cl.telefone
    HAVING COUNT(c.id) > 0
    ORDER BY cl.nome";

$clientes_compras = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// Calcular totais gerais
$sql_totais = "SELECT 
    COUNT(DISTINCT cliente_id) as total_clientes,
    COUNT(id) as total_compras,
    SUM(valor) as total_geral,
    SUM(CASE WHEN pago = 0 THEN valor ELSE 0 END) as total_pendente,
    SUM(CASE WHEN pago = 1 THEN valor ELSE 0 END) as total_pago
    FROM compras";
$totais_sistema = $pdo->query($sql_totais)->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Controle de Fiado</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f0f0;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background: #2c5f2d;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        
        .header h1 {
            margin-bottom: 5px;
        }
        
        .tabs {
            display: flex;
            background: #e8e8e8;
            border-bottom: 2px solid #ccc;
        }
        
        .tab {
            padding: 12px 24px;
            cursor: pointer;
            background: #e8e8e8;
            border: none;
            border-bottom: 3px solid transparent;
            font-size: 14px;
            font-weight: 500;
        }
        
        .tab.active {
            background: white;
            border-bottom-color: #2c5f2d;
        }
        
        .tab-content {
            display: none;
            padding: 20px;
        }
        
        .tab-content.active {
            display: block;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
        }
        
        th {
            background: #217346;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 10px 12px;
            border: 1px solid #d0d0d0;
        }
        
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        
        tr:hover {
            background: #e8f5e9;
        }
        
        .cliente-row {
            background: #e3f2fd !important;
            font-weight: bold;
            cursor: pointer;
        }
        
        .cliente-row:hover {
            background: #bbdefb !important;
        }
        
        .cliente-row td {
            padding: 15px 12px;
            border-left: 4px solid #1976d2;
        }
        
        .compras-detalhes {
            display: none;
            background: #f5f5f5;
        }
        
        .compras-detalhes.show {
            display: table-row;
        }
        
        .compras-detalhes td {
            padding: 0;
        }
        
        .detalhes-table {
            width: 100%;
            margin: 10px 0;
            background: white;
        }
        
        .detalhes-table th {
            background: #388e3c;
            font-size: 12px;
            padding: 8px;
        }
        
        .detalhes-table td {
            padding: 8px;
            font-size: 13px;
        }
        
        .status {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }
        
        .status.pago {
            background: #c8e6c9;
            color: #2e7d32;
        }
        
        .status.pendente {
            background: #ffcdd2;
            color: #c62828;
        }
        
        .btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            margin: 2px;
        }
        
        .btn-success {
            background: #4caf50;
            color: white;
        }
        
        .btn-warning {
            background: #ff9800;
            color: white;
        }
        
        .btn-danger {
            background: #f44336;
            color: white;
        }
        
        .btn-info {
            background: #2196f3;
            color: white;
        }
        
        .btn-primary {
            background: #2196f3;
            color: white;
            padding: 10px 20px;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #333;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .checkbox-group input {
            width: auto;
        }
        
        .filters {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: flex;
            gap: 15px;
            align-items: flex-end;
        }
        
        .filters .form-group {
            margin-bottom: 0;
            flex: 1;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .summary-card {
            padding: 20px;
            border-radius: 8px;
            color: white;
        }
        
        .summary-card.total {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .summary-card.pendente {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .summary-card.pago {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .summary-card.clientes {
            background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
        }
        
        .summary-card h3 {
            font-size: 14px;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        
        .summary-card .value {
            font-size: 28px;
            font-weight: bold;
        }
        
        .toggle-icon {
            display: inline-block;
            transition: transform 0.3s;
            margin-right: 8px;
        }
        
        .toggle-icon.open {
            transform: rotate(90deg);
        }
        
        .alert {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        
        .alert-info {
            background: #e3f2fd;
            color: #1565c0;
            border-left: 4px solid #1976d2;
        }
        
        .form-edit {
            background: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #ffc107;
            margin-bottom: 20px;
        }
        
        .form-edit h3 {
            color: #f57c00;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📒 Sistema de Controle de Fiado</h1>
            <p>Gerenciamento de contas a receber - Agrupado por Cliente</p>
        </div>
        
        <div class="tabs">
            <button class="tab active" onclick="showTab('compras')">📋 Compras por Cliente</button>
            <button class="tab" onclick="showTab('nova-compra')">➕ Nova Compra</button>
            <button class="tab" onclick="showTab('clientes')">👥 Clientes</button>
        </div>
        
        <!-- ABA COMPRAS AGRUPADAS -->
        <div id="compras" class="tab-content active">
            <h2>Compras Agrupadas por Cliente</h2>
            
            <div class="summary-cards">
                <div class="summary-card total">
                    <h3>💰 Total Geral</h3>
                    <div class="value">R$ <?= number_format($totais_sistema['total_geral'] ?? 0, 2, ',', '.') ?></div>
                </div>
                
                <div class="summary-card pendente">
                    <h3>⏱ Total Pendente</h3>
                    <div class="value">R$ <?= number_format($totais_sistema['total_pendente'] ?? 0, 2, ',', '.') ?></div>
                </div>
                
                <div class="summary-card pago">
                    <h3>✓ Total Pago</h3>
                    <div class="value">R$ <?= number_format($totais_sistema['total_pago'] ?? 0, 2, ',', '.') ?></div>
                </div>
                
                <div class="summary-card clientes">
                    <h3>👥 Clientes c/ Compras</h3>
                    <div class="value"><?= $totais_sistema['total_clientes'] ?? 0 ?></div>
                </div>
            </div>
            
            <form method="GET" class="filters">
                <div class="form-group">
                    <label>Filtrar por Status:</label>
                    <select name="status" onchange="this.form.submit()">
                        <option value="">Todos</option>
                        <option value="0" <?= $filtro_status === '0' ? 'selected' : '' ?>>Apenas Pendentes</option>
                        <option value="1" <?= $filtro_status === '1' ? 'selected' : '' ?>>Apenas Pagos</option>
                    </select>
                </div>
            </form>
            
            <div class="alert alert-info">
                💡 <strong>Dica:</strong> Clique no nome do cliente para expandir e ver os detalhes das compras individuais
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th style="width: 40px;">▶</th>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Qtd. Itens</th>
                        <th>Total Pendente</th>
                        <th>Total Pago</th>
                        <th>TOTAL GERAL</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($clientes_compras as $cc): ?>
                    <tr class="cliente-row" onclick="toggleDetalhes(<?= $cc['cliente_id'] ?>)">
                        <td>
                            <span class="toggle-icon" id="icon-<?= $cc['cliente_id'] ?>">▶</span>
                        </td>
                        <td><strong>👤 <?= htmlspecialchars($cc['cliente_nome']) ?></strong></td>
                        <td><?= htmlspecialchars($cc['telefone'] ?? 'Não informado') ?></td>
                        <td><strong><?= $cc['total_itens'] ?></strong></td>
                        <td style="color: #c62828;">
                            <strong>R$ <?= number_format($cc['valor_pendente'], 2, ',', '.') ?></strong>
                        </td>
                        <td style="color: #2e7d32;">
                            <strong>R$ <?= number_format($cc['valor_pago'], 2, ',', '.') ?></strong>
                        </td>
                        <td style="font-size: 16px; color: #1565c0;">
                            <strong>R$ <?= number_format($cc['valor_total'], 2, ',', '.') ?></strong>
                        </td>
                    </tr>
                    
                    <tr class="compras-detalhes" id="detalhes-<?= $cc['cliente_id'] ?>">
                        <td colspan="7">
                            <table class="detalhes-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produto</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php 
                                    $compras = explode('@@', $cc['compras_detalhes']);
                                    foreach ($compras as $compra_str):
                                        $dados = explode('|', $compra_str);
                                        if (count($dados) >= 6):
                                            list($id, $produto, $valor, $data_fmt, $pago, $data_original) = $dados;
                                    ?>
                                    <tr>
                                        <td><?= $id ?></td>
                                        <td><?= htmlspecialchars($produto) ?></td>
                                        <td><strong>R$ <?= number_format($valor, 2, ',', '.') ?></strong></td>
                                        <td><?= $data_fmt ?></td>
                                        <td>
                                            <span class="status <?= $pago ? 'pago' : 'pendente' ?>">
                                                <?= $pago ? '✓ PAGO' : '⏱ PENDENTE' ?>
                                            </span>
                                        </td>
                                        <td>
                                            <form method="POST" style="display: inline;">
                                                <input type="hidden" name="compra_id" value="<?= $id ?>">
                                                <?php if (!$pago): ?>
                                                    <button type="submit" name="acao" value="marcar_pago" 
                                                            class="btn btn-success" title="Marcar como Pago">
                                                        ✓ Pagar
                                                    </button>
                                                <?php else: ?>
                                                    <button type="submit" name="acao" value="marcar_pendente" 
                                                            class="btn btn-warning" title="Marcar como Pendente">
                                                        ⏱ Pendente
                                                    </button>
                                                <?php endif; ?>
                                            </form>
                                            <a href="?editar=<?= $id ?>" class="btn btn-info" title="Editar">✏ Editar</a>
                                            <form method="POST" style="display: inline;">
                                                <input type="hidden" name="compra_id" value="<?= $id ?>">
                                                <button type="submit" name="acao" value="deletar_compra" 
                                                        class="btn btn-danger" 
                                                        onclick="return confirm('Deseja realmente excluir esta compra?')"
                                                        title="Excluir">
                                                    🗑 Excluir
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php 
                                        endif;
                                    endforeach; 
                                    ?>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <!-- ABA NOVA COMPRA -->
        <div id="nova-compra" class="tab-content <?= $compra_editar ? 'active' : '' ?>">
            <?php if ($compra_editar): ?>
            <div class="form-edit">
                <h3>✏ Editando Compra #<?= $compra_editar['id'] ?></h3>
                <form method="POST">
                    <input type="hidden" name="acao" value="editar_compra">
                    <input type="hidden" name="compra_id" value="<?= $compra_editar['id'] ?>">
                    
                    <div class="alert alert-info">
                        <strong>Cliente:</strong> 
                        <?php
                        $stmt = $pdo->prepare("SELECT nome FROM clientes WHERE id = ?");
                        $stmt->execute([$compra_editar['cliente_id']]);
                        echo htmlspecialchars($stmt->fetchColumn());
                        ?>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Data da Compra: *</label>
                            <input type="date" name="data_compra" value="<?= $compra_editar['data_compra'] ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Valor: *</label>
                            <input type="number" name="valor" step="0.01" value="<?= $compra_editar['valor'] ?>" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Produto/Descrição: *</label>
                        <input type="text" name="produto" value="<?= htmlspecialchars($compra_editar['produto']) ?>" required>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <input type="checkbox" name="pago" id="pago-edit" <?= $compra_editar['pago'] ? 'checked' : '' ?>>
                        <label for="pago-edit" style="margin: 0;">Já foi pago?</label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">💾 Salvar Alterações</button>
                    <a href="?" class="btn btn-warning">❌ Cancelar</a>
                </form>
            </div>
            <script>
                // Ativar a aba de edição automaticamente
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelectorAll('.tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.getElementById('nova-compra').classList.add('active');
                document.querySelectorAll('.tab')[1].classList.add('active');
            </script>
            <?php endif; ?>
            
            <h2><?= $compra_editar ? 'Ou Registrar Nova Compra' : 'Registrar Nova Compra' ?></h2>
            <form method="POST">
                <input type="hidden" name="acao" value="add_compra">
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Cliente: *</label>
                        <select name="cliente_id" required>
                            <option value="">Selecione...</option>
                            <?php foreach ($clientes as $c): ?>
                                <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['nome']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Data da Compra: *</label>
                        <input type="date" name="data_compra" value="<?= date('Y-m-d') ?>" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Produto/Descrição: *</label>
                    <input type="text" name="produto" placeholder="Ex: Arroz 5kg" required>
                </div>
                
                <div class="form-group">
                    <label>Valor: *</label>
                    <input type="number" name="valor" step="0.01" placeholder="0.00" required>
                </div>
                
                <div class="form-group checkbox-group">
                    <input type="checkbox" name="pago" id="pago">
                    <label for="pago" style="margin: 0;">Já foi pago?</label>
                </div>
                
                <button type="submit" class="btn btn-primary">💾 Salvar Compra</button>
            </form>
        </div>
        
        <!-- ABA CLIENTES -->
        <div id="clientes" class="tab-content">
            <h2>Cadastrar Novo Cliente</h2>
            <form method="POST">
                <input type="hidden" name="acao" value="add_cliente">
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Nome Completo: *</label>
                        <input type="text" name="nome" placeholder="Ex: João Silva" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Telefone:</label>
                        <input type="text" name="telefone" placeholder="(67) 99999-9999">
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary">👤 Cadastrar Cliente</button>
            </form>
            
            <h2 style="margin-top: 30px;">Clientes Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Data Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($clientes as $c): ?>
                    <tr>
                        <td><?= $c['id'] ?></td>
                        <td><strong><?= htmlspecialchars($c['nome']) ?></strong></td>
                        <td><?= htmlspecialchars($c['telefone']) ?></td>
                        <td><?= date('d/m/Y', strtotime($c['data_cadastro'])) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        function showTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
        
        function toggleDetalhes(clienteId) {
            const detalhes = document.getElementById('detalhes-' + clienteId);
            const icon = document.getElementById('icon-' + clienteId);
            
            detalhes.classList.toggle('show');
            icon.classList.toggle('open');
        }
    </script>
</body>
</html>