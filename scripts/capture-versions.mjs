import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const targets = [
  { version: "v1.0.0", url: "https://cronogramasemanal.wasxtech.com.br/", source: "public-reference" },
  { version: "v2.0.0", url: "http://127.0.0.1:4173/", source: "local-commit-7863defb" }
];
const viewports = {
  mobile: { width: 390, height: 844 }, tablet: { width: 768, height: 1024 },
  desktop: { width: 1366, height: 768 }, "desktop-large": { width: 1920, height: 1080 }
};
const browser = await chromium.launch({ channel: process.env.CI ? undefined : "chrome" });

for (const target of targets) {
  const directory = resolve("docs", "versions", target.version, "screenshots");
  await mkdir(directory, { recursive: true });
  const report = { capturedAt: new Date().toISOString(), source: target.source, requestedUrl: target.url, views: {} };
  for (const [name, viewport] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport, colorScheme: "light", reducedMotion: "reduce" });
    const consoleErrors = []; const requestFailures = []; const responseErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("requestfailed", (request) => requestFailures.push({ url: request.url(), error: request.failure()?.errorText || "unknown" }));
    page.on("response", (item) => { if (item.status() >= 400) responseErrors.push({ url: item.url(), status: item.status() }); });
    let response;
    try {
      response = await page.goto(target.url, { waitUntil: "networkidle", timeout: 45_000 });
      await page.screenshot({ path: resolve(directory, `${name}.png`), fullPage: true });
      report.views[name] = { viewport, finalUrl: page.url(), title: await page.title(), status: response?.status() ?? null, consoleErrors, requestFailures, responseErrors, documentWidth: await page.evaluate(() => document.documentElement.scrollWidth) };
    } catch (error) {
      report.views[name] = { viewport, finalUrl: page.url(), error: error.message, consoleErrors, requestFailures, responseErrors };
    } finally { await page.close(); }
  }
  await writeFile(resolve("docs", "versions", target.version, "inspection.json"), `${JSON.stringify(report, null, 2)}\n`);
}
await browser.close();
