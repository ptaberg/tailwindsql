import { Suspense } from "react";
import Image from "next/image";
import { AllUsers, UserList } from "./UserList";
import { CodeBlock } from "./CodeBlock";

const configCode = `// tailwindsql.config.ts
import { configTailwindSQL } from "@repo/tailwindsql";
import { executeSQL } from "./app/actions";

export const { QueryBlock } = configTailwindSQL({
  adapter: executeSQL,
});`;

const adapterCode = `// app/actions.ts
"use server";
import { prisma } from "./db";

export async function executeSQL(sql: string) {
  return prisma.$queryRawUnsafe(sql);
}`;

const tailwindSqlCode = `// TailwindSQL approach
import { QueryBlock } from "../tailwindsql.config";

function UsersPage() {
  return (
    <QueryBlock query="select-all from-[User]">
      {(users) => (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}`;

const example1Code = `// AllUsers.tsx — Default JSON output
import { QueryBlock } from "../tailwindsql.config";

export function AllUsers() {
  return <QueryBlock query="select-all from-[User]" />;
}`;

const example2Code = `// UserList.tsx — Custom render
import { QueryBlock } from "../tailwindsql.config";

export function UserList() {
  return (
    <QueryBlock query="select-[id,name,email] from-[User]">
      {(users) => (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-3 rounded-lg bg-neutral-100">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm opacity-60 ml-2">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </QueryBlock>
  );
}`;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <main className="flex flex-col gap-16 w-full max-w-4xl py-16">
        {/* Hero */}
        <header className="flex items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">TailwindSQL</h1>
            <p className="text-xl opacity-70">
              Write SQL queries inline with Tailwind-like utility syntax.
              <br />
              <span className="text-base">Reusable, composable.</span>
            </p>
          </div>
          <Image
            src="/logo.svg"
            alt="TailwindSQL Logo"
            width={128}
            height={128}
            className="shrink-0"
          />
        </header>

        {/* What's the difference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Why TailwindSQL?</h2>
          <p className="opacity-70">
            Traditional SQL in React requires separating data fetching from
            rendering. TailwindSQL lets you declare queries{" "}
            <strong>inline</strong> within your components, making data
            dependencies explicit and components self-contained.
          </p>

          <div className="flex flex-col gap-4">
            <CodeBlock title="TailwindSQL" code={tailwindSqlCode} />
          </div>
        </section>

        {/* Setup */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Setup</h2>
          <p className="opacity-70">
            Configure TailwindSQL once with your database adapter. The adapter
            is any function that takes a SQL string and returns results.
          </p>

          <div className="flex flex-col gap-4">
            <CodeBlock title="1. Create adapter" code={adapterCode} />
            <CodeBlock title="2. Configure TailwindSQL" code={configCode} />
          </div>
        </section>

        {/* Live Examples */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Live Examples</h2>

          {/* Example 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Example 1: All Users{" "}
              <span className="text-sm font-normal opacity-60">
                — Default JSON output
              </span>
            </h3>
            <div className="flex flex-col gap-4">
              <CodeBlock title="Code" code={example1Code} />
              <div className="space-y-2">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-xs font-medium opacity-70 rounded-t-lg border border-b-0 border-neutral-200 dark:border-neutral-700">
                  Output
                </div>
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-b-lg overflow-hidden -mt-2">
                  <Suspense
                    fallback={
                      <div className="p-4 animate-pulse">Loading...</div>
                    }
                  >
                    <AllUsers />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Example 2: User Names{" "}
              <span className="text-sm font-normal opacity-60">
                — Custom render function
              </span>
            </h3>
            <div className="flex flex-col gap-4">
              <CodeBlock title="Code" code={example2Code} />
              <div className="space-y-2">
                <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-xs font-medium opacity-70 rounded-t-lg border border-b-0 border-neutral-200 dark:border-neutral-700">
                  Output
                </div>
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-b-lg p-4 -mt-2">
                  <Suspense
                    fallback={<div className="animate-pulse">Loading...</div>}
                  >
                    <UserList />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Syntax Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Syntax Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-3 pr-4 font-semibold">
                    TailwindSQL
                  </th>
                  <th className="text-left py-3 font-semibold">
                    Generated SQL
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  ["select-all", "SELECT *"],
                  ["select-[id,name]", "SELECT id, name"],
                  ["from-[users]", "FROM users"],
                  ["where-[age>18]", "WHERE age>18"],
                  ["orderby-[created_at]", "ORDER BY created_at"],
                  ["limit-[10]", "LIMIT 10"],
                  ["offset-[5]", "OFFSET 5"],
                  ["join-[posts]", "JOIN posts"],
                  ["groupby-[status]", "GROUP BY status"],
                ].map(([input, output]) => (
                  <tr
                    key={input}
                    className="border-b border-neutral-100 dark:border-neutral-800/50"
                  >
                    <td className="py-2 pr-4 text-blue-600 dark:text-blue-400">
                      {input}
                    </td>
                    <td className="py-2 opacity-70">{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4">
          <a
            className="inline-block px-6 py-3 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:opacity-90 transition"
            href="https://github.com/ptaberg/tailwindsql"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        </section>
      </main>

      <footer className="mt-auto pt-16 pb-8 opacity-50 text-sm">
        Built with ♥ · Draft — Not ready for production
      </footer>
    </div>
  );
}
