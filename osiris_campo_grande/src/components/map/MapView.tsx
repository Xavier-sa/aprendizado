"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, GeoJSON, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { FeedResult, GeoPoint, NormalizedRecord, SourceKey } from "@/types";
import { LAYER_COLORS } from "./layerColors";

interface MapViewProps {
  center: GeoPoint;
  radiusKm: number;
  feeds: FeedResult[];
  visibleLayers: Set<SourceKey>;
  onSelectRecord: (record: NormalizedRecord) => void;
}

function formatDistance(km: number | null): string {
  if (km === null) return "área — sem ponto único de referência";
  return km < 1 ? `${Math.round(km * 1000)} m do centro de Campo Grande` : `${km.toFixed(1)} km do centro de Campo Grande`;
}

function formatTimestamp(iso: string | null): string {
  if (!iso) return "não informado pela origem";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

/**
 * Conteúdo do popup — os 5 campos pedidos explicitamente (seção 10):
 * tipo, distância, detectado/atualizado, fonte, provedor + endpoint.
 */
function RecordPopup({ record, feedLabel }: { record: NormalizedRecord; feedLabel: string }) {
  return (
    <div className="text-xs">
      <p className="text-sm font-semibold text-gray-900">{record.title}</p>
      <p className="mt-1 text-gray-600">{record.summary}</p>
      <dl className="mt-2 space-y-0.5">
        <div>
          <dt className="inline font-medium text-gray-700">Tipo: </dt>
          <dd className="inline text-gray-600">{record.type}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-gray-700">Distância: </dt>
          <dd className="inline text-gray-600">{formatDistance(record.distanceKm)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-gray-700">Detectado/Atualizado: </dt>
          <dd className="inline text-gray-600">{formatTimestamp(record.timestamp)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-gray-700">Fonte: </dt>
          <dd className="inline text-gray-600">{record.provenance.sourcePlatform}</dd>
        </div>
        {record.provenance.upstreamSource && (
          <div>
            <dt className="inline font-medium text-gray-700">Provedor: </dt>
            <dd className="inline text-gray-600">{record.provenance.upstreamSource}</dd>
          </div>
        )}
        <div>
          <dt className="inline font-medium text-gray-700">Endpoint: </dt>
          <dd className="inline text-gray-600">{record.provenance.sourceEndpoint}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-gray-700">Por que aparece: </dt>
          <dd className="inline text-gray-600">camada &ldquo;{feedLabel}&rdquo; ligada</dd>
        </div>
      </dl>
    </div>
  );
}

export function MapView({ center, feeds, visibleLayers, onSelectRecord }: MapViewProps) {
  const visibleFeeds = feeds.filter((feed) => visibleLayers.has(feed.feed));

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={11} minZoom={2} className="h-full w-full" scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CircleMarker center={[center.lat, center.lng]} radius={8} pathOptions={{ color: "#111827", fillColor: "#111827", fillOpacity: 1 }}>
        <Popup>
          <strong>Campo Grande - MS</strong>
          <br />
          Ponto de referência fixo desta aplicação.
        </Popup>
      </CircleMarker>

      {/* Avisos com geometria real (polígono) — nunca representados como um marcador de ponto inventado. */}
      {visibleFeeds.flatMap((feed) =>
        feed.records
          .filter((record) => record.geometry)
          .map((record) => (
            <GeoJSON
              key={record.id}
              data={record.geometry as GeoJSON.Geometry}
              style={{
                color: typeof record.metadata.cor === "string" ? record.metadata.cor : LAYER_COLORS[feed.feed],
                weight: 2,
                fillOpacity: 0.12,
              }}
              eventHandlers={{ click: () => onSelectRecord(record) }}
            >
              <Popup>
                <RecordPopup record={record} feedLabel={feed.label} />
              </Popup>
            </GeoJSON>
          )),
      )}

      {visibleFeeds.flatMap((feed) =>
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
                <RecordPopup record={record} feedLabel={feed.label} />
              </Popup>
            </CircleMarker>
          )),
      )}
    </MapContainer>
  );
}
