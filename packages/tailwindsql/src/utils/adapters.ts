import { SQLAdapter } from "../types";

/** Create a Prisma adapter from a Prisma client instance */
export function createPrismaAdapter(prisma: {
  $queryRawUnsafe: (sql: string) => Promise<unknown[]>;
}): SQLAdapter {
  return (sql: string) => prisma.$queryRawUnsafe(sql);
}
