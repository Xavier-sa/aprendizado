# Acesso público ao calendário

Antes, o caminho principal levava ao login antes de apresentar o calendário.
Agora, **Experimentar sem conta** abre `/simular` com uma meta de exemplo
editável. O visitante pode marcar valores e acompanhar a árvore de imediato.
`/painel` mantém as metas pessoais e exige autenticação.

A aba armazena no `sessionStorage` um identificador de importação, nome,
valor e números marcados. Não guarda credenciais. O servidor só recebe esses
dados quando o usuário confirma o salvamento em sua conta. Entrar e cadastrar
preservam a ação solicitada com um parâmetro limitado a salvar ou imprimir.

`POST /api/simulacoes` valida os dados, identifica o proprietário pela
sessão e grava uma nova meta. As marcas são registradas como simulação, com
o rótulo **Simulação** no campo de banco. O identificador permite repetir
a requisição na mesma conta sem criar outra meta. Após o sucesso, a aba
limpa o rascunho e abre o painel da conta.

O fluxo oficial de impressão exige login e volta para a simulação sem
salvá-la. O estilo de impressão do visitante exibe a orientação para
entrar. O site não controla ferramentas externas de captura ou impressão.

## Verificação

Os testes Python cobrem acesso público, API privada, retorno de login e
cadastro, validação de entrada, preservação de uma meta existente e
importação idempotente. A verificação de navegador usa uma meta fictícia
e simula o retorno da autenticação e a resposta de salvamento.
Com o servidor local na porta 5000 e Playwright instalado, execute
`node scripts/validar-simulacao.mjs` na pasta `calendario-invest`. O roteiro
também verifica a largura da página em 320, 390, 768 e 1366 px.

- [Antes, tela que precedia o calendário](IMAGENS/simulacao-acesso-anterior.png)
- [Depois, calendário aberto ao visitante](IMAGENS/simulacao-publica.png)
