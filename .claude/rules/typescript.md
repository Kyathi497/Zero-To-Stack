---
description: TypeScript strict mode standards — applies to all TS/TSX files
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: true
---

# TypeScript Rules

- Always use TypeScript strict mode — `"strict": true` in tsconfig.json
- Never use the `any` type. Use `unknown` and narrow it, or define a proper type/interface
- Never use `@ts-ignore` or `@ts-expect-error` without a comment explaining why
- All function parameters and return types must be explicitly typed unless trivially inferred
- Use `interface` for object shapes that may be extended; `type` for unions, intersections, and aliases
- Prefer `readonly` on properties that should not be mutated
- Use Zod for runtime validation at system boundaries (user input, API responses, env vars)
- Never cast with `as` to silence type errors — fix the underlying type issue instead
- Use strict null checks — handle `null` and `undefined` explicitly
- Prefer optional chaining `?.` and nullish coalescing `??` over manual null guards

## Forbidden Patterns
```ts
// ❌ Never
const data: any = fetchUser();
// @ts-ignore
const result = doSomething();
const user = response as User; // casting without validation

// ✅ Correct
const data: unknown = fetchUser();
const user = UserSchema.parse(response); // Zod validated
```
