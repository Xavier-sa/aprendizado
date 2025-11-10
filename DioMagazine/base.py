import csv
import os
import random

class SistemaAprendizado:
    def __init__(self):
        self.nivel = 1
        self.pontos = 0
        self.conceitos_dominados = []
    
    def carregar_dados(self):
        """Carrega dados do CSV - OPERADORES E ESTRUTURAS BÁSICAS"""
        try:
            with open('./exemplo.csv', 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                dados = [linha for linha in reader]
                return dados
        except FileNotFoundError:
            print("📁 Arquivo não encontrado! Criando base de aprendizado...")
            return self.criar_base_inicial()
    
    def criar_base_inicial(self):
        """Cria base de conceitos fundamentais"""
        conceitos_fundamentais = [
            ['CONCEITO', 'TIPO', 'DIFICULDADE', 'EXEMPLO'],
            ['Variáveis', 'Fundamental', '1', 'x = 10'],
            ['Operadores Aritméticos', 'Fundamental', '1', '+, -, *, /, %'],
            ['Operadores Comparação', 'Fundamental', '1', '==, !=, >, <, >=, <='],
            ['Estrutura IF', 'Controle', '2', 'if condicao:'],
            ['Estrutura ELSE', 'Controle', '2', 'else:'],
            ['Loop WHILE', 'Repetição', '3', 'while condicao:'],
            ['Loop FOR', 'Repetição', '3', 'for i in range(10):'],
            ['Listas', 'Estrutura Dados', '2', 'lista = [1, 2, 3]'],
            ['Funções', 'Modularização', '4', 'def minha_funcao():']
        ]
        
        with open('./exemplo.csv', 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerows(conceitos_fundamentais)
        
        return conceitos_fundamentais

    def mostrar_menu(self):
        """Menu principal do sistema"""
        print("\n" + "="*50)
        print("🏆 SISTEMA DE DOMÍNIO DA PROGRAMAÇÃO")
        print("="*50)
        print(f"🎯 Nível: {self.nivel} | 📊 Pontos: {self.pontos}")
        print(f"✅ Conceitos dominados: {len(self.conceitos_dominados)}")
        print("\n1. 📚 Estudar Conceitos")
        print("2. 🧠 Desafios Práticos") 
        print("3. 📊 Ver Progresso")
        print("4. 🏆 Teste de Domínio")
        print("5. 💾 Salvar Progresso")
        print("6. 🚪 Sair")
        print("="*50)

    def estudar_conceitos(self, dados):
        """Sistema de estudo com verificação de compreensão"""
        print("\n📚 MÓDULO DE ESTUDO")
        print("Só avança quando demonstrar compreensão!")
        
        for conceito in dados[1:]:  # Pula cabeçalho
            nome, tipo, dificuldade, exemplo = conceito
            
            if nome in self.conceitos_dominados:
                print(f"✅ JÁ DOMINADO: {nome}")
                continue
                
            print(f"\n🎯 CONCEITO: {nome}")
            print(f"📖 Tipo: {tipo} | 🎯 Dificuldade: {dificuldade}")
            print(f"💡 Exemplo: {exemplo}")
            
            # Verificação de compreensão
            if not self.verificar_compreensao(nome, exemplo):
                print("❌ Volte e estude novamente!")
                return False
            else:
                self.conceitos_dominados.append(nome)
                self.pontos += int(dificuldade) * 10
                print(f"🎉 Conceito dominado! +{int(dificuldade)*10} pontos")
        
        return True

    def verificar_compreensao(self, conceito, exemplo):
        """Sistema de perguntas para verificar aprendizado"""
        perguntas = {
            'Variáveis': "O que é uma variável? (1) Local para armazenar dados (2) Tipo de loop: ",
            'Operadores Aritméticos': "Qual operador calcula resto da divisão? (1) % (2) / : ",
            'Operadores Comparação': "Operador 'diferente' em Python? (1) != (2) <> : ",
            'Estrutura IF': "IF executa bloco quando condição é: (1) True (2) False : ",
            'Loop WHILE': "WHILE repete enquanto condição for: (1) True (2) False : ",
            'Listas': "Como acessar primeiro elemento? (1) lista[0] (2) lista[1] : "
        }
        
        if conceito in perguntas:
            resposta = input(perguntas[conceito])
            return resposta == "1"
        else:
            # Pergunta genérica para outros conceitos
            explicacao = input(f"Explique com suas palavras o conceito '{conceito}': ")
            return len(explicacao) > 10  # Resposta minimamente elaborada

    def desafios_praticos(self):
        """Sistema de desafios práticos"""
        print("\n🧠 DESAFIOS PRÁTICOS")
        
        desafios = [
            {"nivel": 1, "enunciado": "Crie um loop WHILE que conte de 1 a 5", "solucao": "5"},
            {"nivel": 2, "enunciado": "Some números pares de 1 a 10 (resultado deve ser 30)", "solucao": "30"},
            {"nivel": 3, "enunciado": "Fatorial de 5 (resultado)", "solucao": "120"}
        ]
        
        for desafio in desafios:
            if desafio["nivel"] > self.nivel:
                continue
                
            print(f"\n🎯 Desafio Nível {desafio['nivel']}:")
            print(desafio["enunciado"])
            
            tentativas = 3
            while tentativas > 0:
                resposta = input("Sua resposta: ")
                if resposta == desafio["solucao"]:
                    print("🎉 Correto! +20 pontos")
                    self.pontos += 20
                    break
                else:
                    tentativas -= 1
                    print(f"❌ Errado! Tentativas restantes: {tentativas}")
            
            if tentativas == 0:
                print("💡 Dica: Estude mais e tente novamente!")
                return

    def teste_dominio(self):
        """Teste final para avançar de nível"""
        print(f"\n🏆 TESTE DE DOMÍNIO - Nível {self.nivel}")
        
        if self.pontos < self.nivel * 50:
            print(f"❌ Precisa de {self.nivel * 50} pontos para o teste!")
            return
        
        perguntas = [
            "Qual comando para criar loop infinito? while True:",
            "Como verificar se número é par? numero % 2 == 0", 
            "Qual função transforma string em número? int()"
        ]
        
        acertos = 0
        for pergunta in perguntas:
            resposta = input(f"{pergunta.split('?')[0]}? ")
            if resposta.lower() in pergunta.lower():
                acertos += 1
                print("✅ Correto!")
            else:
                print("❌ Estude mais!")
        
        if acertos >= 2:
            self.nivel += 1
            print(f"🎉🎉🎉 AVANÇOU PARA NÍVEL {self.nivel}! 🎉🎉🎉")
        else:
            print("💪 Continue praticando!")

    def executar(self):
        """Loop principal do sistema"""
        dados = self.carregar_dados()
        
        while True:
            self.mostrar_menu()
            opcao = input("Escolha uma opção: ")
            
            if opcao == "1":
                self.estudar_conceitos(dados)
            elif opcao == "2":
                self.desafios_praticos()
            elif opcao == "3":
                print(f"\n📊 PROGRESSO:")
                print(f"Nível: {self.nivel} | Pontos: {self.pontos}")
                print(f"Conceitos dominados: {', '.join(self.conceitos_dominados)}")
            elif opcao == "4":
                self.teste_dominio()
            elif opcao == "5":
                print("💾 Progresso salvo (em memória)")
            elif opcao == "6":
                print("👋 Até logo! Continue praticando!")
                break
            else:
                print("❌ Opção inválida!")

# 🚀 INICIAR SISTEMA
if __name__ == "__main__":
    sistema = SistemaAprendizado()
    sistema.executar()