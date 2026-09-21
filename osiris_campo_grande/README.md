# OSIRIS Campo Grande

Observatório experimental de dados e riscos para **Campo Grande, Mato
Grosso do Sul, Brasil** — reúne, normaliza e apresenta dados públicos e
georreferenciados de várias fontes oficiais para responder a uma pergunta
concreta: **o que está acontecendo em Campo Grande e no entorno agora?**

Combina a [API OSIRIS](https://osirisai.live/docs) (`osirisai.live` — **não**
confundir com `useosiris.ai` ou `osiris-code.com`) com duas fontes
brasileiras oficiais: **INMET** (avisos meteorológicos ativos) e **IBGE**
(identidade territorial do município).

Aplicação independente, na raiz do repositório como irmã de
`bot_wasxtech_finance`, para poder ser publicada separadamente no futuro
(ex.: Vercel com `Root Directory = osiris_campo_grande`).

## Descoberta principal (leia antes de esperar um mapa cheio)

A maioria dos feeds da OSIRIS tem cobertura muito esparsa para o interior do
Brasil — na maior parte do tempo, terremotos, infraestrutura, marítimo,
câmeras, GPS/rede e eventos geocodificados retornam **zero registros**
dentro de qualquer raio razoável. Isso é mostrado explicitamente na
interface (aba "Fontes"), nunca escondido. O que de fato costuma ter dado
real: voos, satélites, imagens Sentinel-1 e — a descoberta mais valiosa
desta segunda fase — **avisos meteorológicos ativos do INMET**, que têm
cobertura oficial e confirmada para Campo Grande. Detalhes e números
testados: [`docs/osiris-api-discovery.md`](docs/osiris-api-discovery.md) e
[`docs/external-sources.md`](docs/external-sources.md).

## O que é a OSIRIS

