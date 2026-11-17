export const tracks = [
  { title: "Fundamentos absolutos", description: "Lógica, algoritmos, dados, decisões, repetições e funções.", lessons: 14, color: "#ef5b5b" },
  { title: "Ferramentas", description: "VS Code, terminal, Git, pacotes, JSON, debugging e logs.", lessons: 10, color: "#4d8df7" },
  { title: "Linguagens", description: "HTML, CSS, JavaScript, TypeScript, Python, PHP e SQL.", lessons: 28, color: "#31bf75" },
  { title: "POO e arquitetura", description: "Objetos, SOLID, MVC, composição e código sustentável.", lessons: 16, color: "#9b66d4" },
  { title: "Web moderna", description: "HTTP, APIs, Node.js, React, Next.js e autenticação.", lessons: 20, color: "#f59d2a" },
  { title: "Banco de dados", description: "Modelagem, SQL, relacionamentos, transações e ORM.", lessons: 15, color: "#24a9a1" },
  { title: "DevOps e segurança", description: "Linux, Docker, CI/CD, testes, OWASP e deploy.", lessons: 18, color: "#d9aa20" }
];

export const lessonSections = [
  { id: "objetivo", label: "Objetivo", html: `<h3>Objetivo da aula</h3><p>Ao final, você conseguirá explicar o que é programação, reconhecer um algoritmo e decompor um problema simples em instruções ordenadas.</p><div class="callout"><strong>Definição simples:</strong> programar é descrever, com clareza, os passos que uma máquina deve executar para alcançar um resultado.</div>` },
  { id: "conceito", label: "Conceito", html: `<h3>Do problema à solução</h3><p>Computadores são rápidos, mas não adivinham intenções. Um programa é um conjunto de instruções escritas em uma linguagem que o computador consegue interpretar ou transformar.</p><p><strong>Definição técnica:</strong> programação é o processo de projetar algoritmos e representá-los como código executável, considerando entradas, processamento, saídas e possíveis erros.</p><p>Você aprende isso para automatizar tarefas, analisar informações, criar produtos digitais e resolver problemas de forma reproduzível.</p>` },
  { id: "exemplo", label: "Exemplo", html: `<h3>Um algoritmo do cotidiano</h3><p>Antes de escolher uma linguagem, pense nos passos. Para calcular a média de duas notas:</p><pre class="code-block"><code>// Entrada
nota1 = 8
nota2 = 6

// Processamento
media = (nota1 + nota2) / 2

// Saída
mostrar media // resultado: 7</code></pre><p>Esse pseudocódigo não depende de JavaScript ou Python. Ele torna a lógica visível antes da sintaxe.</p>` },
  { id: "erros", label: "Erros comuns", html: `<h3>Erros comuns e boas práticas</h3><ul class="check-list"><li><strong>Pular direto para o código:</strong> escreva primeiro o problema, as entradas e a saída esperada.</li><li><strong>Instruções vagas:</strong> substitua “calcular tudo” por passos menores e verificáveis.</li><li><strong>Ignorar casos inesperados:</strong> pergunte o que acontece se uma nota estiver vazia ou fora do intervalo.</li><li><strong>Nomes sem significado:</strong> prefira <code>media</code> a <code>x</code>.</li></ul>` },
  { id: "pratica", label: "Prática", html: `<h3>Exercício guiado</h3><div class="exercise"><p><strong>Problema:</strong> informar se uma pessoa pode entrar em um evento para maiores de 18 anos.</p><ol><li>Receba a idade.</li><li>Compare a idade com 18.</li><li>Se for maior ou igual, mostre “entrada permitida”.</li><li>Caso contrário, mostre “entrada não permitida”.</li></ol></div><h3>Desafio independente</h3><div class="exercise"><p>Escreva em papel ou comentário um algoritmo que recebe o preço de um produto e um percentual de desconto, então mostra o valor final. Inclua uma verificação para desconto inválido.</p></div>` }
];

export const quiz = [
  { question: "O que melhor define um programa?", options: ["Um computador conectado", "Instruções organizadas para realizar uma tarefa", "Somente uma tela bonita", "Um arquivo obrigatoriamente online"], answer: 1, explanation: "Um programa reúne instruções que processam entradas para produzir resultados." },
  { question: "Qual etapa deve vir antes de escolher a sintaxe?", options: ["Publicar o sistema", "Comprar um servidor", "Compreender o problema e organizar os passos", "Adicionar animações"], answer: 2, explanation: "Entender o problema reduz retrabalho e ajuda a criar um algoritmo correto." },
  { question: "No exemplo da média, quais são as entradas?", options: ["As duas notas", "A média", "O comando mostrar", "A divisão"], answer: 0, explanation: "As notas entram no algoritmo; a média é a saída após o processamento." },
  { question: "Por que dividir um problema em passos menores?", options: ["Para usar mais arquivos", "Para evitar qualquer teste", "Para tornar a solução compreensível e verificável", "Para escolher uma cor"], answer: 2, explanation: "Passos menores facilitam implementação, teste, correção e comunicação." },
  { question: "Qual nome de variável comunica melhor sua intenção?", options: ["x", "a1", "mediaNotas", "valorQualquer"], answer: 2, explanation: "Nomes descritivos ajudam quem escreve, revisa e mantém o código." }
];

export const schedule = [
  ["Segunda-feira", "Fundamentos", "Lógica e algoritmos", "#ef5b5b"], ["Terça-feira", "JavaScript", "Funções, arrays e objetos", "#4d8df7"], ["Quarta-feira", "Banco de dados", "SQL e modelagem", "#31bf75"], ["Quinta-feira", "Web", "DOM, HTTP e APIs", "#f59d2a"], ["Sexta-feira", "Git e GitHub", "Versionamento e colaboração", "#9b66d4"], ["Sábado", "Projeto prático", "Construir e testar", "#24a9a1"], ["Domingo", "Revisão", "Revisar e planejar", "#d9aa20"]
];

