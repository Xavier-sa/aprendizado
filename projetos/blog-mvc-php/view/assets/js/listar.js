
// Dados dos artigos (isso pode vir de um arquivo JSON ou uma API, caso necessário)
const artigos = [
    { id: 1, titulo: 'Primeiro Artigo', conteudo: 'Conteúdo do artigo 1' },
    { id: 2, titulo: 'Segundo Artigo', conteudo: 'Conteúdo do artigo 2' }
];

// Função para criar e adicionar artigos à lista
function adicionarArtigo(artigo) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${artigo.titulo}</strong>: ${artigo.conteudo}`;
    return li;
}

// Função para preencher a lista de artigos
function preencherListaArtigos() {
    const listaArtigos = document.getElementById('lista-artigos');
    artigos.forEach(artigo => {
        const li = adicionarArtigo(artigo);
        listaArtigos.appendChild(li);
    });
}

// Preencher a lista ao carregar a página
document.addEventListener('DOMContentLoaded', preencherListaArtigos);
