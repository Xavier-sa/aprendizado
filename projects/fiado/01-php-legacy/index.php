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

// Buscar clientes
$clientes = $pdo->query("SELECT * FROM clientes ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);

// Buscar compras com informações do cliente
$filtro_cliente = isset($_GET['cliente']) ? $_GET['cliente'] : '';
$filtro_data = isset($_GET['data']) ? $_GET['data'] : '';
$filtro_status = isset($_GET['status']) ? $_GET['status'] : '';

$sql = "SELECT c.*, cl.nome as cliente_nome FROM compras c 
        INNER JOIN clientes cl ON c.cliente_id = cl.id WHERE 1=1";

if ($filtro_cliente) {
    $sql .= " AND c.cliente_id = " . intval($filtro_cliente);
}
if ($filtro_data) {
    $sql .= " AND c.data_compra = '" . $pdo->quote($filtro_data) . "'";
}
if ($filtro_status !== '') {
    $sql .= " AND c.pago = " . intval($filtro_status);
}

$sql .= " ORDER BY c.data_compra DESC, cl.nome";
$compras = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// Calcular totais por cliente
$sql_totais = "SELECT 
    cl.id,
    cl.nome,
    COUNT(c.id) as total_compras,
    SUM(c.valor) as total_geral,
    SUM(CASE WHEN c.pago = 0 THEN c.valor ELSE 0 END) as total_pendente,
    SUM(CASE WHEN c.pago = 1 THEN c.valor ELSE 0 END) as total_pago
    FROM clientes cl
    LEFT JOIN compras c ON cl.id = c.cliente_id
    GROUP BY cl.id, cl.nome
    ORDER BY cl.nome";
$totais = $pdo->query($sql_totais)->fetchAll(PDO::FETCH_ASSOC);
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .total-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .total-value {
            font-size: 32px;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .summary-card {
            padding: 20px;
            border-radius: 8px;
            color: white;
        }
        
        .summary-card.pendente {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .summary-card.pago {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .summary-card h3 {
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .summary-card .value {
            font-size: 28px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📒 Sistema de Controle de Fiado</h1>
            <p>Gerenciamento de contas a receber</p>
        </div>
        
        <div class="tabs">
            <button class="tab active" onclick="showTab('compras')">📋 Compras</button>
            <button class="tab" onclick="showTab('nova-compra')">➕ Nova Compra</button>
            <button class="tab" onclick="showTab('clientes')">👥 Clientes</button>
            <button class="tab" onclick="showTab('relatorio')">📊 Relatório</button>
        </div>
        
        <!-- ABA COMPRAS -->
        <div id="compras" class="tab-content active">
            <h2>Lista de Compras</h2>
            
            <form method="GET" class="filters">
                <div class="form-group">
                    <label>Cliente:</label>
                    <select name="cliente">
                        <option value="">Todos</option>
                        <?php foreach ($clientes as $c): ?>
                            <option value="<?= $c['id'] ?>" <?= $filtro_cliente == $c['id'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($c['nome']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Data:</label>
                    <input type="date" name="data" value="<?= htmlspecialchars($filtro_data) ?>">
                </div>
                
                <div class="form-group">
                    <label>Status:</label>
                    <select name="status">
                        <option value="">Todos</option>
                        <option value="0" <?= $filtro_status === '0' ? 'selected' : '' ?>>Pendente</option>
                        <option value="1" <?= $filtro_status === '1' ? 'selected' : '' ?>>Pago</option>
                    </select>
                </div>
                
                <div class="form-group" style="display: flex; align-items: flex-end;">
                    <button type="submit" class="btn btn-primary">Filtrar</button>
                </div>
            </form>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($compras as $compra): ?>
                    <tr>
                        <td><?= $compra['id'] ?></td>
                        <td><strong><?= htmlspecialchars($compra['cliente_nome']) ?></strong></td>
                        <td><?= htmlspecialchars($compra['produto']) ?></td>
                        <td><strong>R$ <?= number_format($compra['valor'], 2, ',', '.') ?></strong></td>
                        <td><?= date('d/m/Y', strtotime($compra['data_compra'])) ?></td>
                        <td>
                            <span class="status <?= $compra['pago'] ? 'pago' : 'pendente' ?>">
                                <?= $compra['pago'] ? '✓ PAGO' : '⏱ PENDENTE' ?>
                            </span>
                        </td>
                        <td>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="compra_id" value="<?= $compra['id'] ?>">
                                <?php if (!$compra['pago']): ?>
                                    <button type="submit" name="acao" value="marcar_pago" class="btn btn-success">
                                        Marcar Pago
                                    </button>
                                <?php else: ?>
                                    <button type="submit" name="acao" value="marcar_pendente" class="btn btn-warning">
                                        Marcar Pendente
                                    </button>
                                <?php endif; ?>
                                <button type="submit" name="acao" value="deletar_compra" 
                                        class="btn btn-danger" 
                                        onclick="return confirm('Deseja realmente excluir?')">
                                    Excluir
                                </button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <!-- ABA NOVA COMPRA -->
        <div id="nova-compra" class="tab-content">
            <h2>Registrar Nova Compra</h2>
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
        
        <!-- ABA RELATÓRIO -->
        <div id="relatorio" class="tab-content">
            <h2>Relatório por Cliente</h2>
            
            <?php
            $total_geral_sistema = array_sum(array_column($totais, 'total_geral'));
            $total_pendente_sistema = array_sum(array_column($totais, 'total_pendente'));
            $total_pago_sistema = array_sum(array_column($totais, 'total_pago'));
            ?>
            
            <div class="summary-cards">
                <div class="total-card">
                    <h3>💰 Total Geral</h3>
                    <div class="total-value">R$ <?= number_format($total_geral_sistema, 2, ',', '.') ?></div>
                </div>
                
                <div class="summary-card pendente">
                    <h3>⏱ Total Pendente</h3>
                    <div class="value">R$ <?= number_format($total_pendente_sistema, 2, ',', '.') ?></div>
                </div>
                
                <div class="summary-card pago">
                    <h3>✓ Total Pago</h3>
                    <div class="value">R$ <?= number_format($total_pago_sistema, 2, ',', '.') ?></div>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Qtd. Compras</th>
                        <th>Total Geral</th>
                        <th>Total Pendente</th>
                        <th>Total Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($totais as $t): ?>
                    <tr>
                        <td><strong><?= htmlspecialchars($t['nome']) ?></strong></td>
                        <td><?= $t['total_compras'] ?></td>
                        <td><strong>R$ <?= number_format($t['total_geral'], 2, ',', '.') ?></strong></td>
                        <td style="color: #c62828;">
                            <strong>R$ <?= number_format($t['total_pendente'], 2, ',', '.') ?></strong>
                        </td>
                        <td style="color: #2e7d32;">
                            <strong>R$ <?= number_format($t['total_pago'], 2, ',', '.') ?></strong>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        function showTab(tabName) {
            // Esconder todos os conteúdos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Desativar todas as abas
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Ativar a aba clicada
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
    </script>
</body>
</html>