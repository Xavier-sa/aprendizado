import random

def teste_disciplina_gastos():
    print("=== TESTE DE DISCIPLINA FINANCEIRA ===")
    print("Responda as perguntas para verificar seu conhecimento!\n")
    
    pontuacao = 0
    total_perguntas = 5
    
    # Pergunta 1
    print("1. Qual porcentagem máxima da renda recomenda-se gastar com MORADIA?")
    print("a) 20%")
    print("b) 30%")
    print("c) 50%")
    print("d) 70%")
    resposta1 = input("Sua resposta (a/b/c/d): ").lower()
    if resposta1 == "b":
        pontuacao += 1
        print("✅ Correto! O ideal é até 30% da renda.\n")
    else:
        print("❌ Errado! O recomendado é até 30% da renda.\n")
    
    # Pergunta 2
    print("2. Qual porcentagem da renda é saudável destinar para LAZER?")
    print("a) 5% a 10%")
    print("b) 15% a 20%")
    print("c) 25% a 30%")
    print("d) Não há limites")
    resposta2 = input("Sua resposta (a/b/c/d): ").lower()
    if resposta2 == "a":
        pontuacao += 1
        print("✅ Correto! De 5% a 10% é o ideal para lazer.\n")
    else:
        print("❌ Errado! O recomendado é de 5% a 10%.\n")
    
    # Pergunta 3
    print("3. Qual é a regra básica para INVESTIMENTOS?")
    print("a) Investir apenas o que sobra no fim do mês")
    print("b) Separar pelo menos 10% da renda logo que receber")
    print("c) Investir apenas em imóveis")
    print("d) Esperar ter muito dinheiro para começar")
    resposta3 = input("Sua resposta (a/b/c/d): ").lower()
    if resposta3 == "b":
        pontuacao += 1
        print("✅ Correto! O ideal é separar pelo menos 10% primeiro.\n")
    else:
        print("❌ Errado! Deve-se separar uma parte logo ao receber.\n")
    
    # Pergunta 4
    print("4. O que é considerado um gasto 'racional' com lazer?")
    print("a) Gastar tudo o que quiser, desde que seja feliz")
    print("b) Gastar apenas se sobrar dinheiro")
    print("c) Planejar gastos dentro de um orçamento pré-definido")
    print("d) Evitar totalmente gastos com lazer")
    resposta4 = input("Sua resposta (a/b/c/d): ").lower()
    if resposta4 == "c":
        pontuacao += 1
        print("✅ Correto! Lazer deve ser planejado no orçamento.\n")
    else:
        print("❌ Errado! Deve ser planejado dentro do orçamento.\n")
    
    # Pergunta 5
    print("5. Qual é a prioridade financeira após cobrir gastos essenciais?")
    print("a) Aumentar gastos com lazer")
    print("b) Investir em educação financeira e reservas")
    print("c) Comprar um carro melhor")
    print("d) Fazer empréstimos para viagens")
    resposta5 = input("Sua resposta (a/b/c/d): ").lower()
    if resposta5 == "b":
        pontuacao += 1
        print("✅ Correto! Investir e criar reservas é a prioridade.\n")
    else:
        print("❌ Errado! A prioridade deve ser investir e criar reservas.\n")
    
    # Resultado
    print("\n" + "="*50)
    print("RESULTADO DO TESTE:")
    print(f"Você acertou {pontuacao} de {total_perguntas} perguntas!")
    
    if pontuacao == 5:
        print("🎉 Excelente! Você tem grande disciplina financeira!")
    elif pontuacao >= 3:
        print("👍 Bom! Você está no caminho certo, mas pode melhorar.")
    else:
        print("📚 Hmm... Recomendo estudar mais sobre educação financeira.")
    print("="*50)

# Executar o teste
if __name__ == "__main__":
    teste_disciplina_gastos()