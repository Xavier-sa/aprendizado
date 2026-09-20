const DEFAULT_BASE_URL = "https://osirisai.live/api";
const DEFAULT_TIMEOUT_MS = 10_000;

export type OsirisErrorCode = "timeout" | "http" | "network" | "parse";

export class OsirisError extends Error {
  code: OsirisErrorCode;
  status?: number;

  constructor(message: string, code: OsirisErrorCode, status?: number) {
    super(message);
    this.name = "OsirisError";
    this.code = code;
    this.status = status;
  }
}

interface GetOptions {
  /** Segundos de TTL do cache próprio do cliente (ver `cache` abaixo). Ver
   * docs/osiris-api-discovery.md para o TTL documentado de cada endpoint. */
  revalidateSeconds: number;
  searchParams?: Record<string, string | undefined>;
  timeoutMs?: number;
}

interface CacheEntry {
  expiresAt: number;
  data: unknown;
}

/**
 * Cliente central para a API OSIRIS. Único ponto que conhece a base URL,
 * timeout, User-Agent, cache e tratamento de erro — nenhum outro módulo faz
 * `fetch` direto para osirisai.live (seção 8 do pedido). Roda só no
 * servidor (chamado pelas rotas em src/app/api/osiris/*), então o browser
 * nunca fala com a OSIRIS nem veria uma eventual chave futura.
 *
 * O cache é um `Map` em memória, por instância — não o cache nativo de
 * `fetch()` do Next.js (`next.revalidate`). Isso foi descoberto na prática,
 * não decidido de antemão: o cache de dados do Next.js recusa entradas
 * maiores que 2MB ("Failed to set Next.js data cache... items over 2MB can
 * not be cached"), e `/api/flights` (~4MB), `/api/satellites` (~3.6MB) e
 * `/api/cctv` (~12MB) excedem isso — com `next.revalidate`, essas três
 * respostas nunca eram cacheadas de verdade, então o TTL de 45-60s
 * documentado pela OSIRIS não era respeitado na prática para os feeds mais
 * pesados (seção 17 do pedido: "não fazer polling agressivo"). Limitação
 * conhecida deste cache em memória: como é por instância de processo, não
 * sobrevive entre invocações separadas de uma função serverless (Vercel) —
 * funciona de forma confiável em `next dev`/`next start` de processo único;
 * um ambiente serverless real precisaria de um cache externo (Redis etc.),
 * fora do escopo desta POC.
 */
export class OsirisClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly cache = new Map<string, CacheEntry>();

  constructor(baseUrl: string = DEFAULT_BASE_URL, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  async get<T>(path: string, options: GetOptions): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(options.searchParams ?? {})) {
      if (value !== undefined) url.searchParams.set(key, value);
    }
    const cacheKey = url.toString();

    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data as T;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(cacheKey, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "User-Agent": "osiris-campo-grande-poc/0.1 (+https://github.com/)",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        // Cache próprio (acima) substitui o cache nativo do Next — ver motivo no comentário da classe.
        cache: "no-store",
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new OsirisError(`Tempo esgotado ao chamar ${path}`, "timeout");
      }
      throw new OsirisError(
        `Falha de rede ao chamar ${path}: ${error instanceof Error ? error.message : String(error)}`,
        "network",
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new OsirisError(`OSIRIS retornou HTTP ${response.status} em ${path}`, "http", response.status);
    }

    let data: T;
    try {
      data = (await response.json()) as T;
    } catch (error) {
      throw new OsirisError(
        `Resposta de ${path} não é JSON válido: ${error instanceof Error ? error.message : String(error)}`,
        "parse",
      );
    }

    if (options.revalidateSeconds > 0) {
      this.cache.set(cacheKey, { expiresAt: Date.now() + options.revalidateSeconds * 1000, data });
    }
    return data;
  }
}

export const osirisClient = new OsirisClient(
  process.env.OSIRIS_BASE_URL || DEFAULT_BASE_URL,
  process.env.OSIRIS_API_KEY || undefined,
);
