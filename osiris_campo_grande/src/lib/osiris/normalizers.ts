import type { GeoPoint } from "@/types";
import { isValidPoint, bboxContains, type Bbox, CAMPO_GRANDE_CENTER } from "./geo";

/** Forma intermediária produzida por cada normalizador de feed, antes de
 * receber id/feed/provenance/distanceKm (adicionados pelo feeds.service). */
export interface PreNormalized {
  idSuffix: string;
  type: string;
  title: string;
  position: GeoPoint | null;
  sourceTimestamp: string | null;
  summary: string;
  metadata: Record<string, string | number | boolean | null>;
  raw: unknown;
}

function asArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
}

function num(item: Record<string, unknown>, key: string): number | null {
  const value = item[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function str(item: Record<string, unknown>, key: string): string | null {
  const value = item[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function pointOf(item: Record<string, unknown>): GeoPoint | null {
  const point = { lat: num(item, "lat"), lng: num(item, "lng") };
  return isValidPoint(point) ? (point as GeoPoint) : null;
}

/** `/api/flights` — quatro baldes de aeronaves (comercial, privada, jato
 * privado, militar). O balde `gps_jamming` embutido na mesma resposta NÃO é
 * incluído aqui — ver docs/osiris-api-discovery.md ("achados extras"). */
export function normalizeFlights(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  const buckets: [string, string][] = [
    ["commercial_flights", "Voo comercial"],
    ["private_flights", "Voo privado"],
    ["private_jets", "Jato privado"],
    ["military_flights", "Voo militar"],
  ];
  const out: PreNormalized[] = [];
  for (const [key, label] of buckets) {
    for (const item of asArray(root[key])) {
      const callsign = str(item, "callsign") ?? "Sem callsign";
      out.push({
        idSuffix: `${key}-${callsign}-${item.icao24 ?? out.length}`,
        type: label,
        title: `${label}: ${callsign}`,
        position: pointOf(item),
        sourceTimestamp: null,
        summary: [
          str(item, "model") ? `Modelo ${str(item, "model")}` : null,
          num(item, "alt") !== null ? `altitude ${num(item, "alt")} ft` : null,
          num(item, "speed_knots") !== null ? `${num(item, "speed_knots")} kt` : null,
        ]
          .filter(Boolean)
          .join(", "),
        metadata: {
          icao24: str(item, "icao24"),
          registration: str(item, "registration"),
          airline_code: str(item, "airline_code"),
          heading: num(item, "heading"),
          altitude_ft: num(item, "alt"),
          speed_knots: num(item, "speed_knots"),
          grounded: typeof item.grounded === "boolean" ? item.grounded : null,
        },
        raw: item,
      });
    }
  }
  return out;
}

/** `/api/satellites` — posição instantânea derivada de TLE; não é uma
 * posição "fixa" do satélite, apenas onde ele estava no momento da consulta. */
export function normalizeSatellites(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.satellites).map((item, index) => ({
    idSuffix: str(item, "noradId") ?? String(index),
    type: "Satélite",
    title: str(item, "name") ?? "Satélite sem nome",
    position: pointOf(item),
    sourceTimestamp: null,
    summary: [
      str(item, "category") ? `categoria ${str(item, "category")}` : null,
      num(item, "alt") !== null ? `altitude ${num(item, "alt")} km` : null,
    ]
      .filter(Boolean)
      .join(", "),
    metadata: {
      noradId: str(item, "noradId"),
      mission: str(item, "mission"),
      category: str(item, "category"),
      altitude_km: num(item, "alt"),
    },
    raw: item,
  }));
}

/** `/api/weather` — eventos climáticos severos do NASA EONET. */
export function normalizeWeather(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.events).map((item) => ({
    idSuffix: str(item, "id") ?? str(item, "title") ?? "evento",
    type: str(item, "type") ?? "Evento climático",
    title: str(item, "title") ?? "Evento sem título",
    position: pointOf(item),
    sourceTimestamp: str(item, "date"),
    summary: [str(item, "category"), str(item, "severity") ? `severidade ${str(item, "severity")}` : null]
      .filter(Boolean)
      .join(", "),
    metadata: {
      category: str(item, "category"),
      severity: str(item, "severity"),
      provider: str(item, "provider"),
      sourceUrl: str(item, "source"),
    },
    raw: item,
  }));
}

/** `/api/earthquakes` — feed USGS; `time` vem em epoch ms. */
export function normalizeEarthquakes(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.earthquakes).map((item) => {
    const timeMs = num(item, "time");
    return {
      idSuffix: str(item, "id") ?? String(timeMs),
      type: "Terremoto",
      title: str(item, "place") ?? "Terremoto",
      position: pointOf(item),
      sourceTimestamp: timeMs !== null ? new Date(timeMs).toISOString() : null,
      summary: `magnitude ${num(item, "magnitude") ?? "?"}, profundidade ${num(item, "depth") ?? "?"} km`,
      metadata: {
        magnitude: num(item, "magnitude"),
        depth_km: num(item, "depth"),
        tsunami: num(item, "tsunami"),
        alert: str(item, "alert"),
        url: str(item, "url"),
      },
      raw: item,
    };
  });
}

/** `/api/fires` — hotspots do NASA FIRMS; `date` + `time` (HHmm, UTC) separados. */
export function normalizeFires(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.fires).map((item, index) => {
    const date = str(item, "date");
    const time = str(item, "time");
    let sourceTimestamp: string | null = null;
    if (date && time && time.length === 4) {
      sourceTimestamp = `${date}T${time.slice(0, 2)}:${time.slice(2)}:00Z`;
    }
    return {
      idSuffix: `${date ?? "fire"}-${time ?? index}-${index}`,
      type: "Foco de incêndio",
      title: `Foco de incêndio${date ? ` em ${date}` : ""}`,
      position: pointOf(item),
      sourceTimestamp,
      summary: `FRP ${num(item, "frp") ?? "?"} MW, confiança ${str(item, "confidence") ?? "?"}`,
      metadata: {
        brightness_kelvin: num(item, "brightness"),
        frp_mw: num(item, "frp"),
        confidence: str(item, "confidence"),
      },
      raw: item,
    };
  });
}

