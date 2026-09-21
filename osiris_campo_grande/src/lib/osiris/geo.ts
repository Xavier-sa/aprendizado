import type { GeoPoint } from "@/types";

/**
 * Único local do projeto com as coordenadas de Campo Grande - MS e o raio
 * padrão de busca — nenhum outro arquivo deve escrever esses números
 * diretamente (evita "números mágicos" espalhados, pedido explícito).
 * Fonte das coordenadas: centro da cidade (Praça Ary Coelho), não
 * fornecidas por nenhum endpoint da OSIRIS. Raio escolhido depois de testar
 * os feeds reais (ver docs/osiris-api-discovery.md): a maioria dos feeds da
 * OSIRIS tem cobertura muito esparsa no interior do Brasil, então um raio
 * pequeno (ex.: 50km) deixaria quase tudo vazio sem explicar por quê. 300km
 * cobre a região metropolitana e vizinhança direta (ainda assim, várias
 * categorias continuam vazias — isso é reportado explicitamente na
 * interface, não escondido).
 */
export const CAMPO_GRANDE = {
  latitude: -20.4697,
  longitude: -54.6201,
  defaultRadiusKm: 300,
} as const;

/** Forma `{lat,lng}` de `CAMPO_GRANDE`, para usar com `haversineKm`/`bboxContains`/o mapa. */
export const CAMPO_GRANDE_CENTER: GeoPoint = { lat: CAMPO_GRANDE.latitude, lng: CAMPO_GRANDE.longitude };

export const DEFAULT_RADIUS_KM: number = CAMPO_GRANDE.defaultRadiusKm;

/** Opções de raio expostas na interface (seção 7 do pedido) — o valor exibido nunca finge que o filtro foi feito pela OSIRIS; é sempre "encontrado pelo aplicativo em até Xkm". */
export const RADIUS_OPTIONS_KM = [50, 100, 300, 600] as const;
export type RadiusOptionKm = (typeof RADIUS_OPTIONS_KM)[number];

/** Distância entre dois pontos em km (fórmula de haversine). */
export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function isValidPoint(value: unknown): value is GeoPoint {
  if (typeof value !== "object" || value === null) return false;
  const point = value as Record<string, unknown>;
  return (
    typeof point.lat === "number" &&
    typeof point.lng === "number" &&
    Number.isFinite(point.lat) &&
    Number.isFinite(point.lng) &&
    point.lat >= -90 &&
    point.lat <= 90 &&
    point.lng >= -180 &&
    point.lng <= 180
  );
}

export function withinRadius(point: GeoPoint, center: GeoPoint, radiusKm: number): boolean {
  return haversineKm(center, point) <= radiusKm;
}

/** bbox de um scene/imagem no formato [minLng, minLat, maxLng, maxLat] (GeoJSON). */
export type Bbox = [number, number, number, number];

export function bboxContains(bbox: Bbox, point: GeoPoint): boolean {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  return (
    point.lng >= minLng &&
    point.lng <= maxLng &&
    point.lat >= minLat &&
    point.lat <= maxLat
  );
}
