# Fontes públicas pesquisadas além da OSIRIS

Pesquisa feita em 2026-09-21 para o pivô "Observatório de Dados e Riscos".
Cada fonte foi testada de verdade (chamada real, não só lida na documentação)
antes de decidir integrar ou não. Nenhum scraping frágil de HTML foi feito —
quando a única forma de acesso encontrada era assim, a fonte foi documentada
aqui como não integrada, não contornada com um hack.

## Fontes integradas

### INMET — Avisos meteorológicos ativos

- **Nome:** Instituto Nacional de Meteorologia — API de avisos
- **URL oficial:** `https://apiprevmet3.inmet.gov.br/avisos/ativos`
- **Tipo de informação:** avisos meteorológicos oficiais ativos e futuros
  (tempestade, baixa umidade etc.), com polígono de cobertura, severidade,
  riscos e instruções de segurança reais (inclusive telefones da Defesa
  Civil e do Corpo de Bombeiros)
- **Formato:** JSON
- **Frequência de atualização:** não documentada publicamente; tratada como
  atualizável ao longo do dia (cache de 10 min neste projeto, para não
  bater na API a cada poll do cliente)
- **Coordenadas:** sim — cada aviso traz um polígono GeoJSON (`poligono`) e
  listas de municípios/geocodes cobertos
- **Cobertura geográfica:** Brasil inteiro
- **Licença/termos:** API pública do governo federal; sem chave exigida
- **Utilidade concreta:** **alta** — testado em 2026-09-21, havia avisos de
  tempestade e baixa umidade ativos listando Campo Grande - MS
  explicitamente. É a fonte mais diretamente relevante para "Situação &
  Alertas" encontrada nesta pesquisa.
- **Observação técnica real:** sem um `User-Agent` de navegador, o servidor
  derruba a conexão (`ECONNRESET`) antes de responder. Com um `User-Agent`
  comum, funciona normalmente — documentado em `src/lib/inmet/client.ts`.
- **Observação de precisão:** o campo `municipios`/`geocodes` de cada aviso
  é mais confiável que testar "ponto dentro do polígono" — em pelo menos
  dois avisos testados, o polígono não cobria geometricamente Campo Grande
  mas a lista oficial de municípios do próprio aviso incluía a cidade. Por
  isso o filtro usa o geocode, não geometria.

### IBGE — Localidades

- **Nome:** IBGE — API de Localidades
- **URL oficial:** `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/5002704`
- **Tipo de informação:** hierarquia territorial oficial (microrregião,
  mesorregião, UF, região, região imediata) do município
- **Formato:** JSON
- **Frequência de atualização:** praticamente estática (cache de 1 dia)
- **Coordenadas:** não (é metadado administrativo, não geometria)
- **Cobertura geográfica:** todos os municípios do Brasil
- **Licença/termos:** API pública oficial do IBGE, sem chave
- **Utilidade concreta:** média — não é um "dado de risco", mas dá
  identidade territorial oficial e confiável a Campo Grande, sem depender
  do `region-dossier` da OSIRIS (que às vezes devolve tudo vazio — ver
  `docs/osiris-api-discovery.md`).

## Fontes pesquisadas e NÃO integradas (com o motivo)

### INMET — Dados horários de estações automáticas (apitempo)

- **URL testada:** `https://apitempo.inmet.gov.br/estacao/{início}/{fim}/A702`
  (A702 = estação automática de Campo Grande, confirmada real e operante
  via `/estacoes/T`)
- **Testado:** sim, com dois intervalos de data diferentes (incluindo dados
  de um mês antes da consulta)
- **Resultado:** HTTP 204 (sem conteúdo) em todas as tentativas — condição
  já relatada publicamente por outros desenvolvedores que integraram essa
  mesma API
- **Motivo de não integrar:** o endpoint existe e a estação é real, mas os
  dados não vêm; não há como mostrar "temperatura atual" de forma
  confiável hoje. Documentado como limitação real, não escondido.

### INPE — Programa Queimadas (focos de calor no Brasil)

