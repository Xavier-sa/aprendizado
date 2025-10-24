
const cronograma = [
    {
        dia: "Segunda-feira",
        tema: "HTML & CSS",
        tarefas: [
            "Estudar semântica e boas práticas",
            "Melhorar páginas HTML/CSS do portfólio"
        ],
        quizzes: [
            {
                question: "Qual elemento HTML é mais semântico para um cabeçalho principal?",
                options: [
                    "&lt;div class='header'&gt;",
                    "&lt;h1&gt;",
                    "&lt;header&gt;",
                    "&lt;p class='title'&gt;"
                ],
                answer: 1,
                explanation: "O elemento &lt;h1&gt; é o mais semântico para cabeçalhos principais, seguido por &lt;header&gt; para áreas de cabeçalho."
            }
        ]
    },
    {
        dia: "Terça-feira",
        tema: "JavaScript Básico",
        tarefas: [
            "Funções, arrays, objetos",
            "Criar scripts simples como contador ou validador"
        ],
        quizzes: [
            {
                question: "Qual método adiciona um item ao final de um array?",
                options: [
                    "array.push()",
                    "array.pop()",
                    "array.shift()",
                    "array.unshift()"
                ],
                answer: 0,
                explanation: "O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento."
            }
        ]
    },
    {
        dia: "Quarta-feira",
        tema: "Banco de Dados (MySQL)",
        tarefas: [
            "Praticar SELECT, INSERT, UPDATE, DELETE",
            "Exercícios com tabelas relacionadas"
        ],
        quizzes: [
            {
                question: "Qual comando SQL recupera dados de uma tabela?",
                options: [
                    "INSERT",
                    "SELECT",
                    "UPDATE",
                    "DELETE"
                ],
                answer: 1,
                explanation: "O comando SELECT é usado para consultar e recuperar dados de um banco de dados."
            },
            {
                question: "Qual cláusula SQL é usada para ordenar os resultados?",
                options: ["ORDER BY", "GROUP BY", "SORT", "ARRANGE"],
                answer: 0,
                explanation: "ORDER BY é usado para classificar os resultados de uma consulta com base em uma ou mais colunas."
            },
            {
                question: "Qual comando SQL cria um novo banco de dados?",
                options: ["CREATE DATABASE", "NEW DATABASE", "ADD DATABASE", "MAKE DATABASE"],
                answer: 0,
                explanation: "CREATE DATABASE é usado para criar um novo banco de dados no sistema."
            }
        ]
    },
    {
        dia: "Quinta-feira",
        tema: "JavaScript DOM + APIs",
        tarefas: [
            "Manipular DOM com eventos",
            "Consumir APIs públicas"
        ],
        quizzes: [
            {
                question: "Qual método seleciona um elemento por ID?",
                options: [
                    "document.querySelector()",
                    "document.getElementById()",
                    "document.getElementsByClassName()",
                    "document.querySelectorAll()"
                ],
                answer: 1,
                explanation: "getElementById() é o método mais eficiente para selecionar elementos por ID."
            },
            {
                question: "Qual método adiciona um evento a um elemento HTML?",
                options: [
                    "addEventListener()",
                    "attachEvent()",
                    "onEvent()",
                    "createEvent()"
                ],
                answer: 0,
                explanation: "O método addEventListener() é usado para escutar eventos como cliques, teclas e outros."
            },
            {
                question: "Qual propriedade altera o conteúdo de texto de um elemento?",
                options: [
                    "innerHTML",
                    "textContent",
                    "value",
                    "nodeValue"
                ],
                answer: 1,
                explanation: "textContent altera apenas o texto interno de um elemento, sem interpretar HTML."
            },
            {
                question: "Qual método retorna todos os elementos com uma determinada classe?",
                options: [
                    "getElementById()",
                    "querySelector()",
                    "getElementsByClassName()",
                    "querySelectorAll()"
                ],
                answer: 2,
                explanation: "getElementsByClassName() retorna uma coleção de todos os elementos com a classe especificada."
            },
            {
                question: "Como acessar o valor de um campo de input com o ID 'nome'?",
                options: [
                    "document.querySelector('#nome').textContent",
                    "document.getElementById('nome').value",
                    "document.getElementById('nome').innerHTML",
                    "document.querySelector('nome').inputValue"
                ],
                answer: 1,
                explanation: "A propriedade .value retorna o valor atual de um campo de formulário."
            },
            {
                question: "Qual método é usado para criar um novo elemento HTML via JavaScript?",
                options: [
                    "createElement()",
                    "appendChild()",
                    "insertBefore()",
                    "newElement()"
                ],
                answer: 0,
                explanation: "createElement() cria dinamicamente um novo nó HTML no DOM."
            },
            {
                question: "Qual função é usada para converter uma resposta JSON em objeto JavaScript?",
                options: [
                    "JSON.parse()",
                    "JSON.stringify()",
                    "parseJSON()",
                    "toJSON()"
                ],
                answer: 0,
                explanation: "JSON.parse() transforma uma string JSON em um objeto JavaScript utilizável."
            },
            {
                question: "Qual método da API Fetch é usado para realizar requisições HTTP?",
                options: [
                    "fetch()",
                    "getRequest()",
                    "ajax()",
                    "XMLHttpRequest()"
                ],
                answer: 0,
                explanation: "fetch() é o método moderno para realizar requisições HTTP de forma assíncrona."
            },
            {
                question: "Qual propriedade oculta um elemento no DOM?",
                options: [
                    "element.hidden = true;",
                    "element.display = none;",
                    "element.visible = false;",
                    "element.hide()"
                ],
                answer: 0,
                explanation: "A propriedade hidden é booleana e serve para esconder ou mostrar elementos facilmente."
            },
            {
                question: "Qual é o evento disparado quando um botão é clicado?",
                options: [
                    "change",
                    "click",
                    "submit",
                    "keydown"
                ],
                answer: 1,
                explanation: "O evento 'click' é acionado sempre que o usuário clica em um elemento interativo."
            },
            {
                question: "O que faz o método appendChild()?",
                options: [
                    "Remove um elemento do DOM",
                    "Adiciona um elemento como filho de outro",
                    "Cria um novo nó",
                    "Copia o conteúdo de um nó"
                ],
                answer: 1,
                explanation: "appendChild() adiciona um elemento ao final da lista de filhos de outro nó pai."
            }
        ]
    },

    {
        "dia": "Sexta-feira",
        "tema": "Git e GitHub",
        "tarefas": [
            "Revisar comandos Git",
            "Fazer commits e atualizar portfólio"
        ],
        "quizzes": [
            {
                "question": "Qual comando envia commits para o repositório remoto?",
                "options": [
                    "git add",
                    "git commit",
                    "git push",
                    "git pull"
                ],
                "answer": 2,
                "explanation": "git push é usado para enviar commits locais para um repositório remoto."
            },
            {
                "question": "Qual comando é usado para preparar arquivos para o commit (adicionar à área de staging)?",
                "options": [
                    "git stage",
                    "git add",
                    "git prepare",
                    "git track"
                ],
                "answer": 1,
                "explanation": "O comando git add é usado para adicionar alterações na área de staging (preparação) para o próximo commit."
            },
            {
                "question": "O que o comando 'git commit -m \"mensagem\"' faz?",
                "options": [
                    "Baixa as alterações do repositório remoto.",
                    "Cria um novo ramo (branch).",
                    "Salva as alterações na história local do repositório com uma mensagem descritiva.",
                    "Envia as alterações para o repositório remoto."
                ],
                "answer": 2,
                "explanation": "O comando git commit salva o estado atual do seu código (as alterações na área de staging) no histórico do repositório local. A flag -m permite adicionar a mensagem de forma rápida."
            },
            {
                "question": "Para que serve o comando 'git clone'?",
                "options": [
                    "Criar um novo repositório local.",
                    "Copiar um repositório remoto existente para o seu computador local.",
                    "Excluir um repositório.",
                    "Mudar o nome de um arquivo."
                ],
                "answer": 1,
                "explanation": "git clone é usado para fazer uma cópia de um repositório Git existente (geralmente remoto, como no GitHub) para o seu diretório local."
            },
            {
                "question": "Qual comando é usado para listar os branches no seu repositório local?",
                "options": [
                    "git status",
                    "git log",
                    "git branch",
                    "git checkout"
                ],
                "answer": 2,
                "explanation": "git branch lista todos os branches locais e mostra qual você está usando atualmente (geralmente com um asterisco *)."
            },
            {
                "question": "O que é um 'merge' no contexto do Git?",
                "options": [
                    "A ação de desfazer um commit.",
                    "O processo de combinar o histórico de desenvolvimento de dois branches em um só.",
                    "A criação de um novo commit vazio.",
                    "A exclusão de um arquivo modificado."
                ],
                "answer": 1,
                "explanation": "Merge (mesclagem) é o ato de integrar as alterações feitas em um branch de volta para outro branch (ex: da feature branch para a main branch)."
            },
            {
                "question": "Qual é a função do arquivo '.gitignore'?",
                "options": [
                    "Definir permissões de acesso ao repositório.",
                    "Listar os comandos Git mais utilizados.",
                    "Especificar arquivos e diretórios que o Git deve ignorar e não rastrear.",
                    "Armazenar credenciais de usuário do GitHub."
                ],
                "answer": 2,
                "explanation": "O arquivo .gitignore permite que você liste arquivos ou padrões de nomes de arquivos que não devem ser incluídos ou rastreados pelo Git, como arquivos de log, binários compilados ou variáveis de ambiente."
            },
            {
                "question": "Qual comando você usaria para baixar e integrar as mudanças do repositório remoto (fetch + merge)?",
                "options": [
                    "git push",
                    "git clone",
                    "git pull",
                    "git fetch"
                ],
                "answer": 2,
                "explanation": "O comando git pull é um atalho que executa git fetch (baixa as mudanças) e em seguida git merge (integra as mudanças) automaticamente."
            },
            {
                "question": "Se você acabou de fazer alterações em arquivos, qual é a ordem correta para salvar essas alterações permanentemente no histórico remoto do repositório?",
                "options": [
                    "git push -> git commit -> git add",
                    "git commit -> git add -> git push",
                    "git add -> git commit -> git push",
                    "git add -> git push -> git commit"
                ],
                "answer": 2,
                "explanation": "A ordem correta é: 1. git add (prepara as alterações), 2. git commit (salva as alterações localmente), 3. git push (envia as alterações locais para o remoto)."
            },
            {
                "question": "Como você muda para um branch existente chamado 'desenvolvimento'?",
                "options": [
                    "git change desenvolvimento",
                    "git switch desenvolvimento",
                    "git checkout desenvolvimento",
                    "git move desenvolvimento"
                ],
                "answer": 2,
                "explanation": "Tanto 'git checkout desenvolvimento' quanto 'git switch desenvolvimento' (o comando mais moderno para essa finalidade) mudam para o branch especificado. Como o 'git checkout' ainda é amplamente usado e aceito, consideraremos 'git checkout' ou 'git switch' (dependendo da versão do Git) como a resposta. No entanto, em muitos quizzes e ambientes mais antigos, 'git checkout' é a resposta esperada."
            }
        ]
    },
    {
        dia: "Sábado",
        tema: "Projeto Prático",
        tarefas: [
            "Desenvolver um sistema real",
            "Melhorar projeto já existente"
        ],
        quizzes: [
            {
                question: "Qual etapa vem primeiro no desenvolvimento?",
                options: [
                    "Codificação",
                    "Testes",
                    "Planejamento",
                    "Implantação"
                ],
                answer: 2,
                explanation: "O planejamento é a etapa inicial crucial antes de qualquer desenvolvimento."
            }
        ]
    },
    {
        dia: "Domingo",
        tema: "Revisão + Portfólio",
        tarefas: [
            "Revisar estudos da semana",
            "Atualizar portfólio e GitHub"
        ],
        quizzes: [
            {
                question: "Por que é importante atualizar o portfólio?",
                options: [
                    "Para mostrar evolução",
                    "Para impressionar recrutadores",
                    "Para documentar aprendizado",
                    "Todas as anteriores"
                ],
                answer: 3,
                explanation: "Um portfólio atualizado serve para todos esses propósitos e mais."
            }
        ]
    }
];

