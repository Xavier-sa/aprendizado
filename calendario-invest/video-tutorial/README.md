# Montagem do tutorial do WX Meta

Use Python 3.11+, FFmpeg 7+ com `libx264` e FFprobe. Deixe os executáveis
`ffmpeg` e `ffprobe` no PATH. Execute os comandos na pasta deste README.

1. Liste e valide os clipes disponíveis com `python3 unir_videos.py --listar`.
2. Para os sete clipes do WX Meta, execute `python unir_videos.py`. O script
   reconhece os identificadores dos arquivos e aplica a ordem documentada
   abaixo. Para outros clipes, passe os nomes na ordem desejada.

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

## Sequência do WX Meta

| Cena | Conteúdo | Duração do clipe |
| --- | --- | ---: |
| 1 | Apresentador abre o tutorial | 5,035 s |
| 2 | Apresentador introduz a proposta | 6,037 s |
| 3 | Criação de conta | 7,040 s |
| 4 | Cadastro de banco | 7,040 s |
| 5 | Criação de meta | 8,043 s |
| 6 | Meta convertida em passos na grade | 9,024 s |
| 7 | Encerramento do apresentador | 10,027 s |

A ordem segue o relatório anterior e foi conferida visualmente com quadros
extraídos dos sete clipes. Os originais são 720 × 1280 a 24 fps. A exportação
solicitada exige recodificação para 1080 × 1920 a 30 fps. A montagem mantém o
enquadramento e a velocidade originais, sem transições ou trilha adicional.
Os arquivos de montagens anteriores permanecem no local. O relatório novo
registra o resultado e a duração efetiva.

## Resultado desta execução

O arquivo exportado tem 52,245333 segundos e 34.885.385 bytes. O FFprobe
confirmou MP4 vertical 9:16, 1080 × 1920, 30 fps, H.264 em yuv420p e
áudio AAC estéreo. O Faststart foi verificado pela posição do átomo `moov`.
O FFmpeg decodificou todos os clipes e o resultado completo sem erros.
Os sete SHA-256 são distintos e permaneceram iguais após a montagem.
A diferença entre a duração exportada e a soma das cenas foi de 1 µs.
