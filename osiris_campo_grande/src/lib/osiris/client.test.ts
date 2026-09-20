import { afterEach, describe, expect, it, vi } from "vitest";
import { OsirisClient, OsirisError } from "./client";

describe("OsirisClient.get", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("returns parsed JSON on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    const result = await client.get<{ ok: boolean }>("/health", { revalidateSeconds: 60 });

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://example.test/api/health");
    expect(init.headers["User-Agent"]).toContain("osiris-campo-grande-poc");
  });

  it("appends search params", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    await client.get("/sentinel", { revalidateSeconds: 60, searchParams: { lat: "-20", lng: "-54", empty: undefined } });

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://example.test/api/sentinel?lat=-20&lng=-54");
  });

  it("throws OsirisError with code 'http' on a non-2xx response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("server error", { status: 503 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    await expect(client.get("/flights", { revalidateSeconds: 60 })).rejects.toMatchObject({
      code: "http",
      status: 503,
    } satisfies Partial<OsirisError>);
  });

  it("throws OsirisError with code 'http' on 429 (rate limit)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("too many requests", { status: 429 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    await expect(client.get("/ai/analyze", { revalidateSeconds: 0 })).rejects.toMatchObject({ status: 429 });
  });

  it("throws OsirisError with code 'network' when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network down")));

    const client = new OsirisClient("https://example.test/api");
    await expect(client.get("/flights", { revalidateSeconds: 60 })).rejects.toMatchObject({ code: "network" });
  });

  it("throws OsirisError with code 'parse' on invalid JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json", { status: 200 })));

    const client = new OsirisClient("https://example.test/api");
    await expect(client.get("/flights", { revalidateSeconds: 60 })).rejects.toMatchObject({ code: "parse" });
  });

  it("serves a second call from its own in-memory cache within the TTL, without a second network request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ n: 1 }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    const first = await client.get<{ n: number }>("/stats", { revalidateSeconds: 60 });
    const second = await client.get<{ n: number }>("/stats", { revalidateSeconds: 60 });

    expect(first).toEqual({ n: 1 });
    expect(second).toEqual({ n: 1 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // O cliente nunca deve pedir cache nativo do Next para respostas grandes — ver o motivo no comentário da classe.
    expect(fetchMock.mock.calls[0][1].cache).toBe("no-store");
  });

  it("re-fetches once the TTL has expired", async () => {
    vi.useFakeTimers();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ n: 1 }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ n: 2 }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    const first = await client.get<{ n: number }>("/stats", { revalidateSeconds: 1 });
    vi.advanceTimersByTime(1_001);
    const second = await client.get<{ n: number }>("/stats", { revalidateSeconds: 1 });

    expect(first).toEqual({ n: 1 });
    expect(second).toEqual({ n: 2 });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("never caches when revalidateSeconds is 0", async () => {
    // `mockResolvedValue` (sem "Once") reaproveitaria o MESMO objeto Response
    // entre as duas chamadas — e o corpo de um Response só pode ser lido uma
    // vez. Como este teste espera duas chamadas de rede de verdade (não uma
    // vinda do cache), cada uma precisa do seu próprio Response.
    const fetchMock = vi.fn().mockImplementation(async () => new Response(JSON.stringify({ n: 1 }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    await client.get("/ai/overview", { revalidateSeconds: 0 });
    await client.get("/ai/overview", { revalidateSeconds: 0 });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws OsirisError with code 'timeout' when the request is aborted", async () => {
    const fetchMock = vi.fn().mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("aborted");
            error.name = "AbortError";
            reject(error);
          });
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const client = new OsirisClient("https://example.test/api");
    await expect(client.get("/flights", { revalidateSeconds: 60, timeoutMs: 5 })).rejects.toMatchObject({
      code: "timeout",
    });
  });
});
