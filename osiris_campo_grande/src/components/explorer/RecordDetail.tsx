"use client";

import type { NormalizedRecord } from "@/types";

interface RecordDetailProps {
  record: NormalizedRecord;
  onClose: () => void;
}

function formatIso(iso: string | undefined | null): string {
  if (!iso) return "não informado pela origem";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
}

export function RecordDetail({ record, onClose }: RecordDetailProps) {
  const metadataEntries = Object.entries(record.metadata).filter(([, value]) => value !== null && value !== "");

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="min-w-0 break-words text-base font-semibold text-slate-900">{record.title}</h3>
          <p className="text-sm text-slate-500">{record.type}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="shrink-0 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      {record.summary && <p className="text-sm text-slate-700">{record.summary}</p>}

      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-slate-500">Coordenadas</dt>
          <dd className="text-slate-800">
            {record.position
              ? `${record.position.lat.toFixed(4)}, ${record.position.lng.toFixed(4)}`
              : record.geometry
                ? "área (polígono) — ver contorno no mapa"
                : "não disponível"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Distância do centro de Campo Grande</dt>
          <dd className="text-slate-800">{record.distanceKm !== null ? `${record.distanceKm.toFixed(1)} km` : "não disponível"}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Timestamp da origem</dt>
          <dd className="text-slate-800">{formatIso(record.timestamp)}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Consultado em (fetchedAt)</dt>
          <dd className="text-slate-800">{formatIso(record.provenance.fetchedAt)}</dd>
        </div>
      </dl>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <p className="font-medium text-slate-700">Proveniência</p>
        <p className="mt-1 break-words">
          Fonte: {record.provenance.sourcePlatform} / {record.provenance.sourceEndpoint}
        </p>
        {record.provenance.upstreamSource && (
          <p className="break-words">
            Provedor original (upstream): {record.provenance.upstreamSource}{" "}
            <span className="text-slate-400">
              ({record.provenance.upstreamSourceOrigin === "payload" ? "declarado pela resposta" : "conforme documentação da fonte"})
            </span>
          </p>
        )}
        <p>Consultado em (fetchedAt): {formatIso(record.provenance.fetchedAt)}</p>
        {record.provenance.sourceTimestamp && (
          <p>Timestamp declarado pela origem: {formatIso(record.provenance.sourceTimestamp)}</p>
        )}
      </div>

      {metadataEntries.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-500">Metadados</p>
          <dl className="mt-1 grid grid-cols-1 gap-1 text-xs">
            {metadataEntries.map(([key, value]) => (
              <div key={key} className="flex min-w-0 justify-between gap-2 border-b border-slate-100 py-1">
                <dt className="min-w-0 truncate text-slate-500">{key}</dt>
                <dd className="min-w-0 max-w-[60%] break-words text-right text-slate-800">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
