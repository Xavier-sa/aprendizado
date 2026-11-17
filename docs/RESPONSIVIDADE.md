# Relatório de responsividade

## Matriz automatizada

O teste `tests/e2e/responsive.spec.js` cobre 320×568, 375×667, 390×844, 768×1024, 1024×768, 1366×768 e 1920×1080. Em cada viewport ele verifica carregamento, título visível e ausência de rolagem horizontal. Também valida abertura do menu mobile e pesquisa do glossário.

As capturas completas são geradas em `test-results/wx-academy-{largura}x{altura}.png` e não são versionadas. Execute:

```bash
npm run test:e2e
```

## Resultado de 16/11/2026

- 7/7 viewports carregaram sem rolagem horizontal não intencional.
- Menu mobile abriu e comunicou seu estado corretamente.
- Pesquisa do glossário retornou termos relacionados e o termo exato.
- 8/8 testes Playwright aprovados.
- Inspeção das capturas de 390×844 e 1366×768 confirmou cartões legíveis, código contido e navegação adaptada.

## Critérios manuais ainda necessários

- Leitura com NVDA ou outro leitor de tela.
- Contraste em monitores reais e zoom de 200%.
- Toque em aparelho físico.
- Laboratórios legados, que ainda não compartilham o novo layout.
