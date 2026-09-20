"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { FeedKey, FeedResult, GeoPoint, NormalizedRecord } from "@/types";
import { LAYER_COLORS } from "./layerColors";

interface MapViewProps {
  center: GeoPoint;
  radiusKm: number;
  feeds: FeedResult[];
  visibleLayers: Set<FeedKey>;
  onSelectRecord: (record: NormalizedRecord) => void;
}

function formatDistance(km: number | null): string {
  if (km === null) return "distância desconhecida";
  return km < 1 ? `${Math.round(km * 1000)} m do centro de Campo Grande` : `${km.toFixed(1)} km do centro de Campo Grande`;
}

export function MapView({ center, feeds, visibleLayers, onSelectRecord }: MapViewProps) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={11}
      minZoom={2}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CircleMarker
        center={[center.lat, center.lng]}
        radius={8}
        pathOptions={{ color: "#111827", fillColor: "#111827", fillOpacity: 1 }}
      >
        <Popup>
          <strong>Campo Grande - MS</strong>
          <br />
          Ponto de referência fixo desta POC.
        </Popup>
      </CircleMarker>

      {feeds
        .filter((feed) => visibleLayers.has(feed.feed))
        .flatMap((feed) =>
          feed.records
            .filter((record) => record.position !== null)
            .map((record) => (
              <CircleMarker
                key={record.id}
                center={[record.position!.lat, record.position!.lng]}
                radius={6}
                pathOptions={{
                  color: LAYER_COLORS[feed.feed],
                  fillColor: LAYER_COLORS[feed.feed],
                  fillOpacity: 0.75,
                }}
                eventHandlers={{ click: () => onSelectRecord(record) }}
              >
                <Popup>
                  <strong>{record.title}</strong>
                  <br />
                  {record.summary}
                  <br />
                  <span className="text-xs text-gray-500">{formatDistance(record.distanceKm)}</span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Fonte: OSIRIS / {feed.label}
                  </span>
                </Popup>
              </CircleMarker>
            )),
        )}
    </MapContainer>
  );
}
