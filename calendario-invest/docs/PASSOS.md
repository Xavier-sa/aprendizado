# Histórico de implementação

## 18 de novembro de 2026

1. Revisei a aplicação Flask, o frontend e a persistência JSON.
2. Mantive a meta editável e o cálculo dinâmico da tabela.
3. Confirmei que o arredondamento cria a menor quantidade capaz de cobrir a
   meta.
4. Preservei os depósitos existentes e a migração do formato JSON anterior.
5. Validei rotas, cálculos, renderização e sintaxe JavaScript.
6. Registrei capturas reais nas resoluções desktop e mobile com Playwright.
7. Organizei a documentação para arquivamento no repositório `aprendizado`.

## Decisões

- A tabela usa valores sequenciais de 1 até `n`.
- A quantidade sempre arredonda para cima quando a soma não alcança a meta
  exatamente.
- A API é a fonte de verdade da meta, da quantidade e do progresso.
- A aplicação mantém dependências mínimas e não usa framework no frontend.
- Ambientes virtuais e arquivos gerados não fazem parte do versionamento.

