# Sistema de Gerenciamento de Caminhões

## Descrição

Aplicação desenvolvida em Python com base no padrão MVC (Model-View-Controller), voltada para o gerenciamento de caminhões, motoristas e rotas.
O sistema possui uma interface em terminal (CLI) e permite operações de cadastro, listagem e controle de dados de forma organizada.

## Estrutura do Projeto

```
app/
├── main.py                 # Ponto de entrada da aplicação
├── controller/
│   ├── __init__.py
│   └── sistema.py          # Controlador principal da aplicação
├── model/
│   ├── __init__.py
│   ├── caminhao.py         # Classe responsável pelos dados dos caminhões
│   └── motorista.py        # Classe responsável pelos dados dos motoristas
└── views/
    ├── __init__.py
    └── sistema_view.py     # Camada de visualização (menu e interação com o usuário)
```

## Funcionalidades

* Cadastro de caminhões e motoristas
* Listagem de registros
* Associação entre caminhões e motoristas
* Menu interativo em linha de comando

## Requisitos

* Python 3.10 ou superior
* Sistema operacional compatível com o terminal (Windows, Linux ou macOS)


## Estrutura Lógica

* **Model:** representa os dados e regras de negócio.
* **Controller:** processa as ações e manipula os modelos.
* **View:** exibe informações e interage com o usuário.



