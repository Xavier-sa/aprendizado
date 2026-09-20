"use client";

import type { FeedKey, FeedResult } from "@/types";
import { LAYER_COLORS } from "./layerColors";

interface LayerToggleProps {
  feeds: FeedResult[];
  visibleLayers: Set<FeedKey>;
  onToggle: (feed: FeedKey) => void;
}

const STATUS_LABEL: Record<FeedResult["status"], string> = {
  ok: "",
  empty: "sem registros na região",
  error: "erro ao consultar",
  unavailable: "indisponível (timeout)",
};

export function LayerToggle({ feeds, visibleLayers, onToggle }: LayerToggleProps) {
  return (
    <ul className="flex flex-col gap-1.5">
      {feeds.map((feed) => {
        const checked = visibleLayers.has(feed.feed);
        const problematic = feed.status === "error" || feed.status === "unavailable";
        return (
          <li key={feed.feed}>
            <label className="flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-100">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(feed.feed)}
                disabled={feed.status !== "ok"}
                className="h-4 w-4 shrink-0 accent-slate-700"
              />
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: LAYER_COLORS[feed.feed] }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-slate-800">{feed.label}</span>
              <span className={`shrink-0 text-xs ${problematic ? "text-red-600" : "text-slate-500"}`}>
                {feed.status === "ok" ? feed.totalInRegion : STATUS_LABEL[feed.status]}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
