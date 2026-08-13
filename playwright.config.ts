import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3011",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      "npm run dev --workspace @moorish-lighthouse/web -- --hostname 127.0.0.1 --port 3011",
    env: {
      SANITY_USE_PREVIEW_FIXTURES: "true",
    },
    url: "http://127.0.0.1:3011",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
