"use client";

import type { ChangeSummary, FeedResult, FeedScope, MunicipalityResult, RegionDossierResult, SourceKey } from "@/types";
import { MODULE_CONFIG } from "./modulesConfig";
import { DataImageCard, type CardStatus } from "./DataImageCard";
import { CampoGrandeHeroCard } from "./CampoGrandeHeroCard";
import { RadiusSelector } from "./RadiusSelector";
import { ChangeSummaryPanel } from "./ChangeSummaryPanel";

interface SituacaoAgoraProps {
  feeds: FeedResult[];
  regionDossier: RegionDossierResult | null;
  municipality: MunicipalityResult | null;
  changeSummary: ChangeSummary | null;
  radiusKm: number;
  onRadiusChange: (km: number) => void;
  loading: boolean;
  onExploreFeeds: (feeds: SourceKey[]) => void;
  onOpenPanel: () => void;
}

const SCOPE_PRIORITY: FeedScope[] = ["LOCAL", "GLOBAL_FILTRADO", "INDISPONIVEL", "ERRO", "GLOBAL"];

function aggregate(feedKeys: SourceKey[], feeds: FeedResult[], loading: boolean): { status: CardStatus; count: number | null; scope: FeedScope | null } {
  if (loading) return { status: "loading", count: null, scope: null };
  const matched = feedKeys.map((key) => feeds.find((f) => f.feed === key)).filter((f): f is FeedResult => Boolean(f));
  if (matched.length === 0) return { status: "loading", count: null, scope: null };

  const count = matched.reduce((sum, f) => sum + f.totalInRegion, 0);
  let scope = matched[0].scope;
  for (const f of matched) {
    if (SCOPE_PRIORITY.indexOf(f.scope) < SCOPE_PRIORITY.indexOf(scope)) scope = f.scope;
  }
  const status: CardStatus = matched.some((f) => f.status === "error" || f.status === "unavailable")
    ? "error"
    : matched.some((f) => f.status === "ok")
      ? "ok"
      : "empty";

  return { status, count, scope };
}

function feedStatValue(feed: FeedResult | undefined, loading: boolean): string {
  if (loading || !feed) return "—";
  if (feed.status === "error" || feed.status === "unavailable") return "Fonte temporariamente indisponível";
  if (feed.status === "empty") return "Fonte consultada — sem registros para a região";
  return `${feed.totalInRegion}`;
}

function latestSentinelDate(feed: FeedResult | undefined): string | null {
  if (!feed) return null;
  const timestamps = feed.records.map((r) => r.timestamp).filter((t): t is string => Boolean(t));
  if (timestamps.length === 0) return null;
  const latest = timestamps.sort().at(-1)!;
  const date = new Date(latest);
  return Number.isNaN(date.getTime()) ? latest : date.toLocaleDateString("pt-BR");
}

/** Uma linha de "Situação agora" (seção 6 do pedido) — valor sempre calculado ao vivo, nunca fixo. */
function StatRow({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 py-1.5 text-xs last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className={`text-right font-medium ${tone === "warn" ? "text-amber-700" : "text-slate-800"}`}>{value}</span>
    </div>
  );
}

export function SituacaoAgora({
  feeds,
  regionDossier,
  municipality,
  changeSummary,
  radiusKm,
  onRadiusChange,
  loading,
  onExploreFeeds,
  onOpenPanel,
}: SituacaoAgoraProps) {
  const totalInRegion = loading ? null : feeds.reduce((sum, f) => sum + f.totalInRegion, 0);
  const fires = feeds.find((f) => f.feed === "fires");
  const flights = feeds.find((f) => f.feed === "flights");
  const weather = feeds.find((f) => f.feed === "weather");
  const airQuality = feeds.find((f) => f.feed === "air-quality");
  const alerts = feeds.find((f) => f.feed === "inmet-alerts");
  const sentinel = feeds.find((f) => f.feed === "sentinel");
  const sentinelDate = latestSentinelDate(sentinel);
  const fontesDisponiveis = loading ? null : feeds.filter((f) => f.status === "ok").length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Situação agora</h2>
          <p className="text-xs text-slate-500">Campo Grande/MS — calculado a partir de dados reais, atualizado a cada minuto.</p>
        </div>
        <RadiusSelector value={radiusKm} onChange={onRadiusChange} disabled={loading} />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <StatRow label="Focos de calor próximos" value={feedStatValue(fires, loading)} tone={fires?.status === "ok" ? "warn" : "default"} />
        <StatRow label="Aeronaves detectadas na região" value={feedStatValue(flights, loading)} />
        <StatRow label="Última cobertura Sentinel disponível" value={loading ? "—" : sentinelDate ? `Cena de ${sentinelDate} cobrindo o ponto` : "Nenhuma cena cobre o ponto no momento"} />
        <StatRow label="Eventos climáticos severos próximos" value={feedStatValue(weather, loading)} />
        <StatRow label="Qualidade do ar" value={loading ? "—" : airQuality?.status === "ok" ? feedStatValue(airQuality, loading) : "Sem dados disponíveis (0 estações reportando no momento)"} />
        <StatRow
          label="Avisos meteorológicos ativos (INMET)"
          value={feedStatValue(alerts, loading)}
          tone={alerts?.status === "ok" ? "warn" : "default"}
        />
        <StatRow label="Fontes com dado disponível" value={loading ? "—" : `${fontesDisponiveis} de ${feeds.length}`} />
        <StatRow label="Registros totais encontrados no raio" value={loading ? "—" : `${totalInRegion}`} />
      </div>

      <ChangeSummaryPanel summary={changeSummary} loading={loading} />

      <CampoGrandeHeroCard
        regionDossier={regionDossier}
        municipality={municipality}
        radiusKm={radiusKm}
        totalRecordsInRegion={totalInRegion}
        onAction={onOpenPanel}
      />

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {MODULE_CONFIG.map((module) => {
          const { status, count, scope } = aggregate(module.feeds, feeds, loading);
          return (
            <div key={module.id} className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink">
              <DataImageCard
                title={module.title}
                question={module.question}
                description={module.description}
                image={module.image}
                status={status}
                count={count}
                scope={scope}
                actionLabel="Ver no mapa"
                onAction={() => onExploreFeeds(module.feeds)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
