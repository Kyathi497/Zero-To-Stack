---
description: Security non-negotiables — applies to all source files
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.py"]
alwaysApply: true
---

# Security Rules

These are non-negotiable. Security is built in from the start, never bolted on.

## Secrets & Credentials
- Never hardcode secrets, API keys, passwords, or tokens in source code
- All secrets go in environment variables only — access via `process.env` or a validated env schema
- Never commit `.env` files — always add to `.gitignore`
- In production, use a secrets manager (AWS Secrets Manager, Doppler, Vault)

## Authentication & Passwords
- Hash passwords with bcrypt (cost factor 12+) or Argon2 — never MD5, SHA1, or plain text
- JWT access tokens: max 15-minute expiry with refresh token rotation
- Store auth tokens in httpOnly, Secure, SameSite cookies — never localStorage or sessionStorage
- Implement account lockout after 5 failed login attempts
- Use MFA for all admin accounts

## Input Validation
- Validate and sanitize ALL incoming data at every API endpoint — no exceptions
- Use Zod (Node.js) or Pydantic (Python) schemas on every request body, query param, and header
- Never trust client-supplied data — always re-validate server-side

## SQL & Injection Prevention
- Always use parameterized queries or an ORM — never interpolate user data into SQL strings
- Escape all user-generated content before rendering in HTML (XSS prevention)
- Apply CSRF protection on all state-changing (POST/PUT/PATCH/DELETE) endpoints

## HTTP Headers & Transport
- HTTPS everywhere — no plain HTTP in production
- Apply Helmet.js (Express) or equivalent security headers on every server
- Configure CORS strictly — whitelist only known, trusted origins
- Set Content Security Policy (CSP) headers on all pages

## Dependency Security
- Run `npm audit` or `pip-audit` regularly and on every CI run
- Pin dependency versions in production; review before upgrading
- Never install packages from untrusted sources

## Forbidden Patterns
```ts
// ❌ Never
const apiKey = "sk-abc123..."; // hardcoded secret
const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL injection
localStorage.setItem("token", jwt); // token in localStorage
const hash = md5(password); // weak hashing

// ✅ Correct
const apiKey = process.env.API_KEY;
const user = await db.user.findUnique({ where: { id: userId } }); // ORM/parameterized
// token stored in httpOnly cookie by the server
const hash = await bcrypt.hash(password, 12);
```
