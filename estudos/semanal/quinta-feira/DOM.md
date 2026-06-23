## JavaScript DOM

## DOM – Document Object Model

## O DOM representa a estrutura da página HTML como um objeto em JavaScript. 
## Com ele, conseguimos acessar e manipular elementos da página.



## Selecionar elementos do DOM

* Principais métodos para selecionar elementos no DOM:

    | Método                              | O que seleciona                           | Exemplo de uso                             |
    |-------------------------------------|-------------------------------------------|--------------------------------------------|
    | `document.getElementById()`         | Elemento com um ID específico             | `document.getElementById("meuElemento")`   |
    | `document.querySelector()`          | Primeiro elemento que combina o seletor   | `document.querySelector(".classe")`        |
    | `document.querySelectorAll()`       | Todos os elementos que combinam o seletor | `document.querySelectorAll("p")`           |
    | `document.getElementsByClassName()` | Elementos com uma determinada classe      | `document.getElementsByClassName("classe")`|



## Resumo rápido dos conceitos aplicados:**

- `document.getElementById()` → seleciona elementos por ID
- `addEventListener()` → adiciona escuta para eventos (como `click`)
- `fetch()` → usado para consumir APIs
- `textContent` e `value` → usados para alterar ou acessar o conteúdo