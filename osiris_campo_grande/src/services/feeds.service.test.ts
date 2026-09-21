import { describe, expect, it, vi } from "vitest";
import { OsirisClient, OsirisError } from "@/lib/osiris/client";
import { inmetClient } from "@/lib/inmet/client";
import {
  fetchAllFeeds,
  fetchAllGlobalFeeds,
  fetchApiHealth,
  fetchFeed,
  fetchGlobalFeed,
  fetchRegionDossier,
  fetchSituationFeeds,
} from "./feeds.service";

function fakeClient() {
  return new OsirisClient("https://example.test/api");
}

describe("fetchFeed", () => {
  it("keeps only records within the radius and reports totals honestly", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({
      earthquakes: [
        { id: "near", lat: -20.4697, lng: -54.6201, magnitude: 3, time: 1_700_000_000_000 }, // 0km
        { id: "far", lat: 60, lng: 100, magnitude: 5, time: 1_700_000_000_000 }, // far away
        { id: "no-coords", magnitude: 1 }, // missing lat/lng
      ],
    });

    const result = await fetchFeed("earthquakes", 300, client);

    expect(result.status).toBe("ok");
    expect(result.scope).toBe("GLOBAL_FILTRADO");
    expect(result.totalUpstream).toBe(3);
    expect(result.totalWithoutCoordinates).toBe(1);
    expect(result.totalInRegion).toBe(1);
    expect(result.records).toHaveLength(1);
    expect(result.records[0].id).toBe("earthquakes-near");
    expect(result.records[0].distanceKm).toBeCloseTo(0, 3);
    expect(result.filteredLocally).toBe(true);
    expect(result.radiusKm).toBe(300);
    expect(result.provenance.sourceEndpoint).toBe("/earthquakes");
    expect(result.provenance.sourcePlatform).toBe("OSIRIS");
    // earthquakes tem `documentedUpstream: "USGS"` e o payload de teste não declara `source` próprio.
    expect(result.provenance.upstreamSource).toBe("USGS");
    expect(result.provenance.upstreamSourceOrigin).toBe("docs");
  });

  it("reports status 'empty' and scope 'INDISPONIVEL' when nothing falls inside the radius", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ earthquakes: [{ id: "far", lat: 60, lng: 100, time: 0 }] });

    const result = await fetchFeed("earthquakes", 300, client);

    expect(result.status).toBe("empty");
    expect(result.scope).toBe("INDISPONIVEL");
    expect(result.totalInRegion).toBe(0);
    expect(result.records).toEqual([]);
  });

  it("reports scope 'INDISPONIVEL' when the upstream itself has zero records (not just outside the radius)", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ stations: [] });

    const result = await fetchFeed("air-quality", 300, client);

    expect(result.totalUpstream).toBe(0);
    expect(result.scope).toBe("INDISPONIVEL");
    expect(result.scopeNote).toContain("vazio no mundo todo");
  });

  it("prefers an upstream source declared in the payload over the documented one", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({
      fires: [{ lat: -20.4697, lng: -54.6201, date: "2026-09-19", time: "0100" }],
      source: "NASA-FIRMS (VIIRS)",
    });

    const result = await fetchFeed("fires", 300, client);

    expect(result.provenance.upstreamSource).toBe("NASA-FIRMS (VIIRS)");
    expect(result.provenance.upstreamSourceOrigin).toBe("payload");
  });

  it("summarizes a `providers` object into upstreamSource when there is no `source` string", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({
      commercial_flights: [{ callsign: "X1", lat: -20.4697, lng: -54.6201 }],
      providers: { opensky: 100, adsbfi_mil: 5 },
    });

    const result = await fetchFeed("flights", 300, client);

    expect(result.provenance.upstreamSource).toContain("opensky");
    expect(result.provenance.upstreamSourceOrigin).toBe("payload");
  });

  it("never throws on upstream HTTP error — returns status 'error' and scope 'ERRO' instead", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new OsirisError("HTTP 503", "http", 503));

    const result = await fetchFeed("fires", 300, client);

    expect(result.status).toBe("error");
    expect(result.scope).toBe("ERRO");
    expect(result.records).toEqual([]);
    expect(result.error).toContain("503");
  });

  it("maps a timeout to status 'unavailable' rather than 'error'", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new OsirisError("timed out", "timeout"));

    const result = await fetchFeed("cctv", 300, client);

    expect(result.status).toBe("unavailable");
    expect(result.scope).toBe("ERRO");
  });

  it("survives an unexpected non-OsirisError throw", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new Error("boom"));

    const result = await fetchFeed("radar", 300, client);

    expect(result.status).toBe("error");
    expect(result.error).toBeTruthy();
  });

  it("filters sentinel scenes by bbox coverage, not by radius, and classifies as LOCAL when it covers the point", async () => {
    const client = fakeClient();
    const getSpy = vi.spyOn(client, "get").mockResolvedValue({
      scenes: [
        { id: "covers", datetime: "2026-09-14T00:00:00Z", bbox: [-56.7, -21.2, -54.0, -19.1] },
        { id: "misses", bbox: [-58.9, -21.9, -56.1, -19.7] },
      ],
    });

    const result = await fetchFeed("sentinel", 300, client);

    expect(getSpy).toHaveBeenCalledWith(
      "/sentinel",
      expect.objectContaining({ searchParams: { lat: "-20.4697", lng: "-54.6201" } }),
    );
    expect(result.totalUpstream).toBe(2);
    expect(result.totalInRegion).toBe(1);
    expect(result.scope).toBe("LOCAL");
    expect(result.records[0].id).toBe("sentinel-covers");
    expect(result.radiusKm).toBeNull();
  });

  it("classifies sentinel as INDISPONIVEL when no scene covers the exact point", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ scenes: [{ id: "misses", bbox: [-58.9, -21.9, -56.1, -19.7] }] });

    const result = await fetchFeed("sentinel", 300, client);

    expect(result.scope).toBe("INDISPONIVEL");
  });

  it("flattens conflict zones and their nested events", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({
      zones: [
        {
          id: "ukraine",
          label: "UKRAINE WAR",
          lat: 48.5,
          lng: 31.2,
          events: [{ id: "e1", lat: 48.7, lng: 31.2, title: "Drone strike" }],
        },
      ],
    });

    const result = await fetchFeed("conflicts", 300, client);

    expect(result.totalUpstream).toBe(2); // 1 zone + 1 event
    expect(result.totalInRegion).toBe(0); // Ukraine is nowhere near Campo Grande
    expect(result.scope).toBe("INDISPONIVEL");
  });
});

