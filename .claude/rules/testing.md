---
description: Testing standards and coverage requirements
globs: ["**/*.test.ts", "**/*.spec.ts", "**/*.test.tsx", "**/*.spec.tsx"]
alwaysApply: false
---

# Testing Standards

## Tooling
- **Unit / Integration:** Vitest (preferred) or Jest
- **E2E:** Playwright (preferred) or Cypress
- **API testing:** Supertest for HTTP endpoint integration tests

## Coverage Requirements
- Aim for 80%+ coverage on all business logic (`services/`) and API routes (`controllers/`, `routes/`)
- UI components: test behavior and accessibility, not implementation details
- Do not write tests just to hit a coverage number — test what matters

## What to Test
- Every API endpoint (happy path + all error branches)
- Business logic functions in `services/`
- Input validation — test valid, invalid, and edge-case inputs
- Auth middleware — test authenticated, unauthenticated, and unauthorized access
- Database queries — use a real test database, not mocks

## What NOT to Test
- Third-party library internals
- Simple getters/setters with no logic
- Generated code (Prisma client, auto-generated SDKs)

## Test Structure
```ts
describe('UserService.createUser', () => {
  it('creates a user with hashed password', async () => { ... });
  it('throws ConflictError when email already exists', async () => { ... });
  it('throws ValidationError when email is invalid', async () => { ... });
});
```

## Database Tests
- Use a dedicated test database — never run tests against staging or production
- Reset the database state before each test suite (or use transactions that roll back)
- Seed only the minimum data required for the test
- Do NOT mock the database — integration tests must hit real DB to catch schema/query issues

## Pre-commit & CI
- Lint + type check + unit tests run on every pre-commit hook (Husky)
- Full test suite (including integration + E2E) runs in CI before any deployment
- A failing test blocks the merge — never skip or `--force` past it
