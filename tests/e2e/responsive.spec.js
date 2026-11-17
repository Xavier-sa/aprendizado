import { expect, test } from "@playwright/test";

const viewports = [
  [320, 568], [375, 667], [390, 844], [768, 1024],
  [1024, 768], [1366, 768], [1920, 1080]
];

for (const [width, height] of viewports) {
  test(`layout ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page).toHaveTitle(/WX Academy/);
    await expect(page.locator("h1")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await page.screenshot({ path: `test-results/wx-academy-${width}x${height}.png`, fullPage: true });
  });
}

test("menu mobile e glossário são operáveis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navegação principal" })).toHaveClass(/open/);
  await page.locator("#glossary-search").fill("HTTP");
  await expect(page.locator("#glossary-grid .term-card").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "HTTP Hypertext Transfer Protocol", exact: true })).toBeVisible();
});

test("progresso, cronograma, quiz e modo escuro funcionam", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  await expect(page.locator("body")).toHaveClass(/dark/);
  await page.locator(".day-card select").first().selectOption("complete");
  await expect(page.locator("#overall-percent")).toHaveText("13%");
  await page.getByRole("button", { name: "Marcar aula como concluída" }).click();
  await expect(page.locator("#overall-percent")).toHaveText("25%");
  await page.locator('#lesson-quiz input[value="1"]').check();
  await page.getByRole("button", { name: "Responder e continuar" }).click();
  await expect(page.locator("#quiz-feedback")).toContainText("Correto!");
  await page.reload();
  await expect(page.locator("body")).toHaveClass(/dark/);
  await expect(page.locator(".day-card select").first()).toHaveValue("complete");
  await expect(page.locator("#overall-percent")).toHaveText("25%");
});

test("galeria histórica carrega todas as evidências", async ({ page }) => {
  await page.goto("/docs/evolucao.html");
  await expect(page).toHaveTitle("Evolução da WX Academy");
  await expect(page.locator("img")).toHaveCount(6);
  const images = await page.locator("img").evaluateAll((items) => items.map((item) => ({ complete: item.complete, width: item.naturalWidth })));
  expect(images.every((item) => item.complete && item.width > 0)).toBeTruthy();
});

test("favicon WX está declarado e acessível", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.locator('link[rel="icon"]').getAttribute("href");
  expect(href).toBe("app/assets/icons/favicon.svg");
  const response = await request.get(`/${href}`);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/svg+xml");
});
