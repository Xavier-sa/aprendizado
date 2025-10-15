
const levels = [
    // ===== HTML - 30 QUESTÕES =====
    { title: "HTML Básico", question: "Qual tag marca o início de um documento HTML?", options: ["<start>", "<doc>", "<html>", "<body>"], answerIndex: 2 },
    { title: "Tags de texto", question: "Qual tag cria um parágrafo?", options: ["<p>", "<para>", "<txt>", "<div>"], answerIndex: 0 },
    { title: "Listas", question: "Qual tag inicia uma lista não ordenada?", options: ["<ol>", "<ul>", "<li>", "<list>"], answerIndex: 1 },
    { title: "Links", question: "Qual atributo define o destino de um link?", options: ["href", "src", "target", "link"], answerIndex: 0 },
    { title: "Formulários", question: "Qual elemento envia dados ao servidor?", options: ["<input>", "<label>", "<form>", "<button>"], answerIndex: 2 },
    { title: "Imagens", question: "Qual atributo especifica a fonte de uma imagem?", options: ["href", "src", "link", "image"], answerIndex: 1 },
    { title: "Tabelas", question: "Qual tag define uma linha de tabela?", options: ["<td>", "<tr>", "<th>", "<table>"], answerIndex: 1 },
    { title: "Cabeçalhos", question: "Qual tag cria o maior cabeçalho?", options: ["<h6>", "<h3>", "<h1>", "<header>"], answerIndex: 2 },
    { title: "Divisões", question: "Qual tag é usada para criar divisões genéricas?", options: ["<div>", "<section>", "<span>", "<container>"], answerIndex: 0 },
    { title: "Ênfase", question: "Qual tag deixa o texto em itálico semanticamente?", options: ["<i>", "<em>", "<italic>", "<strong>"], answerIndex: 1 },
    { title: "Negrito", question: "Qual tag indica importância forte no texto?", options: ["<b>", "<bold>", "<strong>", "<emphasis>"], answerIndex: 2 },
    { title: "Quebras", question: "Qual tag insere uma quebra de linha?", options: ["<break>", "<br>", "<lb>", "<newline>"], answerIndex: 1 },
    { title: "Meta tags", question: "Qual atributo define a codificação de caracteres?", options: ["encoding", "charset", "type", "format"], answerIndex: 1 },
    { title: "Inputs", question: "Qual tipo de input cria um campo de senha?", options: ["type='pass'", "type='password'", "type='secret'", "type='hidden'"], answerIndex: 1 },
    { title: "Botões", question: "Qual atributo define o tipo de um botão?", options: ["action", "type", "kind", "role"], answerIndex: 1 },
    { title: "Textarea", question: "Qual tag cria uma área de texto multilinhas?", options: ["<input>", "<text>", "<textarea>", "<multiline>"], answerIndex: 2 },
    { title: "Select", question: "Qual tag cria uma lista suspensa?", options: ["<dropdown>", "<list>", "<select>", "<options>"], answerIndex: 2 },
    { title: "Âncoras", question: "Qual valor do atributo target abre link em nova aba?", options: ["_new", "_blank", "_tab", "_window"], answerIndex: 1 },
    { title: "Vídeo", question: "Qual tag incorpora vídeos na página?", options: ["<media>", "<movie>", "<video>", "<player>"], answerIndex: 2 },
    { title: "Áudio", question: "Qual tag incorpora áudio na página?", options: ["<sound>", "<music>", "<audio>", "<player>"], answerIndex: 2 },
    { title: "Semântica", question: "Qual tag define o conteúdo principal da página?", options: ["<content>", "<main>", "<primary>", "<body>"], answerIndex: 1 },
    { title: "Rodapé", question: "Qual tag define o rodapé de um documento?", options: ["<bottom>", "<footer>", "<end>", "<foot>"], answerIndex: 1 },
    { title: "Navegação", question: "Qual tag agrupa links de navegação?", options: ["<menu>", "<links>", "<nav>", "<navigation>"], answerIndex: 2 },
    { title: "Artigo", question: "Qual tag representa conteúdo independente?", options: ["<content>", "<article>", "<post>", "<section>"], answerIndex: 1 },
    { title: "Aside", question: "Qual tag define conteúdo lateral relacionado?", options: ["<side>", "<aside>", "<sidebar>", "<related>"], answerIndex: 1 },
    { title: "Citações", question: "Qual tag cria uma citação em bloco?", options: ["<quote>", "<cite>", "<blockquote>", "<q>"], answerIndex: 2 },
    { title: "Code", question: "Qual tag formata texto como código?", options: ["<code>", "<pre>", "<script>", "<program>"], answerIndex: 0 },
    { title: "Atributos globais", question: "Qual atributo define um identificador único?", options: ["class", "id", "name", "key"], answerIndex: 1 },
    { title: "Classes", question: "Qual atributo agrupa elementos para estilização?", options: ["group", "class", "style", "type"], answerIndex: 1 },
    { title: "Data attributes", question: "Qual prefixo é usado para atributos personalizados?", options: ["custom-", "x-", "data-", "attr-"], answerIndex: 2 },

    // ===== CSS - 45 QUESTÕES =====
    { title: "CSS Básico", question: "Qual propriedade CSS altera a cor do texto?", options: ["text-color", "font-color", "color", "text-style"], answerIndex: 2 },
    { title: "Seletores CSS", question: "Qual seletor CSS seleciona um elemento com id 'header'?", options: [".header", "#header", "*header", "header"], answerIndex: 1 },
    { title: "Box Model", question: "Qual propriedade CSS controla o espaço interno de um elemento?", options: ["margin", "padding", "spacing", "border"], answerIndex: 1 },
    { title: "Display", question: "Qual valor da propriedade display faz um elemento ocupar toda a largura?", options: ["inline", "block", "flex", "grid"], answerIndex: 1 },
    { title: "Posicionamento", question: "Qual valor de position permite posicionar um elemento livremente?", options: ["static", "relative", "absolute", "fixed"], answerIndex: 2 },
    { title: "Margens", question: "Qual propriedade define o espaço externo de um elemento?", options: ["padding", "margin", "spacing", "border"], answerIndex: 1 },
    { title: "Bordas", question: "Qual propriedade define a largura da borda?", options: ["border-size", "border-width", "border-thickness", "border-line"], answerIndex: 1 },
    { title: "Fontes", question: "Qual propriedade altera o tamanho da fonte?", options: ["text-size", "font-size", "size", "font-height"], answerIndex: 1 },
    { title: "Background", question: "Qual propriedade define a cor de fundo?", options: ["bg-color", "background-color", "color-bg", "fill"], answerIndex: 1 },
    { title: "Texto alinhado", question: "Qual propriedade alinha texto horizontalmente?", options: ["align", "text-align", "alignment", "justify"], answerIndex: 1 },
    { title: "Float", question: "Qual propriedade faz elementos flutuarem?", options: ["position", "float", "flow", "align"], answerIndex: 1 },
    { title: "Z-index", question: "Qual propriedade controla a ordem de sobreposição?", options: ["layer", "z-index", "order", "stack"], answerIndex: 1 },
    { title: "Opacity", question: "Qual propriedade controla a transparência?", options: ["transparency", "opacity", "alpha", "visible"], answerIndex: 1 },
    { title: "Width", question: "Qual propriedade define a largura de um elemento?", options: ["size", "width", "wide", "w"], answerIndex: 1 },
    { title: "Height", question: "Qual propriedade define a altura de um elemento?", options: ["size", "tall", "height", "h"], answerIndex: 2 },
    { title: "Flexbox", question: "Qual valor de display ativa o Flexbox?", options: ["flexbox", "flex", "flexible", "box"], answerIndex: 1 },
    { title: "Flex Direction", question: "Qual propriedade define a direção dos itens flex?", options: ["direction", "flex-direction", "flex-way", "orientation"], answerIndex: 1 },
    { title: "Justify Content", question: "Qual propriedade alinha itens no eixo principal do flex?", options: ["align-items", "justify-content", "flex-align", "content-align"], answerIndex: 1 },
    { title: "Align Items", question: "Qual propriedade alinha itens no eixo transversal do flex?", options: ["justify-items", "align-items", "flex-align", "cross-align"], answerIndex: 1 },
    { title: "Grid", question: "Qual valor de display ativa o CSS Grid?", options: ["grid", "table", "gridbox", "layout"], answerIndex: 0 },
    { title: "Grid Columns", question: "Qual propriedade define colunas em um grid?", options: ["columns", "grid-columns", "grid-template-columns", "col-template"], answerIndex: 2 },
    { title: "Grid Gap", question: "Qual propriedade define o espaçamento entre células do grid?", options: ["spacing", "grid-spacing", "gap", "grid-gap"], answerIndex: 3 },
    { title: "Overflow", question: "Qual propriedade controla o comportamento de conteúdo excedente?", options: ["excess", "overflow", "exceed", "extra"], answerIndex: 1 },
    { title: "Cursor", question: "Qual propriedade muda o tipo de cursor?", options: ["mouse", "pointer", "cursor", "icon"], answerIndex: 2 },
    { title: "Transform", question: "Qual propriedade aplica transformações 2D/3D?", options: ["transform", "transition", "animate", "modify"], answerIndex: 0 },
    { title: "Transition", question: "Qual propriedade cria transições suaves?", options: ["animate", "transition", "smooth", "ease"], answerIndex: 1 },
    { title: "Animation", question: "Qual propriedade define animações CSS?", options: ["animate", "animation", "motion", "keyframe"], answerIndex: 1 },
    { title: "Border Radius", question: "Qual propriedade arredonda cantos?", options: ["corner", "radius", "border-radius", "round"], answerIndex: 2 },
    { title: "Box Shadow", question: "Qual propriedade adiciona sombra a elementos?", options: ["shadow", "box-shadow", "element-shadow", "drop-shadow"], answerIndex: 1 },
    { title: "Text Shadow", question: "Qual propriedade adiciona sombra ao texto?", options: ["shadow", "text-shadow", "font-shadow", "letter-shadow"], answerIndex: 1 },
    { title: "Font Family", question: "Qual propriedade define a família da fonte?", options: ["font", "font-family", "typeface", "font-type"], answerIndex: 1 },
    { title: "Font Weight", question: "Qual propriedade define o peso da fonte?", options: ["font-weight", "font-bold", "weight", "thickness"], answerIndex: 0 },
    { title: "Line Height", question: "Qual propriedade define a altura da linha?", options: ["spacing", "line-height", "line-spacing", "height"], answerIndex: 1 },
    { title: "Letter Spacing", question: "Qual propriedade define o espaçamento entre letras?", options: ["letter-spacing", "char-spacing", "spacing", "text-spacing"], answerIndex: 0 },
    { title: "Text Transform", question: "Qual propriedade transforma texto em maiúsculas/minúsculas?", options: ["transform", "text-transform", "case", "text-case"], answerIndex: 1 },
    { title: "Text Decoration", question: "Qual propriedade adiciona sublinhado/riscado?", options: ["decoration", "text-decoration", "underline", "style"], answerIndex: 1 },
    { title: "List Style", question: "Qual propriedade define o estilo de marcadores de lista?", options: ["bullet", "list-style", "marker", "list-type"], answerIndex: 1 },
    { title: "Visibility", question: "Qual propriedade oculta elementos mantendo espaço?", options: ["display", "visibility", "hide", "show"], answerIndex: 1 },
    { title: "Object Fit", question: "Qual propriedade define como imagem se ajusta ao container?", options: ["fit", "image-fit", "object-fit", "scale"], answerIndex: 2 },
    { title: "Pseudo-classes", question: "Qual pseudo-classe aplica estilo ao passar o mouse?", options: [":hover", ":mouse", ":over", ":active"], answerIndex: 0 },
    { title: "Pseudo-elementos", question: "Qual pseudo-elemento seleciona a primeira letra?", options: ["::first", "::letter", "::first-letter", "::start"], answerIndex: 2 },
    { title: "Media Queries", question: "Qual regra CSS cria design responsivo?", options: ["@responsive", "@media", "@screen", "@device"], answerIndex: 1 },
    { title: "Calc", question: "Qual função CSS permite cálculos?", options: ["calculate()", "math()", "calc()", "compute()"], answerIndex: 2 },
    { title: "Variables", question: "Como declarar uma variável CSS?", options: ["$var", "var()", "--var", "@var"], answerIndex: 2 },
    { title: "Import", question: "Qual regra importa outro arquivo CSS?", options: ["@include", "@import", "@load", "@link"], answerIndex: 1 },

    // ===== JAVASCRIPT - 40 QUESTÕES =====
    { title: "JavaScript Básico", question: "Como declarar uma variável em JavaScript?", options: ["variable x", "var x", "x = variable", "declare x"], answerIndex: 1 },
    { title: "Funções", question: "Como criar uma função em JavaScript?", options: ["function myFunc()", "def myFunc()", "func myFunc()", "create myFunc()"], answerIndex: 0 },
    { title: "Arrays", question: "Qual método adiciona um elemento ao final de um array?", options: ["push()", "append()", "add()", "insert()"], answerIndex: 0 },
    { title: "Eventos", question: "Qual evento é disparado quando um botão é clicado?", options: ["onhover", "onchange", "onclick", "onload"], answerIndex: 2 },
    { title: "DOM", question: "Qual método seleciona um elemento pelo ID?", options: ["getElementById()", "querySelector()", "getElementsByTagName()", "Todos os anteriores"], answerIndex: 0 },
    { title: "Let e Const", question: "Qual palavra-chave cria variável de escopo de bloco?", options: ["var", "let", "const", "block"], answerIndex: 1 },
    { title: "Constantes", question: "Qual palavra-chave define uma constante?", options: ["final", "const", "constant", "static"], answerIndex: 1 },
    { title: "Strings", question: "Como concatenar strings em JavaScript?", options: ["string1 + string2", "concat(s1, s2)", "s1.append(s2)", "join(s1, s2)"], answerIndex: 0 },
    { title: "Template Literals", question: "Qual símbolo delimita template literals?", options: ["'", "\"", "`", "$"], answerIndex: 2 },
    { title: "Arrow Functions", question: "Como criar uma arrow function?", options: ["=> { }", "-> { }", "function => { }", "lambda { }"], answerIndex: 0 },
    { title: "Array Map", question: "Qual método transforma cada elemento de um array?", options: ["forEach()", "map()", "transform()", "convert()"], answerIndex: 1 },
    { title: "Array Filter", question: "Qual método filtra elementos de um array?", options: ["filter()", "select()", "where()", "find()"], answerIndex: 0 },
    { title: "Array Reduce", question: "Qual método reduz array a um único valor?", options: ["sum()", "reduce()", "aggregate()", "combine()"], answerIndex: 1 },
    { title: "Array Find", question: "Qual método encontra o primeiro elemento que satisfaz condição?", options: ["search()", "find()", "locate()", "seek()"], answerIndex: 1 },
    { title: "Array Some", question: "Qual método verifica se algum elemento satisfaz condição?", options: ["some()", "any()", "exists()", "contains()"], answerIndex: 0 },
    { title: "Array Every", question: "Qual método verifica se todos os elementos satisfazem condição?", options: ["all()", "every()", "each()", "check()"], answerIndex: 1 },
    { title: "Objetos", question: "Como acessar propriedade de um objeto?", options: ["obj.prop", "obj->prop", "obj::prop", "obj[prop]"], answerIndex: 0 },
    { title: "Object Keys", question: "Qual método retorna as chaves de um objeto?", options: ["keys()", "Object.keys()", "getKeys()", "properties()"], answerIndex: 1 },
    { title: "Object Values", question: "Qual método retorna os valores de um objeto?", options: ["values()", "Object.values()", "getValues()", "data()"], answerIndex: 1 },
    { title: "Destructuring", question: "Como desestruturar um objeto?", options: ["{a, b} = obj", "[a, b] = obj", "(a, b) = obj", "a, b = obj"], answerIndex: 0 },
    { title: "Spread Operator", question: "Qual operador expande um array?", options: ["*", "...", ">>", "=>"], answerIndex: 1 },
    { title: "Rest Parameters", question: "Como capturar múltiplos argumentos em uma função?", options: ["*args", "...args", "args[]", "rest args"], answerIndex: 1 },
    { title: "Promises", question: "Qual método executa código após uma Promise resolver?", options: [".after()", ".then()", ".next()", ".done()"], answerIndex: 1 },
    { title: "Async/Await", question: "Qual palavra-chave espera uma Promise?", options: ["wait", "await", "pause", "hold"], answerIndex: 1 },
    { title: "Try/Catch", question: "Qual bloco captura erros em JavaScript?", options: ["catch", "except", "error", "trap"], answerIndex: 0 },
    { title: "Typeof", question: "Qual operador verifica o tipo de uma variável?", options: ["type", "typeof", "instanceof", "typeOf"], answerIndex: 1 },
    { title: "SetTimeout", question: "Qual função executa código após um delay?", options: ["wait()", "setTimeout()", "delay()", "pause()"], answerIndex: 1 },
    { title: "SetInterval", question: "Qual função executa código repetidamente?", options: ["repeat()", "setInterval()", "loop()", "schedule()"], answerIndex: 1 },
    { title: "JSON Parse", question: "Qual método converte JSON string em objeto?", options: ["parse()", "JSON.parse()", "toObject()", "decode()"], answerIndex: 1 },
    { title: "JSON Stringify", question: "Qual método converte objeto em JSON string?", options: ["toString()", "JSON.stringify()", "toJSON()", "encode()"], answerIndex: 1 },
    { title: "LocalStorage", question: "Como salvar dados no localStorage?", options: ["save()", "setItem()", "store()", "put()"], answerIndex: 1 },
    { title: "Math Random", question: "Como gerar número aleatório entre 0 e 1?", options: ["random()", "Math.random()", "rand()", "Random()"], answerIndex: 1 },
    { title: "Math Floor", question: "Como arredondar para baixo?", options: ["round()", "floor()", "Math.floor()", "down()"], answerIndex: 2 },
    { title: "String Length", question: "Como obter o comprimento de uma string?", options: ["str.size", "str.length", "len(str)", "str.count"], answerIndex: 1 },
    { title: "String Slice", question: "Como extrair parte de uma string?", options: ["str.cut()", "str.slice()", "str.substring()", "Ambas B e C"], answerIndex: 3 },
    { title: "String Split", question: "Como dividir uma string em array?", options: ["str.divide()", "str.split()", "str.explode()", "str.toArray()"], answerIndex: 1 },
    { title: "Array Join", question: "Como juntar elementos de array em string?", options: ["arr.join()", "arr.combine()", "arr.merge()", "arr.toString()"], answerIndex: 0 },
    { title: "Console Log", question: "Como exibir no console?", options: ["print()", "console.log()", "echo()", "output()"], answerIndex: 1 },
    { title: "Query Selector", question: "Como selecionar elemento com seletor CSS?", options: ["select()", "querySelector()", "find()", "get()"], answerIndex: 1 },
    { title: "AddEventListener", question: "Como adicionar um evento a um elemento?", options: ["on()", "addEventListener()", "bind()", "attach()"], answerIndex: 1 }
];

