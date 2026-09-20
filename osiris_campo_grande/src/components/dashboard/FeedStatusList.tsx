"use client";

import type { FeedResult, GlobalFeedResult, RegionDossierResult } from "@/types";
import { ScopeBadge } from "./ScopeBadge";

interface FeedStatusListProps {
  feeds: FeedResult[];
  globalFeeds: GlobalFeedResult[];
  regionDossier: RegionDossierResult | null;
}

/**
 * "Fontes monitoradas" (pedido explícito, seção 9): mostrar todo feed
 * investigado — inclusive os que voltaram vazios — em vez de esconder uma
 * integração sem resultado. Isso demonstra que a fonte foi de fato testada.
 */
export function FeedStatusList({ feeds, globalFeeds, regionDossier }: FeedStatusListProps) {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Campo Grande / Região</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Feeds com coordenadas por registro, verificados contra a área de Campo Grande.
        </p>
        <ul className="mt-2 flex flex-col divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
          {feeds.map((feed) => (
            <li key={feed.feed} className="flex min-w-0 items-start justify-between gap-2 p-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{feed.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{feed.scopeNote}</p>
              </div>
              <ScopeBadge scope={feed.scope} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contexto OSIRIS (não é Campo Grande)</h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Sem coordenadas por registro — mostrados só para demonstrar a plataforma, nunca representam a cidade.
        </p>
        <ul className="mt-2 flex flex-col divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
          {globalFeeds.map((feed) => (
            <li key={feed.feed} className="flex min-w-0 items-start justify-between gap-2 p-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{feed.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{feed.note}</p>
              </div>
              <ScopeBadge scope="GLOBAL" />
            </li>
          ))}
          {regionDossier && (
            <li className="flex min-w-0 items-start justify-between gap-2 p-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">Dossiê regional (/api/region-dossier)</p>
                <p className="mt-0.5 text-xs text-slate-500">{regionDossier.note}</p>
              </div>
              <ScopeBadge scope={regionDossier.hasContent ? "LOCAL" : "INDISPONIVEL"} />
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
