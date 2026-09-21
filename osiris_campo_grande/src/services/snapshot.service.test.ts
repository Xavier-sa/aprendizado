import { describe, expect, it } from "vitest";
import type { FeedResult } from "@/types";
import { computeChangeSummary } from "./snapshot.service";

/** Minimal FeedResult — só os campos que `computeChangeSummary` de fato lê. */
function feed(overrides: Partial<FeedResult> & Pick<FeedResult, "feed">): FeedResult {
  return {
    label: overrides.feed,
    status: "ok",
    scope: "GLOBAL_FILTRADO",
    scopeNote: "",
    totalUpstream: 0,
    totalWithoutCoordinates: 0,
    totalInRegion: 0,
    records: [],
    filteredLocally: true,
    radiusKm: 300,
    provenance: { sourcePlatform: "OSIRIS", sourceEndpoint: "/x", fetchedAt: "2026-09-21T00:00:00Z" },
    ...overrides,
  };
}

function record(id: string, timestamp: string | null = null) {
  return { id, timestamp } as FeedResult["records"][number];
}

// Cada teste usa um raio próprio (chave do Map em memória do serviço) para não interferir entre si.
let radius = 1;
function nextRadius() {
  radius += 1;
  return radius;
}

describe("computeChangeSummary", () => {
  it("reports no previous observation on the first call for a given radius", () => {
    const r = nextRadius();
    const summary = computeChangeSummary(r, [feed({ feed: "fires", totalInRegion: 2, records: [record("a"), record("b")] })]);

    expect(summary.previousCheckedAt).toBeNull();
    expect(summary.events).toEqual([]);
  });

  it("detects new records by id since the previous call", () => {
    const r = nextRadius();
    computeChangeSummary(r, [feed({ feed: "fires", totalInRegion: 1, records: [record("a")] })]);
    const summary = computeChangeSummary(r, [feed({ feed: "fires", totalInRegion: 2, records: [record("a"), record("b")] })]);

    expect(summary.previousCheckedAt).not.toBeNull();
    expect(summary.events).toEqual([{ feed: "fires", kind: "new-records", message: expect.stringContaining("+1") }]);
  });

  it("detects a drop in record count when no new ids appeared", () => {
    const r = nextRadius();
    computeChangeSummary(r, [feed({ feed: "fires", totalInRegion: 3, records: [record("a"), record("b"), record("c")] })]);
    const summary = computeChangeSummary(r, [feed({ feed: "fires", totalInRegion: 1, records: [record("a")] })]);

    expect(summary.events).toEqual([{ feed: "fires", kind: "fewer-records", message: expect.stringContaining("3 para 1") }]);
  });

  it("detects a source recovering from error", () => {
    const r = nextRadius();
    computeChangeSummary(r, [feed({ feed: "cctv", status: "error", totalInRegion: 0 })]);
    const summary = computeChangeSummary(r, [feed({ feed: "cctv", status: "ok", totalInRegion: 1, records: [record("a")] })]);

    expect(summary.events.some((e) => e.kind === "source-recovered")).toBe(true);
  });

  it("detects a source failing since the previous call", () => {
    const r = nextRadius();
    computeChangeSummary(r, [feed({ feed: "cctv", status: "ok", totalInRegion: 1, records: [record("a")] })]);
    const summary = computeChangeSummary(r, [feed({ feed: "cctv", status: "error", totalInRegion: 0 })]);

    expect(summary.events.some((e) => e.kind === "source-failed")).toBe(true);
  });

  it("detects new Sentinel coverage when the latest scene timestamp changes", () => {
    const r = nextRadius();
    computeChangeSummary(r, [feed({ feed: "sentinel", totalInRegion: 1, records: [record("s1", "2026-09-14T00:00:00Z")] })]);
    const summary = computeChangeSummary(r, [feed({ feed: "sentinel", totalInRegion: 1, records: [record("s1", "2026-09-14T00:00:00Z"), record("s2", "2026-09-20T00:00:00Z")] })]);

    expect(summary.events.some((e) => e.kind === "new-sentinel-coverage")).toBe(true);
  });

  it("reports no events when nothing changed between two calls", () => {
    const r = nextRadius();
    const snapshot = [feed({ feed: "fires", totalInRegion: 1, records: [record("a")] })];
    computeChangeSummary(r, snapshot);
    const summary = computeChangeSummary(r, snapshot);

    expect(summary.events).toEqual([]);
  });

  it("keeps snapshots independent per radius", () => {
    const r1 = nextRadius();
    const r2 = nextRadius();
    computeChangeSummary(r1, [feed({ feed: "fires", totalInRegion: 1, records: [record("a")] })]);
    // Primeira chamada para r2 — não deve "herdar" o snapshot de r1.
    const summary = computeChangeSummary(r2, [feed({ feed: "fires", totalInRegion: 5, records: [record("x")] })]);

    expect(summary.previousCheckedAt).toBeNull();
  });
});
