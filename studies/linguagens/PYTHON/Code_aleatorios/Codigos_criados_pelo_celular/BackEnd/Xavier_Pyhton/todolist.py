toDoList = [
{"Acordar 5h":True},
{"Tomou banho":True},
{"Conferiu Git":True},
{"Conferiu E-mail":False},
{"Conferiu Linkedin":True},
{"Foi travabalhar":True},
{"Quitou Nubank":True},
{"Quitou Bradesco":False}
    ]
    
for item in toDoList:
    for chave,valor in item.items():
        if valor == False:
            print(f'{chave}--[]')
        else:
            print(f'{chave}--[x]')