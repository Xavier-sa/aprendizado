# Instruções para agentes

## Objetivo

Preserve o Calendário Invest como um aplicativo Flask simples para planejar
e acompanhar depósitos sequenciais associados a uma meta financeira.

## Tecnologias e arquitetura

- Use Python e Flask no backend.
- Mantenha o frontend em HTML, CSS e JavaScript sem framework.
- Preserve `depositos.json` como armazenamento local enquanto não houver uma
  migração explicitamente solicitada.
- Mantenha as regras de negócio e as rotas em `app.py`, a marcação em
  `templates/` e os recursos do navegador em `static/`.
- Consulte `docs/ARQUITETURA.md` antes de alterar o formato dos dados ou a
  fórmula da quantidade de depósitos.

## Padrões de código

- Escreva nomes e mensagens de interface em português.
- Use funções pequenas e mantenha a validação também no backend.
- Preserve a escrita atômica de `depositos.json`.
- Não duplique no JavaScript valores que a API pode fornecer.
- Mantenha a interface responsiva e navegável por teclado.

## Comandos

Instale as dependências:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Execute o aplicativo:

```bash
.venv/bin/python app.py
```

Execute a validação:

```bash
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python -m py_compile app.py
node --check static/app.js
```

## Regras para alterações

- Não versione `.venv/`, caches, logs ou arquivos temporários.
- Não apague `depositos.json` nem registros reais durante testes.
- Use um arquivo temporário nos testes que exercitem persistência.
- Não adicione credenciais, tokens, chaves ou dados bancários reais.
- Atualize o README e a documentação quando o comportamento mudar.
- Não altere outros projetos do repositório `aprendizado`.

## Validação antes do commit

1. Execute os testes e as verificações de sintaxe.
2. Confira `git diff --check`.
3. Revise `git status --short` para evitar arquivos gerados e segredos.
4. Confirme que os links e as imagens do README existem.
5. Encerre qualquer servidor local usado na validação.

