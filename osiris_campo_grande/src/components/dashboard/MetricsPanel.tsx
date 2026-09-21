"use client";

import type { ApiHealth, FeedResult, GlobalFeedResult, MunicipalityResult, RegionDossierResult } from "@/types";
import { RegionDossierCard } from "./RegionDossierCard";

interface MetricsPanelProps {
  feeds: FeedResult[];
  globalFeeds: GlobalFeedResult[];
  regionDossier: RegionDossierResult | null;
  municipality: MunicipalityResult | null;
  health: ApiHealth | null;
  radiusKm: number;
  generatedAt: string | null;
  loading: boolean;
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
}

/** Evita mostrar "0" enquanto a primeira consulta ainda não voltou — um 0
 * antes de carregar pareceria "sem dados" quando na verdade é "ainda não
 * perguntamos" (pedido explícito, seção 6). */
function MetricCard({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" | "ok" }) {
  const toneClass = tone === "warn" ? "text-amber-600" : tone === "ok" ? "text-emerald-700" : "text-slate-900";
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
      <p className="truncate text-xs text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  );
}

function HealthBadge({ health }: { health: ApiHealth | null }) {
  if (!health) return <span className="text-xs text-slate-500">Status da API: —</span>;
  if (health.status !== "ok") {
    return <span className="text-xs font-medium text-red-600">Status da API: indisponível ({health.detail ?? "sem detalhe"})</span>;
  }
  return (
    <span className="text-xs font-medium text-emerald-700">
      Status da API: operacional{health.version ? ` · v${health.version}` : ""}
      {health.uptimeSeconds !== null ? ` · ${Math.round(health.uptimeSeconds / 60)} min no ar` : ""}
    </span>
  );
}

export function MetricsPanel({ feeds, globalFeeds, regionDossier, municipality, health, radiusKm, generatedAt, loading }: MetricsPanelProps) {
  const totalInRegion = feeds.reduce((sum, feed) => sum + feed.totalInRegion, 0);
  const withData = feeds.filter((f) => f.scope === "LOCAL" || f.scope === "GLOBAL_FILTRADO").length;
  const withoutCoverage = feeds.filter((f) => f.scope === "INDISPONIVEL").length;
  const withErrors = feeds.filter((f) => f.scope === "ERRO");
  const fontesConsultadas = feeds.length + globalFeeds.length;

  const value = (n: number) => (loading ? "—" : String(n));

  const stats = globalFeeds.find((feed) => feed.feed === "stats");
  const spaceWeather = globalFeeds.find((feed) => feed.feed === "space-weather");
  const countryRisk = globalFeeds.find((feed) => feed.feed === "country-risk");

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Campo Grande / Região</h3>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="Registros na região" value={value(totalInRegion)} />
          <MetricCard label="Fontes com dado" value={loading ? "—" : `${withData} de ${feeds.length}`} tone={withData > 0 ? "ok" : "default"} />
          <MetricCard label="Raio da região" value={`${radiusKm} km`} />
          <MetricCard
            label="Sem cobertura local"
            value={value(withoutCoverage)}
            tone={withoutCoverage > 0 ? "warn" : "default"}
          />
        </div>

        {municipality?.status === "ok" && municipality.data && (
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">Identidade territorial oficial (IBGE)</p>
            <p className="mt-1">
              {municipality.data.nome} · {municipality.data.microrregiao} · {municipality.data.mesorregiao} ·{" "}
              {municipality.data.uf} ({municipality.data.ufSigla}) · Região {municipality.data.regiao}
            </p>
          </div>
        )}

        <div className="mt-3">
          <RegionDossierCard dossier={regionDossier} />
        </div>
      </section>

      <section className="flex flex-col gap-1.5 text-xs text-slate-500">
        <p>
          Última atualização: {formatTime(generatedAt)} · {fontesConsultadas} fontes consultadas
          {withErrors.length > 0 && (
            <span className="font-medium text-red-600"> · {withErrors.length} com erro agora</span>
          )}
        </p>
        <HealthBadge health={health} />
        <p>
          Dados e integrações via{" "}
          <a href="https://osirisai.live/docs" target="_blank" rel="noreferrer" className="underline">
            OSIRIS
          </a>
          , INMET e IBGE — e respectivos provedores upstream (ver &ldquo;Fontes e créditos&rdquo; em{" "}
          <a href="/sobre" className="underline">
            /sobre
          </a>
          ).
        </p>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contexto OSIRIS (não é Campo Grande)</h3>
        <div className="mt-2 flex flex-col gap-2">
          {stats?.status === "ok" && stats.data && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Estatísticas globais da OSIRIS</p>
              <p className="mt-1">
                {Object.entries((stats.data.stats ?? stats.data) as Record<string, unknown>)
                  .filter(([key]) => key !== "timestamp")
                  .map(([key, val]) => `${key}: ${String(val)}`)
                  .join(" · ")}
              </p>
            </div>
          )}
          {spaceWeather?.status === "ok" && spaceWeather.data && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Clima espacial (mundo)</p>
              <p className="mt-1">
                Índice Kp: {String(spaceWeather.data.kp_index)} · Nível: {String(spaceWeather.data.storm_level)}
              </p>
            </div>
          )}
          {countryRisk && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Risco por país</p>
              <p className="mt-1">{countryRisk.note}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
