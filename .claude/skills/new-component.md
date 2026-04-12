---
name: new-component
description: Scaffold a new React component following project standards — TypeScript, Tailwind CSS, accessibility, and separation of UI/logic concerns.
---

Scaffold a new React component. The user will provide the component name and optionally: props it should accept, what it does, and where it lives.

Follow these standards exactly:

## File Structure
Create the component at `src/components/<ComponentName>/index.tsx` with a co-located types file if needed.

## Component Template
```tsx
import type { FC } from 'react';

interface <ComponentName>Props {
  // define all props here — no implicit any
}

const <ComponentName>: FC<<ComponentName>Props> = ({ ...props }) => {
  return (
    <div>
      {/* component content */}
    </div>
  );
};

export default <ComponentName>;
```

## Standards to Apply
- Use TypeScript — explicit prop types, no `any`
- Use Tailwind CSS for all styling
- Write accessible HTML: semantic elements, ARIA roles where needed, keyboard interaction
- Keep the component focused — one responsibility per component
- Extract business logic into a custom hook if it's more than 2-3 state variables or effects
- Mobile-first: smallest screen first, then scale up with responsive classes
- Use named exports for hooks, default export for the component itself

## What to Generate
1. The component file with correct TypeScript types
2. A custom hook file if logic is non-trivial (`use<ComponentName>.ts`)
3. A basic usage example in a comment at the top of the file

Ask the user for the component name and its purpose before generating if not provided.
