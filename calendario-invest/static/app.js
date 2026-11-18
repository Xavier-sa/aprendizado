let { meta, quantidade } = window.APP_CONFIG;
const grid = document.querySelector('#depositGrid');
const modal = document.querySelector('#depositModal');
const form = document.querySelector('#depositForm');
let numeroAtual = null;
let depositos = {};

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function montarTabela() {
  grid.replaceChildren();
  for (let i = 1; i <= quantidade; i++) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'deposit';
  button.dataset.numero = i;
  button.innerHTML = `<span>${i}</span><small>R$ ${i}</small>`;
  button.addEventListener('click', () => abrirModal(i));
  grid.appendChild(button);
  }
}

montarTabela();

async function carregar() {
  try {
    const resposta = await fetch('/api/depositos');
    if (!resposta.ok) throw new Error();
    atualizar(await resposta.json());
  } catch {
    mostrarToast('Não foi possível carregar os depósitos.', true);
  }
}

function atualizar(dados) {
  const quantidadeMudou = quantidade !== dados.quantidade;
  meta = Number(dados.meta);
  quantidade = dados.quantidade;
  if (quantidadeMudou) montarTabela();
  const total = Number(dados.total || 0);
  const percentual = Math.min(100, (total / meta) * 100);
  depositos = dados.depositos;
  document.querySelector('#metaTitulo').textContent = moeda.format(meta);
  document.querySelector('#totalDepositado').textContent = moeda.format(total);
  document.querySelector('#restante').textContent = moeda.format(dados.restante ?? Math.max(0, meta - total));
  document.querySelector('#concluidos').textContent = `${dados.concluido} / ${quantidade}`;
  document.querySelector('#progressBar').style.width = `${percentual}%`;
  document.querySelector('#progressBar').parentElement.setAttribute('aria-label', `${percentual.toFixed(1)}% da meta`);

  document.querySelectorAll('.deposit').forEach((button) => {
    const item = depositos[button.dataset.numero];
    button.classList.toggle('completed', Boolean(item));
    if (item) button.title = `${item.metodo} — ${moeda.format(item.valor)} — ${item.banco}`;
  });
}

function calcularQuantidade(valor) {
  return Math.ceil((Math.sqrt(1 + 8 * valor) - 1) / 2);
}

function abrirModal(numero) {
  numeroAtual = numero;
  document.querySelector('#modalTitle').textContent = `Número ${numero} · R$ ${numero}`;
  document.querySelector('#valor').value = numero;
  document.querySelector('#data').value = new Date().toISOString().slice(0, 10);

  const item = depositos[numero];
  document.querySelector('#banco').value = item?.banco || '';
  document.querySelector('#metodo').value = item?.metodo || 'Pix';
  document.querySelector('#detalhes').value = item?.detalhes || '';
  document.querySelector('#data').value = item?.data || dataLocal();
  document.querySelector('#valor').value = item?.valor ?? numero;
  document.querySelector('#removeDeposit').hidden = !item;

  modal.showModal();
}

function dataLocal() {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  return agora.toISOString().slice(0, 10);
}

function mostrarToast(mensagem, erro = false) {
  const toast = document.querySelector('#toast');
  toast.textContent = mensagem;
  toast.classList.toggle('error', erro);
  toast.classList.add('visible');
  clearTimeout(mostrarToast.timer);
  mostrarToast.timer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

function fecharModal() {
  modal.close();
  form.reset();
}

document.querySelector('#closeModal').addEventListener('click', fecharModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) fecharModal();
});

document.querySelector('#metodo').addEventListener('change', (event) => {
  document.querySelector('#detailsLabel').firstChild.textContent =
    event.target.value === 'Pix' ? 'Chave Pix / dados ' : 'Agência / conta / dados ';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(form));
  const resposta = await fetch(`/api/depositos/${numeroAtual}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const dados = await resposta.json();
  if (!resposta.ok) return mostrarToast(dados.erro, true);
  atualizar(dados);
  fecharModal();
  mostrarToast('Depósito salvo com sucesso.');
});

document.querySelector('#removeDeposit').addEventListener('click', async () => {
  if (!confirm('Remover este depósito?')) return;
  const resposta = await fetch(`/api/depositos/${numeroAtual}`, { method: 'DELETE' });
  atualizar(await resposta.json());
  fecharModal();
  mostrarToast('Depósito removido.');
});

document.querySelector('#themeButton').addEventListener('click', () => {
  document.body.classList.toggle('soft-theme');
  localStorage.setItem('tema-claro', document.body.classList.contains('soft-theme'));
});

const goalModal = document.querySelector('#goalModal');
const goalInput = document.querySelector('#goalValue');
const goalPreview = document.querySelector('#calculationPreview');

function atualizarPreviaMeta() {
  const valor = Number(goalInput.value);
  if (valor <= 0) return goalPreview.textContent = '';
  const total = calcularQuantidade(valor);
  const soma = total * (total + 1) / 2;
  goalPreview.textContent = `${total} depósitos • tabela cobre ${moeda.format(soma)}`;
}

document.querySelector('#editGoal').addEventListener('click', () => {
  goalInput.value = meta;
  atualizarPreviaMeta();
  goalModal.showModal();
});
document.querySelector('#closeGoalModal').addEventListener('click', () => goalModal.close());
goalInput.addEventListener('input', atualizarPreviaMeta);
document.querySelector('#goalForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const resposta = await fetch('/api/meta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ meta: goalInput.value })
  });
  const dados = await resposta.json();
  if (!resposta.ok) return mostrarToast(dados.erro, true);
  atualizar(dados);
  goalModal.close();
  mostrarToast(`Meta atualizada: ${quantidade} depósitos necessários.`);
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.deposit').forEach(item => {
      const concluido = item.classList.contains('completed');
      item.hidden = button.dataset.filter === 'pendentes' ? concluido :
        button.dataset.filter === 'concluidos' ? !concluido : false;
    });
  });
});

if (localStorage.getItem('tema-claro') === 'true') document.body.classList.add('soft-theme');

carregar();
