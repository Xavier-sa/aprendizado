import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:5000';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(base + '/entrar');
  await page.screenshot({ path: 'docs/IMAGENS/simulacao-acesso-anterior.png' });
  await page.goto(base);
  await page.getByRole('link', { name: 'Experimentar sem conta', exact: true }).click();
  await page.locator('#editGoal').click();
  await page.locator('#goalName').fill('Reserva de exemplo');
  await page.locator('#goalValue').fill('150');
  await page.getByRole('button', { name: 'Atualizar simulação' }).click();
  await page.locator('.deposit[data-numero="3"]').click();
  await page.reload();
  assert.equal(await page.locator('.deposit[data-numero="3"]').getAttribute('aria-pressed'), 'true');
  await page.locator('#openTree').click();
  assert.equal(await page.locator('[data-arvore-depositos]').textContent(), '1');
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'docs/IMAGENS/simulacao-publica.png' });
  for (const width of [320, 390, 768, 1366]) {
    await page.setViewportSize({ width, height: 800 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), String(width));
  }
  await page.locator('#saveSimulation').click();
  await page.getByRole('button', { name: 'Continuar simulando' }).click();
  assert.equal(await page.locator('.deposit.completed').count(), 1);
  await page.locator('#printGoal').click();
  await page.getByRole('link', { name: 'Já tenho uma conta' }).click();
  assert(new URL(page.url()).searchParams.get('acao') === 'imprimir');
  await page.getByRole('link', { name: 'Continuar simulando' }).click();
  assert.equal(await page.locator('.deposit.completed').count(), 1);
  await page.emulateMedia({ media: 'print' });
  assert(await page.locator('#aviso-impressao-simulacao').isVisible());
  assert(!(await page.locator('#depositGrid').isVisible()));
  await page.emulateMedia({ media: 'screen' });
  const visitante = await page.content();
  await page.route('**/simular?acao=*', route => route.fulfill({
    contentType: 'text/html; charset=utf-8', body: visitante.replace('painel simulacao visitante', 'painel simulacao')
  }));
  await page.goto(base + '/simular?acao=imprimir');
  await page.evaluate(() => { window.print = () => { window.imprimiu = true; }; });
  await page.getByRole('button', { name: 'Imprimir agora' }).click();
  assert(await page.evaluate(() => window.imprimiu));
  assert.equal(await page.locator('.deposit.completed').count(), 1);
  await page.goto(base + '/simular?acao=salvar');
  await page.route('**/painel?simulacao=salva', route => route.fulfill({ body: 'Painel de teste' }));
  let payload;
  await page.route('**/api/simulacoes', route => {
    payload = route.request().postDataJSON();
    return route.fulfill({ json: { ok: true } });
  });
  await page.getByRole('button', { name: 'Salvar minha meta' }).click();
  await page.waitForURL('**/painel?simulacao=salva');
  assert.equal(payload.nome, 'Reserva de exemplo');
  assert.deepEqual(payload.marcados, [3]);
  assert.equal(await page.evaluate(() => sessionStorage.getItem('calendario-simulacao-v1')), null);
  console.log('Simulação, árvore, recarga, convite, retorno, impressão e salvamento verificados.');
} finally { await browser.close(); }
