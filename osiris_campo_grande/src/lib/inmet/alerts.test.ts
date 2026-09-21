import { describe, expect, it } from "vitest";
import { filterAlertsForCampoGrande } from "./alerts";

const CG_POLYGON = JSON.stringify({
  type: "Polygon",
  coordinates: [
    [
      [-60, -25],
      [-50, -25],
      [-50, -15],
      [-60, -15],
      [-60, -25],
    ],
  ],
});

function makeAlert(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: 1,
    id_aviso: 100,
    descricao: "Tempestade",
    severidade: "Perigo Potencial",
    aviso_cor: "#FFFE00",
    data_inicio: "2026-09-21T00:00:00.000Z",
    hora_inicio: "00:00",
    data_fim: "2026-09-21T23:59:00.000Z",
    hora_fim: "23:59",
    inicio: "2026-09-21 00:00",
    fim: "2026-09-21 23:59",
    municipios: "Campo Grande - MS (5002704),Dourados - MS (5003702)",
    geocodes: "5002704,5003702",
    estados: "Mato Grosso do Sul",
    riscos: ["Chuva forte"],
    instrucoes: ["Evite áreas alagadas."],
    poligono: CG_POLYGON,
    encerrado: false,
    ...overrides,
  };
}

describe("filterAlertsForCampoGrande", () => {
  it("includes an alert whose geocodes list contains Campo Grande - MS exactly (5002704)", () => {
    const result = filterAlertsForCampoGrande({ hoje: [makeAlert()], futuro: [] });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Tempestade");
    expect(result[0].severity).toBe("Perigo Potencial");
  });

  it("excludes an alert that does not list Campo Grande - MS, even if the name string mentions another 'Campo Grande'", () => {
    // Regression guard: there is a district in São Paulo also named "Campo Grande" — matching
    // must be by exact IBGE geocode (5002704), never by substring/name.
    const alert = makeAlert({
      municipios: "Campo Grande (São Paulo) - SP (3550308)",
      geocodes: "3550308",
    });
    const result = filterAlertsForCampoGrande({ hoje: [alert], futuro: [] });
    expect(result).toHaveLength(0);
  });

  it("does not match a geocode that merely contains 5002704 as a substring of a longer code", () => {
    const alert = makeAlert({ geocodes: "45002704,5002704999" });
    const result = filterAlertsForCampoGrande({ hoje: [alert], futuro: [] });
    expect(result).toHaveLength(0);
  });

  it("excludes alerts marked as encerrado (closed), even if they list Campo Grande", () => {
    const result = filterAlertsForCampoGrande({ hoje: [makeAlert({ encerrado: true })], futuro: [] });
    expect(result).toHaveLength(0);
  });

  it("deduplicates the same alert id appearing in both hoje and futuro", () => {
    const alert = makeAlert();
    const result = filterAlertsForCampoGrande({ hoje: [alert], futuro: [{ ...alert }] });
    expect(result).toHaveLength(1);
  });

  it("parses the polygon into GeoJSON geometry", () => {
    const result = filterAlertsForCampoGrande({ hoje: [makeAlert()], futuro: [] });
    expect(result[0].geometry).toEqual({
      type: "Polygon",
      coordinates: [
        [
          [-60, -25],
          [-50, -25],
          [-50, -15],
          [-60, -15],
          [-60, -25],
        ],
      ],
    });
  });

  it("returns null geometry when the polygon field is not valid JSON, instead of throwing", () => {
    const result = filterAlertsForCampoGrande({ hoje: [makeAlert({ poligono: "not json" })], futuro: [] });
    expect(result[0].geometry).toBeNull();
  });

  it("handles an empty or missing response gracefully", () => {
    expect(filterAlertsForCampoGrande({ hoje: [], futuro: [] })).toEqual([]);
    expect(filterAlertsForCampoGrande({} as never)).toEqual([]);
  });
});
