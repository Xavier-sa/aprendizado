#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse
from pathlib import Path

# Para imagens
from PIL import Image

# Para texto
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

# Tenta importar docx2pdf (só em Windows/Mac com Word instalado)
try:
    from docx2pdf import convert as docx2pdf_convert
    DOCX2PDF_AVAILABLE = True
except ImportError:
    DOCX2PDF_AVAILABLE = False

def convert_image_to_pdf(input_path: Path, output_path: Path):
    """
    Converte uma imagem em PDF. Se várias imagens, pode-se empilhar ou criar PDFs separados.
    Aqui geramos um PDF por imagem.
    """
    try:
        img = Image.open(input_path)
        # Para formatos RGBA, converter para RGB
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Salva como PDF
        img.save(output_path, "PDF", resolution=100.0)
        print(f"[OK] Imagem convertida: {input_path} → {output_path}")
    except Exception as e:
        print(f"[ERRO] Não conseguiu converter imagem {input_path}: {e}")

def convert_text_to_pdf(input_path: Path, output_path: Path):
    """
    Lê todo o texto e o escreve em um PDF básico via ReportLab.
    """
    try:
        # Lê linhas
        with input_path.open("r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
    except Exception as e:
        print(f"[ERRO] Não conseguiu ler texto {input_path}: {e}")
        return

    try:
        c = canvas.Canvas(str(output_path), pagesize=A4)
        width, height = A4
        margin = 40
        y = height - margin
        # Configurações básicas de fonte/tamanho
        c.setFont("Helvetica", 10)
        for line in lines:
            # Se a linha for longa, quebramos em pedaços que caibam na largura
            text = line.rstrip("\n")
            # você pode melhorar quebra de linha aqui
            # Simplificação: se for muito longa, corta
            max_chars = 90
            while len(text) > 0:
                part = text[:max_chars]
                text = text[max_chars:]
                c.drawString(margin, y, part)
                y -= 12
                if y < margin:
                    c.showPage()
                    y = height - margin
                    c.setFont("Helvetica", 10)
            # pula linha
        c.save()
        print(f"[OK] Texto convertido: {input_path} → {output_path}")
    except Exception as e:
        print(f"[ERRO] Falha ao gerar PDF de texto {input_path}: {e}")

def convert_via_libreoffice(input_path: Path, output_dir: Path):
    """
    Chama o LibreOffice em modo headless para converter para PDF.
    Retorna o caminho do PDF gerado ou None em caso de erro.
    """
    try:
        # comando: soffice --headless --convert-to pdf --outdir output_dir input_path
        cmd = [
            "soffice",
            "--headless",
            "--convert-to", "pdf",
            "--outdir", str(output_dir),
            str(input_path)
        ]
        # em alguns sistemas: "libreoffice" em vez de "soffice"
        # Se necessario, ajuste para caminho completo do executável.
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if proc.returncode == 0:
            # normalmente o PDF fica em output_dir com mesmo nome mas extensão .pdf
            pdf_path = output_dir / (input_path.stem + ".pdf")
            if pdf_path.exists():
                print(f"[OK] Convertido via LibreOffice: {input_path} → {pdf_path}")
                return pdf_path
            else:
                print(f"[AVISO] LibreOffice retornou sucesso mas não encontrou {pdf_path}")
                return None
        else:
            print(f"[ERRO] LibreOffice falhou para {input_path}: {proc.stderr.strip()}")
            return None
    except FileNotFoundError:
        print("[ERRO] LibreOffice não encontrado. Instale e certifique-se que 'soffice' está no PATH.")
        return None
    except Exception as e:
        print(f"[ERRO] Exceção ao chamar LibreOffice: {e}")
        return None

def convert_docx_to_pdf(input_path: Path, output_path: Path, use_libreoffice_if_fail=True):
    """
    Tenta converter DOCX via docx2pdf; se não disponível ou falhar, tenta LibreOffice.
    """
    if DOCX2PDF_AVAILABLE:
        try:
            # docx2pdf_convert aceita pasta ou arquivo
            # se output_path for pasta, o método gera com mesmo nome; aqui passamos arquivo único
            docx2pdf_convert(str(input_path), str(output_path))
            print(f"[OK] DOCX convertido via docx2pdf: {input_path} → {output_path}")
            return True
        except Exception as e:
            print(f"[AVISO] docx2pdf falhou para {input_path}: {e}")
            # cai para LibreOffice
    if use_libreoffice_if_fail:
        result = convert_via_libreoffice(input_path, output_path.parent)
        return result is not None
    return False

def convert_generic(input_path: Path, output_dir: Path):
    """
    Detecta extensão e chama a conversão apropriada.
    Gera um PDF em output_dir com mesmo nome (stem).
    """
    ext = input_path.suffix.lower()
    stem = input_path.stem
    output_path = output_dir / f"{stem}.pdf"

    # se já for PDF, apenas copia ou ignora
    if ext == ".pdf":
        print(f"[SKIP] Já é PDF: {input_path}")
        return

    # Imagens
    if ext in [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".tif", ".gif"]:
        convert_image_to_pdf(input_path, output_path)
    # Documento Word
    elif ext in [".docx", ".doc"]:
        success = convert_docx_to_pdf(input_path, output_path)
        if not success:
            print(f"[ERRO] Não foi possível converter DOC(X) {input_path}")
    # Planilhas Excel
    elif ext in [".xlsx", ".xls"]:
        # tenta LibreOffice
        result = convert_via_libreoffice(input_path, output_dir)
        if result is None:
            print(f"[ERRO] Não foi possível converter Excel {input_path}")
    # PowerPoint
    elif ext in [".pptx", ".ppt"]:
        result = convert_via_libreoffice(input_path, output_dir)
        if result is None:
            print(f"[ERRO] Não foi possível converter PowerPoint {input_path}")
    # Texto simples
    elif ext in [".txt", ".csv"]:
        convert_text_to_pdf(input_path, output_path)
    # HTML → PDF? (opcional: usa wkhtmltopdf ou outro; aqui não implementado)
    elif ext in [".html", ".htm"]:
        # Se quiser, use wkhtmltopdf via subprocess:
        try:
            cmd = ["wkhtmltopdf", str(input_path), str(output_path)]
            proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if proc.returncode == 0 and output_path.exists():
                print(f"[OK] HTML convertido via wkhtmltopdf: {input_path} → {output_path}")
            else:
                print(f"[AVISO] Falha ao converter HTML {input_path}: {proc.stderr.strip()}")
        except FileNotFoundError:
            print("[AVISO] wkhtmltopdf não encontrado; pule conversão de HTML ou instale wkhtmltopdf.")
    else:
        print(f"[IGNORADO] Extensão não suportada: {input_path}")

def main():
    parser = argparse.ArgumentParser(description="Conversor genérico para PDF (imagens, DOCX, Excel, PPT, TXT etc.)")
    parser.add_argument("input", nargs="+", help="Arquivo(s) ou diretorio(s) de entrada")
    parser.add_argument("-o", "--output", help="Pasta de saída para PDFs", default="output_pdfs")
    args = parser.parse_args()

    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    for inp in args.input:
        p = Path(inp)
        if not p.exists():
            print(f"[ERRO] Caminho não encontrado: {p}")
            continue
        if p.is_dir():
            # percorre todos arquivos recursivamente
            for sub in p.rglob("*"):
                if sub.is_file():
                    convert_generic(sub, output_dir)
        else:
            convert_generic(p, output_dir)

if __name__ == "__main__":
    main()
