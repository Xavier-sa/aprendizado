import type { RecordGeometry } from "@/types";

/** Forma real observada em `GET /avisos/ativos` (testado em 2026-09-21) — só os campos que este projeto usa. */
export interface RawInmetAlert {
  id: number;
  id_aviso: number;
  descricao: string;
  severidade: string;
  aviso_cor: string;
  data_inicio: string;
  hora_inicio: string;
  data_fim: string;
  hora_fim: string;
  inicio: string;
  fim: string;
  /** String separada por vírgulas, formato "Nome - UF (geocodeIBGE)" — não é um array. */
  municipios: string;
  /** String separada por vírgulas com os geocodes IBGE, na mesma ordem de `municipios`. */
  geocodes: string;
  estados: string;
  riscos: string[];
  instrucoes: string[];
  poligono: string;
  encerrado: boolean;
}

interface RawInmetAlertsResponse {
  hoje: RawInmetAlert[];
  futuro: RawInmetAlert[];
}

export interface CampoGrandeAlert {
  id: string;
  title: string;
  severity: string;
  color: string;
  startsAt: string;
  endsAt: string;
  risks: string[];
  instructions: string[];
  geometry: RecordGeometry | null;
  raw: RawInmetAlert;
}

/**
 * Geocode IBGE de Campo Grande - MS. Usado como âncora exata (nunca
 * comparação por nome) porque existem outras localidades chamadas "Campo
 * Grande" no Brasil (ex.: um distrito de São Paulo) — testado e
 * confirmado: o único jeito seguro de saber se um aviso cobre ESTE
 * município é conferir o geocode, não o texto do nome.
 */
const CAMPO_GRANDE_MS_GEOCODE = "5002704";

function parsePolygon(raw: string): RecordGeometry | null {
  try {
    const geojson = JSON.parse(raw) as { type?: string; coordinates?: unknown };
    if (geojson.type === "Polygon" || geojson.type === "MultiPolygon") {
      return geojson as RecordGeometry;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Filtra os avisos ativos do INMET para os que realmente listam Campo
 * Grande - MS no campo `geocodes` (comparação exata por código, não por
 * substring nem pelo nome). Testado na prática: o polígono (`poligono`)
 * de alguns avisos é mais abrangente/impreciso que a lista oficial de
 * municípios do próprio aviso — por isso o filtro usa `geocodes`, não
 * "ponto dentro do polígono".
 */
export function filterAlertsForCampoGrande(response: RawInmetAlertsResponse): CampoGrandeAlert[] {
  const all = [...(response.hoje ?? []), ...(response.futuro ?? [])];
  const relevant = all.filter((alert) => {
    const codes = String(alert.geocodes ?? "").split(",");
    return codes.includes(CAMPO_GRANDE_MS_GEOCODE) && !alert.encerrado;
  });

  // Dedup: o mesmo aviso plurianual pode aparecer em `hoje` e `futuro` com o mesmo `id`.
  const seen = new Set<number>();
  const deduped = relevant.filter((alert) => {
    if (seen.has(alert.id)) return false;
    seen.add(alert.id);
    return true;
  });

  return deduped.map((alert) => ({
    id: String(alert.id),
    title: alert.descricao,
    severity: alert.severidade,
    color: alert.aviso_cor,
    startsAt: alert.data_inicio,
    endsAt: alert.data_fim,
    risks: alert.riscos ?? [],
    instructions: alert.instrucoes ?? [],
    geometry: parsePolygon(alert.poligono),
    raw: alert,
  }));
}

export type { RawInmetAlertsResponse };
