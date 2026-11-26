"""Confere a origem dos links externos e as referências das aulas."""

import re
from pathlib import Path
from urllib.parse import urlsplit


RAIZ = Path(__file__).resolve().parent
DOMINIOS = {
    "concurso.fapec.org",
    "portal.concurso.fundacaofapec.org.br",
    "boletimoficial.ufms.br",
    "portal.mec.gov.br",
    "site.seduc.se.gov.br",
    "www.planalto.gov.br",
}
LINK = re.compile(r"https?://[^\s<>\])]+", re.IGNORECASE)


def fonte_aprovada(link):
    try:
        url = urlsplit(link)
        return (
            url.scheme == "https"
            and url.netloc.lower() in DOMINIOS
            and bool(url.path.strip("/"))
        )
    except ValueError:
        return False


def validar(raiz):
    erros = []
    for arquivo in sorted(raiz.rglob("*.md")):
        texto = arquivo.read_text(encoding="utf-8")
        relativo = arquivo.relative_to(raiz)
        for link in LINK.findall(texto):
            if not fonte_aprovada(link):
                erros.append(f"{relativo}: fonte não aprovada: {link}")
        if relativo.parts[0] == "portugues" and arquivo.name != "README.md":
            fontes = re.search(r"^## Fontes\s*$([\s\S]*?)(?=^## |\Z)", texto, re.MULTILINE)
            referencias = LINK.findall(fontes[1]) if fontes else []
            if not any(map(fonte_aprovada, referencias)):
                erros.append(f"{relativo}: inclua uma referência aprovada na seção Fontes.")
    return erros


if __name__ == "__main__":
    problemas = validar(RAIZ)
    if problemas:
        print("\n".join(problemas))
        raise SystemExit(1)
    print("Referências de estudo validadas.")
