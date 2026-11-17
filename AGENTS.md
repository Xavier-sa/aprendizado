# Regras globais dos agentes

## Missão

Evoluir a WX Academy de forma incremental, segura e pedagogicamente consistente. Os arquivos em `agents/` são instruções para o Codex, não serviços executados pela aplicação.

## Regras obrigatórias

1. Auditar referências antes de apagar, mover ou renomear arquivos.
2. Preservar URLs e funcionalidades legadas até existir teste de compatibilidade.
3. Não adicionar framework, backend, autenticação ou banco sem necessidade comprovada e decisão documentada.
4. Toda aula deve cumprir o contrato de `docs/CONTEUDOS.md`.
5. Nunca inserir segredos, dados pessoais ou credenciais no repositório.
6. Preferir `textContent` para dados; HTML dinâmico exige fonte controlada e justificativa.
7. Manter acessibilidade por teclado, foco visível, contraste e responsividade a partir de 320 px.
8. Executar `npm run check` e `npm test` antes de concluir alterações.
9. Atualizar `docs/HISTORICO.md` e `docs/PROXIMOS_PASSOS.md` quando houver mudança relevante.
10. Deploy exige autorização explícita e permanece separado da CI.

## Colaboração

O agente mentor coordena o objetivo pedagógico; qualidade valida o contrato; segurança revisa riscos; o especialista de domínio responde pelo conteúdo. Conflitos são resolvidos priorizando segurança, clareza para iniciantes e compatibilidade.
