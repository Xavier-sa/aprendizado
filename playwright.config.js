import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    ...(process.env.CI ? {} : { channel: "chrome" }),
    colorScheme: "light",
    reducedMotion: "reduce"
  },
  webServer: {
    command: "node scripts/server.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 15_000
  }
});
