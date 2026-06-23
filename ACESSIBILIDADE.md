# Acessibilidade

Este repositorio deve ser compreensivel por pessoas com diferentes niveis de experiencia tecnica e diferentes formas de percepcao visual.

## Principios

- Informacao importante nao deve depender somente de cor.
- Imagens relevantes devem ter texto alternativo.
- Textos devem usar contraste alto entre primeiro plano e fundo.
- Documentos devem ter titulos hierarquicos e listas curtas.
- Caminhos de arquivos devem ser escritos por extenso.
- Interfaces devem ser navegaveis por teclado quando aplicavel.

## Daltonismo

Ao criar telas, imagens ou exemplos visuais:

- Evite usar apenas vermelho e verde para indicar erro e sucesso.
- Combine cor com texto, icone, borda, padrao ou estado.
- Prefira paletas com contraste perceptivel em tons de cinza.
- Teste a leitura em simuladores de protanopia, deuteranopia e tritanopia quando possivel.

## Paleta Recomendada

| Uso | Cor | Observacao |
| --- | --- | --- |
| Fundo escuro | `#0b1220` | Boa base para contraste. |
| Texto principal | `#f8fafc` | Alto contraste no fundo escuro. |
| Texto secundario | `#cbd5e1` | Ainda legivel sem competir com o titulo. |
| Destaque frio | `#38bdf8` | Diferente do amarelo mesmo em baixa saturacao. |
| Destaque quente | `#facc15` | Bom para chamada visual sem depender de vermelho/verde. |
| Apoio | `#0f766e` | Usar com texto branco ou como elemento grafico. |

## Checklist Para Novas Paginas

- A pagina possui `lang="pt-BR"` quando o conteudo estiver em portugues.
- A ordem dos titulos segue `h1`, `h2`, `h3`.
- Links fazem sentido fora do contexto.
- Botoes possuem texto claro ou `aria-label`.
- Campos de formulario possuem `label`.
- Estados de erro e sucesso possuem texto, nao apenas cor.
- O foco de teclado e visivel.
