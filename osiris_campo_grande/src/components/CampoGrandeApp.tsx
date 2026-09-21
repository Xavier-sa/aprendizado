"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { NormalizedRecord, SourceKey } from "@/types";
import { useFeeds } from "@/components/dashboard/useFeeds";
import { MetricsPanel } from "@/components/dashboard/MetricsPanel";
import { FeedStatusList } from "@/components/dashboard/FeedStatusList";
import { SituacaoAgora } from "@/components/dashboard/SituacaoAgora";
import { LayerToggle } from "@/components/map/LayerToggle";
import { DataExplorer } from "@/components/explorer/DataExplorer";
import { RecordDetail } from "@/components/explorer/RecordDetail";
import { CAMPO_GRANDE_CENTER, DEFAULT_RADIUS_KM } from "@/lib/osiris/geo";

// Leaflet acessa `window` no import — precisa ficar fora do SSR.
const MapView = dynamic(() => import("@/components/map/MapView").then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
      Carregando mapa…
    </div>
  ),
});

type Tab = "inicio" | "camadas" | "painel" | "fontes" | "explorar";

const ALL_SOURCE_KEYS: SourceKey[] = [
  "flights",
  "satellites",
  "weather",
  "earthquakes",
  "fires",
  "cctv",
  "infrastructure",
  "maritime",
  "radar",
  "gdelt",
  "sentinel",
  "conflicts",
  "air-quality",
  "inmet-alerts",
];

export function CampoGrandeApp() {
  const [radiusKm, setRadiusKm] = useState<number>(DEFAULT_RADIUS_KM);
  const { feeds, globalFeeds, regionDossier, municipality, health, changeSummary, center, generatedAt, loading, error } =
    useFeeds(radiusKm);
  const [visibleLayers, setVisibleLayers] = useState<Set<SourceKey>>(() => new Set(ALL_SOURCE_KEYS));
  const [selectedRecord, setSelectedRecord] = useState<NormalizedRecord | null>(null);
  const [tab, setTab] = useState<Tab>("inicio");

  const effectiveCenter = center ?? CAMPO_GRANDE_CENTER;

  const toggleLayer = (feed: SourceKey) => {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      if (next.has(feed)) next.delete(feed);
      else next.add(feed);
      return next;
    });
  };

  const handleSelect = (record: NormalizedRecord) => {
    setSelectedRecord(record);
    setTab("explorar");
  };

  const handleExploreFeeds = (keys: SourceKey[]) => {
    setVisibleLayers((prev) => new Set([...prev, ...keys]));
    setTab("camadas");
  };

  const tabs: { key: Tab; label: string }[] = useMemo(
    () => [
      { key: "inicio", label: "Situação" },
      { key: "camadas", label: "Camadas" },
      { key: "painel", label: "Painel" },
      { key: "fontes", label: "Fontes" },
      { key: "explorar", label: "Explorar" },
    ],
    [],
  );

  const registrosGeorreferenciados = feeds.reduce((sum, feed) => sum + feed.totalInRegion, 0);

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col">
      <header className="flex shrink-0 flex-col gap-1 border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-slate-900">OSIRIS Campo Grande</h1>
            <p className="text-xs text-slate-500">Observatório de dados e riscos para Campo Grande/MS e região.</p>
          </div>
          <StatusPill loading={loading} error={error} />
        </div>
        <p className="text-[11px] text-slate-400">
          {loading
            ? "Carregando fontes…"
            : `${feeds.length + globalFeeds.length} fontes consultadas · ${registrosGeorreferenciados} registro(s) georreferenciado(s) em até ${radiusKm}km`}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="h-[45dvh] shrink-0 lg:h-auto lg:flex-1">
          <MapView
            center={effectiveCenter}
            radiusKm={radiusKm}
            feeds={feeds}
            visibleLayers={visibleLayers}
            onSelectRecord={handleSelect}
          />
        </div>

        <aside
          className={`flex min-h-0 flex-1 flex-col border-t border-slate-200 bg-white lg:flex-none lg:border-l lg:border-t-0 ${
            tab === "inicio" ? "lg:w-[38rem]" : "lg:w-[26rem]"
          }`}
        >
          <nav className="flex shrink-0 border-b border-slate-200">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`flex-1 px-2 py-2.5 text-sm font-medium ${
                  tab === item.key ? "border-b-2 border-slate-900 text-slate-900" : "text-slate-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
            {tab === "inicio" && (
              <SituacaoAgora
                feeds={feeds}
                regionDossier={regionDossier}
                municipality={municipality}
                changeSummary={changeSummary}
                radiusKm={radiusKm}
                onRadiusChange={setRadiusKm}
                loading={loading}
                onExploreFeeds={handleExploreFeeds}
                onOpenPanel={() => setTab("painel")}
              />
            )}
            {tab === "camadas" && (
              <LayerToggle feeds={feeds} visibleLayers={visibleLayers} onToggle={toggleLayer} />
            )}
            {tab === "painel" && (
              <MetricsPanel
                feeds={feeds}
                globalFeeds={globalFeeds}
                regionDossier={regionDossier}
                municipality={municipality}
                health={health}
                radiusKm={radiusKm}
                generatedAt={generatedAt}
                loading={loading}
              />
            )}
            {tab === "fontes" && <FeedStatusList feeds={feeds} globalFeeds={globalFeeds} regionDossier={regionDossier} />}
            {tab === "explorar" &&
              (selectedRecord ? (
                <RecordDetail record={selectedRecord} onClose={() => setSelectedRecord(null)} />
              ) : (
                <DataExplorer feeds={feeds} onSelect={handleSelect} selectedId={null} />
              ))}
          </div>

          <footer className="shrink-0 border-t border-slate-200 px-3 py-2 text-center text-[11px] text-slate-400">
            Dados e integrações via OSIRIS, INMET e IBGE e respectivos provedores upstream ·{" "}
            <Link href="/sobre" className="underline">
              Sobre o projeto
            </Link>
          </footer>
        </aside>
      </div>
    </div>
  );
}

function StatusPill({ loading, error }: { loading: boolean; error: string | null }) {
  if (error) {
    return <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Fonte temporariamente indisponível</span>;
  }
  if (loading) {
    return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Carregando…</span>;
  }
  return <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Atualizado</span>;
}
