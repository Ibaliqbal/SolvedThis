import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Declare global to prevent multiple instances during hot reloading in development
declare global {
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

const connectionPool = postgres(process.env.DATABASE_CONNECTION_STRING!, {
  max: 20, // Reduced to a more reasonable number
  idle_timeout: 30,
  max_lifetime: 60 * 30, // 30 minutes
});

function createDb() {
  return drizzle(connectionPool, { schema });
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = createDb();
} else {
  if (!global.db) {
    global.db = createDb();
  }
  db = global.db;
}

export { db };
type DbInstance = typeof db;
export type { DbInstance };
