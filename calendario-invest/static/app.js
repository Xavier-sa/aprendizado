const estado = { meta: null, metas: [], bancos: [], numero: null, filtro: 'todos' };
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const grid = document.querySelector('#depositGrid');
const depositModal = document.querySelector('#depositModal');
const goalModal = document.querySelector('#goalModal');
const banksModal = document.querySelector('#banksModal');

async function api(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: opcoes.body ? { 'Content-Type': 'application/json', ...opcoes.headers } : opcoes.headers
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível concluir a operação.');
  return dados;
}

function mostrarToast(mensagem, erro = false) {
  const toast = document.querySelector('#toast');
  toast.textContent = mensagem;
  toast.classList.toggle('error', erro);
  toast.classList.add('visible');
  clearTimeout(mostrarToast.timer);
  mostrarToast.timer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

function aplicarDados(dados) {
  estado.meta = dados.meta_ativa;
  estado.metas = dados.metas;
  estado.bancos = dados.bancos;
  renderizar();
}

function renderizar() {
  const meta = estado.meta;
  if (!meta) return;
  document.querySelector('#tituloMeta').textContent = `${meta.nome} · ${moeda.format(meta.meta)}`;
  document.querySelector('#totalDepositado').textContent = moeda.format(meta.total);
  document.querySelector('#restante').textContent = moeda.format(meta.restante);
  document.querySelector('#concluidos').textContent = `${meta.concluido} / ${meta.quantidade}`;
  const percentual = Math.min(100, (meta.total / meta.meta) * 100);
  document.querySelector('#progressBar').style.width = `${percentual}%`;
  document.querySelector('.progress-track').setAttribute('aria-label', `${percentual.toFixed(1)}% da meta`);
  renderizarMetas();
  renderizarBancos();
  montarTabela();
}

function renderizarMetas() {
  const tabs = document.querySelector('#goalTabs');
  tabs.replaceChildren(...estado.metas.map((meta) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = `goal-tab${meta.id === estado.meta.id ? ' active' : ''}`;
    botao.setAttribute('aria-pressed', meta.id === estado.meta.id);
    botao.innerHTML = '<span></span><small></small>';
    botao.firstElementChild.textContent = meta.nome;
    botao.lastElementChild.textContent = `${Math.round((meta.total / meta.meta) * 100)}%`;
    botao.addEventListener('click', () => selecionarMeta(meta.id));
    return botao;
  }));
}

function renderizarBancos() {
  const select = document.querySelector('#banco');
  select.replaceChildren(new Option('Selecione um banco', ''), ...estado.bancos.map((banco) => new Option(banco.nome, banco.id)));
  const lista = document.querySelector('#bankList');
  lista.replaceChildren(...estado.bancos.map((banco) => {
    const item = document.createElement('div');
    item.className = 'bank-item';
    const inicial = banco.nome.trim().charAt(0).toUpperCase();
    item.innerHTML = '<span class="bank-avatar"></span><strong></strong><span class="bank-actions"><button class="rename-bank" type="button" title="Renomear">&#9998;</button><button class="remove-bank" type="button" title="Remover">&times;</button></span>';
    item.querySelector('.bank-avatar').textContent = inicial;
    item.querySelector('strong').textContent = banco.nome;
    item.querySelector('.rename-bank').setAttribute('aria-label', `Renomear ${banco.nome}`);
    item.querySelector('.remove-bank').setAttribute('aria-label', `Remover ${banco.nome}`);
    item.querySelector('.rename-bank').addEventListener('click', () => renomearBanco(banco));
    item.querySelector('.remove-bank').addEventListener('click', () => removerBanco(banco));
    return item;
  }));
  if (!estado.bancos.length) {
    const vazio = document.createElement('p');
    vazio.className = 'list-empty';
    vazio.textContent = 'Nenhum banco cadastrado ainda.';
    lista.appendChild(vazio);
  }
  document.querySelector('#emptyBanks').hidden = estado.bancos.length > 0;
  grid.hidden = estado.bancos.length === 0;
}

function montarTabela() {
  grid.replaceChildren();
  for (let numero = 1; numero <= estado.meta.quantidade; numero += 1) {
    const item = estado.meta.depositos[numero];
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = `deposit${item ? ' completed' : ''}`;
    botao.dataset.numero = numero;
    botao.innerHTML = `<span>${numero}</span><small>${moeda.format(numero).replace(',00', '')}</small>`;
    if (item) {
      botao.title = `${item.metodo} · ${moeda.format(item.valor)} · ${item.banco}`;
      botao.setAttribute('aria-label', `Depósito ${numero} concluído em ${item.banco}. Editar.`);
    }
    botao.hidden = estado.filtro === 'pendentes' ? Boolean(item) : estado.filtro === 'concluidos' ? !item : false;
    botao.addEventListener('click', () => abrirDeposito(numero));
    grid.appendChild(botao);
  }
}

async function selecionarMeta(metaId) {
  if (metaId === estado.meta.id) return;
  try { aplicarDados(await api(`/api/metas/${metaId}/selecionar`, { method: 'POST' })); }
  catch (erro) { mostrarToast(erro.message, true); }
}

function dataLocal() {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  return agora.toISOString().slice(0, 10);
}

function abrirDeposito(numero) {
  if (!estado.bancos.length) return banksModal.showModal();
  estado.numero = numero;
  const item = estado.meta.depositos[numero];
  document.querySelector('#modalTitle').textContent = `Número ${numero} · ${moeda.format(numero)}`;
  document.querySelector('#valor').value = item?.valor ?? numero;
  document.querySelector('#banco').value = item?.banco_id || '';
  document.querySelector('#metodo').value = item?.metodo || 'Pix';
  document.querySelector('#data').value = item?.data || dataLocal();
  document.querySelector('#removeDeposit').hidden = !item;
  depositModal.showModal();
}

