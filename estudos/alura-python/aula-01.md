tupla valor entre parenteses
## 🔹 1. **Funções Básicas do Python para Dados**

Essas são nativas do Python, úteis mesmo fora do Pandas:

| Função            | O que faz                           |
| ----------------- | ----------------------------------- |
| `print()`         | Exibe algo na tela                  |
| `type()`          | Mostra o tipo do dado               |
| `len()`           | Retorna o tamanho (nº de elementos) |
| `sum()`           | Soma os valores de uma lista        |
| `max()` / `min()` | Valor máximo / mínimo               |
| `sorted()`        | Ordena uma lista                    |
| `range()`         | Gera uma sequência de números       |
| `enumerate()`     | Retorna índice + valor (em loops)   |
| `zip()`           | Junta listas paralelamente          |

---

## 🔹 2. **Principais Comandos do Pandas**

Assumindo que você já tenha importado o pandas como:

```python
import pandas as pd
df = pd.read_csv("arquivo.csv")  # exemplo
```

### 📊 Informações e Estrutura

| Função          | O que faz                             |
| --------------- | ------------------------------------- |
| `df.head(n)`    | Mostra as primeiras `n` linhas        |
| `df.tail(n)`    | Mostra as últimas `n` linhas          |
| `df.shape`      | Retorna `(linhas, colunas)`           |
| `df.info()`     | Detalhes sobre tipos de dados e nulos |
| `df.describe()` | Estatísticas descritivas              |
| `df.columns`    | Nomes das colunas                     |
| `df.index`      | Índices das linhas                    |

### 🔍 Seleção e Filtros

| Comando                   | O que faz                    |
| ------------------------- | ---------------------------- |
| `df['coluna']`            | Seleciona uma coluna         |
| `df[['col1', 'col2']]`    | Seleciona várias colunas     |
| `df.loc[linha, coluna]`   | Seleção por nome (label)     |
| `df.iloc[linha, coluna]`  | Seleção por índice (posição) |
| `df[df['coluna'] > 10]`   | Filtra linhas com condição   |
| `df.query('coluna > 10')` | Filtro com query string      |

### 📈 Estatísticas e Agregações

| Comando                       | O que faz                  |
| ----------------------------- | -------------------------- |
| `df.mean()`                   | Média                      |
| `df.median()`                 | Mediana                    |
| `df.std()`                    | Desvio padrão              |
| `df.sum()`                    | Soma                       |
| `df.value_counts()`           | Contagem de valores únicos |
| `df.groupby('coluna')`        | Agrupa por uma coluna      |
| `df.groupby('coluna').mean()` | Média por grupo            |

### 🧹 Limpeza de Dados

| Comando                                | O que faz                |
| -------------------------------------- | ------------------------ |
| `df.isnull()`                          | Verifica valores nulos   |
| `df.dropna()`                          | Remove linhas com `NaN`  |
| `df.fillna(valor)`                     | Preenche nulos com valor |
| `df.drop('coluna', axis=1)`            | Remove coluna            |
| `df.rename(columns={'velho': 'novo'})` | Renomeia colunas         |

### 🔧 Transformações

| Comando                          | O que faz                   |
| -------------------------------- | --------------------------- |
| `df['nova'] = df['a'] + df['b']` | Nova coluna com operação    |
| `df['col'].apply(func)`          | Aplica função personalizada |
| `df.sort_values('coluna')`       | Ordena por coluna           |
| `df.reset_index()`               | Reseta o índice             |

---

## Exemplo prático:

```python
import pandas as pd

# Carrega dados
df = pd.read_csv("exemplo.csv")

# Mostra primeiras linhas
print(df.head())

# Média da coluna "idade"
print(df['idade'].mean())

# Filtra quem tem mais de 30 anos
filtro = df[df['idade'] > 30]

# Agrupa por "sexo" e calcula média da idade
print(df.groupby('sexo')['idade'].mean())


