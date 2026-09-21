"use client";

import { RADIUS_OPTIONS_KM } from "@/lib/osiris/geo";

interface RadiusSelectorProps {
  value: number;
  onChange: (radiusKm: number) => void;
  disabled?: boolean;
}

/**
 * Seletor de raio (seção 7 do pedido). Trocar o valor recalcula tudo — o
 * mesmo `radiusKm` é passado para `useFeeds`, que já refaz a consulta
 * quando ele muda (efeito com `[radiusKm]` como dependência).
 */
export function RadiusSelector({ value, onChange, disabled }: RadiusSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="radius-selector" className="shrink-0 text-xs font-medium text-slate-600">
        Raio de busca
      </label>
      <div className="flex flex-wrap gap-1" id="radius-selector" role="group" aria-label="Raio de busca em torno de Campo Grande">
        {RADIUS_OPTIONS_KM.map((km) => (
          <button
            key={km}
            type="button"
            disabled={disabled}
            onClick={() => onChange(km)}
            aria-pressed={value === km}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
              value === km
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {km} km
          </button>
        ))}
      </div>
    </div>
  );
}
