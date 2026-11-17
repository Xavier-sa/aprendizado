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
