# 04 — Redes e Servidores

Noções básicas de rede
- `ip a` / `ifconfig` — ver interfaces e IPs
- `ping`, `traceroute` — testar conectividade
- `ss` / `netstat` — portas e conexões

Acesso remoto
- `ssh user@host` — conectar-se a outro sistema
- `scp` / `rsync` — copiar arquivos entre máquinas

Servidores simples
- Servir arquivos rapidamente: `python3 -m http.server 8000`
- `nginx` e `apache` — servidores web populares em Linux
- Containers (Docker) e virtualização são amplamente utilizados em produção

Por que Linux domina servidores
- Estabilidade, performance e flexibilidade
- Amplo suporte a ferramentas de rede, automação e conteinerização
- Ecossistema de servidores em nuvem e distribuições otimizadas para servidores

Exercício prático
- Inicie um servidor simples: `python3 -m http.server 8000` e acesse `http://localhost:8000`.
