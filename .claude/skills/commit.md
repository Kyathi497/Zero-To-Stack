---
name: commit
description: Stage and commit changes following Conventional Commits format. Analyzes the diff, suggests a correctly formatted commit message, and creates the commit.
---

Create a git commit following the project's Conventional Commits standard.

Steps:
1. Run `git status` to see all changed files
2. Run `git diff` (staged and unstaged) to understand what changed
3. Analyze the changes and determine:
   - The correct type: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `style`, `ci`
   - The scope (optional): the module or area affected, e.g. `auth`, `api`, `users`
   - A short description (imperative mood, max 72 chars): "add refresh token rotation" not "added" or "adding"
4. Draft the commit message and show it to the user for approval before committing
5. Stage the appropriate files (specific files, not `git add -A` which can catch secrets)
6. Create the commit

## Commit Message Format
```
<type>(<scope>): <short description>

[optional body — explain WHY, not what]

[optional footer — BREAKING CHANGE: or Closes #123]
```

## Examples
```
feat(auth): add refresh token rotation with Redis storage

Implements sliding session via refresh tokens stored in Redis with 7-day TTL.
Access tokens remain short-lived at 15min. Refresh endpoint rotates the token
on each use to prevent replay attacks.

Closes #42
```

```
fix(api): return 404 instead of 500 when user not found
```

```
chore: upgrade Prisma from 5.7 to 5.10
```

## Rules
- Never use `git add .` or `git add -A` — stage specific files only
- Never commit `.env` files, secrets, or build artifacts
- If a pre-commit hook fails, fix the issue and re-commit (never use `--no-verify`)
- Warn the user before committing if any file looks like it might contain secrets
