-- ID do cliente WELLINGTON XAVIER
SET @CLIENTE_ID_WX = 35;

-- Inserção de novos serviços e compras
INSERT INTO compras (cliente_id, produto, valor, data_compra, pago, data_pagamento, observacao) VALUES
(
    @CLIENTE_ID_WX, 
    'Consultoria em Compliance e LGPD', 
    1800.00, 
    '2025-08-01', 
    1, 
    '2025-08-25', 
    'Serviço finalizado e quitado.'
),
(
    @CLIENTE_ID_WX, 
    'Desenvolvimento de Módulo de Relatórios (Python/Flask)', 
    3200.00, 
    '2025-09-15', 
    1, 
    '2025-09-29', 
    'Entrega da funcionalidade de BI.'
),
(
    @CLIENTE_ID_WX, 
    'Manutenção Preventiva de Infraestrutura Cloud', 
    450.00, 
    '2025-10-01', 
    0, 
    NULL, 
    'Fatura pendente, vencimento em 20/10/2025.'
),
(
    @CLIENTE_ID_WX, 
    'Análise de Viabilidade de Projeto (Gestão Pública)', 
    850.00, 
    '2025-10-05', 
    0, 
    NULL, 
    'Serviço em andamento.'
),
(
    @CLIENTE_ID_WX, 
    'Licença de Software de Monitoramento (1 ano)', 
    699.90, 
    '2025-10-10', 
    1, 
    '2025-10-11', 
    'Pagamento efetuado via PIX.'
),
(
    @CLIENTE_ID_WX, 
    'Revisão e Otimização de Código Front-end (JS)', 
    1250.00, 
    '2025-10-11', 
    0, 
    NULL, 
    'Aguardando aprovação final do cliente.'
),
(
    @CLIENTE_ID_WX, 
    'Mentoria em Arquitetura de Software (4h)', 
    600.00, 
    '2025-10-11', 
    0, 
    NULL, 
    'Sessão agendada para 15/10/2025.'
);

-- Consulta para verificar as compras do Wellington Xavier (ID 35)
-- SELECT * FROM compras WHERE cliente_id = 35;