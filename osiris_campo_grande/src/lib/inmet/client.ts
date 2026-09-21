const BASE_URL = "https://apiprevmet3.inmet.gov.br";
const DEFAULT_TIMEOUT_MS = 10_000;

export type InmetErrorCode = "timeout" | "http" | "network" | "parse";

export class InmetError extends Error {
  code: InmetErrorCode;
  status?: number;

  constructor(message: string, code: InmetErrorCode, status?: number) {
    super(message);
    this.name = "InmetError";
    this.code = code;
    this.status = status;
  }
}

interface CacheEntry {
  expiresAt: number;
  data: unknown;
}

/**
 * Cliente para a API pública de avisos do INMET (apiprevmet3.inmet.gov.br)
 * — plataforma diferente da OSIRIS, com seu próprio tratamento de erro e
 * cache em memória (mesmo padrão do `OsirisClient`, ver o comentário lá
 * sobre a limitação em ambiente serverless).
 *
 * Detalhe descoberto testando na prática: sem um `User-Agent` de
 * navegador, o servidor derruba a conexão (`ECONNRESET`) antes de
 * responder — não é um bloqueio de rota, é alguma proteção contra
 * clientes automatizados óbvios. Com um `User-Agent` de navegador comum,
 * a API responde normalmente. Isso está documentado porque é uma
 * característica real da fonte, não uma escolha arbitrária deste cliente.
 */
export class InmetClient {
  private readonly cache = new Map<string, CacheEntry>();

  async get<T>(path: string, revalidateSeconds: number, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const cached = this.cache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let response: Response;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) osiris-campo-grande-poc",
        },
        cache: "no-store",
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new InmetError(`Tempo esgotado ao chamar ${path}`, "timeout");
      }
      throw new InmetError(
        `Falha de rede ao chamar ${path}: ${error instanceof Error ? error.message : String(error)}`,
        "network",
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new InmetError(`INMET retornou HTTP ${response.status} em ${path}`, "http", response.status);
    }

    let data: T;
    try {
      data = (await response.json()) as T;
    } catch (error) {
      throw new InmetError(
        `Resposta de ${path} não é JSON válido: ${error instanceof Error ? error.message : String(error)}`,
        "parse",
      );
    }

    if (revalidateSeconds > 0) {
      this.cache.set(url, { expiresAt: Date.now() + revalidateSeconds * 1000, data });
    }
    return data;
  }
}

export const inmetClient = new InmetClient();
