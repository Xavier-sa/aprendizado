# Auditoria da API OSIRIS (osirisai.live) para o foco Campo Grande - MS

Primeira auditoria: 2026-09-20. Segunda rodada (mais endpoints, reteste de
alguns): 2026-09-20, mesma tarde. Base URL confirmada:
`https://osirisai.live/api`. Fonte da documentação:
https://osirisai.live/docs. Todo endpoint marcado como "testado" abaixo foi
realmente chamado com `curl` — os campos de resposta citados (nomes de
chave, `lat`/`lng`, valores de `source` etc.) vêm dessas respostas reais,
não da documentação, exceto onde indicado explicitamente como
"conforme documentação".

**Nada aqui é sobre `useosiris.ai` ou `osiris-code.com`** — só sobre
`osirisai.live`, que são serviços diferentes.

## Projeto e licença (confirmado)

A OSIRIS é software livre: repositório
[github.com/simplifaisoul/osiris](https://github.com/simplifaisoul/osiris),
descrito como "Open Source Global Intelligence Platform", licenciado sob
**MIT** ("MIT — see LICENSE for details", conforme a própria página do
repositório). Esta POC não copia nem redistribui código-fonte da OSIRIS —
consome apenas a API HTTP pública que ela expõe — então as obrigações da
licença MIT sobre cópia de código não se aplicam ao nosso uso; ainda assim,
o crédito ao projeto está no rodapé da aplicação e na página `/sobre`.

## Autenticação e limites (confirmado)

- Todo endpoint `GET` de leitura usado nesta POC funciona **sem chave**.
- `/api/sdk/ingest` (escrita) exige `SDK_INGEST_KEY`; `/api/github-webhook`
  exige autenticação não especificada. Nenhum dos dois é usado aqui.
- Endpoints de IA (`/api/ai/*`) são limitados a 5 requisições/minuto por IP.
- Cache: a documentação recomenda 45–60s para feeds "rápidos" e até 1 dia
  para referência estática (ex.: infraestrutura, resultados de OSINT). O
  `OsirisClient` desta POC usa exatamente esses valores via `next.revalidate`
  (ver `src/lib/osiris/endpoints.ts`).

## Classificação usada nesta POC

Cada feed consultado para Campo Grande recebe uma de cinco classificações
(`FeedScope`, ver `src/types/index.ts`), calculada em
`src/services/feeds.service.ts` a partir do resultado real da chamada — nunca
atribuída manualmente:

- **LOCAL** — o próprio endpoint foi consultado com as coordenadas de Campo
  Grande e devolveu algo que realmente cobre aquele ponto (hoje:
  `sentinel`, e `region-dossier` quando tem conteúdo).
- **GLOBAL_FILTRADO** — feed mundial com coordenadas por registro,
  filtrado por nós pelo raio de 300km, com pelo menos 1 resultado dentro
  do raio.
- **INDISPONIVEL** — endpoint público e operacional, mas sem nenhum
  registro relevante para Campo Grande agora (seja porque o filtro
  geográfico zerou, seja porque a origem está vazia no mundo todo).
- **GLOBAL** — feed sem coordenadas por registro; serve só de contexto da
  plataforma/mundo, nunca representa Campo Grande.
- **ERRO** — não foi possível consultar o endpoint agora.

## Matriz de endpoints integrados (`FeedKey` + `GlobalFeedKey`)

| Endpoint | Descrição | Dados (campos reais) | Upstream declarado | Filtro geográfico | TTL | Classificação típica | Testado? |
|---|---|---|---|---|---|---|---|
| `/api/flights` | ADS-B ao vivo, 4 baldes + `gps_jamming` (não usado, ver achados extra) | `commercial_flights[]`, `private_flights[]`, `private_jets[]`, `military_flights[]`, cada item com `lat`,`lng`,`alt`,`callsign`,`icao24`,... | `source: "opensky-anon"`; `providers: {opensky, adsbfi_mil, adsbfi_regional}` (do payload) | **Filtrado localmente** | 45-60s | GLOBAL_FILTRADO | ✅ 11675 registros; 1-2 dentro de 300km de CG |
| `/api/satellites` | Posições instantâneas via TLE | `satellites[]` com `lat`,`lng`,`alt`,`name`,`noradId`,`category` | `source: "memory-cache"` (valor exato retornado pela OSIRIS — não é um provedor externo nomeado) | **Filtrado localmente** | 45-60s | GLOBAL_FILTRADO | ✅ 18810 registros; 4-5 dentro de 300km |
| `/api/weather` | Eventos climáticos severos | `events[]` com `lat`,`lng`,`category`,`severity`,`date` | "NASA EONET" (conforme documentação — a resposta não declara `source`) | **Filtrado localmente** | 45-60s | INDISPONIVEL (0 em 300km no dia testado) | ✅ 110 eventos globais |
| `/api/earthquakes` | Sismos recentes | `earthquakes[]` com `lat`,`lng`,`magnitude`,`depth`,`time` (epoch ms) | "USGS" (conforme documentação) | **Filtrado localmente** | 45-60s | INDISPONIVEL (0 em 300km) | ✅ 48 registros globais |
| `/api/fires` | Focos de incêndio | `fires[]` com `lat`,`lng`,`brightness`,`frp`,`date`,`time` (HHmm) | `source: "NASA-FIRMS (VIIRS)"` (do payload) | **Filtrado localmente** | 45-60s | INDISPONIVEL (0 em 300km no dia testado; potencialmente relevante em época de queimadas no Pantanal) | ✅ 1999 registros globais |
| `/api/cctv` | Câmeras públicas | `cameras[]` com `lat`,`lng`,`name`,`city`,`stream_url`/`external_url`; agregado `sources: {...}` por provedor | por câmera, via `metadata.source` (ex.: "SkylineWebcams", "YouTube Live") | **Filtrado localmente** (parâmetro nativo "region/radius" testado e descartado — ver achados extra) | 45-60s | INDISPONIVEL (0 em 300km; 2 em 600km) | ✅ 38668 registros globais |
| `/api/infrastructure` | Infraestrutura estratégica fixa | `infrastructure[]` com `lat`,`lng`,`name`,`status`,`owner` | não declarado (nem no payload nem na documentação) | **Filtrado localmente** | 1 dia | INDISPONIVEL (0 em 300km; amostra é majoritariamente usinas europeias/ucranianas) | ✅ 64 registros globais |
| `/api/maritime` | Portos, chokepoints, navios | `ports[]`, `chokepoints[]`, `ships[]` | não declarado | **Filtrado localmente** | 45-60s | INDISPONIVEL (Campo Grande não é costeira) | ✅ 0 em 300km |
| `/api/radar` | Interferência de GPS / quedas de rede | `outages[]` com `lat`,`lng`,`country`,`level`,`from`/`until` (epoch s) | `source: "IODA — Georgia Tech Internet Outage Detection"` (do payload) | **Filtrado localmente** | 45-60s | INDISPONIVEL (eventos concentrados em zonas de conflito) | ✅ 6 registros globais |
| `/api/gdelt` | Incidentes geocodificados globais | `events[]` com `lat`,`lng`,`name`,`type`,`url` | `source: "GDACS RSS API"` (do payload) | **Filtrado localmente** | 45-60s | INDISPONIVEL (0 em 300km, 1 em 600km) | ✅ 413 eventos globais — este número é o mesmo `incidents: 413` de `/api/stats` |
| `/api/conflicts` | Zonas de conflito ativo + incidentes aninhados | `zones[]` (cada uma com `lat`,`lng`,`events[]` próprios com `lat`,`lng`) | não declarado | **Filtrado localmente** (achatamos zona + eventos) | 45-60s | INDISPONIVEL — nenhuma das 15 zonas listadas (Ucrânia, Gaza, Sudão, Mianmar, Iêmen, Síria, RDC, Mar Vermelho, Taiwan, Coreia, Sahel, Somália, Iraque, Etiópia, Líbano) é no Brasil | ✅ 15 zonas testadas |
| `/api/air-quality` | Estações terrestres de qualidade do ar | `stations[]` (schema não confirmado — ver nota) | não declarado | Filtro geográfico não aplicável (0 estações no total) | 45-60s | INDISPONIVEL — vazio no MUNDO TODO, retestado 2x, sempre `{"stations":[],"total":0}` | ✅ HTTP 200, sempre 0 estações |
| `/api/sentinel?lat=&lng=` | Cenas Sentinel-1 (SAR) próximas a um ponto | `scenes[]` com `bbox` (GeoJSON), `datetime`, `thumbnail` (URI `s3://...`, não renderizável) | `source: "element84"` (do payload) | **Sim, nativo** — o único endpoint cujo filtro geográfico por ponto realmente funciona | 45-60s | LOCAL — 3 de 20 cenas cobrem de fato o ponto de Campo Grande | ✅ testado com `lat=-20.4697&lng=-54.6201` |
| `/api/region-dossier?lat=&lng=` | "Resumo de inteligência" para um ponto | `{coordinates, location, country, head_of_state, wikipedia}` | não declarado | Sim, nativo (aceita lat/lng) | 45-60s | Ver nota — resultado mudou entre as duas rodadas de teste | ✅ testado 2x em momentos diferentes |
| `/api/space-weather` | Clima espacial (geomagnético + erupções solares) | escalares (`kp_index`, `solar_flares[]`) | NOAA SWPC (conforme documentação) | Não aplicável (sem coordenadas) | 45-60s | GLOBAL | ✅ HTTP 200 |
| `/api/stats` | Contadores agregados globais de todos os feeds | `{flights, sats, cctv, weather, nuclear, incidents}` | — | Não aplicável | 45-60s | GLOBAL | ✅ HTTP 200 |
| `/api/country-risk` | Risco por país (lista curada, não é "todos os países") | `countries[]` com `code`,`risk_score`,`risk_level`,`tags` (20 países) | `basis: "editorial"` por país | Não aplicável (por país, não por cidade) | 45-60s | GLOBAL — testado: **Brasil (BR) não está entre os 20 países da lista** | ✅ HTTP 200, 20 países |
| `/api/health` | Liveness probe (não é dado, usado só no indicador de status da API) | `{status, version, uptime_seconds}` | — | Não aplicável | rápido | uso interno | ✅ HTTP 200 |

### ⚠️ Nota sobre `/api/region-dossier`: o resultado mudou entre as duas rodadas de teste

Na primeira auditoria (2026-09-20, mais cedo), consultar
`/api/region-dossier?lat=-20.4697&lng=-54.6201` devolveu **tudo vazio/nulo**:
`location: {}`, `country: null`, `wikipedia: null`.

Testando de novo, mais tarde no mesmo dia (3 chamadas consecutivas, todas
consistentes), o mesmo endpoint com as mesmas coordenadas passou a devolver:

```json
{
  "location": { "city": "", "state": "Mato Grosso do Sul", "country": "Brasil", "country_code": "BR" },
  "wikipedia": { "title": "Brazil", "extract": "Brazil, officially the Federative Republic of Brazil, ..." }
}
```

`country` e `head_of_state` continuam `null` nas duas rodadas — só
`location` e `wikipedia` vieram preenchidos na segunda. Registramos as duas
observações em vez de apagar a primeira, porque isso é um dado real sobre a
API: **o resultado de `region-dossier` não é estável/determinístico** (é
plausível que dependa de cache de geocodificação reversa se aquecendo, ou
de disponibilidade momentânea de um serviço upstream). A interface reflete
o estado ATUAL a cada consulta (via `fetchRegionDossier` em
`feeds.service.ts`), nunca um valor fixo — se a OSIRIS voltar a não ter
dado para este ponto, a aplicação mostra isso automaticamente. Importante:
mesmo quando populado, o conteúdo é sobre o **país/estado** (Brasil / Mato
Grosso do Sul), não especificamente sobre o município de Campo Grande — a
interface deixa isso explícito.

### Endpoints existentes na API mas **não integrados** nesta POC (com o motivo)

| Endpoint(s) | Motivo de não integrar agora |
|---|---|
| `/api/osint/dns`, `/whois`, `/certs`, `/ip`, `/shodan`, `/bgp`, `/mac`, `/phone`, `/github`, `/leaks`, `/hudsonrock`, `/cve`, `/sanctions`, `/threats`, `/sweep` | Ferramentas de OSINT sobre um **assunto específico** (domínio, IP, e-mail, telefone, pessoa), não sobre uma cidade. Adjacentes a rastreamento/correlação de indivíduos — vedado pela seção de privacidade do pedido. |
| `/api/scanner` (Recon Scanner) | Gera tráfego ativo contra um alvo nomeado. Ferramenta ofensiva/dual-use sem contexto de autorização para esta POC. |
| `/api/entity/expand` | Mesmo ecossistema de grafo de entidades do OSINT toolkit; sem alvo relevante para Campo Grande. |
| `/api/cyber-threats`, `/api/cyber-attacks`, `/api/malware`, `/api/malware/stream` | Geolocalização **por IP**, notoriamente imprecisa a nível de cidade — plotar "malware perto de Campo Grande" a partir de geo-IP seria enganoso. |
| `/api/frontlines` | Testado: devolve GeoJSON de **polígonos** (627KB), não pontos — exigiria um pipeline de renderização de mapa totalmente diferente do usado para os demais feeds. Todas as frentes são em zonas de guerra estrangeiras (mesma lista de `/api/conflicts`); mesmo com o esforço de suportar polígonos, não haveria nenhum resultado para o Brasil. Excluído por custo/benefício, não por preguiça. |
| `/api/ai/analyze`, `/api/ai/briefing`, `/api/ai/overview` | POST, limitados a 5/min, exigem construir um "contexto" de entrada. Candidato a v2 (ex.: resumo diário a partir dos feeds já coletados). |
| `/api/sdk/ingest`, `/api/sdk/stream`, `/api/github-webhook` | Infraestrutura de escrita/ingestão de terceiros; não cabe numa POC somente leitura. |
| `/api/news`, `/api/live-news`, `/api/markets`, `/api/crypto`, `/api/scm-suppliers` | Sem coordenadas por registro — não filtráveis por cidade. |
| `/api/arcgis` | "Consulta um feature service configurado" — precisa de configuração adicional que não temos/conhecemos; não testado. |
| `/api/proxy-tiles` | Proxy de tiles de mapa; usamos OpenStreetMap diretamente em vez de um proxy não documentado. |
| `/api/geo` | Geolocaliza **quem está chamando a API** pelo IP — é sobre o visitante, não sobre Campo Grande (o foco geográfico desta POC é sempre o ponto fixo da cidade). |
| `/api/cctv/stream-status`, `/api/cctv/proxy` | Utilidades de status/proxy de um stream específico; nesta versão só linkamos a URL externa da câmera (menos superfície de risco/CORS). Candidato a v2. |

### Achados extra durante os testes

- **`/api/flights` também retorna um balde `gps_jamming`** dentro da mesma
  resposta, não documentado na tabela de parâmetros. Não incorporado ao
  feed "voos" para não confundir com `/api/radar`, que cobre o mesmo tipo
  de fenômeno de forma dedicada.
- **O parâmetro "region/radius" de `/api/cctv` foi testado e descartado.**
  Chamando `/api/cctv?lat=-20.4697&lng=-54.6201&radius=50` a resposta mudou
  (de 38668 para 162 câmeras), mas todas eram da região nomeada
  `"latam-live"` — a mais próxima estava a **380km** e a mediana a
  **3512km** de Campo Grande. O parâmetro filtra por uma categoria de
  região nomeada (existe um campo `regions` na resposta com valores como
  `"us-west"`, `"latam-live"`, `"turkey"`), não por raio geográfico real a
  partir de lat/lng. Por isso esta POC ignora esse parâmetro e filtra pelo
  `lat`/`lng` que já vem em cada câmera.
- **`/api/country-risk` lista só 20 países "editoriais"** (uma lista
  curada de hotspots, não todos os países do mundo) — Brasil não está
  nela.
- **O `thumbnail` das cenas Sentinel é uma URI `s3://...`**, não uma URL
  `https://` — não renderizável como `<img src>`. Mostrado como
  texto/metadado.
- **O `thumbnail` da Wikipedia dentro de `region-dossier`, ao contrário,
  É uma URL `https://thumb.wikimedia.org/...` renderizável** — por isso
  `next.config.ts` permite esse domínio em `img-src` (única exceção à
  política de só servir imagens de `self`/OpenStreetMap).

## Resumo honesto sobre cobertura geográfica

Com um raio de 300km ao redor do centro de Campo Grande (escolha
documentada em `src/lib/osiris/geo.ts`), a maioria dos feeds com
coordenadas retorna **zero registros dentro do raio** (classificados
`INDISPONIVEL`). Isso não é um bug da integração — é o resultado real de
testar cada endpoint: a OSIRIS é majoritariamente voltada a inteligência
geopolítica/de segurança com forte concentração em zonas de conflito,
grandes hubs de tráfego aéreo/marítimo e infraestrutura crítica do
hemisfério norte. O interior do Brasil, especificamente Mato Grosso do Sul,
tem cobertura esparsa em quase todas as categorias, com exceção parcial de:

- **voos e satélites** (`GLOBAL_FILTRADO` — cobertura global contínua,
  ainda que poucos hits);
- **imagens Sentinel-1** (`LOCAL` — cobertura orbital global, funciona bem
  para CG);
- **region-dossier** (`LOCAL` quando populado — ver nota acima sobre
  instabilidade do resultado).

Isso está refletido na interface (aba "Fontes"): cada feed mostra sua
classificação e uma frase curta explicando o motivo, em vez de esconder a
categoria ou fingir que há dado.
