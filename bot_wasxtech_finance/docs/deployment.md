# Deploy (preparação — deploy em si ainda NÃO foi feito)

Este documento descreve o que já está pronto para publicar o FinanceBot
na Vercel, e o que falta. **Nenhum projeto Vercel foi criado, nenhum
domínio configurado, nenhum CD automatizado até agora** — isso é
propositalmente uma etapa separada (ver [roadmap.md](./roadmap.md)).

## Por que Vercel

O projeto é Next.js (App Router); a Vercel é a plataforma com melhor
suporte nativo a isso (mesma empresa mantém o framework), tem plano
gratuito adequado a um projeto de portfólio, e integra bem com GitHub
para preview deployments por Pull Request (assunto de uma etapa futura
de CD, não desta).

## Particularidade deste repositório: monorepo de estudos

O projeto Vercel **não pode apontar para a raiz do repositório**
`aprendizado` — o FinanceBot vive em um subdiretório:

```
aprendizado/
└── bot_wasxtech_finance/   ← Root Directory na Vercel
```

Ao criar o projeto na Vercel, a configuração **Root Directory** deve ser
`bot_wasxtech_finance`. Sem isso, a Vercel tentaria rodar `npm install`/
`next build` na raiz do monorepo, onde não há `package.json` do
FinanceBot.

## O que já está pronto

- **Framework detection**: `next.config.ts` + `package.json` padrão —
  a Vercel detecta Next.js automaticamente com o Root Directory correto.
- **Install command**: `npm ci` (padrão da Vercel quando há
  `package-lock.json`) — já validado localmente a partir de instalação
  limpa.
- **Build command**: `next build` (script `build` do `package.json`) —
  já validado localmente.
- **Prisma Client no build**: `"postinstall": "prisma generate"` no
  `package.json` — necessário porque a Vercel só roda `npm install` +
  build, sem o passo explícito de `prisma generate` que o GitHub Actions
  declara à parte (ver [ci.md](./ci.md)).
- **Node version**: sem `engines` no `package.json` nem `.nvmrc`; a
  Vercel usa a versão LTS padrão dela, compatível com o "Node 20+" que
  este projeto já exige (ver README). Se necessário fixar, adicionar
  `.nvmrc` ou `engines.node` mais tarde — não fizemos isso agora por não
  ser necessário ainda.
- **Variáveis de ambiente necessárias em produção** (nenhuma com valor
  real neste repositório — ver `.env.example`):
  - `DATABASE_URL` — connection string do Neon.
  - `BETTER_AUTH_SECRET` — um valor gerado especificamente para produção,
    **diferente** do usado em desenvolvimento.
  - `BETTER_AUTH_URL` — a URL pública real do deploy (ex.:
    `https://financebot.vercel.app`), não `http://localhost:3000`.

## O que falta antes de publicar de verdade

- Criar o projeto na Vercel (Root Directory = `bot_wasxtech_finance`) e
  configurar as 3 variáveis de ambiente acima com valores reais.
- Rodar a migration (`npx prisma migrate deploy`) contra o banco de
  produção antes do primeiro acesso — a Vercel não faz isso
  automaticamente durante o build.
- Decidir se o banco de desenvolvimento (Neon atual) também serve para
  produção, ou se vale separar em dois bancos Neon (recomendado para não
  misturar dados de teste com dados reais de visitantes).
- CD (deploy automático a cada push/merge) — deliberadamente fora de
  escopo agora; ver roadmap.

## O que este projeto NÃO faz (por enquanto)

- Deploy automático.
- Integração com Vercel no GitHub Actions.
- Qualquer token da Vercel versionado ou configurado no CI.
