import type {
  ApiHealth,
  FeedKey,
  FeedResult,
  FeedScope,
  GlobalFeedKey,
  GlobalFeedResult,
  NormalizedRecord,
  Provenance,
  RegionDossierResult,
} from "@/types";
import { OsirisClient, OsirisError, osirisClient } from "@/lib/osiris/client";
import { FEED_CONFIG, GLOBAL_FEED_CONFIG, type FeedConfig } from "@/lib/osiris/endpoints";
import { CAMPO_GRANDE_CENTER, DEFAULT_RADIUS_KM, haversineKm } from "@/lib/osiris/geo";
import type { PreNormalized } from "@/lib/osiris/normalizers";
import { fetchInmetAlerts } from "./inmet.service";

function errorMessage(error: unknown): string {
  return error instanceof OsirisError ? error.message : "Erro desconhecido ao consultar a OSIRIS.";
}

function errorScope(error: unknown): { status: "error" | "unavailable"; scope: FeedScope } {
  const unavailable = error instanceof OsirisError && error.code === "timeout";
  return { status: unavailable ? "unavailable" : "error", scope: "ERRO" };
}

/**
 * Proveniência em dois níveis: `upstreamSource` só é preenchido quando a
 * PRÓPRIA RESPOSTA declara um provedor (`source`/`sources`/`providers`,
 * `origin: "payload"`) — na ausência disso, cai para o que a documentação
 * da OSIRIS diz sobre aquele endpoint (`origin: "docs"`), nunca inventado.
 */
function extractUpstreamSource(raw: unknown, documentedUpstream?: string): Pick<Provenance, "upstreamSource" | "upstreamSourceOrigin"> {
  const root = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  if (typeof root.source === "string" && root.source.length > 0) {
    return { upstreamSource: root.source, upstreamSourceOrigin: "payload" };
  }

  for (const key of ["sources", "providers"]) {
    const value = root[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const names = Object.keys(value as Record<string, unknown>);
      if (names.length > 0) {
        const preview = names.length > 3 ? `${names.slice(0, 3).join(", ")} e mais ${names.length - 3}` : names.join(", ");
        return { upstreamSource: preview, upstreamSourceOrigin: "payload" };
      }
    }
  }

  if (documentedUpstream) {
    return { upstreamSource: documentedUpstream, upstreamSourceOrigin: "docs" };
  }
  return {};
}

function toFullRecord(
  feed: FeedKey,
  item: PreNormalized,
  fetchedAt: string,
  endpointPath: string,
  upstream: Pick<Provenance, "upstreamSource" | "upstreamSourceOrigin">,
): NormalizedRecord {
  const distanceKm = item.position ? haversineKm(CAMPO_GRANDE_CENTER, item.position) : null;
  return {
    id: `${feed}-${item.idSuffix}`,
    feed,
    type: item.type,
    title: item.title,
    position: item.position,
    distanceKm,
    timestamp: item.sourceTimestamp,
    summary: item.summary,
    metadata: item.metadata,
    provenance: {
      sourcePlatform: "OSIRIS",
      sourceEndpoint: endpointPath,
      fetchedAt,
      ...(item.sourceTimestamp ? { sourceTimestamp: item.sourceTimestamp } : {}),
      ...upstream,
    },
    raw: item.raw,
  };
}

function scopeForPointQuery(totalUpstream: number, totalInRegion: number, radiusOrLabel: string): { scope: FeedScope; note: string } {
  if (totalInRegion > 0) {
    return {
      scope: "LOCAL",
      note: `Status: API operacional · Consulta feita diretamente para as coordenadas de Campo Grande · ${totalInRegion} de ${totalUpstream} resultado(s) cobrem o ponto exato.`,
    };
  }
  return {
    scope: "INDISPONIVEL",
    note: `Status: API operacional · Consulta feita para Campo Grande (${radiusOrLabel}) · nenhum dos ${totalUpstream} resultado(s) cobre o ponto exato.`,
  };
}

function scopeForRadiusFeed(totalUpstream: number, totalInRegion: number, radiusKm: number): { scope: FeedScope; note: string } {
  if (totalUpstream === 0) {
    return {
      scope: "INDISPONIVEL",
      note: "Status: API operacional · Cobertura OSIRIS: 0 registros no total no momento (vazio no mundo todo, não só para Campo Grande).",
    };
  }
  if (totalInRegion > 0) {
    return {
      scope: "GLOBAL_FILTRADO",
      note: `Status: API operacional · Cobertura OSIRIS: global (${totalUpstream} registros) · Campo Grande/MS: ${totalInRegion} dentro de ${radiusKm}km, filtrado localmente.`,
    };
  }
  return {
    scope: "INDISPONIVEL",
    note: `Status: API operacional · Cobertura OSIRIS: global (${totalUpstream} registros) · Campo Grande/MS: nenhum registro dentro de ${radiusKm}km.`,
  };
}

