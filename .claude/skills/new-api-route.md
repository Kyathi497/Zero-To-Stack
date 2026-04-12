---
name: new-api-route
description: Scaffold a complete API route following project standards — Zod validation, typed response envelope, error handling, and auth middleware wiring.
---

Scaffold a complete API route. The user will provide: the resource name, the HTTP method(s), and what the endpoint does.

Generate all layers: route definition, controller, service, and Zod schema.

## File Locations
```
src/routes/<resource>.routes.ts       ← route registration
src/controllers/<resource>.controller.ts  ← request/response handling
src/services/<resource>.service.ts    ← business logic
src/models/<resource>.schema.ts       ← Zod schemas
```

## Route Template (Express)
```ts
// src/routes/<resource>.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { <Resource>Controller } from '../controllers/<resource>.controller';

const router = Router();

router.post('/', authenticate, <Resource>Controller.create);
router.get('/', authenticate, <Resource>Controller.list);
router.get('/:id', authenticate, <Resource>Controller.getById);
router.patch('/:id', authenticate, <Resource>Controller.update);
router.delete('/:id', authenticate, <Resource>Controller.remove);

export default router;
```

## Controller Template
```ts
// src/controllers/<resource>.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { <Resource>Schema } from '../models/<resource>.schema';
import { <Resource>Service } from '../services/<resource>.service';

export const <Resource>Controller = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = <Resource>Schema.parse(req.body);
      const result = await <Resource>Service.create(input);
      res.status(201).json({ success: true, data: result, error: null });
    } catch (err) {
      next(err);
    }
  },
};
```

## Zod Schema Template
```ts
// src/models/<resource>.schema.ts
import { z } from 'zod';

export const Create<Resource>Schema = z.object({
  // define fields here
}).strict();

export type Create<Resource>Input = z.infer<typeof Create<Resource>Schema>;
```

## Standards to Apply
- Validate ALL request body/params/query with Zod — reject unknowns with `.strict()`
- Always use the `{ success, data, error }` response envelope
- Correct HTTP status codes: 201 for create, 200 for read/update, 204 for delete, 400/422 for validation
- Never expose stack traces or internal errors to the client — use centralized error handler
- List endpoints must be paginated (`take`, `skip`, `cursor`)
- Wrap multi-step DB operations in transactions

Ask the user for resource name, operations needed, and auth requirements if not provided.
