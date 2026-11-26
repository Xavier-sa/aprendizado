const etapasArvore = [
  'Semente', 'Germinação', 'Pequena árvore', 'Crescimento dos galhos',
  'Desenvolvimento da copa', 'Frutificação', 'Árvore completa'
];
const svgArvore = 'http://www.w3.org/2000/svg';

function calcularArvore(meta) {
  const proporcao = meta.meta > 0 ? Math.max(0, Math.min(1, meta.total / meta.meta)) : 0;
  const percentual = proporcao === 1 ? 100 : Math.floor(proporcao * 100);
  const depositos = Object.keys(meta.depositos || {}).sort((a, b) => Number(a) - Number(b));
  const etapa = proporcao === 0 ? 0 : percentual <= 10 ? 1 : percentual <= 30 ? 2
    : percentual <= 50 ? 3 : percentual <= 75 ? 4 : percentual < 100 ? 5 : 6;
  return { proporcao, percentual, depositos, etapa, completa: proporcao === 1 };
}

function inserirEnfeite(grupo, tipo, atributos) {
  const elemento = document.createElementNS(svgArvore, tipo);
  for (const [nome, valor] of Object.entries(atributos)) elemento.setAttribute(nome, valor);
  grupo.append(elemento);
  return elemento;
}

function atualizarArvore(painel, meta, moeda) {
  painel.hidden = !meta;
  if (!meta) return;
  const dados = calcularArvore(meta);
  const mesmaMeta = painel.dataset.metaId === String(meta.id);
  const celebrar = mesmaMeta && painel.dataset.completa === 'false' && dados.completa;
  painel.dataset.metaId = meta.id;
  painel.dataset.completa = String(dados.completa);
  painel.dataset.etapa = dados.etapa;
  painel.style.setProperty('--crescimento', dados.etapa ? 0.24 + 0.76 * dados.proporcao : 0.01);
  painel.querySelector('[data-arvore-semente]').toggleAttribute('hidden', dados.etapa !== 0);
  const etapa = painel.querySelector('[data-arvore-etapa]');
  if (etapa.textContent !== etapasArvore[dados.etapa]) etapa.textContent = etapasArvore[dados.etapa];
  painel.querySelector('[data-arvore-total]').textContent = moeda.format(meta.total);
  painel.querySelector('[data-arvore-meta]').textContent = moeda.format(meta.meta);
  painel.querySelector('[data-arvore-depositos]').textContent = dados.depositos.length;
  painel.querySelector('[data-arvore-percentual]').textContent =
    dados.percentual === 0 && dados.proporcao > 0 ? '<1%' : dados.percentual + '%';

  const folhas = painel.querySelector('[data-arvore-folhas]');
  if (!mesmaMeta) folhas.replaceChildren();
  const chaves = new Set(dados.depositos);
  const existentes = new Map(Array.from(folhas.children, folha => [folha.dataset.deposito, folha]));
  for (const [chave, folha] of existentes) if (!chaves.has(chave)) folha.remove();
  const pontos = [[160, 49], [111, 73], [201, 64], [90, 109], [230, 97], [137, 98], [182, 106]];
  dados.depositos.forEach((chave, indice) => {
    if (existentes.has(chave)) return;
    const [x, y] = pontos[indice % pontos.length];
    const angulo = indice * 2.39996;
    const raio = indice === 0 ? 0 : 5 + (indice % 16);
    const folha = inserirEnfeite(folhas, 'ellipse', {
      cx: x + Math.cos(angulo) * raio, cy: y + Math.sin(angulo) * raio,
      rx: 8, ry: 4, class: 'arvore-folha'
    });
    folha.dataset.deposito = chave;
  });

  const frutos = painel.querySelector('[data-arvore-frutos]');
  const quantidade = dados.completa ? 7 : dados.etapa === 5 ? 3 : 0;
  while (frutos.children.length > quantidade) frutos.lastElementChild.remove();
  for (let i = frutos.children.length; i < quantidade; i++) {
    const [x, y] = pontos[i];
    inserirEnfeite(frutos, 'circle', { cx: x, cy: y + 10, r: 5, class: 'arvore-fruto' });
  }
  painel.classList.toggle('arvore-celebracao', (celebrar || painel.classList.contains('arvore-celebracao')) && dados.completa && mesmaMeta);
}

if (typeof module !== 'undefined') module.exports = { calcularArvore };