/**
 * Busca um feed, normaliza e aplica o filtro geográfico local em torno de
 * Campo Grande. Nunca lança: qualquer falha upstream vira um `FeedResult`
 * com `status: "error"` ou `"unavailable"`, para que uma camada indisponível
 * não derrube o mapa inteiro (seção 16 do pedido original).
 */
export async function fetchFeed(
  feed: FeedKey,
  radiusKm: number = DEFAULT_RADIUS_KM,
  client: OsirisClient = osirisClient,
): Promise<FeedResult> {
  const config: FeedConfig = FEED_CONFIG[feed];
  const fetchedAt = new Date().toISOString();
  const baseProvenance: Provenance = { sourcePlatform: "OSIRIS", sourceEndpoint: config.path, fetchedAt };

  let raw: unknown;
  try {
    const searchParams = config.supportsPointQuery
      ? { lat: String(CAMPO_GRANDE_CENTER.lat), lng: String(CAMPO_GRANDE_CENTER.lng) }
      : undefined;
    raw = await client.get(config.path, { revalidateSeconds: config.revalidateSeconds, searchParams });
  } catch (error) {
    const { status, scope } = errorScope(error);
    return {
      feed,
      label: config.label,
      status,
      scope,
      scopeNote: `Status: ${status === "unavailable" ? "tempo esgotado (timeout)" : "erro ao consultar"} · ${errorMessage(error)}`,
      totalUpstream: 0,
      totalWithoutCoordinates: 0,
      totalInRegion: 0,
      records: [],
      filteredLocally: false,
      radiusKm: config.supportsPointQuery ? null : radiusKm,
      error: errorMessage(error),
      provenance: baseProvenance,
    };
  }

  const items = config.normalize(raw);
  const withoutCoordinates = items.filter((item) => item.position === null).length;
  const upstream = extractUpstreamSource(raw, config.documentedUpstream);

  let inRegion: PreNormalized[];
  let effectiveRadiusKm: number | null = radiusKm;
  if (config.supportsPointQuery) {
    // Sentinel: a API já recebeu lat/lng e devolveu cenas próximas ao ponto;
    // o que importa aqui é se a cena realmente cobre o ponto (bbox), não a
    // distância — por isso não há "raio" no sentido dos demais feeds.
    inRegion = items.filter((item) => item.metadata.coversPoint === true);
    effectiveRadiusKm = null;
  } else {
    inRegion = items.filter(
      (item) => item.position !== null && haversineKm(CAMPO_GRANDE_CENTER, item.position) <= radiusKm,
    );
  }

  const records = inRegion.map((item) => toFullRecord(feed, item, fetchedAt, config.path, upstream));
  const { scope, note } = config.supportsPointQuery
    ? scopeForPointQuery(items.length, records.length, "ponto exato")
    : scopeForRadiusFeed(items.length, records.length, radiusKm);

  return {
    feed,
    label: config.label,
    status: records.length > 0 ? "ok" : "empty",
    scope,
    scopeNote: note,
    totalUpstream: items.length,
    totalWithoutCoordinates: withoutCoordinates,
    totalInRegion: records.length,
    records,
    filteredLocally: true,
    radiusKm: effectiveRadiusKm,
    provenance: { ...baseProvenance, ...upstream },
  };
}

export async function fetchAllFeeds(
  radiusKm: number = DEFAULT_RADIUS_KM,
  client: OsirisClient = osirisClient,
): Promise<FeedResult[]> {
  const feeds = Object.keys(FEED_CONFIG) as FeedKey[];
  return Promise.all(feeds.map((feed) => fetchFeed(feed, radiusKm, client)));
}

/**
 * Todos os feeds geograficamente relevantes para Campo Grande — os da
 * OSIRIS (filtrados por raio) MAIS os avisos do INMET (filtrados por
 * geocode do próprio aviso, não por raio). É o que alimenta a home
 * "Situação agora" e a aba "Camadas"/"Fontes" — um único ponto que
 * combina as duas plataformas, para os componentes de UI não precisarem
 * saber de onde cada feed vem (apenas de `provenance.sourcePlatform`).
 */
