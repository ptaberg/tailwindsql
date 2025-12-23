import { type ReactNode } from "react";
import { parseTailwindSQL, type SQLAdapter } from "./parser";

export interface QueryBlockProps {
  /** TailwindSQL query string e.g. "select-all from-[users] where-[age>18]" */
  query: string;
  /** Adapter function that executes raw SQL and returns results */
  adapter: SQLAdapter;
  /** Render function for results. If omitted, renders JSON */
  children?: (data: unknown[]) => ReactNode;
}

export async function QueryBlock({ query, adapter, children }: QueryBlockProps) {
  const sql = parseTailwindSQL(query);

  try {
    const data = await adapter(sql);

    if (children) {
      return (
        <div className="tailwindsql-block" data-sql={sql}>
          {children(data)}
        </div>
      );
    }

    return (
      <div className="tailwindsql-block" data-sql={sql}>
        <pre className="tailwindsql-result overflow-auto rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-800">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="tailwindsql-error text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-950">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
}

