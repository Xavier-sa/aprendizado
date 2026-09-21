import { describe, expect, it, vi } from "vitest";
import { InmetClient, InmetError } from "@/lib/inmet/client";
import { fetchInmetAlerts } from "./inmet.service";

function fakeClient() {
  return new InmetClient();
}

const CG_ALERT = {
  id: 1,
  descricao: "Tempestade",
  severidade: "Perigo",
  aviso_cor: "#F96602",
  data_inicio: "2026-09-21T00:00:00.000Z",
  hora_inicio: "00:00",
  data_fim: "2026-09-21T23:59:00.000Z",
  hora_fim: "23:59",
  municipios: "Campo Grande - MS (5002704)",
  geocodes: "5002704",
  estados: "Mato Grosso do Sul",
  riscos: ["Chuva forte"],
  instrucoes: ["Evite áreas alagadas."],
  poligono: JSON.stringify({ type: "Polygon", coordinates: [[[-60, -25], [-50, -25], [-50, -15], [-60, -25]]] }),
  encerrado: false,
};

const OTHER_STATE_ALERT = { ...CG_ALERT, id: 2, municipios: "Dourados - MS (5003702)", geocodes: "5003702" };

describe("fetchInmetAlerts", () => {
  it("classifies as LOCAL when at least one active alert lists Campo Grande", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ hoje: [CG_ALERT, OTHER_STATE_ALERT], futuro: [] });

    const result = await fetchInmetAlerts(client);

    expect(result.feed).toBe("inmet-alerts");
    expect(result.status).toBe("ok");
    expect(result.scope).toBe("LOCAL");
    expect(result.totalUpstream).toBe(2);
    expect(result.totalInRegion).toBe(1);
    expect(result.records[0].id).toBe("inmet-alerts-1");
    expect(result.records[0].provenance.sourcePlatform).toBe("INMET");
    expect(result.records[0].position).toBeNull();
    expect(result.records[0].geometry).toBeTruthy();
  });

  it("classifies as INDISPONIVEL (not an error) when there are active alerts but none list Campo Grande", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ hoje: [OTHER_STATE_ALERT], futuro: [] });

    const result = await fetchInmetAlerts(client);

    expect(result.status).toBe("empty");
    expect(result.scope).toBe("INDISPONIVEL");
    expect(result.totalInRegion).toBe(0);
  });

  it("never throws on upstream failure — returns status 'error' and scope 'ERRO'", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new InmetError("down", "http", 500));

    const result = await fetchInmetAlerts(client);

    expect(result.status).toBe("error");
    expect(result.scope).toBe("ERRO");
    expect(result.records).toEqual([]);
  });

  it("maps a timeout to status 'unavailable'", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new InmetError("timed out", "timeout"));

    const result = await fetchInmetAlerts(client);

    expect(result.status).toBe("unavailable");
  });
});
