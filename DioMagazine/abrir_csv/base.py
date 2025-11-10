import csv
import os
import random

class IconesSistema:
    """Sistema centralizado de ícones e formatação"""
    
    # Cores (se quiser adicionar cores depois)
    CORES = {
        'vermelho': '\033[91m',
        'verde': '\033[92m', 
        'amarelo': '\033[93m',
        'azul': '\033[94m',
        'magenta': '\033[95m',
        'ciano': '\033[96m',
        'reset': '\033[0m'
    }
    
    # Ícones do Sistema
    SISTEMA = "🏆"
    DIVISORIA = "=" * 50
    DIVISORIA_FINA = "-" * 40
    
    # Status e Progresso
    CERTO = "✅"
    ERRADO = "❌"
    AVISO = "⚠️"
    CONCLUIDO = "🎉"
    FOGUETE = "🚀"
    TROFEU = "🏅"
    
    # Ações
    SALVAR = "💾"
    SAIR = "🚪"
    CONFIG = "⚙️"
    
    # Aprendizado
    LIVRO = "📚"
    CEREBRO = "🧠"
    ALVO = "🎯"
    LAMPADA = "💡"
    PERGUNTA = "❓"
    LOUPE = "🔍"
    TROFEU = "🏆"
    FOGUETE = "🚀"
    
    # Arquivos e Dados
    PASTA = "📁"
    ARQUIVO = "📄"
    BANCO_DADOS = "💽"
    
    # Interface
    SETA = "➡️"
    RELOGIO = "⏰"
    CORACAO = "❤️"
    FORCA = "💪"
    FOGO = "🔥"
    
    # Emoções
    SORRISO = "😊"
    TRISTE = "😔"
    ESPERTO = "😎"
    MONSTRO = "👾"

