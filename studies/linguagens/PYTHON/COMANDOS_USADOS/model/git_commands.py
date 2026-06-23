class GitCommandsModel:
    def __init__(self):
        self.commands = {
            'git init': 'Inicializa um novo repositório Git.',
            'git clone <url>': 'Cria uma cópia local de um repositório remoto.',
            'git add <file>': 'Adiciona um arquivo específico ao staging area.',
            'git add .': 'Adiciona todos os arquivos modificados ao staging area.',
            'git commit -m "<message>"': 'Faz um commit das mudanças no staging area com uma mensagem descritiva.',
            'git status': 'Mostra o estado atual do repositório, incluindo arquivos modificados e não rastreados.',
            'git push origin <branch>': 'Envia as alterações locais para o repositório remoto no branch especificado.',
            'git pull origin <branch>': 'Atualiza seu repositório local com as mudanças do repositório remoto no branch especificado.',
            'git branch': 'Lista todos os branches no repositório. Adicionalmente, pode mostrar qual branch está atualmente ativo.',
            'git checkout <branch>': 'Troca para o branch especificado.',
            'git merge <branch>': 'Integra as mudanças do branch especificado ao branch atual.',
            'git log': 'Mostra o histórico de commits no repositório.',
            'git diff': 'Mostra as diferenças entre o estado atual e o último commit.',
            'git reset <file>': 'Remove um arquivo do staging area, mantendo as mudanças no diretório de trabalho.',
            'git rm <file>': 'Remove um arquivo do repositório e do diretório de trabalho.',
            'git stash': 'Armazena mudanças temporariamente para que você possa trabalhar em algo diferente e depois retomar.',
            'git stash pop': 'Aplica as mudanças armazenadas anteriormente com `git stash` e remove do stash.',
            'git revert <commit>': 'Cria um novo commit que desfaz as mudanças de um commit anterior.',
            'git rebase <branch>': 'Reaplica commits de um branch sobre outro branch, geralmente para atualizar um branch com as mudanças mais recentes.'
        }

    def get_commands(self):
        return self.commands
