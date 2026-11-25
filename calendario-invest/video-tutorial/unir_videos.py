import argparse
import hashlib
import json
import subprocess
import tempfile
from fractions import Fraction
from pathlib import Path


def executar(*args, cwd=None):
    processo = subprocess.run(args, cwd=cwd, capture_output=True, text=True)
    if processo.returncode:
        raise ValueError(f"{args[0]} falhou: {processo.stderr.strip()}")
    return processo.stdout


def descobrir(pasta):
    return sorted(p for p in pasta.iterdir()
                  if p.is_file() and p.suffix.lower() in {".mp4", ".mov", ".mkv", ".webm"}
                  and p.name != "wx-meta-tutorial.mp4")


def ordenar(arquivos, ordem):
    if not ordem:
        raise ValueError("Informe a sequência com --ordem.")
    por_nome = {p.name: p for p in arquivos}
    if len(ordem) != len(set(ordem)):
        raise ValueError("A ordem repete um arquivo.")
    for nome in ordem:
        if nome not in por_nome:
            raise ValueError(f"Arquivo ausente: {nome}")
    return [por_nome[nome] for nome in ordem]


def verificar_hashes(arquivos, permitir_duplicados=False):
    vistos = {}
    hashes = {}
    for arquivo in arquivos:
        with arquivo.open("rb") as fonte:
            digest = hashlib.file_digest(fonte, "sha256").hexdigest()
        if digest in vistos and not permitir_duplicados:
            raise ValueError(f"Arquivos duplicados: {vistos[digest]} e {arquivo.name}")
        vistos[digest] = arquivo.name
        hashes[arquivo.name] = digest
    return hashes


def analisar(arquivo):
    dados = json.loads(executar("ffprobe", "-v", "error", "-show_streams", "-show_data",
                                "-show_format", "-of", "json", str(arquivo)))
    fluxos = dados["streams"]
    video = next((s for s in fluxos if s["codec_type"] == "video"
                  and not s.get("disposition", {}).get("attached_pic")), None)
    audio = next((s for s in fluxos if s["codec_type"] == "audio"), None)
    duracao = float(dados["format"]["duration"])
    if video is None or not duracao > 0:
        raise ValueError(f"Vídeo inválido: {arquivo.name}")
    return {"arquivo": arquivo.name, "duracao": duracao, "video": video, "audio": audio}


def decodificar(arquivo):
    executar("ffmpeg", "-nostdin", "-v", "error", "-xerror", "-i", str(arquivo),
             "-map", "0:v:0", "-map", "0:a:0?", "-f", "null", "-")


def formato_final(cena):
    v, a = cena["video"], cena["audio"]
    return (v["codec_name"] == "h264" and (v["width"], v["height"]) == (1080, 1920)
            and Fraction(v["avg_frame_rate"]) == Fraction(v["r_frame_rate"]) == 30
            and v.get("sample_aspect_ratio") in {"1:1", None}
            and not any(s.get("rotation") for s in v.get("side_data_list", []))
            and v.get("pix_fmt") == "yuv420p" and a and a["codec_name"] == "aac")


def assinatura(cena):
    v, a = cena["video"], cena["audio"]
    return tuple(v.get(k) for k in ("profile", "level", "time_base", "color_space",
                                     "color_transfer", "color_primaries", "field_order",
                                     "extradata")) + tuple(
        a.get(k) for k in ("profile", "sample_rate", "channels", "channel_layout",
                           "time_base", "extradata"))


def montar(arquivos, cenas, temporaria):
    destino = temporaria / "montagem.mp4"
    argumentos = ["ffmpeg", "-nostdin", "-v", "error", "-xerror", "-n"]
    if all(formato_final(c) for c in cenas) and len({assinatura(c) for c in cenas}) == 1:
        for i, arquivo in enumerate(arquivos):
            (temporaria / f"cena-{i}.mp4").symlink_to(arquivo)
        (temporaria / "ordem.txt").write_text(
            "".join(f"file cena-{i}.mp4\n" for i in range(len(cenas))), encoding="utf-8")
        executar(*argumentos, "-f", "concat", "-safe", "1", "-i", "ordem.txt",
                 "-map", "0:v:0", "-map", "0:a:0", "-c", "copy", "-movflags",
                 "+faststart", str(destino), cwd=temporaria)
        return destino, "cópia dos fluxos"

    filtros, entradas = [], []
    for i, (arquivo, cena) in enumerate(zip(arquivos, cenas)):
        argumentos.extend(("-i", str(arquivo)))
        indice_video = cena["video"]["index"]
        filtros.append(
            f"[{i}:{indice_video}]setpts=PTS-STARTPTS,"
            "scale='trunc(min(1080,1920*dar)/2)*2':"
            "'trunc(min(1920,1080/dar)/2)*2',"
            "pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p"
            f"[v{i}]")
        if cena["audio"]:
            indice_audio = cena["audio"]["index"]
            filtros.append(f"[{i}:{indice_audio}]asetpts=PTS-STARTPTS,"
                           f"aresample=48000,aformat=channel_layouts=stereo[a{i}]")
        else:
            filtros.append(f"anullsrc=r=48000:cl=stereo:d={cena['duracao']}[a{i}]")
        entradas.append(f"[v{i}][a{i}]")
    filtros.append("".join(entradas) + f"concat=n={len(cenas)}:v=1:a=1[v][a]")
    executar(*argumentos, "-filter_complex_threads", "2", "-filter_complex",
             ";".join(filtros), "-map", "[v]", "-map", "[a]", "-c:v", "libx264",
             "-preset", "medium", "-crf", "17", "-threads", "4", "-r", "30",
             "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", str(destino))
    return destino, "normalização em uma única codificação"