// Estado
let currentLevel = 0; // índice do nível atual (0 = primeiro)
const total = levels.length;
const progressText = document.getElementById('progressText');
const levelsBody = document.getElementById('levelsBody');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const messageArea = document.getElementById('messageArea');
const currentLevelLabel = document.getElementById('currentLevelLabel');

// Inicializar tabela
function renderLevels(passedUpTo = -1) {
    levelsBody.innerHTML = '';
    for (let i = 0; i < levels.length; i++) {
        const tr = document.createElement('tr');
        tr.className = i === currentLevel ? 'active' : (i < passedUpTo ? 'passed' : 'locked');
        const tdIndex = document.createElement('td');
        tdIndex.textContent = i + 1;
        const tdTitle = document.createElement('td');
        tdTitle.textContent = levels[i].title;
        const tdStatus = document.createElement('td');
        const span = document.createElement('span');
        span.className = 'status';
        if (i < passedUpTo) { span.textContent = 'Passed'; }
        else if (i === currentLevel) { span.textContent = 'Active'; }
        else { span.textContent = 'Locked'; span.style.opacity = 0.7 }
        tdStatus.appendChild(span);
        tr.appendChild(tdIndex); tr.appendChild(tdTitle); tr.appendChild(tdStatus);
        levelsBody.appendChild(tr);
    }
    progressText.textContent = `${Math.max(0, passedUpTo)} / ${total}`;
}

