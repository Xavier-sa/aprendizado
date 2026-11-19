import { expect, test } from "@playwright/test";

async function prepareGlossary(page, term = "API") {
  await page.goto("/");
  const reminderClose = page.getByRole("button", { name: "Fechar lembrete de estudo" });
  if (await reminderClose.count()) await reminderClose.click();
  await page.locator("#glossary-search").fill(term);
  await expect(page.locator(".term-card").first()).toBeVisible();
}

test("abre visual por hover no desktop após pequeno atraso", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await prepareGlossary(page);
  const card = page.getByRole("button", { name: "Ver explicação visual de API" }).locator("xpath=ancestor::article");
  const popover = page.locator("#glossary-visual-popover");
  await card.hover();
  await expect(popover).toBeVisible();
  await expect(popover.getByRole("heading", { name: "API" })).toBeVisible();
  await expect(popover.locator("img")).toHaveAttribute("src", /api\.svg$/);
});

test("abre por toque simulado e fecha ao clicar fora no celular", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareGlossary(page, "JSON");
  const trigger = page.getByRole("button", { name: "Ver explicação visual de JSON" });
  await trigger.click();
  await expect(page.locator("#glossary-visual-popover")).toBeVisible();
  await page.locator("#glossary-title").click();
  await expect(page.locator("#glossary-visual-popover")).toBeHidden();
});

test("abre pelo teclado, fecha com Escape e devolve o foco", async ({ page }) => {
  await prepareGlossary(page, "JWT");
  const trigger = page.getByRole("button", { name: "Ver explicação visual de JWT" });
  await trigger.focus();
  await expect(page.locator("#glossary-visual-popover")).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#glossary-visual-popover")).toBeHidden();
  await expect(trigger).toBeFocused();
});

for (const width of [320, 768, 1920]) {
  for (const colorScheme of ["light", "dark"]) {
    test(`visual CORS sem overflow em ${width}px no modo ${colorScheme}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width, height: width === 320 ? 568 : 900 },
        colorScheme,
        reducedMotion: "reduce"
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await prepareGlossary(page, "CORS");
      await page.getByRole("button", { name: "Ver explicação visual de CORS" }).click();
      await expect(page.locator("#glossary-visual-popover")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      const bounds = await page.locator("#glossary-visual-popover").boundingBox();
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);
      await context.close();
    });
  }
}

test("pesquisa preserva termos sem visualização", async ({ page }) => {
  await prepareGlossary(page, "HTTP");
  await expect(page.getByRole("heading", { name: "HTTP Hypertext Transfer Protocol", exact: true })).toBeVisible();
  await expect(page.locator(".term-visual-trigger")).toHaveCount(0);
});
