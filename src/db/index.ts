import { drizzle } from "drizzle-orm/postgres-js";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const createConnection = (connection_string: string) => {
  return postgres(connection_string, {
    max: 20,
    idle_timeout: 30,
    max_lifetime: 60 * 30,
  });
};

// Fix for "sorry, too many clients already" from:
// https://www.answeroverflow.com/m/1146224610002600067

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  const client = createConnection(
    process.env.DATABASE_CONNECTION_STRING as string
  );

  db = drizzle(client, {
    schema,
  });
} else {
  if (!global.db) {
    const client = createConnection(
      process.env.DATABASE_CONNECTION_STRING as string
    );

    global.db = drizzle(client, {
      schema,
      logger: {
        logQuery: (query) => {
          // to remove quotes on query string, to make it more readable
          console.log({ query: query.replace(/\"/g, "") });
        },
      },
    });
  }

  db = global.db;
}

type DbInstance = typeof db;

export { db };
export type { DbInstance };
