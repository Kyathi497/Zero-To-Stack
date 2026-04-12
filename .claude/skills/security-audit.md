---
name: security-audit
description: Run a security audit on a file, feature, or the entire codebase. Checks against OWASP Top 10, auth flaws, secrets exposure, and project security standards.
---

Perform a security audit using the `security-auditor` agent.

Steps:
1. Ask the user what scope to audit: a specific file, a feature directory, or the whole project
2. Read all relevant files in that scope
3. Invoke the `security-auditor` agent with the code content and scope description
4. Present findings grouped by severity: Critical → High → Medium → Low
5. For each Critical or High finding, immediately offer to apply the fix

Output a final summary:
- Total findings by severity
- Files audited
- Top 3 actions to take right now

If no files are specified, default to auditing:
- `src/routes/`, `src/controllers/`, `src/middleware/` — API surface
- `src/config/` — configuration and secrets handling
- Any file matching `*.env*`, `auth.*`, `session.*`

After the audit, ask: "Would you like me to fix any of these issues now?"
