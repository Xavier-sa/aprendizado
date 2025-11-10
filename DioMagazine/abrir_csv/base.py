import csv
import os
import json
from datetime import datetime
from typing import List, Dict, Optional

class IconesSistema:
    """Sistema centralizado de ícones"""
    
    # Status e Progresso
    CERTO = "✅"
    ERRADO = "❌"
    AVISO = "⚠️"
    CONCLUIDO = "🎉"
    
    # Ações
    SALVAR = "💾"
    SAIR = "🚪"
    
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
    
    # Interface
    SETA = "➡️"
    FORCA = "💪"
    FOGO = "🔥"
    
    # Emoções
    MONSTRO = "👾"


class GerenciadorArquivos:
    """Classe responsável por manipulação de arquivos"""
    
    @staticmethod
    def ler_csv(arquivo: str) -> List[List[str]]:
        """Lê arquivo CSV e retorna lista de linhas"""
        try:
            with open(arquivo, 'r', encoding='utf-8') as file:
                reader = csv.reader(file)
                return [linha for linha in reader]
        except FileNotFoundError:
            return []
        except Exception as e:
            print(f"{IconesSistema.ERRADO} Erro ao ler CSV: {e}")
            return []
    
    @staticmethod
    def escrever_csv(arquivo: str, dados: List[List[str]]) -> bool:
        """Escreve dados em arquivo CSV"""
        try:
            with open(arquivo, 'w', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerows(dados)
            return True
        except Exception as e:
            print(f"{IconesSistema.ERRADO} Erro ao escrever CSV: {e}")
            return False
    
    @staticmethod
    def ler_json(arquivo: str) -> Dict:
        """Lê arquivo JSON e retorna dicionário"""
        try:
            with open(arquivo, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            return {}
        except Exception as e:
            print(f"{IconesSistema.ERRADO} Erro ao ler JSON: {e}")
            return {}
    
    @staticmethod
    def escrever_json(arquivo: str, dados: Dict) -> bool:
        """Escreve dados em arquivo JSON"""
        try:
            with open(arquivo, 'w', encoding='utf-8') as file:
                json.dump(dados, file, indent=4, ensure_ascii=False)
            return True
        except Exception as e:
            print(f"{IconesSistema.ERRADO} Erro ao escrever JSON: {e}")
            return False


class Historico:
    """Gerencia histórico de erros e acertos"""
    
    def __init__(self, arquivo: str = './historico.json'):
        self.arquivo = arquivo
        self.dados = GerenciadorArquivos.ler_json(arquivo)
        
        if not self.dados:
            self.dados = {
                'acertos': [],
                'erros': [],
                'tentativas_por_conceito': {}
            }
    
    def registrar_acerto(self, conceito: str, pergunta: str):
        """Registra um acerto"""
        self.dados['acertos'].append({
            'conceito': conceito,
            'pergunta': pergunta,
            'data': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        self._salvar()
    
    def registrar_erro(self, conceito: str, pergunta: str, resposta_usuario: str, resposta_correta: str):
        """Registra um erro com detalhes"""
        self.dados['erros'].append({
            'conceito': conceito,
            'pergunta': pergunta,
            'resposta_usuario': resposta_usuario,
            'resposta_correta': resposta_correta,
            'data': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        
        # Incrementa contador de tentativas
        if conceito not in self.dados['tentativas_por_conceito']:
            self.dados['tentativas_por_conceito'][conceito] = 0
        self.dados['tentativas_por_conceito'][conceito] += 1
        
        self._salvar()
    
    def mostrar_relatorio(self):
        """Mostra relatório detalhado"""
        ic = IconesSistema()
        
        print(f"\n{ic.LOUPE} RELATÓRIO DE DESEMPENHO")
        print("="*60)
        
        total_acertos = len(self.dados.get('acertos', []))
        total_erros = len(self.dados.get('erros', []))
        total = total_acertos + total_erros
        
        if total > 0:
            taxa_acerto = (total_acertos / total) * 100
            print(f"{ic.CERTO} Acertos: {total_acertos}")
            print(f"{ic.ERRADO} Erros: {total_erros}")
            print(f"{ic.ALVO} Taxa de Acerto: {taxa_acerto:.1f}%")
        else:
            print(f"{ic.AVISO} Nenhum dado de desempenho ainda")
        
        print(f"\n{ic.FOGO} CONCEITOS COM MAIS DIFICULDADE:")
        tentativas = self.dados.get('tentativas_por_conceito', {})
        if tentativas:
            for conceito, qtd in sorted(tentativas.items(), key=lambda x: x[1], reverse=True)[:5]:
                print(f"  • {conceito}: {qtd} tentativa(s)")
        
        print(f"\n{ic.ERRADO} ÚLTIMOS 5 ERROS:")
        for erro in self.dados.get('erros', [])[-5:]:
            print(f"\n  Conceito: {erro['conceito']}")
            print(f"  Pergunta: {erro['pergunta']}")
            print(f"  Sua resposta: {erro['resposta_usuario']}")
            print(f"  Resposta correta: {erro['resposta_correta']}")
            print(f"  Data: {erro['data']}")
        
        print("="*60)
    
    def _salvar(self):
        """Salva histórico em arquivo"""
        GerenciadorArquivos.escrever_json(self.arquivo, self.dados)


class SistemaAprendizado:
    """Sistema principal de aprendizado"""
    
    def __init__(self):
        self.nivel = 1
        self.pontos = 0
        self.conceitos_dominados = []
        self.arquivo_csv = './base_aprendizado.csv'
        self.arquivo_progresso = './progresso.json'
        self.icone = IconesSistema()
        self.historico = Historico()
        self.gerenciador = GerenciadorArquivos()
        
        # Carrega progresso salvo
        self.carregar_progresso()
    
    def carregar_dados(self) -> List[List[str]]:
        """Carrega dados do CSV"""
        dados = self.gerenciador.ler_csv(self.arquivo_csv)
        
        if not dados:
            print(f"{self.icone.PASTA} Arquivo CSV não encontrado! Criando base...")
            dados = self.criar_base_inicial()
        else:
            print(f"{self.icone.CERTO} Base carregada: {len(dados)-1} conceitos")
        
        return dados
    
    def criar_base_inicial(self) -> List[List[str]]:
        """Cria base de conceitos fundamentais"""
        conceitos = [
            ['CONCEITO', 'TIPO', 'DIFICULDADE', 'EXEMPLO', 'EXPLICACAO'],
            ['Variáveis', 'Fundamental', '1', 'x = 10', 'Armazenam dados na memória'],
            ['Operadores Aritméticos', 'Fundamental', '1', '+, -, *, /, %', 'Realizam cálculos matemáticos'],
            ['Operadores Comparação', 'Fundamental', '1', '==, !=, >, <, >=, <=', 'Comparam valores'],
            ['Estrutura IF', 'Controle', '2', 'if condicao:', 'Executa código SE condição for True'],
            ['Estrutura ELSE', 'Controle', '2', 'else:', 'Executa quando IF é False'],
            ['Loop WHILE', 'Repetição', '3', 'while condicao:', 'Repete ENQUANTO condição for True'],
            ['Loop FOR', 'Repetição', '3', 'for i in range(10):', 'Repete PARA cada item'],
            ['Listas', 'Estrutura Dados', '2', 'lista = [1, 2, 3]', 'Armazenam múltiplos valores'],
            ['Funções', 'Modularização', '4', 'def minha_funcao():', 'Agrupam código reutilizável']
        ]
        
        if self.gerenciador.escrever_csv(self.arquivo_csv, conceitos):
            print(f"{self.icone.CERTO} Base criada: {self.arquivo_csv}")
        
        return conceitos
    
    def carregar_progresso(self):
        """Carrega progresso salvo do JSON"""
        progresso = self.gerenciador.ler_json(self.arquivo_progresso)
        
        if progresso:
            self.nivel = progresso.get('nivel', 1)
            self.pontos = progresso.get('pontos', 0)
            self.conceitos_dominados = progresso.get('conceitos_dominados', [])
            print(f"{self.icone.SALVAR} Progresso carregado!")
    
    def salvar_progresso(self):
        """Salva progresso atual no JSON"""
        progresso = {
            'nivel': self.nivel,
            'pontos': self.pontos,
            'conceitos_dominados': self.conceitos_dominados,
            'ultima_atualizacao': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        if self.gerenciador.escrever_json(self.arquivo_progresso, progresso):
            print(f"{self.icone.SALVAR} Progresso salvo com sucesso!")
            return True
        return False
    
    def mostrar_menu(self):
        """Menu principal"""
        ic = self.icone
        
        print("\n" + "="*50)
        print(f"{ic.TROFEU} SISTEMA DE DOMÍNIO DA PROGRAMAÇÃO")
        print("="*50)
        print(f"{ic.ALVO} Nível: {self.nivel} | {ic.TROFEU} Pontos: {self.pontos}")
        print(f"{ic.CERTO} Conceitos dominados: {len(self.conceitos_dominados)}")
        print(f"\n1. {ic.LIVRO} Estudar Conceitos")
        print(f"2. {ic.CEREBRO} Desafios Práticos")
        print(f"3. {ic.LOUPE} Ver Progresso")
        print(f"4. {ic.TROFEU} Teste de Domínio")
        print(f"5. {ic.SALVAR} Salvar Progresso")
        print(f"6. {ic.ARQUIVO} Ver Base CSV")
        print(f"7. {ic.FOGO} Relatório de Erros")
        print(f"8. {ic.SAIR} Sair")
        print("="*50)
    
    def estudar_conceitos(self, dados: List[List[str]]):
        """Sistema de estudo com verificação"""
        ic = self.icone
        
        print(f"\n{ic.LIVRO} MÓDULO DE ESTUDO")
        print(f"{ic.FORCA} Demonstre compreensão para avançar!")
        
        for conceito in dados[1:]:
            nome, tipo, dificuldade, exemplo, explicacao = conceito
            
            if nome in self.conceitos_dominados:
                print(f"{ic.CERTO} JÁ DOMINADO: {nome}")
                continue
            
            print(f"\n{ic.ALVO} CONCEITO: {nome}")
            print(f"{ic.LIVRO} Tipo: {tipo} | {ic.FOGO} Dificuldade: {dificuldade}")
            print(f"{ic.LAMPADA} Exemplo: {exemplo}")
            print(f"{ic.PERGUNTA} Explicação: {explicacao}")
            
            if self.verificar_compreensao(nome, exemplo):
                self.conceitos_dominados.append(nome)
                pontos_ganhos = int(dificuldade) * 10
                self.pontos += pontos_ganhos
                print(f"{ic.CONCLUIDO} Dominado! +{pontos_ganhos} pontos")
                self.salvar_progresso()  # Auto-save
            else:
                print(f"{ic.ERRADO} Estude novamente!")
                break
    
    def verificar_compreensao(self, conceito: str, exemplo: str) -> bool:
        """Verifica se o usuário compreendeu o conceito"""
        ic = self.icone
        
        perguntas_gabarito = {
            'Variáveis': {
                'pergunta': "O que é uma variável? (1) Local para armazenar dados (2) Tipo de loop",
                'resposta': '1'
            },
            'Operadores Aritméticos': {
                'pergunta': "Qual operador calcula resto da divisão? (1) % (2) /",
                'resposta': '1'
            },
            'Operadores Comparação': {
                'pergunta': "Operador 'diferente' em Python? (1) != (2) <>",
                'resposta': '1'
            },
            'Estrutura IF': {
                'pergunta': "IF executa bloco quando condição é: (1) True (2) False",
                'resposta': '1'
            },
            'Loop WHILE': {
                'pergunta': "WHILE repete enquanto condição for: (1) True (2) False",
                'resposta': '1'
            },
            'Listas': {
                'pergunta': "Como acessar primeiro elemento? (1) lista[0] (2) lista[1]",
                'resposta': '1'
            },
            'Funções': {
                'pergunta': "Para que serve 'def'? (1) Definir função (2) Deletar variável",
                'resposta': '1'
            }
        }
        
        if conceito in perguntas_gabarito:
            pergunta_obj = perguntas_gabarito[conceito]
            resposta = input(f"{ic.PERGUNTA} {pergunta_obj['pergunta']}: ")
            
            if resposta == pergunta_obj['resposta']:
                self.historico.registrar_acerto(conceito, pergunta_obj['pergunta'])
                return True
            else:
                self.historico.registrar_erro(
                    conceito,
                    pergunta_obj['pergunta'],
                    resposta,
                    pergunta_obj['resposta']
                )
                return False
        else:
            # Pergunta genérica
            explicacao = input(f"{ic.PERGUNTA} Explique '{conceito}': ")
            acertou = len(explicacao) > 10
            
            if acertou:
                self.historico.registrar_acerto(conceito, f"Explicação de {conceito}")
            else:
                self.historico.registrar_erro(conceito, f"Explicação de {conceito}", explicacao, "Explicação mais elaborada")
            
            return acertou
    
    def desafios_praticos(self):
        """Desafios práticos com histórico"""
        ic = self.icone
        
        print(f"\n{ic.CEREBRO} DESAFIOS PRÁTICOS")
        
        desafios = [
            {
                "nivel": 1,
                "conceito": "Loop WHILE",
                "enunciado": "Conte de 1 a 5 e imprima cada número",
                "resposta_esperada": 5,
                "dica": "Use contador = 1, while contador <= 5:",
                "codigo": "contador = 1\nwhile contador <= 5:\n    print(contador)\n    contador += 1"
            },
            {
                "nivel": 2,
                "conceito": "Loop FOR com IF",
                "enunciado": "Some números pares de 1 a 10",
                "resposta_esperada": 30,
                "dica": "Use for com range e if numero % 2 == 0",
                "codigo": "soma = 0\nfor num in range(1, 11):\n    if num % 2 == 0:\n        soma += num"
            },
            {
                "nivel": 3,
                "conceito": "Fatorial",
                "enunciado": "Calcule fatorial de 5",
                "resposta_esperada": 120,
                "dica": "fatorial = 1, for i in range(1, 6): fatorial *= i",
                "codigo": "fatorial = 1\nfor i in range(1, 6):\n    fatorial *= i"
            }
        ]
        
        for desafio in desafios:
            if desafio["nivel"] > self.nivel:
                continue
            
            print(f"\n{ic.ALVO} Desafio Nível {desafio['nivel']} - {desafio['conceito']}")
            print(f"{ic.PERGUNTA} {desafio['enunciado']}")
            
            tentativas = 3
            while tentativas > 0:
                resposta = input(f"{ic.SETA} Digite 'dica' ou sua resposta: ")
                
                if resposta.lower() == 'dica':
                    print(f"{ic.LAMPADA} Dica: {desafio['dica']}")
                    print(f"{ic.LIVRO} Código:\n{desafio['codigo']}")
                    continue
                
                try:
                    if int(resposta) == desafio['resposta_esperada']:
                        print(f"{ic.CONCLUIDO} Correto! +25 pontos")
                        self.pontos += 25
                        self.historico.registrar_acerto(desafio['conceito'], desafio['enunciado'])
                        self.salvar_progresso()
                        break
                    else:
                        tentativas -= 1
                        self.historico.registrar_erro(
                            desafio['conceito'],
                            desafio['enunciado'],
                            resposta,
                            str(desafio['resposta_esperada'])
                        )
                        print(f"{ic.ERRADO} Incorreto! Tentativas: {tentativas}")
                except ValueError:
                    print(f"{ic.ERRADO} Digite um número!")
            
            if tentativas == 0:
                print(f"{ic.LAMPADA} Reveja o conceito!")
    
    def ver_base_csv(self):
        """Mostra conteúdo do CSV"""
        ic = self.icone
        dados = self.gerenciador.ler_csv(self.arquivo_csv)
        
        if dados:
            print(f"\n{ic.ARQUIVO} BASE DE CONHECIMENTO")
            print("="*70)
            for i, linha in enumerate(dados):
                if i == 0:
                    print(f"{ic.LOUPE} {' | '.join(linha)}")
                else:
                    print(f"{i}. {' | '.join(linha)}")
            print("="*70)
        else:
            print(f"{ic.ERRADO} CSV não encontrado!")
    
    def teste_dominio(self):
        """Teste para avançar de nível"""
        ic = self.icone
        
        print(f"\n{ic.TROFEU} TESTE DE DOMÍNIO - Nível {self.nivel}")
        
        pontos_necessarios = self.nivel * 50
        if self.pontos < pontos_necessarios:
            print(f"{ic.ERRADO} Precisa de {pontos_necessarios} pontos!")
            return
        
        perguntas = [
            {"q": "Comando para loop infinito?", "a": ["while true", "true", "while"]},
            {"q": "Verificar se número é par?", "a": ["% 2 == 0", "%", "par"]},
            {"q": "Transformar string em número?", "a": ["int()", "int", "integer"]},
            {"q": "Adicionar item à lista?", "a": ["append", ".append", "append()"]}
        ]
        
        acertos = 0
        for p in perguntas:
            resposta = input(f"{ic.PERGUNTA} {p['q']} ").lower()
            if any(palavra in resposta for palavra in p['a']):
                acertos += 1
                print(f"{ic.CERTO} Correto!")
            else:
                print(f"{ic.ERRADO} Esperado: {p['a'][0]}")
        
        if acertos >= 3:
            self.nivel += 1
            print(f"\n{ic.CONCLUIDO*3} NÍVEL {self.nivel}! {ic.CONCLUIDO*3}")
            self.salvar_progresso()
        else:
            print(f"{ic.FORCA} Continue praticando!")
    
    def executar(self):
        """Loop principal"""
        ic = self.icone
        dados = self.carregar_dados()
        
        print(f"{ic.FOGUETE} Sistema Iniciado!")
        print(f"{ic.MONSTRO} Vamos dominar a programação!")
        
        while True:
            self.mostrar_menu()
            opcao = input(f"{ic.SETA} Escolha: ")
            
            if opcao == "1":
                self.estudar_conceitos(dados)
            elif opcao == "2":
                self.desafios_praticos()
            elif opcao == "3":
                print(f"\n{ic.LOUPE} PROGRESSO:")
                print(f"{ic.ALVO} Nível: {self.nivel} | {ic.TROFEU} Pontos: {self.pontos}")
                print(f"{ic.CERTO} Conceitos: {', '.join(self.conceitos_dominados)}")
            elif opcao == "4":
                self.teste_dominio()
            elif opcao == "5":
                self.salvar_progresso()
            elif opcao == "6":
                self.ver_base_csv()
            elif opcao == "7":
                self.historico.mostrar_relatorio()
            elif opcao == "8":
                self.salvar_progresso()
                print(f"{ic.SAIR} Até logo! {ic.FOGUETE}")
                break
            else:
                print(f"{ic.ERRADO} Opção inválida!")


# 🚀 INICIAR
if __name__ == "__main__":
    sistema = SistemaAprendizado()
    sistema.executar()