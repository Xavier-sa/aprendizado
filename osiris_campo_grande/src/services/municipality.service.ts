import type { MunicipalityResult, Provenance } from "@/types";
import { IbgeClient, IbgeError, ibgeClient } from "@/lib/ibge/client";

const CAMPO_GRANDE_MS_CODE = "5002704";
const PATH = `/localidades/municipios/${CAMPO_GRANDE_MS_CODE}`;
/** A hierarquia territorial de um município não muda de um dia para o outro — 1 dia de cache é seguro e evita bater na API do IBGE sem necessidade. */
const REVALIDATE_SECONDS = 86_400;

interface RawMunicipio {
  nome: string;
  microrregiao?: {
    nome: string;
    mesorregiao?: {
      nome: string;
      UF?: { nome: string; sigla: string; regiao?: { nome: string } };
    };
  };
  "regiao-imediata"?: { nome: string };
}

/**
 * `/api/v1/localidades/municipios/5002704` do IBGE — identidade oficial de
 * Campo Grande - MS (não é enriquecimento genérico "sobre o Brasil" como o
 * `region-dossier` da OSIRIS às vezes devolve). Nunca lança.
 */
export async function fetchMunicipalityInfo(client: IbgeClient = ibgeClient): Promise<MunicipalityResult> {
  const fetchedAt = new Date().toISOString();
  const provenance: Provenance = { sourcePlatform: "IBGE", sourceEndpoint: PATH, fetchedAt, upstreamSource: "IBGE (localidades)", upstreamSourceOrigin: "payload" };

  try {
    const raw = await client.get<RawMunicipio>(PATH, REVALIDATE_SECONDS);
    const meso = raw.microrregiao?.mesorregiao;
    return {
      status: "ok",
      data: {
        nome: raw.nome,
        microrregiao: raw.microrregiao?.nome ?? "—",
        mesorregiao: meso?.nome ?? "—",
        uf: meso?.UF?.nome ?? "—",
        ufSigla: meso?.UF?.sigla ?? "—",
        regiao: meso?.UF?.regiao?.nome ?? "—",
        regiaoImediata: raw["regiao-imediata"]?.nome ?? "—",
      },
      provenance,
    };
  } catch (error) {
    const unavailable = error instanceof IbgeError && error.code === "timeout";
    const message = error instanceof IbgeError ? error.message : "Erro desconhecido ao consultar o IBGE.";
    return { status: unavailable ? "unavailable" : "error", data: null, error: message, provenance };
  }
}
