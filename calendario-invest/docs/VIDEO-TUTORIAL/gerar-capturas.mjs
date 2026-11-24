import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const destino = path.join(pasta, 'capturas');
const email = process.env.DEMO_EMAIL;
const senha = process.env.DEMO_PASSWORD;
const baseUrl = process.env.DEMO_BASE_URL ?? 'https://meta.wasxtech.com.br';

if (!email || !senha) throw new Error('Defina DEMO_EMAIL e DEMO_PASSWORD.');
await mkdir(destino, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

async function capturar(nome) {
  await page.screenshot({ path: path.join(destino, nome), fullPage: true });
}

try {
  await page.goto(`${baseUrl}/entrar`, { waitUntil: 'networkidle' });
  await capturar('01-login.png');

  await page.goto(`${baseUrl}/cadastro`, { waitUntil: 'networkidle' });
  await page.fill('[name="nome"]', 'Pessoa demonstrativa');
  await page.fill('[name="email"]', email);
  await page.fill('[name="senha"]', senha);
  await capturar('02-cadastro.png');
  await page.click('button[type="submit"]');
  await page.waitForURL(`${baseUrl}/painel`);
  await page.waitForFunction(() => !document.querySelector('#tituloMeta')?.textContent.includes('Carregando'));
  await capturar('03-painel-inicial.png');

  await page.click('#manageBanks');
  await page.fill('#bankName', 'Banco da Meta');
  await page.click('#bankForm button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('#bankList')?.textContent.includes('Banco da Meta'));
  await capturar('04-banco-cadastrado.png');
  await page.click('#banksModal [data-close]');

  await page.click('#newGoal');
  await page.fill('#goalName', 'Minha reserva de tranquilidade');
  await page.fill('#goalValue', '3600');
  await capturar('05-nova-meta.png');
  await page.click('#goalForm button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('#tituloMeta')?.textContent.includes('Minha reserva'));
  await capturar('06-meta-transformada-em-passos.png');

  await page.locator('.deposit[data-numero="1"]').click();
  await page.selectOption('#banco', { label: 'Banco da Meta' });
  await capturar('07-registrar-deposito.png');
  await page.click('#depositForm button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('.deposit[data-numero="1"]')?.classList.contains('completed'));
  await capturar('08-progresso-real.png');
} finally {
  await browser.close();
}
