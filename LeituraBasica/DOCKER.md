limpeza:
# Ao terminar de trabalhar em um projeto:
docker compose down

# Limpeza semanal:
docker system prune -f


# ✅ Mini Tutorial: Rodando Projeto Flask no Docker

## **1. Criar o requirements.txt**

Esse arquivo lista as libs necessárias para o projeto.

### Criar automaticamente:

```sh
pip freeze > requirements.txt
```

### Observação importante:

Esse comando captura **todas** as libs do seu ambiente.
Se vier muita coisa desnecessária, limpe o arquivo e deixe apenas:

```
flask
```

---

## **2. Criar/ajustar o Dockerfile**

Esse arquivo diz ao Docker como montar sua aplicação.

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

---

## **3. Criar/ajustar o docker-compose.yml**

Ele controla como o container vai rodar.

```yaml
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

## **4. Construir a imagem Docker**

```sh
docker compose build
```

### Se der erro relacionado a libs:

* Dependência com nome errado no requirements
* Bibliotecas do Windows (ex: cefpython)
* Limpe seu `requirements.txt` e deixe apenas as libs usadas pelo projeto

---

## **5. Subir o container**

```sh
docker compose up -d
```

Acesse:

```
http://localhost:5000
```

---

## **6. Ver logs do container (para ver erros)**

```sh
docker logs patrimonioProjecao -f
```

---

## **7. Reiniciar após alterações**

```sh
docker compose down
docker compose up -d --build
```

---

## **8. Fechar o Docker para liberar memória**

### Parar o container:

```sh
docker compose down
```

### Verificar se ainda tem algo aberto:

```sh
docker ps
```

### Fechar o Docker Desktop (Windows)

Quit Docker Desktop.

---