def faststart(arquivo):
    with arquivo.open("rb") as fonte:
        while cabecalho := fonte.read(8):
            if len(cabecalho) != 8:
                return False
            tamanho, tipo = int.from_bytes(cabecalho[:4], "big"), cabecalho[4:]
            if tipo in {b"moov", b"mdat"}:
                return tipo == b"moov"
            if tamanho < 8:
                return False
            fonte.seek(tamanho - 8, 1)
    return False


def main(argv=None):
    parser = argparse.ArgumentParser(description="Monta um MP4 vertical a partir de cenas.")
    parser.add_argument("pasta", nargs="?", type=Path, default=Path(__file__).resolve().parent)
    parser.add_argument("--listar", action="store_true")
    parser.add_argument("--ordem", nargs="+", metavar="ARQUIVO")
    parser.add_argument("--permitir-duplicados", action="store_true")
    args = parser.parse_args(argv)
    pasta = args.pasta.resolve()
    saida = pasta / "output" / "wx-meta-tutorial.mp4"
    caminho_relatorio = pasta / "reports" / "validacao.json"
    relatorio = {"status": "erro"}
    gravar_relatorio = not args.listar
    try:
        if gravar_relatorio:
            for destino in (saida, caminho_relatorio):
                if destino.exists() or destino.is_symlink():
                    gravar_relatorio = False
                    raise ValueError(f"Arquivo já existe: {destino}")
        arquivos = descobrir(pasta)
        relatorio["encontrados"] = len(arquivos)
        selecionados = arquivos if args.listar else ordenar(arquivos, args.ordem)
        if not selecionados:
            raise ValueError("Nenhum vídeo encontrado.")
        if set(selecionados) != set(arquivos):
            raise ValueError("Informe todos os vídeos encontrados na sequência.")
        hashes = verificar_hashes(selecionados, args.permitir_duplicados)
        cenas = [analisar(p) for p in selecionados]
        for p, cena in zip(selecionados, cenas):
            decodificar(p)
            cena["sha256"] = hashes[p.name]
        relatorio["cenas"] = cenas
        if not args.listar:
            with tempfile.TemporaryDirectory(dir=pasta) as diretorio:
                temporario, modo = montar(selecionados, cenas, Path(diretorio))
                final = analisar(temporario)
                delta = abs(final["duracao"] - sum(c["duracao"] for c in cenas))
                if not formato_final(final) or not faststart(temporario) or delta > 0.15 * len(cenas):
                    raise ValueError("O vídeo final diverge do formato ou duração esperados.")
                decodificar(temporario)
                if verificar_hashes(selecionados, args.permitir_duplicados) != hashes:
                    raise ValueError("Um vídeo original mudou durante a montagem.")
                saida.parent.mkdir(exist_ok=True)
                saida.hardlink_to(temporario)
                final["arquivo"] = saida.name
                relatorio.update(final=final, tamanho_bytes=saida.stat().st_size,
                                 caminho=str(saida), modo=modo, faststart=True,
                                 originais_inalterados=True, decodificacao_ok=True,
                                 diferenca_duracao_segundos=delta,
                                 excede_30_segundos=final["duracao"] > 30)
        relatorio["status"] = "ok"
    except (OSError, ValueError, KeyError) as erro:
        relatorio["erro"] = str(erro)
    conteudo = json.dumps(relatorio, ensure_ascii=False, indent=2)
    if gravar_relatorio and pasta.is_dir():
        try:
            caminho_relatorio.parent.mkdir(exist_ok=True)
            with caminho_relatorio.open("x", encoding="utf-8") as destino:
                destino.write(conteudo + "\n")
        except OSError as erro:
            print(f"Falha ao gravar relatório: {erro}")
            return 1
    print(conteudo)
    return int(relatorio["status"] != "ok")


if __name__ == "__main__":
    raise SystemExit(main())
