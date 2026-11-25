# Instruções para agentes

## Objetivo

Preserve o Calendário Invest como um aplicativo Flask simples para planejar
e acompanhar depósitos sequenciais associados a uma meta financeira.

## Agentes por área

Consulte [docs/AGENTES.md](docs/AGENTES.md) para escolher o papel, delimitar o
escopo e verificar a entrega. Quando o usuário pedir delegação, envie ao
agente as instruções do papel e os arquivos sob sua responsabilidade.

## Tecnologias e arquitetura

- Use Python e Flask no backend.
- Mantenha o frontend em HTML, CSS e JavaScript sem framework.
- Use PostgreSQL Neon em produção e preserve `depositos.json` como fallback
  local. Use dados fictícios nos arquivos versionados.
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

- Para cada alteração solicitada, gere uma captura que mostre o resultado.
  Para mudanças visuais, capture a tela atualizada. Para mudanças internas,
  capture a verificação relevante, como a saída dos testes ou do CI.
  Use dados fictícios e exclua credenciais, códigos de pagamento reais e
  dados pessoais do enquadramento. Indique o caminho da captura na entrega.

1. Execute os testes e as verificações de sintaxe.
2. Confira `git diff --check`.
3. Revise `git status --short` para evitar arquivos gerados e segredos.
4. Confirme que os links e as imagens do README existem.
5. Encerre qualquer servidor local usado na validação.

