/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  globalSetup: "<rootDir>/src/config/cleanReports.ts",
  testEnvironment: "allure-jest/node",
  testEnvironmentOptions: {
    resultsDir: "allure-results",
    environmentInfo: {
      node_version: process.version,
      os_platform: process.platform,
    },
  },
  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/*.spec.ts"],
  testTimeout: 30_000,
  maxWorkers: 1,
  clearMocks: true,
  verbose: true,
};