/** `/api/cctv` — câmeras públicas. Os parâmetros de "region/radius" do
 * próprio endpoint foram testados e NÃO fazem filtro geográfico confiável
 * (ver docs/osiris-api-discovery.md) — por isso buscamos a lista completa
 * e filtramos localmente por lat/lng, como os demais feeds. */
export function normalizeCctv(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.cameras).map((item) => ({
    idSuffix: str(item, "id") ?? str(item, "name") ?? "camera",
    type: "Câmera pública",
    title: str(item, "name") ?? "Câmera sem nome",
    position: pointOf(item),
    sourceTimestamp: null,
    summary: [str(item, "city"), str(item, "country")].filter(Boolean).join(", "),
    metadata: {
      city: str(item, "city"),
      country: str(item, "country"),
      source: str(item, "source"),
      streamUrl: str(item, "stream_url") ?? str(item, "external_url"),
      streamType: str(item, "stream_type"),
    },
    raw: item,
  }));
}

/** `/api/infrastructure` — infraestrutura estratégica fixa (usinas etc.). */
export function normalizeInfrastructure(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.infrastructure).map((item) => ({
    idSuffix: str(item, "id") ?? str(item, "name") ?? "infra",
    type: "Infraestrutura estratégica",
    title: str(item, "name") ?? "Instalação sem nome",
    position: pointOf(item),
    sourceTimestamp: null,
    summary: [str(item, "status"), str(item, "city")].filter(Boolean).join(", "),
    metadata: {
      city: str(item, "city"),
      country: str(item, "country"),
      status: str(item, "status"),
      owner: str(item, "owner"),
      capacityMW: num(item, "capacityMW"),
    },
    raw: item,
  }));
}

