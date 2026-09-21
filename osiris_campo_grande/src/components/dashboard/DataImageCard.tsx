"use client";

import Image from "next/image";
import { useState } from "react";
import type { FeedScope } from "@/types";
import type { ModuleImage } from "./modulesConfig";
import { ScopeBadge } from "./ScopeBadge";

export type CardStatus = "loading" | "ok" | "empty" | "error";

export interface DataImageCardProps {
  title: string;
  question: string;
  description: string;
  image: ModuleImage;
  status: CardStatus;
  /** `null` enquanto `status === "loading"` — nunca mostramos "0" antes da primeira resposta real. */
  count: number | null;
  scope: FeedScope | null;
  actionLabel: string;
  onAction: () => void;
}

const STATUS_TEXT: Record<Exclude<CardStatus, "loading">, string> = {
  ok: "",
  empty: "Sem registros na região agora",
  error: "Fonte temporariamente indisponível",
};

function isSvg(src: string) {
  return src.endsWith(".svg");
}

/**
 * Card de módulo reutilizável na home "Situação agora". Não é decorativo:
 * o botão sempre aciona `onAction` (liga as camadas do módulo no mapa e
 * troca para a aba "Camadas"). Nunca mostra uma imagem quebrada — qualquer
 * falha de carregamento cai num placeholder visual consistente (seção
 * "Estados" do pedido).
 */
export function DataImageCard({ title, question, description, image, status, count, scope, actionLabel, onAction }: DataImageCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-200">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400 text-xs text-slate-600">
            Imagem indisponível
          </div>
        ) : isSvg(image.src) ? (
          // eslint-disable-next-line @next/next/no-img-element -- SVG próprio do projeto (não é foto), simples de mais para justificar o pipeline de otimização do next/image
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent" />

        {scope && (
          <div className="absolute right-2 top-2">
            <ScopeBadge scope={scope} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3">
        <h3 className="min-w-0 truncate text-sm font-semibold text-slate-900">{title}</h3>
        <p className="text-xs italic text-slate-500">{question}</p>
        <p className="line-clamp-2 text-xs text-slate-500">{description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          {status === "loading" ? (
            <span className="h-4 w-20 animate-pulse rounded bg-slate-200" aria-hidden="true" />
          ) : status === "ok" ? (
            <span className="text-xs font-medium text-slate-700">{count} na região</span>
          ) : (
            <span className={`text-xs font-medium ${status === "error" ? "text-red-600" : "text-slate-500"}`}>
              {STATUS_TEXT[status]}
            </span>
          )}

          {image.credit && (
            <a
              href={image.credit.url}
              target="_blank"
              rel="noreferrer"
              className="truncate text-[10px] text-slate-400 underline"
              title={image.credit.text}
            >
              crédito da imagem
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={onAction}
          className="mt-1 w-full rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
