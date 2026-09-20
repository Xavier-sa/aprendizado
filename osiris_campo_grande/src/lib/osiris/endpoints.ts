import type { FeedKey, GlobalFeedKey } from "@/types";
import type { PreNormalized } from "./normalizers";
import {
  normalizeAirQuality,
  normalizeCctv,
  normalizeConflicts,
  normalizeEarthquakes,
  normalizeFires,
  normalizeFlights,
  normalizeGdelt,
  normalizeInfrastructure,
  normalizeMaritime,
  normalizeRadar,
  normalizeSatellites,
  normalizeSentinel,
  normalizeWeather,
} from "./normalizers";

export interface FeedConfig {
  path: string;
  label: string;
  /** TTL documentado pela OSIRIS para este endpoint (ver docs/osiris-api-discovery.md). */
  revalidateSeconds: number;
  normalize: (raw: unknown) => PreNormalized[];
  /** true quando o próprio endpoint já aceita lat/lng (só `sentinel` hoje). */
  supportsPointQuery?: boolean;
  /**
   * Provedor upstream conforme a PRÓPRIA DESCRIÇÃO da OSIRIS na
   * documentação (não veio do corpo da resposta) — usado só quando a
   * resposta em si não declara um campo `source`/`sources`/`providers`.
   * Ver `Provenance.upstreamSourceOrigin`.
   */
  documentedUpstream?: string;
}

export const FEED_CONFIG: Record<FeedKey, FeedConfig> = {
  flights: { path: "/flights", label: "Voos (ADS-B)", revalidateSeconds: 60, normalize: normalizeFlights },
  satellites: {
    path: "/satellites",
    label: "Satélites",
    revalidateSeconds: 60,
    normalize: normalizeSatellites,
  },
  weather: {
    path: "/weather",
    label: "Eventos climáticos severos (NASA EONET)",
    revalidateSeconds: 60,
    normalize: normalizeWeather,
    documentedUpstream: "NASA EONET",
  },
  earthquakes: {
    path: "/earthquakes",
    label: "Terremotos (USGS)",
    revalidateSeconds: 60,
    normalize: normalizeEarthquakes,
    documentedUpstream: "USGS",
  },
  fires: { path: "/fires", label: "Focos de incêndio (NASA FIRMS)", revalidateSeconds: 60, normalize: normalizeFires },
  cctv: { path: "/cctv", label: "Câmeras públicas", revalidateSeconds: 60, normalize: normalizeCctv },
  infrastructure: {
    path: "/infrastructure",
    label: "Infraestrutura estratégica",
    revalidateSeconds: 86_400,
    normalize: normalizeInfrastructure,
  },
  maritime: { path: "/maritime", label: "Marítimo (portos e navios)", revalidateSeconds: 60, normalize: normalizeMaritime },
  radar: {
    path: "/radar",
    label: "Interferência de GPS / rede",
    revalidateSeconds: 60,
    normalize: normalizeRadar,
  },
  gdelt: { path: "/gdelt", label: "Incidentes geocodificados (GDELT/GDACS)", revalidateSeconds: 60, normalize: normalizeGdelt },
  sentinel: {
    path: "/sentinel",
    label: "Imagens de satélite (Sentinel-1)",
    revalidateSeconds: 60,
    normalize: normalizeSentinel,
    supportsPointQuery: true,
  },
  conflicts: {
    path: "/conflicts",
    label: "Zonas de conflito ativo",
    revalidateSeconds: 60,
    normalize: normalizeConflicts,
  },
  "air-quality": {
    path: "/air-quality",
    label: "Qualidade do ar",
    revalidateSeconds: 60,
    normalize: normalizeAirQuality,
  },
};

export const GLOBAL_FEED_CONFIG: Record<
  GlobalFeedKey,
  { path: string; label: string; revalidateSeconds: number; note: string }
> = {
  "space-weather": {
    path: "/space-weather",
    label: "Clima espacial (NOAA SWPC)",
    revalidateSeconds: 60,
    note: "Dado global (índice geomagnético e erupções solares) — sem coordenadas por registro, não é específico de Campo Grande.",
  },
  stats: {
    path: "/stats",
    label: "Estatísticas agregadas da OSIRIS",
    revalidateSeconds: 60,
    note: "Contadores globais de TODOS os feeds da OSIRIS no mundo — não representam Campo Grande, mostrados só como contexto da plataforma.",
  },
  "country-risk": {
    path: "/country-risk",
    label: "Risco por país",
    revalidateSeconds: 60,
    note: "Lista curada de ~20 países (não é \"todos os países\"). Testado: o Brasil não está nesta lista — por isso não há um \"risco de Campo Grande\" derivável daqui.",
  },
};
