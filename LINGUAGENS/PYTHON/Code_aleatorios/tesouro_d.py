import requests
import pandas as pd
from bs4 import BeautifulSoup

# URL do site que contém os dados
url = 'https://www.tesourodireto.com.br/titulos'

# Fazer uma requisição GET ao site
response = requests.get(url)

# Verificar se a requisição foi bem-sucedida
if response.status_code == 200:
    # Analisar o conteúdo da página
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Encontrar a tabela que contém os dados
    tabela = soup.find('table')  # Ajuste conforme a estrutura do site
    
    # Criar listas para armazenar os dados
    titulos = []
    rentabilidades = []

    # Iterar sobre as linhas da tabela
    for linha in tabela.find_all('tr')[1:]:  # Ignorar o cabeçalho
        colunas = linha.find_all('td')
        titulos.append(colunas[0].text.strip())  # Ajuste o índice conforme a coluna correta
        rentabilidades.append(colunas[1].text.strip())  # Ajuste o índice conforme a coluna correta

    # Criar um DataFrame com os dados
    df = pd.DataFrame({
        'Título': titulos,
        'Rentabilidade': rentabilidades
    })

    print(df)
else:
    print(f"Erro ao acessar a página: {response.status_code}")
