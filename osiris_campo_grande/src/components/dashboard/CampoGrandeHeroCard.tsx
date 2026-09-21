"use client";

import Image from "next/image";
import { useState } from "react";
import type { MunicipalityResult, RegionDossierResult } from "@/types";
import { CAMPO_GRANDE } from "@/lib/osiris/geo";
import { ScopeBadge } from "./ScopeBadge";

interface CampoGrandeHeroCardProps {
  regionDossier: RegionDossierResult | null;
  municipality: MunicipalityResult | null;
  radiusKm: number;
  totalRecordsInRegion: number | null;
  onAction: () => void;
}

function str(obj: Record<string, unknown> | undefined, key: string): string | null {
  const value = obj?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * Card de destaque para Campo Grande/MS. Separação deliberada (pedido
 * explícito) entre coisas que não podem se misturar:
 *
 * 1. "Região consultada" — o que NÓS definimos como área de busca
 *    (`CAMPO_GRANDE` + o raio escolhido pelo usuário). Isso é sempre
 *    verdadeiro, independente de qualquer fonte externa responder algo.
 * 2. "Identidade oficial (IBGE)" — hierarquia territorial real do
 *    município, da fonte oficial de códigos territoriais do Brasil.
 * 3. "Enriquecimento fornecido pela OSIRIS" — o que `/api/region-dossier`
 *    de fato devolveu para essas coordenadas. Quando populado, é
 *    conteúdo sobre o PAÍS/ESTADO (Brasil / Mato Grosso do Sul), nunca
 *    especificamente sobre o município — isso é dito de forma explícita,
 *    não escondido atrás de um card genérico "sobre o Brasil" como se
 *    fosse sobre a cidade.
 */
export function CampoGrandeHeroCard({ regionDossier, municipality, radiusKm, totalRecordsInRegion, onAction }: CampoGrandeHeroCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const data = regionDossier?.data ?? undefined;
  const location = data?.location && typeof data.location === "object" ? (data.location as Record<string, unknown>) : undefined;
  const wikipedia = data?.wikipedia && typeof data.wikipedia === "object" ? (data.wikipedia as Record<string, unknown>) : undefined;
  const enrichmentPlace = [str(location, "state"), str(location, "country")].filter(Boolean).join(", ");
  const extract = str(wikipedia, "extract");

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:col-span-2 sm:flex-row lg:col-span-3">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-200 sm:aspect-auto sm:w-72">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-200 to-amber-400 text-xs text-amber-900">
            Imagem indisponível
          </div>
        ) : (
          <Image
            src="/images/cards/campo-grande.jpg"
            alt="Vista aérea do centro histórico de Campo Grande - MS, com o prédio da Morada dos Baís em destaque"
            fill
            sizes="(min-width: 640px) 288px, 100vw"
            className="object-cover"
            priority
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent sm:hidden" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900">Campo Grande / MS</h3>
          {regionDossier && <ScopeBadge scope={regionDossier.hasContent ? "LOCAL" : "INDISPONIVEL"} />}
        </div>

        <div className="text-xs text-slate-600">
          <p className="font-medium text-slate-700">Região consultada</p>
          <p>
            {CAMPO_GRANDE.latitude.toFixed(4)}, {CAMPO_GRANDE.longitude.toFixed(4)} · raio de {radiusKm} km escolhido nesta sessão
            {totalRecordsInRegion !== null && ` · ${totalRecordsInRegion} registro(s) encontrado(s) pelo aplicativo nesse raio`}
          </p>
          {municipality?.status === "ok" && municipality.data && (
            <p className="mt-0.5 text-slate-500">
              {municipality.data.nome} · {municipality.data.mesorregiao} · {municipality.data.uf} ({municipality.data.ufSigla}) —
              identidade oficial (IBGE)
            </p>
          )}
        </div>

        <div className="rounded-md bg-slate-50 p-2.5 text-xs text-slate-600">
          <p className="font-medium text-slate-700">Enriquecimento fornecido pela OSIRIS</p>
          {!regionDossier ? (
            <p className="mt-0.5 h-3 w-40 animate-pulse rounded bg-slate-200" aria-hidden="true" />
          ) : regionDossier.hasContent ? (
            <>
              <p className="mt-0.5">
                {enrichmentPlace && <span className="font-medium text-slate-800">{enrichmentPlace}</span>}
                {extract && (
                  <span className="mt-1 block text-slate-600">{extract.length > 160 ? `${extract.slice(0, 160)}…` : extract}</span>
                )}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Contexto de país/estado devolvido pela OSIRIS para este ponto — não é um dado específico do município.
              </p>
            </>
          ) : (
            <p className="mt-0.5 text-slate-500">{regionDossier.note}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onAction}
          className="mt-auto w-full rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700 sm:w-fit"
        >
          Ver painel completo
        </button>
      </div>
    </div>
  );
}
