# Fase 4: aparência por usuário

Implementação local. Nenhuma migration aplicada no Neon, promoção, deploy
ou operação de escrita no Git. Requer aplicar as migrations aprovadas antes
de publicar: a Fase 2 adiciona `User.role`; esta fase cria `UserPreference`.

## Experiência e persistência

`/settings/appearance` oferece Papiro, Esmeralda, Oceano, Grafite e Ametista,
com previews individuais e seleção por radio acessível. A escolha muda
imediatamente a interface; **Salvar aparência** persiste na conta.
**Cancelar preview** restaura a seleção salva. **Restaurar tema padrão**
seleciona Papiro para preview; o botão Salvar confirma a restauração.
Falhas ao salvar preservam a preferência anterior e exibem erro/retry pela
nova tentativa. A preferência é carregada no servidor em cada montagem do
layout autenticado e volta após login ou em outro dispositivo.

O ThemeProvider é identificado pelo ID validado no servidor. Preview não
usa localStorage nem cookie; logout desmonta o contexto e restaura o Papiro
público. ADMIN usa a mesma preferência pessoal; salvar sua paleta não
altera a de outras contas. Login, cadastro e landing usam Papiro.
O wrapper de SSR já recebe a paleta salva antes da hidratação; o cliente
também sincroniza canvas e scrollbars nativas, com limpeza ao sair.

Grafite é explicitamente selecionado e cobre os tokens da interface inteira.
A antiga substituição automática parcial por `prefers-color-scheme` foi
removida; preferência do sistema não sobrepõe a escolha salva.

## Schema final da preferência

```prisma
enum ThemePalette {
  PAPIRO
  ESMERALDA
  OCEANO
  GRAFITE
  AMETISTA
}

// Em User, preservando todos os campos e relações existentes:
preference UserPreference?

model UserPreference {
  userId    String       @id
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  theme     ThemePalette @default(PAPIRO)
  updatedAt DateTime     @updatedAt
}
```

O schema completo está em [schema.prisma](../prisma/schema.prisma).
Migration gerada com `prisma migrate diff` entre schemas locais, sem conexão
ao Neon: `20260918210000_add_user_preference/migration.sql`.

```sql
CREATE TYPE "ThemePalette" AS ENUM ('PAPIRO', 'ESMERALDA', 'OCEANO', 'GRAFITE', 'AMETISTA');

CREATE TABLE "UserPreference" (
  "userId" TEXT NOT NULL,
  "theme" "ThemePalette" NOT NULL DEFAULT 'PAPIRO',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId")
);

ALTER TABLE "UserPreference"
ADD CONSTRAINT "UserPreference_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
```

Impacto: tabela/enum novos, relação opcional e nenhum backfill necessário.
Contas existentes sem preferência usam Papiro; a linha é criada no primeiro
salvamento. `updatedAt` é preenchido pelo Prisma, sem aceitar timestamp do
cliente. Nenhum usuário, categoria, transação ou sessão removido.
O cascade remove somente a preferência caso a conta seja removida.

Rollback conceitual: voltar ao código da Fase 3 mantendo tabela/enum é a
opção que preserva escolhas. Se aprovado remover o schema novo, reverter
primeiro o código e remover só `UserPreference` e `ThemePalette`; isso perde
preferências, preservando contas e registros financeiros. Nenhum rollback
executado. Não usar reset, force-reset ou migrate dev em produção.

## API e segurança

`GET /api/settings/appearance` retorna `{theme}` da própria conta.
`PATCH` aceita exclusivamente `{theme: <enum permitido>}`. Sessão validada,
expiração verificada e cache de cookie desabilitado. O `userId` sempre vem
do servidor, nunca do body ou query; campos extras são rejeitados com `400`.
Queries não são suportadas, inclusive tentativas de direcionar outro ID.

