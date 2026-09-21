import { afterEach, describe, expect, it, vi } from "vitest";
import { InmetClient, InmetError } from "./client";

describe("InmetClient.get", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns parsed JSON and sends a browser-like User-Agent", async () => {
    // Descoberto na prática: sem um User-Agent de navegador, o servidor do
    // INMET derruba a conexão antes de responder — ver comentário na classe.
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ hoje: [] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new InmetClient();
    const result = await client.get<{ hoje: unknown[] }>("/avisos/ativos", 60);

    expect(result).toEqual({ hoje: [] });
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers["User-Agent"]).toContain("Mozilla");
    expect(init.cache).toBe("no-store");
  });

  it("caches a second call within the TTL without a second network request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ n: 1 }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const client = new InmetClient();
    await client.get("/avisos/ativos", 60);
    await client.get("/avisos/ativos", 60);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws InmetError with code 'http' on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("error", { status: 503 })));
    const client = new InmetClient();
    await expect(client.get("/avisos/ativos", 60)).rejects.toMatchObject({ code: "http", status: 503 } satisfies Partial<InmetError>);
  });

  it("throws InmetError with code 'network' when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network down")));
    const client = new InmetClient();
    await expect(client.get("/avisos/ativos", 60)).rejects.toMatchObject({ code: "network" });
  });

  it("throws InmetError with code 'parse' on invalid JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not json", { status: 200 })));
    const client = new InmetClient();
    await expect(client.get("/avisos/ativos", 60)).rejects.toMatchObject({ code: "parse" });
  });

  it("throws InmetError with code 'timeout' when the request is aborted", async () => {
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
    const client = new InmetClient();
    await expect(client.get("/avisos/ativos", 60, 5)).rejects.toMatchObject({ code: "timeout" });
  });
});
