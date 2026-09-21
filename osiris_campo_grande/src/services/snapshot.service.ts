import type { ChangeEvent, ChangeSummary, FeedResult, SourceKey } from "@/types";

interface StoredSnapshot {
  checkedAt: string;
  perFeed: Partial<Record<SourceKey, { count: number; ids: string[]; status: FeedResult["status"] }>>;
  latestSentinelTimestamp: string | null;
}

/**
 * "O que mudou?" (seção 9 do pedido). Guarda a última consulta EM MEMÓRIA,
 * por raio, num `Map` do módulo — sem banco de dados, conforme pedido
 * ("primeiro avaliar se é possível fazer uma versão inicial com cache
 * server-side/snapshot temporário"). Isso é suficiente para
 * `next dev`/`next start` (processo único, o `Map` sobrevive entre
 * requisições), mas TEM UMA LIMITAÇÃO REAL: numa função serverless (ex.:
 * Vercel), cada invocação pode rodar numa instância diferente, sem
 * memória compartilhada — então a comparação "desde a última consulta"
 * pode falhar silenciosamente (voltar `previousCheckedAt: null` mais
 * vezes do que o esperado) em produção serverless. Se isso se mostrar um
 * problema real depois de publicado, a solução correta seria um cache
 * externo (Redis, Vercel KV) — não implementado agora porque ainda não
 * foi comprovado que é necessário (pedido explícito: não adicionar banco
 * sem justificativa).
 */
const previousSnapshots = new Map<number, StoredSnapshot>();

function latestTimestamp(feed: FeedResult): string | null {
  const timestamps = feed.records.map((r) => r.timestamp).filter((t): t is string => Boolean(t));
  return timestamps.length > 0 ? timestamps.sort().at(-1)! : null;
}

/**
 * Compara o resultado atual com o anterior (mesmo raio) e produz uma lista
 * de eventos por REGRAS DETERMINÍSTICAS E DOCUMENTADAS — nunca por um
 * julgamento de gravidade inventado (seção 8 do pedido). Como efeito
 * colateral, grava o snapshot atual para a próxima chamada.
 */
export function computeChangeSummary(radiusKm: number, feeds: FeedResult[]): ChangeSummary {
  const currentCheckedAt = new Date().toISOString();
  const previous = previousSnapshots.get(radiusKm) ?? null;
  const events: ChangeEvent[] = [];

  if (previous) {
    for (const feed of feeds) {
      const prev = previous.perFeed[feed.feed];
      if (!prev) continue;

      const prevFailed = prev.status === "error" || prev.status === "unavailable";
      const nowFailed = feed.status === "error" || feed.status === "unavailable";
      if (prevFailed && !nowFailed) {
        events.push({ feed: feed.feed, kind: "source-recovered", message: `${feed.label} voltou a responder.` });
      } else if (!prevFailed && nowFailed) {
        events.push({ feed: feed.feed, kind: "source-failed", message: `${feed.label} parou de responder desde a última consulta.` });
      }

      if (!prevFailed && !nowFailed) {
        const prevIds = new Set(prev.ids);
        const newCount = feed.records.filter((r) => !prevIds.has(r.id)).length;
        if (newCount > 0) {
          events.push({ feed: feed.feed, kind: "new-records", message: `+${newCount} novo(s) registro(s) em "${feed.label}" desde a última consulta.` });
        } else if (feed.totalInRegion < prev.count) {
          events.push({ feed: feed.feed, kind: "fewer-records", message: `"${feed.label}" caiu de ${prev.count} para ${feed.totalInRegion} registro(s) na região.` });
        }
      }

      if (feed.feed === "sentinel") {
        const latestNow = latestTimestamp(feed);
        if (latestNow && latestNow !== previous.latestSentinelTimestamp) {
          events.push({ feed: "sentinel", kind: "new-sentinel-coverage", message: `Nova cena Sentinel cobrindo Campo Grande (${latestNow}).` });
        }
      }
    }
  }

  const perFeed: StoredSnapshot["perFeed"] = {};
  let latestSentinelTimestamp: string | null = null;
  for (const feed of feeds) {
    perFeed[feed.feed] = { count: feed.totalInRegion, ids: feed.records.map((r) => r.id), status: feed.status };
    if (feed.feed === "sentinel") latestSentinelTimestamp = latestTimestamp(feed);
  }
  previousSnapshots.set(radiusKm, { checkedAt: currentCheckedAt, perFeed, latestSentinelTimestamp });

  return { previousCheckedAt: previous?.checkedAt ?? null, currentCheckedAt, events };
}
