"use client";

import type { RegionDossierResult } from "@/types";

function str(obj: Record<string, unknown> | undefined, key: string): string | null {
  const value = obj?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * `/api/region-dossier?lat=&lng=` consultado com as coordenadas exatas de
 * Campo Grande. Numa auditoria anterior este endpoint devolveu tudo
 * vazio/nulo para este ponto; testado de novo agora, retorna
 * consistentemente `location` (estado/país) e um resumo da Wikipedia sobre
 * o país — documentado em docs/osiris-api-discovery.md com as duas
 * observações (a API pode mudar de comportamento entre consultas).
 */
export function RegionDossierCard({ dossier }: { dossier: RegionDossierResult | null }) {
  if (!dossier) return null;

  if (!dossier.hasContent) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-500">
        <p className="font-medium text-slate-600">Dossiê regional (/api/region-dossier)</p>
        <p className="mt-1">{dossier.note}</p>
      </div>
    );
  }

  const data = dossier.data ?? {};
  const location = data.location && typeof data.location === "object" ? (data.location as Record<string, unknown>) : undefined;
  const wikipedia = data.wikipedia && typeof data.wikipedia === "object" ? (data.wikipedia as Record<string, unknown>) : undefined;
  const displayName = str(location, "display_name") ?? [str(location, "state"), str(location, "country")].filter(Boolean).join(", ");
  const thumbnail = str(wikipedia, "thumbnail");
  const extract = str(wikipedia, "extract");
  const wikiTitle = str(wikipedia, "title");

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium text-slate-500">Dossiê regional (/api/region-dossier)</p>
      {displayName && <p className="mt-1 text-sm font-semibold text-slate-900">{displayName}</p>}
      {(extract || thumbnail) && (
        <div className="mt-2 flex gap-3">
          {thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element -- imagem externa (Wikipedia), fora do domínio otimizável pelo next/image sem config extra
            <img src={thumbnail} alt={wikiTitle ?? "Miniatura"} className="h-16 w-16 shrink-0 rounded object-cover" />
          )}
          {extract && <p className="min-w-0 text-xs text-slate-600">{extract.length > 220 ? `${extract.slice(0, 220)}…` : extract}</p>}
        </div>
      )}
      <p className="mt-2 text-[11px] text-slate-400">
        Contexto de país/estado — não é um dado específico do município de Campo Grande.
      </p>
    </div>
  );
}
