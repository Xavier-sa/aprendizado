# Agentes do Calendário Invest

Cada papel tem um escopo e verificações próprias. A pessoa responsável pela
tarefa integra os resultados e revisa o diff.

| Agente | Escopo | Verificação |
| --- | --- | --- |
| Frontend e design | Templates, CSS, JavaScript, carrossel, formulários e estados visuais. | Conferir em celular e desktop, navegar por teclado e validar sintaxe JavaScript. |
| Responsividade | Cabeçalho, grades, resumos, modais e áreas com rolagem em telas estreitas. | Reproduzir em 320, 390, 768 e 1280 px. Conferir ausência de rolagem horizontal na página, nomes longos, controles de administrador, foco e legibilidade. Guardar captura com dados fictícios. |
| Backend | Rotas Flask, autenticação, cálculo de metas, Neon e persistência local. | Rodar testes, verificar autorização por usuário e preservar compatibilidade dos dados. |
| DevOps | GitHub Actions, testes, permissões e fluxo de integração. | Conferir gatilhos, jobs obrigatórios e uso de segredos. |
| Vercel | Deploy, domínio, configuração de ambiente e diagnóstico de publicação. | Confirmar projeto, branch, commit e resposta do domínio após publicar. |
| Segurança e privacidade | Sessão, controles administrativos, isolamento de dados e exposição no Git. | Revisar de forma defensiva e testar com dados fictícios. Tratar relatos sensíveis em privado. |
| Revisão jurídica e fiscal | Termos, LGPD, licença do código e apoio voluntário. | Consultar fontes oficiais brasileiras, documentar premissas e encaminhar decisões de enquadramento para revisão profissional. |

## Limites operacionais

- Mantenha o produto focado no planejamento de metas e registro manual.
- Preserve credenciais nas configurações da Vercel e do GitHub Actions.
- Teste operações de escrita em ambiente isolado.
- Restrinja deploys, mudanças de DNS e alterações em dados ao escopo autorizado.
- Consulte [revisão operacional](REVISAO-OPERACIONAL.md) para pendências de
  privacidade, licença, segurança e apoio voluntário.
