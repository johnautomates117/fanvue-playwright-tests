# fanvue-playwright-tests

E2E test automation for Fanvue using Playwright and AI-powered test generation.

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/johnautomates117/fanvue-playwright-tests.git
    cd fanvue-playwright-tests
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    npx playwright install
    ```

## Running Tests

*   **Run all tests:**
    ```bash
    npm test
    ```
*   **Run tests in headed mode (with browser UI):**
    ```bash
    npm run test:headed
    ```
*   **Generate code (Playwright Codegen):**
    ```bash
    npm run codegen
    ```

## Continuous Integration (CI)

Tests are automatically run via GitHub Actions on pushes to `main` and pull requests. See `.github/workflows/playwright-tests.yml` for details.