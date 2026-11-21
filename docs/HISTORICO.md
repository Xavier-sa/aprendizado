# Histórico

## 2026-11-20 — Cobertura visual completa do glossário

- Ampliado o registro visual de 4 para 50 termos.
- Mantidos os quatro SVGs detalhados e adicionadas 46 cenas específicas geradas pelo componente.
- Cada cena foi vinculada ao exemplo prático do termo, evitando imagens meramente decorativas.
- Preservados pesquisa, semântica dos títulos, teclado, temas e responsividade.

## 2026-11-19 — Glossário visual interativo

- Registrado o estado anterior do glossário como evidência da versão candidata 2.1.0.
- Criados quatro diagramas SVG detalhados para API, JSON, JWT e CORS e cenas visuais específicas para os outros 46 termos.
- Implementado popover genérico operável por mouse, toque e teclado.
- Adicionados fechamento com Escape e clique externo, contenção na tela, temas claro/escuro e movimento reduzido.
- Aprovados 21 testes Playwright; nenhuma release, tag ou publicação foi realizada.

## 2026-11-19 — Recomendação do estudo diário

- Recuperada do histórico a funcionalidade que informava o dia e o tema de estudo por meio de `alert()`.
- Substituído o alerta intrusivo por um aviso acessível dentro do cronograma.
- Adicionado lembrete flutuante de alto contraste para tornar a recomendação perceptível antes de chegar ao cronograma.
- Ampliado o funcionamento de dias úteis para os sete dias e destacado o cartão atual.
- Preservadas as escolhas de status armazenadas localmente.

## 2026-11-19 — Fundamentos e visão sofisticada

- Ampliada a primeira aula com uma progressão entre cinco fundamentos da programação e conceitos de engenharia de software.
- Declarados os pré-requisitos do conteúdo sofisticado para preservar a clareza para iniciantes.
- Expandido o glossário de 37 para 50 termos.
- Versionadas as URLs dos recursos alterados para evitar conteúdo antigo em cache.

## 2026-11-18 — Consistência dos módulos publicados

- Comparados em bytes o HTML, o CSS e os módulos JavaScript locais e publicados; os quatro arquivos estavam idênticos.
- Identificado nas capturas que componentes dinâmicos não eram renderizados enquanto conteúdo legado aparecia no cronograma, comportamento compatível com JavaScript antigo mantido em cache.
- Versionadas as URLs do JavaScript principal e do módulo de conteúdo.
- Identificado que a hospedagem entregava `.js` como `application/x-javascript`; adicionada configuração Apache para responder `application/javascript` e permitir a execução dos módulos ES.
- Nenhum deploy foi realizado nesta etapa.

## 2026-11-17 — Correção do CSS publicado

- Confirmado que HTML e CSS publicados respondem com status 200 e tipos de conteúdo corretos.
- Confirmado que a folha de estilos no servidor é idêntica ao arquivo do repositório.
- Versionada a URL do CSS principal para evitar que navegador ou CDN reutilize uma cópia anterior.
- Nenhum deploy foi realizado nesta etapa.

## 2026-11-17 — Favicon WX 2.0.1

- Adicionado favicon SVG padrão seguindo a identidade visual da plataforma.
- Incluída validação automática do arquivo e do tipo de conteúdo.

## 2026-11-16 — Registro histórico e versionamento

- Formalizadas as referências semânticas 1.0.0 e 2.0.0 sem alterar commits antigos.
- Capturados os estados público e local em quatro resoluções.
- Criados changelog, documentação por versão e galeria estática de evolução.
- Nenhum push ou deploy foi realizado.

## 2026-11-16 — Base WX Academy

- Auditada a aplicação estática e preservados os laboratórios existentes.
- Transformada a página inicial em dashboard educacional responsivo.
- Adicionados trilhas, primeira aula, quiz, cronograma persistente e glossário.
- Criados testes estruturais e responsivos, servidor local, CI, documentação e agentes.
- Nenhum deploy de produção foi realizado.
