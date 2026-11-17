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

## Política de versionamento

O projeto segue Semantic Versioning: MAJOR para mudança incompatível relevante, MINOR para funcionalidade compatível e PATCH para correção compatível. Uma nova versão oficial representa um marco, não cada commit.

Antes de alterações relevantes:

1. Identificar a versão atual e definir o objetivo da mudança.
2. Registrar o estado inicial e preservar funcionalidades existentes.
3. Implementar mudanças isoladas e executar os testes aplicáveis.
4. Registrar screenshots quando houver impacto visual; sem impacto visual, registrar evidências de testes.
5. Atualizar `CHANGELOG.md`, a documentação da versão, `docs/ROADMAP.md` e `docs/PROXIMOS_PASSOS.md`.
6. Registrar o commit correspondente e verificar consistência antes de criar tag.

Não incluir capturas duplicadas ou arquivos temporários. Tags remotas, push e deploy exigem autorização explícita.

## Colaboração

O agente mentor coordena o objetivo pedagógico; qualidade valida o contrato; segurança revisa riscos; o especialista de domínio responde pelo conteúdo. Conflitos são resolvidos priorizando segurança, clareza para iniciantes e compatibilidade.
