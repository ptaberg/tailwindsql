# TailwindSQL

> ⚠️ **DRAFT — NOT READY FOR PRODUCTION**
> This project is under active development. APIs may change without notice.

SQL queries with Tailwind-like syntax.

🌐 **Website:** [tailwindsql.com](https://tailwindsql.com)
📦 **Repository:** [github.com/ptaberg/tailwindsql](https://github.com/ptaberg/tailwindsql)

---

## What is TailwindSQL?

TailwindSQL lets you write SQL queries using a familiar utility-class syntax inspired by Tailwind CSS.

```jsx
// Instead of this:
const sql = "SELECT * FROM User WHERE age > 18 ORDER BY name LIMIT 10";

// Write this:
<QueryBlock query="select-all from-[User] where-[age>18] orderby-[name] limit-[10]" />
```

## Syntax

| TailwindSQL Token       | SQL Output          |
|-------------------------|---------------------|
| `select-all`            | `SELECT *`          |
| `select-[id,name]`      | `SELECT id, name`   |
| `from-[users]`          | `FROM users`        |
| `where-[age>18]`        | `WHERE age>18`      |
| `orderby-[created_at]`  | `ORDER BY created_at` |
| `limit-[10]`            | `LIMIT 10`          |
| `offset-[5]`            | `OFFSET 5`          |
| `join-[posts]`          | `JOIN posts`        |
| `on-[users.id=posts.user_id]` | `ON users.id=posts.user_id` |
| `groupby-[status]`      | `GROUP BY status`   |
| `having-[count>5]`      | `HAVING count>5`    |

## Quick Start

```tsx
import { QueryBlock, createPrismaAdapter } from "@repo/tailwindsql";
import { prisma } from "./db";

const adapter = createPrismaAdapter(prisma);

export function UserList() {
  return (
    <QueryBlock
      query="select-[id,name,email] from-[User]"
      adapter={adapter}
    >
      {(users) => (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}
```

## Parser Only

Use the parser directly without React:

```ts
import { parseTailwindSQL } from "@repo/tailwindsql";

parseTailwindSQL("select-all from-[User] where-[id=1]");
// → "SELECT * FROM User WHERE id=1"
```

## Adapters

### Prisma

```ts
import { createPrismaAdapter } from "@repo/tailwindsql";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const adapter = createPrismaAdapter(prisma);
```

### Custom Adapter

Any function matching `(sql: string) => Promise<unknown[]>` works:

```ts
const customAdapter = async (sql: string) => {
  const result = await myDatabase.execute(sql);
  return result.rows;
};
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npx turbo dev

# Build
npx turbo build
```

## Project Structure

```
├── apps/
│   ├── web/          # Demo app
│   └── docs/         # Documentation site
├── packages/
│   └── tailwindsql/  # Core library
│       ├── parser.ts           # TailwindSQL → SQL parser
│       ├── QueryBlock.tsx      # React component exports
│       └── QueryBlock.client.tsx  # Client component
```

---

**Status:** 🚧 Draft
**License:** MIT
