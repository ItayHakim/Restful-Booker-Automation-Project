/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/*.spec.ts"],
  testTimeout: 30_000,
  maxWorkers: 1,
  clearMocks: true,
  verbose: true,
};
