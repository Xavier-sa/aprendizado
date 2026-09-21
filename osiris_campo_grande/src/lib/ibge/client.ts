const BASE_URL = "https://servicodados.ibge.gov.br/api/v1";
const DEFAULT_TIMEOUT_MS = 10_000;

export type IbgeErrorCode = "timeout" | "http" | "network" | "parse";

export class IbgeError extends Error {
  code: IbgeErrorCode;
  status?: number;

  constructor(message: string, code: IbgeErrorCode, status?: number) {
    super(message);
    this.name = "IbgeError";
    this.code = code;
    this.status = status;
  }
}

interface CacheEntry {
  expiresAt: number;
  data: unknown;
}

/** Cliente para a API pública de localidades do IBGE — identidade territorial oficial, muda raramente (cache de 1 dia é seguro). */
export class IbgeClient {
  private readonly cache = new Map<string, CacheEntry>();

  async get<T>(path: string, revalidateSeconds: number): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const cached = this.cache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new IbgeError(`Tempo esgotado ao chamar ${path}`, "timeout");
      }
      throw new IbgeError(`Falha de rede ao chamar ${path}: ${error instanceof Error ? error.message : String(error)}`, "network");
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new IbgeError(`IBGE retornou HTTP ${response.status} em ${path}`, "http", response.status);
    }

    let data: T;
    try {
      data = (await response.json()) as T;
    } catch (error) {
      throw new IbgeError(`Resposta de ${path} não é JSON válido: ${error instanceof Error ? error.message : String(error)}`, "parse");
    }

    if (revalidateSeconds > 0) {
      this.cache.set(url, { expiresAt: Date.now() + revalidateSeconds * 1000, data });
    }
    return data;
  }
}

export const ibgeClient = new IbgeClient();
