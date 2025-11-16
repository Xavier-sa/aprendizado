
# API- TERMOS TI

Este projeto é uma **API** (um serviço que envia informações pela internet) que permite **consultar termos de tecnologia** e suas definições de maneira rápida e fácil.

Ela funciona como um **dicionário de palavras usadas na área de TI**, só que acessado pela web.

---

## 🧠 O que esta API faz?

Ela permite que qualquer pessoa:

* 📖 Veja **todos os termos** salvos no glossário
* 🔍 Busque a **definição de uma palavra específica**
* 📝 Procure termos que contenham um trecho, como "front" ou "data"

É simples e feita especialmente para quem está começando a aprender TI.


## 📚 Rotas disponíveis (endereços da API)

### ▶ **1. Página inicial**

Mostra uma mensagem de boas-vindas e os links disponíveis.

```
GET /
```

---

### ▶ **2. Listar todos os termos**

Retorna todas as palavras e definições do glossário.

```
GET /termos
```

---

### ▶ **3. Buscar definição de uma palavra**

Exemplo: buscar o termo **frontend**

```
GET /buscar/frontend
```

Retorno:

```json
{
  "frontend": "Parte visual de um site ou aplicativo, onde o usuário interage."
}
```

---

### ▶ **4. Buscar por trecho**

Permite procurar termos que contenham um pedacinho de texto.

Exemplo: procurar por **"net"**

```
GET /procurar?texto=net
```

Retorno:

```json
{
  "internet": "Rede mundial de computadores.",
  "intranet": "Rede interna usada dentro de empresas."
}
```

---

## 📦 Estrutura do projeto

```
📁 projeto/
│── main.py          → Código da API
│── termos.json      → Arquivo com os termos e definições
│── README.md        → Este arquivo
```

---

## 🧑‍💻 Para que serve isso?

Esta API pode ser usada para:

* Estudos
* Projetos simples
* Criar aplicativos ou sites que busquem termos de TI
* Treinar lógica, Python e FastAPI

É ideal para iniciantes que querem aprender como APIs funcionam.

---


