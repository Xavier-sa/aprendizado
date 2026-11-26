const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calcularArvore } = require('../static/arvore-financeira.js');

test('respeita as etapas e só celebra no valor integral', () => {
  for (const [total, etapa] of [[0, 0], [.01, 1], [10, 1], [11, 2], [30, 2],
    [31, 3], [50, 3], [51, 4], [75, 4], [76, 5], [99.99, 5], [100, 6], [110, 6]]) {
    const arvore = calcularArvore({ meta: 100, total });
    assert.equal(arvore.etapa, etapa);
    assert.equal(arvore.completa, total >= 100);
  }
});

test('recalcula após exclusão e reutiliza o número do depósito', () => {
  const depositos = { 1: { valor: 1 }, 2: { valor: 2 } };
  const estado = () => calcularArvore({ meta: 3, depositos,
    total: Object.values(depositos).reduce((soma, item) => soma + item.valor, 0) });
  assert.deepEqual(estado().depositos, ['1', '2']);
  depositos[2] = { valor: 2 };
  assert.deepEqual(estado().depositos, ['1', '2']);
  delete depositos[2];
  assert.deepEqual(estado().depositos, ['1']);
  assert.equal(estado().completa, false);
});
