git checkout --orphan nova-branch-vazia
git rm -rf .
# agora adicione os arquivos que quiser
touch README.md
git add .
git commit -m "Primeiro commit em branch vazia"
