### **📌 1. Introdução ao Python (Fundamentos)**
Antes de resolver problemas, você precisa dominar:  

#### **🔹 Variáveis e Tipos de Dados**
```python
nome = "João"       # String (texto)
idade = 25          # Inteiro
altura = 1.75       # Float (decimal)
eh_estudante = True # Booleano (True/False)
```

#### **🔹 Operadores Básicos**
```python
a = 10
b = 3

soma = a + b       # 13
subtracao = a - b  # 7
multiplicacao = a * b  # 30
divisao = a / b    # 3.333...
resto = a % b      # 1 (resto da divisão)
```

#### **🔹 Estruturas Condicionais (`if`, `else`)**
```python
nota = 7.5

if nota >= 7:
    print("Aprovado!")
else:
    print("Reprovado.")
```

#### **🔹 Loops (`for`, `while`)**
```python
# Imprimir números de 1 a 5
for i in range(1, 6):
    print(i)

# Loop while (enquanto condição for verdadeira)
contador = 0
while contador < 5:
    print(contador)
    contador += 1
```

#### **🔹 Listas e Dicionários**
```python
# Lista (ordenada, mutável)
frutas = ["maçã", "banana", "laranja"]
frutas.append("uva")  # Adiciona no final

# Dicionário (chave-valor)
aluno = {"nome": "Maria", "idade": 22, "curso": "Engenharia"}
print(aluno["nome"])  # Saída: Maria
```

---

### **📌 2. Funções em Python**
Funções ajudam a organizar e reutilizar código.  

#### **🔹 Função Básica**
```python
def saudacao(nome):
    return f"Olá, {nome}!"

print(saudacao("Carlos"))  # Saída: Olá, Carlos!
```

#### **🔹 Função com Condicional**
```python
def eh_par(numero):
    if numero % 2 == 0:
        return True
    else:
        return False

print(eh_par(4))  # Saída: True
```

---

### **📌 3. Problemas Básicos para Praticar**
Agora vamos resolver alguns problemas simples:  

#### **🔹 Problema 1: Soma de Dois Números**  
*Escreva uma função que recebe dois números e retorna a soma deles.*  

**Solução:**  
```python
def soma(a, b):
    return a + b

print(soma(5, 3))  # Saída: 8
```

#### **🔹 Problema 2: Contar Vogais em uma String**  
*Conte quantas vogais (a, e, i, o, u) existem em uma palavra.*  

**Solução:**  
```python
def contar_vogais(palavra):
    vogais = "aeiouAEIOU"
    contador = 0
    for letra in palavra:
        if letra in vogais:
            contador += 1
    return contador

print(contar_vogais("Python"))  # Saída: 1 (o)
```

#### **🔹 Problema 3: Encontrar o Maior Número em uma Lista**  
*Dada uma lista de números, retorne o maior valor.*  

**Solução:**  
```python
def maior_numero(lista):
    return max(lista)  # Função pronta do Python

# Ou implementando manualmente:
def maior_numero_manual(lista):
    maior = lista[0]
    for numero in lista:
        if numero > maior:
            maior = numero
    return maior

print(maior_numero([3, 8, 2, 10]))  # Saída: 10
```

---

### **📌 4. Próximos Passos (Intermediário)**  
Quando estiver confortável com o básico, podemos avançar para:  
- **Manipulação de strings** (fatiamento, métodos como `.split()`, `.join()`).  
- **List comprehensions** (forma concisa de criar listas).  
- **Funções lambda** (funções anônimas).  
- **Tratamento de erros** (`try`, `except`).  

**Quer um desafio agora?**  
Tente resolver este problema:  

**Desafio:**  
*Escreva uma função que recebe uma lista de números e retorna uma nova lista apenas com os números **únicos** (sem repetições).*  

<details>
<summary>🔍 Solução (clique para ver)</summary>

```python
def numeros_unicos(lista):
    return list(set(lista))  # Convertendo para set (remove duplicatas)

print(numeros_unicos([1, 2, 2, 3, 4, 4, 5]))  # Saída: [1, 2, 3, 4, 5]
```
</details>

---

