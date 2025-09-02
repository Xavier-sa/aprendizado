<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Enum Explorer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #fff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
        }

        .container {
            max-width: 1000px;
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        header {
            text-align: center;
            margin-bottom: 2rem;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #6ab1ea;
        }

        .subtitle {
            color: #a8d1f2;
            margin-bottom: 1.5rem;
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .card {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 1.5rem;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .card.hearts {
            border: 2px solid #ff6b6b;
        }

        .card.diamonds {
            border: 2px solid #48dbfb;
        }

        .card.clubs {
            border: 2px solid #1dd1a1;
        }

        .card.spades {
            border: 2px solid #feca57;
        }

        .card-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .hearts .card-icon {
            color: #ff6b6b;
        }

        .diamonds .card-icon {
            color: #48dbfb;
        }

        .clubs .card-icon {
            color: #1dd1a1;
        }

        .spades .card-icon {
            color: #feca57;
        }

        .card-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        .output {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 1rem;
        }

        .output-title {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #6ab1ea;
        }

        .output-content {
            font-family: 'Courier New', Courier, monospace;
            background: rgba(0, 0, 0, 0.5);
            padding: 1rem;
            border-radius: 5px;
            min-height: 100px;
            white-space: pre-wrap;
        }

        .code-section {
            margin-top: 2rem;
        }

        .code-container {
            background: #2d3a4b;
            border-radius: 10px;
            overflow: hidden;
        }

        .code-header {
            background: #1a2436;
            padding: 0.75rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .code-title {
            font-weight: 600;
        }

        .copy-btn {
            background: #6ab1ea;
            border: none;
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .copy-btn:hover {
            background: #4a90c8;
        }

        pre {
            margin: 0;
            padding: 1.5rem;
            overflow-x: auto;
            color: #e2e8f0;
        }

        .code-comment {
            color: #a0aec0;
        }

        .code-keyword {
            color: #ff79c6;
        }

        .code-function {
            color: #50fa7b;
        }

        .code-variable {
            color: #f1fa8c;
        }

        .code-string {
            color: #f1fa8c;
        }

        footer {
            margin-top: 2rem;
            text-align: center;
            color: #a8d1f2;
        }

        @media (max-width: 768px) {
            .card-container {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 480px) {
            .card-container {
                grid-template-columns: 1fr;
            }

            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <header>
            <h1>PHP Enum Explorer</h1>
            <p class="subtitle">Demonstração interativa de Enums no PHP 8.1+</p>
        </header>

        <div class="card-container">
            <div class="card hearts" onclick="selectSuit('Hearts')">
                <div class="card-icon">♥</div>
                <div class="card-title">Hearts</div>
                <div>Corações</div>
            </div>

            <div class="card diamonds" onclick="selectSuit('Diamonds')">
                <div class="card-icon">♦</div>
                <div class="card-title">Diamonds</div>
                <div>Ouros</div>
            </div>

            <div class="card clubs" onclick="selectSuit('Clubs')">
                <div class="card-icon">♣</div>
                <div class="card-title">Clubs</div>
                <div>Paus</div>
            </div>

            <div class="card spades" onclick="selectSuit('Spades')">
                <div class="card-icon">♠</div>
                <div class="card-title">Spades</div>
                <div>Espadas</div>
            </div>
        </div>

        <div class="output">
            <div class="output-title">Saída do Enum:</div>
            <div class="output-content" id="output">Clique em um naipe para ver a saída</div>
        </div>

        <div class="code-section">
            <div class="code-container">
                <div class="code-header">
                    <div class="code-title">Código PHP</div>
                    <button class="copy-btn" onclick="copyCode()">Copiar Código</button>
                </div>
                <pre><code><span class="code-comment">// Define o enum Suit</span>
<span class="code-keyword">enum</span> <span class="code-variable">Suit</span>
{
    <span class="code-keyword">case</span> Hearts;
    <span class="code-keyword">case</span> Diamonds;
    <span class="code-keyword">case</span> Clubs;
    <span class="code-keyword">case</span> Spades;
}

<span class="code-comment">// Função que recebe um valor do tipo Suit</span>
<span class="code-keyword">function</span> <span class="code-function">do_stuff</span>(<span class="code-variable">Suit</span> <span class="code-variable">$s</span>)
{
    <span class="code-comment">// Imprime o nome do valor recebido</span>
    <span class="code-keyword">echo</span> <span class="code-string">"Você escolheu o naipe: "</span> . <span class="code-variable">$s</span>-><span class="code-variable">name</span> . <span class="code-variable">PHP_EOL</span>;
}

<span class="code-comment">// Teste com cada naipe</span>
<span class="code-function">do_stuff</span>(<span class="code-variable">Suit</span>::Hearts);
<span class="code-function">do_stuff</span>(<span class="code-variable">Suit</span>::Diamonds);
<span class="code-function">do_stuff</span>(<span class="code-variable">Suit</span>::Clubs);
<span class="code-function">do_stuff</span>(<span class="code-variable">Suit</span>::Spades);</code></pre>
            </div>
        </div>
    </div>

    <footer>
        <p>PHP Enum Explorer &copy; 2023 - Demonstração de Enums no PHP</p>
    </footer>

    <script>
        function selectSuit(suit) {
            const output = document.getElementById('output');
            output.textContent = `Você escolheu o naipe: ${suit}`;

            // Destaque visual do card selecionado
            document.querySelectorAll('.card').forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });

            const selectedCard = document.querySelector(`.card.${suit.toLowerCase()}`);
            selectedCard.style.transform = 'translateY(-5px)';
            selectedCard.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        }

        function copyCode() {
            const code = `// Define o enum Suit
enum Suit
{
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}

// Função que recebe um valor do tipo Suit
function do_stuff(Suit $s)
{
    // Imprime o nome do valor recebido
    echo "Você escolheu o naipe: " . $s->name . PHP_EOL;
}

// Teste com cada naipe
do_stuff(Suit::Hearts);
do_stuff(Suit::Diamonds);
do_stuff(Suit::Clubs);
do_stuff(Suit::Spades);`;

            navigator.clipboard.writeText(code).then(() => {
                const btn = document.querySelector('.copy-btn');
                btn.textContent = 'Copiado!';
                setTimeout(() => {
                    btn.textContent = 'Copiar Código';
                }, 2000);
            });
        }

        // Inicialização - seleciona o primeiro naipe por padrão
        document.addEventListener('DOMContentLoaded', () => {
            selectSuit('Hearts');
        });
    </script>
</body>

</html>