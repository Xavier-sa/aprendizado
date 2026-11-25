# Montagem do tutorial do WX Meta

Use Python 3.11+, FFmpeg 7+ com `libx264` e FFprobe. Deixe os executáveis
`ffmpeg` e `ffprobe` no PATH. Execute os comandos na pasta deste README.

1. Liste e valide os clipes disponíveis com `python3 unir_videos.py --listar`.
2. Passe os nomes na ordem desejada, entre aspas se necessário.

   ```bash
   python3 unir_videos.py --ordem "Abertura.mp4" "Demonstração.mp4" "Fechamento.mp4"
   ```

3. Confira `output/wx-meta-tutorial.mp4` e `reports/validacao.json`. O
   relatório registra os fluxos, hashes, durações, tamanho e validações.

Passe outra pasta como primeiro argumento para reutilizar o script com
outros vídeos. Use `--permitir-duplicados` somente após confirmar que cenas
com o mesmo conteúdo devem aparecer na montagem.

O script copia os fluxos quando todos os clipes são compatíveis. Quando
precisa codificar, usa H.264 e AAC em 1080 × 1920 a 30 fps, com margens para
preservar o enquadramento. Ele informa se a duração passa de 30 segundos
e preserva o MP4 e o relatório existentes em novas execuções. Para uma nova
montagem, arquive os resultados anteriores em outra pasta. A busca por cenas
considera apenas os vídeos na pasta de entrada, excluindo o nome do MP4 final.

Execute os testes com `python3 -m unittest -v`.
