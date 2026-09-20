import { NextResponse } from "next/server";
import { fetchAllGlobalFeeds, fetchApiHealth, fetchRegionDossier } from "@/services/feeds.service";

export const dynamic = "force-dynamic";

/**
 * Feeds sem coordenadas por registro (clima espacial, estatísticas
 * agregadas da própria OSIRIS, risco por país) — mostrados como contexto
 * global, nunca como dado específico de Campo Grande — mais o status da
 * API (`health`) e o resultado do lookup pontual (`region-dossier`), que
 * não são listas e por isso não cabem no formato de `FeedResult`.
 */
export async function GET() {
  const [feeds, regionDossier, health] = await Promise.all([
    fetchAllGlobalFeeds(),
    fetchRegionDossier(),
    fetchApiHealth(),
  ]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    feeds,
    regionDossier,
    health,
  });
}
