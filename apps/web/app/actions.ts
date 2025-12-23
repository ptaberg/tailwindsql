"use server";

import { prisma } from "./db";

export async function executeSQL(sql: string): Promise<unknown[]> {
  console.log("[TailwindSQL] Executing:", sql);
  const result = await prisma.$queryRawUnsafe(sql);
  return result as unknown[];
}