export async function fetchSituationFeeds(
  radiusKm: number = DEFAULT_RADIUS_KM,
  client: OsirisClient = osirisClient,
): Promise<FeedResult[]> {
  const [osirisFeeds, inmetAlerts] = await Promise.all([fetchAllFeeds(radiusKm, client), fetchInmetAlerts()]);
  return [...osirisFeeds, inmetAlerts];
}

export async function fetchGlobalFeed(
  feed: GlobalFeedKey,
  client: OsirisClient = osirisClient,
): Promise<GlobalFeedResult> {
  const config = GLOBAL_FEED_CONFIG[feed];
  const fetchedAt = new Date().toISOString();
  const baseProvenance: Provenance = { sourcePlatform: "OSIRIS", sourceEndpoint: config.path, fetchedAt };

  try {
    const raw = await client.get<Record<string, unknown>>(config.path, { revalidateSeconds: config.revalidateSeconds });
    const upstream = extractUpstreamSource(raw);
    return {
      feed,
      label: config.label,
      status: "ok",
      scope: "GLOBAL",
      scopeNote: `Status: API operacional · Dado global, sem coordenadas por registro — não representa Campo Grande especificamente.`,
      data: raw,
      note: config.note,
      provenance: { ...baseProvenance, ...upstream },
    };
  } catch (error) {
    const { status } = errorScope(error);
    return {
      feed,
      label: config.label,
      status,
      scope: "GLOBAL",
      scopeNote: `Status: ${status === "unavailable" ? "tempo esgotado (timeout)" : "erro ao consultar"} · ${errorMessage(error)}`,
      data: null,
      note: config.note,
      error: errorMessage(error),
      provenance: baseProvenance,
    };
  }
}

export async function fetchAllGlobalFeeds(client: OsirisClient = osirisClient): Promise<GlobalFeedResult[]> {
  const feeds = Object.keys(GLOBAL_FEED_CONFIG) as GlobalFeedKey[];
  return Promise.all(feeds.map((feed) => fetchGlobalFeed(feed, client)));
}

const REGION_DOSSIER_PATH = "/region-dossier";

/**
 * `/api/region-dossier?lat=&lng=` — testado com as coordenadas exatas de
 * Campo Grande: a origem devolveu `location: {}`, `country: null`,
 * `wikipedia: null`. Isso é reportado como `hasContent: false`, nunca
 * escondido nem preenchido com um valor inventado.
 */
export async function fetchRegionDossier(client: OsirisClient = osirisClient): Promise<RegionDossierResult> {
  const fetchedAt = new Date().toISOString();
  const provenance: Provenance = { sourcePlatform: "OSIRIS", sourceEndpoint: REGION_DOSSIER_PATH, fetchedAt };

  try {
    const raw = await client.get<Record<string, unknown>>(REGION_DOSSIER_PATH, {
      revalidateSeconds: 60,
      searchParams: { lat: String(CAMPO_GRANDE_CENTER.lat), lng: String(CAMPO_GRANDE_CENTER.lng) },
    });
    const location = raw.location && typeof raw.location === "object" ? (raw.location as Record<string, unknown>) : {};
    const hasContent = Object.values(location).some(Boolean) || Boolean(raw.country) || Boolean(raw.wikipedia);
    return {
      status: hasContent ? "ok" : "empty",
      hasContent,
      data: raw,
      note: hasContent
        ? "A OSIRIS retornou informação de enriquecimento para estas coordenadas."
        : "Consultado com as coordenadas exatas de Campo Grande; a origem não retornou dados de enriquecimento para este ponto (location/country/wikipedia vieram vazios/nulos).",
      provenance,
    };
  } catch (error) {
    const { status } = errorScope(error);
    return {
      status,
      hasContent: false,
      data: null,
      note: "Não foi possível consultar o dossiê regional agora.",
      error: errorMessage(error),
      provenance,
    };
  }
}

/** `/api/health` — usado só para o indicador de status da API no cabeçalho, não é um feed de dados. */
export async function fetchApiHealth(client: OsirisClient = osirisClient): Promise<ApiHealth> {
  const checkedAt = new Date().toISOString();
  try {
    const raw = await client.get<Record<string, unknown>>("/health", { revalidateSeconds: 30, timeoutMs: 5000 });
    return {
      status: "ok",
      detail: typeof raw.detail === "string" ? raw.detail : null,
      version: typeof raw.version === "string" ? raw.version : null,
      uptimeSeconds: typeof raw.uptime_seconds === "number" ? raw.uptime_seconds : null,
      checkedAt,
    };
  } catch (error) {
    const { status } = errorScope(error);
    return { status, detail: errorMessage(error), version: null, uptimeSeconds: null, checkedAt };
  }
}
