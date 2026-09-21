import { describe, expect, it, vi } from "vitest";
import { IbgeClient, IbgeError } from "@/lib/ibge/client";
import { fetchMunicipalityInfo } from "./municipality.service";

function fakeClient() {
  return new IbgeClient();
}

describe("fetchMunicipalityInfo", () => {
  it("maps the real IBGE response shape into a flat structure", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({
      nome: "Campo Grande",
      microrregiao: {
        nome: "Campo Grande",
        mesorregiao: {
          nome: "Centro Norte de Mato Grosso do Sul",
          UF: { nome: "Mato Grosso do Sul", sigla: "MS", regiao: { nome: "Centro-Oeste" } },
        },
      },
      "regiao-imediata": { nome: "Campo Grande" },
    });

    const result = await fetchMunicipalityInfo(client);

    expect(result.status).toBe("ok");
    expect(result.data).toEqual({
      nome: "Campo Grande",
      microrregiao: "Campo Grande",
      mesorregiao: "Centro Norte de Mato Grosso do Sul",
      uf: "Mato Grosso do Sul",
      ufSigla: "MS",
      regiao: "Centro-Oeste",
      regiaoImediata: "Campo Grande",
    });
    expect(result.provenance.sourcePlatform).toBe("IBGE");
  });

  it("never throws on failure", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new IbgeError("down", "http", 500));

    const result = await fetchMunicipalityInfo(client);

    expect(result.status).toBe("error");
    expect(result.data).toBeNull();
  });

  it("maps a timeout to status 'unavailable'", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new IbgeError("timed out", "timeout"));

    const result = await fetchMunicipalityInfo(client);

    expect(result.status).toBe("unavailable");
  });
});