/** `/api/maritime` — portos, chokepoints e navios (os três arrays, quando
 * tiverem lat/lng próprios; nem todo chokepoint necessariamente traz). */
export function normalizeMaritime(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  const out: PreNormalized[] = [];
  for (const item of asArray(root.ports)) {
    out.push({
      idSuffix: `port-${str(item, "name") ?? out.length}`,
      type: "Porto",
      title: str(item, "name") ?? "Porto sem nome",
      position: pointOf(item),
      sourceTimestamp: null,
      summary: [str(item, "type"), str(item, "congestion") ? `congestionamento ${str(item, "congestion")}` : null]
        .filter(Boolean)
        .join(", "),
      metadata: { country: str(item, "country"), volume: str(item, "volume"), rank: num(item, "rank") },
      raw: item,
    });
  }
  for (const item of asArray(root.chokepoints)) {
    const position = pointOf(item);
    if (!position) continue;
    out.push({
      idSuffix: `chokepoint-${str(item, "name") ?? out.length}`,
      type: "Estreito estratégico",
      title: str(item, "name") ?? "Chokepoint sem nome",
      position,
      sourceTimestamp: null,
      summary: str(item, "type") ?? "",
      metadata: {},
      raw: item,
    });
  }
  for (const item of asArray(root.ships)) {
    const position = pointOf(item);
    if (!position) continue;
    out.push({
      idSuffix: `ship-${str(item, "name") ?? out.length}`,
      type: "Navio",
      title: str(item, "name") ?? "Navio sem nome",
      position,
      sourceTimestamp: null,
      summary: str(item, "type") ?? "",
      metadata: {},
      raw: item,
    });
  }
  return out;
}

/** `/api/radar` — interferência de GPS / quedas de navegação (IODA/BGP). */
export function normalizeRadar(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.outages).map((item) => {
    const fromSec = num(item, "from");
    return {
      idSuffix: str(item, "id") ?? String(fromSec),
      type: "Interferência de GPS / rede",
      title: `Anomalia em ${str(item, "country") ?? str(item, "code") ?? "país desconhecido"}`,
      position: pointOf(item),
      sourceTimestamp: fromSec !== null ? new Date(fromSec * 1000).toISOString() : null,
      summary: `nível ${str(item, "level") ?? "desconhecido"}, fonte ${str(item, "datasource") ?? "?"}`,
      metadata: { country: str(item, "country"), level: str(item, "level"), score: num(item, "score") },
      raw: item,
    };
  });
}

/** `/api/gdelt` — eventos geocodificados globais (GDACS/GDELT). Nenhum
 * timestamp por item foi observado na resposta real testada. */
export function normalizeGdelt(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.events).map((item, index) => ({
    idSuffix: str(item, "id") ?? String(index),
    type: str(item, "type") ?? "Evento geocodificado",
    title: str(item, "name") ?? "Evento sem título",
    position: pointOf(item),
    sourceTimestamp: null,
    summary: str(item, "type") ?? "",
    metadata: { url: str(item, "url") },
    raw: item,
  }));
}

/**
 * `/api/sentinel?lat=&lng=` — cenas Sentinel-1 próximas ao ponto pedido.
 * A API retorna cenas cuja órbita passa perto do ponto, mas nem toda cena
 * tem o `bbox` cobrindo o ponto exato — marcamos isso em
 * `metadata.coversPoint` em vez de fingir que todas cobrem Campo Grande.
 * `thumbnail` vem como URI `s3://...`, que o navegador não consegue
 * carregar como imagem — por isso não é tratado como URL de imagem aqui.
 */
