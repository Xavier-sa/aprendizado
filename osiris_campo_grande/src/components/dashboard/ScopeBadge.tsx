import type { FeedScope } from "@/types";

export const SCOPE_BADGE: Record<FeedScope, { label: string; className: string }> = {
  LOCAL: { label: "LOCAL", className: "bg-emerald-100 text-emerald-800" },
  GLOBAL_FILTRADO: { label: "GLOBAL FILTRADO", className: "bg-sky-100 text-sky-800" },
  GLOBAL: { label: "GLOBAL", className: "bg-slate-200 text-slate-700" },
  INDISPONIVEL: { label: "INDISPONÍVEL P/ CG", className: "bg-amber-100 text-amber-800" },
  ERRO: { label: "ERRO", className: "bg-red-100 text-red-800" },
};

export function ScopeBadge({ scope, className = "" }: { scope: FeedScope; className?: string }) {
  const badge = SCOPE_BADGE[scope];
  return <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className} ${className}`}>{badge.label}</span>;
}
