# CleanPro – Test Notes

⚠️ IMPORTANT:  
This file is **for context only**.  
It must **never be edited** or used to trigger code changes.  
Codex should read this file to understand test environment limits — not to modify the project.

---

## Test Environment Limits
- Codex does not have the **gcloud CLI** → deployment scripts (`deploy_backend.sh`, `deploy_frontend.sh`) will always fail here.
- Codex does not have **Playwright** installed → `npx playwright test` will fail inside Codex.

---

## What This Means
- Failures in `TEST_RESULTS.md` related to missing tools are **not project errors**.  
- These failures should be ignored when validating code.  
- Always run deployments and Playwright tests locally in Codespace/VM with the correct tools installed.

---

## Usage
- Use `TEST_RESULTS.md` only as a log of what Codex attempted.  
- Refer to this `TEST_NOTES.md` to understand whether a failure is caused by environment limits or actual code issues.

---

(End of TEST_NOTES.md – Do not edit)