export function normalizeSentinel(raw: unknown, center: GeoPoint = CAMPO_GRANDE_CENTER): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.scenes).map((item) => {
    const bbox = Array.isArray(item.bbox) && item.bbox.length === 4 ? (item.bbox as Bbox) : null;
    const coversPoint = bbox ? bboxContains(bbox, center) : false;
    const centerOfBbox: GeoPoint | null = bbox
      ? { lat: (bbox[1] + bbox[3]) / 2, lng: (bbox[0] + bbox[2]) / 2 }
      : null;
    return {
      idSuffix: str(item, "id") ?? "scene",
      type: "Imagem de satélite (Sentinel)",
      title: `Cena ${str(item, "platform") ?? "Sentinel"}`,
      position: centerOfBbox,
      sourceTimestamp: str(item, "datetime"),
      summary: [
        coversPoint ? "cobre o ponto consultado" : "não cobre o ponto exato (órbita passa perto)",
        num(item, "area_km2") !== null ? `${num(item, "area_km2")} km²` : null,
      ]
        .filter(Boolean)
        .join(", "),
      metadata: {
        coversPoint,
        orbit: str(item, "orbit"),
        mode: str(item, "mode"),
        resolution_m: num(item, "resolution"),
        thumbnailS3Uri: str(item, "thumbnail"),
        thumbnailRenderable: false,
      },
      raw: item,
    };
  });
}

/**
 * `/api/conflicts` — zonas de conflito ativo com relatos de incidentes
 * aninhados. Achatamos em dois tipos de registro: a zona em si (ponto
 * central) e cada incidente reportado dentro dela (quando tiver lat/lng
 * próprio). Testado: nenhuma das zonas listadas é no Brasil.
 */
export function normalizeConflicts(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  const out: PreNormalized[] = [];
  for (const zone of asArray(root.zones)) {
    const zoneLabel = str(zone, "label") ?? "Zona de conflito";
    out.push({
      idSuffix: `zone-${str(zone, "id") ?? zoneLabel}`,
      type: "Zona de conflito ativa",
      title: zoneLabel,
      position: pointOf(zone),
      sourceTimestamp: null,
      summary: str(zone, "description") ?? "",
      metadata: { severity: str(zone, "severity"), region: str(zone, "region"), sourceUrl: str(zone, "sourceUrl") },
      raw: zone,
    });
    for (const event of asArray(zone.events)) {
      const position = pointOf(event);
      if (!position) continue;
      out.push({
        idSuffix: `event-${str(event, "id") ?? out.length}`,
        type: "Incidente em zona de conflito",
        title: str(event, "title") ?? `Incidente em ${zoneLabel}`,
        position,
        sourceTimestamp: str(event, "timestamp"),
        summary: zoneLabel,
        metadata: { zone: zoneLabel, url: str(event, "url") },
        raw: event,
      });
    }
  }
  return out;
}

/**
 * `/api/air-quality` — estações terrestres. No momento em que esta POC foi
 * escrita, o endpoint respondia `{"stations":[],"total":0}` (vazio no MUNDO
 * TODO, não só para Campo Grande) em toda tentativa. Os nomes de campo
 * abaixo são um palpite razoável (padrão comum em APIs de qualidade do ar:
 * AQI + poluentes + estação) — sem uma resposta real com dados, não é
 * possível confirmá-los contra a OSIRIS; por isso são todos extraídos de
 * forma defensiva (viram `null` se o campo não existir, nunca inventamos
 * um valor).
 */
export function normalizeAirQuality(raw: unknown): PreNormalized[] {
  const root = (raw ?? {}) as Record<string, unknown>;
  return asArray(root.stations).map((item, index) => ({
    idSuffix: str(item, "id") ?? str(item, "station") ?? String(index),
    type: "Estação de qualidade do ar",
    title: str(item, "station") ?? str(item, "name") ?? "Estação sem nome",
    position: pointOf(item),
    sourceTimestamp: str(item, "timestamp") ?? str(item, "updated"),
    summary: num(item, "aqi") !== null ? `AQI ${num(item, "aqi")}` : "",
    metadata: {
      aqi: num(item, "aqi"),
      pm25: num(item, "pm25"),
      pm10: num(item, "pm10"),
      o3: num(item, "o3"),
      no2: num(item, "no2"),
    },
    raw: item,
  }));
}
