import { pgTable } from "drizzle-orm/pg-core";
import { generateId } from "./utils";

export const Threads = pgTable("threads", {
  id: generateId,
});
