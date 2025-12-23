import { Suspense } from "react";
import { parseTailwindSQL } from "@repo/tailwindsql/QueryBlock";
import { AllUsers, UserList } from "./UserList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <main className="flex flex-col items-center gap-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">TailwindSQL</h1>
        <p className="text-lg opacity-70 max-w-md text-center">
          SQL queries with Tailwind-like syntax
        </p>

        {/* Example 1: Default JSON rendering */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <code className="block mb-2 text-sm opacity-60 font-mono">
            select-all from-[User]
          </code>
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <AllUsers />
          </Suspense>
        </section>

        {/* Example 2: Custom rendering */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-2">User Names Only</h2>
          <code className="block mb-2 text-sm opacity-60 font-mono">
            select-[id,name,email] from-[User]
          </code>
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <UserList />
          </Suspense>
        </section>

        {/* Show parsed SQL */}
        <section className="w-full p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-sm font-semibold mb-2 opacity-60">Parser Demo</h3>
          <div className="space-y-1 font-mono text-sm">
            <p>
              <span className="opacity-60">Input:</span>{" "}
              <code>select-all from-[User] where-[id=1]</code>
            </p>
            <p>
              <span className="opacity-60">Output:</span>{" "}
              <code>{parseTailwindSQL("select-all from-[User] where-[id=1]")}</code>
            </p>
          </div>
        </section>

        <div className="flex gap-4">
          <a
            className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:opacity-90 transition"
            href="https://github.com/ptaberg/tailwindsql"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </main>
      <footer className="mt-auto pt-16 opacity-50 text-sm">Built with ♥</footer>
    </div>
  );
}
