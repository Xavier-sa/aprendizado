import { describe, expect, it } from "vitest";
import {
  normalizeAirQuality,
  normalizeCctv,
  normalizeConflicts,
  normalizeEarthquakes,
  normalizeFires,
  normalizeFlights,
  normalizeSatellites,
  normalizeSentinel,
} from "./normalizers";

describe("normalizeFlights", () => {
  it("flattens the four aircraft buckets and ignores gps_jamming", () => {
    const raw = {
      commercial_flights: [{ callsign: "TAM123", lat: -20, lng: -54, alt: 1000, icao24: "abc" }],
      private_flights: [{ callsign: "PVT1", lat: -21, lng: -55, icao24: "def" }],
      private_jets: [],
      military_flights: [{ callsign: "MIL1", lat: -22, lng: -56, icao24: "ghi" }],
      gps_jamming: [{ lat: 0, lng: 0 }],
    };
    const result = normalizeFlights(raw);
    expect(result).toHaveLength(3);
    expect(result.map((r) => r.type)).toEqual(["Voo comercial", "Voo privado", "Voo militar"]);
    expect(result[0].position).toEqual({ lat: -20, lng: -54 });
  });

  it("handles a missing bucket gracefully", () => {
    expect(normalizeFlights({})).toEqual([]);
    expect(normalizeFlights(null)).toEqual([]);
  });

  it("drops position when lat/lng are missing", () => {
    const result = normalizeFlights({ commercial_flights: [{ callsign: "NOPOS" }] });
    expect(result[0].position).toBeNull();
  });
});

describe("normalizeSatellites", () => {
  it("maps satellites and has no per-item source timestamp", () => {
    const result = normalizeSatellites({
      satellites: [{ name: "ISS", lat: 1, lng: 2, alt: 400, category: "station", noradId: "25544" }],
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("ISS");
    expect(result[0].sourceTimestamp).toBeNull();
  });
});

describe("normalizeEarthquakes", () => {
  it("converts epoch-ms time to ISO", () => {
    const result = normalizeEarthquakes({
      earthquakes: [{ id: "eq1", lat: -20, lng: -54, magnitude: 4.2, depth: 10, time: 1_700_000_000_000 }],
    });
    expect(result[0].sourceTimestamp).toBe(new Date(1_700_000_000_000).toISOString());
  });

  it("leaves sourceTimestamp null when time is absent", () => {
    const result = normalizeEarthquakes({ earthquakes: [{ id: "eq2", lat: -20, lng: -54 }] });
    expect(result[0].sourceTimestamp).toBeNull();
  });
});

describe("normalizeFires", () => {
  it("combines date and HHmm time into an ISO UTC timestamp", () => {
    const result = normalizeFires({ fires: [{ lat: -20, lng: -54, date: "2026-09-19", time: "0154", frp: 3.2 }] });
    expect(result[0].sourceTimestamp).toBe("2026-09-19T01:54:00Z");
  });

  it("leaves sourceTimestamp null when time is malformed", () => {
    const result = normalizeFires({ fires: [{ lat: -20, lng: -54, date: "2026-09-19", time: "1" }] });
    expect(result[0].sourceTimestamp).toBeNull();
  });
});

describe("normalizeCctv", () => {
  it("prefers stream_url over external_url and keeps records without coordinates", () => {
    const result = normalizeCctv({
      cameras: [
        { id: "c1", name: "Cam 1", lat: -20, lng: -54, stream_url: "https://stream" },
        { id: "c2", name: "Cam 2", external_url: "https://external" },
      ],
    });
    expect(result[0].metadata.streamUrl).toBe("https://stream");
    expect(result[1].position).toBeNull();
    expect(result[1].metadata.streamUrl).toBe("https://external");
  });
});

describe("normalizeSentinel", () => {
  const center = { lat: -20.4697, lng: -54.6201 };

  it("marks coversPoint true when the bbox contains the query point", () => {
    const result = normalizeSentinel(
      { scenes: [{ id: "s1", datetime: "2026-09-14T00:00:00Z", bbox: [-56.7, -21.2, -54.0, -19.1], area_km2: 100 }] },
      center,
    );
    expect(result[0].metadata.coversPoint).toBe(true);
    expect(result[0].position).toEqual({ lat: -20.15, lng: -55.35 });
  });

  it("marks coversPoint false when the bbox misses the query point", () => {
    const result = normalizeSentinel(
      { scenes: [{ id: "s2", bbox: [-58.9, -21.9, -56.1, -19.7] }] },
      center,
    );
    expect(result[0].metadata.coversPoint).toBe(false);
  });

  it("never treats the s3:// thumbnail as a renderable image URL", () => {
    const result = normalizeSentinel({ scenes: [{ id: "s3", bbox: [-56.7, -21.2, -54.0, -19.1], thumbnail: "s3://bucket/key.png" }] }, center);
    expect(result[0].metadata.thumbnailRenderable).toBe(false);
    expect(result[0].metadata.thumbnailS3Uri).toBe("s3://bucket/key.png");
  });

  it("has no position when bbox is absent", () => {
    const result = normalizeSentinel({ scenes: [{ id: "s4" }] }, center);
    expect(result[0].position).toBeNull();
    expect(result[0].metadata.coversPoint).toBe(false);
  });
});

describe("normalizeConflicts", () => {
  it("emits one record for the zone and one per nested event with its own coordinates", () => {
    const result = normalizeConflicts({
      zones: [
        {
          id: "ukraine",
          label: "UKRAINE WAR",
          lat: 48.5,
          lng: 31.2,
          severity: "war",
          description: "Ongoing conflict",
          events: [
            { id: "e1", lat: 48.7, lng: 31.2, title: "Drone strike", timestamp: "2026-09-20T00:00:00Z" },
            { id: "e2", title: "No coordinates on this one" },
          ],
        },
      ],
    });

    expect(result).toHaveLength(2); // the zone itself + the one event with coordinates
    expect(result[0].type).toBe("Zona de conflito ativa");
    expect(result[0].position).toEqual({ lat: 48.5, lng: 31.2 });
    expect(result[1].type).toBe("Incidente em zona de conflito");
    expect(result[1].position).toEqual({ lat: 48.7, lng: 31.2 });
    expect(result[1].sourceTimestamp).toBe("2026-09-20T00:00:00Z");
  });

  it("handles a zone with no events and no crash on missing fields", () => {
    expect(normalizeConflicts({ zones: [{ id: "z1", label: "Z" }] })).toHaveLength(1);
    expect(normalizeConflicts({})).toEqual([]);
  });
});

describe("normalizeAirQuality", () => {
  it("returns an empty array when there are no stations (the real, currently observed API response)", () => {
    expect(normalizeAirQuality({ stations: [], total: 0 })).toEqual([]);
  });

  it("extracts AQI/pollutant fields defensively when a station is present", () => {
    const result = normalizeAirQuality({
      stations: [{ id: "s1", station: "Estação Centro", lat: -20.4697, lng: -54.6201, aqi: 42, pm25: 10 }],
    });
    expect(result[0].title).toBe("Estação Centro");
    expect(result[0].metadata.aqi).toBe(42);
    expect(result[0].metadata.pm25).toBe(10);
    expect(result[0].metadata.pm10).toBeNull();
  });
});
