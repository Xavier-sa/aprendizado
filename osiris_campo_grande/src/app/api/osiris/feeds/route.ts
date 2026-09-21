import { NextRequest, NextResponse } from "next/server";
import { fetchSituationFeeds } from "@/services/feeds.service";
import { computeChangeSummary } from "@/services/snapshot.service";
import { CAMPO_GRANDE_CENTER, DEFAULT_RADIUS_KM, RADIUS_OPTIONS_KM } from "@/lib/osiris/geo";

export const dynamic = "force-dynamic";

/**
 * Único endpoint que o browser chama para os dados geográficos — hoje
 * combina OSIRIS (filtrada por raio) e INMET (avisos que listam Campo
 * Grande, independente de raio); ver `fetchSituationFeeds`. O browser
 * nunca fala diretamente com osirisai.live/inmet.gov.br (seção 8 do
 * pedido original).
 */
export async function GET(request: NextRequest) {
  const radiusParam = Number(request.nextUrl.searchParams.get("radiusKm"));
  const radiusKm = RADIUS_OPTIONS_KM.includes(radiusParam as (typeof RADIUS_OPTIONS_KM)[number])
    ? radiusParam
    : DEFAULT_RADIUS_KM;

  const feeds = await fetchSituationFeeds(radiusKm);
  const changeSummary = computeChangeSummary(radiusKm, feeds);

  return NextResponse.json({
    center: CAMPO_GRANDE_CENTER,
    radiusKm,
    generatedAt: new Date().toISOString(),
    feeds,
    changeSummary,
  });
}
