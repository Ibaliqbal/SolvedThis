import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Add any additional configuration here
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING as string,
  },
});