describe("fetchAllFeeds", () => {
  it("resolves every configured feed even when some fail", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockImplementation(async (path: string) => {
      if (path === "/fires") throw new OsirisError("down", "http", 500);
      return {};
    });

    const results = await fetchAllFeeds(300, client);

    expect(results).toHaveLength(13);
    const fires = results.find((r) => r.feed === "fires");
    expect(fires?.status).toBe("error");
    const others = results.filter((r) => r.feed !== "fires");
    expect(others.every((r) => r.status === "empty")).toBe(true);
  });
});

describe("fetchSituationFeeds", () => {
  it("combines the OSIRIS feeds with the INMET alerts feed into one array", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({});
    vi.spyOn(inmetClient, "get").mockResolvedValue({ hoje: [], futuro: [] });

    const results = await fetchSituationFeeds(300, client);

    expect(results).toHaveLength(14); // 13 da OSIRIS + 1 do INMET
    const inmet = results.find((r) => r.feed === "inmet-alerts");
    expect(inmet?.provenance.sourcePlatform).toBe("INMET");
  });
});

describe("fetchGlobalFeed", () => {
  it("returns the raw payload with provenance and scope 'GLOBAL' on success", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ kp_index: 2 });

    const result = await fetchGlobalFeed("space-weather", client);

    expect(result.status).toBe("ok");
    expect(result.scope).toBe("GLOBAL");
    expect(result.data).toEqual({ kp_index: 2 });
    expect(result.note).toContain("global");
  });

  it("never throws — returns status 'error' on failure", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new OsirisError("fail", "network"));

    const result = await fetchGlobalFeed("stats", client);

    expect(result.status).toBe("error");
    expect(result.data).toBeNull();
  });
});

describe("fetchAllGlobalFeeds", () => {
  it("resolves all three global feeds, including country-risk", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ countries: [{ code: "US" }] });

    const results = await fetchAllGlobalFeeds(client);

    expect(results.map((r) => r.feed).sort()).toEqual(["country-risk", "space-weather", "stats"]);
  });
});

describe("fetchRegionDossier", () => {
  it("reports hasContent=false when the origin returns empty location/country/wikipedia", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ coordinates: { lat: -20.4697, lng: -54.6201 }, location: {}, country: null, wikipedia: null });

    const result = await fetchRegionDossier(client);

    expect(result.status).toBe("empty");
    expect(result.hasContent).toBe(false);
    expect(result.note).toContain("não retornou dados de enriquecimento");
  });

  it("reports hasContent=true when the origin returns real location data", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ location: { city: "Campo Grande" }, country: "Brazil" });

    const result = await fetchRegionDossier(client);

    expect(result.status).toBe("ok");
    expect(result.hasContent).toBe(true);
  });

  it("never throws on failure", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new OsirisError("down", "http", 500));

    const result = await fetchRegionDossier(client);

    expect(result.status).toBe("error");
    expect(result.hasContent).toBe(false);
  });
});

describe("fetchApiHealth", () => {
  it("maps a healthy response", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockResolvedValue({ status: "serving", version: "1.0.0", uptime_seconds: 120, detail: "ok" });

    const result = await fetchApiHealth(client);

    expect(result.status).toBe("ok");
    expect(result.version).toBe("1.0.0");
    expect(result.uptimeSeconds).toBe(120);
  });

  it("never throws when the health check itself fails", async () => {
    const client = fakeClient();
    vi.spyOn(client, "get").mockRejectedValue(new OsirisError("timed out", "timeout"));

    const result = await fetchApiHealth(client);

    expect(result.status).toBe("unavailable");
  });
});
