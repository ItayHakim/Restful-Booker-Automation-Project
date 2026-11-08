# Restful Booker Automation

Backend test automation project built with Jest, TypeScript, and Axios for
[Restful Booker](https://restful-booker.herokuapp.com/).

## Prerequisites

- Node.js 22.18 or newer
- npm

## Installation

Install the dependencies from the lockfile:

```bash
npm ci
```

## Running Tests

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npm test -- --runTestsByPath src/tests/createAndGetBooking.spec.ts
```

Run tests in watch mode:

```bash
npm run test:watch
```

Check the TypeScript types:

```bash
npm run typecheck
```

## Test Reports

### Allure Report

Run the tests and generate an Allure HTML report:

```bash
npm run test:allure
```

This command builds the report from the current test run, including failed tests.
The HTML report is saved to `allure-report/`. Open it in your browser with:

```bash
npm run allure:open
```

Press Ctrl+C in the terminal to stop the report server.

Every Jest run also saves raw Allure results to `allure-results/`. To generate a
report from the results already saved there:

```bash
npm run allure:generate
```

Raw results accumulate between runs. Use `npm run test:allure` for a report that
only includes the current run. Both Allure folders are ignored by Git.
The project uses [Allure Report 3](https://allurereport.org/docs/v3/install/),
which runs through the local npm dependency.

### JSON Report

Jest prints the results in the terminal. To also save a JSON report:

```bash
npm run test:report
```

The report is saved to `reports/test-results.json`.

## Environment Settings

The tests use the public demo API and its documented credentials by default.
Settings are read from the process environment:

| Variable | Default |
| --- | --- |
| `BOOKER_BASE_URL` | `https://restful-booker.herokuapp.com` |
| `BOOKER_USERNAME` | `admin` |
| `BOOKER_PASSWORD` | `password123` |

For example, to test a local instance in PowerShell:

```powershell
$env:BOOKER_BASE_URL = "http://localhost:3000"
$env:BOOKER_USERNAME = "admin"
$env:BOOKER_PASSWORD = "password123"
npm test
```

## Main Code Components

### Tests

The files in `src/tests` cover the health check, authentication, booking creation,
retrieval, name filters, full and partial updates, deletion, and rejected requests
without valid authentication. Tests check saved booking details after changes.

### Fixtures

`baseApi.ts` sets the shared Axios base URL, JSON headers, and request timeout.
`bookingFixture.ts` tracks created bookings and cleans them up after each test,
including failed tests. A unique last name identifies each test booking during
cleanup. Update tests preserve that name so the fixture can still identify it.

### Utilities

The files in `src/utils` contain reusable API requests, authentication helpers,
booking assertions, and the function that generates unique booking details.

### Mapping, Test Data, and Models

`src/mapping` stores headers, response messages, and status codes.
`src/testData` stores credentials and booking input data.
`src/models` defines the TypeScript request and response types.

### Routes and Configuration

`src/config/routes.ts` stores the base URL and API routes. `jest.config.js` runs
one test file at a time with a 30-second test timeout. Axios requests have a
10-second timeout. The Allure Jest environment saves test results and includes
the Node.js version and operating system in the report. Type checking runs
separately through `npm run typecheck`.

## Project Structure

```text
src/
├── config/       # API routes and base URL
├── fixtures/     # Shared API client and booking cleanup
├── mapping/      # Headers, status codes, and response messages
├── models/       # TypeScript types
├── testData/     # Credentials and booking details
├── tests/        # Jest test specifications
└── utils/        # Reusable requests and assertions
```

## API Notes

The public playground is shared, intentionally contains bugs, and resets every
10 minutes. Tests create their own bookings and check their unique last names
before cleanup, because a reset can reuse a booking ID. A service outage or reset
during a test can still affect its result. See the
[Restful Booker homepage](https://restful-booker.herokuapp.com/).

Some responses differ from common REST conventions: creating a booking returns
`200`, deleting one returns `201`, and invalid credentials return `200` with a
`Bad credentials` message. The tests follow the
[API documentation](https://restful-booker.herokuapp.com/apidoc/index.html).

The current Jest tooling has transitive development dependency advisories in
`npm audit`. Use `npm audit --omit=dev` to check the runtime dependencies separately.
