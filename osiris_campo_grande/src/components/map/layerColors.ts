import type { FeedKey } from "@/types";

/**
 * Uma cor por camada, só para diferenciar visualmente os marcadores no
 * mapa (não tem relação com severidade/risco calculado por nós — a OSIRIS
 * não fornece uma escala de risco unificada entre feeds tão diferentes).
 */
export const LAYER_COLORS: Record<FeedKey, string> = {
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
};
