import type { NextConfig } from "next";

/**
 * Restrita a 'self' porque o projeto não usa nenhum recurso externo (sem
 * CDN, sem fonte externa, sem script de terceiro — confirmado antes de
 * escrever esta política). `'unsafe-inline'` em script-src é necessário
 * porque o App Router do Next.js injeta scripts inline próprios para
 * hidratação (`self.__next_f.push(...)`) em toda página — sem isso a
 * aplicação carrega mas não hidrata (chat, formulários, tudo que é Client
 * Component para de funcionar). A alternativa mais estrita (nonce por
 * requisição) exigiria desativar a renderização estática de `/`,
 * `/sign-in` e `/sign-up`, custo que não se justifica aqui — é a mesma
 * política "sem nonce" que a própria documentação do Next.js recomenda
 * como padrão. Ver docs/security.md, seção "Headers".
 */
const isDev = process.env.NODE_ENV === "development";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // Evita que `next dev` gere AGENTS.md/CLAUDE.md na raiz do projeto a
  // cada execução — não fazem parte da aplicação.
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
