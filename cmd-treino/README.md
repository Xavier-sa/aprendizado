Sensei recebeu o comando 🥋
# 🖥️ **CMD**

## 🎯 Objetivo

* Entender **como o CMD pensa**
* Navegar pelo sistema
* Criar, ler e apagar arquivos
* Executar tarefas básicas como um profissional

---

## 🧠 CONCEITO FUNDAMENTAL (ANTES DE COMANDOS)

> **CMD = conversar com o sistema operacional por texto**

Você **sempre está em um lugar** (diretório).
Se errar o lugar → o comando falha.

---

## 1️⃣ ABRINDO E PREPARANDO O CMD

### Abrir

```
Windows + R
cmd
Enter
```

### Tela confortável

```
Alt + Enter
```

ou maximize a janela.

---

## 2️⃣ ONDE EU ESTOU? (REGRA DE OURO)

### Ver diretório atual

```cmd
cd
```

### Listar arquivos e pastas

```cmd
dir
```

👉 **Nunca rode comandos sem saber isso.**

---

## 3️⃣ NAVEGAÇÃO (ANDAR PELO SISTEMA)

### Entrar numa pasta

```cmd
cd nome_da_pasta
```

### Voltar uma pasta

```cmd
cd ..
```

### Ir direto para o C:

```cmd
cd \
```

### Trocar de disco (ex: D:)

```cmd
D:
```

---

## 4️⃣ CRIANDO SEU AMBIENTE DE TREINO

```cmd
mkdir cmd_treino
cd cmd_treino
```

Você criou e entrou numa pasta **controlada**.
Aqui você pode errar sem medo.

---

## 5️⃣ TRABALHANDO COM ARQUIVOS

### Criar arquivo de texto

```cmd
echo Aprendendo CMD > aula1.txt
```

### Ler o arquivo

```cmd
type aula1.txt
```

### Adicionar texto (sem apagar)

```cmd
echo Linha nova >> aula1.txt
```

---

## 6️⃣ LIMPEZA E CONTROLE

### Limpar a tela

```cmd
cls
```

### Apagar arquivo

```cmd
del aula1.txt
```

⚠️ **Não pede confirmação. Cuidado.**

---

## 7️⃣ APAGAR PASTAS (COM CONSCIÊNCIA)

### Pasta vazia

```cmd
rmdir nome_da_pasta
```

### Pasta com arquivos

```cmd
rmdir /s nome_da_pasta
```

👉 `/s` = tudo dentro
👉 **Nunca use fora da pasta de treino**

---

## 8️⃣ COMANDOS ÚTEIS DE SISTEMA (BASE)

```cmd
ipconfig
```

Rede

```cmd
tasklist
```

Processos

```cmd
ping google.com
```

Teste de conexão

---

## 9️⃣ AJUDA (COMO UM DEV FAZ)

Qualquer comando:

```cmd
comando /?
```

Exemplo:

```cmd
dir /?
```

---

## 🧪 EXERCÍCIO

```cmd
mkdir pratica
cd pratica
echo CMD é poder > teste.txt
type teste.txt
cd ..
dir
```

---