document.querySelector('#depositForm').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    const payload = Object.fromEntries(new FormData(evento.currentTarget));
    aplicarDados(await api(`/api/metas/${estado.meta.id}/depositos/${estado.numero}`, { method: 'POST', body: JSON.stringify(payload) }));
    depositModal.close();
    mostrarToast('Depósito salvo com sucesso.');
  } catch (erro) { mostrarToast(erro.message, true); }
});

document.querySelector('#removeDeposit').addEventListener('click', async () => {
  if (!confirm('Remover este depósito?')) return;
  try {
    aplicarDados(await api(`/api/metas/${estado.meta.id}/depositos/${estado.numero}`, { method: 'DELETE' }));
    depositModal.close();
    mostrarToast('Depósito removido.');
  } catch (erro) { mostrarToast(erro.message, true); }
});

function abrirMeta(nova) {
  document.querySelector('#goalForm').reset();
  document.querySelector('#goalEyebrow').textContent = nova ? 'Nova meta' : 'Editar meta';
  document.querySelector('#goalModalTitle').textContent = nova ? 'Crie um objetivo' : estado.meta.nome;
  document.querySelector('#goalName').value = nova ? `Meta ${estado.metas.length + 1}` : estado.meta.nome;
  document.querySelector('#goalValue').value = nova ? '' : estado.meta.meta;
  document.querySelector('#removeGoal').hidden = nova || estado.metas.length === 1;
  goalModal.dataset.mode = nova ? 'create' : 'edit';
  atualizarPreviaMeta();
  goalModal.showModal();
  document.querySelector('#goalName').focus();
}

function atualizarPreviaMeta() {
  const valor = Number(document.querySelector('#goalValue').value);
  const preview = document.querySelector('#calculationPreview');
  if (valor <= 0) return preview.textContent = '';
  const total = Math.ceil((Math.sqrt(1 + 8 * valor) - 1) / 2);
  preview.textContent = `${total} depósitos · tabela cobre ${moeda.format(total * (total + 1) / 2)}`;
}

document.querySelector('#goalForm').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const payload = Object.fromEntries(new FormData(evento.currentTarget));
  const criando = goalModal.dataset.mode === 'create';
  try {
    aplicarDados(await api(criando ? '/api/metas' : `/api/metas/${estado.meta.id}`, {
      method: criando ? 'POST' : 'PUT', body: JSON.stringify(payload)
    }));
    goalModal.close();
    mostrarToast(criando ? 'Nova meta criada.' : 'Meta atualizada.');
  } catch (erro) { mostrarToast(erro.message, true); }
});

document.querySelector('#removeGoal').addEventListener('click', async () => {
  if (!confirm(`Excluir a meta "${estado.meta.nome}" e todos os seus depósitos?`)) return;
  try {
    aplicarDados(await api(`/api/metas/${estado.meta.id}`, { method: 'DELETE' }));
    goalModal.close();
    mostrarToast('Meta excluída.');
  } catch (erro) { mostrarToast(erro.message, true); }
});

document.querySelector('#bankForm').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    aplicarDados(await api('/api/bancos', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(evento.currentTarget))) }));
    evento.currentTarget.reset();
    document.querySelector('#bankName').focus();
    mostrarToast('Banco cadastrado.');
  } catch (erro) { mostrarToast(erro.message, true); }
});

async function removerBanco(banco) {
  if (!confirm(`Remover o banco "${banco.nome}"?`)) return;
  try { aplicarDados(await api(`/api/bancos/${banco.id}`, { method: 'DELETE' })); mostrarToast('Banco removido.'); }
  catch (erro) { mostrarToast(erro.message, true); }
}

async function renomearBanco(banco) {
  const nome = prompt('Novo nome do banco:', banco.nome)?.trim();
  if (!nome || nome === banco.nome) return;
  try {
    aplicarDados(await api(`/api/bancos/${banco.id}`, {
      method: 'PUT', body: JSON.stringify({ nome })
    }));
    mostrarToast('Banco renomeado.');
  } catch (erro) { mostrarToast(erro.message, true); }
}

document.querySelector('#newGoal').addEventListener('click', () => abrirMeta(true));
document.querySelector('#editGoal').addEventListener('click', () => abrirMeta(false));
document.querySelector('#manageBanks').addEventListener('click', () => banksModal.showModal());
document.querySelectorAll('[data-open-banks]').forEach((botao) => botao.addEventListener('click', () => banksModal.showModal()));
document.querySelector('#goalValue').addEventListener('input', atualizarPreviaMeta);
document.querySelectorAll('[data-close]').forEach((botao) => botao.addEventListener('click', () => botao.closest('dialog').close()));
document.querySelectorAll('dialog').forEach((dialogo) => dialogo.addEventListener('click', (evento) => {
  if (evento.target === dialogo) dialogo.close();
}));
document.querySelectorAll('.filter').forEach((botao) => botao.addEventListener('click', () => {
  estado.filtro = botao.dataset.filter;
  document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === botao));
  montarTabela();
}));
document.querySelector('#themeButton').addEventListener('click', () => {
  document.body.classList.toggle('soft-theme');
  localStorage.setItem('tema-claro', document.body.classList.contains('soft-theme'));
});
if (localStorage.getItem('tema-claro') === 'true') document.body.classList.add('soft-theme');

api('/api/dados').then(aplicarDados).catch((erro) => mostrarToast(erro.message, true));
