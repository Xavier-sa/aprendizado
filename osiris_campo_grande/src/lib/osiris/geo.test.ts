import { describe, expect, it } from "vitest";
import { bboxContains, CAMPO_GRANDE_CENTER, haversineKm, isValidPoint, withinRadius } from "./geo";

describe("haversineKm", () => {
  it("returns ~0 for the same point", () => {
    expect(haversineKm(CAMPO_GRANDE_CENTER, CAMPO_GRANDE_CENTER)).toBeCloseTo(0, 5);
  });

  it("matches a known distance (Campo Grande to São Paulo, ~830km)", () => {
    const saoPaulo = { lat: -23.5505, lng: -46.6333 };
    const distance = haversineKm(CAMPO_GRANDE_CENTER, saoPaulo);
    expect(distance).toBeGreaterThan(750);
    expect(distance).toBeLessThan(900);
  });

  it("is symmetric", () => {
    const a = { lat: 10, lng: 10 };
    const b = { lat: -5, lng: 20 };
    expect(haversineKm(a, b)).toBeCloseTo(haversineKm(b, a), 10);
  });
});

describe("withinRadius", () => {
  it("includes a point exactly at the boundary", () => {
    const point = { lat: CAMPO_GRANDE_CENTER.lat + 1, lng: CAMPO_GRANDE_CENTER.lng };
    const distance = haversineKm(CAMPO_GRANDE_CENTER, point);
    expect(withinRadius(point, CAMPO_GRANDE_CENTER, distance)).toBe(true);
  });

  it("excludes a point beyond the radius", () => {
    const farPoint = { lat: 60, lng: 100 };
    expect(withinRadius(farPoint, CAMPO_GRANDE_CENTER, 300)).toBe(false);
  });
});

describe("isValidPoint", () => {
  it("accepts a well-formed point", () => {
    expect(isValidPoint({ lat: -20, lng: -54 })).toBe(true);
  });

  it.each([
    [null],
    [undefined],
    ["not a point"],
    [{ lat: "20", lng: -54 }],
    [{ lat: 20 }],
    [{ lat: 91, lng: 0 }],
    [{ lat: 0, lng: 181 }],
    [{ lat: NaN, lng: 0 }],
  ])("rejects invalid input %#", (value) => {
    expect(isValidPoint(value)).toBe(false);
  });
});

describe("bboxContains", () => {
  it("returns true when the point is inside the bbox", () => {
    const bbox: [number, number, number, number] = [-56.7, -21.2, -54.0, -19.1];
    expect(bboxContains(bbox, CAMPO_GRANDE_CENTER)).toBe(true);
  });

  it("returns false when the point is outside the bbox", () => {
    const bbox: [number, number, number, number] = [-58.9, -21.9, -56.1, -19.7];
    expect(bboxContains(bbox, CAMPO_GRANDE_CENTER)).toBe(false);
  });
});
