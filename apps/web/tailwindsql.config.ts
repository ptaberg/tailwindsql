import { configTailwindSQL } from "@repo/tailwindsql/src/server/config";
import { executeSQL } from "./app/actions";

export const { QueryBlock } = configTailwindSQL({
  adapter: executeSQL,
});