// Cria os elementos do cronograma
const container = document.getElementById("cronograma");

cronograma.forEach((dia, diaIndex) => {
    const div = document.createElement("div");
    div.className = `dia ${dia.dia.toLowerCase().split('-')[0]}`;

    div.innerHTML = `
                <h2>${dia.dia}</h2>
                <div class="tema">${dia.tema}</div>
                <ul>${dia.tarefas.map(t => `<li>${t}</li>`).join('')}</ul>
                
                <button class="quiz-btn">Testar Conhecimento (Quiz)</button>
                <div class="quiz-container" id="quiz-${diaIndex}">
                    <div id="quiz-content-${diaIndex}"></div>
                </div>
            `;

    container.appendChild(div);

    // Adiciona eventos para o quiz
    const quizBtn = div.querySelector('.quiz-btn');
    const quizContainer = div.querySelector('.quiz-container');
    const quizContent = div.querySelector(`#quiz-content-${diaIndex}`);

    let currentQuizIndex = 0;

    function renderQuiz() {
        const quiz = dia.quizzes[currentQuizIndex];

        quizContent.innerHTML = `
                    <div class="quiz-question">${quiz.question}</div>
                    <div class="quiz-options">
                        ${quiz.options.map((opt, i) => `
                            <label>
                                <input type="radio" name="quiz-${diaIndex}" value="${i}">
                                ${opt}
                            </label>
                        `).join('')}
                    </div>
                    <button class="quiz-submit">Enviar Resposta</button>
                    <div class="quiz-result" id="quiz-result-${diaIndex}"></div>
                    
                    ${dia.quizzes.length > 1 ? `
                    <div class="quiz-navigation">
                        <button class="quiz-prev" ${currentQuizIndex === 0 ? 'disabled' : ''}>Anterior</button>
                        <span>Questão ${currentQuizIndex + 1} de ${dia.quizzes.length}</span>
                        <button class="quiz-next" ${currentQuizIndex === dia.quizzes.length - 1 ? 'disabled' : ''}>Próxima</button>
                    </div>
                    ` : ''}
                `;

        const submitBtn = quizContent.querySelector('.quiz-submit');
        const resultDiv = quizContent.querySelector(`#quiz-result-${diaIndex}`);

        submitBtn.addEventListener('click', () => {
            const selectedOption = quizContent.querySelector(`input[name="quiz-${diaIndex}"]:checked`);

            if (!selectedOption) {
                resultDiv.textContent = "Por favor, selecione uma opção!";
                resultDiv.style.color = "#e74c3c";
                resultDiv.style.backgroundColor = "#fde8e8";
                resultDiv.style.display = "block";
                return;
            }

            const userAnswer = parseInt(selectedOption.value);
            const correctAnswer = quiz.answer;

            if (userAnswer === correctAnswer) {
                resultDiv.innerHTML = `✅ Correto! ${quiz.explanation}`;
                resultDiv.style.color = "#27ae60";
                resultDiv.style.backgroundColor = "#e8f8f0";
            } else {
                resultDiv.innerHTML = `❌ Incorreto. A resposta correta é: <strong>${quiz.options[correctAnswer]}</strong><br><br>${quiz.explanation}`;
                resultDiv.style.color = "#e74c3c";
                resultDiv.style.backgroundColor = "#fde8e8";
            }

            resultDiv.style.display = "block";
        });

        // Adiciona navegação entre quizzes se houver mais de um
        if (dia.quizzes.length > 1) {
            const prevBtn = quizContent.querySelector('.quiz-prev');
            const nextBtn = quizContent.querySelector('.quiz-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentQuizIndex > 0) {
                        currentQuizIndex--;
                        renderQuiz();
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentQuizIndex < dia.quizzes.length - 1) {
                        currentQuizIndex++;
                        renderQuiz();
                    }
                });
            }
        }
    }

    quizBtn.addEventListener('click', () => {
        currentQuizIndex = 0;
        renderQuiz();
        quizContainer.style.display = quizContainer.style.display === 'block' ? 'none' : 'block';
        quizBtn.textContent = quizContainer.style.display === 'block' ?
            'Ocultar Quiz' : 'Testar Conhecimento (Quiz)';
    });
});

// Atualiza o ano automaticamente
document.getElementById("ano").textContent = new Date().getFullYear();

// Notificação ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const day = now.getDay(); // 0 (Domingo) a 6 (Sábado)

    if (day >= 1 && day <= 5) { // Dias úteis
        setTimeout(() => {
            alert(`⚡️ Bom dia, Xavier! Hoje é ${cronograma[day - 1].dia} - Hora de estudar ${cronograma[day - 1].tema}!`);
        }, 1000);
    }
});