// Render pergunta do nível atual
function renderQuestion() {
    const lvl = levels[currentLevel];
    currentLevelLabel.textContent = `${currentLevel + 1} — ${lvl.title}`;
    questionText.textContent = lvl.question;
    optionsList.innerHTML = '';
    messageArea.textContent = '';
    lvl.options.forEach((opt, idx) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        div.textContent = opt;
        div.addEventListener('click', () => tryAnswer(idx));
        div.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') tryAnswer(idx) });
        optionsList.appendChild(div);
    });
}

// Tenta responder: se certo avança, se errado reseta tudo
function tryAnswer(selectedIdx) {
    const correct = levels[currentLevel].answerIndex === selectedIdx;
    if (correct) {
        // acerto
        messageArea.style.color = '';
        messageArea.textContent = `✔️ Correto! Você passou do nível ${currentLevel + 1}.`;
        currentLevel++;
        if (currentLevel >= total) {
            // terminou todos
            renderLevels(total);
            questionText.textContent = "Parabéns! Você completou todos os níveis 👏";
            optionsList.innerHTML = '';
            currentLevelLabel.textContent = 'FINALIZADO';
            progressText.textContent = `${total} / ${total}`;
            // opcional: tocar som ou mostrar animação (não incluído)
        } else {
            // avança ao próximo nível após uma breve pausa
            renderLevels(currentLevel); // marca os anteriores como passed
            setTimeout(() => {
                renderQuestion();
            }, 600);
        }
    } else {
        // erro -> reset total
        messageArea.style.color = 'var(--danger)';
        messageArea.textContent = `❌ Errado. Voltando ao início (Nível 1).`;
        // Animação pequena: piscar os níveis
        flashReset();
        setTimeout(() => resetProgress(), 700);
    }
}

function resetProgress() {
    currentLevel = 0;
    renderLevels(0);
    renderQuestion();
}

function flashReset() {
    // efeito visual rápido: marcar nada and then back
    renderLevels(0);
}

// Botões
document.getElementById('btnReset').addEventListener('click', () => {
    if (confirm('Deseja realmente resetar o progresso?')) resetProgress();
});
document.getElementById('btnSkip').addEventListener('click', () => {
    // Pular para o próximo (usar com cuidado) — não recomendado, mas útil para teste
    if (currentLevel < total - 1) {
        currentLevel++;
        renderLevels(currentLevel);
        renderQuestion();
    } else {
        currentLevel = total;
        renderLevels(total);
        renderQuestion();
    }
});

// Inicialização
function init() {
    // se quiser persistência, pode usar localStorage -> por simplicidade não usamos aqui
    renderLevels(0);
    renderQuestion();
}

init();
