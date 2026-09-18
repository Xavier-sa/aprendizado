# Diagramas

Diagramas em Mermaid, renderizáveis diretamente pelo GitHub. Refletem o
código como ele existe hoje — nada aqui é aspiracional.

## Diagrama de classes (modelo de dados)

```mermaid
classDiagram
    class TransactionType {
        <<enumeration>>
        INCOME
        EXPENSE
    }

    class User {
        +String id
        +String name
        +String email
        +Boolean emailVerified
        +UserRole role "default USER"
        +DateTime createdAt
    }

    class UserRole {
        <<enumeration>>
        USER
        ADMIN
    }

    class ThemePalette {
        <<enumeration>>
        PAPIRO
        ESMERALDA
        OCEANO
        GRAFITE
        AMETISTA
    }

    class UserPreference {
        +String userId
        +ThemePalette theme "default PAPIRO"
        +DateTime updatedAt
    }

    class Category {
        +String id
        +String name
        +TransactionType type
        +String userId "nulo = padrão do sistema"
        +DateTime createdAt
        +DateTime updatedAt
    }

    class Transaction {
        +String id
        +String userId
        +String description
        +Decimal amount
        +TransactionType type
        +String categoryId
        +String paymentMethod
        +DateTime transactionDate
        +String originalMessage
        +DateTime createdAt
        +DateTime updatedAt
    }

    User "1" --> "*" Transaction : userId
    User "1" --> "0..1" UserPreference : userId
    UserPreference --> ThemePalette
    User "0..1" --> "*" Category : userId (nulo = global)
    Category "1" --> "*" Transaction : categoryId
    Transaction --> TransactionType
    Category --> TransactionType
```

`Session`, `Account` e `Verification` (tabelas do Better Auth,
ver [authentication.md](./authentication.md)) omitidas acima por
brevidade — não fazem parte do domínio financeiro.

## Diagrama de fluxo (registrar uma movimentação pelo chat)

```mermaid
flowchart TD
    A[Usuário digita mensagem] --> B["ChatWindow (client)"]
    B --> C["POST /api/chat"]
    C --> S{"Sessão válida?\n(getUserId)"}
    S -- não --> S1[401 Não autenticado]
    S -- sim --> D["chat.controller (com userId)"]
    D --> E{"É uma consulta?\n(query.service)"}
    E -- sim --> F["Responde com dado real do banco,\nfiltrado por userId"]
    E -- não --> G["parser.service: extrai tipo, valor,\ncategoria, data (não conhece userId)"]
    G --> H{Faltou algum campo?}
    H -- sim --> I[Pergunta o campo faltante]
    I --> B
    H -- não --> J[Mostra prévia e pede confirmação]
    J --> B
    B -- "sim" --> K["transaction.service.create(userId, ...)"]
    K --> L["transaction.repository (Prisma)"]
    L --> M[(PostgreSQL / Neon)]
    M --> N[Dashboard e Movimentações atualizados]
```

## Diagrama de arquitetura (camadas)

```mermaid
flowchart LR
    Browser["Browser"] --> Proxy["src/proxy.ts\n(checa cookie de sessão)"]
    Proxy --> View["View\n(app/*, components/*)"]
    View --> Controller["Controller\n(controllers/*, Route Handlers)"]
    Controller --> Auth["Better Auth\n(getUserId / auth.api.getSession)"]
    Controller --> Service["Service\n(services/*: parser, financial, query, transaction)"]
    Service --> Repository["Repository\n(repositories/*, sempre filtrado por userId)"]
    Repository --> Prisma["Prisma Client\n(@prisma/adapter-pg)"]
    Prisma --> Neon[(Neon PostgreSQL)]
```