- **URL:** `https://terrabrasilis.dpi.inpe.br/queimadas/portal/dados-abertos/`
- **Tipo de informação:** focos de queimada/incêndio florestal, atualizados
  a cada 10 minutos, dados mais focados no Brasil que o NASA FIRMS global
  (já usado via OSIRIS)
- **Formato disponível:** apenas arquivos CSV com nome baseado em
  data/hora (`focos_10min_AAAAMMDD_HHMM.csv`) numa listagem de diretório
  (`https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/10min/`)
  — sem uma API JSON, sem endpoint "últimos dados"
- **Motivo de não integrar:** para pegar o arquivo mais recente seria
  necessário adivinhar o nome do arquivo pelo horário atual (arriscado —
  fuso horário e atraso de publicação não são triviais) ou fazer parsing
  da página HTML de listagem do diretório. Ambos são "scraping frágil",
  que o pedido explicitamente pediu para evitar quando não há API
  estruturada. Como o NASA FIRMS via OSIRIS já cobre foco de incêndio
  (mesmo que com granularidade global), a ausência do INPE aqui é uma
  lacuna aceitável, documentada — não um bloqueio para o módulo "Ambiente
  & Fogo".

### Prefeitura de Campo Grande — SIMGEO

- **URL:** `http://www.campogrande.ms.gov.br/simgeo/`
- **Tipo de informação:** geoprocessamento municipal (cadastro
  multifinalitário, camadas urbanas)
- **Testado:** tentativa de endpoint GeoServer/WFS padrão
  (`/geoserver/wfs?service=WFS&request=GetCapabilities`) — retornou HTTP
  302 (redirecionamento), sem confirmar um endpoint público sem
  autenticação em tempo hábil de pesquisa
- **Motivo de não integrar:** geoportal existe e é real, mas não foi
  possível confirmar uma API pública simples e estável nesta rodada de
  pesquisa. Não vale a pena tentar contornar autenticação/bloqueios
  (explicitamente vedado pelo pedido).

### IMASUL — Instituto de Meio Ambiente de Mato Grosso do Sul

- **URL:** `https://www.imasul.ms.gov.br/`
- **Tipo de informação:** Sala de Situação com monitoramento de 13 estações
  telemétricas em 8 rios de MS (nível de rio, chuva local) e o sistema
  MADES de alertas de desmatamento
- **Testado:** pesquisa de documentação pública; nenhuma API JSON
  encontrada — os dados são publicados como boletins (PDF/página web)
- **Motivo de não integrar:** sem endpoint estruturado público conhecido;
  integrar exigiria parsing de boletim, que é scraping frágil.

### Defesa Civil de Mato Grosso do Sul

- Não foi encontrada uma API própria e separada — a coordenação estadual é
  citada como destinatária de alertas do IMASUL/INMET, não como uma fonte
  de dados própria com endpoint público. Os telefones de contato da Defesa
  Civil (199) e Corpo de Bombeiros (193) já aparecem nas instruções reais
  dos avisos do INMET, que são exibidas nesta aplicação.

### DATASUS

- Não pesquisado a fundo nesta rodada: dados de saúde pública não se
  encaixam diretamente na pergunta "o que está acontecendo em Campo Grande
  agora" no sentido ambiental/de risco imediato que os três módulos
  cobrem. Mantido como possibilidade futura, não descartado por má
  qualidade — apenas fora do escopo desta primeira integração.

## Resumo

| Fonte | Testada | Integrada | Motivo se não integrada |
|---|---|---|---|
| INMET (avisos) | ✅ | ✅ | — |
| IBGE (localidades) | ✅ | ✅ | — |
| INMET (apitempo, dados horários) | ✅ | ❌ | Endpoint real mas sempre HTTP 204 |
| INPE Queimadas | ✅ | ❌ | Só CSV com nome de arquivo por horário — exigiria scraping frágil |
| SIMGEO (Prefeitura de Campo Grande) | ✅ (parcial) | ❌ | Sem API pública confirmada em tempo hábil |
| IMASUL | ✅ (documentação) | ❌ | Dados publicados como boletim, sem API |
| Defesa Civil MS | ✅ (documentação) | ❌ | Sem API própria encontrada |
| DATASUS | ❌ | ❌ | Fora do escopo desta rodada (saúde, não risco ambiental imediato) |
