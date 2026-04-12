---
description: Database query, schema, and migration standards
globs: ["**/models/**", "**/prisma/**", "**/migrations/**", "**/*.sql"]
alwaysApply: false
---

# Database Standards

## Stack
- **Relational:** PostgreSQL — primary choice for structured data
- **NoSQL:** MongoDB — for flexible/document-based data
- **Cache / Queue:** Redis — sessions, rate limiting, background jobs
- **ORM:** Prisma (Node.js) or SQLAlchemy (Python)

## Schema & Migrations
- Always use migrations — never modify the production schema manually
- Every schema change must have an up and down migration
- Test migrations on a staging database before applying to production
- Use descriptive migration names: `add_refresh_token_to_users`, not `migration_001`

## Indexing
- Index all foreign key columns
- Index columns used frequently in WHERE, ORDER BY, or JOIN clauses
- Use partial indexes for filtered queries on large tables
- Run `EXPLAIN ANALYZE` on any non-trivial query before deploying

## Query Rules
- Select only the columns you need — never `SELECT *` in production queries
- Avoid N+1 queries — use joins or eager loading (`include` in Prisma)
- Use database transactions for any multi-step write operation
- Always use parameterized queries — never string-interpolate user input into SQL

## Data Safety
- Never store plain-text passwords — bcrypt or Argon2 always
- Never store secrets or PII in plain text — encrypt sensitive fields at rest
- Paginate all list queries — never return unbounded result sets
- Use `LIMIT` clauses even on internal queries as a safeguard

## Local Development
- Write seed scripts for local development data — never manually insert test data
- Use a separate local database — never connect to staging or production locally
- Document environment variable names for DB connection in `.env.example`

## Forbidden Patterns
```ts
// ❌ Never
const users = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
await prisma.user.findMany(); // unbounded query

// ✅ Correct
const users = await prisma.user.findMany({
  where: { email },
  select: { id: true, name: true, email: true },
  take: 50,
  skip: offset,
});
```