Um agregador de feeds públicos de "inteligência" — voos ADS-B, satélites,
incêndios, clima espacial, câmeras públicas, infraestrutura estratégica,
eventos geocodificados globais, imagens Sentinel-1, e também ferramentas de
OSINT (não usadas aqui). Software livre, MIT,
[github.com/simplifaisoul/osiris](https://github.com/simplifaisoul/osiris).
Esta aplicação não é afiliada oficialmente à OSIRIS, ao INMET ou ao IBGE —
consome só as APIs públicas de cada um. Auditoria completa dos 17 endpoints
da OSIRIS testados em
[`docs/osiris-api-discovery.md`](docs/osiris-api-discovery.md); pesquisa das
fontes brasileiras adicionais (incluindo as não integradas, e por quê) em
[`docs/external-sources.md`](docs/external-sources.md). Metodologia,
proveniência e créditos completos também em `/sobre` dentro da aplicação.

## Arquitetura

```text
browser
   ↓ (fetch para /api/osiris/*, mesma origem)
Next.js server (API routes)
   ↓                              ↓                    ↓
OsirisClient                InmetClient            IbgeClient
   ↓                              ↓                    ↓
OSIRIS (osirisai.live)  INMET (apiprevmet3...)  IBGE (servicodados...)
```

O browser nunca fala diretamente com nenhuma das três fontes. Cada cliente
tem timeout, erro tipado e cache em memória próprios (documentado em cada
arquivo — o cache do Next.js recusa respostas grandes, ver
`src/lib/osiris/client.ts`).

```text
src/
  app/
    page.tsx                  — monta <CampoGrandeApp />
    sobre/page.tsx             — "Sobre o projeto" (metodologia, proveniência, fontes e créditos)
    icon.svg, apple-icon.png   — favicon "WX"
    api/osiris/feeds/         — proxy: feeds geográficos da OSIRIS + INMET, raio escolhido pelo usuário
    api/osiris/global/        — proxy: contexto global da OSIRIS + region-dossier + health + municipality (IBGE)
  lib/
    osiris/    — client.ts, endpoints.ts, geo.ts (CAMPO_GRANDE + RADIUS_OPTIONS_KM), normalizers.ts
    inmet/     — client.ts (User-Agent de navegador necessário — ver comentário), alerts.ts (filtro por geocode IBGE)
    ibge/      — client.ts
  services/
    feeds.service.ts        — fetchSituationFeeds: combina OSIRIS + INMET num só array
    inmet.service.ts        — avisos ativos → FeedResult
    municipality.service.ts — identidade do município → MunicipalityResult
    snapshot.service.ts     — "O que mudou?": diff em memória entre a consulta atual e a anterior
  types/index.ts             — NormalizedRecord (com geometry opcional), Provenance multi-plataforma, FeedScope, ChangeSummary
  components/
    map/          — MapView (Leaflet: marcadores de ponto + polígonos GeoJSON reais), LayerToggle
    dashboard/    — SituacaoAgora (home), RadiusSelector, ChangeSummaryPanel, MetricsPanel, FeedStatusList, modulesConfig (3 módulos)
    explorer/     — DataExplorer, RecordDetail
    CampoGrandeApp.tsx — abas (Situação/Camadas/Painel/Fontes/Explorar), responsivo
docs/
  osiris-api-discovery.md  — auditoria completa da API OSIRIS
  external-sources.md      — pesquisa de fontes brasileiras (integradas e descartadas, com motivo)
```

## Como executar

```bash
npm install
cp .env.example .env.local   # opcional — todos os endpoints usados funcionam sem chave
npm run dev
```

Abra http://localhost:3000.

## Variáveis de ambiente

Nenhuma é obrigatória — todo endpoint usado (OSIRIS, INMET, IBGE) é
público. Ver `.env.example`: `OSIRIS_BASE_URL`/`OSIRIS_API_KEY` reservadas
para o caso de a OSIRIS passar a exigir chave. `.env`/`.env.local` são
ignorados pelo git.

## Os três módulos

A home ("Situação agora") organiza tudo em três perguntas, não em uma
galeria de cards por feed:

- **Ambiente & Fogo** — `fires`, `weather`, `sentinel`, `air-quality` (OSIRIS) — existe risco ambiental próximo?
- **Cidade & Mobilidade** — `flights`, `cctv`, `infrastructure` (OSIRIS) — há contexto útil de infraestrutura/mobilidade?
- **Situação & Alertas** — `inmet-alerts` (INMET) + `gdelt` (OSIRIS) + "O que mudou?" — existe alerta ativo ou mudança recente?

Feeds sem relevância local comprovada (terremotos, marítimo, radar,
conflitos, risco por país) ficam fora dos três módulos — continuam
auditáveis na aba "Fontes", sem fingir ser "recursos de Campo Grande" que
na prática nunca têm dado local. Classificação de cada feed (`LOCAL` /
`GLOBAL_FILTRADO` / `GLOBAL` / `INDISPONIVEL` / `ERRO`) sempre calculada a
partir do resultado real da chamada, nunca atribuída à mão.

## Raio de busca

O raio (50/100/300/600km) é escolhido pelo usuário na home — muda tudo:
mapa, painel, situação e classificação. A interface nunca diz que a OSIRIS
fez esse filtro geográfico; diz que **o aplicativo encontrou** N registros
naquele raio (a maioria dos feeds da OSIRIS não tem filtro geográfico
próprio — calculamos distância via haversine). Os avisos do INMET usam um
mecanismo diferente e mais preciso: cada aviso já lista oficialmente os
municípios que cobre por código IBGE — filtramos por esse código exato, não
por raio.

## "O que mudou?"

A cada consulta, o servidor compara com a anterior (mesmo raio) e reporta,
por regras determinísticas: novos registros, queda no total, fonte que
voltou/parou de responder, nova cobertura Sentinel. Guardado em memória no
processo do servidor — sem banco de dados (avaliado explicitamente antes de
adicionar um; ver `src/services/snapshot.service.ts` para a limitação
conhecida em ambiente serverless).

## Limitações conhecidas

- A maioria das categorias da OSIRIS fica vazia para Campo Grande na maior
  parte do tempo — mostrado na aba "Fontes", nunca escondido.
- `/api/region-dossier` (OSIRIS) deu resultados diferentes em rodadas de
  teste diferentes no mesmo dia — documentado em detalhe em
  `docs/osiris-api-discovery.md`. A interface sempre mostra o estado ATUAL.
- `/api/air-quality` (OSIRIS) está vazio no mundo todo, não só para Campo
  Grande.
- INMET `apitempo` (dados horários de estação automática) tem estação real
  para Campo Grande (A702) mas o endpoint retorna HTTP 204 sempre —
  documentado em `docs/external-sources.md`, não integrado.
- INPE Queimadas, SIMGEO (Prefeitura de Campo Grande) e IMASUL foram
  pesquisados mas não tinham API pública simples o suficiente para integrar
  sem scraping frágil — ver `docs/external-sources.md`.
- Miniaturas de cenas Sentinel vêm como URI `s3://...`, não renderizável no
  navegador.
- "O que mudou?" não persiste entre invocações separadas de uma função
  serverless — funciona de forma confiável em `next dev`/`next start`.

## Privacidade e segurança

- Nenhum endpoint de OSINT individual foi integrado.
- Nenhuma funcionalidade de rastreamento de pessoa, reconhecimento facial,
  busca por residência ou correlação de indivíduos.
- O foco geográfico é sempre o ponto fixo de Campo Grande, nunca a
  localização de quem usa o app; `Permissions-Policy` desativa
  `geolocation` do navegador.
- Câmeras públicas só apareceriam quando públicas/legítimas/relevantes —
  hoje a OSIRIS não lista nenhuma com cobertura real em Campo Grande.

## Favicon

Ícone "WX" em `src/app/icon.svg` (+ `apple-icon.png`), convenção nativa do
Next.js App Router — sem domínio absoluto embutido.

## Fontes e créditos

POC experimental desenvolvida por Wellington Xavier. Dados e integrações
via **OSIRIS** ([osirisai.live](https://osirisai.live) ·
[código-fonte](https://github.com/simplifaisoul/osiris), MIT), **INMET**
(avisos meteorológicos) e **IBGE** (localidades) — e respectivos
provedores upstream (NASA FIRMS, Element84, OpenSky, IODA/Georgia Tech,
GDACS, via OSIRIS). Não copiamos código-fonte de nenhum deles, só
consumimos APIs públicas. Detalhe completo, inclusive por que as
obrigações de cópia da licença MIT não se aplicam a este uso, em `/sobre`.

## Publicação futura

Preparado para publicação independente (`Root Directory = osiris_campo_grande`).
Nada foi publicado nesta execução — nenhuma alteração no Vercel do
FinanceBot nem em `finance.wasxtech.com.br`.

## Testes

```bash
npm test        # vitest — normalização, filtro geográfico/geocode, "o que mudou", erros de rede/timeout/HTTP, feed vazio
npm run lint
npm run typecheck
npm run build
```

Todas as fontes externas (OSIRIS, INMET, IBGE) são sempre mockadas nos
testes — nenhum deles depende de rede.
