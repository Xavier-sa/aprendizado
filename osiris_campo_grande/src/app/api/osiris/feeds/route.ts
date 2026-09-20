import { NextRequest, NextResponse } from "next/server";
import { fetchAllFeeds } from "@/services/feeds.service";
import { CAMPO_GRANDE_CENTER, DEFAULT_RADIUS_KM } from "@/lib/osiris/geo";

export const dynamic = "force-dynamic";

/**
 * Único endpoint que o browser chama para os dados geográficos. Ele, por
 * sua vez, chama a OSIRIS pelo `OsirisClient` — o browser nunca fala
 * diretamente com osirisai.live (seção 8 do pedido).
 */
export async function GET(request: NextRequest) {
  const radiusParam = request.nextUrl.searchParams.get("radiusKm");
  const radiusKm = radiusParam && Number.isFinite(Number(radiusParam)) ? Number(radiusParam) : DEFAULT_RADIUS_KM;

  const feeds = await fetchAllFeeds(radiusKm);

  return NextResponse.json({
    center: CAMPO_GRANDE_CENTER,
    radiusKm,
    generatedAt: new Date().toISOString(),
    feeds,
  });
}
