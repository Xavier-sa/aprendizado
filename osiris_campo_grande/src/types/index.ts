/**
 * Identificadores dos feeds OSIRIS integrados nesta POC — todos com
 * coordenadas por registro, portanto elegíveis ao filtro geográfico local
 * em torno de Campo Grande. Cada chave corresponde a um endpoint público
 * real, testado manualmente contra https://osirisai.live/api antes de ser
 * incluído aqui — ver docs/osiris-api-discovery.md para a auditoria
 * completa (inclusive dos endpoints que existem na API mas NÃO foram
 * integrados, e por quê).
 */
export type FeedKey =
  | "flights"
  | "satellites"
  | "weather"
  | "earthquakes"
  | "fires"
  | "cctv"
  | "infrastructure"
  | "maritime"
  | "radar"
  | "gdelt"
  | "sentinel"
  | "conflicts"
  | "air-quality";

/**
 * Fontes fora da OSIRIS, adicionadas na segunda fase (observatório de
 * riscos) — hoje só os avisos ativos do INMET, filtrados para os que
 * realmente listam Campo Grande (geocode IBGE 5002704) entre os
 * municípios cobertos. Ver `src/lib/inmet/`.
 */
export type ExternalSourceKey = "inmet-alerts";

/** Chave usada por `NormalizedRecord`/`FeedResult` — pode vir da OSIRIS ou de uma fonte externa (hoje só INMET). */
export type SourceKey = FeedKey | ExternalSourceKey;

/** Feeds sem coordenadas por registro — nunca entram no mapa nem no filtro geográfico, só como contexto da plataforma/mundo. */
export type GlobalFeedKey = "space-weather" | "stats" | "country-risk";

/**
 * Classificação de cada feed em relação a Campo Grande (pedido explícito):
 * - LOCAL: o próprio endpoint foi consultado PARA este ponto (aceita lat/lng
 *   e devolve algo pensado para aquele lugar) — hoje só `sentinel`.
 * - GLOBAL_FILTRADO: feed mundial com coordenadas por registro, filtrado
 *   por nós pelo raio de Campo Grande, e que encontrou pelo menos 1 registro.
 * - INDISPONIVEL: endpoint público e operacional, mas sem nenhum registro
 *   relevante para Campo Grande no momento (seja porque o filtro geográfico
 *   zerou, seja porque a origem não tem dado nenhum agora).
 * - GLOBAL: feed sem coordenadas por registro — serve só como contexto da
 *   OSIRIS/do mundo, nunca representa Campo Grande especificamente.
 * - ERRO: não foi possível consultar o endpoint agora (rede, timeout, HTTP).
 */
export type FeedScope = "LOCAL" | "GLOBAL_FILTRADO" | "GLOBAL" | "INDISPONIVEL" | "ERRO";

export interface GeoPoint {
  lat: number;
  lng: number;
}

/**
 * Proveniência em dois níveis (pedido explícito): `sourcePlatform` é sempre
 * "OSIRIS" (a plataforma que consultamos); `upstreamSource`, quando a
 * própria resposta ou a documentação da OSIRIS o declarar, identifica o
 * provedor original dos dados (ex.: "NASA-FIRMS (VIIRS)", "opensky-anon")
 * — para não atribuirmos à OSIRIS a autoria de dados agregados de
 * terceiros. `upstreamSourceOrigin` diz se esse nome veio do próprio corpo
 * da resposta (mais confiável) ou só da descrição do endpoint na
 * documentação da OSIRIS (quando a resposta não declara nada).
 * `sourceTimestamp` só é preenchido quando a origem trouxer um timestamp
 * próprio — nunca inventamos um.
 */
export interface Provenance {
  sourcePlatform: "OSIRIS" | "INMET" | "IBGE";
  sourceEndpoint: string;
  fetchedAt: string;
  sourceTimestamp?: string;
  upstreamSource?: string;
  upstreamSourceOrigin?: "payload" | "docs";
}

/**
 * Registro normalizado — formato comum usado pelo mapa e pelo explorador
 * de dados, independente do feed de origem. `raw` preserva o objeto
 * original da OSIRIS para quem quiser inspecionar o dado bruto.
 */
