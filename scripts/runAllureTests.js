const { spawnSync } = require("node:child_process");
const { dirname, resolve } = require("node:path");

const projectDirectory = resolve(__dirname, "..");
const allureCli = resolve(dirname(require.resolve("allure")), "../cli.js");

function runCommand(scriptPath, args) {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: projectDirectory,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  return result.status ?? 1;
}

const testExitCode = runCommand(require.resolve("jest/bin/jest"), process.argv.slice(2));

// Failed tests should still have an HTML report.
const reportExitCode = runCommand(allureCli, [
  "generate", "allure-results", "--output", "allure-report", "--clean",
]);

process.exitCode = testExitCode || reportExitCode;
