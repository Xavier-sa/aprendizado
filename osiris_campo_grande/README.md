# OSIRIS Campo Grande

POC exploratória de dados públicos da [API OSIRIS](https://osirisai.live/docs)
(`osirisai.live` — **não** confundir com `useosiris.ai` ou `osiris-code.com`)
com foco fixo em **Campo Grande, Mato Grosso do Sul, Brasil**.

Aplicação independente, na raiz do repositório como irmã de
`bot_wasxtech_finance`, para poder ser publicada separadamente no futuro
(ex.: Vercel com `Root Directory = osiris_campo_grande`).

## O que é a OSIRIS

A OSIRIS é um agregador de feeds públicos de "inteligência" — voos ADS-B,
satélites, terremotos, incêndios, clima espacial, câmeras públicas,
infraestrutura estratégica, tráfego marítimo, eventos geocodificados
globais, imagens de satélite Sentinel-1, e também ferramentas de OSINT
(whois, IP, Shodan etc.) e um scanner de rede. É software livre, licença
**MIT**, código em
[github.com/simplifaisoul/osiris](https://github.com/simplifaisoul/osiris).
Esta POC não é afiliada oficialmente à OSIRIS e usa **apenas os feeds
públicos e somente-leitura que fazem sentido para uma visão geográfica de
uma cidade** — a auditoria completa de todos os endpoints descobertos,
testados e descartados (17 endpoints testados, com valores reais de
resposta) está em
[`docs/osiris-api-discovery.md`](docs/osiris-api-discovery.md). Metodologia,
proveniência e créditos completos também em `/sobre` dentro da aplicação.

## Descoberta principal (leia antes de esperar um mapa cheio)

A maioria dos feeds da OSIRIS tem cobertura muito esparsa para o interior do
Brasil. Com o raio padrão de 300km ao redor de Campo Grande, a maior parte
das categorias (terremotos, incêndios, clima severo, infraestrutura,
marítimo, câmeras, GPS/rede, eventos geocodificados) honestamente retorna
**zero registros** no momento em que você abrir a aplicação — isso é
mostrado explicitamente na interface, nunca escondido. Voos, satélites e
imagens Sentinel-1 normalmente têm alguns resultados reais. Detalhes e
números exatos testados: ver `docs/osiris-api-discovery.md`.

## Arquitetura

```
browser
   ↓ (fetch para /api/osiris/*, mesma origem)
Next.js server (API routes)
   ↓ (OsirisClient)
OSIRIS (osirisai.live/api)
```

O browser nunca fala diretamente com a OSIRIS. Isso importa mesmo os
endpoints usados hoje sendo públicos: se algum dia um deles passar a exigir
`OSIRIS_API_KEY`, só o servidor precisa saber da chave — nada muda no
front-end.

```
src/
  app/
    page.tsx                 — monta <CampoGrandeApp />
    sobre/page.tsx            — página "Sobre o projeto" (metodologia, créditos, licença)
    icon.svg, apple-icon.png  — favicon "WX" (convenção de arquivo do Next.js)
    api/osiris/feeds/        — proxy: os 13 feeds geográficos + filtro local
    api/osiris/global/       — proxy: feeds sem coordenadas (clima espacial, stats, risco por país) + health + region-dossier
  lib/osiris/
    client.ts                — OsirisClient (timeout, erros tipados, User-Agent, cache)
    endpoints.ts              — path/label/TTL/upstream documentado/normalizador de cada feed
    geo.ts                    — haversine, bbox, e a constante única CAMPO_GRANDE {latitude, longitude, defaultRadiusKm}
    normalizers.ts            — um normalizador por feed (formatos bem diferentes entre si)
  services/feeds.service.ts   — fetch + normalização + filtro geográfico + classificação (scope) + proveniência em 2 níveis; nunca lança
  types/index.ts               — NormalizedRecord, Provenance (com upstreamSource), FeedResult (com scope/scopeNote), FeedScope
  components/
    map/          — MapView (Leaflet), LayerToggle
    dashboard/    — useFeeds (polling), MetricsPanel, FeedStatusList ("Fontes monitoradas"), RegionDossierCard
    explorer/     — DataExplorer, RecordDetail (proveniência em 2 níveis)
    CampoGrandeApp.tsx — orquestra mapa + abas (Camadas/Painel/Fontes/Explorar), responsivo, rodapé com créditos
docs/osiris-api-discovery.md — auditoria completa da API (17 endpoints testados, upstream de cada um, 2 rodadas de teste)
```

## Como executar

```bash
npm install
cp .env.example .env.local   # opcional — todos os endpoints usados funcionam sem chave
npm run dev
```

Abra http://localhost:3000.

## Variáveis de ambiente

Nenhuma é obrigatória hoje — todo endpoint usado é público. Ver
`.env.example`:

- `OSIRIS_BASE_URL` — padrão `https://osirisai.live/api`.
- `OSIRIS_API_KEY` — reservada para o caso de a OSIRIS passar a exigir chave
  em algum destes endpoints; hoje fica vazia.

`.env` e `.env.local` são ignorados pelo git.

## Endpoints usados

Ver a tabela completa (com valores de `upstream` reais e as duas rodadas de
teste) em [`docs/osiris-api-discovery.md`](docs/osiris-api-discovery.md).

**13 feeds geográficos** (`FeedKey`, com filtro local por raio de 300km,
exceto `sentinel`, que já aceita `lat`/`lng` e é filtrado por cobertura de
bbox): `flights`, `satellites`, `weather`, `earthquakes`, `fires`, `cctv`,
`infrastructure`, `maritime`, `radar`, `gdelt`, `sentinel`, `conflicts`,
`air-quality`.

**3 feeds de contexto global** (`GlobalFeedKey`, sem coordenadas por
registro): `space-weather`, `stats`, `country-risk`.

**Mais 2 consultas pontuais, fora do sistema de `FeedKey`:** `region-dossier`
(dossiê para as coordenadas de Campo Grande — ver nota abaixo) e `health`
(status da API, mostrado no cabeçalho).

Cada um recebe uma classificação (`LOCAL` / `GLOBAL_FILTRADO` / `GLOBAL` /
`INDISPONIVEL` / `ERRO`) visível na aba **Fontes** da aplicação.

## Limitações conhecidas

- A maioria das categorias fica vazia para Campo Grande na maior parte do
  tempo (ver "Descoberta principal" acima) — isso é uma limitação real da
  cobertura da OSIRIS, não um bug desta POC. É mostrado na aba "Fontes",
  nunca escondido.
- `/api/region-dossier` deu resultados diferentes em duas rodadas de teste
  no mesmo dia: vazio na primeira, com estado/país/resumo da Wikipedia na
  segunda (reprodutível 3x seguidas). O resultado parece não ser estável —
  documentado em detalhe em `docs/osiris-api-discovery.md`. A interface
  sempre mostra o estado ATUAL, nunca um valor fixo.
- `/api/air-quality` está vazio no mundo todo (não só para Campo Grande) em
  todas as tentativas — o schema de estação usado no normalizador é uma
  extração defensiva best-effort, nunca confirmada contra um dado real.
- `/api/frontlines` foi testado mas não integrado: devolve polígonos
  GeoJSON (627KB), não pontos, e cobre só zonas de guerra estrangeiras.
- Câmeras (`cctv`) e infraestrutura não têm timestamp por registro na
  origem — a interface mostra apenas quando a informação foi consultada
  (`fetchedAt`), nunca inventa uma "última atualização" que a OSIRIS não
  forneceu.
- Miniaturas de cenas Sentinel vêm como URI `s3://...`, que o navegador não
  consegue exibir como imagem — mostradas como texto/metadado.
- Streams de câmeras (`stream_url`/`external_url`) são abertos como link
  externo, não incorporados via proxy/iframe nesta primeira versão.

## Fontes públicas possíveis para uma próxima etapa (não integradas agora)

Prefeitura de Campo Grande / dados abertos municipais, IBGE, INMET, INPE
(queimadas oficiais brasileiras), OpenStreetMap (Overpass API para POIs
locais), dados estaduais de MS. Nenhuma foi integrada nesta primeira
execução — a tarefa pediu para não misturar fontes automaticamente.

## Privacidade e segurança

- Nenhum endpoint de OSINT individual (whois, IP, Shodan, e-mail, telefone,
  GitHub, vazamentos, sanções) foi integrado — ver a tabela de endpoints
  não integrados em `docs/osiris-api-discovery.md` e o motivo de cada um.
- Nenhuma funcionalidade de rastreamento de pessoa, reconhecimento facial,
  busca por residência ou correlação de indivíduos existe nesta aplicação.
- `/api/geo` (geolocalização de quem chama a API) não foi usado — o foco
  geográfico é sempre o ponto fixo de Campo Grande, nunca a localização de
  quem está usando o app; `Permissions-Policy` do Next.js também desativa
  `geolocation` do navegador.
- Câmeras públicas exibidas são as mesmas listadas publicamente pela
  OSIRIS (webcams turísticas/de trânsito de fontes como SkylineWebcams,
  YouTube Live, DOTs estaduais) — nenhuma câmera de vigilância privada ou
  residencial.

## Favicon

Ícone "WX" em `src/app/icon.svg` (+ `apple-icon.png` gerado a partir dele
com `sharp`), usando a convenção de arquivo do Next.js App Router — nenhuma
configuração de `<head>` manual, nenhum domínio absoluto embutido. Não
existia nenhum asset de marca "WX" no repositório (nem em
`bot_wasxtech_finance`) antes desta tarefa; o ícone foi criado do zero.

## Créditos e licença

POC experimental desenvolvida por Wellington Xavier, usando dados e APIs
públicas do projeto open source **OSIRIS**
([osirisai.live](https://osirisai.live) ·
[github.com/simplifaisoul/osiris](https://github.com/simplifaisoul/osiris),
MIT). Não copiamos código-fonte da OSIRIS, só consumimos sua API pública —
ver `/sobre` na aplicação para a explicação completa de proveniência,
metodologia e por que as obrigações de cópia da licença MIT não se aplicam
a este uso.

## Publicação futura

Preparado para publicação independente (`Root Directory = osiris_campo_grande`
em um novo projeto Vercel). Nada foi publicado nem configurado nesta
execução — nenhuma alteração foi feita no Vercel do FinanceBot nem em
`finance.wasxtech.com.br`. Um domínio como `osiris.wasxtech.com.br` pode ser
configurado depois, quando solicitado.

## Testes

```bash
npm test        # vitest — normalização, filtro geográfico, erros de rede/timeout/HTTP, feed vazio
npm run lint
npm run typecheck
npm run build
```

Os testes mockam o `OsirisClient` — nenhum deles depende da OSIRIS estar no
ar (seção 19 do pedido).
