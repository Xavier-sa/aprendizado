#!/bin/bash
# scripts.sh — exemplos seguros para praticar

echo "Exemplo: informações do sistema"
uname -a

echo "\nDiretório atual e conteúdo"
pwd
ls -la

# Criar pasta de teste e um arquivo
mkdir -p ~/teste-linux
echo "Olá, Linux" > ~/teste-linux/ola.txt
cat ~/teste-linux/ola.txt

# Exemplo de rede (não modifica nada)
echo "\nPing para 8.8.8.8 (apenas 1 pacote)"
ping -c 1 8.8.8.8

# Iniciar servidor HTTP simples (comentado para evitar execução acidental)
# python3 -m http.server 8000

echo "\nPronto. Apague o diretório de teste se quiser: rm -r ~/teste-linux"