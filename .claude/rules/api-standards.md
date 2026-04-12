---
description: API design and response format standards — applies to route/controller files
globs: ["**/routes/**", "**/controllers/**", "**/api/**", "**/app/api/**"]
alwaysApply: false
---

# API Standards

## Response Format
Every API endpoint must return a consistent, typed response envelope:

```ts
// Success
{ "success": true, "data": <T>, "error": null }

// Error
{ "success": false, "data": null, "error": { "code": string, "message": string } }
```

Never return raw objects or arrays at the top level — always wrap in the envelope.

## HTTP Status Codes
Use status codes correctly — never return 200 for errors:

| Status | When to use |
|--------|-------------|
| 200 | Successful GET / PUT / PATCH |
| 201 | Successful POST (resource created) |
| 204 | Successful DELETE (no body) |
| 400 | Bad request — invalid input |
| 401 | Unauthenticated — no/invalid token |
| 403 | Unauthorized — valid token, insufficient permissions |
| 404 | Resource not found |
| 409 | Conflict — duplicate resource |
| 422 | Unprocessable entity — validation failed |
| 429 | Too many requests — rate limit hit |
| 500 | Internal server error |

## Input Validation
- Validate every request body, path param, and query string with Zod (Node) or Pydantic (Python)
- Return 400/422 with field-level error details on validation failure
- Strip unknown fields from request bodies (Zod: `schema.strict()`)

## Error Handling
- Never expose stack traces or internal error messages to clients
- Log full error details server-side; return only a safe, generic message to the client
- Use a centralized error-handling middleware — never duplicate try/catch logic per route

## Pagination
- All list endpoints MUST support pagination — never return unbounded result sets
- Use cursor-based pagination for large datasets; offset-based for simple use cases
- Include `total`, `page`, `limit`, `hasNextPage` in paginated responses

## Documentation
- Document every endpoint with OpenAPI/Swagger annotations
- Include request/response schemas, status codes, and authentication requirements
- Keep docs in sync with the code — never let them drift

## Rate Limiting
- Apply rate limiting to all public-facing endpoints
- Use Redis for distributed rate limiting across multiple instances
- Return 429 with a `Retry-After` header when limit is exceeded
