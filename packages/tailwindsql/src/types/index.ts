export type SQLAdapter = (sql: string) => Promise<unknown[]>;
