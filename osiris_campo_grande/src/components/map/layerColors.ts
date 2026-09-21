import type { SourceKey } from "@/types";

/**
 * Uma cor por camada, só para diferenciar visualmente os marcadores no
 * mapa (não tem relação com severidade/risco calculado por nós — nem a
 * OSIRIS nem o INMET fornecem uma escala de risco unificada entre feeds
 * tão diferentes; a cor de cada aviso do INMET no mapa vem do próprio
 * `aviso_cor` retornado pela fonte, não daqui).
 */
export const LAYER_COLORS: Record<SourceKey, string> = {
  flights: "#2563eb",
  satellites: "#7c3aed",
  weather: "#f59e0b",
  earthquakes: "#b91c1c",
  fires: "#ea580c",
  cctv: "#0891b2",
  infrastructure: "#4b5563",
  maritime: "#0369a1",
  radar: "#a16207",
  gdelt: "#be185d",
  sentinel: "#15803d",
  conflicts: "#991b1b",
  "air-quality": "#65a30d",
  "inmet-alerts": "#dc2626",
};
