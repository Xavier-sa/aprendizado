# 🚛 Sistema de Gerenciamento de Caminhões

## 📦 COMO USAR (SIMPLIFICADO)

### 🐳 **OPÇÃO 1 — Rodar com Docker (RECOMENDADO)**

*Não precisa instalar Python nem dependências.*

1. Instale o **Docker Desktop**
2. Abra o terminal dentro da pasta `Rota`
3. Execute:

   ```bash
   docker compose build
   docker compose run rota-app
   ```
4. O sistema abrirá em modo interativo no terminal ✅

> **Importante:**
> `docker compose up` não funciona com programas que usam `input()`
> Use sempre `docker compose run`.

---

### 🐍 **OPÇÃO 2 — Rodar com Python diretamente**

Se preferir sem Docker:

1. Instale **Python 3.10+**
2. Abra o terminal na pasta `Rota`
3. Execute:

   ```bash
   cd app
   python main.py
   ```
4. O sistema vai abrir normalmente ✅

---

## 🎮 O QUE O SISTEMA FAZ

Gerencia caminhões, motoristas e viagens:

* ✅ Listar caminhões disponíveis
* ✅ Listar motoristas disponíveis
* ✅ Registrar saída de caminhão
* ✅ Registrar retorno
* ✅ Listar viagens ativas
* ✅ Consultar todo o cadastro (caminhões e motoristas)

---

## 📁 ARQUIVOS IMPORTANTES

```
Rota/
├── 🐳 Dockerfile            # Receita da imagem Docker
├── 🎯 docker-compose.yml    # Configuração do serviço
├── 📋 requirements.txt      # Dependências do Python
└── 📂 app/                  # Código do sistema
```

---

## 🚀 COMANDOS ÚTEIS

### **Docker**

```bash
docker compose build         # Constrói a imagem
docker compose run rota-app # Roda o sistema (modo interativo)
docker compose down          # Para e remove containers
```

### **Python direto**

```bash
cd app
python main.py
```

---

## ❓ SE DER ERRO

* **Docker não inicia?** → Reinicie o Docker Desktop
* **Input não funciona?** → Use `docker compose run`, não `up`
* **Python dizendo "not found"?** → Instale Python 3.10+
* **Arquivo não encontrado?** → Abra o terminal na pasta `Rota`

---

## 📞 PRECISANDO DE AJUDA?

O sistema é simples e guiado por menus.
Qualquer coisa, me chama aqui.
🔗 Conecte-se Comigo

📎 LinkedIn:
https://www.linkedin.com/in/wellington-xavier-90a004300

**Bom gerenciamento e bons estudos, Wellington!** 🚛💨

---