class SistemaAprendizado:
    def __init__(self):
        self.nivel = 1
        self.pontos = 0
        self.conceitos_dominados = []
        self.arquivo_csv = './base_aprendizado.csv'
        self.icone = IconesSistema()  # Instância dos ícones
    
    def carregar_dados(self):
        """Carrega dados do CSV"""
        try:
            with open(self.arquivo_csv, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                dados = [linha for linha in reader]
                print(f"{self.icone.CERTO} Base carregada: {len(dados)} conceitos")
                return dados
        except FileNotFoundError:
            print(f"{self.icone.PASTA} Arquivo CSV não encontrado! Criando base de aprendizado...")
            return self.criar_base_inicial()
    
    def criar_base_inicial(self):
        """Cria base de conceitos fundamentais"""
        conceitos_fundamentais = [
            ['CONCEITO', 'TIPO', 'DIFICULDADE', 'EXEMPLO', 'EXPLICACAO'],
            ['Variáveis', 'Fundamental', '1', 'x = 10', 'Armazenam dados na memória'],
            ['Operadores Aritméticos', 'Fundamental', '1', '+, -, *, /, %', 'Realizam cálculos matemáticos'],
            ['Operadores Comparação', 'Fundamental', '1', '==, !=, >, <, >=, <=', 'Comparam valores'],
            ['Estrutura IF', 'Controle', '2', 'if condicao:', 'Executa código SE condição for True'],
            ['Estrutura ELSE', 'Controle', '2', 'else:', 'Executa quando IF é False'],
            ['Loop WHILE', 'Repetição', '3', 'while condicao:', 'Repete ENQUANTO condição for True'],
            ['Loop FOR', 'Repetição', '3', 'for i in range(10):', 'Repete PARA cada item em sequência'],
            ['Listas', 'Estrutura Dados', '2', 'lista = [1, 2, 3]', 'Armazenam múltiplos valores'],
            ['Funções', 'Modularização', '4', 'def minha_funcao():', 'Agrupam código reutilizável']
        ]
        
        with open(self.arquivo_csv, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerows(conceitos_fundamentais)
        
        print(f"{self.icone.CERTO} Base de aprendizado criada: base_aprendizado.csv")
        return conceitos_fundamentais

    def mostrar_menu(self):
        """Menu principal do sistema"""
        ic = self.icone  # Atalho para ícones
        
        print(f"\n{ic.DIVISORIA}")
        print(f"{ic.SISTEMA} SISTEMA DE DOMÍNIO DA PROGRAMAÇÃO")
        print(f"{ic.DIVISORIA}")
        print(f"{ic.ALVO} Nível: {self.nivel} | {ic.TROFEU} Pontos: {self.pontos}")
        print(f"{ic.CERTO} Conceitos dominados: {len(self.conceitos_dominados)}")
        print(f"\n1. {ic.LIVRO} Estudar Conceitos")
        print(f"2. {ic.CEREBRO} Desafios Práticos") 
        print(f"3. {ic.LOUPE} Ver Progresso")
        print(f"4. {ic.TROFEU} Teste de Domínio")
        print(f"5. {ic.SALVAR} Salvar Progresso")
        print(f"6. {ic.ARQUIVO} Ver Base CSV")
        print(f"7. {ic.SAIR} Sair")
        print(f"{ic.DIVISORIA}")

    def estudar_conceitos(self, dados):
        """Sistema de estudo com verificação de compreensão"""
        ic = self.icone
        
        print(f"\n{ic.LIVRO} MÓDULO DE ESTUDO")
        print(f"{ic.FORCA} Só avança quando demonstrar compreensão!")
        
        for conceito in dados[1:]:  # Pula cabeçalho
            nome, tipo, dificuldade, exemplo, explicacao = conceito
            
            if nome in self.conceitos_dominados:
                print(f"{ic.CERTO} JÁ DOMINADO: {nome}")
                continue
                
            print(f"\n{ic.ALVO} CONCEITO: {nome}")
            print(f"{ic.LIVRO} Tipo: {tipo} | {ic.FOGO} Dificuldade: {dificuldade}")
            print(f"{ic.LAMPADA} Exemplo: {exemplo}")
            print(f"{ic.PERGUNTA} Explicação: {explicacao}")
            
            # Verificação de compreensão
            if not self.verificar_compreensao(nome, exemplo):
                print(f"{ic.ERRADO} Volte e estude novamente!")
                return False
            else:
                self.conceitos_dominados.append(nome)
                self.pontos += int(dificuldade) * 10
                print(f"{ic.CONCLUIDO} Conceito dominado! +{int(dificuldade)*10} pontos")
        
        return True

    def verificar_compreensao(self, conceito, exemplo):
        """Sistema de perguntas para verificar aprendizado REAL"""
        ic = self.icone
        
        perguntas = {
            'Variáveis': {
                'pergunta': "O que é uma variável? ",
                'palavras_chave': ['armazenar', 'dado', 'valor', 'memória', 'nome'],
                'resposta_minima': 'Variável é um espaço na memória para armazenar dados'
            },
            'Operadores Aritméticos': {
                'pergunta': "Para que servem operadores aritméticos? ",
                'palavras_chave': ['cálculo', 'matemática', 'soma', 'subtração', 'operacao'],
                'resposta_minima': 'Realizam operações matemáticas como soma e subtração'
            },
            'Estrutura ELSE': {
                'pergunta': "Qual a função do ELSE? ",
                'palavras_chave': ['se não', 'alternativa', 'if', 'falso', 'condição'],
                'resposta_minima': 'ELSE executa quando a condição do IF é falsa'
            }
        }
        
        if conceito in perguntas:
            pergunta_data = perguntas[conceito]
            print(f"\n{ic.PERGUNTA} {pergunta_data['pergunta']}")
            print(f"{ic.LAMPADA} Dica: Explique com detalhes, mostre que entendeu!")
            
            resposta = input(f"{ic.SETA} Sua explicação: ")
            
            # Verificação ROBUSTA
            return self.avaliar_resposta(resposta, pergunta_data, conceito)
        else:
            # Para conceitos não mapeados
            resposta = input(f"{ic.PERGUNTA} Explique detalhadamente '{conceito}': ")
            return len(resposta.split()) >= 8 and any(palavra in resposta.lower() for palavra in ['quando', 'como', 'para', 'armazena', 'executa', 'condição'])

    def avaliar_resposta(self, resposta, pergunta_data, conceito):
        """Avalia a resposta de forma INTELIGENTE"""
        ic = self.icone
        
        resposta_lower = resposta.lower()
        palavras = resposta_lower.split()
        
        print(f"\n{ic.LOUPE} ANALISANDO SUA RESPOSTA...")
        print(f"{ic.ARQUIVO} Palavras usadas: {len(palavras)}")
        
        # Critérios de AVALIAÇÃO
        criterios = {
            'tamanho_minimo': len(palavras) >= 8,
            'palavras_chave': sum(1 for palavra in pergunta_data['palavras_chave'] if palavra in resposta_lower) >= 2,
            'coerencia': any(termo in resposta_lower for termo in [' quando ', ' para ', ' que ', ' como '])
        }
        
        print(f"{ic.CERTO if criterios['tamanho_minimo'] else ic.ERRADO} Tamanho adequado (>7 palavras): {criterios['tamanho_minimo']}")
        print(f"{ic.CERTO if criterios['palavras_chave'] else ic.ERRADO} Palavras-chave encontradas: {criterios['palavras_chave']}")
        print(f"{ic.CERTO if criterios['coerencia'] else ic.ERRADO} Resposta coerente: {criterios['coerencia']}")
        
        # Só passa se atender aos critérios
        if all(criterios.values()):
            print(f"{ic.CONCLUIDO} RESPOSTA ACEITA! Você realmente entendeu {conceito}!")
            print(f"{ic.LAMPADA} Resposta ideal: {pergunta_data['resposta_minima']}")
            return True
        else:
            print(f"{ic.ERRADO} RESPOSTA INSUFICIENTE! Estude mais o conceito.")
            print(f"{ic.LIVRO} O que era esperado: {pergunta_data['resposta_minima']}")
            print(f"{ic.FORCA} Tente novamente com mais detalhes!")
            return False

    def desafios_praticos(self):
        """Sistema de desafios práticos"""
        ic = self.icone
        
        print(f"\n{ic.CEREBRO} DESAFIOS PRÁTICOS")
        
        desafios = [
            {
                "nivel": 1, 
                "enunciado": "Crie um loop WHILE que conte de 1 a 5 e imprima cada número",
                "dica": "Use contador = 1, while contador <= 5:",
                "codigo_exemplo": "contador = 1\nwhile contador <= 5:\n    print(contador)\n    contador += 1"
            },
            {
                "nivel": 2, 
                "enunciado": "Some números pares de 1 a 10 (resultado deve ser 30)",
                "dica": "Use for com range e if numero % 2 == 0",
                "codigo_exemplo": "soma = 0\nfor num in range(1, 11):\n    if num % 2 == 0:\n        soma += num\nprint(soma)"
            }
        ]
        
        for desafio in desafios:
            if desafio["nivel"] > self.nivel:
                continue
                
            print(f"\n{ic.ALVO} Desafio Nível {desafio['nivel']}:")
            print(f"{ic.PERGUNTA} {desafio['enunciado']}")
            
            tentativas = 3
            while tentativas > 0:
                resposta = input(f"{ic.SETA} Digite 'dica' para ajuda ou sua resposta: ")
                
                if resposta.lower() == 'dica':
                    print(f"{ic.LAMPADA} Dica: {desafio['dica']}")
                    print(f"{ic.LIVRO} Exemplo:\n{desafio['codigo_exemplo']}")
                    continue
                    
                if resposta.isdigit() and int(resposta) in [5, 30, 120]:
                    print(f"{ic.CONCLUIDO} Correto! +25 pontos")
                    self.pontos += 25
                    break
                else:
                    tentativas -= 1
                    print(f"{ic.ERRADO} Tente novamente! Tentativas restantes: {tentativas}")
            
            if tentativas == 0:
                print(f"{ic.LAMPADA} Reveja o conceito e tente depois!")
                return

    def ver_base_csv(self):
        """Mostra o conteúdo do arquivo CSV"""
        ic = self.icone
        
        try:
            with open(self.arquivo_csv, 'r', encoding='utf-8') as file:
                print(f"\n{ic.ARQUIVO} CONTEÚDO DO ARQUIVO: {self.arquivo_csv}")
                print(f"{ic.DIVISORIA_FINA}")
                reader = csv.reader(file)
                for i, linha in enumerate(reader):
                    if i == 0:  # Cabeçalho
                        print(f"{ic.LOUPE} {linha}")
                    else:
                        print(f"{i:2d}. {linha}")
                print(f"{ic.DIVISORIA_FINA}")
        except FileNotFoundError:
            print(f"{ic.ERRADO} Arquivo CSV não encontrado!")

    def teste_dominio(self):
        """Teste final para avançar de nível"""
        ic = self.icone
        
        print(f"\n{ic.TROFEU} TESTE DE DOMÍNIO - Nível {self.nivel}")
        
        if self.pontos < self.nivel * 50:
            print(f"{ic.ERRADO} Precisa de {self.nivel * 50} pontos para o teste!")
            return
        
        perguntas = [
            "Qual comando para criar loop infinito? (while True:)",
            "Como verificar se número é par? (numero % 2 == 0)", 
            "Qual função transforma string em número? (int())"
        ]
        
        acertos = 0
        for pergunta in perguntas:
            resposta = input(f"{ic.PERGUNTA} {pergunta.split('?')[0]}? ")
            if any(palavra in resposta.lower() for palavra in pergunta.lower().split()[-3:]):
                acertos += 1
                print(f"{ic.CERTO} Correto!")
            else:
                print(f"{ic.ERRADO} Resposta esperada: {pergunta.split('(')[1].split(')')[0]}")
        
        if acertos >= 2:
            self.nivel += 1
            print(f"{ic.CONCLUIDO}{ic.CONCLUIDO}{ic.CONCLUIDO} AVANÇOU PARA NÍVEL {self.nivel}! {ic.CONCLUIDO}{ic.CONCLUIDO}{ic.CONCLUIDO}")
            print(f"{ic.FORCA} Sua base está ficando sólida!")
        else:
            print(f"{ic.FORCA} Continue praticando! A base leva tempo.")

    def executar(self):
        """Loop principal do sistema"""
        ic = self.icone
        dados = self.carregar_dados()
        
        print(f"{ic.FOGUETE} Sistema de Aprendizado Iniciado!")
        print(f"{ic.MONSTRO} Vamos criar um MONSTRO da programação!")
        
        while True:
            self.mostrar_menu()
            opcao = input(f"{ic.SETA} Escolha uma opção: ")
            
            if opcao == "1":
                self.estudar_conceitos(dados)
            elif opcao == "2":
                self.desafios_praticos()
            elif opcao == "3":
                print(f"\n{ic.LOUPE} PROGRESSO:")
                print(f"{ic.ALVO} Nível: {self.nivel} | {ic.TROFEU} Pontos: {self.pontos}")
                print(f"{ic.CERTO} Conceitos dominados: {', '.join(self.conceitos_dominados)}")
            elif opcao == "4":
                self.teste_dominio()
            elif opcao == "5":
                print(f"{ic.SALVAR} Progresso salvo (em memória)")
            elif opcao == "6":
                self.ver_base_csv()
            elif opcao == "7":
                print(f"{ic.SAIR} Até logo! Continue construindo sua base sólida! {ic.FOGUETE}")
                break
            else:
                print(f"{ic.ERRADO} Opção inválida!")

# 🚀 INICIAR SISTEMA
if __name__ == "__main__":
    sistema = SistemaAprendizado()
    sistema.executar()