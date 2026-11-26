# Caderno digital de despesas

A grade anterior reunia muitos campos editáveis em colunas estreitas. Em
celulares, nomes, valores e ações ficavam separados pela rolagem horizontal.
O caderno reúne o mês, os totais e a lista em uma página com rolagem vertical.
As linhas apresentam nome, valor e situação. A edição abre dentro da linha
e os campos complementares ficam em uma seção recolhida.

As capturas usam o mesmo conjunto fictício.

- [Antes, grade administrativa](IMAGENS/despesas-antes.png)
- [Depois, caderno digital](IMAGENS/despesas-depois.png)

## Dados e uso

O servidor calcula os totais com valores decimais e formata a exibição em
reais. O saldo de cada despesa conhecida desconta o total pago e o desconto,
com mínimo de zero. Despesas sem valor são contadas à parte. Um valor
atrasado informado sinaliza atraso enquanto houver saldo. O modelo atual
armazena o total pago por mês e não possui data individual de pagamento.

Contas fixas seguem as regras mensais existentes. O mês seguinte herda
nome, observação e valor previsto, enquanto os dados de pagamento ficam no
mês em que foram lançados. O cadastro vincula a despesa à conta administradora
e grava seu mês inicial na mesma transação. A lista mantém a ordenação
existente e oferece busca por nome e filtro por situação.

## Arquivos e validação

- `app.py` prepara os dados do mês, calcula o resumo e processa cadastro e edição.
- `templates/admin_despesas.html` estrutura o caderno e os formulários.
- `static/caderno-despesas.css` e `static/caderno-despesas.js` concentram estilos e interações da página.
- `static/style.css` deixa de carregar os estilos da antiga grade.
- `tests/test_app.py` cobre resumo, situação, valores em reais, recorrência, cadastro e edição.

Passaram 21 testes Python e a verificação de sintaxe JavaScript. A página
foi renderizada em navegador com dados fictícios em 320 × 568, 360 × 800,
390 × 844, 768 × 1024, 1366 × 768 e 1920 × 1080. Foram verificados ausência
de rolagem horizontal, busca, filtro, abertura por teclado e diálogo de confirmação.
