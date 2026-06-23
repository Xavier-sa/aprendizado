git reset --hard
git clean -fd


git reset --hard: remove todas as mudanças em arquivos já rastreados (modificados).

git clean -fd: remove arquivos não rastreados (novos arquivos que ainda não foram adicionados com git add).

⚠️ Cuidado: Isso apaga todas as mudanças locais que ainda não foram comitadas. Se tiver algo importante, salve antes.