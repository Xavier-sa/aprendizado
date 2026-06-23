nome,profissao,skills,jogo="XAVIER","Dev FULL STACK","Resolução de Problemas", "JOGO EM DESENVOLVIMENTO"
novas_skills= []
novas_profissoes=[]
jogos_novos=[]
print("Hello World, Bem vindo!")
print(f"Oque deseja fazer hj sr : {nome}")
print(f"Vamos aprender a printar?  ")
opcao=str(input("(S/N):")).lower()
print()
print(f"Opcão escolhida foi {opcao}")
print()
print(f"Sua profissão desenvolvida atualmente é {profissao} e suas habilidades atuais sao {skills}")
print()
print(f"E atualmente estou preso em um projeto que é um {jogo} ")
print()

print(f"Deseja adicionar Suas Novas Habilidades?")

print("SIM")
skil=input("Habilidade:")
novas_skills.append(skil)
print(novas_skills)

print(f"Você adquiriu {skil} e apartir de agora estará 1% mais proximo do objetivo")
skil2=input("Habilidade:")
novas_skills.append(skil2)
print("Você agora possui as seguintes Habilidades:")
print(f"{'-'*22}\n{novas_skills}\n{'-'*22}")

