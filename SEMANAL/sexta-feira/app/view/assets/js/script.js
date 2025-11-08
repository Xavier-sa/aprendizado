document.addEventListener('DOMContentLoaded', () => {
    fetch('../js/comandos.json')
        .then(response => response.json())
        .then(data => preencherTabela(data))
        .catch(error => console.error('Erro ao carregar comandos:', error));
});

function preencherTabela(comandos) {
    const tabela = document.getElementById('tabela-comandos');
    comandos.forEach(cmd => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${cmd.comando}</td>
            <td>${cmd.descricao}</td>
            <td>${cmd.exemplo}</td>
        `;
        tabela.appendChild(linha);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function lerComandos() {
    const linhas = document.querySelectorAll('#tabela-comandos tr');
    let texto = 'Lista de comandos Git. ';
    linhas.forEach(linha => {
        const cols = linha.querySelectorAll('td');
        texto += `Comando: ${cols[0].innerText}. Descrição: ${cols[1].innerText}. Exemplo: ${cols[2].innerText}. `;
    });

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
}
function destacarBotao(botaoSelecionado) {
    document.querySelectorAll('.btn-container button').forEach(btn => {
        btn.classList.remove('selecionado');
    });
    botaoSelecionado.classList.add('selecionado');
}
    
