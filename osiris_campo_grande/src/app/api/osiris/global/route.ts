import { NextResponse } from "next/server";
import { fetchAllGlobalFeeds, fetchApiHealth, fetchRegionDossier } from "@/services/feeds.service";
import { fetchMunicipalityInfo } from "@/services/municipality.service";

export const dynamic = "force-dynamic";

/**
 * Dados que não dependem do raio de busca: feeds sem coordenadas por
 * registro (clima espacial, estatísticas agregadas da própria OSIRIS,
 * risco por país) — mostrados como contexto global, nunca como dado
 * específico de Campo Grande — mais o status da API (`health`), o
 * resultado do lookup pontual (`region-dossier`, OSIRIS) e a identidade
 * territorial oficial (`municipality`, IBGE). Nenhum desses é uma lista
 * filtrável por raio, por isso não cabem no formato de `FeedResult`.
 */
export async function GET() {
  const [feeds, regionDossier, health, municipality] = await Promise.all([
    fetchAllGlobalFeeds(),
    fetchRegionDossier(),
    fetchApiHealth(),
    fetchMunicipalityInfo(),
  ]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    feeds,
    regionDossier,
    health,
    municipality,
  });
}