/** GeoJSON simplificado — só o suficiente para desenhar o polígono de um aviso no mapa (Leaflet aceita GeoJSON puro). */
export interface RecordGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}

export interface NormalizedRecord {
  id: string;
  feed: SourceKey;
  type: string;
  title: string;
  position: GeoPoint | null;
  /** Distância até o centro de Campo Grande, em km — só quando `position` existir. */
  distanceKm: number | null;
  /** Só para registros de área (ex.: aviso meteorológico do INMET) — um polígono real, nunca um marcador de ponto inventado para representar uma área. */
  geometry?: RecordGeometry;
  timestamp: string | null;
  summary: string;
  metadata: Record<string, string | number | boolean | null>;
  provenance: Provenance;
  raw: unknown;
}

export interface FeedResult {
  feed: SourceKey;
  label: string;
  status: "ok" | "empty" | "error" | "unavailable";
  scope: FeedScope;
  /** Frase curta pronta para exibição, no estilo "Status: API operacional · Cobertura OSIRIS: global · Campo Grande/MS: nenhum registro no raio analisado". */
  scopeNote: string;
  /** Quantos registros a OSIRIS retornou no total, antes do filtro geográfico local. */
  totalUpstream: number;
  /** Entre os `totalUpstream`, quantos não tinham lat/lng utilizável (não podem ser filtrados nem exibidos no mapa). */
  totalWithoutCoordinates: number;
  /** Quantos sobraram depois do filtro por raio (ou, no caso do Sentinel, por cobertura do ponto) ao redor de Campo Grande. */
  totalInRegion: number;
  records: NormalizedRecord[];
  filteredLocally: boolean;
  radiusKm: number | null;
  error?: string;
  provenance: Provenance;
}

export interface GlobalFeedResult {
  feed: GlobalFeedKey;
  label: string;
  status: "ok" | "error" | "unavailable";
  scope: "GLOBAL";
  scopeNote: string;
  data: Record<string, unknown> | null;
  note: string;
  error?: string;
  provenance: Provenance;
}

/** Resultado do lookup pontual em `/api/region-dossier` para o centro de Campo Grande — não é uma lista, é uma consulta única. */
export interface RegionDossierResult {
  status: "ok" | "empty" | "error" | "unavailable";
  hasContent: boolean;
  data: Record<string, unknown> | null;
  note: string;
  error?: string;
  provenance: Provenance;
}

export interface ApiHealth {
  status: "ok" | "error" | "unavailable";
  detail: string | null;
  version: string | null;
  uptimeSeconds: number | null;
  checkedAt: string;
}

/**
 * `/api/v1/localidades/municipios/{codigo}` do IBGE — identidade
 * administrativa real de Campo Grande (não é enriquecimento "sobre o
 * Brasil" como o `region-dossier` às vezes devolve, é especificamente
 * sobre o município consultado, pela fonte oficial de códigos
 * territoriais do Brasil).
 */
export interface MunicipalityResult {
  status: "ok" | "error" | "unavailable";
  data: {
    nome: string;
    microrregiao: string;
    mesorregiao: string;
    uf: string;
    ufSigla: string;
    regiao: string;
    regiaoImediata: string;
  } | null;
  error?: string;
  provenance: Provenance;
}

/**
 * Uma mudança detectada entre a consulta atual e a anterior (mesmo raio),
 * por regras determinísticas e documentadas — nunca por um julgamento de
 * "gravidade" inventado (seção 8 do pedido: "Não utilizar IA para
 * inventar gravidade"). Ver `src/services/snapshot.service.ts`.
 */
export interface ChangeEvent {
  feed: SourceKey;
  kind: "new-records" | "fewer-records" | "new-sentinel-coverage" | "source-recovered" | "source-failed";
  message: string;
}

export interface ChangeSummary {
  /** `null` na primeira consulta do processo (sem observação anterior para comparar). */
  previousCheckedAt: string | null;
  currentCheckedAt: string;
  events: ChangeEvent[];
}
