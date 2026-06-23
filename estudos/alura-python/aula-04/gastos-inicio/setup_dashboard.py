import subprocess
import os
import sys

def run_command(command):
    """Executa um comando no terminal e exibe a saída."""
    print(f"\n💻 Executando: {command}")
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"❌ Erro ao executar: {command}")
        sys.exit(1)

# Passo 1 - Criar ambiente virtual
if not os.path.exists(".venv"):
    run_command("python3 -m venv .venv")
    print("✅ Ambiente virtual criado.")
else:
    print("ℹ️ Ambiente virtual já existe.")

# Passo 2 - Criar requirements.txt
requirements = """pandas==2.2.3
streamlit==1.44.1
plotly==5.24.1
"""
with open("requirements.txt", "w") as f:
    f.write(requirements)
print("✅ Arquivo requirements.txt criado.")

# Passo 3 - Instalar pacotes no venv
run_command(".venv\\Scripts\\pip install --upgrade pip")
run_command(".venv\\Scripts\\pip install -r requirements.txt")

print("\n🎯 Instalação concluída!")
print("👉 Para ativar o ambiente virtual, digite:")
print("   .venv\\Scripts\\activate   (Windows)")
print("   source .venv/bin/activate  (Mac/Linux)")
print("👉 Depois rode o dashboard com:")
print("   streamlit run app.py")
