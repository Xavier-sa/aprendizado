export const THEME_IDS = ["PAPIRO", "ESMERALDA", "OCEANO", "GRAFITE", "AMETISTA"] as const;
export type Theme = typeof THEME_IDS[number];
export const DEFAULT_THEME: Theme = "PAPIRO";
export const THEMES: { id: Theme; name: string; description: string }[] = [
  { id: "PAPIRO", name: "Papiro", description: "Pergaminho e bronze, a identidade do FinanceBot." },
  { id: "ESMERALDA", name: "Esmeralda", description: "Verde sereno inspirado em crescimento." },
  { id: "OCEANO", name: "Oceano", description: "Azul sóbrio para uma visão tranquila." },
  { id: "GRAFITE", name: "Grafite", description: "Uma paleta escura completa e neutra." },
  { id: "AMETISTA", name: "Ametista", description: "Roxo discreto com superfícies suaves." },
];
