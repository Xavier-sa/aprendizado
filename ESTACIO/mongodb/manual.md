Claro! Aqui está um modelo de **`README.md`** com os comandos básicos do MongoDB — ideal para consulta rápida no terminal ou para manter em seus projetos.

---

````markdown
# 📘 Comandos Básicos MongoDB (via mongosh)

Este arquivo é um guia rápido com comandos MongoDB essenciais para uso via `mongosh`.

---

## 🔄 Conectar ao MongoDB

```bash
mongosh
````

Conectar a um banco de dados específico:

```js
use Lojaweb
```

---

## 🧱 Criar Banco e Coleção

MongoDB cria automaticamente ao inserir dados:

```js
use Lojaweb
db.createCollection("Produto")
```

---

## 📥 Inserir Documentos

### Inserir um único documento:

```js
db.Produto.insertOne({
  nome: "Notebook Dell",
  preco: 3500,
  estoque: 10,
  categoria: "Informática"
})
```

### Inserir múltiplos documentos:

```js
db.Produto.insertMany([
  {
    nome: "Smartphone Samsung",
    preco: 2200,
    estoque: 25,
    categoria: "Telefonia"
  },
  {
    nome: "Impressora HP",
    preco: 800,
    estoque: 5,
    categoria: "Periféricos"
  }
])
```

---

## 🔍 Consultar Dados

### Buscar todos os documentos:

```js
db.Produto.find()
```

### Formatar saída:

```js
db.Produto.find().pretty()
```

### Buscar com filtro:

```js
db.Produto.find({ categoria: "Informática" })
```

### Condições com operadores:

```js
db.Produto.find({ preco: { $gt: 1000 } })
```

---

## 🛠️ Atualizar Documentos

### Atualizar um campo:

```js
db.Produto.updateOne(
  { nome: "Impressora HP" },
  { $set: { preco: 850 } }
)
```

### Atualizar vários:

```js
db.Produto.updateMany(
  { categoria: "Telefonia" },
  { $inc: { estoque: 5 } }
)
```

---

## 🗑️ Remover Documentos

### Remover um:

```js
db.Produto.deleteOne({ nome: "Impressora HP" })
```

### Remover vários:

```js
db.Produto.deleteMany({ categoria: "Telefonia" })
```

---

## 📋 Listar Bancos e Coleções

### Mostrar bancos:

```js
show dbs
```

### Mostrar coleções no banco atual:

```js
show collections
```

---

## 🧪 Ver banco atual

```js
db
```

---

## 🚪 Sair do shell

```bash
exit
```

---

> 💡 **Dica**: MongoDB é "schema-less", ou seja, você pode inserir documentos com estruturas diferentes em uma mesma coleção, mas é boa prática manter uma estrutura consistente.

```

---

Se quiser, posso te gerar esse README já formatado em arquivo `.md` para baixar ou compartilhar. Deseja isso?
```
