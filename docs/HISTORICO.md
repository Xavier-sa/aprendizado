# Histórico

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
