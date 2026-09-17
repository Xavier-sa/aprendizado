import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que `next dev` gere AGENTS.md/CLAUDE.md na raiz do projeto a
  // cada execução — não fazem parte da aplicação.
  agentRules: false,
};

export default nextConfig;