Mutação exige Origin igual à origem da requisição, rejeita fetch cross-site,
exige JSON e usa validação estrita. Sessão ausente/falsa/expirada recebe
`401`; origem inválida `403`; preferência inválida `400`; content type
inadequado `415`. Banco indisponível recebe erro genérico sem detalhes.
Respostas são `no-store`. Proxy protege `/settings/*` e `/api/settings/*`,
além dos guards reais no layout/controller. Não houve mudança em ownership
financeiro ou autorização administrativa. Nenhum endpoint muda role.

## Tokens, gráficos e contraste

Valores de todas as paletas estão centralizados em `src/app/globals.css`;
componentes usam tokens, sem condicionais de cor por tema. Tokens incluem
foreground de ação separado da superfície, hover, texto muted, controles,
foco, disabled, receita/despesa e backgrounds semânticos. Desabilitados usam
pares definidos em vez de redução geral de opacidade.

Os quatro gráficos Recharts usam tokens de receita, despesa, saldo, grid e
tooltip. A pizza usa oito cores categóricas centralizadas, separadores e
legendas textuais. Legendas e tooltip têm foreground próprio; não dependem
de uma cor de gráfico de menor contraste para exibir texto.
Favicon continua sendo uma marca fixa; não é controle/texto temático.

O contraste diagnosticado de aproximadamente **3,60:1** foi corrigido:
Papiro passa a usar `#805716` com foreground `#ffffff`, também para botão,
mensagem enviada, opção primária do chat e item ativo da navegação.
As cinco paletas têm seus pares validados a partir do CSS real.

Testes exigem pelo menos 4,5:1 para texto normal, ações/hover, badges e
disabled text; pelo menos 3:1 para foco, bordas de controles e cores dos
gráficos contra a superfície, seguindo [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
Grid/bordas decorativas não são tratados como texto/controle essencial.
Essas medições não constituem declaração de conformidade WCAG completa.

| Paleta | Contraste do botão primário (foreground/background) |
|---|---|
| Papiro | 6,38:1 |
| Esmeralda | 7,25:1 |
| Oceano | 7,29:1 |
| Grafite | 9,64:1 |
| Ametista | 7,65:1 |

## Escopo das verificações

API testada com handler e sessões reais do Better Auth em memória, usando
repository real sobre Prisma controlado: A escolhe Esmeralda, B continua
Papiro, logout/login restaura A, ADMIN altera somente sua conta, ataques por
body/query/origem/sessão são bloqueados. Produção não é acessada.

Browser fixture local usa componentes reais, hooks React, Shell, CSS e
Recharts, com API/roteamento fictícios. Testa preview sem gravação, cancelar,
salvar, recarregar, restaurar, falha/recovery e payload/origem da mutação.
Layout: USER/ADMIN × cinco paletas × sete larguras (320, 375, 390, 430, 768,
1024, 1440 px), incluindo quatro gráficos efetivamente renderizados.
Artefatos ficam em `.vercel/phase4-browser` e não entram no Git.
Isso não substitui teste integrado do Next.js/PostgreSQL após aprovação
explícita da migration/ambiente isolado. CI/CD e dependências preservados.

## Resultados finais locais

| Verificação | Resultado |
|---|---|
| `npm test` | 185 testes aprovados em 17 arquivos; 28 adicionados pela Fase 4 |
| `npm run lint` | Aprovado |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado; appearance/API dinâmicos, landing/login/cadastro estáticos |
| `prisma validate` | Schema válido |
| Edge headless | Fluxos de preview/salvar/cancelar/restaurar e falha aprovados |
| Layout | 70 cenários, sem overflow horizontal ou erro de execução |
| Estados | Hover, foco por teclado e tooltip aprovados nas cinco paletas |

A suíte final também inclui trabalho concorrente de datas/consultas
financeiras, preservado. Foram corrigidas somente asserções de testes que
indexavam argumentos opcionais e bloqueavam o typecheck; nenhuma mudança
nesses serviços financeiros foi feita pela Fase 4. Essa contribuição
concorrente explica a contagem total maior que 154 da primeira verificação.

Os comandos usaram variáveis fictícias, sem executar migration ou conectar
ao Neon. SQL gerado continua pendente de revisão/aprovação para produção.
