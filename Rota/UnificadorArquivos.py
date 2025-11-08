import os

IGNORAR_PASTAS = {
    "__pycache__",
    ".git",
    "node_modules"
}

IGNORAR_EXTENSOES = {
    ".pyc",
    ".pyo",
}

def escolher_pasta():
    """Permite ao usuário digitar ou colar o caminho da pasta."""
    caminho = input("Digite o caminho da pasta que deseja processar: ").strip()
    if not os.path.isdir(caminho):
        print("Caminho inválido. Tente novamente.")
        return escolher_pasta()
    return caminho

def coletar_arquivos(caminho_base):
    """Percorre a pasta e subpastas, ignorando pastas e extensões indesejadas."""
    arquivos = []

    for raiz, pastas, files in os.walk(caminho_base):

        # Filtra pastas proibidas
        pastas[:] = [p for p in pastas if p not in IGNORAR_PASTAS]

        for f in files:
            # Ignorar por extensão
            ext = os.path.splitext(f)[1]
            if ext in IGNORAR_EXTENSOES:
                continue

            arquivos.append(os.path.join(raiz, f))

    return arquivos

def gerar_unico_txt(caminho_base, arquivos):
    """Gera o arquivo final unificado."""
    nome_saida = "projeto_unificado.txt"
    caminho_saida = os.path.join(caminho_base, nome_saida)

    with open(caminho_saida, "w", encoding="utf-8") as saida:
        for arquivo in arquivos:
            rel = os.path.relpath(arquivo, caminho_base)

            saida.write("\n" + "=" * 80 + "\n")
            saida.write(f"ARQUIVO: {rel}\n")
            saida.write("=" * 80 + "\n\n")

            try:
                with open(arquivo, "r", encoding="utf-8", errors="ignore") as a:
                    conteudo = a.read()
                    saida.write(conteudo + "\n")
            except Exception as e:
                saida.write(f"[ERRO AO LER ARQUIVO] {e}\n")

    return caminho_saida

def main():
    print("=== UNIFICADOR DE ARQUIVOS EM .TXT ===\n")

    caminho_base = escolher_pasta()
    print("\nColetando arquivos...")

    arquivos = coletar_arquivos(caminho_base)
    print(f"{len(arquivos)} arquivos válidos encontrados.")

    print("Gerando arquivo único...")
    caminho_final = gerar_unico_txt(caminho_base, arquivos)

    print("\n✅ Arquivo gerado com sucesso!")
    print(f"📄 Caminho do TXT final: {caminho_final}")

if __name__ == "__main__":
    main()
