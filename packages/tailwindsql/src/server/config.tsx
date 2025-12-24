import { type ReactNode } from "react";
import { parseTailwindSQL } from "../parser";
import type { SQLAdapter } from "../types";

export interface TailwindSQLConfig {
  adapter: SQLAdapter;
}

export interface ConfiguredQueryBlockProps {
  query: string;
  children?: (data: unknown[]) => ReactNode;
}

export function configTailwindSQL(config: TailwindSQLConfig) {
  const { adapter } = config;

  const QueryBlock = async ({ query, children }: ConfiguredQueryBlockProps) => {
    const sql = parseTailwindSQL(query);

    try {
      const data = await adapter(sql);

      if (children) {
        return <>{children(data)}</>;
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
  };

  return { QueryBlock };
}

