const busca = document.querySelector('#busca-despesa');
const filtro = document.querySelector('#filtro-despesa');
const resultado = document.querySelector('#caderno-resultado');
const despesas = [...document.querySelectorAll('.caderno-item')];
const normalizar = (texto) => texto.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/\p{M}/gu, '');

function filtrarDespesas() {
  const termo = normalizar(busca.value.trim());
  let visiveis = 0;
  for (const despesa of despesas) {
    const nome = normalizar(despesa.querySelector('.caderno-nome').textContent);
    despesa.hidden = !nome.includes(termo) || Boolean(filtro.value && filtro.value !== despesa.dataset.situacao);
    if (!despesa.hidden) visiveis += 1;
  }
  resultado.hidden = !termo && !filtro.value;
  resultado.textContent = visiveis ? `${visiveis} de ${despesas.length} despesas` : 'Nenhuma despesa encontrada.';
}

document.querySelector('.caderno-filtros').hidden = false;
busca.addEventListener('input', filtrarDespesas);
filtro.addEventListener('change', filtrarDespesas);

const dialogo = document.querySelector('#confirmar-pagamento');
const valorConfirmado = document.querySelector('#pagamento-confirmado');
const erroPagamento = document.querySelector('#pagamento-erro');
let formularioPagamento;

for (const formulario of document.querySelectorAll('.caderno-form')) {
  const painel = formulario.closest('details');
  const cancelar = formulario.querySelector('.caderno-cancelar');
  cancelar.hidden = false;
  cancelar.addEventListener('click', () => {
    formulario.reset();
    formulario.querySelector('details').open = false;
    painel.open = false;
    painel.querySelector('summary').focus();
  });

  const pagar = formulario.querySelector('.caderno-pagar');
  if (!pagar || !dialogo.showModal) continue;
  pagar.hidden = false;
  pagar.addEventListener('click', () => {
    if (!formulario.reportValidity()) return;
    formularioPagamento = formulario;
    document.querySelector('#despesa-confirmada').textContent = formulario.elements.nome.value;
    valorConfirmado.value = formulario.elements.valor_pago.value || formulario.elements.valor.value;
    erroPagamento.hidden = true;
    dialogo.showModal();
  });
}

document.querySelector('#fechar-pagamento').addEventListener('click', () => dialogo.close());
dialogo.querySelector('form').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valor = valorConfirmado.value.trim().replace(/\.(?=\d{3}(?:[.,]|$))/g, '');
  if (!/^[0-9]{1,10}(?:[,.][0-9]{1,2})?$/.test(valor) || Number(valor.replace(',', '.')) <= 0) {
    erroPagamento.hidden = false;
    valorConfirmado.focus();
    return;
  }
  formularioPagamento.elements.valor_pago.value = valor;
  dialogo.close();
  formularioPagamento.requestSubmit();
});
