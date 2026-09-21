"use client";

import { useMemo, useState } from "react";
import type { FeedResult, NormalizedRecord, SourceKey } from "@/types";

interface DataExplorerProps {
  feeds: FeedResult[];
  onSelect: (record: NormalizedRecord) => void;
  selectedId: string | null;
}

export function DataExplorer({ feeds, onSelect, selectedId }: DataExplorerProps) {
  const [filter, setFilter] = useState<SourceKey | "all">("all");
  const [search, setSearch] = useState("");

  const records = useMemo(() => {
    const all = feeds.flatMap((feed) => feed.records);
    const byFeed = filter === "all" ? all : all.filter((record) => record.feed === filter);
    const term = search.trim().toLowerCase();
    const filtered = term
      ? byFeed.filter((record) => record.title.toLowerCase().includes(term) || record.type.toLowerCase().includes(term))
      : byFeed;
    return filtered.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [feeds, filter, search]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as SourceKey | "all")}
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm"
        >
          <option value="all">Todas as categorias</option>
          {feeds.map((feed) => (
            <option key={feed.feed} value={feed.feed}>
              {feed.label} ({feed.totalInRegion})
            </option>
          ))}
        </select>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título ou tipo..."
          className="min-w-0 flex-[2] rounded-md border border-slate-300 px-2 py-1.5 text-sm"
        />
      </div>

      <p className="text-xs text-slate-500">{records.length} registro(s) encontrado(s) na região configurada.</p>

      <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {records.length === 0 && (
          <li className="rounded-md border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
            Nenhum registro corresponde a este filtro dentro do raio configurado.
          </li>
        )}
        {records.map((record) => (
          <li key={record.id}>
            <button
              type="button"
              onClick={() => onSelect(record)}
              className={`w-full min-w-0 rounded-md border p-3 text-left transition-colors ${
                selectedId === record.id ? "border-slate-500 bg-slate-50" : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="min-w-0 truncate text-sm font-medium text-slate-900">{record.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {record.type}
                {record.distanceKm !== null ? ` · ${record.distanceKm.toFixed(0)} km do centro` : ""}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
