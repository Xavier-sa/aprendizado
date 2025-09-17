# 📊 Sistema de Avaliação Escolar

Sistema para cálculo de média e determinação da situação acadêmica de alunos com base em três notas e frequência.

## 🚀 Funcionalidades

- **Cálculo de Média Aritmética**: Calcula a média de três notas (N1, N2, N3)
- **Determinação de Situação**: Classifica alunos em Aprovado, Recuperação ou Reprovado
- **Validação de Dados**: Verifica se notas e frequência estão dentro dos limites válidos
- **Testes Unitários**: Suite completa de testes automatizados

## 📋 Requisitos

- Python 3.6 ou superior
- Módulo unittest (incluído na biblioteca padrão do Python)

## 🏗️ Estrutura do Projeto

```
projeto-avaliacao/
│
├── aluno.py              # Código principal do sistema
├── test_aluno.py         # Testes unitários completos
├── run_tests.py          # Script de execução de testes
└── README.md             # Este arquivo
```

## 🛠️ Instalação e Execução

### 1. Executar o Programa Principal

```bash
python aluno.py
```

### 2. Executar Todos os Testes

```bash
python -m unittest test_aluno.py -v
```

### 3. Executar com Script Auxiliar

```bash
python run_tests.py
```

## 📊 Critérios de Avaliação

### Média
- Calculada como: `(N1 + N2 + N3) / 3`
- Notas devem estar entre 0 e 10

### Situação do Aluno
- **Aprovado**: Média ≥ 7.0 e Frequência ≥ 75%
- **Recuperação**: Média ≥ 5.0 e Frequência ≥ 75%
- **Reprovado**: Média < 5.0 ou Frequência < 75%

## 🧪 Testes Unitários

### Categorias de Testes Implementados

- **Testes de Cálculo de Média**
  - Cálculo correto da média
  - Notas nos limites (0 e 10)
  - Validação de notas inválidas

- **Testes de Situação Acadêmica**
  - Casos de aprovação
  - Casos de recuperação
  - Casos de reprovação
  - Validação de frequência inválida

- **Casos Específicos**
  - Testes nos limites das faixas
  - Casos borderline

### Executar Testes Específicos

```bash
# Executar apenas testes de aprovação
python -m unittest test_aluno.TestAvaliacaoEscolar.test_aprovado -v

# Executar testes de cálculo de média
python -m unittest test_aluno.TestAvaliacaoEscolar.test_media_calculo_correto -v
```

## 📝 Exemplos de Uso

### Entrada de Dados
```
Digite a nota N1 (0-10): 8.0
Digite a nota N2 (0-10): 7.5
Digite a nota N3 (0-10): 9.0
Digite a frequência (%): 80.0
```

### Saída Esperada
```
Média: 8.17
Frequência: 80.0%
Situação: Aprovado
```

## 🚨 Tratamento de Erros

O sistema inclui validações para:
- Notas fora do intervalo [0, 10]
- Frequência fora do intervalo [0, 100%]
- Entradas não numéricas

## 🔧 Personalização

### Modificar Critérios de Avaliação
Edite a função `determinar_situacao()` no arquivo `aluno.py`:

```python
# Exemplo: alterar média para aprovação para 6.0
if media >= 6.0 and frequencia >= 75.0:
    return "Aprovado"
```

### Adicionar Novos Testes
Inclua novos métodos na classe `TestAvaliacaoEscolar` no arquivo `test_aluno.py`.

## 📊 Cobertura de Testes

O sistema inclui testes para:
- ✅ Todos os cenários de aprovação
- ✅ Todos os cenários de recuperação  
- ✅ Todos os cenários de reprovação
- ✅ Casos limite e borderline
- ✅ Tratamento de erros e validações
- ✅ Cálculos matemáticos precisos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🐛 Reportar Problemas

Encontrou um bug? Por favor, abra uma issue no repositório com:
- Descrição detalhada do problema
- Steps para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)

---

**Desenvolvido para fins educacionais e de aprendizado em testes de software com Python.**