import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.PW_BASE_URL ?? "http://localhost:8080";

export default defineConfig({
  testDir: "./tests/visual",
  snapshotDir: "./tests/visual/__screenshots__",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    },
  },
  use: {
    baseURL: BASE_URL,
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "mobile-360", use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 640 } } },
    { name: "mobile-390", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "laptop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } } },
    { name: "desktop-1920", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
  webServer: process.env.PW_BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
