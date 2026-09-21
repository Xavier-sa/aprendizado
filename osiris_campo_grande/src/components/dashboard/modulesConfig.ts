import type { SourceKey } from "@/types";

export interface ImageCredit {
  text: string;
  url?: string;
}

export interface ModuleImage {
  src: string;
  alt: string;
  /** Só presente quando a imagem é uma fotografia real de terceiro — nunca omitido nesse caso (seção "Créditos" do pedido). */
  credit?: ImageCredit;
}

export interface ModuleConfig {
  id: string;
  title: string;
  question: string;
  description: string;
  image: ModuleImage;
  /**
   * Feeds (`SourceKey`) que este módulo agrega. Contagem/status/escopo
   * exibidos vêm do resultado REAL desses feeds em tempo de execução
   * (`useFeeds`), nunca fixos aqui.
   */
  feeds: SourceKey[];
}

/**
 * Três módulos temáticos (pedido explícito, seção 8) — substituem a
 * antiga galeria de 8 cards por feed individual. Um card por feed virou
 * ruído visual sem responder a nenhuma pergunta concreta; um card por
 * MÓDULO agrega o que é realmente relevante e responde a uma pergunta
 * específica sobre a situação de Campo Grande agora.
 *
 * Feeds que nunca têm relevância local comprovada para Campo Grande
 * (terremotos, infraestrutura estratégica fora do Brasil, marítimo,
 * radar/GPS, conflitos armados, risco por país) ficam de fora dos três
 * módulos — continuam auditáveis na aba "Fontes", mas não fingem ser
 * "recursos de Campo Grande" que na prática nunca têm dado local (seção
 * 5 e seção 12 do pedido).
 */
export const MODULE_CONFIG: ModuleConfig[] = [
  {
    id: "ambiente-fogo",
    title: "Ambiente & Fogo",
    question: "Existe alguma situação ambiental relevante próxima?",
    description: "Focos de calor, eventos climáticos severos, cobertura de satélite e qualidade do ar dentro do raio.",
    image: {
      src: "/images/cards/fires.jpg",
      alt: "Fumaça de queimadas na floresta amazônica, vista da Estação Espacial Internacional",
      credit: {
        text: "NASA / ISS Crew Earth Observations Facility — domínio público",
        url: "https://science.nasa.gov/earth/earth-observatory/amazon-forest-fires-84403",
      },
    },
    feeds: ["fires", "weather", "sentinel", "air-quality"],
  },
  {
    id: "cidade-mobilidade",
    title: "Cidade & Mobilidade",
    question: "Há contexto útil sobre infraestrutura e mobilidade na região?",
    description: "Aeronaves na região como contexto de mobilidade aérea, câmeras públicas e infraestrutura, quando houver cobertura real.",
    image: {
      src: "/images/cards/flights.svg",
      alt: "Ilustração de um avião em rota sobre o céu",
    },
    feeds: ["flights", "cctv", "infrastructure"],
  },
  {
    id: "situacao-alertas",
    title: "Situação & Alertas",
    question: "Existe algum alerta ativo ou mudança recente relevante?",
    description: "Avisos meteorológicos oficiais do INMET para Campo Grande, incidentes geocodificados e o que mudou desde a última consulta.",
    image: {
      src: "/images/cards/events.svg",
      alt: "Ilustração de um globo com pontos marcando eventos geocodificados",
    },
    feeds: ["inmet-alerts", "gdelt"],
  },
];
