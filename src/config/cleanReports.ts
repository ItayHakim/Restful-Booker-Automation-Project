import { rmSync } from "node:fs";
import { resolve } from "node:path";

export default function cleanReports() {
  for (const folder of ["allure-results", "allure-report"]) {
    const reportPath = resolve(__dirname, "../..", folder);
    rmSync(reportPath, { recursive: true, force: true });
  }
}
