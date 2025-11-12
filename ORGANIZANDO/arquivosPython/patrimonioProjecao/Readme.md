## ✅ Executando o projeto localmente (sem Docker)

### 1. Instalar dependências

Gere um arquivo `requirements.txt` limpo com as bibliotecas necessárias.

```sh
pip freeze > requirements.txt
```

**Atenção:** Esse comando pega **todas** as bibliotecas instaladas no seu ambiente. Se estiver poluído, edite o arquivo e deixe apenas:

```
flask
```

### 2. Executar o servidor Flask

```sh
python app.py
```

A aplicação ficará disponível em:

```
http://localhost:5000
```

---

## ✅ Executando com Docker

### 1. Construir a imagem Docker

```sh
docker compose build
```

**Possíveis erros e correções:**

* **Erro:** `No matching distribution found for X`

  * Causa: Dependência inválida no `requirements.txt`.
  * Solução: Limpar o arquivo deixando apenas libs usadas no projeto (ex.: `flask`).

* **Erro:** "version is obsolete" no compose

  * Causa: Campo `version:` não é mais necessário.
  * Solução: Pode remover, mas não impede o funcionamento.

### 2. Subir o container

```sh
docker compose up -d
```

O servidor será iniciado e ficará disponível em:

```
http://localhost:5000
```

### 3. Ver logs do container (útil para depurar erros)

```sh
docker logs patrimonioProjecao -f
```

### 4. Reiniciar após alterações no código

```sh
docker compose down

docker compose up -d --build
```

---

## ✅ Arquivos Docker utilizados

### **Dockerfile**

```
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

### **docker-compose.yml**

```
services:
  rota-app:
    build: .
    container_name: patrimonioProjecao
    ports:
      - "5000:5000"
    stdin_open: true
    tty: true
    command: ["python", "app.py"]
    restart: unless-stopped
    volumes:
      - .:/app
```

---


