try:
    response = requests.get(url)
    response.raise_for_status()  # Lança um erro se o status não for 2xx
except requests.exceptions.RequestException as e:
    print("Erro ao fazer a requisição:", e)
