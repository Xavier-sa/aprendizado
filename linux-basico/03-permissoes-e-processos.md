# 03 — Permissões, Usuários e Processos

Permissões de arquivos
- `ls -l` mostra permissões
- `chmod` altera permissões (ex.: `chmod u+x arquivo`)
- `chown` altera dono/grupo

Usuários e grupos
- `whoami`, `id`, `users`
- `adduser`, `usermod` (requer sudo/root)

Processos
- `ps aux` — lista processos
- `top` / `htop` — monitor interativo
- `kill <PID>` — termina processo
- `&` — roda processo em background

Serviços
- `systemctl status|start|stop|restart <serviço>` — gerencia serviços em sistemas com systemd

Boas práticas
- Use `sudo` com parcimônia.
- Não execute comandos desconhecidos como root.

Exercício
- Rode `sleep 60 &` e verifique com `ps` e `jobs`.
