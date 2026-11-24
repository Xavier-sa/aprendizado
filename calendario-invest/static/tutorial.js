const etapas = Array.from(document.querySelectorAll('.tutorial-grade a'));
const modal = document.querySelector('#tutorial-modal');
const anterior = document.querySelector('#tutorial-anterior');
const proximo = document.querySelector('#tutorial-proximo');
const comecar = document.querySelector('#tutorial-comecar');
let etapaAtual = 0;
let origem;

const carrossel = document.querySelector('#tutorial-capturas');
const rolarAnterior = document.querySelector('#tutorial-rolar-anterior');
const rolarProximo = document.querySelector('#tutorial-rolar-proximo');
const faixa = document.querySelector('#tutorial-faixa');
const progresso = document.querySelector('#tutorial-progresso');
document.querySelector('#tutorial-controles').hidden = false;
document.querySelector('#tutorial-status').hidden = false;

function atualizarControles() {
  rolarAnterior.disabled = carrossel.scrollLeft < 2;
  rolarProximo.disabled = carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 2;
  const limite = carrossel.getBoundingClientRect();
  const visiveis = etapas.filter((etapa) => {
    const cartao = etapa.getBoundingClientRect();
    return cartao.left >= limite.left - 2 && cartao.right <= limite.right + 2;
  });
  if (!visiveis.length) return;
  const inicio = etapas.indexOf(visiveis[0]) + 1;
  const fim = inicio + visiveis.length - 1;
  faixa.textContent = inicio === fim ? `Etapa ${inicio} de ${etapas.length}` : `Etapas ${inicio} a ${fim} de ${etapas.length}`;
  progresso.value = fim;
}

function rolarEtapa(sentido) {
  const largura = etapas[0].closest('li').getBoundingClientRect().width;
  const espaco = parseFloat(getComputedStyle(carrossel).columnGap);
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  carrossel.scrollBy({ left: sentido * (largura + espaco), behavior });
}

rolarAnterior.addEventListener('click', () => rolarEtapa(-1));
rolarProximo.addEventListener('click', () => rolarEtapa(1));
carrossel.addEventListener('scroll', atualizarControles, { passive: true });
window.addEventListener('resize', atualizarControles);
atualizarControles();

function mostrarEtapa(indice) {
  etapaAtual = indice;
  const etapa = etapas[indice];
  const titulo = etapa.querySelector('.tutorial-cartao-titulo').textContent;
  document.querySelector('#tutorial-titulo').textContent = titulo;
  document.querySelector('#tutorial-instrucao').textContent = etapa.dataset.instrucao;
  document.querySelector('#tutorial-contador').textContent = `Etapa ${indice + 1} de ${etapas.length}`;
  const imagem = document.querySelector('#tutorial-imagem');
  imagem.src = etapa.href;
  imagem.alt = `Captura de tela da etapa: ${titulo}`;
  anterior.disabled = indice === 0;
  proximo.hidden = indice === etapas.length - 1;
  comecar.hidden = !proximo.hidden;
}

etapas.forEach((etapa, indice) => {
  etapa.addEventListener('click', (evento) => {
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey || !modal.showModal) return;
    evento.preventDefault();
    origem = etapa;
    mostrarEtapa(indice);
    modal.showModal();
  });
});
anterior.addEventListener('click', () => {
  mostrarEtapa(etapaAtual - 1);
  if (anterior.disabled) proximo.focus();
});
proximo.addEventListener('click', () => {
  mostrarEtapa(etapaAtual + 1);
  if (proximo.hidden) comecar.focus();
});
modal.addEventListener('close', () => origem?.focus());
