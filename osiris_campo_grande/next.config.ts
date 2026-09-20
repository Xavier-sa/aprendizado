import type { NextConfig } from "next";

/**
 * O front-end nunca fala com a OSIRIS diretamente — todo fetch passa por
 * `/api/osiris/*` no próprio servidor Next.js (ver src/lib/osiris/client.ts).
 * Por isso `connect-src` fica em 'self': o browser só precisa alcançar a
 * própria origem. `img-src` inclui os tiles do OpenStreetMap (basemap) e a
 * miniatura que `/api/region-dossier` retorna via Wikipedia (thumb do
 * verbete do país, quando disponível) além de 'self'/data:. `style-src
 * 'unsafe-inline'` é exigido pelo Leaflet, que posiciona marcadores via
 * atributo `style` inline (transform/translate3d) — não há como evitar
 * isso sem reescrever a lib. `script-src 'unsafe-inline'` é o mesmo
 * requisito do App Router do Next.js (hidratação via
 * `self.__next_f.push(...)` inline em toda página).
 */
const isDev = process.env.NODE_ENV === "development";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://*.wikimedia.org",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  agentRules: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
