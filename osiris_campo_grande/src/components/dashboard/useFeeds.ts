"use client";

import { useEffect, useState } from "react";
import type { ApiHealth, FeedResult, GeoPoint, GlobalFeedResult, RegionDossierResult } from "@/types";

interface FeedsResponse {
  center: GeoPoint;
  radiusKm: number;
  generatedAt: string;
  feeds: FeedResult[];
}

interface GlobalFeedsResponse {
  generatedAt: string;
  feeds: GlobalFeedResult[];
  regionDossier: RegionDossierResult;
  health: ApiHealth;
}

/**
 * `/api/osiris/feeds` já respeita o TTL da OSIRIS via cache do `fetch` no
 * servidor (45-60s conforme documentado) — o polling aqui só precisa não
 * ser mais agressivo que isso, senão estaríamos batendo na OSIRIS a cada
 * render por nada (seção 17 do pedido original). 60s casa com o TTL mais comum.
 */
const POLL_INTERVAL_MS = 60_000;

export function useFeeds(radiusKm: number) {
  const [feeds, setFeeds] = useState<FeedResult[]>([]);
  const [globalFeeds, setGlobalFeeds] = useState<GlobalFeedResult[]>([]);
  const [regionDossier, setRegionDossier] = useState<RegionDossierResult | null>(null);
  const [health, setHealth] = useState<ApiHealth | null>(null);
  const [center, setCenter] = useState<GeoPoint | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // `active`/`controller` são locais a CADA execução do efeito — em dev, o
    // StrictMode do React monta o efeito, roda a limpeza e monta de novo
    // (de propósito, pra pegar efeitos não-idempotentes). Uma flag
    // compartilhada entre execuções (ex.: um `useRef`) trava aqui: a
    // primeira chamada de `load()` fica presa aguardando o fetch, a
    // segunda desiste por achar que já tem uma em andamento, e quando a
    // primeira finalmente resolve, seu próprio fechamento já foi marcado
    // cancelado pela limpeza — resultado: `loading` nunca vira `false` e a
    // tela fica presa em "carregando" para sempre. Com uma flag por
    // execução mais `AbortController`, a chamada abortada é descartada e a
    // nova simplesmente roda do zero.
    let active = true;
    const controller = new AbortController();

    async function load() {
      try {
        const [feedsRes, globalRes] = await Promise.all([
          fetch(`/api/osiris/feeds?radiusKm=${radiusKm}`, { signal: controller.signal }),
          fetch("/api/osiris/global", { signal: controller.signal }),
        ]);
        if (!feedsRes.ok || !globalRes.ok) {
          throw new Error("Não foi possível carregar os dados da OSIRIS agora.");
        }
        const feedsData = (await feedsRes.json()) as FeedsResponse;
        const globalData = (await globalRes.json()) as GlobalFeedsResponse;
        if (!active) return;
        setFeeds(feedsData.feeds);
        setCenter(feedsData.center);
        setGeneratedAt(feedsData.generatedAt);
        setGlobalFeeds(globalData.feeds);
        setRegionDossier(globalData.regionDossier);
        setHealth(globalData.health);
        setError(null);
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === "AbortError")) return;
        setError(err instanceof Error ? err.message : "Erro desconhecido.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    const interval = setInterval(() => void load(), POLL_INTERVAL_MS);
    return () => {
      active = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [radiusKm]);

  return { feeds, globalFeeds, regionDossier, health, center, generatedAt, loading, error };
}
