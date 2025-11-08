UPDATE filmes
SET imagem_url = REPLACE(imagem_url, 'https://raw.githubusercontent.com/Xavier-sa/aprendizado/refs/heads/w3school/images/teste.jpg', 'https://raw.githubusercontent.com/Xavier-sa/aprendizado/refs/heads/main/images/teste.jpg')
WHERE imagem_url LIKE '%https://raw.githubusercontent.com/Xavier-sa/aprendizado/refs/heads/w3school/images/teste.jpg%';



comando acima atualizo varios de uma vez