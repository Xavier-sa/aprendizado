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

    class Category {
        +String id
        +String name
        +TransactionType type
        +DateTime createdAt
        +DateTime updatedAt
    }

    class Transaction {
        +String id
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

    Category "1" --> "*" Transaction : categoryId
    Transaction --> TransactionType
    Category --> TransactionType
```

## Diagrama de fluxo (registrar uma movimentação pelo chat)

```mermaid
flowchart TD
    A[Usuário digita mensagem] --> B["ChatWindow (client)"]
    B --> C["POST /api/chat"]
    C --> D["chat.controller"]
    D --> E{"É uma consulta?\n(query.service)"}
    E -- sim --> F[Responde com dado real do banco]
    E -- não --> G["parser.service: extrai tipo, valor,\ncategoria, data"]
    G --> H{Faltou algum campo?}
    H -- sim --> I[Pergunta o campo faltante]
    I --> B
    H -- não --> J[Mostra prévia e pede confirmação]
    J --> B
    B -- "sim" --> K["transaction.service.create"]
    K --> L["transaction.repository (Prisma)"]
    L --> M[(PostgreSQL / Neon)]
    M --> N[Dashboard e Movimentações atualizados]
```

## Diagrama de arquitetura (camadas)

```mermaid
flowchart LR
    View["View\n(app/*, components/*)"] --> Controller["Controller\n(controllers/*, Route Handlers)"]
    Controller --> Service["Service\n(services/*: parser, financial, query, transaction)"]
    Service --> Repository["Repository\n(repositories/*)"]
    Repository --> Prisma["Prisma Client\n(@prisma/adapter-pg)"]
    Prisma --> Neon[(Neon PostgreSQL)]
```
