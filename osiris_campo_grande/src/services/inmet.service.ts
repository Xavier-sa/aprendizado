import type { FeedResult, NormalizedRecord, Provenance } from "@/types";
import { InmetClient, InmetError, inmetClient } from "@/lib/inmet/client";
import { filterAlertsForCampoGrande, type RawInmetAlertsResponse } from "@/lib/inmet/alerts";

const ALERTS_PATH = "/avisos/ativos";
/** A INMET atualiza avisos ao longo do dia sem TTL documentado publicamente; 10 min é um intervalo conservador para não bater na API a cada poll do cliente (seção 17/18 do pedido). */
const ALERTS_REVALIDATE_SECONDS = 600;

function toRecord(alert: ReturnType<typeof filterAlertsForCampoGrande>[number], fetchedAt: string): NormalizedRecord {
  const provenance: Provenance = {
    sourcePlatform: "INMET",
    sourceEndpoint: ALERTS_PATH,
    fetchedAt,
    sourceTimestamp: alert.startsAt,
    upstreamSource: "INMET (avisos meteorológicos)",
    upstreamSourceOrigin: "payload",
  };
  return {
    id: `inmet-alerts-${alert.id}`,
    feed: "inmet-alerts",
    type: `Aviso meteorológico: ${alert.title}`,
    title: `${alert.title} (${alert.severity})`,
    position: null,
    distanceKm: null,
    geometry: alert.geometry ?? undefined,
    timestamp: alert.startsAt,
    summary: alert.risks[0] ?? "",
    metadata: {
      severidade: alert.severity,
      cor: alert.color,
      inicio: alert.startsAt,
      fim: alert.endsAt,
      instrucoes: alert.instructions.join(" "),
    },
    provenance,
    raw: alert.raw,
  };
}

/**
 * Avisos meteorológicos ativos do INMET que realmente cobrem Campo Grande
 * - MS (filtrados por geocode IBGE, ver `src/lib/inmet/alerts.ts`). Nunca
 * lança: qualquer falha vira `status: "error"`/`"unavailable"`, igual aos
 * feeds da OSIRIS, para não derrubar o resto da página.
 */
export async function fetchInmetAlerts(client: InmetClient = inmetClient): Promise<FeedResult> {
  const fetchedAt = new Date().toISOString();
  const baseProvenance: Provenance = { sourcePlatform: "INMET", sourceEndpoint: ALERTS_PATH, fetchedAt };

  let raw: RawInmetAlertsResponse;
  try {
    raw = await client.get<RawInmetAlertsResponse>(ALERTS_PATH, ALERTS_REVALIDATE_SECONDS);
  } catch (error) {
    const unavailable = error instanceof InmetError && error.code === "timeout";
    const message = error instanceof InmetError ? error.message : "Erro desconhecido ao consultar o INMET.";
    return {
      feed: "inmet-alerts",
      label: "Avisos meteorológicos (INMET)",
      status: unavailable ? "unavailable" : "error",
      scope: "ERRO",
      scopeNote: `Status: ${unavailable ? "tempo esgotado (timeout)" : "erro ao consultar"} · ${message}`,
      totalUpstream: 0,
      totalWithoutCoordinates: 0,
      totalInRegion: 0,
      records: [],
      filteredLocally: true,
      radiusKm: null,
      error: message,
      provenance: baseProvenance,
    };
  }

  const totalUpstream = (raw.hoje?.length ?? 0) + (raw.futuro?.length ?? 0);
  const alerts = filterAlertsForCampoGrande(raw);
  const records = alerts.map((alert) => toRecord(alert, fetchedAt));

  return {
    feed: "inmet-alerts",
    label: "Avisos meteorológicos (INMET)",
    status: records.length > 0 ? "ok" : "empty",
    // LOCAL, não GLOBAL_FILTRADO: o filtro usa a lista oficial de municípios do próprio aviso
    // (geocode IBGE), não um raio calculado por nós — é a fonte quem diz que cobre Campo Grande.
    scope: records.length > 0 ? "LOCAL" : "INDISPONIVEL",
    scopeNote:
      records.length > 0
        ? `Status: API operacional · ${records.length} de ${totalUpstream} aviso(s) ativos no Brasil listam Campo Grande - MS (geocode IBGE 5002704) entre os municípios cobertos.`
        : `Status: API operacional · Nenhum dos ${totalUpstream} aviso(s) ativos no Brasil no momento lista Campo Grande - MS — não há aviso meteorológico ativo para a cidade agora.`,
    totalUpstream,
    totalWithoutCoordinates: records.length, // avisos são áreas (polígono), não pontos — nunca teriam `position`
    totalInRegion: records.length,
    records,
    filteredLocally: true,
    radiusKm: null,
    provenance: baseProvenance,
  };
}
