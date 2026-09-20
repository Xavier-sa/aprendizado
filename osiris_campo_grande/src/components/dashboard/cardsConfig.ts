import type { FeedKey } from "@/types";

export interface ImageCredit {
  text: string;
  url?: string;
}

export interface CardImage {
  src: string;
  alt: string;
  /** Só presente quando a imagem é uma fotografia real de terceiro — nunca omitido nesse caso (seção "Créditos" do pedido). */
  credit?: ImageCredit;
}

export interface CardConfig {
  id: string;
  title: string;
  description: string;
  image: CardImage;
  /**
   * Feeds (`FeedKey`) que este card representa. Um card pode agregar mais
   * de um feed (ex.: "Satélites / Sentinel" junta `satellites` + `sentinel`)
   * — a contagem e o escopo exibidos são calculados a partir do resultado
   * REAL desses feeds em tempo de execução (`useFeeds`), nunca fixos aqui.
   */
  feeds: FeedKey[];
}

/**
 * Cards "com atalho para feed real". O card de Campo Grande/Região (que usa
 * o `region-dossier`, não um `FeedKey`) é tratado à parte em
 * `ExploreDataSection.tsx`, porque sua fonte de dado é diferente (uma
 * consulta pontual, não uma lista filtrada por raio).
 *
 * Apenas os feeds citados explicitamente no pedido (seção "Objetivo")
 * viraram card — os demais (terremotos, infraestrutura, marítimo, radar,
 * conflitos) continuam acessíveis pelas abas "Camadas"/"Fontes", sem
 * card dedicado, para não sobrecarregar esta seção.
 */
export const CARD_CONFIG: CardConfig[] = [
  {
    id: "satellites",
    title: "Satélites / Sentinel",
    description: "Objetos em órbita e cenas de observação da Terra encontrados perto de Campo Grande.",
    image: {
      src: "/images/cards/satellites.svg",
      alt: "Ilustração de um satélite sobre a curva da Terra, no espaço",
    },
    feeds: ["satellites", "sentinel"],
  },
  {
    id: "flights",
    title: "Voos",
    description: "Aeronaves civis e militares captadas via ADS-B sobrevoando a região.",
    image: {
      src: "/images/cards/flights.svg",
      alt: "Ilustração de um avião em rota sobre o céu",
    },
    feeds: ["flights"],
  },
  {
    id: "fires",
    title: "Incêndios",
    description: "Focos de calor detectados por satélite (NASA FIRMS) dentro do raio de busca.",
    image: {
      src: "/images/cards/fires.jpg",
      alt: "Fumaça de queimadas na floresta amazônica, vista da Estação Espacial Internacional",
      credit: {
        text: "NASA / ISS Crew Earth Observations Facility — domínio público",
        url: "https://science.nasa.gov/earth/earth-observatory/amazon-forest-fires-84403",
      },
    },
    feeds: ["fires"],
  },
  {
    id: "weather",
    title: "Clima",
    description: "Eventos climáticos severos (NASA EONET) — não é previsão do tempo nem temperatura atual.",
    image: {
      src: "/images/cards/weather.jpg",
      alt: "Imagem de satélite do Ciclone Nargis girando sobre o Golfo de Bengala",
      credit: {
        text: "NASA / MODIS Rapid Response (Jeff Schmaltz) — domínio público",
        url: "https://science.nasa.gov/earth/earth-observatory/cyclone-nargis-8711/",
      },
    },
    feeds: ["weather"],
  },
  {
    id: "events",
    title: "Eventos",
    description: "Incidentes geocodificados de fontes abertas (GDELT/GDACS) próximos à região.",
    image: {
      src: "/images/cards/events.svg",
      alt: "Ilustração de um globo com pontos marcando eventos geocodificados",
    },
    feeds: ["gdelt"],
  },
  {
    id: "cctv",
    title: "Câmeras públicas",
    description: "Câmeras de trânsito e webcams públicas listadas pela OSIRIS dentro do raio de busca.",
    image: {
      src: "/images/cards/cctv.svg",
      alt: "Ilustração de uma câmera de vigilância pública",
    },
    feeds: ["cctv"],
  },
  {
    id: "air-quality",
    title: "Qualidade do ar",
    description: "Estações terrestres de monitoramento de qualidade do ar.",
    image: {
      src: "/images/cards/air-quality.svg",
      alt: "Ilustração de uma chaminé emitindo fumaça sobre um horizonte de cidade",
    },
    feeds: ["air-quality"],
  },
];
