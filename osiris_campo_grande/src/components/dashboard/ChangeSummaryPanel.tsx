"use client";

import type { ChangeSummary } from "@/types";

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
}

const KIND_ICON: Record<string, string> = {
  "new-records": "🔺",
  "fewer-records": "🔻",
  "new-sentinel-coverage": "🛰️",
  "source-recovered": "✅",
  "source-failed": "⚠️",
};

/**
 * "O que mudou?" (seção 9 do pedido). Compara a consulta atual com a
 * anterior (mesmo raio) via `computeChangeSummary` — regras determinísticas,
 * nunca uma gravidade "julgada" por IA. Sem observação anterior (primeira
 * consulta do processo, ou processo reiniciado), mostra isso explicitamente
 * em vez de inventar uma mudança.
 */
export function ChangeSummaryPanel({ summary, loading }: { summary: ChangeSummary | null; loading: boolean }) {
  if (loading || !summary) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">O que mudou?</p>
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-200" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">O que mudou?</p>
      {!summary.previousCheckedAt ? (
        <p className="mt-1 text-xs text-slate-500">
          Primeira observação desta sessão do servidor — sem consulta anterior para comparar ainda. Volte em alguns
          minutos.
        </p>
      ) : summary.events.length === 0 ? (
        <p className="mt-1 text-xs text-slate-500">
          Nenhuma mudança relevante desde a última observação ({formatTime(summary.previousCheckedAt)}).
        </p>
      ) : (
        <ul className="mt-1.5 flex flex-col gap-1">
          {summary.events.map((event, index) => (
            <li key={index} className="flex items-start gap-1.5 text-xs text-slate-700">
              <span aria-hidden="true">{KIND_ICON[event.kind] ?? "•"}</span>
              <span>{event.message}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-1.5 text-[10px] text-slate-400">
        Comparado com {formatTime(summary.previousCheckedAt)} · agora: {formatTime(summary.currentCheckedAt)}
      </p>
    </div>
  );
}
