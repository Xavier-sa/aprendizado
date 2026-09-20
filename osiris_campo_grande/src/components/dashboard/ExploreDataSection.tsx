"use client";

import type { FeedKey, FeedResult, FeedScope, RegionDossierResult } from "@/types";
import { CARD_CONFIG } from "./cardsConfig";
import { DataImageCard, type CardStatus } from "./DataImageCard";
import { CampoGrandeHeroCard } from "./CampoGrandeHeroCard";

interface ExploreDataSectionProps {
  feeds: FeedResult[];
  regionDossier: RegionDossierResult | null;
  loading: boolean;
  onExploreFeeds: (feeds: FeedKey[]) => void;
  onOpenPanel: () => void;
}

/** Prioridade para resumir o escopo de um card que agrega mais de um feed
 * (ex.: "Satélites / Sentinel") — mostra sempre o escopo "mais específico". */
const SCOPE_PRIORITY: FeedScope[] = ["LOCAL", "GLOBAL_FILTRADO", "INDISPONIVEL", "ERRO", "GLOBAL"];

function aggregate(feedKeys: FeedKey[], feeds: FeedResult[], loading: boolean): { status: CardStatus; count: number | null; scope: FeedScope | null } {
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

/**
 * Seção "Explore os dados": atalhos visuais para as funcionalidades já
 * existentes (mapa/camadas, painel) — não é uma página nova nem duplica
 * dado algum, só agrega o que já vem de `useFeeds` (seção "Arquitetura" do
 * pedido: nenhum `fetch` novo aqui). Layout responsivo com UM único
 * conjunto de nós no DOM: carrossel com snap em mobile, grade a partir de
 * `sm:` — trocado só via classes Tailwind, para não carregar as imagens
 * duas vezes.
 */
export function ExploreDataSection({ feeds, regionDossier, loading, onExploreFeeds, onOpenPanel }: ExploreDataSectionProps) {
  const totalInRegion = loading ? null : feeds.reduce((sum, f) => sum + f.totalInRegion, 0);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Explore os dados</h2>
        <p className="text-xs text-slate-500">
          Atalhos visuais para os feeds já integrados — clique num card para ativar a camada no mapa.
        </p>
      </div>

      <CampoGrandeHeroCard regionDossier={regionDossier} totalRecordsInRegion={totalInRegion} onAction={onOpenPanel} />

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
        {CARD_CONFIG.map((card) => {
          const { status, count, scope } = aggregate(card.feeds, feeds, loading);
          return (
            <div key={card.id} className="w-[78%] shrink-0 snap-start sm:w-auto sm:shrink">
              <DataImageCard
                title={card.title}
                description={card.description}
                image={card.image}
                status={status}
                count={count}
                scope={scope}
                actionLabel="Explorar no mapa"
                onAction={() => onExploreFeeds(card.feeds)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
