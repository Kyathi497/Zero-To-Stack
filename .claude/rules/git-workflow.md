---
description: Git commit message and branching standards
alwaysApply: true
---

# Git & Workflow Standards

## Branch Strategy
```
main       → production (protected, no direct pushes)
staging    → pre-production (maps to staging environment)
feature/*  → new features (branch from main, PR back to main)
fix/*      → bug fixes (branch from main or staging)
```

## Conventional Commits
Every commit message must follow this format:
```
<type>(<optional scope>): <short description>

[optional body]

[optional footer: BREAKING CHANGE or issue refs]
```

### Types
| Type | When to use |
|------|-------------|
| `feat` | New feature or user-facing addition |
| `fix` | Bug fix |
| `chore` | Maintenance, dependency updates, tooling |
| `docs` | Documentation only |
| `refactor` | Code restructure with no behavior change |
| `test` | Adding or updating tests |
| `perf` | Performance improvement |
| `style` | Formatting, whitespace (no logic change) |
| `ci` | CI/CD pipeline changes |

### Examples
```
feat(auth): add refresh token rotation
fix(api): return 404 when user not found instead of 500
chore: upgrade Prisma to v5.8
test(users): add integration tests for GET /users endpoint
```

## Pull Request Rules
- Every feature and fix goes through a PR — no direct pushes to `main`
- PR title must follow Conventional Commits format
- Squash commits before merging to keep history linear and clean
- PRs must pass all CI checks (lint, type check, tests, build) before merging

## Releases
- Tag releases using semantic versioning: `v1.0.0`, `v1.1.0`, `v2.0.0`
- MAJOR: breaking changes, MINOR: new features, PATCH: bug fixes
