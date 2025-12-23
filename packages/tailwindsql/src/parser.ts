// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SQLAdapter = (sql: string) => Promise<unknown[]>;

// ─────────────────────────────────────────────────────────────────────────────
// Parser: TailwindSQL → SQL
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_PATTERNS: Record<string, (value: string) => string> = {
  "select-all": () => "SELECT *",
  "select-\\[(.+?)\\]": (cols) =>
    `SELECT ${cols.replace(/["']/g, "").split(",").join(", ")}`,
  "from-\\[(.+?)\\]": (table) => `FROM ${table.replace(/["']/g, "")}`,
  "where-\\[(.+?)\\]": (cond) => `WHERE ${cond.replace(/["']/g, "")}`,
  "orderby-\\[(.+?)\\]": (col) => `ORDER BY ${col.replace(/["']/g, "")}`,
  "limit-\\[(.+?)\\]": (n) => `LIMIT ${n}`,
  "offset-\\[(.+?)\\]": (n) => `OFFSET ${n}`,
  "join-\\[(.+?)\\]": (table) => `JOIN ${table.replace(/["']/g, "")}`,
  "on-\\[(.+?)\\]": (cond) => `ON ${cond.replace(/["']/g, "")}`,
  "groupby-\\[(.+?)\\]": (col) => `GROUP BY ${col.replace(/["']/g, "")}`,
  "having-\\[(.+?)\\]": (cond) => `HAVING ${cond.replace(/["']/g, "")}`,
};

export function parseTailwindSQL(query: string): string {
  const tokens = query.trim().split(/\s+/);
  const sqlParts: string[] = [];

  for (const token of tokens) {
    let matched = false;

    for (const [pattern, transform] of Object.entries(TOKEN_PATTERNS)) {
      const regex = new RegExp(`^${pattern}$`, "i");
      const match = token.match(regex);

      if (match) {
        sqlParts.push(transform(match[1] ?? ""));
        matched = true;
        break;
      }
    }

    if (!matched && token) {
      sqlParts.push(token);
    }
  }

  return sqlParts.join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Create a Prisma adapter from a Prisma client instance */
export function createPrismaAdapter(prisma: {
  $queryRawUnsafe: (sql: string) => Promise<unknown[]>;
}): SQLAdapter {
  return (sql: string) => prisma.$queryRawUnsafe(sql);
}