const terms = [
  ["API", "Application Programming Interface", "Interface de programação que permite a comunicação entre sistemas.", "Um site consulta uma API de clima."],
  ["REST", "Representational State Transfer", "Estilo de arquitetura para recursos acessados pela web.", "GET /aulas retorna aulas."],
  ["HTTP", "Hypertext Transfer Protocol", "Protocolo de comunicação usado na web.", "O navegador envia uma requisição HTTP."],
  ["HTTPS", "HTTP Secure", "HTTP protegido por criptografia TLS.", "Sites seguros usam https://."],
  ["URL", "Uniform Resource Locator", "Endereço completo de um recurso.", "https://site.com/aulas/1"],
  ["URI", "Uniform Resource Identifier", "Identificador de um recurso, do qual URL é um tipo.", "/aulas/1 identifica uma aula."],
  ["DNS", "Domain Name System", "Traduz nomes de domínio para endereços IP.", "Localiza o servidor de wasxtech.com.br."],
  ["TCP", "Transmission Control Protocol", "Entrega dados de forma ordenada e confiável.", "HTTP pode trafegar sobre TCP."],
  ["IP", "Internet Protocol", "Identifica e encaminha dispositivos em redes.", "Um servidor possui endereço IP."],
  ["JSON", "JavaScript Object Notation", "Formato textual leve para dados estruturados.", "Uma API retorna {\"nome\":\"WX\"}."],
  ["XML", "Extensible Markup Language", "Formato de marcação para representar dados.", "Usado em feeds e integrações legadas."],
  ["JWT", "JSON Web Token", "Formato assinado para transmitir declarações entre partes.", "Uma API valida um token de acesso."],
  ["ORM", "Object-Relational Mapping", "Mapeia objetos do código para tabelas relacionais.", "Prisma consulta uma tabela por modelos."],
  ["CRUD", "Create, Read, Update, Delete", "Quatro operações básicas de dados.", "Criar, listar, editar e excluir uma aula."],
  ["SQL", "Structured Query Language", "Linguagem para bancos de dados relacionais.", "SELECT * FROM aulas."],
  ["NoSQL", "Not Only SQL", "Família de bancos não relacionais.", "Documentos podem ser armazenados no MongoDB."],
  ["PDO", "PHP Data Objects", "Interface PHP para acesso consistente a bancos.", "Prepared statements evitam concatenar SQL."],
  ["POO", "Programação Orientada a Objetos", "Organiza software em objetos com dados e comportamentos.", "Uma classe Aula possui título e concluir()."],
  ["MVC", "Model-View-Controller", "Separa dados, interface e controle.", "Controller coordena Model e View."],
  ["MVP", "Model-View-Presenter", "Padrão em que o Presenter coordena uma View passiva.", "O Presenter prepara dados para a tela."],
  ["DOM", "Document Object Model", "Representação em objetos de uma página HTML.", "JavaScript altera um título pelo DOM."],
  ["SPA", "Single-Page Application", "Aplicação que atualiza a tela sem recarregar páginas completas.", "Um painel React pode ser uma SPA."],
  ["SSR", "Server-Side Rendering", "HTML renderizado no servidor a cada requisição.", "A página chega pronta ao navegador."],
  ["SSG", "Static Site Generation", "HTML gerado antes das visitas.", "Documentação é criada durante o build."],
  ["CSR", "Client-Side Rendering", "Interface renderizada principalmente no navegador.", "JavaScript monta a tela no cliente."],
  ["CI", "Continuous Integration", "Validação automática frequente do código.", "GitHub Actions executa testes em cada PR."],
  ["CD", "Continuous Delivery/Deployment", "Automação da entrega ou publicação.", "Uma versão validada segue para deploy."],
  ["CLI", "Command-Line Interface", "Interface operada por comandos de texto.", "git status é usado no terminal."],
  ["IDE", "Integrated Development Environment", "Ambiente com editor e ferramentas de desenvolvimento.", "VS Code funciona como editor extensível."],
  ["SDK", "Software Development Kit", "Conjunto de ferramentas para desenvolver para uma plataforma.", "Um SDK oferece biblioteca e documentação."],
  ["SSH", "Secure Shell", "Protocolo seguro para acesso remoto.", "Git pode autenticar por chave SSH."],
  ["TLS", "Transport Layer Security", "Protege dados em trânsito com criptografia.", "TLS torna o HTTP em HTTPS."],
  ["CORS", "Cross-Origin Resource Sharing", "Política que controla acessos entre origens no navegador.", "Uma API autoriza um domínio específico."],
  ["CSRF", "Cross-Site Request Forgery", "Ataque que induz uma ação autenticada indesejada.", "Tokens ajudam a validar formulários."],
  ["XSS", "Cross-Site Scripting", "Injeção de script em conteúdo exibido a usuários.", "Escapar conteúdo reduz o risco."],
  ["RBAC", "Role-Based Access Control", "Permissões associadas a papéis.", "Mentor e aluno possuem acessos diferentes."],
  ["OWASP", "Open Worldwide Application Security Project", "Comunidade e referência de segurança de aplicações.", "OWASP Top 10 lista riscos frequentes."]
];
export const glossary = terms.map(([acronym, name, description, example]) => ({ acronym, name, description, example, related: "Fundamentos de tecnologia" }));
